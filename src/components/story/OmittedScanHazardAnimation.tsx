import React, { useState, useEffect } from 'react';
import { AlertOctagon, PauseCircle, PlayCircle, ShieldAlert, AlertTriangle, UserX } from 'lucide-react';

interface Props {
  videoSrc?: string;
  isPaused: boolean;
  onPauseReached?: () => void;
}

export const OmittedScanHazardAnimation: React.FC<Props> = ({
  videoSrc,
  isPaused,
  onPauseReached
}) => {
  const [videoAvailable, setVideoAvailable] = useState<boolean>(false);
  const [hasTriggeredPause, setHasTriggeredPause] = useState(false);

  useEffect(() => {
    if (!hasTriggeredPause && !isPaused) {
      const timer = setTimeout(() => {
        setHasTriggeredPause(true);
        if (onPauseReached) onPauseReached();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [hasTriggeredPause, isPaused, onPauseReached]);

  return (
    <div className="relative w-full h-[280px] sm:h-[360px] md:h-[400px] bg-slate-950 rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-slate-800 shadow-2xl select-none flex flex-col justify-between">
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

      {/* Procedural SVG/CSS Omitted Scan Hazard Canvas */}
      <div className="absolute inset-0 w-full h-full overflow-hidden p-3 sm:p-5 flex flex-col justify-between">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 opacity-95" />

        <svg
          viewBox="0 0 1000 400"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full absolute inset-0 pointer-events-none"
        >
          {/* Dark Warehouse Horizon with Warning Ambient Red Lighting */}
          <rect x="0" y="0" width="1000" height="400" fill="#090d16" />
          <line x1="0" y1="260" x2="1000" y2="260" stroke="#1e293b" strokeWidth="3" />

          {/* Staging Aisle Floor */}
          <polygon points="50,400 950,400 800,260 200,260" fill="#0f172a" />
          <line x1="500" y1="260" x2="500" y2="400" stroke="#334155" strokeWidth="2" strokeDasharray="10 8" />

          {/* LEFT: Pallet on Rack with Unscanned Flashing Alert */}
          <g transform="translate(60, 50)">
            {/* Structural High-Rise Rack Column */}
            <rect x="0" y="0" width="18" height="320" fill="#1d4ed8" stroke="#3b82f6" strokeWidth="1" />
            <rect x="260" y="0" width="18" height="320" fill="#1d4ed8" stroke="#3b82f6" strokeWidth="1" />

            {/* Level 4 Beam */}
            <rect x="0" y="100" width="278" height="18" fill="#ea580c" stroke="#dc2626" strokeWidth="2" />

            {/* Stowed Blue FLC Crate */}
            <g transform="translate(30, 30)">
              <rect x="0" y="55" width="210" height="15" rx="2" fill="#854d0e" />
              <rect x="10" y="0" width="190" height="55" rx="5" fill="#1e40af" stroke="#ef4444" strokeWidth="2" />
              <text x="105" y="32" fill="#ffffff" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                FLC: CALIPERS (PHYSICALLY PLACED)
              </text>
            </g>

            {/* Beam Label with Red Blinking "SCAN MISSED" Tag */}
            <g transform="translate(60, 102)">
              <rect x="0" y="0" width="150" height="14" rx="2" fill="#7f1d1d" stroke="#ef4444" strokeWidth="1" />
              <text x="75" y="11" fill="#fca5a5" fontSize="8" fontWeight="black" fontFamily="monospace" textAnchor="middle">
                HRR-B-04-12 · [ ! NOT SCANNED ]
              </text>
            </g>

            {/* Floating Hazard Callout Arrow */}
            <g transform="translate(100, 130)">
              <polygon points="35,0 45,15 25,15" fill="#ef4444" />
              <rect x="-30" y="15" width="150" height="28" rx="6" fill="#450a0a" stroke="#dc2626" strokeWidth="1.5" />
              <text x="45" y="32" fill="#fecaca" fontSize="9" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
                ⚠️ HU NOT MARRIED!
              </text>
            </g>
          </g>

          {/* CENTER: Reach-Truck Driving Away into Distance */}
          <g transform="translate(380, 200)">
            {/* Small Driving Reach-Truck rear profile */}
            <rect x="25" y="40" width="70" height="45" rx="6" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
            <circle cx="35" cy="85" r="7" fill="#0f172a" stroke="#475569" strokeWidth="2" />
            <circle cx="85" cy="85" r="7" fill="#0f172a" stroke="#475569" strokeWidth="2" />
            {/* Mast */}
            <rect x="55" y="10" width="10" height="30" fill="#475569" />

            {/* Red motion lines indicating rushing away */}
            <line x1="10" y1="50" x2="-25" y2="50" stroke="#f43f5e" strokeWidth="2" strokeDasharray="6 4" />
            <line x1="10" y1="65" x2="-35" y2="65" stroke="#f43f5e" strokeWidth="2" strokeDasharray="6 4" />
            <line x1="10" y1="80" x2="-20" y2="80" stroke="#f43f5e" strokeWidth="2" strokeDasharray="6 4" />

            {/* Operator Bubble: "Done! Going to break..." */}
            <rect x="-20" y="-20" width="140" height="26" rx="6" fill="#1e293b" stroke="#cbd5e1" strokeWidth="1" />
            <text x="50" y="-4" fill="#94a3b8" fontSize="8" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
              "Pallet is stowed, I'm off!"
            </text>
          </g>

          {/* RIGHT: Zone Leader's SAP EWM Supervisory Console */}
          <g transform="translate(630, 45)">
            <rect x="0" y="0" width="340" height="290" rx="16" fill="#0f172a" stroke="#ef4444" strokeWidth="2.5" />
            {/* Header Alert Bar */}
            <rect x="0" y="0" width="340" height="40" rx="16" fill="#7f1d1d" />
            <rect x="0" y="24" width="340" height="16" fill="#7f1d1d" />
            <circle cx="22" cy="20" r="7" fill="#ef4444" className="animate-ping" />
            <circle cx="22" cy="20" r="6" fill="#ffffff" />
            <text x="38" y="24" fill="#ffffff" fontSize="11" fontWeight="bold" fontFamily="monospace">
              SAP EWM · FAILURE MODE 2 ALERT
            </text>

            {/* Critical Discrepancy Breakdown */}
            <g transform="translate(20, 58)">
              {/* Row 1: Task ID */}
              <text x="0" y="15" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                OPEN TASK ID:
              </text>
              <text x="130" y="15" fill="#f87171" fontSize="12" fontWeight="bold" fontFamily="monospace">
                WT-882049-01 [OVERDUE]
              </text>

              {/* Row 2: Operator KPI Impact */}
              <text x="0" y="45" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                OPERATOR ID:
              </text>
              <rect x="125" y="32" width="165" height="20" rx="3" fill="#450a0a" stroke="#dc2626" strokeWidth="1" />
              <text x="207" y="46" fill="#fca5a5" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                MHE-OP-4109 · KPI PENALTY
              </text>

              {/* Row 3: ERP Stock Status */}
              <text x="0" y="75" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                ERP G-STOCK:
              </text>
              <text x="130" y="75" fill="#fbbf24" fontSize="11" fontWeight="bold" fontFamily="monospace">
                UNUPDATED (0 UNITS POSTED)
              </text>

              {/* Row 4: Downstream Line Feeding */}
              <text x="0" y="105" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                LINE FEEDING:
              </text>
              <text x="130" y="105" fill="#ef4444" fontSize="11" fontWeight="bold" fontFamily="monospace">
                BLOCKED (PARTS INVISIBLE)
              </text>

              {/* Row 5: Zone Leader Action Required */}
              <rect x="0" y="125" width="300" height="52" rx="8" fill="#18181b" stroke="#71717a" strokeWidth="1" />
              <text x="150" y="145" fill="#fca5a5" fontSize="10" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
                ZL INTERVENTION MANDATORY:
              </text>
              <text x="150" y="162" fill="#d4d4d8" fontSize="9" fontFamily="sans-serif" textAnchor="middle">
                Zone Leader must physically trace Aisle B &amp; manual close
              </text>

              {/* Consequence footer banner */}
              <rect x="0" y="188" width="300" height="28" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="1" />
              <text x="150" y="206" fill="#fecaca" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                ⚠️ ALWAYS SCAN LOCATION QR CODE BEFORE DEPARTURE
              </text>
            </g>
          </g>
        </svg>

        {/* Top Floating Status Bar */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 backdrop-blur-md text-[11px] font-mono text-rose-400">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            <span className="font-bold tracking-wider uppercase">AURIC Plant M002 · Putaway Failure Audit</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 backdrop-blur-md text-[11px] font-mono text-slate-300">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
            <span>SOP 03_C1_S3 Clause 5.1 &amp; Failure Mode 2</span>
          </div>
        </div>

        {/* Bottom Floating Visual Guide Pill */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-300 bg-slate-900/85 px-3 py-1.5 rounded-xl border border-slate-800">
            <div className="flex items-center gap-1 text-rose-400">
              <AlertOctagon className="w-3.5 h-3.5" />
              <span>Omitted Scan: WH Task Left Open</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1 text-amber-400">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>G-Stock Mismatch</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1 text-rose-400">
              <UserX className="w-3.5 h-3.5" />
              <span>Operator KPI Breach</span>
            </div>
          </div>

          {isPaused ? (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/50 text-rose-300 text-xs font-mono font-bold animate-pulse">
              <PauseCircle className="w-3.5 h-3.5" />
              <span>SOP Crisis Assessment</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 text-xs font-mono font-bold">
              <PlayCircle className="w-3.5 h-3.5" />
              <span>Analyzing Failure Risk</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
