import React, { useState, useEffect } from 'react';
import { GitFork, PauseCircle, PlayCircle, ShieldCheck, ArrowUpRight, ArrowUpLeft } from 'lucide-react';

interface Props {
  videoSrc?: string;
  isPaused: boolean;
  onPauseReached?: () => void;
}

export const RouteSegregationAnimation: React.FC<Props> = ({
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

      {/* Procedural SVG/CSS Warehouse Route Segregation Canvas */}
      <div className="absolute inset-0 w-full h-full overflow-hidden p-3 sm:p-5 flex flex-col justify-between">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 opacity-95" />

        <svg
          viewBox="0 0 1000 400"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full absolute inset-0 pointer-events-none"
        >
          {/* Warehouse Horizon & Rear Walls */}
          <rect x="0" y="0" width="1000" height="200" fill="#0b1329" />
          <line x1="0" y1="200" x2="1000" y2="200" stroke="#1e293b" strokeWidth="3" />

          {/* Diverging Floor Perspective (Crossroads Junction) */}
          {/* Main Central Inbound Driveway */}
          <polygon points="380,400 620,400 540,240 460,240" fill="#1e293b" />
          <line x1="500" y1="400" x2="500" y2="240" stroke="#eab308" strokeWidth="3" strokeDasharray="12 10" />

          {/* Left Branch: Toward High Rise Racks (HRR Aisle) */}
          <polygon points="460,240 500,240 160,160 80,160" fill="#0f172a" stroke="#2563eb" strokeWidth="1.5" />
          {/* Floor Guide Marking - Left */}
          <line x1="480" y1="240" x2="120" y2="160" stroke="#3b82f6" strokeWidth="2.5" strokeDasharray="8 6" />

          {/* Right Branch: Toward Trolley Staging Bay */}
          <polygon points="500,240 540,240 920,160 840,160" fill="#0f172a" stroke="#d97706" strokeWidth="1.5" />
          {/* Floor Guide Marking - Right */}
          <line x1="520" y1="240" x2="880" y2="160" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="8 6" />

          {/* LEFT DESTINATION ZONE: High Rise Racks (HRR) */}
          <g transform="translate(60, 40)">
            {/* Zone Tag Header */}
            <rect x="0" y="0" width="260" height="32" rx="8" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="130" y="20" fill="#93c5fd" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
              🏢 HIGH RISE RACKS (HRR)
            </text>

            {/* Tall Multi-tier Pallet Racks Visual */}
            <g transform="translate(20, 42)">
              {/* Upright structural columns (Blue) */}
              <rect x="0" y="0" width="10" height="110" fill="#2563eb" />
              <rect x="100" y="0" width="10" height="110" fill="#2563eb" />
              <rect x="200" y="0" width="10" height="110" fill="#2563eb" />

              {/* Cross Beams (Orange) */}
              <rect x="0" y="30" width="210" height="6" fill="#ea580c" />
              <rect x="0" y="70" width="210" height="6" fill="#ea580c" />
              <rect x="0" y="105" width="210" height="6" fill="#ea580c" />

              {/* Stowed Blue FLC Crates in Rack Bins */}
              <rect x="18" y="10" width="74" height="20" rx="3" fill="#1d4ed8" stroke="#60a5fa" strokeWidth="1" />
              <text x="55" y="24" fill="#ffffff" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">FLC-1</text>
              <rect x="118" y="10" width="74" height="20" rx="3" fill="#1d4ed8" stroke="#60a5fa" strokeWidth="1" />
              <text x="155" y="24" fill="#ffffff" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">FLC-2</text>

              <rect x="18" y="48" width="74" height="22" rx="3" fill="#1d4ed8" stroke="#60a5fa" strokeWidth="1" />
              <text x="55" y="62" fill="#ffffff" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">BIN-4</text>
              <rect x="118" y="48" width="74" height="22" rx="3" fill="#1d4ed8" stroke="#60a5fa" strokeWidth="1" />
              <text x="155" y="62" fill="#ffffff" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">FLC-3</text>
            </g>

            {/* Allowed Material Label */}
            <rect x="20" y="160" width="220" height="24" rx="6" fill="#0f172a" stroke="#3b82f6" strokeWidth="1" />
            <text x="130" y="176" fill="#60a5fa" fontSize="9" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
              Standard FLC Crates &amp; Bins Only
            </text>
          </g>

          {/* RIGHT DESTINATION ZONE: Trolley Staging Area */}
          <g transform="translate(680, 40)">
            {/* Zone Tag Header */}
            <rect x="0" y="0" width="260" height="32" rx="8" fill="#78350f" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="130" y="20" fill="#fde68a" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
              🛒 TROLLEY STAGING AREA
            </text>

            {/* Wheeled Trolleys Parked in Staging Lane */}
            <g transform="translate(25, 45)">
              {/* Floor Yellow Parking Demarcation Bays */}
              <rect x="0" y="20" width="100" height="85" rx="6" fill="#1e293b" stroke="#eab308" strokeWidth="2" strokeDasharray="6 4" />
              <rect x="110" y="20" width="100" height="85" rx="6" fill="#1e293b" stroke="#eab308" strokeWidth="2" strokeDasharray="6 4" />

              {/* Trolley 1: Scooter Mainframe Chassis */}
              <g transform="translate(10, 30)">
                <rect x="0" y="20" width="80" height="36" rx="4" fill="#334155" stroke="#94a3b8" strokeWidth="1.5" />
                <path d="M 15,20 L 40,5 L 65,20" stroke="#38bdf8" strokeWidth="3" fill="none" />
                {/* Wheels */}
                <circle cx="15" cy="60" r="5" fill="#0f172a" stroke="#94a3b8" strokeWidth="2" />
                <circle cx="65" cy="60" r="5" fill="#0f172a" stroke="#94a3b8" strokeWidth="2" />
                <text x="40" y="42" fill="#38bdf8" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">CHASSIS</text>
              </g>

              {/* Trolley 2: Battery Pack Modules */}
              <g transform="translate(120, 30)">
                <rect x="0" y="20" width="80" height="36" rx="4" fill="#334155" stroke="#94a3b8" strokeWidth="1.5" />
                <rect x="12" y="8" width="56" height="15" rx="2" fill="#059669" stroke="#34d399" strokeWidth="1" />
                {/* Wheels */}
                <circle cx="15" cy="60" r="5" fill="#0f172a" stroke="#94a3b8" strokeWidth="2" />
                <circle cx="65" cy="60" r="5" fill="#0f172a" stroke="#94a3b8" strokeWidth="2" />
                <text x="40" y="42" fill="#34d399" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">BATTERY</text>
              </g>
            </g>

            {/* Allowed Material Label */}
            <rect x="20" y="160" width="220" height="24" rx="6" fill="#0f172a" stroke="#f59e0b" strokeWidth="1" />
            <text x="130" y="176" fill="#fcd34d" fontSize="9" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
              Wheeled Chassis &amp; Battery Trolleys Only
            </text>
          </g>

          {/* CENTER: MHE Reach-Truck at Junction */}
          <g transform="translate(425, 230)">
            {/* Pallet Reach-Truck Base */}
            <rect x="30" y="40" width="90" height="55" rx="8" fill="#1e293b" stroke="#475569" strokeWidth="2" />
            <circle cx="45" cy="98" r="9" fill="#0f172a" stroke="#64748b" strokeWidth="2" />
            <circle cx="105" cy="98" r="9" fill="#0f172a" stroke="#64748b" strokeWidth="2" />
            {/* Operator Cabin Mast */}
            <rect x="75" y="0" width="12" height="45" fill="#475569" />
            <rect x="50" y="8" width="40" height="28" rx="4" fill="#0284c7" fillOpacity="0.4" stroke="#38bdf8" strokeWidth="1.5" />

            {/* Pulsing Directional Indicator Arrows */}
            <g transform="translate(-55, -20)">
              <rect x="0" y="0" width="105" height="30" rx="6" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="1.5" />
              <text x="52" y="19" fill="#ffffff" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                ⬅️ TO HRR
              </text>
            </g>

            <g transform="translate(100, -20)">
              <rect x="0" y="0" width="105" height="30" rx="6" fill="#78350f" stroke="#fbbf24" strokeWidth="1.5" />
              <text x="52" y="19" fill="#ffffff" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                TROLLEY ➡️
              </text>
            </g>
          </g>
        </svg>

        {/* Top Floating Status Pill */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 backdrop-blur-md text-[11px] font-mono text-emerald-400">
            <GitFork className="w-3.5 h-3.5 text-blue-400" />
            <span className="font-bold tracking-wider uppercase">AURIC Central Junction · Route Segregation</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 backdrop-blur-md text-[11px] font-mono text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>SOP 03_C1_S3 Clause 4.2</span>
          </div>
        </div>

        {/* Bottom Floating Visual Guide Pill */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-300 bg-slate-900/85 px-3 py-1.5 rounded-xl border border-slate-800">
            <div className="flex items-center gap-1.5 text-blue-400">
              <ArrowUpLeft className="w-3.5 h-3.5" />
              <span>Left: FLC &amp; Bins → High Rise Racks</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5 text-amber-400">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>Right: Trolleys → Trolley Staging Bay</span>
            </div>
          </div>

          {isPaused ? (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/50 text-amber-300 text-xs font-mono font-bold animate-pulse">
              <PauseCircle className="w-3.5 h-3.5" />
              <span>Route Segregation Point</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 text-xs font-mono font-bold">
              <PlayCircle className="w-3.5 h-3.5" />
              <span>Navigating Crossroads</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
