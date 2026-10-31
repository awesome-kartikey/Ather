import React, { useState, useEffect } from 'react';
import { AlertTriangle, ShieldAlert, Sparkles, CheckCircle2, XCircle, Droplets, ArrowRight } from 'lucide-react';

interface Props {
  videoSrc?: string;
  isPaused: boolean;
  onPauseReached?: () => void;
}

export const ChemicalUnloadingAnimation: React.FC<Props> = ({
  videoSrc,
  isPaused,
  onPauseReached
}) => {
  const [videoAvailable, setVideoAvailable] = useState<boolean>(Boolean(videoSrc));

  useEffect(() => {
    setVideoAvailable(Boolean(videoSrc));
  }, [videoSrc]);
  const [hasTriggeredPause, setHasTriggeredPause] = useState(false);
  const [sparkPulse, setSparkPulse] = useState(false);

  useEffect(() => {
    if (!hasTriggeredPause && !isPaused) {
      const timer = setTimeout(() => {
        setHasTriggeredPause(true);
        if (onPauseReached) onPauseReached();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [hasTriggeredPause, isPaused, onPauseReached]);

  // Static discharge / warning strobe pulse
  useEffect(() => {
    const interval = setInterval(() => {
      setSparkPulse((prev) => !prev);
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[300px] sm:h-[380px] md:h-[420px] bg-slate-950 rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-slate-800 shadow-2xl select-none flex flex-col justify-between p-3 sm:p-5">
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

      {/* Atmospheric Industrial Grid Background with Authentic Chemical Building Photo */}
      <img
        src="/Assets/Background%20Environments/bg_chemical_building.jpg"
        alt="Chemical Storage Building"
        className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 opacity-90 pointer-events-none" />
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, #ef4444 1px, transparent 1px), linear-gradient(to bottom, #ef4444 1px, transparent 1px)',
          backgroundSize: '36px 36px'
        }}
      />

      {/* Header Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-rose-500/30 pb-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 shadow-inner">
            <ShieldAlert className="w-4 h-4 animate-pulse text-rose-500" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-black font-mono tracking-wider text-slate-100 uppercase">
                ANNEX C-04 UNLOADING DOCK AUDIT
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                SOP CLAUSE 4.2
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono">
              AURIC M002 · CHEMICAL UNLOADING &amp; SPILL CONTAINMENT PROTOCOL
            </p>
          </div>
        </div>

        {/* Hazard Class Indicator */}
        <div className="flex items-center gap-2 bg-slate-900/90 border border-rose-500/40 rounded-xl px-3 py-1.5 shadow-sm">
          <AlertTriangle className="w-4 h-4 text-rose-400 animate-bounce" />
          <div className="text-right">
            <div className="text-[9px] font-mono text-slate-400 uppercase tracking-wider leading-none">
              DOCK AUDIT
            </div>
            <div className="text-xs sm:text-sm font-black font-mono text-rose-300 leading-tight">
              SAFETY VIOLATIONS FOUND
            </div>
          </div>
        </div>
      </div>

      {/* Main Procedural SVG Unloading Bay Display */}
      <div className="relative z-10 flex-1 my-2 rounded-2xl bg-slate-900/90 border border-slate-800 p-3 flex flex-col justify-between overflow-hidden shadow-inner">
        <svg viewBox="0 0 800 240" className="w-full h-full">
          {/* Chemical Annex Dock Concrete Floor */}
          <rect x="0" y="160" width="800" height="80" fill="#1e293b" />
          <line x1="0" y1="160" x2="800" y2="160" stroke="#f59e0b" strokeWidth="4" strokeDasharray="12 8" />

          {/* Overhead Flameproof EX Lamps */}
          <g transform="translate(180, 10)">
            <rect x="0" y="0" width="40" height="15" rx="3" fill="#334155" stroke="#f59e0b" strokeWidth="1" />
            <polygon points="10,15 0,90 40,90 30,15" fill="#fef08a" fillOpacity="0.12" />
            <text x="20" y="11" fill="#fef08a" fontSize="7" fontWeight="bold" textAnchor="middle">
              EX
            </text>
          </g>
          <g transform="translate(560, 10)">
            <rect x="0" y="0" width="40" height="15" rx="3" fill="#334155" stroke="#f59e0b" strokeWidth="1" />
            <polygon points="10,15 0,90 40,90 30,15" fill="#fef08a" fillOpacity="0.12" />
            <text x="20" y="11" fill="#fef08a" fontSize="7" fontWeight="bold" textAnchor="middle">
              EX
            </text>
          </g>

          {/* DOCKED DELIVERY TRUCK (LEFT) */}
          <g transform="translate(40, 60)">
            <rect x="0" y="20" width="180" height="100" rx="4" fill="#0f172a" stroke="#475569" strokeWidth="2" />
            <rect x="10" y="30" width="160" height="80" fill="#1e293b" />
            <text x="90" y="55" fill="#f8fafc" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
              SOLVENT DELIVERY TRUCK
            </text>
            <text x="90" y="70" fill="#94a3b8" fontSize="8" fontFamily="sans-serif" textAnchor="middle">
              UN 1263 · Industrial Thinner
            </text>
            {/* Class 3 Flammable Placard */}
            <g transform="translate(75, 78)">
              <rect x="0" y="0" width="30" height="30" rx="3" fill="#dc2626" transform="rotate(45 15 15)" />
              <text x="15" y="18" fill="#ffffff" fontSize="7" fontWeight="black" textAnchor="middle">
                CLASS 3
              </text>
              <text x="15" y="26" fill="#ffffff" fontSize="6" textAnchor="middle">
                FLAMMABLE
              </text>
            </g>
            <line x1="180" y1="120" x2="240" y2="160" stroke="#64748b" strokeWidth="3" />
          </g>

          {/* DRUM 1: UNSAFE DRUM ON BARE CONCRETE (CENTER) */}
          <g transform="translate(320, 80)">
            {/* Pulsating Red Hazard Circle on Floor */}
            <ellipse 
              cx="45" 
              cy="85" 
              rx={sparkPulse ? "55" : "45"} 
              ry={sparkPulse ? "16" : "12"} 
              fill="#ef4444" 
              fillOpacity={sparkPulse ? "0.35" : "0.15"} 
              stroke="#ef4444" 
              strokeWidth="2" 
              strokeDasharray="4 2" 
            />

            {/* 200L Metal Drum Body */}
            <rect x="15" y="10" width="60" height="72" rx="4" fill="#0284c7" stroke="#0369a1" strokeWidth="2" />
            <line x1="15" y1="34" x2="75" y2="34" stroke="#075985" strokeWidth="2" />
            <line x1="15" y1="58" x2="75" y2="58" stroke="#075985" strokeWidth="2" />
            {/* Top Lid */}
            <ellipse cx="45" cy="10" rx="30" ry="6" fill="#0369a1" stroke="#38bdf8" strokeWidth="1" />
            <circle cx="55" cy="10" r="3" fill="#e2e8f0" />
            {/* Drum Label */}
            <rect x="25" y="38" width="40" height="16" rx="2" fill="#ffffff" />
            <text x="45" y="49" fill="#b91c1c" fontSize="6" fontWeight="black" textAnchor="middle">
              THINNER 200L
            </text>

            {/* Missing Spill Pallet Alert Tag */}
            <g transform="translate(15, 95)">
              <rect x="-10" y="0" width="110" height="16" rx="3" fill="#7f1d1d" stroke="#ef4444" strokeWidth="1" />
              <text x="45" y="11" fill="#fecaca" fontSize="7" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                ⚠️ NO SPILL PALLET!
              </text>
            </g>
          </g>

          {/* DISCONNECTED GROUNDING REEL (Dangling wire with static spark) */}
          <g transform="translate(460, 60)">
            {/* Grounding Reel Box on Wall */}
            <rect x="0" y="0" width="36" height="36" rx="6" fill="#475569" stroke="#cbd5e1" strokeWidth="1.5" />
            <circle cx="18" cy="18" r="10" fill="#ca8a04" stroke="#eab308" strokeWidth="2" />
            <text x="18" y="21" fill="#000000" fontSize="8" fontWeight="bold" textAnchor="middle">
              ⏚
            </text>

            {/* Loose Dangling Earthing Cable */}
            <path
              d="M 18 36 Q 25 80, -25 95"
              fill="none"
              stroke="#eab308"
              strokeWidth="2.5"
              strokeDasharray="4 2"
            />
            {/* Clamp Hanging in Mid-Air Unclamped */}
            <g transform="translate(-35, 90)">
              <rect x="0" y="0" width="14" height="10" rx="2" fill="#ca8a04" stroke="#facc15" strokeWidth="1" />
              {/* Spark animation */}
              {sparkPulse && (
                <g transform="translate(7, 5)">
                  <line x1="-6" y1="0" x2="6" y2="0" stroke="#fef08a" strokeWidth="2" />
                  <line x1="0" y1="-6" x2="0" y2="6" stroke="#fef08a" strokeWidth="2" />
                  <circle cx="0" cy="0" r="2" fill="#ffffff" />
                </g>
              )}
            </g>

            <rect x="-55" y="115" width="130" height="16" rx="3" fill="#7f1d1d" stroke="#ef4444" strokeWidth="1" />
            <text x="10" y="126" fill="#fecaca" fontSize="7" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
              ⚡ GROUNDING UNCLAMPED!
            </text>
          </g>

          {/* RIGHT SIDE: IDEAL BENCHMARK (SPILL PALLET & GROUNDING CLAMPED) */}
          <g transform="translate(620, 80)">
            {/* Yellow Secondary Spill Containment Sump Pallet */}
            <rect x="0" y="68" width="110" height="24" rx="4" fill="#ca8a04" stroke="#facc15" strokeWidth="2" />
            <line x1="10" y1="76" x2="100" y2="76" stroke="#854d0e" strokeWidth="2" strokeDasharray="4 2" />
            <text x="55" y="87" fill="#000000" fontSize="7" fontWeight="black" fontFamily="monospace" textAnchor="middle">
              SECONDARY BUND [✓]
            </text>

            {/* Drum Safely Resting on Spill Pallet */}
            <rect x="25" y="10" width="60" height="60" rx="4" fill="#0284c7" stroke="#0369a1" strokeWidth="1.5" />
            {/* Attached Earthing Wire */}
            <line x1="25" y1="20" x2="-20" y2="20" stroke="#22c55e" strokeWidth="2" />
            <circle cx="25" cy="20" r="3" fill="#22c55e" />

            <rect x="5" y="98" width="100" height="14" rx="3" fill="#065f46" stroke="#22c55e" strokeWidth="1" />
            <text x="55" y="108" fill="#dcfce7" fontSize="7" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
              COMPLIANT STOWAGE
            </text>
          </g>
        </svg>

        {/* Legend / Safety Audit Strip */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800 text-[10px] font-mono text-slate-300">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-rose-400 font-bold bg-rose-950/60 px-2 py-0.5 rounded border border-rose-500/30">
              <XCircle className="w-3 h-3" />
              Critical Violation: Bare Concrete + Unclamped Earthing
            </span>
            <span className="inline-flex items-center gap-1 text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
              <CheckCircle2 className="w-3 h-3" />
              SOP Standard: Secondary Bund + Earthing Clamp
            </span>
          </div>

          <div className="flex items-center gap-1 text-slate-400">
            <Droplets className="w-3 h-3 text-sky-400" />
            <span>Spill Capacity:</span>
            <span className="text-amber-300 font-bold">110% Drum Volume</span>
          </div>
        </div>
      </div>

      {/* Footer Info Strip */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-rose-500/30 text-[10px] font-mono text-slate-400">
        <div className="flex items-center gap-1.5 text-rose-300">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>SOP Clause 4.2: Prevent electrostatic discharge (ESD) sparks &amp; chemical floor seepage</span>
        </div>

        <div className="flex items-center gap-1 text-slate-300">
          <span>Containment Mandate:</span>
          <span className="text-amber-300 font-bold">Spark-Proof Grounding &amp; Spill Berm</span>
          <ArrowRight className="w-3 h-3 text-amber-400" />
        </div>
      </div>
    </div>
  );
};
