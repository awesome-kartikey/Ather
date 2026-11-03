import React, { useState, useEffect } from 'react';
import { ShieldCheck, PauseCircle, PlayCircle, Monitor, FileSpreadsheet } from 'lucide-react';

interface Props {
  videoSrc?: string;
  isPaused: boolean;
  onPauseReached?: () => void;
}

export const GatehouseCabinAnimation: React.FC<Props> = ({
  videoSrc,
  isPaused,
  onPauseReached
}) => {
  const [videoAvailable, setVideoAvailable] = useState<boolean>(Boolean(videoSrc));

  useEffect(() => {
    setVideoAvailable(Boolean(videoSrc));
  }, [videoSrc]);
  const [hasTriggeredPause, setHasTriggeredPause] = useState(false);

  useEffect(() => {
    if (!hasTriggeredPause && !isPaused) {
      const timer = setTimeout(() => {
        setHasTriggeredPause(true);
        if (onPauseReached) onPauseReached();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [hasTriggeredPause, isPaused, onPauseReached]);

  return (
    <div className="relative w-full h-full min-h-0 bg-slate-950 rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-slate-800 shadow-2xl select-none flex flex-col justify-between">
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

      {/* Procedural SVG/CSS Gatehouse Interior Canvas */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Authentic Factory Background Photo */}
        <img
          src="/Assets/Background%20Environments/bg_deo_gate_office.jpg"
          alt="DEO Gate Office"
          className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-overlay pointer-events-none"
        />

        {/* Background Cabin Room Lighting */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-950 opacity-90" />

        <svg
          viewBox="0 0 1000 400"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full absolute inset-0 pointer-events-none"
        >
          {/* Back Wall with Acoustic Tile Grid & Ather Branding */}
          <rect x="0" y="0" width="1000" height="260" fill="#1e293b" opacity="0.6" />
          <line x1="0" y1="80" x2="1000" y2="80" stroke="#334155" strokeWidth="1" strokeDasharray="10,10" />
          <line x1="0" y1="160" x2="1000" y2="160" stroke="#334155" strokeWidth="1" strokeDasharray="10,10" />

          {/* Wall-Mounted Flight-Style Truck Status TV Dashboard (Clause 4.1.2) */}
          <g transform="translate(620, 30)">
            <rect x="0" y="0" width="280" height="110" rx="6" fill="#020617" stroke="#0284c7" strokeWidth="2" />
            <rect x="10" y="8" width="260" height="20" rx="3" fill="#0369a1" />
            <text x="140" y="22" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              AURIC M002 · GATE ENTRY LIVE STATUS
            </text>
            {/* Status lines simulating departure airport monitor */}
            <text x="20" y="45" fill="#38bdf8" fontSize="10" fontFamily="monospace">MH-20-DE-4412 · DOCK 04 [ALLOCATED]</text>
            <text x="20" y="65" fill="#facc15" fontSize="10" fontFamily="monospace">KA-01-AG-8802 · WAITING [ASN HOLD]</text>
            <text x="20" y="85" fill="#34d399" fontSize="10" fontFamily="monospace">MH-14-BT-9100 · GATE EXIT [CLEARED]</text>
            <circle cx="265" cy="18" r="4" fill="#10b981" className="animate-ping" />
          </g>

          {/* Dividing Wall & Glass Partition Frame */}
          <line x1="480" y1="20" x2="480" y2="280" stroke="#475569" strokeWidth="4" />

          {/* Left Reception Desk: Security Desk (Driver & Vehicle) */}
          <g transform="translate(60, 160)">
            {/* Desk Counter */}
            <rect x="0" y="70" width="380" height="170" rx="8" fill="#334155" stroke="#64748b" strokeWidth="2" />
            <rect x="-10" y="55" width="400" height="20" rx="4" fill="#0f172a" />
            {/* Security Signage */}
            <rect x="90" y="0" width="200" height="36" rx="6" fill="#065f46" stroke="#10b981" strokeWidth="1.5" />
            <text x="190" y="23" fill="#ecfdf5" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              🛡️ SECURITY DESK (DL / RC)
            </text>
            {/* Visitor Physical Logbook on desk */}
            <rect x="50" y="42" width="70" height="22" rx="2" fill="#f8fafc" stroke="#94a3b8" />
            <line x1="85" y1="42" x2="85" y2="64" stroke="#cbd5e1" strokeWidth="2" />
            {/* RFID Scanner pad */}
            <rect x="150" y="46" width="35" height="15" rx="3" fill="#1e293b" stroke="#10b981" strokeWidth="1" />
          </g>

          {/* Right Reception Desk: DEO Window (SAP ERP & Shipping Papers) */}
          <g transform="translate(520, 160)">
            {/* Desk Counter */}
            <rect x="0" y="70" width="420" height="170" rx="8" fill="#1e293b" stroke="#475569" strokeWidth="2" />
            <rect x="-10" y="55" width="440" height="20" rx="4" fill="#020617" />
            {/* DEO Signage */}
            <rect x="110" y="0" width="200" height="36" rx="6" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="210" y="23" fill="#eff6ff" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              💻 DEO WINDOW (ERP / SAP)
            </text>
            {/* SAP Dual Monitors on desk */}
            <rect x="60" y="-10" width="80" height="60" rx="4" fill="#020617" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="100" y="24" fill="#38bdf8" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              SAP GUI
            </text>
            <rect x="150" y="-10" width="80" height="60" rx="4" fill="#020617" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="190" y="24" fill="#34d399" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              PO/ASN
            </text>
            {/* Zebra Thermal Barcode Printer */}
            <rect x="250" y="15" width="45" height="38" rx="4" fill="#334155" stroke="#94a3b8" />
            <rect x="260" y="28" width="25" height="18" fill="#f8fafc" />
          </g>

          {/* Delivery Driver Silhouette standing at the counter holding papers */}
          <g transform="translate(430, 140)">
            {/* Head */}
            <circle cx="50" cy="40" r="22" fill="#0f172a" />
            {/* Torso */}
            <path d="M15 130 C15 75 85 75 85 130 Z" fill="#0284c7" opacity="0.9" />
            {/* Extended Hands holding physical folder/papers */}
            <rect x="35" y="80" width="30" height="20" rx="2" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
            <text x="50" y="94" fill="#713f12" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              DOCS
            </text>
          </g>
        </svg>
      </div>

      {/* Top Telemetry Overlay */}
      <div className="relative z-10 p-3 sm:p-4 flex items-center justify-between bg-gradient-to-b from-slate-950/80 to-transparent">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-ping" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
            CAM-02 · GATEHOUSE CABIN RECEPTION
          </span>
        </div>

        {/* Live Status Badge */}
        <div className="flex items-center gap-2">
          {isPaused ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/60 text-amber-300 text-xs font-mono font-bold uppercase tracking-wide">
              <PauseCircle className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>SOP Pause Point</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/60 text-blue-300 text-xs font-mono font-bold uppercase tracking-wide">
              <PlayCircle className="w-3.5 h-3.5 text-blue-400" />
              <span>Driver Entry</span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Scene Situation Card */}
      <div className="relative z-10 px-4 py-3 bg-slate-950/90 border-t border-slate-800/90 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 shrink-0">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
              Live Factory Situation
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-200">
              {isPaused
                ? 'Driver presents 5 documents. Sorting required between Security & DEO.'
                : 'Driver enters security gatehouse holding physical consignment folder...'}
            </div>
          </div>
        </div>

        <div className="text-right hidden sm:flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs font-mono">
            <Monitor className="w-3.5 h-3.5 text-blue-400" />
            <span>SAP ACTIVE</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400 text-xs font-mono">
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
            <span>SOP 4.1.2</span>
          </div>
        </div>
      </div>
    </div>
  );
};
