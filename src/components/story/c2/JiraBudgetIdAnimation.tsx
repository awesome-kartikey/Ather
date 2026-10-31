import React, { useState, useEffect } from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle2, XCircle, FileText, DollarSign } from 'lucide-react';

interface Props {
  videoSrc?: string;
  isPaused: boolean;
  onPauseReached?: () => void;
}

export const JiraBudgetIdAnimation: React.FC<Props> = ({
  videoSrc,
  isPaused,
  onPauseReached
}) => {
  const [videoAvailable, setVideoAvailable] = useState<boolean>(Boolean(videoSrc));

  useEffect(() => {
    setVideoAvailable(Boolean(videoSrc));
  }, [videoSrc]);
  const [hasTriggeredPause, setHasTriggeredPause] = useState(false);
  const [hasBudget, setHasBudget] = useState<boolean>(true);

  useEffect(() => {
    if (!hasTriggeredPause && !isPaused) {
      const timer = setTimeout(() => {
        setHasTriggeredPause(true);
        if (onPauseReached) onPauseReached();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [hasTriggeredPause, isPaused, onPauseReached]);

  // Periodic cycle demonstrating valid Budget ID vs missing Budget ID
  useEffect(() => {
    const interval = setInterval(() => {
      setHasBudget((prev) => !prev);
    }, 2500);
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
          backgroundImage: 'linear-gradient(to right, #0284c7 1px, transparent 1px), linear-gradient(to bottom, #0284c7 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* Header Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 shadow-inner">
            <DollarSign className="w-4 h-4 text-sky-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-black font-mono tracking-wider text-slate-100 uppercase">
                JIRA PIR INITIATION &amp; BUDGET ID MANDATE
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-500/40">
                SOP 05_C2_S3 · CLAUSE 4.1 &amp; FM 5.2
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-400 font-mono">
              Ather AURIC Plant M002 · JIRA Service Desk · Financial Cost Allocation Gate
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-700/80">
          <span className={`inline-block w-2 h-2 rounded-full ${hasBudget ? 'bg-emerald-400 animate-ping' : 'bg-rose-400 animate-pulse'}`} />
          <span className={hasBudget ? 'text-emerald-300 font-bold' : 'text-rose-300 font-bold'}>
            {hasBudget ? 'BUDGET ID ATTACHED (VALID)' : 'BUDGET ID MISSING (HALTED)'}
          </span>
        </div>
      </div>

      {/* Main Grid: JIRA Ticket Data vs Warehouse Financial Gate */}
      <div className="relative z-10 my-auto grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
        {/* Left Column (6 cols): Requester's JIRA PIR Ticket */}
        <div className={`md:col-span-6 rounded-2xl border p-3.5 space-y-3 font-mono transition-all duration-300 ${
          hasBudget
            ? 'bg-slate-900/90 border-emerald-500/50 shadow-lg shadow-emerald-500/10'
            : 'bg-slate-900/90 border-rose-500/50 shadow-lg shadow-rose-500/10'
        }`}>
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-[11px] font-bold text-slate-300 uppercase flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-sky-400" />
              JIRA Ticket: PIR-AURIC-1042
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
              hasBudget
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
            }`}>
              {hasBudget ? 'FINANCIALLY LINKED' : 'UNASSIGNED BUDGET'}
            </span>
          </div>

          <div className="bg-slate-950/80 rounded-xl p-3 border border-slate-800/80 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Requester Department:</span>
              <span className="font-bold text-slate-200">R&amp;D Vehicle Validation Team</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Requested Material:</span>
              <span className="font-bold text-sky-300">2x 450X Gen 3 Battery Packs</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Total Valuation:</span>
              <span className="font-bold text-amber-300">₹1,65,000 (High-Value SKU)</span>
            </div>
            <div className="flex items-center justify-between pt-1 border-t border-slate-800/60">
              <span className="text-slate-400">Associated Budget ID:</span>
              <span className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                hasBudget
                  ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-700'
                  : 'bg-rose-950/60 text-rose-300 border border-rose-700'
              }`}>
                {hasBudget ? 'BGT-RD-2026-EV04 ✓' : '[ BLANK / UNASSIGNED ] 🛑'}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column (6 cols): Warehouse Picking Compliance Gate */}
        <div className="md:col-span-6 bg-slate-900/90 rounded-2xl border border-slate-800 p-3.5 space-y-3 font-mono">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-[11px] font-bold text-slate-300 uppercase flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              Warehouse Financial Gate
            </span>
            <span className="text-[10px] font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/30">
              NON-RETURNABLE
            </span>
          </div>

          <div className="space-y-2 bg-slate-950/90 rounded-xl p-3 border border-slate-800/80 text-xs">
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">Cost Center Allocation:</span>
              <span className={`font-bold flex items-center gap-1 ${
                hasBudget ? 'text-emerald-400' : 'text-rose-400'
              }`}>
                {hasBudget ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Charged to Requester BGT
                  </>
                ) : (
                  <>
                    <XCircle className="w-3.5 h-3.5" />
                    Cannot Charge Expenses
                  </>
                )}
              </span>
            </div>

            <div className="flex items-center justify-between pb-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">Warehouse Picking Action:</span>
              <span className={`font-bold ${hasBudget ? 'text-emerald-300' : 'text-rose-300'}`}>
                {hasBudget ? 'GENERATE WH PICKLIST' : 'HALT: ZERO PICKING'}
              </span>
            </div>

            {/* SOP Protocol Strip */}
            <div className={`mt-2 p-2 rounded-lg text-[10px] flex items-center gap-2 border ${
              hasBudget
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
            }`}>
              {hasBudget ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Valid Budget ID attached: SAP consumption authorized.</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span>SOP Rule: No Budget ID = No Picking. Never release on verbal promises!</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer SOP Verification Note */}
      <div className="relative z-10 border-t border-slate-800/80 pt-2 flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-[11px] text-slate-400 font-mono gap-1.5">
        <div className="flex items-center gap-1.5 text-sky-400 font-medium">
          <ShieldAlert className="w-3.5 h-3.5 text-sky-400 shrink-0" />
          <span>Failure Mode 5.2: Materials issued under a PIR are non-returnable and must have an attached Budget ID.</span>
        </div>
        <div className="text-slate-400 text-right">
          Ather AURIC Plant M002 · PIR Material Control
        </div>
      </div>
    </div>
  );
};
