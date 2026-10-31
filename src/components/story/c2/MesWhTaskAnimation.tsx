import React, { useState, useEffect } from 'react';
import { Smartphone, Cpu, QrCode, ArrowRight, Zap, CheckCircle2, Radio } from 'lucide-react';

interface Props {
  videoSrc?: string;
  isPaused: boolean;
  onPauseReached?: () => void;
}

export const MesWhTaskAnimation: React.FC<Props> = ({
  videoSrc,
  isPaused,
  onPauseReached
}) => {
  const [videoAvailable, setVideoAvailable] = useState<boolean>(false);
  const [hasTriggeredPause, setHasTriggeredPause] = useState(false);
  const [pulseSignal, setPulseSignal] = useState(false);

  useEffect(() => {
    if (!hasTriggeredPause && !isPaused) {
      const timer = setTimeout(() => {
        setHasTriggeredPause(true);
        if (onPauseReached) onPauseReached();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [hasTriggeredPause, isPaused, onPauseReached]);

  // Periodic pulse simulating MES telemetry broadcast to HHT
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseSignal((prev) => !prev);
    }, 1000);
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
          backgroundImage: 'linear-gradient(to right, #06b6d4 1px, transparent 1px), linear-gradient(to bottom, #06b6d4 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* Header Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-inner">
            <Cpu className="w-4 h-4 text-cyan-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-black font-mono tracking-wider text-slate-100 uppercase">
                MES TRIGGER &amp; DIGITAL WH PICKING TASK
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                SOP 01_C2_S1 · CLAUSE 4.1
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-400 font-mono">
              Ather AURIC Plant M002 · Vehicle Assembly Line · Station 07 Feeder Loop
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-700/80">
          <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span className="text-cyan-300 font-bold">MES SYNC: REAL-TIME VIN CONSUMPTION</span>
        </div>
      </div>

      {/* Center Layout: MES Assembly Takt vs Digital HHT Terminal */}
      <div className="relative z-10 my-auto grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
        {/* Left Column (5 cols): Assembly Line VIN Trigger */}
        <div className="md:col-span-5 bg-slate-900/90 rounded-2xl border border-slate-800 p-3.5 space-y-3 font-mono">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-[11px] font-bold text-slate-300 uppercase flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              Main Assembly Line
            </span>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
              TAKT: 45 SEC
            </span>
          </div>

          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 space-y-2 text-[10px]">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Active Chassis VIN:</span>
              <span className="text-cyan-400 font-bold">ME4-ATH450X-2026-9912</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Target Workstation:</span>
              <span className="text-white font-bold">STN-07 (Main Wiring Dock)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Buffer Consumption:</span>
              <span className="text-rose-400 font-bold animate-pulse">1 Crate Remaining</span>
            </div>
          </div>

          <div className="text-[9px] bg-cyan-950/40 text-cyan-300 p-2 rounded-lg border border-cyan-800/40 flex items-center justify-between">
            <span>MES Action:</span>
            <span className="font-bold">Auto-Generate WH Task</span>
          </div>
        </div>

        {/* Center Connection Arrow */}
        <div className="hidden md:flex md:col-span-1 items-center justify-center">
          <div className="flex flex-col items-center text-slate-500 font-mono text-[9px] gap-1">
            <span className="text-center font-bold">MES</span>
            <ArrowRight className={`w-6 h-6 text-cyan-400 ${pulseSignal ? 'translate-x-1' : ''} transition-transform`} />
            <span className="text-center font-bold">HHT</span>
          </div>
        </div>

        {/* Right Column (6 cols): Line Feeder HHT Screen */}
        <div className="md:col-span-6 bg-slate-900/95 rounded-2xl border-2 border-cyan-500/60 p-3.5 space-y-2.5 font-mono shadow-xl shadow-cyan-950/40">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-black text-white uppercase">HHT FEEDER TERMINAL</span>
            </div>
            <span className="text-[10px] font-bold bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/40">
              TASK ACTIVE
            </span>
          </div>

          {/* HHT Picking Task Card */}
          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 space-y-2 text-[10px]">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-1.5">
              <span className="text-slate-400">WH Task ID:</span>
              <span className="text-white font-bold">WT-2026-AURIC-4402</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[9px]">
              <div>
                <span className="text-slate-500 block">Part Name:</span>
                <span className="font-bold text-slate-200">Main Wiring Harness</span>
              </div>
              <div>
                <span className="text-slate-500 block">Part Number:</span>
                <span className="font-bold text-slate-200">120049-A02</span>
              </div>
              <div>
                <span className="text-slate-500 block">Source Location:</span>
                <span className="font-bold text-amber-400">HRR-A-03-08 (High-Rise)</span>
              </div>
              <div>
                <span className="text-slate-500 block">Target Workstation:</span>
                <span className="font-bold text-emerald-400">Station 07 (Mainline)</span>
              </div>
            </div>

            <div className="p-1.5 bg-amber-950/40 border border-amber-800/50 rounded-lg flex items-center justify-between text-[9px] text-amber-300">
              <span>Next Mandatory Step:</span>
              <span className="font-bold flex items-center gap-1">
                <QrCode className="w-3 h-3" /> SCAN SOURCE LOCATION QR
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info Banner */}
      <div className="relative z-10 flex items-center justify-between pt-2 border-t border-slate-800 text-[10px] sm:text-xs font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
          <span>SOP Clause 4.1: Individual feeders have dedicated parts; no two feeders share line items</span>
        </div>
        <div className="flex items-center gap-1 text-cyan-400 font-bold">
          <span>ZERO LINE STARVATION</span>
        </div>
      </div>
    </div>
  );
};
