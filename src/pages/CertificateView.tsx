import React from 'react';
import { motion } from 'motion/react';
import { Award, Printer, ArrowLeft, ShieldCheck, CheckCircle2, UserCheck, Factory } from 'lucide-react';
import type { RunSummary, LanguageCode, UserProfile } from '../engine/types';
import { getCertificateTranslations } from '../i18n/translations';

interface Props {
  summary: RunSummary;
  lang: LanguageCode;
  profile: UserProfile;
  onBack: () => void;
  onNavigateHome: () => void;
  sopDoc?: string;
  appMode?: 'receiving' | 'picking';
}

export const CertificateView: React.FC<Props> = ({
  summary,
  lang,
  profile,
  onBack,
  onNavigateHome,
  sopDoc,
  appMode = 'receiving'
}) => {
  const isPicking = appMode === 'picking';
  const t = getCertificateTranslations(lang);
  const currentDate = React.useMemo(() => {
    return new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }, []);

  const certNumber = React.useMemo(() => {
    const idSeed = profile.operatorId ? profile.operatorId.replace(/[^0-9]/g, '') : '104';
    return `ATH-AURIC-M002-${profile.operatorId || 'OP'}-${idSeed || '7429'}`;
  }, [profile.operatorId]);

  const handlePrint = () => {
    window.print();
  };

  const packTitleText = isPicking
    ? t.pickingModuleName
    : t.receivingModuleName;
  const resolvedSop = sopDoc || (isPicking ? 'AURIC-PRO-C2-008 (Line Feeding & Reverse Logistics)' : 'AURIC-PRO-C1-001 (Inbound Intake & Stowage Protocol)');

  return (
    <div className="h-[100dvh] max-h-[100dvh] w-full overflow-hidden bg-[#F1F5F9] text-slate-900 flex flex-col justify-between font-sans select-none print:h-auto print:max-h-none print:overflow-visible print:bg-white print:p-0 antialiased">
      {/* ── Top Action Header (Hidden on print) ───────────────────── */}
      <header className="shrink-0 h-11 sm:h-12 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs px-4 sm:px-6 flex items-center justify-between print:hidden z-20">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold font-mono text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all cursor-pointer active:scale-98 shadow-2xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t.returnToScorecard}</span>
        </button>

        <span className="hidden md:inline-block text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
          {t.officialCredential}
        </span>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold font-mono text-white bg-[#14232b] hover:bg-[#1a3340] active:bg-[#0f1b22] shadow-sm shadow-slate-900/20 transition-all cursor-pointer active:scale-98"
          >
            <Printer className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t.printCertificate}</span>
          </button>
          <button
            onClick={onNavigateHome}
            className="px-3 py-1.5 rounded-xl text-xs font-bold font-mono text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 transition-all cursor-pointer active:scale-98"
          >
            <span>{t.finishSession}</span>
          </button>
        </div>
      </header>

      {/* ── Main Certificate Canvas (Prestige Engraved Border, Viewport Perfect) ── */}
      <main className="flex-1 min-h-0 w-full max-w-5xl mx-auto px-3 sm:px-6 py-2 sm:py-3 flex items-center justify-center overflow-hidden print:p-0 print:max-w-none print:h-auto print:overflow-visible">
        <motion.div
          id="certificate-print-area"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full bg-white rounded-2xl sm:rounded-3xl shadow-2xl border-2 sm:border-[3px] border-[#14232b] px-6 py-4 sm:px-8 sm:py-5 relative overflow-hidden flex flex-col justify-between print:shadow-none print:border-2 print:border-slate-800 print:rounded-none print:max-w-none print:w-full print:p-8 print:max-h-none"
        >
          {/* Authentic Dual Hairline Inset Border with Corner Accents */}
          <div className="absolute inset-2 sm:inset-2.5 border border-amber-600/30 rounded-xl sm:rounded-2xl pointer-events-none print:border-slate-400" />
          
          {/* Subtle Corner Flourishes */}
          <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-amber-600/60 pointer-events-none" />
          <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-amber-600/60 pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-amber-600/60 pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-amber-600/60 pointer-events-none" />

          {/* ── 1. Header Row: Dual Corporate Branding & Serial Verification ── */}
          <div className="relative z-10 flex items-start justify-between border-b border-slate-200 pb-2.5 mb-2 shrink-0">
            <div className="flex items-center gap-2.5 sm:gap-3.5">
              <div className="bg-white px-2 py-1 rounded-lg border border-slate-200 shadow-2xs">
                <img
                  src="/logo/ather-logo.png"
                  alt="Ather Energy"
                  className="h-5 sm:h-6 w-auto object-contain block"
                />
              </div>
              <div className="h-6 w-px bg-slate-300" />
              <img
                src="/logo/Tetrahedron-logo-transparent.svg"
                alt="Tetrahedron"
                className="h-5 sm:h-6 object-contain opacity-95"
              />
              <div className="h-6 w-px bg-slate-300" />
              <div className="flex flex-col text-left">
                <span className="text-[10px] sm:text-[11px] font-mono font-black tracking-widest text-slate-800 uppercase">
                  {t.auricHeader}
                </span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  {t.industrialSafetyDojo}
                </span>
              </div>
            </div>

            <div className="text-right">
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-50 border border-emerald-300 rounded-full text-[10px] font-mono font-bold text-emerald-800">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                <span>{t.verifiedSopCompliance}</span>
              </div>
              <div className="text-[9px] font-mono text-slate-400 mt-0.5">
                {t.refPrefix}{certNumber} · {t.issuedPrefix}{currentDate}
              </div>
            </div>
          </div>

          {/* ── 2. Certificate Title & Proclamation ── */}
          <div className="relative z-10 text-center space-y-1 mb-2 shrink-0">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-extrabold tracking-widest uppercase text-emerald-800 bg-emerald-50 px-3 py-0.5 rounded-full border border-emerald-200">
              <Award className="w-3 h-3 text-emerald-600" />
              <span>{t.certificateTitle}</span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight font-serif sm:font-sans">
              {t.certificateName}
            </h1>
            <p className="text-[11px] sm:text-xs text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
              {t.certificateBody}
            </p>
          </div>

          {/* ── 3. Certified Operator Nameplate ── */}
          <div className="relative z-10 my-1 sm:my-2 p-2.5 sm:p-3 bg-slate-50/90 rounded-xl sm:rounded-2xl border border-slate-200/90 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 shadow-2xs">
            <div className="flex items-center gap-3 sm:gap-4 text-center sm:text-left">
              {profile.photoUrl ? (
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden border-2 border-emerald-500/40 shadow-xs shrink-0 bg-white">
                  <img src={profile.photoUrl} alt={profile.name} className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 inset-x-0 bg-emerald-600 text-white text-[7px] font-mono font-bold text-center py-0.5">
                    VERIFIED
                  </div>
                </div>
              ) : (
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-[#14232b] to-[#1e3a47] text-white flex items-center justify-center text-lg font-black shadow-xs shrink-0 border border-slate-300">
                  <UserCheck className="w-6 h-6 text-emerald-400" />
                </div>
              )}
              <div>
                <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400 block mb-0.5 font-bold">
                  {t.certifiedOperatorLabel}
                </span>
                <div className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-tight">
                  {profile.name || t.defaultOperatorName}
                </div>
                <div className="flex items-center gap-2 sm:gap-3 mt-0.5 text-[11px] font-mono text-slate-600">
                  <span className="flex items-center gap-1">
                    <UserCheck className="w-3 h-3 text-blue-600" />
                    <span>{t.empIdPrefix}<strong className="text-slate-900">{profile.operatorId || 'OP-AURIC-104'}</strong></span>
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Factory className="w-3 h-3 text-blue-600" />
                    <span><strong className="text-slate-900">{t.facilityLabel}</strong></span>
                  </span>
                </div>
              </div>
            </div>

            {/* Verified QC Badge */}
            <div className="shrink-0 px-3 py-1.5 bg-emerald-50 rounded-xl border border-emerald-300 text-center">
              <div className="text-[9px] font-mono font-black text-emerald-800 uppercase tracking-widest flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>{t.verifiedQcPass}</span>
              </div>
              <div className="text-[10px] font-bold text-emerald-700 mt-0.5">
                {t.standardCompliant}
              </div>
            </div>
          </div>

          {/* ── 4. Module & SOP Standard Specification Box ── */}
          <div className="relative z-10 bg-blue-50/40 rounded-xl sm:rounded-2xl border border-blue-200/70 p-2.5 sm:p-3 mb-2 shrink-0">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 text-center sm:text-left">
              <div>
                <span className="text-[9px] font-mono uppercase tracking-wider text-slate-500 block">
                  {t.certifiedModuleLabel}
                </span>
                <span className="text-xs font-bold text-slate-900 block mt-0.5 truncate">
                  {packTitleText}
                </span>
                <span className="text-[10px] text-slate-600">
                  {isPicking ? t.pickingModuleSlices : t.receivingModuleSlices}
                </span>
              </div>

              <div>
                <span className="text-[9px] font-mono uppercase tracking-wider text-slate-500 block">
                  {t.governingStandardLabel}
                </span>
                <span className="text-xs font-bold text-blue-700 font-mono block mt-0.5 truncate">
                  {resolvedSop}
                </span>
                <span className="text-[10px] text-slate-600">
                  {t.governingStandardSub}
                </span>
              </div>

              <div className="text-center sm:text-right">
                <span className="text-[9px] font-mono uppercase tracking-wider text-slate-500 block">
                  {t.assessmentScoreLabel}
                </span>
                <span className="text-sm sm:text-base font-black text-emerald-600 block mt-0.5">
                  {summary.accuracyPct}% {t.accuracyLabel}
                </span>
                <span className="text-[10px] font-mono text-slate-500">
                  {summary.correctSteps}/{summary.totalSteps} {t.pointsScoredSuffix} · {t.zeroViolations}
                </span>
              </div>
            </div>
          </div>

          {/* ── 5. Signatures & Official Embossed Seal ── */}
          <div className="relative z-10 pt-2 sm:pt-2.5 border-t border-slate-200 flex items-center justify-between gap-2 sm:gap-4 shrink-0">
            {/* Left Signatory: Ather Energy Plant Operations */}
            <div className="text-left w-1/3">
              <svg className="w-24 sm:w-28 h-6 text-slate-700" viewBox="0 0 120 30" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M 5,20 Q 20,5 35,18 T 60,12 T 85,22 T 110,15" />
                <path d="M 15,22 L 40,24" />
              </svg>
              <div className="text-xs font-black text-slate-900 leading-tight">{t.plantOpsHeadName}</div>
              <div className="text-[9px] font-mono text-slate-500 leading-tight">{t.plantOpsHeadTitle}</div>
            </div>

            {/* Center Official Dojo Seal */}
            <div className="flex items-center gap-2 border-2 border-emerald-600/80 rounded-xl px-2.5 py-1 text-center text-emerald-900 bg-emerald-50/80 rotate-[-1deg] shadow-xs shrink-0">
              <img
                src="/Assets/Props/prop_qc_pass_stamp.png"
                alt="QC Pass"
                className="w-8 h-8 object-contain drop-shadow-xs"
              />
              <div className="text-left">
                <div className="text-[8px] font-mono font-bold tracking-widest uppercase text-emerald-900">
                  Ather AURIC Dojo
                </div>
                <div className="text-[10px] font-black tracking-wider uppercase text-emerald-700 leading-tight">
                  {t.qcPassCertifiedStamp}
                </div>
                <div className="text-[8px] font-mono text-emerald-600">
                  {t.m002QaStampSub}
                </div>
              </div>
            </div>

            {/* Right Signatory: Tetrahedron Technical Training */}
            <div className="text-right w-1/3">
              <svg className="w-24 sm:w-28 h-6 text-slate-700 ml-auto" viewBox="0 0 120 30" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M 10,18 Q 30,2 50,16 T 80,10 T 100,20 T 115,12" />
                <path d="M 25,23 L 65,21" />
              </svg>
              <div className="text-xs font-black text-slate-900 leading-tight">{t.qualitySafetyHeadName}</div>
              <div className="text-[9px] font-mono text-slate-500 leading-tight">{t.qualitySafetyHeadTitle}</div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* ── Footer Branding (Hidden on print) ─────────────────────── */}
      <footer className="shrink-0 py-1.5 text-center print:hidden">
        <span className="text-[11px] font-mono text-slate-400">
          Ather Energy AURIC Plant M002 · Developed by Tetrahedron Manufacturing Services
        </span>
      </footer>
    </div>
  );
};
