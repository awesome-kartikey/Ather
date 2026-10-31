import React, { useState, useEffect } from 'react';
import { Scale, FileText, AlertTriangle, ShieldAlert, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';

interface Props {
  videoSrc?: string;
  isPaused: boolean;
  onPauseReached?: () => void;
}

export const SupermarketCountAuditAnimation: React.FC<Props> = ({
  videoSrc,
  isPaused,
  onPauseReached
}) => {
  const [videoAvailable, setVideoAvailable] = useState<boolean>(Boolean(videoSrc));

  useEffect(() => {
    setVideoAvailable(Boolean(videoSrc));
  }, [videoSrc]);
  const [hasTriggeredPause, setHasTriggeredPause] = useState(false);
  const [scaleDisplayCount, setScaleDisplayCount] = useState(0);

  useEffect(() => {
    if (!hasTriggeredPause && !isPaused) {
      const timer = setTimeout(() => {
        setHasTriggeredPause(true);
        if (onPauseReached) onPauseReached();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [hasTriggeredPause, isPaused, onPauseReached]);

  // Digital counting scale stabilizing counter
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setScaleDisplayCount((prev) => {
        if (prev < 92) return prev + 12;
        return 92;
      });
    }, 150);
    return () => clearInterval(interval);
  }, [isPaused]);

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
          backgroundImage: 'linear-gradient(to right, #38bdf8 1px, transparent 1px), linear-gradient(to bottom, #38bdf8 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* Header Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner">
            <Scale className="w-4 h-4 animate-pulse text-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-black font-mono tracking-wider text-slate-100 uppercase">
                MH1 QUANTITY AUDIT &amp; RECONCILIATION
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                SOP CLAUSE 4.2
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono">
              AURIC M002 · SAP LX02 EXPECTED DUMP VS PHYSICAL SCALE COUNT
            </p>
          </div>
        </div>

        {/* Variance Status Pill */}
        <div className="flex items-center gap-2 bg-slate-900/90 border border-amber-500/40 rounded-xl px-3 py-1.5 shadow-sm">
          <AlertTriangle className="w-4 h-4 text-amber-400 animate-bounce" />
          <div className="text-right">
            <div className="text-[9px] font-mono text-slate-400 uppercase tracking-wider leading-none">
              INVENTORY VARIANCE
            </div>
            <div className="text-xs sm:text-sm font-black font-mono text-amber-300 leading-tight">
              -8 PCS DISCREPANCY
            </div>
          </div>
        </div>
      </div>

      {/* Main Dual Audit Display: Scale vs SAP Dump */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 my-auto">
        {/* Left Column: Digital Parts Counting Scale (6 cols) */}
        <div className="md:col-span-6 bg-slate-900/90 rounded-2xl border border-sky-500/30 p-3 sm:p-4 flex flex-col justify-between shadow-lg font-mono">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[11px]">
            <span className="text-sky-400 font-bold flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-sky-400" />
              DIGITAL PARTS COUNTING SCALE (MH1)
            </span>
            <span className="px-2 py-0.5 rounded bg-sky-950/80 text-sky-300 border border-sky-500/40 text-[9px] font-bold">
              TARED [✓]
            </span>
          </div>

          {/* LED Scale Display Screen */}
          <div className="my-2.5 p-3 bg-black/80 rounded-xl border border-slate-800 text-center">
            <div className="text-xs text-slate-400 uppercase tracking-widest mb-1">
              PHYSICAL PIECE COUNT
            </div>
            <div className="text-3xl sm:text-4xl font-black font-mono tracking-widest text-emerald-400 drop-shadow-[0_0_12px_rgba(52,211,153,0.35)]">
              {scaleDisplayCount} <span className="text-sm font-normal text-slate-400">PCS</span>
            </div>
            <div className="mt-1 flex justify-center gap-4 text-[10px] text-slate-400 font-mono">
              <span>Gross: 1.580 kg</span>
              <span>Tare: 0.200 kg</span>
              <span>Unit Wt: 15.0 g</span>
            </div>
          </div>

          <div className="text-[10px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-800/80">
            <span>Sampling Mode: 100% Count</span>
            <span className="text-emerald-400 font-bold">Scale Calibrated [✓]</span>
          </div>
        </div>

        {/* Right Column: SAP LX02 Inventory Dump Slip (6 cols) */}
        <div className="md:col-span-6 bg-slate-900/90 rounded-2xl border border-amber-500/30 p-3 sm:p-4 flex flex-col justify-between shadow-lg font-mono">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[11px]">
            <span className="text-amber-400 font-bold flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              SAP T-CODE: LX02 INWARD DUMP
            </span>
            <span className="px-2 py-0.5 rounded bg-rose-950/80 text-rose-300 border border-rose-500/40 text-[9px] font-bold">
              SHORTAGE ALERT
            </span>
          </div>

          {/* SAP Details Comparison */}
          <div className="my-2 space-y-1 text-[11px] text-slate-300">
            <div className="flex justify-between py-1 border-b border-slate-800/60">
              <span className="text-slate-400">Part Number:</span>
              <span className="font-bold text-slate-100">ATH-BLT-M6X25-GR8</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/60">
              <span className="text-slate-400">SAP Expected Qty:</span>
              <span className="font-bold text-sky-300">100 Pieces</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/60">
              <span className="text-slate-400">Physical Verified Qty:</span>
              <span className="font-bold text-amber-300">92 Pieces</span>
            </div>
            <div className="flex justify-between py-1 bg-rose-950/40 px-2 rounded border border-rose-500/30">
              <span className="text-rose-300 font-bold">Discrepancy:</span>
              <span className="font-black text-rose-300">-8 Pieces (Shortage)</span>
            </div>
          </div>

          {/* Action Protocol Notice */}
          <div className="text-[10px] text-amber-300 bg-amber-950/40 p-2 rounded-lg border border-amber-500/30 flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Clause 4.2 Mandate: Immediately halt put-away and escalate to Zone Leader!</span>
          </div>
        </div>
      </div>

      {/* Footer Info Strip */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800 text-[10px] font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 text-rose-400 font-bold bg-rose-950/60 px-2 py-0.5 rounded border border-rose-500/30">
            <XCircle className="w-3 h-3" />
            Prohibited: Never alter SAP slip or stock short lots
          </span>
          <span className="inline-flex items-center gap-1 text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3" />
            Escalate: Zone Leader must audit &amp; raise vendor ticket
          </span>
        </div>

        <div className="flex items-center gap-1 text-slate-300">
          <span>Escalation Protocol:</span>
          <span className="text-amber-300 font-bold">Halt Material &amp; Alert ZL</span>
          <ArrowRight className="w-3 h-3 text-amber-400" />
        </div>
      </div>
    </div>
  );
};
