import { useState, useMemo } from 'react';
import type { SequenceStepData, SequenceItem } from '../content/schema';
import type { LanguageCode, TrainingMode, StepResult } from '../engine/types';

interface SequenceStepProps {
  step: SequenceStepData;
  lang: LanguageCode;
  mode: TrainingMode;
  isAnswered: boolean;
  onResult: (result: StepResult) => void;
}

export function SequenceStep({
  step,
  lang,
  mode,
  isAnswered,
  onResult
}: SequenceStepProps) {
  // Ordered array of placed item IDs
  const [placedIds, setPlacedIds] = useState<string[]>([]);

  // Shuffle initial pool of available items
  const initialPool = useMemo(() => {
    return [...step.items].sort(() => 0.5 - Math.random());
  }, [step.id]);

  const availableItems = initialPool.filter((item) => !placedIds.includes(item.id));
  const isAllPlaced = placedIds.length === step.items.length;

  const handleAddItem = (item: SequenceItem) => {
    if (isAnswered) return;
    setPlacedIds((prev) => [...prev, item.id]);
  };

  const handleRemoveItem = (itemId: string) => {
    if (isAnswered) return;
    setPlacedIds((prev) => prev.filter((id) => id !== itemId));
  };

  const handleCheck = () => {
    if (isAnswered || !isAllPlaced) return;
    // Check if placedIds strictly match step.items order
    const isCorrect = placedIds.every((id, idx) => id === step.items[idx].id);
    onResult({ ok: isCorrect, meta: { placedIds } });
  };

  // Next required item in guided mode
  const nextTargetItem = mode === 'guided' && placedIds.length < step.items.length
    ? step.items[placedIds.length]
    : null;

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Placed Sequence Slots */}
      <div className="flex flex-col gap-2.5">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-ink/70">
          PLACED SEQUENCE ({placedIds.length} / {step.items.length}) — TAP TO REMOVE:
        </span>
        <div className="grid gap-2">
          {placedIds.length === 0 ? (
            <div className="p-4 border-2 border-dashed border-ink/40 rounded-xl text-center text-ink/60 font-medium">
              Tap steps from the pool below to arrange in chronological order
            </div>
          ) : (
            placedIds.map((id, index) => {
              const item = step.items.find((i) => i.id === id);
              if (!item) return null;

              return (
                <button
                  key={id}
                  type="button"
                  disabled={isAnswered}
                  onClick={() => handleRemoveItem(id)}
                  className="flex items-center gap-3 p-3 bg-card border-3 border-ink rounded-xl font-bold text-left hover:bg-no/10 active:scale-[0.99] transition-all shadow-sm"
                >
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-ink text-white text-sm font-heading shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-sm sm:text-base text-ink flex-1">
                    {item.text[lang]}
                  </span>
                  {!isAnswered && (
                    <span className="text-xs text-no font-bold shrink-0">✕ Remove</span>
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Available Items Pool */}
      {availableItems.length > 0 && (
        <div className="flex flex-col gap-2 mt-1">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-ink/70">
            AVAILABLE STEPS — TAP TO ADD:
          </span>
          <div className="grid gap-2">
            {availableItems.map((item) => {
              const isNextGuided = nextTargetItem?.id === item.id;
              let itemClass = 'bg-concrete/60 border-ink text-ink hover:bg-card active:translate-y-0.5';

              if (isNextGuided) {
                itemClass = 'bg-card border-act ring-4 ring-act/40 animate-pulse';
              }

              return (
                <button
                  key={item.id}
                  type="button"
                  disabled={isAnswered}
                  onClick={() => handleAddItem(item)}
                  className={`flex items-center gap-3 p-3.5 rounded-xl border-3 font-bold text-left transition-all shadow-sm min-h-[58px] ${itemClass}`}
                >
                  <span className="text-act font-bold text-lg shrink-0">➕</span>
                  <span className="text-sm sm:text-base flex-1">
                    {item.text[lang]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Check Order Button */}
      {isAllPlaced && !isAnswered && (
        <button
          type="button"
          onClick={handleCheck}
          className="mt-2 min-h-[64px] bg-act text-ink border-3 border-ink rounded-xl font-heading font-extrabold text-2xl tracking-wide uppercase hover:brightness-105 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2"
        >
          <span>✓ Verify Sequence</span>
        </button>
      )}
    </div>
  );
}
