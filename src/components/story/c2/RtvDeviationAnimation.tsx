import React, { useState, useEffect } from 'react';
import { GitBranch, FileCheck2, CheckCircle2, Clock, ShieldAlert, ArrowRight, Undo2, AlertCircle } from 'lucide-react';

interface Props {
  videoSrc?: string;
  isPaused: boolean;
  onPauseReached?: () => void;
}

export const RtvDeviationAnimation: React.FC<Props> = ({
  videoSrc,
  isPaused,
  onPauseReached
}) => {
  const [videoAvailable, setVideoAvailable] = useState<boolean>(Boolean(videoSrc));

  useEffect(() => {
    setVideoAvailable(Boolean(videoSrc));
  }, [videoSrc]);
  const [hasTriggeredPause, setHasTriggeredPause] = useState(false);
  const [activePath, setActivePath] = useState<'rtv' | 'deviation'>('rtv');

  useEffect(() => {
    if (!hasTriggeredPause && !isPaused) {
      const timer = setTimeout(() => {
        setHasTriggeredPause(true);
        if (onPauseReached) onPauseReached();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [hasTriggeredPause, isPaused, onPauseReached]);

  // Periodic toggle between Auto RTV default path and "Use As It Is" Deviation branch
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePath((prev) => (prev === 'rtv' ? 'deviation' : 'rtv'));
    }, 3000);
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
            <GitBranch className="w-4 h-4 text-sky-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-black font-mono tracking-wider text-slate-100 uppercase">
                SUPPLIER 3-DAY SLA &amp; DEVIATION WORKFLOW
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-500/40">
                SOP 06_C2_S4 · CLAUSES 4.2–4.5
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-400 font-mono">
              Ather AURIC Plant M002 · Quality RTV vs Deviation Flow · SAP Stock Movement
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-700/80">
          <span className={`inline-block w-2 h-2 rounded-full ${activePath === 'rtv' ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400 animate-ping'}`} />
          <span className={activePath === 'rtv' ? 'text-amber-300 font-bold' : 'text-emerald-300 font-bold'}>
            {activePath === 'rtv' ? 'DEFAULT: AUTO-RTV (3-DAY SLA)' : 'BRANCH: USE AS-IS DEVIATION'}
          </span>
        </div>
      </div>

      {/* Main Grid: Auto RTV vs Use As-Is Deviation Split */}
      <div className="relative z-10 my-auto grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-stretch">
        {/* Left Column (6 cols): Default Route - Auto RTV */}
        <div className={`md:col-span-6 rounded-2xl border p-3.5 space-y-2.5 font-mono transition-all duration-300 ${
          activePath === 'rtv'
            ? 'bg-slate-900/95 border-amber-500/50 shadow-lg shadow-amber-500/10'
            : 'bg-slate-900/60 border-slate-800 opacity-60'
        }`}>
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-[11px] font-bold text-slate-200 uppercase flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              Route A: Default Auto RTV
            </span>
            <span className="text-[10px] font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30 flex items-center gap-1">
              <Clock className="w-3 h-3" /> SLA: 3 Days
            </span>
          </div>

          <div className="bg-slate-950/90 rounded-xl p-2.5 border border-slate-800/80 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Trigger Event:</span>
              <span className="font-bold text-slate-200">Quality Failed (Supplier Causer)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">System Disposition:</span>
              <span className="font-bold text-amber-400">Auto-Assigned "RTV"</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">JIRA Ticket Status:</span>
              <span className="font-bold text-slate-300 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">
                To be RTV
              </span>
            </div>
            <div className="flex items-center justify-between pt-1 border-t border-slate-800/60">
              <span className="text-slate-400">SAP Stock State:</span>
              <span className="font-bold text-rose-400">BL (Blocked Storage SC01)</span>
            </div>
          </div>

          <div className="text-[10px] text-amber-300/90 bg-amber-950/40 p-2 rounded-lg border border-amber-500/30 flex items-center gap-2">
            <Undo2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Supplier must arrange pickup within 3 days or material is dispatched via DC Gate Pass.</span>
          </div>
        </div>

        {/* Right Column (6 cols): Exception Route - "Use As It Is" Deviation */}
        <div className={`md:col-span-6 rounded-2xl border p-3.5 space-y-2.5 font-mono transition-all duration-300 ${
          activePath === 'deviation'
            ? 'bg-slate-900/95 border-emerald-500/50 shadow-lg shadow-emerald-500/10'
            : 'bg-slate-900/60 border-slate-800 opacity-60'
        }`}>
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-[11px] font-bold text-slate-200 uppercase flex items-center gap-1.5">
              <FileCheck2 className="w-3.5 h-3.5 text-emerald-400" />
              Route B: "Use As It Is" Deviation
            </span>
            <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
              SLA: 24h From Approval
            </span>
          </div>

          <div className="bg-slate-950/90 rounded-xl p-2.5 border border-slate-800/80 space-y-1.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">1. Initiated By:</span>
              <span className="font-bold text-slate-200">Supplier Manager (SM)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">2. Approval Gate:</span>
              <span className="font-bold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" /> PRODUCT OWNER ONLY
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">3. JIRA Updates:</span>
              <span className="font-bold text-sky-300 text-[11px]">
                Deviation Accepted → Available for Build
              </span>
            </div>
            <div className="flex items-center justify-between pt-1 border-t border-slate-800/60">
              <span className="text-slate-400">4. SAP Conversion:</span>
              <span className="font-bold text-emerald-300 flex items-center gap-1">
                QI <ArrowRight className="w-3 h-3 text-slate-400" /> UR (Unrestricted)
              </span>
            </div>
          </div>

          <div className="text-[10px] text-emerald-300/90 bg-emerald-950/40 p-2 rounded-lg border border-emerald-500/30 flex items-center gap-2">
            <AlertCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>IQC performs final SAP transfer from QI to UR; parts released for immediate assembly.</span>
          </div>
        </div>
      </div>

      {/* Footer SOP Verification Note */}
      <div className="relative z-10 border-t border-slate-800/80 pt-2 flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-[11px] text-slate-400 font-mono gap-1.5">
        <div className="flex items-center gap-1.5 text-sky-400 font-medium">
          <ShieldAlert className="w-3.5 h-3.5 text-sky-400 shrink-0" />
          <span>SOP Clause 4.4 &amp; 4.5: Only the Product Owner can authorize deviations; shop supervisors cannot bypass!</span>
        </div>
        <div className="text-slate-400 text-right">
          Ather AURIC Plant M002 · Quality Assurance Protocol
        </div>
      </div>
    </div>
  );
};
