import { useState, useEffect } from 'react';
import type {
  LanguageCode,
  TrainingMode,
  UserProfile,
  LeaderboardRecord,
  SettingsConfig
} from '../engine/types';
import type { TrainingPackData } from '../content/schema';
import { useTranslation } from '../i18n/translations';
import { getLevelInfo } from '../engine/gamification';
import { idbStore } from '../store/idbStore';
import { TactileButton } from '../components/TactileButton';
import {
  Truck,
  FileCheck,
  ShieldCheck,
  Clock,
  Play,
  Trophy,
  Sparkles,
  Flame,
  Award,
  Layers
} from 'lucide-react';

interface HomeScreenProps {
  lang: LanguageCode;
  mode: TrainingMode;
  profile: UserProfile;
  settings: SettingsConfig;
  packs: TrainingPackData[];
  onUpdateProfile: (updated: UserProfile) => void;
  onSelectMode: (mode: TrainingMode) => void;
  onStartTraining: (packId: string) => void;
}

export function HomeScreen({
  lang,
  mode: _mode,
  profile,
  settings,
  packs,
  onUpdateProfile,
  onSelectMode,
  onStartTraining
}: HomeScreenProps) {
  const t = useTranslation(lang);
  const [nameInput, setNameInput] = useState(profile.name);
  const [leaderboard, setLeaderboard] = useState<LeaderboardRecord[]>([]);

  const levelInfo = getLevelInfo(profile.xp);
  const receivingPack = packs.find((p) => p.id === 'rec') || packs[0];

  useEffect(() => {
    setNameInput(profile.name);
  }, [profile.name]);

  useEffect(() => {
    if (settings.leaderboardEnabled && receivingPack) {
      idbStore.getLeaderboard(receivingPack.id, 5).then((records) => {
        setLeaderboard(records);
      });
    }
  }, [receivingPack, settings.leaderboardEnabled]);

  const handleNameBlur = () => {
    if (nameInput.trim() !== profile.name) {
      onUpdateProfile({ ...profile, name: nameInput.trim() });
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto p-4 sm:p-6 w-full animate-in fade-in duration-300 select-none">
      {/* Top Banner: Plant Location & SOP Status */}
      <div className="bg-card p-4 sm:p-5 rounded-2xl border-3 border-ink shadow-[4px_4px_0px_#14232b] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-act/20 border-2 border-act flex items-center justify-center shrink-0">
            <Truck className="w-6 h-6 text-act" />
          </div>
          <div>
            <h1 className="font-heading font-black text-2xl sm:text-3xl text-ink tracking-wide leading-none">
              Ather AURIC · Inbound Logistics Terminal
            </h1>
            <p className="font-body text-xs sm:text-sm font-semibold text-ink/70 mt-1">
              {t.plantLocation} · Standard Warehouse SOP Verification Station
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold px-3 py-1 bg-concrete border-2 border-ink rounded-lg text-ink">
            {t.docNumber}
          </span>
          <span className="font-mono text-xs font-bold px-3 py-1 bg-act text-card border-2 border-ink rounded-lg shadow-sm">
            {t.effectiveDate}
          </span>
        </div>
      </div>

      {/* Operator ID & Stats HUD */}
      <div className="bg-card p-5 rounded-2xl border-3 border-ink shadow-[4px_4px_0px_#14232b] flex flex-wrap items-center justify-between gap-4">
        {/* Name Input */}
        <div className="flex items-center gap-3">
          <span className="font-heading font-extrabold text-base sm:text-lg text-ink shrink-0">
            {t.yourName}:
          </span>
          <input
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            onBlur={handleNameBlur}
            placeholder={t.namePlaceholder}
            className="px-4 py-2 bg-concrete border-2 border-ink rounded-xl font-heading font-bold text-lg text-ink focus:outline-none focus:ring-4 focus:ring-act/50 min-w-[200px]"
          />
        </div>

        {/* Level & Streak Stats */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="px-4 py-2 bg-concrete rounded-xl border-2 border-ink font-heading font-extrabold text-base text-ink flex items-center gap-2 shadow-[2px_2px_0px_#14232b]">
            <Sparkles className="w-4 h-4 text-act" />
            <span>
              {levelInfo.currentLevel.title[lang]} · {profile.xp} {t.xp}
            </span>
          </div>

          <div className="px-4 py-2 bg-concrete rounded-xl border-2 border-ink font-heading font-extrabold text-base text-ink flex items-center gap-2 shadow-[2px_2px_0px_#14232b]">
            <Flame className="w-4 h-4 text-act" />
            <span>
              {profile.streak || 1} {t.dayStreak}
            </span>
          </div>

          {profile.badges && profile.badges.length > 0 && (
            <div className="px-4 py-2 bg-ok/20 rounded-xl border-2 border-ok font-heading font-extrabold text-base text-ink flex items-center gap-2">
              <Award className="w-4 h-4 text-ok" />
              <span>{profile.badges.length} Badges</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Grid: Module 1 Stage 1 Card & Sidebar Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Stage 1 Detailed Module Card (8 cols) */}
        <div className="lg:col-span-8 bg-card rounded-3xl border-3 border-ink shadow-[6px_6px_0px_#14232b] p-6 sm:p-8 flex flex-col gap-6">
          {/* Card Header */}
          <div className="flex items-start justify-between gap-4 border-b-3 border-ink/20 pb-5">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <span className="font-heading font-black text-xs uppercase px-2.5 py-0.5 bg-act text-card rounded-md border border-ink">
                  MODULE 1 · STAGE 1
                </span>
                <span className="font-mono text-xs font-bold text-ink/60">
                  XXXX_PRO_001
                </span>
              </div>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-ink tracking-wide">
                Gate Entry & Dock Operations
              </h2>
              <p className="font-body text-sm sm:text-base text-ink/80 font-medium">
                Standard operating procedures for supplier truck reporting, ERP gate pass creation,
                windshield barcode tagging, bay allocation, and dock safety compliance.
              </p>
            </div>
            <span className="text-5xl shrink-0">🚛</span>
          </div>

          {/* Core Operational Protocols Checklist */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="p-3.5 rounded-xl border-2 border-ink bg-concrete/60 flex items-start gap-3">
              <FileCheck className="w-5 h-5 text-act shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <span className="font-heading font-black text-base text-ink">
                  1. Document Verification
                </span>
                <span className="text-xs text-ink/75 font-semibold">
                  Driver DL & RC to Security; PO, ASN & Invoice to DEO.
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border-2 border-ink bg-concrete/60 flex items-start gap-3">
              <Layers className="w-5 h-5 text-act shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <span className="font-heading font-black text-base text-ink">
                  2. SAP YMM_GATE_ENTRY
                </span>
                <span className="text-xs text-ink/75 font-semibold">
                  Enter Vendor Invoice No. to auto-fill ASN & truck lot data.
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border-2 border-ink bg-concrete/60 flex items-start gap-3">
              <Truck className="w-5 h-5 text-act shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <span className="font-heading font-black text-base text-ink">
                  3. YPR_GATEENTRY & Dock Alloc
                </span>
                <span className="text-xs text-ink/75 font-semibold">
                  Print windshield barcode slip and route to assigned bay dock.
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border-2 border-ink bg-concrete/60 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-no shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <span className="font-heading font-black text-base text-ink">
                  4. Wheel Chocks & Return DC
                </span>
                <span className="text-xs text-ink/75 font-semibold">
                  Engine off + wheel chocks under tires before unloading starts.
                </span>
              </div>
            </div>
          </div>

          {/* SLA / KPI Notice Bar */}
          <div className="flex items-center justify-between gap-4 p-3.5 rounded-xl bg-concrete border-2 border-ink text-xs font-mono font-bold text-ink/90">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-act" />
              <span>GATE PROCESS SLA: 1 HOUR</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-ok" />
              <span>QUEUE KPI: 15 MIN MAX CLEARANCE</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <TactileButton
              variant="primary"
              size="xl"
              onClick={() => {
                onSelectMode('practice');
                onStartTraining(receivingPack?.id || 'rec');
              }}
              className="w-full sm:flex-1"
            >
              <Play className="w-7 h-7 fill-card stroke-[2.5]" />
              <span>{t.startPractice}</span>
            </TactileButton>

            <TactileButton
              variant="secondary"
              size="lg"
              onClick={() => {
                onSelectMode('guided');
                onStartTraining(receivingPack?.id || 'rec');
              }}
              className="w-full sm:w-auto"
            >
              <span>{t.startGuided}</span>
            </TactileButton>
          </div>
        </div>

        {/* Sidebar: Leaderboard & Quick Guides (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Tablet Leaderboard Card */}
          {settings.leaderboardEnabled && (
            <div className="bg-card p-6 rounded-3xl border-3 border-ink shadow-[4px_4px_0px_#14232b] flex flex-col gap-4">
              <div className="flex items-center gap-2.5 border-b-2 border-ink/20 pb-3">
                <Trophy className="w-6 h-6 text-act" />
                <h3 className="font-heading font-black text-xl text-ink uppercase tracking-wide">
                  {t.topRuns}
                </h3>
              </div>

              {leaderboard.length === 0 ? (
                <div className="py-6 text-center text-ink/60 font-medium text-sm">
                  No simulation runs recorded yet. Complete Stage 1 to set the first score!
                </div>
              ) : (
                <div className="flex flex-col gap-2.5">
                  {leaderboard.map((rec, idx) => (
                    <div
                      key={rec.id}
                      className="p-3 bg-concrete rounded-xl border-2 border-ink flex items-center justify-between text-sm shadow-[2px_2px_0px_#14232b]"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-ink text-card flex items-center justify-center font-heading font-black text-xs">
                          {idx + 1}
                        </span>
                        <span className="font-heading font-bold text-ink truncate max-w-[120px]">
                          {rec.workerName}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 font-mono font-bold">
                        <span className="text-act">{rec.xp} XP</span>
                        <span>{'⭐'.repeat(rec.stars)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Operational SOP Card */}
          <div className="bg-act/10 p-5 rounded-2xl border-3 border-act shadow-[4px_4px_0px_#ee6a1f] flex flex-col gap-2.5 text-ink">
            <span className="font-heading font-black text-base uppercase text-act flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" />
              SOP Compliance Reminder
            </span>
            <p className="font-body text-xs sm:text-sm font-semibold leading-relaxed">
              Never bypass physical document cross-referencing. Inward materials without valid ASN or
              unblocked trucks at the dock present severe safety and stock accuracy violations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
