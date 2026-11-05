import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { AtherCapsuleLogo } from '../components/common/AtherCapsuleLogo';
import { LanguageSwitcher } from '../components/common/LanguageSwitcher';
import type { LanguageCode } from '../engine/types';

interface LandingPageProps {
  lang: LanguageCode;
  onSelectLang: (lang: LanguageCode) => void;
  onStartTraining: () => void;
  onLaunchModule: (stageIndex: number) => void;
  onOpenAdmin?: () => void;
  appMode?: 'receiving' | 'picking';
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
  imageSrc: string;
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
    color: 'from-blue-600 to-indigo-600',
    imageSrc: '/Assets/videos/scene_01_gate_arrival_poster.jpg'
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
    color: 'from-emerald-600 to-teal-600',
    imageSrc: '/Assets/videos/scene_03_iqc_inspection_split_poster.jpg'
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
    color: 'from-amber-600 to-orange-600',
    imageSrc: '/Assets/videos/scene_04_high_rise_pallet_putaway_poster.jpg'
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
    color: 'from-rose-600 to-red-600',
    imageSrc: '/Assets/videos/scene_05_battery_vault_climate_poster.jpg'
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
    color: 'from-purple-600 to-indigo-700',
    imageSrc: '/Assets/environments/bg_chemical_building.jpg'
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
    color: 'from-teal-600 to-cyan-600',
    imageSrc: '/Assets/environments/bg_supermarket_sm.jpg'
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
    color: 'from-red-600 to-rose-700',
    imageSrc: '/Assets/environments/bg_ng_quarantine_area.jpg'
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
    color: 'from-blue-600 to-cyan-700',
    imageSrc: '/Assets/videos/scene_07_milk_run_delivery_poster.jpg'
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
    color: 'from-indigo-600 to-violet-700',
    imageSrc: '/Assets/videos/scene_06_bulk_decanting_trolley_poster.jpg'
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
    color: 'from-amber-600 to-yellow-600',
    imageSrc: '/Assets/environments/bg_indirect_material_store.jpg'
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
    color: 'from-emerald-600 to-green-700',
    imageSrc: '/Assets/environments/bg_deo_gate_office.jpg'
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
    color: 'from-blue-700 to-slate-900',
    imageSrc: '/Assets/videos/scene_08_empty_bin_strapping_poster.jpg'
  }
];

