import React, { useState, useEffect } from 'react';
import { HelpCircle, PauseCircle, PlayCircle, Tag } from 'lucide-react';

interface Props {
  videoSrc?: string;
  isPaused: boolean;
  onPauseReached?: () => void;
}

export const GrnStickerAnimation: React.FC<Props> = ({
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

      {/* Procedural SVG/CSS Staging & GRN Sticker Inspection Canvas */}
      <div className="absolute inset-0 w-full h-full overflow-hidden p-3 sm:p-5 flex flex-col justify-between">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 opacity-95" />

        <svg
          viewBox="0 0 1000 400"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full absolute inset-0 pointer-events-none"
        >
          {/* Warehouse Interior Floor Grid */}
          <rect x="0" y="0" width="1000" height="400" fill="#0f172a" />
          <line x1="0" y1="160" x2="1000" y2="160" stroke="#1e293b" strokeWidth="2" />
          <line x1="0" y1="280" x2="1000" y2="280" stroke="#1e293b" strokeWidth="2" />

          {/* Yellow Safety Boundary Grid: STAGING BAY 04 */}
          <rect
            x="40"
            y="70"
            width="420"
            height="290"
            rx="8"
            fill="#1e293b"
            fillOpacity="0.5"
            stroke="#eab308"
            strokeWidth="3"
            strokeDasharray="16 10"
          />
          <text x="55" y="95" fill="#eab308" fontSize="11" fontWeight="bold" fontFamily="monospace">
            AURIC INBOUND STAGING BAY 04 · QUALITY BUFFER ZONE
          </text>

          {/* Wooden Pallet on Staging Floor */}
          <g transform="translate(80, 240)">
            {/* Wooden Base Slats */}
            <rect x="0" y="45" width="340" height="15" rx="2" fill="#78350f" stroke="#92400e" strokeWidth="1.5" />
            <rect x="20" y="60" width="40" height="25" fill="#451a03" />
            <rect x="150" y="60" width="40" height="25" fill="#451a03" />
            <rect x="280" y="60" width="40" height="25" fill="#451a03" />
            <rect x="0" y="85" width="340" height="12" rx="2" fill="#78350f" stroke="#92400e" strokeWidth="1.5" />

            {/* Blue Foldable Large Container (FLC) */}
            <rect x="15" y="-120" width="310" height="165" rx="6" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="3" />
            {/* Container Ribs */}
            <line x1="15" y1="-80" x2="325" y2="-80" stroke="#1d4ed8" strokeWidth="2" />
            <line x1="15" y1="-40" x2="325" y2="-40" stroke="#1d4ed8" strokeWidth="2" />
            <line x1="15" y1="0" x2="325" y2="0" stroke="#1d4ed8" strokeWidth="2" />

            {/* Ather Brand Branding on Container */}
            <rect x="110" y="-70" width="120" height="26" rx="4" fill="#0f172a" stroke="#1e40af" />
            <text x="170" y="-53" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              ATHER AURIC · FLC
            </text>

            {/* Small pasted GRN sticker on the FLC Corner */}
            <rect x="30" y="-105" width="55" height="35" rx="3" fill="#f8fafc" stroke="#64748b" strokeWidth="1.5" />
            <text x="57" y="-83" fill="#ef4444" fontSize="14" fontWeight="extrabold" textAnchor="middle" fontFamily="monospace">
              ?
            </text>
            <circle cx="57" cy="-87" r="14" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" className="animate-spin" />
          </g>

          {/* Callout Indicator Line from Pallet Sticker to Detailed Zoom Card */}
          <path
            d="M 165 150 C 260 120, 420 120, 500 150"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2.5"
            strokeDasharray="6 4"
          />
          <circle cx="165" cy="150" r="4" fill="#38bdf8" />
          <circle cx="500" cy="150" r="4" fill="#38bdf8" />

          {/* High-Resolution Zoom: Official Thermal GRN Sticker Card */}
          <g transform="translate(500, 45)">
            {/* White Thermal Label Card */}
            <rect
              x="0"
              y="0"
              width="450"
              height="305"
              rx="10"
              fill="#ffffff"
              stroke="#cbd5e1"
              strokeWidth="4"
              filter="drop-shadow(0 15px 25px rgba(0,0,0,0.5))"
            />

            {/* Header: Ather AURIC Plant M002 */}
            <rect x="0" y="0" width="450" height="38" rx="10" fill="#0f172a" />
            <text x="20" y="24" fill="#38bdf8" fontSize="12" fontWeight="bold" fontFamily="monospace">
              ATHER ENERGY · AURIC PLANT M002
            </text>
            <text x="430" y="24" fill="#94a3b8" fontSize="10" fontWeight="bold" textAnchor="end" fontFamily="monospace">
              GOODS RECEIPT NOTE
            </text>

            {/* Metadata Fields */}
            <g transform="translate(20, 55)" fontFamily="monospace" fontSize="11" fill="#334155">
              <text x="0" y="15" fontWeight="bold" fill="#0f172a">
                MATERIAL: <tspan fill="#0284c7" fontWeight="extrabold">BRK-CAL-450</tspan>
              </text>
              <text x="0" y="35">
                DESC: DISC BRAKE CALIPER SUB-ASSY
              </text>
              <text x="0" y="55">
                PO NUMBER: 4500891230 · LINE ITEM: 0010
              </text>
              <text x="0" y="75">
                LOT QTY: <tspan fontWeight="bold" fill="#0f172a">100 NOS</tspan> (10 FLC PACKS)
              </text>
              <text x="0" y="95">
                VENDOR: ENDURANCE TECHNOLOGIES LTD
              </text>
              <text x="0" y="115">
                INWARD DATE: 2026-10-30 · GRN: GRN-2026-004819
              </text>
            </g>

            {/* Critical Callout Box: Quality Status Badge with Large Glowing '?' */}
            <g transform="translate(20, 185)">
              <rect
                x="0"
                y="0"
                width="410"
                height="65"
                rx="8"
                fill="#fffbeb"
                stroke="#f59e0b"
                strokeWidth="2.5"
              />
              <rect x="12" y="10" width="46" height="46" rx="6" fill="#ef4444" />
              <text x="35" y="44" fill="#ffffff" fontSize="32" fontWeight="black" textAnchor="middle" fontFamily="monospace">
                ?
              </text>

              <g transform="translate(70, 20)" fontFamily="monospace">
                <text x="0" y="12" fill="#b45309" fontSize="12" fontWeight="extrabold">
                  QUALITY STATUS: NON-DOL (IQC MANDATORY)
                </text>
                <text x="0" y="28" fill="#78350f" fontSize="10" fontWeight="medium">
                  MANDATORY 10% SAMPLE TO IQC · DO NOT PUT-AWAY
                </text>
              </g>
            </g>

            {/* Barcode Strip with Animated Scan Line */}
            <g transform="translate(20, 260)">
              <rect x="0" y="0" width="410" height="30" fill="#f8fafc" stroke="#e2e8f0" rx="3" />
              {/* Barcode lines */}
              <line x1="20" y1="5" x2="20" y2="25" stroke="#0f172a" strokeWidth="2" />
              <line x1="25" y1="5" x2="25" y2="25" stroke="#0f172a" strokeWidth="4" />
              <line x1="33" y1="5" x2="33" y2="25" stroke="#0f172a" strokeWidth="1" />
              <line x1="40" y1="5" x2="40" y2="25" stroke="#0f172a" strokeWidth="3" />
              <line x1="48" y1="5" x2="48" y2="25" stroke="#0f172a" strokeWidth="5" />
              <line x1="60" y1="5" x2="60" y2="25" stroke="#0f172a" strokeWidth="2" />
              <line x1="70" y1="5" x2="70" y2="25" stroke="#0f172a" strokeWidth="3" />
              <line x1="80" y1="5" x2="80" y2="25" stroke="#0f172a" strokeWidth="1" />
              <line x1="90" y1="5" x2="90" y2="25" stroke="#0f172a" strokeWidth="4" />
              <line x1="105" y1="5" x2="105" y2="25" stroke="#0f172a" strokeWidth="2" />
              <line x1="120" y1="5" x2="120" y2="25" stroke="#0f172a" strokeWidth="5" />
              <text x="200" y="20" fill="#64748b" fontSize="10" fontWeight="bold" fontFamily="monospace">
                *GRN2026004819-BRK450*
              </text>
              {/* Laser beam */}
              <line x1="0" y1="15" x2="410" y2="15" stroke="#ef4444" strokeWidth="1.5" strokeOpacity="0.8" />
            </g>
          </g>
        </svg>

        {/* Top CCTV Overlay Badge */}
        <div className="relative z-10 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/60 text-xs font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span className="font-bold text-slate-200">AURIC CAM-08: INBOUND STAGING BAY 04</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-3 py-1 rounded-full bg-amber-950/80 border border-amber-600/70 text-amber-300 font-mono text-[11px] font-bold flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>GRN LABEL: '?' AUDIT</span>
            </div>
            <div className="px-3 py-1 rounded-full bg-blue-950/80 border border-blue-600/70 text-blue-300 font-mono text-[11px] font-bold flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-blue-400" />
              <span>100 NOS · 10 FLCs</span>
            </div>
          </div>
        </div>

        {/* Bottom Playback & Pause Status Bar */}
        <div className="relative z-10 flex items-center justify-between text-xs font-mono text-slate-400 bg-slate-900/70 backdrop-blur-md p-2.5 rounded-xl border border-slate-800">
          <div className="flex items-center gap-2">
            {isPaused ? (
              <span className="flex items-center gap-1.5 text-amber-400 font-bold">
                <PauseCircle className="w-4 h-4" />
                <span>SOP PAUSE POINT · GRN STICKER INSPECTION</span>
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <PlayCircle className="w-4 h-4 animate-spin" />
                <span>OFFLOADING PALLETS & APPLYING GRN LABELS...</span>
              </span>
            )}
          </div>

          <div className="text-[11px] text-slate-400">
            Material: <strong className="text-blue-300">BRK-CAL-450</strong> · Lot:{' '}
            <strong className="text-slate-200">100 Nos (10 FLCs)</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
