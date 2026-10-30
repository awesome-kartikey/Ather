export type LanguageCode = 'en' | 'hi' | 'mr';

export interface LocalizedText {
  en: string;
  hi: string;
  mr: string;
}

export type MascotPose = 'neutral' | 'explaining' | 'thinking' | 'success' | 'warning' | 'trophy';

export interface MascotDialogue {
  pose: MascotPose;
  text: LocalizedText;
  audioSrc?: string;
}

export interface McqOption {
  id: string;
  correct: boolean;
  label: LocalizedText;
}

export interface McqInteraction {
  type: 'mcq';
  questionId: string;
  safetyCritical: boolean;
  question: LocalizedText;
  options: McqOption[];
}

export interface DropZone {
  id: string;
  icon: string;
  label: LocalizedText;
}

export interface DragItem {
  id: string;
  icon: string;
  label: LocalizedText;
  targetZoneId: string;
}

export interface DragDropInteraction {
  type: 'drag_drop';
  questionId: string;
  safetyCritical: boolean;
  question: LocalizedText;
  instruction: LocalizedText;
  zones: DropZone[];
  items: DragItem[];
}

export interface SequenceStepItem {
  id: string;
  icon: string;
  label: LocalizedText;
}

export interface SequenceInteraction {
  type: 'sequence';
  questionId: string;
  safetyCritical: boolean;
  question: LocalizedText;
  instruction?: LocalizedText;
  steps: SequenceStepItem[];
  correctOrder: string[];
}

export interface HotspotTarget {
  id: string;
  correct: boolean;
  label: LocalizedText;
  description?: LocalizedText;
}

export interface HotspotInteraction {
  type: 'hotspot';
  questionId: string;
  safetyCritical: boolean;
  question: LocalizedText;
  instruction?: LocalizedText;
  targets: HotspotTarget[];
}

export interface SpotErrorOption {
  id: string;
  isViolation: boolean;
  label: LocalizedText;
  description?: LocalizedText;
}

export interface SpotErrorInteraction {
  type: 'spot_error';
  questionId: string;
  safetyCritical: boolean;
  question: LocalizedText;
  instruction?: LocalizedText;
  options: SpotErrorOption[];
}

export type SceneInteraction = McqInteraction | DragDropInteraction | SequenceInteraction | HotspotInteraction | SpotErrorInteraction;

export interface SceneMedia {
  videoSrc?: string;
  posterSrc?: string;
  fallbackAnimation: string;
  durationSeconds: number;
  pauseAtSecond: number;
}

export interface SceneRules {
  xp: number;
  sopClause: string;
  why: LocalizedText;
}

export interface StoryScene {
  id: string;
  stepNumber: number;
  title: LocalizedText;
  media: SceneMedia;
  mascot: {
    intro: MascotDialogue;
    onCorrect: MascotDialogue;
    onIncorrect: MascotDialogue;
  };
  interaction: SceneInteraction;
  rules: SceneRules;
}

export interface StoryStage {
  stageId: string;
  category: number;
  stageNumber: number;
  sopDoc: string;
  stageTitle: LocalizedText;
  scenes: StoryScene[];
}

export interface PlayerScoreState {
  xp: number;
  hearts: number;
  correctCount: number;
  attemptsCount: number;
  completedScenes: string[];
}
