import React, { useState, useEffect } from 'react';
import { Box, CheckCircle2, ShieldAlert, Cpu, ArrowRight, Cog } from 'lucide-react';

interface Props {
  videoSrc?: string;
  isPaused: boolean;
  onPauseReached?: () => void;
}

export const BrakeMotorDecantingAnimation: React.FC<Props> = ({
  videoSrc,
  isPaused,
  onPauseReached
}) => {
  const [videoAvailable, setVideoAvailable] = useState<boolean>(false);
  const [hasTriggeredPause, setHasTriggeredPause] = useState(false);
  const [componentType, setComponentType] = useState<'brakes' | 'motors'>('motors');

  useEffect(() => {
    if (!hasTriggeredPause && !isPaused) {
      const timer = setTimeout(() => {
        setHasTriggeredPause(true);
        if (onPauseReached) onPauseReached();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [hasTriggeredPause, isPaused, onPauseReached]);

  // Periodic cycle demonstrating switching between Brakes and Motors
  useEffect(() => {
    const interval = setInterval(() => {
      setComponentType((prev) => (prev === 'motors' ? 'brakes' : 'motors'));
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[320px] sm:h-[390px] md:h-[430px] bg-slate-950 rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-slate-800 shadow-2xl select-none flex flex-col justify-between p-3 sm:p-5">
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

      {/* Industrial Grid Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 opacity-95 pointer-events-none" />
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, #0284c7 1px, transparent 1px), linear-gradient(to bottom, #0284c7 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* Header Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 shadow-inner">
            <Cog className="w-4 h-4 text-sky-400 animate-spin" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-black font-mono tracking-wider text-slate-100 uppercase">
                MECHANICAL DECANTING: BRAKES &amp; MOTORS
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-500/40">
                SOP 04_C2_S2 · CLAUSES 4.2 &amp; 4.3
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-400 font-mono">
              Ather AURIC Plant M002 · Vehicle Plant Decanting · 90 Bulk FLC vs 30 Trolley
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-700/80">
          <span className="inline-block w-2 h-2 rounded-full bg-sky-400 animate-ping" />
          <span className="text-sky-300 font-bold uppercase">
            ACTIVE SKU: {componentType === 'motors' ? 'PMSM MOTOR (90 FLC)' : 'DISC BRAKE ASSY (90 FLC)'}
          </span>
        </div>
      </div>

      {/* Main Grid: Bulk FLC (90) vs Decanted Trolley (30) */}
      <div className="relative z-10 my-auto grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
        {/* Left Column (5 cols): Bulk Supplier FLC */}
        <div className="md:col-span-5 bg-slate-900/90 rounded-2xl border border-slate-800 p-3.5 space-y-3 font-mono">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-[11px] font-bold text-slate-300 uppercase flex items-center gap-1.5">
              <Box className="w-3.5 h-3.5 text-sky-400" />
              Supplier Bulk FLC
            </span>
            <span className="text-[10px] font-bold text-sky-300 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/30">
              BULK: 90 NOS
            </span>
          </div>

          <div className="bg-slate-950/80 rounded-xl p-3 border border-slate-800/80 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Component:</span>
              <span className="font-bold text-slate-200">
                {componentType === 'motors' ? 'PMSM Permanent Magnet Motor' : 'Hydraulic Disc Brake Caliper'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Total Bulk Pack:</span>
              <span className="font-bold text-sky-300">90 Units per FLC</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Decanted Quantity:</span>
              <span className="font-bold text-emerald-400">Extract Exactly 30 Units</span>
            </div>

            <div className="bg-slate-900 p-2 rounded-lg border border-slate-800 text-[10px] flex items-center justify-between">
              <span className="text-slate-400">Remaining in FLC:</span>
              <span className="text-slate-300 font-bold">60 Units (Protected 2-Bin Buffer)</span>
            </div>
          </div>
        </div>

        {/* Center Indicator (2 cols): 90 -> 30 Ratio */}
        <div className="hidden md:flex md:col-span-2 flex-col items-center justify-center gap-2">
          <div className="w-10 h-10 rounded-full bg-sky-500/10 border border-sky-500 text-sky-400 flex items-center justify-center shadow-md shadow-sky-500/20">
            <ArrowRight className="w-5 h-5" />
          </div>
          <span className="text-[9px] font-mono font-bold text-slate-400 text-center uppercase tracking-tight">
            EXACT 30 NOS
          </span>
          <div className="w-full h-0.5 bg-gradient-to-r from-sky-500/40 via-emerald-500/60 to-sky-500/40" />
        </div>

        {/* Right Column (5 cols): Internal Wheeled Trolley */}
        <div className="md:col-span-5 bg-slate-900/90 rounded-2xl border border-slate-800 p-3.5 space-y-3 font-mono">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-[11px] font-bold text-slate-300 uppercase flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              Specialized Internal Trolley
            </span>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
              30/30 (100% FULL)
            </span>
          </div>

          <div className="space-y-2 bg-slate-950/90 rounded-xl p-3 border border-slate-800/80 text-xs">
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">Trolley Capacity:</span>
              <span className="font-bold text-slate-200">Exactly 30 Units</span>
            </div>
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">Protective Packaging:</span>
              <span className="font-bold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Anti-Scratch Foam Molded
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Line Destination:</span>
              <span className="font-bold text-cyan-300">
                {componentType === 'motors' ? 'WS-14 (Powertrain Fitment)' : 'WS-16 (Brake Bleed Station)'}
              </span>
            </div>

            <div className="mt-2 p-2 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-[10px] text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Standard 30-unit batch synchronizes with main line tact time.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer SOP Verification Note */}
      <div className="relative z-10 border-t border-slate-800/80 pt-2 flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-[11px] text-slate-400 font-mono gap-1.5">
        <div className="flex items-center gap-1.5 text-sky-400 font-medium">
          <ShieldAlert className="w-3.5 h-3.5 text-sky-400 shrink-0" />
          <span>SOP Clauses 4.2 &amp; 4.3: Decanting MP takes exactly 30 qty from 90-unit FLC and moves to workstation.</span>
        </div>
        <div className="text-slate-400 text-right">
          Ather AURIC Plant M002 · Mechanical Decanting
        </div>
      </div>
    </div>
  );
};
