import type { UserProfile, SettingsConfig, RunSummary, LeaderboardRecord } from '../engine/types';

export interface ProgressStore {
  getProfile(): Promise<UserProfile>;
  saveProfile(profile: UserProfile): Promise<void>;
  getSettings(): Promise<SettingsConfig>;
  saveSettings(settings: SettingsConfig): Promise<void>;
  recordRun(run: RunSummary, workerName: string): Promise<void>;
  getLeaderboard(packId: string, limit?: number): Promise<LeaderboardRecord[]>;
  exportAllRecords(): Promise<RunSummary[]>;
  clearAllData(): Promise<void>;
}
