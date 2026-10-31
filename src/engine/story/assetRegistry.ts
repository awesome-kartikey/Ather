import type { MascotPose } from './types';

/**
 * Canonical registry of clean, production-ready asset URLs for Ather AURIC Training PWA.
 * Strictly adheres to web-safe URL standards (no spaces, hashes, or special characters).
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
    videoSrc: '/Assets/8%20Sequential%20Scenes/1%20Inbound%20Truck%20Gate%20Arrival/scene_01_gate_arrival.mp4',
    posterSrc: '/Assets/8%20Sequential%20Scenes/1%20Inbound%20Truck%20Gate%20Arrival/scene_01_gate_arrival_poster.jpg',
    title: 'Inbound Truck Gate Arrival & Waiting Yard',
  },
  2: {
    videoSrc: '/Assets/8%20Sequential%20Scenes/2%20Loading%20Dock%20%26%20Wheel%20Chock%20Safety/scene_02_wheel_chock_safety.mp4',
    posterSrc: '/Assets/8%20Sequential%20Scenes/2%20Loading%20Dock%20%26%20Wheel%20Chock%20Safety/scene_02_wheel_chock_safety_poster.jpg',
    altPosterSrc: '/Assets/8%20Sequential%20Scenes/2%20Loading%20Dock%20%26%20Wheel%20Chock%20Safety/scene_02_wheel_chock_safety_alt.jpg',
    title: 'Loading Dock 04 & Wheel Chock Placement',
  },
  3: {
    videoSrc: '/Assets/8%20Sequential%20Scenes/3%20Unloading%20%26%2010%25%20IQC%20Inspection%20Split/scene_03_iqc_inspection_split.mp4',
    posterSrc: '/Assets/8%20Sequential%20Scenes/3%20Unloading%20%26%2010%25%20IQC%20Inspection%20Split/scene_03_iqc_inspection_split_poster.jpg',
    altPosterSrc: '/Assets/8%20Sequential%20Scenes/3%20Unloading%20%26%2010%25%20IQC%20Inspection%20Split/scene_03_iqc_inspection_split_alt.jpg',
    title: 'Unloading & 10% Statistical IQC Inspection Split',
  },
  4: {
    videoSrc: '/Assets/8%20Sequential%20Scenes/4%20Forklift%20High-Rise%20Rack%20Placement%20%26%20Scan/scene_04_high_rise_pallet_putaway.mp4',
    posterSrc: '/Assets/8%20Sequential%20Scenes/4%20Forklift%20High-Rise%20Rack%20Placement%20%26%20Scan/scene_04_high_rise_pallet_putaway_poster.jpg',
    title: 'Forklift High-Rise Rack Placement & Scan',
  },
  5: {
    videoSrc: '/Assets/8%20Sequential%20Scenes/5%20Battery%20Cell%20Vault%20%26%20Climate%20Inspection/scene_05_battery_vault_climate.mp4',
    posterSrc: '/Assets/8%20Sequential%20Scenes/5%20Battery%20Cell%20Vault%20%26%20Climate%20Inspection/scene_05_battery_vault_climate_poster.jpg',
    altPosterSrc: '/Assets/8%20Sequential%20Scenes/5%20Battery%20Cell%20Vault%20%26%20Climate%20Inspection/scene_05_battery_vault_climate_alt.jpg',
    title: 'Battery Cell Vault & Climate Inspection',
  },
  6: {
    videoSrc: '/Assets/8%20Sequential%20Scenes/6%20Bulk%20Decanting%20(FLC%20to%20Assembly%20Trolley)/scene_06_bulk_decanting_trolley.mp4',
    posterSrc: '/Assets/8%20Sequential%20Scenes/6%20Bulk%20Decanting%20(FLC%20to%20Assembly%20Trolley)/scene_06_bulk_decanting_trolley_poster.jpg',
    altPosterSrc: '/Assets/8%20Sequential%20Scenes/6%20Bulk%20Decanting%20(FLC%20to%20Assembly%20Trolley)/scene_06_bulk_decanting_trolley_alt.jpg',
    title: 'Bulk Decanting (FLC to Assembly Trolley)',
  },
  7: {
    videoSrc: '/Assets/8%20Sequential%20Scenes/7%20Milk%20Run%20Line%20Delivery%20%26%20Station%20Drop-off/scene_07_milk_run_delivery.mp4',
    posterSrc: '/Assets/8%20Sequential%20Scenes/7%20Milk%20Run%20Line%20Delivery%20%26%20Station%20Drop-off/scene_07_milk_run_delivery_poster.jpg',
    altPosterSrc: '/Assets/8%20Sequential%20Scenes/7%20Milk%20Run%20Line%20Delivery%20%26%20Station%20Drop-off/scene_07_milk_run_delivery_alt.jpg',
    title: 'Milk Run Line Delivery & Station Drop-off',
  },
  8: {
    videoSrc: '/Assets/8%20Sequential%20Scenes/8%20Empty%20Bin%20Stacking%20%26%20Strapping/scene_08_empty_bin_strapping.mp4',
    posterSrc: '/Assets/8%20Sequential%20Scenes/8%20Empty%20Bin%20Stacking%20%26%20Strapping/scene_08_empty_bin_strapping_poster.jpg',
    altPosterSrc: '/Assets/8%20Sequential%20Scenes/8%20Empty%20Bin%20Stacking%20%26%20Strapping/scene_08_empty_bin_strapping_alt1.jpg',
    altPoster2Src: '/Assets/8%20Sequential%20Scenes/8%20Empty%20Bin%20Stacking%20%26%20Strapping/scene_08_empty_bin_strapping_alt2.jpg',
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
  plantMapHotspot: '/Assets/Background%20Environments/bg_plant_map_hotspot.jpg',
  deoGateOffice: '/Assets/Background%20Environments/bg_deo_gate_office.jpg',
  chemicalBuilding: '/Assets/Background%20Environments/bg_chemical_building.jpg',
  supermarketSm: '/Assets/Background%20Environments/bg_supermarket_sm.jpg',
  ngQuarantineArea: '/Assets/Background%20Environments/bg_ng_quarantine_area.jpg',
  finalScrapyard: '/Assets/Background%20Environments/bg_final_scrapyard.jpg',
  indirectMaterialStore: '/Assets/Background%20Environments/bg_indirect_material_store.jpg',
} as const;

export type BackgroundKey = keyof typeof BACKGROUND_IMAGE_MAP;

// 5. Neerja Spoken Voiceover Path Helper
export const getVoiceoverNeerjaUrl = (trackId: string): string => {
  return `/audio/voiceover_neerja/${trackId}.mp3`;
};

// 6. Corporate Branding Logo
export const BRAND_LOGOS = {
  tetrahedronSvg: '/logo/Tetrahedron-logo-transparent.svg',
} as const;

// 7. Contextual Prop Resolver (Auto-associates high-res PNG props with question scenarios)
export function resolvePropForQuestion(qId?: string, text?: string): string | null {
  const combined = `${qId || ''} ${text || ''}`.toLowerCase();
  if (combined.includes('e-way') || combined.includes('eway') || combined.includes('tablet') || combined.includes('gst')) {
    return PROP_IMAGE_MAP.ewayBillTablet;
  }
  if (combined.includes('qc pass') || combined.includes('green seal') || combined.includes('qc sticker') || combined.includes('pass sticker')) {
    return PROP_IMAGE_MAP.qcPassStamp;
  }
  if (combined.includes('chock') || combined.includes('wheel')) {
    return PROP_IMAGE_MAP.rubberWheelChock;
  }
  if (combined.includes('hht') || combined.includes('rf terminal') || combined.includes('scanner') || combined.includes('hu barcode')) {
    return PROP_IMAGE_MAP.hhtScanner;
  }
  if (combined.includes('strap') || combined.includes('ratchet') || combined.includes('belt')) {
    return PROP_IMAGE_MAP.ratchetStrappingBelt;
  }
  if (combined.includes('red tag') || combined.includes('rejection') || combined.includes('rejected') || combined.includes('quarantine')) {
    return PROP_IMAGE_MAP.ngRejectedTag;
  }
  if (combined.includes('cone') || combined.includes('iqc hold') || combined.includes('under iqc')) {
    return PROP_IMAGE_MAP.warningConesIqc;
  }
  if (combined.includes('barcode pass') || combined.includes('windshield') || combined.includes('gate pass')) {
    return PROP_IMAGE_MAP.windshieldBarcodePass;
  }
  return null;
}
