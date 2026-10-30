import React from 'react';
import { motion } from 'motion/react';
import { Truck } from 'lucide-react';

interface Props {
  isCorrect?: boolean | null;
}

export const TruckArrivalScene: React.FC<Props> = ({ isCorrect }) => {
  return (
    <div className="w-full h-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-950 relative overflow-hidden flex flex-col justify-between p-4 select-none">
      {/* Background Factory Gate Skyline */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg viewBox="0 0 800 400" className="w-full h-full object-cover">
          <rect x="50" y="100" width="180" height="180" fill="#475569" />
          <rect x="260" y="60" width="300" height="220" fill="#334155" />
          <polygon points="260,60 410,20 560,60" fill="#1e293b" />
          <rect x="580" y="120" width="160" height="160" fill="#475569" />
        </svg>
      </div>

      {/* Roadway & Gate Posts */}
      <div className="relative z-10 my-auto flex items-center justify-between px-6 pt-12 pb-4">
        {/* Approaching Truck */}
        <motion.div
          animate={
            isCorrect === true
              ? { x: [0, 180, 360], opacity: [1, 1, 0] }
              : isCorrect === false
              ? { x: [0, -12, 12, -8, 8, 0] }
              : { x: [0, 8, 0] }
          }
          transition={
            isCorrect === true
              ? { duration: 1.8, ease: 'easeInOut' }
              : isCorrect === false
              ? { duration: 0.5 }
              : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
          }
          className="flex flex-col items-center"
        >
          <div className="w-28 sm:w-36 h-20 bg-gradient-to-r from-blue-700 to-indigo-600 rounded-xl border border-blue-400/40 p-2.5 flex flex-col justify-between shadow-lg shadow-blue-500/20 relative">
            {/* Windshield */}
            <div className="h-6 w-full bg-slate-950/70 rounded-md border border-white/20 flex items-center justify-between px-2 text-[10px] text-blue-200 font-mono">
              <span>MH-20-DE</span>
              <Truck className="w-3.5 h-3.5 text-blue-400" />
            </div>
            {/* Ather Delivery Cargo tag */}
            <div className="text-[10px] font-bold tracking-wider text-white uppercase truncate">
              Ather Logistics
            </div>
            {/* Wheels */}
            <div className="absolute -bottom-3 left-3 w-6 h-6 rounded-full bg-slate-950 border-2 border-slate-600" />
            <div className="absolute -bottom-3 right-3 w-6 h-6 rounded-full bg-slate-950 border-2 border-slate-600" />
          </div>
        </motion.div>

        {/* Boom Barrier Gate */}
        <div className="flex flex-col items-center relative pl-8">
          {/* Security Gate Post */}
          <div className="w-7 h-28 bg-slate-700 rounded-t-lg border border-slate-500 relative flex flex-col items-center pt-2">
            <span
              className={`w-3 h-3 rounded-full ${
                isCorrect === true
                  ? 'bg-emerald-500 shadow-[0_0_12px_#10b981]'
                  : isCorrect === false
                  ? 'bg-rose-500 shadow-[0_0_12px_#f43f5e]'
                  : 'bg-amber-400 shadow-[0_0_8px_#fbbf24]'
              }`}
            />
          </div>

          {/* Boom Barrier Arm */}
          <motion.div
            animate={{
              rotateZ: isCorrect === true ? -75 : 0,
            }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            style={{ transformOrigin: 'right bottom' }}
            className="absolute bottom-6 right-7 w-36 h-3 bg-gradient-to-r from-amber-400 via-slate-900 to-amber-400 rounded-full border border-amber-300 shadow-md"
          />
        </div>
      </div>

      {/* Road Markings */}
      <div className="w-full h-8 bg-slate-900/90 rounded-xl border-t-2 border-slate-700 flex items-center justify-around px-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="w-8 h-1 bg-amber-400/70 rounded-full" />
        ))}
      </div>
    </div>
  );
};
