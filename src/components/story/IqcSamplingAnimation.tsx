import React, { useState, useEffect, useRef } from 'react';
import { Boxes, PauseCircle, PlayCircle, ShieldCheck, Video, Eye } from 'lucide-react';

interface Props {
  videoSrc?: string;
  posterSrc?: string;
  isPaused: boolean;
  onPauseReached?: () => void;
}

export const IqcSamplingAnimation: React.FC<Props> = ({
  videoSrc,
  posterSrc = '/Assets/videos/scene_03_iqc_inspection_split_poster.jpg',
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

      {/* Procedural SVG/CSS 10% Statistical Sampling Canvas */}
      <div className="absolute inset-0 w-full h-full overflow-hidden p-3 sm:p-5 flex flex-col justify-between pointer-events-none">
        {(viewMode === 'svg' || videoError || !videoSrc) && (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 opacity-95" />

            <svg
              viewBox="0 0 1000 400"
              preserveAspectRatio="xMidYMid slice"
              className="w-full h-full absolute inset-0 pointer-events-none"
            >
          {/* Warehouse Floor & Gangway Lines */}
          <rect x="0" y="0" width="1000" height="400" fill="#0f172a" />
          <line x1="0" y1="120" x2="1000" y2="120" stroke="#1e293b" strokeWidth="2" />
          <line x1="0" y1="260" x2="1000" y2="260" stroke="#1e293b" strokeWidth="2" />

          {/* Left Zone: Unloading Staging (9 FLCs Waiting) */}
          <g transform="translate(60, 40)">
            <rect
              x="0"
              y="0"
              width="450"
              height="300"
              rx="8"
              fill="#1e293b"
              fillOpacity="0.4"
              stroke="#64748b"
              strokeWidth="2"
              strokeDasharray="10 8"
            />
            <text x="20" y="30" fill="#94a3b8" fontSize="11" fontWeight="bold" fontFamily="monospace">
              ZONE A: UNLOADING STAGING · 9 FLCs BUFFER QUEUE
            </text>

            {/* 3x3 Grid of Blue FLC Crates waiting */}
            <g transform="translate(30, 50)">
              {[
                { x: 0, y: 0, id: 1 },
                { x: 130, y: 0, id: 2 },
                { x: 260, y: 0, id: 3 },
                { x: 0, y: 80, id: 4 },
                { x: 130, y: 80, id: 5 },
                { x: 260, y: 80, id: 6 },
                { x: 0, y: 160, id: 7 },
                { x: 130, y: 160, id: 8 },
                { x: 260, y: 160, id: 9 }
              ].map((crate) => (
                <g key={crate.id} transform={`translate(${crate.x}, ${crate.y})`}>
                  <rect x="0" y="0" width="110" height="60" rx="4" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="2" />
                  <text x="55" y="35" fill="#bae6fd" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                    FLC #{crate.id}
                  </text>
                  <text x="55" y="48" fill="#93c5fd" fontSize="8" textAnchor="middle" fontFamily="monospace">
                    [STAGING]
                  </text>
                </g>
              ))}
            </g>
          </g>

          {/* Transfer Flow Arrow between Staging and IQC Handover */}
          <g transform="translate(530, 160)">
            <line x1="0" y1="20" x2="80" y2="20" stroke="#f59e0b" strokeWidth="4" strokeDasharray="8 6" className="animate-pulse" />
            <polygon points="80,10 100,20 80,30" fill="#f59e0b" />
            <text x="50" y="-5" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              10% SAMPLE
            </text>
          </g>

          {/* Right Zone: IQC Sample Handover (1 FLC crate being moved on pallet truck) */}
          <g transform="translate(650, 40)">
            <rect
              x="0"
              y="0"
              width="290"
              height="300"
              rx="8"
              fill="#1e293b"
              fillOpacity="0.4"
              stroke="#f59e0b"
              strokeWidth="2.5"
            />
            <text x="20" y="30" fill="#f59e0b" fontSize="11" fontWeight="extrabold" fontFamily="monospace">
              ZONE B: IQC LAB HANDOVER
            </text>

            {/* Hand Pallet Truck carrying exactly 1 Sample FLC */}
            <g transform="translate(50, 80)">
              {/* Pallet Truck Forks & Wheels */}
              <rect x="0" y="110" width="180" height="15" rx="3" fill="#eab308" stroke="#ca8a04" strokeWidth="2" />
              <circle cx="20" cy="135" r="12" fill="#0f172a" stroke="#475569" strokeWidth="3" />
              <circle cx="160" cy="135" r="12" fill="#0f172a" stroke="#475569" strokeWidth="3" />
              {/* Truck Handle */}
              <line x1="175" y1="110" x2="195" y2="40" stroke="#ca8a04" strokeWidth="4" />
              <circle cx="195" cy="40" r="8" fill="#0f172a" />

              {/* Wooden Pallet */}
              <rect x="15" y="95" width="145" height="15" rx="2" fill="#78350f" stroke="#92400e" strokeWidth="1.5" />

              {/* The 1 Isolated Sample FLC (#10) with glowing golden border */}
              <rect
                x="15"
                y="15"
                width="145"
                height="80"
                rx="6"
                fill="#1e40af"
                stroke="#f59e0b"
                strokeWidth="3.5"
                filter="drop-shadow(0 0 12px rgba(245, 158, 11, 0.6))"
              />
              <text x="87" y="45" fill="#fef08a" fontSize="13" fontWeight="black" textAnchor="middle" fontFamily="monospace">
                FLC #10
              </text>
              <text x="87" y="65" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                IQC TEST SAMPLE
              </text>
              <rect x="35" y="70" width="105" height="16" rx="3" fill="#b45309" />
              <text x="87" y="82" fill="#fef3c7" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                10% STATISTICAL LOT
              </text>
            </g>
          </g>
        </svg>
        </>
        )}

        {/* Top CCTV Overlay Badge & View Mode Toggle */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/60 text-xs font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
            <span className="font-bold text-slate-200">AURIC CAM-09: IQC SAMPLE TRANSFER AISLE</span>
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
            <div className="px-3 py-1 rounded-full bg-amber-950/80 border border-amber-600/70 text-amber-300 font-mono text-[11px] font-bold flex items-center gap-1.5">
              <Boxes className="w-3.5 h-3.5 text-amber-400" />
              <span>TOTAL LOT: 10 FLCs</span>
            </div>
            <div className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-600/70 text-emerald-300 font-mono text-[11px] font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>SAMPLE RATIO: 10% (1 FLC)</span>
            </div>
          </div>
        </div>

        {/* Bottom Playback & Pause Status Bar */}
        <div className="relative z-10 flex items-center justify-between text-xs font-mono text-slate-400 bg-slate-900/70 backdrop-blur-md p-2.5 rounded-xl border border-slate-800">
          <div className="flex items-center gap-2">
            {isPaused ? (
              <span className="flex items-center gap-1.5 text-amber-400 font-bold">
                <PauseCircle className="w-4 h-4" />
                <span>SOP PAUSE POINT · CALCULATE EXACT SAMPLE VOLUME</span>
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <PlayCircle className="w-4 h-4 animate-spin" />
                <span>STAGING LOT OF 10 FLC CRATES...</span>
              </span>
            )}
          </div>

          <div className="text-[11px] text-slate-400">
            Formula: <strong className="text-blue-300">Lot Volume × 10%</strong> · Material:{' '}
            <strong className="text-slate-200">BRK-CAL-450</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
