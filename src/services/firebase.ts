import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  type Firestore,
  type Unsubscribe
} from 'firebase/firestore';

export type TrainingCategory = 'receiving_putaway' | 'picking_packaging';

export interface EmployeeSessionRecord {
  id?: string;
  operatorId: string;
  employeeName: string;
  photoUrl?: string | null;
  category: TrainingCategory;
  categoryTitle: string;
  currentStageIndex: number;
  completedStages: number[];
  pointsScored: number;
  totalPossiblePoints: number;
  totalScoreXP: number;
  accuracyPct: number;
  totalDecisionsCount: number;
  correctDecisionsCount: number;
  safetyBreachesCount: number;
  totalTimeSpentSeconds: number;
  status: 'in_progress' | 'floor_ready' | 'retrain_needed';
  lastActiveAt?: any;
  startedAt?: any;
  stageProgressSummary?: Record<string, {
    stageNumber: number;
    completed: boolean;
    points: number;
    timeSpentSeconds: number;
  }>;
}

export interface SceneTelemetryRecord {
  id?: string;
  operatorId: string;
  employeeName: string;
  category: TrainingCategory;
  stageIndex: number;
  stageNumber: number;
  stageTitle: string;
  sceneIndex: number;
  sceneId: string;
  sceneTitle: string;
  interactionType: string;
  timeSpentSeconds: number;
  isCorrect: boolean;
  attempts: number;
  pointsAwarded: number;
  xpEarned: number;
  isSafetyCritical?: boolean;
  isSafetyBreach?: boolean;
  sopClause?: string;
  timestamp?: any;
}

export const firebaseConfig = {
  apiKey: "AIzaSyDsmmVjf-_MJz1dImTYFE4jNfk9diheU64",
  authDomain: "ather-warehouse.firebaseapp.com",
  projectId: "ather-warehouse",
  storageBucket: "ather-warehouse.firebasestorage.app",
  messagingSenderId: "987233810174",
  appId: "1:987233810174:web:2e2f43f65a6369dd7f97af",
  measurementId: "G-JGYQN6TLLT"
};

// Initialize Firebase singleton
let app: FirebaseApp;
let db: Firestore;

try {
  app = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);
  db = getFirestore(app);
} catch (err) {
  console.warn('Firebase initialization warning:', err);
}

export { db };

const LOCAL_SESSION_KEY = 'ather_offline_sessions';
const LOCAL_TELEMETRY_KEY = 'ather_offline_telemetry';

// Local storage fallback helper
function getLocalFallback<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalFallback<T>(key: string, items: T[]) {
  try {
    localStorage.setItem(key, JSON.stringify(items));
  } catch {}
}

/**
 * Sync or update an employee's aggregate session state in Firestore
 */
export async function syncEmployeeSession(
  session: Partial<EmployeeSessionRecord> & {
    operatorId: string;
    category: TrainingCategory;
    employeeName: string;
  }
): Promise<void> {
  const docId = `${session.operatorId}_${session.category}`;
  const now = new Date().toISOString();

  // 1. Update local cache immediately
  const localList = getLocalFallback<EmployeeSessionRecord>(LOCAL_SESSION_KEY);
  const existingIdx = localList.findIndex((s) => s.id === docId);
  const updatedItem: EmployeeSessionRecord = {
    ...(existingIdx >= 0 ? localList[existingIdx] : {}),
    ...session,
    id: docId,
    lastActiveAt: now,
    startedAt: existingIdx >= 0 ? localList[existingIdx].startedAt : now,
    categoryTitle:
      session.category === 'receiving_putaway'
        ? 'Warehouse Receiving & Put-Away'
        : 'Order Picking & Packaging',
    currentStageIndex: session.currentStageIndex ?? 0,
    completedStages: session.completedStages ?? [],
    pointsScored: session.pointsScored ?? 0,
    totalPossiblePoints: session.totalPossiblePoints ?? (session.category === 'receiving_putaway' ? 52 : 39),
    totalScoreXP: session.totalScoreXP ?? 0,
    accuracyPct: session.accuracyPct ?? 100,
    totalDecisionsCount: session.totalDecisionsCount ?? 0,
    correctDecisionsCount: session.correctDecisionsCount ?? 0,
    safetyBreachesCount: session.safetyBreachesCount ?? 0,
    totalTimeSpentSeconds: session.totalTimeSpentSeconds ?? 0,
    status: session.status ?? 'in_progress'
  };

  if (existingIdx >= 0) {
    localList[existingIdx] = updatedItem;
  } else {
    localList.push(updatedItem);
  }
  saveLocalFallback(LOCAL_SESSION_KEY, localList);

  // 2. Commit to Firestore
  if (!db) return;
  try {
    const docRef = doc(db, 'employee_sessions', docId);
    await setDoc(
      docRef,
      {
        ...session,
        id: docId,
        categoryTitle: updatedItem.categoryTitle,
        lastActiveAt: serverTimestamp(),
        startedAt: session.startedAt || serverTimestamp()
      },
      { merge: true }
    );
  } catch (err) {
    console.warn('Failed to sync employee session to Firestore (offline mode active):', err);
  }
}

