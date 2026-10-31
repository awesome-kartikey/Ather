import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, Octagon, ShieldAlert } from 'lucide-react';
import type { StopGoInteraction, LanguageCode } from '../../engine/story/types';

interface Props {
  interaction: StopGoInteraction;
  lang: LanguageCode;
  onComplete: (isCorrect: boolean) => void;
  disabled?: boolean;
}

export const StopGoCard: React.FC<Props> = ({
  interaction,
  lang,
  onComplete,
  disabled
}) => {
  const [selectedAction, setSelectedAction] = useState<'stop' | 'go' | null>(null);

  const handleAction = (action: 'stop' | 'go') => {
    if (disabled || selectedAction !== null) return;
    setSelectedAction(action);
    const isCorrect = action === interaction.correctAction;
    onComplete(isCorrect);
  };

  const stopTitle = interaction.stopLabel?.[lang] || interaction.stopLabel?.en || 'STOP & CALL ZONE LEADER';
  const goTitle = interaction.goLabel?.[lang] || interaction.goLabel?.en || 'PROCEED & RAISE BARRIER';

  const stopDesc =
    interaction.stopDescription?.[lang] ||
    interaction.stopDescription?.en ||
    'Hold vehicle at gate. Demand mandatory paperwork before unlocking gate barrier.';

  const goDesc =
    interaction.goDescription?.[lang] ||
    interaction.goDescription?.en ||
    'Permit vehicle exit without extra documentation since unloading is finished.';

  return (
    <div className="w-full bg-white rounded-2xl sm:rounded-3xl border-2 border-slate-200/90 shadow-xl p-4 sm:p-6 space-y-5 select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600 border border-amber-200">
            <Octagon className="w-4 h-4 text-amber-600" />
          </div>
          <span className="text-xs font-mono font-bold tracking-wider text-slate-700 uppercase">
            Operational Decision Point · Stop or Go
          </span>
        </div>

        {interaction.safetyCritical && (
          <span className="text-[11px] font-mono font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200 flex items-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>CRITICAL COMPLIANCE</span>
          </span>
        )}
      </div>

      {/* Main Question & Situation Box */}
      <div className="space-y-3">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
          {interaction.question?.[lang] || interaction.question?.en || (interaction as any).prompt?.[lang] || (interaction as any).prompt?.en || ''}
        </h3>

        <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="text-[11px] font-mono font-bold text-amber-800 uppercase tracking-wide">
              Active Plant Situation:
            </span>
            <p className="text-xs sm:text-sm text-amber-950 font-medium leading-relaxed">
              {interaction.situation[lang] || interaction.situation.en}
            </p>
          </div>
        </div>
      </div>

      {/* Tactile Big Action Buttons (>=72px touch targets) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
        {/* STOP BUTTON */}
        <button
          type="button"
          disabled={disabled || selectedAction !== null}
          onClick={() => handleAction('stop')}
          className={`min-h-[80px] p-4 rounded-2xl border-2 text-left flex flex-col justify-between transition-all cursor-pointer ${
            selectedAction === 'stop'
              ? 'bg-rose-500 border-rose-600 text-white shadow-lg ring-4 ring-rose-300/40'
              : 'bg-rose-50 hover:bg-rose-100/90 border-rose-300 hover:border-rose-400 text-rose-950 shadow-xs'
          } ${disabled && selectedAction === null ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                  selectedAction === 'stop' ? 'bg-white text-rose-600' : 'bg-rose-600 text-white'
                }`}
              >
                🛑
              </div>
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wide">
                {stopTitle}
              </span>
            </div>
            {selectedAction === 'stop' && (
              <CheckCircle2 className="w-5 h-5 text-white animate-bounce" />
            )}
          </div>
          <p
            className={`text-[11px] font-medium mt-2 leading-relaxed ${
              selectedAction === 'stop' ? 'text-rose-100' : 'text-rose-800'
            }`}
          >
            {stopDesc}
          </p>
        </button>

        {/* GO BUTTON */}
        <button
          type="button"
          disabled={disabled || selectedAction !== null}
          onClick={() => handleAction('go')}
          className={`min-h-[80px] p-4 rounded-2xl border-2 text-left flex flex-col justify-between transition-all cursor-pointer ${
            selectedAction === 'go'
              ? 'bg-emerald-600 border-emerald-700 text-white shadow-lg ring-4 ring-emerald-300/40'
              : 'bg-emerald-50 hover:bg-emerald-100/90 border-emerald-300 hover:border-emerald-400 text-emerald-950 shadow-xs'
          } ${disabled && selectedAction === null ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                  selectedAction === 'go' ? 'bg-white text-emerald-700' : 'bg-emerald-600 text-white'
                }`}
              >
                🟢
              </div>
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wide">
                {goTitle}
              </span>
            </div>
            {selectedAction === 'go' && (
              <CheckCircle2 className="w-5 h-5 text-white animate-bounce" />
            )}
          </div>
          <p
            className={`text-[11px] font-medium mt-2 leading-relaxed ${
              selectedAction === 'go' ? 'text-emerald-100' : 'text-emerald-800'
            }`}
          >
            {goDesc}
          </p>
        </button>
      </div>
    </div>
  );
};
