import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import type { MascotPose, LocalizedText, LanguageCode } from '../../engine/story/types';
import { MASCOT_IMAGE_MAP } from '../../engine/story/assetRegistry';
import {
  playNormalizedVoiceover,
  stopVoice,
  getAutoVoiceover,
  setAutoVoiceover,
  subscribeAutoVoiceover
} from '../../engine/sound';

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
  const [imgError, setImgError] = useState(false);
  const [autoVoice, setAutoVoice] = useState<boolean>(getAutoVoiceover());

  useEffect(() => {
    return subscribeAutoVoiceover((enabled) => setAutoVoice(enabled));
  }, []);

  const textToSpeak = dialogue?.[lang] || dialogue?.en || '';
  const mascotImgUrl = MASCOT_IMAGE_MAP[pose];

  // Auto-play voiceover with volume normalization whenever dialogue or audioSrc updates
  useEffect(() => {
    if (!autoVoice) return;
    if (!textToSpeak && !audioSrc) return;

    let isCancelled = false;

    playNormalizedVoiceover({
      audioSrc,
      text: textToSpeak,
      lang,
      onStart: () => {
        if (!isCancelled) setIsPlayingAudio(true);
      },
      onEnd: () => {
        if (!isCancelled) setIsPlayingAudio(false);
      },
      onError: () => {
        if (!isCancelled) setIsPlayingAudio(false);
      }
    }).catch(() => {
      // Browser autoplay policy might require manual gesture first
      if (!isCancelled) setIsPlayingAudio(false);
    });

    return () => {
      isCancelled = true;
      stopVoice();
      setIsPlayingAudio(false);
    };
  }, [textToSpeak, audioSrc, lang, autoVoice]);

  const handlePlayVoice = () => {
    if (isPlayingAudio) {
      stopVoice();
      setIsPlayingAudio(false);
      return;
    }

    playNormalizedVoiceover({
      audioSrc,
      text: textToSpeak,
      lang,
      onStart: () => setIsPlayingAudio(true),
      onEnd: () => setIsPlayingAudio(false),
      onError: () => setIsPlayingAudio(false)
    }).catch(() => {
      setIsPlayingAudio(false);
    });
  };

  return (
    <div className="flex items-end gap-3 sm:gap-4 max-w-3xl w-full z-20">
      {/* 3D Character Mascot AURA */}
      <div className="relative shrink-0 flex flex-col items-center">
        {/* Ambient Halo Glow */}
        <div
          className={`absolute -inset-2 rounded-full blur-xl pointer-events-none transition-all duration-500 ${
            pose === 'warning'
              ? 'bg-rose-500/30 animate-ping'
              : pose === 'success' || pose === 'trophy'
              ? 'bg-emerald-400/35 animate-pulse'
              : 'bg-teal-400/20'
          }`}
        />

        {/* Mascot Avatar Canvas */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 relative rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 p-1.5 border-2 border-emerald-400/60 shadow-xl shadow-emerald-950/40 flex items-center justify-center overflow-hidden">
          {!imgError && mascotImgUrl ? (
            <img
              src={mascotImgUrl}
              alt={`AURA (${pose})`}
              onError={() => setImgError(true)}
              className="w-full h-full object-contain drop-shadow-md transition-transform duration-300 hover:scale-105"
            />
          ) : (
            /* Procedural SVG Fallback */
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full drop-shadow-md"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Hover Floating Shadow */}
              <ellipse cx="50" cy="92" rx="28" ry="4" fill="#022c22" opacity="0.6" />

              {/* Ather Bot Head Chassis */}
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

              {/* Emerald Ear Nodes */}
              <rect x="14" y="32" width="6" height="24" rx="3" fill="#10b981" />
              <rect x="80" y="32" width="6" height="24" rx="3" fill="#10b981" />

              {/* Glowing Digital Visor Frame */}
              <rect
                x="26"
                y="26"
                width="48"
                height="32"
                rx="10"
                fill="#0f172a"
                stroke="#10b981"
                strokeWidth="1.5"
              />

              {/* Expressive Eye Visor Render */}
              {pose === 'warning' ? (
                <g stroke="#f43f5e" strokeWidth="4" strokeLinecap="round">
                  <line x1="36" y1="36" x2="44" y2="44" />
                  <line x1="44" y1="36" x2="36" y2="44" />
                  <line x1="56" y1="36" x2="64" y2="44" />
                  <line x1="64" y1="36" x2="56" y2="44" />
                </g>
              ) : pose === 'success' || pose === 'trophy' ? (
                <g stroke="#34d399" strokeWidth="3.5" strokeLinecap="round">
                  <path d="M34 44 Q40 36 46 44" fill="none" />
                  <path d="M54 44 Q60 36 66 44" fill="none" />
                  <circle cx="50" cy="48" r="2" fill="#34d399" />
                </g>
              ) : pose === 'thinking' ? (
                <g stroke="#38bdf8" strokeWidth="3" strokeLinecap="round">
                  <circle cx="40" cy="40" r="4" fill="#38bdf8" />
                  <path d="M56 38 Q60 34 64 38" fill="none" />
                </g>
              ) : (
                <g stroke="#10b981" strokeWidth="3.5" strokeLinecap="round">
                  <path d="M34 43 Q40 37 46 43" fill="none" />
                  <path d="M54 43 Q60 37 66 43" fill="none" />
                </g>
              )}

              {/* Bot Neck */}
              <path d="M42 70 L58 70 L54 78 L46 78 Z" fill="#047857" />
              <circle cx="50" cy="84" r="5" fill="#10b981" />

              <defs>
                <linearGradient id="auraBodyGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="70%" stopColor="#f1f5f9" />
                  <stop offset="100%" stopColor="#cbd5e1" />
                </linearGradient>
              </defs>
            </svg>
          )}
        </div>

        {/* Mascot Name Badge */}
        <div className="mt-1 px-2.5 py-0.5 rounded-full bg-slate-900 border border-emerald-500/50 text-[10px] font-mono font-bold tracking-wider text-emerald-400 uppercase shadow-xs">
          AURA · BOT
        </div>
      </div>

      {/* Speech Bubble */}
      <div className="flex-1 bg-white border-2 border-slate-200/90 rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 shadow-lg relative min-h-[76px] flex flex-col justify-between">
        {/* Speech bubble pointer arrow */}
        <div className="absolute left-[-8px] bottom-6 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[8px] border-r-white" />

        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-700">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>AURA Operations Guide</span>
            </div>
            <p className="text-slate-800 text-sm sm:text-base font-semibold leading-relaxed">
              {textToSpeak}
            </p>
          </div>

          {/* Voice Controls: Auto-read toggle + Manual Play/Stop */}
          <div className="shrink-0 flex items-center gap-1.5 self-start">
            <button
              type="button"
              onClick={() => setAutoVoiceover(!autoVoice)}
              title={autoVoice ? "Auto-Voice: Active (Click to Disable)" : "Auto-Voice: Off (Click to Enable)"}
              className={`px-2 py-1.5 rounded-xl border text-[10px] font-mono font-bold flex items-center gap-1 transition-all cursor-pointer ${
                autoVoice
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <span className="hidden sm:inline">Auto</span>
              <span className={`w-1.5 h-1.5 rounded-full ${autoVoice ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
            </button>

            <button
              type="button"
              onClick={handlePlayVoice}
              title={isPlayingAudio ? 'Stop Voiceover' : 'Play Voiceover (Normalized Audio)'}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
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
    </div>
  );
};
