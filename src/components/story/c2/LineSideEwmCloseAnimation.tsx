import React, { useState, useEffect } from 'react';
import { QrCode, ShieldAlert, Cpu, ArrowRight, CheckCheck } from 'lucide-react';

interface Props {
  videoSrc?: string;
  isPaused: boolean;
  onPauseReached?: () => void;
}

export const LineSideEwmCloseAnimation: React.FC<Props> = ({
  videoSrc,
  isPaused,
  onPauseReached
}) => {
  const [videoAvailable, setVideoAvailable] = useState<boolean>(Boolean(videoSrc));

  useEffect(() => {
    setVideoAvailable(Boolean(videoSrc));
  }, [videoSrc]);
  const [hasTriggeredPause, setHasTriggeredPause] = useState(false);
  const [isPosted, setIsPosted] = useState<boolean>(true);

  useEffect(() => {
    if (!hasTriggeredPause && !isPaused) {
      const timer = setTimeout(() => {
        setHasTriggeredPause(true);
        if (onPauseReached) onPauseReached();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [hasTriggeredPause, isPaused, onPauseReached]);

  // Periodic cycle demonstrating stock posting handshake
  useEffect(() => {
    const interval = setInterval(() => {
      setIsPosted((prev) => !prev);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full min-h-0 bg-slate-950 rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-slate-800 shadow-2xl select-none flex flex-col justify-between p-3 sm:p-5">
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
            <CheckCheck className="w-4 h-4 text-emerald-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-black font-mono tracking-wider text-slate-100 uppercase">
                LINE-SIDE DUAL SCAN &amp; SAP EWM STOCK POSTING
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                SOP 04_C2_S2 · FAILURE MODE 5.2
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-400 font-mono">
              Ather AURIC Plant M002 · Main Assembly Workstation · System-Wise Stock Update
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-700/80">
          <span className={`inline-block w-2 h-2 rounded-full ${isPosted ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`} />
          <span className={isPosted ? 'text-emerald-300 font-bold' : 'text-amber-300 font-bold'}>
            {isPosted ? 'SAP EWM INVENTORY POSTED' : 'AWAITING DESTINATION SCAN'}
          </span>
        </div>
      </div>

      {/* Main Grid: Workstation Drop vs SAP EWM Order Closure */}
      <div className="relative z-10 my-auto grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
        {/* Left Column (5 cols): Physical Drop at Workstation */}
        <div className="md:col-span-5 bg-slate-900/90 rounded-2xl border border-slate-800 p-3.5 space-y-3 font-mono">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-[11px] font-bold text-slate-300 uppercase flex items-center gap-1.5">
              <QrCode className="w-3.5 h-3.5 text-emerald-400" />
              Line-Side Workstation Drop
            </span>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
              PHYSICAL TRANSFER
            </span>
          </div>

          <div className="bg-slate-950/80 rounded-xl p-3 border border-slate-800/80 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Destination Location:</span>
              <span className="font-bold text-emerald-300">WS-14 (Powertrain Fitment)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Delivered Material:</span>
              <span className="font-bold text-slate-200">PMSM Motors (30 Nos)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Feeding Scan QR:</span>
              <span className="font-bold text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-800">
                WS-14-BEAM-QR
              </span>
            </div>

            <div className="bg-slate-900 p-2 rounded-lg border border-slate-800 text-[10px] flex items-center justify-between">
              <span className="text-slate-400">Operator Action:</span>
              <span className="text-emerald-400 font-bold">Scan Station QR to Post Stock</span>
            </div>
          </div>
        </div>

        {/* Center Indicator (2 cols): Dual Scan Link */}
        <div className="hidden md:flex md:col-span-2 flex-col items-center justify-center gap-2">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${
            isPosted
              ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-500/20'
              : 'bg-amber-500/20 border-amber-500 text-amber-300 animate-pulse'
          }`}>
            <CheckCheck className="w-5 h-5" />
          </div>
          <span className="text-[9px] font-mono font-bold text-slate-400 text-center uppercase tracking-tight">
            {isPosted ? 'ORDER CLOSED' : 'SCAN PENDING'}
          </span>
          <div className="w-full h-0.5 bg-gradient-to-r from-emerald-500/40 via-cyan-500/60 to-emerald-500/40" />
        </div>

        {/* Right Column (5 cols): SAP EWM Inventory Updation */}
        <div className="md:col-span-5 bg-slate-900/90 rounded-2xl border border-slate-800 p-3.5 space-y-3 font-mono">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-[11px] font-bold text-slate-300 uppercase flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              SAP EWM System Ledger
            </span>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
              STOCK TRANSFER
            </span>
          </div>

          <div className="space-y-2 bg-slate-950/90 rounded-xl p-3 border border-slate-800/80 text-xs">
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">Decanting Buffer Stock:</span>
              <span className="font-bold text-amber-300">-30 Nos (Deducted)</span>
            </div>
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">Line WIP Inventory:</span>
              <span className="font-bold text-emerald-400">+30 Nos (Received)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Next Task Queue:</span>
              <span className="font-bold text-slate-200">UNLOCKED &amp; READY</span>
            </div>

            <div className="mt-2 p-2 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-[10px] text-emerald-300 flex items-center gap-2">
              <ArrowRight className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>SOP: Operator cannot proceed to next WH order until current order closes.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer SOP Verification Note */}
      <div className="relative z-10 border-t border-slate-800/80 pt-2 flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-[11px] text-slate-400 font-mono gap-1.5">
        <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
          <ShieldAlert className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>Failure Mode 5.2: Missing the feeding scan leaves the WH order open, blocking future dispatches in EWM!</span>
        </div>
        <div className="text-slate-400 text-right">
          Ather AURIC Plant M002 · EWM Inventory Control
        </div>
      </div>
    </div>
  );
};
