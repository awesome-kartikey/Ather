import React from 'react';
import { Trophy, Award, CheckCheck, RefreshCcw, ArrowRight, ArrowLeft, BarChart3, ShieldCheck } from 'lucide-react';
import type { StoryStage, LanguageCode } from '../../engine/story/types';

interface Props {
  stage: StoryStage;
  stageIndex: number;
  totalStages: number;
  lang: LanguageCode;
  xp: number;
  hearts: number;
  attempts: number;
  onSelectScene: (sceneIdx: number) => void;
  onSelectStage: (stageIdx: number) => void;
  onViewScorecard?: () => void;
  onViewCertificate?: () => void;
  onRestartFull?: () => void;
}

interface BadgeInfo {
  title: string;
  gradient: string;
  accentColor: string;
  bgLight: string;
  badgeBorder: string;
  description: string;
}

const STAGE_BADGES: Record<number, BadgeInfo> = {
  0: {
    title: 'BADGE UNLOCKED: GATE KEEPER',
    gradient: 'from-amber-500 to-emerald-600',
    accentColor: 'text-amber-700',
    bgLight: 'bg-amber-50',
    badgeBorder: 'border-amber-300',
    description: 'Mastered all Gate & Dock Operations under SOP XXXX_PRO_001. Waiting yard parking, DEO document triage, SAP gate entry, thermal pass printing, dock bay allocation, and wheel chocks safety verified.'
  },
  1: {
    title: 'BADGE UNLOCKED: QUALITY SENTINEL',
    gradient: 'from-emerald-500 to-teal-600',
    accentColor: 'text-emerald-800',
    bgLight: 'bg-emerald-50',
    badgeBorder: 'border-emerald-300',
    description: 'Mastered all Receiving & IQC Clearance steps under SOP 02_C1_S2. Non-DOL GRN inspection, 10% statistical sampling, yellow UNDER IQC cone demarcation, 30-minute handover SLA, and 3-way lot disposition verified.'
  },
  2: {
    title: 'BADGE UNLOCKED: HIGH-RISE STOWAGE MASTER',
    gradient: 'from-amber-500 to-orange-600',
    accentColor: 'text-amber-800',
    bgLight: 'bg-amber-50',
    badgeBorder: 'border-amber-300',
    description: 'Mastered all Vehicle & Battery Parts Put-Away steps under SOP 03_C1_S3. Handling Unit barcode scanning, route segregation, reach truck high-rise rack stowing, location QR scan bin marriage, and omitted scan hazard avoidance verified.'
  },
  3: {
    title: 'BADGE UNLOCKED: CELL VAULT GUARDIAN',
    gradient: 'from-cyan-500 to-blue-600',
    accentColor: 'text-cyan-800',
    bgLight: 'bg-cyan-50',
    badgeBorder: 'border-cyan-300',
    description: 'Mastered all Specialized Battery Cell Put-Away steps under SOP 04_C1_S3. Certified MHE verification, 20°C–25°C & 60%–65% RH climate cleanroom control, 2-hour strict put-away SLA countdown, and environmental breach alarm containment verified.'
  },
  4: {
    title: 'BADGE UNLOCKED: HAZMAT CUSTODIAN',
    gradient: 'from-rose-500 to-amber-600',
    accentColor: 'text-rose-800',
    bgLight: 'bg-rose-50',
    badgeBorder: 'border-rose-300',
    description: 'Mastered all Hazardous Chemicals & Thinners Put-Away steps under SOP 05_C1_S3. Direct Chemical Annex routing, chemical PPE, secondary spill-containment bunds, static earthing bonding clamps, and flammability segregation verified.'
  },
  5: {
    title: 'BADGE UNLOCKED: SUPERMARKET KANBAN SPECIALIST',
    gradient: 'from-indigo-500 to-teal-500',
    accentColor: 'text-indigo-800',
    bgLight: 'bg-indigo-50',
    badgeBorder: 'border-indigo-300',
    description: 'Mastered all Supermarket C-Class Parts Put-Away steps under SOP 06_C1_S3. Green QC Pass seal audits, physical sampling vs SAP LX02 discrepancy escalation, rear-loaded gravity flow rack FIFO stowage, and e-Kanban replenishment verified.'
  },
  6: {
    title: 'BADGE UNLOCKED: QUARANTINE DISPOSITION AUTHORITY',
    gradient: 'from-red-600 to-amber-600',
    accentColor: 'text-red-800',
    bgLight: 'bg-red-50',
    badgeBorder: 'border-red-300',
    description: 'Mastered all Quality Rejections & Quarantine Disposition steps under SOP 07_C1_S3. Defective lot quarantine, Red Tagging + QC stickers, JIRA defect logging, SC01 BL caged storage, the 4-way disposition filter, and scrap shredding verified.'
  },
  7: {
    title: 'BADGE UNLOCKED: LINE FEEDER CHAMPION',
    gradient: 'from-sky-600 to-cyan-500',
    accentColor: 'text-sky-800',
    bgLight: 'bg-sky-50',
    badgeBorder: 'border-sky-300',
    description: 'Mastered all Vehicle Line Issuance & Order Picking steps under SOP 01_C2_S1. MES automated picking task activation, blind source QR scanning, trolley QR marriage, supermarket lane verification, workstation delivery handshakes, and reverse asset recovery verified.'
  },
  8: {
    title: 'BADGE UNLOCKED: PAINT & DECANTING VIRTUOSO',
    gradient: 'from-amber-600 to-orange-500',
    accentColor: 'text-amber-800',
    bgLight: 'bg-amber-50',
    badgeBorder: 'border-amber-300',
    description: 'Mastered all Paint Shop Line Issuance & Decanting steps under SOP 02_C2_S1 & 03_C2_S2. 28 unique feeder matrix, 2-pallet decanting buffer e-Kanban RFID triggers, 100% full trolley capacity discipline, and mezzanine paint shop sequencing verified.'
  },
  9: {
    title: 'BADGE UNLOCKED: INDIRECT STORES & SPARES CUSTODIAN',
    gradient: 'from-purple-600 to-indigo-600',
    accentColor: 'text-purple-800',
    bgLight: 'bg-purple-50',
    badgeBorder: 'border-purple-300',
    description: 'Mastered all Indirect Material Handling steps under SOP 10_C2_S1. "No Reservation, No Material" security rule, SAP YMB21 stock transfer postings (CM01 to MN01), MRS Cost Center error audits, and the physical tracking register protocol verified.'
  },
  10: {
    title: 'BADGE UNLOCKED: PIR & STO DISPATCH SPECIALIST',
    gradient: 'from-sky-600 to-indigo-600',
    accentColor: 'text-sky-800',
    bgLight: 'bg-sky-50',
    badgeBorder: 'border-sky-300',
    description: 'Mastered all Production Inspection & Quality PIR steps under SOP 05_C2_S3. JIRA Budget ID mandate, dual approval thresholds (> ₹25k / > 25 units), 4:00 PM dispatch SLA cutoff clock, and SAP STO E-Way Bill gate compliance verified.'
  },
  11: {
    title: 'GRANDMASTER UNLOCKED: WAREHOUSE OPERATIONS GRANDMASTER',
    gradient: 'from-amber-500 via-emerald-500 to-indigo-600',
    accentColor: 'text-amber-900',
    bgLight: 'bg-amber-50',
    badgeBorder: 'border-amber-300',
    description: 'Complete Factory Floor Journey Mastered! All 12 Standard Operating Procedure modules and all 91 factory floor interactive challenges at Ather Energy AURIC Plant M002 successfully completed with 100% SOP compliance.'
  }
};

