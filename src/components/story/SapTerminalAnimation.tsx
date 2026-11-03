import React, { useState, useEffect } from 'react';
import { Database, PauseCircle, PlayCircle, CheckCircle2, ShieldCheck } from 'lucide-react';

interface Props {
  videoSrc?: string;
  isPaused: boolean;
  onPauseReached?: () => void;
}

export const SapTerminalAnimation: React.FC<Props> = ({
  videoSrc,
  isPaused,
  onPauseReached
}) => {
  const [videoAvailable, setVideoAvailable] = useState<boolean>(Boolean(videoSrc));

  useEffect(() => {
    setVideoAvailable(Boolean(videoSrc));
  }, [videoSrc]);
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
    <div className="relative w-full h-full min-h-0 bg-slate-950 rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-slate-800 shadow-2xl select-none flex flex-col justify-between">
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

      {/* Procedural SVG/CSS SAP Terminal GUI Canvas */}
      <div className="absolute inset-0 w-full h-full overflow-hidden p-3 sm:p-5 flex flex-col justify-between">
        {/* Background Subtle Grid */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 opacity-95" />

        {/* SAP GUI Window Frame */}
        <div className="relative z-0 w-full h-full rounded-xl sm:rounded-2xl bg-slate-900/90 border border-slate-700/80 p-3 sm:p-4 flex flex-col justify-between shadow-inner">
          {/* SAP Top Menubar & Title */}
          <div className="flex items-center justify-between border-b border-slate-700 pb-2.5">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-xs font-mono font-bold text-slate-300 ml-2">
                SAP Easy Access · AURIC Plant M002 · Gate Security Module
              </span>
            </div>

            <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-800">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>SERVER: PRD-ERP-01</span>
            </div>
          </div>

          {/* SAP Command Line & Transaction Box */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 my-2 text-xs font-mono">
            <div className="sm:col-span-4 bg-slate-950 p-2 rounded-lg border border-slate-700 flex items-center justify-between">
              <span className="text-slate-400">T-Code:</span>
              <span className="text-emerald-400 font-bold bg-slate-800 px-2 py-0.5 rounded border border-emerald-500/30">
                YMM_GATE_ENTRY
              </span>
            </div>

            <div className="sm:col-span-5 bg-slate-950 p-2 rounded-lg border border-slate-700 flex items-center justify-between">
              <span className="text-slate-400">Invoice Ref:</span>
              <span className="text-sky-300 font-bold">INV-TX-990142</span>
            </div>

            <div className="sm:col-span-3 bg-slate-950 p-2 rounded-lg border border-slate-700 flex items-center justify-between">
              <span className="text-slate-400">Digital ASN:</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" /> MATCH
              </span>
            </div>
          </div>

          {/* SAP Line Items Table Preview */}
          <div className="flex-1 bg-slate-950/80 rounded-lg border border-slate-800 overflow-hidden flex flex-col justify-start text-[11px] font-mono">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-2 bg-slate-800/80 px-3 py-1.5 text-slate-300 font-bold border-b border-slate-700">
              <div className="col-span-2">Item / PO</div>
              <div className="col-span-4">Material Description</div>
              <div className="col-span-2 text-right">Quantity</div>
              <div className="col-span-2 text-center">Status</div>
              <div className="col-span-2 text-right">Dest Bay</div>
            </div>

            {/* Table Row 1 */}
            <div className="grid grid-cols-12 gap-2 px-3 py-2 text-slate-200 border-b border-slate-800/60 items-center">
              <div className="col-span-2 font-bold text-sky-400">10 / 450092140</div>
              <div className="col-span-4 truncate">CHASSIS BRACKET RH (ATHER 450X)</div>
              <div className="col-span-2 text-right font-bold text-emerald-400">500 NOS</div>
              <div className="col-span-2 text-center text-emerald-400 bg-emerald-950/40 py-0.5 rounded border border-emerald-800/50">
                ASN VALID
              </div>
              <div className="col-span-2 text-right font-bold text-slate-400">BAY B · DOCK 04</div>
            </div>

            {/* Table Row 2 */}
            <div className="grid grid-cols-12 gap-2 px-3 py-2 text-slate-200 border-b border-slate-800/60 items-center">
              <div className="col-span-2 font-bold text-sky-400">20 / 450092140</div>
              <div className="col-span-4 truncate">SUBFRAME MOUNT BUSHINGS</div>
              <div className="col-span-2 text-right font-bold text-emerald-400">1,200 NOS</div>
              <div className="col-span-2 text-center text-emerald-400 bg-emerald-950/40 py-0.5 rounded border border-emerald-800/50">
                ASN VALID
              </div>
              <div className="col-span-2 text-right font-bold text-slate-400">BAY B · DOCK 04</div>
            </div>
          </div>

          {/* SAP Bottom Status Bar */}
          <div className="flex items-center justify-between pt-2 text-[10px] font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <Database className="w-3 h-3 text-sky-400" />
              <span>ERP Status: Advance Shipment Notice auto-populated 2 lines. Ready for dock assignment.</span>
            </span>
            <span className="text-slate-500 hidden sm:block">AURIC PLANT ID: M002</span>
          </div>
        </div>
      </div>

      {/* Top Telemetry Overlay */}
      <div className="relative z-10 p-3 sm:p-4 flex items-center justify-between bg-gradient-to-b from-slate-950/80 to-transparent">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-ping" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400">
            CAM-03 · DEO WORKSTATION · SAP ERP MONITOR
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
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/60 text-sky-300 text-xs font-mono font-bold uppercase tracking-wide">
              <PlayCircle className="w-3.5 h-3.5 text-sky-400" />
              <span>ERP Processing</span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Scene Situation Card */}
      <div className="relative z-10 px-4 py-3 bg-slate-950/90 border-t border-slate-800/90 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 shrink-0">
            <ShieldCheck className="w-4 h-4 text-sky-400" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
              Live Factory Situation
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-200">
              {isPaused
                ? 'DEO verifies supplier ASN against invoice. Strict zero-override policy active.'
                : 'DEO launches SAP transaction YMM_GATE_ENTRY and enters invoice number...'}
            </div>
          </div>
        </div>

        <div className="text-right hidden sm:block">
          <div className="text-[10px] font-mono text-slate-500">SAP T-CODE</div>
          <div className="text-xs font-mono font-bold text-emerald-400">YMM_GATE_ENTRY</div>
        </div>
      </div>
    </div>
  );
};
