import React, { useState } from 'react';
import type {
  LanguageCode,
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
import rawStage1Data from '../content/stories/c1_s1_gate_dock.json';
import rawStage2Data from '../content/stories/c1_s2_iqc_clearance.json';
import rawStage3Data from '../content/stories/c1_s3_putaway_parts.json';
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
  rawStage1Data as unknown as StoryStage,
  rawStage2Data as unknown as StoryStage,
  rawStage3Data as unknown as StoryStage
];

export const StoryStagePlayer: React.FC = () => {
  const [lang, setLang] = useState<LanguageCode>('en');
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(0);
  const [currentSceneIndex, setCurrentSceneIndex] = useState<number>(0);
  const [xp, setXp] = useState<number>(0);
  const [hearts, setHearts] = useState<number>(3);
  const [attempts, setAttempts] = useState<number>(0);

  // Timeline Phase: 'intro' -> 'interaction_paused' -> 'feedback' -> 'gateway'
  const [phase, setPhase] = useState<'intro' | 'interaction_paused' | 'feedback' | 'gateway'>('intro');
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isLastCorrect, setIsLastCorrect] = useState<boolean>(false);

  const stageData = allStages[currentStageIndex] || allStages[0];
  const scene = stageData.scenes[currentSceneIndex] || stageData.scenes[0];

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

  // Mascot dynamic pose and text calculation
  let currentPose: MascotPose = 'explaining';
  let currentDialogue = scene.mascot.intro.text;
  let currentAudio = scene.mascot.intro.audioSrc;

  if (phase === 'interaction_paused') {
    currentPose = 'thinking';
    currentDialogue = scene.interaction.question;
  } else if (phase === 'feedback') {
    if (isLastCorrect) {
      currentPose = 'success';
      currentDialogue = scene.mascot.onCorrect.text;
      currentAudio = scene.mascot.onCorrect.audioSrc;
    } else {
      currentPose = 'warning';
      currentDialogue = scene.mascot.onIncorrect.text;
      currentAudio = scene.mascot.onIncorrect.audioSrc;
    }
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
                  <span className="hidden sm:inline">· {s.title[lang] || s.title.en}</span>
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
              ) : scene.media.fallbackAnimation === 'iqc_sampling_transfer' ? (
                <IqcSamplingAnimation
                  videoSrc={scene.media.videoSrc}
                  isPaused={phase === 'interaction_paused' || phase === 'feedback'}
                  onPauseReached={handlePauseReached}
                />
              ) : scene.media.fallbackAnimation === 'iqc_cones_staging' ? (
                <IqcConesAnimation
                  videoSrc={scene.media.videoSrc}
                  isPaused={phase === 'interaction_paused' || phase === 'feedback'}
                  onPauseReached={handlePauseReached}
                />
              ) : scene.media.fallbackAnimation === 'iqc_handover_sla_clock' ? (
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
              ) : scene.media.fallbackAnimation === 'bin_marriage_lift' ? (
                <BinMarriageAnimation
                  videoSrc={scene.media.videoSrc}
                  isPaused={phase === 'interaction_paused' || phase === 'feedback'}
                  onPauseReached={handlePauseReached}
                />
              ) : scene.media.fallbackAnimation === 'omitted_scan_hazard' ? (
                <OmittedScanHazardAnimation
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
                        {currentStageIndex === 1 && currentSceneIndex === 0
                          ? 'Inspecting Offloaded Pallet in Staging...'
                          : currentStageIndex === 1 && currentSceneIndex === 1
                          ? 'Calculating 10% IQC Statistical Sample Volume...'
                          : currentStageIndex === 1 && currentSceneIndex === 2
                          ? 'Setting Up Quarantine Demarcation in Staging...'
                          : currentStageIndex === 1 && currentSceneIndex === 3
                          ? 'Monitoring 30-Minute IQC Sample Handover Countdown...'
                          : currentSceneIndex === 0
                          ? 'Inbound Approach in Progress...'
                          : currentSceneIndex === 4
                          ? 'DEO Allocating Dock in SAP...'
                          : currentSceneIndex === 5
                          ? 'Dock 04 Safety Audit in Progress...'
                          : currentSceneIndex === 6
                          ? 'Empty Bins Exit Inspection in Progress...'
                          : 'Driver Entering Security Gatehouse...'}
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
                You have mastered all <strong>7 Standard Operating Procedure steps</strong> of Gate &amp; Dock Operations at Ather AURIC Plant M002.
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

            {/* 7-Step Milestone Tracker */}
            <div className="text-left bg-slate-50/80 rounded-2xl p-4 border border-slate-200 space-y-2">
              <div className="text-xs font-mono font-bold text-slate-500 uppercase flex items-center justify-between">
                <span>Completed Module 1 Milestones (7/7):</span>
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
                      Sc {i + 1}: {s.title[lang] || s.title.en}
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
        ) : currentStageIndex === 1 && currentSceneIndex >= 4 ? (
          /* Module 2 Graduation Screen (Full 5/5 Scenes Completed) */
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
                You have mastered all <strong>5 Standard Operating Procedure steps</strong> of Receiving &amp; IQC Clearance under SOP <code>02_C1_S2</code> at Ather AURIC Plant M002.
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

            {/* 5-Step Milestone Tracker */}
            <div className="text-left bg-slate-50/80 rounded-2xl p-4 border border-slate-200 space-y-2">
              <div className="text-xs font-mono font-bold text-slate-500 uppercase flex items-center justify-between">
                <span>Completed Module 2 Milestones (5/5):</span>
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
                      Sc {i + 1}: {s.title[lang] || s.title.en}
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
        ) : currentStageIndex === 2 && currentSceneIndex >= 3 ? (
          /* Module 3 Graduation Screen (Full 4/4 Scenes Completed) */
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
                You have mastered all <strong>4 Standard Operating Procedure steps</strong> of Vehicle &amp; Battery Parts Put-Away under SOP <code>03_C1_S3</code> at Ather AURIC Plant M002.
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

            {/* 4-Step Milestone Tracker */}
            <div className="text-left bg-slate-50/80 rounded-2xl p-4 border border-slate-200 space-y-2">
              <div className="text-xs font-mono font-bold text-slate-500 uppercase flex items-center justify-between">
                <span>Completed Module 3 Milestones (4/4):</span>
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
                      Sc {i + 1}: {s.title[lang] || s.title.en}
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
                  alert("Module 4 (Specialized Battery Cell Put-Away) is the next training slice on the Master Blueprint!");
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl font-extrabold text-xs bg-amber-600 hover:bg-amber-700 text-white shadow-lg shadow-amber-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Module 4 (Battery Cell Vault)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Intermediate Milestone Screen (Stages 2 & 3) */
          <div className="my-auto bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-2xl max-w-3xl mx-auto text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mx-auto shadow-sm">
              <Layers className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-extrabold text-blue-700 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-300 shadow-xs">
                <span>MODULE {currentStageIndex + 1} · MILESTONE {currentSceneIndex + 1} COMPLETED</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {currentStageIndex === 2
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
                {currentStageIndex === 2
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
