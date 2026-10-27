export interface LocalizedString {
  en: string;
  hi: string;
  mr: string;
  reviewed?: boolean;
}

export type StepType =
  | 'choice'
  | 'hotspot'
  | 'spotError'
  | 'dragDrop'
  | 'scanSim'
  | 'sequence'
  | 'count';

export interface BaseStep {
  id: string;
  type: StepType;
  safety?: boolean;       // If true, missing this step blocks 3 stars and Safety Star badge
  placeholder?: boolean;  // True for placeholder SOPs until official Ather SOP is provided
  question: LocalizedString;
  explanation: LocalizedString; // Guidance explaining the floor protocol
  audioId?: string;       // Custom audio ID for /audio/<lang>/<audioId>.mp3
  image?: string;         // Visual illustration or photo reference
}

// 1. Choice step
export interface ChoiceOption {
  id: string;
  icon?: string;
  label: LocalizedString;
  correct: boolean;
  damaged?: boolean;      // For damaged box visual badge
}

export interface ChoiceStepData extends BaseStep {
  type: 'choice';
  layout?: 'grid' | 'stack';
  options: ChoiceOption[];
}

// 2. Hotspot step (Normalized percentage coordinates 0 - 100%)
export interface HotspotTarget {
  id: string;
  x: number;      // 0 - 100
  y: number;      // 0 - 100
  width: number;  // 0 - 100
  height: number; // 0 - 100
  label?: LocalizedString;
  correct: boolean;
}

export interface HotspotStepData extends BaseStep {
  type: 'hotspot';
  image: string;  // SVG vector scene ID or image path
  targets: HotspotTarget[];
}

// 3. Spot Error step (Finding discrepancies in documents, labels, or trays)
export interface SpotErrorOption {
  id: string;
  icon?: string;
  label: LocalizedString;
  isError: boolean;
  rect?: { x: number; y: number; width: number; height: number };
}

export interface SpotErrorStepData extends BaseStep {
  type: 'spotError';
  contextDocument?: LocalizedString;
  poBadge?: string;
  options: SpotErrorOption[];
}

// 4. Drag & Drop step
export interface DragItem {
  id: string;
  icon: string;
  label: LocalizedString;
  targetZoneId: string;
}

export interface DropZone {
  id: string;
  icon: string;
  label: LocalizedString;
}

export interface DragDropStepData extends BaseStep {
  type: 'dragDrop';
  instruction: LocalizedString;
  items: DragItem[];
  zones: DropZone[];
}

// 5. Scan Simulator step
export interface BarcodeOption {
  id: string;
  code: string;
  correct: boolean;
}

export interface ScanSimStepData extends BaseStep {
  type: 'scanSim';
  expectedCode: string;
  options: BarcodeOption[];
}

// 6. Sequence step
export interface SequenceItem {
  id: string;
  text: LocalizedString;
}

export interface SequenceStepData extends BaseStep {
  type: 'sequence';
  items: SequenceItem[]; // Items in their correct chronological sequence
}

// 7. Count Stepper step
export interface CountStepperStepData extends BaseStep {
  type: 'count';
  pileItemIcon: string;
  challanCount?: number;
  actualCount: number;
}

export type StepData =
  | ChoiceStepData
  | HotspotStepData
  | SpotErrorStepData
  | DragDropStepData
  | ScanSimStepData
  | SequenceStepData
  | CountStepperStepData;

export interface DemoSceneData {
  id: string;
  sceneKitId: string;
  caption: LocalizedString;
  durationMs?: number;
}

export interface TrainingPackData {
  id: string;
  icon: string;
  title: LocalizedString;
  description: LocalizedString;
  placeholder: boolean;
  demoScenes: DemoSceneData[];
  steps: StepData[];
}
