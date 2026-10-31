import React, { useState, useEffect } from 'react';
import { GitBranch, RotateCcw, Wrench, CheckCircle, Trash2, ShieldCheck, ArrowRight } from 'lucide-react';

interface Props {
  videoSrc?: string;
  isPaused: boolean;
  onPauseReached?: () => void;
}

export const DispositionFilterAnimation: React.FC<Props> = ({
  videoSrc,
  isPaused,
  onPauseReached
}) => {
  const [videoAvailable, setVideoAvailable] = useState<boolean>(Boolean(videoSrc));

  useEffect(() => {
    setVideoAvailable(Boolean(videoSrc));
  }, [videoSrc]);
  const [hasTriggeredPause, setHasTriggeredPause] = useState(false);
  const [activeRoute, setActiveRoute] = useState(0);

  useEffect(() => {
    if (!hasTriggeredPause && !isPaused) {
      const timer = setTimeout(() => {
        setHasTriggeredPause(true);
        if (onPauseReached) onPauseReached();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [hasTriggeredPause, isPaused, onPauseReached]);

  // Rotate through 4 disposition routes
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveRoute((prev) => (prev + 1) % 4);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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
          backgroundImage: 'linear-gradient(to right, #6366f1 1px, transparent 1px), linear-gradient(to bottom, #6366f1 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* Header Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-inner">
            <GitBranch className="w-4 h-4 text-indigo-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-black font-mono tracking-wider text-slate-100 uppercase">
                THE 4-WAY MATERIAL DISPOSITION FILTER
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                SOP NG-RTV · CLAUSE 4.4
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-400 font-mono">
              Material Review Board (MRB) · SQA · MQA · Plant Engineering Authority
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-700/80">
          <span className="inline-block w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
          <span className="text-indigo-300 font-bold">MRB DECISION GATEWAY</span>
        </div>
      </div>

      {/* Center Layout: 4 Disposition Gateway Paths */}
      <div className="relative z-10 my-auto grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 items-stretch">
        {/* Route 1: Auto-RTV */}
        <div
          className={`rounded-2xl p-3 border transition-all flex flex-col justify-between font-mono space-y-2 ${
            activeRoute === 0
              ? 'bg-blue-950/60 border-blue-400 shadow-lg shadow-blue-500/20'
              : 'bg-slate-900/70 border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
            <div className="flex items-center gap-1.5">
              <RotateCcw className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-[11px] font-black text-blue-300 uppercase">1. AUTO-RTV</span>
            </div>
          </div>
          <p className="text-[9px] text-slate-400 leading-snug">
            Vendor machining error / tolerance breach. Return to Supplier with Debit Note.
          </p>
          <div className="text-[9px] bg-blue-900/30 text-blue-300 p-1.5 rounded border border-blue-800/40 font-bold text-center">
            SAP Return Delivery
          </div>
        </div>

        {/* Route 2: Internal Rework */}
        <div
          className={`rounded-2xl p-3 border transition-all flex flex-col justify-between font-mono space-y-2 ${
            activeRoute === 1
              ? 'bg-emerald-950/60 border-emerald-400 shadow-lg shadow-emerald-500/20'
              : 'bg-slate-900/70 border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
            <div className="flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[11px] font-black text-emerald-300 uppercase">2. REWORK</span>
            </div>
          </div>
          <p className="text-[9px] text-slate-400 leading-snug">
            Minor burrs or housing re-pinning using approved jigs. 100% IQC re-inspection.
          </p>
          <div className="text-[9px] bg-emerald-900/30 text-emerald-300 p-1.5 rounded border border-emerald-800/40 font-bold text-center">
            Rework Sheet + Re-QC
          </div>
        </div>

        {/* Route 3: Use As-Is */}
        <div
          className={`rounded-2xl p-3 border transition-all flex flex-col justify-between font-mono space-y-2 ${
            activeRoute === 2
              ? 'bg-amber-950/60 border-amber-400 shadow-lg shadow-amber-500/20'
              : 'bg-slate-900/70 border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[11px] font-black text-amber-300 uppercase">3. USE AS-IS</span>
            </div>
          </div>
          <p className="text-[9px] text-slate-400 leading-snug">
            Minor non-critical visual variance. Zero safety, performance, or homologation impact.
          </p>
          <div className="text-[9px] bg-amber-900/30 text-amber-300 p-1.5 rounded border border-amber-800/40 font-bold text-center">
            Signed Deviation Note
          </div>
        </div>

        {/* Route 4: Scrap */}
        <div
          className={`rounded-2xl p-3 border transition-all flex flex-col justify-between font-mono space-y-2 ${
            activeRoute === 3
              ? 'bg-rose-950/60 border-rose-400 shadow-lg shadow-rose-500/20'
              : 'bg-slate-900/70 border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
            <div className="flex items-center gap-1.5">
              <Trash2 className="w-3.5 h-3.5 text-rose-400" />
              <span className="text-[11px] font-black text-rose-300 uppercase">4. SCRAP</span>
            </div>
          </div>
          <p className="text-[9px] text-slate-400 leading-snug">
            Catastrophic structural failure or unrecoverable defect. Move to industrial shredder.
          </p>
          <div className="text-[9px] bg-rose-900/30 text-rose-300 p-1.5 rounded border border-rose-800/40 font-bold text-center">
            Finance Approval Note
          </div>
        </div>
      </div>

      {/* Footer Info Banner */}
      <div className="relative z-10 flex items-center justify-between pt-2 border-t border-slate-800 text-[10px] sm:text-xs font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
          <span>Clause 4.4: All dispositions require documented engineering / finance governance</span>
        </div>
        <div className="flex items-center gap-1 text-slate-400 font-bold">
          <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
          <span>ZERO VERBAL DECISIONS</span>
        </div>
      </div>
    </div>
  );
};
