import React, { useState, useEffect } from 'react';
import { RotateCcw, CheckCircle2, ShieldAlert, AlertTriangle, QrCode } from 'lucide-react';

interface Props {
  videoSrc?: string;
  isPaused: boolean;
  onPauseReached?: () => void;
}

export const MheWrongPartReturnAnimation: React.FC<Props> = ({
  videoSrc,
  isPaused,
  onPauseReached
}) => {
  const [videoAvailable, setVideoAvailable] = useState<boolean>(Boolean(videoSrc));

  useEffect(() => {
    setVideoAvailable(Boolean(videoSrc));
  }, [videoSrc]);
  const [hasTriggeredPause, setHasTriggeredPause] = useState(false);
  const [resolutionStage, setResolutionStage] = useState<'detected' | 'return_task' | 'resolved'>('detected');

  useEffect(() => {
    if (!hasTriggeredPause && !isPaused) {
      const timer = setTimeout(() => {
        setHasTriggeredPause(true);
        if (onPauseReached) onPauseReached();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [hasTriggeredPause, isPaused, onPauseReached]);

  // Periodic cycle demonstrating wrong part recovery sequence
  useEffect(() => {
    const interval = setInterval(() => {
      setResolutionStage((prev) => {
        if (prev === 'detected') return 'return_task';
        if (prev === 'return_task') return 'resolved';
        return 'detected';
      });
    }, 2200);
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

      {/* Industrial Floor Grid Background */}
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
            <RotateCcw className="w-4 h-4 text-rose-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-black font-mono tracking-wider text-slate-100 uppercase">
                CLOSED-LOOP WH CLOSURE &amp; WRONG PART RETURN
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                SOP 03_C2_S2 · FAIL MODES 5.3 &amp; 5.4
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-400 font-mono">
              Ather AURIC Plant M002 · Decanting to HRR Reverse Protocol
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-700/80">
          <span className={`inline-block w-2 h-2 rounded-full ${
            resolutionStage === 'resolved'
              ? 'bg-emerald-400'
              : resolutionStage === 'return_task'
              ? 'bg-amber-400 animate-ping'
              : 'bg-rose-400 animate-pulse'
          }`} />
          <span className={
            resolutionStage === 'resolved'
              ? 'text-emerald-300 font-bold'
              : resolutionStage === 'return_task'
              ? 'text-amber-300 font-bold'
              : 'text-rose-300 font-bold'
          }>
            {resolutionStage === 'resolved'
              ? 'CORRECT PART REPLENISHED & WH CLOSED'
              : resolutionStage === 'return_task'
              ? 'RETURN TASK IN PROGRESS'
              : 'WRONG PART MISMATCH DETECTED'}
          </span>
        </div>
      </div>

      {/* Main Grid: Mismatch Incident vs Reverse Task Resolution */}
      <div className="relative z-10 my-auto grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
        {/* Left Column (5 cols): Incident Trigger */}
        <div className="md:col-span-5 bg-slate-900/90 rounded-2xl border border-slate-800 p-3.5 space-y-3 font-mono">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-[11px] font-bold text-slate-300 uppercase flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              Decanting Audit At Drop
            </span>
            <span className="text-[10px] font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/30">
              FAIL MODE 5.3
            </span>
          </div>

          <div className="bg-slate-950/80 rounded-xl p-3 border border-slate-800/80 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Required Part:</span>
              <span className="font-bold text-emerald-400">TSP (Tail Side Panel)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Delivered by MHE:</span>
              <span className="font-bold text-rose-400">TCP (Tail Centre Panel)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Root Cause:</span>
              <span className="text-amber-300 font-bold">Wrong RFID e-Kanban Scan</span>
            </div>

            <div className="bg-slate-900 p-2 rounded-lg border border-slate-800 text-[10px] flex items-center justify-between">
              <span className="text-slate-400">Action Mandated:</span>
              <span className="text-rose-300 font-bold">Cancel Task &rarr; Reverse to HRR</span>
            </div>
          </div>
        </div>

        {/* Center Indicator (2 cols): Reverse Logistics */}
        <div className="hidden md:flex md:col-span-2 flex-col items-center justify-center gap-2">
          <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500 text-amber-400 flex items-center justify-center shadow-md shadow-amber-500/20">
            <RotateCcw className="w-5 h-5 animate-spin" />
          </div>
          <span className="text-[9px] font-mono font-bold text-slate-400 text-center uppercase tracking-tight">
            CLOSED-LOOP
          </span>
          <div className="w-full h-0.5 bg-gradient-to-r from-rose-500/40 via-amber-500/60 to-emerald-500/40" />
        </div>

        {/* Right Column (5 cols): SAP EWM Protocol & Dual Scan */}
        <div className="md:col-span-5 bg-slate-900/90 rounded-2xl border border-slate-800 p-3.5 space-y-3 font-mono">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-[11px] font-bold text-slate-300 uppercase flex items-center gap-1.5">
              <QrCode className="w-3.5 h-3.5 text-cyan-400" />
              MHE Terminal Recovery Flow
            </span>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
              SAP EWM TASK
            </span>
          </div>

          <div className="space-y-2 bg-slate-950/90 rounded-xl p-3 border border-slate-800/80 text-xs">
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">1. Return WH Task:</span>
              <span className="font-bold text-amber-300">RET-TCP-HRR-04 [CREATED]</span>
            </div>
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">2. Correct Replenishment:</span>
              <span className="font-bold text-emerald-400">WH-TSP-9183 [DISPATCHED]</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">3. Task Closure Scan:</span>
              <span className="font-bold text-slate-200">Mandatory Dual QR Scan</span>
            </div>

            {/* Failure Mode 5.4 Warning */}
            <div className="mt-2 p-2 rounded-lg bg-sky-950/40 border border-sky-500/40 text-[10px] text-sky-300 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>Operator cannot proceed to next WH task until open orders are scanned &amp; closed!</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer SOP Verification Note */}
      <div className="relative z-10 border-t border-slate-800/80 pt-2 flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-[11px] text-slate-400 font-mono gap-1.5">
        <div className="flex items-center gap-1.5 text-amber-400 font-medium">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>Failure Mode 5.4: Unclosed WH tasks block the entire MHE queue in SAP EWM. Never leave orders open!</span>
        </div>
        <div className="text-slate-400 text-right">
          Ather AURIC Plant M002 · Paint &amp; Decanting SOP
        </div>
      </div>
    </div>
  );
};
