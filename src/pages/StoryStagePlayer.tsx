import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MASCOT_IMAGE_MAP } from '../engine/story/assetRegistry';
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
import { TruckGateAnimation } from '../components/story/TruckGateAnimation';
import { GatehouseCabinAnimation } from '../components/story/GatehouseCabinAnimation';
import { SapTerminalAnimation } from '../components/story/SapTerminalAnimation';
import { ThermalPrinterAnimation } from '../components/story/ThermalPrinterAnimation';
import { DockBlueprintAnimation } from '../components/story/DockBlueprintAnimation';
import { DockSafetyAnimation } from '../components/story/DockSafetyAnimation';
import { ExitGatehouseAnimation } from '../components/story/ExitGatehouseAnimation';
import { GrnStickerAnimation } from '../components/story/GrnStickerAnimation';
import { IqcSamplingAnimation } from '../components/story/IqcSamplingAnimation';
import { IqcConesAnimation } from '../components/story/IqcConesAnimation';
import { IqcHandoverSlaAnimation } from '../components/story/IqcHandoverSlaAnimation';
import { IqcDispositionAnimation } from '../components/story/IqcDispositionAnimation';
import { HuScanAnimation } from '../components/story/HuScanAnimation';
import { RouteSegregationAnimation } from '../components/story/RouteSegregationAnimation';
import { BinMarriageAnimation } from '../components/story/BinMarriageAnimation';
import { OmittedScanHazardAnimation } from '../components/story/OmittedScanHazardAnimation';
import { BatteryDockArrivalAnimation } from '../components/story/BatteryDockArrivalAnimation';
import { CleanroomVaultAnimation } from '../components/story/CleanroomVaultAnimation';
import { BatterySlaCountdownAnimation } from '../components/story/BatterySlaCountdownAnimation';
import { EnvironmentalAlarmAnimation } from '../components/story/EnvironmentalAlarmAnimation';
import { ChemicalBypassAnimation } from '../components/story/ChemicalBypassAnimation';
import { ChemicalUnloadingAnimation } from '../components/story/ChemicalUnloadingAnimation';
import { ChemicalSegregationAnimation } from '../components/story/ChemicalSegregationAnimation';
import { ChemicalDeoPostingAnimation } from '../components/story/ChemicalDeoPostingAnimation';
import { SupermarketMh1DeskAnimation } from '../components/story/SupermarketMh1DeskAnimation';
import { SupermarketCountAuditAnimation } from '../components/story/SupermarketCountAuditAnimation';
import { GravityFlowRackAnimation } from '../components/story/GravityFlowRackAnimation';
import { SupermarketKanbanAnimation } from '../components/story/SupermarketKanbanAnimation';
import { IqcLotQuarantineAnimation } from '../components/story/IqcLotQuarantineAnimation';
import { RedTagJiraAnimation } from '../components/story/RedTagJiraAnimation';
import { QuarantineSegregationAnimation } from '../components/story/QuarantineSegregationAnimation';
import { DispositionFilterAnimation } from '../components/story/DispositionFilterAnimation';
import { ScrapShredderAnimation } from '../components/story/ScrapShredderAnimation';
import { MesWhTaskAnimation } from '../components/story/c2/MesWhTaskAnimation';
import { SourceLocationQrAnimation } from '../components/story/c2/SourceLocationQrAnimation';
import { TrolleyMarriageAnimation } from '../components/story/c2/TrolleyMarriageAnimation';
import { WorkstationDeliveryAnimation } from '../components/story/c2/WorkstationDeliveryAnimation';
import { AcedTrolleyIssuanceAnimation } from '../components/story/c2/AcedTrolleyIssuanceAnimation';
import { TwoBinEkanbanAnimation } from '../components/story/c2/TwoBinEkanbanAnimation';
import { TrolleyCapacityAnimation } from '../components/story/c2/TrolleyCapacityAnimation';
import { MheWrongPartReturnAnimation } from '../components/story/c2/MheWrongPartReturnAnimation';
import { MezzanineSequencingAnimation } from '../components/story/c2/MezzanineSequencingAnimation';
import { BrakeMotorDecantingAnimation } from '../components/story/c2/BrakeMotorDecantingAnimation';
import { WrongLaneRejectionAnimation } from '../components/story/c2/WrongLaneRejectionAnimation';
import { LineSideEwmCloseAnimation } from '../components/story/c2/LineSideEwmCloseAnimation';
import { IndirectNoReservationAnimation } from '../components/story/c2/IndirectNoReservationAnimation';
import { SapYmb21TransferAnimation } from '../components/story/c2/SapYmb21TransferAnimation';
import { MrsCostCenterAuditAnimation } from '../components/story/c2/MrsCostCenterAuditAnimation';
import { IndirectHandoverProtocolAnimation } from '../components/story/c2/IndirectHandoverProtocolAnimation';
import { JiraBudgetIdAnimation } from '../components/story/c2/JiraBudgetIdAnimation';
import { PirDualApprovalAnimation } from '../components/story/c2/PirDualApprovalAnimation';
import { PirCutoffClockAnimation } from '../components/story/c2/PirCutoffClockAnimation';
import { SapStoGateExitAnimation } from '../components/story/c2/SapStoGateExitAnimation';
import { RtvCauserGateAnimation } from '../components/story/c2/RtvCauserGateAnimation';
import { RtvDeviationAnimation } from '../components/story/c2/RtvDeviationAnimation';
import { EmptyBinStackingAnimation } from '../components/story/c2/EmptyBinStackingAnimation';
import { ReverseTruckLoadingAnimation } from '../components/story/c2/ReverseTruckLoadingAnimation';
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
import { Camera, Video, Minimize2, Maximize2 } from 'lucide-react';

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
}

