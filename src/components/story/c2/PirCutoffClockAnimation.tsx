import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle2, ShieldAlert, Cpu, Calendar, AlertTriangle } from 'lucide-react';

interface Props {
  videoSrc?: string;
  isPaused: boolean;
  onPauseReached?: () => void;
}

export const PirCutoffClockAnimation: React.FC<Props> = ({
  videoSrc,
  isPaused,
  onPauseReached
}) => {
  const [videoAvailable, setVideoAvailable] = useState<boolean>(Boolean(videoSrc));

  useEffect(() => {
    setVideoAvailable(Boolean(videoSrc));
  }, [videoSrc]);
  const [hasTriggeredPause, setHasTriggeredPause] = useState(false);
  const [clockState, setClockState] = useState<'before' | 'after'>('before');

  useEffect(() => {
    if (!hasTriggeredPause && !isPaused) {
      const timer = setTimeout(() => {
        setHasTriggeredPause(true);
        if (onPauseReached) onPauseReached();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [hasTriggeredPause, isPaused, onPauseReached]);

  // Periodic cycle demonstrating 3:45 PM (Same-Day) vs 4:15 PM (Next Working Day)
  useEffect(() => {
    const interval = setInterval(() => {
      setClockState((prev) => (prev === 'before' ? 'after' : 'before'));
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

      {/* Industrial Grid Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 opacity-95 pointer-events-none" />
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, #f59e0b 1px, transparent 1px), linear-gradient(to bottom, #f59e0b 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* Header Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner">
            <Clock className="w-4 h-4 text-amber-400 animate-spin" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-black font-mono tracking-wider text-slate-100 uppercase">
                THE 4:00 PM DISPATCH SLA CUTOFF CLOCK
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                SOP 05_C2_S3 · CLAUSE 4.2 &amp; FM 5.1
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-400 font-mono">
              Ather AURIC Plant M002 · Warehouse Outbound Dispatch SLA · Daily Cutoff
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-700/80">
          <span className={`inline-block w-2 h-2 rounded-full ${clockState === 'before' ? 'bg-emerald-400 animate-ping' : 'bg-amber-400 animate-pulse'}`} />
          <span className={clockState === 'before' ? 'text-emerald-300 font-bold' : 'text-amber-300 font-bold'}>
            {clockState === 'before' ? 'SAME-DAY SLA ELIGIBLE (PRIOR TO 4 PM)' : 'NEXT-DAY SLA QUEUED (AFTER 4 PM)'}
          </span>
        </div>
      </div>

      {/* Main Grid: Clock Simulation vs Dispatch Pathway */}
      <div className="relative z-10 my-auto grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
        {/* Left Column (5 cols): Live Digital Cutoff Clock */}
        <div className={`md:col-span-5 rounded-2xl border p-3.5 space-y-3 font-mono transition-all duration-300 ${
          clockState === 'before'
            ? 'bg-slate-900/90 border-emerald-500/50 shadow-lg shadow-emerald-500/10'
            : 'bg-slate-900/90 border-amber-500/50 shadow-lg shadow-amber-500/10'
        }`}>
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-[11px] font-bold text-slate-300 uppercase flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              JIRA Approval Timestamp
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
              clockState === 'before'
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
            }`}>
              {clockState === 'before' ? 'ON-TIME' : 'AFTER CUTOFF'}
            </span>
          </div>

          <div className="bg-slate-950/80 rounded-xl p-3 border border-slate-800/80 space-y-2 text-center">
            <div className="text-[11px] text-slate-400 uppercase tracking-wider">Plant Dispatch Clock</div>
            <div className={`text-3xl sm:text-4xl font-black tracking-tight ${
              clockState === 'before' ? 'text-emerald-400' : 'text-amber-400'
            }`}>
              {clockState === 'before' ? '15:45:20' : '16:15:05'}
            </div>
            <div className="text-[10px] text-slate-400">
              Daily Plant Cutoff Threshold: <strong>16:00:00 (4:00 PM)</strong>
            </div>
          </div>
        </div>

        {/* Center Indicator (2 cols): Cutoff Barrier */}
        <div className="hidden md:flex md:col-span-2 flex-col items-center justify-center gap-2">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${
            clockState === 'before'
              ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-md shadow-emerald-500/20'
              : 'bg-amber-500/10 border-amber-500 text-amber-400 shadow-md shadow-amber-500/20'
          }`}>
            <Calendar className="w-5 h-5" />
          </div>
          <span className="text-[9px] font-mono font-bold text-slate-400 text-center uppercase tracking-tight">
            4:00 PM CUTOFF
          </span>
          <div className="w-full h-0.5 bg-gradient-to-r from-emerald-500/40 via-amber-500/60 to-emerald-500/40" />
        </div>

        {/* Right Column (5 cols): Automated Dispatch Schedule Route */}
        <div className="md:col-span-5 bg-slate-900/90 rounded-2xl border border-slate-800 p-3.5 space-y-3 font-mono">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-[11px] font-bold text-slate-300 uppercase flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              Outbound Logistics SLA
            </span>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
              DISPATCH SCHEDULE
            </span>
          </div>

          <div className="space-y-2 bg-slate-950/90 rounded-xl p-3 border border-slate-800/80 text-xs">
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">PIR Dispatch Target:</span>
              <span className={`font-bold flex items-center gap-1 ${
                clockState === 'before' ? 'text-emerald-400' : 'text-amber-400'
              }`}>
                {clockState === 'before' ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Same-Day Dispatch (Shift 1/2)
                  </>
                ) : (
                  <>
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    Next Working Day Queue
                  </>
                )}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">Warehouse Floor Action:</span>
              <span className="font-bold text-slate-200">
                {clockState === 'before' ? 'Pick & Pack Immediately' : 'Stage for Morning Shift'}
              </span>
            </div>

            <div className={`mt-2 p-2 rounded-lg text-[10px] flex items-center gap-2 border ${
              clockState === 'before'
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                : 'bg-amber-950/40 border-amber-500/40 text-amber-300'
            }`}>
              {clockState === 'before' ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Approved before 4 PM: Guaranteed same-day transport vehicle loading.</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Approved after 4 PM: Auto-deferred to next working day to avoid dock rush.</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer SOP Verification Note */}
      <div className="relative z-10 border-t border-slate-800/80 pt-2 flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-[11px] text-slate-400 font-mono gap-1.5">
        <div className="flex items-center gap-1.5 text-amber-400 font-medium">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>SOP Clause 4.2: PIRs cleared before 4 PM dispatch same day; requests cleared after 4 PM move to next working day.</span>
        </div>
        <div className="text-slate-400 text-right">
          Ather AURIC Plant M002 · Outbound Logistics
        </div>
      </div>
    </div>
  );
};
