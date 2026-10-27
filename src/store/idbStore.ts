import { openDB, type IDBPDatabase } from 'idb';
import type { ProgressStore } from './progressStore';
import type { UserProfile, SettingsConfig, RunSummary, LeaderboardRecord } from '../engine/types';

const DB_NAME = 'floor_trainer_db';
const DB_VERSION = 1;

const DEFAULT_PROFILE: UserProfile = {
  name: '',
  xp: 0,
  streak: 0,
  lastActiveDate: '',
  badges: [],
  packBestStars: {}
};

const DEFAULT_SETTINGS: SettingsConfig = {
  leaderboardEnabled: true,
  soundEnabled: true,
  vibrationEnabled: true,
  autoReadTTS: false
};

class IndexedDBProgressStore implements ProgressStore {
  private dbPromise: Promise<IDBPDatabase> | null = null;
  private isFallbackMode = false;

  private async getDB(): Promise<IDBPDatabase | null> {
    if (this.isFallbackMode || typeof window === 'undefined' || !window.indexedDB) {
      this.isFallbackMode = true;
      return null;
    }

    if (!this.dbPromise) {
      this.dbPromise = openDB(DB_NAME, DB_VERSION, {
        upgrade(db) {
          if (!db.objectStoreNames.contains('profile')) {
            db.createObjectStore('profile');
          }
          if (!db.objectStoreNames.contains('settings')) {
            db.createObjectStore('settings');
          }
          if (!db.objectStoreNames.contains('runs')) {
            const runStore = db.createObjectStore('runs', { keyPath: 'id', autoIncrement: true });
            runStore.createIndex('packId', 'packId', { unique: false });
          }
          if (!db.objectStoreNames.contains('leaderboard')) {
            const lbStore = db.createObjectStore('leaderboard', { keyPath: 'id' });
            lbStore.createIndex('packId', 'packId', { unique: false });
            lbStore.createIndex('xp', 'xp', { unique: false });
          }
        }
      }).catch((err) => {
        console.warn('IndexedDB unavailable, falling back to localStorage:', err);
        this.isFallbackMode = true;
        return null as any;
      });
    }

    return this.dbPromise;
  }

  async getProfile(): Promise<UserProfile> {
    try {
      const db = await this.getDB();
      if (db) {
        const val = await db.get('profile', 'current');
        return val ? { ...DEFAULT_PROFILE, ...val } : { ...DEFAULT_PROFILE };
      }
    } catch {}

    try {
      const item = localStorage.getItem('ft_profile');
      return item ? { ...DEFAULT_PROFILE, ...JSON.parse(item) } : { ...DEFAULT_PROFILE };
    } catch {
      return { ...DEFAULT_PROFILE };
    }
  }

  async saveProfile(profile: UserProfile): Promise<void> {
    try {
      const db = await this.getDB();
      if (db) {
        await db.put('profile', profile, 'current');
      }
    } catch {}

    try {
      localStorage.setItem('ft_profile', JSON.stringify(profile));
    } catch {}
  }

  async getSettings(): Promise<SettingsConfig> {
    try {
      const db = await this.getDB();
      if (db) {
        const val = await db.get('settings', 'config');
        return val ? { ...DEFAULT_SETTINGS, ...val } : { ...DEFAULT_SETTINGS };
      }
    } catch {}

    try {
      const item = localStorage.getItem('ft_settings');
      return item ? { ...DEFAULT_SETTINGS, ...JSON.parse(item) } : { ...DEFAULT_SETTINGS };
    } catch {
      return { ...DEFAULT_SETTINGS };
    }
  }

  async saveSettings(settings: SettingsConfig): Promise<void> {
    try {
      const db = await this.getDB();
      if (db) {
        await db.put('settings', settings, 'config');
      }
    } catch {}

    try {
      localStorage.setItem('ft_settings', JSON.stringify(settings));
    } catch {}
  }

  async recordRun(run: RunSummary, workerName: string): Promise<void> {
    const recordId = `${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const lbRecord: LeaderboardRecord = {
      id: recordId,
      workerName: workerName.trim() || 'Floor Operator',
      packId: run.packId,
      xp: run.xpGained,
      stars: run.stars,
      date: new Date().toISOString()
    };

    try {
      const db = await this.getDB();
      if (db) {
        await db.add('runs', { ...run, id: recordId, workerName });
        await db.put('leaderboard', lbRecord);
      }
    } catch {}

    // Also update localStorage backup
    try {
      const runs = JSON.parse(localStorage.getItem('ft_runs') || '[]');
      runs.unshift({ ...run, id: recordId, workerName });
      localStorage.setItem('ft_runs', JSON.stringify(runs.slice(0, 100)));

      const lb = JSON.parse(localStorage.getItem('ft_leaderboard') || '[]');
      lb.push(lbRecord);
      localStorage.setItem('ft_leaderboard', JSON.stringify(lb));
    } catch {}
  }

  async getLeaderboard(packId: string, limit = 5): Promise<LeaderboardRecord[]> {
    try {
      const db = await this.getDB();
      if (db) {
        const allRecords = await db.getAllFromIndex('leaderboard', 'packId', packId);
        return allRecords
          .sort((a, b) => b.xp - a.xp)
          .slice(0, limit);
      }
    } catch {}

    try {
      const lb: LeaderboardRecord[] = JSON.parse(localStorage.getItem('ft_leaderboard') || '[]');
      return lb
        .filter((r) => r.packId === packId)
        .sort((a, b) => b.xp - a.xp)
        .slice(0, limit);
    } catch {
      return [];
    }
  }

  async exportAllRecords(): Promise<RunSummary[]> {
    try {
      const db = await this.getDB();
      if (db) {
        const records = await db.getAll('runs');
        if (records && records.length > 0) {
          return records;
        }
      }
    } catch {}

    try {
      return JSON.parse(localStorage.getItem('ft_runs') || '[]');
    } catch {
      return [];
    }
  }

  async clearAllData(): Promise<void> {
    try {
      const db = await this.getDB();
      if (db) {
        await db.clear('profile');
        await db.clear('settings');
        await db.clear('runs');
        await db.clear('leaderboard');
      }
    } catch {}

    try {
      localStorage.removeItem('ft_profile');
      localStorage.removeItem('ft_settings');
      localStorage.removeItem('ft_runs');
      localStorage.removeItem('ft_leaderboard');
    } catch {}
  }
}

export const idbStore = new IndexedDBProgressStore();
