import React, { useState, useEffect, useRef, useMemo } from 'react';
import type {
  LanguageCode,
  LocalizedText,
  MascotPose,
  StoryStage,
  DragDropInteraction,
  McqInteraction,
  SequenceInteraction,
  HotspotInteraction,
  SpotErrorInteraction,
  StopGoInteraction,
  CountStepperInteraction
} from '../engine/story/types';
import type { RunSummary, UserProfile } from '../engine/types';
import { CertificateView } from './CertificateView';
import { playFeedbackTone, stopVoice } from '../engine/sound';
import confetti from 'canvas-confetti';
import { category1Stages } from '../content/category1';
import { category2Stages } from '../content/category2';
import { StoryHud } from '../components/story/StoryHud';
import { MascotAura } from '../components/story/MascotAura';
import { StoryVideoFrame } from '../components/story/StoryVideoFrame';
import { QuestionCard } from '../components/story/QuestionCard';
import { DragDropCard } from '../components/story/DragDropCard';
import { SequenceCard } from '../components/story/SequenceCard';
import { HotspotCard } from '../components/story/HotspotCard';
import { SpotErrorCard } from '../components/story/SpotErrorCard';
import { StopGoCard } from '../components/story/StopGoCard';
import { CountStepperCard } from '../components/story/CountStepperCard';
import { FeedbackCard } from '../components/story/FeedbackCard';
import { MilestoneGateway } from '../components/story/MilestoneGateway';
import { FacilityPhotoFrame } from '../components/story/FacilityPhotoFrame';
import { Video, Minimize2, Maximize2 } from 'lucide-react';
import { logSceneTelemetry, syncEmployeeSession, type TrainingCategory } from '../services/firebase';

const allStages: StoryStage[] = [
  ...category1Stages,
  ...category2Stages
];

export interface StoryStagePlayerProps {
  initialStageIndex?: number;
  initialSceneIndex?: number;
  userProfile?: UserProfile;
  onExitHome?: () => void;
  onViewScorecard?: (summary: RunSummary) => void;
  lang?: LanguageCode;
  onSelectLang?: (lang: LanguageCode) => void;
  appMode?: 'receiving' | 'picking';
}

