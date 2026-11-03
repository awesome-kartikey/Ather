import React, { useState, useEffect, useRef } from 'react';
import { Video, Eye } from 'lucide-react';

interface Props {
  videoSrc?: string;
  posterSrc?: string;
  isPaused: boolean;
  onPauseReached?: () => void;
}

export const TruckGateAnimation: React.FC<Props> = ({
  videoSrc,
  posterSrc = '/Assets/videos/scene_01_gate_arrival_poster.jpg',
  isPaused,
  onPauseReached
}) => {
  const [videoError, setVideoError] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'video' | 'svg'>('video');
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasTriggeredPause, setHasTriggeredPause] = useState(false);

  // Trigger pause after 4.5 seconds of driving in
  useEffect(() => {
    if (!hasTriggeredPause && !isPaused) {
      const timer = setTimeout(() => {
        setHasTriggeredPause(true);
        if (onPauseReached) onPauseReached();
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [hasTriggeredPause, isPaused, onPauseReached]);

  // Sync video play state and ensure reliable autoplay
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      if (isPaused) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
    }
  }, [isPaused, videoSrc]);

  return (
    <div className="relative w-full h-full min-h-0 bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-md select-none flex flex-col justify-between">
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
          onLoadedData={() => {
            if (videoRef.current && !isPaused) {
              videoRef.current.defaultMuted = true;
              videoRef.current.muted = true;
              videoRef.current.play().catch(() => {});
            }
          }}
          onError={(e) => {
            console.warn('[Ather DOJO] Video stream loading error:', videoSrc, e);
            setVideoError(true);
          }}
          className="absolute inset-0 w-full h-full object-contain z-0"
        />
      )}

      {/* Procedural SVG/CSS Plant Gate Animation Canvas (Rendered when in SVG mode or when video errors) */}
      {(viewMode === 'svg' || videoError || !videoSrc) && (
        <div className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center">
          {/* Background Sky & Distant Solar Canopy */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 opacity-90" />

          {/* Ather AURIC Industrial Factory Silhouette */}
          <svg
            viewBox="0 0 1000 400"
            preserveAspectRatio="xMidYMid meet"
            className="w-full h-full absolute inset-0 pointer-events-none"
          >
            {/* Distant Manufacturing Plant Sheds */}
            <rect x="0" y="80" width="350" height="180" fill="#1e293b" opacity="0.6" />
            <polygon points="0,80 180,40 350,80" fill="#0f172a" opacity="0.7" />
            <rect x="360" y="100" width="400" height="160" fill="#1e293b" opacity="0.5" />
            <polygon points="360,100 560,60 760,100" fill="#0f172a" opacity="0.6" />

            {/* Plant Solar Roof Panel Line */}
            <line x1="20" y1="75" x2="330" y2="75" stroke="#38bdf8" strokeWidth="2" opacity="0.4" />
            <line x1="380" y1="95" x2="740" y2="95" stroke="#38bdf8" strokeWidth="2" opacity="0.4" />

            {/* Factory Perimeter Security Wall */}
            <rect x="0" y="240" width="1000" height="30" fill="#334155" />
            <line x1="0" y1="240" x2="1000" y2="240" stroke="#10b981" strokeWidth="2" />

            {/* Security Gate Cabin (Right Side) */}
            <g transform="translate(680, 160)">
              {/* Cabin Body */}
              <rect x="0" y="10" width="160" height="100" rx="8" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2" />
              <rect x="10" y="25" width="60" height="50" rx="4" fill="#0284c7" opacity="0.3" stroke="#0369a1" strokeWidth="1.5" />
              <rect x="80" y="25" width="65" height="50" rx="4" fill="#0284c7" opacity="0.3" stroke="#0369a1" strokeWidth="1.5" />
              {/* Cabin Roof */}
              <rect x="-10" y="0" width="180" height="14" rx="4" fill="#0f172a" />
              <text x="90" y="-8" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                AURIC GATE 01 · SECURITY
              </text>
            </g>

            {/* Traffic Red/Green Signal Post */}
            <g transform="translate(640, 180)">
              <rect x="0" y="0" width="16" height="85" fill="#1e293b" />
              <rect x="-6" y="-30" width="28" height="45" rx="6" fill="#020617" stroke="#475569" strokeWidth="1.5" />
              {/* Red Light Active (Halt) */}
              <circle cx="8" cy="-18" r="7" fill={isPaused ? '#ef4444' : '#f87171'} className="animate-pulse" />
              <circle cx="8" cy="-3" r="7" fill="#1e293b" />
            </g>

            {/* Boom Barrier Gate Arm (Down / Closed) */}
            <g transform="translate(645, 235)">
              <circle cx="0" cy="0" r="8" fill="#475569" />
              {/* Striped Boom Arm spanning across the entry road */}
              <line
                x1="0"
                y1="0"
                x2="-240"
                y2="0"
                stroke="#ef4444"
                strokeWidth="8"
                strokeDasharray="16,16"
                className="drop-shadow-md"
              />
            </g>

            {/* Asphalt Road & Pavement */}
            <rect x="0" y="270" width="1000" height="130" fill="#0f172a" />
            <line x1="0" y1="270" x2="1000" y2="270" stroke="#cbd5e1" strokeWidth="4" />

            {/* Yellow Road Safety Staging Markings */}
            <line x1="0" y1="395" x2="1000" y2="395" stroke="#facc15" strokeWidth="6" strokeDasharray="30,20" />

            {/* Designated Waiting Yard Parking Bay Box */}
            <g transform="translate(320, 290)">
              <rect
                x="0"
                y="0"
                width="260"
                height="90"
                fill="none"
                stroke="#eab308"
                strokeWidth="3"
                strokeDasharray="8,6"
                rx="6"
              />
              <text x="130" y="50" fill="#facc15" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="monospace" opacity="0.8">
                WAITING BAY · ENGINE OFF
              </text>
            </g>
          </svg>

          {/* Animated Inbound Commercial Delivery Truck */}
          <div
            className={`absolute bottom-6 transition-all duration-4000 ease-out flex items-end ${isPaused
                ? 'left-[330px]' // Parked directly inside the designated waiting bay
                : hasTriggeredPause
                  ? 'left-[330px]'
                  : 'left-[-450px]' // Starts driving from off-screen
              }`}
            style={{ transitionDuration: '4200ms' }}
          >
            {/* Semi Truck SVG (High detail Ather Supplier Fleet) */}
            <svg width="240" height="110" viewBox="0 0 240 110" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Cargo Container (Rear) */}
              <rect x="10" y="10" width="150" height="75" rx="4" fill="#f8fafc" stroke="#334155" strokeWidth="2" />
              {/* Container Corrugation lines */}
              <line x1="30" y1="12" x2="30" y2="83" stroke="#cbd5e1" strokeWidth="2" />
              <line x1="60" y1="12" x2="60" y2="83" stroke="#cbd5e1" strokeWidth="2" />
              <line x1="90" y1="12" x2="90" y2="83" stroke="#cbd5e1" strokeWidth="2" />
              <line x1="120" y1="12" x2="120" y2="83" stroke="#cbd5e1" strokeWidth="2" />

              {/* Container Ather AURIC Branding Label */}
              <rect x="35" y="28" width="90" height="24" rx="4" fill="#0f172a" />
              <text x="80" y="44" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                ATHER AURIC
              </text>

              {/* Truck Cab (Front) */}
              <path
                d="M160 35 L190 35 L215 55 L215 85 L160 85 Z"
                fill="#0284c7"
                stroke="#0369a1"
                strokeWidth="2"
              />
              {/* Cab Windshield */}
              <polygon points="188,38 210,54 188,54" fill="#bae6fd" stroke="#0284c7" strokeWidth="1" />
              {/* Driver Silhouette */}
              <circle cx="196" cy="48" r="4" fill="#0369a1" />

              {/* Headlights */}
              <circle cx="214" cy="72" r="3" fill="#fef08a" />
              <line x1="216" y1="72" x2="236" y2="72" stroke="#fef08a" strokeWidth="2" opacity="0.6" />

              {/* Wheels */}
              <circle cx="40" cy="88" r="14" fill="#0f172a" stroke="#475569" strokeWidth="3" />
              <circle cx="40" cy="88" r="5" fill="#94a3b8" />

              <circle cx="130" cy="88" r="14" fill="#0f172a" stroke="#475569" strokeWidth="3" />
              <circle cx="130" cy="88" r="5" fill="#94a3b8" />

              <circle cx="195" cy="88" r="14" fill="#0f172a" stroke="#475569" strokeWidth="3" />
              <circle cx="195" cy="88" r="5" fill="#94a3b8" />
            </svg>
          </div>
        </div>
      )}

      {/* Factory Floor Live Camera HUD Tag */}
      <div className="absolute top-3 left-3 z-20 pointer-events-none flex items-center gap-2">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-slate-900/80 text-white border border-slate-700/80 shadow-xs backdrop-blur-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
          <span>CAM-01 · AURIC GATE INBOUND</span>
        </div>
      </div>

      {/* Discreet Low-Opacity View Mode Toggle Pill (Top-Right) */}
      {videoSrc && (
        <div className="absolute top-3 right-3 z-20">
          <button
            type="button"
            onClick={() => setViewMode((prev) => (prev === 'video' ? 'svg' : 'video'))}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-slate-900/60 hover:bg-slate-900 text-slate-200 border border-slate-700/60 hover:border-slate-600 shadow-sm transition-all cursor-pointer backdrop-blur-xs opacity-75 hover:opacity-100"
            title="Toggle between 3D Video and 2D SOP Blueprint"
          >
            {viewMode === 'video' ? (
              <>
                <Video className="w-3 h-3 text-blue-400" />
                <span className="hidden sm:inline">3D VIDEO</span>
              </>
            ) : (
              <>
                <Eye className="w-3 h-3 text-amber-400" />
                <span className="hidden sm:inline">2D BLUEPRINT</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};
