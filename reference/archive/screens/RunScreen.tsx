import { useState, useRef } from 'react';
import type { TrainingPackData } from '../content/schema';
import type {
  LanguageCode,
  TrainingMode,
  StepResult,
  StepEvaluation,
  RunSummary,
  SettingsConfig,
  UserProfile
} from '../engine/types';
import { PalletProgressBar } from '../components/PalletProgressBar';
import { StepContainer } from '../steps/StepContainer';
import { calculateStepXp, evaluateRun } from '../engine/scoring';
import { playFeedbackTone } from '../engine/sound';
import { getLevelInfo } from '../engine/gamification';
import { useTranslation } from '../i18n/translations';

interface RunScreenProps {
  pack: TrainingPackData;
  lang: LanguageCode;
  mode: TrainingMode;
  profile: UserProfile;
  settings: SettingsConfig;
  onRunFinished: (summary: RunSummary) => void;
}

export function RunScreen({
  pack,
  lang,
  mode,
  profile,
  settings,
  onRunFinished
}: RunScreenProps) {
  const t = useTranslation(lang);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [evaluations, setEvaluations] = useState<StepEvaluation[]>([]);
  const [lives, setLives] = useState<number>(3);
  const [combo, setCombo] = useState<number>(0);
  const [maxCombo, setMaxCombo] = useState<number>(0);
  const [sessionXp, setSessionXp] = useState<number>(0);

  const stepStartTimeRef = useRef<number>(Date.now());

  const currentStep = pack.steps[currentStepIndex];
  const levelInfo = getLevelInfo(profile.xp + sessionXp);

  const handleStepComplete = (result: StepResult) => {
    const elapsed = Date.now() - stepStartTimeRef.current;
    const ok = result.ok;

    // Combo logic
    const nextCombo = ok ? combo + 1 : 0;
    setCombo(nextCombo);
    setMaxCombo((prev) => Math.max(prev, nextCombo));

    // XP calculation
    const { xp } = calculateStepXp(ok, nextCombo, elapsed);
    if (ok) {
      setSessionXp((prev) => prev + xp);
    } else if (mode === 'practice') {
      setLives((prev) => Math.max(0, prev - 1));
    }

    // Sound & Vibration
    playFeedbackTone(ok, settings.soundEnabled, settings.vibrationEnabled);

    // Save evaluation
    const isEyeTest = currentStep.type === 'hotspot' || currentStep.type === 'spotError';
    const isSafety = !!currentStep.safety;

    const evaluation: StepEvaluation = {
      stepId: currentStep.id,
      ok,
      isSafety,
      isEyeTest,
      timeTakenMs: elapsed
    };

    setEvaluations((prev) => [...prev, evaluation]);
  };

  const handleNextStep = () => {
    // If practice mode and lives are depleted, terminate run immediately
    if (mode === 'practice' && lives <= 0) {
      finishRun(true);
      return;
    }

    if (currentStepIndex + 1 < pack.steps.length) {
      setCurrentStepIndex((prev) => prev + 1);
      stepStartTimeRef.current = Date.now();
    } else {
      finishRun(false);
    }
  };

  const finishRun = (lost: boolean) => {
    const runResult = evaluateRun(
      evaluations,
      mode,
      lost,
      maxCombo,
      sessionXp
    );

    const summary: RunSummary = {
      packId: pack.id,
      packTitle: pack.title,
      mode,
      stars: runResult.stars,
      xpGained: runResult.totalXp,
      accuracyPct: runResult.accuracyPct,
      totalSteps: pack.steps.length,
      correctSteps: evaluations.filter((e) => e.ok).length,
      safetyPassed: runResult.safetyPassed,
      lost,
      badgesEarned: runResult.badges,
      timestamp: new Date().toISOString()
    };

    onRunFinished(summary);
  };

  return (
    <div className="flex flex-col gap-4 max-w-6xl mx-auto p-4 sm:p-6 w-full animate-in fade-in duration-300">
      {/* HUD Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-card px-5 py-3 rounded-2xl border-3 border-ink shadow-sm">
        {/* Level and Session XP */}
        <div className="flex items-center gap-3">
          <span className="font-heading font-extrabold text-xl text-ink">
            {levelInfo.currentLevel.title[lang]} · {profile.xp + sessionXp} {t.xp}
          </span>
          {sessionXp > 0 && (
            <span className="font-mono text-sm font-bold text-ok bg-ok/10 px-2 py-0.5 rounded-md border border-ok/30">
              +{sessionXp} XP
            </span>
          )}
        </div>

        {/* Practice Mode Lives & Combo Multiplier */}
        <div className="flex items-center gap-3">
          {mode === 'practice' && (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-concrete rounded-xl border-2 border-ink">
              <span className="text-xs font-mono font-bold text-ink/70 uppercase mr-1">
                {t.livesLabel}:
              </span>
              <span className="text-2xl tracking-widest">
                {lives > 0 ? '❤️'.repeat(lives) : '💔'}
              </span>
            </div>
          )}

          {combo > 1 && (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-act/20 text-ink rounded-xl border-2 border-act animate-pulse font-heading text-lg font-bold">
              <span>🔥</span>
              <span>×{combo} {t.comboLabel}</span>
            </div>
          )}
        </div>
      </div>

      {/* Signature Pallet Progress Bar */}
      <PalletProgressBar
        totalSlots={pack.steps.length}
        currentIndex={currentStepIndex}
        results={evaluations}
      />

      {/* Active Step Question & Interaction Container */}
      {currentStep && (
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
      )}
    </div>
  );
}
