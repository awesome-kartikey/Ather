import React, { useState, useRef, useCallback } from 'react';
import { motion, type PanInfo } from 'motion/react';
import type { DragDropStepData, DragItem, DropZone } from '../../content/schema';
import type { LanguageCode } from '../../engine/types';
import { Layers, ArrowRight, ShieldCheck, GripVertical, ArrowDown, X, Sparkles } from 'lucide-react';
import { VoiceInstructionPlayer } from './VoiceInstructionPlayer';

interface Props {
  step: DragDropStepData;
  lang: LanguageCode;
  onComplete: (answer: any, isCorrect: boolean) => void;
}

export const DragDropRenderer: React.FC<Props> = ({ step, lang, onComplete }) => {
  const [assignments, setAssignments] = useState<Record<string, string>>({});
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [hoveredZoneId, setHoveredZoneId] = useState<string | null>(null);
  const [draggingItemId, setDraggingItemId] = useState<string | null>(null);

  const isDraggingRef = useRef(false);
  const zoneRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const unassignedItems = step.items.filter((item) => !assignments[item.id]);

  const getZoneAtCoordinates = useCallback(
    (x: number, y: number): string | null => {
      for (const zone of step.zones) {
        const el = zoneRefs.current[zone.id];
        if (el) {
          const rect = el.getBoundingClientRect();
          if (
            x >= rect.left - 16 &&
            x <= rect.right + 16 &&
            y >= rect.top - 16 &&
            y <= rect.bottom + 16
          ) {
            return zone.id;
          }
        }
      }
      return null;
    },
    [step.zones]
  );

  const handleDragStart = (itemId: string) => {
    isDraggingRef.current = true;
    setDraggingItemId(itemId);
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(15);
      } catch {
        /* ignore */
      }
    }
  };

  const handleDrag = (_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const zoneId = getZoneAtCoordinates(info.point.x, info.point.y);
    if (zoneId !== hoveredZoneId) {
      setHoveredZoneId(zoneId);
    }
  };

  const handleDragEnd = (
    _e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
    itemId: string
  ) => {
    const targetZoneId = getZoneAtCoordinates(info.point.x, info.point.y);
    if (targetZoneId) {
      setAssignments((prev) => ({
        ...prev,
        [itemId]: targetZoneId
      }));
      setSelectedItemId(null);
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        try {
          navigator.vibrate(30);
        } catch {
          /* ignore */
        }
      }
    }
    setHoveredZoneId(null);
    setDraggingItemId(null);
    setTimeout(() => {
      isDraggingRef.current = false;
    }, 100);
  };

  const handleSelectItem = (item: DragItem) => {
    if (isDraggingRef.current) return;
    if (selectedItemId === item.id) {
      setSelectedItemId(null);
    } else {
      setSelectedItemId(item.id);
    }
  };

  const handleZoneClick = (zone: DropZone) => {
    if (isDraggingRef.current || !selectedItemId) return;
    setAssignments((prev) => ({
      ...prev,
      [selectedItemId]: zone.id
    }));
    setSelectedItemId(null);
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(25);
      } catch {
        /* ignore */
      }
    }
  };

  const handleRemoveItem = (itemId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setAssignments((prev) => {
      const next = { ...prev };
      delete next[itemId];
      return next;
    });
    if (selectedItemId === itemId) setSelectedItemId(null);
  };

  const handleSubmit = () => {
    const allAssigned = step.items.every((it) => !!assignments[it.id]);
    if (!allAssigned) return;

    const allCorrect = step.items.every((it) => assignments[it.id] === it.targetZoneId);
    onComplete(assignments, allCorrect);
  };

  const selectedItem = step.items.find((it) => it.id === selectedItemId);

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
          const isHovered = hoveredZoneId === zone.id;
          const isTargetHighlight = selectedItemId !== null;

          return (
            <div
              key={zone.id}
              ref={(el) => {
                zoneRefs.current[zone.id] = el;
              }}
              onClick={() => handleZoneClick(zone)}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between min-h-[150px] ${
                isHovered
                  ? 'border-blue-500 bg-blue-100/60 ring-4 ring-blue-400/30 shadow-md scale-[1.01]'
                  : isTargetHighlight
                  ? 'border-blue-400 bg-blue-50/50 hover:bg-blue-100/40 shadow-xs ring-2 ring-blue-300 border-dashed'
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
              <div className="space-y-1.5 flex-1 flex flex-col justify-start">
                {zoneItems.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ scale: 0.9, opacity: 0, y: -4 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200/90 flex items-center justify-between gap-2 shadow-2xs"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-xs font-bold text-slate-800 truncate">
                        {item.label[lang]}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => handleRemoveItem(item.id, e)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-200/50 hover:bg-rose-100 hover:text-rose-600 text-slate-500 font-bold text-xs cursor-pointer active:scale-95 transition-all"
                      title="Remove"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                ))}

                {isHovered ? (
                  <div className="h-full min-h-[48px] flex items-center justify-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-100/50 rounded-xl border border-blue-300 animate-pulse">
                    <ArrowDown className="w-4 h-4 animate-bounce text-blue-600" />
                    <span>Drop document here</span>
                  </div>
                ) : isTargetHighlight ? (
                  <div className="h-full min-h-[48px] flex items-center justify-center gap-1.5 text-xs font-bold text-blue-600 bg-blue-50/70 rounded-xl border border-blue-200/60">
                    <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                    <span>Tap to place '{selectedItem?.label[lang]}'</span>
                  </div>
                ) : zoneItems.length === 0 ? (
                  <div className="h-full min-h-[48px] flex items-center justify-center border border-dashed border-slate-200 rounded-xl p-3 text-slate-400 text-xs font-semibold">
                    Drag or tap to deposit papers
                  </div>
                ) : null}
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
            <span className="text-[11px] text-slate-400">Drag or tap document to assign</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {unassignedItems.map((item) => {
              const isSelected = selectedItemId === item.id;
              const isCurrentlyDragging = draggingItemId === item.id;
              return (
                <motion.div
                  key={item.id}
                  drag
                  dragSnapToOrigin={true}
                  dragElastic={0.15}
                  whileDrag={{
                    scale: 1.05,
                    zIndex: 100,
                    rotate: 1.5,
                    boxShadow: '0 20px 30px -8px rgba(0, 0, 0, 0.28), 0 0 0 2px #2563eb',
                    cursor: 'grabbing'
                  }}
                  onDragStart={() => handleDragStart(item.id)}
                  onDrag={handleDrag}
                  onDragEnd={(e, info) => handleDragEnd(e, info, item.id)}
                  onClick={() => handleSelectItem(item)}
                  className={`touch-none select-none p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-grab active:cursor-grabbing ${
                    isSelected
                      ? 'border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-600/20 scale-[1.02]'
                      : isCurrentlyDragging
                      ? 'border-blue-400 bg-blue-50 text-blue-900 shadow-sm'
                      : 'border-slate-200/90 bg-white hover:border-blue-300 text-slate-800 shadow-2xs'
                  }`}
                >
                  <span className={`shrink-0 ${isSelected ? 'text-blue-200' : 'text-slate-400'}`}>
                    <GripVertical className="w-4 h-4" />
                  </span>
                  <span className="text-xl">{item.icon}</span>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold truncate leading-tight">
                      {item.label[lang]}
                    </span>
                    <span className={`text-[10px] ${isSelected ? 'text-blue-100' : 'text-slate-400'} font-medium`}>
                      {isSelected ? 'Ready to place' : 'Drag or tap'}
                    </span>
                  </div>
                </motion.div>
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
          className="w-full sm:w-auto min-w-[200px] min-h-[52px] px-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm sm:text-base shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
        >
          <span>Confirm Document Allocation</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};