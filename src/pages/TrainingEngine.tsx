import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle, Flag, BookOpen } from 'lucide-react';
import type { TrainingPackData, StepData } from '../content/schema';
import type { LanguageCode, UserProfile, RunSummary, StepEvaluation } from '../engine/types';
import { SceneManager } from '../components/scenes/SceneManager';
import { ScenarioRenderer } from '../components/activities/ScenarioRenderer';
import { DragDropRenderer } from '../components/activities/DragDropRenderer';
import { HotspotRenderer } from '../components/activities/HotspotRenderer';
import { ScanSimRenderer } from '../components/activities/ScanSimRenderer';
import { SpotMistakeRenderer } from '../components/activities/SpotMistakeRenderer';
import { EmployeeSessionBar } from '../components/training/EmployeeSessionBar';
import { VoiceInstructionPlayer } from '../components/activities/VoiceInstructionPlayer';
import { evaluateRun, calculateStepXp } from '../engine/scoring';
import { playFeedbackTone, stopVoice } from '../engine/sound';

interface Props {
  pack: TrainingPackData;
  lang: LanguageCode;
  profile: UserProfile;
  onCompleteRun: (summary: RunSummary) => void;
  onExit: () => void;
}

export const TrainingEngine: React.FC<Props> = ({
  pack,
  lang,
  profile,
  onCompleteRun,
  onExit
}) => {
  const steps: StepData[] = pack.steps || [];
  const total = steps.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isLastCorrect, setIsLastCorrect] = useState<boolean | null>(null);
  const [evaluations, setEvaluations] = useState<StepEvaluation[]>([]);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [accumulatedXp, setAccumulatedXp] = useState(0);
  const [startTime, setStartTime] = useState<number>(Date.now());

  const currentStep = steps[currentIndex];

  useEffect(() => {
    setStartTime(Date.now());
    stopVoice();
  }, [currentIndex]);

  const handleStepAnswer = (_answer: any, isCorrect: boolean) => {
    if (!currentStep) return;

    const timeSpentMs = Date.now() - startTime;
    setIsLastCorrect(isCorrect);
    setShowFeedback(true);

    // Audio tone
    playFeedbackTone(isCorrect, true, true);

    // Combo & XP calculation
    const newCombo = isCorrect ? combo + 1 : 0;
    setCombo(newCombo);
    if (newCombo > maxCombo) setMaxCombo(newCombo);

    const { xp } = calculateStepXp(isCorrect, newCombo, timeSpentMs);
    setAccumulatedXp((prev) => prev + xp);

    const isEyeTest = currentStep.type === 'hotspot' || currentStep.type === 'spotError';
    const isSafety = !!currentStep.safety;

    const evaluation: StepEvaluation = {
      stepId: currentStep.id,
      ok: isCorrect,
      isSafety,
      isEyeTest,
      timeTakenMs: timeSpentMs
    };

    setEvaluations((prev) => [...prev, evaluation]);
  };

  const handleContinue = () => {
    setShowFeedback(false);
    setIsLastCorrect(null);

    if (currentIndex + 1 < total) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Evaluate run summary and complete
      const finalEval = evaluateRun(
        evaluations,
        'practice',
        false,
        maxCombo,
        accumulatedXp
      );

      const summary: RunSummary = {
        packId: pack.id,
        packTitle: pack.title,
        mode: 'practice',
        stars: finalEval.stars,
        xpGained: finalEval.totalXp,
        accuracyPct: finalEval.accuracyPct,
        totalSteps: total,
        correctSteps: evaluations.filter((e) => e.ok).length,
        safetyPassed: finalEval.safetyPassed,
        lost: false,
        badgesEarned: finalEval.badges,
        timestamp: new Date().toISOString()
      };

      onCompleteRun(summary);
    }
  };

  if (!currentStep) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50 text-slate-800">
        <p>No operational steps found.</p>
        <button type="button" onClick={onExit} className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-xl">
          Return Home
        </button>
      </div>
    );
  }

  const progressPct = ((currentIndex + 1) / total) * 100;

  const renderCurrentActivity = () => {
    switch (currentStep.type) {
      case 'choice':
        return (
          <ScenarioRenderer
            key={currentStep.id}
            step={currentStep}
            lang={lang}
            onComplete={handleStepAnswer}
          />
        );
      case 'dragDrop':
        return (
          <DragDropRenderer
            key={currentStep.id}
            step={currentStep}
            lang={lang}
            onComplete={handleStepAnswer}
          />
        );
      case 'hotspot':
        return (
          <HotspotRenderer
            key={currentStep.id}
            step={currentStep}
            lang={lang}
            onComplete={handleStepAnswer}
          />
        );
      case 'scanSim':
        return (
          <ScanSimRenderer
            key={currentStep.id}
            step={currentStep}
            lang={lang}
            onComplete={handleStepAnswer}
          />
        );
      case 'spotError':
        return (
          <SpotMistakeRenderer
            key={currentStep.id}
            step={currentStep}
            lang={lang}
            onComplete={handleStepAnswer}
          />
        );
      default:
        return (
          <ScenarioRenderer
            key={currentStep.id}
            step={currentStep as any}
            lang={lang}
            onComplete={handleStepAnswer}
          />
        );
    }
  };

  return (
    <div className="h-screen bg-slate-100 flex flex-col overflow-hidden text-slate-900 font-sans">
      {/* ── Top Navigation Bar ─────────────────────────────────────────── */}
      <header className="shrink-0 border-b border-slate-200/90 bg-white/95 shadow-xs backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 px-4 py-2.5">
          {/* Back Button */}
          <button
            type="button"
            onClick={onExit}
            className="flex items-center gap-1.5 text-slate-500 hover:text-slate-900 transition-colors text-sm font-semibold cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Exit Station</span>
          </button>

          {/* Module Title Breadcrumb */}
          <div className="flex-1 min-w-0 text-center">
            <p className="text-[11px] font-extrabold text-blue-600 uppercase tracking-widest truncate">
              {pack.title[lang]}
            </p>
            <p className="hidden md:block truncate text-xs font-semibold text-slate-500">
              Doc No: XXXX_PRO_001 · Gate &amp; Dock Operations
            </p>
          </div>

          {/* Step Counter & Trainee Bar */}
          <div className="flex items-center gap-3">
            <span className="shrink-0 text-sm font-bold text-slate-500 tabular-nums font-mono">
              {currentIndex + 1} <span className="font-normal text-slate-400">/ {total}</span>
            </span>
            <EmployeeSessionBar profile={profile} onEndSession={onExit} />
          </div>
        </div>

        {/* Multi-Stop Gradient Progress Bar */}
        <div className="h-1.5 bg-slate-100 w-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500"
            initial={{ width: `${(currentIndex / total) * 100}%` }}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          />
        </div>
      </header>

      {/* ── Main 2-Column Split Workspace ─────────────────────────────── */}
      <div className="flex-1 min-h-0 flex items-stretch overflow-hidden">
        <AnimatePresence mode="wait">
          {!showFeedback ? (
            <motion.div
              key={`step-${currentIndex}`}
              initial={{ x: 25, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -25, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex-1 flex overflow-hidden"
            >
              <div className="flex-1 grid grid-cols-1 lg:grid-cols-5 overflow-hidden">
                {/* ── Left Column: Live Visual Scene (40% / 2 cols) ──── */}
                <div className="hidden lg:flex flex-col bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.14),transparent_35%),linear-gradient(180deg,#f8fafc,#e2e8f0)] border-r border-slate-200 p-5 xl:p-6 lg:col-span-2 justify-center">
                  <SceneManager
                    step={currentStep}
                    lang={lang}
                    isCorrect={isLastCorrect}
                  />
                </div>

                {/* ── Right Column: Interactive Activity (60% / 3 cols) ── */}
                <div className="flex flex-col overflow-hidden bg-white lg:col-span-3">
                  {/* Mobile Scene View (compact top bar for small screens) */}
                  <div className="lg:hidden shrink-0 border-b border-slate-200 bg-slate-100 p-3">
                    <div className="h-[200px] overflow-hidden rounded-xl">
                      <SceneManager
                        step={currentStep}
                        lang={lang}
                        isCorrect={isLastCorrect}
                      />
                    </div>
                  </div>

                  {/* Scrollable activity content */}
                  <div className="flex-1 min-h-0 overflow-y-auto px-4 py-5 sm:px-6 lg:px-8 custom-scrollbar">
                    {renderCurrentActivity()}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            /* ── Centered Feedback Transition Modal ─────────────────── */
            <motion.div
              key="feedback"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.02, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex-1 flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-xs select-none"
            >
              <div className="w-full max-w-lg bg-white border border-slate-200/90 rounded-3xl shadow-2xl overflow-hidden">
                {/* Color Stripe */}
                <div
                  className={`h-2 w-full ${isLastCorrect ? 'bg-emerald-500' : 'bg-rose-500'}`}
                />

                <div className="p-6 sm:p-8 text-center flex flex-col items-center">
                  {/* Icon Circle */}
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-sm ${
                      isLastCorrect ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
                    }`}
                  >
                    {isLastCorrect ? (
                      <CheckCircle2 className="w-9 h-9" />
                    ) : (
                      <XCircle className="w-9 h-9" />
                    )}
                  </div>

                  {/* Title */}
                  <h2
                    className={`text-2xl sm:text-3xl font-black mb-2 tracking-tight ${
                      isLastCorrect ? 'text-emerald-700' : 'text-rose-700'
                    }`}
                  >
                    {isLastCorrect ? 'SOP Compliant · Correct!' : 'SOP Deviation Detected'}
                  </h2>

                  {/* Explanation */}
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium mb-4 max-w-md">
                    {currentStep.explanation[lang]}
                  </p>

                  {/* Voice Button & SOP Reference */}
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                      Ref: SOP XXXX_PRO_001
                    </span>

                    <VoiceInstructionPlayer
                      text={currentStep.explanation[lang]}
                      lang={lang}
                      label="Listen Guidance"
                    />
                  </div>

                  {/* Continue Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    autoFocus
                    onClick={handleContinue}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-base sm:text-lg shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {currentIndex + 1 < total ? (
                      <>
                        <span>Continue to Next Step</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    ) : (
                      <>
                        <span>View Shift Results</span>
                        <Flag className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
