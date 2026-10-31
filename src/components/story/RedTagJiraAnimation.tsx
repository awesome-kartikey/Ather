import React, { useState, useEffect } from 'react';
import { Tag, FileText, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

interface Props {
  videoSrc?: string;
  isPaused: boolean;
  onPauseReached?: () => void;
}

export const RedTagJiraAnimation: React.FC<Props> = ({
  videoSrc,
  isPaused,
  onPauseReached
}) => {
  const [videoAvailable, setVideoAvailable] = useState<boolean>(Boolean(videoSrc));

  useEffect(() => {
    setVideoAvailable(Boolean(videoSrc));
  }, [videoSrc]);
  const [hasTriggeredPause, setHasTriggeredPause] = useState(false);
  const [pulseField, setPulseField] = useState(0);

  useEffect(() => {
    if (!hasTriggeredPause && !isPaused) {
      const timer = setTimeout(() => {
        setHasTriggeredPause(true);
        if (onPauseReached) onPauseReached();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [hasTriggeredPause, isPaused, onPauseReached]);

  // Stepping through mandatory JIRA validation fields
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseField((prev) => (prev + 1) % 4);
    }, 900);
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
          backgroundImage: 'linear-gradient(to right, #f43f5e 1px, transparent 1px), linear-gradient(to bottom, #f43f5e 1px, transparent 1px)',
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
                REJECTION AUDIT: RED TAG &amp; JIRA DIGITAL TICKET
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                SOP NG-RTV · CLAUSE 4.2
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-400 font-mono">
              Ather AURIC Plant M002 · Quality Quarantine Handover Protocol
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-700/60">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-emerald-400 font-bold">JIRA STATUS: QC DONE - FAIL</span>
        </div>
      </div>

      {/* Center Layout: Physical Dual Tagging vs Digital JIRA Defect Ticket */}
      <div className="relative z-10 my-auto grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
        {/* Left Column (5 cols): Physical Rejected Part with Dual Tagging */}
        <div className="md:col-span-5 bg-slate-900/90 rounded-2xl border border-slate-800 p-3.5 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-[11px] font-mono font-bold text-slate-300 uppercase flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-rose-400" />
              Physical Part Verification
            </span>
            <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
              DUAL MARKING REQUIRED
            </span>
          </div>

          {/* Graphic of Stator / Connector with Dual Tags */}
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2.5 font-mono">
            {/* Tag 1: Physical Red Tag */}
            <div className="bg-rose-600 text-white p-2 rounded-lg shadow-md border border-rose-400 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                <span className="font-black tracking-wider uppercase">1. PHYSICAL RED TAG</span>
              </div>
              <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded font-bold">AFFIXED ✓</span>
            </div>

            {/* Tag 2: Holographic QC Sticker */}
            <div className="bg-gradient-to-r from-amber-600 to-yellow-500 text-slate-950 p-2 rounded-lg shadow-md border border-yellow-300 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-slate-950" />
                <span className="font-black tracking-wider uppercase">2. QC STICKER</span>
              </div>
              <span className="text-[10px] bg-slate-950 text-yellow-300 px-1.5 py-0.5 rounded font-black">
                INSPECTED ✓
              </span>
            </div>

            <div className="text-[9px] text-slate-400 leading-tight pt-1">
              Clause 4.2 Mandate: NG Logistics team must <strong className="text-rose-400">REFUSE COLLECTION</strong> if either the Red Tag OR QC Sticker is missing!
            </div>
          </div>
        </div>

        {/* Center Arrow */}
        <div className="hidden md:flex md:col-span-1 items-center justify-center">
          <div className="flex flex-col items-center text-slate-500 font-mono text-[9px] gap-1">
            <span className="text-center font-bold">MATCH</span>
            <ArrowRight className="w-6 h-6 text-cyan-400 animate-pulse" />
            <span className="text-center font-bold">DATA</span>
          </div>
        </div>

        {/* Right Column (6 cols): Digital JIRA Defect Ticket */}
        <div className="md:col-span-6 bg-slate-900/95 rounded-2xl border border-slate-700/80 p-3.5 space-y-2.5 font-mono">
          {/* JIRA Ticket Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-blue-500 flex items-center justify-center text-[8px] font-black text-white">
                J
              </div>
              <span className="text-xs font-black text-white tracking-wide">
                JIRA TICKET: <span className="text-cyan-400">ATH-NG-2026-9921</span>
              </span>
            </div>
            <span className="text-[10px] font-bold bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded border border-rose-500/40">
              QC Done: Fail
            </span>
          </div>

          {/* JIRA Mandatory Data Fields */}
          <div className="grid grid-cols-2 gap-2 text-[10px]">
            <div className={`p-1.5 rounded-lg border ${pulseField === 0 ? 'bg-cyan-950/60 border-cyan-500' : 'bg-slate-950 border-slate-800'}`}>
              <span className="text-slate-500 block text-[9px]">Part No &amp; Lot:</span>
              <span className="font-bold text-slate-200">120049-A · Lot #B94</span>
            </div>
            <div className={`p-1.5 rounded-lg border ${pulseField === 1 ? 'bg-cyan-950/60 border-cyan-500' : 'bg-slate-950 border-slate-800'}`}>
              <span className="text-slate-500 block text-[9px]">Supplier Name:</span>
              <span className="font-bold text-slate-200">Amphenol Systems</span>
            </div>
            <div className={`p-1.5 rounded-lg border ${pulseField === 2 ? 'bg-cyan-950/60 border-cyan-500' : 'bg-slate-950 border-slate-800'}`}>
              <span className="text-slate-500 block text-[9px]">Defect Root Cause:</span>
              <span className="font-bold text-rose-400">Crimping Overheat</span>
            </div>
            <div className={`p-1.5 rounded-lg border ${pulseField === 3 ? 'bg-emerald-950/60 border-emerald-500' : 'bg-slate-950 border-slate-800'}`}>
              <span className="text-slate-500 block text-[9px]">Bug ID (Mandatory):</span>
              <span className="font-bold text-emerald-400">BUG-AURIC-0819 ✓</span>
            </div>
          </div>

          {/* Rejection Rule Warning */}
          <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 text-[9px] text-slate-400 flex items-center justify-between">
            <span>Bug ID Missing / Cause Unknown?</span>
            <span className="text-rose-400 font-bold bg-rose-950/50 px-2 py-0.5 rounded border border-rose-800">
              HOLD 2 DAYS FOR SQA
            </span>
          </div>
        </div>
      </div>

      {/* Footer Info Banner */}
      <div className="relative z-10 flex items-center justify-between pt-2 border-t border-slate-800 text-[10px] sm:text-xs font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <FileText className="w-3.5 h-3.5 text-rose-400" />
          <span>SOP Clause 4.2: Red Tag + QC Sticker + Valid Bug ID required before NG logistics collection</span>
        </div>
        <div className="flex items-center gap-1 text-emerald-400 font-bold">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>ZERO UNTRACKED REJECTIONS</span>
        </div>
      </div>
    </div>
  );
};
