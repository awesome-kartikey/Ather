import { useMemo } from 'react';
import type { ChoiceStepData, ChoiceOption } from '../content/schema';
import type { LanguageCode, TrainingMode } from '../engine/types';

interface ChoiceStepProps {
  step: ChoiceStepData;
  lang: LanguageCode;
  mode: TrainingMode;
  isAnswered: boolean;
  selectedOptionId: string | null;
  onSelect: (option: ChoiceOption) => void;
}

export function ChoiceStep({
  step,
  lang,
  mode,
  isAnswered,
  selectedOptionId,
  onSelect
}: ChoiceStepProps) {
  // Shuffle options consistently for each attempt
  const shuffledOptions = useMemo(() => {
    return [...step.options].sort(() => 0.5 - Math.random());
  }, [step.id]);

  return (
    <div className={`grid gap-4 w-full ${step.layout === 'grid' ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
      {shuffledOptions.map((opt) => {
        const isSelected = selectedOptionId === opt.id;
        const isCorrect = opt.correct;
        const isGuidedHint = mode === 'guided' && !isAnswered && isCorrect;

        let statusClasses = 'bg-card border-ink text-ink hover:bg-concrete/40 active:translate-y-0.5';

        if (isAnswered) {
          if (isSelected) {
            statusClasses = isCorrect
              ? 'bg-ok border-ok text-white'
              : 'bg-no border-no text-white';
          } else if (isCorrect) {
            // Reveal correct answer if user got it wrong
            statusClasses = 'bg-ok/20 border-ok text-ink ring-2 ring-ok';
          } else {
            statusClasses = 'bg-card/60 border-ink/40 text-ink/60 opacity-60';
          }
        } else if (isGuidedHint) {
          statusClasses = 'bg-card border-act ring-4 ring-act/40 animate-pulse';
        }

        return (
          <button
            key={opt.id}
            type="button"
            disabled={isAnswered}
            onClick={() => onSelect(opt)}
            className={`flex items-center gap-4 min-h-[68px] p-4 rounded-xl border-3 font-bold text-lg sm:text-xl transition-all shadow-sm ${statusClasses}`}
          >
            {opt.icon && (
              <span className="text-3xl sm:text-4xl shrink-0 flex items-center justify-center w-12 h-12">
                {opt.icon}
                {opt.damaged && <b className="absolute -top-1 -right-1 text-sm">💥</b>}
              </span>
            )}
            <span className="text-left flex-1 leading-snug">
              {opt.label[lang]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
