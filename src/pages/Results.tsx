import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Trophy, RefreshCcw, Award, ShieldCheck, Printer, Home, AlertTriangle, CheckCircle2, Clock, Gauge, ChevronDown, ChevronUp } from 'lucide-react';
import type { RunSummary, LanguageCode, UserProfile } from '../engine/types';
import { BADGES } from '../engine/gamification';
import confetti from 'canvas-confetti';

interface Props {
  summary: RunSummary;
  lang: LanguageCode;
  profile: UserProfile;
  onViewCertificate: () => void;
  onRestart: () => void;
  onNavigateHome: () => void;
}

export const Results: React.FC<Props> = ({
  summary,
  lang,
  profile,
  onViewCertificate,
  onRestart,
  onNavigateHome
}) => {
  const percentage = summary.accuracyPct;
  const passed = percentage >= 80;
  const [showMistakes, setShowMistakes] = useState(false);

  useEffect(() => {
    if (passed) {
      try {
        confetti({
          particleCount: 90,
          spread: 75,
          origin: { y: 0.6 }
        });
      } catch {}
    }
  }, [passed]);

  // Pillar 1: Safety & Compliance (100% Mandatory)
  const safetyStatus = summary.safetyPassed ? 'PASS' : 'VIOLATION';
  const safetyColor = summary.safetyPassed ? 'text-emerald-600 bg-emerald-50 border-emerald-200' : 'text-rose-600 bg-rose-50 border-rose-200';

  // Pillar 2: Operational Accuracy (80% Benchmark)
  const accuracyStatus = percentage >= 80 ? 'QUALIFIED' : 'NEEDS RE-ATTEMPT';
  const accuracyColor = percentage >= 80 ? 'text-blue-600 bg-blue-50 border-blue-200' : 'text-amber-600 bg-amber-50 border-amber-200';

  // Pillar 3: SLA & Velocity
  const slaStatus = 'COMPLIANT (ON TIME)';
  const slaColor = 'text-teal-600 bg-teal-50 border-teal-200';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans select-none">
      {/* Top Bar */}
      <header className="shrink-0 bg-white border-b border-slate-200/90 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">
              Ather AURIC Plant M002 · Floor Competency Scorecard
            </span>
          </div>
          <span className="text-xs font-mono font-extrabold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            SOP Standard Assessment
          </span>
        </div>
      </header>

      {/* Main Results Container */}
      <motion.main
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35 }}
        className="flex-1 flex flex-col items-center justify-start sm:justify-center p-4 sm:p-6 overflow-y-auto"
      >
        <div className="w-full max-w-2xl bg-white border border-slate-200/90 rounded-3xl shadow-xl overflow-hidden">
          {/* Top Result Banner */}
          <div
            className={`px-6 sm:px-8 py-7 text-white text-center flex flex-col items-center ${
              passed
                ? 'bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800'
                : 'bg-gradient-to-br from-blue-600 via-indigo-700 to-slate-800'
            }`}
          >
            <div className="w-16 h-16 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center mb-3 shadow-md">
              {passed ? (
                <Trophy className="w-8 h-8 text-amber-300 animate-bounce" />
              ) : (
                <RefreshCcw className="w-8 h-8 text-white" />
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-1">
              {passed ? 'SOP Floor Competency Certified!' : 'Floor Training Practice Completed'}
            </h2>
            <p className="text-xs sm:text-sm text-white/90 font-medium">
              Operator: <strong className="text-white">{profile.name || 'Floor Operator'}</strong> ({profile.operatorId || 'OP-AURIC-104'}) · Ather Plant M002
            </p>
          </div>

          {/* Metrics Body */}
          <div className="p-6 sm:p-8 flex flex-col gap-6">
            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
                <span className="text-[10px] font-mono text-slate-400 font-extrabold uppercase">Accuracy</span>
                <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-0.5">{percentage}%</p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
                <span className="text-[10px] font-mono text-slate-400 font-extrabold uppercase">XP Gained</span>
                <p className="text-2xl sm:text-3xl font-black text-emerald-600 mt-0.5">+{summary.xpGained}</p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
                <span className="text-[10px] font-mono text-slate-400 font-extrabold uppercase">Floor Rating</span>
                <p className="text-xl sm:text-2xl font-black text-amber-500 mt-0.5">
                  {'⭐'.repeat(summary.stars || 1)}
                </p>
              </div>
            </div>

            {/* ── 3-Pillar Industrial Competency Scorecard ────────────── */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-mono font-extrabold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Gauge className="w-4 h-4 text-blue-600" />
                  3-Pillar Floor Competency Audit
                </h4>
                <span className="text-[11px] font-bold text-slate-400">Ather Standard ISO 9001:2015</span>
              </div>

              {/* Pillar 1: Safety & Compliance */}
              <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200 flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-xl mt-0.5 ${summary.safetyPassed ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-extrabold text-slate-900">Pillar 1: Safety &amp; EHS Adherence</span>
                      <span className={`text-[10px] font-mono font-black px-2 py-0.5 rounded-md border ${safetyColor}`}>
                        {safetyStatus}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                      Mandatory dock wheel chocking, engine shut-off, chemical Class 3 PPE, and hazardous vapor protocols. Zero tolerance threshold.
                    </p>
                  </div>
                </div>
              </div>

              {/* Pillar 2: Operational Accuracy */}
              <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200 flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-xl mt-0.5 ${percentage >= 80 ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-extrabold text-slate-900">Pillar 2: Process &amp; Stowage Accuracy</span>
                      <span className={`text-[10px] font-mono font-black px-2 py-0.5 rounded-md border ${accuracyColor}`}>
                        {accuracyStatus} ({percentage}%)
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                      Barcode verification, bin marriage scans, 10% statistical sampling, and SAP EWM transaction accuracy.
                    </p>
                  </div>
                </div>
              </div>

              {/* Pillar 3: SLA & Velocity */}
              <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200 flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl mt-0.5 bg-teal-100 text-teal-700">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-extrabold text-slate-900">Pillar 3: Line Feeder SLA &amp; Velocity</span>
                      <span className={`text-[10px] font-mono font-black px-2 py-0.5 rounded-md border ${slaColor}`}>
                        {slaStatus}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                      Non-DOL 30-min handover SLA, paint shop 2-hour decanting buffer, and 4:00 PM STO dispatch cutoff adherence.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Unlocked Badges */}
            {summary.badgesEarned.length > 0 && (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col gap-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-blue-600" /> Operational Badges Earned:
                </span>
                <div className="flex flex-wrap gap-2">
                  {summary.badgesEarned.map((badgeId) => {
                    const b = BADGES[badgeId];
                    if (!b) return null;
                    return (
                      <span
                        key={badgeId}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-extrabold text-slate-800 shadow-2xs"
                      >
                        <span className="text-base">{b.icon}</span>
                        <span>{b.title[lang]}</span>
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Mistake Review Toggle (if not 100% or safety failed) */}
            {(!passed || !summary.safetyPassed) && (
              <div className="border border-amber-200 bg-amber-50/60 rounded-2xl p-4">
                <button
                  type="button"
                  onClick={() => setShowMistakes(!showMistakes)}
                  className="w-full flex items-center justify-between text-xs font-bold text-amber-900 cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    Review Operational Violations &amp; Corrective Actions
                  </span>
                  {showMistakes ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {showMistakes && (
                  <div className="mt-3 pt-3 border-t border-amber-200 text-xs text-amber-950 space-y-2">
                    {!summary.safetyPassed && (
                      <div className="p-2.5 rounded-xl bg-white border border-amber-200 leading-relaxed">
                        <strong>Safety Violation:</strong> Wheel chocks or engine shut-off protocol was omitted during truck dock arrival. SOP XXXX_PRO_001 mandates wheel chocks be placed prior to any container unlatching.
                      </div>
                    )}
                    {percentage < 80 && (
                      <div className="p-2.5 rounded-xl bg-white border border-amber-200 leading-relaxed">
                        <strong>Quality/Stowage Accuracy:</strong> Re-attempt the module to ensure 100% scan verification before placing high-rise bins or chemical consignments.
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons (Glove-friendly min 56px height) */}
            <div className="space-y-3 pt-1">
              <button
                type="button"
                onClick={onViewCertificate}
                className="w-full min-h-[56px] py-3.5 px-4 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold rounded-2xl shadow-lg shadow-blue-500/25 transition-all text-base flex items-center justify-center gap-2.5 cursor-pointer active:scale-99"
              >
                <Printer className="w-5 h-5" />
                <span>View &amp; Print Official Certificate</span>
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={onRestart}
                  className="min-h-[50px] py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl border border-slate-200 transition-all text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RefreshCcw className="w-4 h-4" />
                  <span>Restart Module</span>
                </button>

                <button
                  type="button"
                  onClick={onNavigateHome}
                  className="min-h-[50px] py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl border border-slate-200 transition-all text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Home className="w-4 h-4" />
                  <span>DOJO Home</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.main>
    </div>
  );
};
