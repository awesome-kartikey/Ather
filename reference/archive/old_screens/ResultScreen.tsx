import { useEffect } from 'react';
import type { RunSummary, LanguageCode, UserProfile } from '../engine/types';
import { useTranslation } from '../i18n/translations';
import { BADGES } from '../engine/gamification';
import { TactileButton } from '../components/TactileButton';
import confetti from 'canvas-confetti';
import {
  Trophy,
  Award,
  ShieldCheck,
  ShieldAlert,
  RotateCcw,
  Home,
  FileCheck2,
  CheckCircle2
} from 'lucide-react';

interface ResultScreenProps {
  summary: RunSummary;
  lang: LanguageCode;
  profile: UserProfile;
  onViewCertificate: () => void;
  onRestart: () => void;
  onNavigateHome: () => void;
}

export function ResultScreen({
  summary,
  lang,
  profile,
  onViewCertificate,
  onRestart,
  onNavigateHome
}: ResultScreenProps) {
  const t = useTranslation(lang);

  useEffect(() => {
    if (!summary.lost && summary.stars >= 2) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {}
    }
  }, [summary.lost, summary.stars]);

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 w-full flex flex-col gap-6 animate-in fade-in duration-300 select-none">
      {/* Shift Evaluation Headline Card */}
      <div className="bg-card p-6 sm:p-8 rounded-3xl border-3 border-ink shadow-[6px_6px_0px_#14232b] flex flex-col items-center text-center gap-4">
        <div className="w-20 h-20 rounded-2xl bg-act/20 border-3 border-act flex items-center justify-center text-4xl shadow-[3px_3px_0px_#14232b]">
          {summary.lost ? '⚠️' : summary.stars === 3 ? '🏆' : '⭐'}
        </div>

        <div className="flex flex-col gap-1">
          <span className="font-mono text-xs uppercase font-extrabold text-act tracking-widest">
            {t.stage1Badge} · Debrief Report
          </span>
          <h1 className="font-heading font-black text-3xl sm:text-4xl text-ink tracking-wide">
            {summary.lost
              ? t.outOfLives
              : summary.stars === 3
              ? 'Stage 1 Gate & Dock Qualified'
              : 'Training Completed'}
          </h1>
          <p className="font-body text-sm sm:text-base text-ink/75 font-semibold max-w-lg">
            Operator: <span className="text-ink font-bold">{profile.name || 'Floor Operator'}</span> ·{' '}
            {t.plantLocation}
          </p>
        </div>

        {/* Stars Display */}
        <div className="flex items-center gap-2 text-4xl sm:text-5xl py-1">
          {[1, 2, 3].map((starIndex) => (
            <span
              key={starIndex}
              className={`transition-all ${
                starIndex <= summary.stars ? 'opacity-100 scale-110' : 'opacity-20 grayscale'
              }`}
            >
              ⭐
            </span>
          ))}
        </div>

        {/* Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full pt-2">
          <div className="bg-concrete p-3.5 rounded-2xl border-2 border-ink flex flex-col items-center">
            <span className="text-xs font-mono font-bold text-ink/60 uppercase">Accuracy</span>
            <span className="font-heading font-black text-2xl text-ink">
              {summary.accuracyPct}%
            </span>
          </div>

          <div className="bg-concrete p-3.5 rounded-2xl border-2 border-ink flex flex-col items-center">
            <span className="text-xs font-mono font-bold text-ink/60 uppercase">XP Gained</span>
            <span className="font-heading font-black text-2xl text-act">
              +{summary.xpGained}
            </span>
          </div>

          <div className="bg-concrete p-3.5 rounded-2xl border-2 border-ink flex flex-col items-center">
            <span className="text-xs font-mono font-bold text-ink/60 uppercase">Steps Done</span>
            <span className="font-heading font-black text-2xl text-ink">
              {summary.correctSteps} / {summary.totalSteps}
            </span>
          </div>

          <div className="bg-concrete p-3.5 rounded-2xl border-2 border-ink flex flex-col items-center">
            <span className="text-xs font-mono font-bold text-ink/60 uppercase">Mode</span>
            <span className="font-heading font-black text-2xl text-ink uppercase">
              {summary.mode}
            </span>
          </div>
        </div>

        {/* Safety Protocol Banner */}
        <div
          className={`w-full p-4 rounded-2xl border-2 flex items-center justify-between gap-3 text-left ${
            summary.safetyPassed
              ? 'bg-ok/15 border-ok text-ink'
              : 'bg-no/15 border-no text-ink'
          }`}
        >
          <div className="flex items-center gap-3">
            {summary.safetyPassed ? (
              <ShieldCheck className="w-7 h-7 text-ok shrink-0" />
            ) : (
              <ShieldAlert className="w-7 h-7 text-no shrink-0" />
            )}
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-base text-ink">
                {summary.safetyPassed ? t.safetyBadgeEarned : 'Safety Protocol Missed'}
              </span>
              <span className="text-xs font-semibold text-ink/80">
                {summary.safetyPassed
                  ? 'All dock safety protocols (engine off & wheel chocks) adhered to.'
                  : t.safetyStepMissed}
              </span>
            </div>
          </div>
        </div>

        {/* Badges Earned Section */}
        {summary.badgesEarned.length > 0 && (
          <div className="w-full bg-concrete/50 p-4 rounded-2xl border-2 border-ink/40 flex flex-col gap-2.5 text-left">
            <span className="font-heading font-extrabold text-xs uppercase text-ink/70 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-act" />
              Badges Unlocked in this Run:
            </span>
            <div className="flex flex-wrap gap-2.5">
              {summary.badgesEarned.map((badgeId) => {
                const b = BADGES[badgeId];
                if (!b) return null;
                return (
                  <div
                    key={badgeId}
                    className="bg-card px-3 py-1.5 rounded-xl border-2 border-ink shadow-[2px_2px_0px_#14232b] flex items-center gap-2"
                  >
                    <span className="text-lg">{b.icon}</span>
                    <span className="font-heading font-bold text-sm text-ink">
                      {b.title[lang]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Supervisor Sign-Off & Verification Card */}
        <div className="w-full bg-concrete p-5 rounded-2xl border-2 border-ink flex flex-col gap-3 text-left">
          <div className="flex items-center justify-between border-b-2 border-ink/20 pb-2">
            <span className="font-heading font-black text-sm uppercase text-ink flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-act" />
              {t.supervisorSignOff}
            </span>
            <span className="font-mono text-xs text-ink/60 font-bold">
              Doc No: XXXX_PRO_001
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-1">
            <div className="text-xs text-ink/80 space-y-1">
              <div>
                Candidate: <strong className="text-ink">{profile.name || 'Floor Operator'}</strong>
              </div>
              <div>
                Location: <strong>Ather AURIC Plant M002</strong>
              </div>
              <div>
                Date / Shift: <strong>{new Date().toLocaleDateString()}</strong>
              </div>
            </div>

            <div className="border-t-2 border-ink sm:border-t-0 sm:border-l-2 sm:pl-4 border-ink/30 w-full sm:w-auto">
              <div className="text-xs font-mono text-ink/60 mb-2">
                {t.supervisorSignatureLine}
              </div>
              <div className="flex items-center gap-1 text-xs text-ok font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Verified for Floor Operations
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full pt-2">
          {!summary.lost && (
            <TactileButton
              variant="primary"
              size="lg"
              onClick={onViewCertificate}
              className="w-full sm:flex-1"
            >
              <Trophy className="w-6 h-6 mr-1" />
              <span>{t.viewCertificate}</span>
            </TactileButton>
          )}

          <TactileButton
            variant="secondary"
            size="lg"
            onClick={onRestart}
            className="w-full sm:w-auto"
          >
            <RotateCcw className="w-5 h-5 mr-1" />
            <span>{t.restart}</span>
          </TactileButton>

          <TactileButton
            variant="secondary"
            size="lg"
            onClick={onNavigateHome}
            className="w-full sm:w-auto"
          >
            <Home className="w-5 h-5 mr-1" />
            <span>{t.home}</span>
          </TactileButton>
        </div>
      </div>
    </div>
  );
}
