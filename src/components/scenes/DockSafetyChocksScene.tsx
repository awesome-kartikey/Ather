import React from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface Props {
  isCorrect?: boolean | null;
}

export const DockSafetyChocksScene: React.FC<Props> = ({ isCorrect }) => {
  return (
    <div className="w-full h-full bg-slate-950 p-4 flex flex-col justify-between relative overflow-hidden select-none">
      {/* Dock Bay Visual */}
      <div className="w-full h-full rounded-xl bg-slate-900 border border-slate-700/80 p-3.5 flex flex-col justify-between shadow-2xl relative">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold">
            <ShieldAlert className="w-4 h-4 text-rose-500" />
            <span>CRITICAL SAFETY AUDIT · DOCK 04</span>
          </div>
          <span className="text-[10px] bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2 py-0.5 rounded font-bold uppercase">
            Roll-Away Check
          </span>
        </div>

        {/* Truck Rear Tires Scene */}
        <div className="relative my-auto flex flex-col items-center">
          {/* Truck Rear Profile */}
          <div className="w-48 h-20 bg-slate-800 border-2 border-slate-600 rounded-t-xl flex items-center justify-center relative">
            <div className="text-xs font-bold tracking-widest text-slate-300 font-mono">
              ATHER DOCK 04
            </div>
            {/* Rubber loading cushions */}
            <div className="absolute top-0 right-0 w-3 h-full bg-slate-950 border-l border-slate-700" />
          </div>

          {/* Tires Level */}
          <div className="w-56 h-8 flex items-center justify-around relative -mt-1">
            {/* Left tire */}
            <div className="w-10 h-10 rounded-full bg-slate-950 border-4 border-slate-700 relative flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-slate-500" />
            </div>

            {/* Right tire with Wheel Chock target area */}
            <div className="w-10 h-10 rounded-full bg-slate-950 border-4 border-slate-700 relative flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-slate-500" />
            </div>
          </div>

          {/* Missing Chocks Hazard Pulse Area */}
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            className="mt-2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/40 text-rose-400 text-xs font-bold"
          >
            <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
            <span>NO WHEEL CHOCKS DETECTED</span>
          </motion.div>
        </div>

        {/* Safety Rule Footer */}
        <div className="border-t border-slate-800 pt-2 flex items-center justify-between text-xs font-mono text-slate-400">
          <span>Rule: Engine Off + Chocks Under Tires</span>
          {isCorrect === true && (
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Violation Identified
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
