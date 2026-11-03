import type { LocalizedString } from '../content/schema';

export type { LocalizedString };

export type LanguageCode = 'en' | 'hi' | 'mr';

export type TrainingMode = 'guided' | 'practice';

export interface StepResult {
  ok: boolean;
  meta?: any;
}

export interface StepEvaluation {
  stepId: string;
  ok: boolean;
  isSafety: boolean;
  isEyeTest: boolean; // hotspot or spot-error
  timeTakenMs: number;
}

export interface RunSummary {
  packId: string;
  packTitle: LocalizedString;
  mode: TrainingMode;
  stars: number;
  xpGained: number;
  accuracyPct: number;
  totalSteps: number;
  correctSteps: number;
  safetyPassed: boolean;
  lost: boolean; // true if ran out of lives in practice mode
  badgesEarned: BadgeId[];
  timestamp: string;
}

export type BadgeId = 'safe' | 'perf' | 'eye' | 'cmb' | 'cert';

export interface BadgeDefinition {
  id: BadgeId;
  icon: string;
  title: LocalizedString;
  description: LocalizedString;
}

export interface LevelDefinition {
  level: number;
  minXp: number;
  title: LocalizedString;
}

export interface LeaderboardRecord {
  id: string;
  workerName: string;
  packId: string;
  xp: number;
  stars: number;
  date: string;
}

export interface UserProfile {
  name: string;
  operatorId?: string;
  photoUrl?: string;
  xp: number;
  streak: number;
  lastActiveDate: string; // YYYY-MM-DD
  badges: BadgeId[];
  packBestStars: Record<string, number>;
}

export interface SettingsConfig {
  leaderboardEnabled: boolean;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  autoReadTTS: boolean;
}
