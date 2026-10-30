import { useState } from 'react';
import type { SpotErrorStepData, SpotErrorOption } from '../content/schema';
import type { LanguageCode } from '../engine/types';
import { ShieldAlert, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import { TactileButton } from '../components/TactileButton';

interface SpotErrorStepProps {
  step: SpotErrorStepData;
  lang: LanguageCode;
  isAnswered: boolean;
  onSelectOption: (option: SpotErrorOption) => void;
}

export function SpotErrorStep({ step, lang, isAnswered, onSelectOption }: SpotErrorStepProps) {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  const handleSelect = (opt: SpotErrorOption) => {
    if (isAnswered) return;
    setSelectedOptionId(opt.id);
  };

  const handleVerify = () => {
    if (!selectedOptionId || isAnswered) return;
    const opt = step.options.find((o) => o.id === selectedOptionId);
    if (opt) {
      onSelectOption(opt);
    }
  };

  return (
    <div className="flex flex-col gap-5 w-full select-none">
      {/* Context Badge & Safety Alert Header */}
      {step.contextDocument && (
        <div className="bg-act/10 border-2 border-act p-3.5 rounded-xl flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="w-6 h-6 text-act shrink-0" />
            <span className="font-heading font-extrabold text-sm sm:text-base text-ink">
              {step.contextDocument[lang]}
            </span>
          </div>
          {step.poBadge && (
            <span className="font-mono text-xs font-bold uppercase bg-card px-2.5 py-1 rounded border border-ink/40 text-ink whitespace-nowrap">
              {step.poBadge}
            </span>
          )}
        </div>
      )}

      {/* Industrial Visual Inspection Canvas (Dock 04 Truck Scene) */}
      <div className="relative w-full aspect-[16/8] sm:aspect-[21/9] bg-[#1a272e] rounded-2xl border-3 border-ink overflow-hidden shadow-[4px_4px_0px_#14232b]">
        <svg
          viewBox="0 0 1000 450"
          className="w-full h-full pointer-events-none"
          preserveAspectRatio="none"
        >
          {/* Concrete dock floor */}
          <rect width="1000" height="450" fill="#14232b" />
          <rect x="0" y="320" width="1000" height="130" fill="#253842" />

          {/* Yellow Safety Bay Hazard Striping */}
          <line
            x1="0"
            y1="320"
            x2="1000"
            y2="320"
            stroke="#ee6a1f"
            strokeWidth="10"
            strokeDasharray="25 15"
          />

          {/* Warehouse Dock Wall & Door */}
          <rect
            x="680"
            y="40"
            width="320"
            height="280"
            fill="#2d404d"
            stroke="#14232b"
            strokeWidth="4"
          />
          <rect
            x="720"
            y="80"
            width="280"
            height="240"
            fill="#10191e"
            stroke="#3a5160"
            strokeWidth="3"
          />
          <text
            x="760"
            y="70"
            fill="#ee6a1f"
            fontFamily="sans-serif"
            fontSize="18"
            fontWeight="bold"
          >
            INBOUND DOCK 04
          </text>

          {/* Rubber Bumpers at Dock */}
          <rect x="700" y="160" width="20" height="80" fill="#10191e" rx="4" />
          <rect x="700" y="260" width="20" height="60" fill="#10191e" rx="4" />

          {/* Delivery Truck Body */}
          <rect
            x="120"
            y="120"
            width="580"
            height="180"
            fill="#dfe5e8"
            stroke="#14232b"
            strokeWidth="4"
            rx="8"
          />
          <rect
            x="40"
            y="170"
            width="120"
            height="130"
            fill="#dfe5e8"
            stroke="#14232b"
            strokeWidth="4"
            rx="6"
          />
          {/* Truck windshield */}
          <polygon
            points="60,185 130,185 130,240 60,240"
            fill="#3a5160"
            stroke="#14232b"
            strokeWidth="2"
          />

          {/* Ather Truck Livery */}
          <text
            x="240"
            y="215"
            fill="#14232b"
            fontFamily="sans-serif"
            fontSize="30"
            fontWeight="900"
            letterSpacing="3"
          >
            ATHER LOGISTICS
          </text>
          <text
            x="240"
            y="245"
            fill="#ee6a1f"
            fontFamily="monospace"
            fontSize="14"
            fontWeight="bold"
          >
            AURIC PLANT INBOUND · MH-20-DE-4412
          </text>

          {/* Truck Wheels */}
          <circle cx="160" cy="330" r="38" fill="#14232b" stroke="#3a5160" strokeWidth="8" />
          <circle cx="160" cy="330" r="16" fill="#dfe5e8" />

          {/* REAR DOCK WHEELS (MISSING CHOCKS AREA) */}
          <circle cx="560" cy="330" r="42" fill="#14232b" stroke="#3a5160" strokeWidth="8" />
          <circle cx="560" cy="330" r="18" fill="#dfe5e8" />
          <circle cx="630" cy="330" r="42" fill="#14232b" stroke="#3a5160" strokeWidth="8" />
          <circle cx="630" cy="330" r="18" fill="#dfe5e8" />

          {/* Flashing Hazard ring around unchocked wheels */}
          <ellipse
            cx="595"
            cy="345"
            rx="95"
            ry="45"
            fill="none"
            stroke="#d23b30"
            strokeWidth="4"
            strokeDasharray="8 6"
          />
          <text
            x="510"
            y="410"
            fill="#d23b30"
            fontFamily="sans-serif"
            fontSize="14"
            fontWeight="bold"
          >
            ⚠️ WHEEL CHOCKS ABSENT!
          </text>
        </svg>

        {/* Visual Callout Marker */}
        <div className="absolute top-4 left-4 bg-ink/80 text-card text-xs font-mono px-3 py-1.5 rounded-lg border border-card/30 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-act animate-bounce" />
          <span>INSPECT TRUCK DOCK POSITIONING</span>
        </div>
      </div>

      {/* Safety Audit Observation Cards */}
      <div className="grid grid-cols-1 gap-3.5">
        {step.options.map((opt) => {
          const isSelected = selectedOptionId === opt.id;
          let cardStyle =
            'bg-card text-ink border-3 border-ink shadow-[4px_4px_0px_#14232b] hover:bg-concrete/40';

          if (isAnswered) {
            if (opt.isError) {
              // The error option was the correct thing to spot!
              cardStyle =
                'bg-ok/15 text-ink border-3 border-ok shadow-[4px_4px_0px_#1f8a4c] ring-3 ring-ok';
            } else if (isSelected && !opt.isError) {
              cardStyle =
                'bg-no/15 text-ink border-3 border-no shadow-[4px_4px_0px_#d23b30] ring-3 ring-no';
            } else {
              cardStyle = 'opacity-50 bg-concrete/40 border-2 border-ink/30 shadow-none';
            }
          } else if (isSelected) {
            cardStyle =
              'bg-act/15 text-ink border-3 border-act shadow-[4px_4px_0px_#ee6a1f] ring-3 ring-act scale-[1.01]';
          }

          return (
            <button
              key={opt.id}
              type="button"
              disabled={isAnswered}
              onClick={() => handleSelect(opt)}
              className={`min-h-[72px] p-4 rounded-2xl flex items-center justify-between gap-4 text-left transition-all cursor-pointer ${cardStyle}`}
            >
              <div className="flex items-center gap-3.5 flex-1">
                <div
                  className={`w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    isSelected ? 'border-act bg-act text-card' : 'border-ink/60 bg-concrete/50'
                  }`}
                >
                  {isSelected && <span className="w-2.5 h-2.5 rounded-full bg-card" />}
                </div>

                <span className="font-heading font-extrabold text-lg sm:text-xl leading-snug">
                  {opt.label[lang]}
                </span>
              </div>

              {isAnswered && opt.isError && (
                <div className="flex items-center gap-1.5 text-ok font-heading font-black text-sm uppercase shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-ok" />
                  <span>HAZARD IDENTIFIED</span>
                </div>
              )}
              {isAnswered && isSelected && !opt.isError && (
                <div className="flex items-center gap-1.5 text-no font-heading font-black text-sm uppercase shrink-0">
                  <XCircle className="w-6 h-6 text-no" />
                  <span>NOT A HAZARD</span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Verify Button */}
      {!isAnswered && (
        <div className="flex justify-end pt-2">
          <TactileButton
            variant="danger"
            size="lg"
            disabled={!selectedOptionId}
            onClick={handleVerify}
            className="w-full sm:w-auto min-w-[240px]"
          >
            <ShieldAlert className="w-6 h-6 mr-1" />
            {lang === 'hi'
              ? 'सुरक्षा उल्लंघन दर्ज करें'
              : lang === 'mr'
              ? 'सुरक्षा उल्लंघन नोंदवा'
              : 'REPORT SAFETY VIOLATION'}
          </TactileButton>
        </div>
      )}
    </div>
  );
}
