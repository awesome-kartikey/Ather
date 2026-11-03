import { useState, useEffect } from 'react';
import { LandingPage } from './pages/LandingPage';
import { EmployeeRegistration } from './pages/EmployeeRegistration';
import { StoryStagePlayer } from './pages/StoryStagePlayer';
import { Results } from './pages/Results';
import { CertificateView } from './pages/CertificateView';
import type { LanguageCode, UserProfile, RunSummary } from './engine/types';

type Screen = 'landing' | 'register' | 'story' | 'results' | 'certificate';

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

export function App() {
  const [screen, setScreenState] = useState<Screen>(() => {
    try {
      const hash = window.location.hash;
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
      if (newScreen === 'landing') window.location.hash = '#portal';
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
        if (hash.startsWith('#player') || hash.startsWith('#story')) {
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
        } else if (hash === '#portal' || hash === '' || hash === '#home') {
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
    setTargetStageIndex(0);
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
        const sStage = localStorage.getItem('ather_stage_idx');
        const sScene = localStorage.getItem('ather_scene_idx');
        const stage = sStage ? parseInt(sStage, 10) : 0;
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
    const completeSummary: RunSummary = {
      packId: summary.moduleScores ? Object.keys(summary.moduleScores)[0] || `stage_${targetStageIndex + 1}` : `stage_${targetStageIndex + 1}`,
      packTitle: {
        en: `Module ${targetStageIndex + 1} Assessment`,
        hi: `मॉड्यूल ${targetStageIndex + 1} मूल्यांकन`,
        mr: `मॉड्यूल ${targetStageIndex + 1} मूल्यमापन`
      },
      mode: 'guided',
      stars: summary.accuracy >= 90 ? 3 : summary.accuracy >= 70 ? 2 : 1,
      xpGained: summary.score || 180,
      accuracyPct: summary.accuracy || 100,
      totalSteps: summary.totalQuestions || 9,
      correctSteps: summary.correctCount || 9,
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
      {screen === 'landing' && (
        <LandingPage
          lang={lang}
          onSelectLang={handleSelectLang}
          onStartTraining={handleStartTraining}
          onLaunchModule={handleLaunchModule}
        />
      )}

      {screen === 'register' && (
        <EmployeeRegistration
          lang={lang}
          profile={profile}
          targetStageIndex={targetStageIndex}
          onSelectLang={handleSelectLang}
          onRegister={handleRegister}
          onBack={() => setScreen('landing')}
        />
      )}

      {screen === 'story' && (
        <StoryStagePlayer
          initialStageIndex={targetStageIndex}
          initialSceneIndex={initialSceneIndex}
          userProfile={profile}
          lang={lang}
          onSelectLang={handleSelectLang}
          onExitHome={() => setScreen('landing')}
          onViewScorecard={handleViewScorecardFromStory}
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
        />
      )}
    </div>
  );
}

export default App;