export const MilestoneGateway: React.FC<Props> = ({
  stage,
  stageIndex,
  totalStages,
  lang,
  xp,
  hearts,
  attempts,
  onSelectScene,
  onSelectStage,
  onViewScorecard,
  onViewCertificate,
  onRestartFull
}) => {
  const badge = STAGE_BADGES[stageIndex] || STAGE_BADGES[0];
  const isFinalStage = stageIndex >= totalStages - 1;
  const isCat1 = stage.stageNumber <= 7;
  const stageTitle = stage.stageTitle[lang] || stage.stageTitle.en;

  return (
    <div className="my-auto bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-2xl max-w-3xl mx-auto text-center space-y-6 select-none">
      {/* Trophy & Badge Award */}
      <div className="relative inline-block">
        <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr ${badge.gradient} text-white flex items-center justify-center mx-auto shadow-xl shadow-blue-900/15 animate-bounce`}>
          <Trophy className="w-10 h-10 sm:w-12 sm:h-12" />
        </div>
        <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white rounded-full p-1.5 shadow-md">
          <CheckCheck className="w-4 h-4" />
        </div>
      </div>

      <div className="space-y-2">
        <div className={`inline-flex items-center gap-1.5 text-xs font-mono font-extrabold ${badge.accentColor} ${badge.bgLight} px-4 py-1.5 rounded-full border ${badge.badgeBorder} shadow-xs`}>
          <Award className="w-4 h-4" />
          <span>{badge.title}</span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
          Module {stage.stageNumber}: {stageTitle} Completed!
        </h2>

        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
          {badge.description}
        </p>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-[11px] font-mono text-slate-500">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>SOP Standard: <strong>{stage.sopDoc}</strong> · {isCat1 ? 'Category 1: Inbound' : 'Category 2: Outbound'}</span>
        </div>
      </div>

      {/* Performance Metric Strip */}
      <div className="grid grid-cols-3 gap-2.5 sm:gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200/90 text-center font-mono">
        <div className="space-y-0.5">
          <div className="text-[11px] text-slate-400 uppercase">XP Earned</div>
          <div className="text-lg sm:text-2xl font-black text-emerald-600">+{xp}</div>
        </div>
        <div className="space-y-0.5 border-x border-slate-200">
          <div className="text-[11px] text-slate-400 uppercase">Decisions Made</div>
          <div className="text-lg sm:text-2xl font-black text-slate-800">{attempts}</div>
        </div>
        <div className="space-y-0.5">
          <div className="text-[11px] text-slate-400 uppercase">Hearts Left</div>
          <div className="text-base sm:text-xl font-black text-rose-500">{'❤️'.repeat(hearts)}</div>
        </div>
      </div>

      {/* Completed Milestones List */}
      <div className="text-left bg-slate-50/80 rounded-2xl p-4 border border-slate-200 space-y-2.5">
        <div className="text-xs font-mono font-bold text-slate-500 uppercase flex items-center justify-between">
          <span>Module {stage.stageNumber} Completed Slices ({stage.scenes.length}/{stage.scenes.length}):</span>
          <span className="text-emerald-600 font-extrabold">100% SOP COMPLIANT</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {stage.scenes.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => onSelectScene(i)}
              className="flex items-center gap-2 p-2 rounded-xl bg-white border border-slate-200 hover:border-blue-400 text-slate-700 hover:text-blue-700 transition-colors text-left cursor-pointer"
            >
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-mono font-bold text-[10px] flex items-center justify-center shrink-0">
                ✓
              </span>
              <span className="truncate font-medium">
                Sc {i + 1}: {s.title?.[lang] || s.title?.en || (s as any).name?.[lang] || (s as any).name?.en || `Scene ${i + 1}`}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Actions Strip */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        {/* Replay Current Module */}
        <button
          type="button"
          onClick={() => onSelectScene(0)}
          className="w-full sm:w-auto px-5 py-3 rounded-2xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <RefreshCcw className="w-4 h-4" />
          <span>Replay Module {stage.stageNumber}</span>
        </button>

        {/* Review Previous Stage */}
        {stageIndex > 0 && (
          <button
            type="button"
            onClick={() => onSelectStage(stageIndex - 1)}
            className="w-full sm:w-auto px-5 py-3 rounded-2xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Review Module {stage.stageNumber - 1}</span>
          </button>
        )}

        {/* View Detailed Scorecard */}
        {onViewScorecard && (
          <button
            type="button"
            onClick={onViewScorecard}
            className="w-full sm:w-auto px-5 py-3 rounded-2xl font-bold text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <BarChart3 className="w-4 h-4 text-blue-600" />
            <span>View Competency Scorecard</span>
          </button>
        )}

        {/* Proceed to Next Module OR View Grandmaster Certificate */}
        {!isFinalStage ? (
          <button
            type="button"
            onClick={() => onSelectStage(stageIndex + 1)}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl font-extrabold text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Proceed to Module {stage.stageNumber + 1}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <>
            {onViewCertificate && (
              <button
                type="button"
                onClick={onViewCertificate}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl font-extrabold text-xs bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white shadow-xl shadow-amber-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Award className="w-4 h-4" />
                <span>🏆 View &amp; Print Grandmaster Certificate</span>
              </button>
            )}

            {onRestartFull && (
              <button
                type="button"
                onClick={onRestartFull}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Restart 12-Module Journey</span>
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};
