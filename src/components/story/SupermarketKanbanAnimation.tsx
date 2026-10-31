import React, { useState, useEffect } from 'react';
import { Layers, QrCode, AlertCircle, CheckCircle2, ArrowRight, Radio, RefreshCcw } from 'lucide-react';

interface Props {
  videoSrc?: string;
  isPaused: boolean;
  onPauseReached?: () => void;
}

export const SupermarketKanbanAnimation: React.FC<Props> = ({
  videoSrc,
  isPaused,
  onPauseReached
}) => {
  const [videoAvailable, setVideoAvailable] = useState<boolean>(false);
  const [hasTriggeredPause, setHasTriggeredPause] = useState(false);
  const [scanPulse, setScanPulse] = useState(false);

  useEffect(() => {
    if (!hasTriggeredPause && !isPaused) {
      const timer = setTimeout(() => {
        setHasTriggeredPause(true);
        if (onPauseReached) onPauseReached();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [hasTriggeredPause, isPaused, onPauseReached]);

  // Periodic scanner beam pulse
  useEffect(() => {
    const interval = setInterval(() => {
      setScanPulse((prev) => !prev);
    }, 1200);
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
          backgroundImage: 'linear-gradient(to right, #0ea5e9 1px, transparent 1px), linear-gradient(to bottom, #0ea5e9 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* Header Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-inner">
            <Layers className="w-4 h-4 animate-pulse text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-black font-mono tracking-wider text-slate-100 uppercase">
                BIN LEVEL MONITOR &amp; E-KANBAN REPLENISHMENT
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                SOP CLAUSE 4.4 &amp; 4.5
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-400 font-mono">
              Ather AURIC Plant M002 · Supermarket Rack SM-04-B · C-Class Hardware
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-700/60">
          <span className="inline-block w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          <span className="text-rose-400 font-bold">MIN THRESHOLD HIT (2 BOXES)</span>
        </div>
      </div>

      {/* Center Display: Bin Level Gauge vs Physical Bin Card vs e-Kanban */}
      <div className="relative z-10 my-auto grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
        {/* Left Column (4 cols): Physical Fastener Bin & Level Stack */}
        <div className="md:col-span-4 bg-slate-900/90 rounded-2xl border border-slate-800 p-3.5 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-[11px] font-mono font-bold text-slate-400 uppercase">
              Bin Stock Gauge
            </span>
            <span className="text-[10px] font-mono font-black text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              SM-04-B (M6 Bolts)
            </span>
          </div>

          {/* Vertical Level Indicator Bar */}
          <div className="flex items-end gap-2 h-28 sm:h-32 bg-slate-950 rounded-xl p-2.5 border border-slate-800">
            {/* Visual stacked bars */}
            <div className="w-16 h-full flex flex-col-reverse gap-1 justify-start">
              {/* Level 1 & 2: Active in Red */}
              <div className="h-3 rounded bg-rose-500 shadow-sm shadow-rose-500/50 flex items-center justify-center text-[8px] font-mono font-black text-white">
                BOX 1
              </div>
              <div className="h-3 rounded bg-rose-500 shadow-sm shadow-rose-500/50 flex items-center justify-center text-[8px] font-mono font-black text-white animate-pulse">
                BOX 2 (MIN)
              </div>
              {/* Empty Levels 3 to 10 */}
              {[3, 4, 5, 6, 7, 8, 9, 10].map((lvl) => (
                <div
                  key={lvl}
                  className="h-2 rounded bg-slate-800/40 border border-slate-800/80 flex items-center justify-center text-[7px] font-mono text-slate-600"
                >
                  {lvl === 10 ? 'MAX: 10' : ''}
                </div>
              ))}
            </div>

            {/* Level Legend */}
            <div className="flex-1 flex flex-col justify-between h-full font-mono text-[9px] py-0.5">
              <div className="text-slate-500">
                <span className="text-emerald-400 font-bold">MAX: 10 Boxes</span> (1,000 pcs)
              </div>
              <div className="text-slate-500">
                <span className="text-amber-400 font-bold">REORDER: 4 Boxes</span>
              </div>
              <div className="bg-rose-500/20 p-1.5 rounded-lg border border-rose-500/40 text-rose-300 font-bold leading-tight">
                <div className="flex items-center gap-1 text-[10px] text-rose-400 font-black">
                  <AlertCircle className="w-3 h-3" />
                  <span>SAFETY MIN: 2</span>
                </div>
                <span>Current: 2 Boxes (200 pcs)</span>
              </div>
            </div>
          </div>

          <div className="text-[10px] font-mono text-center text-rose-400 font-bold bg-rose-950/40 border border-rose-800/50 py-1 rounded-lg">
            🚨 REPLENISHMENT TRIGGER POINT REACHED
          </div>
        </div>

        {/* Center-Right Column (8 cols): Physical Bin Card & e-Kanban Scanning */}
        <div className="md:col-span-8 space-y-3">
          {/* Physical Bin Card Display */}
          <div className="bg-white rounded-2xl p-3 sm:p-4 text-slate-900 shadow-lg border border-slate-300 font-mono space-y-2.5">
            <div className="flex items-center justify-between border-b-2 border-slate-900 pb-1.5">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-600" />
                <span className="text-xs font-black tracking-wide uppercase">
                  ATHER AURIC · PHYSICAL BIN CARD
                </span>
              </div>
              <span className="text-[10px] font-bold bg-slate-100 px-2 py-0.5 rounded border border-slate-300">
                LOC: SM-04-B · CAT-C
              </span>
            </div>

            {/* Part & Threshold Details */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] bg-slate-50 p-2 rounded-lg border border-slate-200">
              <div>
                <span className="text-slate-500 block">Part Name:</span>
                <span className="font-bold text-slate-800">M6 Hex Flange Bolt</span>
              </div>
              <div>
                <span className="text-slate-500 block">Part No:</span>
                <span className="font-bold text-slate-800">120049-A02</span>
              </div>
              <div>
                <span className="text-slate-500 block">Max Level:</span>
                <span className="font-bold text-emerald-700">10 Boxes</span>
              </div>
              <div>
                <span className="text-slate-500 block">Min Level:</span>
                <span className="font-bold text-rose-600">2 Boxes (Trigger)</span>
              </div>
            </div>

            {/* Transaction Ledger Table */}
            <div className="border border-slate-300 rounded-lg overflow-hidden text-[9px] sm:text-[10px]">
              <div className="grid grid-cols-5 bg-slate-200 font-bold text-slate-700 p-1 text-center">
                <span>Date &amp; Shift</span>
                <span>In (+)</span>
                <span>Out (-)</span>
                <span>Balance</span>
                <span>Operator</span>
              </div>
              <div className="grid grid-cols-5 p-1 text-center border-t border-slate-200 text-slate-600">
                <span>31-OCT Shift A</span>
                <span className="text-emerald-600 font-bold">+500 (5b)</span>
                <span>-</span>
                <span className="font-bold">9 Boxes</span>
                <span>OP-14</span>
              </div>
              <div className="grid grid-cols-5 p-1 text-center border-t border-slate-200 text-slate-600">
                <span>31-OCT Shift A</span>
                <span>-</span>
                <span className="text-rose-600 font-bold">-700 (7b)</span>
                <span className="font-bold">2 Boxes</span>
                <span>OP-42</span>
              </div>
              <div className="grid grid-cols-5 p-1 text-center border-t-2 border-rose-300 bg-rose-50 text-rose-800 font-bold">
                <span>STATUS:</span>
                <span className="col-span-2 text-center text-[10px]">
                  MIN THRESHOLD REACHED
                </span>
                <span className="text-rose-600 font-black">2 BOXES</span>
                <span className="text-emerald-700 font-extrabold flex items-center justify-center gap-0.5">
                  <CheckCircle2 className="w-2.5 h-2.5" /> CARD SIGNED
                </span>
              </div>
            </div>
          </div>

          {/* e-Kanban Barcode & RF Broadcast Trigger */}
          <div className="bg-slate-900/95 rounded-xl border border-emerald-500/40 p-2.5 sm:p-3 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-inner">
            <div className="flex items-center gap-3">
              <div className="relative p-2 rounded-lg bg-emerald-950/80 border border-emerald-500/50 text-emerald-400">
                <QrCode className="w-7 h-7" />
                {scanPulse && (
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-0.5 bg-red-500 shadow-sm shadow-red-500/80 animate-ping" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase text-emerald-400 flex items-center gap-1">
                    <Radio className="w-3 h-3 animate-spin text-emerald-400" />
                    e-Kanban RF Signal
                  </span>
                  <span className="text-[9px] font-mono bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded">
                    SAP LT06 TO
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] font-mono text-slate-300">
                  Trigger: <span className="text-white font-bold">KANBAN-REPLEN-SM04B-MH2</span>
                </p>
                <p className="text-[9px] font-mono text-slate-500">
                  Target: Pull 8 Boxes from High-Rise Rack Bulk Storage (MH2)
                </p>
              </div>
            </div>

            <div className="w-full sm:w-auto flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-[10px] font-bold">
              <span>SAP Auto-Transfer Dispatched</span>
              <ArrowRight className="w-3.5 h-3.5 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info Banner */}
      <div className="relative z-10 flex items-center justify-between pt-2 border-t border-slate-800 text-[10px] sm:text-xs font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <RefreshCcw className="w-3 h-3 text-cyan-400" />
          <span>Clause 4.4: Record Date, In/Out, Balance on Bin Card · Clause 4.5: Daily Shift Stock Clearance</span>
        </div>
        <div className="flex items-center gap-1 text-emerald-400 font-bold">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>ZERO LINE STARVATION</span>
        </div>
      </div>
    </div>
  );
};
