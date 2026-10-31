import React, { useState, useEffect } from 'react';
import { ClipboardList, AlertCircle, CheckCircle2, Search, FileX2 } from 'lucide-react';

interface Props {
  videoSrc?: string;
  isPaused: boolean;
  onPauseReached?: () => void;
}

export const MrsCostCenterAuditAnimation: React.FC<Props> = ({
  videoSrc,
  isPaused,
  onPauseReached
}) => {
  const [videoAvailable, setVideoAvailable] = useState<boolean>(false);
  const [hasTriggeredPause, setHasTriggeredPause] = useState(false);
  const [highlightField, setHighlightField] = useState<'costCenter' | 'storageLoc'>('costCenter');

  useEffect(() => {
    if (!hasTriggeredPause && !isPaused) {
      const timer = setTimeout(() => {
        setHasTriggeredPause(true);
        if (onPauseReached) onPauseReached();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [hasTriggeredPause, isPaused, onPauseReached]);

  // Periodic toggle highlighting discrepancy fields
  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightField((prev) => (prev === 'costCenter' ? 'storageLoc' : 'costCenter'));
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
          backgroundImage: 'linear-gradient(to right, #ec4899 1px, transparent 1px), linear-gradient(to bottom, #ec4899 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* Header Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 shadow-inner">
            <ClipboardList className="w-4 h-4 text-pink-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-black font-mono tracking-wider text-slate-100 uppercase">
                MATERIAL REQUISITION SLIP (MRS) AUDIT
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-pink-500/20 text-pink-300 border border-pink-500/40">
                SOP 10_C2_S1 · FAILURE MODE 5.1
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-400 font-mono">
              Ather AURIC Plant M002 · Cost Center &amp; Storage Location Verification Gate
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-700/80">
          <span className="inline-block w-2 h-2 rounded-full bg-rose-400 animate-ping" />
          <span className="text-rose-300 font-bold">
            AUDIT IN PROGRESS: SPOT THE DISCREPANCY
          </span>
        </div>
      </div>

      {/* Main Grid: Requisition Hard Copy Audit vs Cost Center Rules */}
      <div className="relative z-10 my-auto grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
        {/* Left Column (6 cols): Requisition Hard Copy Visual */}
        <div className="md:col-span-6 bg-slate-900/90 rounded-2xl border border-slate-800 p-3.5 space-y-2.5 font-mono">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-[11px] font-bold text-slate-200 uppercase flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-pink-400" />
              Printed Requisition Hard Copy
            </span>
            <span className="text-[10px] font-bold text-pink-300 bg-pink-500/10 px-2 py-0.5 rounded border border-pink-500/30">
              AUDIT SCAN
            </span>
          </div>

          <div className="bg-slate-950/90 rounded-xl p-3 border border-slate-800/80 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Reservation Number:</span>
              <span className="font-bold text-slate-200 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" /> #RES-2026-9904
              </span>
            </div>

            <div className={`p-2 rounded-lg border transition-all duration-300 flex items-center justify-between ${
              highlightField === 'costCenter'
                ? 'bg-rose-950/80 border-rose-500 shadow-md shadow-rose-500/20'
                : 'bg-slate-900/60 border-slate-800'
            }`}>
              <span className="text-slate-300 font-bold flex items-center gap-1">
                <FileX2 className="w-3.5 h-3.5 text-rose-400" /> Cost Center Field:
              </span>
              <span className="font-bold text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-700 animate-pulse">
                [ BLANK / EMPTY ] 🛑
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">Target Storage Loc:</span>
              <span className="font-bold text-sky-400">MN01 (Maintenance)</span>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-slate-800/60">
              <span className="text-slate-400">Requested Items:</span>
              <span className="text-slate-200">2x Grease Tubes + 10x Gloves</span>
            </div>
          </div>
        </div>

        {/* Right Column (6 cols): Controlling & Financial Integrity */}
        <div className="md:col-span-6 bg-slate-900/90 rounded-2xl border border-slate-800 p-3.5 space-y-3 font-mono">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-[11px] font-bold text-slate-200 uppercase flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
              SAP Controlling (CO) Impact
            </span>
            <span className="text-[10px] font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
              FINANCIAL AUDIT
            </span>
          </div>

          <div className="space-y-2 bg-slate-950/90 rounded-xl p-3 border border-slate-800/80 text-xs">
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Every indirect material issued from Central Indirect Stores (CM01) must debit a specific department Cost Center in SAP Controlling.
            </p>

            <div className="p-2 rounded-lg bg-rose-950/40 border border-rose-500/40 text-rose-300 text-[10px]">
              🚨 Severe Consequence: Issuing materials with an empty or incorrect Cost Center causes unallocated inventory shrink and bills costs to the wrong factory division.
            </div>

            <div className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-[10px] flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Operator must reject the slip and demand the user add their authorized Cost Center before release.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer SOP Verification Note */}
      <div className="relative z-10 border-t border-slate-800/80 pt-2 flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-[11px] text-slate-400 font-mono gap-1.5">
        <div className="flex items-center gap-1.5 text-pink-400 font-medium">
          <AlertCircle className="w-3.5 h-3.5 text-pink-400 shrink-0" />
          <span>SOP Failure Mode 5.1: Always cross-reference the slip to ensure Cost Center is filled before goods issue!</span>
        </div>
        <div className="text-slate-400 text-right">
          Ather AURIC Plant M002 · Controlling Compliance
        </div>
      </div>
    </div>
  );
};
