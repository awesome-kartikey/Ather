import React, { useState, useEffect } from 'react';
import { Lock, ShieldAlert, Truck, Wrench, Factory } from 'lucide-react';

interface Props {
  videoSrc?: string;
  isPaused: boolean;
  onPauseReached?: () => void;
}

export const QuarantineSegregationAnimation: React.FC<Props> = ({
  videoSrc,
  isPaused,
  onPauseReached
}) => {
  const [videoAvailable, setVideoAvailable] = useState<boolean>(Boolean(videoSrc));

  useEffect(() => {
    setVideoAvailable(Boolean(videoSrc));
  }, [videoSrc]);
  const [hasTriggeredPause, setHasTriggeredPause] = useState(false);
  const [activeBay, setActiveBay] = useState(0);

  useEffect(() => {
    if (!hasTriggeredPause && !isPaused) {
      const timer = setTimeout(() => {
        setHasTriggeredPause(true);
        if (onPauseReached) onPauseReached();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [hasTriggeredPause, isPaused, onPauseReached]);

  // Rotate through bays highlighting segregation criteria
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBay((prev) => (prev + 1) % 3);
    }, 1100);
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

      {/* Atmospheric Security Wire-Mesh Background with Authentic NG Quarantine Photo */}
      <img
        src="/Assets/Background%20Environments/bg_ng_quarantine_area.jpg"
        alt="Quarantine Rejection Area"
        className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 opacity-90 pointer-events-none" />
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#64748b 1px, transparent 1px)',
          backgroundSize: '16px 16px'
        }}
      />

      {/* Header Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 shadow-inner">
            <Lock className="w-4 h-4 text-rose-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-black font-mono tracking-wider text-slate-100 uppercase">
                STORE SC01 BL · CAGED QUARANTINE SEGREGATION
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                SOP NG-RTV · CLAUSE 4.3
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-400 font-mono">
              Ather AURIC Plant M002 · High-Security Caged Quarantine Area
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-700/80">
          <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-cyan-300 font-bold">STATUS: QUALITY FAILED</span>
        </div>
      </div>

      {/* Center Layout: 3 Root-Cause Segregation Bays */}
      <div className="relative z-10 my-auto grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 items-stretch">
        {/* Bay A: Vendor Defect */}
        <div
          className={`rounded-2xl p-3 sm:p-4 border transition-all flex flex-col justify-between font-mono space-y-2.5 ${
            activeBay === 0
              ? 'bg-amber-950/40 border-amber-500 shadow-lg shadow-amber-500/20'
              : 'bg-slate-900/80 border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-1.5">
              <Factory className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-black text-amber-300 uppercase">BAY A: VENDOR</span>
            </div>
            <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded font-bold">
              SQA HOLD
            </span>
          </div>

          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 space-y-1.5 text-[10px]">
            <div className="font-bold text-slate-200">Defect: Manufacturing Tolerance</div>
            <p className="text-[9px] text-slate-400">
              Faulty terminal crimps, bad PCB soldering, out-of-spec dimensions from supplier.
            </p>
          </div>

          <div className="text-[9px] bg-amber-900/30 text-amber-300 p-2 rounded-lg border border-amber-800/40 flex items-center justify-between">
            <span>Financial Route:</span>
            <span className="font-bold text-amber-200">Vendor Debit Note</span>
          </div>
        </div>

        {/* Bay B: Transit Logistics Damage */}
        <div
          className={`rounded-2xl p-3 sm:p-4 border transition-all flex flex-col justify-between font-mono space-y-2.5 ${
            activeBay === 1
              ? 'bg-sky-950/40 border-sky-500 shadow-lg shadow-sky-500/20'
              : 'bg-slate-900/80 border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-sky-400" />
              <span className="text-xs font-black text-sky-300 uppercase">BAY B: TRANSIT</span>
            </div>
            <span className="text-[9px] bg-sky-500/20 text-sky-300 px-1.5 py-0.5 rounded font-bold">
              3PL CLAIM
            </span>
          </div>

          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 space-y-1.5 text-[10px]">
            <div className="font-bold text-slate-200">Defect: Logistics Impact / Rain</div>
            <p className="text-[9px] text-slate-400">
              Crushed cartons, punctured FLCs, water soaking from torn truck tarpaulin.
            </p>
          </div>

          <div className="text-[9px] bg-sky-900/30 text-sky-300 p-2 rounded-lg border border-sky-800/40 flex items-center justify-between">
            <span>Financial Route:</span>
            <span className="font-bold text-sky-200">Carrier Insurance</span>
          </div>
        </div>

        {/* Bay C: In-House Handling */}
        <div
          className={`rounded-2xl p-3 sm:p-4 border transition-all flex flex-col justify-between font-mono space-y-2.5 ${
            activeBay === 2
              ? 'bg-purple-950/40 border-purple-500 shadow-lg shadow-purple-500/20'
              : 'bg-slate-900/80 border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-1.5">
              <Wrench className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-black text-purple-300 uppercase">BAY C: IN-HOUSE</span>
            </div>
            <span className="text-[9px] bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded font-bold">
              PLANT SCRAP
            </span>
          </div>

          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 space-y-1.5 text-[10px]">
            <div className="font-bold text-slate-200">Defect: Drop Damage / Assembly</div>
            <p className="text-[9px] text-slate-400">
              Part dropped from trolley, incorrect driver torque, paint scratched during decant.
            </p>
          </div>

          <div className="text-[9px] bg-purple-900/30 text-purple-300 p-2 rounded-lg border border-purple-800/40 flex items-center justify-between">
            <span>Financial Route:</span>
            <span className="font-bold text-purple-200">Plant Cost Center</span>
          </div>
        </div>
      </div>

      {/* Footer Info Banner */}
      <div className="relative z-10 flex items-center justify-between pt-2 border-t border-slate-800 text-[10px] sm:text-xs font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
          <span>SOP Clause 4.3: Segregate strictly by Root Cause (Vendor, Transit, In-House) in SC01 BL</span>
        </div>
        <div className="flex items-center gap-1 text-cyan-400 font-bold">
          <span>SAP BLOCKED STOCK</span>
        </div>
      </div>
    </div>
  );
};
