import React, { useState } from 'react';
import { MapPin, ShieldCheck } from 'lucide-react';
import type { HotspotInteraction, LanguageCode } from '../../engine/story/types';

interface Props {
  interaction: HotspotInteraction;
  lang: LanguageCode;
  onComplete: (isCorrect: boolean) => void;
  disabled?: boolean;
}

export const HotspotCard: React.FC<Props> = ({
  interaction,
  lang,
  onComplete,
  disabled
}) => {
  const [selectedTargetId, setSelectedTargetId] = useState<string | null>(null);

  const handleSelect = (targetId: string) => {
    if (disabled) return;
    setSelectedTargetId(targetId);
  };

  const handleConfirm = () => {
    if (!selectedTargetId || disabled) return;
    const target = interaction.targets.find((t) => t.id === selectedTargetId);
    onComplete(!!target?.correct);
  };

  return (
    <div className="w-full bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-xl p-4 sm:p-6 space-y-4 select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200/60">
            <MapPin className="w-4 h-4" />
          </div>
          <span className="text-xs font-mono font-bold tracking-wider text-slate-500 uppercase">
            Inbound Bay Allocation (YMM_DOCK_ALLOCATE)
          </span>
        </div>

        <span className="text-[11px] font-mono font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
          Q-ID: {interaction.questionId}
        </span>
      </div>

      {/* Instruction */}
      <div className="space-y-1">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
          {interaction.question[lang] || interaction.question.en}
        </h3>
        {interaction.instruction && (
          <p className="text-xs text-slate-500 font-medium">
            {interaction.instruction[lang] || interaction.instruction.en}
          </p>
        )}
      </div>

      {/* Dock Target Selection Cards (≥64px touch target) */}
      <div className="grid grid-cols-1 gap-3 pt-1">
        {interaction.targets.map((target) => {
          const isSelected = selectedTargetId === target.id;

          return (
            <button
              key={target.id}
              type="button"
              disabled={disabled}
              onClick={() => handleSelect(target.id)}
              className={`w-full min-h-[64px] p-4 rounded-2xl border-2 text-left flex items-start gap-3.5 transition-all cursor-pointer ${
                isSelected
                  ? 'bg-emerald-50/90 border-emerald-600 text-emerald-950 shadow-md ring-2 ring-emerald-500/20'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800'
              } ${disabled ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {/* Radio Indicator */}
              <div
                className={`w-5 h-5 rounded-full border-2 mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-600'
                    : 'border-slate-300 bg-white'
                }`}
              >
                {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>

              {/* Text Label & Specs */}
              <div className="flex-1 space-y-0.5">
                <div className="text-xs sm:text-sm font-bold text-slate-900">
                  {target.label[lang] || target.label.en}
                </div>
                {target.description && (
                  <div className="text-[11px] text-slate-500 font-medium leading-relaxed">
                    {target.description[lang] || target.description.en}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Action Button */}
      <div className="pt-2">
        <button
          type="button"
          disabled={!selectedTargetId || disabled}
          onClick={handleConfirm}
          className={`w-full min-h-[58px] px-6 py-3.5 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${
            selectedTargetId && !disabled
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/30'
              : 'bg-slate-200 text-slate-400 shadow-none cursor-not-allowed'
          }`}
        >
          <ShieldCheck className="w-5 h-5" />
          <span>Confirm Dock Allocation</span>
        </button>
      </div>
    </div>
  );
};
