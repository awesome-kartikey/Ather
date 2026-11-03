import React, { useState, useEffect } from 'react';
import { Database, CheckCircle2, ArrowRight, ShieldCheck, ArrowLeftRight, Clock } from 'lucide-react';

interface Props {
  videoSrc?: string;
  isPaused: boolean;
  onPauseReached?: () => void;
}

export const SapYmb21TransferAnimation: React.FC<Props> = ({
  videoSrc,
  isPaused,
  onPauseReached
}) => {
  const [videoAvailable, setVideoAvailable] = useState<boolean>(Boolean(videoSrc));

  useEffect(() => {
    setVideoAvailable(Boolean(videoSrc));
  }, [videoSrc]);
  const [hasTriggeredPause, setHasTriggeredPause] = useState(false);
  const [postingStep, setPostingStep] = useState<number>(0);

  useEffect(() => {
    if (!hasTriggeredPause && !isPaused) {
      const timer = setTimeout(() => {
        setHasTriggeredPause(true);
        if (onPauseReached) onPauseReached();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [hasTriggeredPause, isPaused, onPauseReached]);

  // Periodic cycling through SAP YMB21 transaction steps
  useEffect(() => {
    const interval = setInterval(() => {
      setPostingStep((prev) => (prev + 1) % 3);
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
          backgroundImage: 'linear-gradient(to right, #38bdf8 1px, transparent 1px), linear-gradient(to bottom, #38bdf8 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* Header Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 shadow-inner">
            <Database className="w-4 h-4 text-sky-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-black font-mono tracking-wider text-slate-100 uppercase">
                SAP EWM / S4HANA · TRANSACTION YMB21
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-500/40">
                SOP 10_C2_S1 · CLAUSE 4.2
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-400 font-mono">
              Ather AURIC Plant M002 · Central Store CM01 to Maintenance MN01 Transfer
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-700/80">
          <span className="inline-block w-2 h-2 rounded-full bg-sky-400 animate-ping" />
          <span className="text-sky-300 font-bold">
            SAP TRANSFER POSTING · RESERVATION ACTIVE
          </span>
        </div>
      </div>

      {/* Main Grid: SAP Transaction Screen vs 2-Step Issuance Flow */}
      <div className="relative z-10 my-auto grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
        {/* Left Column (6 cols): SAP YMB21 Terminal Interface */}
        <div className="md:col-span-6 bg-slate-900/90 rounded-2xl border border-slate-800 p-3.5 space-y-3 font-mono">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-[11px] font-bold text-slate-300 uppercase flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-sky-400" />
              SAP GUI [T-Code: YMB21]
            </span>
            <span className="text-[10px] font-bold text-sky-300 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/30">
              STOCK TRANSFER POSTING
            </span>
          </div>

          <div className="bg-slate-950/90 rounded-xl p-3 border border-slate-800/80 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Reservation No:</span>
              <span className="font-bold text-amber-300">#RES-2026-9904</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">Transfer Route:</span>
              <span className="font-bold text-emerald-400 flex items-center gap-1">
                CM01 (Central) <ArrowRight className="w-3 h-3 text-slate-500" /> MN01 (Maint)
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">Debit Cost Center:</span>
              <span className="font-bold text-slate-200">CC-5021 (Plant Maintenance)</span>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-slate-800/60">
              <span className="text-slate-400">Goods Issue Status:</span>
              <span className="font-bold text-sky-300 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" /> Posted in S/4HANA MM/CO
              </span>
            </div>
          </div>
        </div>

        {/* Right Column (6 cols): Mandatory 2-Step Sequence */}
        <div className="md:col-span-6 bg-slate-900/90 rounded-2xl border border-slate-800 p-3.5 space-y-3 font-mono">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-[11px] font-bold text-slate-300 uppercase flex items-center gap-1.5">
              <ArrowLeftRight className="w-3.5 h-3.5 text-indigo-400" />
              SOP Mandatory 2-Step Handover
            </span>
            <span className="text-[10px] font-bold text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/30">
              FAILURE MODE 5.2 PREVENTED
            </span>
          </div>

          <div className="space-y-2 bg-slate-950/90 rounded-xl p-3 border border-slate-800/80 text-xs">
            <div className={`p-2 rounded-lg border flex items-center justify-between ${
              postingStep === 0
                ? 'bg-sky-950/80 border-sky-500 text-sky-200'
                : 'bg-slate-900/60 border-slate-800 text-slate-400'
            }`}>
              <div className="flex items-center gap-2">
                <span className="font-bold">Step 1:</span>
                <span>System Transfer in SAP (YMB21)</span>
              </div>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            </div>

            <div className={`p-2 rounded-lg border flex items-center justify-between ${
              postingStep === 1
                ? 'bg-sky-950/80 border-sky-500 text-sky-200'
                : 'bg-slate-900/60 border-slate-800 text-slate-400'
            }`}>
              <div className="flex items-center gap-2">
                <span className="font-bold">Step 2:</span>
                <span>Physical Part Handover to Person</span>
              </div>
              {postingStep >= 1 ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Clock className="w-3.5 h-3.5 text-slate-500" />
              )}
            </div>

            <div className="p-2 rounded-lg bg-rose-950/40 border border-rose-500/40 text-rose-300 text-[10px]">
              ⚠️ Failure Mode 5.2 Warning: Physical handover before SAP transfer creates ghost inventory in CM01 and stockouts in MN01!
            </div>
          </div>
        </div>
      </div>

      {/* Footer SOP Verification Note */}
      <div className="relative z-10 border-t border-slate-800/80 pt-2 flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-[11px] text-slate-400 font-mono gap-1.5">
        <div className="flex items-center gap-1.5 text-sky-400 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-sky-400 shrink-0" />
          <span>SOP Clause 4.2 &amp; 5.2: Always execute SAP transfer posting first, physical handover second!</span>
        </div>
        <div className="text-slate-400 text-right">
          Ather AURIC Plant M002 · Inventory Synchronization
        </div>
      </div>
    </div>
  );
};
