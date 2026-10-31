import type { StoryStage } from '../engine/story/types';
import rawStage8Data from './stories/c2_s8_order_picking.json';
import rawStage9Data from './stories/c2_s9_paint_decanting.json';
import rawStage10Data from './stories/c2_s10_indirect_material.json';
import rawStage11Data from './stories/c2_s11_pir_inspection.json';
import rawStage12Data from './stories/c2_s12_reverse_logistics.json';

/**
 * Category 2: Order Picking, Kitting & Line Feeding (Modules 8 - 12)
 * Standalone export designed for clean separation into App 2.
 */
export const category2Stages: StoryStage[] = [
  rawStage8Data as unknown as StoryStage,
  rawStage9Data as unknown as StoryStage,
  rawStage10Data as unknown as StoryStage,
  rawStage11Data as unknown as StoryStage,
  rawStage12Data as unknown as StoryStage
];
