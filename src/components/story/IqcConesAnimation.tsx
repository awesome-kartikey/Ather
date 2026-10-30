import React, { useState, useEffect } from 'react';
import { AlertTriangle, PauseCircle, PlayCircle, ShieldAlert } from 'lucide-react';

interface Props {
  videoSrc?: string;
  isPaused: boolean;
  onPauseReached?: () => void;
}

export const IqcConesAnimation: React.FC<Props> = ({
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

      {/* Procedural SVG/CSS Visual Quarantine Demarcation Canvas */}
      <div className="absolute inset-0 w-full h-full overflow-hidden p-3 sm:p-5 flex flex-col justify-between">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 opacity-95" />

        <svg
          viewBox="0 0 1000 400"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full absolute inset-0 pointer-events-none"
        >
          {/* Warehouse Polished Concrete Floor */}
          <rect x="0" y="0" width="1000" height="400" fill="#0f172a" />
          <line x1="0" y1="130" x2="1000" y2="130" stroke="#1e293b" strokeWidth="2" />
          <line x1="0" y1="270" x2="1000" y2="270" stroke="#1e293b" strokeWidth="2" />

          {/* Forklift in background gangway */}
          <g transform="translate(740, 50)" opacity="0.6">
            <rect x="0" y="20" width="80" height="45" rx="6" fill="#ca8a04" />
            <rect x="60" y="0" width="12" height="65" fill="#334155" />
            <rect x="68" y="5" width="20" height="6" fill="#64748b" />
            <circle cx="20" cy="65" r="10" fill="#020617" />
            <circle cx="65" cy="65" r="10" fill="#020617" />
            {/* Operator speech bubble */}
            <rect x="-90" y="-10" width="140" height="24" rx="4" fill="#1e293b" stroke="#ca8a04" strokeWidth="1.5" />
            <text x="-20" y="5" fill="#fef08a" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              YELLOW CONES = DO NOT MOVE!
            </text>
          </g>

          {/* Staging Bay Perimeter with Pulsing Quarantine Aura */}
          <g transform="translate(180, 50)">
            {/* Floor Boundary Box */}
            <rect
              x="0"
              y="0"
              width="500"
              height="280"
              rx="12"
              fill="#1e293b"
              fillOpacity="0.5"
              stroke="#eab308"
              strokeWidth="3.5"
              strokeDasharray="14 10"
              filter="drop-shadow(0 0 15px rgba(234, 179, 8, 0.25))"
            />
            <text x="250" y="26" fill="#eab308" fontSize="11" fontWeight="extrabold" textAnchor="middle" fontFamily="monospace">
              BAY 04 · QUALITY QUARANTINE BUFFER ZONE
            </text>

            {/* 3x3 Grid of 9 Staged FLC Crates */}
            <g transform="translate(35, 45)">
              {[
                { x: 0, y: 0, id: 1 },
                { x: 150, y: 0, id: 2 },
                { x: 300, y: 0, id: 3 },
                { x: 0, y: 70, id: 4 },
                { x: 150, y: 70, id: 5 },
                { x: 300, y: 70, id: 6 },
                { x: 0, y: 140, id: 7 },
                { x: 150, y: 140, id: 8 },
                { x: 300, y: 140, id: 9 }
              ].map((crate) => (
                <g key={crate.id} transform={`translate(${crate.x}, ${crate.y})`}>
                  <rect x="0" y="0" width="130" height="55" rx="5" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="2" />
                  <line x1="0" y1="28" x2="130" y2="28" stroke="#1d4ed8" strokeWidth="1.5" />
                  <text x="65" y="20" fill="#bae6fd" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                    FLC CRATE #{crate.id}
                  </text>
                  <text x="65" y="44" fill="#93c5fd" fontSize="8" fontWeight="medium" textAnchor="middle" fontFamily="monospace">
                    BRK-CAL-450 [WAIT]
                  </text>
                </g>
              ))}
            </g>

            {/* 4 High-Visibility Yellow Industrial "UNDER IQC" Quarantine Cones */}
            {/* Top-Left Cone */}
            <g transform="translate(-15, -15)">
              <polygon points="15,0 0,40 30,40" fill="#eab308" stroke="#ca8a04" strokeWidth="2" />
              <rect x="0" y="38" width="30" height="6" rx="1.5" fill="#ca8a04" />
              <polygon points="12,12 8,24 22,24 18,12" fill="#ffffff" />
              <circle cx="15" cy="8" r="4" fill="#ef4444" className="animate-ping" />
            </g>

            {/* Top-Right Cone */}
            <g transform="translate(485, -15)">
              <polygon points="15,0 0,40 30,40" fill="#eab308" stroke="#ca8a04" strokeWidth="2" />
              <rect x="0" y="38" width="30" height="6" rx="1.5" fill="#ca8a04" />
              <polygon points="12,12 8,24 22,24 18,12" fill="#ffffff" />
              <circle cx="15" cy="8" r="4" fill="#ef4444" className="animate-ping" />
            </g>

            {/* Bottom-Left Cone */}
            <g transform="translate(-15, 255)">
              <polygon points="15,0 0,40 30,40" fill="#eab308" stroke="#ca8a04" strokeWidth="2" />
              <rect x="0" y="38" width="30" height="6" rx="1.5" fill="#ca8a04" />
              <polygon points="12,12 8,24 22,24 18,12" fill="#ffffff" />
              <circle cx="15" cy="8" r="4" fill="#ef4444" className="animate-ping" />
            </g>

            {/* Bottom-Right Cone */}
            <g transform="translate(485, 255)">
              <polygon points="15,0 0,40 30,40" fill="#eab308" stroke="#ca8a04" strokeWidth="2" />
              <rect x="0" y="38" width="30" height="6" rx="1.5" fill="#ca8a04" />
              <polygon points="12,12 8,24 22,24 18,12" fill="#ffffff" />
              <circle cx="15" cy="8" r="4" fill="#ef4444" className="animate-ping" />
            </g>
          </g>

          {/* Large High-Detail Zoom of the Yellow "UNDER IQC" Cone */}
          <g transform="translate(730, 160)">
            <rect x="0" y="0" width="220" height="170" rx="10" fill="#1e293b" stroke="#eab308" strokeWidth="2" />
            <text x="110" y="24" fill="#fef08a" fontSize="10" fontWeight="extrabold" textAnchor="middle" fontFamily="monospace">
              MANDATORY VISUAL PROP
            </text>

            {/* Large Yellow Cone drawing */}
            <g transform="translate(85, 40)">
              <polygon points="25,0 0,85 50,85" fill="#eab308" stroke="#ca8a04" strokeWidth="2.5" />
              <rect x="-8" y="82" width="66" height="12" rx="3" fill="#ca8a04" />
              {/* White Reflective Band with text */}
              <polygon points="19,25 11,55 39,55 31,25" fill="#ffffff" />
              <text x="25" y="44" fill="#0f172a" fontSize="7" fontWeight="black" textAnchor="middle" fontFamily="monospace">
                UNDER IQC
              </text>
            </g>

            <text x="110" y="152" fill="#cbd5e1" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              Yellow "UNDER IQC" Cones
            </text>
          </g>
        </svg>

        {/* Top CCTV Overlay Badge */}
        <div className="relative z-10 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/60 text-xs font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span className="font-bold text-slate-200">AURIC CAM-08: INBOUND STAGING BAY 04</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-3 py-1 rounded-full bg-amber-950/80 border border-amber-600/70 text-amber-300 font-mono text-[11px] font-bold flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>9 FLCs IN ACTIVE BUFFER</span>
            </div>
            <div className="px-3 py-1 rounded-full bg-blue-950/80 border border-blue-600/70 text-blue-300 font-mono text-[11px] font-bold flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-blue-400" />
              <span>SLA: 2-HR TESTING WINDOW</span>
            </div>
          </div>
        </div>

        {/* Bottom Playback & Pause Status Bar */}
        <div className="relative z-10 flex items-center justify-between text-xs font-mono text-slate-400 bg-slate-900/70 backdrop-blur-md p-2.5 rounded-xl border border-slate-800">
          <div className="flex items-center gap-2">
            {isPaused ? (
              <span className="flex items-center gap-1.5 text-amber-400 font-bold">
                <PauseCircle className="w-4 h-4" />
                <span>SOP PAUSE POINT · VISUAL CONTAINMENT REQUIRED</span>
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <PlayCircle className="w-4 h-4 animate-spin" />
                <span>DEMARCATING STAGING BUFFER AREA...</span>
              </span>
            )}
          </div>

          <div className="text-[11px] text-slate-400">
            Containment: <strong className="text-amber-300">4x Yellow "UNDER IQC" Cones</strong> · Bay:{' '}
            <strong className="text-slate-200">Dock 04</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
