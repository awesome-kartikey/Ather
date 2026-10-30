import React, { useState, useEffect } from 'react';
import { Clock, PauseCircle, PlayCircle, ShieldAlert } from 'lucide-react';

interface Props {
  videoSrc?: string;
  isPaused: boolean;
  onPauseReached?: () => void;
}

export const IqcHandoverSlaAnimation: React.FC<Props> = ({
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

      {/* Procedural SVG/CSS 30-Minute SLA Handover Canvas */}
      <div className="absolute inset-0 w-full h-full overflow-hidden p-3 sm:p-5 flex flex-col justify-between">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 opacity-95" />

        <svg
          viewBox="0 0 1000 400"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full absolute inset-0 pointer-events-none"
        >
          {/* Background Wall of IQC Testing Lab Airlock */}
          <rect x="0" y="0" width="1000" height="260" fill="#0f172a" />
          <line x1="0" y1="260" x2="1000" y2="260" stroke="#334155" strokeWidth="4" />
          {/* Floor grid */}
          <polygon points="50,400 950,400 780,260 220,260" fill="#1e293b" />
          <line x1="500" y1="260" x2="500" y2="400" stroke="#475569" strokeWidth="2" strokeDasharray="10 8" />

          {/* Central IQC Receiving Counter & Window */}
          <g transform="translate(380, 80)">
            {/* Window Frame */}
            <rect x="0" y="0" width="240" height="180" rx="8" fill="#1e293b" stroke="#0284c7" strokeWidth="3" />
            <rect x="10" y="10" width="220" height="130" rx="4" fill="#0284c7" fillOpacity="0.15" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="120" y="32" fill="#38bdf8" fontSize="11" fontWeight="extrabold" textAnchor="middle" fontFamily="monospace">
              IQC SAMPLE RECEIVING DESK
            </text>

            {/* Handover Hatch Door */}
            <rect x="30" y="50" width="180" height="90" rx="4" fill="#0f172a" stroke="#475569" />
            <line x1="120" y1="50" x2="120" y2="140" stroke="#334155" strokeWidth="2" />
            <circle cx="110" cy="95" r="4" fill="#94a3b8" />
            <circle cx="130" cy="95" r="4" fill="#94a3b8" />

            {/* Counter Surface */}
            <rect x="-20" y="145" width="280" height="35" rx="4" fill="#334155" stroke="#64748b" strokeWidth="2" />
            <text x="120" y="167" fill="#f8fafc" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              PHYSICAL HANDOVER HATCH
            </text>
          </g>

          {/* Big Digital Factory SLA Countdown Clock (Top Center) */}
          <g transform="translate(340, 15)">
            <rect x="0" y="0" width="320" height="50" rx="8" fill="#020617" stroke="#eab308" strokeWidth="2.5" />
            <text x="20" y="22" fill="#94a3b8" fontSize="9" fontWeight="bold" fontFamily="monospace">
              GRN ➔ IQC HANDOVER SLA
            </text>
            <text x="300" y="22" fill="#ef4444" fontSize="9" fontWeight="bold" textAnchor="end" fontFamily="monospace" className="animate-pulse">
              ● ACTIVE COUNTDOWN
            </text>
            {/* Digital Clock Digits */}
            <text x="160" y="42" fill="#facc15" fontSize="20" fontWeight="black" textAnchor="middle" fontFamily="monospace" letterSpacing="2">
              00 : 30 : 00
            </text>
          </g>

          {/* Left Side: Inbound Associate with 1 FLC Sample on Pallet Truck */}
          <g transform="translate(100, 180)">
            {/* Associate Figure */}
            <ellipse cx="60" cy="50" rx="14" ry="24" fill="#1e40af" stroke="#1d4ed8" strokeWidth="2" />
            <rect x="49" y="32" width="22" height="22" rx="2" fill="#eab308" />
            <circle cx="60" cy="18" r="10" fill="#fcd34d" />
            <path d="M50 18 Q60 10 70 18 L74 20 L46 20 Z" fill="#1e3a8a" />
            <text x="60" y="-2" fill="#bae6fd" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              INBOUND MANPOWER
            </text>

            {/* Hand Pallet Truck with FLC */}
            <g transform="translate(100, 20)">
              <rect x="0" y="70" width="140" height="12" rx="2" fill="#eab308" stroke="#ca8a04" strokeWidth="1.5" />
              <circle cx="15" cy="90" r="10" fill="#020617" stroke="#475569" strokeWidth="2" />
              <circle cx="125" cy="90" r="10" fill="#020617" stroke="#475569" strokeWidth="2" />
              <line x1="135" y1="70" x2="150" y2="10" stroke="#ca8a04" strokeWidth="3" />

              {/* Sample Blue FLC */}
              <rect x="15" y="0" width="110" height="65" rx="5" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="2.5" />
              <rect x="25" y="10" width="90" height="20" rx="3" fill="#0f172a" />
              <text x="70" y="24" fill="#38bdf8" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                10% SAMPLE FLC
              </text>
              <rect x="30" y="35" width="80" height="20" rx="2" fill="#fef3c7" stroke="#f59e0b" />
              <text x="70" y="49" fill="#b45309" fontSize="8" fontWeight="black" textAnchor="middle" fontFamily="monospace">
                GRN PASTED ➔ IQC
              </text>
            </g>
          </g>

          {/* Right Side: IQC Quality Inspector with Barcode Scanner & Sign-off Tablet */}
          <g transform="translate(720, 180)">
            {/* Inspector Figure in White Cleanroom Lab Coat */}
            <ellipse cx="60" cy="50" rx="14" ry="24" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2" />
            <circle cx="60" cy="18" r="10" fill="#fcd34d" />
            <ellipse cx="60" cy="12" rx="12" ry="5" fill="#e2e8f0" stroke="#94a3b8" />
            <text x="60" y="-2" fill="#38bdf8" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              IQC INSPECTOR
            </text>

            {/* Handheld Barcode Scanner with red laser aiming across counter */}
            <rect x="20" y="40" width="22" height="12" rx="2" fill="#0f172a" />
            <line x1="20" y1="46" x2="-80" y2="46" stroke="#ef4444" strokeWidth="2" strokeDasharray="6 3" className="animate-pulse" />

            {/* Inspection Sign-off Tablet on desk */}
            <rect x="80" y="35" width="30" height="22" rx="2" fill="#020617" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="95" y="48" fill="#38bdf8" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              SAP EWM
            </text>
          </g>

          {/* Transfer Handover Arrow Animation */}
          <g transform="translate(450, 320)">
            <line x1="0" y1="0" x2="100" y2="0" stroke="#38bdf8" strokeWidth="3" strokeDasharray="8 6" className="animate-pulse" />
            <polygon points="100,-6 114,0 100,6" fill="#38bdf8" />
            <text x="50" y="20" fill="#bae6fd" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              SLA: &lt; 30 MIN
            </text>
          </g>
        </svg>

        {/* Top CCTV Overlay Badge */}
        <div className="relative z-10 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/60 text-xs font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span className="font-bold text-slate-200">AURIC CAM-10: IQC LAB RECEIVING HATCH</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-3 py-1 rounded-full bg-amber-950/80 border border-amber-600/70 text-amber-300 font-mono text-[11px] font-bold flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>SLA TARGET: 30 MINS</span>
            </div>
            <div className="px-3 py-1 rounded-full bg-blue-950/80 border border-blue-600/70 text-blue-300 font-mono text-[11px] font-bold flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-blue-400" />
              <span>SAP WH TASK MONITOR</span>
            </div>
          </div>
        </div>

        {/* Bottom Playback & Pause Status Bar */}
        <div className="relative z-10 flex items-center justify-between text-xs font-mono text-slate-400 bg-slate-900/70 backdrop-blur-md p-2.5 rounded-xl border border-slate-800">
          <div className="flex items-center gap-2">
            {isPaused ? (
              <span className="flex items-center gap-1.5 text-amber-400 font-bold">
                <PauseCircle className="w-4 h-4" />
                <span>SOP PAUSE POINT · VERIFY HANDOVER SLA WINDOW</span>
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <PlayCircle className="w-4 h-4 animate-spin" />
                <span>TRANSFERRING SAMPLE TO IQC RECEIVING DESK...</span>
              </span>
            )}
          </div>

          <div className="text-[11px] text-slate-400">
            Mandatory KPI: <strong className="text-amber-300">Handover ≤ 30 Mins</strong> · Inspection:{' '}
            <strong className="text-blue-300">Target ≤ 2 Hours</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
