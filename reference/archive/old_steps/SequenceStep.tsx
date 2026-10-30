import { useState, useEffect } from 'react';
import type { SequenceStepData, SequenceItem } from '../content/schema';
import type { LanguageCode } from '../engine/types';
import { ArrowUp, ArrowDown, CheckCircle2, XCircle } from 'lucide-react';
import { TactileButton } from '../components/TactileButton';

interface SequenceStepProps {
  step: SequenceStepData;
  lang: LanguageCode;
  isAnswered: boolean;
  onComplete: (correct: boolean) => void;
}

export function SequenceStep({ step, lang, isAnswered, onComplete }: SequenceStepProps) {
  // Shuffle items initially
  const [orderedItems, setOrderedItems] = useState<SequenceItem[]>(() => {
    return [...step.items].sort(() => Math.random() - 0.5);
  });

  useEffect(() => {
    setOrderedItems([...step.items].sort(() => Math.random() - 0.5));
  }, [step.id]);

  const moveItem = (index: number, direction: 'up' | 'down') => {
    if (isAnswered) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= orderedItems.length) return;

    const next = [...orderedItems];
    const temp = next[index];
    next[index] = next[targetIndex];
    next[targetIndex] = temp;
    setOrderedItems(next);
  };

  const handleVerify = () => {
    if (isAnswered) return;
    const isCorrect = orderedItems.every((item, i) => item.id === step.items[i].id);
    onComplete(isCorrect);
  };

  return (
    <div className="flex flex-col gap-4 w-full select-none">
      <div className="text-xs sm:text-sm font-semibold text-ink/75 bg-concrete/60 p-3 rounded-xl border-2 border-ink/30">
        {lang === 'hi'
          ? 'पायदानों को सही कालानुक्रमिक क्रम में व्यवस्थित करने के लिए तीर बटनों का उपयोग करें:'
          : lang === 'mr'
          ? 'पायऱ्या योग्य कालक्रमानुसार लावण्यासाठी बाण बटणांचा वापर करा:'
          : 'Use the up/down arrows to arrange the process steps in correct chronological order:'}
      </div>

      <div className="flex flex-col gap-3">
        {orderedItems.map((item, index) => {
          const isCorrectPosition = item.id === step.items[index]?.id;
          let cardStyle =
            'bg-card text-ink border-3 border-ink shadow-[4px_4px_0px_#14232b]';

          if (isAnswered) {
            cardStyle = isCorrectPosition
              ? 'bg-ok/15 border-3 border-ok text-ink ring-2 ring-ok'
              : 'bg-no/15 border-3 border-no text-ink ring-2 ring-no';
          }

          return (
            <div
              key={item.id}
              className={`min-h-[64px] p-3.5 rounded-2xl flex items-center justify-between gap-3 transition-all ${cardStyle}`}
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-concrete border-2 border-ink flex items-center justify-center font-heading font-black text-sm shrink-0">
                  {index + 1}
                </span>
                <span className="font-heading font-extrabold text-base sm:text-lg leading-snug">
                  {item.text[lang]}
                </span>
              </div>

              {!isAnswered ? (
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => moveItem(index, 'up')}
                    className="w-10 h-10 rounded-xl bg-concrete hover:bg-card border-2 border-ink flex items-center justify-center disabled:opacity-30 disabled:pointer-events-none cursor-pointer active:translate-y-[1px]"
                  >
                    <ArrowUp className="w-5 h-5 text-ink" />
                  </button>
                  <button
                    type="button"
                    disabled={index === orderedItems.length - 1}
                    onClick={() => moveItem(index, 'down')}
                    className="w-10 h-10 rounded-xl bg-concrete hover:bg-card border-2 border-ink flex items-center justify-center disabled:opacity-30 disabled:pointer-events-none cursor-pointer active:translate-y-[1px]"
                  >
                    <ArrowDown className="w-5 h-5 text-ink" />
                  </button>
                </div>
              ) : isCorrectPosition ? (
                <CheckCircle2 className="w-6 h-6 text-ok shrink-0" />
              ) : (
                <XCircle className="w-6 h-6 text-no shrink-0" />
              )}
            </div>
          );
        })}
      </div>

      {!isAnswered && (
        <div className="flex justify-end pt-2">
          <TactileButton
            variant="primary"
            size="lg"
            onClick={handleVerify}
            className="w-full sm:w-auto min-w-[220px]"
          >
            {lang === 'hi'
              ? 'अनुक्रम सत्यापित करें'
              : lang === 'mr'
              ? 'क्रम तपासा'
              : 'VERIFY SEQUENCE'}
          </TactileButton>
        </div>
      )}
    </div>
  );
}
