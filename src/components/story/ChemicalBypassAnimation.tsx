import React, { useState, useEffect } from 'react';
import { Flame, ShieldAlert, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';

interface Props {
  videoSrc?: string;
  isPaused: boolean;
  onPauseReached?: () => void;
}

export const ChemicalBypassAnimation: React.FC<Props> = ({
  videoSrc,
  isPaused,
  onPauseReached
}) => {
  const [videoAvailable, setVideoAvailable] = useState<boolean>(false);
  const [hasTriggeredPause, setHasTriggeredPause] = useState(false);
  const [truckStep, setTruckStep] = useState<number>(0);

  useEffect(() => {
    if (!hasTriggeredPause && !isPaused) {
      const timer = setTimeout(() => {
        setHasTriggeredPause(true);
        if (onPauseReached) onPauseReached();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [hasTriggeredPause, isPaused, onPauseReached]);

  // Truck route animation loop
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setTruckStep((prev) => (prev + 1) % 4);
    }, 1200);
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

      {/* Atmospheric Industrial Grid Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 opacity-95 pointer-events-none" />
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, #f59e0b 1px, transparent 1px), linear-gradient(to bottom, #f59e0b 1px, transparent 1px)',
          backgroundSize: '36px 36px'
        }}
      />

      {/* Header Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-amber-500/30 pb-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner">
            <Flame className="w-4 h-4 animate-pulse text-amber-500" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-black font-mono tracking-wider text-slate-100 uppercase">
                HAZMAT LOGISTICS ROUTING MAP
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                SOP CLAUSE 4.1
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono">
              AURIC M002 · GATE ENTRY TO DETACHED CHEMICAL ANNEX ROUTE
            </p>
          </div>
        </div>

        {/* Hazard Class Indicator */}
        <div className="flex items-center gap-2 bg-slate-900/90 border border-amber-500/40 rounded-xl px-3 py-1.5 shadow-sm">
          <div className="w-3.5 h-3.5 bg-red-600 rounded-sm transform rotate-45 flex items-center justify-center">
            <span className="text-[8px] font-black text-white transform -rotate-45">3</span>
          </div>
          <div className="text-right">
            <div className="text-[9px] font-mono text-slate-400 uppercase tracking-wider leading-none">
              CARGO HAZARD
            </div>
            <div className="text-xs sm:text-sm font-black font-mono text-amber-300 leading-tight">
              CLASS 3 FLAMMABLE
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Map Canvas */}
      <div className="relative z-10 flex-1 my-2 rounded-2xl bg-slate-900/90 border border-slate-800 p-3 flex flex-col justify-between overflow-hidden shadow-inner">
        {/* SVG Plant Schematic */}
        <svg viewBox="0 0 800 240" className="w-full h-full">
          {/* Outer Boundary Perimeter Road */}
          <rect x="20" y="20" width="760" height="200" rx="14" fill="#090d16" stroke="#1e293b" strokeWidth="2" />

          {/* MAIN GATE (Bottom Left Entry) */}
          <g transform="translate(40, 160)">
            <rect x="0" y="0" width="100" height="45" rx="6" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
            <text x="50" y="20" fill="#f8fafc" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
              SECURITY GATE
            </text>
            <text x="50" y="34" fill="#38bdf8" fontSize="8" fontFamily="sans-serif" textAnchor="middle">
              Gate Pass Verified
            </text>
          </g>

          {/* ROAD FORK LANES */}
          {/* Blocked Path (Red): To Main Assembly Building */}
          <path
            d="M 140 180 L 250 180 L 320 100 L 460 100"
            fill="none"
            stroke="#ef4444"
            strokeWidth="8"
            strokeDasharray="6 4"
            strokeOpacity="0.4"
          />

          {/* Authorized Bypass Path (Green): Around Perimeter to Chemical Annex */}
          <path
            d="M 140 195 L 340 195 L 560 195 L 630 145"
            fill="none"
            stroke="#10b981"
            strokeWidth="10"
            strokeLinecap="round"
            strokeOpacity="0.8"
          />
          <path
            d="M 140 195 L 340 195 L 560 195 L 630 145"
            fill="none"
            stroke="#34d399"
            strokeWidth="3"
            strokeDasharray="8 6"
          />

          {/* BLOCKED DESTINATION: Main Vehicle Assembly Plant & Dock 01 */}
          <g transform="translate(460, 40)">
            <rect x="0" y="0" width="180" height="85" rx="8" fill="#1e1b24" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 2" />
            <text x="90" y="24" fill="#fca5a5" fontSize="11" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
              MAIN VEHICLE PLANT
            </text>
            <text x="90" y="40" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="middle">
              Dock 01 · Scooter Line
            </text>
            <rect x="25" y="52" width="130" height="22" rx="4" fill="#7f1d1d" />
            <text x="90" y="67" fill="#fecaca" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
              🚫 PROHIBITED FOR SOLVENTS
            </text>
          </g>

          {/* AUTHORIZED DESTINATION: Isolated Chemical Building Annex C-04 */}
          <g transform="translate(630, 90)">
            <rect x="0" y="0" width="140" height="110" rx="10" fill="#064e3b" stroke="#10b981" strokeWidth="2.5" />
            <rect x="10" y="10" width="120" height="24" rx="4" fill="#047857" />
            <text x="70" y="26" fill="#ecfdf5" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
              ANNEX C-04 [✓]
            </text>
            <text x="70" y="52" fill="#a7f3d0" fontSize="9" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
              CHEMICAL STORAGE
            </text>
            <text x="70" y="68" fill="#6ee7b7" fontSize="8" fontFamily="monospace" textAnchor="middle">
              Explosion-Proof Vault
            </text>
            <rect x="15" y="78" width="110" height="20" rx="3" fill="#065f46" stroke="#34d399" strokeWidth="1" />
            <text x="70" y="92" fill="#ecfdf5" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
              FLAMEPROOF BERM
            </text>
          </g>

          {/* ANIMATED TRUCK ALONG GREEN ROUTE */}
          <g transform={`translate(${160 + truckStep * 115}, ${180})`}>
            {/* Truck Cab & Chassis */}
            <rect x="0" y="0" width="38" height="18" rx="3" fill="#f59e0b" stroke="#b45309" strokeWidth="1" />
            <rect x="25" y="2" width="10" height="14" rx="2" fill="#0284c7" />
            {/* Wheels */}
            <circle cx="8" cy="20" r="3.5" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1" />
            <circle cx="30" cy="20" r="3.5" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1" />
            {/* Hazard Flag */}
            <rect x="6" y="-8" width="12" height="7" fill="#dc2626" rx="1" />
            <text x="12" y="-3" fill="#ffffff" fontSize="5" fontWeight="bold" textAnchor="middle">
              HAZ
            </text>
          </g>
        </svg>

        {/* Legend / Route Dispatch Strip */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800 text-[10px] font-mono text-slate-300">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
              <CheckCircle2 className="w-3 h-3" />
              SOP Mandated: Bypass to Detached Chemical Annex
            </span>
            <span className="inline-flex items-center gap-1 text-rose-400 font-bold bg-rose-950/60 px-2 py-0.5 rounded border border-rose-500/30">
              <XCircle className="w-3 h-3" />
              Main Plant Dock 01 Prohibited
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-400">
            <span>Gate Pass Destination:</span>
            <span className="text-amber-300 font-bold">Building C-04 Annex</span>
          </div>
        </div>
      </div>

      {/* Footer Info Strip */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-amber-500/30 text-[10px] font-mono text-slate-400">
        <div className="flex items-center gap-1.5 text-amber-300">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
          <span>SOP Clause 4.1: Chemical trucks proceed directly to the designated separate building</span>
        </div>

        <div className="flex items-center gap-1 text-slate-300">
          <span>Vehicle Movement:</span>
          <span className="text-emerald-300 font-bold">Direct Annex Transfer</span>
          <ArrowRight className="w-3 h-3 text-emerald-400" />
        </div>
      </div>
    </div>
  );
};
