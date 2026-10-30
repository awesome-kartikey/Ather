import { useState } from 'react';
import type { HotspotStepData, HotspotTarget } from '../content/schema';
import type { LanguageCode } from '../engine/types';
import { CheckCircle2, XCircle, MapPin } from 'lucide-react';
import { TactileButton } from '../components/TactileButton';

interface HotspotStepProps {
  step: HotspotStepData;
  lang: LanguageCode;
  isAnswered: boolean;
  onSelectTarget: (target: HotspotTarget) => void;
}

export function HotspotStep({ step, lang, isAnswered, onSelectTarget }: HotspotStepProps) {
  const [selectedTargetId, setSelectedTargetId] = useState<string | null>(null);

  const handleTargetClick = (target: HotspotTarget) => {
    if (isAnswered) return;
    setSelectedTargetId(target.id);
  };

  const handleConfirm = () => {
    if (!selectedTargetId || isAnswered) return;
    const target = step.targets.find((t) => t.id === selectedTargetId);
    if (target) {
      onSelectTarget(target);
    }
  };

  const selectedTarget = step.targets.find((t) => t.id === selectedTargetId);

  return (
    <div className="flex flex-col gap-4 w-full select-none">
      {/* SVG Interactive Warehouse Dock Map */}
      <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] bg-[#1a272e] rounded-2xl border-3 border-ink overflow-hidden shadow-[4px_4px_0px_#14232b]">
        {/* Background Plant Layout SVG */}
        <svg
          viewBox="0 0 1000 500"
          className="w-full h-full pointer-events-none"
          preserveAspectRatio="none"
        >
          {/* Floor grid styling */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#253842" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="1000" height="500" fill="#14232b" />
          <rect width="1000" height="500" fill="url(#grid)" opacity="0.6" />

          {/* Plant Building Boundaries */}
          <rect
            x="40"
            y="40"
            width="920"
            height="320"
            fill="#1d2e38"
            stroke="#3a5160"
            strokeWidth="3"
            rx="12"
          />

          {/* Zone Dividers */}
          <line
            x1="360"
            y1="40"
            x2="360"
            y2="360"
            stroke="#ee6a1f"
            strokeWidth="2"
            strokeDasharray="6 6"
          />
          <line
            x1="700"
            y1="40"
            x2="700"
            y2="360"
            stroke="#ee6a1f"
            strokeWidth="2"
            strokeDasharray="6 6"
          />

          {/* Zone Labels */}
          <text x="70" y="75" fill="#dfe5e8" fontFamily="sans-serif" fontSize="16" fontWeight="bold">
            BAY A: BATTERY STANDARD ROOM (20-25°C)
          </text>
          <text x="390" y="75" fill="#ee6a1f" fontFamily="sans-serif" fontSize="16" fontWeight="bold">
            BAY B: INBOUND VEHICLE & PACKAGING
          </text>
          <text x="730" y="75" fill="#dfe5e8" fontFamily="sans-serif" fontSize="16" fontWeight="bold">
            BAY C: HAZCHEM & THINNERS
          </text>

          {/* Yard & Road Flow */}
          <rect x="40" y="400" width="920" height="70" fill="#253842" rx="8" />
          <text x="60" y="440" fill="#9baec0" fontFamily="monospace" fontSize="14" fontWeight="bold">
            TRUCK WAITING YARD & ENTRY ROADWAY → DRIVER DASHBOARD TV DISPLAY
          </text>
        </svg>

        {/* Interactive Hotspot Targets */}
        {step.targets.map((target) => {
          const isSelected = selectedTargetId === target.id;
          let zoneClasses =
            'border-2 border-act/60 bg-act/10 hover:bg-act/25 text-card hover:scale-[1.02]';

          if (isAnswered) {
            if (target.correct) {
              zoneClasses =
                'border-3 border-ok bg-ok/40 text-card ring-4 ring-ok animate-pulse';
            } else if (isSelected && !target.correct) {
              zoneClasses = 'border-3 border-no bg-no/40 text-card ring-4 ring-no';
            } else {
              zoneClasses = 'border border-ink/40 bg-ink/40 opacity-40';
            }
          } else if (isSelected) {
            zoneClasses = 'border-3 border-act bg-act/35 text-card ring-4 ring-act scale-105';
          }

          return (
            <button
              key={target.id}
              type="button"
              disabled={isAnswered}
              onClick={() => handleTargetClick(target)}
              style={{
                left: `${target.x}%`,
                top: `${target.y}%`,
                width: `${target.width}%`,
                height: `${target.height}%`
              }}
              className={`absolute rounded-xl transition-all flex flex-col items-center justify-center p-2 text-center cursor-pointer shadow-lg ${zoneClasses}`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <MapPin className="w-5 h-5 text-act fill-act/20 shrink-0" />
                <span className="font-heading font-extrabold text-base sm:text-lg tracking-wide uppercase">
                  {target.id.replace('target_', '').replace('_', ' ')}
                </span>
              </div>

              {target.label && (
                <span className="font-body text-xs font-semibold leading-tight line-clamp-2">
                  {target.label[lang]}
                </span>
              )}

              {/* Status Icons upon answer */}
              {isAnswered && target.correct && (
                <CheckCircle2 className="w-6 h-6 text-ok mt-1" />
              )}
              {isAnswered && isSelected && !target.correct && (
                <XCircle className="w-6 h-6 text-no mt-1" />
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Dock Preview & Confirmation Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-card p-4 rounded-2xl border-3 border-ink shadow-[4px_4px_0px_#14232b]">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-concrete border-2 border-ink flex items-center justify-center font-heading font-black text-xl text-ink">
            {selectedTarget ? '📍' : '❓'}
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-extrabold text-base uppercase text-ink/70">
              Selected Inbound Dock:
            </span>
            <span className="font-heading font-black text-lg sm:text-xl text-ink">
              {selectedTarget?.label
                ? selectedTarget.label[lang]
                : 'Tap a dock on the layout above'}
            </span>
          </div>
        </div>

        {!isAnswered && (
          <TactileButton
            variant="primary"
            size="md"
            disabled={!selectedTargetId}
            onClick={handleConfirm}
            className="w-full sm:w-auto min-w-[200px]"
          >
            {lang === 'hi'
              ? 'डॉक आवंटन की पुष्टि करें'
              : lang === 'mr'
              ? 'डॉक वाटपाची पुष्टी करा'
              : 'CONFIRM DOCK ALLOCATION'}
          </TactileButton>
        )}
      </div>
    </div>
  );
}
