import React, { useState, useEffect, useRef } from 'react';
import { Layers, QrCode, Scan, CheckCircle2, ShieldAlert, Cpu, ArrowRight, Video, Eye } from 'lucide-react';

interface Props {
  videoSrc?: string;
  posterSrc?: string;
  isPaused: boolean;
  onPauseReached?: () => void;
}

export const AcedTrolleyIssuanceAnimation: React.FC<Props> = ({
  videoSrc,
  posterSrc = '/Assets/videos/scene_06_bulk_decanting_trolley_poster.jpg',
  isPaused,
  onPauseReached
}) => {
  const [videoError, setVideoError] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'video' | 'svg'>('video');
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasTriggeredPause, setHasTriggeredPause] = useState(false);
  const [activeFeeder, setActiveFeeder] = useState<number>(1);

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

  // Periodic cycle cycling through feeder route verification
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeeder((prev) => (prev % 3) + 1);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[320px] sm:h-[390px] md:h-[430px] bg-slate-950 rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-slate-800 shadow-2xl select-none flex flex-col justify-between p-3 sm:p-5">
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

      {/* Industrial Grid Background (Only when video errors or in svg mode) */}
      {(viewMode === 'svg' || videoError || !videoSrc) && (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 opacity-95 pointer-events-none" />
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(to right, #06b6d4 1px, transparent 1px), linear-gradient(to bottom, #06b6d4 1px, transparent 1px)',
              backgroundSize: '32px 32px'
            }}
          />
        </>
      )}

      {/* Header Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-inner">
            <Layers className="w-4 h-4 text-cyan-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-black font-mono tracking-wider text-slate-100 uppercase">
                ACED METAL PARTS TROLLEY ISSUANCE
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                SOP 02_C2_S1 · 28 FEEDER DISPATCH
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-400 font-mono">
              Ather AURIC Plant M002 · ACED Metal Supermarket · 7–9 Dedicated Parts
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px]">
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
          <div className="hidden sm:flex items-center gap-2 bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-700/80">
            <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-cyan-300 font-bold">28 UNIQUE FEEDER MATRIX</span>
          </div>
        </div>
      </div>

      {/* Main Grid: ACED Trolley Staging vs 28-Feeder Routing Matrix */}
      <div className="relative z-10 my-auto grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
        {/* Left Column (5 cols): ACED Metal Parts Trolley format */}
        <div className="md:col-span-5 bg-slate-900/90 rounded-2xl border border-slate-800 p-3.5 space-y-3 font-mono">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-[11px] font-bold text-slate-300 uppercase flex items-center gap-1.5">
              <QrCode className="w-3.5 h-3.5 text-cyan-400" />
              ACED Trolley Format
            </span>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
              7–9 METAL PARTS
            </span>
          </div>

          <div className="bg-slate-950/80 rounded-xl p-3 border border-slate-800/80 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Storage Location:</span>
              <span className="font-bold text-cyan-300">Trolley Area ACED-01</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Metal Body Part:</span>
              <span className="font-bold text-slate-200">Ather 450X Mid-Frame LH/RH</span>
            </div>

            {/* Simulated 8-Slot Trolley Grid */}
            <div className="grid grid-cols-4 gap-1.5 pt-1">
              {[
                { name: 'MF-LH', code: 'P01' },
                { name: 'MF-RH', code: 'P02' },
                { name: 'CRADLE', code: 'P03' },
                { name: 'BRKT-A', code: 'P04' },
                { name: 'BRKT-B', code: 'P05' },
                { name: 'SWING-A', code: 'P06' },
                { name: 'SWING-B', code: 'P07' },
                { name: 'ST-LINK', code: 'P08' }
              ].map((part, idx) => (
                <div
                  key={idx}
                  className={`h-8 rounded-lg border flex flex-col items-center justify-center text-[9px] font-bold ${
                    idx < 2
                      ? 'bg-cyan-950/50 border-cyan-500/60 text-cyan-300'
                      : 'bg-slate-900 border-slate-700 text-slate-400'
                  }`}
                >
                  <span>{part.name}</span>
                  <span className="text-[7px] text-slate-500">{part.code}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-slate-800/60 text-[10px]">
              <span className="text-slate-400">Inwarding Spec:</span>
              <span className="text-emerald-400 font-bold">100% Inwarded in Trolley Format</span>
            </div>
          </div>
        </div>

        {/* Center Indicator (2 cols): Dispatch Route */}
        <div className="hidden md:flex md:col-span-2 flex-col items-center justify-center gap-2">
          <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500 text-cyan-400 flex items-center justify-center shadow-md shadow-cyan-500/20">
            <Scan className="w-5 h-5 animate-spin" />
          </div>
          <span className="text-[9px] font-mono font-bold text-slate-400 text-center uppercase tracking-tight">
            NO PART OVERLAP
          </span>
          <div className="w-full h-0.5 bg-gradient-to-r from-cyan-500/40 via-emerald-500/60 to-cyan-500/40" />
        </div>

        {/* Right Column (5 cols): Feeder Handheld Device (HHT) */}
        <div className="md:col-span-5 bg-slate-900/90 rounded-2xl border border-slate-800 p-3.5 space-y-3 font-mono">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-[11px] font-bold text-slate-300 uppercase flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              Line Feeder #{activeFeeder} HHT Screen
            </span>
            <span className="text-[10px] font-bold text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">
              DISPATCH QUEUE
            </span>
          </div>

          <div className="space-y-2 bg-slate-950/90 rounded-xl p-3 border border-slate-800/80 text-xs">
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">Feeder Dedicated Workstation:</span>
              <span className="font-bold text-cyan-300">WS-03 (ACED Dip Line)</span>
            </div>
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">Assigned Unique SKU:</span>
              <span className="font-bold text-slate-200">504000102 · Mid Frame LH</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Source Scan Verified:</span>
              <span className="font-bold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                ACED-TRL-08 [ACKNOWLEDGED]
              </span>
            </div>

            {/* Poka-Yoke Distribution Rule Banner */}
            <div className="mt-2 p-2 rounded-lg bg-cyan-950/40 border border-cyan-500/40 text-[10px] text-cyan-300 flex items-center gap-2">
              <ArrowRight className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>SOP Rule: 28 feeders hold unique parts; no 2 feeders ever issue common SKUs on the line.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer SOP Verification Note */}
      <div className="relative z-10 border-t border-slate-800/80 pt-2 flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-[11px] text-slate-400 font-mono gap-1.5">
        <div className="flex items-center gap-1.5 text-cyan-400 font-medium">
          <ShieldAlert className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span>SOP Clause 4.1: ACED metal body parts inward directly in trolley format to protect surface finish.</span>
        </div>
        <div className="text-slate-400 text-right">
          Ather AURIC Plant M002 · Paint Shop Logistics
        </div>
      </div>
    </div>
  );
};
