import type { HotspotStepData, HotspotTarget } from '../content/schema';
import type { LanguageCode, TrainingMode } from '../engine/types';

interface HotspotStepProps {
  step: HotspotStepData;
  lang: LanguageCode;
  mode: TrainingMode;
  isAnswered: boolean;
  selectedTargetId: string | null;
  onSelect: (target: HotspotTarget) => void;
}

export function HotspotStep({
  step,
  lang,
  mode,
  isAnswered,
  selectedTargetId,
  onSelect
}: HotspotStepProps) {
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="relative w-full aspect-[16/9] max-h-[320px] bg-card rounded-xl border-3 border-ink overflow-hidden p-2 flex items-center justify-center shadow-md">
        {/* Render Vector Scene based on step image ID */}
        {step.image === 'damaged-boxes-scene' ? (
          <svg viewBox="0 0 600 300" className="w-full h-full block">
            {/* Ground line */}
            <rect x="0" y="270" width="600" height="30" fill="var(--wood)" opacity="0.3" />

            {/* Box A */}
            <g>
              <rect x="40" y="80" width="150" height="180" rx="8" className="fw si" />
              <text x="115" y="170" fontSize="32" fontWeight="bold" textAnchor="middle" className="fi">
                BOX A
              </text>
              <rect x="75" y="190" width="80" height="40" rx="4" className="fc" />
              <text x="115" y="218" fontSize="18" textAnchor="middle" className="fi">
                ATH-0417
              </text>
            </g>

            {/* Box B */}
            <g>
              <rect x="225" y="80" width="150" height="180" rx="8" className="fw si" />
              <text x="300" y="170" fontSize="32" fontWeight="bold" textAnchor="middle" className="fi">
                BOX B
              </text>
              <rect x="260" y="190" width="80" height="40" rx="4" className="fc" />
              <text x="300" y="218" fontSize="18" textAnchor="middle" className="fi">
                ATH-0417
              </text>
            </g>

            {/* Box C (Crushed & Punctured) */}
            <g>
              <path
                d="M410 110 L540 85 L565 240 L540 260 L410 255 Z"
                className="si"
                fill="var(--wood)"
              />
              <path
                d="M450 140 L490 120 L480 180 L440 160 Z"
                fill="var(--ink)"
              />
              <text x="485" y="210" fontSize="30" fontWeight="bold" textAnchor="middle" fill="#fff">
                BOX C 💥
              </text>
              <text x="485" y="240" fontSize="18" fontWeight="bold" textAnchor="middle" fill="#d23b30">
                CRUSHED
              </text>
            </g>
          </svg>
        ) : step.image === 'pallet-labels-scene' ? (
          <svg viewBox="0 0 600 300" className="w-full h-full block">
            <rect x="0" y="270" width="600" height="30" fill="var(--wood)" opacity="0.3" />

            {/* Pallet 1 (With Barcode Label) */}
            <g>
              <rect x="35" y="90" width="160" height="150" rx="6" className="fw si" />
              <rect x="25" y="240" width="180" height="25" rx="3" className="fw si" />
              <rect x="75" y="130" width="80" height="50" rx="4" className="fc si" />
              <text x="115" y="160" fontSize="16" fontWeight="bold" textAnchor="middle" className="fi">
                🏷️ PALLET 1
              </text>
            </g>

            {/* Pallet 2 (MISSING LABEL) */}
            <g>
              <rect x="220" y="90" width="160" height="150" rx="6" className="fw si" />
              <rect x="210" y="240" width="180" height="25" rx="3" className="fw si" />
              <text x="300" y="170" fontSize="24" fontWeight="bold" textAnchor="middle" className="fn">
                PALLET 2
              </text>
              <text x="300" y="200" fontSize="16" fontWeight="bold" textAnchor="middle" className="fn">
                [ NO LABEL ]
              </text>
            </g>

            {/* Pallet 3 (With Barcode Label) */}
            <g>
              <rect x="405" y="90" width="160" height="150" rx="6" className="fw si" />
              <rect x="395" y="240" width="180" height="25" rx="3" className="fw si" />
              <rect x="445" y="130" width="80" height="50" rx="4" className="fc si" />
              <text x="485" y="160" fontSize="16" fontWeight="bold" textAnchor="middle" className="fi">
                🏷️ PALLET 3
              </text>
            </g>
          </svg>
        ) : (
          <div className="w-full h-full flex items-center justify-center font-heading text-2xl text-ink">
            Factory Floor Inspection View
          </div>
        )}

        {/* Clickable Percentage Hotspot Overlays */}
        {step.targets.map((target) => {
          const isSelected = selectedTargetId === target.id;
          const isCorrect = target.correct;
          const isGuidedHint = mode === 'guided' && !isAnswered && isCorrect;

          let targetBorderClass = 'border-2 border-transparent hover:border-act/60 hover:bg-act/10 cursor-pointer';

          if (isAnswered) {
            if (isSelected) {
              targetBorderClass = isCorrect
                ? 'border-4 border-ok bg-ok/30 ring-4 ring-ok'
                : 'border-4 border-no bg-no/30 ring-4 ring-no';
            } else if (isCorrect) {
              targetBorderClass = 'border-4 border-ok bg-ok/20 ring-4 ring-ok';
            }
          } else if (isGuidedHint) {
            targetBorderClass = 'border-4 border-act bg-act/20 ring-4 ring-act/50 animate-pulse';
          }

          return (
            <button
              key={target.id}
              type="button"
              disabled={isAnswered}
              onClick={() => onSelect(target)}
              style={{
                left: `${target.x}%`,
                top: `${target.y}%`,
                width: `${target.width}%`,
                height: `${target.height}%`
              }}
              className={`absolute rounded-xl transition-all flex items-center justify-center font-bold text-base ${targetBorderClass}`}
            >
              {isAnswered && isSelected && (
                <span className="text-3xl filter drop-shadow">
                  {isCorrect ? '✅' : '❌'}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Accessible button pills beneath image for glove-friendly tap backup */}
      <div className="grid grid-cols-3 gap-3">
        {step.targets.map((target) => {
          const isSelected = selectedTargetId === target.id;
          const isCorrect = target.correct;
          const isGuidedHint = mode === 'guided' && !isAnswered && isCorrect;

          let btnClass = 'bg-card border-ink text-ink hover:bg-concrete active:translate-y-0.5';
          if (isAnswered) {
            if (isSelected) {
              btnClass = isCorrect ? 'bg-ok border-ok text-white' : 'bg-no border-no text-white';
            } else if (isCorrect) {
              btnClass = 'bg-ok/20 border-ok text-ink ring-2 ring-ok';
            } else {
              btnClass = 'bg-card/60 opacity-60';
            }
          } else if (isGuidedHint) {
            btnClass = 'border-act ring-4 ring-act/40 animate-pulse';
          }

          return (
            <button
              key={`pill-${target.id}`}
              type="button"
              disabled={isAnswered}
              onClick={() => onSelect(target)}
              className={`min-h-[64px] p-2 rounded-xl border-3 font-bold text-center text-base sm:text-lg transition-all shadow-sm flex items-center justify-center ${btnClass}`}
            >
              {target.label ? target.label[lang] : target.id}
            </button>
          );
        })}
      </div>
    </div>
  );
}
