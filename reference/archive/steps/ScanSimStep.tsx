import type { ScanSimStepData, BarcodeOption } from '../content/schema';
import type { LanguageCode, TrainingMode } from '../engine/types';

interface ScanSimStepProps {
  step: ScanSimStepData;
  lang: LanguageCode;
  mode: TrainingMode;
  isAnswered: boolean;
  selectedOptionId: string | null;
  onSelect: (option: BarcodeOption) => void;
}

export function ScanSimStep({
  step,
  mode,
  isAnswered,
  selectedOptionId,
  onSelect
}: ScanSimStepProps) {
  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Handheld Gun Scanner Display HUD */}
      <div className="flex flex-col items-center justify-center p-4 bg-ink text-white rounded-xl border-3 border-ink shadow-md relative overflow-hidden">
        {/* Simulated Red Laser Line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-no shadow-[0_0_12px_#d23b30] animate-pulse" />

        <span className="text-xs font-mono uppercase tracking-widest text-[#7cffb0] mb-1 z-10">
          SCANNER READOUT TARGET
        </span>
        <span className="font-mono text-3xl sm:text-4xl font-extrabold tracking-widest text-[#7cffb0] z-10 bg-black/40 px-6 py-1.5 rounded-lg border border-[#7cffb0]/40">
          {step.expectedCode}
        </span>
      </div>

      {/* Barcode choices */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {step.options.map((opt) => {
          const isSelected = selectedOptionId === opt.id;
          const isCorrect = opt.correct;
          const isGuidedHint = mode === 'guided' && !isAnswered && isCorrect;

          let cardClass = 'bg-card border-ink text-ink hover:bg-concrete active:translate-y-0.5';

          if (isAnswered) {
            if (isSelected) {
              cardClass = isCorrect
                ? 'bg-ok border-ok text-white'
                : 'bg-no border-no text-white';
            } else if (isCorrect) {
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
              className={`flex flex-col items-center justify-center p-4 min-h-[100px] rounded-xl border-3 font-bold text-center transition-all shadow-sm ${cardClass}`}
            >
              {/* Visual Barcode Graphic */}
              <div
                className={`w-28 h-10 mb-2 barcode-pattern rounded-sm ${
                  isAnswered && isSelected ? 'invert' : ''
                }`}
              />
              <span className="font-mono text-xl sm:text-2xl tracking-wider">
                {opt.code}
              </span>
              {isAnswered && isSelected && (
                <span className="mt-1 text-xs uppercase tracking-widest font-bold">
                  {isCorrect ? 'MATCH ✅' : 'MISMATCH ❌'}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
