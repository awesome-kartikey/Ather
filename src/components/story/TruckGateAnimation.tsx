import React, { useState, useEffect } from 'react';
import { ShieldAlert, PauseCircle, PlayCircle } from 'lucide-react';

interface Props {
  videoSrc?: string;
  isPaused: boolean;
  onPauseReached?: () => void;
}

export const TruckGateAnimation: React.FC<Props> = ({
  videoSrc,
  isPaused,
  onPauseReached
}) => {
  const [videoAvailable, setVideoAvailable] = useState<boolean>(Boolean(videoSrc));

  useEffect(() => {
    setVideoAvailable(Boolean(videoSrc));
  }, [videoSrc]);
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

      {/* Procedural SVG/CSS Plant Gate Animation Canvas */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Background Sky & Distant Solar Canopy */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 opacity-90" />

        {/* Ather AURIC Industrial Factory Silhouette */}
        <svg
          viewBox="0 0 1000 400"
          preserveAspectRatio="xMidYMid slice"
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
          className={`absolute bottom-6 transition-all duration-4000 ease-out flex items-end ${
            isPaused
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

      {/* Top Telemetry Overlay */}
      <div className="relative z-10 p-3 sm:p-4 flex items-center justify-between bg-gradient-to-b from-slate-950/80 to-transparent">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
            CAM-01 · AURIC PERIMETER GATE
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
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/60 text-emerald-300 text-xs font-mono font-bold uppercase tracking-wide">
              <PlayCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Inbound Approach</span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Scene Situation Card */}
      <div className="relative z-10 px-4 py-3 bg-slate-950/90 border-t border-slate-800/90 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 shrink-0">
            <ShieldAlert className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
              Live Factory Situation
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-200">
              {isPaused
                ? 'Truck halted at perimeter checkpoint. Barrier remains down.'
                : '18-wheeler carrying components approaching AURIC Gate 01...'}
            </div>
          </div>
        </div>

        <div className="text-right hidden sm:block">
          <div className="text-[10px] font-mono text-slate-500">SPEED</div>
          <div className="text-xs font-mono font-bold text-slate-300">
            {isPaused ? '0 KM/H (HALTED)' : '18 KM/H'}
          </div>
        </div>
      </div>
    </div>
  );
};
