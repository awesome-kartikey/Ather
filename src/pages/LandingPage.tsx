import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  PackageOpen,
  ChevronRight,
  Layers,
  ShieldCheck,
  ArrowRight,
  Play,
  RotateCcw,
  Clock
} from 'lucide-react';
import { AtherLogo } from '../components/common/AtherLogo';
import { LanguageSwitcher } from '../components/common/LanguageSwitcher';
import type { LanguageCode } from '../engine/types';

interface LandingPageProps {
  lang: LanguageCode;
  onSelectLang: (lang: LanguageCode) => void;
  onStartTraining: () => void;
  onLaunchModule: (stageIndex: number) => void;
  onResumeShift: () => void;
}

interface ModuleInfo {
  index: number;
  category: 1 | 2;
  number: number;
  title: Record<LanguageCode, string>;
  scenesCount: number;
  sopDoc: string;
  badge: string;
  color: string;
}

const MODULES_DATA: ModuleInfo[] = [
  // Category 1: Inbound Receiving & Put-Away (Modules 1 - 7)
  {
    index: 0,
    category: 1,
    number: 1,
    title: {
      en: 'Gate & Dock Operations',
      hi: 'गेट और डॉक संचालन',
      mr: 'गेट आणि डॉक ऑपरेशन्स'
    },
    scenesCount: 9,
    sopDoc: 'XXXX_PRO_001',
    badge: 'GATE KEEPER',
    color: 'from-blue-600 to-indigo-600'
  },
  {
    index: 1,
    category: 1,
    number: 2,
    title: {
      en: 'Receiving & IQC Clearance',
      hi: 'प्राप्ति और आईक्यूसी क्लीयरेंस',
      mr: 'प्राप्ती आणि आयक्यूसी क्लिअरन्स'
    },
    scenesCount: 9,
    sopDoc: '02_C1_S2',
    badge: 'QUALITY SENTINEL',
    color: 'from-emerald-600 to-teal-600'
  },
  {
    index: 2,
    category: 1,
    number: 3,
    title: {
      en: 'Vehicle & Battery Parts Put-Away',
      hi: 'वाहन और बैटरी पार्ट्स पुट-अवे',
      mr: 'वाहन आणि बॅटरी पार्ट्स पुट-अवे'
    },
    scenesCount: 6,
    sopDoc: '03_C1_S3',
    badge: 'HIGH-RISE STOWAGE MASTER',
    color: 'from-amber-600 to-orange-600'
  },
  {
    index: 3,
    category: 1,
    number: 4,
    title: {
      en: 'Specialized Battery Cell Vault',
      hi: 'विशेष बैटरी सेल वॉल्ट',
      mr: 'विशेष बॅटरी सेल व्हॉल्ट'
    },
    scenesCount: 5,
    sopDoc: '04_C1_S4',
    badge: 'CELL VAULT GUARDIAN',
    color: 'from-rose-600 to-red-600'
  },
  {
    index: 4,
    category: 1,
    number: 5,
    title: {
      en: 'Hazardous Chemicals & Thinners',
      hi: 'खतरनाक रसायन और थिनर',
      mr: 'धोकादायक रसायने आणि थिनर्स'
    },
    scenesCount: 5,
    sopDoc: '05_C1_S5',
    badge: 'HAZMAT CUSTODIAN',
    color: 'from-purple-600 to-indigo-700'
  },
  {
    index: 5,
    category: 1,
    number: 6,
    title: {
      en: 'Supermarket C-Class MH1',
      hi: 'सुपरमार्केट सी-क्लास एमएच 1',
      mr: 'सुपरमार्केट सी-क्लास एमएच 1'
    },
    scenesCount: 6,
    sopDoc: '06_C1_S6',
    badge: 'SUPERMARKET KANBAN SPECIALIST',
    color: 'from-teal-600 to-cyan-600'
  },
  {
    index: 6,
    category: 1,
    number: 7,
    title: {
      en: 'Quarantine & Scrap Disposition',
      hi: 'क्वारंटाइन और स्क्रैप निस्तारण',
      mr: 'क्वारंटाईन आणि स्क्रॅप विल्हेवाट'
    },
    scenesCount: 7,
    sopDoc: '07_C1_S7',
    badge: 'QUARANTINE DISPOSITION AUTHORITY',
    color: 'from-red-600 to-rose-700'
  },

  // Category 2: Line Feeding & Reverse Logistics (Modules 8 - 12)
  {
    index: 7,
    category: 2,
    number: 8,
    title: {
      en: 'Vehicle Line Issuance & Picking',
      hi: 'वाहन लाइन जारी और पिकिंग',
      mr: 'वाहन लाईन जारी आणि पिकिंग'
    },
    scenesCount: 9,
    sopDoc: '08_C2_S8',
    badge: 'LINE FEEDER CHAMPION',
    color: 'from-blue-600 to-cyan-700'
  },
  {
    index: 8,
    category: 2,
    number: 9,
    title: {
      en: 'Paint Shop Decanting & Buffers',
      hi: 'पेंट शॉप डिकैंटिंग और बफ़र्स',
      mr: 'पेंट शॉप डिकॅंटिंग आणि बफर्स'
    },
    scenesCount: 10,
    sopDoc: '09_C2_S9',
    badge: 'PAINT & DECANTING VIRTUOSO',
    color: 'from-indigo-600 to-violet-700'
  },
  {
    index: 9,
    category: 2,
    number: 10,
    title: {
      en: 'Indirect Material Handling',
      hi: 'अप्रत्यक्ष सामग्री प्रबंधन',
      mr: 'अप्रत्यक्ष साहित्य हाताळणी'
    },
    scenesCount: 6,
    sopDoc: '10_C2_S10',
    badge: 'INDIRECT STORES CUSTODIAN',
    color: 'from-amber-600 to-yellow-600'
  },
  {
    index: 10,
    category: 2,
    number: 11,
    title: {
      en: 'Production Inspection & Quality PIR',
      hi: 'उत्पादन निरीक्षण और गुणवत्ता पीआईआर',
      mr: 'उत्पादन तपासणी आणि गुणवत्ता पीआयआर'
    },
    scenesCount: 7,
    sopDoc: '11_C2_S11',
    badge: 'PIR & STO DISPATCH SPECIALIST',
    color: 'from-emerald-600 to-green-700'
  },
  {
    index: 11,
    category: 2,
    number: 12,
    title: {
      en: 'Reverse Logistics & Empty Bin Strapping',
      hi: 'रिवर्स लॉजिस्टिक्स और खाली बिन स्ट्रैपिंग',
      mr: 'रिव्हर्स लॉजिस्टिक आणि रिकाम्या बिन स्ट्रॅपिंग'
    },
    scenesCount: 12,
    sopDoc: '12_C2_S12',
    badge: 'WAREHOUSE GRANDMASTER',
    color: 'from-blue-700 to-slate-900'
  }
];

