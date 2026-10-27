import { useState } from 'react';
import type { CountStepperStepData } from '../content/schema';
import type { LanguageCode, TrainingMode, StepResult } from '../engine/types';

interface CountStepperStepProps {
  step: CountStepperStepData;
  lang: LanguageCode;
  mode: TrainingMode;
  isAnswered: boolean;
  onResult: (result: StepResult) => void;
}

export function CountStepperStep({
  step,
  isAnswered,
  onResult
}: CountStepperStepProps) {
  const [count, setCount] = useState<number>(step.challanCount || 20);

  const handleDecrement = () => {
    if (isAnswered) return;
    setCount((prev) => Math.max(0, prev - 1));
  };

  const handleIncrement = () => {
    if (isAnswered) return;
    setCount((prev) => prev + 1);
  };

  const handleCheck = () => {
    if (isAnswered) return;
    const isCorrect = count === step.actualCount;
    onResult({ ok: isCorrect, meta: { enteredCount: count, actualCount: step.actualCount } });
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {/* Visual Pile of Items to Count */}
      <div className="w-full p-4 bg-card rounded-xl border-3 border-ink shadow-sm flex flex-col items-center">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-ink/70 mb-2">
          VISUAL INCOMING PILE — COUNT THE {step.pileItemIcon} CAREFULLY:
        </span>
        <div className="flex flex-wrap justify-center gap-2 max-w-[480px] p-2 bg-concrete/50 rounded-lg border-2 border-ink/20">
          {Array.from({ length: step.actualCount }).map((_, idx) => (
            <span
              key={idx}
              className="text-3xl select-none transform hover:scale-110 transition-transform"
              title={`Item ${idx + 1}`}
            >
              {step.pileItemIcon}
            </span>
          ))}
        </div>
      </div>

      {/* Stepper Controls */}
      <div className="flex items-center justify-center gap-6 my-2">
        <button
          type="button"
          disabled={isAnswered || count <= 0}
          onClick={handleDecrement}
          className="flex items-center justify-center w-20 h-20 bg-card border-3 border-ink rounded-2xl font-heading text-5xl font-bold text-ink hover:bg-concrete active:scale-90 transition-all shadow-md disabled:opacity-40"
        >
          −
        </button>

        <div className="flex flex-col items-center justify-center min-w-[120px]">
          <span className="font-heading text-7xl font-extrabold text-ink leading-none">
            {count}
          </span>
          <span className="text-xs font-mono uppercase tracking-widest text-ink/60 mt-1">
            BOXES
          </span>
        </div>

        <button
          type="button"
          disabled={isAnswered}
          onClick={handleIncrement}
          className="flex items-center justify-center w-20 h-20 bg-card border-3 border-ink rounded-2xl font-heading text-5xl font-bold text-ink hover:bg-concrete active:scale-90 transition-all shadow-md disabled:opacity-40"
        >
          +
        </button>
      </div>

      {/* Check Button */}
      {!isAnswered && (
        <button
          type="button"
          onClick={handleCheck}
          className="w-full max-w-[320px] min-h-[64px] bg-act text-ink border-3 border-ink rounded-xl font-heading font-extrabold text-2xl tracking-wide uppercase hover:brightness-105 active:scale-95 transition-all shadow-md flex items-center justify-center"
        >
          <span>✓ Verify Box Count</span>
        </button>
      )}
    </div>
  );
}
