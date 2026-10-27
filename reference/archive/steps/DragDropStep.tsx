import { useState, useRef, useEffect } from 'react';
import type { DragDropStepData } from '../content/schema';
import type { LanguageCode, TrainingMode, StepResult } from '../engine/types';
import { playFeedbackTone } from '../engine/sound';

interface DragDropStepProps {
  step: DragDropStepData;
  lang: LanguageCode;
  mode: TrainingMode;
  soundEnabled?: boolean;
  vibrationEnabled?: boolean;
  onResult: (result: StepResult) => void;
}

export function DragDropStep({
  step,
  lang,
  mode,
  soundEnabled = true,
  vibrationEnabled = true,
  onResult
}: DragDropStepProps) {
  // Map of itemId -> zoneId where it was successfully dropped
  const [placements, setPlacements] = useState<Record<string, string>>({});
  const [misses, setMisses] = useState<number>(0);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [wrongZoneId, setWrongZoneId] = useState<string | null>(null);

  // Dragging pointer state
  const [dragging, setDragging] = useState<{
    itemId: string;
    x: number;
    y: number;
    startX: number;
    startY: number;
  } | null>(null);

  const hasDraggedRef = useRef(false);

  const remainingItems = step.items.filter((item) => !placements[item.id]);

  const handleDrop = (zoneId: string, itemId: string) => {
    const item = step.items.find((i) => i.id === itemId);
    if (!item) return;

    if (item.targetZoneId === zoneId) {
      // Correct drop
      playFeedbackTone(true, soundEnabled, vibrationEnabled);
      setPlacements((prev) => {
        const next = { ...prev, [itemId]: zoneId };
        // Check if all placed
        if (Object.keys(next).length === step.items.length) {
          setTimeout(() => {
            onResult({ ok: misses === 0, meta: { misses } });
          }, 300);
        }
        return next;
      });
    } else {
      // Incorrect drop
      playFeedbackTone(false, soundEnabled, vibrationEnabled);
      setMisses((m) => m + 1);
      setWrongZoneId(zoneId);
      setTimeout(() => setWrongZoneId(null), 800);
    }

    setSelectedItemId(null);
  };

  // Pointer move & up listeners for fluid touch drag
  useEffect(() => {
    if (!dragging) return;
    hasDraggedRef.current = false;

    const handlePointerMove = (e: PointerEvent) => {
      const distance = Math.hypot(e.clientX - dragging.startX, e.clientY - dragging.startY);
      if (distance > 8) {
        hasDraggedRef.current = true;
      }
      setDragging((prev) => (prev ? { ...prev, x: e.clientX, y: e.clientY } : null));
    };

    const handlePointerUp = (e: PointerEvent) => {
      const dropElem = document.elementFromPoint(e.clientX, e.clientY);
      const zoneNode = dropElem?.closest('[data-zone-id]');
      if (zoneNode && hasDraggedRef.current) {
        const zoneId = (zoneNode as HTMLElement).dataset.zoneId;
        if (zoneId) {
          handleDrop(zoneId, dragging.itemId);
        }
      }
      setDragging(null);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [dragging, placements, misses]);

  return (
    <div className="flex flex-col gap-4 w-full select-none">
      <p className="text-sm sm:text-base font-bold text-ink/80 bg-concrete/60 p-2.5 rounded-lg border-2 border-ink/20">
        👉 {step.instruction[lang]}
      </p>

      {/* Unplaced Items Pool */}
      <div className="flex flex-wrap gap-3 min-h-[76px] p-2 bg-card/60 rounded-xl border-2 border-dashed border-ink/40 items-center justify-start">
        {remainingItems.length === 0 ? (
          <div className="w-full text-center font-heading text-xl text-ok font-bold py-2">
            ✅ All items placed!
          </div>
        ) : (
          remainingItems.map((item) => {
            const isSelected = selectedItemId === item.id;
            const isGuidedHint = mode === 'guided';

            return (
              <button
                key={item.id}
                type="button"
                onPointerDown={(e) => {
                  setDragging({
                    itemId: item.id,
                    x: e.clientX,
                    y: e.clientY,
                    startX: e.clientX,
                    startY: e.clientY
                  });
                }}
                onClick={() => {
                  setSelectedItemId((prev) => (prev === item.id ? null : item.id));
                }}
                className={`flex items-center gap-3 px-4 py-3 min-h-[64px] bg-card rounded-xl border-3 border-ink font-bold text-base sm:text-lg transition-transform active:scale-95 shadow-md cursor-grab active:cursor-grabbing touch-none ${
                  isSelected ? 'border-act ring-4 ring-act/40 bg-act/10' : ''
                } ${isGuidedHint && isSelected ? 'animate-pulse' : ''}`}
              >
                <span className="text-3xl">{item.icon}</span>
                <span>{item.label[lang]}</span>
              </button>
            );
          })
        )}
      </div>

      {/* Drop Zones */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {step.zones.map((zone) => {
          const placedInThisZone = step.items.filter((item) => placements[item.id] === zone.id);
          const isWrong = wrongZoneId === zone.id;
          const isTargetedByGuided =
            mode === 'guided' &&
            selectedItemId &&
            step.items.find((i) => i.id === selectedItemId)?.targetZoneId === zone.id;

          return (
            <div
              key={zone.id}
              data-zone-id={zone.id}
              onClick={() => {
                if (selectedItemId) {
                  handleDrop(zone.id, selectedItemId);
                }
              }}
              className={`flex flex-col items-center justify-start p-4 min-h-[140px] rounded-xl border-3 transition-all cursor-pointer shadow-sm ${
                isWrong
                  ? 'bg-no/20 border-no text-no ring-4 ring-no/40'
                  : isTargetedByGuided
                  ? 'bg-act/15 border-act ring-4 ring-act/50 animate-pulse'
                  : selectedItemId
                  ? 'bg-card border-ink hover:bg-concrete/60 hover:border-act'
                  : 'bg-card border-dashed border-ink/60'
              }`}
            >
              <span className="text-4xl mb-1">{zone.icon}</span>
              <span className="font-heading font-bold text-lg text-ink text-center">
                {zone.label[lang]}
              </span>

              {/* Placed items badges inside this zone */}
              <div className="flex flex-wrap gap-2 mt-3 justify-center w-full">
                {placedInThisZone.map((item) => (
                  <span
                    key={item.id}
                    className="flex items-center gap-1.5 px-2.5 py-1 bg-concrete border-2 border-ink rounded-lg text-xs font-bold text-ink"
                  >
                    <span>{item.icon}</span>
                    <span className="truncate max-w-[90px]">{item.label[lang]}</span>
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Drag Avatar Ghost */}
      {dragging && (
        <div
          className="fixed pointer-events-none z-50 text-4xl -translate-x-1/2 -translate-y-1/2 bg-card border-3 border-ink px-4 py-2 rounded-xl shadow-2xl flex items-center gap-2"
          style={{ left: dragging.x, top: dragging.y }}
        >
          <span>{step.items.find((i) => i.id === dragging.itemId)?.icon}</span>
          <span className="text-sm font-bold text-ink">
            {step.items.find((i) => i.id === dragging.itemId)?.label[lang]}
          </span>
        </div>
      )}
    </div>
  );
}
