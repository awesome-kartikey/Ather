import React, { useState, useEffect } from 'react';
import { Home, Volume2, VolumeX } from 'lucide-react';
import { AtherCapsuleLogo } from '../common/AtherCapsuleLogo';
import { LanguageSwitcher } from '../common/LanguageSwitcher';
import type { LanguageCode } from '../../engine/story/types';
import { getAutoVoiceover, setAutoVoiceover, subscribeAutoVoiceover } from '../../engine/sound';

export interface StageTabItem {
  id: string;
  stageNumber: number;
  shortTitle: string;
}

interface Props {
  stageTitle: string;
  lang: LanguageCode;
  onSelectLang: (lang: LanguageCode) => void;
  currentSceneIndex?: number;
  totalScenes?: number;
  onExitHome?: () => void;
  // Legacy optional props to prevent breakage
  sopDoc?: string;
  xp?: number;
  hearts?: number;
  onReset?: () => void;
  stages?: StageTabItem[];
  currentStageIndex?: number;
  onSelectStage?: (index: number) => void;
}

export const StoryHud: React.FC<Props> = ({
  stageTitle,
  lang,
  onSelectLang,
  currentSceneIndex = 0,
  totalScenes = 9,
  onExitHome
}) => {
  const [autoVoice, setAutoVoice] = useState<boolean>(getAutoVoiceover());

  useEffect(() => {
    return subscribeAutoVoiceover((val) => setAutoVoice(val));
  }, []);

  return (
    <header className="shrink-0 w-full h-12 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs z-30 flex items-center select-none">
      <div className="w-full px-3 sm:px-5 flex items-center justify-between gap-3">
        {/* Left: Ather Capsule Logo + Tetrahedron Logo + Clean Stage Title */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 min-w-0">
          <AtherCapsuleLogo height={10} />
          <div className="h-3.5 w-px bg-slate-200" />
          <img
            src="/logo/Tetrahedron-logo-transparent.svg"
            alt="Tetrahedron"
            className="h-4 sm:h-4.5 object-contain opacity-85 hover:opacity-100 transition-opacity shrink-0"
          />
          <div className="h-3.5 w-px bg-slate-200 hidden sm:block" />
          <span className="text-xs sm:text-sm font-black text-slate-800 tracking-tight truncate max-w-[200px] sm:max-w-xs md:max-w-md">
            {stageTitle}
          </span>
        </div>

        {/* Center: Subtle Scene Milestone Pill */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100/90 border border-slate-200/80 text-[11px] font-mono font-bold text-slate-700 shadow-2xs shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
          <span>Scene {currentSceneIndex + 1} of {totalScenes}</span>
        </div>

        {/* Right: Language Switcher + Auto-Voice Toggle + DOJO Home Exit Button */}
        <div className="flex items-center gap-2 shrink-0">
          <LanguageSwitcher currentLang={lang} onSelectLang={onSelectLang} />

          {/* Auto-Read / Auto-Play Voiceover Toggle */}
          <button
            type="button"
            onClick={() => setAutoVoiceover(!autoVoice)}
            title={
              autoVoice
                ? 'Auto Voiceover: ON (Click to Mute)'
                : 'Auto Voiceover: MUTED (Click to Enable)'
            }
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-mono font-bold transition-all cursor-pointer ${
              autoVoice
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300 shadow-2xs hover:bg-emerald-100'
                : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100 hover:text-slate-700'
            }`}
          >
            {autoVoice ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                <span className="hidden md:inline">Voice</span>
                <span className="text-[9px] bg-emerald-600 text-white px-1.5 py-0.2 rounded-full font-extrabold">
                  ON
                </span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden md:inline">Voice</span>
                <span className="text-[9px] bg-slate-200 text-slate-600 px-1.5 py-0.2 rounded-full font-bold">
                  OFF
                </span>
              </>
            )}
          </button>

          {/* DOJO Home Exit Button */}
          {onExitHome && (
            <button
              type="button"
              onClick={onExitHome}
              title="Return to DOJO Portal"
              className="p-1.5 px-2 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-blue-50 border border-slate-200 transition-colors cursor-pointer flex items-center gap-1"
            >
              <Home className="w-3.5 h-3.5" />
              <span className="text-[11px] font-mono font-bold hidden lg:inline">Exit</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
