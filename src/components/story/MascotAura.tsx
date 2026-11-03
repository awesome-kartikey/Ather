import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Volume2 } from 'lucide-react';
import type { MascotPose, LocalizedText, LanguageCode } from '../../engine/story/types';
import { MASCOT_IMAGE_MAP } from '../../engine/story/assetRegistry';
import {
  playNormalizedVoiceover,
  stopVoice,
  getAutoVoiceover,
  subscribeAutoVoiceover
} from '../../engine/sound';

interface MascotAuraProps {
  pose: MascotPose;
  dialogue: LocalizedText;
  lang: LanguageCode;
  audioSrc?: string;
  variant?: 'docked' | 'floating_overlay' | 'compact';
  onActionClick?: () => void;
  actionText?: string;
}

export const MascotAura: React.FC<MascotAuraProps> = ({
  pose,
  dialogue,
  lang,
  audioSrc,
  variant = 'docked',
  onActionClick,
  actionText
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [autoVoice] = useState<boolean>(getAutoVoiceover());

  useEffect(() => {
    return subscribeAutoVoiceover(() => {});
  }, []);

  const textToSpeak = dialogue?.[lang] || dialogue?.en || '';
  const mascotImgUrl = MASCOT_IMAGE_MAP[pose];

  // Auto-play voiceover whenever dialogue or audioSrc updates
  useEffect(() => {
    if (!autoVoice) return;
    if (!textToSpeak && !audioSrc) return;

    let isCancelled = false;
    let cancelCallback: (() => void) | null = null;

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
    })
      .then((cleanup) => {
        if (isCancelled) {
          cleanup();
        } else {
          cancelCallback = cleanup;
        }
      })
      .catch(() => {
        if (!isCancelled) setIsPlayingAudio(false);
      });

    return () => {
      isCancelled = true;
      if (cancelCallback) {
        cancelCallback();
      }
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

  const isFloating = variant === 'floating_overlay';
  const isCompact = variant === 'compact';

  // Distinct living animation profiles for each pose
  const poseAnimation = (() => {
    switch (pose) {
      case 'warning':
        return {
          animate: {
            y: [0, -5, 0],
            rotate: [0, -3.5, 3.5, -2, 2, 0],
            scale: [1, 1.05, 1]
          },
          transition: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' as const }
        };
      case 'success':
      case 'trophy':
        return {
          animate: {
            y: [0, -12, -2, -8, 0],
            rotate: [0, -4, 4, -2, 2, 0],
            scale: [1, 1.08, 1]
          },
          transition: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' as const }
        };
      case 'thinking':
        return {
          animate: {
            y: [0, -6, 0],
            rotate: [-3, 3, -3],
            scale: [1, 1.02, 1]
          },
          transition: { duration: 3.0, repeat: Infinity, ease: 'easeInOut' as const }
        };
      case 'explaining':
        return {
          animate: {
            y: [0, -7, 0],
            rotate: [0, 2, -1.5, 0],
            scale: isPlayingAudio ? [1, 1.05, 1] : [1, 1.02, 1]
          },
          transition: { duration: isPlayingAudio ? 1.6 : 2.8, repeat: Infinity, ease: 'easeInOut' as const }
        };
      default:
        return {
          animate: {
            y: [0, -8, 0],
            rotate: [0, 1.5, -1.5, 0]
          },
          transition: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' as const }
        };
    }
  })();

  return (
    <div
      className={`flex w-full select-none transition-all duration-300 ${
        isFloating
          ? 'items-end gap-3 p-1.5 sm:p-2'
          : 'items-center gap-2.5 sm:gap-3.5 p-0'
      }`}
    >
      {/* Aura Character Avatar */}
      <motion.div
        animate={poseAnimation.animate}
        transition={poseAnimation.transition}
        className="relative shrink-0 flex flex-col items-center z-10"
      >
        {/* Ambient Halo on Warning/Success only - Blue halo removed */}
        {(pose === 'warning' || pose === 'success' || pose === 'trophy') && (
          <div
            className={`absolute -inset-2 rounded-full blur-xl pointer-events-none transition-all duration-500 opacity-60 ${
              pose === 'warning'
                ? 'bg-rose-500/40'
                : 'bg-emerald-400/40'
            }`}
          />
        )}

        <div
          className={`relative flex items-center justify-center transition-all bg-transparent ${
            isCompact
              ? 'w-16 h-16'
              : isFloating
              ? 'w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40'
              : 'w-20 h-20 sm:w-24 sm:h-24 md:w-26 md:h-26'
          }`}
        >
          {!imgError && mascotImgUrl ? (
            <img
              src={mascotImgUrl}
              alt={`AURA (${pose})`}
              onError={() => setImgError(true)}
              className="w-full h-full object-contain filter drop-shadow-xl hover:scale-105 transition-transform"
            />
          ) : (
            <div className="w-full h-full rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-bold text-2xl">
              🤖
            </div>
          )}
        </div>

        {/* Dynamic breathing shadow beneath Aura in docked mode */}
        {!isFloating && (
          <motion.div
            animate={{
              scale: [1, 0.82, 1],
              opacity: [0.35, 0.18, 0.35]
            }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            className="w-14 h-2 rounded-full bg-slate-900/30 blur-2xs -mt-1"
          />
        )}
      </motion.div>

      {/* Rectangular Dialogue Box (Given full remaining width with speech pointer) */}
      <div
        className={`flex-1 relative rounded-2xl transition-all p-3 sm:p-4 shadow-sm flex items-center justify-between gap-3 ${
          isFloating
            ? 'bg-black/30 backdrop-blur-md border border-white/25 text-white shadow-xl'
            : 'bg-slate-50 border border-slate-200/90 text-slate-900 shadow-2xs min-h-[82px] sm:min-h-[92px]'
        }`}
      >
        {/* Subtle speech pointer triangle connecting to Aura */}
        {!isFloating && (
          <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-0 h-0 border-y-[6px] border-y-transparent border-r-[8px] border-r-slate-200" />
        )}

        <div className="flex-1 min-w-0 pr-1 space-y-1">
          {/* Contextual Header Tag */}
          {!isFloating && (
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-[10px] font-mono font-extrabold uppercase tracking-wider text-blue-700">
                AURA · SOP Operations Guide
              </span>
            </div>
          )}

          <p
            className={`text-xs sm:text-sm md:text-[15px] font-bold leading-relaxed ${
              isFloating
                ? 'text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]'
                : 'text-slate-900'
            }`}
          >
            {textToSpeak}
          </p>
          {actionText && onActionClick && (
            <div className="mt-2.5 flex items-center gap-2">
              <button
                type="button"
                onClick={onActionClick}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md transition-all cursor-pointer active:scale-95"
              >
                <span>{actionText}</span>
              </button>
            </div>
          )}
        </div>

        {/* Interactive Audio Voiceover Button with Animated Waves */}
        <button
          type="button"
          onClick={handlePlayVoice}
          title={isPlayingAudio ? 'Mute Voiceover' : 'Play Audio Voiceover'}
          className={`p-2.5 sm:p-3 rounded-xl border shrink-0 transition-all cursor-pointer ${
            isPlayingAudio
              ? 'bg-emerald-600 text-white border-emerald-500 shadow-md animate-pulse'
              : isFloating
              ? 'bg-white/20 hover:bg-white/30 text-white border-white/30 shadow-xs'
              : 'bg-white hover:bg-slate-100 text-slate-700 hover:text-blue-600 border-slate-200 shadow-xs'
          }`}
        >
          {isPlayingAudio ? (
            <div className="flex items-center gap-0.5 h-4 px-0.5">
              <span className="w-1 bg-white rounded-full h-3 animate-[pulse_0.4s_ease-in-out_infinite]" />
              <span className="w-1 bg-white rounded-full h-4 animate-[pulse_0.6s_ease-in-out_infinite]" />
              <span className="w-1 bg-white rounded-full h-2 animate-[pulse_0.3s_ease-in-out_infinite]" />
              <span className="w-1 bg-white rounded-full h-3.5 animate-[pulse_0.5s_ease-in-out_infinite]" />
            </div>
          ) : (
            <Volume2 className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
};
