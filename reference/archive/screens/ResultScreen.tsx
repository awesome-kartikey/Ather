import { useEffect } from 'react';
import type { RunSummary, LanguageCode } from '../engine/types';
import { useTranslation } from '../i18n/translations';
import { BADGES } from '../engine/gamification';
import confetti from 'canvas-confetti';
import { Award, RotateCcw, Home, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface ResultScreenProps {
  summary: RunSummary;
  workerName: string;
  lang: LanguageCode;
  onRetry: () => void;
  onGoHome: () => void;
  onViewCertificate: () => void;
}

export function ResultScreen({
  summary,
  workerName,
  lang,
  onRetry,
  onGoHome,
  onViewCertificate
}: ResultScreenProps) {
  const t = useTranslation(lang);

  // Trigger celebration confetti on high achievement
  useEffect(() => {
    if (!summary.lost && summary.stars >= 2) {
      confetti({
        particleCount: summary.stars === 3 ? 80 : 40,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [summary.stars, summary.lost]);

  const isCertified = summary.badgesEarned.includes('cert');

  return (
    <div className="flex flex-col items-center gap-6 max-w-2xl mx-auto p-4 sm:p-8 w-full text-center animate-in zoom-in-95 duration-300">
      {/* Big Status Badge */}
      <div className="text-7xl sm:text-8xl select-none filter drop-shadow-md">
        {summary.lost ? '💔' : '⭐'.repeat(Math.max(summary.stars, 1))}
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="font-heading text-4xl sm:text-5xl font-extrabold text-ink leading-tight">
          {summary.packTitle[lang]}
        </h2>
        <span className="text-xl sm:text-2xl font-heading font-bold text-ink/70">
          {summary.lost ? t.outOfLives : `+${summary.xpGained} ${t.xp} (${summary.accuracyPct}% ${t.accuracy})`}
        </span>
      </div>

      {/* Badges Earned Section */}
      {summary.badgesEarned.length > 0 && (
        <div className="flex flex-col items-center gap-3 bg-card p-5 rounded-2xl border-3 border-ink w-full shadow-sm">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-ink/70">
            BADGES EARNED IN THIS RUN:
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {summary.badgesEarned.map((bId) => {
              const badge = BADGES[bId];
              if (!badge) return null;
              return (
                <div
                  key={bId}
                  className="flex items-center gap-2 px-3.5 py-1.5 bg-concrete border-2 border-ink rounded-xl font-heading text-base font-bold shadow-sm"
                >
                  <span className="text-xl">{badge.icon}</span>
                  <span>{badge.title[lang]}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Safety Notice if Failed */}
      {!summary.safetyPassed && (
        <div className="flex items-start gap-3 p-4 bg-act/15 border-3 border-act rounded-2xl text-left w-full shadow-sm">
          <ShieldAlert className="w-6 h-6 text-act shrink-0 mt-0.5" />
          <div>
            <strong className="font-heading text-lg font-bold text-ink block">
              Safety Step Missed
            </strong>
            <p className="text-sm font-medium text-ink/80 mt-0.5">
              {t.safetyStepMissed}
            </p>
          </div>
        </div>
      )}

      {/* Certificate Unlocked Card */}
      {isCertified && (
        <div className="flex flex-col items-center gap-3 p-6 bg-card border-4 border-ink rounded-3xl w-full shadow-lg relative overflow-hidden">
          <div className="flex items-center gap-2 text-ok">
            <CheckCircle2 className="w-7 h-7" />
            <h3 className="font-heading text-2xl font-extrabold text-ink uppercase tracking-wide">
              {t.certified}
            </h3>
          </div>

          <p className="text-sm sm:text-base font-medium text-ink/80">
            Operator <strong className="text-ink">{workerName || 'Floor Operator'}</strong> has qualified with 3 Stars and zero safety infractions.
          </p>

          <button
            type="button"
            onClick={onViewCertificate}
            className="flex items-center gap-2 px-6 py-3 bg-act text-ink border-3 border-ink rounded-xl font-heading text-xl font-bold uppercase hover:brightness-105 active:scale-95 transition-all shadow-md mt-1"
          >
            <Award className="w-6 h-6" />
            <span>{t.viewCertificate}</span>
          </button>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 w-full pt-4">
        <button
          type="button"
          onClick={onRetry}
          className="flex-1 min-h-[64px] px-8 bg-act text-ink border-3 border-ink rounded-2xl font-heading text-2xl font-bold uppercase hover:brightness-105 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-6 h-6" />
          <span>{t.tryAgain}</span>
        </button>

        <button
          type="button"
          onClick={onGoHome}
          className="min-h-[64px] px-8 bg-card text-ink border-3 border-ink rounded-2xl font-heading text-2xl font-bold hover:bg-concrete active:scale-95 transition-all shadow-sm flex items-center justify-center gap-2"
        >
          <Home className="w-6 h-6" />
          <span>{t.home}</span>
        </button>
      </div>
    </div>
  );
}
