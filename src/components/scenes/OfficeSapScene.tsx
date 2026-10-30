import React from 'react';
import { motion } from 'motion/react';
import { Terminal, Database, CheckCircle2 } from 'lucide-react';

interface Props {
  isCorrect?: boolean | null;
}

export const OfficeSapScene: React.FC<Props> = ({ isCorrect }) => {
  return (
    <div className="w-full h-full bg-slate-950 p-4 flex flex-col justify-between relative overflow-hidden select-none font-mono">
      {/* Background terminal matrix glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* SAP Screen Monitor Frame */}
      <div className="w-full h-full rounded-xl bg-slate-900 border border-slate-700/80 p-3.5 flex flex-col justify-between shadow-2xl relative">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-slate-700/80 pb-2 mb-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <span className="text-[11px] font-bold text-slate-300 ml-2">
              SAP GUI · YMM_GATE_ENTRY
            </span>
          </div>
          <span className="text-[10px] text-blue-400 bg-blue-500/15 px-2 py-0.5 rounded border border-blue-400/20 font-bold">
            AURIC M002
          </span>
        </div>

        {/* Mock ERP Data Fields */}
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between bg-slate-950/70 p-2 rounded border border-slate-800">
            <span className="text-slate-400">T-CODE:</span>
            <span className="text-blue-300 font-bold font-mono">YMM_GATE_ENTRY</span>
          </div>

          <div className="flex items-center justify-between bg-slate-950/70 p-2 rounded border border-slate-800">
            <span className="text-slate-400">VENDOR INVOICE:</span>
            <span className="text-emerald-400 font-bold font-mono">INV-TX-990142</span>
          </div>

          <div className="flex items-center justify-between bg-slate-950/70 p-2 rounded border border-slate-800">
            <span className="text-slate-400">ASN STATUS:</span>
            <span className="text-indigo-300 font-bold font-mono">ASN-2026-V889 [VERIFIED]</span>
          </div>

          <div className="flex items-center justify-between bg-slate-950/70 p-2 rounded border border-slate-800">
            <span className="text-slate-400">TRUCK REG:</span>
            <span className="text-slate-200 font-bold font-mono">MH-20-DE-4412</span>
          </div>
        </div>

        {/* Live Status indicator */}
        <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-1.5 text-slate-400">
            <Database className="w-3.5 h-3.5 text-blue-400" />
            <span>ERP Connection: Active</span>
          </div>

          {isCorrect === true ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center gap-1 text-emerald-400 font-bold"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>RECORD SAVED</span>
            </motion.div>
          ) : (
            <div className="flex items-center gap-1 text-slate-500 font-mono">
              <Terminal className="w-3.5 h-3.5" />
              <span>Awaiting T-Code Execution</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
