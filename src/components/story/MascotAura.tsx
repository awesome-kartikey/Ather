import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import type { MascotPose, LocalizedText, LanguageCode } from '../../engine/story/types';

interface MascotAuraProps {
  pose: MascotPose;
  dialogue: LocalizedText;
  lang: LanguageCode;
  audioSrc?: string;
}

export const MascotAura: React.FC<MascotAuraProps> = ({
  pose,
  dialogue,
  lang,
  audioSrc
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const textToSpeak = dialogue[lang] || dialogue.en;

  const handlePlayVoice = () => {
    if (isPlayingAudio) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlayingAudio(false);
      return;
    }

    // Try playing MP3 audio file first if provided
    if (audioSrc) {
      const audio = new Audio(audioSrc);
      setIsPlayingAudio(true);
      audio.onended = () => setIsPlayingAudio(false);
      audio.onerror = () => {
        // Fallback to Web SpeechSynthesis API
        playTtsFallback();
      };
      audio.play().catch(() => playTtsFallback());
    } else {
      playTtsFallback();
    }
  };

  const playTtsFallback = () => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    if (lang === 'hi') utterance.lang = 'hi-IN';
    else if (lang === 'mr') utterance.lang = 'mr-IN';
    else utterance.lang = 'en-IN';

    utterance.rate = 0.95;
    utterance.onstart = () => setIsPlayingAudio(true);
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="flex items-end gap-3 sm:gap-4 max-w-3xl w-full z-20">
      {/* 3D-styled SVG Mascot AURA (Ather Bot) */}
      <div className="relative shrink-0 flex flex-col items-center">
        {/* Ambient Teal Glow */}
        <div className="absolute -inset-2 bg-emerald-400/20 rounded-full blur-xl pointer-events-none animate-pulse" />

        {/* Mascot Avatar Canvas */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 relative rounded-2xl bg-gradient-to-b from-slate-800 to-slate-950 p-1 border-2 border-emerald-400/60 shadow-xl shadow-emerald-950/30 flex items-center justify-center">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full drop-shadow-md"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Hover Floating Shadow */}
            <ellipse cx="50" cy="92" rx="28" ry="4" fill="#022c22" opacity="0.6" />

            {/* Ather Bot Head Chassis (Matte White with Subtle Chamfer) */}
            <rect
              x="20"
              y="18"
              width="60"
              height="52"
              rx="16"
              fill="url(#auraBodyGradient)"
              stroke="#059669"
              strokeWidth="2"
            />

            {/* Emerald Ear Nodes (Antenna sensor fins) */}
            <rect x="14" y="32" width="6" height="24" rx="3" fill="#10b981" />
            <rect x="80" y="32" width="6" height="24" rx="3" fill="#10b981" />

            {/* Glowing Digital Visor Frame */}
            <rect
              x="26"
              y="26"
              width="48"
              height="34"
              rx="10"
              fill="#061219"
              stroke="#047857"
              strokeWidth="1.5"
            />

            {/* Visor Scanlines subtle grid */}
            <line x1="28" y1="36" x2="72" y2="36" stroke="#064e3b" strokeWidth="0.8" opacity="0.6" />
            <line x1="28" y1="46" x2="72" y2="46" stroke="#064e3b" strokeWidth="0.8" opacity="0.6" />

            {/* Expressive Visor Eyes according to MascotPose */}
            {pose === 'success' ? (
              // Green Checkmarks / Joyful Winks
              <g stroke="#34d399" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M33 44 L39 49 L47 38" />
                <path d="M53 44 L59 49 L67 38" />
              </g>
            ) : pose === 'warning' ? (
              // Amber Warning Hazard Triangle & Alarmed eyes
              <g>
                <path
                  d="M50 32 L64 52 L36 52 Z"
                  fill="#f59e0b"
                  stroke="#b45309"
                  strokeWidth="1.5"
                />
                <circle cx="50" cy="42" r="1.5" fill="#1e1e1e" />
                <circle cx="50" cy="48" r="1.5" fill="#1e1e1e" />
              </g>
            ) : pose === 'thinking' ? (
              // Puzzled Question Eye & Tilted Eyebrow
              <g stroke="#38bdf8" strokeWidth="3" strokeLinecap="round">
                <circle cx="38" cy="43" r="3.5" fill="#38bdf8" />
                <path d="M58 35 C62 35 64 38 62 42 C60 45 58 46 58 48" fill="none" />
                <circle cx="58" cy="52" r="1.5" fill="#38bdf8" />
              </g>
            ) : (
              // Friendly Emerald Curved Eyes (Neutral / Explaining)
              <g stroke="#10b981" strokeWidth="3.5" strokeLinecap="round">
                <path d="M34 43 Q40 37 46 43" fill="none" />
                <path d="M54 43 Q60 37 66 43" fill="none" />
              </g>
            )}

            {/* Bot Neck & Floating Torso Indicator */}
            <path d="M42 70 L58 70 L54 78 L46 78 Z" fill="#047857" />
            <circle cx="50" cy="84" r="5" fill="#10b981" />

            {/* Gradient Definitions */}
            <defs>
              <linearGradient id="auraBodyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="70%" stopColor="#f1f5f9" />
                <stop offset="100%" stopColor="#cbd5e1" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Mascot Name Badge */}
        <div className="mt-1 px-2 py-0.5 rounded-full bg-slate-900 border border-emerald-500/40 text-[10px] font-mono font-bold tracking-wider text-emerald-400 uppercase shadow-xs">
          AURA · BOT
        </div>
      </div>

      {/* Speech Bubble */}
      <div className="flex-1 bg-white border-2 border-slate-200/90 rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 shadow-lg relative min-h-[76px] flex flex-col justify-between">
        {/* Little bubble speech pointer arrow */}
        <div className="absolute left-[-8px] bottom-6 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[8px] border-r-white" />

        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-700">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>AURA Story Guide</span>
            </div>
            <p className="text-slate-800 text-sm sm:text-base font-semibold leading-relaxed">
              {textToSpeak}
            </p>
          </div>

          {/* Voice Playback Toggle */}
          <button
            type="button"
            onClick={handlePlayVoice}
            title={isPlayingAudio ? 'Stop Voiceover' : 'Play Voiceover'}
            className={`shrink-0 p-2.5 rounded-xl border transition-all cursor-pointer ${
              isPlayingAudio
                ? 'bg-emerald-600 text-white border-emerald-700 shadow-md animate-pulse'
                : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
            }`}
          >
            {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};
