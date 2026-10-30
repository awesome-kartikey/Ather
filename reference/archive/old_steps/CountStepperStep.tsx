import { useState } from 'react';
import type { CountStepperStepData } from '../content/schema';
import type { LanguageCode } from '../engine/types';
import { Minus, Plus, CheckCircle2, XCircle } from 'lucide-react';
import { TactileButton } from '../components/TactileButton';

interface CountStepperStepProps {
  step: CountStepperStepData;
  lang: LanguageCode;
  isAnswered: boolean;
  onComplete: (correct: boolean) => void;
}

export function CountStepperStep({ step, lang, isAnswered, onComplete }: CountStepperStepProps) {
  const [count, setCount] = useState<number>(0);

  const increment = () => {
    if (isAnswered) return;
    setCount((prev) => prev + 1);
  };

  const decrement = () => {
    if (isAnswered || count <= 0) return;
    setCount((prev) => prev - 1);
  };

  const handleVerify = () => {
    if (isAnswered) return;
    onComplete(count === step.actualCount);
  };

  const isCorrect = count === step.actualCount;

  return (
    <div className="flex flex-col items-center gap-6 w-full select-none">
      {/* Visual Parts / Challan Reference */}
      <div className="bg-card p-6 rounded-2xl border-3 border-ink shadow-[4px_4px_0px_#14232b] w-full flex flex-col items-center gap-4 text-center">
        <span className="text-6xl">{step.pileItemIcon || '📦'}</span>

        {step.challanCount !== undefined && (
          <div className="flex items-center gap-2 bg-concrete px-4 py-2 rounded-xl border-2 border-ink">
            <span className="font-heading font-extrabold text-sm uppercase text-ink/70">
              Challan Document Quantity:
            </span>
            <span className="font-mono font-black text-xl text-act">{step.challanCount}</span>
          </div>
        )}

        <p className="font-heading font-extrabold text-lg sm:text-xl text-ink">
          {lang === 'hi'
            ? 'नीचे दिए गए बटनों से सही मात्रा दर्ज करें:'
            : lang === 'mr'
            ? 'खालील बटणे वापरून अचूक संख्या प्रविष्ट करा:'
            : 'Enter the exact verified floor quantity below:'}
        </p>
      </div>

      {/* Industrial Counting Interface */}
      <div className="flex items-center justify-center gap-6">
        {/* Decrement Button */}
        <button
          type="button"
          disabled={isAnswered || count <= 0}
          onClick={decrement}
          aria-label="Decrease quantity"
          className="w-20 h-20 rounded-2xl bg-card border-3 border-ink flex items-center justify-center text-ink shadow-[4px_4px_0px_#14232b] hover:bg-concrete active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
        >
          <Minus className="w-8 h-8 stroke-[3]" />
        </button>

        {/* Digital 7-segment style LCD readout */}
        <div className="min-w-[140px] h-24 px-6 bg-[#14232b] rounded-2xl border-3 border-ink flex items-center justify-center shadow-[inset_0_4px_8px_rgba(0,0,0,0.5)]">
          <span className="font-mono text-5xl font-black text-act tracking-widest tabular-nums">
            {count.toString().padStart(2, '0')}
          </span>
        </div>

        {/* Increment Button */}
        <button
          type="button"
          disabled={isAnswered}
          onClick={increment}
          aria-label="Increase quantity"
          className="w-20 h-20 rounded-2xl bg-card border-3 border-ink flex items-center justify-center text-ink shadow-[4px_4px_0px_#14232b] hover:bg-concrete active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
        >
          <Plus className="w-8 h-8 stroke-[3]" />
        </button>
      </div>

      {/* Answer verification banner */}
      {isAnswered && (
        <div
          className={`p-4 rounded-xl border-3 flex items-center gap-3 font-heading font-black text-lg ${
            isCorrect
              ? 'bg-ok/20 border-ok text-ok'
              : 'bg-no/20 border-no text-no'
          }`}
        >
          {isCorrect ? (
            <>
              <CheckCircle2 className="w-6 h-6 shrink-0" />
              <span>EXACT COUNT VERIFIED ({step.actualCount})</span>
            </>
          ) : (
            <>
              <XCircle className="w-6 h-6 shrink-0" />
              <span>COUNT MISMATCH: Expected {step.actualCount}, entered {count}</span>
            </>
          )}
        </div>
      )}

      {/* Verify Button */}
      {!isAnswered && (
        <div className="flex justify-center pt-2 w-full max-w-xs">
          <TactileButton
            variant="primary"
            size="lg"
            onClick={handleVerify}
            className="w-full"
          >
            {lang === 'hi'
              ? 'मात्रा सत्यापित करें'
              : lang === 'mr'
              ? 'संख्या तपासा'
              : 'VERIFY QUANTITY'}
          </TactileButton>
        </div>
      )}
    </div>
  );
}
