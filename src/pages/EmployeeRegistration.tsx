import React, { useState } from 'react';
import { motion } from 'motion/react';
import { UserCheck, ArrowRight, ShieldCheck, Wifi, Tablet, ArrowLeft } from 'lucide-react';
import { AtherLogo } from '../components/common/AtherLogo';
import { LanguageSwitcher } from '../components/common/LanguageSwitcher';
import type { LanguageCode, UserProfile } from '../engine/types';

interface Props {
  lang: LanguageCode;
  profile: UserProfile;
  onSelectLang: (lang: LanguageCode) => void;
  onRegister: (name: string, employeeId: string) => void;
  onBack: () => void;
}

export const EmployeeRegistration: React.FC<Props> = ({
  lang,
  profile,
  onSelectLang,
  onRegister,
  onBack
}) => {
  const [name, setName] = useState(profile.name || '');
  const [employeeId, setEmployeeId] = useState('OP-AURIC-104');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onRegister(name.trim(), employeeId.trim());
  };

  return (
    <div className="min-h-[100dvh] w-full overflow-x-hidden overflow-y-auto bg-gradient-to-br from-slate-50 via-blue-50/25 to-slate-100 flex flex-col justify-between font-sans relative">
      {/* Background glow orbs */}
      <div className="fixed top-[-15%] left-[-5%] w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-15%] right-[-5%] w-[600px] h-[600px] bg-emerald-400/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed inset-0 bg-[url('/noise.svg')] opacity-[0.025] pointer-events-none" />

      {/* ── Top Bar: Status & Language ───────────────────────────────── */}
      <header className="shrink-0 w-full px-4 sm:px-8 pt-3 pb-1 flex items-center justify-between relative z-20">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/80 backdrop-blur-md text-slate-600 hover:text-slate-900 border border-slate-200/80 shadow-2xs transition-all cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/80 backdrop-blur-md text-blue-700 border border-blue-200/80 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            DOJO Operator Station
          </span>
          <LanguageSwitcher currentLang={lang} onSelectLang={onSelectLang} />
        </div>
      </header>

      {/* ── Main Content: Horizontal Split in Upper Screen ───────────── */}
      <main className="flex-1 flex items-start justify-center px-4 pt-2 sm:pt-4 md:pt-6 pb-2 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="w-full max-w-3xl lg:max-w-4xl xl:max-w-5xl bg-white/95 backdrop-blur-md rounded-3xl shadow-xl shadow-blue-900/10 border border-white/90 overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
            {/* ── Left Column: Brand Hero Column ─────────────────────── */}
            <div className="hidden md:flex md:col-span-5 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white p-7 lg:p-8 flex-col justify-between relative overflow-hidden">
              <div className="relative z-10 space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-xs font-medium tracking-wide">
                  <UserCheck className="w-3.5 h-3.5 text-blue-200" />
                  <span>Ather AURIC DOJO</span>
                </div>
                <h2 className="text-xl lg:text-2xl font-black tracking-tight leading-snug">
                  Operator Registration &amp; Floor Verification
                </h2>
                <p className="text-blue-100/90 text-xs sm:text-sm font-light leading-relaxed">
                  Log in with your operator name to record your SOP competency results on this tablet.
                </p>
              </div>

              {/* Trainee Visual Badge */}
              <div className="relative z-10 flex flex-col items-center justify-center py-6 my-auto">
                <div className="w-24 h-24 rounded-full bg-white/15 border-2 border-white/30 flex items-center justify-center shadow-lg text-white text-3xl font-black">
                  {(name.trim().charAt(0) || 'O').toUpperCase()}
                </div>
                <span className="mt-3 text-xs font-mono font-bold text-blue-100 uppercase tracking-widest">
                  Plant M002 · Shift Station
                </span>
              </div>

              {/* Bottom Feature Badges */}
              <div className="relative z-10 border-t border-white/15 pt-3 flex items-center justify-between text-xs text-blue-100 font-medium">
                <span className="flex items-center gap-1.5">
                  <Wifi className="w-4 h-4 text-emerald-300" />
                  100% Offline-Ready
                </span>
                <span className="flex items-center gap-1.5">
                  <Tablet className="w-4 h-4 text-blue-200" />
                  Tablet Station
                </span>
              </div>
            </div>

            {/* ── Right Column: Input Form ────────────────────────────── */}
            <div className="col-span-1 md:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
              <div className="mb-5">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Trainee Sign-In
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
                  Enter your warehouse credentials to begin Module 1 training.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1">
                    Operator Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name (e.g. Ramesh Patil)"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1">
                    Employee ID / Badge Number
                  </label>
                  <input
                    type="text"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    placeholder="OP-AURIC-104"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-mono font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all placeholder:text-slate-400"
                  />
                </div>

                <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200/80 text-xs text-blue-800 font-medium">
                  Assigned Module: <strong>Module 1 — Stage 1: Gate &amp; Dock Operations (XXXX_PRO_001)</strong>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl transition-all text-sm sm:text-base shadow-md shadow-blue-500/25 cursor-pointer flex items-center justify-center gap-2 mt-2"
                >
                  <span>Proceed to Training Station</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </main>

      {/* ── Bottom Footer: Dual Branding ─────────────────────────────── */}
      <footer className="shrink-0 w-full py-4 flex justify-center items-center relative z-20">
        <div className="inline-flex items-center gap-4 px-6 py-2 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-2xs">
          <AtherLogo size="sm" />
          <div className="h-5 w-px bg-slate-300" />
          <a
            href="https://tetrahedron.in"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 group"
          >
            <img
              src="/logo/Tetrahedron-logo-transparent.svg"
              alt="Tetrahedron Logo"
              className="h-5 w-auto object-contain group-hover:scale-105 transition-transform"
            />
            <span className="text-xs font-bold text-slate-700 group-hover:text-blue-600 transition-colors">
              Tetrahedron
            </span>
          </a>
        </div>
      </footer>
    </div>
  );
};
