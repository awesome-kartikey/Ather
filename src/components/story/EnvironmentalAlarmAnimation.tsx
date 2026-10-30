import React, { useState, useEffect } from 'react';
import { AlertOctagon, Siren, ShieldAlert, Thermometer, Droplets, ArrowRight, Wrench } from 'lucide-react';

interface Props {
  videoSrc?: string;
  isPaused: boolean;
  onPauseReached?: () => void;
}

export const EnvironmentalAlarmAnimation: React.FC<Props> = ({
  videoSrc,
  isPaused,
  onPauseReached
}) => {
  const [videoAvailable, setVideoAvailable] = useState<boolean>(false);
  const [hasTriggeredPause, setHasTriggeredPause] = useState(false);
  const [flashPhase, setFlashPhase] = useState(false);

  useEffect(() => {
    if (!hasTriggeredPause && !isPaused) {
      const timer = setTimeout(() => {
        setHasTriggeredPause(true);
        if (onPauseReached) onPauseReached();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [hasTriggeredPause, isPaused, onPauseReached]);

  // Visual strobe pulse
  useEffect(() => {
    const strobe = setInterval(() => {
      setFlashPhase((prev) => !prev);
    }, 700);
    return () => clearInterval(strobe);
  }, []);

  return (
    <div className={`relative w-full h-[300px] sm:h-[380px] md:h-[420px] rounded-2xl sm:rounded-3xl overflow-hidden border-2 transition-colors duration-500 shadow-2xl select-none flex flex-col justify-between p-3 sm:p-5 ${
      flashPhase ? 'bg-rose-950/90 border-rose-600 shadow-rose-900/40' : 'bg-slate-950 border-amber-600/80 shadow-amber-900/30'
    }`}>
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

      {/* Atmospheric Strobe Overlay */}
      <div 
        className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
          flashPhase ? 'opacity-25 bg-red-600' : 'opacity-10 bg-amber-500'
        }`} 
      />

      {/* Header Bar with Emergency Beacon */}
      <div className="relative z-10 flex items-center justify-between border-b border-rose-500/40 pb-2.5">
        <div className="flex items-center gap-2.5">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
            flashPhase ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/50 animate-bounce' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
          }`}>
            <Siren className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-black font-mono tracking-wider text-rose-200 uppercase drop-shadow-sm">
                CRITICAL ENVIRONMENTAL BREACH ALARM
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-black bg-rose-500 text-white animate-pulse">
                CLAUSE 5.2 ALERT
              </span>
            </div>
            <p className="text-[10px] text-rose-300/80 font-mono">
              AURIC M002 · BATTERY STANDARD ROOM TELEMETRY TRIP
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-2 bg-black/60 border border-rose-500/60 rounded-xl px-3 py-1.5 shadow-sm">
          <AlertOctagon className="w-4 h-4 text-rose-400 animate-spin" />
          <div className="text-right">
            <div className="text-[9px] font-mono text-slate-400 uppercase tracking-wider leading-none">
              HVAC STATUS
            </div>
            <div className="text-xs sm:text-sm font-black font-mono text-rose-300 leading-tight">
              BREACHED (OUT OF SPEC)
            </div>
          </div>
        </div>
      </div>

      {/* Telemetry Dashboard Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 my-auto">
        {/* Left Column: Tripped Telemetry Gauges (5 cols) */}
        <div className="md:col-span-5 bg-slate-900/90 rounded-2xl border border-rose-500/40 p-3 sm:p-4 flex flex-col justify-between shadow-lg">
          <div className="text-[11px] font-mono font-bold text-slate-300 flex items-center justify-between pb-1.5 border-b border-slate-800">
            <span>SENSOR TELEMETRY</span>
            <span className="text-rose-400 font-extrabold animate-pulse">SPEC VIOLATION</span>
          </div>

          {/* Tripped Readings */}
          <div className="space-y-2.5 my-2">
            {/* Humidity Breach Card */}
            <div className="bg-rose-950/40 border border-rose-500/50 rounded-xl p-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center">
                  <Droplets className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-400">RELATIVE HUMIDITY</div>
                  <div className="text-lg font-black font-mono text-rose-300">
                    75.2% RH
                  </div>
                </div>
              </div>
              <div className="text-right text-[10px] font-mono">
                <div className="text-slate-400">Allowed: 60–65%</div>
                <div className="text-rose-400 font-bold">+10.2% SPIKE!</div>
              </div>
            </div>

            {/* Temperature Breach Card */}
            <div className="bg-amber-950/40 border border-amber-500/50 rounded-xl p-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Thermometer className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-400">TEMPERATURE</div>
                  <div className="text-lg font-black font-mono text-amber-300">
                    27.4°C
                  </div>
                </div>
              </div>
              <div className="text-right text-[10px] font-mono">
                <div className="text-slate-400">Allowed: 20–25°C</div>
                <div className="text-amber-400 font-bold">+2.4°C ELEVATED</div>
              </div>
            </div>
          </div>

          <div className="text-[10px] font-mono text-rose-300/90 bg-rose-950/60 p-2 rounded-lg border border-rose-500/30 flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
            <span>Condensation risk on battery cell electrodes!</span>
          </div>
        </div>

        {/* Right Column: Crisis Decision & Action Protocol (7 cols) */}
        <div className="md:col-span-7 bg-slate-900/90 rounded-2xl border border-slate-800 p-3 sm:p-4 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-800">
              <span className="text-[11px] font-mono font-bold text-slate-200 uppercase">
                AURIC ESCALATION PROTOCOL (CLAUSE 5.2)
              </span>
              <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-amber-500/20 text-amber-300">
                ACTION REQUIRED
              </span>
            </div>

            {/* 3 Step Protocol Cards */}
            <div className="mt-3 space-y-2">
              <div className="flex items-start gap-2.5 bg-slate-950/80 border border-rose-500/30 rounded-xl p-2.5">
                <span className="w-5 h-5 rounded-md bg-rose-500 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
                  1
                </span>
                <div>
                  <div className="text-xs font-bold text-slate-100">HALT ALL PALLET ENTRY</div>
                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    Stop moving cells through the airlock. Do not expose incoming pallets to high moisture.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 bg-slate-950/80 border border-amber-500/30 rounded-xl p-2.5">
                <span className="w-5 h-5 rounded-md bg-amber-500 text-slate-950 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                  2
                </span>
                <div>
                  <div className="text-xs font-bold text-slate-100">ISOLATE AIRLOCK DOORS</div>
                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    Keep double airlock seals closed to prevent outside warehouse humidity intrusion.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 bg-slate-950/80 border border-sky-500/30 rounded-xl p-2.5">
                <span className="w-5 h-5 rounded-md bg-sky-500 text-slate-950 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                  3
                </span>
                <div className="flex-1">
                  <div className="text-xs font-bold text-slate-100 flex items-center justify-between">
                    <span>ESCALATE TO ZONE LEADER & HVAC</span>
                    <Wrench className="w-3.5 h-3.5 text-sky-400" />
                  </div>
                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    Immediately alert Putaway ZL and Plant Engineering to inspect the dehumidifier HVAC unit.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info Strip */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-rose-500/30 text-[10px] font-mono text-slate-400">
        <div className="flex items-center gap-1.5 text-rose-300">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          <span>SOP Clause 5.2: Never bypass an active environmental trip or force cell stowing</span>
        </div>

        <div className="flex items-center gap-1 text-slate-300">
          <span>Escalation Target:</span>
          <span className="text-amber-300 font-bold">Putaway Zone Leader & Facilities Desk</span>
          <ArrowRight className="w-3 h-3 text-amber-400" />
        </div>
      </div>
    </div>
  );
};
