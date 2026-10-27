import { useState, useEffect } from 'react';
import type { LanguageCode, TrainingMode, UserProfile, LeaderboardRecord, SettingsConfig } from '../engine/types';
import type { TrainingPackData } from '../content/schema';
import { useTranslation } from '../i18n/translations';
import { getLevelInfo, BADGES } from '../engine/gamification';
import { idbStore } from '../store/idbStore';
import { Play, Eye, Trophy, Sparkles } from 'lucide-react';

interface HomeScreenProps {
  lang: LanguageCode;
  mode: TrainingMode;
  profile: UserProfile;
  settings: SettingsConfig;
  packs: TrainingPackData[];
  onUpdateProfile: (updated: UserProfile) => void;
  onStartTraining: (packId: string) => void;
  onWatchDemo: (packId: string) => void;
}

export function HomeScreen({
  lang,
  mode,
  profile,
  settings,
  packs,
  onUpdateProfile,
  onStartTraining,
  onWatchDemo
}: HomeScreenProps) {
  const t = useTranslation(lang);
  const [nameInput, setNameInput] = useState(profile.name);
  const [leaderboards, setLeaderboards] = useState<Record<string, LeaderboardRecord[]>>({});

  const levelInfo = getLevelInfo(profile.xp);

  useEffect(() => {
    setNameInput(profile.name);
  }, [profile.name]);

  useEffect(() => {
    if (settings.leaderboardEnabled) {
      packs.forEach(async (pack) => {
        const records = await idbStore.getLeaderboard(pack.id, 5);
        setLeaderboards((prev) => ({ ...prev, [pack.id]: records }));
      });
    }
  }, [packs, settings.leaderboardEnabled]);

  const handleNameBlur = () => {
    if (nameInput !== profile.name) {
      onUpdateProfile({ ...profile, name: nameInput.trim() });
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto p-4 sm:p-6 w-full animate-in fade-in duration-300">
      {/* Subtitle Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-card p-4 rounded-2xl border-3 border-ink shadow-sm">
        <p className="font-medium text-ink/80 text-base sm:text-lg">
          {t.subtitle}
        </p>
        <span className="text-xs font-mono bg-act/20 text-ink border border-act px-3 py-1 rounded-full whitespace-nowrap">
          {t.plantLocation}
        </span>
      </div>

      {/* Operator HUD Card: Name, Level, XP, Streak */}
      <div className="bg-card p-5 rounded-2xl border-3 border-ink shadow-md flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Worker Name Input */}
          <div className="flex items-center gap-3">
            <span className="font-heading text-lg font-bold text-ink shrink-0">
              {t.yourName}:
            </span>
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              onBlur={handleNameBlur}
              placeholder={t.namePlaceholder}
              className="px-4 py-2 bg-concrete/60 border-2 border-ink rounded-xl font-heading text-xl font-bold text-ink focus:outline-none focus:ring-4 focus:ring-act/40 max-w-[240px]"
            />
          </div>

          {/* Level & Streak Stats */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="px-4 py-1.5 bg-concrete rounded-full border-2 border-ink font-heading text-lg font-bold text-ink flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-act" />
              <span>
                {levelInfo.currentLevel.title[lang]} · {profile.xp} {t.xp}
              </span>
            </div>

            <div className="px-4 py-1.5 bg-concrete rounded-full border-2 border-ink font-heading text-lg font-bold text-ink flex items-center gap-2">
              <span>🔥</span>
              <span>
                {profile.streak || 0} {t.dayStreak}
              </span>
            </div>
          </div>
        </div>

        {/* Level XP Progress Bar */}
        <div className="w-full">
          <div className="flex justify-between text-xs font-mono font-bold text-ink/70 mb-1">
            <span>Level Progress</span>
            <span>
              {levelInfo.nextLevel
                ? `${profile.xp} / ${levelInfo.nextLevel.minXp} XP (${levelInfo.progressPct}%)`
                : 'MAX LEVEL REACHED'}
            </span>
          </div>
          <div className="w-full h-4 bg-concrete rounded-full border-2 border-ink overflow-hidden">
            <div
              className="h-full bg-act transition-all duration-500 rounded-full"
              style={{ width: `${levelInfo.progressPct}%` }}
            />
          </div>
        </div>

        {/* Badges Shelf */}
        {profile.badges.length > 0 && (
          <div className="flex items-center gap-2 pt-2 border-t-2 border-ink/20 flex-wrap">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-ink/60 mr-2">
              EARNED BADGES:
            </span>
            {profile.badges.map((bId) => {
              const badge = BADGES[bId];
              if (!badge) return null;
              return (
                <div
                  key={bId}
                  title={`${badge.title[lang]} — ${badge.description[lang]}`}
                  className="flex items-center gap-1.5 px-3 py-1 bg-concrete border-2 border-ink rounded-xl text-sm font-heading font-bold shadow-sm"
                >
                  <span className="text-xl">{badge.icon}</span>
                  <span>{badge.title[lang]}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Training Packs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {packs.map((pack) => {
          const bestStars = profile.packBestStars[pack.id] || 0;

          return (
            <div
              key={pack.id}
              className="bg-card p-6 rounded-3xl border-3 border-ink shadow-lg flex flex-col justify-between gap-6 hover:shadow-xl transition-all"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-6xl p-3 bg-concrete/60 rounded-2xl border-2 border-ink/20 inline-block">
                    {pack.icon}
                  </span>
                  {bestStars > 0 && (
                    <div className="flex items-center gap-1 bg-concrete px-3 py-1.5 rounded-xl border-2 border-ink font-heading text-lg font-bold text-ink">
                      <span>{t.best}:</span>
                      <span className="text-xl">{'⭐'.repeat(bestStars)}</span>
                    </div>
                  )}
                </div>

                <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-ink leading-tight">
                  {pack.title[lang]}
                </h2>

                <p className="text-ink/80 text-base leading-relaxed">
                  {pack.description[lang]}
                </p>

                <div className="text-xs font-mono text-ink/50 uppercase tracking-wider mt-1">
                  {pack.steps.length} INTERACTIVE STEPS · {pack.demoScenes.length} DEMO SCENES
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-3 border-t-2 border-ink/20">
                <button
                  type="button"
                  onClick={() => onStartTraining(pack.id)}
                  className="flex-1 min-h-[64px] bg-act text-ink border-3 border-ink rounded-2xl font-heading text-xl font-bold tracking-wide uppercase hover:brightness-105 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Play className="w-6 h-6 fill-ink" />
                  <span>{mode === 'guided' ? t.startGuided : t.startPractice}</span>
                </button>

                <button
                  type="button"
                  onClick={() => onWatchDemo(pack.id)}
                  className="min-h-[64px] px-5 bg-card text-ink border-3 border-ink rounded-2xl font-heading text-lg font-bold hover:bg-concrete active:scale-95 transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <Eye className="w-5 h-5" />
                  <span>{t.watchDemo}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Local Leaderboards Section (if enabled) */}
      {settings.leaderboardEnabled && (
        <div className="bg-card p-6 rounded-3xl border-3 border-ink shadow-md flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b-2 border-ink/20 pb-3">
            <Trophy className="w-6 h-6 text-act" />
            <h3 className="font-heading text-2xl font-extrabold text-ink">
              {t.topRuns}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {packs.map((pack) => {
              const records = leaderboards[pack.id] || [];

              return (
                <div key={`lb-${pack.id}`} className="flex flex-col gap-2">
                  <h4 className="font-heading font-bold text-xl text-ink flex items-center gap-2">
                    <span>{pack.icon}</span>
                    <span>{pack.title[lang]}</span>
                  </h4>

                  {records.length === 0 ? (
                    <p className="text-sm text-ink/60 italic py-2">
                      No records logged yet. Complete a practice run to appear here!
                    </p>
                  ) : (
                    <ol className="flex flex-col gap-1.5 pl-2">
                      {records.map((rec, index) => (
                        <li
                          key={rec.id || index}
                          className="flex items-center justify-between p-2.5 bg-concrete/50 border border-ink/20 rounded-xl text-sm font-medium"
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-heading font-bold text-base text-ink w-6">
                              #{index + 1}
                            </span>
                            <span className="font-bold text-ink">{rec.workerName}</span>
                          </div>
                          <div className="flex items-center gap-2 font-mono font-bold text-ink">
                            <span>{'⭐'.repeat(rec.stars || 1)}</span>
                            <span>{rec.xp} XP</span>
                          </div>
                        </li>
                      ))}
                    </ol>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
