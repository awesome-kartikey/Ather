import React, { useState } from 'react';
import type { LanguageCode, MascotPose, StoryStage, DragDropInteraction, McqInteraction, SequenceInteraction, HotspotInteraction, SpotErrorInteraction } from '../engine/story/types';
import rawStageData from '../content/stories/c1_s1_gate_dock.json';
import { StoryHud } from '../components/story/StoryHud';
import { MascotAura } from '../components/story/MascotAura';
import { TruckGateAnimation } from '../components/story/TruckGateAnimation';
import { GatehouseCabinAnimation } from '../components/story/GatehouseCabinAnimation';
import { SapTerminalAnimation } from '../components/story/SapTerminalAnimation';
import { ThermalPrinterAnimation } from '../components/story/ThermalPrinterAnimation';
import { DockBlueprintAnimation } from '../components/story/DockBlueprintAnimation';
import { DockSafetyAnimation } from '../components/story/DockSafetyAnimation';
import { QuestionCard } from '../components/story/QuestionCard';
import { DragDropCard } from '../components/story/DragDropCard';
import { SequenceCard } from '../components/story/SequenceCard';
import { HotspotCard } from '../components/story/HotspotCard';
import { SpotErrorCard } from '../components/story/SpotErrorCard';
import { FeedbackCard } from '../components/story/FeedbackCard';
import { RefreshCcw, Layers, ArrowLeft } from 'lucide-react';

const stageData = rawStageData as unknown as StoryStage;

export const StoryStagePlayer: React.FC = () => {
  const [lang, setLang] = useState<LanguageCode>('en');
  const [currentSceneIndex, setCurrentSceneIndex] = useState<number>(0);
  const [xp, setXp] = useState<number>(0);
  const [hearts, setHearts] = useState<number>(3);
  const [attempts, setAttempts] = useState<number>(0);

  // Timeline Phase: 'intro' -> 'interaction_paused' -> 'feedback' -> 'gateway'
  const [phase, setPhase] = useState<'intro' | 'interaction_paused' | 'feedback' | 'gateway'>('intro');
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isLastCorrect, setIsLastCorrect] = useState<boolean>(false);

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
      />

      {/* 2. Scene Stepper Pill Bar */}
      <div className="bg-white/80 border-b border-slate-200/80 px-4 py-2">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-400 uppercase">Stage 1 Timeline:</span>
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
                        {currentSceneIndex === 0
                          ? 'Inbound Approach in Progress...'
                          : currentSceneIndex === 4
                          ? 'DEO Allocating Dock in SAP...'
                          : currentSceneIndex === 5
                          ? 'Dock 04 Safety Audit in Progress...'
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
        ) : (
          /* Scene 7 Gateway Placeholder */
          <div className="my-auto bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xl max-w-2xl mx-auto text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <Layers className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <div className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block">
                Slices 1, 2, 3, 4, 5 &amp; 6 Completed!
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Module 1 Final: Scene 7 Gateway
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                Truck successfully unloaded at Dock 04! Next: Post-Unload physical inspection, empty FLC bins reloading with manual Delivery Challan (DC), and Departure Gate Exit (<code className="text-slate-700 bg-slate-100 px-1 py-0.5 rounded">YMM_GATE_EXIT</code>).
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-mono text-slate-600 flex items-center justify-center gap-6">
              <span>Total Attempts: <strong>{attempts}</strong></span>
              <span>·</span>
              <span>Accumulated XP: <strong className="text-emerald-700">+{xp}</strong></span>
              <span>·</span>
              <span>Remaining Hearts: <strong>{'❤️'.repeat(hearts)}</strong></span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => handleSelectScene(0)}
                className="px-3 py-2 rounded-xl font-bold text-xs bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Scene 1</span>
              </button>
              <button
                type="button"
                onClick={() => handleSelectScene(1)}
                className="px-3 py-2 rounded-xl font-bold text-xs bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCcw className="w-3.5 h-3.5" />
                <span>Scene 2</span>
              </button>
              <button
                type="button"
                onClick={() => handleSelectScene(2)}
                className="px-3 py-2 rounded-xl font-bold text-xs bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCcw className="w-3.5 h-3.5" />
                <span>Scene 3</span>
              </button>
              <button
                type="button"
                onClick={() => handleSelectScene(3)}
                className="px-3 py-2 rounded-xl font-bold text-xs bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCcw className="w-3.5 h-3.5" />
                <span>Scene 4</span>
              </button>
              <button
                type="button"
                onClick={() => handleSelectScene(4)}
                className="px-3 py-2 rounded-xl font-bold text-xs bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCcw className="w-3.5 h-3.5" />
                <span>Scene 5</span>
              </button>
              <button
                type="button"
                onClick={() => handleSelectScene(5)}
                className="px-4 py-2 rounded-xl font-bold text-xs bg-blue-600 text-white hover:bg-blue-700 transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <RefreshCcw className="w-3.5 h-3.5" />
                <span>Replay Scene 6 (Dock Safety)</span>
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
