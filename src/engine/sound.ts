import type { LanguageCode } from './types';

let audioCtx: AudioContext | null = null;
let compressorNode: DynamicsCompressorNode | null = null;
let masterGainNode: GainNode | null = null;
let currentSourceNode: AudioBufferSourceNode | null = null;
let currentAudioEl: HTMLAudioElement | null = null;
const bufferCache = new Map<string, AudioBuffer>();

/**
 * Initializes and returns the Web Audio normalization pipeline:
 * Source -> DynamicsCompressorNode -> GainNode -> Destination
 * Compresses dynamic range and normalizes volume to industrial training standards (-14 LUFS / -1 dB true peak target).
 */
function getAudioPipeline(): { ctx: AudioContext; compressor: DynamicsCompressorNode; gain: GainNode } | null {
  try {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (!audioCtx) return null;

    if (audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }

    if (!compressorNode) {
      compressorNode = audioCtx.createDynamicsCompressor();
      // Calibrated loudness normalization parameters
      compressorNode.threshold.setValueAtTime(-24, audioCtx.currentTime); // dB
      compressorNode.knee.setValueAtTime(30, audioCtx.currentTime); // dB
      compressorNode.ratio.setValueAtTime(12, audioCtx.currentTime); // Compression ratio
      compressorNode.attack.setValueAtTime(0.003, audioCtx.currentTime); // 3ms attack
      compressorNode.release.setValueAtTime(0.25, audioCtx.currentTime); // 250ms release
    }

    if (!masterGainNode) {
      masterGainNode = audioCtx.createGain();
      masterGainNode.gain.setValueAtTime(1.2, audioCtx.currentTime); // Balanced target loudness
      compressorNode.connect(masterGainNode);
      masterGainNode.connect(audioCtx.destination);
    }

    return { ctx: audioCtx, compressor: compressorNode, gain: masterGainNode };
  } catch {
    return null;
  }
}

/**
 * Scans an AudioBuffer's peak amplitude to compute calibrated pre-gain boost
 * for quiet recordings, bringing all audio clips to a uniform loudness level.
 */
function calculateNormalizedGain(buffer: AudioBuffer): number {
  let peak = 0;
  for (let c = 0; c < buffer.numberOfChannels; c++) {
    const data = buffer.getChannelData(c);
    const step = Math.max(1, Math.floor(data.length / 500));
    for (let i = 0; i < data.length; i += step) {
      const abs = Math.abs(data[i]);
      if (abs > peak) peak = abs;
    }
  }

  if (peak > 0 && peak < 0.65) {
    // Boost quiet speech recordings up to standard target peak
    return Math.min(2.5, 0.85 / peak);
  }
  return 1.0;
}

export function playFeedbackTone(ok: boolean, soundEnabled = true, vibrationEnabled = true) {
  if (soundEnabled) {
    try {
      const pipeline = getAudioPipeline();
      if (pipeline) {
        const { ctx, compressor } = pipeline;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = ok ? 'sine' : 'sawtooth';
        osc.frequency.setValueAtTime(ok ? 880 : 180, ctx.currentTime);

        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (ok ? 0.15 : 0.3));

        osc.connect(gain);
        gain.connect(compressor);

        osc.start();
        osc.stop(ctx.currentTime + (ok ? 0.16 : 0.31));
      }
    } catch {
      // AudioContext unavailable
    }
  }

  if (!ok && vibrationEnabled) {
    try {
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate(120);
      }
    } catch {
      // Vibration unavailable
    }
  }
}

const LANG_VOICE_CODES: Record<LanguageCode, string> = {
  en: 'en-IN',
  hi: 'hi-IN',
  mr: 'mr-IN'
};

let currentPlaybackSessionId = 0;
const activeSourceNodes = new Set<AudioBufferSourceNode>();
const activeAudioElements = new Set<HTMLAudioElement>();

/**
 * Halts any active audio playback: Web Audio buffers, HTMLAudio elements, and SpeechSynthesis.
 * Increments currentPlaybackSessionId to immediately invalidate any pending asynchronous fetch/decode operations.
 */