export const StoryStagePlayer: React.FC<StoryStagePlayerProps> = ({
  initialStageIndex,
  initialSceneIndex,
  userProfile,
  onExitHome,
  onViewScorecard,
  lang: propLang,
  onSelectLang: propOnSelectLang
}) => {
  const [lang, setLang] = useState<LanguageCode>(() => {
    if (propLang) return propLang;
    try {
      return (localStorage.getItem('ather_lang') as LanguageCode) || 'en';
    } catch {
      return 'en';
    }
  });

  const handleSetLang = (newLang: LanguageCode) => {
    stopVoice();
    setLang(newLang);
    propOnSelectLang?.(newLang);
  };

  const [currentStageIndex, setCurrentStageIndex] = useState<number>(() => {
    if (initialStageIndex !== undefined) {
      return Math.min(Math.max(0, initialStageIndex), allStages.length - 1);
    }
    try {
      const saved = localStorage.getItem('ather_stage_idx');
      return saved !== null ? Math.min(Math.max(0, Number(saved)), allStages.length - 1) : 0;
    } catch {
      return 0;
    }
  });
  const [currentSceneIndex, setCurrentSceneIndex] = useState<number>(() => {
    if (initialSceneIndex !== undefined) {
      return initialSceneIndex;
    }
    try {
      const saved = localStorage.getItem('ather_scene_idx');
      return saved !== null ? Number(saved) : 0;
    } catch {
      return 0;
    }
  });
  const [xp, setXp] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('ather_xp');
      return saved !== null ? Number(saved) : 0;
    } catch {
      return 0;
    }
  });
  const [hearts, setHearts] = useState<number>(3);
  const [attempts, setAttempts] = useState<number>(0);
  const [showCertificate, setShowCertificate] = useState<boolean>(false);

  // Timeline Phase: 'intro' -> 'interaction_paused' -> 'feedback' -> 'gateway'
  const [phase, setPhase] = useState<'intro' | 'interaction_paused' | 'feedback' | 'gateway'>(() => {
    try {
      if (window.location.hash.includes('gateway') || window.location.hash.includes('phase=gateway')) {
        return 'gateway';
      }
    } catch {}
    return 'intro';
  });
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isLastCorrect, setIsLastCorrect] = useState<boolean>(false);
  const [canvasViewMode, setCanvasViewMode] = useState<'photo' | 'blueprint'>('photo');
  const [isQuestionExpanded, setIsQuestionExpanded] = useState<boolean>(false);
  const [showVideoModal, setShowVideoModal] = useState<boolean>(false);
  const [replayKey, setReplayKey] = useState<number>(0);
  const [showWrongCenterAlert, setShowWrongCenterAlert] = useState<boolean>(false);
  const wrongAlertTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stageData = allStages[currentStageIndex] || allStages[0];
  const scene = stageData.scenes[currentSceneIndex] || stageData.scenes[0];

  // Clean up alert timeout and audio on unmount
  useEffect(() => {
    return () => {
      stopVoice();
      if (wrongAlertTimeoutRef.current) clearTimeout(wrongAlertTimeoutRef.current);
    };
  }, []);

  // Reset canvas view mode on scene change:
  // Default to 'blueprint' (the interactive coded simulation animation),
  // ensuring learners immediately see the interactive terminals, screens, blueprints,
  // and process animations. Users can toggle to 'PHOTO' anytime if a real photograph is attached.
  useEffect(() => {
    const isExplicitPhoto = scene.media?.preferredViewMode === 'photo';
    setCanvasViewMode(isExplicitPhoto ? 'photo' : 'blueprint');
    const isMultiZone = scene.interaction.type === 'drag_drop' || scene.interaction.type === 'sequence';
    setIsQuestionExpanded(isMultiZone);
    setShowVideoModal(false);
  }, [currentStageIndex, currentSceneIndex]);

  // Auto-save progress to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ather_stage_idx', String(currentStageIndex));
      localStorage.setItem('ather_scene_idx', String(currentSceneIndex));
      localStorage.setItem('ather_xp', String(xp));
      localStorage.setItem('ather_lang', lang);
    } catch {
      // Storage unavailable
    }
  }, [currentStageIndex, currentSceneIndex, xp, lang]);

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

    if (correct) {
      setXp((prev) => prev + scene.rules.xp);
      setShowWrongCenterAlert(false);
      if (wrongAlertTimeoutRef.current) clearTimeout(wrongAlertTimeoutRef.current);
    } else {
      setHearts((prev) => Math.max(1, prev - 1));
      // Trigger dramatic center screen alert pop-in that draws maximum attention, then transitions to bottom-left
      setShowWrongCenterAlert(true);
      if (wrongAlertTimeoutRef.current) clearTimeout(wrongAlertTimeoutRef.current);
      wrongAlertTimeoutRef.current = setTimeout(() => {
        setShowWrongCenterAlert(false);
      }, 1400);
    }

    setPhase('feedback');
  };

  // Continue story to next scene or gateway
  const handleContinueStory = () => {
    stopVoice();
    setShowWrongCenterAlert(false);
    if (wrongAlertTimeoutRef.current) clearTimeout(wrongAlertTimeoutRef.current);
    if (currentSceneIndex < stageData.scenes.length - 1) {
      setCurrentSceneIndex((prev) => prev + 1);
      setPhase('intro');
      setSelectedOptionId(null);
      setIsLastCorrect(false);
    } else {
      setPhase('gateway');
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
    setShowWrongCenterAlert(false);
    if (wrongAlertTimeoutRef.current) clearTimeout(wrongAlertTimeoutRef.current);
    setCurrentSceneIndex(index);
    setPhase('intro');
    setSelectedOptionId(null);
    setIsLastCorrect(false);
  };

  const handleSelectStage = (stageIdx: number) => {
    stopVoice();
    setShowWrongCenterAlert(false);
    if (wrongAlertTimeoutRef.current) clearTimeout(wrongAlertTimeoutRef.current);
    setCurrentStageIndex(stageIdx);
    setCurrentSceneIndex(0);
    setPhase('intro');
    setSelectedOptionId(null);
    setIsLastCorrect(false);
  };

  const handleResetCurrentScene = () => {
    stopVoice();
    setShowWrongCenterAlert(false);
    if (wrongAlertTimeoutRef.current) clearTimeout(wrongAlertTimeoutRef.current);
    setPhase('intro');
    setSelectedOptionId(null);
    setIsLastCorrect(false);
  };

  // Mascot dynamic pose and text calculation with full Category 1 & Category 2 compatibility
  const mascotData = scene.mascot as any;
  const interactionData = scene.interaction as any;

  let currentPose: MascotPose = mascotData?.pose || mascotData?.intro?.pose || 'explaining';
  let currentDialogue: LocalizedText = mascotData?.intro?.text || mascotData?.dialog || {
    en: 'Observe the operational scene and execute the mandatory SOP decision.',
    hi: 'परिचालन दृश्य का निरीक्षण करें और अनिवार्य SOP निर्णय निष्पादित करें।',
    mr: 'कारखान्यातील दृश्य पहा आणि आवश्यक SOP निर्णय घ्या.'
  };
  let currentAudio: string | undefined = mascotData?.intro?.audioSrc;

  if (phase === 'interaction_paused') {
    currentPose = 'thinking';
    currentDialogue = interactionData?.question || interactionData?.prompt || currentDialogue;
    // Strict separation: do not bleed intro audio into interaction phase unless explicitly defined for this question
    currentAudio = interactionData?.audioSrc || undefined;
  } else if (phase === 'feedback') {
    if (isLastCorrect) {
      currentPose = 'success';
      currentDialogue = mascotData?.onCorrect?.text || {
        en: 'Excellent! Your operational decision is 100% compliant with Ather AURIC SOP standards.',
        hi: 'बहुत बढ़िया! आपका परिचालन निर्णय एथर औरिक SOP मानकों के साथ 100% अनुपालन है।',
        mr: 'उत्कृष्ट! तुमचा निर्णय एथर औरिक SOP मानकांनुसार 100% योग्य आहे.'
      };
      currentAudio = mascotData?.onCorrect?.audioSrc;
    } else {
      currentPose = 'warning';
      currentDialogue = mascotData?.onIncorrect?.text || {
        en: 'Warning: SOP Protocol Violation! Review the official clause explanation below.',
        hi: 'चेतावनी: SOP प्रोटोकॉल उल्लंघन! नीचे दिए गए आधिकारिक क्लॉज विवरण की समीक्षा करें।',
        mr: 'सावधान: SOP नियमांचे उल्लंघन! खालील अधिकृत नियमाचे स्पष्टीकरण काळजीपूर्वक वाचा.'
      };
      currentAudio = mascotData?.onIncorrect?.audioSrc;
    }
  }

  const getRunSummary = (): RunSummary => {
    const isFullJourney = currentStageIndex >= 11;
    const cat1TotalScenes = category1Stages.reduce((acc, s) => acc + s.scenes.length, 0);
    const allTotalScenes = allStages.reduce((acc, s) => acc + s.scenes.length, 0);
    return {
      packId: isFullJourney ? 'ather-all-modules' : (currentStageIndex >= 7 ? 'ather-category-2' : 'ather-category-1'),
      packTitle: {
        en: isFullJourney
          ? 'All 12 Modules Grandmaster Certification'
          : (currentStageIndex >= 7 ? 'Category 2: Outbound & Material Issuance' : 'Category 1: Inbound & Storage Certification'),
        hi: isFullJourney
          ? 'सभी 12 मॉड्यूल ग्रैंडमास्टर प्रमाणन'
          : (currentStageIndex >= 7 ? 'श्रेणी 2: जावक एवं सामग्री वितरण' : 'श्रेणी 1: आवक और भंडारण प्रमाणन'),
        mr: isFullJourney
          ? 'सर्व 12 मॉड्यूल्स ग्रँडमास्टर प्रमाणपत्र'
          : (currentStageIndex >= 7 ? 'कॅटेगरी 2: जावक व साहित्य वाटप' : 'कॅटेगरी 1: आवक व साठवणूक प्रमाणपत्र')
      },
      mode: 'guided',
      stars: 3,
      xpGained: xp,
      accuracyPct: attempts > 0 ? Math.min(100, Math.round(((Math.max(1, attempts - Math.max(0, 3 - hearts))) / attempts) * 100)) : 100,
      totalSteps: isFullJourney ? allTotalScenes : (currentStageIndex >= 7 ? allTotalScenes - cat1TotalScenes : cat1TotalScenes),
      correctSteps: Math.max(attempts, 8),
      safetyPassed: hearts > 0,
      lost: false,
      badgesEarned: ['safe', 'perf', 'cert'],
      timestamp: new Date().toISOString()
    };
  };

  if (showCertificate) {
    const isFullJourney = currentStageIndex >= 11;
    const summary: RunSummary = getRunSummary();

    const profile: UserProfile = userProfile || {
      name: 'Ather Certified Warehouse Specialist',
      operatorId: 'AURIC-M002-WH-42',
      xp,
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
        sopDoc={isFullJourney ? 'AURIC-PRO-ALL-012' : stageData.sopDoc}
        onBack={() => setShowCertificate(false)}
        onNavigateHome={() => {
          setShowCertificate(false);
          if (onExitHome) {
            onExitHome();
          } else {
            handleSelectStage(0);
          }
        }}
      />
    );
  }


  const renderSimulationCanvas = (isPaused: boolean, onPauseReached: () => void) => {
    if (scene.media.imageSrc && !scene.media.videoSrc && canvasViewMode === 'photo') {
      return (
        <FacilityPhotoFrame
          imageSrc={scene.media.imageSrc}
          propSrc={scene.media.propSrc}
          title={scene.title?.[lang] || scene.title?.en}
          sopClause={scene.rules?.sopClause}
          isPaused={isPaused}
          onToggleToBlueprint={() => setCanvasViewMode('blueprint')}
        />
      );
    }

    return (
      <div className="relative w-full h-full flex flex-col justify-center min-h-0">
        {scene.media.imageSrc && !scene.media.videoSrc && (
          <button
            type="button"
            onClick={() => setCanvasViewMode('photo')}
            className="absolute top-2.5 right-2.5 z-30 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-slate-900/80 hover:bg-slate-900 text-slate-200 border border-slate-700 shadow-sm transition-all cursor-pointer backdrop-blur-xs"
            title="Switch to Real Factory Photograph"
          >
            <Camera className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">PHOTO</span>
          </button>
        )}

        {scene.media.fallbackAnimation === 'truck_arrival_gate' ? (
                    <TruckGateAnimation
                      videoSrc={scene.media.videoSrc}
                      posterSrc={scene.media.posterSrc}
                      isPaused={isPaused}
                      onPauseReached={onPauseReached}
                    />
                  ) : scene.media.fallbackAnimation === 'gatehouse_cabin_desk' ? (
                    <GatehouseCabinAnimation
                      videoSrc={scene.media.videoSrc}
                      isPaused={isPaused}
                      onPauseReached={onPauseReached}
                    />
                  ) : scene.media.fallbackAnimation === 'sap_terminal_screen' ? (
                    <SapTerminalAnimation
                      videoSrc={scene.media.videoSrc}
                      isPaused={isPaused}
                      onPauseReached={onPauseReached}
                    />
                  ) : scene.media.fallbackAnimation === 'thermal_printer_tv' ? (
                    <ThermalPrinterAnimation
                      videoSrc={scene.media.videoSrc}
                      isPaused={isPaused}
                      onPauseReached={onPauseReached}
                    />
                  ) : scene.media.fallbackAnimation === 'dock_safety_chocks' ? (
                    <DockSafetyAnimation
                      videoSrc={scene.media.videoSrc}
                      posterSrc={scene.media.posterSrc}
                      isPaused={isPaused}
                      onPauseReached={onPauseReached}
                    />
                  ) : scene.media.fallbackAnimation === 'dock_blueprint_map' ? (
                    <DockBlueprintAnimation
                      videoSrc={scene.media.videoSrc}
                      isPaused={isPaused}
                      onPauseReached={onPauseReached}
                    />
                  ) : scene.media.fallbackAnimation === 'exit_gatehouse_barrier' ? (
                    <ExitGatehouseAnimation
                      videoSrc={scene.media.videoSrc}
                      isPaused={isPaused}
                      onPauseReached={onPauseReached}
                    />
                  ) : scene.media.fallbackAnimation === 'grn_sticker_staging' ? (
                    <GrnStickerAnimation
                      videoSrc={scene.media.videoSrc}
                      isPaused={isPaused}
                      onPauseReached={onPauseReached}
                    />
                  ) : scene.media.fallbackAnimation === 'iqc_sampling_transfer' || scene.media.fallbackAnimation === 'iqc_sample_inspection' ? (
                    <IqcSamplingAnimation
                      videoSrc={scene.media.videoSrc}
                      posterSrc={scene.media.posterSrc}
                      isPaused={isPaused}
                      onPauseReached={onPauseReached}
                    />
                  ) : scene.media.fallbackAnimation === 'iqc_cones_staging' || scene.media.fallbackAnimation === 'iqc_staging_cones' ? (
                    <IqcConesAnimation
                      videoSrc={scene.media.videoSrc}
                      isPaused={isPaused}
                      onPauseReached={onPauseReached}
                    />
                  ) : scene.media.fallbackAnimation === 'iqc_handover_sla_clock' || scene.media.fallbackAnimation === 'iqc_handover_sla' ? (
                    <IqcHandoverSlaAnimation
                      videoSrc={scene.media.videoSrc}
                      isPaused={isPaused}
                      onPauseReached={onPauseReached}
                    />
                  ) : scene.media.fallbackAnimation === 'iqc_disposition_workbench' ? (
                    <IqcDispositionAnimation
                      videoSrc={scene.media.videoSrc}
                      isPaused={isPaused}
                      onPauseReached={onPauseReached}
                    />
                  ) : scene.media.fallbackAnimation === 'hu_scan_initiation' ? (
                    <HuScanAnimation
                      videoSrc={scene.media.videoSrc}
                      isPaused={isPaused}
                      onPauseReached={onPauseReached}
                    />
                  ) : scene.media.fallbackAnimation === 'route_segregation_junction' ? (
                    <RouteSegregationAnimation
                      videoSrc={scene.media.videoSrc}
                      isPaused={isPaused}
                      onPauseReached={onPauseReached}
                    />
                  ) : scene.media.fallbackAnimation === 'bin_marriage_lift' || scene.media.fallbackAnimation === 'putaway_sequence_lifecycle' ? (
                    <BinMarriageAnimation
                      videoSrc={scene.media.videoSrc}
                      posterSrc={scene.media.posterSrc}
                      isPaused={isPaused}
                      onPauseReached={onPauseReached}
                    />
                  ) : scene.media.fallbackAnimation === 'omitted_scan_hazard' || scene.media.fallbackAnimation === 'bin_slotting_violation' ? (
                    <OmittedScanHazardAnimation
                      videoSrc={scene.media.videoSrc}
                      isPaused={isPaused}
                      onPauseReached={onPauseReached}
                    />
                  ) : scene.media.fallbackAnimation === 'battery_dock_auth' ? (
                    <BatteryDockArrivalAnimation
                      videoSrc={scene.media.videoSrc}
                      posterSrc={scene.media.posterSrc}
                      isPaused={isPaused}
                      onPauseReached={onPauseReached}
                    />
                  ) : scene.media.fallbackAnimation === 'cleanroom_vault_env' || scene.media.fallbackAnimation === 'battery_stacking_seal' ? (
                    <CleanroomVaultAnimation
                      videoSrc={scene.media.videoSrc}
                      isPaused={isPaused}
                      onPauseReached={onPauseReached}
                    />
                  ) : scene.media.fallbackAnimation === 'battery_sla_countdown' ? (
                    <BatterySlaCountdownAnimation
                      videoSrc={scene.media.videoSrc}
                      isPaused={isPaused}
                      onPauseReached={onPauseReached}
                    />
                  ) : scene.media.fallbackAnimation === 'environmental_breach_alarm' ? (
                    <EnvironmentalAlarmAnimation
                      videoSrc={scene.media.videoSrc}
                      isPaused={isPaused}
                      onPauseReached={onPauseReached}
                    />
                  ) : scene.media.fallbackAnimation === 'chemical_bypass_routing' ? (
                    <ChemicalBypassAnimation
                      videoSrc={scene.media.videoSrc}
                      isPaused={isPaused}
                      onPauseReached={onPauseReached}
                    />
                  ) : scene.media.fallbackAnimation === 'chemical_unloading_spill' || scene.media.fallbackAnimation === 'static_bonding_clamp' ? (
                    <ChemicalUnloadingAnimation
                      videoSrc={scene.media.videoSrc}
                      isPaused={isPaused}
                      onPauseReached={onPauseReached}
                    />
                  ) : scene.media.fallbackAnimation === 'chemical_segregation_matrix' ? (
                    <ChemicalSegregationAnimation
                      videoSrc={scene.media.videoSrc}
                      isPaused={isPaused}
                      onPauseReached={onPauseReached}
                    />
                  ) : scene.media.fallbackAnimation === 'chemical_deo_posting' ? (
                    <ChemicalDeoPostingAnimation
                      videoSrc={scene.media.videoSrc}
                      isPaused={isPaused}
                      onPauseReached={onPauseReached}
                    />
                  ) : scene.media.fallbackAnimation === 'supermarket_mh1_seal' ? (
                    <SupermarketMh1DeskAnimation
                      videoSrc={scene.media.videoSrc}
                      isPaused={isPaused}
                      onPauseReached={onPauseReached}
                    />
                  ) : scene.media.fallbackAnimation === 'supermarket_count_audit' || scene.media.fallbackAnimation === 'line_pressure_discrepancy' ? (
                    <SupermarketCountAuditAnimation
                      videoSrc={scene.media.videoSrc}
                      isPaused={isPaused}
                      onPauseReached={onPauseReached}
                    />
                  ) : scene.media.fallbackAnimation === 'gravity_flow_fifo' ? (
                    <GravityFlowRackAnimation
                      videoSrc={scene.media.videoSrc}
                      isPaused={isPaused}
                      onPauseReached={onPauseReached}
                    />
                  ) : scene.media.fallbackAnimation === 'supermarket_bin_kanban' || scene.media.fallbackAnimation === 'supermarket_classification_bins' ? (
                    <SupermarketKanbanAnimation
                      videoSrc={scene.media.videoSrc}
                      isPaused={isPaused}
                      onPauseReached={onPauseReached}
                    />
                  ) : scene.media.fallbackAnimation === 'iqc_lot_quarantine' || scene.media.fallbackAnimation === 'visual_cone_iqc_hold' ? (
                    <IqcLotQuarantineAnimation
                      videoSrc={scene.media.videoSrc}
                      isPaused={isPaused}
                      onPauseReached={onPauseReached}
                    />
                  ) : scene.media.fallbackAnimation === 'red_tag_jira_logging' || scene.media.fallbackAnimation === 'jira_status_graduation' ? (
                    <RedTagJiraAnimation
                      videoSrc={scene.media.videoSrc}
                      isPaused={isPaused}
                      onPauseReached={onPauseReached}
                    />
                  ) : scene.media.fallbackAnimation === 'quarantine_cage_segregation' ? (
                    <QuarantineSegregationAnimation
                      videoSrc={scene.media.videoSrc}
                      isPaused={isPaused}
                      onPauseReached={onPauseReached}
                    />
                  ) : scene.media.fallbackAnimation === 'disposition_filter_mrb' ? (
                    <DispositionFilterAnimation
                      videoSrc={scene.media.videoSrc}
                      isPaused={isPaused}
                      onPauseReached={onPauseReached}
                    />
                  ) : scene.media.fallbackAnimation === 'scrap_shredder_weighbridge' ? (
                    <ScrapShredderAnimation
                      videoSrc={scene.media.videoSrc}
                      isPaused={isPaused}
                      onPauseReached={onPauseReached}
                    />
                  ) : scene.media.fallbackAnimation === 'c2_mes_wh_task' || scene.media.fallbackAnimation === 'overpicking_prohibition_gate' ? (
                    <MesWhTaskAnimation
                      videoSrc={scene.media.videoSrc}
                      isPaused={isPaused}
                      onPauseReached={onPauseReached}
                    />
                  ) : scene.media.fallbackAnimation === 'c2_source_qr_reveal' || scene.media.fallbackAnimation === 'feeder_anti_duplication' || scene.media.fallbackAnimation === 'handheld_blind_quantity_unlock' ? (
                    <SourceLocationQrAnimation
                      videoSrc={scene.media.videoSrc}
                      isPaused={isPaused}
                      onPauseReached={onPauseReached}
                    />
                  ) : scene.media.fallbackAnimation === 'c2_trolley_marriage' ? (
                    <TrolleyMarriageAnimation
                      videoSrc={scene.media.videoSrc}
                      isPaused={isPaused}
                      onPauseReached={onPauseReached}
                    />
                  ) : scene.media.fallbackAnimation === 'c2_workstation_delivery' || scene.media.fallbackAnimation === 'five_step_picking_lifecycle' ? (
                    <WorkstationDeliveryAnimation
                      videoSrc={scene.media.videoSrc}
                      posterSrc={scene.media.posterSrc}
                      isPaused={isPaused}
                      onPauseReached={onPauseReached}
                    />
                  ) : scene.media.fallbackAnimation === 'c2_aced_trolley_issuance' || scene.media.fallbackAnimation === 'decanting_definition_hu' ? (
                    <AcedTrolleyIssuanceAnimation
                      videoSrc={scene.media.videoSrc}
                      posterSrc={scene.media.posterSrc}
                      isPaused={isPaused}
                      onPauseReached={onPauseReached}
                    />
                  ) : scene.media.fallbackAnimation === 'c2_twobin_ekanban' || scene.media.fallbackAnimation === 'flc_trolley_batch_calculation' ? (
                    <TwoBinEkanbanAnimation
                      videoSrc={scene.media.videoSrc}
                      isPaused={isPaused}
                      onPauseReached={onPauseReached}
                    />
                  ) : scene.media.fallbackAnimation === 'c2_trolley_capacity' || scene.media.fallbackAnimation === 'variant_wave_task_splitting' || scene.media.fallbackAnimation === 'whole_trolley_movement_gate' ? (
                    <TrolleyCapacityAnimation
                      videoSrc={scene.media.videoSrc}
                      isPaused={isPaused}
                      onPauseReached={onPauseReached}
                    />
                  ) : scene.media.fallbackAnimation === 'c2_wrong_part_return' || scene.media.fallbackAnimation === 'empty_trolley_reverse_loop' ? (
                    <MheWrongPartReturnAnimation
                      videoSrc={scene.media.videoSrc}
                      isPaused={isPaused}
                      onPauseReached={onPauseReached}
                    />
                  ) : scene.media.fallbackAnimation === 'c2_mezzanine_sequencing' ? (
                    <MezzanineSequencingAnimation
                      videoSrc={scene.media.videoSrc}
                      isPaused={isPaused}
                      onPauseReached={onPauseReached}
                    />
                  ) : scene.media.fallbackAnimation === 'c2_brake_motor_decanting' || scene.media.fallbackAnimation === 'supermarket_rack_replenishment_zl' ? (
                    <BrakeMotorDecantingAnimation
                      videoSrc={scene.media.videoSrc}
                      isPaused={isPaused}
                      onPauseReached={onPauseReached}
                    />
                  ) : scene.media.fallbackAnimation === 'c2_wrong_lane_rejection' || scene.media.fallbackAnimation === 'wrong_supermarket_lane_violation' ? (
                    <WrongLaneRejectionAnimation
                      videoSrc={scene.media.videoSrc}
                      isPaused={isPaused}
                      onPauseReached={onPauseReached}
                    />
                  ) : scene.media.fallbackAnimation === 'c2_lineside_ewm_close' ? (
                    <LineSideEwmCloseAnimation
                      videoSrc={scene.media.videoSrc}
                      isPaused={isPaused}
                      onPauseReached={onPauseReached}
                    />
                  ) : scene.media.fallbackAnimation === 'c2_indirect_no_reservation' || scene.media.fallbackAnimation === 'ppe_jira_ticket_mandate' ? (
                    <IndirectNoReservationAnimation
                      videoSrc={scene.media.videoSrc}
                      isPaused={isPaused}
                      onPauseReached={onPauseReached}
                    />
                  ) : scene.media.fallbackAnimation === 'c2_sap_ymb21_transfer' || scene.media.fallbackAnimation === 'reorder_point_pr_generation' ? (
                    <SapYmb21TransferAnimation
                      videoSrc={scene.media.videoSrc}
                      isPaused={isPaused}
                      onPauseReached={onPauseReached}
                    />
                  ) : scene.media.fallbackAnimation === 'c2_mrs_cost_center_audit' ? (
                    <MrsCostCenterAuditAnimation
                      videoSrc={scene.media.videoSrc}
                      isPaused={isPaused}
                      onPauseReached={onPauseReached}
                    />
                  ) : scene.media.fallbackAnimation === 'c2_indirect_handover_protocol' ? (
                    <IndirectHandoverProtocolAnimation
                      videoSrc={scene.media.videoSrc}
                      isPaused={isPaused}
                      onPauseReached={onPauseReached}
                    />
                  ) : scene.media.fallbackAnimation === 'c2_jira_budget_id' ? (
                    <JiraBudgetIdAnimation
                      videoSrc={scene.media.videoSrc}
                      isPaused={isPaused}
                      onPauseReached={onPauseReached}
                    />
                  ) : scene.media.fallbackAnimation === 'c2_pir_dual_approval' || scene.media.fallbackAnimation === 'pir_destination_routing_matrix' ? (
                    <PirDualApprovalAnimation
                      videoSrc={scene.media.videoSrc}
                      isPaused={isPaused}
                      onPauseReached={onPauseReached}
                    />
                  ) : scene.media.fallbackAnimation === 'c2_pir_cutoff_clock' || scene.media.fallbackAnimation === 'pir_ticket_closure_handover' ? (
                    <PirCutoffClockAnimation
                      videoSrc={scene.media.videoSrc}
                      isPaused={isPaused}
                      onPauseReached={onPauseReached}
                    />
                  ) : scene.media.fallbackAnimation === 'c2_sap_sto_compliance' || scene.media.fallbackAnimation === 'sap_billing_types_matrix' ? (
                    <SapStoGateExitAnimation
                      videoSrc={scene.media.videoSrc}
                      isPaused={isPaused}
                      onPauseReached={onPauseReached}
                    />
                  ) : scene.media.fallbackAnimation === 'c2_rtv_causer_gate' || scene.media.fallbackAnimation === 'reworked_parts_tightened_inspection' || scene.media.fallbackAnimation === 'recalled_material_reinspection' ? (
                    <RtvCauserGateAnimation
                      videoSrc={scene.media.videoSrc}
                      isPaused={isPaused}
                      onPauseReached={onPauseReached}
                    />
                  ) : scene.media.fallbackAnimation === 'c2_rtv_deviation' || scene.media.fallbackAnimation === 'supplier_sla_courier_debit' || scene.media.fallbackAnimation === 'use_as_is_sequence_lifecycle' ? (
                    <RtvDeviationAnimation
                      videoSrc={scene.media.videoSrc}
                      isPaused={isPaused}
                      onPauseReached={onPauseReached}
                    />
                  ) : scene.media.fallbackAnimation === 'c2_empty_bin_stacking' || scene.media.fallbackAnimation === 'line_side_gangway_choke' || scene.media.fallbackAnimation === 'empty_bin_truck_dashboard' ? (
                    <EmptyBinStackingAnimation
                      videoSrc={scene.media.videoSrc}
                      isPaused={isPaused}
                      onPauseReached={onPauseReached}
                    />
                  ) : scene.media.fallbackAnimation === 'c2_reverse_truck_loading' || scene.media.fallbackAnimation === 'scrap_approval_signoff_gate' || scene.media.fallbackAnimation === 'grandmaster_celebration_fireworks' ? (
                    <ReverseTruckLoadingAnimation
                      videoSrc={scene.media.videoSrc}
                      posterSrc={scene.media.posterSrc}
                      isPaused={isPaused}
                      onPauseReached={onPauseReached}
                    />
                  ) : (
                    <DockBlueprintAnimation
                      videoSrc={scene.media.videoSrc}
                      isPaused={isPaused}
                      onPauseReached={onPauseReached}
                    />
                  )}
      </div>
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
                        interaction={scene.interaction as SpotErrorInteraction}
                        lang={lang}
                        onComplete={handleSpotErrorComplete}
                      />
                    ) : scene.interaction.type === 'stop_go' ? (
                      <StopGoCard
                        interaction={scene.interaction as StopGoInteraction}
                        lang={lang}
                        onComplete={handleStopGoComplete}
                      />
                    ) : scene.interaction.type === 'count_stepper' ? (
                      <CountStepperCard
                        interaction={scene.interaction as CountStepperInteraction}
                        lang={lang}
                        onComplete={handleCountStepperComplete}
                      />
                    ) : (
                      <HotspotCard
                        interaction={scene.interaction as HotspotInteraction}
                        lang={lang}
                        onComplete={handleHotspotComplete}
                      />
                    )}
                  </div>

                  {/* Feedback Card for non-MCQ tasks (only when not handled internally by the component) */}
                  {phase === 'feedback' && scene.interaction.type !== 'mcq' && scene.interaction.type !== 'drag_drop' && scene.interaction.type !== 'sequence' && (
                    <div className="pt-2 shrink-0">
                      <FeedbackCard
                        scene={scene}
                        lang={lang}
                        isCorrect={isLastCorrect}
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

                  {/* Overlaid Aura Bot & Comment in original ratio */}
                  <div className="relative z-20 w-full p-3 sm:p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                    <MascotAura
                      pose={currentPose}
                      dialogue={currentDialogue}
                      lang={lang}
                      audioSrc={currentAudio}
                      variant="floating_overlay"
                      actionText="Back to Decision →"
                      onActionClick={() => setShowVideoModal(false)}
                    />
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <MilestoneGateway
            stage={stageData}
            stageIndex={currentStageIndex}
            totalStages={allStages.length}
            lang={lang}
            xp={xp}
            hearts={hearts}
            attempts={attempts}
            onSelectScene={handleSelectScene}
            onSelectStage={handleSelectStage}
            onViewScorecard={onViewScorecard ? () => onViewScorecard(getRunSummary()) : undefined}
            onViewCertificate={() => setShowCertificate(true)}
            onRestartFull={() => {
              handleSelectScene(0);
            }}
          />
        )}
      </main>

      {/* Dramatic Center Screen Alert when Answer is Wrong (Catches trainee's attention, then flies to bottom-left) */}
      <AnimatePresence>
        {showWrongCenterAlert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center bg-black/40 backdrop-blur-xs select-none"
          >
            <motion.div
              initial={{ scale: 0.2, opacity: 0, y: 40 }}
              animate={{
                scale: [0.2, 1.35, 1.1],
                opacity: 1,
                y: 0,
                x: [0, -10, 10, -8, 8, -4, 4, 0]
              }}
              exit={{
                scale: 0.35,
                opacity: 0,
                x: -360,
                y: 240,
                transition: { duration: 0.5, ease: 'easeInOut' }
              }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="flex flex-col items-center text-center p-6"
            >
              {/* Glowing red alert halo */}
              <div className="relative flex items-center justify-center">
                <div className="absolute -inset-8 rounded-full bg-rose-600/50 blur-3xl animate-ping opacity-75" />
                <div className="w-56 h-56 sm:w-64 sm:h-64 relative z-10 filter drop-shadow-[0_20px_35px_rgba(225,29,72,0.7)]">
                  <img
                    src={MASCOT_IMAGE_MAP.warning}
                    alt="AURA Alert"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* SOP Deviation Alert Pill */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="mt-4 px-6 py-2 rounded-2xl bg-rose-600 text-white font-black text-sm sm:text-base tracking-wider uppercase shadow-2xl border-2 border-rose-300 flex items-center gap-2"
              >
                <span className="text-xl">⚠️</span>
                <span>SOP Deviation Detected!</span>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
