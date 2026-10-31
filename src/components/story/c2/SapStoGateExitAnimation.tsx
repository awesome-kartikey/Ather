import React, { useState, useEffect } from 'react';
import { FileCheck, CheckCircle2, ShieldAlert, Cpu, ArrowRight, Truck, AlertTriangle } from 'lucide-react';

interface Props {
  videoSrc?: string;
  isPaused: boolean;
  onPauseReached?: () => void;
}

export const SapStoGateExitAnimation: React.FC<Props> = ({
  videoSrc,
  isPaused,
  onPauseReached
}) => {
  const [videoAvailable, setVideoAvailable] = useState<boolean>(Boolean(videoSrc));

  useEffect(() => {
    setVideoAvailable(Boolean(videoSrc));
  }, [videoSrc]);
  const [hasTriggeredPause, setHasTriggeredPause] = useState(false);
  const [docsComplete, setDocsComplete] = useState<boolean>(true);

  useEffect(() => {
    if (!hasTriggeredPause && !isPaused) {
      const timer = setTimeout(() => {
        setHasTriggeredPause(true);
        if (onPauseReached) onPauseReached();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [hasTriggeredPause, isPaused, onPauseReached]);

  // Periodic cycle demonstrating full compliance kit vs missing documentation
  useEffect(() => {
    const interval = setInterval(() => {
      setDocsComplete((prev) => !prev);
    }, 2400);
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
          backgroundImage: 'linear-gradient(to right, #0ea5e9 1px, transparent 1px), linear-gradient(to bottom, #0ea5e9 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* Header Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 shadow-inner">
            <FileCheck className="w-4 h-4 text-sky-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-black font-mono tracking-wider text-slate-100 uppercase">
                SAP STO &amp; E-WAY BILL GATE COMPLIANCE
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-500/40">
                SOP 05_C2_S3 · CLAUSE 4.3 &amp; FM 5.4
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-400 font-mono">
              Ather AURIC Plant M002 · Outbound Logistics Gatehouse · Regulatory Transport Kit
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-700/80">
          <span className={`inline-block w-2 h-2 rounded-full ${docsComplete ? 'bg-emerald-400 animate-ping' : 'bg-rose-400 animate-pulse'}`} />
          <span className={docsComplete ? 'text-emerald-300 font-bold' : 'text-rose-300 font-bold'}>
            {docsComplete ? 'FULL KIT VERIFIED · BARRIER OPEN' : 'E-WAY BILL MISSING · BARRIER HALTED'}
          </span>
        </div>
      </div>

      {/* Main Grid: SAP STO Pipeline vs Gatehouse Inspection */}
      <div className="relative z-10 my-auto grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
        {/* Left Column (6 cols): SAP STO System Pipeline */}
        <div className="md:col-span-6 bg-slate-900/90 rounded-2xl border border-slate-800 p-3.5 space-y-3 font-mono">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-[11px] font-bold text-slate-300 uppercase flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-sky-400" />
              SAP STO Transaction Chain
            </span>
            <span className="text-[10px] font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/30">
              SAP S/4HANA
            </span>
          </div>

          <div className="space-y-1.5 bg-slate-950/80 rounded-xl p-3 border border-slate-800/80 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">1. PO Creation &amp; Release:</span>
              <span className="font-bold text-slate-200">ME21N &rarr; ME29N [POSTED]</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">2. Outbound Delivery (OBD):</span>
              <span className="font-bold text-slate-200">VL10B [PICKED]</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">3. Post Goods Issue (PGI):</span>
              <span className="font-bold text-slate-200">VL02N [SERIALIZED]</span>
            </div>
            <div className="flex items-center justify-between pt-1 border-t border-slate-800/60">
              <span className="text-slate-400">4. Billing Document:</span>
              <span className="font-bold text-sky-300">VF01 (ZSTO Intra / ZGST Inter)</span>
            </div>
          </div>
        </div>

        {/* Right Column (6 cols): Physical Gatehouse Documentation Check */}
        <div className={`md:col-span-6 rounded-2xl border p-3.5 space-y-3 font-mono transition-all duration-300 ${
          docsComplete
            ? 'bg-slate-900/90 border-emerald-500/50 shadow-lg shadow-emerald-500/10'
            : 'bg-slate-900/90 border-rose-500/50 shadow-lg shadow-rose-500/10'
        }`}>
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-[11px] font-bold text-slate-300 uppercase flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-emerald-400" />
              Material Gate Inspection
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
              docsComplete
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
            }`}>
              {docsComplete ? 'GATE PASS ISSUED' : 'SECURITY HOLD'}
            </span>
          </div>

          <div className="space-y-1.5 bg-slate-950/90 rounded-xl p-3 border border-slate-800/80 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">1. SAP Invoice (YPR_STO):</span>
              <span className="font-bold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Attached
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">2. Delivery Challan (DC):</span>
              <span className="font-bold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Attached
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">3. Govt E-Way Bill:</span>
              <span className={`font-bold flex items-center gap-1 ${
                docsComplete ? 'text-emerald-400' : 'text-rose-400'
              }`}>
                {docsComplete ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" /> Valid &amp; Active
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-3.5 h-3.5" /> MISSING!
                  </>
                )}
              </span>
            </div>

            <div className={`mt-2 p-2 rounded-lg text-[10px] flex items-center gap-2 border ${
              docsComplete
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
            }`}>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
              <span>
                {docsComplete
                  ? 'All 3 documents verified: Boom barrier lifted for departure.'
                  : 'FM 5.4: Missing E-Way Bill triggers immediate gate refusal!'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer SOP Verification Note */}
      <div className="relative z-10 border-t border-slate-800/80 pt-2 flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-[11px] text-slate-400 font-mono gap-1.5">
        <div className="flex items-center gap-1.5 text-sky-400 font-medium">
          <ShieldAlert className="w-3.5 h-3.5 text-sky-400 shrink-0" />
          <span>Failure Mode 5.4: E-Way Bill is legally mandatory for all outbound shipments regardless of financial value!</span>
        </div>
        <div className="text-slate-400 text-right">
          Ather AURIC Plant M002 · Gate Security Compliance
        </div>
      </div>
    </div>
  );
};
