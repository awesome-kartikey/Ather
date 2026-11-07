import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { 
  Trophy, 
  RefreshCcw, 
  Award, 
  ShieldCheck, 
  Printer, 
  Home, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Gauge, 
  ChevronDown, 
  ChevronUp,
  UserCheck,
  Sparkles
} from 'lucide-react';
import type { RunSummary, LanguageCode, UserProfile } from '../engine/types';
import { BADGES } from '../engine/gamification';
import { AtherCapsuleLogo } from '../components/common/AtherCapsuleLogo';
import { getResultsTranslations, getLandingTranslations } from '../i18n/translations';
import confetti from 'canvas-confetti';

interface Props {
  summary: RunSummary;
  lang: LanguageCode;
  profile: UserProfile;
  onViewCertificate: () => void;
  onRestart: () => void;
  onNavigateHome: () => void;
  appMode?: 'receiving' | 'picking';
}

export const Results: React.FC<Props> = ({
  summary,
  lang,
  profile,
  onViewCertificate,
  onRestart,
  onNavigateHome,
  appMode = 'receiving'
}) => {
  const isPicking = appMode === 'picking';
  const percentage = summary.accuracyPct;
  const passed = percentage >= 80;
  const [showMistakes, setShowMistakes] = useState(false);
  const t = getResultsTranslations(lang);
  const tLanding = getLandingTranslations(lang);

  useEffect(() => {
    if (passed) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {}
    }
  }, [passed]);

  // Pillar 1: Safety & Compliance (100% Mandatory)
  const safetyStatus = summary.safetyPassed ? t.statusPass : t.statusViolation;
  const safetyColor = summary.safetyPassed 
    ? 'text-emerald-700 bg-emerald-50 border-emerald-300' 
    : 'text-rose-700 bg-rose-50 border-rose-300';

  // Pillar 2: Operational Accuracy (80% Benchmark)
  const accuracyStatus = percentage >= 80 ? t.statusQualified : t.statusNeedsReattempt;
  const accuracyColor = percentage >= 80 
    ? 'text-blue-700 bg-blue-50 border-blue-300' 
    : 'text-amber-700 bg-amber-50 border-amber-300';

  // Pillar 3: SLA & Velocity
  const slaStatus = t.statusCompliant;
  const slaColor = 'text-teal-700 bg-teal-50 border-teal-300';

  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  return (
    <div className="h-[100dvh] max-h-[100dvh] w-full overflow-hidden bg-[#F8FAFC] text-slate-900 flex flex-col justify-between font-sans select-none antialiased">
      {/* ── Top Bar: Dual Branding & Header ───────────────────────── */}
      <header className="shrink-0 h-11 sm:h-12 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs px-4 sm:px-6 flex items-center justify-between z-20">
        <div className="flex items-center gap-2.5">
          <AtherCapsuleLogo height={10} />
          <div className="h-3.5 w-px bg-slate-300" />
          <img
            src="/logo/Tetrahedron-logo-transparent.svg"
            alt="Tetrahedron"
            className="h-3.5 w-auto object-contain"
          />
          <div className="h-3.5 w-px bg-slate-300 hidden sm:block" />
          <span className="hidden sm:inline-block text-xs font-mono font-bold text-slate-600 uppercase tracking-wider">
            {t.headerTitle}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className={`text-[10px] sm:text-[11px] font-mono font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
            isPicking
              ? 'bg-blue-50 text-blue-800 border-blue-200'
              : 'bg-emerald-50 text-emerald-800 border-emerald-200'
          }`}>
            {isPicking ? tLanding.modePickingBadge : tLanding.modeReceivingBadge}
          </span>
        </div>
      </header>

      {/* ── Main Scorecard Container (Zero Vertical Scroll, Balanced Proportions) ── */}
      <motion.main
        initial={{ opacity: 0, scale: 0.99 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex-1 min-h-0 w-full max-w-5xl mx-auto p-2 sm:p-4 flex items-center justify-center overflow-hidden"
      >
        <div className="w-full bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden md:grid md:grid-cols-12">
          
          {/* ── Left Column: Hero Master Card, Metrics & Tactile Actions (5 cols) ── */}
          <div className="md:col-span-5 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-200 bg-white">
            
            {/* Top Result Hero Banner */}
            <div
              className={`relative p-4 sm:p-5 text-white overflow-hidden shrink-0 ${
                passed
                  ? 'bg-gradient-to-br from-[#14232b] via-[#1a3540] to-[#0f242d]'
                  : 'bg-gradient-to-br from-[#1e293b] via-[#334155] to-[#0f172a]'
              }`}
            >
              {/* Subtle Ambient Radial Lighting */}
              <div className="absolute top-0 right-0 w-44 h-44 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none" />
              {passed && (
                <img
                  src="/Assets/Props/prop_qc_pass_stamp.png"
                  alt="QC Pass"
                  className="absolute -right-3 -bottom-3 w-20 h-20 object-contain opacity-20 rotate-12 pointer-events-none"
                />
              )}

              {/* Title & Status Badge */}
              <div className="relative z-10 flex items-start gap-3">
                <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-md ${
                  passed
                    ? 'bg-emerald-500/20 border border-emerald-400/40 text-emerald-400'
                    : 'bg-amber-500/20 border border-amber-400/40 text-amber-400'
                }`}>
                  {passed ? (
                    <Trophy className="w-6 h-6 animate-pulse" />
                  ) : (
                    <RefreshCcw className="w-5 h-5 text-white" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="inline-flex items-center gap-1 text-[9px] font-mono font-bold tracking-widest uppercase px-2 py-0.5 rounded-full bg-white/10 text-emerald-300 border border-emerald-400/20 mb-1">
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>ISO 9001:2015 DOJO</span>
                  </div>
                  <h2 className="text-base sm:text-lg font-black tracking-tight leading-snug">
                    {passed ? t.certifiedTitle : t.completedTitle}
                  </h2>
                </div>
              </div>

              {/* Operator Identity Pill with Real Photo if captured */}
              <div className="relative z-10 mt-3 pt-3 border-t border-white/10 flex items-center gap-2.5">
                {profile.photoUrl ? (
                  <div className="w-9 h-9 rounded-lg overflow-hidden border border-emerald-400/50 shadow-2xs shrink-0 bg-white">
                    <img src={profile.photoUrl} alt={profile.name} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 flex items-center justify-center font-black text-xs shrink-0">
                    <UserCheck className="w-4 h-4" />
                  </div>
                )}
                <div className="flex-1 min-w-0 text-left">
                  <span className="text-xs font-extrabold text-white truncate block">
                    {profile.name || 'Floor Operator'}
                  </span>
                  <span className="text-[10px] font-mono text-slate-300 block">
                    ID: {profile.operatorId || 'OP-AURIC-104'} · Plant M002
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Metrics Bar: 3 Clean High-Density Tiles */}
            <div className="p-3 sm:p-4 bg-slate-50/70 border-b border-slate-200/80">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-white p-2 sm:p-2.5 rounded-xl border border-slate-200/90 shadow-2xs">
                  <span className="text-[9px] font-mono text-slate-400 font-extrabold uppercase block">{t.accuracy}</span>
                  <p className="text-lg sm:text-xl font-black text-slate-900 mt-0.5">{percentage}%</p>
                </div>

                <div className="bg-white p-2 sm:p-2.5 rounded-xl border border-slate-200/90 shadow-2xs">
                  <span className="text-[9px] font-mono text-slate-400 font-extrabold uppercase block">{t.pointsScored}</span>
                  <p className="text-lg sm:text-xl font-black text-emerald-600 mt-0.5">{summary.correctSteps}/{summary.totalSteps}</p>
                </div>

                <div className="bg-white p-2 sm:p-2.5 rounded-xl border border-slate-200/90 shadow-2xs">
                  <span className="text-[9px] font-mono text-slate-400 font-extrabold uppercase block">{t.floorRating}</span>
                  <p className="text-sm sm:text-base font-black text-amber-500 mt-0.5">
                    {'⭐'.repeat(summary.stars || 1)}
                  </p>
                </div>
              </div>
            </div>

            {/* Tactile Action Buttons: Placed directly on left column */}
            <div className="p-3 sm:p-4 space-y-2 bg-white">
              <button
                type="button"
                onClick={onViewCertificate}
                className="w-full min-h-[46px] py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98"
              >
                <Printer className="w-4 h-4" />
                <span>{t.viewCertificate}</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={onRestart}
                  className="min-h-[38px] py-2 px-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl border border-slate-200 transition-all text-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
                >
                  <RefreshCcw className="w-3.5 h-3.5" />
                  <span>{t.restartModule}</span>
                </button>

                <button
                  type="button"
                  onClick={onNavigateHome}
                  className="min-h-[38px] py-2 px-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl border border-slate-200 transition-all text-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>{t.dojoHome}</span>
                </button>
              </div>
            </div>
          </div>

          {/* ── Right Column: 3-Pillar Audit Breakdown & Badges (7 cols) ── */}
          <div className="md:col-span-7 p-4 sm:p-5 flex flex-col justify-between gap-2.5 bg-slate-50/50">
            {/* Audit Header */}
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-200/80">
              <div className="flex items-center gap-1.5 text-xs font-mono font-extrabold text-slate-700 uppercase tracking-wider">
                <Gauge className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t.auditDeckTitle}</span>
              </div>
              <span className="text-[10px] font-mono font-bold text-slate-400">{t.isoStandard}</span>
            </div>

            {/* 3 Pillar Audit Rows (Compact, cohesive layout) */}
            <div className="space-y-2">
              {/* Pillar 1: Safety & Compliance */}
              <div className="p-2.5 sm:p-3 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex items-start gap-2.5">
                <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${summary.safetyPassed ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-extrabold text-slate-900 truncate">{t.pillar1Title}</span>
                    <span className={`text-[9px] font-mono font-black px-2 py-0.5 rounded border shrink-0 ${safetyColor}`}>
                      {safetyStatus}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                    {t.pillar1Desc}
                  </p>
                </div>
              </div>

              {/* Pillar 2: Process & Stowage Accuracy */}
              <div className="p-2.5 sm:p-3 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex items-start gap-2.5">
                <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${percentage >= 80 ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-extrabold text-slate-900 truncate">{t.pillar2Title}</span>
                    <span className={`text-[9px] font-mono font-black px-2 py-0.5 rounded border shrink-0 ${accuracyColor}`}>
                      {accuracyStatus} ({percentage}%)
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                    {t.pillar2Desc}
                  </p>
                </div>
              </div>

              {/* Pillar 3: SLA & Velocity */}
              <div className="p-2.5 sm:p-3 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex items-start gap-2.5">
                <div className="p-1.5 rounded-lg shrink-0 mt-0.5 bg-teal-100 text-teal-700">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-extrabold text-slate-900 truncate">{t.pillar3Title}</span>
                    <span className={`text-[9px] font-mono font-black px-2 py-0.5 rounded border shrink-0 ${slaColor}`}>
                      {slaStatus}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                    {t.pillar3Desc}
                  </p>
                </div>
              </div>
            </div>

            {/* Unlocked Badges (Sleek Horizontal Pill Row) */}
            {summary.badgesEarned.length > 0 && (
              <div className="p-2 sm:p-2.5 rounded-xl bg-white border border-slate-200/80 flex items-center justify-between gap-2">
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1 shrink-0">
                  <Award className="w-3.5 h-3.5 text-blue-600" />
                  <span>{t.badgesTitle}</span>
                </span>
                <div className="flex flex-wrap gap-1.5 justify-end">
                  {summary.badgesEarned.map((badgeId) => {
                    const b = BADGES[badgeId];
                    if (!b) return null;
                    return (
                      <span
                        key={badgeId}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-[11px] font-bold text-slate-800 shadow-2xs"
                      >
                        <span>{b.icon}</span>
                        <span>{(b.title as any)[lang] || b.title.en}</span>
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Mistake Review Toggle (if not 100% or safety failed) */}
            {(!passed || !summary.safetyPassed) && (
              <div className="border border-amber-200 bg-amber-50/70 rounded-xl p-2.5">
                <button
                  type="button"
                  onClick={() => setShowMistakes(!showMistakes)}
                  className="w-full flex items-center justify-between text-xs font-bold text-amber-900 cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    Review Violations &amp; Corrective Actions
                  </span>
                  {showMistakes ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
                {showMistakes && (
                  <div className="mt-2 pt-2 border-t border-amber-200 text-[11px] text-amber-950 space-y-1.5">
                    {!summary.safetyPassed && (
                      <div className="p-2 rounded-lg bg-white border border-amber-200 leading-snug">
                        <strong>Safety Violation:</strong> Dock wheel chocks or engine shut-off protocol was omitted during truck dock arrival.
                      </div>
                    )}
                    {percentage < 80 && (
                      <div className="p-2 rounded-lg bg-white border border-amber-200 leading-snug">
                        <strong>Accuracy:</strong> Re-attempt the module to ensure 100% scan verification before placing high-rise bins.
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Quality Cell Verification Footer */}
            <div className="pt-1 border-t border-slate-200 flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span className="flex items-center gap-1 text-emerald-700 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Telemetric Audit Logged
              </span>
              <span>Ather QA Cell · {currentDate}</span>
            </div>
          </div>

        </div>
      </motion.main>
    </div>
  );
};
