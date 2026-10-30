import React from 'react';
import { motion } from 'motion/react';
import { PackageOpen, ChevronRight, Layers, ShieldCheck, ArrowRight } from 'lucide-react';
import { AtherLogo } from '../components/common/AtherLogo';
import { LanguageSwitcher } from '../components/common/LanguageSwitcher';
import type { LanguageCode } from '../engine/types';

interface LandingPageProps {
  lang: LanguageCode;
  onSelectLang: (lang: LanguageCode) => void;
  onStartTraining: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  lang,
  onSelectLang,
  onStartTraining
}) => {
  return (
    <div className="min-h-[100dvh] w-full overflow-x-hidden bg-slate-50 text-slate-900 font-sans relative flex flex-col justify-between">
      {/* Background ambient lighting orbs */}
      <div className="fixed top-[-20%] left-[-10%] w-[800px] h-[800px] bg-blue-400/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-emerald-400/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed inset-0 bg-[url('/noise.svg')] opacity-[0.025] pointer-events-none" />

      {/* ── Top Bar: Dual Branding & Language Switcher ────────────────── */}
      <header className="shrink-0 w-full px-4 sm:px-8 pt-4 pb-2 flex items-center justify-between relative z-20">
        <a
          href="https://tetrahedron.in"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all group"
        >
          <img
            src="/logo/Tetrahedron-logo-transparent.svg"
            alt="Tetrahedron Logo"
            className="h-5 w-auto object-contain group-hover:scale-105 transition-transform"
          />
          <span className="text-[11px] text-slate-400 font-medium">Developed by</span>
          <span className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
            Tetrahedron
          </span>
        </a>

        <div className="flex items-center gap-3">
          <LanguageSwitcher currentLang={lang} onSelectLang={onSelectLang} />
        </div>
      </header>

      {/* ── Hero Section ─────────────────────────────────────────────── */}
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-12 relative z-10 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="flex flex-col items-center space-y-5"
        >
          {/* Ather Plant Logo */}
          <div className="mb-1">
            <AtherLogo size="lg" />
          </div>

          {/* DOJO Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/90 text-xs sm:text-sm font-bold text-blue-700 shadow-2xs">
            <PackageOpen className="w-4 h-4 text-blue-600" />
            <span>Ather AURIC Plant M002 · Warehouse DOJO</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 leading-tight">
            Standard Operating Procedures <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700">
              Interactive Training DOJO
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Standardized digital simulation station for warehouse operators at Ather Energy's Chhatrapati Sambhajinagar plant. Self-learning, offline-ready, and field-verified.
          </p>

          {/* Primary CTA */}
          <div className="pt-4 flex flex-col sm:flex-row items-center gap-3.5">
            <button
              type="button"
              onClick={onStartTraining}
              className="px-8 py-4 text-base sm:text-lg font-bold text-white transition-all duration-300 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-2xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 active:scale-98 cursor-pointer flex items-center gap-2.5"
            >
              <span>Launch Stage 1: Gate &amp; Dock</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* ── Operational Modules Preview Grid ─────────────────────────── */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 mt-14 text-left">
          {/* Module 1 Card */}
          <motion.div
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="p-6 sm:p-7 rounded-3xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                  <Layers className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200/60 uppercase">
                  ACTIVE SOP · XXXX_PRO_001
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Module 1: Inbound Receiving &amp; Put-Away
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Supplier vehicle gate entry, ERP pass creation (YMM_GATE_ENTRY), windshield barcode printing, dock allocation, and dock safety compliance.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
              <span>7 Verified Steps · Trilingual</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </motion.div>

          {/* Module 2 Card */}
          <motion.div
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="p-6 sm:p-7 rounded-3xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200/60 uppercase">
                  UPCOMING
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Module 2: Outbound Picking &amp; Packaging
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                JIRA PIR requisitions, bulk decanting into trolleys, milk-run line feeding (28 vehicle line feeders), and reverse logistics.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-400">
              <span>Plant Operations Standard</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </motion.div>
        </div>
      </main>

      {/* ── Bottom: Unified Dual Branding Footer ─────────────────────── */}
      <footer className="shrink-0 w-full py-4 sm:py-6 flex justify-center items-center relative z-20">
        <div className="inline-flex items-center gap-4 sm:gap-6 px-6 sm:px-8 py-2.5 sm:py-3 rounded-2xl sm:rounded-full bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-sm">
          {/* Ather Logo */}
          <AtherLogo size="sm" />

          <div className="h-6 sm:h-7 w-px bg-slate-300" />

          {/* Tetrahedron Branding */}
          <a
            href="https://tetrahedron.in"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 sm:gap-2.5 group"
          >
            <img
              src="/logo/Tetrahedron-logo-transparent.svg"
              alt="Tetrahedron Logo"
              className="h-6 sm:h-7 w-auto object-contain group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col text-left leading-tight">
              <span className="text-[9px] sm:text-[10px] text-slate-400 font-medium">Developed by</span>
              <span className="text-xs sm:text-sm font-extrabold text-slate-800 group-hover:text-blue-600 transition-colors">
                Tetrahedron
              </span>
            </div>
          </a>
        </div>
      </footer>
    </div>
  );
};
