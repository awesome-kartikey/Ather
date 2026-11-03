import React, { useState, useEffect } from 'react';
import { Printer, PauseCircle, PlayCircle, Barcode, Tv } from 'lucide-react';

interface Props {
  videoSrc?: string;
  isPaused: boolean;
  onPauseReached?: () => void;
}

export const ThermalPrinterAnimation: React.FC<Props> = ({
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
    <div className="relative w-full h-full min-h-0 bg-slate-950 rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-slate-800 shadow-2xl select-none flex flex-col justify-between">
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

      {/* Procedural SVG/CSS Thermal Printer & Lounge Canvas */}
      <div className="absolute inset-0 w-full h-full overflow-hidden p-3 sm:p-5 flex flex-col justify-between">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 opacity-95" />

        <svg
          viewBox="0 0 1000 400"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full absolute inset-0 pointer-events-none"
        >
          {/* Back Wall with Industrial Soundproofing Tiles */}
          <rect x="0" y="0" width="1000" height="260" fill="#1e293b" opacity="0.6" />
          <line x1="500" y1="20" x2="500" y2="280" stroke="#475569" strokeWidth="4" />

          {/* Left Side: Industrial Zebra Thermal Barcode Printer Workstation */}
          <g transform="translate(60, 60)">
            {/* Workstation Table */}
            <rect x="0" y="160" width="380" height="150" rx="8" fill="#334155" stroke="#64748b" strokeWidth="2" />
            <rect x="-10" y="145" width="400" height="20" rx="4" fill="#0f172a" />

            {/* Industrial Thermal Printer Chassis */}
            <rect x="80" y="30" width="220" height="130" rx="12" fill="#1e293b" stroke="#0ea5e9" strokeWidth="2" />
            <rect x="100" y="45" width="180" height="25" rx="4" fill="#020617" />
            <text x="190" y="62" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              ZEBRA ZT411 · YPR_GATEENTRY
            </text>

            {/* Dispensing Slot */}
            <rect x="110" y="105" width="160" height="12" rx="3" fill="#020617" stroke="#475569" />

            {/* Dispensing Printed Barcode Sticker Pass */}
            <g transform="translate(125, 115)">
              <rect
                x="0"
                y="0"
                width="130"
                height="75"
                rx="4"
                fill="#ffffff"
                stroke="#cbd5e1"
                strokeWidth="1.5"
                className="drop-shadow-lg"
              />
              {/* Header on sticker */}
              <rect x="5" y="4" width="120" height="12" fill="#0f172a" rx="2" />
              <text x="65" y="13" fill="#34d399" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                ATHER AURIC · GATE PASS
              </text>
              {/* Barcode Lines SVG simulation */}
              <g transform="translate(15, 20)">
                <line x1="0" y1="0" x2="0" y2="22" stroke="#000000" strokeWidth="2" />
                <line x1="4" y1="0" x2="4" y2="22" stroke="#000000" strokeWidth="1" />
                <line x1="8" y1="0" x2="8" y2="22" stroke="#000000" strokeWidth="3" />
                <line x1="14" y1="0" x2="14" y2="22" stroke="#000000" strokeWidth="1.5" />
                <line x1="18" y1="0" x2="18" y2="22" stroke="#000000" strokeWidth="2" />
                <line x1="24" y1="0" x2="24" y2="22" stroke="#000000" strokeWidth="3" />
                <line x1="30" y1="0" x2="30" y2="22" stroke="#000000" strokeWidth="1" />
                <line x1="34" y1="0" x2="34" y2="22" stroke="#000000" strokeWidth="2.5" />
                <line x1="40" y1="0" x2="40" y2="22" stroke="#000000" strokeWidth="1.5" />
                <line x1="46" y1="0" x2="46" y2="22" stroke="#000000" strokeWidth="3" />
                <line x1="52" y1="0" x2="52" y2="22" stroke="#000000" strokeWidth="1" />
                <line x1="58" y1="0" x2="58" y2="22" stroke="#000000" strokeWidth="2" />
                <line x1="64" y1="0" x2="64" y2="22" stroke="#000000" strokeWidth="3.5" />
                <line x1="72" y1="0" x2="72" y2="22" stroke="#000000" strokeWidth="1.5" />
                <line x1="78" y1="0" x2="78" y2="22" stroke="#000000" strokeWidth="2" />
                <line x1="84" y1="0" x2="84" y2="22" stroke="#000000" strokeWidth="3" />
                <line x1="92" y1="0" x2="92" y2="22" stroke="#000000" strokeWidth="1" />
                <line x1="98" y1="0" x2="98" y2="22" stroke="#000000" strokeWidth="2.5" />
              </g>
              {/* Pass Number */}
              <text x="65" y="52" fill="#0f172a" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                GE-AURIC-2026-0842
              </text>
              <text x="65" y="66" fill="#0284c7" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                BAY B · DOCK 04
              </text>
            </g>

            {/* Glowing Laser Scanline across sticker */}
            <line x1="120" y1="145" x2="260" y2="145" stroke="#ef4444" strokeWidth="2" className="animate-pulse" />
          </g>

          {/* Right Side: Driver Waiting Lounge & Live Departure-Style TV Screen */}
          <g transform="translate(560, 40)">
            {/* TV Enclosure */}
            <rect x="0" y="0" width="380" height="210" rx="10" fill="#020617" stroke="#3b82f6" strokeWidth="3" />
            <rect x="15" y="15" width="350" height="30" rx="4" fill="#1e3a8a" />
            <text x="190" y="34" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              DRIVER WAITING LOUNGE · GATE STATUS
            </text>

            {/* Live TV Truck Status Grid */}
            <g transform="translate(25, 60)">
              {/* Row 1: Ready to Dock */}
              <rect x="0" y="0" width="330" height="32" rx="4" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
              <text x="15" y="20" fill="#ffffff" fontSize="11" fontWeight="bold" fontFamily="monospace">
                MH-20-DE-4412
              </text>
              <text x="140" y="20" fill="#6ee7b7" fontSize="10" fontFamily="monospace">
                DOCK 04 (BAY B)
              </text>
              <text x="250" y="20" fill="#a7f3d0" fontSize="10" fontWeight="bold" fontFamily="monospace">
                [PASS READY]
              </text>

              {/* Row 2: In Process */}
              <rect x="0" y="40" width="330" height="32" rx="4" fill="#1e293b" />
              <text x="15" y="60" fill="#94a3b8" fontSize="11" fontFamily="monospace">
                KA-01-AG-8802
              </text>
              <text x="140" y="60" fill="#38bdf8" fontSize="10" fontFamily="monospace">
                DEO WINDOW
              </text>
              <text x="250" y="60" fill="#facc15" fontSize="10" fontFamily="monospace">
                [PROCESSING]
              </text>

              {/* Row 3: Docked */}
              <rect x="0" y="80" width="330" height="32" rx="4" fill="#1e293b" />
              <text x="15" y="100" fill="#94a3b8" fontSize="11" fontFamily="monospace">
                MH-14-BT-9100
              </text>
              <text x="140" y="100" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                DOCK 01 (CELLS)
              </text>
              <text x="250" y="100" fill="#38bdf8" fontSize="10" fontFamily="monospace">
                [UNLOADING]
              </text>
            </g>

            {/* Waiting Lounge Sofa Silhouette */}
            <path d="M40 290 L340 290 L340 330 L40 330 Z" fill="#334155" />
          </g>
        </svg>
      </div>

      {/* Top Telemetry Overlay */}
      <div className="relative z-10 p-3 sm:p-4 flex items-center justify-between bg-gradient-to-b from-slate-950/80 to-transparent">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
            CAM-04 · GATE CABIN PRINTER & WAITING LOUNGE
          </span>
        </div>

        {/* Live Status Badge */}
        <div className="flex items-center gap-2">
          {isPaused ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/60 text-amber-300 text-xs font-mono font-bold uppercase tracking-wide">
              <PauseCircle className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>SOP Pause Point</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/60 text-emerald-300 text-xs font-mono font-bold uppercase tracking-wide">
              <PlayCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Printing Pass</span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Scene Situation Card */}
      <div className="relative z-10 px-4 py-3 bg-slate-950/90 border-t border-slate-800/90 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 shrink-0">
            <Printer className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
              Live Factory Situation
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-200">
              {isPaused
                ? 'Barcode sticker generated. Arrange the driver journey in proper SOP chronological sequence.'
                : 'DEO executes YPR_GATEENTRY to print vehicle windshield barcode identification sticker...'}
            </div>
          </div>
        </div>

        <div className="text-right hidden sm:flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs font-mono">
            <Barcode className="w-3.5 h-3.5 text-sky-400" />
            <span>GE-AURIC-0842</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400 text-xs font-mono">
            <Tv className="w-3.5 h-3.5 text-emerald-400" />
            <span>STATUS: PASS READY</span>
          </div>
        </div>
      </div>
    </div>
  );
};
