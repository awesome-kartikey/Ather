import type { StoryStage } from '../engine/story/types';
import rawStage1Data from './stories/c1_s1_gate_dock.json';
import rawStage2Data from './stories/c1_s2_iqc_clearance.json';
import rawStage3Data from './stories/c1_s3_putaway_parts.json';
import rawStage4Data from './stories/c1_s4_battery_cell.json';
import rawStage5Data from './stories/c1_s5_chemicals_thinners.json';
import rawStage6Data from './stories/c1_s6_supermarket_sm.json';
import rawStage7Data from './stories/c1_s7_quarantine_disposition.json';

/**
 * Category 1: Warehouse Receiving & Put-Away (Modules 1 - 7)
 * Standalone export designed for clean separation into App 1.
 */
export const category1Stages: StoryStage[] = [
  rawStage1Data as unknown as StoryStage,
  rawStage2Data as unknown as StoryStage,
  rawStage3Data as unknown as StoryStage,
  rawStage4Data as unknown as StoryStage,
  rawStage5Data as unknown as StoryStage,
  rawStage6Data as unknown as StoryStage,
  rawStage7Data as unknown as StoryStage
];