export const StoryStagePlayer: React.FC<StoryStagePlayerProps> = ({
  initialStageIndex,
  initialSceneIndex,
  userProfile,
  onExitHome,
  onViewScorecard,
  lang: propLang,
  onSelectLang: propOnSelectLang,
  appMode = 'receiving'
}) => {
  const isPicking = appMode === 'picking';
  const activeStages = useMemo(() => {
    return isPicking ? category2Stages : category1Stages;
  }, [isPicking]);

  const [lang, setLang] = useState<LanguageCode>(() => {
    if (propLang) return propLang;
    try {
      return (localStorage.getItem('ather_lang') as LanguageCode) || 'en';
    } catch {
      return 'en';
    }
  });

  useEffect(() => {
    if (propLang && propLang !== lang) {
      setLang(propLang);
    }
  }, [propLang]);

  const handleSetLang = (newLang: LanguageCode) => {
    stopVoice();
    setLang(newLang);
    propOnSelectLang?.(newLang);
  };

  const [currentStageIndex, setCurrentStageIndex] = useState<number>(() => {
    if (initialStageIndex !== undefined) {
      let idx = initialStageIndex;
      if (isPicking && idx >= 7) {
        idx = idx - 7;
      }
      return Math.min(Math.max(0, idx), activeStages.length - 1);
    }
    return 0;
  });
  const [currentSceneIndex, setCurrentSceneIndex] = useState<number>(() => {
    if (initialSceneIndex !== undefined) {
      return initialSceneIndex;
    }
    return 0;
  });
  const [xp, setXp] = useState<number>(0);
  const [hearts, setHearts] = useState<number>(3);
  const [attempts, setAttempts] = useState<number>(0);
  const [showCertificate, setShowCertificate] = useState<boolean>(false);

  // Timeline Phase: 'intro' -> 'interaction_paused' -> 'feedback' -> 'gateway'
  const [phase, setPhase] = useState<'intro' | 'interaction_paused' | 'feedback' | 'gateway'>(() => {
    try {
      if (window.location.hash.includes('gateway') || window.location.hash.includes('phase=gateway')) {
        return 'gateway';
      }
      if (window.location.hash.includes('phase=question') || window.location.hash.includes('question=true')) {
        return 'interaction_paused';
      }
    } catch {}
    return 'intro';
  });
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isLastCorrect, setIsLastCorrect] = useState<boolean>(false);
  const [isLastFirstTimeRight, setIsLastFirstTimeRight] = useState<boolean>(true);
  const [isQuestionExpanded, setIsQuestionExpanded] = useState<boolean>(false);
  const [showVideoModal, setShowVideoModal] = useState<boolean>(false);
  const [replayKey, setReplayKey] = useState<number>(0);
  const [retryKey, setRetryKey] = useState<number>(0);

  // Real-time per-scene duration and assessment telemetry refs
  const sceneStartTimeRef = useRef<number>(Date.now());
  const sceneAttemptsRef = useRef<number>(0);
  const totalDecisionsRef = useRef<number>(0);
  const correctDecisionsRef = useRef<number>(0);
  const totalTimeSecondsRef = useRef<number>(0);
  const continueStoryRef = useRef<() => void>(() => {});
  const answerEvaluatedRef = useRef<(correct: boolean) => void>(() => {});
  const resetSceneRef = useRef<() => void>(() => {});

  const sessionCacheKey = isPicking ? 'ather_session_picking' : 'ather_session_receiving';

  // 1-Point scoring system and safety breach tracking with session restoration
  const [pointsScored, setPointsScored] = useState<number>(() => {
    try {
      const cached = localStorage.getItem(sessionCacheKey);
      if (cached) {
        const parsed = JSON.parse(cached);
        return typeof parsed.pointsScored === 'number' ? parsed.pointsScored : 0;
      }
    } catch {}
    return 0;
  });
  const pointsScoredRef = useRef<number>(pointsScored);
  const initialSafetyBreaches = useMemo(() => {
    try {
      const cached = localStorage.getItem(sessionCacheKey);
      if (cached) {
        const parsed = JSON.parse(cached);
        return typeof parsed.safetyBreaches === 'number' ? parsed.safetyBreaches : 0;
      }
    } catch {}
    return 0;
  }, [sessionCacheKey]);
  const safetyBreachesRef = useRef<number>(initialSafetyBreaches);

  const initialCompletedStages = useMemo(() => {
    try {
      const cached = localStorage.getItem(sessionCacheKey);
      if (cached) {
        const parsed = JSON.parse(cached);
        return Array.isArray(parsed.completedStages) ? parsed.completedStages : [];
      }
    } catch {}
    return [];
  }, [sessionCacheKey]);
  const completedStagesRef = useRef<number[]>(initialCompletedStages);

  const persistSessionCache = () => {
    try {
      localStorage.setItem(
        sessionCacheKey,
        JSON.stringify({
          pointsScored: pointsScoredRef.current,
          safetyBreaches: safetyBreachesRef.current,
          totalDecisions: totalDecisionsRef.current,
          correctDecisions: correctDecisionsRef.current,
          totalTimeSeconds: totalTimeSecondsRef.current,
          completedStages: completedStagesRef.current
        })
      );
    } catch {}
  };

  const stageData = activeStages[currentStageIndex] || activeStages[0];
  const scene = stageData.scenes[currentSceneIndex] || stageData.scenes[0];
  const totalPossiblePoints = useMemo(() => {
    return activeStages.reduce((acc, s) => acc + s.scenes.length, 0);
  }, [activeStages]);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      stopVoice();
    };
  }, []);

  // Reset stopwatch timer and attempts on scene change
  useEffect(() => {
    sceneStartTimeRef.current = Date.now();
    sceneAttemptsRef.current = 0;
  }, [currentStageIndex, currentSceneIndex]);

  useEffect(() => {
    const isMultiZone = scene.interaction.type === 'drag_drop' || scene.interaction.type === 'sequence';
    setIsQuestionExpanded(isMultiZone);
    setShowVideoModal(false);
  }, [currentStageIndex, currentSceneIndex]);

  // Save language preference and keep URL hash in sync with real stage & scene
  useEffect(() => {
    try {
      localStorage.setItem('ather_lang', lang);

      const realStageNumber = stageData.stageNumber;
      const currentHash = window.location.hash;
      if (currentHash.startsWith('#player') || currentHash.startsWith('#story')) {
        const newHash = `#player?stage=${realStageNumber}&scene=${currentSceneIndex + 1}`;
        if (currentHash !== newHash) {
          window.history.replaceState(null, '', newHash);
        }
      }
    } catch {
      // Storage unavailable
    }
  }, [currentStageIndex, currentSceneIndex, lang, stageData.stageNumber]);

  // Dev-only bridge: expose player state and listen for dev events
  useEffect(() => {
    if (!import.meta.env.DEV) return;

    const handleDevJump = (e: Event) => {
      const customEvent = e as CustomEvent<{
        stageIndex?: number;
        sceneIndex?: number;
        phase?: 'intro' | 'interaction_paused' | 'feedback' | 'gateway';
      }>;
      const { stageIndex, sceneIndex, phase: targetPhase } = customEvent.detail || {};

      stopVoice();

      if (typeof stageIndex === 'number' && stageIndex !== currentStageIndex) {
        setCurrentStageIndex(Math.min(Math.max(0, stageIndex), allStages.length - 1));
      }
      if (typeof sceneIndex === 'number') {
        setCurrentSceneIndex(sceneIndex);
      }
      if (targetPhase) {
        setPhase(targetPhase);
      } else {
        setPhase('interaction_paused');
      }
      setSelectedOptionId(null);
      setIsLastCorrect(false);
    };

    const handleDevSkip = () => {
      continueStoryRef.current();
    };

    const handleDevSolve = (e: Event) => {
      const customEvent = e as CustomEvent<{ correct?: boolean }>;
      const isCorrect = customEvent.detail?.correct !== false;

      // Ensure we switch to the question screen if in intro
      setPhase('interaction_paused');

      if (scene.interaction.type === 'mcq') {
        const mcq = scene.interaction as McqInteraction;
        const targetOption = isCorrect
          ? mcq.options.find((opt) => opt.correct) || mcq.options[0]
          : mcq.options.find((opt) => !opt.correct) || mcq.options[0];

        if (targetOption) {
          setSelectedOptionId(targetOption.id);
          answerEvaluatedRef.current(isCorrect);
        } else {
          answerEvaluatedRef.current(isCorrect);
        }
      } else {
        // Broadcast to interactive cards (Sequence, DragDrop, etc.)
        window.dispatchEvent(new CustomEvent('ather:dev:card-solve', { detail: { correct: isCorrect } }));
        answerEvaluatedRef.current(isCorrect);
      }
    };

    const handleDevReset = () => {
      resetSceneRef.current();
      setPhase('interaction_paused');
    };

    window.addEventListener('ather:dev:jump', handleDevJump);
    window.addEventListener('ather:dev:skip', handleDevSkip);
    window.addEventListener('ather:dev:solve', handleDevSolve);
    window.addEventListener('ather:dev:reset', handleDevReset);

    return () => {
      window.removeEventListener('ather:dev:jump', handleDevJump);
      window.removeEventListener('ather:dev:skip', handleDevSkip);
      window.removeEventListener('ather:dev:solve', handleDevSolve);
      window.removeEventListener('ather:dev:reset', handleDevReset);
    };
  }, [currentStageIndex, currentSceneIndex, xp, stageData]);

  // Keep window.__ATHER_DEV_STATE__ updated in dev
  useEffect(() => {
    if (!import.meta.env.DEV) return;
    (window as any).__ATHER_DEV_STATE__ = {
      currentStageIndex,
      currentSceneIndex,
      phase,
      stageData,
      scene,
      xp,
      hearts,
      lang
    };
    window.dispatchEvent(new CustomEvent('ather:dev:state-updated'));
  }, [currentStageIndex, currentSceneIndex, phase, stageData, scene, xp, hearts, lang]);

  // Called when video/animation reaches its SOP pause point or completes
  const handlePauseReached = () => {
    // Scene stays open on full screen; trainee advances manually via the "Next →" button
  };

  // Handler for MCQ options
  const handleSelectMcqOption = (optionId: string) => {
    setSelectedOptionId(optionId);
    setAttempts((prev) => prev + 1);

    if (scene.interaction.type === 'mcq') {
      const chosenOption = scene.interaction.options.find((opt) => opt.id === optionId);
      const correct = !!chosenOption?.correct;
      handleAnswerEvaluated(correct);
    }
  };

  // Handler for Drag & Drop completion
  const handleDragDropComplete = (isCorrect: boolean) => {
    setAttempts((prev) => prev + 1);
    handleAnswerEvaluated(isCorrect);
  };

  // Handler for Sequence completion
  const handleSequenceComplete = (isCorrect: boolean) => {
    setAttempts((prev) => prev + 1);
    handleAnswerEvaluated(isCorrect);
  };

  // Handler for Hotspot completion
  const handleHotspotComplete = (isCorrect: boolean) => {
    setAttempts((prev) => prev + 1);
    handleAnswerEvaluated(isCorrect);
  };

  // Handler for Spot Error completion
  const handleSpotErrorComplete = (isCorrect: boolean) => {
    setAttempts((prev) => prev + 1);
    handleAnswerEvaluated(isCorrect);
  };

  // Handler for Stop or Go completion
  const handleStopGoComplete = (isCorrect: boolean) => {
    setAttempts((prev) => prev + 1);
    handleAnswerEvaluated(isCorrect);
  };

  // Handler for Count Stepper completion
  const handleCountStepperComplete = (isCorrect: boolean) => {
    setAttempts((prev) => prev + 1);
    handleAnswerEvaluated(isCorrect);
  };

  const handleAnswerEvaluated = (correct: boolean) => {
    stopVoice();
    setIsLastCorrect(correct);
    playFeedbackTone(correct);

    // Track First-Time-Right (FTR), attempts, decisions count, and stopwatch elapsed time
    const isFirstAttempt = sceneAttemptsRef.current === 0;
    sceneAttemptsRef.current += 1;
    totalDecisionsRef.current += 1;
    if (correct) correctDecisionsRef.current += 1;

    const timeSpentSeconds = Math.max(1, Math.round((Date.now() - sceneStartTimeRef.current) / 1000));
    totalTimeSecondsRef.current += timeSpentSeconds;

    const isFirstTimeRight = correct && isFirstAttempt;
    setIsLastFirstTimeRight(isFirstTimeRight);
    if (isFirstTimeRight) {
      pointsScoredRef.current += 1;
      setPointsScored(pointsScoredRef.current);
    }
    if (!correct) {
      safetyBreachesRef.current += 1;
    }
    persistSessionCache();

    const category: TrainingCategory = stageData.stageNumber <= 7 ? 'receiving_putaway' : 'picking_packaging';
    const stageTitleText = stageData.stageTitle?.en || (stageData.stageTitle as any)?.[lang] || `Module ${stageData.stageNumber}`;
    const sceneTitleText = scene.title?.en || (scene.title as any)?.[lang] || (scene as any).name?.en || `Scene ${currentSceneIndex + 1}`;

    // 1. Log granular telemetry to Firebase
    logSceneTelemetry({
      operatorId: userProfile?.operatorId || 'OP-AURIC-104',
      employeeName: userProfile?.name || 'Ramesh Patil',
      category,
      stageIndex: currentStageIndex,
      stageNumber: stageData.stageNumber,
      stageTitle: stageTitleText,
      sceneIndex: currentSceneIndex,
      sceneId: scene.id,
      sceneTitle: sceneTitleText,
      interactionType: scene.interaction.type,
      timeSpentSeconds,
      isCorrect: correct,
      attempts: sceneAttemptsRef.current,
      pointsAwarded: isFirstTimeRight ? 1 : 0,
      xpEarned: isFirstTimeRight ? 1 : 0,
      sopClause: scene.rules.sopClause || 'Standard'
    });

    // 2. Update employee aggregate live session
    const currentAcc = Math.round((pointsScoredRef.current / Math.max(1, totalPossiblePoints)) * 100);
    syncEmployeeSession({
      operatorId: userProfile?.operatorId || 'OP-AURIC-104',
      employeeName: userProfile?.name || 'Ramesh Patil',
      photoUrl: userProfile?.photoUrl,
      category,
      currentStageIndex,
      completedStages: [...completedStagesRef.current],
      pointsScored: pointsScoredRef.current,
      totalScoreXP: pointsScoredRef.current,
      totalPossiblePoints,
      safetyBreachesCount: safetyBreachesRef.current,
      accuracyPct: currentAcc,
      totalDecisionsCount: totalDecisionsRef.current,
      correctDecisionsCount: correctDecisionsRef.current,
      totalTimeSpentSeconds: totalTimeSecondsRef.current,
      status: 'in_progress'
    });

    if (correct) {
      setXp(pointsScoredRef.current);
    } else {
      setHearts((prev) => Math.max(1, prev - 1));
    }

    setPhase('feedback');
  };

  // Continue story to next scene or gateway
  const handleContinueStory = () => {
    stopVoice();
    if (currentSceneIndex < stageData.scenes.length - 1) {
      setCurrentSceneIndex((prev) => prev + 1);
      setPhase('intro');
      setSelectedOptionId(null);
      setIsLastCorrect(false);
    } else {
      setPhase('gateway');
      if (!completedStagesRef.current.includes(currentStageIndex)) {
        completedStagesRef.current.push(currentStageIndex);
      }
      persistSessionCache();
      const category: TrainingCategory = stageData.stageNumber <= 7 ? 'receiving_putaway' : 'picking_packaging';
      const currentAcc = Math.round((pointsScoredRef.current / Math.max(1, totalPossiblePoints)) * 100);
      const isFinalStage = currentStageIndex >= activeStages.length - 1;
      syncEmployeeSession({
        operatorId: userProfile?.operatorId || 'OP-AURIC-104',
        employeeName: userProfile?.name || 'Ramesh Patil',
        photoUrl: userProfile?.photoUrl,
        category,
        currentStageIndex,
        completedStages: [...completedStagesRef.current],
        pointsScored: pointsScoredRef.current,
        totalScoreXP: pointsScoredRef.current,
        totalPossiblePoints,
        safetyBreachesCount: safetyBreachesRef.current,
        accuracyPct: currentAcc,
        totalDecisionsCount: totalDecisionsRef.current,
        correctDecisionsCount: correctDecisionsRef.current,
        totalTimeSpentSeconds: totalTimeSecondsRef.current,
        status: isFinalStage ? (currentAcc >= 85 && safetyBreachesRef.current === 0 ? 'floor_ready' : 'retrain_needed') : 'in_progress'
      });
      try {
        confetti({
          particleCount: 80,
          spread: 75,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }
    }
  };

  const handleSelectScene = (index: number) => {
    stopVoice();
    setCurrentSceneIndex(index);
    setPhase('intro');
    setSelectedOptionId(null);
    setIsLastCorrect(false);
  };

  const handleSelectStage = (stageIdx: number) => {
    stopVoice();
    setCurrentStageIndex(stageIdx);
    setCurrentSceneIndex(0);
    setPhase('intro');
    setSelectedOptionId(null);
    setIsLastCorrect(false);
  };

  const handleResetCurrentScene = () => {
    stopVoice();
    setPhase('intro');
    setSelectedOptionId(null);
    setIsLastCorrect(false);
    setRetryKey((prev) => prev + 1);
  };

  useEffect(() => {
    continueStoryRef.current = handleContinueStory;
    answerEvaluatedRef.current = handleAnswerEvaluated;
    resetSceneRef.current = handleResetCurrentScene;
  });

  const getValidDialogue = (
    primary?: any,
    secondary?: any,
    fallback?: LocalizedText
  ): LocalizedText => {
    const defaultText: LocalizedText = {
      en: 'Observe the operational scene and execute the mandatory SOP decision.',
      hi: 'परिचालन दृश्य का निरीक्षण करें और अनिवार्य SOP निर्णय निष्पादित करें।',
      mr: 'कारखान्यातील दृश्य पहा आणि आवश्यक SOP निर्णय घ्या.'
    };
    const def = fallback || defaultText;

    const en =
      (typeof primary?.en === 'string' && primary.en.trim() ? primary.en.trim() : null) ||
      (typeof secondary?.en === 'string' && secondary.en.trim() ? secondary.en.trim() : null) ||
      def.en;
    const hi =
      (typeof primary?.hi === 'string' && primary.hi.trim() ? primary.hi.trim() : null) ||
      (typeof secondary?.hi === 'string' && secondary.hi.trim() ? secondary.hi.trim() : null) ||
      def.hi ||
      en;
    const mr =
      (typeof primary?.mr === 'string' && primary.mr.trim() ? primary.mr.trim() : null) ||
      (typeof secondary?.mr === 'string' && secondary.mr.trim() ? secondary.mr.trim() : null) ||
      def.mr ||
      en;

    return { en, hi, mr };
  };

  // Mascot dynamic pose and text calculation with full Category 1 & Category 2 compatibility
  const mascotData = scene.mascot as any;
  const interactionData = scene.interaction as any;

  let currentPose: MascotPose = mascotData?.pose || mascotData?.intro?.pose || 'explaining';
  let currentDialogue: LocalizedText = getValidDialogue(
    mascotData?.intro?.text,
    mascotData?.dialog
  );
  let currentAudio: string | undefined = mascotData?.intro?.audioSrc;

  if (phase === 'interaction_paused') {
    currentPose = 'thinking';
    currentDialogue = getValidDialogue(
      interactionData?.question || interactionData?.prompt,
      currentDialogue
    );
    // Strict separation: do not bleed intro audio into interaction phase unless explicitly defined for this question
    currentAudio = interactionData?.audioSrc || undefined;
  } else if (phase === 'feedback') {
    if (isLastCorrect) {
      currentPose = 'success';
      currentDialogue = getValidDialogue(
        mascotData?.onCorrect?.text,
        undefined,
        {
          en: 'Excellent! Your operational decision is 100% compliant with Ather AURIC SOP standards.',
          hi: 'बहुत बढ़िया! आपका परिचालन निर्णय एथर औरिक SOP मानकों के साथ 100% अनुपालन है।',
          mr: 'उत्कृष्ट! तुमचा निर्णय एथर औरिक SOP मानकांनुसार 100% योग्य आहे.'
        }
      );
      currentAudio = mascotData?.onCorrect?.audioSrc;
    } else {
      currentPose = 'warning';
      currentDialogue = getValidDialogue(
        mascotData?.onIncorrect?.text,
        undefined,
        {
          en: 'Warning: SOP Protocol Violation! Review the official clause explanation below.',
          hi: 'चेतावनी: SOP प्रोटोकॉल उल्लंघन! नीचे दिए गए आधिकारिक क्लॉज विवरण की समीक्षा करें।',
          mr: 'सावधान: SOP नियमांचे उल्लंघन! खालील अधिकृत नियमाचे स्पष्टीकरण काळजीपूर्वक वाचा.'
        }
      );
      currentAudio = mascotData?.onIncorrect?.audioSrc;
    }
  }

  const getRunSummary = (): RunSummary => {
    const totalSteps = totalPossiblePoints;
    const correctSteps = pointsScoredRef.current;
    const accuracyPct = Math.round((correctSteps / Math.max(1, totalSteps)) * 100);
    return {
      packId: isPicking ? 'ather_picking_packaging' : 'ather_receiving_putaway',
      packTitle: {
        en: isPicking
          ? 'Order Picking & Packaging Certification'
          : 'Warehouse Receiving & Put-Away Certification',
        hi: isPicking
          ? 'ऑर्डर पिकिंग और पैकेजिंग प्रमाणन'
          : 'वेयरहाउस प्राप्ति और पुट-अवे प्रमाणन',
        mr: isPicking
          ? 'ऑर्डर पिकिंग आणि पॅकेजिंग प्रमाणपत्र'
          : 'वेअरहाऊस प्राप्ती आणि पुट-अवे प्रमाणपत्र'
      },
      mode: 'guided',
      stars: accuracyPct >= 90 ? 3 : accuracyPct >= 75 ? 2 : 1,
      xpGained: correctSteps,
      accuracyPct,
      totalSteps,
      correctSteps,
      safetyPassed: safetyBreachesRef.current === 0,
      lost: false,
      badgesEarned: ['safe', 'perf', 'cert'],
      timestamp: new Date().toISOString()
    };
  };

  if (showCertificate) {
    const summary: RunSummary = getRunSummary();

    const profile: UserProfile = userProfile || {
      name: isPicking ? 'Ather Certified Outbound Specialist' : 'Ather Certified Inbound Specialist',
      operatorId: 'AURIC-M002-WH-42',
      xp: pointsScoredRef.current,
      streak: 5,
      lastActiveDate: new Date().toISOString().split('T')[0],
      badges: ['safe', 'perf', 'cert'],
      packBestStars: {}
    };

    return (
      <CertificateView
        summary={summary}
        lang={lang}
        profile={profile}
        sopDoc={isPicking ? 'AURIC-PRO-C2-008' : stageData.sopDoc}
        onBack={() => setShowCertificate(false)}
        onNavigateHome={() => {
          setShowCertificate(false);
          if (onExitHome) {
            onExitHome();
          } else {
            handleSelectStage(0);
          }
        }}
        appMode={appMode}
      />
    );
  }


  const renderSimulationCanvas = (isPaused: boolean, onPauseReached: () => void) => {
    if (scene.media.videoSrc) {
      return (
        <StoryVideoFrame
          key={scene.media.videoSrc}
          videoSrc={scene.media.videoSrc}
          posterSrc={scene.media.posterSrc}
          title={scene.title?.[lang] || scene.title?.en}
          isPaused={isPaused}
          onPauseReached={onPauseReached}
          pauseAtSecond={scene.media.pauseAtSecond}
        />
      );
    }

    if (scene.media.imageSrc) {
      return (
        <FacilityPhotoFrame
          key={scene.media.imageSrc}
          imageSrc={scene.media.imageSrc}
          propSrc={scene.media.propSrc}
          title={scene.title?.[lang] || scene.title?.en}
          sopClause={scene.rules?.sopClause}
          isPaused={isPaused}
        />
      );
    }

    return (
      <FacilityPhotoFrame
        key="fallback-facility"
        imageSrc="/Assets/environments/bg_plant_map_hotspot.webp"
        title={scene.title?.[lang] || scene.title?.en || "Ather AURIC Plant M002"}
        sopClause={scene.rules?.sopClause}
        isPaused={isPaused}
      />
    );
  };

  return (
    <div className="h-[100dvh] max-h-[100dvh] bg-slate-100/90 text-slate-900 flex flex-col font-sans select-none antialiased overflow-hidden">
      {/* 1. Master Minimalist HUD (48px) */}
      <StoryHud
        stageTitle={stageData.stageTitle[lang] || stageData.stageTitle.en}
        lang={lang}
        onSelectLang={handleSetLang}
        currentSceneIndex={currentSceneIndex}
        totalScenes={stageData.scenes.length}
        onExitHome={() => {
          stopVoice();
          onExitHome?.();
        }}
      />

      {/* 2. Main Tablet Workstation Canvas (Locked Viewport) */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-2 sm:p-3 min-h-0 overflow-hidden flex flex-col justify-start">
        {phase !== 'gateway' ? (
          <>
            {phase === 'intro' ? (
              /* Phase 1: Full-Screen Cinema Intro with Floating Comic Aura */
              <div className="relative w-full h-full flex-1 rounded-2xl overflow-hidden shadow-lg border border-slate-800 bg-slate-950 flex flex-col justify-between">
                <div className="relative w-full h-full flex-1 min-h-0">
                  {renderSimulationCanvas(false, handlePauseReached)}
                </div>

                {/* Floating Aura Bot & Standalone Next Button Overlay */}
                <div className="absolute bottom-3.5 left-3 right-4 z-30 flex items-end justify-between gap-4 pointer-events-none">
                  {/* Floating Aura Bot on Left/Center (Dialogue without embedded button) */}
                  <div className="flex-1 max-w-3xl pointer-events-auto">
                    <MascotAura
                      pose={currentPose}
                      dialogue={currentDialogue}
                      lang={lang}
                      audioSrc={currentAudio}
                      variant="floating_overlay"
                    />
                  </div>

                  {/* Standalone Next Button placed on the right over the trees (as marked in red) */}
                  <div className="shrink-0 mb-3 pointer-events-auto">
                    <button
                      type="button"
                      onClick={() => {
                        stopVoice();
                        setPhase('interaction_paused');
                      }}
                      className="px-6 py-3 rounded-2xl font-bold text-sm sm:text-base text-white bg-blue-600 hover:bg-blue-500 active:scale-95 shadow-xl shadow-blue-900/50 border border-blue-400/40 flex items-center gap-2 cursor-pointer transition-all duration-200 hover:shadow-blue-500/40"
                    >
                      <span>Next</span>
                      <span className="text-base font-extrabold">→</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Phase 2: Dynamic Dual-Cockpit Workstation (46% Left Cockpit, 54% Right Cockpit) */
              <div
                className="h-full w-full gap-3 items-stretch min-h-0 grid"
                style={{
                  gridTemplateColumns: isQuestionExpanded
                    ? '1fr'
                    : 'minmax(0, 46fr) minmax(0, 54fr)'
                }}
              >
                {/* Left Cockpit: Simulation Stage (Top 60% Video in Original Ratio) & Aura Bot + Comment (Bottom 40%) */}
                {!isQuestionExpanded && (
                  <div
                    className="h-full min-h-0 grid gap-2.5 relative"
                    style={{ gridTemplateRows: 'minmax(0, 60fr) minmax(0, 40fr)' }}
                  >
                    {/* Top 60%: Video in Original Ratios */}
                    <div className="w-full h-full rounded-2xl overflow-hidden border border-slate-800/90 shadow-md bg-slate-950 flex items-center justify-center relative min-h-0">
                      <div className="w-full h-full aspect-video max-w-full max-h-full flex items-center justify-center relative">
                        {renderSimulationCanvas(
                          false, // Autoplay & continuous video loop so trainee can observe the operational scene
                          handlePauseReached
                        )}
                      </div>
                    </div>

                    {/* Bottom 40%: Aura Assistant & Operational Guidance Cockpit */}
                    <div className="w-full h-full rounded-2xl border border-slate-200/90 bg-white shadow-sm p-3 sm:p-4 flex items-center min-h-0 relative overflow-hidden">
                      <MascotAura
                        pose={currentPose}
                        dialogue={currentDialogue}
                        lang={lang}
                        audioSrc={currentAudio}
                        variant="docked"
                      />
                    </div>
                  </div>
                )}

                {/* Right Cockpit: Touch-First Decision Console (54% width horizontally) */}
                <div className="h-full min-h-0 flex flex-col relative">
                  {/* Floating Action Strip when Question is Expanded */}
                  {isQuestionExpanded ? (
                    <div className="mb-2 flex items-center justify-between shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          stopVoice();
                          setReplayKey(Date.now());
                          setShowVideoModal(true);
                        }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-slate-900 text-white hover:bg-slate-800 shadow-sm cursor-pointer"
                      >
                        <Video className="w-3.5 h-3.5 text-blue-400" />
                        <span>View Scene Video</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setIsQuestionExpanded(false)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-slate-200 text-slate-700 hover:bg-slate-300 shadow-xs cursor-pointer"
                      >
                        <Minimize2 className="w-3.5 h-3.5" />
                        <span>Split View</span>
                      </button>
                    </div>
                  ) : (
                    /* Expand Workspace button for Non-MCQ cards in split mode */
                    scene.interaction.type !== 'mcq' && (
                      <div className="mb-1 flex justify-end shrink-0">
                        <button
                          type="button"
                          onClick={() => setIsQuestionExpanded(true)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-mono font-bold text-slate-600 hover:text-blue-600 bg-white hover:bg-blue-50 border border-slate-200 shadow-xs transition-colors cursor-pointer"
                        >
                          <Maximize2 className="w-3 h-3" />
                          <span>Expand Workspace</span>
                        </button>
                      </div>
                    )
                  )}

                  {/* Question Console Card */}
                  <div className="flex-1 min-h-0 overflow-y-auto scrollbar-thin pr-0.5">
                    {scene.interaction.type === 'mcq' ? (
                      <QuestionCard
                        key={`mcq-${scene.id}-${retryKey}`}
                        interaction={scene.interaction as McqInteraction}
                        lang={lang}
                        selectedOptionId={selectedOptionId}
                        onSelectOption={handleSelectMcqOption}
                        isExpanded={isQuestionExpanded}
                        onToggleExpand={() => setIsQuestionExpanded(!isQuestionExpanded)}
                        isAnswered={phase === 'feedback'}
                        isCorrect={isLastCorrect}
                        onContinue={handleContinueStory}
                        onRetry={handleResetCurrentScene}
                        isLastScene={currentSceneIndex === stageData.scenes.length - 1}
                        explanationText={currentDialogue[lang] || currentDialogue.en}
                      />
                    ) : scene.interaction.type === 'drag_drop' ? (
                      <DragDropCard
                        key={`drag_drop-${scene.id}-${retryKey}`}
                        interaction={scene.interaction as DragDropInteraction}
                        lang={lang}
                        onComplete={handleDragDropComplete}
                        disabled={phase === 'feedback'}
                        isAnswered={phase === 'feedback'}
                        isCorrect={isLastCorrect}
                        onContinue={handleContinueStory}
                        onRetry={handleResetCurrentScene}
                        explanationText={currentDialogue[lang] || currentDialogue.en}
                        sopClause={scene.rules.sopClause}
                        xpAward={scene.rules.xp}
                      />
                    ) : scene.interaction.type === 'sequence' ? (
                      <SequenceCard
                        key={`sequence-${scene.id}-${retryKey}`}
                        interaction={scene.interaction as SequenceInteraction}
                        lang={lang}
                        onComplete={handleSequenceComplete}
                        disabled={phase === 'feedback'}
                        isAnswered={phase === 'feedback'}
                        isCorrect={isLastCorrect}
                        onContinue={handleContinueStory}
                        onRetry={handleResetCurrentScene}
                        explanationText={currentDialogue[lang] || currentDialogue.en}
                        sopClause={scene.rules.sopClause}
                        xpAward={scene.rules.xp}
                      />
                    ) : scene.interaction.type === 'spot_error' ? (
                      <SpotErrorCard
                        key={`spot_error-${scene.id}-${retryKey}`}
                        interaction={scene.interaction as SpotErrorInteraction}
                        lang={lang}
                        onComplete={handleSpotErrorComplete}
                      />
                    ) : scene.interaction.type === 'stop_go' ? (
                      <StopGoCard
                        key={`stop_go-${scene.id}-${retryKey}`}
                        interaction={scene.interaction as StopGoInteraction}
                        lang={lang}
                        onComplete={handleStopGoComplete}
                      />
                    ) : scene.interaction.type === 'count_stepper' ? (
                      <CountStepperCard
                        key={`count_stepper-${scene.id}-${retryKey}`}
                        interaction={scene.interaction as CountStepperInteraction}
                        lang={lang}
                        onComplete={handleCountStepperComplete}
                      />
                    ) : scene.interaction.type === 'hotspot' ? (
                      <HotspotCard
                        key={`hotspot-${scene.id}-${retryKey}`}
                        interaction={scene.interaction as HotspotInteraction}
                        lang={lang}
                        onComplete={handleHotspotComplete}
                      />
                    ) : (
                      <div className="p-6 bg-white rounded-2xl border border-slate-200 text-center space-y-3">
                        <p className="text-sm font-bold text-slate-700">Operational Decision Gate</p>
                        <button
                          type="button"
                          onClick={() => handleAnswerEvaluated(true)}
                          className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-sm cursor-pointer"
                        >
                          Confirm & Continue
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Feedback Card for non-MCQ tasks (only when not handled internally by the component) */}
                  {phase === 'feedback' && scene.interaction.type !== 'mcq' && scene.interaction.type !== 'drag_drop' && scene.interaction.type !== 'sequence' && (
                    <div className="pt-2 shrink-0">
                      <FeedbackCard
                        key={`feedback-${scene.id}-${retryKey}`}
                        scene={scene}
                        lang={lang}
                        isCorrect={isLastCorrect}
                        isFirstTimeRight={isLastFirstTimeRight}
                        selectedOptionId={selectedOptionId}
                        onContinue={handleContinueStory}
                        onRetry={handleResetCurrentScene}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Video Preview Modal when in Expanded Mode (Replays from start with original ratio + Aura bot & comment) */}
            {showVideoModal && (
              <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
                <div className="relative w-full max-w-4xl bg-slate-950 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl aspect-video flex flex-col justify-end">
                  {/* Close Button */}
                  <button
                    type="button"
                    onClick={() => {
                      stopVoice();
                      setShowVideoModal(false);
                    }}
                    className="absolute top-3 right-3 z-30 px-3 py-1.5 rounded-full bg-slate-900/85 hover:bg-slate-800 text-white border border-slate-600 text-xs font-mono font-bold flex items-center gap-1.5 shadow-lg cursor-pointer"
                  >
                    <span>Close</span>
                    <span>✕</span>
                  </button>

                  {/* Fresh Remount with replayKey to Replay Scene from 0:00 */}
                  <div key={replayKey} className="absolute inset-0 w-full h-full">
                    {renderSimulationCanvas(false, () => {})}
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <MilestoneGateway
            stage={stageData}
            stageIndex={currentStageIndex}
            totalStages={activeStages.length}
            lang={lang}
            xp={pointsScoredRef.current}
            hearts={hearts}
            attempts={attempts}
            onSelectScene={handleSelectScene}
            onSelectStage={handleSelectStage}
            onViewScorecard={onViewScorecard ? () => onViewScorecard(getRunSummary()) : undefined}
            onViewCertificate={() => setShowCertificate(true)}
            onRestartFull={() => {
              try {
                localStorage.removeItem(sessionCacheKey);
              } catch {}
              pointsScoredRef.current = 0;
              safetyBreachesRef.current = 0;
              completedStagesRef.current = [];
              setPointsScored(0);
              setXp(0);
              handleSelectStage(0);
            }}
            appMode={appMode}
          />
        )}
      </main>
    </div>
  );
};
