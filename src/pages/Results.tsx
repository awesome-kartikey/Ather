import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Trophy, RefreshCcw, Award, ShieldCheck, Printer, Home } from 'lucide-react';
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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans select-none">
      {/* Header */}
      <header className="shrink-0 bg-white border-b border-slate-200/90 shadow-2xs">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">
            Ather AURIC · Training Assessment Results
          </span>
          <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200/60">
            Doc No: XXXX_PRO_001
          </span>
        </div>
      </header>

      {/* Main Results Card */}
      <motion.main
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35 }}
        className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6"
      >
        <div className="w-full max-w-lg bg-white border border-slate-200/90 rounded-3xl shadow-xl overflow-hidden">
          {/* Top Result Banner */}
          <div
            className={`px-8 py-7 text-white text-center flex flex-col items-center ${
              passed
                ? 'bg-gradient-to-br from-emerald-600 to-green-700'
                : 'bg-gradient-to-br from-blue-600 to-indigo-700'
            }`}
          >
            <div className="w-16 h-16 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center mb-3 shadow-sm">
              {passed ? (
                <Trophy className="w-8 h-8 text-amber-300" />
              ) : (
                <RefreshCcw className="w-8 h-8 text-white" />
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-1">
              {passed ? 'SOP Competency Achieved!' : 'Practice Session Completed'}
            </h2>
            <p className="text-xs sm:text-sm text-white/90 font-medium">
              Operator: <strong className="text-white">{profile.name || 'Floor Operator'}</strong> · Plant M002
            </p>
          </div>

          {/* Metrics Body */}
          <div className="p-6 sm:p-7 flex flex-col gap-5">
            {/* Score Numbers */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
                <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">Accuracy</span>
                <p className="text-2xl font-black text-slate-900 mt-0.5">{percentage}%</p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
                <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">XP Gained</span>
                <p className="text-2xl font-black text-blue-600 mt-0.5">+{summary.xpGained}</p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
                <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">Rating</span>
                <p className="text-xl font-black text-amber-500 mt-0.5">
                  {'⭐'.repeat(summary.stars || 1)}
                </p>
              </div>
            </div>

            {/* Safety Protocol Verification Banner */}
            <div
              className={`p-3.5 rounded-2xl border flex items-center gap-3 text-left ${
                summary.safetyPassed
                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                  : 'bg-rose-50/70 border-rose-200 text-rose-900'
              }`}
            >
              <div className="p-2 rounded-xl bg-white shadow-2xs shrink-0">
                <ShieldCheck
                  className={`w-5 h-5 ${summary.safetyPassed ? 'text-emerald-600' : 'text-rose-600'}`}
                />
              </div>
              <div className="flex flex-col text-xs">
                <span className="font-extrabold text-sm">
                  {summary.safetyPassed ? 'Safety Star Earned' : 'Safety Check Missing'}
                </span>
                <span className="text-slate-600 font-medium">
                  {summary.safetyPassed
                    ? 'All dock safety protocols (engine off & wheel chocks) adhered to.'
                    : 'Wheel chocks safety protocol was missed. Repeat to achieve safety badge.'}
                </span>
              </div>
            </div>

            {/* Unlocked Badges */}
            {summary.badgesEarned.length > 0 && (
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col gap-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-blue-600" /> Badges Unlocked:
                </span>
                <div className="flex flex-wrap gap-2">
                  {summary.badgesEarned.map((badgeId) => {
                    const b = BADGES[badgeId];
                    if (!b) return null;
                    return (
                      <span
                        key={badgeId}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-800 shadow-2xs"
                      >
                        <span>{b.icon}</span>
                        <span>{b.title[lang]}</span>
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-1">
              <button
                type="button"
                onClick={onViewCertificate}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-md shadow-blue-500/25 transition-all text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>View &amp; Print Official Certificate</span>
              </button>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={onRestart}
                  className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl border border-slate-200 transition-all text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RefreshCcw className="w-3.5 h-3.5" />
                  <span>Restart Stage</span>
                </button>

                <button
                  type="button"
                  onClick={onNavigateHome}
                  className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl border border-slate-200 transition-all text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Home className="w-3.5 h-3.5" />
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
