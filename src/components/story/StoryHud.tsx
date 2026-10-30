import React from 'react';
import { Heart, Award, ArrowLeft } from 'lucide-react';
import { AtherLogo } from '../common/AtherLogo';
import { LanguageSwitcher } from '../common/LanguageSwitcher';
import type { LanguageCode } from '../../engine/story/types';

export interface StageTabItem {
  id: string;
  stageNumber: number;
  shortTitle: string;
}

interface Props {
  stageTitle: string;
  sopDoc: string;
  lang: LanguageCode;
  onSelectLang: (lang: LanguageCode) => void;
  xp: number;
  hearts: number; // Max 3
  onReset: () => void;
  stages?: StageTabItem[];
  currentStageIndex?: number;
  onSelectStage?: (index: number) => void;
}

export const StoryHud: React.FC<Props> = ({
  stageTitle,
  sopDoc,
  lang,
  onSelectLang,
  xp,
  hearts,
  onReset,
  stages,
  currentStageIndex = 0,
  onSelectStage
}) => {
  return (
    <header className="shrink-0 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3">
        {/* Left: Ather Brand + Stage info + Stage Switcher */}
        <div className="flex items-center gap-3">
          <AtherLogo className="h-8 sm:h-9" />
          <div className="h-6 w-px bg-slate-200 hidden sm:block" />
          <div className="hidden sm:flex flex-col">
            <span className="text-xs font-bold text-slate-800 tracking-tight">
              {stageTitle}
            </span>
            <span className="text-[10px] font-mono text-slate-500">
              AURIC M002 · Doc No: {sopDoc}
            </span>
          </div>

          {/* Optional Stage Switcher Pills */}
          {stages && stages.length > 1 && onSelectStage && (
            <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-xl border border-slate-200 ml-1">
              {stages.map((stg, sIdx) => {
                const isSelected = sIdx === currentStageIndex;
                return (
                  <button
                    key={stg.id}
                    type="button"
                    onClick={() => onSelectStage(sIdx)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white text-blue-600 shadow-2xs font-extrabold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Stage {stg.stageNumber}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Center / Right: Live Metrics (3 Hearts + XP) */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Hearts Display */}
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 shadow-2xs">
            {[1, 2, 3].map((heartIndex) => {
              const isFilled = heartIndex <= hearts;
              return (
                <Heart
                  key={heartIndex}
                  className={`w-4 h-4 sm:w-4.5 sm:h-4.5 transition-all ${
                    isFilled
                      ? 'text-rose-500 fill-rose-500 drop-shadow-xs'
                      : 'text-slate-300 fill-slate-200'
                  }`}
                />
              );
            })}
          </div>

          {/* XP Pill */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold shadow-2xs">
            <Award className="w-3.5 h-3.5 text-emerald-600" />
            <span>{xp} XP</span>
          </div>

          {/* Language Switcher Pill */}
          <LanguageSwitcher currentLang={lang} onSelectLang={onSelectLang} />

          {/* Restart Button */}
          <button
            type="button"
            onClick={onReset}
            title="Restart Scene"
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
