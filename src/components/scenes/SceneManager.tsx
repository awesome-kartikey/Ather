import React from 'react';
import type { StepData } from '../../content/schema';
import type { LanguageCode } from '../../engine/types';
import { TruckArrivalScene } from './TruckArrivalScene';
import { OfficeSapScene } from './OfficeSapScene';
import { ThermalPrinterScene } from './ThermalPrinterScene';
import { DockAllocationScene } from './DockAllocationScene';
import { DockSafetyChocksScene } from './DockSafetyChocksScene';
import { Truck, Monitor, Printer, MapPin, ShieldAlert } from 'lucide-react';

interface SceneManagerProps {
  step: StepData;
  lang: LanguageCode;
  isCorrect?: boolean | null;
}

export const SceneManager: React.FC<SceneManagerProps> = ({ step, lang, isCorrect }) => {
  // Determine scene config based on step ID
  const getSceneMeta = () => {
    switch (step.id) {
      case 'rec_s1_doc_verify':
        return {
          title: 'Gate 1 · Supplier Truck Entry',
          location: 'Ather AURIC Inbound Yard',
          icon: <Truck className="w-5 h-5 text-white" />,
          tone: 'from-blue-600 to-indigo-700',
          component: <TruckArrivalScene isCorrect={isCorrect} />,
        };
      case 'rec_s1_sap_code':
        return {
          title: 'DEO Terminal · ERP Gate Pass',
          location: 'Security Gate Office · SAP Station',
          icon: <Monitor className="w-5 h-5 text-white" />,
          tone: 'from-indigo-600 to-blue-800',
          component: <OfficeSapScene isCorrect={isCorrect} />,
        };
      case 'rec_s1_print_barcode':
        return {
          title: 'Thermal Printer · Windshield Label',
          location: 'DEO Counter · YPR_GATEENTRY',
          icon: <Printer className="w-5 h-5 text-white" />,
          tone: 'from-cyan-600 to-blue-700',
          component: <ThermalPrinterScene isCorrect={isCorrect} />,
        };
      case 'rec_s1_dock_alloc':
        return {
          title: 'Inbound Bay · Dock Allocation',
          location: 'Plant M002 Layout · YMM_DOCK_ALLOCATE',
          icon: <MapPin className="w-5 h-5 text-white" />,
          tone: 'from-blue-600 to-indigo-600',
          component: <DockAllocationScene isCorrect={isCorrect} />,
        };
      case 'rec_s1_safety_chocks':
        return {
          title: 'Dock 04 · Physical Safety Inspection',
          location: 'Inbound Bay B · Unloading Bay',
          icon: <ShieldAlert className="w-5 h-5 text-white" />,
          tone: 'from-amber-600 to-rose-700',
          component: <DockSafetyChocksScene isCorrect={isCorrect} />,
        };
      default:
        return {
          title: 'AURIC Plant Inbound Flow',
          location: 'Chhatrapati Sambhajinagar',
          icon: <Truck className="w-5 h-5 text-white" />,
          tone: 'from-blue-600 to-indigo-700',
          component: <TruckArrivalScene isCorrect={isCorrect} />,
        };
    }
  };

  const scene = getSceneMeta();

  const status =
    isCorrect === true
      ? 'SOP action accepted'
      : isCorrect === false
      ? 'SOP violation detected'
      : 'Awaiting decision';

  return (
    <div className="relative w-full h-full min-h-[300px] lg:min-h-[360px] overflow-hidden rounded-2xl bg-slate-950 text-white shadow-2xl ring-1 ring-slate-900/10 flex flex-col justify-between">
      {/* Background Interactive Visual Scene */}
      <div className="absolute inset-0">
        {scene.component}
      </div>

      {/* Top Telemetry Overlay Header */}
      <div className="pointer-events-none relative z-20 bg-gradient-to-b from-slate-950/85 via-slate-950/40 to-transparent px-4 py-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <span
              className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${scene.tone} shadow-md`}
            >
              {scene.icon}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-extrabold text-white leading-tight">
                {scene.title}
              </p>
              <p className="truncate text-[10px] font-bold uppercase tracking-widest text-white/70">
                {scene.location}
              </p>
            </div>
          </div>

          <div
            className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest backdrop-blur-md transition-all ${
              isCorrect === true
                ? 'border-emerald-300/40 bg-emerald-500/20 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                : isCorrect === false
                ? 'border-rose-300/40 bg-rose-500/20 text-rose-300 shadow-[0_0_12px_rgba(244,63,94,0.3)]'
                : 'border-white/20 bg-white/10 text-white/80'
            }`}
          >
            {status}
          </div>
        </div>
      </div>

      {/* Bottom Situation Description Strip */}
      <div className="pointer-events-none relative z-20 mx-3 mb-3 rounded-xl border border-white/15 bg-slate-950/75 p-3 shadow-2xl backdrop-blur-md">
        <p className="line-clamp-2 text-xs sm:text-sm font-semibold leading-snug text-white/95 font-sans">
          {step.question[lang]}
        </p>
      </div>
    </div>
  );
};
