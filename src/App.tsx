import { useState, useEffect } from 'react';
import { LandingPage } from './pages/LandingPage';
import { EmployeeRegistration } from './pages/EmployeeRegistration';
import { StoryStagePlayer } from './pages/StoryStagePlayer';
import { Results } from './pages/Results';
import { CertificateView } from './pages/CertificateView';
import { AdminPanel } from './pages/AdminPanel';
import { DevFloatingToolbar } from './components/dev/DevFloatingToolbar';
import { OrientationGuard } from './components/OrientationGuard';
import type { LanguageCode, UserProfile, RunSummary } from './engine/types';
import { checkForAppUpdate, type UpdateInfo } from './services/autoUpdate';
import { UpdateModal } from './components/common/UpdateModal';

type Screen = 'landing' | 'register' | 'story' | 'results' | 'certificate' | 'admin';
export type AppMode = 'receiving' | 'picking';

const DEFAULT_PROFILE: UserProfile = {
  name: 'Ramesh Patil',
  operatorId: 'OP-AURIC-104',
  xp: 150,
  streak: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  badges: ['safe', 'perf'],
  packBestStars: {}
};

const MODULE_SOPS: Record<number, string> = {
  0: 'XXXX_PRO_001',
  1: '02_C1_S2',
  2: '03_C1_S3',
  3: '04_C1_S4',
  4: '05_C1_S5',
  5: '06_C1_S6',
  6: '07_C1_S7',
  7: '08_C2_S8',
  8: '09_C2_S9',
  9: '10_C2_S10',
  10: '11_C2_S11',
  11: '12_C2_S12'
};

const getInitialAppMode = (): AppMode => {
  try {
    const envMode = import.meta.env.VITE_APP_MODE;
    if (envMode === 'picking' || envMode === 'receiving') return envMode;
    const hash = window.location.hash.toLowerCase();
    const search = window.location.search.toLowerCase();
    if (hash.includes('picking') || search.includes('picking')) return 'picking';
    if (hash.includes('receiving') || search.includes('receiving')) return 'receiving';
    const saved = localStorage.getItem('ather_app_mode');
    if (saved === 'picking' || saved === 'receiving') return saved;
  } catch {}
  return 'receiving';
};

