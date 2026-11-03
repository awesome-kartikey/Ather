import React, { useState, useEffect } from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle2, XCircle, Tag, Search } from 'lucide-react';

interface Props {
  videoSrc?: string;
  isPaused: boolean;
  onPauseReached?: () => void;
}

export const RtvCauserGateAnimation: React.FC<Props> = ({
  videoSrc,
  isPaused,
  onPauseReached
}) => {
  const [videoAvailable, setVideoAvailable] = useState<boolean>(Boolean(videoSrc));

  useEffect(() => {
    setVideoAvailable(Boolean(videoSrc));
  }, [videoSrc]);
  const [hasTriggeredPause, setHasTriggeredPause] = useState(false);
  const [hasCauser, setHasCauser] = useState<boolean>(false);

  useEffect(() => {
    if (!hasTriggeredPause && !isPaused) {
      const timer = setTimeout(() => {
        setHasTriggeredPause(true);
        if (onPauseReached) onPauseReached();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [hasTriggeredPause, isPaused, onPauseReached]);

  // Periodic cycle demonstrating Causer Unknown vs Causer Identified
  useEffect(() => {
    const interval = setInterval(() => {
      setHasCauser((prev) => !prev);
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
          backgroundImage: 'linear-gradient(to right, #ef4444 1px, transparent 1px), linear-gradient(to bottom, #ef4444 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* Header Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 shadow-inner">
            <Tag className="w-4 h-4 text-rose-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-black font-mono tracking-wider text-slate-100 uppercase">
                DEFECT VALIDATION &amp; CAUSER IDENTIFICATION GATE
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                SOP 06_C2_S4 · CLAUSE 4.1
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-400 font-mono">
              Ather AURIC Plant M002 · IPQC Rejection Zone · Collection Gate Protocol
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-700/80">
          <span className={`inline-block w-2 h-2 rounded-full ${hasCauser ? 'bg-emerald-400 animate-ping' : 'bg-rose-400 animate-pulse'}`} />
          <span className={hasCauser ? 'text-emerald-300 font-bold' : 'text-rose-300 font-bold'}>
            {hasCauser ? 'CAUSER IDENTIFIED · COLLECTION AUTHORIZED' : 'CAUSER UNKNOWN · COLLECTION DECLINED'}
          </span>
        </div>
      </div>

      {/* Main Grid: Physical Defect Item vs JIRA Data Gate */}
      <div className="relative z-10 my-auto grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
        {/* Left Column (6 cols): Physical Item in Rejection Zone */}
        <div className="md:col-span-6 bg-slate-900/90 rounded-2xl border border-slate-800 p-3.5 space-y-3 font-mono">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-[11px] font-bold text-slate-300 uppercase flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-rose-400" />
              Physical Rejected Part
            </span>
            <span className="text-[10px] font-bold text-rose-300 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/30">
              IPQC REJECT
            </span>
          </div>

          <div className="bg-slate-950/80 rounded-xl p-3 border border-slate-800/80 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Rejected Part:</span>
              <span className="font-bold text-slate-200">Ather 450X Tail Centre Panel (TCP)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Physical Red Tag:</span>
              <span className="font-bold text-rose-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-rose-400" />
                Affixed to Crate [TAG-IPQC-8812]
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Yellow QC Sticker:</span>
              <span className="font-bold text-amber-300 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                Signed by Line Quality Inspector
              </span>
            </div>
            <div className="flex items-center justify-between pt-1 border-t border-slate-800/60">
              <span className="text-slate-400">Visual Defect:</span>
              <span className="text-slate-300">Hairline surface crack near mounting boss</span>
            </div>
          </div>
        </div>

        {/* Right Column (6 cols): JIRA Validation Checklist */}
        <div className={`md:col-span-6 rounded-2xl border p-3.5 space-y-3 font-mono transition-all duration-300 ${
          hasCauser
            ? 'bg-slate-900/90 border-emerald-500/50 shadow-lg shadow-emerald-500/10'
            : 'bg-slate-900/90 border-rose-500/50 shadow-lg shadow-rose-500/10'
        }`}>
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-[11px] font-bold text-slate-300 uppercase flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-cyan-400" />
              JIRA Ticket Validation
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
              hasCauser
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
            }`}>
              {hasCauser ? 'VALIDATED' : 'BLOCKED'}
            </span>
          </div>

          <div className="space-y-1.5 bg-slate-950/90 rounded-xl p-3 border border-slate-800/80 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Ticket Status:</span>
              <span className="font-bold text-amber-300">QC Done: Fail</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">Bug ID Linked:</span>
              <span className={`font-bold flex items-center gap-1 ${
                hasCauser ? 'text-emerald-400' : 'text-rose-400'
              }`}>
                {hasCauser ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" /> BUG-PL-4402
                  </>
                ) : (
                  <>
                    <XCircle className="w-3.5 h-3.5" /> MISSING!
                  </>
                )}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">Identified Causer:</span>
              <span className={`font-bold px-1.5 py-0.5 rounded text-[10px] ${
                hasCauser
                  ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-700'
                  : 'bg-rose-950/60 text-rose-300 border border-rose-700'
              }`}>
                {hasCauser ? 'SUPPLIER: Alpha Plastics Pvt Ltd' : '"UNKNOWN" 🛑'}
              </span>
            </div>

            <div className={`mt-2 p-2 rounded-lg text-[10px] flex items-center gap-2 border ${
              hasCauser
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
            }`}>
              {hasCauser ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Authorized: Move to NG Quarantine Area &amp; update to "Quality Failed".</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span>DECLINE COLLECTION: Wait for SQA/MQA Analysis team to identify Causer (SLA: 2 Days).</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer SOP Verification Note */}
      <div className="relative z-10 border-t border-slate-800/80 pt-2 flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-[11px] text-slate-400 font-mono gap-1.5">
        <div className="flex items-center gap-1.5 text-rose-400 font-medium">
          <ShieldAlert className="w-3.5 h-3.5 text-rose-400 shrink-0" />
          <span>SOP Clause 4.1: If Causer is "Unknown" or Bug ID is missing, Warehouse declines collection!</span>
        </div>
        <div className="text-slate-400 text-right">
          Ather AURIC Plant M002 · Quality RTV Protocol
        </div>
      </div>
    </div>
  );
};