export const LandingPage: React.FC<LandingPageProps> = ({
  lang,
  onSelectLang,
  onStartTraining,
  onLaunchModule,
  onResumeShift
}) => {
  const [activeCategoryTab, setActiveCategoryTab] = useState<1 | 2>(1);
  const [resumeData, setResumeData] = useState<{
    stageIdx: number;
    sceneIdx: number;
    xp: number;
    hasProgress: boolean;
  }>({ stageIdx: 0, sceneIdx: 0, xp: 0, hasProgress: false });

  useEffect(() => {
    try {
      const sStage = localStorage.getItem('ather_stage_idx');
      const sScene = localStorage.getItem('ather_scene_idx');
      const sXp = localStorage.getItem('ather_xp');
      if (sStage !== null) {
        const stage = parseInt(sStage, 10);
        const scene = parseInt(sScene || '0', 10);
        const xp = parseInt(sXp || '0', 10);
        if (stage > 0 || scene > 0 || xp > 0) {
          setResumeData({ stageIdx: stage, sceneIdx: scene, xp, hasProgress: true });
        }
      }
    } catch {
      // Storage unavailable
    }
  }, []);

  const filteredModules = MODULES_DATA.filter((m) => m.category === activeCategoryTab);

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
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all group"
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

      {/* ── Trainee Shift Resume Strip (If Previous Progress Exists) ── */}
      {resumeData.hasProgress && (
        <section className="w-full max-w-5xl mx-auto px-4 mt-2 mb-2 relative z-20">
          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-900 text-white shadow-lg border border-blue-700/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-left">
              <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center shrink-0">
                <RotateCcw className="w-6 h-6 text-amber-300 animate-spin-slow" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-extrabold uppercase bg-amber-400 text-slate-900 px-2 py-0.5 rounded-full">
                    Active Shift Detected
                  </span>
                  <span className="text-xs text-blue-200 font-medium">Plant M002 Trainee Station</span>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-white mt-0.5">
                  Resume at Module {resumeData.stageIdx + 1}: {MODULES_DATA[resumeData.stageIdx]?.title[lang] || 'Current Module'} · Scene {resumeData.sceneIdx + 1}
                </h4>
                <p className="text-xs text-blue-200">
                  Current Floor Balance: <strong>+{resumeData.xp} XP</strong>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                type="button"
                onClick={onResumeShift}
                className="w-full sm:w-auto min-h-[48px] px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-extrabold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Resume Shift</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ── Hero Section ─────────────────────────────────────────────── */}
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 pt-4 pb-12 relative z-10 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col items-center space-y-4 max-w-3xl mx-auto"
        >
          {/* Ather Plant Logo */}
          <div className="mb-0.5">
            <AtherLogo size="lg" />
          </div>

          {/* DOJO Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/90 text-xs sm:text-sm font-bold text-blue-700 shadow-2xs">
            <PackageOpen className="w-4 h-4 text-blue-600" />
            <span>Ather AURIC Plant M002 · Warehouse Floor DOJO</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            Warehouse Standard Operating Procedures <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700">
              Interactive Training DOJO
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Industrial digital training station for floor operators at Ather Energy AURIC Plant M002. 12 operational modules, 91 verified SOP scenes, high-contrast glove ergonomics, and trilingual voice guidance.
          </p>

          {/* Primary Quick Start CTA */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              type="button"
              onClick={onStartTraining}
              className="min-h-[56px] px-8 py-3.5 text-base sm:text-lg font-extrabold text-white transition-all duration-300 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-2xl shadow-lg shadow-blue-500/25 active:scale-98 cursor-pointer flex items-center gap-2.5"
            >
              <span>Start Training from Module 1</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* ── 12-Module Interactive Grid Launcher ─────────────────────── */}
        <section className="w-full mt-10 text-left">
          {/* Category Tabs */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Floor Operations Roster
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Select any operational module below to enter targeted simulation training.
              </p>
            </div>

            {/* Category 1 vs Category 2 Pills */}
            <div className="flex items-center gap-2 p-1 bg-white rounded-2xl border border-slate-200/90 shadow-2xs">
              <button
                type="button"
                onClick={() => setActiveCategoryTab(1)}
                className={`min-h-[44px] px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center gap-2 ${activeCategoryTab === 1
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
              >
                <Layers className="w-4 h-4" />
                <span>Cat 1: Inbound &amp; Stowage (M1–M7)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveCategoryTab(2)}
                className={`min-h-[44px] px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center gap-2 ${activeCategoryTab === 2
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Cat 2: Line Feed &amp; Reverse (M8–M12)</span>
              </button>
            </div>
          </div>

          {/* Module Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredModules.map((m) => (
              <motion.div
                key={m.index}
                whileHover={{ y: -3, transition: { duration: 0.15 } }}
                className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono font-black px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      MODULE {m.number}
                    </span>
                    <span className="text-[10px] font-mono font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200/60">
                      {m.sopDoc}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {m.title[lang]}
                  </h4>

                  <div className="flex items-center gap-3 mt-2 text-xs text-slate-500 font-medium">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {m.scenesCount} SOP Slices
                    </span>
                    <span>·</span>
                    <span className="text-emerald-700 font-bold">{m.badge}</span>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-mono">AURIC Plant M002</span>
                  <button
                    type="button"
                    onClick={() => onLaunchModule(m.index)}
                    className="min-h-[40px] px-3.5 py-1.5 rounded-xl text-xs font-extrabold bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <span>Launch</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {/* ── Bottom: Unified Dual Branding Footer ─────────────────────── */}
      <footer className="shrink-0 w-full py-4 sm:py-5 flex justify-center items-center relative z-20">
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
