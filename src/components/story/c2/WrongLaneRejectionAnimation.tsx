import React, { useState, useEffect } from 'react';
import { QrCode, Scan, AlertTriangle, ShieldAlert, XCircle, ArrowRight } from 'lucide-react';

interface Props {
  videoSrc?: string;
  isPaused: boolean;
  onPauseReached?: () => void;
}

export const WrongLaneRejectionAnimation: React.FC<Props> = ({
  videoSrc,
  isPaused,
  onPauseReached
}) => {
  const [videoAvailable, setVideoAvailable] = useState<boolean>(Boolean(videoSrc));

  useEffect(() => {
    setVideoAvailable(Boolean(videoSrc));
  }, [videoSrc]);
  const [hasTriggeredPause, setHasTriggeredPause] = useState(false);
  const [scanStatus, setScanStatus] = useState<'scanning' | 'rejected'>('rejected');

  useEffect(() => {
    if (!hasTriggeredPause && !isPaused) {
      const timer = setTimeout(() => {
        setHasTriggeredPause(true);
        if (onPauseReached) onPauseReached();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [hasTriggeredPause, isPaused, onPauseReached]);

  // Periodic cycle demonstrating scan attempt and error rejection
  useEffect(() => {
    const interval = setInterval(() => {
      setScanStatus((prev) => (prev === 'rejected' ? 'scanning' : 'rejected'));
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[320px] sm:h-[390px] md:h-[430px] bg-slate-950 rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-slate-800 shadow-2xl select-none flex flex-col justify-between p-3 sm:p-5">
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

      {/* Industrial Floor Grid Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 opacity-95 pointer-events-none" />
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, #ef4444 1px, transparent 1px), linear-gradient(to bottom, #ef4444 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* Header Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 shadow-inner">
            <XCircle className="w-4 h-4 text-rose-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-black font-mono tracking-wider text-slate-100 uppercase">
                POKA-YOKE SCANNING &amp; DEVICE ERROR REJECTION
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                SOP 04_C2_S2 · FAILURE MODE 5.3
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-400 font-mono">
              Ather AURIC Plant M002 · Decanting Supermarket · Anti-Mismatch Protection
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-700/80">
          <span className="inline-block w-2 h-2 rounded-full bg-rose-400 animate-ping" />
          <span className="text-rose-300 font-bold">
            {scanStatus === 'rejected' ? 'DEVICE REJECTION ACTIVE' : 'SCANNING ATTEMPTED'}
          </span>
        </div>
      </div>

      {/* Main Grid: Attempted Wrong Scan vs HHT Device Rejection */}
      <div className="relative z-10 my-auto grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
        {/* Left Column (5 cols): Attempted Pick from Wrong Trolley */}
        <div className="md:col-span-5 bg-slate-900/90 rounded-2xl border border-slate-800 p-3.5 space-y-3 font-mono">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-[11px] font-bold text-slate-300 uppercase flex items-center gap-1.5">
              <QrCode className="w-3.5 h-3.5 text-rose-400" />
              Scanned Source Location
            </span>
            <span className="text-[10px] font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/30">
              WRONG LANE
            </span>
          </div>

          <div className="bg-slate-950/80 rounded-xl p-3 border border-slate-800/80 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Scanned Location QR:</span>
              <span className="font-bold text-rose-300 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800">
                DEC-LN-09 (Brake Area)
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Physical Part at Rack:</span>
              <span className="font-bold text-slate-200">Hydraulic Disc Brake Assembly</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">WH Order Requirement:</span>
              <span className="font-bold text-cyan-300">PMSM Motor (DEC-LN-04)</span>
            </div>

            <div className="bg-slate-900 p-2 rounded-lg border border-slate-800 text-[10px] flex items-center justify-between">
              <span className="text-slate-400">Poka-Yoke Interlock:</span>
              <span className="text-rose-400 font-bold">100% Digital Mismatch</span>
            </div>
          </div>
        </div>

        {/* Center Indicator (2 cols): Rejection Beam */}
        <div className="hidden md:flex md:col-span-2 flex-col items-center justify-center gap-2">
          <div className="w-10 h-10 rounded-full bg-rose-500/10 border border-rose-500 text-rose-400 flex items-center justify-center shadow-md shadow-rose-500/20">
            <Scan className="w-5 h-5 animate-pulse" />
          </div>
          <span className="text-[9px] font-mono font-bold text-slate-400 text-center uppercase tracking-tight">
            SCAN BLOCKED
          </span>
          <div className="w-full h-0.5 bg-gradient-to-r from-rose-500/40 via-amber-500/60 to-rose-500/40" />
        </div>

        {/* Right Column (5 cols): HHT Terminal Error UI */}
        <div className="md:col-span-5 bg-slate-900/90 rounded-2xl border border-rose-500/50 p-3.5 space-y-3 font-mono shadow-lg shadow-rose-500/10">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-[11px] font-bold text-slate-300 uppercase flex items-center gap-1.5">
              <XCircle className="w-3.5 h-3.5 text-rose-400" />
              HHT Poka-Yoke Screen
            </span>
            <span className="text-[10px] font-bold text-rose-300 bg-rose-500/20 px-2 py-0.5 rounded border border-rose-500/40">
              TASK HALTED
            </span>
          </div>

          <div className="space-y-2 bg-slate-950/90 rounded-xl p-3 border border-rose-500/30 text-xs">
            <div className="p-2 rounded-lg bg-rose-950/50 border border-rose-500/50 space-y-1">
              <div className="flex items-center gap-1.5 text-rose-300 font-bold text-[11px]">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span>ERROR: MISMATCHED SOURCE LOCATION</span>
              </div>
              <p className="text-[10px] text-slate-300">
                WH Order demands Motor Lane <strong>DEC-LN-04</strong>. You scanned Brake Lane <strong>DEC-LN-09</strong>.
              </p>
            </div>

            <div className="flex items-center justify-between text-[11px] pt-1">
              <span className="text-slate-400">System Behavior:</span>
              <span className="text-amber-300 font-bold">Pick Quantity Refuses to Unlock</span>
            </div>

            <div className="mt-2 p-2 rounded-lg bg-slate-900 border border-slate-800 text-[10px] text-slate-300 flex items-center gap-2">
              <ArrowRight className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Operator must backtrack to Lane 04 and scan the matching QR code.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer SOP Verification Note */}
      <div className="relative z-10 border-t border-slate-800/80 pt-2 flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-[11px] text-slate-400 font-mono gap-1.5">
        <div className="flex items-center gap-1.5 text-rose-400 font-medium">
          <ShieldAlert className="w-3.5 h-3.5 text-rose-400 shrink-0" />
          <span>Failure Mode 5.3: HHT will not accept mismatched barcodes, preventing wrong components from reaching the line!</span>
        </div>
        <div className="text-slate-400 text-right">
          Ather AURIC Plant M002 · Decanting Poka-Yoke
        </div>
      </div>
    </div>
  );
};
