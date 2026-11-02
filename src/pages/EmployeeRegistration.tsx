import { useState } from 'react';
import { motion } from 'motion/react';
import { UserCheck, ArrowRight, ShieldCheck, Wifi, Tablet, ArrowLeft, Radio, Clock, Sparkles } from 'lucide-react';
import { AtherLogo } from '../components/common/AtherLogo';
import { LanguageSwitcher } from '../components/common/LanguageSwitcher';
import type { LanguageCode, UserProfile } from '../engine/types';

interface Props {
  lang: LanguageCode;
  profile: UserProfile;
  onSelectLang: (lang: LanguageCode) => void;
  onRegister: (name: string, employeeId: string, shift: string) => void;
  onBack: () => void;
  targetStageIndex?: number;
}

const SAMPLE_BADGES = [
  { name: 'Ramesh Patil', id: 'OP-AURIC-104', shift: 'Shift A (06:00 - 14:30)' },
  { name: 'Sunil Shinde', id: 'OP-AURIC-219', shift: 'Shift B (14:30 - 23:00)' },
  { name: 'Pooja Deshmukh', id: 'OP-AURIC-305', shift: 'Shift A (06:00 - 14:30)' },
  { name: 'Amit Gadekar', id: 'OP-AURIC-412', shift: 'Shift C (23:00 - 06:30)' },
];

const MODULE_TITLES = [
  'Module 1: Gate & Dock Operations (XXXX_PRO_001)',
  'Module 2: Receiving & IQC Clearance (02_C1_S2)',
  'Module 3: Vehicle & Battery Put-Away (03_C1_S3)',
  'Module 4: Battery Cell Vault (04_C1_S4)',
  'Module 5: Hazardous Chemicals & Thinners (05_C1_S5)',
  'Module 6: Supermarket C-Class MH1 (06_C1_S6)',
  'Module 7: Quarantine & Scrap Disposition (07_C1_S7)',
  'Module 8: Vehicle Line Issuance & Picking (08_C2_S8)',
  'Module 9: Paint Shop Decanting Buffers (09_C2_S9)',
  'Module 10: Indirect Material Handling (10_C2_S10)',
  'Module 11: Production Inspection & Quality PIR (11_C2_S11)',
  'Module 12: Reverse Logistics & Empty Bin Strapping (12_C2_S12)'
];

