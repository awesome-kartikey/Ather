import React from 'react';
import {
  Trophy,
  Award,
  CheckCheck,
  RefreshCcw,
  ArrowRight,
  ArrowLeft,
  BarChart3,
  ShieldCheck
} from 'lucide-react';
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
    accentColor: 'text-amber-800',
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
  const heroImage =
    stage.scenes[0]?.media?.posterSrc ||
    stage.scenes[0]?.media?.imageSrc ||
    '/Assets/environments/bg_plant_map_hotspot.jpg';

  return (
    <div className="w-full h-full max-w-4xl mx-auto bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-2xl flex flex-col justify-between overflow-hidden select-none">
      {/* 1. Header Banner with Integrated Trophy & Badges */}
      <div className="relative h-28 sm:h-32 w-full overflow-hidden bg-slate-950 shrink-0">
        <img
          src={heroImage}
          alt={stageTitle}
          className="w-full h-full object-cover filter brightness-90 contrast-105"
        />
        {/* Subtle Dark Gradient Vignette for readable overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-slate-950/20" />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-3.5 right-3.5 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-mono font-black px-2.5 py-0.5 rounded-full bg-slate-900/90 text-slate-200 border border-slate-700/80 backdrop-blur-xs">
              AURIC PLANT M002 · MODULE {stage.stageNumber}
            </span>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-900/85 text-blue-200 border border-blue-500/50 backdrop-blur-xs">
              {stage.sopDoc}
            </span>
          </div>

          <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-950/85 text-emerald-300 border border-emerald-500/50 backdrop-blur-xs">
            {isCat1 ? 'CATEGORY 1: INBOUND' : 'CATEGORY 2: OUTBOUND'}
          </span>
        </div>

        {/* Center Floating Emblem Trophy */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center justify-center">
          <div className="relative">
            <div
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr ${badge.gradient} text-white flex items-center justify-center shadow-xl border-4 border-white`}
            >
              <Trophy className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-1 shadow-md border-2 border-white">
              <CheckCheck className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Middle Body: Headline, Badge, Description, Metrics, Slices */}
      <div className="flex-1 min-h-0 flex flex-col justify-between px-4 sm:px-6 md:px-8 pt-7 pb-2 space-y-2.5 text-center overflow-hidden">
        {/* Title & Badge */}
        <div className="space-y-1 shrink-0">
          <div
            className={`inline-flex items-center gap-1.5 text-[11px] font-mono font-extrabold ${badge.accentColor} ${badge.bgLight} px-3 py-1 rounded-full border ${badge.badgeBorder} shadow-2xs`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>{badge.title}</span>
          </div>

          <h2 className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-tight">
            {lang === 'hi'
              ? `मॉड्यूल ${stage.stageNumber}: ${stageTitle} पूर्ण!`
              : lang === 'mr'
              ? `मॉड्यूल ${stage.stageNumber}: ${stageTitle} पूर्ण!`
              : `Module ${stage.stageNumber}: ${stageTitle} Completed!`}
          </h2>

          <p className="text-[11px] sm:text-xs text-slate-600 max-w-xl mx-auto leading-relaxed line-clamp-2">
            {badge.description}
          </p>
        </div>

        {/* Performance Metric Strip (3 Compact Columns) */}
        <div className="grid grid-cols-3 gap-2 p-2 sm:p-2.5 bg-slate-50/90 rounded-xl border border-slate-200/90 text-center font-mono shrink-0">
          <div className="space-y-0.5">
            <div className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              XP Earned
            </div>
            <div className="text-base sm:text-lg md:text-xl font-black text-emerald-600">
              +{xp}
            </div>
          </div>
          <div className="space-y-0.5 border-x border-slate-200">
            <div className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Decisions Executed
            </div>
            <div className="text-base sm:text-lg md:text-xl font-black text-slate-800">
              {attempts} Passed
            </div>
          </div>
          <div className="space-y-0.5">
            <div className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Floor Accuracy
            </div>
            <div className="text-sm sm:text-base md:text-lg font-black text-rose-500">
              {hearts > 0 ? '❤️'.repeat(hearts) : 'Passed'}
            </div>
          </div>
        </div>

        {/* 3. Completed Slices Progress Strip (Compact Pills) */}
        <div className="text-left bg-slate-50/70 rounded-xl p-2.5 border border-slate-200/90 space-y-1.5 shrink-0">
          <div className="text-[10px] font-mono font-bold text-slate-500 uppercase flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>
                Module {stage.stageNumber} Completed Slices ({stage.scenes.length}/{stage.scenes.length}):
              </span>
            </div>
            <span className="text-emerald-700 font-black">100% SOP COMPLIANT</span>
          </div>

          {/* Compact Chip Matrix */}
          <div className="flex flex-wrap gap-1.5 max-h-[72px] overflow-y-auto pr-0.5">
            {stage.scenes.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => onSelectScene(i)}
                title={`Replay Scene ${i + 1}: ${s.title?.[lang] || s.title?.en || `Scene ${i + 1}`}`}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-400 text-slate-700 hover:text-blue-700 text-[11px] font-medium transition-colors cursor-pointer shadow-2xs"
              >
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[9px] flex items-center justify-center shrink-0">
                  ✓
                </span>
                <span className="truncate max-w-[140px] sm:max-w-[180px]">
                  Sc {i + 1}: {s.title?.[lang] || s.title?.en || (s as any).name?.[lang] || (s as any).name?.en || `Scene ${i + 1}`}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Action Dock (Always Visible, High-Priority Call to Action) */}
      <div className="px-4 sm:px-6 md:px-8 py-3 border-t border-slate-100 bg-slate-50/50 flex flex-wrap items-center justify-between gap-2.5 shrink-0">
        <div className="flex items-center gap-2">
          {/* Replay Current Module */}
          <button
            type="button"
            onClick={() => onSelectScene(0)}
            className="px-3.5 py-2 rounded-xl font-bold text-xs bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <RefreshCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Replay Module</span>
          </button>

          {/* Review Previous Stage */}
          {stageIndex > 0 && (
            <button
              type="button"
              onClick={() => onSelectStage(stageIndex - 1)}
              className="px-3 py-2 rounded-xl font-bold text-xs bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Module {stage.stageNumber - 1}</span>
            </button>
          )}

          {/* View Detailed Scorecard */}
          {onViewScorecard && (
            <button
              type="button"
              onClick={onViewScorecard}
              className="px-3.5 py-2 rounded-xl font-bold text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <BarChart3 className="w-3.5 h-3.5 text-blue-600" />
              <span>Scorecard</span>
            </button>
          )}
        </div>

        {/* PRIMARY CALL TO ACTION BUTTON */}
        {!isFinalStage ? (
          <button
            type="button"
            onClick={() => onSelectStage(stageIndex + 1)}
            className="min-h-[44px] px-6 py-2.5 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/25 active:scale-95 transition-all flex items-center gap-2 cursor-pointer ml-auto"
          >
            <span>
              {lang === 'hi'
                ? `मॉड्यूल ${stage.stageNumber + 1} पर आगे बढ़ें`
                : lang === 'mr'
                ? `मॉड्यूल ${stage.stageNumber + 1} वर पुढे जा`
                : `Proceed to Module ${stage.stageNumber + 1}`}
            </span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        ) : (
          <div className="flex items-center gap-2 ml-auto">
            {onViewCertificate && (
              <button
                type="button"
                onClick={onViewCertificate}
                className="min-h-[44px] px-6 py-2.5 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg shadow-amber-500/25 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Award className="w-4 h-4" />
                <span>🏆 View Grandmaster Certificate</span>
              </button>
            )}

            {onRestartFull && (
              <button
                type="button"
                onClick={onRestartFull}
                className="px-4 py-2 rounded-xl font-bold text-xs bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Restart Journey</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
