import { useState, useRef, useEffect } from 'react';
import type { TrainingPackData, StepData } from '../content/schema';
import type {
  LanguageCode,
  TrainingMode,
  UserProfile,
  SettingsConfig,
  StepEvaluation,
  StepResult,
  RunSummary
} from '../engine/types';
import { PalletProgressBar } from '../components/PalletProgressBar';
import { StepContainer } from '../steps/StepContainer';
import { calculateStepXp, evaluateRun } from '../engine/scoring';

interface RunScreenProps {
  pack: TrainingPackData;
  lang: LanguageCode;
  mode: TrainingMode;
  profile: UserProfile;
  settings: SettingsConfig;
  onCompleteRun: (summary: RunSummary) => void;
  onExit: () => void;
}

export function RunScreen({
  pack,
  lang,
  mode,
  profile: _profile,
  settings,
  onCompleteRun,
  onExit: _onExit
}: RunScreenProps) {
  const steps: StepData[] = pack.steps || [];
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [lives, setLives] = useState(3);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [accumulatedXp, setAccumulatedXp] = useState(0);
  const [evaluations, setEvaluations] = useState<StepEvaluation[]>([]);

  const stepStartTimeRef = useRef<number>(0);

  const currentStep = steps[currentStepIndex];

  useEffect(() => {
    stepStartTimeRef.current = Date.now();
  }, [currentStepIndex]);

  const handleStepComplete = (result: StepResult) => {
    if (!currentStep) return;

    const timeTaken = stepStartTimeRef.current > 0 ? Date.now() - stepStartTimeRef.current : 5000;
    const ok = result.ok;

    // Calculate Combo & Step XP
    let newCombo = ok ? combo + 1 : 0;
    setCombo(newCombo);
    if (newCombo > maxCombo) {
      setMaxCombo(newCombo);
    }

    const { xp: stepXp } = calculateStepXp(ok, newCombo, timeTaken);
    setAccumulatedXp((prev) => prev + stepXp);

    const isEyeTest = currentStep.type === 'hotspot' || currentStep.type === 'spotError';
    const isSafety = !!currentStep.safety;

    const evaluation: StepEvaluation = {
      stepId: currentStep.id,
      ok,
      isSafety,
      isEyeTest,
      timeTakenMs: timeTaken
    };

    setEvaluations((prev) => [...prev, evaluation]);

    // In practice mode, losing a life
    if (!ok && mode === 'practice') {
      const nextLives = lives - 1;
      setLives(nextLives);
    }
  };

  const handleNextStep = () => {
    // Check if ran out of lives in practice mode
    if (mode === 'practice' && lives <= 0) {
      finishRun(true);
      return;
    }

    if (currentStepIndex + 1 < steps.length) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      finishRun(false);
    }
  };

  const finishRun = (lost: boolean) => {
    const { stars, accuracyPct, safetyPassed, totalXp, badges } = evaluateRun(
      evaluations,
      mode,
      lost,
      maxCombo,
      accumulatedXp
    );

    const summary: RunSummary = {
      packId: pack.id,
      packTitle: pack.title,
      mode,
      stars,
      xpGained: totalXp,
      accuracyPct,
      totalSteps: steps.length,
      correctSteps: evaluations.filter((e) => e.ok).length,
      safetyPassed,
      lost,
      badgesEarned: badges,
      timestamp: new Date().toISOString()
    };

    onCompleteRun(summary);
  };

  if (!currentStep) {
    return (
      <div className="p-8 text-center font-heading font-black text-2xl text-ink">
        No operational steps found in this training pack.
      </div>
    );
  }

  const safetyFlags = steps.map((s) => !!s.safety);

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 w-full flex flex-col gap-6 animate-in fade-in duration-300">
      {/* Conveyor Pallet Progress Bar */}
      <PalletProgressBar
        currentIndex={currentStepIndex}
        totalSteps={steps.length}
        stepSafetyFlags={safetyFlags}
        lives={lives}
        combo={combo}
        mode={mode}
      />

      {/* Main Step Workspace */}
      <StepContainer
        key={currentStep.id}
        step={currentStep}
        lang={lang}
        mode={mode}
        autoReadTTS={settings.autoReadTTS}
        soundEnabled={settings.soundEnabled}
        vibrationEnabled={settings.vibrationEnabled}
        onStepComplete={handleStepComplete}
        onNextStep={handleNextStep}
      />
    </div>
  );
}
