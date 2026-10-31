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
import { RefreshCcw, Layers, Trophy, Award, CheckCheck, ArrowRight, ArrowLeft } from 'lucide-react';

const allStages: StoryStage[] = [
  ...category1Stages,
  ...category2Stages
];

const getSceneTitle = (s: any, l: LanguageCode): string => {
  if (!s) return 'Scene';
  return s.title?.[l] || s.title?.en || s.name?.[l] || s.name?.en || 'Scene';
};

export const StoryStagePlayer: React.FC = () => {
  const [lang, setLang] = useState<LanguageCode>(() => {
    try {
      return (localStorage.getItem('ather_lang') as LanguageCode) || 'en';
    } catch {
      return 'en';
    }
  });
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('ather_stage_idx');
      return saved !== null ? Math.min(Math.max(0, Number(saved)), allStages.length - 1) : 0;
    } catch {
      return 0;
    }
  });
  const [currentSceneIndex, setCurrentSceneIndex] = useState<number>(() => {
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

  if (showCertificate) {
    const isFullJourney = currentStageIndex >= 11;
    const cat1TotalScenes = category1Stages.reduce((acc, s) => acc + s.scenes.length, 0);
    const allTotalScenes = allStages.reduce((acc, s) => acc + s.scenes.length, 0);
    const summary: RunSummary = {
      packId: isFullJourney ? 'ather-all-modules' : 'ather-category-1',
      packTitle: {
        en: isFullJourney ? 'All 12 Modules Grandmaster Certification' : 'Category 1: Inbound & Storage Certification',
        hi: isFullJourney ? 'सभी 12 मॉड्यूल ग्रैंडमास्टर प्रमाणन' : 'श्रेणी 1: आवक और भंडारण प्रमाणन',
        mr: isFullJourney ? 'सर्व 12 मॉड्यूल्स ग्रँडमास्टर प्रमाणपत्र' : 'कॅटेगरी 1: आवक व साठवणूक प्रमाणपत्र'
      },
      mode: 'guided',
      stars: 3,
      xpGained: xp,
      accuracyPct: 98,
      totalSteps: isFullJourney ? allTotalScenes : cat1TotalScenes,
      correctSteps: Math.max(attempts, isFullJourney ? allTotalScenes - 2 : cat1TotalScenes - 2),
      safetyPassed: hearts > 0,
      lost: false,
      badgesEarned: ['safe', 'perf', 'cert'],
      timestamp: new Date().toISOString()
    };

    const profile: UserProfile = {
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
        onBack={() => setShowCertificate(false)}
        onNavigateHome={() => {
          setShowCertificate(false);
          handleSelectStage(0);
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
        onSelectLang={setLang}
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
      />

      {/* 2. Scene Stepper Pill Bar */}
      <div className="bg-white/80 border-b border-slate-200/80 px-4 py-2">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-400 uppercase">
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
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
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

          <span className="text-slate-400 hidden md:block">
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
                  isPaused={phase === 'interaction_paused' || phase === 'feedback'}
                  onPauseReached={handlePauseReached}
                />
              ) : scene.media.fallbackAnimation === 'c2_aced_trolley_issuance' || scene.media.fallbackAnimation === 'decanting_definition_hu' ? (
                <AcedTrolleyIssuanceAnimation
                  videoSrc={scene.media.videoSrc}
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
                    onContinue={handleContinueStory}
                  />
                )}
              </div>
            </div>
          </>
        ) : currentStageIndex === 0 ? (
          /* Module 1 Full Completion & Grand Graduation Screen */
          <div className="my-auto bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-2xl max-w-3xl mx-auto text-center space-y-6">
            {/* Trophy & Badge Award */}
            <div className="relative inline-block">
              <div className="w-20 h-20 rounded-3xl bg-amber-50 border-2 border-amber-300 text-amber-500 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/10 animate-bounce">
                <Trophy className="w-10 h-10" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white rounded-full p-1.5 shadow-md">
                <CheckCheck className="w-4 h-4" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-extrabold text-amber-700 bg-amber-50 px-3.5 py-1.5 rounded-full border border-amber-300 shadow-xs">
                <Award className="w-4 h-4 text-amber-600" />
                <span>BADGE UNLOCKED: GATE KEEPER</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Module 1 Completed!
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
                You have mastered all <strong>{stageData.scenes.length} Standard Operating Procedure steps</strong> of Gate &amp; Dock Operations at Ather AURIC Plant M002.
              </p>
            </div>

            {/* Performance Metric Strip */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200/90 text-center font-mono">
              <div className="space-y-0.5">
                <div className="text-[11px] text-slate-400 uppercase">XP Earned</div>
                <div className="text-lg sm:text-2xl font-black text-emerald-600">+{xp}</div>
              </div>
              <div className="space-y-0.5 border-x border-slate-200">
                <div className="text-[11px] text-slate-400 uppercase">Total Decisions</div>
                <div className="text-lg sm:text-2xl font-black text-slate-800">{attempts}</div>
              </div>
              <div className="space-y-0.5">
                <div className="text-[11px] text-slate-400 uppercase">Hearts Left</div>
                <div className="text-base sm:text-xl font-black text-rose-500">{'❤️'.repeat(hearts)}</div>
              </div>
            </div>

            {/* Milestone Tracker */}
            <div className="text-left bg-slate-50/80 rounded-2xl p-4 border border-slate-200 space-y-2">
              <div className="text-xs font-mono font-bold text-slate-500 uppercase flex items-center justify-between">
                <span>Completed Module 1 Milestones ({stageData.scenes.length}/{stageData.scenes.length}):</span>
                <span className="text-emerald-600 font-extrabold">100% SOP COMPLIANT</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {stageData.scenes.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => handleSelectScene(i)}
                    className="flex items-center gap-2 p-2 rounded-xl bg-white border border-slate-200 hover:border-blue-400 text-slate-700 hover:text-blue-700 transition-colors text-left cursor-pointer"
                  >
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-mono font-bold text-[10px] flex items-center justify-center shrink-0">
                      ✓
                    </span>
                    <span className="truncate font-medium">
                      Sc {i + 1}: {getSceneTitle(s, lang)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Next Chapter & Replay Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => handleSelectScene(0)}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <RefreshCcw className="w-4 h-4" />
                <span>Replay Module 1 from Start</span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectStage(1)}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl font-extrabold text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Module 2 (Receiving &amp; IQC)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : currentStageIndex === 1 ? (
          /* Module 2 Graduation Screen */
          <div className="my-auto bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-2xl max-w-3xl mx-auto text-center space-y-6">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/25">
              <Trophy className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-extrabold text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-300 shadow-xs">
                <Award className="w-4 h-4 text-emerald-600" />
                <span>BADGE UNLOCKED: QUALITY SENTINEL</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Module 2 Completed!
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
                You have mastered all <strong>{stageData.scenes.length} Standard Operating Procedure steps</strong> of Receiving &amp; IQC Clearance under SOP <code>02_C1_S2</code> at Ather AURIC Plant M002.
              </p>
            </div>

            {/* Performance Metric Strip */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200/90 text-center font-mono">
              <div className="space-y-0.5">
                <div className="text-[11px] text-slate-400 uppercase">XP Earned</div>
                <div className="text-lg sm:text-2xl font-black text-emerald-600">+{xp}</div>
              </div>
              <div className="space-y-0.5 border-x border-slate-200">
                <div className="text-[11px] text-slate-400 uppercase">Total Decisions</div>
                <div className="text-lg sm:text-2xl font-black text-slate-800">{attempts}</div>
              </div>
              <div className="space-y-0.5">
                <div className="text-[11px] text-slate-400 uppercase">Hearts Left</div>
                <div className="text-base sm:text-xl font-black text-rose-500">{'❤️'.repeat(hearts)}</div>
              </div>
            </div>

            {/* Milestone Tracker */}
            <div className="text-left bg-slate-50/80 rounded-2xl p-4 border border-slate-200 space-y-2">
              <div className="text-xs font-mono font-bold text-slate-500 uppercase flex items-center justify-between">
                <span>Completed Module 2 Milestones ({stageData.scenes.length}/{stageData.scenes.length}):</span>
                <span className="text-emerald-600 font-extrabold">100% SOP COMPLIANT</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {stageData.scenes.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => handleSelectScene(i)}
                    className="flex items-center gap-2 p-2 rounded-xl bg-white border border-slate-200 hover:border-emerald-400 text-slate-700 hover:text-emerald-700 transition-colors text-left cursor-pointer"
                  >
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-mono font-bold text-[10px] flex items-center justify-center shrink-0">
                      ✓
                    </span>
                    <span className="truncate font-medium">
                      Sc {i + 1}: {getSceneTitle(s, lang)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Next Chapter & Replay Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => handleSelectScene(0)}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <RefreshCcw className="w-4 h-4" />
                <span>Replay Module 2 from Start</span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectStage(0)}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Review Module 1 (Gate &amp; Dock)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  handleSelectStage(2);
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl font-extrabold text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Module 3 (Vehicle &amp; Battery Parts Put-Away)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : currentStageIndex === 2 ? (
          /* Module 3 Graduation Screen */
          <div className="my-auto bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-2xl max-w-3xl mx-auto text-center space-y-6">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-500 to-orange-400 text-white flex items-center justify-center mx-auto shadow-xl shadow-amber-500/25">
              <Trophy className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-extrabold text-amber-800 bg-amber-50 px-3.5 py-1.5 rounded-full border border-amber-300 shadow-xs">
                <Award className="w-4 h-4 text-amber-600" />
                <span>BADGE UNLOCKED: HIGH-RISE STOWAGE MASTER</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Module 3 Completed!
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
                You have mastered all <strong>{stageData.scenes.length} Standard Operating Procedure steps</strong> of Vehicle &amp; Battery Parts Put-Away under SOP <code>03_C1_S3</code> at Ather AURIC Plant M002.
              </p>
            </div>

            {/* Performance Metric Strip */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200/90 text-center font-mono">
              <div className="space-y-0.5">
                <div className="text-[11px] text-slate-400 uppercase">XP Earned</div>
                <div className="text-lg sm:text-2xl font-black text-emerald-600">+{xp}</div>
              </div>
              <div className="space-y-0.5 border-x border-slate-200">
                <div className="text-[11px] text-slate-400 uppercase">Total Decisions</div>
                <div className="text-lg sm:text-2xl font-black text-slate-800">{attempts}</div>
              </div>
              <div className="space-y-0.5">
                <div className="text-[11px] text-slate-400 uppercase">Hearts Left</div>
                <div className="text-base sm:text-xl font-black text-rose-500">{'❤️'.repeat(hearts)}</div>
              </div>
            </div>

            {/* Milestone Tracker */}
            <div className="text-left bg-slate-50/80 rounded-2xl p-4 border border-slate-200 space-y-2">
              <div className="text-xs font-mono font-bold text-slate-500 uppercase flex items-center justify-between">
                <span>Completed Module 3 Milestones ({stageData.scenes.length}/{stageData.scenes.length}):</span>
                <span className="text-emerald-600 font-extrabold">100% SOP COMPLIANT</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {stageData.scenes.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => handleSelectScene(i)}
                    className="flex items-center gap-2 p-2 rounded-xl bg-white border border-slate-200 hover:border-amber-400 text-slate-700 hover:text-amber-700 transition-colors text-left cursor-pointer"
                  >
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-mono font-bold text-[10px] flex items-center justify-center shrink-0">
                      ✓
                    </span>
                    <span className="truncate font-medium">
                      Sc {i + 1}: {getSceneTitle(s, lang)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Next Chapter & Replay Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => handleSelectScene(0)}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <RefreshCcw className="w-4 h-4" />
                <span>Replay Module 3 from Start</span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectStage(1)}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Review Module 2 (Receiving &amp; IQC)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  handleSelectStage(3);
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl font-extrabold text-xs bg-amber-600 hover:bg-amber-700 text-white shadow-lg shadow-amber-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Module 4 (Specialized Battery Cell Put-Away)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : currentStageIndex === 3 ? (
          /* Module 4 Graduation Screen */
          <div className="my-auto bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-2xl max-w-3xl mx-auto text-center space-y-6">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white flex items-center justify-center mx-auto shadow-xl shadow-cyan-500/25">
              <Trophy className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-extrabold text-cyan-800 bg-cyan-50 px-3.5 py-1.5 rounded-full border border-cyan-300 shadow-xs">
                <Award className="w-4 h-4 text-cyan-600" />
                <span>BADGE UNLOCKED: CELL VAULT GUARDIAN</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Module 4 Completed!
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
                You have mastered all <strong>{stageData.scenes.length} Standard Operating Procedure steps</strong> of Specialized Battery Cell Put-Away under SOP <code>04_C1_S3</code> at Ather AURIC Plant M002.
              </p>
            </div>

            {/* Performance Metric Strip */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200/90 text-center font-mono">
              <div className="space-y-0.5">
                <div className="text-[11px] text-slate-400 uppercase">XP Earned</div>
                <div className="text-lg sm:text-2xl font-black text-emerald-600">+{xp}</div>
              </div>
              <div className="space-y-0.5 border-x border-slate-200">
                <div className="text-[11px] text-slate-400 uppercase">Total Decisions</div>
                <div className="text-lg sm:text-2xl font-black text-slate-800">{attempts}</div>
              </div>
              <div className="space-y-0.5">
                <div className="text-[11px] text-slate-400 uppercase">Hearts Left</div>
                <div className="text-base sm:text-xl font-black text-rose-500">{'❤️'.repeat(hearts)}</div>
              </div>
            </div>

            {/* Milestone Tracker */}
            <div className="text-left bg-slate-50/80 rounded-2xl p-4 border border-slate-200 space-y-2">
              <div className="text-xs font-mono font-bold text-slate-500 uppercase flex items-center justify-between">
                <span>Completed Module 4 Milestones ({stageData.scenes.length}/{stageData.scenes.length}):</span>
                <span className="text-emerald-600 font-extrabold">100% SOP COMPLIANT</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {stageData.scenes.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => handleSelectScene(i)}
                    className="flex items-center gap-2 p-2 rounded-xl bg-white border border-slate-200 hover:border-cyan-400 text-slate-700 hover:text-cyan-700 transition-colors text-left cursor-pointer"
                  >
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-mono font-bold text-[10px] flex items-center justify-center shrink-0">
                      ✓
                    </span>
                    <span className="truncate font-medium">
                      Sc {i + 1}: {getSceneTitle(s, lang)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Next Chapter & Replay Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => handleSelectScene(0)}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <RefreshCcw className="w-4 h-4" />
                <span>Replay Module 4 from Start</span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectStage(2)}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Review Module 3 (Vehicle &amp; Battery Parts)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  handleSelectStage(4);
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl font-extrabold text-xs bg-cyan-600 hover:bg-cyan-700 text-white shadow-lg shadow-cyan-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Module 5 (Hazardous Chemicals &amp; Thinners)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : currentStageIndex === 4 ? (
          /* Module 5 Graduation Screen */
          <div className="my-auto bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-2xl max-w-3xl mx-auto text-center space-y-6">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-500 to-rose-600 text-white flex items-center justify-center mx-auto shadow-xl shadow-amber-500/25">
              <Trophy className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-extrabold text-amber-800 bg-amber-50 px-3.5 py-1.5 rounded-full border border-amber-300 shadow-xs">
                <Award className="w-4 h-4 text-amber-600" />
                <span>BADGE UNLOCKED: HAZMAT CUSTODIAN</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Module 5 Completed!
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
                You have mastered all <strong>{stageData.scenes.length} Standard Operating Procedure steps</strong> of Hazardous Chemicals &amp; Thinners Put-Away under SOP <code>05_C1_S3</code> at Ather AURIC Plant M002.
              </p>
            </div>

            {/* Performance Metric Strip */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200/90 text-center font-mono">
              <div className="space-y-0.5">
                <div className="text-[11px] text-slate-400 uppercase">XP Earned</div>
                <div className="text-lg sm:text-2xl font-black text-emerald-600">+{xp}</div>
              </div>
              <div className="space-y-0.5 border-x border-slate-200">
                <div className="text-[11px] text-slate-400 uppercase">Total Decisions</div>
                <div className="text-lg sm:text-2xl font-black text-slate-800">{attempts}</div>
              </div>
              <div className="space-y-0.5">
                <div className="text-[11px] text-slate-400 uppercase">Hearts Left</div>
                <div className="text-base sm:text-xl font-black text-rose-500">{'❤️'.repeat(hearts)}</div>
              </div>
            </div>

            {/* Milestone Tracker */}
            <div className="text-left bg-slate-50/80 rounded-2xl p-4 border border-slate-200 space-y-2">
              <div className="text-xs font-mono font-bold text-slate-500 uppercase flex items-center justify-between">
                <span>Completed Module 5 Milestones ({stageData.scenes.length}/{stageData.scenes.length}):</span>
                <span className="text-emerald-600 font-extrabold">100% SOP COMPLIANT</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {stageData.scenes.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => handleSelectScene(i)}
                    className="flex items-center gap-2 p-2 rounded-xl bg-white border border-slate-200 hover:border-amber-400 text-slate-700 hover:text-amber-700 transition-colors text-left cursor-pointer"
                  >
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-mono font-bold text-[10px] flex items-center justify-center shrink-0">
                      ✓
                    </span>
                    <span className="truncate font-medium">
                      Sc {i + 1}: {getSceneTitle(s, lang)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Next Chapter & Replay Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => handleSelectScene(0)}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <RefreshCcw className="w-4 h-4" />
                <span>Replay Module 5 from Start</span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectStage(3)}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Review Module 4 (Battery Cells)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  handleSelectStage(5);
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl font-extrabold text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Module 6 (Supermarket Put-Away)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : currentStageIndex === 5 ? (
          /* Module 6 Graduation Screen */
          <div className="my-auto bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-2xl max-w-3xl mx-auto text-center space-y-6">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/25">
              <Trophy className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-extrabold text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-300 shadow-xs">
                <Award className="w-4 h-4 text-emerald-600" />
                <span>BADGE UNLOCKED: SUPERMARKET REPLENISHER</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Module 6 Completed!
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
                You have mastered all <strong>{stageData.scenes.length} Standard Operating Procedure steps</strong> of Supermarket C-Class Parts Put-Away under SOP <code>06_C1_S3</code> at Ather AURIC Plant M002.
              </p>
            </div>

            {/* Performance Metric Strip */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200/90 text-center font-mono">
              <div className="space-y-0.5">
                <div className="text-[11px] text-slate-400 uppercase">XP Earned</div>
                <div className="text-lg sm:text-2xl font-black text-emerald-600">+{xp}</div>
              </div>
              <div className="space-y-0.5 border-x border-slate-200">
                <div className="text-[11px] text-slate-400 uppercase">Total Decisions</div>
                <div className="text-lg sm:text-2xl font-black text-slate-800">{attempts}</div>
              </div>
              <div className="space-y-0.5">
                <div className="text-[11px] text-slate-400 uppercase">Hearts Left</div>
                <div className="text-base sm:text-xl font-black text-rose-500">{'❤️'.repeat(hearts)}</div>
              </div>
            </div>

            {/* Milestone Tracker */}
            <div className="text-left bg-slate-50/80 rounded-2xl p-4 border border-slate-200 space-y-2">
              <div className="text-xs font-mono font-bold text-slate-500 uppercase flex items-center justify-between">
                <span>Completed Module 6 Milestones ({stageData.scenes.length}/{stageData.scenes.length}):</span>
                <span className="text-emerald-600 font-extrabold">100% SOP COMPLIANT</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {stageData.scenes.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => handleSelectScene(i)}
                    className="flex items-center gap-2 p-2 rounded-xl bg-white border border-slate-200 hover:border-emerald-400 text-slate-700 hover:text-emerald-700 transition-colors text-left cursor-pointer"
                  >
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-mono font-bold text-[10px] flex items-center justify-center shrink-0">
                      ✓
                    </span>
                    <span className="truncate font-medium">
                      Sc {i + 1}: {getSceneTitle(s, lang)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Next Chapter & Replay Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => handleSelectScene(0)}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <RefreshCcw className="w-4 h-4" />
                <span>Replay Module 6 from Start</span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectStage(4)}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Review Module 5 (Hazmat Chemicals)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (allStages.length > 6) {
                    handleSelectStage(6);
                  }
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl font-extrabold text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Module 7: Quality Rejections &amp; Quarantine</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : currentStageIndex === 6 ? (
          /* Module 7 Graduation Screen (Category 1 Finale) */
          <div className="my-auto bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-2xl max-w-3xl mx-auto text-center space-y-6">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-rose-600 via-red-500 to-amber-500 text-white flex items-center justify-center mx-auto shadow-xl shadow-rose-600/25">
              <Trophy className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-extrabold text-rose-800 bg-rose-50 px-3.5 py-1.5 rounded-full border border-rose-300 shadow-xs">
                <Award className="w-4 h-4 text-rose-600" />
                <span>BADGE UNLOCKED: QUARANTINE SENTINEL &amp; DISPOSITION MASTER</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Module 7 Completed · Category 1 Fully Mastered!
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
                You have mastered all <strong>{stageData.scenes.length} Standard Operating Procedure steps</strong> of Quality Rejections, Quarantine &amp; Disposition under SOPs <code>07_C1_S4</code> and <code>08_C1_S4</code> at Ather AURIC Plant M002. Category 1 (Modules 1–7) is now 100% complete!
              </p>
            </div>

            {/* Performance Metric Strip */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200/90 text-center font-mono">
              <div className="space-y-0.5">
                <div className="text-[11px] text-slate-400 uppercase">XP Earned</div>
                <div className="text-lg sm:text-2xl font-black text-emerald-600">+{xp}</div>
              </div>
              <div className="space-y-0.5 border-x border-slate-200">
                <div className="text-[11px] text-slate-400 uppercase">Total Decisions</div>
                <div className="text-lg sm:text-2xl font-black text-slate-800">{attempts}</div>
              </div>
              <div className="space-y-0.5">
                <div className="text-[11px] text-slate-400 uppercase">Hearts Left</div>
                <div className="text-base sm:text-xl font-black text-rose-500">{'❤️'.repeat(hearts)}</div>
              </div>
            </div>

            {/* Milestone Tracker */}
            <div className="text-left bg-slate-50/80 rounded-2xl p-4 border border-slate-200 space-y-2">
              <div className="text-xs font-mono font-bold text-slate-500 uppercase flex items-center justify-between">
                <span>Completed Module 7 Milestones ({stageData.scenes.length}/{stageData.scenes.length}):</span>
                <span className="text-rose-600 font-extrabold">100% SOP COMPLIANT</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {stageData.scenes.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => handleSelectScene(i)}
                    className="flex items-center gap-2 p-2 rounded-xl bg-white border border-slate-200 hover:border-rose-400 text-slate-700 hover:text-rose-700 transition-colors text-left cursor-pointer"
                  >
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-mono font-bold text-[10px] flex items-center justify-center shrink-0">
                      ✓
                    </span>
                    <span className="truncate font-medium">
                      Sc {i + 1}: {getSceneTitle(s, lang)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Next Chapter & Replay Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => handleSelectScene(0)}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <RefreshCcw className="w-4 h-4" />
                <span>Replay Module 7 from Start</span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectStage(5)}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Review Module 6 (Supermarket Put-Away)</span>
              </button>

              <button
                type="button"
                onClick={() => setShowCertificate(true)}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl font-bold text-xs bg-amber-500 hover:bg-amber-600 text-white shadow-md shadow-amber-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Award className="w-4 h-4" />
                <span>Print Category 1 Certificate</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (allStages.length > 7) {
                    handleSelectStage(7);
                  }
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl font-extrabold text-xs bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Category 2 (Module 8: Order Picking)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : currentStageIndex === 7 ? (
          /* Module 8 Graduation Screen (Order Picking Mastery) */
          <div className="my-auto bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-2xl max-w-3xl mx-auto text-center space-y-6">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-sky-600 via-cyan-500 to-emerald-500 text-white flex items-center justify-center mx-auto shadow-xl shadow-sky-600/25">
              <Trophy className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-extrabold text-sky-800 bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-300 shadow-xs">
                <Award className="w-4 h-4 text-sky-600" />
                <span>BADGE UNLOCKED: LINE FEEDER CHAMPION</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Module 8 Completed · Vehicle Line Issuance Mastered!
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
                You have mastered all <strong>{stageData.scenes.length} Standard Operating Procedure steps</strong> of Vehicle Line Issuance &amp; Order Picking under SOP <code>01_C2_S1</code> at Ather AURIC Plant M002. From MES digital WH task activation to blind source QR scan, trolley marriage, supermarket lane verification, workstation delivery handshake, and reverse asset return!
              </p>
            </div>

            {/* Performance Metric Strip */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200/90 text-center font-mono">
              <div className="space-y-0.5">
                <div className="text-[11px] text-slate-400 uppercase">XP Earned</div>
                <div className="text-lg sm:text-2xl font-black text-emerald-600">+{xp}</div>
              </div>
              <div className="space-y-0.5 border-x border-slate-200">
                <div className="text-[11px] text-slate-400 uppercase">Total Decisions</div>
                <div className="text-lg sm:text-2xl font-black text-slate-800">{attempts}</div>
              </div>
              <div className="space-y-0.5">
                <div className="text-[11px] text-slate-400 uppercase">Hearts Left</div>
                <div className="text-base sm:text-xl font-black text-rose-500">{'❤️'.repeat(hearts)}</div>
              </div>
            </div>

            {/* Milestone Tracker */}
            <div className="text-left bg-slate-50/80 rounded-2xl p-4 border border-slate-200 space-y-2">
              <div className="text-xs font-mono font-bold text-slate-500 uppercase flex items-center justify-between">
                <span>Completed Module 8 Milestones ({stageData.scenes.length}/{stageData.scenes.length}):</span>
                <span className="text-sky-600 font-extrabold">100% SOP COMPLIANT</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {stageData.scenes.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => handleSelectScene(i)}
                    className="flex items-center gap-2 p-2 rounded-xl bg-white border border-slate-200 hover:border-sky-400 text-slate-700 hover:text-sky-700 transition-colors text-left cursor-pointer"
                  >
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-mono font-bold text-[10px] flex items-center justify-center shrink-0">
                      ✓
                    </span>
                    <span className="truncate font-medium">
                      Sc {i + 1}: {getSceneTitle(s, lang)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Next Chapter & Replay Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => handleSelectScene(0)}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <RefreshCcw className="w-4 h-4" />
                <span>Replay Module 8 from Start</span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectStage(6)}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Review Category 1 Finale (Quarantine &amp; Disposition)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (allStages.length > 8) {
                    handleSelectStage(8);
                  }
                }}
                disabled={allStages.length <= 8}
                className={`w-full sm:w-auto px-6 py-3 rounded-2xl font-extrabold text-xs transition-all flex items-center justify-center gap-2 ${
                  allStages.length > 8
                    ? 'bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-700 hover:to-cyan-700 text-white shadow-lg shadow-sky-600/25 cursor-pointer'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>Proceed to Module 9: Decanting &amp; Paint Shop Issuance</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : currentStageIndex === 8 ? (
          /* Module 9 Graduation Screen (Paint Decanting Mastery) */
          <div className="my-auto bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-2xl max-w-3xl mx-auto text-center space-y-6">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-600 via-orange-500 to-emerald-500 text-white flex items-center justify-center mx-auto shadow-xl shadow-amber-600/25">
              <Trophy className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-extrabold text-amber-800 bg-amber-50 px-3.5 py-1.5 rounded-full border border-amber-300 shadow-xs">
                <Award className="w-4 h-4 text-amber-600" />
                <span>BADGE UNLOCKED: PAINT &amp; DECANTING VIRTUOSO</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Module 9 Completed · Paint Shop Line Issuance &amp; Decanting Mastered!
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
                You have mastered all <strong>{stageData.scenes.length} Standard Operating Procedure steps</strong> of Paint Shop Line Issuance &amp; Decanting under SOPs <code>02_C2_S1</code> and <code>03_C2_S2</code> at Ather AURIC Plant M002. From the 28 unique feeder distribution matrix to 2-pallet e-Kanban RFID replenishment, 100% full trolley capacity discipline, and closed-loop MHE reverse recovery!
              </p>
            </div>

            {/* Performance Metric Strip */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200/90 text-center font-mono">
              <div className="space-y-0.5">
                <div className="text-[11px] text-slate-400 uppercase">XP Earned</div>
                <div className="text-lg sm:text-2xl font-black text-emerald-600">+{xp}</div>
              </div>
              <div className="space-y-0.5 border-x border-slate-200">
                <div className="text-[11px] text-slate-400 uppercase">Total Decisions</div>
                <div className="text-lg sm:text-2xl font-black text-slate-800">{attempts}</div>
              </div>
              <div className="space-y-0.5">
                <div className="text-[11px] text-slate-400 uppercase">Hearts Left</div>
                <div className="text-base sm:text-xl font-black text-rose-500">{'❤️'.repeat(hearts)}</div>
              </div>
            </div>

            {/* Milestone Tracker */}
            <div className="text-left bg-slate-50/80 rounded-2xl p-4 border border-slate-200 space-y-2">
              <div className="text-xs font-mono font-bold text-slate-500 uppercase flex items-center justify-between">
                <span>Completed Module 9 Milestones ({stageData.scenes.length}/{stageData.scenes.length}):</span>
                <span className="text-amber-600 font-extrabold">100% SOP COMPLIANT</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {stageData.scenes.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => handleSelectScene(i)}
                    className="flex items-center gap-2 p-2 rounded-xl bg-white border border-slate-200 hover:border-amber-400 text-slate-700 hover:text-amber-700 transition-colors text-left cursor-pointer"
                  >
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-mono font-bold text-[10px] flex items-center justify-center shrink-0">
                      ✓
                    </span>
                    <span className="truncate font-medium">
                      Sc {i + 1}: {getSceneTitle(s, lang)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Next Chapter & Replay Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => handleSelectScene(0)}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <RefreshCcw className="w-4 h-4" />
                <span>Replay Module 9 from Start</span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectStage(7)}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Review Module 8 (Vehicle Order Picking)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (allStages.length > 9) {
                    handleSelectStage(9);
                  }
                }}
                disabled={allStages.length <= 9}
                className={`w-full sm:w-auto px-6 py-3 rounded-2xl font-extrabold text-xs transition-all flex items-center justify-center gap-2 ${
                  allStages.length > 9
                    ? 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-lg shadow-amber-600/25 cursor-pointer'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>Proceed to Module 10: Indirect Material Handling (CM01 to MN01)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : currentStageIndex === 9 ? (
          /* Module 10 Graduation Screen (Indirect Stores Mastery) */
          <div className="my-auto bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-2xl max-w-3xl mx-auto text-center space-y-6">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-600 via-orange-500 to-yellow-500 text-white flex items-center justify-center mx-auto shadow-xl shadow-amber-600/25">
              <Trophy className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-extrabold text-amber-800 bg-amber-50 px-3.5 py-1.5 rounded-full border border-amber-300 shadow-xs">
                <Award className="w-4 h-4 text-amber-600" />
                <span>BADGE UNLOCKED: INDIRECT STORES &amp; SPARES CUSTODIAN</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Module 10 Completed · Indirect Material Handling Mastered!
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
                You have mastered all <strong>{stageData.scenes.length} Standard Operating Procedure steps</strong> of Indirect Material Handling under SOP <code>10_C2_S1</code> at Ather AURIC Plant M002. From the strict 'No Reservation, No Material' security rule to SAP YMB21 transfer postings (CM01 to MN01), MRS Cost Center error spotting, and the 4-step physical register handover protocol!
              </p>
            </div>

            {/* Performance Metric Strip */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200/90 text-center font-mono">
              <div className="space-y-0.5">
                <div className="text-[11px] text-slate-400 uppercase">XP Earned</div>
                <div className="text-lg sm:text-2xl font-black text-emerald-600">+{xp}</div>
              </div>
              <div className="space-y-0.5 border-x border-slate-200">
                <div className="text-[11px] text-slate-400 uppercase">Total Decisions</div>
                <div className="text-lg sm:text-2xl font-black text-slate-800">{attempts}</div>
              </div>
              <div className="space-y-0.5">
                <div className="text-[11px] text-slate-400 uppercase">Hearts Left</div>
                <div className="text-base sm:text-xl font-black text-rose-500">{'❤️'.repeat(hearts)}</div>
              </div>
            </div>

            {/* Milestone Tracker */}
            <div className="text-left bg-slate-50/80 rounded-2xl p-4 border border-slate-200 space-y-2">
              <div className="text-xs font-mono font-bold text-slate-500 uppercase flex items-center justify-between">
                <span>Completed Module 10 Milestones ({stageData.scenes.length}/{stageData.scenes.length}):</span>
                <span className="text-purple-600 font-extrabold">100% SOP COMPLIANT</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {stageData.scenes.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => handleSelectScene(i)}
                    className="flex items-center gap-2 p-2 rounded-xl bg-white border border-slate-200 hover:border-purple-400 text-slate-700 hover:text-purple-700 transition-colors text-left cursor-pointer"
                  >
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-mono font-bold text-[10px] flex items-center justify-center shrink-0">
                      ✓
                    </span>
                    <span className="truncate font-medium">
                      Sc {i + 1}: {getSceneTitle(s, lang)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Next Chapter & Replay Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => handleSelectScene(0)}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <RefreshCcw className="w-4 h-4" />
                <span>Replay Module 10 from Start</span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectStage(8)}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Review Module 9 (Paint Shop Line Issuance)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (allStages.length > 10) {
                    handleSelectStage(10);
                  }
                }}
                disabled={allStages.length <= 10}
                className={`w-full sm:w-auto px-6 py-3 rounded-2xl font-extrabold text-xs transition-all flex items-center justify-center gap-2 ${
                  allStages.length > 10
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg shadow-purple-600/25 cursor-pointer'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>Proceed to Module 11: Production Inspection &amp; PIR</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : currentStageIndex === 10 ? (
          /* Module 11 Graduation Screen (PIR & STO Mastery) */
          <div className="my-auto bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-2xl max-w-3xl mx-auto text-center space-y-6">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-sky-600 via-indigo-500 to-teal-500 text-white flex items-center justify-center mx-auto shadow-xl shadow-sky-600/25">
              <Trophy className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-extrabold text-sky-800 bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-300 shadow-xs">
                <Award className="w-4 h-4 text-sky-600" />
                <span>BADGE UNLOCKED: PIR &amp; STO DISPATCH SPECIALIST</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Module 11 Completed · Production Inspection &amp; PIR Mastered!
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
                You have mastered all <strong>{stageData.scenes.length} Standard Operating Procedure steps</strong> of Production Inspection &amp; Quality PIR under SOP <code>05_C2_S3</code> at Ather AURIC Plant M002. From the JIRA Budget ID mandate to dual approval thresholds (&gt; ₹25k / &gt; 25 Nos), 4:00 PM daily dispatch cutoff clock, and SAP STO E-Way Bill gate compliance!
              </p>
            </div>

            {/* Performance Metric Strip */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200/90 text-center font-mono">
              <div className="space-y-0.5">
                <div className="text-[11px] text-slate-400 uppercase">XP Earned</div>
                <div className="text-lg sm:text-2xl font-black text-emerald-600">+{xp}</div>
              </div>
              <div className="space-y-0.5 border-x border-slate-200">
                <div className="text-[11px] text-slate-400 uppercase">Total Decisions</div>
                <div className="text-lg sm:text-2xl font-black text-slate-800">{attempts}</div>
              </div>
              <div className="space-y-0.5">
                <div className="text-[11px] text-slate-400 uppercase">Hearts Left</div>
                <div className="text-base sm:text-xl font-black text-rose-500">{'❤️'.repeat(hearts)}</div>
              </div>
            </div>

            {/* Milestone Tracker */}
            <div className="text-left bg-slate-50/80 rounded-2xl p-4 border border-slate-200 space-y-2">
              <div className="text-xs font-mono font-bold text-slate-500 uppercase flex items-center justify-between">
                <span>Completed Module 11 Milestones ({stageData.scenes.length}/{stageData.scenes.length}):</span>
                <span className="text-sky-600 font-extrabold">100% SOP COMPLIANT</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {stageData.scenes.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => handleSelectScene(i)}
                    className="flex items-center gap-2 p-2 rounded-xl bg-white border border-slate-200 hover:border-sky-400 text-slate-700 hover:text-sky-700 transition-colors text-left cursor-pointer"
                  >
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-mono font-bold text-[10px] flex items-center justify-center shrink-0">
                      ✓
                    </span>
                    <span className="truncate font-medium">
                      Sc {i + 1}: {getSceneTitle(s, lang)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Next Chapter & Replay Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => handleSelectScene(0)}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <RefreshCcw className="w-4 h-4" />
                <span>Replay Module 11 from Start</span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectStage(9)}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Review Module 10 (Indirect Material Handling)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (allStages.length > 11) {
                    handleSelectStage(11);
                  }
                }}
                disabled={allStages.length <= 11}
                className={`w-full sm:w-auto px-6 py-3 rounded-2xl font-extrabold text-xs transition-all flex items-center justify-center gap-2 ${
                  allStages.length > 11
                    ? 'bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white shadow-lg shadow-sky-600/25 cursor-pointer'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>Proceed to Module 12: Reverse Logistics &amp; Empty Bins</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : currentStageIndex === 11 ? (
          /* Module 12 Grand Finale Graduation Screen (Full 12 Modules Completed) */
          <div className="my-auto bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-2xl max-w-3xl mx-auto text-center space-y-6">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-amber-500 via-emerald-500 to-indigo-600 text-white flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/30 animate-pulse">
              <Trophy className="w-12 h-12 text-amber-200" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-extrabold text-amber-900 bg-amber-50 px-4 py-1.5 rounded-full border border-amber-300 shadow-sm">
                <Award className="w-4 h-4 text-amber-600" />
                <span>GRAND TROPHY UNLOCKED: WAREHOUSE OPERATIONS GRANDMASTER</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                All 12 Modules Completed · Certified Warehouse Specialist!
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
                Phenomenal achievement! You have mastered all <strong>12 Standard Operating Procedure modules</strong> and completed all <strong>{allStages.reduce((acc, s) => acc + s.scenes.length, 0)} factory floor interactive challenges</strong> at Ather Energy AURIC Plant M002.
              </p>
            </div>

            {/* Program Mastery Summary Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left font-mono text-xs">
              <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-1">
                <span className="font-bold text-emerald-800 flex items-center gap-1.5">
                  <CheckCheck className="w-4 h-4 text-emerald-600" /> Category 1: Receiving &amp; Storage (100%)
                </span>
                <p className="text-[11px] text-slate-600 leading-normal font-sans">
                  Gate inwarding, 10% IQC statistical sampling, High-Rise rack put-away, Battery cleanrooms, Hazmat annex, Supermarket FIFO, and Quarantine disposition.
                </p>
              </div>

              <div className="p-3.5 bg-sky-50/70 border border-sky-200 rounded-2xl space-y-1">
                <span className="font-bold text-sky-800 flex items-center gap-1.5">
                  <CheckCheck className="w-4 h-4 text-sky-600" /> Category 2: Line Feeding &amp; Logistics (100%)
                </span>
                <p className="text-[11px] text-slate-600 leading-normal font-sans">
                  MES line issuance, Paint shop decanting, Indirect material handling (CM01 to MN01), Quality PIR STO dispatches, and Reverse logistics &amp; empty bins.
                </p>
              </div>
            </div>

            {/* Performance Metric Strip */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200/90 text-center font-mono">
              <div className="space-y-0.5">
                <div className="text-[11px] text-slate-400 uppercase">Total XP Earned</div>
                <div className="text-lg sm:text-2xl font-black text-emerald-600">+{xp}</div>
              </div>
              <div className="space-y-0.5 border-x border-slate-200">
                <div className="text-[11px] text-slate-400 uppercase">Total Decisions</div>
                <div className="text-lg sm:text-2xl font-black text-slate-800">{attempts}</div>
              </div>
              <div className="space-y-0.5">
                <div className="text-[11px] text-slate-400 uppercase">Hearts Left</div>
                <div className="text-base sm:text-xl font-black text-rose-500">{'❤️'.repeat(hearts)}</div>
              </div>
            </div>

            {/* Completed Scenes Tracker */}
            <div className="text-left bg-slate-50/80 rounded-2xl p-4 border border-slate-200 space-y-2">
              <div className="text-xs font-mono font-bold text-slate-500 uppercase flex items-center justify-between">
                <span>Module 12 Milestones ({stageData.scenes.length}/{stageData.scenes.length} Completed):</span>
                <span className="text-emerald-600 font-extrabold">ALL 12 MODULES 100% COMPLETE</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {stageData.scenes.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => handleSelectScene(i)}
                    className="flex items-center gap-2 p-2 rounded-xl bg-white border border-slate-200 hover:border-emerald-400 text-slate-700 hover:text-emerald-700 transition-colors text-left cursor-pointer"
                  >
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-mono font-bold text-[10px] flex items-center justify-center shrink-0">
                      ✓
                    </span>
                    <span className="truncate font-medium">
                      Sc {i + 1}: {getSceneTitle(s, lang)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Replay & Review Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => handleSelectScene(0)}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <RefreshCcw className="w-4 h-4" />
                <span>Replay Module 12 from Start</span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectStage(10)}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Review Module 11 (PIR &amp; Quality)</span>
              </button>

              <button
                type="button"
                onClick={() => setShowCertificate(true)}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl font-extrabold text-xs bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white shadow-xl shadow-amber-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Award className="w-4 h-4" />
                <span>🏆 View &amp; Print Grandmaster Certificate</span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectStage(0)}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl font-extrabold text-xs bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-700 hover:to-indigo-700 text-white shadow-xl shadow-emerald-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Trophy className="w-4 h-4" />
                <span>Restart Full 12-Module Journey</span>
              </button>
            </div>
          </div>
        ) : (
          /* Intermediate Milestone Screen (Stages 2, 3 & 4) */
          <div className="my-auto bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-2xl max-w-3xl mx-auto text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mx-auto shadow-sm">
              <Layers className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-extrabold text-blue-700 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-300 shadow-xs">
                <span>MODULE {currentStageIndex + 1} · MILESTONE {currentSceneIndex + 1} COMPLETED</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {currentStageIndex === 11
                  ? currentSceneIndex === 2
                    ? 'Scene 3: Empty Bin Collection & 5-Foot Max Stacking Height Mastered!'
                    : currentSceneIndex === 1
                    ? 'Scene 2: 3-Day Supplier SLA & "Use As It Is" Deviation Route Mastered!'
                    : 'Scene 1: Defect Validation & Causer Identification Gate Mastered!'
                  : currentStageIndex === 10
                  ? currentSceneIndex === 2
                    ? 'Scene 3: The 4:00 PM Dispatch SLA Cutoff Clock Mastered!'
                    : currentSceneIndex === 1
                    ? 'Scene 2: Dual Approval Thresholds: Value & Quantity Mastered!'
                    : 'Scene 1: JIRA PIR Initiation & Budget ID Mandate Mastered!'
                  : currentStageIndex === 9
                  ? currentSceneIndex === 2
                    ? 'Scene 3: Requisition Slip Audit & Cost Center Verification Mastered!'
                    : currentSceneIndex === 1
                    ? 'Scene 2: SAP Stock Movement CM01 to MN01 via YMB21 Mastered!'
                    : 'Scene 1: The "No Reservation, No Material" Security Rule Mastered!'
                  : currentStageIndex === 8
                  ? currentSceneIndex === 2
                    ? 'Scene 3: The 100% Full Trolley Capacity Mandate Mastered!'
                    : currentSceneIndex === 1
                    ? 'Scene 2: 2-Pallet Decanting Buffer & e-Kanban RFID Trigger Mastered!'
                    : 'Scene 1: ACED Metal Parts Trolley Issuance & Feeder Matrix Mastered!'
                  : currentStageIndex === 7
                  ? currentSceneIndex === 2
                    ? 'Scene 3: Trolley QR Marriage & Supermarket Lane Verification Mastered!'
                    : currentSceneIndex === 1
                    ? 'Scene 2: Source Location QR Scan & Blind Quantity Reveal Mastered!'
                    : 'Scene 1: MES Trigger & Digital WH Task Activation Mastered!'
                  : currentStageIndex === 6
                  ? currentSceneIndex === 3
                    ? 'Scene 4: The 4-Way Material Disposition Filter Mastered!'
                    : currentSceneIndex === 2
                    ? 'Scene 3: Quarantine Cage Storage SC01 BL & Root Cause Segregation Mastered!'
                    : currentSceneIndex === 1
                    ? 'Scene 2: Red Tagging, QC Stickers & JIRA Defect Logging Mastered!'
                    : 'Scene 1: Defective Sample Detection & Entire Lot Quarantine Mastered!'
                  : currentStageIndex === 5
                  ? currentSceneIndex === 2
                    ? 'Scene 3: Gravity Flow FIFO Roller Rack Put-Away Mastered!'
                    : currentSceneIndex === 1
                    ? 'Scene 2: Physical Count vs SAP Discrepancy Mastered!'
                    : 'Scene 1: QC Pass Seal Verification Mastered!'
                  : currentStageIndex === 4
                  ? currentSceneIndex === 2
                    ? 'Scene 3: Flammability Segregation & 2-Hour SLA Mastered!'
                    : currentSceneIndex === 1
                    ? 'Scene 2: Spill-Containment & Earthing Mastered!'
                    : 'Scene 1: Chemical Bypass Routing Mastered!'
                  : currentStageIndex === 3
                  ? currentSceneIndex === 2
                    ? 'Scene 3: 2-Hour Put-Away SLA Mastered!'
                    : currentSceneIndex === 1
                    ? 'Scene 2: Cleanroom Thresholds Mastered!'
                    : 'Scene 1: MHE Authorization Mastered!'
                  : currentStageIndex === 2
                  ? currentSceneIndex === 2
                    ? 'Scene 3: Destination Bin Marriage Mastered!'
                    : currentSceneIndex === 1
                    ? 'Scene 2: Route Segregation Mastered!'
                    : 'Scene 1: HU Barcode Scan & WH Task Mastered!'
                  : currentSceneIndex === 3
                  ? 'Scene 4: 30-Minute Handover SLA Mastered!'
                  : currentSceneIndex === 2
                  ? 'Scene 3: Quarantine Demarcation Mastered!'
                  : currentSceneIndex === 1
                  ? 'Scene 2: 10% Sampling Rule Mastered!'
                  : "Scene 1: GRN Sticker '?' Audit Mastered!"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
                {currentStageIndex === 11
                  ? currentSceneIndex === 2
                    ? 'You correctly enforced the strict 5-foot maximum empty bin stacking limit and 30-minute collection frequency to keep gangways clear. Next in Stage 12: Scene 4 (Reverse Logistics Truck Loading, DC Gate Pass & Grand Finale).'
                    : currentSceneIndex === 1
                    ? 'You correctly processed the 3-day supplier SLA and enforced Product Owner deviation sign-off before converting QI stock to Unrestricted. Next in Stage 12: Scene 3 (Empty Bin Collection & 5-Foot Max Stacking Height).'
                    : 'You correctly halted collection and declined rejected parts with an "Unknown" causer and missing Bug ID in JIRA until SQA/MQA investigation. Next in Stage 12: Scene 2 (Clause 4.2 & 4.3: 3-Day Supplier SLA & "Use As It Is" Deviation Route).'
                  : currentStageIndex === 10
                  ? currentSceneIndex === 2
                    ? 'You correctly verified that PIR dispatches must strictly occur before the 4:00 PM cutoff window to ensure same-day logistics handoff. Next in Stage 11: Scene 4 (Clause 4.4: SAP STO Processing & E-Way Bill Gate Compliance).'
                    : currentSceneIndex === 1
                    ? 'You correctly identified dual approval thresholds (> ₹25,000 value requiring Operations Head & > 25 units requiring Quality Head). Next in Stage 11: Scene 3 (Clause 4.3: The 4:00 PM Dispatch SLA Cutoff Clock).'
                    : 'You correctly enforced the mandatory JIRA Budget ID requirement before authorizing any PIR scrap or rework disposal. Next in Stage 11: Scene 2 (Clause 4.2: Dual Approval Thresholds: Value & Quantity).'
                  : currentStageIndex === 9
                  ? currentSceneIndex === 2
                    ? 'You correctly audited the Material Requisition Slip and spotted the missing Cost Center, preventing unallocated inventory shrink and cross-department billing errors. Next in Stage 10: Scene 4 (Clauses 4.2 & 4.4: Physical Tracking Sheet & Handover Protocol).'
                    : currentSceneIndex === 1
                    ? 'You correctly executed the stock transfer posting from Central Stores (CM01) to Maintenance Location (MN01) in SAP using transaction YMB21 before releasing physical parts. Next in Stage 10: Scene 3 (Failure Mode 5.1: Requisition Slip Audit & Cost Center Verification).'
                    : 'You correctly halted unauthorized issuance and enforced the strict "No Reservation, No Material" rule under SOP 10_C2_S1. Next in Stage 10: Scene 2 (Clause 4.2: SAP Stock Movement CM01 to MN01 via Transaction YMB21).'
                  : currentStageIndex === 8
                  ? currentSceneIndex === 2
                    ? 'You correctly verified that trolleys must be 100% full before moving to paint shop staging. Next in Stage 9: Scene 4 (Clause 4.4: Closed-Loop Order Closure & Wrong Part Return).'
                    : currentSceneIndex === 1
                    ? 'You correctly scanned the 2-bin decanting buffer e-Kanban RFID tag, triggering automatic replenishment. Next in Stage 9: Scene 3 (Clause 4.3: The 100% Full Trolley Capacity Mandate).'
                    : 'You correctly issued ACED metal parts via dedicated kitting trolleys to the Paint Shop feeding lanes. Next in Stage 9: Scene 2 (Clause 4.2: 2-Pallet Decanting Buffer & e-Kanban RFID Trigger).'
                  : currentStageIndex === 7
                  ? currentSceneIndex === 1
                    ? 'You correctly scanned the rack beam location QR at HRR-A-03-08 before revealing the authorized picking quantity, strictly enforcing Ather mistake-proofing (poka-yoke) standards. Next in Stage 8: Scene 3 (Failure Modes 5.1 & 5.2: Trolley QR Marriage & Supermarket Lane Verification).'
                    : 'You correctly verified that line feeders receive automated WH picking tasks via MES on their HHT, containing exact part description, source location, and replenishment quantity based on real-time VIN consumption. Next in Stage 8: Scene 2 (Clause 4.1: Source Location QR Scan & Blind Quantity Reveal).'
                  : currentStageIndex === 6
                  ? currentSceneIndex === 3
                    ? 'You correctly routed quarantined components through the 4-way filter: Auto-RTV for supplier errors, Rework with 100% re-QC, Use As-Is with signed deviation notes, and Scrap with Finance sign-off. Next in Stage 7: Scene 5 (Clause 4.5: Industrial Scrap Shredding & Weighbridge Dispatch).'
                    : currentSceneIndex === 2
                    ? 'You correctly stowed rejected stock into blocked storage SC01 BL and segregated materials into dedicated bays based on defect root cause (Vendor Defect, Transit Damage, In-House Handling). Next in Stage 7: Scene 4 (Clause 4.4: The 4-Way Disposition Filter - Auto-RTV, Rework, Use As-Is, Scrap).'
                    : currentSceneIndex === 1
                    ? 'You correctly enforced the dual physical tagging rule (Red Tag + QC Sticker) and verified that JIRA tickets must have a valid Bug ID before NG logistics collection. Next in Stage 7: Scene 3 (Clause 4.3: Transfer to Caged Store SC01 BL & Root Cause Segregation).'
                    : 'You correctly quarantined the entire 1,000-piece batch along with the 2 defective burnt samples into the NG Quarantine area, preventing fire hazards in assembly. Next in Stage 7: Scene 2 (Clause 4.2: Red Tagging, QC Stickers & JIRA Defect Ticket Creation).'
                  : currentStageIndex === 5
                  ? currentSceneIndex === 2
                    ? 'You correctly sequenced the 4 gravity flow rack put-away steps, ensuring loading occurs strictly from the REAR lane to mechanically enforce 100% First-In, First-Out (FIFO) stock rotation. Next in Stage 6: Scene 4 (Clause 4.4 & 4.5: Physical Bin Card & e-Kanban Replenishment Trigger).'
                    : currentSceneIndex === 1
                    ? 'You correctly halted put-away and escalated the 8-piece count shortage to the Zone Leader instead of altering paperwork or stocking short lots. Next in Stage 6: Scene 3 (Clause 4.3: Supermarket SAP Putaway & Gravity Flow Racks FIFO Stowage).'
                    : 'You correctly audited the Non-DOL lot at MH1 and halted putaway due to the missing green QC Pass seal on the GRN sticker. Next in Stage 6: Scene 2 (Clause 4.2: Physical Sampling vs SAP LX02 Discrepancy Escalation).'
                  : currentStageIndex === 4
                  ? currentSceneIndex === 2
                    ? 'You correctly sorted all flammable, oxidizing, and corrosive chemicals into isolated containment bays within the mandatory 2-hour SLA. Next in Stage 5: Scene 4 (Clause 4.4: DEO Manual GRN & ERP Stock Posting).'
                    : currentSceneIndex === 1
                    ? 'You correctly audited the Annex C-04 dock and spotted the missing secondary spill bund and detached static grounding clamp. Next in Stage 5: Scene 3 (Clause 4.3: Flammability Segregation & 2-Hour SLA).'
                    : 'You correctly routed the flammable chemical tanker directly to the detached Chemical Storage Annex, bypassing the main assembly plant. Next in Stage 5: Scene 2 (Clause 4.2: Chemical PPE & Secondary Spill-Containment Inspection).'
                  : currentStageIndex === 3
                  ? currentSceneIndex === 2
                    ? 'You correctly verified the 2-Hour strict put-away SLA window for battery cells from dock arrival to cell vault stowing. Next in Stage 4: Scene 4 (Clause 5.2: Environmental Breach Alarm & Containment Protocol).'
                    : currentSceneIndex === 1
                    ? 'You correctly verified the 20°C–25°C and 60%–65% RH climate parameters for the sealed Battery Standard Room. Next in Stage 4: Scene 3 (Clause 4.3: 2-Hour Strict Put-Away Countdown SLA).'
                    : 'You correctly halted the uncertified helper and verified that lithium-ion battery cells must be transported exclusively by certified MHE operators. Next in Stage 4: Scene 2 (Clause 4.2: Climate-Controlled Cleanroom Parameters - 20°C–25°C & 60%–65% RH).'
                  : currentStageIndex === 2
                  ? currentSceneIndex === 2
                    ? 'You correctly scanned the rack location QR code on beam HRR-B-04-12, completing the SAP EWM bin marriage and updating G-stock. Next in Stage 3: Scene 4 (Clause 5.1: Failure Mode - Omitted Location Scan Consequences).'
                    : currentSceneIndex === 1
                    ? 'You correctly segregated FLC bins to High-Rise Racks (HRR) and wheeled vehicle trolleys to the Trolley Staging Area. Next in Stage 3: Scene 3 (Clause 4.3: Destination Bin Marriage & Task Closure via Location QR Scan).'
                    : 'You correctly scanned the pallet-level Handling Unit barcode on the GRN sticker to generate the active SAP EWM Warehouse Task. Next in Stage 3: Scene 2 (Clause 4.2: Route Segregation - FLC to High Rise Racks vs Trolley Staging).'
                  : currentSceneIndex === 3
                  ? 'You verified the strict 30-minute handover SLA cutoff from GRN application. Next in Stage 2: Scene 5 (Clause 4.5: The 3-Way IQC Outcome & Sealing - Pass, Hold, NG).'
                  : currentSceneIndex === 2
                  ? 'You correctly positioned yellow UNDER IQC cones around the staging buffer. Next in Stage 2: Scene 4 (Clause 4.4: 30-Minute Sample Handover SLA & Countdown).'
                  : currentSceneIndex === 1
                  ? 'You correctly applied the 10% statistical sampling calculation (1 FLC crate transferred to IQC, 9 FLC crates waiting in staging). Next in Stage 2: Scene 3 (Clause 4.3: Staging Area Visual Demarcation & UNDER IQC Cones).'
                  : "You correctly audited the Non-DOL identifier on the GRN label. Next in Stage 2: Clause 4.2: 10% Lot Statistical Sampling Rule (Count Stepper)."}
              </p>
            </div>

            {/* Performance Metric Strip */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200/90 text-center font-mono">
              <div className="space-y-0.5">
                <div className="text-[11px] text-slate-400 uppercase">XP Earned</div>
                <div className="text-lg sm:text-2xl font-black text-emerald-600">+{xp}</div>
              </div>
              <div className="space-y-0.5 border-x border-slate-200">
                <div className="text-[11px] text-slate-400 uppercase">Total Decisions</div>
                <div className="text-lg sm:text-2xl font-black text-slate-800">{attempts}</div>
              </div>
              <div className="space-y-0.5">
                <div className="text-[11px] text-slate-400 uppercase">Hearts Left</div>
                <div className="text-base sm:text-xl font-black text-rose-500">{'❤️'.repeat(hearts)}</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
              {currentSceneIndex < stageData.scenes.length - 1 && (
                <button
                  type="button"
                  onClick={() => handleSelectScene(currentSceneIndex + 1)}
                  className="w-full sm:w-auto px-6 py-3 rounded-2xl font-extrabold text-xs bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Proceed to Scene {currentSceneIndex + 2}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              <button
                type="button"
                onClick={() => handleSelectScene(currentSceneIndex)}
                className="px-4 py-2.5 rounded-xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RefreshCcw className="w-3.5 h-3.5" />
                <span>Replay Current Scene</span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectStage(Math.max(0, currentStageIndex - 1))}
                className="px-4 py-2.5 rounded-xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Module {currentStageIndex}</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer Dual Branding */}
      <footer className="shrink-0 py-3 text-center text-xs font-mono text-slate-400">
        Ather Energy AURIC Plant M002 · Story Engine Powered by Tetrahedron
      </footer>
    </div>
  );
};
