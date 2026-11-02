import React, { useState, useEffect } from 'react';
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
import { playFeedbackTone } from '../engine/sound';
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
import { Layers } from 'lucide-react';

const allStages: StoryStage[] = [
  ...category1Stages,
  ...category2Stages
];

const getSceneTitle = (s: any, l: LanguageCode): string => {
  if (!s) return 'Scene';
  return s.title?.[l] || s.title?.en || s.name?.[l] || s.name?.en || 'Scene';
};

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
  const [phase, setPhase] = useState<'intro' | 'interaction_paused' | 'feedback' | 'gateway'>('intro');
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isLastCorrect, setIsLastCorrect] = useState<boolean>(false);

  const stageData = allStages[currentStageIndex] || allStages[0];
  const scene = stageData.scenes[currentSceneIndex] || stageData.scenes[0];

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

  // Called when video/animation finishes its initial driving/walking duration
  const handlePauseReached = () => {
    if (phase === 'intro') {
      setPhase('interaction_paused');
    }
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
    setIsLastCorrect(correct);
    playFeedbackTone(correct);

    if (correct) {
      setXp((prev) => prev + scene.rules.xp);
    } else {
      setHearts((prev) => Math.max(1, prev - 1));
    }

    setPhase('feedback');
  };

  // Continue story to next scene or gateway
  const handleContinueStory = () => {
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
    setCurrentSceneIndex(index);
    setPhase('intro');
    setSelectedOptionId(null);
    setIsLastCorrect(false);
  };

  const handleSelectStage = (stageIdx: number) => {
    setCurrentStageIndex(stageIdx);
    setCurrentSceneIndex(0);
    setPhase('intro');
    setSelectedOptionId(null);
    setIsLastCorrect(false);
  };

  const handleResetCurrentScene = () => {
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
  let currentAudio = mascotData?.intro?.audioSrc;

  if (phase === 'interaction_paused') {
    currentPose = 'thinking';
    currentDialogue = interactionData?.question || interactionData?.prompt || currentDialogue;
    currentAudio = interactionData?.audioSrc || currentAudio;
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

  return (
    <div className="min-h-screen bg-slate-100/90 text-slate-900 flex flex-col font-sans select-none antialiased">
      {/* 1. Master HUD */}
      <StoryHud
        stageTitle={stageData.stageTitle[lang] || stageData.stageTitle.en}
        sopDoc={stageData.sopDoc}
        lang={lang}
        onSelectLang={handleSetLang}
        xp={xp}
        hearts={hearts}
        onReset={handleResetCurrentScene}
        stages={allStages.map((s) => ({
          id: s.stageId,
          stageNumber: s.stageNumber,
          shortTitle: s.stageTitle[lang] || s.stageTitle.en
        }))}
        currentStageIndex={currentStageIndex}
        onSelectStage={handleSelectStage}
        onExitHome={onExitHome}
      />

      {/* 2. Scene Stepper Pill Bar */}
      <div className="bg-white/80 border-b border-slate-200/80 px-4 py-2">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-xs font-mono gap-3">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1 flex-nowrap shrink">
            <span className="font-bold text-slate-400 uppercase shrink-0">
              Stage {stageData.stageNumber} Timeline:
            </span>
            {stageData.scenes.map((s, idx) => {
              const isActive = idx === currentSceneIndex && phase !== 'gateway';
              const isPast = idx < currentSceneIndex;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => handleSelectScene(idx)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : isPast
                      ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                >
                  <span>Scene {idx + 1}</span>
                  <span className="hidden sm:inline">· {getSceneTitle(s, lang)}</span>
                </button>
              );
            })}
          </div>

          <span className="text-slate-400 hidden md:block shrink-0">
            Step {currentSceneIndex + 1} of {stageData.scenes.length}
          </span>
        </div>
      </div>

      {/* 3. Main Stage Canvas */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-3 sm:p-6 flex flex-col gap-4 sm:gap-6 justify-start">
        {phase !== 'gateway' ? (
          <>
            {/* Top Scene Visual Animation Canvas */}
            <div className="w-full">
              {scene.media.fallbackAnimation === 'truck_arrival_gate' ? (
                <TruckGateAnimation
                  videoSrc={scene.media.videoSrc}
                  posterSrc={scene.media.posterSrc}
                  isPaused={phase === 'interaction_paused' || phase === 'feedback'}
                  onPauseReached={handlePauseReached}
                />
              ) : scene.media.fallbackAnimation === 'gatehouse_cabin_desk' ? (
                <GatehouseCabinAnimation
                  videoSrc={scene.media.videoSrc}
                  isPaused={phase === 'interaction_paused' || phase === 'feedback'}
                  onPauseReached={handlePauseReached}
                />
              ) : scene.media.fallbackAnimation === 'sap_terminal_screen' ? (
                <SapTerminalAnimation
                  videoSrc={scene.media.videoSrc}
                  isPaused={phase === 'interaction_paused' || phase === 'feedback'}
                  onPauseReached={handlePauseReached}
                />
              ) : scene.media.fallbackAnimation === 'thermal_printer_tv' ? (
                <ThermalPrinterAnimation
                  videoSrc={scene.media.videoSrc}
                  isPaused={phase === 'interaction_paused' || phase === 'feedback'}
                  onPauseReached={handlePauseReached}
                />
              ) : scene.media.fallbackAnimation === 'dock_safety_chocks' ? (
                <DockSafetyAnimation
                  videoSrc={scene.media.videoSrc}
                  posterSrc={scene.media.posterSrc}
                  isPaused={phase === 'interaction_paused' || phase === 'feedback'}
                  onPauseReached={handlePauseReached}
                />
              ) : scene.media.fallbackAnimation === 'dock_blueprint_map' ? (
                <DockBlueprintAnimation
                  videoSrc={scene.media.videoSrc}
                  isPaused={phase === 'interaction_paused' || phase === 'feedback'}
                  onPauseReached={handlePauseReached}
                />
              ) : scene.media.fallbackAnimation === 'exit_gatehouse_barrier' ? (
                <ExitGatehouseAnimation
                  videoSrc={scene.media.videoSrc}
                  isPaused={phase === 'interaction_paused' || phase === 'feedback'}
                  onPauseReached={handlePauseReached}
                />
              ) : scene.media.fallbackAnimation === 'grn_sticker_staging' ? (
                <GrnStickerAnimation
                  videoSrc={scene.media.videoSrc}
                  isPaused={phase === 'interaction_paused' || phase === 'feedback'}
                  onPauseReached={handlePauseReached}
                />
              ) : scene.media.fallbackAnimation === 'iqc_sampling_transfer' || scene.media.fallbackAnimation === 'iqc_sample_inspection' ? (
                <IqcSamplingAnimation
                  videoSrc={scene.media.videoSrc}
                  posterSrc={scene.media.posterSrc}
                  isPaused={phase === 'interaction_paused' || phase === 'feedback'}
                  onPauseReached={handlePauseReached}
                />
              ) : scene.media.fallbackAnimation === 'iqc_cones_staging' || scene.media.fallbackAnimation === 'iqc_staging_cones' ? (
                <IqcConesAnimation
                  videoSrc={scene.media.videoSrc}
                  isPaused={phase === 'interaction_paused' || phase === 'feedback'}
                  onPauseReached={handlePauseReached}
                />
              ) : scene.media.fallbackAnimation === 'iqc_handover_sla_clock' || scene.media.fallbackAnimation === 'iqc_handover_sla' ? (
                <IqcHandoverSlaAnimation
                  videoSrc={scene.media.videoSrc}
                  isPaused={phase === 'interaction_paused' || phase === 'feedback'}
                  onPauseReached={handlePauseReached}
                />
              ) : scene.media.fallbackAnimation === 'iqc_disposition_workbench' ? (
                <IqcDispositionAnimation
                  videoSrc={scene.media.videoSrc}
                  isPaused={phase === 'interaction_paused' || phase === 'feedback'}
                  onPauseReached={handlePauseReached}
                />
              ) : scene.media.fallbackAnimation === 'hu_scan_initiation' ? (
                <HuScanAnimation
                  videoSrc={scene.media.videoSrc}
                  isPaused={phase === 'interaction_paused' || phase === 'feedback'}
                  onPauseReached={handlePauseReached}
                />
              ) : scene.media.fallbackAnimation === 'route_segregation_junction' ? (
                <RouteSegregationAnimation
                  videoSrc={scene.media.videoSrc}
                  isPaused={phase === 'interaction_paused' || phase === 'feedback'}
                  onPauseReached={handlePauseReached}
                />
              ) : scene.media.fallbackAnimation === 'bin_marriage_lift' || scene.media.fallbackAnimation === 'putaway_sequence_lifecycle' ? (
                <BinMarriageAnimation
                  videoSrc={scene.media.videoSrc}
                  posterSrc={scene.media.posterSrc}
                  isPaused={phase === 'interaction_paused' || phase === 'feedback'}
                  onPauseReached={handlePauseReached}
                />
              ) : scene.media.fallbackAnimation === 'omitted_scan_hazard' || scene.media.fallbackAnimation === 'bin_slotting_violation' ? (
                <OmittedScanHazardAnimation
                  videoSrc={scene.media.videoSrc}
                  isPaused={phase === 'interaction_paused' || phase === 'feedback'}
                  onPauseReached={handlePauseReached}
                />
              ) : scene.media.fallbackAnimation === 'battery_dock_auth' ? (
                <BatteryDockArrivalAnimation
                  videoSrc={scene.media.videoSrc}
                  posterSrc={scene.media.posterSrc}
                  isPaused={phase === 'interaction_paused' || phase === 'feedback'}
                  onPauseReached={handlePauseReached}
                />
              ) : scene.media.fallbackAnimation === 'cleanroom_vault_env' || scene.media.fallbackAnimation === 'battery_stacking_seal' ? (
                <CleanroomVaultAnimation
                  videoSrc={scene.media.videoSrc}
                  isPaused={phase === 'interaction_paused' || phase === 'feedback'}
                  onPauseReached={handlePauseReached}
                />
              ) : scene.media.fallbackAnimation === 'battery_sla_countdown' ? (
                <BatterySlaCountdownAnimation
                  videoSrc={scene.media.videoSrc}
                  isPaused={phase === 'interaction_paused' || phase === 'feedback'}
                  onPauseReached={handlePauseReached}
                />
              ) : scene.media.fallbackAnimation === 'environmental_breach_alarm' ? (
                <EnvironmentalAlarmAnimation
                  videoSrc={scene.media.videoSrc}
                  isPaused={phase === 'interaction_paused' || phase === 'feedback'}
                  onPauseReached={handlePauseReached}
                />
              ) : scene.media.fallbackAnimation === 'chemical_bypass_routing' ? (
                <ChemicalBypassAnimation
                  videoSrc={scene.media.videoSrc}
                  isPaused={phase === 'interaction_paused' || phase === 'feedback'}
                  onPauseReached={handlePauseReached}
                />
              ) : scene.media.fallbackAnimation === 'chemical_unloading_spill' || scene.media.fallbackAnimation === 'static_bonding_clamp' ? (
                <ChemicalUnloadingAnimation
                  videoSrc={scene.media.videoSrc}
                  isPaused={phase === 'interaction_paused' || phase === 'feedback'}
                  onPauseReached={handlePauseReached}
                />
              ) : scene.media.fallbackAnimation === 'chemical_segregation_matrix' ? (
                <ChemicalSegregationAnimation
                  videoSrc={scene.media.videoSrc}
                  isPaused={phase === 'interaction_paused' || phase === 'feedback'}
                  onPauseReached={handlePauseReached}
                />
              ) : scene.media.fallbackAnimation === 'chemical_deo_posting' ? (
                <ChemicalDeoPostingAnimation
                  videoSrc={scene.media.videoSrc}
                  isPaused={phase === 'interaction_paused' || phase === 'feedback'}
                  onPauseReached={handlePauseReached}
                />
              ) : scene.media.fallbackAnimation === 'supermarket_mh1_seal' ? (
                <SupermarketMh1DeskAnimation
                  videoSrc={scene.media.videoSrc}
                  isPaused={phase === 'interaction_paused' || phase === 'feedback'}
                  onPauseReached={handlePauseReached}
                />
              ) : scene.media.fallbackAnimation === 'supermarket_count_audit' || scene.media.fallbackAnimation === 'line_pressure_discrepancy' ? (
                <SupermarketCountAuditAnimation
                  videoSrc={scene.media.videoSrc}
                  isPaused={phase === 'interaction_paused' || phase === 'feedback'}
                  onPauseReached={handlePauseReached}
                />
              ) : scene.media.fallbackAnimation === 'gravity_flow_fifo' ? (
                <GravityFlowRackAnimation
                  videoSrc={scene.media.videoSrc}
                  isPaused={phase === 'interaction_paused' || phase === 'feedback'}
                  onPauseReached={handlePauseReached}
                />
              ) : scene.media.fallbackAnimation === 'supermarket_bin_kanban' || scene.media.fallbackAnimation === 'supermarket_classification_bins' ? (
                <SupermarketKanbanAnimation
                  videoSrc={scene.media.videoSrc}
                  isPaused={phase === 'interaction_paused' || phase === 'feedback'}
                  onPauseReached={handlePauseReached}
                />
              ) : scene.media.fallbackAnimation === 'iqc_lot_quarantine' || scene.media.fallbackAnimation === 'visual_cone_iqc_hold' ? (
                <IqcLotQuarantineAnimation
                  videoSrc={scene.media.videoSrc}
                  isPaused={phase === 'interaction_paused' || phase === 'feedback'}
                  onPauseReached={handlePauseReached}
                />
              ) : scene.media.fallbackAnimation === 'red_tag_jira_logging' || scene.media.fallbackAnimation === 'jira_status_graduation' ? (
                <RedTagJiraAnimation
                  videoSrc={scene.media.videoSrc}
                  isPaused={phase === 'interaction_paused' || phase === 'feedback'}
                  onPauseReached={handlePauseReached}
                />
              ) : scene.media.fallbackAnimation === 'quarantine_cage_segregation' ? (
                <QuarantineSegregationAnimation
                  videoSrc={scene.media.videoSrc}
                  isPaused={phase === 'interaction_paused' || phase === 'feedback'}
                  onPauseReached={handlePauseReached}
                />
              ) : scene.media.fallbackAnimation === 'disposition_filter_mrb' ? (
                <DispositionFilterAnimation
                  videoSrc={scene.media.videoSrc}
                  isPaused={phase === 'interaction_paused' || phase === 'feedback'}
                  onPauseReached={handlePauseReached}
                />
              ) : scene.media.fallbackAnimation === 'scrap_shredder_weighbridge' ? (
                <ScrapShredderAnimation
                  videoSrc={scene.media.videoSrc}
                  isPaused={phase === 'interaction_paused' || phase === 'feedback'}
                  onPauseReached={handlePauseReached}
                />
              ) : scene.media.fallbackAnimation === 'c2_mes_wh_task' || scene.media.fallbackAnimation === 'overpicking_prohibition_gate' ? (
                <MesWhTaskAnimation
                  videoSrc={scene.media.videoSrc}
                  isPaused={phase === 'interaction_paused' || phase === 'feedback'}
                  onPauseReached={handlePauseReached}
                />
              ) : scene.media.fallbackAnimation === 'c2_source_qr_reveal' || scene.media.fallbackAnimation === 'feeder_anti_duplication' || scene.media.fallbackAnimation === 'handheld_blind_quantity_unlock' ? (
                <SourceLocationQrAnimation
                  videoSrc={scene.media.videoSrc}
                  isPaused={phase === 'interaction_paused' || phase === 'feedback'}
                  onPauseReached={handlePauseReached}
                />
              ) : scene.media.fallbackAnimation === 'c2_trolley_marriage' ? (
                <TrolleyMarriageAnimation
                  videoSrc={scene.media.videoSrc}
                  isPaused={phase === 'interaction_paused' || phase === 'feedback'}
                  onPauseReached={handlePauseReached}
                />
              ) : scene.media.fallbackAnimation === 'c2_workstation_delivery' || scene.media.fallbackAnimation === 'five_step_picking_lifecycle' ? (
                <WorkstationDeliveryAnimation
                  videoSrc={scene.media.videoSrc}
                  posterSrc={scene.media.posterSrc}
                  isPaused={phase === 'interaction_paused' || phase === 'feedback'}
                  onPauseReached={handlePauseReached}
                />
              ) : scene.media.fallbackAnimation === 'c2_aced_trolley_issuance' || scene.media.fallbackAnimation === 'decanting_definition_hu' ? (
                <AcedTrolleyIssuanceAnimation
                  videoSrc={scene.media.videoSrc}
                  posterSrc={scene.media.posterSrc}
                  isPaused={phase === 'interaction_paused' || phase === 'feedback'}
                  onPauseReached={handlePauseReached}
                />
              ) : scene.media.fallbackAnimation === 'c2_twobin_ekanban' || scene.media.fallbackAnimation === 'flc_trolley_batch_calculation' ? (
                <TwoBinEkanbanAnimation
                  videoSrc={scene.media.videoSrc}
                  isPaused={phase === 'interaction_paused' || phase === 'feedback'}
                  onPauseReached={handlePauseReached}
                />
              ) : scene.media.fallbackAnimation === 'c2_trolley_capacity' || scene.media.fallbackAnimation === 'variant_wave_task_splitting' || scene.media.fallbackAnimation === 'whole_trolley_movement_gate' ? (
                <TrolleyCapacityAnimation
                  videoSrc={scene.media.videoSrc}
                  isPaused={phase === 'interaction_paused' || phase === 'feedback'}
                  onPauseReached={handlePauseReached}
                />
              ) : scene.media.fallbackAnimation === 'c2_wrong_part_return' || scene.media.fallbackAnimation === 'empty_trolley_reverse_loop' ? (
                <MheWrongPartReturnAnimation
                  videoSrc={scene.media.videoSrc}
                  isPaused={phase === 'interaction_paused' || phase === 'feedback'}
                  onPauseReached={handlePauseReached}
                />
              ) : scene.media.fallbackAnimation === 'c2_mezzanine_sequencing' ? (
                <MezzanineSequencingAnimation
                  videoSrc={scene.media.videoSrc}
                  isPaused={phase === 'interaction_paused' || phase === 'feedback'}
                  onPauseReached={handlePauseReached}
                />
              ) : scene.media.fallbackAnimation === 'c2_brake_motor_decanting' || scene.media.fallbackAnimation === 'supermarket_rack_replenishment_zl' ? (
                <BrakeMotorDecantingAnimation
                  videoSrc={scene.media.videoSrc}
                  isPaused={phase === 'interaction_paused' || phase === 'feedback'}
                  onPauseReached={handlePauseReached}
                />
              ) : scene.media.fallbackAnimation === 'c2_wrong_lane_rejection' || scene.media.fallbackAnimation === 'wrong_supermarket_lane_violation' ? (
                <WrongLaneRejectionAnimation
                  videoSrc={scene.media.videoSrc}
                  isPaused={phase === 'interaction_paused' || phase === 'feedback'}
                  onPauseReached={handlePauseReached}
                />
              ) : scene.media.fallbackAnimation === 'c2_lineside_ewm_close' ? (
                <LineSideEwmCloseAnimation
                  videoSrc={scene.media.videoSrc}
                  isPaused={phase === 'interaction_paused' || phase === 'feedback'}
                  onPauseReached={handlePauseReached}
                />
              ) : scene.media.fallbackAnimation === 'c2_indirect_no_reservation' || scene.media.fallbackAnimation === 'ppe_jira_ticket_mandate' ? (
                <IndirectNoReservationAnimation
                  videoSrc={scene.media.videoSrc}
                  isPaused={phase === 'interaction_paused' || phase === 'feedback'}
                  onPauseReached={handlePauseReached}
                />
              ) : scene.media.fallbackAnimation === 'c2_sap_ymb21_transfer' || scene.media.fallbackAnimation === 'reorder_point_pr_generation' ? (
                <SapYmb21TransferAnimation
                  videoSrc={scene.media.videoSrc}
                  isPaused={phase === 'interaction_paused' || phase === 'feedback'}
                  onPauseReached={handlePauseReached}
                />
              ) : scene.media.fallbackAnimation === 'c2_mrs_cost_center_audit' ? (
                <MrsCostCenterAuditAnimation
                  videoSrc={scene.media.videoSrc}
                  isPaused={phase === 'interaction_paused' || phase === 'feedback'}
                  onPauseReached={handlePauseReached}
                />
              ) : scene.media.fallbackAnimation === 'c2_indirect_handover_protocol' ? (
                <IndirectHandoverProtocolAnimation
                  videoSrc={scene.media.videoSrc}
                  isPaused={phase === 'interaction_paused' || phase === 'feedback'}
                  onPauseReached={handlePauseReached}
                />
              ) : scene.media.fallbackAnimation === 'c2_jira_budget_id' ? (
                <JiraBudgetIdAnimation
                  videoSrc={scene.media.videoSrc}
                  isPaused={phase === 'interaction_paused' || phase === 'feedback'}
                  onPauseReached={handlePauseReached}
                />
              ) : scene.media.fallbackAnimation === 'c2_pir_dual_approval' || scene.media.fallbackAnimation === 'pir_destination_routing_matrix' ? (
                <PirDualApprovalAnimation
                  videoSrc={scene.media.videoSrc}
                  isPaused={phase === 'interaction_paused' || phase === 'feedback'}
                  onPauseReached={handlePauseReached}
                />
              ) : scene.media.fallbackAnimation === 'c2_pir_cutoff_clock' || scene.media.fallbackAnimation === 'pir_ticket_closure_handover' ? (
                <PirCutoffClockAnimation
                  videoSrc={scene.media.videoSrc}
                  isPaused={phase === 'interaction_paused' || phase === 'feedback'}
                  onPauseReached={handlePauseReached}
                />
              ) : scene.media.fallbackAnimation === 'c2_sap_sto_compliance' || scene.media.fallbackAnimation === 'sap_billing_types_matrix' ? (
                <SapStoGateExitAnimation
                  videoSrc={scene.media.videoSrc}
                  isPaused={phase === 'interaction_paused' || phase === 'feedback'}
                  onPauseReached={handlePauseReached}
                />
              ) : scene.media.fallbackAnimation === 'c2_rtv_causer_gate' || scene.media.fallbackAnimation === 'reworked_parts_tightened_inspection' || scene.media.fallbackAnimation === 'recalled_material_reinspection' ? (
                <RtvCauserGateAnimation
                  videoSrc={scene.media.videoSrc}
                  isPaused={phase === 'interaction_paused' || phase === 'feedback'}
                  onPauseReached={handlePauseReached}
                />
              ) : scene.media.fallbackAnimation === 'c2_rtv_deviation' || scene.media.fallbackAnimation === 'supplier_sla_courier_debit' || scene.media.fallbackAnimation === 'use_as_is_sequence_lifecycle' ? (
                <RtvDeviationAnimation
                  videoSrc={scene.media.videoSrc}
                  isPaused={phase === 'interaction_paused' || phase === 'feedback'}
                  onPauseReached={handlePauseReached}
                />
              ) : scene.media.fallbackAnimation === 'c2_empty_bin_stacking' || scene.media.fallbackAnimation === 'line_side_gangway_choke' || scene.media.fallbackAnimation === 'empty_bin_truck_dashboard' ? (
                <EmptyBinStackingAnimation
                  videoSrc={scene.media.videoSrc}
                  isPaused={phase === 'interaction_paused' || phase === 'feedback'}
                  onPauseReached={handlePauseReached}
                />
              ) : scene.media.fallbackAnimation === 'c2_reverse_truck_loading' || scene.media.fallbackAnimation === 'scrap_approval_signoff_gate' || scene.media.fallbackAnimation === 'grandmaster_celebration_fireworks' ? (
                <ReverseTruckLoadingAnimation
                  videoSrc={scene.media.videoSrc}
                  posterSrc={scene.media.posterSrc}
                  isPaused={phase === 'interaction_paused' || phase === 'feedback'}
                  onPauseReached={handlePauseReached}
                />
              ) : (
                <DockBlueprintAnimation
                  videoSrc={scene.media.videoSrc}
                  isPaused={phase === 'interaction_paused' || phase === 'feedback'}
                  onPauseReached={handlePauseReached}
                />
              )}
            </div>

            {/* Bottom 2-Column Workstation */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start">
              {/* Left Column (5 Cols): Animated AURA Mascot Dialogue */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center">
                <MascotAura
                  pose={currentPose}
                  dialogue={currentDialogue}
                  lang={lang}
                  audioSrc={currentAudio}
                />
              </div>

              {/* Right Column (7 Cols): Interaction or Feedback Card */}
              <div className="lg:col-span-7">
                {phase === 'intro' && (
                  <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-6 shadow-sm flex flex-col items-center justify-center text-center gap-3 min-h-[220px]">
                    <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 animate-pulse">
                      <Layers className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-base font-bold text-slate-800">
                        {getSceneTitle(scene, lang)}...
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-500 max-w-md">
                        Observing scene events. The story will automatically pause for an operational SOP decision.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPhase('interaction_paused')}
                      className="mt-2 text-xs font-mono font-bold text-blue-600 hover:text-blue-800 underline cursor-pointer"
                    >
                      Skip to Decision Point →
                    </button>
                  </div>
                )}

                {phase === 'interaction_paused' && (
                  <>
                    {scene.interaction.type === 'mcq' ? (
                      <QuestionCard
                        interaction={scene.interaction as McqInteraction}
                        lang={lang}
                        selectedOptionId={selectedOptionId}
                        onSelectOption={handleSelectMcqOption}
                      />
                    ) : scene.interaction.type === 'drag_drop' ? (
                      <DragDropCard
                        interaction={scene.interaction as DragDropInteraction}
                        lang={lang}
                        onComplete={handleDragDropComplete}
                      />
                    ) : scene.interaction.type === 'sequence' ? (
                      <SequenceCard
                        interaction={scene.interaction as SequenceInteraction}
                        lang={lang}
                        onComplete={handleSequenceComplete}
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
                  </>
                )}

                {phase === 'feedback' && (
                  <FeedbackCard
                    scene={scene}
                    lang={lang}
                    isCorrect={isLastCorrect}
                    selectedOptionId={selectedOptionId}
                    onContinue={handleContinueStory}
                  />
                )}
              </div>
            </div>
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

      {/* Footer Dual Branding */}
      <footer className="shrink-0 py-3 text-center text-xs font-mono text-slate-400">
        Ather Energy AURIC Plant M002 · Story Engine Powered by Tetrahedron
      </footer>
    </div>
  );
};
