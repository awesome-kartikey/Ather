import type { SpotErrorStepData, SpotErrorOption } from '../content/schema';
import type { LanguageCode, TrainingMode } from '../engine/types';

interface SpotErrorStepProps {
  step: SpotErrorStepData;
  lang: LanguageCode;
  mode: TrainingMode;
  isAnswered: boolean;
  selectedOptionId: string | null;
  onSelect: (option: SpotErrorOption) => void;
}

export function SpotErrorStep({
  step,
  lang,
  mode,
  isAnswered,
  selectedOptionId,
  onSelect
}: SpotErrorStepProps) {
  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Context Document Header if applicable */}
      {step.poBadge && (
        <div className="flex items-center gap-3 bg-ink text-white px-4 py-2.5 rounded-xl border-3 border-ink shadow-sm w-fit">
          <span className="font-heading tracking-wider text-xl text-act font-bold">
            REFERENCE:
          </span>
          <span className="font-mono text-xl font-bold tracking-widest text-[#7cffb0]">
            {step.poBadge}
          </span>
        </div>
      )}

      {/* Options grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {step.options.map((opt) => {
          const isSelected = selectedOptionId === opt.id;
          const isTargetError = opt.isError;
          const isGuidedHint = mode === 'guided' && !isAnswered && isTargetError;

          let cardClass = 'bg-card border-ink text-ink hover:bg-concrete active:translate-y-0.5';

          if (isAnswered) {
            if (isSelected) {
              cardClass = isTargetError
                ? 'bg-ok border-ok text-white'
                : 'bg-no border-no text-white';
            } else if (isTargetError) {
              cardClass = 'bg-ok/20 border-ok text-ink ring-2 ring-ok';
            } else {
              cardClass = 'bg-card/60 opacity-60';
            }
          } else if (isGuidedHint) {
            cardClass = 'border-act ring-4 ring-act/40 animate-pulse';
          }

          return (
            <button
              key={opt.id}
              type="button"
              disabled={isAnswered}
              onClick={() => onSelect(opt)}
              className={`flex flex-col items-center justify-center p-4 min-h-[96px] rounded-xl border-3 font-bold text-center transition-all shadow-sm ${cardClass}`}
            >
              {opt.icon && <span className="text-4xl mb-2">{opt.icon}</span>}
              <span className="text-lg sm:text-xl font-heading tracking-wide">
                {opt.label[lang]}
              </span>
              {isAnswered && isSelected && (
                <span className="mt-1 text-sm font-bold">
                  {isTargetError ? 'Discrepancy Found ✅' : 'Valid Item ❌'}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
