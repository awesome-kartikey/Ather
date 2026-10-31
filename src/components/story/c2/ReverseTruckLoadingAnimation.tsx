import React, { useState, useEffect } from 'react';
import { Truck, FileText, CheckCircle2, ShieldCheck, Warehouse, ClipboardCheck } from 'lucide-react';

interface Props {
  videoSrc?: string;
  isPaused: boolean;
  onPauseReached?: () => void;
}

export const ReverseTruckLoadingAnimation: React.FC<Props> = ({
  videoSrc,
  isPaused,
  onPauseReached
}) => {
  const [videoAvailable, setVideoAvailable] = useState<boolean>(Boolean(videoSrc));

  useEffect(() => {
    setVideoAvailable(Boolean(videoSrc));
  }, [videoSrc]);
  const [hasTriggeredPause, setHasTriggeredPause] = useState(false);
  const [stepIndex, setStepIndex] = useState<number>(0);

  useEffect(() => {
    if (!hasTriggeredPause && !isPaused) {
      const timer = setTimeout(() => {
        setHasTriggeredPause(true);
        if (onPauseReached) onPauseReached();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [hasTriggeredPause, isPaused, onPauseReached]);

  // Periodic cycling through the 4 dispatch milestones
  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % 4);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  const dispatchSteps = [
    { label: '1. Load & Strap Verification', status: '5-Ft Bins + RTV Tagged', color: 'text-amber-400' },
    { label: '2. SAP DC & E-Way Bill', status: 'DC-AURIC-2026-904', color: 'text-sky-400' },
    { label: '3. Transporter LR (PoH)', status: 'Proof of Handover Signed', color: 'text-indigo-400' },
    { label: '4. JIRA Closed & Gate-Out', status: 'Returned to Vendor ✅', color: 'text-emerald-400' },
  ];

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
          backgroundImage: 'linear-gradient(to right, #6366f1 1px, transparent 1px), linear-gradient(to bottom, #6366f1 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* Header Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-inner">
            <Truck className="w-4 h-4 text-indigo-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-black font-mono tracking-wider text-slate-100 uppercase">
                REVERSE LOGISTICS TRUCK LOADING &amp; GATE EXIT
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                SOP 06_C2_S4 · CLAUSE 4.10
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-400 font-mono">
              Ather AURIC Plant M002 · Reverse Dock Bay 06 · Outbound RTV &amp; Empty Asset Return
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-700/80">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-emerald-300 font-bold">
            STAGE 12 GRAND FINALE · DISPATCH AUTHORIZED
          </span>
        </div>
      </div>

      {/* Main Grid: Outbound Bay Vehicle Simulation vs Digital Chain of Custody */}
      <div className="relative z-10 my-auto grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
        {/* Left Column (6 cols): Outbound Dock & Truck Visual */}
        <div className="md:col-span-6 bg-slate-900/90 rounded-2xl border border-slate-800 p-3.5 space-y-3 font-mono">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-[11px] font-bold text-slate-300 uppercase flex items-center gap-1.5">
              <Warehouse className="w-3.5 h-3.5 text-indigo-400" />
              Reverse Logistics Dock Bay 06
            </span>
            <span className="text-[10px] font-bold text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/30">
              TRUCK DOCKED
            </span>
          </div>

          {/* Graphic: Outbound Truck and Cargo */}
          <div className="bg-slate-950/90 rounded-xl p-3 border border-slate-800/80 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Assigned Transporter:</span>
              <span className="font-bold text-slate-200">Alpha Logistics Express [MH-20-DE-4412]</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">Payload Manifest:</span>
              <span className="font-bold text-sky-300">
                24 Bins (≤5 Ft Belted) + 12 RTV Red-Tag Crates
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">Dock Leveller:</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Engaged &amp; Wheel Chocks Set
              </span>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-slate-400">Physical Handover:</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-950/80 text-indigo-300 border border-indigo-700 flex items-center gap-1">
                <ClipboardCheck className="w-3 h-3 text-indigo-400" /> LR #LR-AURIC-8832 Signed
              </span>
            </div>
          </div>
        </div>

        {/* Right Column (6 cols): 4-Step Chain of Custody Rail */}
        <div className="md:col-span-6 bg-slate-900/90 rounded-2xl border border-slate-800 p-3.5 space-y-2.5 font-mono">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-[11px] font-bold text-slate-300 uppercase flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              Outbound Dispatch Protocol
            </span>
            <span className="text-[10px] font-bold text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">
              AUDIT TRAIL
            </span>
          </div>

          <div className="space-y-1.5 bg-slate-950/90 rounded-xl p-2.5 border border-slate-800/80 text-xs">
            {dispatchSteps.map((s, idx) => {
              const isCurrent = stepIndex === idx;
              const isPast = stepIndex > idx;
              return (
                <div
                  key={s.label}
                  className={`p-2 rounded-lg border transition-all duration-300 flex items-center justify-between text-[11px] ${
                    isCurrent
                      ? 'bg-slate-900 border-indigo-500/60 shadow-md shadow-indigo-500/10'
                      : isPast
                      ? 'bg-slate-950/60 border-emerald-500/30 opacity-80'
                      : 'bg-slate-950/40 border-slate-800/60 opacity-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {isPast ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    ) : (
                      <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center text-[9px] font-bold shrink-0 ${
                        isCurrent ? 'border-indigo-400 text-indigo-300 animate-pulse' : 'border-slate-600 text-slate-500'
                      }`}>
                        {idx + 1}
                      </span>
                    )}
                    <span className={isCurrent ? 'font-bold text-slate-100' : 'text-slate-300'}>
                      {s.label}
                    </span>
                  </div>
                  <span className={`font-mono text-[10px] font-bold ${s.color}`}>
                    {s.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer SOP Verification Note */}
      <div className="relative z-10 border-t border-slate-800/80 pt-2 flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-[11px] text-slate-400 font-mono gap-1.5">
        <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>SOP Clause 4.10: Never gate-out a truck without signed PoH, SAP Delivery Challan, and JIRA closure!</span>
        </div>
        <div className="text-slate-400 text-right">
          Ather AURIC Plant M002 · Grand Finale Complete
        </div>
      </div>
    </div>
  );
};
