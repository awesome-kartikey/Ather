import React, { useState, useEffect } from 'react';
import { Clock, AlertTriangle, ShieldCheck, Timer, Zap, ArrowRight, ShieldAlert } from 'lucide-react';

interface Props {
  videoSrc?: string;
  isPaused: boolean;
  onPauseReached?: () => void;
}

export const BatterySlaCountdownAnimation: React.FC<Props> = ({
  videoSrc,
  isPaused,
  onPauseReached
}) => {
  const [videoAvailable, setVideoAvailable] = useState<boolean>(false);
  const [hasTriggeredPause, setHasTriggeredPause] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(6124); // 01h 42m 04s

  useEffect(() => {
    if (!hasTriggeredPause && !isPaused) {
      const timer = setTimeout(() => {
        setHasTriggeredPause(true);
        if (onPauseReached) onPauseReached();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [hasTriggeredPause, isPaused, onPauseReached]);

  // Live seconds ticker when not paused
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setSecondsElapsed((prev) => (prev < 7200 ? prev + 1 : 7200));
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaused]);

  // Formatting helper
  const formatTime = (totalSecs: number) => {
    const h = Math.floor(totalSecs / 3600);
    const m = Math.floor((totalSecs % 3600) / 60);
    const s = totalSecs % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const remainingSecs = Math.max(0, 7200 - secondsElapsed); // 7200s = 2 hrs
  const progressPercent = Math.min(100, Math.round((secondsElapsed / 7200) * 100));

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

      {/* Background Gradients & Tech Grid */}
      <div className="absolute inset-0 bg-radial-gradient from-slate-900 via-slate-950 to-slate-950 opacity-95 pointer-events-none" />
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, #38bdf8 1px, transparent 1px), linear-gradient(to bottom, #38bdf8 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* Header Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-slate-800/80 pb-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner">
            <Timer className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-black font-mono tracking-wider text-slate-100 uppercase">
                BATTERY PUT-AWAY SLA MONITOR
              </span>
              <span className="hidden sm:inline px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                SOP CLAUSE 4.3
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono">
              AURIC M002 · INBOUND GATE TO CELL VAULT TIME WINDOW
            </p>
          </div>
        </div>

        {/* Live SLA Countdown Badge */}
        <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-700/80 rounded-xl px-3 py-1.5 shadow-sm">
          <Clock className="w-4 h-4 text-amber-400" />
          <div className="text-right">
            <div className="text-[9px] font-mono text-slate-400 uppercase tracking-wider leading-none">
              SLA LIMIT
            </div>
            <div className="text-xs sm:text-sm font-black font-mono text-amber-300 leading-tight">
              02:00:00 MAX
            </div>
          </div>
        </div>
      </div>

      {/* Main SLA Cockpit Display */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 my-auto">
        {/* Left Column: Big SLA Digital Clock & Progress (5 cols) */}
        <div className="md:col-span-5 bg-slate-900/80 rounded-2xl border border-slate-800 p-3 sm:p-4 flex flex-col justify-between shadow-lg">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              ELAPSED DOCK TIME:
            </span>
            <span className="text-amber-400 font-bold">{progressPercent}% of Limit</span>
          </div>

          {/* Big Digital Numbers */}
          <div className="my-2 py-2 px-3 bg-black/60 rounded-xl border border-slate-800 text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl font-mono font-black tracking-widest text-amber-300 drop-shadow-[0_0_12px_rgba(251,191,36,0.35)]">
              {formatTime(secondsElapsed)}
            </div>
            <div className="text-[10px] font-mono text-slate-400 mt-0.5">
              HRS : MIN : SEC SINCE GATE INWARD ENTRY
            </div>
          </div>

          {/* Progress Bar towards 2-hour cutoff */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[10px] font-mono">
              <span className="text-emerald-400 font-bold">00:00 (Inward)</span>
              <span className="text-amber-300 font-bold">Rem: {formatTime(remainingSecs)}</span>
              <span className="text-rose-400 font-bold">02:00 (Cutoff)</span>
            </div>
            <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800 p-0.5">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  progressPercent > 80 ? 'bg-gradient-to-r from-amber-500 to-rose-500' : 'bg-gradient-to-r from-emerald-500 to-amber-500'
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* SLA Warning Note */}
          <div className="mt-2.5 flex items-start gap-2 bg-amber-950/40 border border-amber-500/30 rounded-lg p-2 text-[10px] text-amber-200/90 leading-tight">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
            <span>
              <strong>CRITICAL SLA RULE:</strong> All battery cell pallets must be stowed and confirmed in the Standard Room within <strong>2 hours</strong> of dock arrival.
            </span>
          </div>
        </div>

        {/* Right Column: Comparative Risk Simulation (7 cols) */}
        <div className="md:col-span-7 grid grid-cols-2 gap-2.5">
          {/* Zone A: Uncontrolled Dock Staging (RISK ZONE) */}
          <div className="bg-rose-950/20 border border-rose-500/30 rounded-2xl p-3 flex flex-col justify-between shadow-md">
            <div>
              <div className="flex items-center justify-between pb-1.5 border-b border-rose-500/20">
                <span className="text-[10px] font-mono font-bold text-rose-400 uppercase">
                  ZONE A · INBOUND DOCK
                </span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-rose-500/20 text-rose-300">
                  UNCONTROLLED
                </span>
              </div>

              <div className="mt-2 space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-300">
                  <span>Ambient Temp:</span>
                  <span className="text-rose-400 font-bold">33.5°C (High)</span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-300">
                  <span>Relative Humid:</span>
                  <span className="text-amber-400 font-bold">42% RH (Low)</span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-300">
                  <span>Air Quality:</span>
                  <span className="text-rose-400 font-bold">Dock Dust / Fumes</span>
                </div>
              </div>
            </div>

            <div className="mt-2.5 pt-2 border-t border-rose-500/20 text-[10px] text-rose-300 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <span>Cell Thermal Aging Hazard if &gt; 2 Hours!</span>
            </div>
          </div>

          {/* Zone B: Battery Standard Room Vault (TARGET GOAL) */}
          <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-3 flex flex-col justify-between shadow-md">
            <div>
              <div className="flex items-center justify-between pb-1.5 border-b border-emerald-500/20">
                <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase">
                  ZONE B · CELL VAULT
                </span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-500/20 text-emerald-300">
                  CONTROLLED
                </span>
              </div>

              <div className="mt-2 space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-300">
                  <span>Target Temp:</span>
                  <span className="text-emerald-400 font-bold">20°C – 25°C [✓]</span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-300">
                  <span>Target Humid:</span>
                  <span className="text-emerald-400 font-bold">60% – 65% RH [✓]</span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-300">
                  <span>Filtration:</span>
                  <span className="text-emerald-400 font-bold">ISO Class 7 HEPA</span>
                </div>
              </div>
            </div>

            <div className="mt-2.5 pt-2 border-t border-emerald-500/20 text-[10px] text-emerald-300 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Optimum Cell Health & Stability Protected</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info Strip */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80 text-[10px] font-mono text-slate-400">
        <div className="flex items-center gap-1.5 text-slate-300">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <span>SOP Clause 4.3: Transfer + Destination QR Scan must complete within 2 Hours</span>
        </div>

        <div className="flex items-center gap-1 text-slate-300">
          <span>Target Destination:</span>
          <span className="text-sky-300 font-bold">Standard Room Vault Rack SR-C01</span>
          <ArrowRight className="w-3 h-3 text-sky-400" />
        </div>
      </div>
    </div>
  );
};
