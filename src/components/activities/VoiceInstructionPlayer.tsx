import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import type { LanguageCode } from '../../engine/types';
import { speakText, stopVoice } from '../../engine/sound';

interface Props {
  text: string;
  lang: LanguageCode;
  audioId?: string;
  label?: string;
}

export const VoiceInstructionPlayer: React.FC<Props> = ({
  text,
  lang,
  audioId,
  label = 'Voice Guidance'
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleToggle = () => {
    if (isPlaying) {
      stopVoice();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      speakText(text, lang, audioId, () => {
        setIsPlaying(false);
      });
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
        isPlaying
          ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-500/25 ring-2 ring-blue-400/30'
          : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200/90 shadow-2xs'
      }`}
      title={label}
    >
      {isPlaying ? (
        <>
          <div className="flex items-center gap-0.5">
            <span className="w-1 h-3 bg-white animate-pulse rounded-full" />
            <span className="w-1 h-4 bg-white animate-pulse delay-75 rounded-full" />
            <span className="w-1 h-2 bg-white animate-pulse delay-150 rounded-full" />
          </div>
          <span>Playing...</span>
          <VolumeX className="w-3.5 h-3.5 ml-0.5 text-white/80" />
        </>
      ) : (
        <>
          <Volume2 className="w-4 h-4 text-blue-600" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
};
