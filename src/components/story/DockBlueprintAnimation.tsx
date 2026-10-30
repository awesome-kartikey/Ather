import React, { useState, useEffect } from 'react';
import { MapPin, PauseCircle, PlayCircle, Compass, Layers } from 'lucide-react';

interface Props {
  videoSrc?: string;
  isPaused: boolean;
  onPauseReached?: () => void;
}

export const DockBlueprintAnimation: React.FC<Props> = ({
  videoSrc,
  isPaused,
  onPauseReached
}) => {
  const [videoAvailable, setVideoAvailable] = useState<boolean>(false);
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

      {/* Procedural CAD Blueprint Plant Layout Canvas */}
      <div className="absolute inset-0 w-full h-full overflow-hidden p-3 sm:p-5 flex flex-col justify-between">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 opacity-95" />

        <svg
          viewBox="0 0 1000 400"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full absolute inset-0 pointer-events-none"
        >
          {/* Blueprint Background Grid */}
          <defs>
            <pattern id="cadGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <rect width="40" height="40" fill="none" stroke="#0f172a" strokeWidth="1" />
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.8" opacity="0.6" />
            </pattern>
          </defs>
          <rect width="1000" height="400" fill="url(#cadGrid)" />

          {/* Plant Outline Perimeter Wall */}
          <rect x="50" y="30" width="900" height="340" rx="16" fill="none" stroke="#334155" strokeWidth="3" />
          <text x="70" y="55" fill="#64748b" fontSize="11" fontWeight="bold" fontFamily="monospace">
            ATHER ENERGY · AURIC MEGA-FACTORY PLANT M002 · SAMBHAJINAGAR
          </text>

          {/* Inbound Gate 01 Checkpoint (Bottom Left) */}
          <g transform="translate(80, 290)">
            <rect x="0" y="0" width="120" height="60" rx="6" fill="#0284c7" opacity="0.2" stroke="#0284c7" strokeWidth="1.5" />
            <text x="60" y="26" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              GATE 01
            </text>
            <text x="60" y="44" fill="#94a3b8" fontSize="8" textAnchor="middle" fontFamily="monospace">
              WAITING YARD
            </text>
          </g>

          {/* Dashed Vehicle Routing Track from Gate 01 to Bay B (Dock 04) */}
          <path
            d="M 200 320 L 420 320 L 420 180 L 520 180"
            fill="none"
            stroke="#10b981"
            strokeWidth="3"
            strokeDasharray="8,6"
            className="animate-pulse"
          />

          {/* Bay A: Battery Cell Vault (Top Left) */}
          <g transform="translate(180, 70)">
            <rect x="0" y="0" width="220" height="130" rx="10" fill="#0369a1" opacity="0.15" stroke="#0284c7" strokeWidth="2" />
            <rect x="10" y="10" width="200" height="24" rx="4" fill="#075985" />
            <text x="110" y="26" fill="#e0f2fe" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              BAY A: BATTERY VAULT
            </text>
            <text x="110" y="55" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              DOCK 01 · CLEANROOM
            </text>
            <text x="110" y="75" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="monospace">
              20°C–25°C · 60%–65% RH
            </text>
            <rect x="25" y="90" width="170" height="26" rx="4" fill="#082f49" stroke="#0369a1" />
            <text x="110" y="107" fill="#bae6fd" fontSize="9" textAnchor="middle" fontFamily="monospace">
              [RESTRICTED CARGO ONLY]
            </text>
          </g>

          {/* Bay B: Vehicle Assembly Parts (Center - Allocated Target!) */}
          <g transform="translate(440, 70)">
            <rect
              x="0"
              y="0"
              width="260"
              height="150"
              rx="12"
              fill="#065f46"
              opacity="0.25"
              stroke="#10b981"
              strokeWidth="3"
              className="drop-shadow-lg"
            />
            <rect x="12" y="10" width="236" height="28" rx="4" fill="#047857" />
            <text x="130" y="28" fill="#ecfdf5" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              BAY B: VEHICLE INBOUND (ALLOCATED)
            </text>
            <text x="130" y="65" fill="#34d399" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              DOCK 04
            </text>
            <text x="130" y="86" fill="#a7f3d0" fontSize="10" textAnchor="middle" fontFamily="monospace">
              MECHANICAL &amp; CHASSIS SUB-ASSEMBLY
            </text>
            {/* Animated Target Ping Badge */}
            <g transform="translate(130, 118)">
              <rect x="-85" y="-12" width="170" height="24" rx="4" fill="#064e3b" stroke="#34d399" strokeWidth="1.5" />
              <circle cx="-65" cy="0" r="4" fill="#34d399" className="animate-ping" />
              <text x="5" y="4" fill="#6ee7b7" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                YMM_DOCK_ALLOCATE
              </text>
            </g>
          </g>

          {/* Bay C: Chemical Annex (Isolated Separate Building - Top Right) */}
          <g transform="translate(740, 70)">
            <rect x="0" y="0" width="190" height="130" rx="10" fill="#78350f" opacity="0.2" stroke="#d97706" strokeWidth="2" />
            <rect x="10" y="10" width="170" height="24" rx="4" fill="#92400e" />
            <text x="95" y="26" fill="#fef3c7" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              CHEMICAL ANNEX
            </text>
            <text x="95" y="55" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              DOCK 06
            </text>
            <text x="95" y="75" fill="#fde68a" fontSize="9" textAnchor="middle" fontFamily="monospace">
              PAINTS, THINNERS &amp; SOLVENTS
            </text>
            <rect x="15" y="90" width="160" height="26" rx="4" fill="#451a03" stroke="#b45309" />
            <text x="95" y="107" fill="#fef08a" fontSize="9" textAnchor="middle" fontFamily="monospace">
              [ISOLATED HAZARD ZONE]
            </text>
          </g>
        </svg>
      </div>

      {/* Top Telemetry Overlay */}
      <div className="relative z-10 p-3 sm:p-4 flex items-center justify-between bg-gradient-to-b from-slate-950/80 to-transparent">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
            CAM-05 · AURIC INBOUND BAY LOGISTICS OVERVIEW
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
              <span>Allocating Bay</span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Scene Situation Card */}
      <div className="relative z-10 px-4 py-3 bg-slate-950/90 border-t border-slate-800/90 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 shrink-0">
            <Compass className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
              Live Factory Situation
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-200">
              {isPaused
                ? 'Select the authorized warehouse dock for vehicle mechanical components.'
                : 'DEO executes YMM_DOCK_ALLOCATE to match truck commodity with open dock...'}
            </div>
          </div>
        </div>

        <div className="text-right hidden sm:flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs font-mono">
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            <span>COMMODITY: CHASSIS PARTS</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400 text-xs font-mono">
            <MapPin className="w-3.5 h-3.5 text-sky-400" />
            <span>M002 · INBOUND B</span>
          </div>
        </div>
      </div>
    </div>
  );
};
