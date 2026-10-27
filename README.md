# Floor Trainer — Ather Energy

A self-learning, offline-first gamified training Progressive Web App (PWA) designed for blue-collar warehouse operators at **Ather Energy's Chhatrapati Sambhajinagar plant** on landscape Android tablets.

---

## 🎯 Key Capabilities

* **Two Training Modules:**
  1. **Receiving & Put-Away (`rec`):** PPE, delivery challan verification, damaged carton inspection, missing label detection, physical count verification, barcode match simulation, and hazardous battery storage.
  2. **Order Picking & Packaging (`pick`):** Pick list reading, bin location verification, barcode verification, FIFO lot rotation, ESD component protection, tray quantity inspection, and handover sign-off.
* **Trilingual Offline Support:** Complete support for **English**, **Hindi (हिन्दी)**, and **Marathi (मराठी)**.
* **7 Specialized Interactive Step Types:**
  - `choice`: Shuffled icon-and-label selection.
  - `hotspot`: Percentage-based visual inspection over illustrations/photos.
  - `spotError`: Finding deliberate mistakes in challans or trays.
  - `dragDrop`: Touch drag & drop with tap-to-place fallback.
  - `scanSim`: Simulated digital scanner gun with barcode matching.
  - `sequence`: Chronological ordering with tap-to-add and tap-to-remove.
  - `count`: Physical pile counting with high-contrast `[-]` and `[+]` steppers.
* **Pedagogical Progression:** Watch Animated Demo ➔ Guided Mode (Hints ON) ➔ Practice Mode (3 Lives, Mistakes cost lives) ➔ Prove (3 Stars earn Certificate).
* **Gamification Engine:**
  - XP Formulas: `10 + min(combo-1, 4) * 2` + `5` speed bonus (<12s) + run bonus (`stars * 20`).
  - 4 Level Tiers: Rookie (0 XP) ➔ Handler (60 XP) ➔ Specialist (150 XP) ➔ Floor Pro (300 XP).
  - 5 Badges: Safety Star (`safe`), Perfect Run (`perf`), Sharp Eye (`eye`), Combo x5 (`cmb`), Certified (`cert`).
  - Daily streak tracking and per-pack best star ratings.
  - Local tablet leaderboard (toggleable in Settings for HR privacy).
  - Printable Certificate with a supervisor sign-off line.
* **High-Contrast Factory Floor UX:**
  - Strict minimum **64px touch targets** for gloved hands.
  - High-contrast tokens: Ink `#14232b`, Concrete `#dfe5e8`, Card `#ffffff`, Safety Orange `#ee6a1f`, Go-Green `#1f8a4c`, Stop-Red `#d23b30`, Wood `#b88a55`.
  - Signature **pallet-slot progress bar**.
  - Local offline bundled fonts: **Barlow Condensed** for headings, **Noto Sans** and **Noto Sans Devanagari** for body text.
  - Audio synthesizer chimes (880 Hz success / 180 Hz failure) + voice narration with `speechSynthesis` fallback.
* **Offline-First Storage:** IndexedDB (`idb`) behind a clean `ProgressStore` interface so Firebase or an LMS can be plugged in later without altering screen code.

---

## 🛠️ Technology Stack

- **Framework:** React 19 + TypeScript (Strict)
- **Bundler:** Vite 8
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite` with `@theme` CSS variables)
- **Offline Fonts:** `@fontsource/barlow-condensed`, `@fontsource/noto-sans`, `@fontsource/noto-sans-devanagari`
- **PWA & Service Worker:** `vite-plugin-pwa` (Workbox offline cache)
- **Storage:** `idb` (IndexedDB with automatic localStorage fallback)
- **Audio:** Web Audio API synth + HTML5 Audio / SpeechSynthesis
- **Animation & Effects:** Pure CSS GPU Keyframes + `canvas-confetti`

---

## 🚀 Quick Start

### 1. Installation
```bash
# Clone the repository and install dependencies
pnpm install
```

### 2. Development Server
```bash
pnpm dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Validate Content Completeness
```bash
# Ensures every text field has complete {en, hi, mr} translations
pnpm run check:i18n
```

### 4. Production Build & Preview
```bash
# Type check and build standalone production bundle
pnpm build

# Preview production build locally
pnpm preview
```