/**
 * Log granular scene telemetry (time taken, attempts, pass/fail, score)
 */
export async function logSceneTelemetry(
  telemetry: Omit<SceneTelemetryRecord, 'timestamp'>
): Promise<void> {
  const item: SceneTelemetryRecord = {
    ...telemetry,
    timestamp: new Date().toISOString()
  };

  // 1. Save to local fallback
  const localList = getLocalFallback<SceneTelemetryRecord>(LOCAL_TELEMETRY_KEY);
  localList.push(item);
  // Keep max 200 items in local cache
  if (localList.length > 200) localList.shift();
  saveLocalFallback(LOCAL_TELEMETRY_KEY, localList);

  // 2. Commit to Firestore
  if (!db) return;
  try {
    const colRef = collection(db, 'scene_telemetry');
    await addDoc(colRef, {
      ...telemetry,
      timestamp: serverTimestamp()
    });
  } catch (err) {
    console.warn('Failed to log scene telemetry to Firestore (offline mode active):', err);
  }
}

/**
 * Subscribe in real-time to all employee sessions for the Admin Panel
 */
export function subscribeEmployeeSessions(
  onUpdate: (sessions: EmployeeSessionRecord[]) => void,
  categoryFilter?: TrainingCategory
): Unsubscribe {
  // If Firestore is unavailable, return local fallback
  if (!db) {
    const local = getLocalFallback<EmployeeSessionRecord>(LOCAL_SESSION_KEY);
    const filtered = categoryFilter ? local.filter((s) => s.category === categoryFilter) : local;
    onUpdate(filtered);
    return () => {};
  }

  try {
    const colRef = collection(db, 'employee_sessions');
    let q = query(colRef, orderBy('lastActiveAt', 'desc'));

    if (categoryFilter) {
      q = query(colRef, where('category', '==', categoryFilter), orderBy('lastActiveAt', 'desc'));
    }

    return onSnapshot(
      q,
      (snapshot) => {
        const records: EmployeeSessionRecord[] = [];
        snapshot.forEach((d) => {
          records.push({ id: d.id, ...d.data() } as EmployeeSessionRecord);
        });

        // Merge with local fallback in case offline sessions haven't synced
        const local = getLocalFallback<EmployeeSessionRecord>(LOCAL_SESSION_KEY);
        const mergedMap = new Map<string, EmployeeSessionRecord>();
        for (const loc of local) {
          if (!categoryFilter || loc.category === categoryFilter) {
            mergedMap.set(loc.id || `${loc.operatorId}_${loc.category}`, loc);
          }
        }
        for (const rec of records) {
          mergedMap.set(rec.id || `${rec.operatorId}_${rec.category}`, rec);
        }

        onUpdate(Array.from(mergedMap.values()));
      },
      (error) => {
        console.warn('Firestore subscription error, using local fallback:', error);
        const local = getLocalFallback<EmployeeSessionRecord>(LOCAL_SESSION_KEY);
        const filtered = categoryFilter ? local.filter((s) => s.category === categoryFilter) : local;
        onUpdate(filtered);
      }
    );
  } catch (err) {
    console.warn('Failed to setup Firestore listener, using local fallback:', err);
    const local = getLocalFallback<EmployeeSessionRecord>(LOCAL_SESSION_KEY);
    const filtered = categoryFilter ? local.filter((s) => s.category === categoryFilter) : local;
    onUpdate(filtered);
    return () => {};
  }
}

/**
 * Fetch all scene telemetry logs (or by operator/category) for drilldowns and averages
 */
export async function fetchAllSceneTelemetry(
  operatorId?: string,
  category?: TrainingCategory
): Promise<SceneTelemetryRecord[]> {
  const local = getLocalFallback<SceneTelemetryRecord>(LOCAL_TELEMETRY_KEY);
  let localFiltered = local;
  if (operatorId) localFiltered = localFiltered.filter((t) => t.operatorId === operatorId);
  if (category) localFiltered = localFiltered.filter((t) => t.category === category);

  if (!db) return localFiltered;

  try {
    const colRef = collection(db, 'scene_telemetry');
    let q = query(colRef, orderBy('timestamp', 'desc'));

    if (operatorId && category) {
      q = query(colRef, where('operatorId', '==', operatorId), where('category', '==', category));
    } else if (operatorId) {
      q = query(colRef, where('operatorId', '==', operatorId));
    } else if (category) {
      q = query(colRef, where('category', '==', category));
    }

    const snapshot = await getDocs(q);
    const list: SceneTelemetryRecord[] = [];
    snapshot.forEach((d) => {
      const data = d.data();
      list.push({
        id: d.id,
        ...data,
        timestamp: data.timestamp?.toDate ? data.timestamp.toDate().toISOString() : data.timestamp
      } as SceneTelemetryRecord);
    });

    if (list.length === 0) return localFiltered;
    return list;
  } catch (err) {
    console.warn('Failed to query Firestore scene telemetry, returning local fallback:', err);
    return localFiltered;
  }
}
