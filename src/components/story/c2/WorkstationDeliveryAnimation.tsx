import React, { useState, useEffect } from 'react';
import { QrCode, CheckCircle2, ShieldAlert, ArrowRight, RotateCcw, AlertTriangle, Box } from 'lucide-react';

interface Props {
  videoSrc?: string;
  isPaused: boolean;
  onPauseReached?: () => void;
}

export const WorkstationDeliveryAnimation: React.FC<Props> = ({
  videoSrc,
  isPaused,
  onPauseReached
}) => {
  const [videoAvailable, setVideoAvailable] = useState<boolean>(false);
  const [hasTriggeredPause, setHasTriggeredPause] = useState(false);
  const [deliveryStep, setDeliveryStep] = useState<'offloading' | 'closed'>('offloading');

  useEffect(() => {
    if (!hasTriggeredPause && !isPaused) {
      const timer = setTimeout(() => {
        setHasTriggeredPause(true);
        if (onPauseReached) onPauseReached();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [hasTriggeredPause, isPaused, onPauseReached]);

  // Periodic cycle demonstrating destination scan and empty return
  useEffect(() => {
    const interval = setInterval(() => {
      setDeliveryStep((prev) => (prev === 'offloading' ? 'closed' : 'offloading'));
    }, 2400);
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
          backgroundImage: 'linear-gradient(to right, #0ea5e9 1px, transparent 1px), linear-gradient(to bottom, #0ea5e9 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* Header Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 shadow-inner">
            <CheckCircle2 className="w-4 h-4 text-sky-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-black font-mono tracking-wider text-slate-100 uppercase">
                LINE-SIDE DELIVERY &amp; REVERSE LOGISTICS LOOP
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-500/40">
                SOP 01_C2_S1 · CLAUSE 4.2 &amp; FM 5.3
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-400 font-mono">
              Ather AURIC Plant M002 · Main Assembly Workstation WS-08 (Mid-Frame)
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-700/80">
          <span className={`inline-block w-2 h-2 rounded-full ${deliveryStep === 'closed' ? 'bg-emerald-400 animate-ping' : 'bg-sky-400'}`} />
          <span className={deliveryStep === 'closed' ? 'text-emerald-300 font-bold' : 'text-sky-300 font-bold'}>
            {deliveryStep === 'closed' ? 'WH TASK CLOSED IN MES' : 'DELIVERING TO STATION'}
          </span>
        </div>
      </div>

      {/* Main Grid: Workstation Handshake vs Empty Bin Management */}
      <div className="relative z-10 my-auto grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
        {/* Left Column (6 cols): Workstation 08 Destination QR Handshake */}
        <div className={`md:col-span-6 rounded-2xl border p-3.5 space-y-3 font-mono transition-all duration-300 ${
          deliveryStep === 'closed'
            ? 'bg-slate-900/90 border-emerald-500/50 shadow-lg shadow-emerald-500/10'
            : 'bg-slate-900/90 border-sky-500/40 shadow-lg shadow-sky-500/10'
        }`}>
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-[11px] font-bold text-slate-300 uppercase flex items-center gap-1.5">
              <QrCode className="w-3.5 h-3.5 text-sky-400" />
              Workstation Line-Side Beam
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
              deliveryStep === 'closed'
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-sky-500/20 text-sky-300 border-sky-500/40'
            }`}>
              {deliveryStep === 'closed' ? 'SCAN COMPLETE' : 'AWAITING SCAN'}
            </span>
          </div>

          <div className="bg-slate-950/80 rounded-xl p-3 border border-slate-800/80 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Station Destination QR:</span>
              <span className="font-bold text-sky-300 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-800">
                WS-08-MIDFRAME
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Assigned Assembly Unit:</span>
              <span className="font-bold text-slate-200">Ather 450X Mid-Frame &amp; Wire Harness</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Delivered Material:</span>
              <span className="text-emerald-400 font-bold">4 Crates (Full Quota)</span>
            </div>

            {/* Handshake Status Box */}
            <div className={`mt-2 p-2.5 rounded-lg text-[10px] flex items-center justify-between border ${
              deliveryStep === 'closed'
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                : 'bg-sky-950/40 border-sky-500/40 text-sky-300'
            }`}>
              <div className="flex items-center gap-2">
                {deliveryStep === 'closed' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <ArrowRight className="w-4 h-4 text-sky-400 shrink-0 animate-pulse" />
                )}
                <span>
                  {deliveryStep === 'closed'
                    ? 'MES Task #8849 Closed · Inventory Deducted'
                    : 'Scan Destination QR to Close Task in MES'}
                </span>
              </div>
              <span className="font-mono font-bold text-[9px] uppercase px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700">
                {deliveryStep === 'closed' ? 'STATUS: CLOSED' : 'STATUS: IN TRANSIT'}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column (6 cols): Empty Assets & Gangway Clearance */}
        <div className="md:col-span-6 bg-slate-900/90 rounded-2xl border border-slate-800 p-3.5 space-y-3 font-mono">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-[11px] font-bold text-slate-300 uppercase flex items-center gap-1.5">
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
              Empty Assets &amp; Reverse Flow
            </span>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
              REVERSE LOGISTICS
            </span>
          </div>

          <div className="space-y-2 bg-slate-950/90 rounded-xl p-3 border border-slate-800/80 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Empty Return Trolleys:</span>
              <span className="font-bold text-amber-300 flex items-center gap-1">
                <Box className="w-3.5 h-3.5 text-amber-400" />
                2 Units Ready for Return
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Reverse Lane Clearance:</span>
              <span className="font-bold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Gangway Unobstructed
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Empty Collector SLA:</span>
              <span className="text-slate-300 font-medium">Every 30 Mins Pickup Cycle</span>
            </div>

            {/* Failure Mode 5.3 Poka-Yoke Warning */}
            <div className="mt-2 p-2 rounded-lg bg-amber-950/30 border border-amber-600/40 text-[10px] text-amber-300 flex items-start gap-2">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong>Failure Mode 5.3:</strong> Abandoned empty trolleys choke pedestrian gangways and starve decanting area. Must be parked in designated return lane!
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer SOP Verification Note */}
      <div className="relative z-10 border-t border-slate-800/80 pt-2 flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-[11px] text-slate-400 font-mono gap-1.5">
        <div className="flex items-center gap-1.5 text-sky-400 font-medium">
          <ShieldAlert className="w-3.5 h-3.5 text-sky-400 shrink-0" />
          <span>Dual Scan Discipline: Source QR verifies part pickup &rarr; Destination QR closes MES task &amp; deducts stock.</span>
        </div>
        <div className="text-slate-400 text-right">
          Ather AURIC Plant M002 · Assembly Logistics
        </div>
      </div>
    </div>
  );
};
