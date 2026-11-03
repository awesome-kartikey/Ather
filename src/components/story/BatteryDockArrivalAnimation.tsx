import React, { useState, useEffect, useRef } from 'react';
import { BatteryCharging, PauseCircle, PlayCircle, ShieldAlert, UserCheck, UserX, Video, Eye } from 'lucide-react';

interface Props {
  videoSrc?: string;
  posterSrc?: string;
  isPaused: boolean;
  onPauseReached?: () => void;
}

export const BatteryDockArrivalAnimation: React.FC<Props> = ({
  videoSrc,
  posterSrc = '/Assets/videos/scene_05_battery_vault_climate_poster.jpg',
  isPaused,
  onPauseReached
}) => {
  const [videoError, setVideoError] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'video' | 'svg'>('video');
  const videoRef = useRef<HTMLVideoElement>(null);
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

  useEffect(() => {
    if (videoRef.current) {
      if (isPaused) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
    }
  }, [isPaused]);

  return (
    <div className="relative w-full h-full min-h-0 bg-slate-950 rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-slate-800 shadow-2xl select-none flex flex-col justify-between">
      {/* 3D MP4 Real Simulation Video */}
      {videoSrc && viewMode === 'video' && !videoError && (
        <video
          ref={videoRef}
          key={videoSrc}
          src={videoSrc}
          poster={posterSrc}
          autoPlay
          loop={!isPaused}
          muted
          playsInline
          preload="auto"
          onError={(e) => {
            console.warn('[Ather DOJO] Video stream loading error:', videoSrc, e);
            setVideoError(true);
          }}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      )}

      {/* Procedural SVG/CSS Battery Dock Arrival Canvas */}
      <div className="absolute inset-0 w-full h-full overflow-hidden p-3 sm:p-5 flex flex-col justify-between pointer-events-none">
        {(viewMode === 'svg' || videoError || !videoSrc) && (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 opacity-95" />

            <svg
              viewBox="0 0 1000 400"
              preserveAspectRatio="xMidYMid slice"
              className="w-full h-full absolute inset-0 pointer-events-none"
            >
          {/* Dock 01 Warehouse Wall & Heavy Roll-up Bay Door */}
          <rect x="0" y="0" width="1000" height="230" fill="#0b1329" />
          <line x1="0" y1="230" x2="1000" y2="230" stroke="#1e293b" strokeWidth="4" />

          {/* Dock 01 Sign */}
          <g transform="translate(100, 20)">
            <rect x="0" y="0" width="220" height="34" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="110" y="22" fill="#93c5fd" fontSize="12" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
              INBOUND DOCK 01 · CELL VAULT
            </text>
          </g>

          {/* Staging Concrete Floor */}
          <polygon points="20,400 980,400 860,230 140,230" fill="#1e293b" />
          <line x1="500" y1="230" x2="500" y2="400" stroke="#334155" strokeWidth="2" strokeDasharray="10 8" />

          {/* Hazardous Class 9 Demarcation Zone on Floor */}
          <polygon points="120,400 460,400 420,240 180,240" fill="#450a0a" fillOpacity="0.3" stroke="#ef4444" strokeWidth="2" strokeDasharray="8 6" />
          <text x="300" y="385" fill="#fca5a5" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
            HAZMAT ZONE · UN 3480 CLASS 9 LITHIUM CELLS
          </text>

          {/* LEFT: Battery Cell Pallet with Class 9 Warning Placards */}
          <g transform="translate(180, 140)">
            {/* Wooden Base Pallet */}
            <rect x="0" y="145" width="240" height="22" rx="3" fill="#854d0e" stroke="#713f12" strokeWidth="2" />
            <rect x="20" y="167" width="40" height="15" fill="#713f12" />
            <rect x="100" y="167" width="40" height="15" fill="#713f12" />
            <rect x="180" y="167" width="40" height="15" fill="#713f12" />

            {/* Industrial Battery Cell Crates (Heavy Gray with Orange Seals) */}
            <rect x="15" y="40" width="210" height="105" rx="8" fill="#334155" stroke="#64748b" strokeWidth="2.5" />
            <rect x="25" y="50" width="190" height="85" rx="5" fill="#1e293b" />

            {/* Class 9 Hazard Placard (Diamond) */}
            <g transform="translate(45, 65)">
              <polygon points="25,0 50,25 25,50 0,25" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
              {/* Vertical stripes on top half of diamond */}
              <line x1="10" y1="15" x2="10" y2="25" stroke="#000000" strokeWidth="2" />
              <line x1="16" y1="10" x2="16" y2="25" stroke="#000000" strokeWidth="2" />
              <line x1="22" y1="5" x2="22" y2="25" stroke="#000000" strokeWidth="2" />
              <line x1="28" y1="5" x2="28" y2="25" stroke="#000000" strokeWidth="2" />
              <line x1="34" y1="10" x2="34" y2="25" stroke="#000000" strokeWidth="2" />
              <line x1="40" y1="15" x2="40" y2="25" stroke="#000000" strokeWidth="2" />
              <text x="25" y="42" fill="#000000" fontSize="10" fontWeight="black" fontFamily="sans-serif" textAnchor="middle">
                9
              </text>
            </g>

            {/* Battery Cell Spec Tag */}
            <g transform="translate(110, 60)">
              <rect x="0" y="0" width="95" height="65" rx="4" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
              <text x="47" y="15" fill="#38bdf8" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                LITHIUM CELLS
              </text>
              <text x="47" y="28" fill="#facc15" fontSize="7" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                ATHER 450X GEN 3
              </text>
              <text x="47" y="42" fill="#94a3b8" fontSize="7" fontFamily="monospace" textAnchor="middle">
                UN 3480 · 3.7V
              </text>
              <text x="47" y="55" fill="#ef4444" fontSize="7" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                FRAGILE · NO HPT
              </text>
            </g>
          </g>

          {/* CENTER: General Warehouse Worker with Manual Hand Pallet Truck (PROHIBITED) */}
          <g transform="translate(470, 180)">
            {/* Red Stop Boundary Box */}
            <rect x="0" y="0" width="220" height="190" rx="14" fill="#450a0a" fillOpacity="0.4" stroke="#ef4444" strokeWidth="2" strokeDasharray="6 4" />

            {/* Prohibition Badge */}
            <g transform="translate(15, -12)">
              <rect x="0" y="0" width="190" height="24" rx="12" fill="#dc2626" />
              <text x="95" y="16" fill="#ffffff" fontSize="10" fontWeight="black" fontFamily="monospace" textAnchor="middle">
                🛑 UNCERTIFIED WORKER
              </text>
            </g>

            {/* Human Worker Silhouette (General Labor - No MHE Badge) */}
            <g transform="translate(40, 25)">
              <circle cx="20" cy="20" r="14" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
              <rect x="8" y="36" width="24" height="45" rx="4" fill="#475569" />
              {/* Missing Certification Cross Mark on chest */}
              <circle cx="20" cy="52" r="7" fill="#7f1d1d" stroke="#ef4444" strokeWidth="1" />
              <line x1="16" y1="48" x2="24" y2="56" stroke="#ffffff" strokeWidth="1.5" />
              <line x1="24" y1="48" x2="16" y2="56" stroke="#ffffff" strokeWidth="1.5" />
            </g>

            {/* Manual Hand Pallet Truck (HPT) */}
            <g transform="translate(95, 45)">
              <rect x="0" y="40" width="85" height="12" rx="2" fill="#dc2626" stroke="#991b1b" strokeWidth="1.5" />
              <circle cx="15" cy="58" r="8" fill="#0f172a" stroke="#64748b" strokeWidth="2" />
              <circle cx="75" cy="58" r="8" fill="#0f172a" stroke="#64748b" strokeWidth="2" />
              {/* T-bar manual steering handle */}
              <line x1="15" y1="40" x2="5" y2="5" stroke="#64748b" strokeWidth="3" />
              <line x1="-5" y1="5" x2="15" y2="5" stroke="#64748b" strokeWidth="4" />
            </g>

            <rect x="15" y="140" width="190" height="36" rx="6" fill="#7f1d1d" stroke="#ef4444" strokeWidth="1" />
            <text x="110" y="155" fill="#fecaca" fontSize="9" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
              MANUAL HPT PROHIBITED!
            </text>
            <text x="110" y="168" fill="#fca5a5" fontSize="8" fontFamily="sans-serif" textAnchor="middle">
              No dampening · Tipping hazard
            </text>
          </g>

          {/* RIGHT: Certified MHE Reach-Truck Operator (AUTHORIZED) */}
          <g transform="translate(730, 150)">
            <rect x="0" y="0" width="220" height="220" rx="14" fill="#064e3b" fillOpacity="0.4" stroke="#10b981" strokeWidth="2" />

            {/* Approved Badge */}
            <g transform="translate(15, -12)">
              <rect x="0" y="0" width="190" height="24" rx="12" fill="#059669" />
              <text x="95" y="16" fill="#ffffff" fontSize="10" fontWeight="black" fontFamily="monospace" textAnchor="middle">
                ✓ CERTIFIED MHE OPERATOR
              </text>
            </g>

            {/* Certified Operator Silhouette */}
            <g transform="translate(35, 30)">
              {/* Hard hat */}
              <ellipse cx="25" cy="14" rx="14" ry="7" fill="#facc15" />
              <circle cx="25" cy="22" r="12" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
              <rect x="12" y="36" width="26" height="48" rx="4" fill="#0284c7" />
              {/* Green MHE Badge on chest */}
              <circle cx="25" cy="52" r="8" fill="#065f46" stroke="#34d399" strokeWidth="1" />
              <text x="25" y="55" fill="#34d399" fontSize="8" fontWeight="black" textAnchor="middle">MHE</text>
            </g>

            {/* Powered Electric Reach-Truck Profile */}
            <g transform="translate(95, 40)">
              <rect x="0" y="20" width="95" height="55" rx="6" fill="#1e293b" stroke="#3b82f6" strokeWidth="1.5" />
              <circle cx="20" cy="78" r="9" fill="#0f172a" stroke="#64748b" strokeWidth="2" />
              <circle cx="80" cy="78" r="9" fill="#0f172a" stroke="#64748b" strokeWidth="2" />
              {/* Electric battery symbol on reach truck */}
              <rect x="35" y="30" width="25" height="15" rx="2" fill="#065f46" stroke="#10b981" strokeWidth="1" />
              <text x="47" y="41" fill="#34d399" fontSize="8" fontWeight="bold" textAnchor="middle">⚡</text>
            </g>

            <rect x="15" y="165" width="190" height="42" rx="6" fill="#064e3b" stroke="#059669" strokeWidth="1" />
            <text x="110" y="182" fill="#a7f3d0" fontSize="9" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
              EXCLUSIVE MHE AUTHORITY
            </text>
            <text x="110" y="196" fill="#6ee7b7" fontSize="8" fontFamily="sans-serif" textAnchor="middle">
              Clause 4.1: Hydraulic shock control
            </text>
          </g>
        </svg>
        </>
        )}

        {/* Top Floating Status Bar */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 backdrop-blur-md text-[11px] font-mono text-emerald-400">
            <BatteryCharging className="w-3.5 h-3.5 text-yellow-400" />
            <span className="font-bold tracking-wider uppercase">AURIC Dock 01 · Battery Cell Protocol</span>
          </div>

          <div className="flex items-center gap-2">
            {videoSrc && (
              <button
                type="button"
                onClick={() => setViewMode((prev) => (prev === 'video' ? 'svg' : 'video'))}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 shadow-sm transition-all cursor-pointer pointer-events-auto"
                title="Toggle between 3D Video and 2D SOP Blueprint"
              >
                {viewMode === 'video' ? (
                  <>
                    <Video className="w-3.5 h-3.5 text-blue-400" />
                    <span className="hidden sm:inline">3D VIDEO</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </>
                ) : (
                  <>
                    <Eye className="w-3.5 h-3.5 text-amber-400" />
                    <span className="hidden sm:inline">2D BLUEPRINT</span>
                  </>
                )}
              </button>
            )}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 backdrop-blur-md text-[11px] font-mono text-slate-300">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
              <span>SOP 04_C1_S3 Clause 4.1</span>
            </div>
          </div>
        </div>

        {/* Bottom Floating Visual Guide Pill */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-300 bg-slate-900/85 px-3 py-1.5 rounded-xl border border-slate-800">
            <div className="flex items-center gap-1 text-rose-400">
              <UserX className="w-3.5 h-3.5" />
              <span>General Worker: Prohibited (STOP)</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1 text-emerald-400">
              <UserCheck className="w-3.5 h-3.5" />
              <span>Certified MHE Operator Only</span>
            </div>
          </div>

          {isPaused ? (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/50 text-rose-300 text-xs font-mono font-bold animate-pulse">
              <PauseCircle className="w-3.5 h-3.5" />
              <span>SOP Safety Authorization Point</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 text-xs font-mono font-bold">
              <PlayCircle className="w-3.5 h-3.5" />
              <span>Verifying Operator Badge</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
