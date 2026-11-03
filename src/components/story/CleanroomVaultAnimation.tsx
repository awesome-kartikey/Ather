import React, { useState, useEffect } from 'react';
import { Thermometer, Droplets, PauseCircle, PlayCircle, ShieldCheck, Wind } from 'lucide-react';

interface Props {
  videoSrc?: string;
  isPaused: boolean;
  onPauseReached?: () => void;
}

export const CleanroomVaultAnimation: React.FC<Props> = ({
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

      {/* Procedural SVG/CSS Cleanroom Telemetry Canvas */}
      <div className="absolute inset-0 w-full h-full overflow-hidden p-3 sm:p-5 flex flex-col justify-between">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 opacity-95" />

        <svg
          viewBox="0 0 1000 400"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full absolute inset-0 pointer-events-none"
        >
          {/* Cleanroom Interior Walls - Sterile White/Steel Panels */}
          <rect x="0" y="0" width="1000" height="240" fill="#0f172a" />
          <line x1="0" y1="240" x2="1000" y2="240" stroke="#38bdf8" strokeWidth="2" strokeOpacity="0.4" />

          {/* Ceiling HEPA Air Diffusion Vents */}
          <g transform="translate(150, 0)">
            <rect x="0" y="0" width="180" height="18" fill="#1e293b" stroke="#0ea5e9" strokeWidth="1" />
            <line x1="20" y1="9" x2="160" y2="9" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6 4" />
          </g>
          <g transform="translate(410, 0)">
            <rect x="0" y="0" width="180" height="18" fill="#1e293b" stroke="#0ea5e9" strokeWidth="1" />
            <line x1="20" y1="9" x2="160" y2="9" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6 4" />
          </g>
          <g transform="translate(670, 0)">
            <rect x="0" y="0" width="180" height="18" fill="#1e293b" stroke="#0ea5e9" strokeWidth="1" />
            <line x1="20" y1="9" x2="160" y2="9" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6 4" />
          </g>

          {/* Anti-Static Epoxy Clean Floor */}
          <polygon points="50,400 950,400 820,240 180,240" fill="#1e293b" />
          <line x1="500" y1="240" x2="500" y2="400" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="8 6" strokeOpacity="0.5" />

          {/* LEFT: Battery Cell Pallet Resting Inside Controlled Cleanroom */}
          <g transform="translate(80, 160)">
            {/* Anti-static Floor Mat */}
            <rect x="-10" y="145" width="230" height="20" rx="4" fill="#0369a1" fillOpacity="0.3" stroke="#38bdf8" strokeWidth="1.5" />
            {/* Wooden Base Pallet */}
            <rect x="0" y="125" width="210" height="18" rx="2" fill="#854d0e" stroke="#713f12" strokeWidth="1" />
            {/* Gray Battery Crates with Hazard Labels */}
            <rect x="15" y="35" width="180" height="90" rx="6" fill="#334155" stroke="#64748b" strokeWidth="2" />
            <rect x="25" y="45" width="160" height="70" rx="4" fill="#1e293b" />
            <text x="105" y="75" fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
              BATTERY STANDARD ROOM
            </text>
            <text x="105" y="92" fill="#94a3b8" fontSize="8" fontFamily="sans-serif" textAnchor="middle">
              Lithium-Ion Cells Staged
            </text>
            <rect x="55" y="98" width="100" height="12" rx="2" fill="#065f46" />
            <text x="105" y="107" fill="#6ee7b7" fontSize="7" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
              AIRLOCK SECURED [✓]
            </text>
          </g>

          {/* CENTER & RIGHT: Digital Environmental Telemetry Console */}
          <g transform="translate(370, 50)">
            {/* Dashboard Outer Enclosure */}
            <rect x="0" y="0" width="570" height="280" rx="18" fill="#0b132b" stroke="#0284c7" strokeWidth="2" />
            {/* Console Header */}
            <rect x="0" y="0" width="570" height="42" rx="18" fill="#0f172a" />
            <rect x="0" y="26" width="570" height="16" fill="#0f172a" />
            <circle cx="25" cy="21" r="7" fill="#10b981" />
            <text x="42" y="25" fill="#ffffff" fontSize="12" fontWeight="bold" fontFamily="monospace">
              AURIC HVAC TELEMETRY · BATTERY STANDARD ROOM
            </text>
            <rect x="440" y="10" width="115" height="22" rx="4" fill="#0369a1" />
            <text x="497" y="25" fill="#e0f2fe" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
              ISO CLASS 7
            </text>

            {/* TWO DUAL ENVIRONMENTAL GAUGES */}
            {/* 1. TEMPERATURE GAUGE (LEFT) */}
            <g transform="translate(30, 65)">
              <rect x="0" y="0" width="240" height="145" rx="12" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
              {/* Dial Header */}
              <rect x="0" y="0" width="240" height="30" rx="12" fill="#064e3b" />
              <rect x="0" y="18" width="240" height="12" fill="#064e3b" />
              <text x="120" y="20" fill="#6ee7b7" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                🌡️ TEMPERATURE TELEMETRY
              </text>

              {/* Big Digital Temp Readout */}
              <text x="120" y="78" fill="#10b981" fontSize="32" fontWeight="black" fontFamily="monospace" textAnchor="middle">
                22.4°C
              </text>

              {/* Mandatory Range Badge */}
              <rect x="25" y="95" width="190" height="24" rx="6" fill="#022c22" stroke="#059669" strokeWidth="1" />
              <text x="120" y="111" fill="#a7f3d0" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                SOP RANGE: 20°C – 25°C [OK]
              </text>
              <text x="120" y="132" fill="#64748b" fontSize="8" fontFamily="sans-serif" textAnchor="middle">
                Prevents Thermal Runaway &amp; Aging
              </text>
            </g>

            {/* 2. RELATIVE HUMIDITY GAUGE (RIGHT) */}
            <g transform="translate(300, 65)">
              <rect x="0" y="0" width="240" height="145" rx="12" fill="#0f172a" stroke="#0284c7" strokeWidth="1.5" />
              {/* Dial Header */}
              <rect x="0" y="0" width="240" height="30" rx="12" fill="#0c4a6e" />
              <rect x="0" y="18" width="240" height="12" fill="#0c4a6e" />
              <text x="120" y="20" fill="#7dd3fc" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                💧 RELATIVE HUMIDITY (RH)
              </text>

              {/* Big Digital Humidity Readout */}
              <text x="120" y="78" fill="#38bdf8" fontSize="32" fontWeight="black" fontFamily="monospace" textAnchor="middle">
                62.8%
              </text>

              {/* Mandatory Range Badge */}
              <rect x="25" y="95" width="190" height="24" rx="6" fill="#082f49" stroke="#0284c7" strokeWidth="1" />
              <text x="120" y="111" fill="#bae6fd" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                SOP RANGE: 60% – 65% RH [OK]
              </text>
              <text x="120" y="132" fill="#64748b" fontSize="8" fontFamily="sans-serif" textAnchor="middle">
                Prevents Condensation &amp; ESD Sparks
              </text>
            </g>

            {/* Bottom Status Banner */}
            <g transform="translate(30, 225)">
              <rect x="0" y="0" width="510" height="38" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="1" />
              <circle cx="20" cy="19" r="6" fill="#10b981" />
              <text x="35" y="23" fill="#cbd5e1" fontSize="10" fontWeight="bold" fontFamily="monospace">
                HVAC STATUS: DEHUMIDIFIER ACTIVE · AIRLOCK POSITIVE PRESSURE NORMAL
              </text>
            </g>
          </g>
        </svg>

        {/* Top Floating Status Bar */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 backdrop-blur-md text-[11px] font-mono text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold tracking-wider uppercase">AURIC Plant M002 · Battery Standard Room</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 backdrop-blur-md text-[11px] font-mono text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>SOP 04_C1_S3 Clause 4.2</span>
          </div>
        </div>

        {/* Bottom Floating Visual Guide Pill */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-300 bg-slate-900/85 px-3 py-1.5 rounded-xl border border-slate-800">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <Thermometer className="w-3.5 h-3.5" />
              <span>Target Temp: 20°C – 25°C</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5 text-cyan-400">
              <Droplets className="w-3.5 h-3.5" />
              <span>Target RH: 60% – 65% Humidity</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5 text-slate-400">
              <Wind className="w-3.5 h-3.5" />
              <span>ISO Class 7 Airlock</span>
            </div>
          </div>

          {isPaused ? (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/50 text-amber-300 text-xs font-mono font-bold animate-pulse">
              <PauseCircle className="w-3.5 h-3.5" />
              <span>Telemetry Calibration Point</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 text-xs font-mono font-bold">
              <PlayCircle className="w-3.5 h-3.5" />
              <span>Monitoring Environment</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
