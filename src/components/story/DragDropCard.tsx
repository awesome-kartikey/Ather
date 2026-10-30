import React, { useState } from 'react';
import { Layers, CheckCircle2, RotateCcw } from 'lucide-react';
import type { DragDropInteraction, LanguageCode } from '../../engine/story/types';

interface Props {
  interaction: DragDropInteraction;
  lang: LanguageCode;
  onComplete: (isCorrect: boolean) => void;
  disabled?: boolean;
}

export const DragDropCard: React.FC<Props> = ({
  interaction,
  lang,
  onComplete,
  disabled
}) => {
  // Map of itemId -> zoneId
  const [assignments, setAssignments] = useState<Record<string, string>>({});
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const unassignedItems = interaction.items.filter((item) => !assignments[item.id]);
  const allAssigned = Object.keys(assignments).length === interaction.items.length;

  const handleItemClick = (itemId: string) => {
    if (disabled) return;
    if (selectedItemId === itemId) {
      setSelectedItemId(null);
    } else {
      setSelectedItemId(itemId);
    }
  };

  const handleZoneClick = (zoneId: string) => {
    if (disabled || !selectedItemId) return;
    setAssignments((prev) => ({
      ...prev,
      [selectedItemId]: zoneId
    }));
    setSelectedItemId(null);
  };

  const handleRemoveAssignment = (itemId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabled) return;
    setAssignments((prev) => {
      const next = { ...prev };
      delete next[itemId];
      return next;
    });
  };

  const handleReset = () => {
    if (disabled) return;
    setAssignments({});
    setSelectedItemId(null);
  };

  const handleVerify = () => {
    if (!allAssigned || disabled) return;

    // Check if every item is in its targetZoneId
    const isCorrect = interaction.items.every(
      (item) => assignments[item.id] === item.targetZoneId
    );
    onComplete(isCorrect);
  };

  return (
    <div className="w-full bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-xl p-4 sm:p-6 space-y-4 select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-200/60">
            <Layers className="w-4 h-4" />
          </div>
          <span className="text-xs font-mono font-bold tracking-wider text-slate-500 uppercase">
            {interaction.zones.length === 3
              ? (lang === 'hi' ? 'IQC परिणाम वर्गीकरण डेस्क' : lang === 'mr' ? 'IQC निकाल वर्गीकरण डेस्क' : 'IQC Outcome Disposition Desk')
              : (lang === 'hi' ? 'दस्तावेज़ वर्गीकरण डेस्क' : lang === 'mr' ? 'कागदपत्र वर्गीकरण डेस्क' : 'Document Sorting Desk')}
          </span>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="text-xs font-mono font-bold text-slate-400 hover:text-slate-600 flex items-center gap-1 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Instruction */}
      <div className="space-y-1">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
          {interaction.question[lang] || interaction.question.en}
        </h3>
        <p className="text-xs text-slate-500 font-medium">
          {interaction.instruction[lang] || interaction.instruction.en}
        </p>
      </div>

      {/* 1. Unassigned Documents / Items Deck */}
      <div className="p-3.5 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
        <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
          {lang === 'hi' ? `आइटम सूची (${unassignedItems.length} शेष)` : lang === 'mr' ? `आयटम यादी (${unassignedItems.length} शिल्लक)` : `Pending Action Items (${unassignedItems.length} remaining)`}
        </div>

        {unassignedItems.length > 0 ? (
          <div className="flex flex-wrap gap-2.5">
            {unassignedItems.map((item) => {
              const isSelected = selectedItemId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleItemClick(item.id)}
                  className={`min-h-[48px] px-3.5 py-2 rounded-xl text-left flex items-center gap-2 transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-700 shadow-md scale-105 ring-2 ring-blue-400/40'
                      : 'bg-white text-slate-800 border-slate-200 hover:border-slate-400 hover:shadow-xs'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-xs sm:text-sm font-bold">
                    {item.label[lang] || item.label.en}
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="text-xs font-mono text-emerald-600 font-bold py-1 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            {lang === 'hi' ? `सभी ${interaction.items.length} आइटम वर्गीकृत! नीचे अपने आवंटन की पुष्टि करें।` : lang === 'mr' ? `सर्व ${interaction.items.length} आयटम वर्गीकृत केले! खाली आपल्या वाटपाची पडताळणी करा.` : `All ${interaction.items.length} items classified! Verify your assignments below.`}
          </div>
        )}
      </div>

      {/* 2. Target Reception Zones */}
      <div className={`grid gap-3.5 pt-1 ${
        interaction.zones.length === 3
          ? 'grid-cols-1 md:grid-cols-3'
          : interaction.zones.length === 2
          ? 'grid-cols-1 md:grid-cols-2'
          : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
      }`}>
        {interaction.zones.map((zone) => {
          const assignedHere = interaction.items.filter(
            (item) => assignments[item.id] === zone.id
          );

          const isTargetHighlight = selectedItemId !== null;

          return (
            <div
              key={zone.id}
              onClick={() => handleZoneClick(zone.id)}
              className={`min-h-[140px] p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                isTargetHighlight
                  ? 'border-blue-400 bg-blue-50/40 hover:bg-blue-50/80 shadow-xs ring-1 ring-blue-300'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              {/* Zone Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{zone.icon}</span>
                  <span className="text-xs font-bold text-slate-800">
                    {zone.label[lang] || zone.label.en}
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  {assignedHere.length} assigned
                </span>
              </div>

              {/* Items in this zone */}
              <div className="flex-1 py-2 flex flex-col gap-1.5 justify-start">
                {assignedHere.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800"
                  >
                    <span className="flex items-center gap-1.5 truncate">
                      <span>{item.icon}</span>
                      <span className="truncate">{item.label[lang] || item.label.en}</span>
                    </span>
                    <button
                      type="button"
                      onClick={(e) => handleRemoveAssignment(item.id, e)}
                      className="ml-2 text-slate-400 hover:text-rose-500 font-bold px-1 rounded cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                ))}

                {assignedHere.length === 0 && (
                  <div className="h-full flex items-center justify-center text-[11px] font-mono text-slate-400 italic">
                    Tap to deposit selected document
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Verify Button (≥64px touch target) */}
      <div className="pt-2">
        <button
          type="button"
          disabled={!allAssigned || disabled}
          onClick={handleVerify}
          className={`w-full min-h-[58px] px-6 py-3.5 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${
            allAssigned && !disabled
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/30'
              : 'bg-slate-200 text-slate-400 shadow-none cursor-not-allowed'
          }`}
        >
          <CheckCircle2 className="w-5 h-5" />
          <span>Verify Document Distribution</span>
        </button>
      </div>
    </div>
  );
};
