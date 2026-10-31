import React, { useState, useEffect } from 'react';
import { Layers, ArrowRight, ShieldCheck, CheckCircle2, RotateCw } from 'lucide-react';

interface Props {
  videoSrc?: string;
  isPaused: boolean;
  onPauseReached?: () => void;
}

export const GravityFlowRackAnimation: React.FC<Props> = ({
  videoSrc,
  isPaused,
  onPauseReached
}) => {
  const [videoAvailable, setVideoAvailable] = useState<boolean>(Boolean(videoSrc));

  useEffect(() => {
    setVideoAvailable(Boolean(videoSrc));
  }, [videoSrc]);
  const [hasTriggeredPause, setHasTriggeredPause] = useState(false);
  const [rollerOffset, setRollerOffset] = useState(0);

  useEffect(() => {
    if (!hasTriggeredPause && !isPaused) {
      const timer = setTimeout(() => {
        setHasTriggeredPause(true);
        if (onPauseReached) onPauseReached();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [hasTriggeredPause, isPaused, onPauseReached]);

  // Animated roller rotation ticker
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setRollerOffset((prev) => (prev + 30) % 360);
    }, 120);
    return () => clearInterval(interval);
  }, [isPaused]);

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

      {/* Atmospheric Industrial Grid Background with Authentic Supermarket Photo */}
      <img
        src="/Assets/Background%20Environments/bg_supermarket_sm.jpg"
        alt="Supermarket Flow Racks"
        className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 opacity-90 pointer-events-none" />
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, #0ea5e9 1px, transparent 1px), linear-gradient(to bottom, #0ea5e9 1px, transparent 1px)',
          backgroundSize: '36px 36px'
        }}
      />

      {/* Header Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 shadow-inner">
            <Layers className="w-4 h-4 animate-pulse text-sky-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-black font-mono tracking-wider text-slate-100 uppercase">
                GRAVITY FLOW RACK (FIFO LANE)
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-500/40">
                SOP CLAUSE 4.3
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono">
              AURIC M002 · FIRST-IN, FIRST-OUT (FIFO) REPLENISHMENT BED
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-2 bg-slate-900/90 border border-emerald-500/40 rounded-xl px-3 py-1.5 shadow-sm">
          <RotateCw className="w-4 h-4 text-emerald-400 animate-spin" />
          <div className="text-right">
            <div className="text-[9px] font-mono text-slate-400 uppercase tracking-wider leading-none">
              FEED METHOD
            </div>
            <div className="text-xs sm:text-sm font-black font-mono text-emerald-300 leading-tight">
              FIFO ROLLER BED
            </div>
          </div>
        </div>
      </div>

      {/* Main Procedural SVG Gravity Flow Rack Display */}
      <div className="relative z-10 flex-1 my-2 rounded-2xl bg-slate-900/90 border border-slate-800 p-3 flex flex-col justify-between overflow-hidden shadow-inner">
        <svg viewBox="0 0 800 240" className="w-full h-full">
          {/* Steel Rack Uprights */}
          <rect x="50" y="20" width="16" height="190" fill="#334155" stroke="#475569" strokeWidth="1" />
          <rect x="734" y="20" width="16" height="190" fill="#334155" stroke="#475569" strokeWidth="1" />

          {/* INCLINED ROLLER TRACK BED (Slope from Left Y:110 down to Right Y:160) */}
          <line x1="60" y1="110" x2="740" y2="160" stroke="#0284c7" strokeWidth="6" strokeLinecap="round" />
          <line x1="60" y1="120" x2="740" y2="170" stroke="#0369a1" strokeWidth="4" strokeLinecap="round" />

          {/* Roller Wheels along inclined track */}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i) => {
            const cx = 80 + i * 42;
            const cy = 115 + (i * 50) / 15;
            return (
              <g key={i} transform={`translate(${cx}, ${cy})`}>
                <circle cx="0" cy="0" r="7" fill="#64748b" stroke="#cbd5e1" strokeWidth="1" />
                <g transform={`rotate(${rollerOffset} 0 0)`}>
                  <line x1="-5" y1="0" x2="5" y2="0" stroke="#0f172a" strokeWidth="1.5" />
                </g>
              </g>
            );
          })}

          {/* End Stop Bumper at Front (Right) */}
          <rect x="730" y="115" width="12" height="45" rx="2" fill="#eab308" stroke="#ca8a04" strokeWidth="1" />

          {/* FLOW ARROW ANIMATION */}
          <g transform="translate(380, 80)">
            <rect x="-80" y="-12" width="160" height="24" rx="4" fill="#0f172a" stroke="#0284c7" strokeWidth="1.5" />
            <text x="-15" y="4" fill="#38bdf8" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
              GRAVITY FLOW →
            </text>
            <text x="45" y="4" fill="#10b981" fontSize="9" fontWeight="black" fontFamily="monospace" textAnchor="middle">
              FIFO [✓]
            </text>
          </g>

          {/* BOX 1: NEW STOCK LOADED FROM REAR (LEFT) */}
          <g transform="translate(100, 48)">
            <rect x="0" y="0" width="110" height="60" rx="4" fill="#0369a1" stroke="#38bdf8" strokeWidth="2" />
            <rect x="5" y="5" width="100" height="50" fill="#0284c7" />
            <text x="55" y="24" fill="#ffffff" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
              NEW REPLENISHMENT
            </text>
            <text x="55" y="38" fill="#e0f2fe" fontSize="7" fontFamily="sans-serif" textAnchor="middle">
              Lot: ATH-M6-992
            </text>
            <rect x="15" y="42" width="80" height="10" rx="2" fill="#0c4a6e" />
            <text x="55" y="49" fill="#7dd3fc" fontSize="6" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
              REAR LOADED [✓]
            </text>
          </g>

          {/* BOX 2: IN-TRANSIT BUFFER (MIDDLE) */}
          <g transform="translate(310, 68)">
            <rect x="0" y="0" width="110" height="60" rx="4" fill="#334155" stroke="#64748b" strokeWidth="1.5" />
            <rect x="5" y="5" width="100" height="50" fill="#1e293b" />
            <text x="55" y="26" fill="#cbd5e1" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
              BUFFER ROLLING
            </text>
            <text x="55" y="40" fill="#94a3b8" fontSize="7" fontFamily="sans-serif" textAnchor="middle">
              Moving forward
            </text>
          </g>

          {/* BOX 3: OLDEST STOCK AT FRONT PICKING FACE (RIGHT - READY FOR FEEDER) */}
          <g transform="translate(615, 102)">
            <rect x="0" y="0" width="115" height="60" rx="4" fill="#065f46" stroke="#10b981" strokeWidth="2.5" />
            <rect x="5" y="5" width="105" height="50" fill="#047857" />
            <text x="57" y="22" fill="#ecfdf5" fontSize="8" fontWeight="black" fontFamily="monospace" textAnchor="middle">
              OLDEST ACTIVE STOCK
            </text>
            <text x="57" y="34" fill="#d1fae5" fontSize="7" fontFamily="sans-serif" textAnchor="middle">
              Lot: ATH-M6-980 (First-In)
            </text>
            <rect x="12" y="38" width="90" height="14" rx="2" fill="#022c22" stroke="#34d399" strokeWidth="1" />
            <text x="57" y="48" fill="#6ee7b7" fontSize="7" fontWeight="black" fontFamily="monospace" textAnchor="middle">
              1st PICK FOR ASSEMBLY
            </text>
          </g>

          {/* LANE ACCESS CALLOUTS */}
          {/* Rear Lane Callout (Left) */}
          <g transform="translate(70, 185)">
            <rect x="0" y="0" width="170" height="24" rx="4" fill="#082f49" stroke="#0ea5e9" strokeWidth="1" />
            <text x="85" y="15" fill="#bae6fd" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
              ← REAR LOADING AISLE
            </text>
          </g>

          {/* Front Lane Callout (Right) */}
          <g transform="translate(560, 185)">
            <rect x="0" y="0" width="170" height="24" rx="4" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
            <text x="85" y="15" fill="#a7f3d0" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
              FRONT DISPENSING AISLE →
            </text>
          </g>
        </svg>

        {/* Legend / Standard Protocol Strip */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800 text-[10px] font-mono text-slate-300">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-sky-400 font-bold bg-sky-950/60 px-2 py-0.5 rounded border border-sky-500/30">
              <CheckCircle2 className="w-3 h-3" />
              Putaway Rule: Load Exclusively from Rear Lane
            </span>
            <span className="inline-flex items-center gap-1 text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
              <ShieldCheck className="w-3 h-3" />
              FIFO Guaranteed: Oldest Stock Consumed First
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-400">
            <span>Rack Angle:</span>
            <span className="text-amber-300 font-bold">3.5° Gravity Incline</span>
          </div>
        </div>
      </div>

      {/* Footer Info Strip */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-800 text-[10px] font-mono text-slate-400">
        <div className="flex items-center gap-1.5 text-slate-300">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>SOP Clause 4.3: Prevent fastener obsolescence and corrosion by enforcing FIFO gravity flow</span>
        </div>

        <div className="flex items-center gap-1 text-slate-300">
          <span>Replenishment Order:</span>
          <span className="text-sky-300 font-bold">Rear In → Front Out</span>
          <ArrowRight className="w-3 h-3 text-sky-400" />
        </div>
      </div>
    </div>
  );
};
