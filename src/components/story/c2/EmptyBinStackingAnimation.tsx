import React, { useState, useEffect } from 'react';
import { PackageOpen, ShieldAlert, CheckCircle2, Ruler, Lock, Clock } from 'lucide-react';

interface Props {
  videoSrc?: string;
  isPaused: boolean;
  onPauseReached?: () => void;
}

export const EmptyBinStackingAnimation: React.FC<Props> = ({
  videoSrc,
  isPaused,
  onPauseReached
}) => {
  const [videoAvailable, setVideoAvailable] = useState<boolean>(Boolean(videoSrc));

  useEffect(() => {
    setVideoAvailable(Boolean(videoSrc));
  }, [videoSrc]);
  const [hasTriggeredPause, setHasTriggeredPause] = useState(false);
  const [isHazardState, setIsHazardState] = useState<boolean>(false);

  useEffect(() => {
    if (!hasTriggeredPause && !isPaused) {
      const timer = setTimeout(() => {
        setHasTriggeredPause(true);
        if (onPauseReached) onPauseReached();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [hasTriggeredPause, isPaused, onPauseReached]);

  // Periodic toggle between 5-foot compliant stack and 8-foot hazardous tipping stack
  useEffect(() => {
    const interval = setInterval(() => {
      setIsHazardState((prev) => !prev);
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

      {/* Industrial Grid Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 opacity-95 pointer-events-none" />
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, #10b981 1px, transparent 1px), linear-gradient(to bottom, #10b981 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* Header Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-inner">
            <PackageOpen className="w-4 h-4 text-emerald-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-black font-mono tracking-wider text-slate-100 uppercase">
                EMPTY BIN STACKING &amp; GANGWAY CLEARANCE
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                SOP 08_C2_S4 · CLAUSE 4.1
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-400 font-mono">
              Ather AURIC Plant M002 · 5-Foot Max Stacking Height · 30-Min Gangway Sweeps
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-700/80">
          <span className={`inline-block w-2 h-2 rounded-full ${isHazardState ? 'bg-rose-400 animate-ping' : 'bg-emerald-400 animate-pulse'}`} />
          <span className={isHazardState ? 'text-rose-300 font-bold' : 'text-emerald-300 font-bold'}>
            {isHazardState ? 'CRITICAL SAFETY VIOLATION (> 5 FT)' : 'COMPLIANT STACK (≤ 5 FT + BELTED)'}
          </span>
        </div>
      </div>

      {/* Main Grid: Visual Height Simulation vs Safety Protocols */}
      <div className="relative z-10 my-auto grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
        {/* Left Column (5 cols): Visual Stacking Pillar & Height Ruler */}
        <div className="md:col-span-5 bg-slate-900/90 rounded-2xl border border-slate-800 p-3 space-y-2 font-mono flex flex-col items-center justify-between">
          <div className="w-full flex items-center justify-between border-b border-slate-800 pb-1.5 text-xs">
            <span className="text-slate-300 font-bold flex items-center gap-1.5">
              <Ruler className="w-3.5 h-3.5 text-amber-400" />
              Stack Height Gauge
            </span>
            <span className={`px-2 py-0.5 rounded font-black text-[10px] ${
              isHazardState
                ? 'bg-rose-950/80 text-rose-300 border border-rose-700'
                : 'bg-emerald-950/80 text-emerald-300 border border-emerald-700'
            }`}>
              {isHazardState ? '7.8 FT (OVER-HEIGHT 🛑)' : '4.8 FT (SAFE ≤ 5 FT ✅)'}
            </span>
          </div>

          {/* Stacking Graphic */}
          <div className="relative w-full h-36 bg-slate-950/80 rounded-xl border border-slate-800/80 flex items-end justify-center pb-2 px-6">
            {/* Height Limit Demarcation Line */}
            <div className="absolute left-3 right-3 top-14 border-t-2 border-dashed border-rose-500/80 flex items-center justify-between z-10 pointer-events-none">
              <span className="text-[9px] font-black text-rose-400 bg-slate-950/90 px-1 rounded -translate-y-2 border border-rose-500/40">
                MAX 5.0 FT LIMIT
              </span>
              <span className="text-[9px] font-mono text-rose-300 bg-slate-950/90 px-1 rounded -translate-y-2">
                Operator Eye Level
              </span>
            </div>

            {/* Bins Stack Column */}
            <div className="flex flex-col-reverse items-center gap-1 w-36 relative transition-all duration-300">
              {/* Pallet Base */}
              <div className="w-36 h-4 bg-amber-900/80 border border-amber-700/80 rounded flex items-center justify-center text-[9px] text-amber-300 font-bold">
                WOODEN EUR PALLET
              </div>

              {/* Bin 1 */}
              <div className="w-32 h-5 bg-sky-900/90 border border-sky-600/80 rounded flex items-center justify-center text-[9px] text-sky-200">
                Ather Blue Tote #1
              </div>
              {/* Bin 2 */}
              <div className="w-32 h-5 bg-sky-900/90 border border-sky-600/80 rounded flex items-center justify-center text-[9px] text-sky-200">
                Ather Blue Tote #2
              </div>
              {/* Bin 3 */}
              <div className="w-32 h-5 bg-sky-900/90 border border-sky-600/80 rounded flex items-center justify-center text-[9px] text-sky-200">
                Ather Blue Tote #3
              </div>

              {/* Hazard Bins (Rendered when over-limit) */}
              {isHazardState ? (
                <>
                  <div className="w-32 h-5 bg-rose-900/90 border border-rose-500 rounded flex items-center justify-center text-[9px] text-rose-200 animate-pulse">
                    ⚠️ Tote #4 (Over 5 Ft!)
                  </div>
                  <div className="w-32 h-5 bg-rose-900/90 border border-rose-500 rounded flex items-center justify-center text-[9px] text-rose-200 animate-bounce">
                    🚨 Tote #5 (Tipping Risk!)
                  </div>
                </>
              ) : (
                /* Safety Strap / Belt Graphic when Compliant */
                <div className="absolute inset-y-1 left-2 right-2 border-2 border-emerald-400/90 rounded bg-emerald-500/10 flex items-center justify-center pointer-events-none">
                  <span className="text-[8px] font-black text-emerald-300 bg-slate-950 px-1 py-0.5 rounded border border-emerald-500">
                    🔒 RATCHET BELT SECURED
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="w-full text-center text-[10px] text-slate-400">
            {isHazardState ? 'Tipping danger: Zero strap, obscured line visibility' : 'Ergonomic height: Operator maintains full visibility'}
          </div>
        </div>

        {/* Right Column (7 cols): Safety Protocols & Gangway Rules */}
        <div className="md:col-span-7 bg-slate-900/90 rounded-2xl border border-slate-800 p-3.5 space-y-3 font-mono">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-[11px] font-bold text-slate-200 uppercase flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-cyan-400" />
              SOP Empty Asset Handover Rules
            </span>
            <span className="text-[10px] font-bold text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">
              AUDIT COMPLIANCE
            </span>
          </div>

          <div className="space-y-2 bg-slate-950/90 rounded-xl p-3 border border-slate-800/80 text-xs">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-200">5-Foot Maximum Height Rule:</span>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Stacking must strictly not exceed operator height (5 feet). Taller stacks cause toppling injuries and obscure evacuation routes.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2 pt-1 border-t border-slate-800/60">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-200">Mandatory Ratchet Strapping:</span>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Operators must fasten safety belts/straps securely around palletized bins prior to any pallet truck or forklift transit.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2 pt-1 border-t border-slate-800/60">
              <Clock className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-200">30-Minute Gangway Clearance:</span>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Empty bin collection rounds occur continuously every 30 minutes to ensure shop floor gangways remain 100% unobstructed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer SOP Verification Note */}
      <div className="relative z-10 border-t border-slate-800/80 pt-2 flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-[11px] text-slate-400 font-mono gap-1.5">
        <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
          <ShieldAlert className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>SOP 08_C2_S4: Never exceed 5 feet under any circumstance; always strap before moving!</span>
        </div>
        <div className="text-slate-400 text-right">
          Ather AURIC Plant M002 · EHS Industrial Safety
        </div>
      </div>
    </div>
  );
};
