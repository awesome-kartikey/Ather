import React, { useState, useEffect } from 'react';
import { ShieldCheck, CheckCircle2, ShieldAlert, Cpu, ArrowRight, UserCheck, AlertCircle } from 'lucide-react';

interface Props {
  videoSrc?: string;
  isPaused: boolean;
  onPauseReached?: () => void;
}

export const PirDualApprovalAnimation: React.FC<Props> = ({
  videoSrc,
  isPaused,
  onPauseReached
}) => {
  const [videoAvailable, setVideoAvailable] = useState<boolean>(Boolean(videoSrc));

  useEffect(() => {
    setVideoAvailable(Boolean(videoSrc));
  }, [videoSrc]);
  const [hasTriggeredPause, setHasTriggeredPause] = useState(false);
  const [approvedState, setApprovedState] = useState<'approved' | 'pending'>('approved');

  useEffect(() => {
    if (!hasTriggeredPause && !isPaused) {
      const timer = setTimeout(() => {
        setHasTriggeredPause(true);
        if (onPauseReached) onPauseReached();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [hasTriggeredPause, isPaused, onPauseReached]);

  // Periodic cycle demonstrating approval state checks
  useEffect(() => {
    const interval = setInterval(() => {
      setApprovedState((prev) => (prev === 'approved' ? 'pending' : 'approved'));
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
          backgroundImage: 'linear-gradient(to right, #6366f1 1px, transparent 1px), linear-gradient(to bottom, #6366f1 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* Header Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-inner">
            <ShieldCheck className="w-4 h-4 text-indigo-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-black font-mono tracking-wider text-slate-100 uppercase">
                DUAL APPROVAL THRESHOLDS: VALUE &amp; QUANTITY
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                SOP 05_C2_S3 · CLAUSE 4.2 &amp; FM 5.1
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-400 font-mono">
              Ather AURIC Plant M002 · JIRA Authorization Matrix · Financial Governance
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-700/80">
          <span className={`inline-block w-2 h-2 rounded-full ${approvedState === 'approved' ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`} />
          <span className={approvedState === 'approved' ? 'text-emerald-300 font-bold' : 'text-amber-300 font-bold'}>
            {approvedState === 'approved' ? 'DUAL SIGN-OFF COMPLETE' : 'APPROVAL PENDING IN JIRA'}
          </span>
        </div>
      </div>

      {/* Main Grid: Threshold Indicators vs Automated Sign-Off Handshake */}
      <div className="relative z-10 my-auto grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
        {/* Left Column (6 cols): The Two Mandatory Thresholds */}
        <div className="md:col-span-6 bg-slate-900/90 rounded-2xl border border-slate-800 p-3.5 space-y-3 font-mono">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-[11px] font-bold text-slate-300 uppercase flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-indigo-400" />
              SOP Trigger Thresholds
            </span>
            <span className="text-[10px] font-bold text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/30">
              GOVERNANCE GATES
            </span>
          </div>

          <div className="space-y-2 text-xs">
            {/* Gate 1: Value Threshold */}
            <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">1. Total PIR Valuation:</span>
                <span className="font-bold text-amber-300">₹1,65,000 (Exceeds ₹25,000)</span>
              </div>
              <div className="flex items-center justify-between text-[11px] pt-0.5">
                <span className="text-slate-400">Required Approver:</span>
                <span className="font-bold text-indigo-300 flex items-center gap-1">
                  <UserCheck className="w-3 h-3 text-indigo-400" />
                  Product Owner Sign-Off
                </span>
              </div>
            </div>

            {/* Gate 2: Quantity Threshold */}
            <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">2. Single Part Quantity:</span>
                <span className="font-bold text-amber-300">30 Units (Exceeds 25 Nos)</span>
              </div>
              <div className="flex items-center justify-between text-[11px] pt-0.5">
                <span className="text-slate-400">Required Approver:</span>
                <span className="font-bold text-sky-300 flex items-center gap-1">
                  <UserCheck className="w-3 h-3 text-sky-400" />
                  Planning Team Sign-Off
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (6 cols): Automated JIRA Status & Warehouse Clearance */}
        <div className={`md:col-span-6 rounded-2xl border p-3.5 space-y-3 font-mono transition-all duration-300 ${
          approvedState === 'approved'
            ? 'bg-slate-900/90 border-emerald-500/50 shadow-lg shadow-emerald-500/10'
            : 'bg-slate-900/90 border-amber-500/50 shadow-lg shadow-amber-500/10'
        }`}>
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-[11px] font-bold text-slate-300 uppercase flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              JIRA Authorization Status
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
              approvedState === 'approved'
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
            }`}>
              {approvedState === 'approved' ? 'CLEARED' : 'ACTION REQUIRED'}
            </span>
          </div>

          <div className="space-y-2 bg-slate-950/90 rounded-xl p-3 border border-slate-800/80 text-xs">
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">Product Owner:</span>
              <span className={`font-bold flex items-center gap-1 ${
                approvedState === 'approved' ? 'text-emerald-400' : 'text-amber-400'
              }`}>
                {approvedState === 'approved' ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    P. Sharma (PO) Approved
                  </>
                ) : (
                  'Pending Review'
                )}
              </span>
            </div>

            <div className="flex items-center justify-between pb-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">Planning Team:</span>
              <span className={`font-bold flex items-center gap-1 ${
                approvedState === 'approved' ? 'text-emerald-400' : 'text-amber-400'
              }`}>
                {approvedState === 'approved' ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    R. Kulkarni (Planning) Approved
                  </>
                ) : (
                  'Pending Review'
                )}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">Warehouse Picking:</span>
              <span className={`font-bold ${approvedState === 'approved' ? 'text-emerald-300' : 'text-amber-300'}`}>
                {approvedState === 'approved' ? 'PICKLIST GENERATED' : 'HALTED: AWAITING APPROVAL'}
              </span>
            </div>

            <div className="mt-2 p-2 rounded-lg bg-indigo-950/40 border border-indigo-500/40 text-[10px] text-indigo-300 flex items-center gap-2">
              <ArrowRight className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span>SOP: Zero picking permitted until both mandatory sign-offs are locked in JIRA.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer SOP Verification Note */}
      <div className="relative z-10 border-t border-slate-800/80 pt-2 flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-[11px] text-slate-400 font-mono gap-1.5">
        <div className="flex items-center gap-1.5 text-indigo-400 font-medium">
          <ShieldAlert className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
          <span>Failure Mode 5.1: Issuing high-value or bulk items without sign-off causes line starvation &amp; budget leakage!</span>
        </div>
        <div className="text-slate-400 text-right">
          Ather AURIC Plant M002 · PIR Governance Matrix
        </div>
      </div>
    </div>
  );
};
