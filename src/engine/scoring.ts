import type { StepEvaluation, TrainingMode, BadgeId } from './types';

export function calculateStepXp(
  ok: boolean,
  currentCombo: number,
  timeTakenMs: number
): { xp: number; speedBonus: boolean } {
  if (!ok) return { xp: 0, speedBonus: false };

  const base = 10;
  const comboBonus = Math.min(Math.max(currentCombo - 1, 0), 4) * 2;
  const speedBonus = timeTakenMs < 12000;
  const total = base + comboBonus + (speedBonus ? 5 : 0);

  return { xp: total, speedBonus };
}

export function evaluateRun(
  evaluations: StepEvaluation[],
  mode: TrainingMode,
  lost: boolean,
  maxCombo: number,
  accumulatedStepXp: number
): {
  stars: number;
  accuracyPct: number;
  safetyPassed: boolean;
  totalXp: number;
  badges: BadgeId[];
} {
  const total = evaluations.length;
  if (total === 0) {
    return {
      stars: 0,
      accuracyPct: 0,
      safetyPassed: false,
      totalXp: 0,
      badges: []
    };
  }

  const correct = evaluations.filter((e) => e.ok).length;
  const accuracyPct = Math.round((correct / total) * 100);

  // Safety failed if any safety-flagged step was answered incorrectly
  const safetyFailed = evaluations.some((e) => e.isSafety && !e.ok);
  const safetyPassed = !safetyFailed;

  let stars = 0;
  if (lost) {
    stars = 0;
  } else if (accuracyPct >= 90 && safetyPassed) {
    stars = 3;
  } else if (accuracyPct >= 70) {
    stars = 2;
  } else {
    stars = 1;
  }

  const completionBonus = stars * 20;
  const totalXp = accumulatedStepXp + completionBonus;

  // Eye count: correct answers on hotspot or spot-error steps
  const eyeCount = evaluations.filter((e) => e.isEyeTest && e.ok).length;

  const badges: BadgeId[] = [];
  if (!lost) {
    if (safetyPassed) badges.push('safe');
    if (accuracyPct === 100) badges.push('perf');
    if (eyeCount >= 2) badges.push('eye');
    if (maxCombo >= 5) badges.push('cmb');
    if (stars === 3 && mode === 'practice') badges.push('cert');
  }

  return {
    stars,
    accuracyPct,
    safetyPassed,
    totalXp,
    badges
  };
}

export function calculateNewStreak(lastActiveDate: string, currentStreak: number): number {
  const today = new Date().toISOString().slice(0, 10);
  if (!lastActiveDate) return 1;
  if (lastActiveDate === today) return currentStreak || 1;

  const yesterdayDate = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  if (lastActiveDate === yesterdayDate) {
    return (currentStreak || 0) + 1;
  }

  return 1;
}
