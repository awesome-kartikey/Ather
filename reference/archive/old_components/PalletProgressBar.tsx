import { ShieldAlert, Heart, Flame } from 'lucide-react';
import type { TrainingMode } from '../engine/types';

interface PalletProgressBarProps {
  currentIndex: number;
  totalSteps: number;
  stepSafetyFlags: boolean[];
  lives: number;
  combo: number;
  mode: TrainingMode;
}

export function PalletProgressBar({
  currentIndex,
  totalSteps,
  stepSafetyFlags,
  lives,
  combo,
  mode
}: PalletProgressBarProps) {
  return (
    <div className="w-full bg-card border-3 border-ink rounded-2xl p-3 sm:p-4 shadow-[4px_4px_0px_#14232b] flex flex-wrap items-center justify-between gap-4 select-none">
      {/* Left: Conveyor Step Indicator */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-1 scrollbar-none flex-1 min-w-[280px]">
        {Array.from({ length: totalSteps }).map((_, i) => {
          const isDone = i < currentIndex;
          const isCurrent = i === currentIndex;
          const isSafety = stepSafetyFlags[i];

          let stateClasses = 'bg-concrete/70 border-ink/40 text-ink/50';
          if (isDone) {
            stateClasses = 'bg-ok text-card border-ink shadow-[2px_2px_0px_#14232b]';
          } else if (isCurrent) {
            stateClasses =
              'bg-act text-card border-ink shadow-[3px_3px_0px_#14232b] scale-105 ring-2 ring-act/30';
          }

          return (
            <div
              key={i}
              className={`relative flex items-center justify-center font-heading font-black text-sm sm:text-base border-2 rounded-xl transition-all w-10 sm:w-12 h-10 sm:h-12 shrink-0 ${stateClasses}`}
            >
              {isDone ? '✓' : i + 1}

              {/* Safety Badge on the step */}
              {isSafety && (
                <div
                  title="Safety Critical Step"
                  className="absolute -top-2 -right-2 bg-no text-card p-0.5 rounded-full border border-ink shadow-sm"
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Right: Operational HUD Badges (Lives & Combo) */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Practice Mode: Lives Hearts */}
        {mode === 'practice' && (
          <div className="flex items-center gap-1.5 bg-concrete px-3 py-1.5 rounded-xl border-2 border-ink shadow-[2px_2px_0px_#14232b]">
            <span className="font-heading font-extrabold text-xs uppercase text-ink/80 mr-1">
              Lives
            </span>
            {[1, 2, 3].map((heartIndex) => (
              <Heart
                key={heartIndex}
                className={`w-5 h-5 transition-transform ${
                  heartIndex <= lives
                    ? 'text-no fill-no animate-pulse'
                    : 'text-ink/20 fill-ink/10'
                }`}
              />
            ))}
          </div>
        )}

        {/* Combo Counter */}
        {combo > 1 && (
          <div className="flex items-center gap-1.5 bg-act text-card px-3 py-1.5 rounded-xl border-2 border-ink shadow-[2px_2px_0px_#14232b] animate-bounce">
            <Flame className="w-4 h-4 fill-card" />
            <span className="font-heading font-black text-sm sm:text-base tracking-wider">
              COMBO ×{combo}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
