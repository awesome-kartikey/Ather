import { useState } from 'react';
import type { LanguageCode } from '../engine/types';
import { speakText, stopVoice } from '../engine/sound';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

interface AudioVoiceButtonProps {
  text: string;
  lang: LanguageCode;
  audioId?: string;
  label?: string;
  className?: string;
}

export function AudioVoiceButton({
  text,
  lang,
  audioId,
  label = 'Voice Guidance',
  className = ''
}: AudioVoiceButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleVoice = () => {
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
      onClick={toggleVoice}
      aria-label="Play question voice audio"
      className={`min-h-[56px] px-4 py-2.5 rounded-xl border-2 border-ink bg-card text-ink shadow-[2px_2px_0px_#14232b] hover:bg-concrete/40 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none flex items-center gap-2.5 font-heading font-bold text-base transition-all select-none cursor-pointer focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-act/50 ${
        isPlaying ? 'ring-2 ring-act bg-act/10 text-act' : ''
      } ${className}`}
    >
      {isPlaying ? (
        <>
          <div className="flex items-center gap-0.5">
            <span className="w-1 h-3.5 bg-act animate-pulse rounded-full" />
            <span className="w-1 h-5 bg-act animate-pulse delay-75 rounded-full" />
            <span className="w-1 h-2.5 bg-act animate-pulse delay-150 rounded-full" />
          </div>
          <span className="text-act uppercase text-sm font-extrabold tracking-wider">
            {lang === 'hi' ? 'बोल रहा है...' : lang === 'mr' ? 'ऐकवत आहे...' : 'Speaking...'}
          </span>
          <VolumeX className="w-4 h-4 ml-auto text-act/70" />
        </>
      ) : (
        <>
          <Volume2 className="w-5 h-5 text-act shrink-0" />
          <span className="tracking-wide">{label}</span>
          <Sparkles className="w-3.5 h-3.5 text-act/60 ml-auto" />
        </>
      )}
    </button>
  );
}
