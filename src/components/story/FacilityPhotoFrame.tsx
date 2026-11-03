import React from 'react';
import { Layers } from 'lucide-react';

interface Props {
  imageSrc: string;
  propSrc?: string;
  title?: string;
  sopClause?: string;
  isPaused: boolean;
  onToggleToBlueprint: () => void;
}

export const FacilityPhotoFrame: React.FC<Props> = ({
  imageSrc,
  propSrc,
  title,
  onToggleToBlueprint
}) => {
  return (
    <div className="relative w-full h-full bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-md select-none group">
      {/* Authentic High-Res Photograph */}
      <img
        src={imageSrc}
        alt={title || 'Ather Facility'}
        className="absolute inset-0 w-full h-full object-cover filter brightness-95 contrast-105"
      />

      {/* Subtle Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />

      {/* Optional Prop Badge in Bottom-Left */}
      {propSrc && (
        <div className="absolute bottom-2.5 left-2.5 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-700/80 text-white text-[10px] font-mono font-bold shadow-xs backdrop-blur-xs">
          <img src={propSrc} alt="SOP Equipment" className="w-4 h-4 object-contain" />
          <span>SOP TOOL</span>
        </div>
      )}

      {/* View Mode Toggle Pill (Top-Right): Switch back to Interactive Simulation */}
      <div className="absolute top-2.5 right-2.5 z-10 opacity-85 group-hover:opacity-100 transition-opacity">
        <button
          type="button"
          onClick={onToggleToBlueprint}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-slate-900/85 hover:bg-slate-900 text-emerald-300 border border-emerald-500/50 shadow-md transition-all cursor-pointer backdrop-blur-xs"
          title="Switch to Interactive SOP Simulation"
        >
          <Layers className="w-3.5 h-3.5 text-emerald-400" />
          <span className="hidden sm:inline">SIMULATION</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </button>
      </div>
    </div>
  );
};
