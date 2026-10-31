import React, { useState, useEffect } from 'react';
import { Microscope, AlertTriangle, ShieldAlert, CheckCircle2, XCircle, ArrowRight, Lock } from 'lucide-react';

interface Props {
  videoSrc?: string;
  isPaused: boolean;
  onPauseReached?: () => void;
}

export const IqcLotQuarantineAnimation: React.FC<Props> = ({
  videoSrc,
  isPaused,
  onPauseReached
}) => {
  const [videoAvailable, setVideoAvailable] = useState<boolean>(false);
  const [hasTriggeredPause, setHasTriggeredPause] = useState(false);
  const [strobe, setStrobe] = useState(false);

  useEffect(() => {
    if (!hasTriggeredPause && !isPaused) {
      const timer = setTimeout(() => {
        setHasTriggeredPause(true);
        if (onPauseReached) onPauseReached();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [hasTriggeredPause, isPaused, onPauseReached]);

  // Red strobe effect for NG defect detection
  useEffect(() => {
    const interval = setInterval(() => {
      setStrobe((prev) => !prev);
    }, 700);
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

      {/* Atmospheric Industrial Grid Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 opacity-95 pointer-events-none" />
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, #ef4444 1px, transparent 1px), linear-gradient(to bottom, #ef4444 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* Header Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 shadow-inner">
            <Microscope className="w-4 h-4 text-rose-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-black font-mono tracking-wider text-slate-100 uppercase">
                IQC DEFECT AUDIT &amp; WHOLE LOT LOCK
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                SOP 07_C1_S4 · CLAUSE 4.1
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-400 font-mono">
              Ather AURIC Plant M002 · IQC Test Bench 02 · Battery Wiring Harness
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] bg-rose-950/60 px-3 py-1.5 rounded-xl border border-rose-700/60 text-rose-300">
          <ShieldAlert className="w-3.5 h-3.5 text-rose-400 animate-bounce" />
          <span className="font-bold">DEFECT DETECTED · QUARANTINE ESCALATION</span>
        </div>
      </div>

      {/* Main Interactive Workstation Display */}
      <div className="relative z-10 my-auto grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
        {/* Left Column (5 cols): Sample Inspection Tray (10 samples) */}
        <div className="md:col-span-5 bg-slate-900/90 rounded-2xl border border-slate-800 p-3.5 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-[11px] font-mono font-bold text-slate-300 uppercase flex items-center gap-1.5">
              <Microscope className="w-3.5 h-3.5 text-cyan-400" />
              10% Sample Tray (10 Pcs)
            </span>
            <span className="text-[10px] font-mono font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/30">
              2 REJECTED
            </span>
          </div>

          {/* Grid of 10 sampled battery harness terminals */}
          <div className="grid grid-cols-5 gap-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-center font-mono text-[9px]">
            {/* 8 OK parts */}
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <div
                key={num}
                className="h-10 rounded-lg bg-emerald-950/40 border border-emerald-500/30 flex flex-col items-center justify-center gap-0.5 text-emerald-400"
              >
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                <span className="text-[8px]">OK #{num}</span>
              </div>
            ))}
            {/* 2 Defective Burnt parts */}
            <div
              className={`h-10 rounded-lg bg-rose-950/70 border-2 ${
                strobe ? 'border-rose-500 shadow-lg shadow-rose-500/50' : 'border-rose-700'
              } flex flex-col items-center justify-center gap-0.5 text-rose-300 animate-pulse`}
            >
              <XCircle className="w-3.5 h-3.5 text-rose-400" />
              <span className="text-[8px] font-black">BURNT #9</span>
            </div>
            <div
              className={`h-10 rounded-lg bg-rose-950/70 border-2 ${
                strobe ? 'border-rose-500 shadow-lg shadow-rose-500/50' : 'border-rose-700'
              } flex flex-col items-center justify-center gap-0.5 text-rose-300 animate-pulse`}
            >
              <XCircle className="w-3.5 h-3.5 text-rose-400" />
              <span className="text-[8px] font-black">BURNT #10</span>
            </div>
          </div>

          <div className="bg-rose-950/40 border border-rose-800/60 rounded-xl p-2 text-[10px] font-mono text-rose-300 space-y-1">
            <div className="flex items-center gap-1 font-bold text-rose-400">
              <AlertTriangle className="w-3 h-3" />
              <span>DEFECT: Contact Pin Burnout &amp; High Resistance</span>
            </div>
            <p className="text-[9px] text-slate-400 leading-tight">
              Thermal overload risk: Loose crimping causes arcing inside high-voltage harness.
            </p>
          </div>
        </div>

        {/* Center Connection Arrow */}
        <div className="hidden md:flex md:col-span-1 items-center justify-center">
          <div className="flex flex-col items-center text-rose-500 font-mono text-[9px] gap-1">
            <span className="text-center font-bold">LOCKS</span>
            <ArrowRight className="w-6 h-6 animate-pulse" />
            <span className="text-center font-bold">ALL</span>
          </div>
        </div>

        {/* Right Column (6 cols): The Full Inbound Lot (1,000 pcs) Locked */}
        <div className="md:col-span-6 bg-slate-900/95 rounded-2xl border-2 border-rose-600/70 p-3.5 space-y-3 relative overflow-hidden shadow-xl shadow-rose-950/30">
          {/* Danger Stripe Watermark */}
          <div className="absolute top-0 right-0 bg-rose-600 text-white font-mono font-black text-[9px] px-3 py-0.5 rounded-bl-xl tracking-wider flex items-center gap-1">
            <Lock className="w-2.5 h-2.5" /> 100% LOT QUARANTINED
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-black text-white uppercase">
                INWARD LOT: 1,000 CONNECTORS (50 CARTONS)
              </span>
            </div>
            <p className="text-[10px] font-mono text-slate-400">
              GRN: <span className="text-slate-200 font-bold">GRN-2026-88194</span> · Vendor: Amphenol Pune · Lot: BTH-941
            </p>
          </div>

          {/* Big Visual Pallet Blockade */}
          <div className="relative bg-slate-950 rounded-xl p-3 border border-slate-800 font-mono space-y-2">
            <div className="flex items-center justify-between text-[10px] text-slate-300">
              <span>Pallet Volume: <strong>1,000 pcs</strong></span>
              <span className="text-rose-400 font-bold">Zero parts to Put-Away</span>
            </div>

            {/* Quarantine Banner Across Pallet */}
            <div className="bg-gradient-to-r from-rose-700 via-rose-600 to-rose-700 text-white p-2 rounded-lg text-center font-black tracking-wider text-[11px] shadow-md border border-rose-400 flex items-center justify-center gap-2">
              <ShieldAlert className="w-4 h-4 animate-spin" />
              <span>WHOLE LOT LOCKED · PHYSICAL QUARANTINE</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[9px] text-slate-400 pt-1">
              <div>
                <span className="text-slate-500 block">JIRA Ticket:</span>
                <span className="text-cyan-400 font-bold">JIRA-NG-2026-0849</span>
              </div>
              <div>
                <span className="text-slate-500 block">Action Target:</span>
                <span className="text-amber-400 font-bold">Move to Caged Store SC01 BL</span>
              </div>
            </div>
          </div>

          {/* Rule Reminder */}
          <div className="text-[10px] font-mono bg-rose-950/60 border border-rose-800/60 text-rose-300 p-2 rounded-lg flex items-center justify-between">
            <span>SOP Mandate:</span>
            <span className="font-black text-white">NEVER ISOLATE JUST THE 2 SAMPLES</span>
          </div>
        </div>
      </div>

      {/* Footer Info Banner */}
      <div className="relative z-10 flex items-center justify-between pt-2 border-t border-slate-800 text-[10px] sm:text-xs font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
          <span>SOP Clause 4.1: Entire lot quarantined upon any sample failure</span>
        </div>
        <div className="flex items-center gap-1 text-rose-400 font-bold">
          <span>TARGET: STORE SC01 BL</span>
        </div>
      </div>
    </div>
  );
};
