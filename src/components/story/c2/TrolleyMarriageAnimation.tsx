import React, { useState, useEffect } from 'react';
import { QrCode, Scan, CheckCircle2, ShieldAlert, Link, AlertTriangle, Cpu } from 'lucide-react';

interface Props {
  videoSrc?: string;
  isPaused: boolean;
  onPauseReached?: () => void;
}

export const TrolleyMarriageAnimation: React.FC<Props> = ({
  videoSrc,
  isPaused,
  onPauseReached
}) => {
  const [videoAvailable, setVideoAvailable] = useState<boolean>(Boolean(videoSrc));

  useEffect(() => {
    setVideoAvailable(Boolean(videoSrc));
  }, [videoSrc]);
  const [hasTriggeredPause, setHasTriggeredPause] = useState(false);
  const [pairingPhase, setPairingPhase] = useState<'scanning' | 'married'>('scanning');

  useEffect(() => {
    if (!hasTriggeredPause && !isPaused) {
      const timer = setTimeout(() => {
        setHasTriggeredPause(true);
        if (onPauseReached) onPauseReached();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [hasTriggeredPause, isPaused, onPauseReached]);

  // Periodic cycle simulating the Trolley QR pairing pulse
  useEffect(() => {
    const interval = setInterval(() => {
      setPairingPhase((prev) => (prev === 'scanning' ? 'married' : 'scanning'));
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full min-h-0 bg-slate-950 rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-slate-800 shadow-2xl select-none flex flex-col justify-between p-3 sm:p-5">
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

      {/* Industrial Grid Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 opacity-95 pointer-events-none" />
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, #10b981 1px, transparent 1px), linear-gradient(to bottom, #10b981 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* Header Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-inner">
            <Link className="w-4 h-4 text-emerald-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-black font-mono tracking-wider text-slate-100 uppercase">
                TROLLEY QR MARRIAGE &amp; LANE VERIFICATION
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                SOP 01_C2_S1 · FAIL MODES 5.1 &amp; 5.2
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-400 font-mono">
              Ather AURIC Plant M002 · Supermarket Lane 04 · VIN Traceability Protocol
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-700/80">
          <span className={`inline-block w-2 h-2 rounded-full ${pairingPhase === 'married' ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`} />
          <span className={pairingPhase === 'married' ? 'text-emerald-300 font-bold' : 'text-amber-300 font-bold'}>
            {pairingPhase === 'married' ? 'TROLLEY MARRIED TO TASK' : 'AWAITING TROLLEY SCAN'}
          </span>
        </div>
      </div>

      {/* Main Grid: Mobile Trolley vs HHT Pairing Interface */}
      <div className="relative z-10 my-auto grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
        {/* Left Column (5 cols): Mobile Picking Trolley with Physical QR */}
        <div className={`md:col-span-5 rounded-2xl border p-3.5 space-y-3 font-mono transition-all duration-300 ${
          pairingPhase === 'married'
            ? 'bg-slate-900/90 border-emerald-500/50 shadow-lg shadow-emerald-500/10'
            : 'bg-slate-900/90 border-amber-500/40 shadow-lg shadow-amber-500/10'
        }`}>
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-[11px] font-bold text-slate-300 uppercase flex items-center gap-1.5">
              <QrCode className="w-3.5 h-3.5 text-emerald-400" />
              Physical Trolley QR
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
              pairingPhase === 'married'
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
            }`}>
              {pairingPhase === 'married' ? 'MARRIED' : 'UNMARRIED'}
            </span>
          </div>

          {/* Trolley Visual Representation */}
          <div className="bg-slate-950/80 rounded-xl p-3 border border-slate-800/80 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Asset Barcode:</span>
              <span className="font-bold text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                TRL-VEH-042
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Assigned Type:</span>
              <span className="font-bold text-slate-200">Mobile Kitting Trolley</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Load Capacity:</span>
              <span className="text-slate-300">4 Crates (Wiring Harness)</span>
            </div>

            {/* Simulated 4-Crate Grid */}
            <div className="grid grid-cols-4 gap-1.5 pt-1.5">
              {[1, 2, 3, 4].map((crate) => (
                <div
                  key={crate}
                  className={`h-9 rounded-lg border flex flex-col items-center justify-center text-[9px] font-bold ${
                    pairingPhase === 'married'
                      ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-300'
                      : 'bg-amber-950/30 border-amber-600/40 text-amber-400'
                  }`}
                >
                  <span>CRATE {crate}</span>
                  <span className="text-[7px] text-slate-400">450X-HARN</span>
                </div>
              ))}
            </div>
          </div>

          {/* Supermarket Lane Badge */}
          <div className="flex items-center justify-between bg-slate-950/60 p-2 rounded-lg border border-slate-800 text-[10px]">
            <span className="text-slate-400 flex items-center gap-1">
              <Scan className="w-3 h-3 text-cyan-400" /> Lane Tag:
            </span>
            <span className="text-cyan-300 font-bold">SM-LN-04 (Harness Supermarket)</span>
          </div>
        </div>

        {/* Center Indicator (2 cols): Handshake Link */}
        <div className="hidden md:flex md:col-span-2 flex-col items-center justify-center gap-2">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${
            pairingPhase === 'married'
              ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-500/20'
              : 'bg-amber-500/20 border-amber-500 text-amber-300 animate-pulse'
          }`}>
            <Link className="w-5 h-5" />
          </div>
          <span className="text-[9px] font-mono font-bold text-slate-400 text-center uppercase tracking-tight">
            {pairingPhase === 'married' ? 'PAIRED & LOCKED' : 'SCANNING TROLLEY'}
          </span>
          <div className="w-full h-0.5 bg-gradient-to-r from-emerald-500/40 via-cyan-500/60 to-emerald-500/40" />
        </div>

        {/* Right Column (5 cols): Handheld Terminal (HHT) MES UI */}
        <div className="md:col-span-5 bg-slate-900/90 rounded-2xl border border-slate-800 p-3.5 space-y-3 font-mono">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-[11px] font-bold text-slate-300 uppercase flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              Line Feeder HHT Screen
            </span>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
              MES WH-TASK #8849
            </span>
          </div>

          <div className="space-y-2 bg-slate-950/90 rounded-xl p-3 border border-slate-800/80 text-xs">
            {/* Step 1 Check */}
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">Step 1: Trolley Marriage:</span>
              <span className={`font-bold flex items-center gap-1 ${
                pairingPhase === 'married' ? 'text-emerald-400' : 'text-amber-400'
              }`}>
                {pairingPhase === 'married' ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    TRL-VEH-042 [MARRIED]
                  </>
                ) : (
                  <>
                    <Scan className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                    SCAN TROLLEY QR
                  </>
                )}
              </span>
            </div>

            {/* Step 2 Check */}
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">Step 2: Supermarket Lane:</span>
              <span className="font-bold text-cyan-300 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                SM-LN-04 [VERIFIED]
              </span>
            </div>

            {/* Destination Workstation */}
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Target Line Station:</span>
              <span className="font-bold text-slate-200">WS-08 (Mid-Frame Assembly)</span>
            </div>

            {/* System Status Banner */}
            <div className={`mt-2 p-2 rounded-lg text-[10px] flex items-center gap-2 border ${
              pairingPhase === 'married'
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                : 'bg-amber-950/40 border-amber-500/40 text-amber-300'
            }`}>
              {pairingPhase === 'married' ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>100% VIN Traceability Active · Ready for Line Dispatch</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>HALT: Trolley unassigned · Do not move to assembly line</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer SOP Poka-Yoke Warning Strip */}
      <div className="relative z-10 border-t border-slate-800/80 pt-2 flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-[11px] text-slate-400 font-mono gap-1.5">
        <div className="flex items-center gap-1.5 text-amber-400 font-medium">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>Failure Mode 5.1 &amp; 5.2: Unscanned trolleys move as phantom stock and break ERP inventory records!</span>
        </div>
        <div className="text-slate-400 text-right">
          Ather Manufacturing Execution System (MES)
        </div>
      </div>
    </div>
  );
};
