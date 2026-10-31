import React, { useState, useEffect } from 'react';
import { Layers, CheckCircle2, ShieldAlert, Cpu, ArrowRight, Palette } from 'lucide-react';

interface Props {
  videoSrc?: string;
  isPaused: boolean;
  onPauseReached?: () => void;
}

export const MezzanineSequencingAnimation: React.FC<Props> = ({
  videoSrc,
  isPaused,
  onPauseReached
}) => {
  const [videoAvailable, setVideoAvailable] = useState<boolean>(Boolean(videoSrc));

  useEffect(() => {
    setVideoAvailable(Boolean(videoSrc));
  }, [videoSrc]);
  const [hasTriggeredPause, setHasTriggeredPause] = useState(false);
  const [activeTask, setActiveTask] = useState<1 | 2>(1);

  useEffect(() => {
    if (!hasTriggeredPause && !isPaused) {
      const timer = setTimeout(() => {
        setHasTriggeredPause(true);
        if (onPauseReached) onPauseReached();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [hasTriggeredPause, isPaused, onPauseReached]);

  // Periodic cycle demonstrating switching between Task 1 (Black) and Task 2 (Red)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTask((prev) => (prev === 1 ? 2 : 1));
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

      {/* Industrial Floor Grid Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 opacity-95 pointer-events-none" />
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, #8b5cf6 1px, transparent 1px), linear-gradient(to bottom, #8b5cf6 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* Header Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-inner">
            <Palette className="w-4 h-4 text-purple-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-black font-mono tracking-wider text-slate-100 uppercase">
                MEZZANINE BODY-PART SEQUENCING &amp; KITTING
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                SOP 04_C2_S2 · CLAUSE 4.1
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-400 font-mono">
              Ather AURIC Plant M002 · Mezzanine Staging · 20 Black + 10 Red Sequence
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-700/80">
          <span className="inline-block w-2 h-2 rounded-full bg-purple-400 animate-ping" />
          <span className="text-purple-300 font-bold">PRODUCTION PLAN SYNCHRONIZED</span>
        </div>
      </div>

      {/* Main Grid: Mezzanine Source vs Dual-Task WH Order */}
      <div className="relative z-10 my-auto grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
        {/* Left Column (5 cols): Mezzanine Painted Buffer */}
        <div className="md:col-span-5 bg-slate-900/90 rounded-2xl border border-slate-800 p-3.5 space-y-3 font-mono">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-[11px] font-bold text-slate-300 uppercase flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-purple-400" />
              Mezzanine Floor Buffer
            </span>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
              PAINTED STOCK
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {/* Cosmic Black Source Rack */}
            <div className={`p-2.5 rounded-xl border transition-all ${
              activeTask === 1
                ? 'bg-slate-950 border-purple-500 shadow-md shadow-purple-500/20'
                : 'bg-slate-950/60 border-slate-800'
            }`}>
              <div className="flex items-center justify-between pb-1">
                <span className="text-[10px] font-bold text-slate-400">RACK MZ-01</span>
                <span className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-600" />
              </div>
              <div className="font-bold text-slate-200">Cosmic Black</div>
              <div className="text-[10px] text-purple-400 font-bold">Pick 20 TSPs</div>
            </div>

            {/* True Red Source Rack */}
            <div className={`p-2.5 rounded-xl border transition-all ${
              activeTask === 2
                ? 'bg-rose-950/40 border-rose-500 shadow-md shadow-rose-500/20'
                : 'bg-slate-950/60 border-slate-800'
            }`}>
              <div className="flex items-center justify-between pb-1">
                <span className="text-[10px] font-bold text-slate-400">RACK MZ-02</span>
                <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
              </div>
              <div className="font-bold text-rose-300">True Red</div>
              <div className="text-[10px] text-rose-400 font-bold">Pick 10 TSPs</div>
            </div>
          </div>

          <div className="bg-slate-950/60 p-2 rounded-lg border border-slate-800 text-[10px] flex items-center justify-between">
            <span className="text-slate-400">Total Kitted Load:</span>
            <span className="text-emerald-400 font-bold">30 Panels (100% Full Trolley)</span>
          </div>
        </div>

        {/* Center Indicator (2 cols): Dual Task Link */}
        <div className="hidden md:flex md:col-span-2 flex-col items-center justify-center gap-2">
          <div className="w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500 text-purple-400 flex items-center justify-center shadow-md shadow-purple-500/20">
            <Cpu className="w-5 h-5 animate-pulse" />
          </div>
          <span className="text-[9px] font-mono font-bold text-slate-400 text-center uppercase tracking-tight">
            1 ORDER = 2 TASKS
          </span>
          <div className="w-full h-0.5 bg-gradient-to-r from-purple-500/40 via-cyan-500/60 to-purple-500/40" />
        </div>

        {/* Right Column (5 cols): MES WH Order #4402 */}
        <div className="md:col-span-5 bg-slate-900/90 rounded-2xl border border-slate-800 p-3.5 space-y-3 font-mono">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-[11px] font-bold text-slate-300 uppercase flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              MES WH Order #4402
            </span>
            <span className="text-[10px] font-bold text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/30">
              SEQUENCE DISPATCH
            </span>
          </div>

          <div className="space-y-2 bg-slate-950/90 rounded-xl p-3 border border-slate-800/80 text-xs">
            <div className={`p-1.5 rounded-lg border flex items-center justify-between ${
              activeTask === 1
                ? 'bg-purple-950/40 border-purple-500/60 text-purple-300'
                : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}>
              <span>WH Task 1: 20 Black TSPs</span>
              <span className="font-bold flex items-center gap-1">
                {activeTask === 1 ? <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> : null}
                {activeTask === 1 ? 'ACTIVE PICK' : 'QUEUED'}
              </span>
            </div>

            <div className={`p-1.5 rounded-lg border flex items-center justify-between ${
              activeTask === 2
                ? 'bg-rose-950/40 border-rose-500/60 text-rose-300'
                : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}>
              <span>WH Task 2: 10 Red TSPs</span>
              <span className="font-bold flex items-center gap-1">
                {activeTask === 2 ? <CheckCircle2 className="w-3.5 h-3.5 text-rose-400" /> : null}
                {activeTask === 2 ? 'ACTIVE PICK' : 'QUEUED'}
              </span>
            </div>

            <div className="mt-2 p-2 rounded-lg bg-cyan-950/40 border border-cyan-500/40 text-[10px] text-cyan-300 flex items-center gap-2">
              <ArrowRight className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>SOP Mandate: Completing both tasks satisfies WH Order for 1 trolley.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer SOP Verification Note */}
      <div className="relative z-10 border-t border-slate-800/80 pt-2 flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-[11px] text-slate-400 font-mono gap-1.5">
        <div className="flex items-center gap-1.5 text-purple-400 font-medium">
          <ShieldAlert className="w-3.5 h-3.5 text-purple-400 shrink-0" />
          <span>SOP Clause 4.1: Kitted parts must strictly reflect the day's vehicle build schedule (20 Black + 10 Red).</span>
        </div>
        <div className="text-slate-400 text-right">
          Ather AURIC Plant M002 · Mezzanine Kitting
        </div>
      </div>
    </div>
  );
};
