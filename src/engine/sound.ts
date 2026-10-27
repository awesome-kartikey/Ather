import type { LanguageCode } from './types';

let audioCtx: AudioContext | null = null;
let currentAudioEl: HTMLAudioElement | null = null;

function getAudioContext(): AudioContext | null {
  try {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }
    return audioCtx;
  } catch {
    return null;
  }
}

export function playFeedbackTone(ok: boolean, soundEnabled = true, vibrationEnabled = true) {
  if (soundEnabled) {
    try {
      const ctx = getAudioContext();
      if (ctx) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = ok ? 'sine' : 'sawtooth';
        osc.frequency.setValueAtTime(ok ? 880 : 180, ctx.currentTime);

        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (ok ? 0.15 : 0.3));

        osc.connect(gain);
        gain.connect(ctx.destination);

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

export function stopVoice() {
  if (currentAudioEl) {
    try {
      currentAudioEl.pause();
      currentAudioEl.currentTime = 0;
    } catch {}
    currentAudioEl = null;
  }

  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {}
  }
}

export function speakText(
  text: string,
  lang: LanguageCode,
  audioId?: string,
  onEnd?: () => void
): () => void {
  stopVoice();

  if (!text) {
    onEnd?.();
    return () => {};
  }

  // Attempt pre-recorded mp3 playback if audioId is present
  if (audioId) {
    const audioSrc = `/audio/${lang}/${audioId}.mp3`;
    const audio = new Audio(audioSrc);
    currentAudioEl = audio;

    let hasFallenBack = false;

    const fallbackToTTS = () => {
      if (hasFallenBack) return;
      hasFallenBack = true;
      currentAudioEl = null;
      triggerSpeechSynthesis(text, lang, onEnd);
    };

    audio.onended = () => {
      currentAudioEl = null;
      onEnd?.();
    };

    audio.onerror = () => {
      fallbackToTTS();
    };

    audio.play().catch(() => {
      fallbackToTTS();
    });

    return () => {
      stopVoice();
    };
  }

  // Fallback to SpeechSynthesis directly
  triggerSpeechSynthesis(text, lang, onEnd);

  return () => {
    stopVoice();
  };
}

function triggerSpeechSynthesis(text: string, lang: LanguageCode, onEnd?: () => void) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    onEnd?.();
    return;
  }

  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = LANG_VOICE_CODES[lang] || 'en-IN';
    utterance.rate = 0.95; // slightly deliberate for loud warehouse acoustics

    // Check available voices for match
    const voices = window.speechSynthesis.getVoices();
    const matchedVoice = voices.find((v) => v.lang === utterance.lang || v.lang.startsWith(lang));
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onend = () => {
      onEnd?.();
    };

    utterance.onerror = () => {
      onEnd?.();
    };

    window.speechSynthesis.speak(utterance);
  } catch {
    onEnd?.();
  }
}
