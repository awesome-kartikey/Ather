import React, { useState, useEffect } from 'react';
import { Scan, PauseCircle, PlayCircle, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface Props {
  videoSrc?: string;
  isPaused: boolean;
  onPauseReached?: () => void;
}

export const HuScanAnimation: React.FC<Props> = ({
  videoSrc,
  isPaused,
  onPauseReached
}) => {
  const [videoAvailable, setVideoAvailable] = useState<boolean>(Boolean(videoSrc));

  useEffect(() => {
    setVideoAvailable(Boolean(videoSrc));
  }, [videoSrc]);
  const [hasTriggeredPause, setHasTriggeredPause] = useState(false);

  useEffect(() => {
    if (!hasTriggeredPause && !isPaused) {
      const timer = setTimeout(() => {
        setHasTriggeredPause(true);
        if (onPauseReached) onPauseReached();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [hasTriggeredPause, isPaused, onPauseReached]);

  return (
    <div className="relative w-full h-[280px] sm:h-[360px] md:h-[400px] bg-slate-950 rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-slate-800 shadow-2xl select-none flex flex-col justify-between">
      {/* Optional Real Video Player with Auto Fallback */}
      {videoSrc && videoAvailable && (
        <video
          src={videoSrc}
          autoPlay
          loop={!isPaused}
          muted
          playsInline
          onError={() => setVideoAvailable(false)}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      )}

      {/* Procedural SVG/CSS Handling Unit Scan Canvas */}
      <div className="absolute inset-0 w-full h-full overflow-hidden p-3 sm:p-5 flex flex-col justify-between">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 opacity-95" />

        <svg
          viewBox="0 0 1000 400"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full absolute inset-0 pointer-events-none"
        >
          {/* Warehouse Background Wall & Dock Roll-up Doors */}
          <rect x="0" y="0" width="1000" height="240" fill="#0f172a" />
          <line x1="0" y1="240" x2="1000" y2="240" stroke="#1e293b" strokeWidth="4" />

          {/* Staging Concrete Floor */}
          <polygon points="0,400 1000,400 850,240 150,240" fill="#1e293b" />
          <line x1="500" y1="240" x2="500" y2="400" stroke="#334155" strokeWidth="2" strokeDasharray="8 8" />
          {/* Yellow Staging Boundary Markings */}
          <polygon points="120,400 480,400 450,250 180,250" fill="#0f172a" stroke="#eab308" strokeWidth="2" strokeDasharray="12 8" />

          {/* LEFT: Wooden Pallet with Staged Blue FLC Crate */}
          <g transform="translate(160, 140)">
            {/* Wooden Base Pallet */}
            <rect x="0" y="160" width="280" height="24" rx="4" fill="#854d0e" stroke="#713f12" strokeWidth="2" />
            <rect x="25" y="184" width="45" height="16" fill="#713f12" />
            <rect x="115" y="184" width="50" height="16" fill="#713f12" />
            <rect x="210" y="184" width="45" height="16" fill="#713f12" />

            {/* Blue Heavy FLC Box */}
            <rect x="15" y="40" width="250" height="120" rx="8" fill="#1e40af" stroke="#3b82f6" strokeWidth="3" />
            <rect x="25" y="50" width="230" height="100" rx="6" fill="#1d4ed8" />

            {/* Front Label: Official Thermal GRN Sticker */}
            <g transform="translate(50, 65)">
              <rect x="0" y="0" width="180" height="72" rx="4" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.5" />
              <rect x="5" y="5" width="170" height="8" rx="2" fill="#0284c7" />
              <text x="90" y="24" fill="#0f172a" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                ATHER PLANT M002 · GRN-50029104
              </text>
              <text x="15" y="38" fill="#475569" fontSize="8" fontFamily="sans-serif">
                Part: Ather 450X Front Caliper
              </text>

              {/* Green QC Pass Stamp */}
              <g transform="translate(115, 30)">
                <rect x="0" y="0" width="56" height="20" rx="3" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5" />
                <text x="28" y="14" fill="#059669" fontSize="9" fontWeight="black" fontFamily="sans-serif" textAnchor="middle">
                  ✓ QC PASS
                </text>
              </g>

              {/* Pallet Handling Unit (HU) Barcode & Number */}
              <g transform="translate(15, 45)">
                {/* Visual Barcode Lines */}
                <rect x="0" y="0" width="90" height="14" fill="#0f172a" />
                <rect x="4" y="0" width="3" height="14" fill="#ffffff" />
                <rect x="10" y="0" width="2" height="14" fill="#ffffff" />
                <rect x="15" y="0" width="4" height="14" fill="#ffffff" />
                <rect x="23" y="0" width="2" height="14" fill="#ffffff" />
                <rect x="28" y="0" width="3" height="14" fill="#ffffff" />
                <rect x="35" y="0" width="5" height="14" fill="#ffffff" />
                <rect x="44" y="0" width="2" height="14" fill="#ffffff" />
                <rect x="52" y="0" width="4" height="14" fill="#ffffff" />
                <rect x="62" y="0" width="3" height="14" fill="#ffffff" />
                <rect x="70" y="0" width="2" height="14" fill="#ffffff" />
                <rect x="78" y="0" width="5" height="14" fill="#ffffff" />
                <text x="45" y="23" fill="#0f172a" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                  HU: 88204910
                </text>
              </g>
            </g>
          </g>

          {/* CENTER: Red Laser Scan Beam from Handheld Terminal */}
          <g transform="translate(560, 210)">
            {/* Rugged Handheld Scanner (HHD) */}
            <rect x="0" y="0" width="65" height="105" rx="10" fill="#0f172a" stroke="#475569" strokeWidth="2" />
            <rect x="8" y="10" width="49" height="50" rx="4" fill="#0284c7" fillOpacity="0.3" stroke="#38bdf8" strokeWidth="1" />
            <text x="32" y="30" fill="#38bdf8" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
              SAP EWM
            </text>
            <text x="32" y="44" fill="#ffffff" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
              SCAN HU
            </text>

            {/* Ergonomic Pistol Grip */}
            <path d="M 18,105 L 10,150 L 30,150 L 40,105 Z" fill="#1e293b" stroke="#334155" strokeWidth="1" />

            {/* Glowing Red Laser Beam projecting to HU label */}
            <polygon points="-5,25 -270,12 -270,22 -5,28" fill="#ef4444" fillOpacity="0.45" />
            <line x1="-5" y1="26" x2="-270" y2="17" stroke="#ef4444" strokeWidth="2.5" />
            {/* Laser reflection point on HU barcode */}
            <circle cx="-270" cy="17" r="4" fill="#fca5a5" />
          </g>

          {/* RIGHT: Generated SAP EWM Warehouse Task Screen HUD */}
          <g transform="translate(670, 70)">
            <rect x="0" y="0" width="300" height="240" rx="16" fill="#090d16" stroke="#3b82f6" strokeWidth="2" />
            {/* Header bar */}
            <rect x="0" y="0" width="300" height="38" rx="16" fill="#1e293b" />
            <rect x="0" y="24" width="300" height="14" fill="#1e293b" />
            <circle cx="20" cy="19" r="6" fill="#10b981" />
            <text x="36" y="23" fill="#ffffff" fontSize="11" fontWeight="bold" fontFamily="monospace">
              SAP EWM · WH TASK OPENED
            </text>

            {/* Task Details */}
            <g transform="translate(20, 55)">
              <text x="0" y="15" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                TASK ID:
              </text>
              <text x="110" y="15" fill="#60a5fa" fontSize="12" fontWeight="bold" fontFamily="monospace">
                WT-882049-01
              </text>

              <text x="0" y="45" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                HU SCANNED:
              </text>
              <text x="110" y="45" fill="#34d399" fontSize="12" fontWeight="bold" fontFamily="monospace">
                HU: 88204910 [OK]
              </text>

              <text x="0" y="75" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                PUTAWAY TYPE:
              </text>
              <text x="110" y="75" fill="#fbbf24" fontSize="11" fontWeight="bold" fontFamily="monospace">
                HIGH RISE RACK (HRR)
              </text>

              <text x="0" y="105" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                TARGET BIN:
              </text>
              <rect x="105" y="90" width="130" height="24" rx="4" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="1" />
              <text x="170" y="106" fill="#ffffff" fontSize="12" fontWeight="black" fontFamily="monospace" textAnchor="middle">
                HRR-B-04-12
              </text>

              <text x="0" y="135" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                MATERIAL:
              </text>
              <text x="110" y="135" fill="#e2e8f0" fontSize="10" fontFamily="sans-serif">
                Ather 450X Front Caliper (100)
              </text>

              {/* Status footer pill */}
              <rect x="0" y="148" width="260" height="26" rx="6" fill="#064e3b" stroke="#059669" strokeWidth="1" />
              <text x="130" y="165" fill="#6ee7b7" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                READY FOR REACH-TRUCK MOVEMENT
              </text>
            </g>
          </g>
        </svg>

        {/* Top Floating Status Pill */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 backdrop-blur-md text-[11px] font-mono text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold tracking-wider uppercase">AURIC Plant M002 · Inbound Staging</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 backdrop-blur-md text-[11px] font-mono text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>SOP 03_C1_S3 Clause 4.1</span>
          </div>
        </div>

        {/* Bottom Floating Visual Guide Pill */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-300 bg-slate-900/85 px-3 py-1.5 rounded-xl border border-slate-800">
            <div className="flex items-center gap-1.5 text-blue-400">
              <Scan className="w-3.5 h-3.5" />
              <span>Step 1: Scan HU Label</span>
            </div>
            <span>→</span>
            <div className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Step 2: SAP WH Task Opens</span>
            </div>
          </div>

          {isPaused ? (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/50 text-amber-300 text-xs font-mono font-bold animate-pulse">
              <PauseCircle className="w-3.5 h-3.5" />
              <span>SOP Mandatory Scan Point</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 text-xs font-mono font-bold">
              <PlayCircle className="w-3.5 h-3.5" />
              <span>Scanning HU Barcode</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
