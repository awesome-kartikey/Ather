import { useState, useEffect } from 'react';
import type {
  LanguageCode,
  TrainingMode,
  UserProfile,
  SettingsConfig,
  RunSummary
} from './engine/types';
import type { TrainingPackData } from './content/schema';
import receivingPackRaw from './content/receiving.json';
import pickingPackRaw from './content/picking.json';
import { Header } from './components/Header';
import { OrientationGuard } from './components/OrientationGuard';
import { HomeScreen } from './screens/HomeScreen';
import { DemoScreen } from './screens/DemoScreen';
import { RunScreen } from './screens/RunScreen';
import { ResultScreen } from './screens/ResultScreen';
import { CertificateScreen } from './screens/CertificateScreen';
import { SettingsModal } from './screens/SettingsModal';
import { idbStore } from './store/idbStore';
import { calculateNewStreak } from './engine/scoring';

const PACKS = [
  receivingPackRaw,
  pickingPackRaw
] as unknown as TrainingPackData[];

type ScreenState = 'home' | 'demo' | 'run' | 'result' | 'certificate';

export function App() {
  const [lang, setLang] = useState<LanguageCode>('en');
  const [mode, setMode] = useState<TrainingMode>('guided');
  const [screen, setScreen] = useState<ScreenState>('home');
  const [activePackId, setActivePackId] = useState<string>('rec');
  const [isPreDemoFlow, setIsPreDemoFlow] = useState<boolean>(false);
  const [lastSummary, setLastSummary] = useState<RunSummary | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  // Loaded from IndexedDB
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    xp: 0,
    streak: 0,
    lastActiveDate: '',
    badges: [],
    packBestStars: {}
  });

  const [settings, setSettings] = useState<SettingsConfig>({
    leaderboardEnabled: true,
    soundEnabled: true,
    vibrationEnabled: true,
    autoReadTTS: false
  });

  // Load profile and settings on mount
  useEffect(() => {
    async function loadInitialData() {
      const p = await idbStore.getProfile();
      const s = await idbStore.getSettings();
      setProfile(p);
      setSettings(s);
    }
    loadInitialData();
  }, []);

  const activePack = PACKS.find((p) => p.id === activePackId) || PACKS[0];

  const handleUpdateProfile = async (updated: UserProfile) => {
    setProfile(updated);
    await idbStore.saveProfile(updated);
  };

  const handleUpdateSettings = async (updated: SettingsConfig) => {
    setSettings(updated);
    await idbStore.saveSettings(updated);
  };

  const handleStartTraining = (packId: string) => {
    setActivePackId(packId);
    // If in Guided mode, recommend watching the animated demo first (as per Watch -> Guided -> Practice)
    if (mode === 'guided') {
      setIsPreDemoFlow(true);
      setScreen('demo');
    } else {
      setScreen('run');
    }
  };

  const handleWatchDemo = (packId: string) => {
    setActivePackId(packId);
    setIsPreDemoFlow(false);
    setScreen('demo');
  };

  const handleRunFinished = async (summary: RunSummary) => {
    setLastSummary(summary);

    // Calculate streak
    const newStreak = calculateNewStreak(profile.lastActiveDate, profile.streak);
    const todayStr = new Date().toISOString().slice(0, 10);

    // Merge badges
    const updatedBadges = Array.from(new Set([...profile.badges, ...summary.badgesEarned]));

    // Update best stars
    const previousBest = profile.packBestStars[summary.packId] || 0;
    const updatedBestStars = {
      ...profile.packBestStars,
      [summary.packId]: Math.max(previousBest, summary.stars)
    };

    const updatedProfile: UserProfile = {
      ...profile,
      xp: profile.xp + summary.xpGained,
      streak: newStreak,
      lastActiveDate: todayStr,
      badges: updatedBadges,
      packBestStars: updatedBestStars
    };

    // Save profile and record run completion in IndexedDB
    await handleUpdateProfile(updatedProfile);
    await idbStore.recordRun(summary, profile.name);

    setScreen('result');
  };

  return (
    <div className="min-h-screen bg-concrete text-ink flex flex-col font-body selection:bg-act selection:text-ink">
      {/* Tablet Landscape Orientation Guard */}
      <OrientationGuard lang={lang} />

      {/* Global Navigation Header */}
      <Header
        lang={lang}
        mode={mode}
        onLanguageChange={setLang}
        onModeChange={setMode}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onGoHome={() => setScreen('home')}
        isHome={screen === 'home'}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-start py-4 px-2 sm:px-4">
        {screen === 'home' && (
          <HomeScreen
            lang={lang}
            mode={mode}
            profile={profile}
            settings={settings}
            packs={PACKS}
            onUpdateProfile={handleUpdateProfile}
            onStartTraining={handleStartTraining}
            onWatchDemo={handleWatchDemo}
          />
        )}

        {screen === 'demo' && (
          <DemoScreen
            pack={activePack}
            lang={lang}
            mode={mode}
            onDone={() => {
              if (isPreDemoFlow) {
                setScreen('run');
              } else {
                setScreen('home');
              }
            }}
            onGoHome={() => setScreen('home')}
          />
        )}

        {screen === 'run' && (
          <RunScreen
            pack={activePack}
            lang={lang}
            mode={mode}
            profile={profile}
            settings={settings}
            onRunFinished={handleRunFinished}
          />
        )}

        {screen === 'result' && lastSummary && (
          <ResultScreen
            summary={lastSummary}
            workerName={profile.name}
            lang={lang}
            onRetry={() => setScreen('run')}
            onGoHome={() => setScreen('home')}
            onViewCertificate={() => setScreen('certificate')}
          />
        )}

        {screen === 'certificate' && (
          <CertificateScreen
            workerName={profile.name}
            pack={activePack}
            lang={lang}
            onBack={() => setScreen('result')}
          />
        )}
      </main>

      {/* Settings Modal */}
      {isSettingsOpen && (
        <SettingsModal
          lang={lang}
          settings={settings}
          onUpdateSettings={handleUpdateSettings}
          onClose={() => setIsSettingsOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
