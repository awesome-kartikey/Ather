import React, { useState, useEffect } from 'react';
import { ShieldCheck, PauseCircle, PlayCircle, AlertTriangle, XCircle, CheckCircle } from 'lucide-react';

interface Props {
  videoSrc?: string;
  isPaused: boolean;
  onPauseReached?: () => void;
}

export const IqcDispositionAnimation: React.FC<Props> = ({
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

      {/* Procedural SVG/CSS 3-Way IQC Outcome Canvas */}
      <div className="absolute inset-0 w-full h-full overflow-hidden p-3 sm:p-5 flex flex-col justify-between">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 opacity-95" />

        <svg
          viewBox="0 0 1000 400"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full absolute inset-0 pointer-events-none"
        >
          {/* Background Wall of IQC Testing Bay */}
          <rect x="0" y="0" width="1000" height="250" fill="#0b1120" />
          <line x1="0" y1="250" x2="1000" y2="250" stroke="#1e293b" strokeWidth="4" />

          {/* Staging Floor Grid */}
          <polygon points="20,400 980,400 850,250 150,250" fill="#0f172a" />
          <line x1="333" y1="250" x2="280" y2="400" stroke="#334155" strokeWidth="2" strokeDasharray="6 6" />
          <line x1="666" y1="250" x2="720" y2="400" stroke="#334155" strokeWidth="2" strokeDasharray="6 6" />

          {/* Top Title Banner & Airflow Vent */}
          <g transform="translate(250, 20)">
            <rect x="0" y="0" width="500" height="38" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="250" y="24" fill="#93c5fd" fontSize="13" fontWeight="bold" fontFamily="monospace" textAnchor="middle" letterSpacing="1">
              AURIC IQC TEST BENCH · DISPOSITION CLEARANCE PORTAL
            </text>
          </g>

          {/* LANE 1 (LEFT): GREEN - QC PASS & RELEASE */}
          <g transform="translate(60, 110)">
            {/* Zone Platform */}
            <rect x="0" y="0" width="260" height="240" rx="14" fill="#064e3b" fillOpacity="0.25" stroke="#10b981" strokeWidth="2" />
            {/* Zone Tag */}
            <rect x="20" y="-12" width="120" height="24" rx="12" fill="#10b981" />
            <text x="80" y="4" fill="#ffffff" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
              ✓ QC PASS
            </text>

            {/* FLC Pallet */}
            <rect x="35" y="140" width="190" height="18" rx="3" fill="#854d0e" stroke="#713f12" strokeWidth="1.5" />
            <rect x="45" y="60" width="170" height="80" rx="6" fill="#1d4ed8" stroke="#3b82f6" strokeWidth="2" />

            {/* Stamped GRN Label with Green Pass Stamp */}
            <rect x="75" y="75" width="110" height="52" rx="4" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
            <rect x="80" y="80" width="100" height="6" fill="#0284c7" />
            <text x="130" y="96" fill="#0f172a" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
              GRN: 50029104
            </text>
            {/* Green Pass Seal Stamp */}
            <g transform="translate(100, 95) rotate(-8)">
              <rect x="0" y="0" width="60" height="24" rx="4" fill="none" stroke="#059669" strokeWidth="2" />
              <text x="30" y="16" fill="#059669" fontSize="10" fontWeight="black" fontFamily="sans-serif" textAnchor="middle">
                QC PASS
              </text>
            </g>

            {/* Action Caption */}
            <rect x="15" y="180" width="230" height="42" rx="8" fill="#022c22" stroke="#059669" strokeWidth="1" />
            <text x="130" y="198" fill="#6ee7b7" fontSize="10" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
              SEAL GRN STICKER
            </text>
            <text x="130" y="212" fill="#a7f3d0" fontSize="9" fontFamily="sans-serif" textAnchor="middle">
              Release to Warehouse Put-Away
            </text>
          </g>

          {/* LANE 2 (CENTER): YELLOW - IQC HOLD */}
          <g transform="translate(370, 110)">
            {/* Zone Platform */}
            <rect x="0" y="0" width="260" height="240" rx="14" fill="#713f12" fillOpacity="0.25" stroke="#eab308" strokeWidth="2" />
            {/* Zone Tag */}
            <rect x="20" y="-12" width="120" height="24" rx="12" fill="#eab308" />
            <text x="80" y="4" fill="#000000" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
              ⚠️ IQC HOLD
            </text>

            {/* FLC Pallet */}
            <rect x="35" y="140" width="190" height="18" rx="3" fill="#854d0e" stroke="#713f12" strokeWidth="1.5" />
            <rect x="45" y="60" width="170" height="80" rx="6" fill="#1d4ed8" stroke="#3b82f6" strokeWidth="2" />

            {/* Yellow "IQC HOLD" Traffic Cone on Crate */}
            <polygon points="130,25 110,65 150,65" fill="#facc15" stroke="#ca8a04" strokeWidth="2" />
            <polygon points="124,38 114,54 146,54" fill="#ffffff" />
            <rect x="104" y="65" width="52" height="6" rx="2" fill="#ca8a04" />
            <text x="130" y="52" fill="#000000" fontSize="7" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
              HOLD
            </text>

            {/* Staged GRN Label with No Stamp */}
            <rect x="75" y="80" width="110" height="45" rx="4" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
            <text x="130" y="105" fill="#ca8a04" fontSize="12" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
              [ ? ] PENDING
            </text>

            {/* Action Caption */}
            <rect x="15" y="180" width="230" height="42" rx="8" fill="#422006" stroke="#ca8a04" strokeWidth="1" />
            <text x="130" y="198" fill="#fde047" fontSize="10" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
              PLACE YELLOW HOLD CONE
            </text>
            <text x="130" y="212" fill="#fef08a" fontSize="9" fontFamily="sans-serif" textAnchor="middle">
              Keep Staged · Await Lab Retest
            </text>
          </g>

          {/* LANE 3 (RIGHT): RED - NG REJECTED & JIRA DEFECT */}
          <g transform="translate(680, 110)">
            {/* Zone Platform */}
            <rect x="0" y="0" width="260" height="240" rx="14" fill="#7f1d1d" fillOpacity="0.25" stroke="#ef4444" strokeWidth="2" />
            {/* Zone Tag */}
            <rect x="20" y="-12" width="130" height="24" rx="12" fill="#ef4444" />
            <text x="85" y="4" fill="#ffffff" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
              🛑 NG REJECTED
            </text>

            {/* FLC Pallet */}
            <rect x="35" y="140" width="190" height="18" rx="3" fill="#854d0e" stroke="#713f12" strokeWidth="1.5" />
            <rect x="45" y="60" width="170" height="80" rx="6" fill="#1e293b" stroke="#ef4444" strokeWidth="2" />

            {/* Bold Red Physical NG Tag Hanging */}
            <g transform="translate(70, 70)">
              <polygon points="0,0 60,0 75,18 60,36 0,36" fill="#dc2626" stroke="#b91c1c" strokeWidth="1" />
              <circle cx="10" cy="18" r="4" fill="#ffffff" />
              <text x="40" y="23" fill="#ffffff" fontSize="11" fontWeight="black" fontFamily="sans-serif" textAnchor="middle">
                NG TAG
              </text>
            </g>

            {/* Digital Jira Tablet Floating */}
            <g transform="translate(150, 65)">
              <rect x="0" y="0" width="75" height="50" rx="5" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
              <rect x="5" y="5" width="65" height="10" rx="2" fill="#0284c7" />
              <text x="37" y="13" fill="#ffffff" fontSize="6" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                JIRA TICKET
              </text>
              <text x="37" y="27" fill="#f87171" fontSize="7" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                #AHR-NG-4082
              </text>
              <text x="37" y="38" fill="#94a3b8" fontSize="6" fontFamily="monospace" textAnchor="middle">
                Lot Vol: 100%
              </text>
            </g>

            {/* Action Caption */}
            <rect x="15" y="180" width="230" height="42" rx="8" fill="#450a0a" stroke="#dc2626" strokeWidth="1" />
            <text x="130" y="198" fill="#fca5a5" fontSize="10" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
              RED TAG + JIRA TICKET
            </text>
            <text x="130" y="212" fill="#fecaca" fontSize="9" fontFamily="sans-serif" textAnchor="middle">
              Whole Lot -&gt; Move to NG Area
            </text>
          </g>
        </svg>

        {/* Top Floating HUD Status Bar */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 backdrop-blur-md text-[11px] font-mono text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold tracking-wider uppercase">AURIC Plant M002 · IQC Clearance Gate</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 backdrop-blur-md text-[11px] font-mono text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>SOP 02_C1_S2 Clause 4.5</span>
          </div>
        </div>

        {/* Bottom Floating Visual Guide Pill */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-300 bg-slate-900/85 px-3 py-1.5 rounded-xl border border-slate-800">
            <div className="flex items-center gap-1 text-emerald-400">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Pass: Seal GRN</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1 text-yellow-400">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Hold: Yellow Cone</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1 text-rose-400">
              <XCircle className="w-3.5 h-3.5" />
              <span>NG: Tag + Jira + Full Lot</span>
            </div>
          </div>

          {isPaused ? (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/50 text-amber-300 text-xs font-mono font-bold animate-pulse">
              <PauseCircle className="w-3.5 h-3.5" />
              <span>IQC Mandatory Action Point</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 text-xs font-mono font-bold">
              <PlayCircle className="w-3.5 h-3.5" />
              <span>Auditing 3 Outcomes</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
