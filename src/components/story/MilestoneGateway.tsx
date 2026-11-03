import React from 'react';
import {
  Trophy,
  Award,
  CheckCircle2,
  RefreshCcw,
  ArrowRight,
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
  appMode?: 'receiving' | 'picking';
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
  hearts: _hearts,
  attempts: _attempts,
  onSelectScene,
  onSelectStage,
  onViewScorecard,
  onViewCertificate,
  onRestartFull,
  appMode
}) => {
  const badgeIndex = stage.stageNumber - 1;
  const badge = STAGE_BADGES[badgeIndex] || STAGE_BADGES[0];
  const isFinalStage = stageIndex >= totalStages - 1;
  const stageTitle = stage.stageTitle[lang] || stage.stageTitle.en;
  const heroImage =
    stage.scenes[0]?.media?.posterSrc ||
    stage.scenes[0]?.media?.imageSrc ||
    '/Assets/environments/bg_plant_map_hotspot.jpg';

  return (
    <div className="w-full max-w-xl mx-auto my-auto bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-2xl flex flex-col overflow-hidden select-none animate-in fade-in zoom-in-95 duration-200">
      {/* 1. Header Banner with Integrated Trophy Emblem */}
      <div className="relative h-24 sm:h-28 w-full overflow-hidden bg-slate-950 shrink-0">
        <img
          src={heroImage}
          alt={stageTitle}
          className="w-full h-full object-cover filter brightness-90 contrast-105"
        />
        {/* Subtle Dark Gradient Vignette for readable overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-slate-950/20" />

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

          <span className="text-[10px] font-mono font-black px-2.5 py-0.5 rounded-full bg-emerald-950/85 text-emerald-300 border border-emerald-500/50 backdrop-blur-xs uppercase tracking-wider">
            {appMode === 'picking' || stage.stageNumber > 7 ? 'ORDER PICKING & PACKAGING' : 'WAREHOUSE RECEIVING & PUT-AWAY'}
          </span>
        </div>

        {/* Center Floating Emblem Trophy */}
        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 z-10 flex items-center justify-center">
          <div className="relative">
            <div
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr ${badge.gradient} text-white flex items-center justify-center shadow-xl border-3 border-white`}
            >
              <Trophy className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 shadow-md border-2 border-white">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Middle Body: Title, Badge, Metrics & Single Status Chip */}
      <div className="px-5 sm:px-7 pt-7 pb-4 text-center space-y-3.5">
        {/* Title & Badge */}
        <div className="space-y-1">
          <div
            className={`inline-flex items-center gap-1.5 text-[11px] font-mono font-extrabold ${badge.accentColor} ${badge.bgLight} px-3 py-0.5 rounded-full border ${badge.badgeBorder} shadow-2xs`}
          >
            <Award className="w-3 h-3" />
            <span>{badge.title}</span>
          </div>

          <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-tight">
            {lang === 'hi'
              ? `मॉड्यूल ${stage.stageNumber}: ${stageTitle} पूर्ण!`
              : lang === 'mr'
              ? `मॉड्यूल ${stage.stageNumber}: ${stageTitle} पूर्ण!`
              : `Module ${stage.stageNumber}: ${stageTitle} Completed!`}
          </h2>

          <p className="text-xs text-slate-500 font-medium max-w-md mx-auto">
            All standard operating procedures successfully mastered with 100% SOP compliance.
          </p>
        </div>

        {/* Performance Metric Strip (Clean 3 Columns) */}
        <div className="grid grid-cols-3 gap-2 p-2.5 bg-slate-50 rounded-xl border border-slate-200/90 text-center font-mono">
          <div className="space-y-0.5">
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              {xp > 0 ? 'Points Scored' : 'Safety Record'}
            </div>
            <div className="text-base sm:text-lg font-black text-emerald-600">
              {xp > 0 ? `+${xp} pts` : 'Zero Breaches'}
            </div>
          </div>
          <div className="space-y-0.5 border-x border-slate-200">
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              SOP Decisions
            </div>
            <div className="text-base sm:text-lg font-black text-slate-800">
              {stage.scenes.length} / {stage.scenes.length} Passed
            </div>
          </div>
          <div className="space-y-0.5">
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Compliance Rate
            </div>
            <div className="text-base sm:text-lg font-black text-emerald-600">
              100% SOP
            </div>
          </div>
        </div>

        {/* Compact Single Verification Chip (No cluttered 9-slice list) */}
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-3.5 py-1 rounded-full">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>All {stage.scenes.length} factory floor scenarios validated & approved</span>
        </div>
      </div>

      {/* 3. Action Dock (Clean & Centered) */}
      <div className="px-5 sm:px-7 py-3 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between gap-2.5 shrink-0">
        <div className="flex items-center gap-2">
          {/* Replay Current Module */}
          <button
            type="button"
            onClick={() => onSelectScene(0)}
            className="px-3.5 py-2 rounded-xl font-bold text-xs bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <RefreshCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Replay Module</span>
          </button>

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
            className="min-h-[42px] px-5 sm:px-6 py-2 rounded-xl font-black text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/25 active:scale-95 transition-all flex items-center gap-2 cursor-pointer ml-auto"
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
                className="min-h-[42px] px-5 sm:px-6 py-2 rounded-xl font-black text-xs sm:text-sm bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg shadow-amber-500/25 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Award className="w-4 h-4" />
                <span>🏆 View Grandmaster Certificate</span>
              </button>
            )}

            {onRestartFull && (
              <button
                type="button"
                onClick={onRestartFull}
                className="px-3.5 py-2 rounded-xl font-bold text-xs bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Restart</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
