import type { MascotPose } from './types';

/**
 * Canonical registry of clean, production-ready asset URLs for Ather AURIC Training PWA.
 * Strictly adheres to web-safe URL standards (zero spaces, zero percent encodings, zero ampersands).
 */

// 1. AURA Mascot Expressive Character Renders (PNG)
export const MASCOT_IMAGE_MAP: Record<MascotPose, string> = {
  neutral: '/Assets/Mascot/mascot_neutral.png',
  explaining: '/Assets/Mascot/mascot_explaining.png',
  thinking: '/Assets/Mascot/mascot_thinking.png',
  success: '/Assets/Mascot/mascot_success.png',
  warning: '/Assets/Mascot/mascot_warning.png',
  trophy: '/Assets/Mascot/mascot_trophy.png',
};

// 2. Eight Sequential Real-World HD Operational Videos & Keyframe Posters
export interface SequentialSceneMedia {
  videoSrc: string;
  posterSrc: string;
  altPosterSrc?: string;
  altPoster2Src?: string;
  title: string;
}

export const SEQUENTIAL_SCENES_MEDIA: Record<number, SequentialSceneMedia> = {
  1: {
    videoSrc: '/Assets/videos/scene_01_gate_arrival.mp4',
    posterSrc: '/Assets/videos/scene_01_gate_arrival_poster.jpg',
    title: 'Inbound Truck Gate Arrival & Waiting Yard',
  },
  2: {
    videoSrc: '/Assets/videos/scene_02_wheel_chock_safety.mp4',
    posterSrc: '/Assets/videos/scene_02_wheel_chock_safety_poster.jpg',
    altPosterSrc: '/Assets/videos/scene_02_wheel_chock_safety_alt.jpg',
    title: 'Loading Dock 04 & Wheel Chock Placement',
  },
  3: {
    videoSrc: '/Assets/videos/scene_03_iqc_inspection_split.mp4',
    posterSrc: '/Assets/videos/scene_03_iqc_inspection_split_poster.jpg',
    altPosterSrc: '/Assets/videos/scene_03_iqc_inspection_split_alt.jpg',
    title: 'Unloading & 10% Statistical IQC Inspection Split',
  },
  4: {
    videoSrc: '/Assets/videos/scene_04_high_rise_pallet_putaway.mp4',
    posterSrc: '/Assets/videos/scene_04_high_rise_pallet_putaway_poster.jpg',
    title: 'Forklift High-Rise Rack Placement & Scan',
  },
  5: {
    videoSrc: '/Assets/videos/scene_05_battery_vault_climate.mp4',
    posterSrc: '/Assets/videos/scene_05_battery_vault_climate_poster.jpg',
    altPosterSrc: '/Assets/videos/scene_05_battery_vault_climate_alt.jpg',
    title: 'Battery Cell Vault & Climate Inspection',
  },
  6: {
    videoSrc: '/Assets/videos/scene_06_bulk_decanting_trolley.mp4',
    posterSrc: '/Assets/videos/scene_06_bulk_decanting_trolley_poster.jpg',
    altPosterSrc: '/Assets/videos/scene_06_bulk_decanting_trolley_alt.jpg',
    title: 'Bulk Decanting (FLC to Assembly Trolley)',
  },
  7: {
    videoSrc: '/Assets/videos/scene_07_milk_run_delivery.mp4',
    posterSrc: '/Assets/videos/scene_07_milk_run_delivery_poster.jpg',
    altPosterSrc: '/Assets/videos/scene_07_milk_run_delivery_alt.jpg',
    title: 'Milk Run Line Delivery & Station Drop-off',
  },
  8: {
    videoSrc: '/Assets/videos/scene_08_empty_bin_strapping.mp4',
    posterSrc: '/Assets/videos/scene_08_empty_bin_strapping_poster.jpg',
    altPosterSrc: '/Assets/videos/scene_08_empty_bin_strapping_alt1.jpg',
    altPoster2Src: '/Assets/videos/scene_08_empty_bin_strapping_alt2.jpg',
    title: 'Empty Bin Stacking & Strapping',
  },
};

// 3. Physical Warehouse Prop Cutouts (PNG)
export const PROP_IMAGE_MAP = {
  ewayBillTablet: '/Assets/Props/prop_eway_bill_tablet.png',
  qcPassStamp: '/Assets/Props/prop_qc_pass_stamp.png',
  rubberWheelChock: '/Assets/Props/prop_rubber_wheel_chock.png',
  hhtScanner: '/Assets/Props/prop_hht_scanner.png',
  ratchetStrappingBelt: '/Assets/Props/prop_ratchet_strapping_belt.png',
  ngRejectedTag: '/Assets/Props/prop_ng_rejected_tag.png',
  warningConesIqc: '/Assets/Props/prop_warning_cones_iqc.png',
  windshieldBarcodePass: '/Assets/Props/prop_windshield_barcode_pass.png',
} as const;

export type PropKey = keyof typeof PROP_IMAGE_MAP;

// 4. Authentic Facility Backgrounds (JPG)
export const BACKGROUND_IMAGE_MAP = {
  plantMapHotspot: '/Assets/environments/bg_plant_map_hotspot.jpg',
  deoGateOffice: '/Assets/environments/bg_deo_gate_office.jpg',
  chemicalBuilding: '/Assets/environments/bg_chemical_building.jpg',
  supermarketSm: '/Assets/environments/bg_supermarket_sm.jpg',
  ngQuarantineArea: '/Assets/environments/bg_ng_quarantine_area.jpg',
  finalScrapyard: '/Assets/environments/bg_final_scrapyard.jpg',
  indirectMaterialStore: '/Assets/environments/bg_indirect_material_store.jpg',
} as const;

export type BackgroundKey = keyof typeof BACKGROUND_IMAGE_MAP;

/**
 * Helper to auto-resolve appropriate floor prop for interaction cards.
 */
export function resolvePropForQuestion(questionId?: string, questionText?: string): string | undefined {
  const text = ((questionId || '') + ' ' + (questionText || '')).toLowerCase();

  if (text.includes('chock') || text.includes('wheel') || text.includes('q5')) {
    return PROP_IMAGE_MAP.rubberWheelChock;
  }
  if (text.includes('e-way') || text.includes('eway') || text.includes('invoice') || text.includes('tablet')) {
    return PROP_IMAGE_MAP.ewayBillTablet;
  }
  if (text.includes('qc pass') || text.includes('stamp') || text.includes('green seal') || text.includes('green tag')) {
    return PROP_IMAGE_MAP.qcPassStamp;
  }
  if (text.includes('hht') || text.includes('scanner') || text.includes('barcode scan') || text.includes('rf terminal')) {
    return PROP_IMAGE_MAP.hhtScanner;
  }
  if (text.includes('strap') || text.includes('belt') || text.includes('ratchet') || text.includes('5-foot')) {
    return PROP_IMAGE_MAP.ratchetStrappingBelt;
  }
  if (text.includes('ng tag') || text.includes('red tag') || text.includes('rejection') || text.includes('quarantine')) {
    return PROP_IMAGE_MAP.ngRejectedTag;
  }
  if (text.includes('cone') || text.includes('demarcation') || text.includes('under iqc') || text.includes('yellow cone')) {
    return PROP_IMAGE_MAP.warningConesIqc;
  }
  if (text.includes('gate pass') || text.includes('windshield') || text.includes('driver pass') || text.includes('adhesive')) {
    return PROP_IMAGE_MAP.windshieldBarcodePass;
  }

  return undefined;
}
