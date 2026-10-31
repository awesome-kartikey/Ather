import React, { useState, useEffect } from 'react';
import { ListOrdered, CheckCircle2, ShieldCheck, FileCheck, Layers, PackageCheck, PenLine } from 'lucide-react';

interface Props {
  videoSrc?: string;
  isPaused: boolean;
  onPauseReached?: () => void;
}

export const IndirectHandoverProtocolAnimation: React.FC<Props> = ({
  videoSrc,
  isPaused,
  onPauseReached
}) => {
  const [videoAvailable, setVideoAvailable] = useState<boolean>(Boolean(videoSrc));

  useEffect(() => {
    setVideoAvailable(Boolean(videoSrc));
  }, [videoSrc]);
  const [hasTriggeredPause, setHasTriggeredPause] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(0);

  useEffect(() => {
    if (!hasTriggeredPause && !isPaused) {
      const timer = setTimeout(() => {
        setHasTriggeredPause(true);
        if (onPauseReached) onPauseReached();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [hasTriggeredPause, isPaused, onPauseReached]);

  // Periodic cycle through the 4 sequence steps
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    { num: 1, icon: FileCheck, title: 'Verify Reservation Slip', desc: 'Audit SAP YMB21 slip & Cost Center' },
    { num: 2, icon: Layers, title: 'Execute SAP Transfer', desc: 'Transfer stock systematically CM01 → MN01' },
    { num: 3, icon: PackageCheck, title: 'Physical Part Handover', desc: 'Hand over spares to authorized recipient' },
    { num: 4, icon: PenLine, title: 'Sign Offline Register', desc: 'Record doc # & capture signature in log' },
  ];

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
          backgroundImage: 'linear-gradient(to right, #10b981 1px, transparent 1px), linear-gradient(to bottom, #10b981 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* Header Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-inner">
            <ListOrdered className="w-4 h-4 text-emerald-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-black font-mono tracking-wider text-slate-100 uppercase">
                INDIRECT MATERIAL HANDOVER PROTOCOL
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                SOP 10_C2_S1 · CLAUSES 4.2 &amp; 5.2
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-400 font-mono">
              Ather AURIC Plant M002 · Mandatory 4-Step Chain of Custody Sequence
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-700/80">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-emerald-300 font-bold">
            STEP {activeStep + 1} OF 4 ACTIVE
          </span>
        </div>
      </div>

      {/* Main Grid: 4-Step Sequence Process Rail */}
      <div className="relative z-10 my-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 items-stretch font-mono">
        {steps.map((st, i) => {
          const isCurrent = activeStep === i;
          const isDone = activeStep > i;
          const IconComponent = st.icon;

          return (
            <div
              key={st.num}
              className={`rounded-2xl border p-3 flex flex-col justify-between transition-all duration-300 ${
                isCurrent
                  ? 'bg-slate-900/95 border-emerald-500 shadow-lg shadow-emerald-500/20 scale-[1.02]'
                  : isDone
                  ? 'bg-slate-950/80 border-emerald-500/40 opacity-90'
                  : 'bg-slate-950/40 border-slate-800 opacity-60'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center border ${
                    isCurrent
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                      : isDone
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                      : 'bg-slate-900 text-slate-500 border-slate-700'
                  }`}>
                    {st.num}
                  </span>
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <IconComponent className={`w-4 h-4 ${isCurrent ? 'text-emerald-400 animate-pulse' : 'text-slate-500'}`} />
                  )}
                </div>

                <div>
                  <h4 className={`text-xs font-bold leading-tight ${isCurrent ? 'text-slate-100' : 'text-slate-300'}`}>
                    {st.title}
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-1 leading-snug">
                    {st.desc}
                  </p>
                </div>
              </div>

              <div className="pt-2 mt-2 border-t border-slate-800/80">
                <span className={`text-[9px] font-bold uppercase ${
                  isCurrent ? 'text-emerald-400' : isDone ? 'text-emerald-600' : 'text-slate-600'
                }`}>
                  {isCurrent ? '● IN PROGRESS' : isDone ? '✓ COMPLETED' : 'QUEUED'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer SOP Verification Note */}
      <div className="relative z-10 border-t border-slate-800/80 pt-2 flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-[11px] text-slate-400 font-mono gap-1.5">
        <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>SOP Clause 4.2 &amp; 5.2: Never hand over parts before SAP transfer; always sign the physical register!</span>
        </div>
        <div className="text-slate-400 text-right">
          Ather AURIC Plant M002 · Spares Custody Integrity
        </div>
      </div>
    </div>
  );
};
