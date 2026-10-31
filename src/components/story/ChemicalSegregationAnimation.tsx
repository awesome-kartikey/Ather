import React, { useState, useEffect } from 'react';
import { Flame, ShieldCheck, Timer, Zap, ArrowRight, ShieldAlert } from 'lucide-react';

interface Props {
  videoSrc?: string;
  isPaused: boolean;
  onPauseReached?: () => void;
}

export const ChemicalSegregationAnimation: React.FC<Props> = ({
  videoSrc,
  isPaused,
  onPauseReached
}) => {
  const [videoAvailable, setVideoAvailable] = useState<boolean>(false);
  const [hasTriggeredPause, setHasTriggeredPause] = useState(false);
  const [fanRotation, setFanRotation] = useState(0);

  useEffect(() => {
    if (!hasTriggeredPause && !isPaused) {
      const timer = setTimeout(() => {
        setHasTriggeredPause(true);
        if (onPauseReached) onPauseReached();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [hasTriggeredPause, isPaused, onPauseReached]);

  // Exhaust fan rotation loop
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setFanRotation((prev) => (prev + 18) % 360);
    }, 50);
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

      {/* Atmospheric Tech Gradient & Industrial Floor Grid */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 opacity-95 pointer-events-none" />
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, #38bdf8 1px, transparent 1px), linear-gradient(to bottom, #38bdf8 1px, transparent 1px)',
          backgroundSize: '36px 36px'
        }}
      />

      {/* Header Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner">
            <Flame className="w-4 h-4 animate-pulse text-amber-500" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-black font-mono tracking-wider text-slate-100 uppercase">
                ANNEX C-04 STORAGE SEGREGATION VAULT
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                SOP CLAUSE 4.3
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono">
              AURIC M002 · INCOMPATIBLE CHEMICAL ISOLATION MATRIX &amp; 2-HR SLA
            </p>
          </div>
        </div>

        {/* 2-Hour SLA Countdown Monitor */}
        <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-700 rounded-xl px-3 py-1.5 shadow-sm">
          <Timer className="w-4 h-4 text-amber-400 animate-spin" />
          <div className="text-right">
            <div className="text-[9px] font-mono text-slate-400 uppercase tracking-wider leading-none">
              PUT-AWAY SLA
            </div>
            <div className="text-xs sm:text-sm font-black font-mono text-amber-300 leading-tight">
              01:15:30 / 02:00:00 MAX
            </div>
          </div>
        </div>
      </div>

      {/* Main Procedural 3-Bay Chemical Vault Display */}
      <div className="relative z-10 flex-1 my-2 rounded-2xl bg-slate-900/90 border border-slate-800 p-3 flex flex-col justify-between overflow-hidden shadow-inner">
        <svg viewBox="0 0 800 240" className="w-full h-full">
          {/* Chemical Room Steel Walls */}
          <rect x="0" y="0" width="800" height="150" fill="#0f172a" />
          <line x1="0" y1="150" x2="800" y2="150" stroke="#334155" strokeWidth="2" />

          {/* Overhead Industrial EX Exhaust Fans */}
          <g transform="translate(400, 25)">
            <circle cx="0" cy="0" r="16" fill="#1e293b" stroke="#0ea5e9" strokeWidth="1.5" />
            <g transform={`rotate(${fanRotation} 0 0)`}>
              <line x1="-12" y1="0" x2="12" y2="0" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
              <line x1="0" y1="-12" x2="0" y2="12" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
            </g>
            <text x="0" y="26" fill="#7dd3fc" fontSize="7" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
              AIR EXHAUST 15 ACH
            </text>
          </g>

          {/* Epoxy Chemical-Resistant Floor */}
          <rect x="0" y="150" width="800" height="90" fill="#1e293b" />

          {/* ZONE 1: FLAMMABLE SOLVENTS & PAINTS (CLASS 3) */}
          <g transform="translate(30, 60)">
            {/* Containment Berm Wall */}
            <rect x="0" y="20" width="220" height="150" rx="8" fill="#450a0a" fillOpacity="0.5" stroke="#ef4444" strokeWidth="2" />
            <rect x="10" y="30" width="200" height="26" rx="4" fill="#7f1d1d" />
            <text x="110" y="47" fill="#fee2e2" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
              BAY 1: FLAMMABLES (CLASS 3)
            </text>
            <text x="110" y="70" fill="#fca5a5" fontSize="8" fontFamily="sans-serif" textAnchor="middle">
              Thinners, Resins &amp; Topcoat Paints
            </text>

            {/* Red Drums Stowed on Spill Berm */}
            <g transform="translate(35, 80)">
              <rect x="0" y="0" width="40" height="48" rx="3" fill="#dc2626" stroke="#b91c1c" strokeWidth="1.5" />
              <line x1="0" y1="16" x2="40" y2="16" stroke="#991b1b" strokeWidth="1.5" />
              <line x1="0" y1="32" x2="40" y2="32" stroke="#991b1b" strokeWidth="1.5" />
              <text x="20" y="26" fill="#ffffff" fontSize="6" fontWeight="bold" textAnchor="middle">
                THINNER
              </text>
            </g>
            <g transform="translate(85, 80)">
              <rect x="0" y="0" width="40" height="48" rx="3" fill="#ea580c" stroke="#c2410c" strokeWidth="1.5" />
              <line x1="0" y1="16" x2="40" y2="16" stroke="#9a3412" strokeWidth="1.5" />
              <line x1="0" y1="32" x2="40" y2="32" stroke="#9a3412" strokeWidth="1.5" />
              <text x="20" y="26" fill="#ffffff" fontSize="6" fontWeight="bold" textAnchor="middle">
                PAINT
              </text>
            </g>
            <g transform="translate(135, 80)">
              <rect x="0" y="0" width="40" height="48" rx="3" fill="#dc2626" stroke="#b91c1c" strokeWidth="1.5" />
              <line x1="0" y1="16" x2="40" y2="16" stroke="#991b1b" strokeWidth="1.5" />
              <line x1="0" y1="32" x2="40" y2="32" stroke="#991b1b" strokeWidth="1.5" />
              <text x="20" y="26" fill="#ffffff" fontSize="6" fontWeight="bold" textAnchor="middle">
                SOLVENT
              </text>
            </g>

            {/* Safety Indicator */}
            <rect x="30" y="140" width="160" height="18" rx="3" fill="#1e293b" stroke="#ef4444" strokeWidth="1" />
            <text x="110" y="152" fill="#fca5a5" fontSize="7" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
              EARTHED &amp; FLAMEPROOF SUMP
            </text>
          </g>

          {/* PHYSICAL AIR ISOLATION GAP 1 */}
          <line x1="265" y1="70" x2="265" y2="210" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6 4" strokeOpacity="0.4" />

          {/* ZONE 2: OXIDIZING REAGENTS (CLASS 5.1) */}
          <g transform="translate(285, 60)">
            <rect x="0" y="20" width="220" height="150" rx="8" fill="#422006" fillOpacity="0.5" stroke="#eab308" strokeWidth="2" />
            <rect x="10" y="30" width="200" height="26" rx="4" fill="#854d0e" />
            <text x="110" y="47" fill="#fef08a" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
              BAY 2: OXIDIZERS (CLASS 5.1)
            </text>
            <text x="110" y="70" fill="#fde047" fontSize="8" fontFamily="sans-serif" textAnchor="middle">
              Peroxides &amp; Epoxy Hardeners
            </text>

            {/* Yellow Drums Stowed */}
            <g transform="translate(60, 80)">
              <rect x="0" y="0" width="40" height="48" rx="3" fill="#ca8a04" stroke="#a16207" strokeWidth="1.5" />
              <line x1="0" y1="16" x2="40" y2="16" stroke="#713f12" strokeWidth="1.5" />
              <line x1="0" y1="32" x2="40" y2="32" stroke="#713f12" strokeWidth="1.5" />
              <text x="20" y="26" fill="#000000" fontSize="6" fontWeight="black" textAnchor="middle">
                PEROXIDE
              </text>
            </g>
            <g transform="translate(120, 80)">
              <rect x="0" y="0" width="40" height="48" rx="3" fill="#eab308" stroke="#ca8a04" strokeWidth="1.5" />
              <line x1="0" y1="16" x2="40" y2="16" stroke="#854d0e" strokeWidth="1.5" />
              <line x1="0" y1="32" x2="40" y2="32" stroke="#854d0e" strokeWidth="1.5" />
              <text x="20" y="26" fill="#000000" fontSize="6" fontWeight="black" textAnchor="middle">
                HARDENER
              </text>
            </g>

            {/* Warning Indicator */}
            <rect x="25" y="140" width="170" height="18" rx="3" fill="#1e293b" stroke="#eab308" strokeWidth="1" />
            <text x="110" y="152" fill="#fef08a" fontSize="7" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
              ⚠️ STRICT FLAMMABLE ISOLATION
            </text>
          </g>

          {/* PHYSICAL AIR ISOLATION GAP 2 */}
          <line x1="520" y1="70" x2="520" y2="210" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6 4" strokeOpacity="0.4" />

          {/* ZONE 3: CORROSIVE LIQUIDS (CLASS 8) */}
          <g transform="translate(540, 60)">
            <rect x="0" y="20" width="220" height="150" rx="8" fill="#172554" fillOpacity="0.5" stroke="#3b82f6" strokeWidth="2" />
            <rect x="10" y="30" width="200" height="26" rx="4" fill="#1e3a8a" />
            <text x="110" y="47" fill="#dbeafe" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
              BAY 3: CORROSIVES (CLASS 8)
            </text>
            <text x="110" y="70" fill="#93c5fd" fontSize="8" fontFamily="sans-serif" textAnchor="middle">
              Acid Etching &amp; Degreasing Wash
            </text>

            {/* Blue Poly Drums Stowed */}
            <g transform="translate(60, 80)">
              <rect x="0" y="0" width="40" height="48" rx="3" fill="#2563eb" stroke="#1d4ed8" strokeWidth="1.5" />
              <line x1="0" y1="16" x2="40" y2="16" stroke="#1e40af" strokeWidth="1.5" />
              <line x1="0" y1="32" x2="40" y2="32" stroke="#1e40af" strokeWidth="1.5" />
              <text x="20" y="26" fill="#ffffff" fontSize="6" fontWeight="bold" textAnchor="middle">
                ACID
              </text>
            </g>
            <g transform="translate(120, 80)">
              <rect x="0" y="0" width="40" height="48" rx="3" fill="#0284c7" stroke="#0369a1" strokeWidth="1.5" />
              <line x1="0" y1="16" x2="40" y2="16" stroke="#075985" strokeWidth="1.5" />
              <line x1="0" y1="32" x2="40" y2="32" stroke="#075985" strokeWidth="1.5" />
              <text x="20" y="26" fill="#ffffff" fontSize="6" fontWeight="bold" textAnchor="middle">
                CLEANER
              </text>
            </g>

            {/* Acid Resistance Indicator */}
            <rect x="25" y="140" width="170" height="18" rx="3" fill="#1e293b" stroke="#3b82f6" strokeWidth="1" />
            <text x="110" y="152" fill="#bfdbfe" fontSize="7" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
              ACID-NEUTRALIZING SUMP
            </text>
          </g>
        </svg>

        {/* Legend / Segregation Matrix Strip */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800 text-[10px] font-mono text-slate-300">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
              <ShieldCheck className="w-3 h-3" />
              Segregation Rule: Flammables &amp; Oxidizers Separated
            </span>
            <span className="inline-flex items-center gap-1 text-amber-300 font-bold bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
              <Zap className="w-3 h-3" />
              Zero Mixed Bunds Allowed
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-400">
            <span>SLA Standard:</span>
            <span className="text-amber-300 font-bold">2-Hour Put-Away Limit</span>
          </div>
        </div>
      </div>

      {/* Footer Info Strip */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-800 text-[10px] font-mono text-slate-400">
        <div className="flex items-center gap-1.5 text-slate-300">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
          <span>SOP Clause 4.3: Prevent spontaneous chemical combustion by isolating incompatible classes</span>
        </div>

        <div className="flex items-center gap-1 text-slate-300">
          <span>Stowage Task:</span>
          <span className="text-emerald-300 font-bold">3-Way Hazard Segregation</span>
          <ArrowRight className="w-3 h-3 text-emerald-400" />
        </div>
      </div>
    </div>
  );
};