---

## 📱 Android Tablet Deployment (Landscape)

Floor Trainer is designed for shared Android tablets mounted horizontally on training tables in the plant.

### Tablet Setup Steps:
1. Open Google Chrome on the Android tablet.
2. Navigate to the hosted URL or local plant network address.
3. Tap Chrome's menu (`⋮`) and select **"Add to Home screen"** or **"Install app"**.
4. Launch **Floor Trainer** from the tablet home screen. It will open in full-screen standalone landscape mode with the browser address bar hidden.
5. Once loaded once, the app is **100% functional offline**; workers can disconnect from Wi-Fi and continue practicing.
6. If the tablet is accidentally rotated into portrait mode, a friendly full-screen guard prompts the worker: *"Please rotate your tablet to landscape mode 🔄"*.

---

## 📂 Project Architecture

```
src/
├── content/                     # Scenario content packs (Data, not code)
│   ├── schema.ts                # TypeScript types & Zod contracts
│   ├── receiving.json           # Pack 1: Receiving & put-away SOP
│   └── picking.json             # Pack 2: Order picking & packaging SOP
├── engine/                      # Core simulation engine
│   ├── types.ts                 # RunSummary, StepEvaluation, Badges
│   ├── scoring.ts               # XP formulas, combos, star ratings
│   ├── gamification.ts          # 4 levels, 5 badges, level progression
│   └── sound.ts                 # Web Audio chimes + SpeechSynthesis voice-over
├── store/                       # Storage abstraction
│   ├── progressStore.ts         # ProgressStore interface
│   └── idbStore.ts              # IndexedDB implementation
├── i18n/                        # UI chrome strings
│   └── translations.ts          # English, Hindi, Marathi UI dictionaries
├── demos/                       # 600x270 animated vector SVG demos
│   ├── sceneKit.tsx             # Ground, Worker with PPE, Box, Pallet, Barcode
│   ├── receivingDemo.tsx        # 5 animated scenes for receiving
│   └── pickingDemo.tsx          # 5 animated scenes for picking
├── steps/                       # Step components (shared contract)
│   ├── StepContainer.tsx        # Layout wrapper (Question, Audio, Progress, Feedback)
│   ├── ChoiceStep.tsx           # Choice selection with shuffle
│   ├── HotspotStep.tsx          # Interactive image target tap
│   ├── SpotErrorStep.tsx        # Discrepancy spotter
│   ├── DragDropStep.tsx         # Pointer events drag & tap fallback
│   ├── ScanSimStep.tsx          # Simulated digital barcode scanner
│   ├── SequenceStep.tsx         # Chronological ordering
│   └── CountStepperStep.tsx     # Physical item pile count stepper
├── screens/                     # Application screens
│   ├── HomeScreen.tsx           # Name entry, level progress, packs, leaderboard
│   ├── DemoScreen.tsx           # Animated vector demo player
│   ├── RunScreen.tsx            # Active scenario run with lives HUD & pallet slots
│   ├── ResultScreen.tsx         # Stars, badges, safety alert, certificate CTA
│   ├── CertificateScreen.tsx    # Printable qualification certificate
│   └── SettingsModal.tsx        # Mute, Leaderboard toggle, CSV/JSON supervisor export
├── components/                  # Shared UI components
│   ├── Header.tsx               # Brand, mode toggle, language switcher, fullscreen
│   ├── PalletProgressBar.tsx    # Signature pallet-slot progress visualizer
│   └── OrientationGuard.tsx     # Android portrait orientation guard
├── App.tsx                      # Root controller
└── index.css                    # Tailwind v4 theme, tokens & CSS keyframes
```

---

## 📝 Content Authoring

To update or add SOPs without modifying code, refer to [`docs/content-authoring-guide.md`](docs/content-authoring-guide.md).

---

## 🔒 Supervisor & Admin Controls

Click the **Gear icon (⚙️)** in the top header to access:
- **Leaderboard Visibility Toggle:** Hide or show the top-5 leaderboard on shared tablets for worker privacy.
- **Sound & Vibration Controls:** Enable or mute synthesized beeps and haptics.
- **Supervisor Data Export:** Download all completed worker runs as a **CSV** or **JSON** file for plant records.
