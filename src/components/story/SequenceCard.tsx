import React, { useState } from 'react';
import { ArrowUp, ArrowDown, CheckCircle2, RotateCcw, ListOrdered } from 'lucide-react';
import type { SequenceInteraction, LanguageCode } from '../../engine/story/types';
import { resolvePropForQuestion } from '../../engine/story/assetRegistry';

interface Props {
  interaction: SequenceInteraction;
  lang: LanguageCode;
  onComplete: (isCorrect: boolean) => void;
  disabled?: boolean;
}

export const SequenceCard: React.FC<Props> = ({
  interaction,
  lang,
  onComplete,
  disabled
}) => {
  const steps = interaction.steps || (interaction as any).items || [];
  const questionText = interaction.question || (interaction as any).prompt;

  const qId = interaction.questionId || (interaction as any).id || 'SEQ';
  const qPrompt = questionText?.en || '';
  const propImg = (interaction as any).propImage || resolvePropForQuestion(qId, qPrompt);

  // Initial shuffle so the user has to sort it
  const [orderedIds, setOrderedIds] = useState<string[]>(() => {
    const ids = steps.map((s: any) => s.id);
    // Deterministic shuffle different from correctOrder
    return [...ids].reverse();
  });

  const handleMoveUp = (index: number) => {
    if (disabled || index === 0) return;
    setOrderedIds((prev) => {
      const next = [...prev];
      const temp = next[index - 1];
      next[index - 1] = next[index];
      next[index] = temp;
      return next;
    });
  };

  const handleMoveDown = (index: number) => {
    if (disabled || index === orderedIds.length - 1) return;
    setOrderedIds((prev) => {
      const next = [...prev];
      const temp = next[index + 1];
      next[index + 1] = next[index];
      next[index] = temp;
      return next;
    });
  };

  const handleReset = () => {
    if (disabled) return;
    setOrderedIds([...steps.map((s: any) => s.id)].reverse());
  };

  const handleVerify = () => {
    if (disabled) return;
    const correctIds = interaction.correctOrder || (steps as any[]).sort((a: any, b: any) => (a.correctOrder || 0) - (b.correctOrder || 0)).map((s: any) => s.id) || [];
    const isCorrect = orderedIds.every((id, idx) => id === correctIds[idx]);
    onComplete(isCorrect);
  };

  return (
    <div className="w-full bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-xl p-4 sm:p-6 space-y-4 select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-200/60">
            <ListOrdered className="w-4 h-4" />
          </div>
          <span className="text-xs font-mono font-bold tracking-wider text-slate-500 uppercase">
            Process Sequence Builder
          </span>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="text-xs font-mono font-bold text-slate-400 hover:text-slate-600 flex items-center gap-1 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Instruction */}
      <div className="space-y-1">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
          {questionText?.[lang] || questionText?.en || ''}
        </h3>
        {interaction.instruction && (
          <p className="text-xs text-slate-500 font-medium">
            {interaction.instruction[lang] || interaction.instruction.en}
          </p>
        )}
      </div>

      {/* Contextual Floor Prop Cutout (if applicable) */}
      {propImg && (
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-blue-50/50 border border-blue-200/80">
          <div className="w-12 h-12 shrink-0 p-1 rounded-xl bg-white border border-blue-200 shadow-xs flex items-center justify-center">
            <img src={propImg} alt="Floor Tool" className="max-w-full max-h-full object-contain" />
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-blue-700 block">
              Reference Floor Prop / Tool
            </span>
            <p className="text-xs text-slate-700 font-medium">
              Verified operational artifact required for this process sequence.
            </p>
          </div>
        </div>
      )}

      {/* Steps List Stack */}
      <div className="flex flex-col gap-2.5 pt-1">
        {orderedIds.map((stepId, index) => {
          const stepItem = steps.find((s: any) => s.id === stepId);
          if (!stepItem) return null;

          return (
            <div
              key={stepId}
              className="min-h-[64px] p-3.5 sm:p-4 rounded-2xl border-2 border-slate-200 bg-slate-50/60 hover:bg-white hover:border-blue-400/80 transition-all flex items-center justify-between gap-3 shadow-2xs"
            >
              {/* Left: Step Number Badge + Icon + Text */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-7 h-7 rounded-xl bg-blue-600 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                  {index + 1}
                </div>
                <span className="text-xl shrink-0">{stepItem.icon}</span>
                <span className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug truncate sm:whitespace-normal">
                  {stepItem.label[lang] || stepItem.label.en}
                </span>
              </div>

              {/* Right: Tactile Reorder Arrows */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  disabled={disabled || index === 0}
                  onClick={() => handleMoveUp(index)}
                  title="Move Step Up"
                  className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                    index === 0
                      ? 'opacity-30 border-slate-200 text-slate-400 cursor-not-allowed'
                      : 'bg-white border-slate-300 text-slate-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-400 active:scale-95'
                  }`}
                >
                  <ArrowUp className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  disabled={disabled || index === orderedIds.length - 1}
                  onClick={() => handleMoveDown(index)}
                  title="Move Step Down"
                  className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                    index === orderedIds.length - 1
                      ? 'opacity-30 border-slate-200 text-slate-400 cursor-not-allowed'
                      : 'bg-white border-slate-300 text-slate-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-400 active:scale-95'
                  }`}
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Verify Action Button (≥64px touch target) */}
      <div className="pt-2">
        <button
          type="button"
          disabled={disabled}
          onClick={handleVerify}
          className="w-full min-h-[64px] px-6 py-4 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/30 transition-all cursor-pointer"
        >
          <CheckCircle2 className="w-5 h-5" />
          <span>Verify Chronological Sequence</span>
        </button>
      </div>
    </div>
  );
};