export const EmployeeRegistration: React.FC<Props> = ({
  lang,
  profile,
  onSelectLang,
  onRegister,
  onBack,
  targetStageIndex = 0
}) => {
  const [name, setName] = useState(profile.name || 'Ramesh Patil');
  const [employeeId, setEmployeeId] = useState(profile.operatorId || 'OP-AURIC-104');
  const [shift, setShift] = useState('Shift A (06:00 - 14:30)');
  const [rfidActive, setRfidActive] = useState(false);

  const handleSimulateRfidScan = () => {
    setRfidActive(true);
    // Cycle to a random sample badge
    const randomIndex = Math.floor(Math.random() * SAMPLE_BADGES.length);
    const chosen = SAMPLE_BADGES[randomIndex];
    setName(chosen.name);
    setEmployeeId(chosen.id);
    setShift(chosen.shift);
    setTimeout(() => setRfidActive(false), 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onRegister(name.trim(), employeeId.trim() || 'OP-AURIC-104', shift);
  };

  const currentModuleTitle = MODULE_TITLES[targetStageIndex] || MODULE_TITLES[0];

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
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-white/90 backdrop-blur-md text-slate-700 hover:text-slate-900 border border-slate-200/90 shadow-2xs transition-all cursor-pointer min-h-[44px]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>DOJO Home</span>
        </button>

        <div className="flex items-center gap-2.5">
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-white/90 backdrop-blur-md text-blue-700 border border-blue-200/90 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            DOJO Operator Station · Plant M002
          </span>
          <LanguageSwitcher currentLang={lang} onSelectLang={onSelectLang} />
        </div>
      </header>

      {/* ── Main Content: Horizontal Split in Upper Screen ───────────── */}
      <main className="flex-1 flex items-start justify-center px-4 pt-3 sm:pt-6 pb-4 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="w-full max-w-4xl lg:max-w-5xl bg-white/95 backdrop-blur-md rounded-3xl shadow-xl shadow-blue-900/10 border border-slate-200/90 overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
            {/* ── Left Column: Brand Hero Column ─────────────────────── */}
            <div className="hidden md:flex md:col-span-5 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white p-7 lg:p-8 flex-col justify-between relative overflow-hidden">
              <div className="relative z-10 space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-xs font-semibold tracking-wide">
                  <UserCheck className="w-3.5 h-3.5 text-blue-200" />
                  <span>Ather AURIC Plant M002 DOJO</span>
                </div>
                <h2 className="text-xl lg:text-2xl font-black tracking-tight leading-snug">
                  Operator Shift Registration
                </h2>
                <p className="text-blue-100/90 text-xs sm:text-sm font-normal leading-relaxed">
                  Authenticate your operator credentials and shift roster to track real-time SOP competency scores and certification records.
                </p>
              </div>

              {/* Trainee Visual Badge */}
              <div className="relative z-10 flex flex-col items-center justify-center py-6 my-auto">
                <div className="relative">
                  <div className="w-24 h-24 rounded-3xl bg-white/15 border-2 border-white/30 flex items-center justify-center shadow-lg text-white text-3xl font-black">
                    {(name.trim().charAt(0) || 'O').toUpperCase()}
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white rounded-full p-1.5 shadow-md">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                </div>
                <span className="mt-3 text-xs font-mono font-bold text-blue-100 uppercase tracking-widest">
                  {employeeId} · Plant M002
                </span>
                <span className="text-[11px] text-blue-200/90 font-medium">
                  {shift.split(' ')[0]} {shift.split(' ')[1]}
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
                  10.1" Rugged Tablet
                </span>
              </div>
            </div>

            {/* ── Right Column: Input Form ────────────────────────────── */}
            <div className="col-span-1 md:col-span-7 p-6 sm:p-8 lg:p-9 flex flex-col justify-center">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Floor Trainee Sign-In
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
                    Tap below to simulate an RFID badge scan or enter your credentials.
                  </p>
                </div>

                {/* Instant RFID Scan Simulation Button */}
                <button
                  type="button"
                  onClick={handleSimulateRfidScan}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
                    rfidActive
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-md scale-95'
                      : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-300 shadow-2xs'
                  }`}
                  title="Simulate RFID Card Tap on Tablet Scanner"
                >
                  <Radio className={`w-3.5 h-3.5 ${rfidActive ? 'animate-ping' : ''}`} />
                  <span>{rfidActive ? 'Scanning Badge...' : 'Tap RFID Badge'}</span>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Operator Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                    Operator Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name (e.g. Ramesh Patil)"
                    className="w-full px-4 py-3 min-h-[50px] rounded-xl border border-slate-200 bg-slate-50 text-base font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all placeholder:text-slate-400"
                  />
                </div>

                {/* Employee ID & Shift Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                      Badge / Operator ID
                    </label>
                    <input
                      type="text"
                      value={employeeId}
                      onChange={(e) => setEmployeeId(e.target.value)}
                      placeholder="OP-AURIC-104"
                      className="w-full px-4 py-3 min-h-[50px] rounded-xl border border-slate-200 bg-slate-50 text-base font-mono font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all placeholder:text-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">
                      Shift Roster
                    </label>
                    <div className="relative">
                      <select
                        value={shift}
                        onChange={(e) => setShift(e.target.value)}
                        className="w-full px-4 py-3 min-h-[50px] rounded-xl border border-slate-200 bg-slate-50 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all cursor-pointer appearance-none"
                      >
                        <option value="Shift A (06:00 - 14:30)">Shift A (06:00 - 14:30)</option>
                        <option value="Shift B (14:30 - 23:00)">Shift B (14:30 - 23:00)</option>
                        <option value="Shift C (23:00 - 06:30)">Shift C (23:00 - 06:30)</option>
                      </select>
                      <Clock className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Assigned Module Banner */}
                <div className="p-3.5 rounded-2xl bg-blue-50/80 border border-blue-200/90 text-xs text-blue-900 font-medium flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-blue-600 text-white shadow-2xs shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold block text-slate-900">Assigned Training Module:</span>
                    <span className="font-semibold text-blue-800">{currentModuleTitle}</span>
                  </div>
                </div>

                {/* Submit CTA (Glove-friendly min 56px height) */}
                <button
                  type="submit"
                  className="w-full min-h-[56px] py-3.5 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold rounded-2xl transition-all text-base shadow-lg shadow-blue-500/25 active:scale-99 cursor-pointer flex items-center justify-center gap-2.5 mt-2"
                >
                  <span>Enter Training Station</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </main>

      {/* ── Bottom Footer: Dual Branding ─────────────────────────────── */}
      <footer className="shrink-0 w-full py-3 flex justify-center items-center relative z-20">
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