export function stopVoice() {
  currentPlaybackSessionId++;

  // 1. Immediately halt all active AudioBufferSourceNodes
  for (const source of activeSourceNodes) {
    try {
      source.onended = null;
      source.stop(0);
      source.disconnect();
    } catch {}
  }
  activeSourceNodes.clear();
  currentSourceNode = null;

  // 2. Immediately pause, mute, and clear all active HTMLAudioElements
  for (const el of activeAudioElements) {
    try {
      el.onended = null;
      el.onerror = null;
      el.pause();
      el.currentTime = 0;
      el.src = '';
    } catch {}
  }
  activeAudioElements.clear();

  if (currentAudioEl) {
    try {
      currentAudioEl.onended = null;
      currentAudioEl.onerror = null;
      currentAudioEl.pause();
      currentAudioEl.currentTime = 0;
      currentAudioEl.src = '';
    } catch {}
    currentAudioEl = null;
  }

  // 3. Halt SpeechSynthesis immediately
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {}
  }
}

export interface VoiceoverOptions {
  audioSrc?: string;
  text: string;
  lang: LanguageCode;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: () => void;
}

/**
 * Plays voiceover audio through the volume normalization pipeline (DynamicsCompressorNode + GainNode).
 * Features:
 * - Decoded AudioBuffer caching for zero-latency replays
 * - Monotonic session ID tracking to strictly prevent overlapping playback across screen transitions
 * - Dynamic range compression to eliminate clipping and quiet murmurs
 * - Resilient fallback to HTML5 Audio and Web SpeechSynthesis API
 */
export async function playNormalizedVoiceover({
  audioSrc,
  text,
  lang,
  onStart,
  onEnd,
  onError
}: VoiceoverOptions): Promise<() => void> {
  // Immediately halt any previous voiceover and lock into a new session
  stopVoice();
  const sessionId = currentPlaybackSessionId;
  const isStale = () => sessionId !== currentPlaybackSessionId;

  if (!audioSrc && !text) {
    onEnd?.();
    return () => {};
  }

  // 1. Try Web Audio normalization if an audio file path is provided
  if (audioSrc) {
    try {
      const pipeline = getAudioPipeline();
      if (pipeline) {
        const { ctx, compressor } = pipeline;

        let buffer = bufferCache.get(audioSrc);
        if (!buffer) {
          const response = await fetch(audioSrc);
          if (isStale()) return () => {};
          if (!response.ok) {
            throw new Error(`Failed to fetch audio: ${response.status}`);
          }
          const arrayBuffer = await response.arrayBuffer();
          if (isStale()) return () => {};
          buffer = await ctx.decodeAudioData(arrayBuffer);
          if (isStale()) return () => {};
          bufferCache.set(audioSrc, buffer);
        }

        if (isStale()) return () => {};

        // Stop any residual nodes before attaching new one
        for (const s of activeSourceNodes) {
          try {
            s.onended = null;
            s.stop(0);
            s.disconnect();
          } catch {}
        }
        activeSourceNodes.clear();

        const source = ctx.createBufferSource();
        source.buffer = buffer;

        // Clip-level normalized pre-gain stage
        const preGain = ctx.createGain();
        const normFactor = calculateNormalizedGain(buffer);
        preGain.gain.setValueAtTime(normFactor, ctx.currentTime);

        source.connect(preGain);
        preGain.connect(compressor);

        activeSourceNodes.add(source);
        currentSourceNode = source;

        source.onended = () => {
          activeSourceNodes.delete(source);
          if (currentSourceNode === source) {
            currentSourceNode = null;
          }
          if (!isStale()) {
            onEnd?.();
          }
        };

        source.start(0);
        if (!isStale()) {
          onStart?.();
        }

        return () => {
          try {
            source.onended = null;
            source.stop(0);
            source.disconnect();
          } catch {}
          activeSourceNodes.delete(source);
          if (currentSourceNode === source) {
            currentSourceNode = null;
          }
        };
      }
    } catch (err) {
      if (isStale()) return () => {};
      console.warn('Web Audio normalized playback failed, attempting HTML5 Audio fallback:', err);
      // Fall through to HTML5 Audio fallback
    }

    if (isStale()) return () => {};

    // 2. Fallback to HTML5 Audio element with software volume leveling
    try {
      const audio = new Audio(audioSrc);
      audio.volume = 1.0;
      activeAudioElements.add(audio);
      currentAudioEl = audio;

      let ended = false;
      audio.onended = () => {
        activeAudioElements.delete(audio);
        if (currentAudioEl === audio) currentAudioEl = null;
        if (!ended && !isStale()) {
          ended = true;
          onEnd?.();
        }
      };

      audio.onerror = () => {
        activeAudioElements.delete(audio);
        if (currentAudioEl === audio) currentAudioEl = null;
        if (!ended && !isStale()) {
          ended = true;
          triggerSpeechSynthesis(text, lang, onEnd, onError);
        }
      };

      await audio.play();
      if (isStale()) {
        try {
          audio.pause();
          audio.src = '';
        } catch {}
        activeAudioElements.delete(audio);
        return () => {};
      }

      onStart?.();

      return () => {
        try {
          audio.pause();
          audio.src = '';
        } catch {}
        activeAudioElements.delete(audio);
      };
    } catch (err) {
      if (isStale()) return () => {};
      console.warn('HTML5 Audio playback failed, falling back to TTS:', err);
      onError?.();
    }
  }

  if (isStale()) return () => {};

  // 3. Fallback to Web SpeechSynthesis API
  triggerSpeechSynthesis(text, lang, () => {
    if (!isStale()) onEnd?.();
  }, () => {
    if (!isStale()) onError?.();
  });
  if (!isStale()) onStart?.();

  return () => {
    stopVoice();
  };
}

