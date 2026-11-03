import React, { useState, useEffect, useRef } from 'react';
import { QrCode, PauseCircle, PlayCircle, ShieldCheck, ArrowUpCircle, Video, Eye } from 'lucide-react';

interface Props {
  videoSrc?: string;
  posterSrc?: string;
  isPaused: boolean;
  onPauseReached?: () => void;
}

export const BinMarriageAnimation: React.FC<Props> = ({
  videoSrc,
  posterSrc = '/Assets/videos/scene_04_high_rise_pallet_putaway_poster.jpg',
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

      {/* Procedural SVG/CSS Destination Bin Marriage Canvas */}
      <div className="absolute inset-0 w-full h-full overflow-hidden p-3 sm:p-5 flex flex-col justify-between pointer-events-none">
        {(viewMode === 'svg' || videoError || !videoSrc) && (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 opacity-95" />

            <svg
              viewBox="0 0 1000 400"
              preserveAspectRatio="xMidYMid slice"
              className="w-full h-full absolute inset-0 pointer-events-none"
            >
          {/* Warehouse High Ceiling & Aisle Lighting */}
          <rect x="0" y="0" width="1000" height="400" fill="#090d16" />
          <line x1="200" y1="0" x2="200" y2="400" stroke="#1e293b" strokeWidth="1" strokeDasharray="10 10" />
          <line x1="800" y1="0" x2="800" y2="400" stroke="#1e293b" strokeWidth="1" strokeDasharray="10 10" />

          {/* Overhead Warehouse Lights */}
          <ellipse cx="300" cy="15" rx="80" ry="10" fill="#38bdf8" fillOpacity="0.1" />
          <ellipse cx="700" cy="15" rx="80" ry="10" fill="#38bdf8" fillOpacity="0.1" />

          {/* High Rise Racks Steel Structure (Aisle B) */}
          <g transform="translate(100, 20)">
            {/* Left Upright Column */}
            <rect x="0" y="0" width="22" height="380" fill="#1d4ed8" stroke="#3b82f6" strokeWidth="1.5" />
            {/* Right Upright Column */}
            <rect x="420" y="0" width="22" height="380" fill="#1d4ed8" stroke="#3b82f6" strokeWidth="1.5" />

            {/* Level 1 Bottom Beam */}
            <rect x="0" y="340" width="442" height="18" fill="#ea580c" stroke="#f97316" strokeWidth="1.5" />
            {/* Level 2 Beam */}
            <rect x="0" y="250" width="442" height="18" fill="#ea580c" stroke="#f97316" strokeWidth="1.5" />
            {/* Level 3 Beam */}
            <rect x="0" y="160" width="442" height="18" fill="#ea580c" stroke="#f97316" strokeWidth="1.5" />
            {/* Level 4 Beam (Target Put-Away Level) */}
            <rect x="0" y="70" width="442" height="22" fill="#ea580c" stroke="#fbbf24" strokeWidth="2" />

            {/* Target Bin QR Label on Beam */}
            <g transform="translate(140, 72)">
              <rect x="0" y="0" width="160" height="18" rx="3" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
              {/* Mini QR code pattern */}
              <rect x="4" y="2" width="14" height="14" fill="#000000" />
              <rect x="6" y="4" width="4" height="4" fill="#facc15" />
              <rect x="12" y="10" width="4" height="4" fill="#facc15" />
              <text x="88" y="13" fill="#000000" fontSize="10" fontWeight="black" fontFamily="monospace" textAnchor="middle">
                HRR-B-04-12
              </text>
            </g>

            {/* FLC Pallet Sitting on Level 4 Beam */}
            <g transform="translate(100, 2)">
              {/* Wooden Pallet Base */}
              <rect x="0" y="52" width="240" height="16" rx="2" fill="#854d0e" stroke="#713f12" strokeWidth="1" />
              {/* Blue FLC Crate */}
              <rect x="15" y="-10" width="210" height="62" rx="6" fill="#1e40af" stroke="#60a5fa" strokeWidth="2" />
              <rect x="25" y="-4" width="190" height="50" rx="4" fill="#1d4ed8" />
              <text x="120" y="22" fill="#93c5fd" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                FLC: ATHER 450X CALIPERS
              </text>
              <rect x="75" y="28" width="90" height="14" rx="2" fill="#ecfdf5" stroke="#10b981" strokeWidth="1" />
              <text x="120" y="39" fill="#059669" fontSize="8" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
                HU: 88204910 [PASS]
              </text>
            </g>

            {/* Stowed Pallets on Lower Levels */}
            <g transform="translate(50, 185)">
              <rect x="0" y="35" width="160" height="30" rx="4" fill="#1e3a8a" />
              <text x="80" y="55" fill="#60a5fa" fontSize="9" fontFamily="monospace" textAnchor="middle">HRR-B-03-08</text>
            </g>
            <g transform="translate(240, 185)">
              <rect x="0" y="35" width="160" height="30" rx="4" fill="#1e3a8a" />
              <text x="80" y="55" fill="#60a5fa" fontSize="9" fontFamily="monospace" textAnchor="middle">HRR-B-03-09</text>
            </g>
          </g>

          {/* Reach-Truck Hydraulic Mast (Elevated) */}
          <g transform="translate(240, 95)">
            {/* Dual Telescopic Mast Columns */}
            <rect x="0" y="0" width="10" height="280" fill="#64748b" stroke="#334155" strokeWidth="1" />
            <rect x="180" y="0" width="10" height="280" fill="#64748b" stroke="#334155" strokeWidth="1" />
            {/* Hydraulic Lift Carriage */}
            <rect x="-10" y="0" width="210" height="12" fill="#f59e0b" stroke="#d97706" strokeWidth="1.5" />
          </g>

          {/* Scanner Targeting QR Code with Laser */}
          <g transform="translate(560, 140)">
            {/* Rugged Handheld Scanner */}
            <rect x="0" y="0" width="55" height="90" rx="8" fill="#0f172a" stroke="#475569" strokeWidth="2" />
            <rect x="6" y="8" width="43" height="40" rx="3" fill="#0284c7" fillOpacity="0.3" stroke="#38bdf8" strokeWidth="1" />
            <text x="27" y="24" fill="#38bdf8" fontSize="7" fontWeight="bold" fontFamily="monospace" textAnchor="middle">SCAN</text>
            <text x="27" y="36" fill="#facc15" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">BIN QR</text>
            <path d="M 15,90 L 8,125 L 25,125 L 35,90 Z" fill="#1e293b" stroke="#334155" strokeWidth="1" />

            {/* Glowing Red Laser Projecting to QR Code on Beam */}
            <polygon points="-5,20 -300,-58 -300,-50 -5,24" fill="#ef4444" fillOpacity="0.45" />
            <line x1="-5" y1="22" x2="-300" y2="-54" stroke="#ef4444" strokeWidth="2" />
            <circle cx="-300" cy="-54" r="5" fill="#fca5a5" />
          </g>

          {/* RIGHT: SAP EWM HUD - BIN MARRIAGE CONFIRMATION */}
          <g transform="translate(660, 60)">
            <rect x="0" y="0" width="310" height="270" rx="16" fill="#090d16" stroke="#10b981" strokeWidth="2" />
            {/* Header bar */}
            <rect x="0" y="0" width="310" height="38" rx="16" fill="#064e3b" />
            <rect x="0" y="24" width="310" height="14" fill="#064e3b" />
            <circle cx="20" cy="19" r="6" fill="#34d399" />
            <text x="36" y="23" fill="#ffffff" fontSize="11" fontWeight="bold" fontFamily="monospace">
              SAP EWM · BIN MARRIAGE
            </text>

            {/* Confirmation Data */}
            <g transform="translate(20, 55)">
              <text x="0" y="15" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                PALLET HU:
              </text>
              <text x="120" y="15" fill="#60a5fa" fontSize="12" fontWeight="bold" fontFamily="monospace">
                HU-88204910
              </text>

              <text x="0" y="45" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                SCANNED BIN:
              </text>
              <rect x="115" y="30" width="140" height="22" rx="4" fill="#14532d" stroke="#22c55e" strokeWidth="1" />
              <text x="185" y="45" fill="#86efac" fontSize="11" fontWeight="black" fontFamily="monospace" textAnchor="middle">
                HRR-B-04-12 [✓]
              </text>

              <text x="0" y="75" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                TASK STATUS:
              </text>
              <text x="120" y="75" fill="#34d399" fontSize="11" fontWeight="bold" fontFamily="monospace">
                WT CLOSED (100%)
              </text>

              <text x="0" y="105" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                ERP G-STOCK:
              </text>
              <text x="120" y="105" fill="#facc15" fontSize="11" fontWeight="bold" fontFamily="monospace">
                +100 PCS POSTED
              </text>

              <text x="0" y="135" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                LOCATION:
              </text>
              <text x="120" y="135" fill="#e2e8f0" fontSize="10" fontFamily="sans-serif">
                Aisle B · Bay 04 · Level 12
              </text>

              {/* Status footer pill */}
              <rect x="0" y="152" width="270" height="34" rx="8" fill="#022c22" stroke="#059669" strokeWidth="1" />
              <text x="135" y="172" fill="#6ee7b7" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                ✓ HU MARRIED TO RACK BIN
              </text>
              <text x="135" y="184" fill="#a7f3d0" fontSize="8" fontFamily="sans-serif" textAnchor="middle">
                Safe to return reach-truck to staging
              </text>
            </g>
          </g>
        </svg>
        </>
        )}

        {/* Top Floating Status Pill */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 backdrop-blur-md text-[11px] font-mono text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold tracking-wider uppercase">AURIC High-Rise Racks · Aisle B Level 4</span>
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
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>SOP 03_C1_S3 Clause 4.3</span>
            </div>
          </div>
        </div>

        {/* Bottom Floating Visual Guide Pill */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-300 bg-slate-900/85 px-3 py-1.5 rounded-xl border border-slate-800">
            <div className="flex items-center gap-1 text-amber-400">
              <ArrowUpCircle className="w-3.5 h-3.5" />
              <span>Lift Pallet to Bin HRR-B-04-12</span>
            </div>
            <span>→</span>
            <div className="flex items-center gap-1 text-emerald-400">
              <QrCode className="w-3.5 h-3.5" />
              <span>Scan Location QR Code to Marry &amp; Close</span>
            </div>
          </div>

          {isPaused ? (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/50 text-amber-300 text-xs font-mono font-bold animate-pulse">
              <PauseCircle className="w-3.5 h-3.5" />
              <span>SOP Final Closure Scan Point</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 text-xs font-mono font-bold">
              <PlayCircle className="w-3.5 h-3.5" />
              <span>Executing Bin Marriage</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
