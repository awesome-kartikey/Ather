import React, { useState, useEffect } from 'react';
import { ShieldAlert, LogOut, PauseCircle, PlayCircle } from 'lucide-react';

interface Props {
  videoSrc?: string;
  isPaused: boolean;
  onPauseReached?: () => void;
}

export const ExitGatehouseAnimation: React.FC<Props> = ({
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

      {/* Procedural SVG/CSS Exit Gatehouse Canvas */}
      <div className="absolute inset-0 w-full h-full overflow-hidden p-3 sm:p-5 flex flex-col justify-between">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 opacity-95" />

        <svg
          viewBox="0 0 1000 400"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full absolute inset-0 pointer-events-none"
        >
          {/* Sky & Distant Plant Boundary */}
          <rect x="0" y="0" width="1000" height="240" fill="#0f172a" />
          <line x1="0" y1="240" x2="1000" y2="240" stroke="#334155" strokeWidth="4" />

          {/* Plant Perimeter Fence */}
          <line x1="0" y1="180" x2="1000" y2="180" stroke="#1e293b" strokeWidth="2" strokeDasharray="10 6" />
          <line x1="0" y1="210" x2="1000" y2="210" stroke="#1e293b" strokeWidth="2" strokeDasharray="10 6" />

          {/* Outbound Roadway & Lane Markings */}
          <polygon points="120,400 880,400 700,240 300,240" fill="#1e293b" />
          <line x1="500" y1="240" x2="500" y2="400" stroke="#e2e8f0" strokeWidth="4" strokeDasharray="20 16" />
          <line x1="330" y1="240" x2="180" y2="400" stroke="#fbbf24" strokeWidth="3" />
          <line x1="670" y1="240" x2="820" y2="400" stroke="#fbbf24" strokeWidth="3" />

          {/* Security Gatehouse Cabin (Right Side) */}
          <g transform="translate(620, 110)">
            {/* Concrete Base & Cabin Building */}
            <rect x="0" y="0" width="220" height="150" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="3" />
            <rect x="10" y="10" width="200" height="25" rx="3" fill="#0f172a" />
            <text x="110" y="27" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              AURIC GATE 01 · SECURITY & DEO
            </text>

            {/* Glass Windows */}
            <rect x="15" y="45" width="85" height="55" rx="4" fill="#0284c7" fillOpacity="0.25" stroke="#38bdf8" strokeWidth="2" />
            <rect x="115" y="45" width="85" height="55" rx="4" fill="#0284c7" fillOpacity="0.25" stroke="#38bdf8" strokeWidth="2" />
            <text x="57" y="78" fill="#bae6fd" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              SECURITY
            </text>
            <text x="157" y="78" fill="#a7f3d0" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              DEO DESK
            </text>

            {/* DEO Terminal Screen: YMM_GATE_EXIT */}
            <rect x="125" y="105" width="70" height="35" rx="3" fill="#020617" stroke="#334155" />
            <text x="160" y="120" fill="#fbbf24" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              YMM_GATE_EXIT
            </text>
            <text x="160" y="132" fill="#ef4444" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              STATUS: PENDING DC
            </text>

            {/* Boom Barrier Support Post */}
            <rect x="-30" y="50" width="24" height="110" rx="4" fill="#334155" stroke="#64748b" strokeWidth="2" />
            <circle cx="-18" cy="70" r="8" fill="#ef4444" className="animate-pulse" />
          </g>

          {/* Locked Red Boom Barrier Arm (Extends across the road) */}
          <g transform="translate(380, 180)">
            <rect x="0" y="0" width="220" height="14" rx="3" fill="#ef4444" stroke="#991b1b" strokeWidth="2" />
            {/* White reflective stripes on barrier arm */}
            <rect x="25" y="1" width="20" height="12" fill="#ffffff" />
            <rect x="65" y="1" width="20" height="12" fill="#ffffff" />
            <rect x="105" y="1" width="20" height="12" fill="#ffffff" />
            <rect x="145" y="1" width="20" height="12" fill="#ffffff" />
            <rect x="185" y="1" width="20" height="12" fill="#ffffff" />
            {/* Red Stop Roundel */}
            <circle cx="110" cy="7" r="16" fill="#ef4444" stroke="#ffffff" strokeWidth="3" />
            <text x="110" y="11" fill="#ffffff" fontSize="9" fontWeight="extrabold" textAnchor="middle" fontFamily="monospace">
              STOP
            </text>
          </g>

          {/* Outbound Commercial Cargo Truck (Loaded with Empty Blue FLC Bins) */}
          <g transform="translate(180, 150)">
            {/* Rear of Cargo Bed */}
            <rect x="50" y="30" width="200" height="140" rx="6" fill="#334155" stroke="#475569" strokeWidth="3" />

            {/* Stacked Empty Foldable Large Containers (FLCs) - Blue with Ather branding */}
            <g transform="translate(60, 45)">
              {/* Bottom Layer FLCs */}
              <rect x="0" y="55" width="85" height="30" rx="3" fill="#1e40af" stroke="#60a5fa" strokeWidth="2" />
              <text x="42" y="73" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                FLC-01 [EMPTY]
              </text>
              <rect x="95" y="55" width="85" height="30" rx="3" fill="#1e40af" stroke="#60a5fa" strokeWidth="2" />
              <text x="137" y="73" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                FLC-02 [EMPTY]
              </text>

              {/* Top Layer FLCs */}
              <rect x="0" y="15" width="85" height="30" rx="3" fill="#1e40af" stroke="#60a5fa" strokeWidth="2" />
              <text x="42" y="33" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                FLC-03 [EMPTY]
              </text>
              <rect x="95" y="15" width="85" height="30" rx="3" fill="#1e40af" stroke="#60a5fa" strokeWidth="2" />
              <text x="137" y="33" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                FLC-04 [EMPTY]
              </text>

              {/* Tied Tie-down Belts */}
              <line x1="42" y1="10" x2="42" y2="88" stroke="#f59e0b" strokeWidth="2" />
              <line x1="137" y1="10" x2="137" y2="88" stroke="#f59e0b" strokeWidth="2" />
            </g>

            {/* Truck Rear Taillights */}
            <circle cx="65" cy="155" r="7" fill="#ef4444" stroke="#7f1d1d" strokeWidth="2" />
            <circle cx="235" cy="155" r="7" fill="#ef4444" stroke="#7f1d1d" strokeWidth="2" />
            <rect x="120" y="148" width="60" height="16" rx="2" fill="#facc15" stroke="#854d0e" />
            <text x="150" y="160" fill="#0f172a" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              MH 20 DE 4419
            </text>

            {/* Truck Rear Tires */}
            <rect x="55" y="170" width="30" height="20" rx="4" fill="#020617" />
            <rect x="215" y="170" width="30" height="20" rx="4" fill="#020617" />
          </g>

          {/* Security Guard with Inspection Clipboard standing near gate */}
          <g transform="translate(540, 220)">
            {/* Guard Body */}
            <ellipse cx="20" cy="50" rx="14" ry="26" fill="#1e3a8a" stroke="#172554" strokeWidth="2" />
            {/* Security Vest with fluorescent stripes */}
            <rect x="9" y="32" width="22" height="24" rx="2" fill="#eab308" />
            <line x1="9" y1="42" x2="31" y2="42" stroke="#ffffff" strokeWidth="2" />
            {/* Head & Cap */}
            <circle cx="20" cy="16" r="10" fill="#fcd34d" />
            <path d="M10 16 Q20 8 30 16 L34 18 L6 18 Z" fill="#172554" />
            {/* Clipboard with Delivery Challan Checklist */}
            <rect x="30" y="36" width="16" height="22" rx="2" fill="#f8fafc" stroke="#475569" strokeWidth="1.5" />
            <line x1="33" y1="41" x2="43" y2="41" stroke="#ef4444" strokeWidth="1.5" />
            <line x1="33" y1="46" x2="41" y2="46" stroke="#475569" strokeWidth="1" />
            <line x1="33" y1="51" x2="43" y2="51" stroke="#475569" strokeWidth="1" />
            {/* Exclamation badge above guard */}
            <circle cx="44" cy="22" r="7" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
            <text x="44" y="26" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              ?
            </text>
          </g>
        </svg>

        {/* Top CCTV Overlay Badge */}
        <div className="relative z-10 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/60 text-xs font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            <span className="font-bold text-slate-200">AURIC CAM-04: OUTBOUND DEPARTURE GATE</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-3 py-1 rounded-full bg-rose-950/80 border border-rose-600/70 text-rose-300 font-mono text-[11px] font-bold flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
              <span>EXIT BARRIER: LOCKED</span>
            </div>
            <div className="px-3 py-1 rounded-full bg-blue-950/80 border border-blue-600/70 text-blue-300 font-mono text-[11px] font-bold flex items-center gap-1.5">
              <LogOut className="w-3.5 h-3.5 text-blue-400" />
              <span>YMM_GATE_EXIT PENDING</span>
            </div>
          </div>
        </div>

        {/* Bottom Playback & Pause Status Bar */}
        <div className="relative z-10 flex items-center justify-between text-xs font-mono text-slate-400 bg-slate-900/70 backdrop-blur-md p-2.5 rounded-xl border border-slate-800">
          <div className="flex items-center gap-2">
            {isPaused ? (
              <span className="flex items-center gap-1.5 text-amber-400 font-bold">
                <PauseCircle className="w-4 h-4" />
                <span>SOP PAUSE POINT · EXIT AUTHORIZATION REQUIRED</span>
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <PlayCircle className="w-4 h-4 animate-spin" />
                <span>OBSERVING PHYSICAL EXIT INSPECTION...</span>
              </span>
            )}
          </div>

          <div className="text-[11px] text-slate-400">
            Payload: <strong className="text-blue-300">20x Empty FLC Bins</strong> · Truck:{' '}
            <strong className="text-slate-200">MH-20-DE-4419</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
