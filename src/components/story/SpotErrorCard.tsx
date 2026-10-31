import React, { useState } from 'react';
import { AlertTriangle, ShieldAlert } from 'lucide-react';
import type { SpotErrorInteraction, LanguageCode } from '../../engine/story/types';

interface Props {
  interaction: SpotErrorInteraction;
  lang: LanguageCode;
  onComplete: (isCorrect: boolean) => void;
  disabled?: boolean;
}

export const SpotErrorCard: React.FC<Props> = ({
  interaction,
  lang,
  onComplete,
  disabled
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  const handleSelect = (optionId: string) => {
    if (disabled) return;
    setSelectedOptionId(optionId);
  };

  const handleSubmit = () => {
    if (!selectedOptionId || disabled) return;
    const option = interaction.options.find((opt) => opt.id === selectedOptionId);
    onComplete(!!option?.isViolation);
  };

  return (
    <div className="w-full bg-white rounded-2xl sm:rounded-3xl border-2 border-rose-200/90 shadow-xl p-4 sm:p-6 space-y-4 select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-rose-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-rose-50 text-rose-600 border border-rose-200">
            <ShieldAlert className="w-4 h-4 text-rose-600 animate-pulse" />
          </div>
          <span className="text-xs font-mono font-bold tracking-wider text-rose-700 uppercase">
            Mandatory Dock Safety Gate
          </span>
        </div>

        <span className="text-[11px] font-mono font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
          SAFETY CRITICAL
        </span>
      </div>

      {/* Instruction */}
      <div className="space-y-1">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
          {interaction.question?.[lang] || interaction.question?.en || (interaction as any).prompt?.[lang] || (interaction as any).prompt?.en || ''}
        </h3>
        {interaction.instruction && (
          <p className="text-xs text-slate-500 font-medium">
            {interaction.instruction[lang] || interaction.instruction.en}
          </p>
        )}
      </div>

      {/* Safety Audit Point Cards (≥64px touch target) */}
      <div className="grid grid-cols-1 gap-3 pt-1">
        {interaction.options.map((option) => {
          const isSelected = selectedOptionId === option.id;

          return (
            <button
              key={option.id}
              type="button"
              disabled={disabled}
              onClick={() => handleSelect(option.id)}
              className={`w-full min-h-[64px] p-4 rounded-2xl border-2 text-left flex items-start gap-3.5 transition-all cursor-pointer ${
                isSelected
                  ? 'bg-rose-50/90 border-rose-600 text-rose-950 shadow-md ring-2 ring-rose-500/20'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800'
              } ${disabled ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {/* Radio Indicator */}
              <div
                className={`w-5 h-5 rounded-full border-2 mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                  isSelected
                    ? 'border-rose-600 bg-rose-600'
                    : 'border-slate-300 bg-white'
                }`}
              >
                {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>

              {/* Text Label & Specs */}
              <div className="flex-1 space-y-0.5">
                <div className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <span>{option.label[lang] || option.label.en}</span>
                </div>
                {option.description && (
                  <div className="text-[11px] text-slate-500 font-medium leading-relaxed">
                    {option.description[lang] || option.description.en}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Submit Button (≥64px touch target) */}
      <div className="pt-2">
        <button
          type="button"
          disabled={!selectedOptionId || disabled}
          onClick={handleSubmit}
          className={`w-full min-h-[64px] px-6 py-4 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${
            selectedOptionId && !disabled
              ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/30'
              : 'bg-slate-200 text-slate-400 shadow-none cursor-not-allowed'
          }`}
        >
          <AlertTriangle className="w-5 h-5" />
          <span>Flag Safety Audit Breach</span>
        </button>
      </div>
    </div>
  );
};
