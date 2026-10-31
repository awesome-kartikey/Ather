import React, { useState, useEffect } from 'react';
import { Trash2, Scale, FileText, CheckCircle2, ShieldCheck, Truck, ArrowRight } from 'lucide-react';

interface Props {
  videoSrc?: string;
  isPaused: boolean;
  onPauseReached?: () => void;
}

export const ScrapShredderAnimation: React.FC<Props> = ({
  videoSrc,
  isPaused,
  onPauseReached
}) => {
  const [videoAvailable, setVideoAvailable] = useState<boolean>(Boolean(videoSrc));

  useEffect(() => {
    setVideoAvailable(Boolean(videoSrc));
  }, [videoSrc]);
  const [hasTriggeredPause, setHasTriggeredPause] = useState(false);
  const [shredCycle, setShredCycle] = useState(0);

  useEffect(() => {
    if (!hasTriggeredPause && !isPaused) {
      const timer = setTimeout(() => {
        setHasTriggeredPause(true);
        if (onPauseReached) onPauseReached();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [hasTriggeredPause, isPaused, onPauseReached]);

  // Stepping through shredder -> weighbridge animation states
  useEffect(() => {
    const interval = setInterval(() => {
      setShredCycle((prev) => (prev + 1) % 4);
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

      {/* Atmospheric Industrial Grid Background with Authentic Scrapyard Photo */}
      <img
        src="/Assets/Background%20Environments/bg_final_scrapyard.jpg"
        alt="Final Scrapyard"
        className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 opacity-90 pointer-events-none" />
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
            <Trash2 className="w-4 h-4 text-rose-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-black font-mono tracking-wider text-slate-100 uppercase">
                SCRAPYARD SHREDDING &amp; WEIGHBRIDGE DISPATCH
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                SOP 08_C1_S4 · CLAUSE 4.5
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-400 font-mono">
              Ather AURIC Plant M002 · Industrial Shredder &amp; Outbound Weighbridge
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-700/80">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-emerald-400 font-bold">JIRA: STATUS SCRAPPED</span>
        </div>
      </div>

      {/* Center Layout: Industrial Shredder vs JIRA Proof vs Weighbridge Truck */}
      <div className="relative z-10 my-auto grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
        {/* Left Column (5 cols): Industrial Mechanical Shredder */}
        <div className="md:col-span-5 bg-slate-900/90 rounded-2xl border border-slate-800 p-3.5 space-y-3 font-mono">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-[11px] font-bold text-slate-300 uppercase flex items-center gap-1.5">
              <Trash2 className="w-3.5 h-3.5 text-rose-400" />
              Twin-Shaft Shredder
            </span>
            <span className="text-[10px] font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/30">
              MUTILATION ACTIVE
            </span>
          </div>

          {/* Shredder Graphic with Warning Stripes */}
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-[10px] text-slate-400">
              <span>Feed: Rejected Frames / Packs</span>
              <span className="text-rose-400 font-bold">100% De-Identified</span>
            </div>

            {/* Animated Shredder Teeth */}
            <div className="h-14 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center relative overflow-hidden">
              <div 
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, #f43f5e 0, #f43f5e 10px, transparent 10px, transparent 20px)'
                }}
              />
              <div className="relative z-10 flex items-center gap-2 text-rose-400 text-xs font-black animate-pulse">
                <span>⚙️ SHREDDING CYCLE {shredCycle + 1}/4 ⚙️</span>
                <span className="text-[10px] text-slate-300">· WITNESSED BY FINANCE</span>
              </div>
            </div>

            <div className="text-[9px] text-slate-400 leading-tight">
              SOP Rule: Components must be physically destroyed so zero parts enter black markets or unauthorized spares channels.
            </div>
          </div>
        </div>

        {/* Center Connection Arrow */}
        <div className="hidden md:flex md:col-span-1 items-center justify-center">
          <div className="flex flex-col items-center text-slate-500 font-mono text-[9px] gap-1">
            <span className="text-center font-bold">PROOF</span>
            <ArrowRight className="w-6 h-6 text-emerald-400 animate-pulse" />
            <span className="text-center font-bold">WEIGH</span>
          </div>
        </div>

        {/* Right Column (6 cols): Weighbridge & Delivery Challan */}
        <div className="md:col-span-6 bg-slate-900/95 rounded-2xl border border-slate-700/80 p-3.5 space-y-2.5 font-mono">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-black text-white uppercase">SECURITY WEIGHBRIDGE</span>
            </div>
            <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/40">
              DC GENERATED
            </span>
          </div>

          {/* Weighbridge Dual-Scale Reading */}
          <div className="grid grid-cols-3 gap-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-[10px] text-center">
            <div className="space-y-0.5">
              <span className="text-slate-500 block text-[9px]">1. Tare (Empty):</span>
              <span className="font-bold text-slate-200">6,420 kg</span>
            </div>
            <div className="space-y-0.5 border-x border-slate-800">
              <span className="text-slate-500 block text-[9px]">2. Gross (Full):</span>
              <span className="font-bold text-slate-200">8,940 kg</span>
            </div>
            <div className="space-y-0.5">
              <span className="text-slate-500 block text-[9px]">3. Net Scrap:</span>
              <span className="font-black text-emerald-400">2,520 kg ✓</span>
            </div>
          </div>

          {/* Delivery Challan & Gate Pass */}
          <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 flex items-center justify-between text-[10px]">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-400" />
              <div>
                <span className="font-bold text-white block">Delivery Challan: DC-SCRAP-8812</span>
                <span className="text-[9px] text-slate-400">Approved by Plant Finance Head</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-emerald-400 font-bold text-[9px] bg-emerald-950/60 px-2 py-1 rounded border border-emerald-700">
              <CheckCircle2 className="w-3 h-3" /> GATE EXIT OK
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info Banner */}
      <div className="relative z-10 flex items-center justify-between pt-2 border-t border-slate-800 text-[10px] sm:text-xs font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <Truck className="w-3.5 h-3.5 text-emerald-400" />
          <span>SOP Clause 4.5: Witness shredding &rarr; Weigh empty &rarr; Weigh loaded &rarr; Finance DC</span>
        </div>
        <div className="flex items-center gap-1 text-emerald-400 font-bold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>100% REGULATORY COMPLIANCE</span>
        </div>
      </div>
    </div>
  );
};