export function App() {
  const [appMode, setAppMode] = useState<AppMode>(getInitialAppMode);
  const [updateInfo, setUpdateInfo] = useState<UpdateInfo | null>(null);

  // Background check for application updates on launch
  useEffect(() => {
    let isMounted = true;
    const checkUpdates = async () => {
      const info = await checkForAppUpdate(appMode);
      if (isMounted && info && info.hasUpdate) {
        setUpdateInfo(info);
      }
    };
    const timer = setTimeout(checkUpdates, 2500);

    const handleManualCheck = () => {
      checkUpdates();
    };
    window.addEventListener('ather:check-update', handleManualCheck);

    return () => {
      isMounted = false;
      clearTimeout(timer);
      window.removeEventListener('ather:check-update', handleManualCheck);
    };
  }, [appMode]);

  // Sync PWA Manifest, Title, and Icon dynamically based on appMode
  useEffect(() => {
    try {
      localStorage.setItem('ather_app_mode', appMode);
      const isPicking = appMode === 'picking';
      document.title = isPicking
        ? 'Order Picking & Packaging | Ather AURIC Plant M002'
        : 'Warehouse Receiving & Put-Away | Ather AURIC Plant M002';

      // Update PWA manifest link
      let manifestEl = document.querySelector('link[rel="manifest"]') as HTMLLinkElement | null;
      const targetManifest = isPicking ? '/manifest-picking.webmanifest' : '/manifest-receiving.webmanifest';
      if (manifestEl) {
        manifestEl.href = targetManifest;
      }

      // Update favicon
      let iconEl = document.querySelector('link[rel="icon"]') as HTMLLinkElement | null;
      const targetIcon = isPicking ? '/icons/icon-picking.svg' : '/icons/icon-receiving.svg';
      if (iconEl) {
        iconEl.href = targetIcon;
      }
    } catch {}
  }, [appMode]);

  const [screen, setScreenState] = useState<Screen>(() => {
    try {
      const hash = window.location.hash;
      if (hash.startsWith('#admin')) return 'admin';
      if (hash.startsWith('#player') || hash.startsWith('#story')) return 'story';
      if (hash.startsWith('#signin') || hash.startsWith('#register')) return 'register';
      if (hash.startsWith('#results')) return 'results';
      if (hash.startsWith('#certificate')) return 'certificate';
    } catch {}
    return 'landing';
  });

  const setScreen = (newScreen: Screen, extraHash = '') => {
    setScreenState(newScreen);
    try {
      const prefix = appMode === 'picking' ? '#picking' : '#receiving';
      if (newScreen === 'landing') window.location.hash = prefix;
      else if (newScreen === 'admin') window.location.hash = '#admin';
      else if (newScreen === 'register') window.location.hash = '#signin';
      else if (newScreen === 'story') window.location.hash = extraHash || `#player?stage=${targetStageIndex + 1}`;
      else if (newScreen === 'results') window.location.hash = '#results';
      else if (newScreen === 'certificate') window.location.hash = '#certificate';
    } catch {}
  };

  const [lang, setLang] = useState<LanguageCode>(() => {
    try {
      const stored = localStorage.getItem('ather_lang');
      if (stored === 'hi' || stored === 'mr' || stored === 'en') {
        return stored;
      }
    } catch { }
    return 'en';
  });

  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const stored = localStorage.getItem('ather_user_profile');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch { }
    return DEFAULT_PROFILE;
  });

  const [targetStageIndex, setTargetStageIndex] = useState<number>(() => {
    try {
      const hash = window.location.hash;
      const match = hash.match(/stage=(\d+)/);
      if (match) return Math.max(0, parseInt(match[1], 10) - 1);
    } catch {}
    return 0;
  });
  const [initialSceneIndex, setInitialSceneIndex] = useState<number>(() => {
    try {
      const hash = window.location.hash;
      const match = hash.match(/scene=(\d+)/);
      if (match) return Math.max(0, parseInt(match[1], 10) - 1);
    } catch {}
    return 0;
  });

  // Hash route listener
  useEffect(() => {
    const handleHashSync = () => {
      try {
        const hash = window.location.hash;
        const search = window.location.search;
        if (hash.includes('picking') || search.includes('picking')) {
          setAppMode('picking');
        } else if (hash.includes('receiving') || search.includes('receiving')) {
          setAppMode('receiving');
        }

        if (hash.startsWith('#admin')) {
          setScreenState('admin');
        } else if (hash.startsWith('#player') || hash.startsWith('#story')) {
          setScreenState('story');
          const match = hash.match(/stage=(\d+)/);
          if (match) setTargetStageIndex(Math.max(0, parseInt(match[1], 10) - 1));
          const sceneMatch = hash.match(/scene=(\d+)/);
          if (sceneMatch) setInitialSceneIndex(Math.max(0, parseInt(sceneMatch[1], 10) - 1));
        } else if (hash.startsWith('#signin') || hash.startsWith('#register')) {
          setScreenState('register');
        } else if (hash.startsWith('#results')) {
          setScreenState('results');
        } else if (hash.startsWith('#certificate')) {
          setScreenState('certificate');
        } else if (hash === '#portal' || hash === '' || hash === '#home' || hash === '#receiving' || hash === '#picking') {
          setScreenState('landing');
        }
      } catch {}
    };

    window.addEventListener('hashchange', handleHashSync);
    return () => window.removeEventListener('hashchange', handleHashSync);
  }, []);

  const [runSummary, setRunSummary] = useState<RunSummary>(() => ({
    packId: 'c1_s1_gate_dock',
    packTitle: {
      en: 'Module 1: Gate & Dock Operations',
      hi: 'मॉड्यूल 1: गेट और डॉक संचालन',
      mr: 'मॉड्यूल 1: गेट आणि डॉक ऑपरेशन्स'
    },
    mode: 'guided',
    stars: 3,
    xpGained: 240,
    accuracyPct: 100,
    totalSteps: 9,
    correctSteps: 9,
    safetyPassed: true,
    lost: false,
    badgesEarned: ['safe', 'perf', 'cert'],
    timestamp: new Date().toISOString()
  }));

  const handleSelectLang = (newLang: LanguageCode) => {
    setLang(newLang);
    try {
      localStorage.setItem('ather_lang', newLang);
    } catch { }
  };

  const handleStartTraining = () => {
    const startStage = appMode === 'picking' ? 7 : 0;
    setTargetStageIndex(startStage);
    setInitialSceneIndex(0);
    setScreen('register');
  };

  const handleLaunchModule = (stageIndex: number) => {
    setTargetStageIndex(stageIndex);
    setInitialSceneIndex(0);
    setScreen('register');
  };

  const handleRegister = (name: string, employeeId: string, photoUrl?: string, resumeSession?: boolean) => {
    const updatedProfile: UserProfile = {
      ...profile,
      name,
      operatorId: employeeId,
      photoUrl: photoUrl || profile.photoUrl
    };
    setProfile(updatedProfile);
    try {
      localStorage.setItem('ather_user_profile', JSON.stringify(updatedProfile));
    } catch { }

    if (resumeSession) {
      try {
        const stageKey = appMode === 'picking' ? 'ather_picking_stage_idx' : 'ather_stage_idx';
        const sceneKey = appMode === 'picking' ? 'ather_picking_scene_idx' : 'ather_scene_idx';
        const sStage = localStorage.getItem(stageKey);
        const sScene = localStorage.getItem(sceneKey);
        const stage = sStage ? parseInt(sStage, 10) : (appMode === 'picking' ? 7 : 0);
        const scene = sScene ? parseInt(sScene, 10) : 0;
        setTargetStageIndex(stage);
        setInitialSceneIndex(scene);
        setScreen('story', `#player?stage=${stage + 1}`);
        return;
      } catch { }
    }

    setInitialSceneIndex(0);
    setScreen('story', `#player?stage=${targetStageIndex + 1}`);
  };

  const handleViewScorecardFromStory = (summary: any) => {
    const isPicking = appMode === 'picking';
    const totalPossiblePoints = isPicking ? 39 : 52;
    const completeSummary: RunSummary = {
      packId: isPicking ? 'ather_picking_packaging' : 'ather_receiving_putaway',
      packTitle: {
        en: isPicking ? 'Order Picking & Packaging Assessment' : 'Warehouse Receiving & Put-Away Assessment',
        hi: isPicking ? 'ऑर्डर पिकिंग और पैकेजिंग मूल्यांकन' : 'वेयरहाउस प्राप्ति और पुट-अवे मूल्यांकन',
        mr: isPicking ? 'ऑर्डर पिकिंग आणि पॅकेजिंग मूल्यमापन' : 'वेअरहाऊस प्राप्ती आणि पुट-अवे मूल्यमापन'
      },
      mode: 'guided',
      stars: summary.accuracy >= 90 ? 3 : summary.accuracy >= 75 ? 2 : 1,
      xpGained: summary.score || summary.correctCount || 0,
      accuracyPct: summary.accuracy || 100,
      totalSteps: summary.totalQuestions || totalPossiblePoints,
      correctSteps: summary.correctCount || summary.score || 0,
      safetyPassed: summary.perfectRun ?? true,
      lost: false,
      badgesEarned: ['safe', 'perf', 'cert'],
      timestamp: summary.completedAt || new Date().toISOString()
    };
    setRunSummary(completeSummary);
    setScreen('results');
  };

  const currentSopDoc = MODULE_SOPS[targetStageIndex] || 'XXXX_PRO_001';

  return (
    <div className="w-full min-h-[100dvh]">
      <OrientationGuard lang={lang} />
      {screen === 'landing' && (
        <LandingPage
          lang={lang}
          onSelectLang={handleSelectLang}
          onStartTraining={handleStartTraining}
          onLaunchModule={handleLaunchModule}
          onOpenAdmin={() => setScreen('admin')}
          appMode={appMode}
        />
      )}

      {screen === 'admin' && (
        <AdminPanel onBackToPortal={() => setScreen('landing')} />
      )}

      {screen === 'register' && (
        <EmployeeRegistration
          lang={lang}
          profile={profile}
          targetStageIndex={targetStageIndex}
          onSelectLang={handleSelectLang}
          onRegister={handleRegister}
          onBack={() => setScreen('landing')}
          appMode={appMode}
        />
      )}

      {screen === 'story' && (
        <StoryStagePlayer
          key={`story-${appMode}-${targetStageIndex}-${initialSceneIndex}`}
          initialStageIndex={targetStageIndex}
          initialSceneIndex={initialSceneIndex}
          userProfile={profile}
          lang={lang}
          onSelectLang={handleSelectLang}
          onExitHome={() => setScreen('landing')}
          onViewScorecard={handleViewScorecardFromStory}
          appMode={appMode}
        />
      )}

      {screen === 'results' && (
        <Results
          summary={runSummary}
          lang={lang}
          profile={profile}
          onViewCertificate={() => setScreen('certificate')}
          onRestart={() => setScreen('story')}
          onNavigateHome={() => setScreen('landing')}
          appMode={appMode}
        />
      )}

      {screen === 'certificate' && (
        <CertificateView
          summary={runSummary}
          lang={lang}
          profile={profile}
          sopDoc={currentSopDoc}
          onBack={() => setScreen('results')}
          onNavigateHome={() => setScreen('landing')}
          appMode={appMode}
        />
      )}

      {/* In-App Auto Update Modal */}
      {updateInfo && (
        <UpdateModal
          updateInfo={updateInfo}
          onClose={() => setUpdateInfo(null)}
        />
      )}

      {/* Development QA Testing Toolbar: Tree-shaken out in production builds */}
      {import.meta.env.DEV && <DevFloatingToolbar />}
    </div>
  );
}

export default App;
