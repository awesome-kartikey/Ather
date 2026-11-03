import React, { useState, useRef } from 'react';
import { motion, type PanInfo } from 'motion/react';
import {
  Layers,
  CheckCircle2,
  RotateCcw,
  Check,
  X,
  AlertTriangle,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import type { DragDropInteraction, LanguageCode } from '../../engine/story/types';

interface Props {
  interaction: DragDropInteraction;
  lang: LanguageCode;
  onComplete: (isCorrect: boolean) => void;
  disabled?: boolean;
  isAnswered?: boolean;
  isCorrect?: boolean;
  onContinue?: () => void;
  onRetry?: () => void;
  explanationText?: string;
  sopClause?: string;
  xpAward?: number;
}

export const DragDropCard: React.FC<Props> = ({
  interaction,
  lang,
  onComplete,
  disabled = false,
  isAnswered = false,
  isCorrect = false,
  onContinue,
  onRetry,
  explanationText,
  sopClause,
  xpAward = 100
}) => {
  // Map of itemId -> zoneId
  const [assignments, setAssignments] = useState<Record<string, string>>({});
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [hoveredZoneId, setHoveredZoneId] = useState<string | null>(null);

  const zoneRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const unassignedItems = interaction.items.filter((item) => !assignments[item.id]);
  const allAssigned = Object.keys(assignments).length === interaction.items.length;

  const handleItemClick = (itemId: string) => {
    if (disabled || isAnswered) return;
    setSelectedItemId((prev) => (prev === itemId ? null : itemId));
  };

  const handleZoneClick = (zoneId: string) => {
    if (disabled || isAnswered || !selectedItemId) return;
    setAssignments((prev) => ({
      ...prev,
      [selectedItemId]: zoneId
    }));
    setSelectedItemId(null);
  };

  const handleRemoveAssignment = (itemId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabled || isAnswered) return;
    setAssignments((prev) => {
      const next = { ...prev };
      delete next[itemId];
      return next;
    });
  };

  const handleReset = () => {
    if (disabled || isAnswered) return;
    setAssignments({});
    setSelectedItemId(null);
  };

  const handleDrag = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const pt = info.point;
    let foundZone: string | null = null;
    for (const zone of interaction.zones) {
      const el = zoneRefs.current[zone.id];
      if (el) {
        const rect = el.getBoundingClientRect();
        if (pt.x >= rect.left && pt.x <= rect.right && pt.y >= rect.top && pt.y <= rect.bottom) {
          foundZone = zone.id;
          break;
        }
      }
    }
    setHoveredZoneId(foundZone);
  };

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
    itemId: string
  ) => {
    const pt = info.point;
    let targetZoneId: string | null = null;
    for (const zone of interaction.zones) {
      const el = zoneRefs.current[zone.id];
      if (el) {
        const rect = el.getBoundingClientRect();
        if (pt.x >= rect.left && pt.x <= rect.right && pt.y >= rect.top && pt.y <= rect.bottom) {
          targetZoneId = zone.id;
          break;
        }
      }
    }
    setHoveredZoneId(null);
    if (targetZoneId) {
      setAssignments((prev) => ({ ...prev, [itemId]: targetZoneId! }));
      setSelectedItemId(null);
    }
  };

  const handleVerify = () => {
    if (!allAssigned || disabled || isAnswered) return;
    const evaluatedCorrect = interaction.items.every(
      (item) => assignments[item.id] === item.targetZoneId
    );
    onComplete(evaluatedCorrect);
  };

  const selectedItem = interaction.items.find((it) => it.id === selectedItemId);

  return (
    <div className="w-full h-full bg-white rounded-2xl border border-slate-200/90 shadow-sm p-3 sm:p-4 md:p-5 flex flex-col justify-between overflow-hidden select-none">
      {/* 1. Header Bar */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-100 shrink-0">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-200/60">
            <Layers className="w-4 h-4" />
          </div>
          <span className="text-[11px] sm:text-xs font-mono font-bold tracking-wider text-slate-700 uppercase">
            {interaction.zones.length === 3
              ? lang === 'hi'
                ? 'IQC परिणाम वर्गीकरण डेस्क'
                : lang === 'mr'
                ? 'IQC निकाल वर्गीकरण डेस्क'
                : 'IQC Outcome Disposition Desk'
              : lang === 'hi'
              ? 'दस्तावेज़ वर्गीकरण डेस्क'
              : lang === 'mr'
              ? 'कागदपत्र वर्गीकरण डेस्क'
              : 'Document Sorting Desk'}
          </span>
        </div>

        {!isAnswered && (
          <button
            type="button"
            onClick={handleReset}
            className="text-xs font-mono font-bold text-slate-400 hover:text-slate-700 flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* 2. Prompt Title & Subtitle */}
      <div className="py-1 shrink-0 space-y-0.5">
        <h3 className="text-sm sm:text-base md:text-[17px] font-bold text-slate-900 leading-snug">
          {interaction.question?.[lang] ||
            interaction.question?.en ||
            (interaction as any).prompt?.[lang] ||
            (interaction as any).prompt?.en ||
            ''}
        </h3>
        <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
          {selectedItemId
            ? lang === 'hi'
              ? `👉 चयनित: '${selectedItem?.label[lang] || selectedItem?.label.en}' — इसे रखने के लिए गंतव्य डेस्क पर टैप करें।`
              : lang === 'mr'
              ? `👉 निवडले: '${selectedItem?.label[lang] || selectedItem?.label.en}' — ठेवण्यासाठी गंतव्य डेस्कवर टॅप करा.`
              : `👉 Selected: '${selectedItem?.label[lang] || selectedItem?.label.en}' — Tap destination desk below to deposit.`
            : lang === 'hi'
            ? 'दस्तावेज़ कार्ड को सीधे नीचे डेस्क में खींचें, या असाइन करने के लिए कार्ड फिर डेस्क पर टैप करें।'
            : lang === 'mr'
            ? 'कागदपत्र कार्ड थेट खाली डेस्कवर ओढा, किंवा असाइन करण्यासाठी कार्ड आणि मग डेस्कवर टॅप करा.'
            : 'Tap a document card, then tap destination desk to assign (or drag directly).'}
        </p>
      </div>

      {/* 3. Inbound Physical Documents Deck (Compact Horizontal Chips) */}
      {(!isAnswered || unassignedItems.length > 0) && (
        <div className="p-2 sm:p-2.5 bg-slate-50/80 rounded-xl border border-dashed border-slate-300 shrink-0 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
              {lang === 'hi'
                ? `लंबित दस्तावेज़ (${unassignedItems.length} शेष)`
                : lang === 'mr'
                ? `प्रलंबित कागदपत्रे (${unassignedItems.length} शिल्लक)`
                : `Pending Action Items (${unassignedItems.length} remaining)`}
            </span>
            {selectedItemId && (
              <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-blue-600" />
                <span>Tap destination desk</span>
              </span>
            )}
          </div>

          {unassignedItems.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {unassignedItems.map((item) => {
                const isSelected = selectedItemId === item.id;
                const canDrag = !disabled && !isAnswered;

                return (
                  <motion.button
                    key={item.id}
                    type="button"
                    drag={canDrag}
                    dragSnapToOrigin={true}
                    dragElastic={0.15}
                    whileDrag={{
                      scale: 1.05,
                      zIndex: 100,
                      boxShadow: '0 15px 25px -5px rgba(0, 0, 0, 0.25), 0 0 0 2px #2563eb',
                      cursor: 'grabbing'
                    }}
                    whileHover={{ scale: canDrag ? 1.02 : 1 }}
                    whileTap={{ scale: canDrag ? 0.98 : 1 }}
                    onDrag={handleDrag}
                    onDragEnd={(e, info) => handleDragEnd(e, info, item.id)}
                    onClick={() => handleItemClick(item.id)}
                    className={`touch-none select-none min-h-[42px] sm:min-h-[44px] px-3 py-2 rounded-xl text-left flex items-center gap-2 transition-all cursor-grab active:cursor-grabbing border ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-700 shadow-md ring-2 ring-blue-400/40'
                        : 'bg-white text-slate-800 border-slate-200 hover:border-blue-400 hover:shadow-xs'
                    }`}
                  >
                    <span className="text-base sm:text-lg shrink-0">{item.icon}</span>
                    <span className="text-xs sm:text-[13px] font-bold leading-tight">
                      {item.label[lang] || item.label.en}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          ) : (
            <div className="text-xs font-mono text-emerald-700 font-bold py-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>
                {lang === 'hi'
                  ? `सभी ${interaction.items.length} दस्तावेज़ डेस्क पर रखे गए! नीचे सत्यापन करें।`
                  : lang === 'mr'
                  ? `सर्व ${interaction.items.length} कागदपत्रे डेस्कवर ठेवली! खाली पडताळणी करा.`
                  : `All ${interaction.items.length} documents placed on desks! Verify distribution below.`}
              </span>
            </div>
          )}
        </div>
      )}

      {/* 4. Target Reception Zones (Desks) */}
      <div
        className={`grid gap-2.5 sm:gap-3 py-1 flex-1 min-h-0 overflow-y-auto ${
          interaction.zones.length === 3
            ? 'grid-cols-1 md:grid-cols-3'
            : 'grid-cols-1 md:grid-cols-2'
        }`}
      >
        {interaction.zones.map((zone) => {
          const assignedHere = interaction.items.filter((item) => assignments[item.id] === zone.id);
          const isTargetHighlight = selectedItemId !== null;
          const isHovered = hoveredZoneId === zone.id;

          return (
            <div
              key={zone.id}
              ref={(el) => {
                zoneRefs.current[zone.id] = el;
              }}
              onClick={() => handleZoneClick(zone.id)}
              className={`p-3 sm:p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                isHovered
                  ? 'border-blue-500 bg-blue-100/70 shadow-md ring-4 ring-blue-300/40'
                  : isTargetHighlight
                  ? 'border-blue-400 bg-blue-50/50 hover:bg-blue-100/60 shadow-xs ring-1 ring-blue-300'
                  : 'border-slate-200 bg-slate-50/40 hover:bg-white hover:border-slate-300'
              }`}
            >
              {/* Zone Header */}
              <div className="flex items-center justify-between border-b border-slate-200/60 pb-1.5 shrink-0">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-lg shrink-0">{zone.icon}</span>
                  <span className="text-xs sm:text-[13px] font-bold text-slate-900 truncate">
                    {zone.label[lang] || zone.label.en}
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600 shrink-0">
                  {assignedHere.length} assigned
                </span>
              </div>

              {/* Items in this zone */}
              <div className="flex-1 py-1.5 flex flex-col gap-1.5 justify-start min-h-[60px]">
                {assignedHere.map((item) => {
                  const isItemCorrect = item.targetZoneId === zone.id;
                  const targetZone = interaction.zones.find((z) => z.id === item.targetZoneId);

                  return (
                    <div
                      key={item.id}
                      className={`flex items-center justify-between px-2.5 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                        isAnswered
                          ? isItemCorrect
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                            : 'bg-rose-50 border-rose-300 text-rose-950'
                          : 'bg-white border-slate-200 text-slate-800 shadow-2xs'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0 flex-1 truncate">
                        <span className="text-base shrink-0">{item.icon}</span>
                        <span className="truncate">{item.label[lang] || item.label.en}</span>
                      </div>

                      {/* Status chip or remove button */}
                      {isAnswered ? (
                        <div className="ml-2 shrink-0">
                          {isItemCorrect ? (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold flex items-center gap-0.5">
                              <Check className="w-3 h-3 stroke-[2.5]" />
                              <span>Correct</span>
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-mono font-bold flex items-center gap-0.5">
                              <X className="w-3 h-3 stroke-[2.5]" />
                              <span>Belongs to: {targetZone?.label[lang] || targetZone?.label.en}</span>
                            </span>
                          )}
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={(e) => handleRemoveAssignment(item.id, e)}
                          title="Remove item"
                          className="ml-2 w-6 h-6 rounded-md hover:bg-rose-50 hover:text-rose-600 text-slate-400 font-bold flex items-center justify-center transition-colors cursor-pointer shrink-0"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  );
                })}

                {assignedHere.length === 0 && (
                  <div className="h-full flex items-center justify-center text-[11px] font-mono text-slate-400 italic">
                    {lang === 'hi'
                      ? 'दस्तावेज़ रखने के लिए यहाँ टैप करें या ड्रैग करें'
                      : lang === 'mr'
                      ? 'कागदपत्र ठेवण्यासाठी येथे टॅप करा किंवा ड्रॅग करा'
                      : 'Tap to deposit selected document (or drop here)'}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 5. Bottom Action: Verify Button OR In-Place Result Console */}
      {!isAnswered ? (
        <div className="pt-2 shrink-0">
          <button
            type="button"
            disabled={!allAssigned || disabled}
            onClick={handleVerify}
            className={`w-full min-h-[46px] sm:min-h-[50px] px-6 py-2.5 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
              allAssigned && !disabled
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/25 active:scale-98'
                : 'bg-slate-200 text-slate-400 shadow-none cursor-not-allowed'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>
              {lang === 'hi'
                ? 'दस्तावेज़ वितरण सत्यापित करें'
                : lang === 'mr'
                ? 'कागदपत्र वाटप पडताळा'
                : 'Verify Document Distribution'}
            </span>
          </button>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-3 sm:p-3.5 rounded-2xl border transition-all space-y-2 shrink-0 ${
            isCorrect
              ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950 shadow-xs'
              : 'bg-amber-50/90 border-amber-300 text-amber-950 shadow-xs'
          }`}
        >
          {/* Result Header */}
          <div className="flex items-center justify-between gap-2 border-b border-slate-200/60 pb-1.5">
            <div className="flex items-center gap-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 shadow-2xs ${
                  isCorrect
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-amber-100 text-amber-800 border border-amber-300'
                }`}
              >
                {isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                <span>{isCorrect ? 'Correct Decision! SOP Compliant' : 'SOP Deviation Detected'}</span>
              </span>
              {sopClause && (
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                  {sopClause}
                </span>
              )}
            </div>

            {isCorrect ? (
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-200/90 text-emerald-900 text-xs font-mono font-bold">
                +{xpAward} XP
              </span>
            ) : (
              <span className="px-2.5 py-0.5 rounded-full bg-amber-200/90 text-amber-900 text-xs font-mono font-bold">
                {lang === 'hi' ? 'पुनः प्रयास अनुमत' : lang === 'mr' ? 'पुन्हा प्रयत्न करण्याची परवानगी' : 'Retry Allowed'}
              </span>
            )}
          </div>

          {/* Concise 1-Sentence Explanation */}
          {explanationText && (
            <div className="p-2 sm:p-2.5 rounded-xl bg-white/95 border border-slate-200/70 text-xs sm:text-[13px] font-semibold text-slate-800 leading-relaxed flex items-start gap-2 shadow-2xs">
              <span className="text-sm shrink-0">💡</span>
              <span>{explanationText}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between gap-3 pt-0.5">
            {!isCorrect && onRetry ? (
              <button
                type="button"
                onClick={onRetry}
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-bold bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs active:scale-95"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>
                  {lang === 'hi'
                    ? 'पुनः प्रयास करें'
                    : lang === 'mr'
                    ? 'पुन्हा प्रयत्न करा'
                    : 'Retry Sorting'}
                </span>
              </button>
            ) : <div />}

            {onContinue && (
              <button
                type="button"
                onClick={onContinue}
                className={`min-h-[42px] px-6 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 cursor-pointer shadow-md active:scale-95 ${
                  isCorrect
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/25'
                    : 'bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/20'
                }`}
              >
                <span>
                  {lang === 'hi'
                    ? 'कहानी जारी रखें'
                    : lang === 'mr'
                    ? 'कथा पुढे सुरू ठेवा'
                    : 'Continue Story to Next Step'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};
