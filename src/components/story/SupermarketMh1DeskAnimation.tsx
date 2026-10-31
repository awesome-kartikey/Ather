import React, { useState, useEffect } from 'react';
import { ShieldAlert, AlertTriangle, ArrowRight, ShoppingCart, CheckCircle2, XCircle } from 'lucide-react';

interface Props {
  videoSrc?: string;
  isPaused: boolean;
  onPauseReached?: () => void;
}

export const SupermarketMh1DeskAnimation: React.FC<Props> = ({
  videoSrc,
  isPaused,
  onPauseReached
}) => {
  const [videoAvailable, setVideoAvailable] = useState<boolean>(Boolean(videoSrc));

  useEffect(() => {
    setVideoAvailable(Boolean(videoSrc));
  }, [videoSrc]);
  const [hasTriggeredPause, setHasTriggeredPause] = useState(false);
  const [pulseWarning, setPulseWarning] = useState(false);

  useEffect(() => {
    if (!hasTriggeredPause && !isPaused) {
      const timer = setTimeout(() => {
        setHasTriggeredPause(true);
        if (onPauseReached) onPauseReached();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [hasTriggeredPause, isPaused, onPauseReached]);

  // Visual warning pulse
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseWarning((prev) => !prev);
    }, 700);
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
          backgroundImage: 'linear-gradient(to right, #10b981 1px, transparent 1px), linear-gradient(to bottom, #10b981 1px, transparent 1px)',
          backgroundSize: '36px 36px'
        }}
      />

      {/* Header Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-inner">
            <ShoppingCart className="w-4 h-4 animate-pulse text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-black font-mono tracking-wider text-slate-100 uppercase">
                SUPERMARKET MH1 INWARD DESK
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                SOP CLAUSE 4.1
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono">
              AURIC M002 · C-CLASS FASTENERS &amp; NON-DOL SEAL AUDIT
            </p>
          </div>
        </div>

        {/* Audit Status Pill */}
        <div className="flex items-center gap-2 bg-slate-900/90 border border-rose-500/40 rounded-xl px-3 py-1.5 shadow-sm">
          <AlertTriangle className="w-4 h-4 text-rose-400 animate-bounce" />
          <div className="text-right">
            <div className="text-[9px] font-mono text-slate-400 uppercase tracking-wider leading-none">
              SEAL VERIFICATION
            </div>
            <div className="text-xs sm:text-sm font-black font-mono text-rose-300 leading-tight">
              MISSING QC PASS
            </div>
          </div>
        </div>
      </div>

      {/* Main Procedural SVG Staging Desk Display */}
      <div className="relative z-10 flex-1 my-2 rounded-2xl bg-slate-900/90 border border-slate-800 p-3 flex flex-col justify-between overflow-hidden shadow-inner">
        <svg viewBox="0 0 800 240" className="w-full h-full">
          {/* MH1 Staging Desk Countertop */}
          <rect x="20" y="150" width="760" height="90" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="2" />
          <line x1="20" y1="160" x2="780" y2="160" stroke="#0ea5e9" strokeWidth="2" strokeOpacity="0.4" />

          {/* LEFT: C-Class Fastener Kitting Bin on Counter */}
          <g transform="translate(60, 60)">
            {/* Plastic Blue Fastener C-Class Tote */}
            <rect x="0" y="40" width="180" height="85" rx="6" fill="#0284c7" stroke="#0369a1" strokeWidth="2" />
            <rect x="10" y="50" width="160" height="70" fill="#0f172a" />

            {/* M6 Screws / Fasteners inside bin */}
            <g transform="translate(25, 60)">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <circle key={i} cx={i * 22 + 10} cy={15} r="6" fill="#94a3b8" stroke="#cbd5e1" strokeWidth="1.5" />
              ))}
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <rect key={i} x={i * 22 + 7} y={23} width="6" height="18" fill="#64748b" rx="1" />
              ))}
            </g>

            {/* Front Label Holder */}
            <rect x="30" y="100" width="120" height="20" rx="3" fill="#ffffff" />
            <text x="90" y="114" fill="#0f172a" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
              PART: M6-HEX-BOLTS (C-CLASS)
            </text>
          </g>

          {/* CENTER: AUDITED LOT (MISSING SEAL - VIOLATION) */}
          <g transform="translate(270, 20)">
            <rect 
              x="0" 
              y="0" 
              width="230" 
              height="160" 
              rx="12" 
              fill="#18181b" 
              stroke={pulseWarning ? "#ef4444" : "#71717a"} 
              strokeWidth="2.5" 
            />

            {/* Header */}
            <rect x="0" y="0" width="230" height="28" rx="12" fill="#27272a" />
            <text x="115" y="18" fill="#f43f5e" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
              AUDITED LOT: GRN-2026-M6-991
            </text>

            {/* GRN Label Mockup */}
            <g transform="translate(15, 38)">
              <rect x="0" y="0" width="200" height="70" rx="4" fill="#ffffff" stroke="#e4e4e7" strokeWidth="1" />
              <text x="10" y="16" fill="#000000" fontSize="8" fontWeight="black" fontFamily="monospace">
                GRN: 500291411
              </text>
              <text x="10" y="28" fill="#52525b" fontSize="7" fontFamily="sans-serif">
                Supplier: Sundram Fasteners Ltd
              </text>
              <text x="10" y="40" fill="#52525b" fontSize="7" fontFamily="sans-serif">
                Qty: 100 EA · Non-DOL
              </text>

              {/* Red Question Mark Stamp where seal should be */}
              <g transform="translate(145, 10)">
                <circle cx="20" cy="20" r="18" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 2" />
                <text x="20" y="27" fill="#dc2626" fontSize="18" fontWeight="black" textAnchor="middle">
                  ?
                </text>
              </g>
            </g>

            {/* Big Alert Banner */}
            <g transform="translate(15, 118)">
              <rect x="0" y="0" width="200" height="30" rx="6" fill="#7f1d1d" stroke="#ef4444" strokeWidth="1.5" />
              <text x="100" y="15" fill="#fecaca" fontSize="8" fontWeight="black" fontFamily="monospace" textAnchor="middle">
                ⚠️ MISSING "QC PASS" GREEN SEAL
              </text>
              <text x="100" y="25" fill="#fca5a5" fontSize="7" fontFamily="sans-serif" textAnchor="middle">
                Clause 4.1: Do NOT proceed with putaway!
              </text>
            </g>
          </g>

          {/* RIGHT: COMPLIANT STANDARD BENCHMARK */}
          <g transform="translate(530, 20)">
            <rect x="0" y="0" width="230" height="160" rx="12" fill="#064e3b" fillOpacity="0.4" stroke="#10b981" strokeWidth="2" />

            {/* Header */}
            <rect x="0" y="0" width="230" height="28" rx="12" fill="#065f46" />
            <text x="115" y="18" fill="#d1fae5" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
              SOP BENCHMARK: COMPLIANT
            </text>

            {/* Compliant GRN Label */}
            <g transform="translate(15, 38)">
              <rect x="0" y="0" width="200" height="70" rx="4" fill="#ffffff" stroke="#a7f3d0" strokeWidth="1" />
              <text x="10" y="16" fill="#000000" fontSize="8" fontWeight="black" fontFamily="monospace">
                GRN: 500291410
              </text>
              <text x="10" y="28" fill="#52525b" fontSize="7" fontFamily="sans-serif">
                Supplier: Sundram Fasteners Ltd
              </text>
              <text x="10" y="40" fill="#059669" fontSize="7" fontWeight="bold" fontFamily="sans-serif">
                Qty: 100 EA · QC RELEASED
              </text>

              {/* Official Green QC Pass Seal */}
              <g transform="translate(145, 10)">
                <circle cx="20" cy="20" r="18" fill="#dcfce7" stroke="#059669" strokeWidth="2" />
                <text x="20" y="18" fill="#15803d" fontSize="7" fontWeight="black" textAnchor="middle">
                  QC PASS
                </text>
                <text x="20" y="28" fill="#166534" fontSize="6" fontWeight="bold" textAnchor="middle">
                  AURIC IQC
                </text>
              </g>
            </g>

            {/* Green Approval Banner */}
            <g transform="translate(15, 118)">
              <rect x="0" y="0" width="200" height="30" rx="6" fill="#065f46" stroke="#10b981" strokeWidth="1" />
              <text x="100" y="15" fill="#ecfdf5" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                [✓] APPROVED FOR MH1 PUTAWAY
              </text>
              <text x="100" y="25" fill="#a7f3d0" fontSize="7" fontFamily="sans-serif" textAnchor="middle">
                Valid QC seal permits supermarket rack stow
              </text>
            </g>
          </g>
        </svg>

        {/* Legend / Audit Indicator */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800 text-[10px] font-mono text-slate-300">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-rose-400 font-bold bg-rose-950/60 px-2 py-0.5 rounded border border-rose-500/30">
              <XCircle className="w-3 h-3" />
              No QC Pass Seal = STOP Putaway (Quarantine Hold)
            </span>
            <span className="inline-flex items-center gap-1 text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
              <CheckCircle2 className="w-3 h-3" />
              QC Pass Stamp Affixed = GO (Proceed to Count Verification)
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-400">
            <span>Audit Desk:</span>
            <span className="text-amber-300 font-bold">MH1 Staging</span>
          </div>
        </div>
      </div>

      {/* Footer Info Strip */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-800 text-[10px] font-mono text-slate-400">
        <div className="flex items-center gap-1.5 text-slate-300">
          <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
          <span>SOP Clause 4.1: For Non-DOL parts, verify 'QC Pass' seal is present on GRN label</span>
        </div>

        <div className="flex items-center gap-1 text-slate-300">
          <span>Decision Mandate:</span>
          <span className="text-rose-400 font-bold">Stop Putaway if Seal Missing</span>
          <ArrowRight className="w-3 h-3 text-rose-400" />
        </div>
      </div>
    </div>
  );
};
