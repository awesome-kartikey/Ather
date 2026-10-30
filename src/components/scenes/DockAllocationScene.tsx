import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation } from 'lucide-react';

interface Props {
  isCorrect?: boolean | null;
}

export const DockAllocationScene: React.FC<Props> = ({ isCorrect }) => {
  return (
    <div className="w-full h-full bg-slate-950 p-4 flex flex-col justify-between relative overflow-hidden select-none">
      {/* Aerial Floor Graphic */}
      <div className="w-full h-full rounded-xl bg-slate-900 border border-slate-700/80 p-3 flex flex-col justify-between shadow-2xl relative">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <span className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5">
            <Navigation className="w-3.5 h-3.5 text-blue-400" />
            AURIC INBOUND YARD LAYOUT
          </span>
          <span className="text-[10px] text-blue-400 font-mono font-bold">
            YMM_DOCK_ALLOCATE
          </span>
        </div>

        {/* 3 Dock Bays Layout */}
        <div className="grid grid-cols-3 gap-2 my-auto">
          {/* Bay A: Battery Cell Room */}
          <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800 flex flex-col items-center text-center">
            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">BAY A</span>
            <span className="text-xs font-extrabold text-slate-300 mt-1">Dock 01</span>
            <span className="text-[9px] text-amber-400 mt-1">20-25°C Controlled</span>
          </div>

          {/* Bay B: Vehicle Parts Dock 04 (Allocated) */}
          <motion.div
            animate={
              isCorrect === true
                ? { scale: [1, 1.05, 1], borderColor: ['#3b82f6', '#10b981', '#3b82f6'] }
                : { scale: 1 }
            }
            transition={{ duration: 1.5, repeat: isCorrect === true ? Infinity : 0 }}
            className={`p-2.5 rounded-lg border-2 flex flex-col items-center text-center relative ${
              isCorrect === true
                ? 'bg-emerald-950/50 border-emerald-500 shadow-md shadow-emerald-500/20'
                : 'bg-blue-950/40 border-blue-500/70'
            }`}
          >
            <div className="absolute -top-2 bg-blue-500 text-white text-[9px] px-1.5 py-0.2 rounded-full font-bold flex items-center gap-0.5">
              <MapPin className="w-2.5 h-2.5" /> ALLOCATED
            </div>
            <span className="text-[10px] font-mono text-blue-300 uppercase font-bold mt-1">BAY B</span>
            <span className="text-xs font-extrabold text-white mt-0.5">Dock 04</span>
            <span className="text-[9px] text-emerald-300 mt-1">Vehicle Assembly</span>
          </motion.div>

          {/* Bay C: Chemicals */}
          <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800 flex flex-col items-center text-center">
            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">BAY C</span>
            <span className="text-xs font-extrabold text-slate-300 mt-1">Dock 06</span>
            <span className="text-[9px] text-rose-400 mt-1">Flammables Only</span>
          </div>
        </div>

        {/* Status Prompt */}
        <div className="border-t border-slate-800 pt-2 flex items-center justify-between text-xs font-mono text-slate-400">
          <span>Route: Main Gate ➔ Dock 04</span>
          {isCorrect === true && (
            <span className="text-emerald-400 font-bold">Bay Slip Assigned ✓</span>
          )}
        </div>
      </div>
    </div>
  );
};