export const LandingPage: React.FC<LandingPageProps> = ({
  lang,
  onSelectLang,
  onStartTraining,
  onLaunchModule,
  onOpenAdmin,
  appMode = 'receiving'
}) => {
  const activeCategoryTab: 1 | 2 = appMode === 'picking' ? 2 : 1;
  const isPicking = appMode === 'picking';

  const filteredModules = MODULES_DATA.filter((m) => m.category === activeCategoryTab);

  return (
    <div className="min-h-[100dvh] w-full overflow-x-hidden bg-slate-50 text-slate-900 font-sans relative flex flex-col justify-between">
      {/* Background ambient lighting orbs */}
      <div className={`fixed top-[-20%] left-[-10%] w-[800px] h-[800px] ${isPicking ? 'bg-blue-400/10' : 'bg-emerald-400/10'} rounded-full blur-[120px] pointer-events-none`} />
      <div className="fixed bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-slate-400/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed inset-0 bg-[url('/noise.svg')] opacity-[0.025] pointer-events-none" />

      {/* ── Top Bar: Dual Branding & Language Switcher (Clean 48px Header with Tablet Safe-Area) ── */}
      <header className="shrink-0 w-full px-4 sm:px-8 pl-[max(env(safe-area-inset-left),1rem)] pr-[max(env(safe-area-inset-right),2.5rem)] pt-[max(env(safe-area-inset-top),0.75rem)] pb-3 flex items-center justify-between border-b border-slate-200/80 bg-white/90 backdrop-blur-md relative z-20">
        <div className="flex items-center gap-2">
          <AtherCapsuleLogo />
          <div className="h-4 w-px bg-slate-300" />
          <a
            href="https://tetrahedron.in"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 group"
          >
            <img
              src="/logo/Tetrahedron-logo-transparent.svg"
              alt="Tetrahedron Logo"
              className="h-4 w-auto object-contain group-hover:scale-105 transition-transform"
            />
            <span className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
              Tetrahedron
            </span>
          </a>

          <div className="h-4 w-px bg-slate-300 hidden md:block" />

          {/* App Badge */}
          <span className={`hidden md:inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-mono font-black uppercase tracking-wider ${
            isPicking
              ? 'bg-blue-50 text-blue-800 border border-blue-200'
              : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
          }`}>
            {isPicking ? 'Order Picking & Packaging' : 'Warehouse Receiving & Put-Away'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {onOpenAdmin && (
            <button
              type="button"
              onClick={onOpenAdmin}
              className="px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold bg-slate-900 text-slate-200 hover:bg-slate-800 border border-slate-700 transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
              title="Open Admin & Telemetry Console"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Admin Console</span>
            </button>
          )}
          <LanguageSwitcher currentLang={lang} onSelectLang={onSelectLang} />
        </div>
      </header>

      {/* ── Hero Section (Concise, Modern & Uncluttered) ─────────── */}
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10 pb-12 relative z-10 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex flex-col items-center space-y-3 max-w-2xl mx-auto"
        >
          {/* Main Title - Branded for Specific PWA */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            {isPicking ? (
              <>
                Order Picking &amp;{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700">
                  Packaging DOJO
                </span>
              </>
            ) : (
              <>
                Warehouse Receiving &amp;{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700">
                  Put-Away DOJO
                </span>
              </>
            )}
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-600 font-medium max-w-xl">
            {isPicking
              ? 'Interactive vehicle line feeding, paint decanting, order picking, and reverse logistics simulations for Ather AURIC Plant M002.'
              : 'Interactive vehicle gate check, DEO document triage, SAP ERP intake, and high-rise put-away simulations for Ather AURIC Plant M002.'}
          </p>

          {/* Primary Action Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={onStartTraining}
              className={`min-h-[50px] px-8 py-3 text-base sm:text-lg font-extrabold text-white transition-all duration-300 rounded-xl shadow-md active:scale-98 cursor-pointer flex items-center gap-2 ${
                isPicking
                  ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/20'
                  : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20'
              }`}
            >
              <span>Enter DOJO Station</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* ── Targeted Modules Grid Launcher (Zero cross-category leakage) ── */}
        <section className="w-full mt-10 text-left">
          <div className="flex items-center justify-between gap-3 mb-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {isPicking
                  ? 'Order Picking & Packaging Modules (SOP 08 – 12)'
                  : 'Warehouse Receiving & Put-Away Modules (SOP 01 – 07)'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                {isPicking
                  ? 'Master all 5 Outbound Standard Operating Procedures with 100% SOP accuracy.'
                  : 'Master all 7 Inbound Standard Operating Procedures with 100% SOP accuracy.'}
              </p>
            </div>
          </div>

          {/* Module Grid - 100% Clean Image, Metadata below image, Clickable card */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredModules.map((m) => (
              <motion.div
                key={m.index}
                whileHover={{ y: -3, transition: { duration: 0.15 } }}
                onClick={() => onLaunchModule(m.index)}
                className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-blue-400 transition-all flex flex-col justify-between group cursor-pointer active:scale-[0.99] select-none"
              >
                <div>
                  {/* Clean image with ZERO gradient overlays or clutter */}
                  <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden mb-3 border border-slate-200/90 shadow-2xs bg-slate-100">
                    <img
                      src={m.imageSrc}
                      alt={m.title[lang]}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>

                  {/* Metadata Row BELOW the image: Module Number on Left, Scenes Count on Right */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono font-extrabold px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200/70">
                      MODULE {String(m.number).padStart(2, '0')}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200/60">
                      {m.scenesCount} Scenes
                    </span>
                  </div>

                  {/* Module Title */}
                  <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {m.title[lang]}
                  </h4>

                  {/* Role Badge */}
                  <div className="flex items-center gap-2 mt-1 text-xs text-slate-500 font-medium">
                    <span className="text-emerald-700 font-bold">{m.badge}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {/* ── Bottom: Unified Dual Branding Footer ─────────────────────── */}
      <footer className="shrink-0 w-full py-4 sm:py-5 flex justify-center items-center relative z-20 border-t border-slate-200/80 bg-white/70 backdrop-blur-md">
        <div className="inline-flex items-center gap-2.5 sm:gap-3 px-4 sm:px-5 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-2xs">
          <AtherCapsuleLogo />

          <div className="h-4 w-px bg-slate-300" />

          {/* Tetrahedron Branding */}
          <a
            href="https://tetrahedron.in"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 group"
          >
            <img
              src="/logo/Tetrahedron-logo-transparent.svg"
              alt="Tetrahedron Logo"
              className="h-4 w-auto object-contain group-hover:scale-105 transition-transform"
            />
            <span className="text-xs font-extrabold text-slate-800 group-hover:text-blue-600 transition-colors">
              Tetrahedron
            </span>
          </a>
        </div>
      </footer>
    </div>
  );
};
