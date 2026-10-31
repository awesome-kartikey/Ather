import React, { useState } from 'react';
import { Minus, Plus, Calculator, CheckCircle2, Box } from 'lucide-react';
import type { CountStepperInteraction, LanguageCode } from '../../engine/story/types';

interface Props {
  interaction: CountStepperInteraction;
  lang: LanguageCode;
  onComplete: (isCorrect: boolean) => void;
  disabled?: boolean;
}

export const CountStepperCard: React.FC<Props> = ({
  interaction,
  lang,
  onComplete,
  disabled
}) => {
  const [count, setCount] = useState<number>(interaction.initialValue ?? 0);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

  const handleDecrement = () => {
    if (disabled || hasSubmitted) return;
    setCount((prev) => Math.max(interaction.min, prev - (interaction.step ?? 1)));
  };

  const handleIncrement = () => {
    if (disabled || hasSubmitted) return;
    setCount((prev) => Math.min(interaction.max, prev + (interaction.step ?? 1)));
  };

  const handleSubmit = () => {
    if (disabled || hasSubmitted) return;
    setHasSubmitted(true);
    const isCorrect = count === interaction.correctNumber;
    onComplete(isCorrect);
  };

  const unitLabel = interaction.unit[lang] || interaction.unit.en;
  const totalCrates = interaction.max || 10;

  return (
    <div className="w-full bg-white rounded-2xl sm:rounded-3xl border-2 border-slate-200/90 shadow-xl p-4 sm:p-6 space-y-5 select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-200">
            <Calculator className="w-4 h-4 text-blue-600" />
          </div>
          <span className="text-xs font-mono font-bold tracking-wider text-slate-700 uppercase">
            Statistical Quality Calculation · Count Stepper
          </span>
        </div>

        <span className="text-[11px] font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
          10% SAMPLING RULE
        </span>
      </div>

      {/* Main Question & Instructions */}
      <div className="space-y-1.5">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
          {interaction.question?.[lang] || interaction.question?.en || (interaction as any).prompt?.[lang] || (interaction as any).prompt?.en || ''}
        </h3>
        {interaction.instruction && (
          <p className="text-xs text-slate-500 font-medium">
            {interaction.instruction[lang] || interaction.instruction.en}
          </p>
        )}
      </div>

      {/* Visual Crate Allocation Matrix (Visual Novel Style) */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2.5">
        <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-500">
          <span>Inward Lot Breakdown ({totalCrates} Total FLCs):</span>
          <span className="text-blue-700 font-extrabold">
            {count} to IQC · {totalCrates - count} in Staging
          </span>
        </div>

        {/* 10 FLC Crate Grid */}
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
          {Array.from({ length: totalCrates }).map((_, idx) => {
            const isSample = idx < count;
            return (
              <div
                key={idx}
                className={`p-2 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${
                  isSample
                    ? 'bg-amber-100 border-amber-400 text-amber-900 shadow-xs ring-2 ring-amber-400/30'
                    : 'bg-white border-slate-200 text-slate-400 opacity-60'
                }`}
              >
                <Box className={`w-5 h-5 ${isSample ? 'text-amber-600 animate-pulse' : 'text-slate-400'}`} />
                <span className="text-[10px] font-mono font-bold mt-1">
                  #{idx + 1}
                </span>
                <span className="text-[9px] font-semibold">
                  {isSample ? 'IQC' : 'Wait'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Giant Tactile Stepper Workstation (>=64px touch targets) */}
      <div className="flex items-center justify-center gap-4 sm:gap-6 py-2">
        {/* Decrement Button */}
        <button
          type="button"
          disabled={disabled || hasSubmitted || count <= interaction.min}
          onClick={handleDecrement}
          aria-label="Decrease quantity"
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-slate-200 bg-white hover:bg-slate-100 active:scale-95 text-slate-800 disabled:opacity-40 disabled:cursor-not-allowed shadow-md flex items-center justify-center cursor-pointer transition-all"
        >
          <Minus className="w-8 h-8 stroke-[2.5]" />
        </button>

        {/* Large Digital Counter Display */}
        <div className="min-w-[140px] sm:min-w-[180px] p-3 rounded-2xl bg-slate-900 text-white border-2 border-slate-800 text-center shadow-inner space-y-0.5">
          <div className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-amber-400">
            {count}
          </div>
          <div className="text-[11px] font-mono text-slate-300 uppercase tracking-wider font-semibold">
            {unitLabel}
          </div>
          <div className="text-[10px] font-mono text-blue-400 font-bold">
            ({Math.round((count / totalCrates) * 100)}% of Lot)
          </div>
        </div>

        {/* Increment Button */}
        <button
          type="button"
          disabled={disabled || hasSubmitted || count >= interaction.max}
          onClick={handleIncrement}
          aria-label="Increase quantity"
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-slate-200 bg-white hover:bg-slate-100 active:scale-95 text-slate-800 disabled:opacity-40 disabled:cursor-not-allowed shadow-md flex items-center justify-center cursor-pointer transition-all"
        >
          <Plus className="w-8 h-8 stroke-[2.5]" />
        </button>
      </div>

      {/* Confirm Button (≥64px touch target) */}
      <button
        type="button"
        disabled={disabled || hasSubmitted}
        onClick={handleSubmit}
        className="w-full min-h-[64px] py-4 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-extrabold text-sm sm:text-base shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 cursor-pointer"
      >
        <CheckCircle2 className="w-5 h-5" />
        <span>Confirm IQC Sample Count</span>
      </button>
    </div>
  );
};
