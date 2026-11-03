import React from 'react';
import { motion } from 'motion/react';
import { Award, Printer, ArrowLeft, ShieldCheck, CheckCircle2, Calendar, UserCheck, Factory } from 'lucide-react';
import type { RunSummary, LanguageCode, UserProfile } from '../engine/types';
import { AtherLogo } from '../components/common/AtherLogo';

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
  lang: _lang,
  profile,
  onBack,
  onNavigateHome,
  sopDoc,
  appMode = 'receiving'
}) => {
  const isPicking = appMode === 'picking';
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
    ? 'Order Picking & Packaging Certification'
    : 'Warehouse Receiving & Put-Away Certification';
  const resolvedSop = sopDoc || (isPicking ? 'AURIC-PRO-C2-008 (Line Feeding & Reverse Logistics)' : 'AURIC-PRO-C1-001 (Inbound Intake & Stowage Protocol)');

  return (
    <div className="min-h-screen bg-slate-100/90 text-slate-900 flex flex-col font-sans select-none print:bg-white print:p-0">
      {/* Top Action Bar (Hidden on print) */}
      <header className="shrink-0 bg-white border-b border-slate-200/90 shadow-2xs print:hidden">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold font-mono text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            RETURN TO RESULTS
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold font-mono text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              PRINT CERTIFICATE (A4)
            </button>
            <button
              onClick={onNavigateHome}
              className="px-4 py-2 rounded-xl text-xs font-bold font-mono text-slate-600 hover:text-slate-900 transition-all cursor-pointer"
            >
              FINISH SESSION
            </button>
          </div>
        </div>
      </header>

      {/* Main Certificate Canvas */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-8 print:p-0">
        <motion.div
          id="certificate-print-area"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border-4 border-slate-200/80 p-8 sm:p-12 relative overflow-hidden print:shadow-none print:border-2 print:border-slate-800 print:rounded-none print:max-w-none print:w-full print:p-8"
        >
          {/* Subtle Watermark & Guilloche Border */}
          <div className="absolute inset-3 border-2 border-dashed border-blue-200/60 rounded-2xl pointer-events-none print:border-slate-400" />
          <img
            src="/Assets/environments/bg_supermarket_sm.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-5 mix-blend-multiply pointer-events-none"
          />
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-blue-50/50 pointer-events-none -z-0 blur-3xl print:hidden" />

          {/* Header Row */}
          <div className="relative z-10 flex items-start justify-between border-b border-slate-100 pb-6 mb-8">
            <div className="flex items-center gap-3">
              <AtherLogo className="h-10" />
              <div className="h-8 w-px bg-slate-200 mx-1" />
              <img
                src="/logo/Tetrahedron-logo-transparent.svg"
                alt="Tetrahedron"
                className="h-8 object-contain opacity-90"
              />
              <div className="h-8 w-px bg-slate-200 mx-1" />
              <div className="flex flex-col">
                <span className="text-[11px] font-mono font-bold tracking-widest text-slate-500 uppercase">
                  AURIC Plant M002 · Sambhajinagar
                </span>
                <span className="text-xs font-bold text-slate-800">
                  Industrial Safety & Operations Dojo
                </span>
              </div>
            </div>

            <div className="text-right">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-[11px] font-mono font-bold text-emerald-700">
                <ShieldCheck className="w-3.5 h-3.5" />
                VERIFIED SOP COMPLIANCE
              </div>
              <div className="text-[10px] font-mono text-slate-400 mt-1">
                Ref: {certNumber}
              </div>
            </div>
          </div>

          {/* Certificate Title */}
          <div className="relative z-10 text-center space-y-2 mb-8">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase text-blue-600 bg-blue-50/80 px-4 py-1.5 rounded-full border border-blue-200/60">
              <Award className="w-4 h-4 text-blue-600" />
              Certificate of Operational Competency
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Ather Floor Operator SOP Certification
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              This officially certifies that the operator named below has successfully undergone interactive training and rigorous digital assessment for standard operating procedures at Ather Energy AURIC Mega-Plant.
            </p>
          </div>

          {/* Operator Nameplate with Photo */}
          <div className="relative z-10 my-6 p-4 sm:p-5 bg-slate-50/80 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-center sm:text-left">
              {profile.photoUrl ? (
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-slate-300 shadow-sm shrink-0 bg-white">
                  <img src={profile.photoUrl} alt={profile.name} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-2xl font-black shadow-sm shrink-0">
                  {(profile.name || 'O').charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-0.5">
                  Certified Operator / Trainee
                </span>
                <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {profile.name || 'AURIC Warehouse Operator'}
                </div>
                <div className="flex items-center gap-3 mt-1 text-xs font-mono text-slate-600">
                  <span className="flex items-center gap-1">
                    <UserCheck className="w-3.5 h-3.5 text-blue-600" />
                    Emp ID: <strong className="text-slate-800">{profile.operatorId || 'AUR-104'}</strong>
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Factory className="w-3.5 h-3.5 text-blue-600" />
                    Facility: <strong className="text-slate-800">AURIC Mega-Plant</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Verified QC Badge */}
            <div className="shrink-0 p-3 bg-emerald-50 rounded-xl border border-emerald-300 text-center">
              <div className="text-[10px] font-mono font-black text-emerald-800 uppercase tracking-widest">
                VERIFIED QC PASS
              </div>
              <div className="text-xs font-bold text-emerald-700 mt-0.5">
                Standard Compliant
              </div>
            </div>
          </div>

          {/* Module & SOP Information */}
          <div className="relative z-10 bg-blue-50/40 rounded-2xl border border-blue-200/60 p-4 sm:p-5 mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">
                  Certified Operational Module
                </span>
                <span className="text-xs font-bold text-slate-900 block mt-0.5">
                  {packTitleText}
                </span>
                <span className="text-[11px] text-slate-600">
                  {isPicking ? '5 Modules · 39 Operational Slices' : '7 Modules · 52 Operational Slices'}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">
                  Governing SOP Standard
                </span>
                <span className="text-xs font-bold text-blue-700 font-mono block mt-0.5">
                  {resolvedSop}
                </span>
                <span className="text-[11px] text-slate-600">
                  Ather AURIC Standard Operating Procedures
                </span>
              </div>

              <div className="text-center sm:text-right">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">
                  Assessment Score
                </span>
                <span className="text-lg font-black text-emerald-600 block mt-0.5">
                  {summary.accuracyPct}% Accuracy
                </span>
                <span className="text-[11px] font-mono text-slate-500">
                  {summary.correctSteps} / {summary.totalSteps} Points Scored · Zero Violations
                </span>
              </div>
            </div>
          </div>

          {/* Signatures & Certification Stamp */}
          <div className="relative z-10 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                  Date of Certification
                </span>
                <span className="text-xs font-bold font-mono text-slate-800">
                  {currentDate}
                </span>
              </div>
            </div>

            {/* Official Digital Stamp with Authentic QC Pass Prop */}
            <div className="relative flex items-center gap-2 border-2 border-emerald-600/70 rounded-xl px-3 py-1.5 text-center text-emerald-800 bg-emerald-50/70 rotate-[-2deg] shadow-xs">
              <img
                src="/Assets/Props/prop_qc_pass_stamp.png"
                alt="Ather QC Pass"
                className="w-10 h-10 object-contain drop-shadow-xs"
              />
              <div className="text-left">
                <div className="text-[9px] font-mono font-bold tracking-widest uppercase text-emerald-900">
                  Ather AURIC Training Dojo
                </div>
                <div className="text-xs font-black tracking-wider uppercase flex items-center gap-1 text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  QC PASS &amp; CERTIFIED
                </div>
                <div className="text-[8px] font-mono text-emerald-600">
                  M002 QA &amp; Safety Cell Verified
                </div>
              </div>
            </div>

            {/* Platform Credential */}
            <div className="text-right">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                Training Platform
              </span>
              <span className="text-xs font-bold text-slate-800 block">
                Tetrahedron DOJO Engine
              </span>
              <span className="text-[10px] font-mono text-blue-600">
                tetrahedron.in
              </span>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer Branding (Hidden on print) */}
      <footer className="shrink-0 py-4 text-center print:hidden">
        <span className="text-xs font-mono text-slate-400">
          Ather Energy AURIC Plant M002 · Developed by Tetrahedron Manufacturing Services
        </span>
      </footer>
    </div>
  );
};
