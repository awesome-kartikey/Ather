import React, { useState, useEffect } from 'react';
import { AlertOctagon, PauseCircle, PlayCircle, ShieldAlert } from 'lucide-react';

interface Props {
  videoSrc?: string;
  isPaused: boolean;
  onPauseReached?: () => void;
}

export const DockSafetyAnimation: React.FC<Props> = ({
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

      {/* Procedural SVG/CSS Dock Safety Audit Canvas */}
      <div className="absolute inset-0 w-full h-full overflow-hidden p-3 sm:p-5 flex flex-col justify-between">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 opacity-95" />

        <svg
          viewBox="0 0 1000 400"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full absolute inset-0 pointer-events-none"
        >
          {/* Warehouse Exterior Concrete Wall & Bay Door */}
          <rect x="0" y="0" width="1000" height="280" fill="#1e293b" opacity="0.6" />
          <line x1="0" y1="280" x2="1000" y2="280" stroke="#475569" strokeWidth="4" />

          {/* Dock Door 04 Frame (Raised Roll-up Door) */}
          <g transform="translate(680, 20)">
            <rect x="0" y="0" width="260" height="260" fill="#0f172a" stroke="#64748b" strokeWidth="4" />
            <rect x="10" y="10" width="240" height="40" fill="#334155" />
            {/* Roll-up slats */}
            <line x1="10" y1="20" x2="250" y2="20" stroke="#475569" strokeWidth="2" />
            <line x1="10" y1="30" x2="250" y2="30" stroke="#475569" strokeWidth="2" />
            <line x1="10" y1="40" x2="250" y2="40" stroke="#475569" strokeWidth="2" />
            {/* Dock 04 Sign */}
            <rect x="70" y="-12" width="120" height="24" rx="4" fill="#047857" stroke="#10b981" />
            <text x="130" y="4" fill="#ecfdf5" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              DOCK 04 · BAY B
            </text>

            {/* Rubber Dock Bumpers (Compliant flush) */}
            <rect x="-16" y="120" width="16" height="80" rx="3" fill="#020617" stroke="#475569" strokeWidth="2" />
            <rect x="260" y="120" width="16" height="80" rx="3" fill="#020617" stroke="#475569" strokeWidth="2" />
          </g>

          {/* Commercial Cargo Truck Backed in at Dock 04 */}
          <g transform="translate(180, 100)">
            {/* Trailer Body */}
            <rect x="100" y="0" width="410" height="180" rx="6" fill="#f8fafc" stroke="#334155" strokeWidth="3" />
            {/* Ather AURIC Branding on trailer */}
            <rect x="200" y="50" width="200" height="40" rx="6" fill="#0f172a" />
            <text x="300" y="75" fill="#34d399" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              ATHER AURIC
            </text>
            <text x="300" y="110" fill="#64748b" fontSize="10" textAnchor="middle" fontFamily="monospace">
              LOGISTICS FLEET · M002
            </text>

            {/* Front Driver Cab */}
            <path d="M0 70 L100 70 L100 180 L0 180 Z" fill="#0284c7" stroke="#0369a1" strokeWidth="2" />
            <rect x="10" y="80" width="40" height="35" rx="4" fill="#bae6fd" stroke="#0284c7" />
            <text x="45" y="140" fill="#e0f2fe" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              ENGINE OFF
            </text>

            {/* Front Wheel */}
            <circle cx="50" cy="195" r="24" fill="#0f172a" stroke="#475569" strokeWidth="4" />
            <circle cx="50" cy="195" r="8" fill="#94a3b8" />

            {/* Rear Dual Wheels (Crucial Focus Point) */}
            <circle cx="440" cy="195" r="28" fill="#0f172a" stroke="#475569" strokeWidth="5" />
            <circle cx="440" cy="195" r="10" fill="#94a3b8" />

            <circle cx="370" cy="195" r="28" fill="#0f172a" stroke="#475569" strokeWidth="5" />
            <circle cx="370" cy="195" r="10" fill="#94a3b8" />

            {/* Asphalt Ground Line */}
            <line x1="-150" y1="223" x2="600" y2="223" stroke="#cbd5e1" strokeWidth="4" />

            {/* Pulsing Hazard Strobe Box Around Missing Wheel Chocks */}
            <g transform="translate(330, 185)">
              <rect
                x="-10"
                y="0"
                width="170"
                height="45"
                rx="6"
                fill="none"
                stroke="#ef4444"
                strokeWidth="3"
                strokeDasharray="6,4"
                className="animate-pulse"
              />
              {/* Alert Callout Arrow */}
              <polygon points="75,45 85,60 65,60" fill="#ef4444" />
              <rect x="0" y="60" width="150" height="24" rx="4" fill="#b91c1c" />
              <text x="75" y="76" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                ⚠️ NO CHOCKS DETECTED!
              </text>
            </g>
          </g>
        </svg>
      </div>

      {/* Top Telemetry Overlay */}
      <div className="relative z-10 p-3 sm:p-4 flex items-center justify-between bg-gradient-to-b from-slate-950/80 to-transparent">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400">
            CAM-06 · INBOUND BAY B · DOCK 04 SAFETY AUDIT
          </span>
        </div>

        {/* Live Status Badge */}
        <div className="flex items-center gap-2">
          {isPaused ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/60 text-rose-300 text-xs font-mono font-bold uppercase tracking-wide">
              <PauseCircle className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
              <span>Safety Audit Paused</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/60 text-blue-300 text-xs font-mono font-bold uppercase tracking-wide">
              <PlayCircle className="w-3.5 h-3.5 text-blue-400" />
              <span>Inspecting Dock</span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Scene Situation Card */}
      <div className="relative z-10 px-4 py-3 bg-slate-950/90 border-t border-slate-800/90 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 shrink-0">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
              Live Factory Situation
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-200">
              {isPaused
                ? 'CRITICAL SAFETY GATE: Spot the violation before accepting keys and beginning unloading.'
                : 'Truck reverses into Dock 04 rubber bumpers. Operator initiates mandatory pre-unload audit...'}
            </div>
          </div>
        </div>

        <div className="text-right hidden sm:flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-rose-400 text-xs font-mono font-bold">
            <AlertOctagon className="w-3.5 h-3.5 text-rose-500" />
            <span>SOP 4.1.5 MANDATORY</span>
          </div>
        </div>
      </div>
    </div>
  );
};