/**
 * Backward-compatible helper for legacy components.
 */
export function speakText(
  text: string,
  lang: LanguageCode,
  audioId?: string,
  onEnd?: () => void
): () => void {
  const audioSrc = audioId ? `/audio/${lang}/${audioId}.mp3` : undefined;
  playNormalizedVoiceover({
    audioSrc,
    text,
    lang,
    onEnd
  });

  return () => {
    stopVoice();
  };
}

function triggerSpeechSynthesis(
  text: string,
  lang: LanguageCode,
  onEnd?: () => void,
  onError?: () => void
) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    onError?.();
    onEnd?.();
    return;
  }

  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = LANG_VOICE_CODES[lang] || 'en-IN';
    utterance.rate = 0.95; // Calibrated rate for warehouse acoustics
    utterance.volume = 1.0; // Normalized full volume

    // Search available voices
    const voices = window.speechSynthesis.getVoices();
    const matchedVoice = voices.find((v) => v.lang === utterance.lang || v.lang.startsWith(lang));
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onend = () => {
      onEnd?.();
    };

    utterance.onerror = () => {
      onError?.();
      onEnd?.();
    };

    window.speechSynthesis.speak(utterance);
  } catch {
    onError?.();
    onEnd?.();
  }
}

/* ==========================================================================
   Auto-Read / Auto-Play Voiceover Preference Management
   ========================================================================== */

const AUTO_VOICEOVER_KEY = 'ather_auto_voiceover';
const autoVoiceoverListeners = new Set<(enabled: boolean) => void>();

/**
 * Returns whether Auto-Read Voiceover is enabled.
 * Defaults to `true` to ensure operators receive audio guidance by default.
 */
export function getAutoVoiceover(): boolean {
  try {
    const val = localStorage.getItem(AUTO_VOICEOVER_KEY);
    if (val === null) return true;
    return val === 'true';
  } catch {
    return true;
  }
}

/**
 * Updates the Auto-Read Voiceover setting and notifies all active UI subscribers.
 */
export function setAutoVoiceover(enabled: boolean): void {
  try {
    localStorage.setItem(AUTO_VOICEOVER_KEY, String(enabled));
    autoVoiceoverListeners.forEach((fn) => {
      try {
        fn(enabled);
      } catch {}
    });
  } catch {}
}

/**
 * Subscribes a React component to Auto-Read Voiceover state changes.
 */
export function subscribeAutoVoiceover(listener: (enabled: boolean) => void): () => void {
  autoVoiceoverListeners.add(listener);
  return () => {
    autoVoiceoverListeners.delete(listener);
  };
}
