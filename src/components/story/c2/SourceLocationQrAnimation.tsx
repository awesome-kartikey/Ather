import React, { useState, useEffect } from 'react';
import { QrCode, Lock, Unlock, Scan, ArrowRight, CheckCircle2, ShieldAlert } from 'lucide-react';

interface Props {
  videoSrc?: string;
  isPaused: boolean;
  onPauseReached?: () => void;
}

export const SourceLocationQrAnimation: React.FC<Props> = ({
  videoSrc,
  isPaused,
  onPauseReached
}) => {
  const [videoAvailable, setVideoAvailable] = useState<boolean>(Boolean(videoSrc));

  useEffect(() => {
    setVideoAvailable(Boolean(videoSrc));
  }, [videoSrc]);
  const [hasTriggeredPause, setHasTriggeredPause] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    if (!hasTriggeredPause && !isPaused) {
      const timer = setTimeout(() => {
        setHasTriggeredPause(true);
        if (onPauseReached) onPauseReached();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [hasTriggeredPause, isPaused, onPauseReached]);

  // Periodic simulation of scanning rack QR to reveal blind quantity
  useEffect(() => {
    const interval = setInterval(() => {
      setIsUnlocked((prev) => !prev);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[300px] sm:h-[380px] md:h-[420px] bg-slate-950 rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-slate-800 shadow-2xl select-none flex flex-col justify-between p-3 sm:p-5">
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

      {/* Atmospheric Industrial Grid Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 opacity-95 pointer-events-none" />
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, #06b6d4 1px, transparent 1px), linear-gradient(to bottom, #06b6d4 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* Header Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-inner">
            <Scan className="w-4 h-4 text-cyan-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-black font-mono tracking-wider text-slate-100 uppercase">
                SOURCE LOCATION QR SCAN &amp; BLIND REVEAL
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                SOP 01_C2_S1 · CLAUSE 4.1
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-400 font-mono">
              Ather AURIC Plant M002 · High-Rise Rack HRR-A-03 · Pick Verification Protocol
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-700/80">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-emerald-300 font-bold">ANTI-GUESSWORK CONTROL</span>
        </div>
      </div>

      {/* Center Layout: Physical Rack Beam QR vs Blind HHT Display */}
      <div className="relative z-10 my-auto grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
        {/* Left Column (5 cols): Physical High-Rise Rack Location Beam */}
        <div className="md:col-span-5 bg-slate-900/90 rounded-2xl border border-slate-800 p-3.5 space-y-3 font-mono">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-[11px] font-bold text-slate-300 uppercase flex items-center gap-1.5">
              <QrCode className="w-3.5 h-3.5 text-cyan-400" />
              Physical Rack Beam
            </span>
            <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
              LOCATION QR CODE
            </span>
          </div>

          {/* Yellow Rack Beam Representation */}
          <div className="bg-amber-500 text-slate-950 p-3 rounded-xl border-2 border-amber-400 shadow-md space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black tracking-wider uppercase">
                BIN: HRR-A-03-08
              </span>
              <span className="text-[9px] bg-slate-950 text-amber-300 px-1.5 py-0.5 rounded font-black">
                LEVEL 1
              </span>
            </div>

            {/* QR Code Graphic with laser scan beam */}
            <div className="relative bg-white p-2 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-2">
                <QrCode className="w-8 h-8 text-slate-900" />
                <div className="text-[10px] leading-tight text-slate-800 font-bold">
                  <div>QR: HRR-A-03-08</div>
                  <div className="text-slate-500 font-normal">Ather 450X Wiring Harness</div>
                </div>
              </div>

              {/* Animated Red Laser Scan Line */}
              <div className="w-16 h-8 bg-slate-100 rounded border border-slate-300 relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-x-0 h-0.5 bg-red-600 shadow-sm shadow-red-500 animate-pulse" />
                <span className="text-[8px] text-slate-400 font-bold">SCANNING</span>
              </div>
            </div>
          </div>

          <div className="text-[9px] text-slate-400 leading-tight">
            Clause 4.1 Mandate: Feeder must scan this beam QR code to acknowledge physical arrival before quantity unlocks!
          </div>
        </div>

        {/* Center Arrow */}
        <div className="hidden md:flex md:col-span-1 items-center justify-center">
          <div className="flex flex-col items-center text-slate-500 font-mono text-[9px] gap-1">
            <span className="text-center font-bold">BEAM</span>
            <ArrowRight className="w-6 h-6 text-cyan-400 animate-pulse" />
            <span className="text-center font-bold">SCAN</span>
          </div>
        </div>

        {/* Right Column (6 cols): Line Feeder HHT Screen with Blind Reveal */}
        <div className="md:col-span-6 bg-slate-900/95 rounded-2xl border-2 border-slate-700/80 p-3.5 space-y-2.5 font-mono shadow-xl shadow-slate-950">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-black text-white uppercase">
              HHT PICKING INTERFACE
            </span>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                isUnlocked
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
              }`}
            >
              {isUnlocked ? 'LOCATION VERIFIED ✓' : 'AWAITING LOCATION QR SCAN'}
            </span>
          </div>

          {/* Blind Quantity Field Box */}
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-slate-400">Target Location:</span>
              <span className="text-cyan-400 font-bold">HRR-A-03-08</span>
            </div>

            {/* Dynamic Reveal Field */}
            {isUnlocked ? (
              <div className="bg-emerald-950/60 border border-emerald-500/60 p-2.5 rounded-lg flex items-center justify-between text-emerald-300 animate-fadeIn">
                <div className="flex items-center gap-2">
                  <Unlock className="w-5 h-5 text-emerald-400" />
                  <div>
                    <span className="text-[10px] font-bold block uppercase">AUTHORIZED PICK QUANTITY:</span>
                    <span className="text-base font-black text-white">4 CRATES (20 UNITS)</span>
                  </div>
                </div>
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>
            ) : (
              <div className="bg-rose-950/40 border border-rose-800/60 p-2.5 rounded-lg flex items-center justify-between text-rose-300">
                <div className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-rose-400 animate-bounce" />
                  <div>
                    <span className="text-[10px] font-bold block uppercase">PICK QUANTITY HIDDEN:</span>
                    <span className="text-xs font-bold text-slate-400">Scan QR at HRR-A-03-08 to Reveal</span>
                  </div>
                </div>
                <ShieldAlert className="w-4 h-4 text-rose-400" />
              </div>
            )}

            <div className="text-[9px] text-slate-500">
              Why Blind Reveal? Prevents picking parts from the wrong adjacent bin before location confirmation.
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info Banner */}
      <div className="relative z-10 flex items-center justify-between pt-2 border-t border-slate-800 text-[10px] sm:text-xs font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
          <span>Clause 4.1: Feeder must scan source location QR to acknowledge physical presence</span>
        </div>
        <div className="flex items-center gap-1 text-emerald-400 font-bold">
          <span>ZERO WRONG-BIN PICKS</span>
        </div>
      </div>
    </div>
  );
};
