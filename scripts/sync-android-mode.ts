import fs from 'node:fs';
import path from 'node:path';
import { Resvg } from '@resvg/resvg-js';

const mode = (process.argv[2] || process.env.CAPACITOR_APP_MODE || process.env.VITE_APP_MODE || 'receiving').toLowerCase();
const isPicking = mode === 'picking';

const appId = isPicking ? 'com.ather.warehouse.picking' : 'com.ather.warehouse.receiving';
const appName = isPicking ? 'Order Picking & Packaging' : 'Warehouse Receiving & Put-Away';

const rootDir = process.cwd();
const gradlePath = path.join(rootDir, 'android/app/build.gradle');
const stringsPath = path.join(rootDir, 'android/app/src/main/res/values/strings.xml');
const resDir = path.join(rootDir, 'android/app/src/main/res');

console.log(`========================================================`);
console.log(`[sync-android-mode] Syncing Android for mode: ${mode.toUpperCase()}`);
console.log(`  Package ID: ${appId}`);
console.log(`  App Name:   ${appName}`);
console.log(`========================================================`);

// 1. Update android/app/build.gradle applicationId
let gradleContent = fs.readFileSync(gradlePath, 'utf8');
gradleContent = gradleContent.replace(
  /applicationId\s+["'].*?["']/,
  `applicationId "${appId}"`
);
fs.writeFileSync(gradlePath, gradleContent, 'utf8');

// 2. Update android/app/src/main/res/values/strings.xml
const xmlEscapedAppName = appName.replace(/&/g, '&amp;');
const stringsContent = `<?xml version='1.0' encoding='utf-8'?>
<resources>
    <string name="app_name">${xmlEscapedAppName}</string>
    <string name="title_activity_main">${xmlEscapedAppName}</string>
    <string name="package_name">${appId}</string>
    <string name="custom_url_scheme">${appId}</string>
</resources>
`;
fs.writeFileSync(stringsPath, stringsContent, 'utf8');

// 3. Mipmap and Splash Screen Asset Generation
const MIPMAP_SIZES: Record<string, number> = {
  'mipmap-mdpi': 48,
  'mipmap-hdpi': 72,
  'mipmap-xhdpi': 96,
  'mipmap-xxhdpi': 144,
  'mipmap-xxxhdpi': 192,
};

const FOREGROUND_SIZES: Record<string, number> = {
  'mipmap-mdpi': 108,
  'mipmap-hdpi': 162,
  'mipmap-xhdpi': 216,
  'mipmap-xxhdpi': 324,
  'mipmap-xxxhdpi': 432,
};

const SPLASH_SIZES = [
  { folder: 'drawable', width: 480, height: 800, isLandscape: false },
  { folder: 'drawable-land-mdpi', width: 480, height: 320, isLandscape: true },
  { folder: 'drawable-land-hdpi', width: 800, height: 480, isLandscape: true },
  { folder: 'drawable-land-xhdpi', width: 1280, height: 720, isLandscape: true },
  { folder: 'drawable-land-xxhdpi', width: 1600, height: 960, isLandscape: true },
  { folder: 'drawable-land-xxxhdpi', width: 1920, height: 1080, isLandscape: true },
  { folder: 'drawable-port-mdpi', width: 320, height: 480, isLandscape: false },
  { folder: 'drawable-port-hdpi', width: 480, height: 800, isLandscape: false },
  { folder: 'drawable-port-xhdpi', width: 720, height: 1280, isLandscape: false },
  { folder: 'drawable-port-xxhdpi', width: 960, height: 1600, isLandscape: false },
  { folder: 'drawable-port-xxxhdpi', width: 1080, height: 1920, isLandscape: false },
];

function renderSvgToPng(svgStr: string, width: number): Buffer {
  const resvg = new Resvg(svgStr, { fitTo: { mode: 'width', value: width } });
  return resvg.render().asPng();
}

const baseSvgPath = path.join(rootDir, isPicking ? 'public/icons/icon-picking.svg' : 'public/icons/icon-receiving.svg');
const baseSvgRaw = fs.readFileSync(baseSvgPath, 'utf8');

// Round icon SVG
const roundSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <clipPath id="circleClip">
      <circle cx="256" cy="256" r="256" />
    </clipPath>
  </defs>
  <g clip-path="url(#circleClip)">
    ${baseSvgRaw.replace(/<\?xml.*?\?>/g, '').replace(/<svg[^>]*>/, '').replace(/<\/svg>/, '')}
  </g>
</svg>
`;

// Adaptive Foreground SVG
const iconGraphic = isPicking
  ? `
    <!-- Picking Outbound Trolley & Carton -->
    <g transform="translate(256, 256) scale(1.15)">
      <circle cx="0" cy="0" r="115" fill="#0f172a" opacity="0.6" />
      <path d="M-80 0 L-50 0 L-20 60 L80 60" stroke="#93c5fd" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" fill="none" />
      <circle cx="-15" cy="85" r="18" fill="#38bdf8" />
      <circle cx="75" cy="85" r="18" fill="#38bdf8" />
      <rect x="-20" y="-30" width="100" height="80" rx="10" fill="#ffffff" />
      <path d="M-20 10 L80 10" stroke="#f59e0b" stroke-width="8" />
      <path d="M30 -30 L30 50" stroke="#f59e0b" stroke-width="8" />
      <path d="M10 -60 L75 -60" stroke="#38bdf8" stroke-width="14" stroke-linecap="round" />
      <path d="M55 -75 L75 -60 L55 -45" stroke="#38bdf8" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" fill="none" />
    </g>
  `
  : `
    <!-- Receiving Inbound Pallet & Cargo -->
    <g transform="translate(256, 256) scale(1.15)">
      <circle cx="0" cy="0" r="115" fill="#022c22" opacity="0.6" />
      <rect x="-90" y="55" width="180" height="16" rx="4" fill="#6ee7b7" />
      <rect x="-75" y="71" width="18" height="24" rx="3" fill="#34d399" />
      <rect x="57" y="71" width="18" height="24" rx="3" fill="#34d399" />
      <rect x="-50" y="-25" width="100" height="80" rx="10" fill="#f8fafc" />
      <path d="M-50 15 L50 15" stroke="#047857" stroke-width="6" stroke-dasharray="10 8" />
      <path d="M0 -25 L0 55" stroke="#047857" stroke-width="6" />
      <path d="M0 -75 L0 -35" stroke="#34d399" stroke-width="16" stroke-linecap="round" />
      <path d="M-22 -50 L0 -28 L22 -50" stroke="#34d399" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" fill="none" />
    </g>
  `;

const foregroundSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  ${iconGraphic}
</svg>
`;

// Render and save all mipmap launcher icons
for (const [folder, size] of Object.entries(MIPMAP_SIZES)) {
  const dir = path.join(resDir, folder);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const standardPng = renderSvgToPng(baseSvgRaw, size);
  fs.writeFileSync(path.join(dir, 'ic_launcher.png'), standardPng);

  const roundPng = renderSvgToPng(roundSvg, size);
  fs.writeFileSync(path.join(dir, 'ic_launcher_round.png'), roundPng);
}

// Render adaptive foreground icons
for (const [folder, size] of Object.entries(FOREGROUND_SIZES)) {
  const dir = path.join(resDir, folder);
  const fgPng = renderSvgToPng(foregroundSvg, size);
  fs.writeFileSync(path.join(dir, 'ic_launcher_foreground.png'), fgPng);
}

// Update adaptive background color
const bgColor = isPicking ? '#1e3a8a' : '#064e3b';
const bgXml = `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="ic_launcher_background">${bgColor}</color>
</resources>
`;
fs.writeFileSync(path.join(resDir, 'values/ic_launcher_background.xml'), bgXml, 'utf8');

// Splash Screen Generator Function
function getSplashSvg(modeName: string, width: number, height: number, isLandscape: boolean): string {
  const picking = modeName === 'picking';
  const title = picking ? 'ORDER PICKING &amp; PACKAGING' : 'WAREHOUSE RECEIVING &amp; PUT-AWAY';
  const accentColor = picking ? '#38bdf8' : '#34d399';
  const glowColor = picking ? '#2563eb' : '#059669';

  const cx = width / 2;
  const cy = height / 2 - 25;

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <defs>
        <radialGradient id="splashGlow" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stop-color="${glowColor}" stop-opacity="0.4" />
          <stop offset="100%" stop-color="#14232b" stop-opacity="1" />
        </radialGradient>
      </defs>
      
      <!-- Background -->
      <rect width="${width}" height="${height}" fill="#14232b" />
      <rect width="${width}" height="${height}" fill="url(#splashGlow)" />
      
      <!-- Icon Graphic -->
      <g transform="translate(${cx}, ${cy})">
        <circle cx="0" cy="0" r="95" fill="#0f172a" opacity="0.6" stroke="${accentColor}" stroke-width="3" />
        ${picking
          ? `
            <path d="M-60 0 L-40 0 L-15 45 L60 45" stroke="#93c5fd" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" fill="none" />
            <circle cx="-10" cy="65" r="14" fill="#38bdf8" />
            <circle cx="55" cy="65" r="14" fill="#38bdf8" />
            <rect x="-15" y="-25" width="75" height="60" rx="6" fill="#ffffff" />
            <path d="M-15 5 L60 5" stroke="#f59e0b" stroke-width="6" />
            <path d="M22 -25 L22 35" stroke="#f59e0b" stroke-width="6" />
            <path d="M10 -45 L55 -45" stroke="#38bdf8" stroke-width="10" stroke-linecap="round" />
            <path d="M42 -55 L55 -45 L42 -35" stroke="#38bdf8" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" fill="none" />
          `
          : `
            <rect x="-70" y="42" width="140" height="12" rx="3" fill="#6ee7b7" />
            <rect x="-58" y="54" width="14" height="18" rx="2" fill="#34d399" />
            <rect x="44" y="54" width="14" height="18" rx="2" fill="#34d399" />
            <rect x="-40" y="-20" width="80" height="62" rx="8" fill="#f8fafc" />
            <path d="M-40 10 L40 10" stroke="#047857" stroke-width="5" stroke-dasharray="8 6" />
            <path d="M0 -20 L0 42" stroke="#047857" stroke-width="5" />
            <path d="M0 -60 L0 -30" stroke="#34d399" stroke-width="12" stroke-linecap="round" />
            <path d="M-16 -42 L0 -26 L16 -42" stroke="#34d399" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" fill="none" />
          `}
      </g>
      
      <!-- Text Branding -->
      <g transform="translate(${cx}, ${cy + 130})" text-anchor="middle">
        <text y="0" font-family="system-ui, -apple-system, sans-serif" font-size="${isLandscape ? 24 : 20}" font-weight="900" fill="#ffffff" letter-spacing="2">
          ${title}
        </text>
        <text y="28" font-family="system-ui, -apple-system, sans-serif" font-size="${isLandscape ? 14 : 12}" font-weight="600" fill="${accentColor}" letter-spacing="3">
          ATHER ENERGY • AURIC MEGA-PLANT
        </text>
      </g>

      <!-- Bottom Co-Branding -->
      <g transform="translate(${cx}, ${height - 35})" text-anchor="middle">
        <text y="0" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="600" fill="#64748b" letter-spacing="1.5">
          TETRAHEDRON × ATHER ENERGY
        </text>
      </g>
    </svg>
  `;
}

// Render and save all splash screen variants
for (const splash of SPLASH_SIZES) {
  const dir = path.join(resDir, splash.folder);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const splashSvg = getSplashSvg(mode, splash.width, splash.height, splash.isLandscape);
  const splashPng = renderSvgToPng(splashSvg, splash.width);
  fs.writeFileSync(path.join(dir, 'splash.png'), splashPng);
}

console.log(`[sync-android-mode] Replaced all launcher icons & splash screens with ${mode.toUpperCase()} branding.`);
