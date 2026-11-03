import React, { useState, useEffect } from 'react';
import { Wrench, ShieldAlert, AlertTriangle, CheckCircle2, FileText, Ban } from 'lucide-react';

interface Props {
  videoSrc?: string;
  isPaused: boolean;
  onPauseReached?: () => void;
}

export const IndirectNoReservationAnimation: React.FC<Props> = ({
  videoSrc,
  isPaused,
  onPauseReached
}) => {
  const [videoAvailable, setVideoAvailable] = useState<boolean>(Boolean(videoSrc));

  useEffect(() => {
    setVideoAvailable(Boolean(videoSrc));
  }, [videoSrc]);
  const [hasTriggeredPause, setHasTriggeredPause] = useState(false);
  const [isCompliant, setIsCompliant] = useState<boolean>(false);

  useEffect(() => {
    if (!hasTriggeredPause && !isPaused) {
      const timer = setTimeout(() => {
        setHasTriggeredPause(true);
        if (onPauseReached) onPauseReached();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [hasTriggeredPause, isPaused, onPauseReached]);

  // Periodic cycle demonstrating verbal request vs valid SAP YMB21 reservation
  useEffect(() => {
    const interval = setInterval(() => {
      setIsCompliant((prev) => !prev);
    }, 2800);
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

      {/* Industrial Background with Authentic Indirect Store CM01 Photo */}
      <img
        src="/Assets/Background%20Environments/bg_indirect_material_store.jpg"
        alt="Indirect Material Tool Crib CM01"
        className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 opacity-90 pointer-events-none" />
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
            <Wrench className="w-4 h-4 text-amber-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-black font-mono tracking-wider text-slate-100 uppercase">
                INDIRECT STORES · CENTRAL STORE CM01
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                SOP 10_C2_S1 · CLAUSE 4.1 &amp; 5.1
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-400 font-mono">
              Ather AURIC Plant M002 · Consumables &amp; Maintenance Spares Security Gate
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-700/80">
          <span className={`inline-block w-2 h-2 rounded-full ${isCompliant ? 'bg-emerald-400 animate-ping' : 'bg-rose-400 animate-pulse'}`} />
          <span className={isCompliant ? 'text-emerald-300 font-bold' : 'text-rose-300 font-bold'}>
            {isCompliant ? 'RESERVATION VALIDATED · ISSUANCE AUTHORIZED' : 'VERBAL REQUEST · ISSUANCE BLOCKED'}
          </span>
        </div>
      </div>

      {/* Main Grid: Verbal Requisition vs System Reservation */}
      <div className="relative z-10 my-auto grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
        {/* Left Column (5 cols): Indirect Store Cage Visual */}
        <div className="md:col-span-5 bg-slate-900/90 rounded-2xl border border-slate-800 p-3.5 space-y-3 font-mono">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-[11px] font-bold text-slate-300 uppercase flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5 text-amber-400" />
              Central Indirect Store (CM01)
            </span>
            <span className="text-[10px] font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
              CAGE STAGING
            </span>
          </div>

          <div className="bg-slate-950/90 rounded-xl p-3 border border-slate-800/80 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Inventory Classification:</span>
              <span className="font-bold text-slate-200">Non-BOM Consumables</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Target Line:</span>
              <span className="font-bold text-sky-400">Maintenance Shop (MN01)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Requested Items:</span>
              <span className="text-slate-300">10x Nitrile Gloves + 2x Synthetic Grease</span>
            </div>
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-slate-400">Requester:</span>
              <span className="text-amber-300 font-bold">Line Maintenance Supervisor</span>
            </div>
          </div>
        </div>

        {/* Right Column (7 cols): Compliance Audit Status */}
        <div className={`md:col-span-7 rounded-2xl border p-3.5 space-y-3 font-mono transition-all duration-300 ${
          isCompliant
            ? 'bg-slate-900/95 border-emerald-500/50 shadow-lg shadow-emerald-500/10'
            : 'bg-slate-900/95 border-rose-500/50 shadow-lg shadow-rose-500/10'
        }`}>
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-[11px] font-bold text-slate-200 uppercase flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              Requisition Authorization Audit
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
              isCompliant
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
            }`}>
              {isCompliant ? 'AUTHORIZED' : 'STRICT AUDIT BLOCK'}
            </span>
          </div>

          <div className="space-y-1.5 bg-slate-950/90 rounded-xl p-3 border border-slate-800/80 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Requisition Form:</span>
              <span className={`font-bold flex items-center gap-1 ${isCompliant ? 'text-emerald-400' : 'text-rose-400'}`}>
                {isCompliant ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" /> SAP YMB21 Hard Copy #RES-9904
                  </>
                ) : (
                  <>
                    <Ban className="w-3.5 h-3.5" /> Verbal Request Only (No Slip!)
                  </>
                )}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">Cost Center Assignment:</span>
              <span className={`font-bold ${isCompliant ? 'text-emerald-300' : 'text-rose-400'}`}>
                {isCompliant ? 'CC-5021 (Vehicle Plant Maintenance)' : 'UNASSIGNED (Ghost Cost Risk!)'}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">PPE / Uniform Channel:</span>
              <span className="text-slate-300 font-bold">Mandatory JIRA Ticket</span>
            </div>

            <div className={`mt-2 p-2 rounded-lg text-[10px] flex items-center gap-2 border ${
              isCompliant
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
            }`}>
              {isCompliant ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Compliant: System transfer CM01 → MN01 executed in SAP before physical release.</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span>STOP: Failure Mode 5.1 prohibits verbal issuance. Shrink and ghost stock hazard!</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer SOP Verification Note */}
      <div className="relative z-10 border-t border-slate-800/80 pt-2 flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-[11px] text-slate-400 font-mono gap-1.5">
        <div className="flex items-center gap-1.5 text-amber-400 font-medium">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>SOP 10_C2_S1 Clause 4.1: "No material leaves indirect storage without a verified reservation number."</span>
        </div>
        <div className="text-slate-400 text-right">
          Ather AURIC Plant M002 · Indirect Stores Safety
        </div>
      </div>
    </div>
  );
};
