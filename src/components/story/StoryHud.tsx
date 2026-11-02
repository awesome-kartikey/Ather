import React, { useState, useEffect } from 'react';
import { Heart, Award, RotateCcw, Home, Volume2, VolumeX } from 'lucide-react';
import { AtherLogo } from '../common/AtherLogo';
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
  sopDoc: string;
  lang: LanguageCode;
  onSelectLang: (lang: LanguageCode) => void;
  xp: number;
  hearts: number; // Max 3
  onReset: () => void;
  stages?: StageTabItem[];
  currentStageIndex?: number;
  onSelectStage?: (index: number) => void;
  onExitHome?: () => void;
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
  onSelectStage,
  onExitHome
}) => {
  const [catFilter, setCatFilter] = React.useState<'all' | 'cat1' | 'cat2'>('all');
  const [autoVoice, setAutoVoice] = useState<boolean>(getAutoVoiceover());

  useEffect(() => {
    return subscribeAutoVoiceover((val) => setAutoVoice(val));
  }, []);

  const filteredStages = (stages || []).filter((stg) => {
    if (catFilter === 'cat1') return stg.stageNumber <= 7;
    if (catFilter === 'cat2') return stg.stageNumber >= 8;
    return true;
  });

  return (
    <header className="shrink-0 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3">
        {/* Left: Ather Brand + Tetrahedron Logo + Stage info + Category Filter & Stage Switcher */}
        <div className="flex items-center gap-2.5">
          <AtherLogo className="h-8 sm:h-9" />
          <div className="h-6 w-px bg-slate-200 hidden sm:block" />
          <img
            src="/logo/Tetrahedron-logo-transparent.svg"
            alt="Tetrahedron"
            className="h-6 sm:h-7 object-contain opacity-85 hover:opacity-100 transition-opacity hidden sm:block"
          />
          <div className="h-6 w-px bg-slate-200 hidden md:block" />
          <div className="hidden md:flex flex-col">
            <span className="text-xs font-bold text-slate-800 tracking-tight">
              {stageTitle}
            </span>
            <span className="text-[10px] font-mono text-slate-500">
              AURIC M002 · Doc No: {sopDoc}
            </span>
          </div>

          {/* Category Filter Pills (Cat 1 vs Cat 2 separation) */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-200/70 p-0.5 rounded-xl border border-slate-300/80 ml-1">
            <button
              type="button"
              onClick={() => setCatFilter('all')}
              className={`px-2 py-0.5 rounded-lg text-[10px] font-bold font-mono transition-all cursor-pointer ${
                catFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-2xs font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All (1-12)
            </button>
            <button
              type="button"
              onClick={() => setCatFilter('cat1')}
              className={`px-2 py-0.5 rounded-lg text-[10px] font-bold font-mono transition-all cursor-pointer ${
                catFilter === 'cat1'
                  ? 'bg-emerald-600 text-white shadow-2xs font-extrabold'
                  : 'text-slate-600 hover:text-emerald-800'
              }`}
            >
              📦 Cat 1 (1-7)
            </button>
            <button
              type="button"
              onClick={() => setCatFilter('cat2')}
              className={`px-2 py-0.5 rounded-lg text-[10px] font-bold font-mono transition-all cursor-pointer ${
                catFilter === 'cat2'
                  ? 'bg-sky-600 text-white shadow-2xs font-extrabold'
                  : 'text-slate-600 hover:text-sky-800'
              }`}
            >
              ⚡ Cat 2 (8-12)
            </button>
          </div>

          {/* Stage Switcher Pills with Responsive Scroll */}
          {stages && stages.length > 1 && onSelectStage && (
            <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-xl border border-slate-200 ml-1 overflow-x-auto max-w-[260px] sm:max-w-sm xl:max-w-md">
              {filteredStages.map((stg) => {
                const sIdx = stages.findIndex((s) => s.id === stg.id);
                const isSelected = sIdx === currentStageIndex;
                const isCat2 = stg.stageNumber >= 8;
                return (
                  <button
                    key={stg.id}
                    type="button"
                    onClick={() => onSelectStage(sIdx)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                      isSelected
                        ? isCat2
                          ? 'bg-sky-600 text-white shadow-2xs font-extrabold'
                          : 'bg-emerald-600 text-white shadow-2xs font-extrabold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                    }`}
                  >
                    Stg {stg.stageNumber}
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

          {/* Auto-Read / Auto-Play Voiceover Toggle */}
          <button
            type="button"
            onClick={() => setAutoVoiceover(!autoVoice)}
            title={
              autoVoice
                ? 'Auto-Play Voiceover: ACTIVE (Click to Mute Auto-Read)'
                : 'Auto-Play Voiceover: MUTED (Click to Enable Auto-Read)'
            }
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border text-xs font-mono font-bold transition-all cursor-pointer ${
              autoVoice
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300 shadow-2xs hover:bg-emerald-100'
                : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100 hover:text-slate-700'
            }`}
          >
            {autoVoice ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                <span className="hidden sm:inline">Auto Voice</span>
                <span className="text-[10px] bg-emerald-600 text-white px-1.5 py-0.2 rounded-full font-extrabold">
                  ON
                </span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">Auto Voice</span>
                <span className="text-[10px] bg-slate-200 text-slate-600 px-1.5 py-0.2 rounded-full font-bold">
                  OFF
                </span>
              </>
            )}
          </button>

          {/* Restart Scene Button */}
          <button
            type="button"
            onClick={onReset}
            title="Restart Scene"
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Home Exit Button */}
          {onExitHome && (
            <button
              type="button"
              onClick={onExitHome}
              title="Return to DOJO Home"
              className="p-2 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-blue-50 border border-slate-200 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Home className="w-4 h-4" />
              <span className="hidden xl:inline text-xs font-bold">Home</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
