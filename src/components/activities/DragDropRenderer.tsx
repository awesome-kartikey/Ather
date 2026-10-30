import React, { useState } from 'react';
import type { DragDropStepData, DragItem, DropZone } from '../../content/schema';
import type { LanguageCode } from '../../engine/types';
import { Layers, ArrowRight, ShieldCheck } from 'lucide-react';
import { VoiceInstructionPlayer } from './VoiceInstructionPlayer';

interface Props {
  step: DragDropStepData;
  lang: LanguageCode;
  onComplete: (answer: any, isCorrect: boolean) => void;
}

export const DragDropRenderer: React.FC<Props> = ({ step, lang, onComplete }) => {
  const [assignments, setAssignments] = useState<Record<string, string>>({});
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const unassignedItems = step.items.filter((item) => !assignments[item.id]);

  const handleSelectItem = (item: DragItem) => {
    if (selectedItemId === item.id) {
      setSelectedItemId(null);
    } else {
      setSelectedItemId(item.id);
    }
  };

  const handleZoneClick = (zone: DropZone) => {
    if (selectedItemId) {
      setAssignments((prev) => ({
        ...prev,
        [selectedItemId]: zone.id
      }));
      setSelectedItemId(null);
    }
  };

  const handleRemoveItem = (itemId: string) => {
    setAssignments((prev) => {
      const next = { ...prev };
      delete next[itemId];
      return next;
    });
  };

  const handleSubmit = () => {
    const allAssigned = step.items.every((it) => !!assignments[it.id]);
    if (!allAssigned) return;

    const allCorrect = step.items.every((it) => assignments[it.id] === it.targetZoneId);
    onComplete(assignments, allCorrect);
  };

  return (
    <div className="flex flex-col gap-4 py-1 select-none font-sans">
      {/* Header Question Card */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs">
        <div className="mb-2 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <Layers className="w-4 h-4" />
            </span>
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-blue-700">
              Document Categorization Station
            </span>
          </div>

          <VoiceInstructionPlayer text={step.question[lang]} lang={lang} audioId={step.audioId} />
        </div>

        <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
          {step.question[lang]}
        </h3>
        <p className="text-xs text-slate-500 font-medium mt-1">
          {step.instruction[lang]}
        </p>
      </div>

      {/* Target Trays / Desks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {step.zones.map((zone: DropZone) => {
          const zoneItems = step.items.filter((item) => assignments[item.id] === zone.id);

          return (
            <div
              key={zone.id}
              onClick={() => handleZoneClick(zone)}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between min-h-[140px] ${
                selectedItemId
                  ? 'border-blue-400 bg-blue-50/40 ring-4 ring-blue-500/10'
                  : 'border-slate-200/90 bg-white hover:border-slate-300 shadow-2xs'
              }`}
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{zone.icon}</span>
                  <span className="font-extrabold text-sm text-slate-900">
                    {zone.label[lang]}
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  {zoneItems.length} filed
                </span>
              </div>

              {/* Slotted Documents inside this tray */}
              <div className="space-y-1.5 flex-1 flex flex-col justify-center">
                {zoneItems.length === 0 ? (
                  <div className="h-full flex items-center justify-center border border-dashed border-slate-200 rounded-xl p-3 text-slate-400 text-xs font-semibold">
                    {selectedItemId ? '👉 Tap here to place paper' : 'Drop papers here'}
                  </div>
                ) : (
                  zoneItems.map((item) => (
                    <div
                      key={item.id}
                      className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200/90 flex items-center justify-between gap-2 shadow-2xs"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span>{item.icon}</span>
                        <span className="text-xs font-bold text-slate-800 truncate">
                          {item.label[lang]}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveItem(item.id);
                        }}
                        className="text-slate-400 hover:text-red-500 font-bold text-xs p-1 cursor-pointer"
                        title="Remove"
                      >
                        ✕
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Available Papers Deck */}
      {unassignedItems.length > 0 && (
        <div className="p-4 rounded-2xl bg-slate-100/70 border border-slate-200/80 flex flex-col gap-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              Incoming Physical Documents ({unassignedItems.length} remaining):
            </span>
            <span className="text-[11px] text-slate-400">Tap document then tap target desk</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {unassignedItems.map((item) => {
              const isSelected = selectedItemId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectItem(item)}
                  className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-600/20 scale-[1.02]'
                      : 'border-slate-200/90 bg-white hover:border-blue-300 text-slate-800 shadow-2xs'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold truncate leading-tight">
                      {item.label[lang]}
                    </span>
                    <span className={`text-[10px] ${isSelected ? 'text-blue-100' : 'text-slate-400'} font-medium`}>
                      {isSelected ? 'Ready to place' : 'Tap to select'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Submit Button */}
      <div className="pt-2 flex justify-end">
        <button
          type="button"
          disabled={unassignedItems.length > 0}
          onClick={handleSubmit}
          className="w-full sm:w-auto min-w-[200px] py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm sm:text-base shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Confirm Document Allocation</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
