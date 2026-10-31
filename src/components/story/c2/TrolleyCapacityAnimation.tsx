import React, { useState, useEffect } from 'react';
import { Box, CheckCircle2, ShieldAlert, AlertTriangle, ArrowRight, XCircle } from 'lucide-react';

interface Props {
  videoSrc?: string;
  isPaused: boolean;
  onPauseReached?: () => void;
}

export const TrolleyCapacityAnimation: React.FC<Props> = ({
  videoSrc,
  isPaused,
  onPauseReached
}) => {
  const [videoAvailable, setVideoAvailable] = useState<boolean>(false);
  const [hasTriggeredPause, setHasTriggeredPause] = useState(false);
  const [fillState, setFillState] = useState<'partial' | 'full'>('full');

  useEffect(() => {
    if (!hasTriggeredPause && !isPaused) {
      const timer = setTimeout(() => {
        setHasTriggeredPause(true);
        if (onPauseReached) onPauseReached();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [hasTriggeredPause, isPaused, onPauseReached]);

  // Periodic cycle demonstrating partial vs 100% full trolley comparison
  useEffect(() => {
    const interval = setInterval(() => {
      setFillState((prev) => (prev === 'full' ? 'partial' : 'full'));
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
          backgroundImage: 'linear-gradient(to right, #10b981 1px, transparent 1px), linear-gradient(to bottom, #10b981 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* Header Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-inner">
            <Box className="w-4 h-4 text-emerald-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-black font-mono tracking-wider text-slate-100 uppercase">
                THE 100% FULL TROLLEY CAPACITY MANDATE
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                SOP 03_C2_S2 · FAILURE MODE 5.1
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-400 font-mono">
              Ather AURIC Plant M002 · Tail Side Panel (TSP) Decanting Transfer
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-700/80">
          <span className={`inline-block w-2 h-2 rounded-full ${fillState === 'full' ? 'bg-emerald-400' : 'bg-rose-400 animate-ping'}`} />
          <span className={fillState === 'full' ? 'text-emerald-300 font-bold' : 'text-rose-300 font-bold'}>
            {fillState === 'full' ? '100% FULL TROLLEY (APPROVED)' : 'PARTIAL TROLLEY (REJECTED)'}
          </span>
        </div>
      </div>

      {/* Main Grid: Supplier FLC vs Decanted Internal Trolley */}
      <div className="relative z-10 my-auto grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
        {/* Left Column (5 cols): Bulk Supplier FLC (110 TSPs) */}
        <div className="md:col-span-5 bg-slate-900/90 rounded-2xl border border-slate-800 p-3.5 space-y-3 font-mono">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-[11px] font-bold text-slate-300 uppercase flex items-center gap-1.5">
              <Box className="w-3.5 h-3.5 text-cyan-400" />
              Supplier Bulk FLC
            </span>
            <span className="text-[10px] font-bold text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">
              CAPACITY: 110 TSPs
            </span>
          </div>

          <div className="bg-slate-950/80 rounded-xl p-3 border border-slate-800/80 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">FLC Container Lot:</span>
              <span className="font-bold text-slate-200">FLC-TSP-2026-881</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Total Bulk Qty:</span>
              <span className="font-bold text-cyan-300">110 Tail Side Panels</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Decant Withdrawal:</span>
              <span className="font-bold text-emerald-400">Extract Exactly 30 Units</span>
            </div>

            <div className="bg-slate-900 p-2 rounded-lg border border-slate-800 text-[10px] flex items-center justify-between">
              <span className="text-slate-400">Remaining in FLC:</span>
              <span className="text-slate-300 font-bold">80 TSPs (Protected Buffer)</span>
            </div>
          </div>
        </div>

        {/* Center Indicator (2 cols): Transfer Action */}
        <div className="hidden md:flex md:col-span-2 flex-col items-center justify-center gap-2">
          <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500 text-emerald-400 flex items-center justify-center shadow-md shadow-emerald-500/20">
            <ArrowRight className="w-5 h-5" />
          </div>
          <span className="text-[9px] font-mono font-bold text-slate-400 text-center uppercase tracking-tight">
            EXACT 30 LOAD
          </span>
          <div className="w-full h-0.5 bg-gradient-to-r from-cyan-500/40 via-emerald-500/60 to-cyan-500/40" />
        </div>

        {/* Right Column (5 cols): Internal Mobile Kitting Trolley */}
        <div className={`md:col-span-5 rounded-2xl border p-3.5 space-y-3 font-mono transition-all duration-300 ${
          fillState === 'full'
            ? 'bg-slate-900/90 border-emerald-500/50 shadow-lg shadow-emerald-500/10'
            : 'bg-slate-900/90 border-rose-500/40 shadow-lg shadow-rose-500/10'
        }`}>
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-[11px] font-bold text-slate-300 uppercase flex items-center gap-1.5">
              <Box className="w-3.5 h-3.5 text-emerald-400" />
              Internal Wheeled Trolley
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
              fillState === 'full'
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
            }`}>
              {fillState === 'full' ? '30/30 (100% FULL)' : '24/30 (PARTIAL)'}
            </span>
          </div>

          <div className="space-y-2 bg-slate-950/90 rounded-xl p-3 border border-slate-800/80 text-xs">
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">Trolley Rated Capacity:</span>
              <span className="font-bold text-slate-200">Exactly 30 Panels</span>
            </div>
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">Current Loaded Count:</span>
              <span className={`font-bold ${fillState === 'full' ? 'text-emerald-400' : 'text-rose-400'}`}>
                {fillState === 'full' ? '30 Panels (Standard Batch)' : '24 Panels (Incomplete!)'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Zone Leader Sign-Off:</span>
              <span className={`font-bold flex items-center gap-1 ${
                fillState === 'full' ? 'text-emerald-400' : 'text-rose-400'
              }`}>
                {fillState === 'full' ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    APPROVED FOR LINE FEED
                  </>
                ) : (
                  <>
                    <XCircle className="w-3.5 h-3.5" />
                    REJECTED: UNDERFILLED
                  </>
                )}
              </span>
            </div>

            {/* Failure Mode 5.1 Banner */}
            <div className={`mt-2 p-2 rounded-lg text-[10px] flex items-center gap-2 border ${
              fillState === 'full'
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
            }`}>
              {fillState === 'full' ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>100% full capacity eliminates tact imbalance at the paint line.</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span>HALT: Partially filled trolleys are forbidden by SOP! Must top up to 30.</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer SOP Verification Note */}
      <div className="relative z-10 border-t border-slate-800/80 pt-2 flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-[11px] text-slate-400 font-mono gap-1.5">
        <div className="flex items-center gap-1.5 text-amber-400 font-medium">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>Failure Mode 5.1: Moving partial trolleys causes starvation. Mandatory ZL check before line release!</span>
        </div>
        <div className="text-slate-400 text-right">
          Ather AURIC Plant M002 · Decanting Quality Gate
        </div>
      </div>
    </div>
  );
};
