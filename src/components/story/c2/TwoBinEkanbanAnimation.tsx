import React, { useState, useEffect } from 'react';
import { Radio, RefreshCcw, CheckCircle2, AlertTriangle, ShieldAlert, Layers, Box } from 'lucide-react';

interface Props {
  videoSrc?: string;
  isPaused: boolean;
  onPauseReached?: () => void;
}

export const TwoBinEkanbanAnimation: React.FC<Props> = ({
  videoSrc,
  isPaused,
  onPauseReached
}) => {
  const [videoAvailable, setVideoAvailable] = useState<boolean>(false);
  const [hasTriggeredPause, setHasTriggeredPause] = useState(false);
  const [triggerActive, setTriggerActive] = useState<boolean>(false);

  useEffect(() => {
    if (!hasTriggeredPause && !isPaused) {
      const timer = setTimeout(() => {
        setHasTriggeredPause(true);
        if (onPauseReached) onPauseReached();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [hasTriggeredPause, isPaused, onPauseReached]);

  // Periodic cycle demonstrating e-Kanban replenishment wave
  useEffect(() => {
    const interval = setInterval(() => {
      setTriggerActive((prev) => !prev);
    }, 2200);
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
          backgroundImage: 'linear-gradient(to right, #f59e0b 1px, transparent 1px), linear-gradient(to bottom, #f59e0b 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* Header Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner">
            <Radio className="w-4 h-4 text-amber-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-black font-mono tracking-wider text-slate-100 uppercase">
                2-PALLET DECANTING BUFFER &amp; E-KANBAN RFID TRIGGER
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                SOP 03_C2_S2 · CLAUSE 4.1 &amp; FM 5.2
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-400 font-mono">
              Ather AURIC Plant M002 · Decanting Area · Tail Side Panels (TSP) 2-Bin Layout
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-700/80">
          <span className={`inline-block w-2 h-2 rounded-full ${triggerActive ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`} />
          <span className={triggerActive ? 'text-amber-300 font-bold' : 'text-emerald-300 font-bold'}>
            {triggerActive ? 'E-KANBAN RFID BROADCASTING' : '2-PALLET BUFFER MONITORED'}
          </span>
        </div>
      </div>

      {/* Main Grid: 2 Pallet Decant Positions vs MHE Replenishment */}
      <div className="relative z-10 my-auto grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
        {/* Left Column (6 cols): The 2-Pallet Dedicated Buffer */}
        <div className="md:col-span-6 bg-slate-900/90 rounded-2xl border border-slate-800 p-3.5 space-y-3 font-mono">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-[11px] font-bold text-slate-300 uppercase flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              Decanting Pallet Positions
            </span>
            <span className="text-[10px] font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
              2-BIN MIN-MAX
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {/* Position 1: Depleted Bin */}
            <div className={`p-2.5 rounded-xl border space-y-1.5 transition-all ${
              triggerActive
                ? 'bg-rose-950/40 border-rose-500/60 shadow-md shadow-rose-500/10'
                : 'bg-slate-950 border-slate-800'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400">POS #01</span>
                <span className="text-[9px] font-bold text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded border border-rose-500/30">
                  DEPLETED
                </span>
              </div>
              <div className="font-bold text-slate-300">Bin 1: TSP (Empty)</div>
              <div className="text-[10px] text-rose-300 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3 text-rose-400" />
                Trigger Kanban Now
              </div>
            </div>

            {/* Position 2: Active Buffer */}
            <div className="p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-500/50 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400">POS #02</span>
                <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/30">
                  ACTIVE
                </span>
              </div>
              <div className="font-bold text-emerald-300">Bin 2: TSP (Full)</div>
              <div className="text-[10px] text-slate-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                Feeding Paint Line
              </div>
            </div>
          </div>

          <div className="bg-slate-950/60 p-2 rounded-lg border border-slate-800/80 text-[10px] flex items-center justify-between">
            <span className="text-slate-400">Zone Leader Protocol:</span>
            <span className="text-amber-300 font-bold">1 Bin Consumed &rarr; Instant RFID Trigger</span>
          </div>
        </div>

        {/* Right Column (6 cols): SAP EWM & MHE Dispatch */}
        <div className="md:col-span-6 bg-slate-900/90 rounded-2xl border border-slate-800 p-3.5 space-y-3 font-mono">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-[11px] font-bold text-slate-300 uppercase flex items-center gap-1.5">
              <RefreshCcw className="w-3.5 h-3.5 text-cyan-400" />
              MHE Replenishment WH Task
            </span>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
              SAP EWM LINK
            </span>
          </div>

          <div className="space-y-2 bg-slate-950/90 rounded-xl p-3 border border-slate-800/80 text-xs">
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">e-Kanban RFID Signal:</span>
              <span className="font-bold text-amber-300 flex items-center gap-1">
                <Radio className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                RFID-TAG-TSP-048
              </span>
            </div>
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">High-Rise Rack Source:</span>
              <span className="font-bold text-cyan-300">HRR-B-04-12 (Pallet FLC)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">MHE Dispatch Action:</span>
              <span className="font-bold text-emerald-400 flex items-center gap-1">
                <Box className="w-3.5 h-3.5" />
                Forklift Pull &rarr; Decanting Drop
              </span>
            </div>

            {/* Failure Mode 5.2 Warning Strip */}
            <div className="mt-2 p-2 rounded-lg bg-amber-950/30 border border-amber-600/40 text-[10px] text-amber-300 flex items-center gap-2">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Delaying the e-Kanban trigger starves the paint line when Bin 2 runs dry!</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer SOP Protocol Strip */}
      <div className="relative z-10 border-t border-slate-800/80 pt-2 flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-[11px] text-slate-400 font-mono gap-1.5">
        <div className="flex items-center gap-1.5 text-amber-400 font-medium">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>SOP Clause 4.1: Decanting ZL must maintain exactly 2 pallet/bin positions of each body-part at all times.</span>
        </div>
        <div className="text-slate-400 text-right">
          Ather AURIC Plant M002 · Paint Decanting
        </div>
      </div>
    </div>
  );
};
