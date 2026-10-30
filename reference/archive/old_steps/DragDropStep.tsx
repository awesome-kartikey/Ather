import { useState } from 'react';
import type { DragDropStepData, DragItem, DropZone } from '../content/schema';
import type { LanguageCode } from '../engine/types';
import { CheckCircle2, XCircle, ArrowRightLeft, FileCheck2 } from 'lucide-react';
import { TactileButton } from '../components/TactileButton';

interface DragDropStepProps {
  step: DragDropStepData;
  lang: LanguageCode;
  isAnswered: boolean;
  onComplete: (correct: boolean) => void;
}

export function DragDropStep({ step, lang, isAnswered, onComplete }: DragDropStepProps) {
  // Map of itemId -> zoneId
  const [assignments, setAssignments] = useState<Record<string, string>>({});
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const unassignedItems = step.items.filter((item) => !assignments[item.id]);

  const handleSelectItem = (item: DragItem) => {
    if (isAnswered) return;
    if (selectedItemId === item.id) {
      setSelectedItemId(null);
    } else {
      setSelectedItemId(item.id);
    }
  };

  const handleZoneClick = (zone: DropZone) => {
    if (isAnswered) return;
    if (selectedItemId) {
      setAssignments((prev) => ({
        ...prev,
        [selectedItemId]: zone.id
      }));
      setSelectedItemId(null);
    }
  };

  const handleRemoveItem = (itemId: string) => {
    if (isAnswered) return;
    setAssignments((prev) => {
      const next = { ...prev };
      delete next[itemId];
      return next;
    });
  };

  // Drag and drop HTML5 handlers
  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    if (isAnswered) return;
    e.dataTransfer.setData('text/plain', itemId);
  };

  const handleDrop = (e: React.DragEvent, zoneId: string) => {
    e.preventDefault();
    if (isAnswered) return;
    const itemId = e.dataTransfer.getData('text/plain');
    if (itemId) {
      setAssignments((prev) => ({
        ...prev,
        [itemId]: zoneId
      }));
      if (selectedItemId === itemId) setSelectedItemId(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleVerify = () => {
    if (isAnswered) return;
    // Check if all items are assigned correctly
    const allAssigned = step.items.every((it) => !!assignments[it.id]);
    if (!allAssigned) return;

    const allCorrect = step.items.every((it) => assignments[it.id] === it.targetZoneId);
    onComplete(allCorrect);
  };

  return (
    <div className="flex flex-col gap-5 w-full select-none">
      {/* Interaction Instruction Banner */}
      <div className="bg-concrete/70 border-2 border-ink/40 p-3 rounded-xl flex items-center justify-between text-xs sm:text-sm font-semibold text-ink/80">
        <span className="flex items-center gap-2">
          <ArrowRightLeft className="w-4 h-4 text-act shrink-0" />
          {step.instruction[lang]}
        </span>
        <span className="font-mono text-xs bg-card px-2 py-0.5 rounded border border-ink/30 font-bold">
          {unassignedItems.length} left
        </span>
      </div>

      {/* Target Desk Trays */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {step.zones.map((zone) => {
          const zoneItems = step.items.filter((item) => assignments[item.id] === zone.id);

          return (
            <div
              key={zone.id}
              onClick={() => handleZoneClick(zone)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, zone.id)}
              className={`min-h-[160px] p-4 rounded-2xl border-3 border-ink bg-card shadow-[4px_4px_0px_#14232b] flex flex-col justify-between transition-all cursor-pointer ${
                selectedItemId
                  ? 'ring-4 ring-act/60 bg-act/5 border-act scale-[1.01]'
                  : 'hover:bg-concrete/30'
              }`}
            >
              {/* Tray Header */}
              <div className="flex items-center justify-between border-b-2 border-ink/20 pb-2.5 mb-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{zone.icon}</span>
                  <span className="font-heading font-extrabold text-lg sm:text-xl text-ink">
                    {zone.label[lang]}
                  </span>
                </div>
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-full bg-concrete border border-ink/40">
                  {zoneItems.length} papers
                </span>
              </div>

              {/* Slotted Documents inside this tray */}
              <div className="flex flex-col gap-2 min-h-[64px]">
                {zoneItems.length === 0 ? (
                  <div className="h-full flex items-center justify-center border-2 border-dashed border-ink/30 rounded-xl p-3 text-ink/40 font-heading text-sm font-bold uppercase tracking-wider">
                    {selectedItemId
                      ? '👉 Tap here to place selected paper'
                      : 'Drop / Assign papers here'}
                  </div>
                ) : (
                  zoneItems.map((item) => {
                    const isItemCorrect = item.targetZoneId === zone.id;
                    let badgeStyle = 'bg-concrete border-2 border-ink shadow-[2px_2px_0px_#14232b]';

                    if (isAnswered) {
                      badgeStyle = isItemCorrect
                        ? 'bg-ok/20 border-2 border-ok text-ink ring-2 ring-ok'
                        : 'bg-no/20 border-2 border-no text-ink ring-2 ring-no';
                    }

                    return (
                      <div
                        key={item.id}
                        className={`min-h-[48px] px-3.5 py-2 rounded-xl flex items-center justify-between gap-3 text-left transition-all ${badgeStyle}`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-xl">{item.icon}</span>
                          <span className="font-heading font-bold text-base text-ink">
                            {item.label[lang]}
                          </span>
                        </div>

                        {/* Removal button before verify */}
                        {!isAnswered ? (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveItem(item.id);
                            }}
                            className="px-2 py-0.5 text-xs font-heading font-black bg-card hover:bg-no hover:text-card rounded border border-ink/50"
                          >
                            ✕
                          </button>
                        ) : isItemCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-ok shrink-0" />
                        ) : (
                          <XCircle className="w-5 h-5 text-no shrink-0" />
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Unassigned Documents Deck */}
      {unassignedItems.length > 0 && (
        <div className="bg-card p-4 rounded-2xl border-3 border-ink shadow-[4px_4px_0px_#14232b] flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="font-heading font-extrabold text-base uppercase text-ink/80 flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-act" />
              Incoming Physical Papers (Driver Folder):
            </span>
            <span className="text-xs text-ink/60 font-semibold">
              Tap a paper to select, then tap destination desk
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {unassignedItems.map((item) => {
              const isSelected = selectedItemId === item.id;

              return (
                <div
                  key={item.id}
                  draggable={!isAnswered}
                  onDragStart={(e) => handleDragStart(e, item.id)}
                  onClick={() => handleSelectItem(item)}
                  className={`min-h-[64px] p-3 rounded-xl border-2 border-ink flex items-center gap-3 transition-all cursor-pointer shadow-[3px_3px_0px_#14232b] active:translate-x-[1px] active:translate-y-[1px] ${
                    isSelected
                      ? 'bg-act text-card ring-3 ring-ink scale-105'
                      : 'bg-concrete/50 hover:bg-concrete text-ink'
                  }`}
                >
                  <span className="text-2xl shrink-0">{item.icon}</span>
                  <div className="flex flex-col">
                    <span className="font-heading font-bold text-base leading-tight">
                      {item.label[lang]}
                    </span>
                    <span className="text-[11px] opacity-75 font-mono">
                      {isSelected ? '✓ SELECTED — TAP DESTINATION' : 'READY TO SORT'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Verify Button */}
      {!isAnswered && (
        <div className="flex justify-end pt-2">
          <TactileButton
            variant="primary"
            size="lg"
            disabled={unassignedItems.length > 0}
            onClick={handleVerify}
            className="w-full sm:w-auto min-w-[240px]"
          >
            {lang === 'hi'
              ? 'दस्तावेज़ वितरण सत्यापित करें'
              : lang === 'mr'
              ? 'कागदपत्र वाटप तपासा'
              : 'VERIFY DESK ALLOCATION'}
          </TactileButton>
        </div>
      )}
    </div>
  );
}
