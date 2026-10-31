import React, { useState, useEffect } from 'react';
import { Database, CheckCircle2, ShieldCheck, ArrowRight, Laptop, FileText } from 'lucide-react';

interface Props {
  videoSrc?: string;
  isPaused: boolean;
  onPauseReached?: () => void;
}

export const ChemicalDeoPostingAnimation: React.FC<Props> = ({
  videoSrc,
  isPaused,
  onPauseReached
}) => {
  const [videoAvailable, setVideoAvailable] = useState<boolean>(false);
  const [hasTriggeredPause, setHasTriggeredPause] = useState(false);
  const [postingProgress, setPostingProgress] = useState(65);

  useEffect(() => {
    if (!hasTriggeredPause && !isPaused) {
      const timer = setTimeout(() => {
        setHasTriggeredPause(true);
        if (onPauseReached) onPauseReached();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [hasTriggeredPause, isPaused, onPauseReached]);

  // Animated posting progress ticker
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setPostingProgress((prev) => (prev >= 100 ? 100 : prev + 7));
    }, 400);
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

      {/* Background Gradients & Tech Mesh */}
      <div className="absolute inset-0 bg-radial-gradient from-slate-900 via-slate-950 to-slate-950 opacity-95 pointer-events-none" />
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
          <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 shadow-inner">
            <Laptop className="w-4 h-4 animate-pulse text-sky-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-black font-mono tracking-wider text-slate-100 uppercase">
                SAP ERP MATERIAL MANAGEMENT TERMINAL
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-500/40">
                SOP CLAUSE 4.4
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono">
              AURIC M002 · CHEMICAL ANNEX C-04 DEO GRN GENERATION &amp; STOCK POSTING
            </p>
          </div>
        </div>

        {/* User Role Badge */}
        <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-700 rounded-xl px-3 py-1.5 shadow-sm">
          <Database className="w-4 h-4 text-sky-400" />
          <div className="text-right">
            <div className="text-[9px] font-mono text-slate-400 uppercase tracking-wider leading-none">
              RESPONSIBLE ROLE
            </div>
            <div className="text-xs sm:text-sm font-black font-mono text-sky-300 leading-tight">
              DATA ENTRY OPERATOR (DEO)
            </div>
          </div>
        </div>
      </div>

      {/* Main SAP Terminal Screen Mockup */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 my-auto">
        {/* Left Column: SAP Transaction Record Card (7 cols) */}
        <div className="md:col-span-7 bg-slate-900/90 rounded-2xl border border-sky-500/30 p-3 sm:p-4 flex flex-col justify-between shadow-lg font-mono">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[11px]">
            <span className="text-sky-400 font-bold flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-sky-400" />
              TRANSACTION: MIGO_GR (CHEMICAL INWARD)
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 text-[9px] font-bold">
              LOT VERIFIED [✓]
            </span>
          </div>

          {/* Form Fields Table */}
          <div className="my-2.5 space-y-1.5 text-[11px] text-slate-300">
            <div className="flex justify-between py-1 border-b border-slate-800/60">
              <span className="text-slate-400">Material Desc:</span>
              <span className="font-bold text-slate-100">UN 1263 Industrial Thinner (Class 3)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/60">
              <span className="text-slate-400">Physical Lot Quantity:</span>
              <span className="font-bold text-amber-300">20 Steel Drums (4,000 Liters)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/60">
              <span className="text-slate-400">Storage Location:</span>
              <span className="font-bold text-emerald-400">Annex C-04 / Bay 1 (Flammables)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/60">
              <span className="text-slate-400">Generated GRN No:</span>
              <span className="font-bold text-sky-300">GRN-2026-CH-00892</span>
            </div>
          </div>

          {/* Posting Progress Bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-[10px]">
              <span className="text-slate-400">SAP EWM Stock Posting:</span>
              <span className="text-emerald-400 font-bold">{postingProgress}% Completed</span>
            </div>
            <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800 p-0.5">
              <div 
                className="h-full bg-gradient-to-r from-sky-500 to-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${postingProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Right Column: Role Segregation Responsibility Matrix (5 cols) */}
        <div className="md:col-span-5 bg-slate-900/90 rounded-2xl border border-slate-800 p-3 sm:p-4 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-800">
              <span className="text-[11px] font-mono font-bold text-slate-200 uppercase">
                RESPONSIBILITY MATRIX
              </span>
              <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-sky-500/20 text-sky-300">
                SOP WORKFLOW
              </span>
            </div>

            <div className="mt-3 space-y-2.5 text-xs font-mono">
              {/* Step 1: Putaway Operator */}
              <div className="flex items-start gap-2 bg-slate-950/80 border border-slate-800 rounded-xl p-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-slate-200 font-bold">1. PUT-AWAY OPERATOR</div>
                  <p className="text-[10px] text-slate-400 leading-tight mt-0.5">
                    Unloads drums, grounds with earthing clamp, and performs physical count verification.
                  </p>
                </div>
              </div>

              {/* Step 2: DEO Responsibility */}
              <div className="flex items-start gap-2 bg-sky-950/40 border border-sky-500/40 rounded-xl p-2.5">
                <Database className="w-4 h-4 text-sky-400 shrink-0 mt-0.5 animate-pulse" />
                <div>
                  <div className="text-sky-300 font-bold">2. DATA ENTRY OPERATOR (DEO)</div>
                  <p className="text-[10px] text-sky-200/90 leading-tight mt-0.5">
                    Generates the official GRN in SAP ERP, affixes GRN label, and posts final inventory stock.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-2 text-[10px] font-mono text-emerald-400 bg-emerald-950/40 p-2 rounded-lg border border-emerald-500/30 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Dual-check custody guarantees 100% stock accuracy</span>
          </div>
        </div>
      </div>

      {/* Footer Info Strip */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800 text-[10px] font-mono text-slate-400">
        <div className="flex items-center gap-1.5 text-slate-300">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
          <span>SOP Clause 4.4: Operator performs physical check; DEO creates GRN and updates SAP stock</span>
        </div>

        <div className="flex items-center gap-1 text-slate-300">
          <span>Workflow Handoff:</span>
          <span className="text-sky-300 font-bold">Operator → DEO System Posting</span>
          <ArrowRight className="w-3 h-3 text-sky-400" />
        </div>
      </div>
    </div>
  );
};
