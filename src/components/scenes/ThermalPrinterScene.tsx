import React from 'react';
import { motion } from 'motion/react';
import { Printer, ScanBarcode, CheckCircle2 } from 'lucide-react';

interface Props {
  isCorrect?: boolean | null;
}

export const ThermalPrinterScene: React.FC<Props> = ({ isCorrect }) => {
  return (
    <div className="w-full h-full bg-slate-950 p-4 flex flex-col justify-between relative overflow-hidden select-none">
      {/* Printer Chassis Graphic */}
      <div className="w-full h-full rounded-xl bg-slate-900 border border-slate-700/80 p-4 flex flex-col items-center justify-between shadow-2xl relative">
        <div className="w-full flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2 text-slate-300 text-xs font-bold font-mono">
            <Printer className="w-4 h-4 text-blue-400" />
            <span>THERMAL PRINTER · YPR_GATEENTRY</span>
          </div>
          <span className="text-[10px] text-emerald-400 font-mono font-bold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> READY
          </span>
        </div>

        {/* Ejected Physical Barcode Pass Slip */}
        <motion.div
          animate={isCorrect === true ? { y: [0, -6, 0] } : { y: 0 }}
          transition={{ duration: 1.5, repeat: isCorrect === true ? Infinity : 0 }}
          className="w-full max-w-[240px] bg-white text-slate-900 rounded-lg p-3 shadow-xl border border-slate-200 font-mono text-[11px] my-auto"
        >
          <div className="flex justify-between items-center border-b border-slate-300 pb-1 mb-1.5 font-bold">
            <span className="text-[10px] text-blue-700 font-sans font-black">ATHER AURIC</span>
            <span className="text-[9px] bg-slate-100 px-1 rounded text-slate-600">PASS</span>
          </div>
          <div className="space-y-0.5 text-[10px] text-slate-600">
            <div>TR NO: <strong className="text-slate-900">GE-AURIC-2026-0842</strong></div>
            <div>VEHICLE: <strong className="text-slate-900">MH-20-DE-4412</strong></div>
          </div>
          {/* Barcode Lines */}
          <div className="my-2 h-9 w-full bg-[repeating-linear-gradient(90deg,#0f172a_0_2px,transparent_2px_4px,#0f172a_4px_5px,transparent_5px_8px)] rounded-xs border border-slate-200" />
          <div className="text-center font-bold text-[9px] tracking-widest text-slate-700">
            *GE-AURIC-2026-0842*
          </div>
        </motion.div>

        {/* Verification Status */}
        <div className="w-full border-t border-slate-800 pt-2 flex items-center justify-between text-xs font-mono">
          <span className="text-slate-400 flex items-center gap-1.5">
            <ScanBarcode className="w-4 h-4 text-blue-400" /> Windshield Slip
          </span>
          {isCorrect === true && (
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Barcode Verified
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
