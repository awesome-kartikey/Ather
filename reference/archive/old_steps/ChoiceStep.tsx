import { useState } from 'react';
import type { ChoiceStepData, ChoiceOption } from '../content/schema';
import type { LanguageCode } from '../engine/types';
import { CheckCircle2, XCircle } from 'lucide-react';
import { TactileButton } from '../components/TactileButton';

interface ChoiceStepProps {
  step: ChoiceStepData;
  lang: LanguageCode;
  isAnswered: boolean;
  onSelectOption: (option: ChoiceOption) => void;
}

export function ChoiceStep({ step, lang, isAnswered, onSelectOption }: ChoiceStepProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (opt: ChoiceOption) => {
    if (isAnswered) return;
    setSelectedId(opt.id);
  };

  const handleVerify = () => {
    if (!selectedId || isAnswered) return;
    const opt = step.options.find((o) => o.id === selectedId);
    if (opt) {
      onSelectOption(opt);
    }
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="grid grid-cols-1 gap-3.5">
        {step.options.map((opt) => {
          const isSelected = selectedId === opt.id;
          let cardStyle =
            'bg-card text-ink border-3 border-ink shadow-[4px_4px_0px_#14232b] hover:bg-concrete/30';

          if (isAnswered) {
            if (opt.correct) {
              cardStyle =
                'bg-ok/15 text-ink border-3 border-ok shadow-[4px_4px_0px_#1f8a4c] ring-2 ring-ok';
            } else if (isSelected && !opt.correct) {
              cardStyle =
                'bg-no/15 text-ink border-3 border-no shadow-[4px_4px_0px_#d23b30] ring-2 ring-no';
            } else {
              cardStyle = 'bg-concrete/40 text-ink/50 border-2 border-ink/30 shadow-none opacity-60';
            }
          } else if (isSelected) {
            cardStyle =
              'bg-act/15 text-ink border-3 border-act shadow-[4px_4px_0px_#ee6a1f] ring-2 ring-act';
          }

          return (
            <button
              key={opt.id}
              type="button"
              disabled={isAnswered}
              onClick={() => handleSelect(opt)}
              className={`min-h-[72px] p-4 rounded-2xl flex items-center justify-between gap-4 text-left transition-all cursor-pointer active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#14232b] ${cardStyle}`}
            >
              <div className="flex items-center gap-3.5 flex-1">
                {/* Radio Indicator */}
                <div
                  className={`w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    isSelected ? 'border-act bg-act text-card' : 'border-ink/60 bg-concrete/50'
                  }`}
                >
                  {isSelected && <span className="w-2.5 h-2.5 rounded-full bg-card" />}
                </div>

                {opt.icon && <span className="text-2xl shrink-0">{opt.icon}</span>}

                <span className="font-heading font-bold text-lg sm:text-xl leading-snug">
                  {opt.label[lang]}
                </span>
              </div>

              {/* Status Indicator after answer */}
              {isAnswered && opt.correct && (
                <CheckCircle2 className="w-7 h-7 text-ok shrink-0 animate-bounce" />
              )}
              {isAnswered && isSelected && !opt.correct && (
                <XCircle className="w-7 h-7 text-no shrink-0 animate-shake" />
              )}
            </button>
          );
        })}
      </div>

      {!isAnswered && (
        <div className="flex justify-end pt-2">
          <TactileButton
            variant="primary"
            size="lg"
            disabled={!selectedId}
            onClick={handleVerify}
            className="w-full sm:w-auto min-w-[220px]"
          >
            {lang === 'hi'
              ? 'सत्यापित करें (CONFIRM)'
              : lang === 'mr'
              ? 'पुष्टी करा (CONFIRM)'
              : 'CONFIRM SELECTION'}
          </TactileButton>
        </div>
      )}
    </div>
  );
}
