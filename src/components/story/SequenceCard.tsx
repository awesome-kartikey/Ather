import React, { useState } from 'react';
import { Reorder, motion } from 'motion/react';
import {
  ArrowUp,
  ArrowDown,
  CheckCircle2,
  RotateCcw,
  ListOrdered,
  GripVertical,
  Check,
  X,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import type { SequenceInteraction, LanguageCode } from '../../engine/story/types';

interface Props {
  interaction: SequenceInteraction;
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

export const SequenceCard: React.FC<Props> = ({
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
  xpAward
}) => {
  const steps = interaction.steps || (interaction as any).items || [];
  const questionText = interaction.question || (interaction as any).prompt;

  // Derive authoritative chronological sequence
  const correctIds: string[] =
    interaction.correctOrder ||
    (steps as any[])
      .slice()
      .sort((a: any, b: any) => (a.correctOrder || 0) - (b.correctOrder || 0))
      .map((s: any) => s.id) ||
    [];

  // Initial shuffle so the user has to sort it
  const [orderedIds, setOrderedIds] = useState<string[]>(() => {
    const ids = steps.map((s: any) => s.id);
    return [...ids].reverse();
  });

  const handleMoveUp = (index: number) => {
    if (disabled || isAnswered || index === 0) return;
    setOrderedIds((prev) => {
      const next = [...prev];
      const temp = next[index - 1];
      next[index - 1] = next[index];
      next[index] = temp;
      return next;
    });
  };

  const handleMoveDown = (index: number) => {
    if (disabled || isAnswered || index === orderedIds.length - 1) return;
    setOrderedIds((prev) => {
      const next = [...prev];
      const temp = next[index + 1];
      next[index + 1] = next[index];
      next[index] = temp;
      return next;
    });
  };

  const handleReset = () => {
    if (disabled || isAnswered) return;
    setOrderedIds([...steps.map((s: any) => s.id)].reverse());
  };

  const handleVerify = () => {
    if (disabled || isAnswered) return;
    const evaluatedCorrect = orderedIds.every((id, idx) => id === correctIds[idx]);
    onComplete(evaluatedCorrect);
  };

  return (
    <div className="w-full h-full bg-white rounded-2xl border border-slate-200/90 shadow-sm p-3.5 sm:p-5 flex flex-col justify-between overflow-hidden select-none">
      {/* 1. Header & Context Section */}
      <div className="shrink-0 space-y-1.5 pb-2.5 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-blue-50 border border-blue-200 text-[10px] sm:text-[11px] font-mono font-bold text-blue-700 tracking-wider uppercase flex items-center gap-1.5">
              <ListOrdered className="w-3.5 h-3.5" />
              <span>Process Sequence Builder</span>
            </span>
            <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
              {steps.length} {lang === 'hi' ? 'चरण' : lang === 'mr' ? 'पायऱ्या' : 'Steps'}
            </span>
          </div>

          {!isAnswered && (
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-mono font-bold text-slate-400 hover:text-slate-700 flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>

        <div>
          <h3 className="text-sm sm:text-base md:text-lg font-bold text-slate-900 leading-snug tracking-tight">
            {questionText?.[lang] || questionText?.en || ''}
          </h3>
          <p className="text-[11px] sm:text-xs text-slate-500 font-medium flex items-center gap-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span>
              {lang === 'hi'
                ? 'टच स्क्रीन: सही क्रम में लगाने के लिए कार्ड को ऊपर या नीचे खींचें (या तीरों का उपयोग करें)।'
                : lang === 'mr'
                ? 'टच स्क्रीन: योग्य कालक्रमानुसार लावण्यासाठी कार्ड वर किंवा खाली ओढा (किंवा बाण वापरा).'
                : 'Touch screen: Drag cards up or down to arrange in chronological order (or use the arrow buttons).'}
            </span>
          </p>
        </div>
      </div>

      {/* 2. Reorderable Steps List Stack (Touch-Friendly Drag & Drop) */}
      <div className="flex-1 min-h-0 flex flex-col justify-center py-2 overflow-hidden">
        <Reorder.Group
          axis="y"
          values={orderedIds}
          onReorder={setOrderedIds}
          className="flex flex-col gap-2 sm:gap-2.5 overflow-hidden"
        >
          {orderedIds.map((stepId, index) => {
            const stepItem = steps.find((s: any) => s.id === stepId);
            if (!stepItem) return null;

            const isPositionCorrect = isAnswered && correctIds[index] === stepId;
            const expectedPosition = correctIds.indexOf(stepId) + 1;
            const canDrag = !disabled && !isAnswered;

            return (
              <Reorder.Item
                key={stepId}
                value={stepId}
                dragListener={canDrag}
                whileDrag={{
                  scale: 1.02,
                  zIndex: 50,
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                  borderColor: '#2563eb'
                }}
                className={`touch-none select-none relative p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border-2 transition-all flex items-center justify-between gap-3 shadow-2xs ${
                  isAnswered
                    ? isPositionCorrect
                      ? 'bg-emerald-50/70 border-emerald-400 text-emerald-950'
                      : 'bg-rose-50/70 border-rose-300 text-rose-950'
                    : 'bg-white border-slate-200/90 hover:border-blue-400 hover:shadow-xs text-slate-800'
                } ${canDrag ? 'cursor-grab active:cursor-grabbing' : ''}`}
              >
                {/* Left Section: Drag Grip + Step Pill + Icon + Label */}
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                  {/* Tactile Drag Grip Indicator */}
                  {!isAnswered && (
                    <div className="text-slate-300 hover:text-blue-600 transition-colors shrink-0 cursor-grab active:cursor-grabbing p-0.5">
                      <GripVertical className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                  )}

                  {/* Step Sequence Badge */}
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl font-mono font-black text-xs sm:text-sm flex items-center justify-center shrink-0 shadow-2xs transition-colors ${
                      isAnswered
                        ? isPositionCorrect
                          ? 'bg-emerald-600 text-white'
                          : 'bg-rose-600 text-white'
                        : 'bg-slate-900 text-white'
                    }`}
                  >
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-lg shrink-0">
                    {stepItem.icon}
                  </div>

                  {/* Step Description */}
                  <div className="min-w-0 flex-1">
                    <span className="text-xs sm:text-sm md:text-[14.5px] font-bold text-slate-900 leading-snug block truncate sm:whitespace-normal">
                      {stepItem.label[lang] || stepItem.label.en}
                    </span>
                  </div>
                </div>

                {/* Right Section: In-Place Evaluation Badge (Answered) OR Tactical Arrows (Interactive) */}
                {isAnswered ? (
                  <div className="shrink-0 flex items-center gap-1.5">
                    {isPositionCorrect ? (
                      <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] sm:text-xs font-mono font-bold flex items-center gap-1 shadow-2xs">
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>{lang === 'hi' ? 'सही क्रम' : lang === 'mr' ? 'योग्य क्रम' : 'Correct'}</span>
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 border border-rose-300 text-[10px] sm:text-xs font-mono font-bold flex items-center gap-1 shadow-2xs">
                        <X className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>
                          {lang === 'hi'
                            ? `अपेक्षित: चरण ${expectedPosition}`
                            : lang === 'mr'
                            ? `अपेक्षित: पायरी ${expectedPosition}`
                            : `Expected: Step ${expectedPosition}`}
                        </span>
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      disabled={disabled || index === 0}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMoveUp(index);
                      }}
                      title="Move Step Up"
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                        index === 0
                          ? 'opacity-25 border-slate-200 text-slate-300 cursor-not-allowed'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-400 active:scale-90 shadow-2xs'
                      }`}
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={disabled || index === orderedIds.length - 1}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMoveDown(index);
                      }}
                      title="Move Step Down"
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                        index === orderedIds.length - 1
                          ? 'opacity-25 border-slate-200 text-slate-300 cursor-not-allowed'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-400 active:scale-90 shadow-2xs'
                      }`}
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </Reorder.Item>
            );
          })}
        </Reorder.Group>
      </div>

      {/* 3. Bottom Action Strip: Verify Button OR In-Place Result Console */}
      {!isAnswered ? (
        <div className="pt-2 shrink-0">
          <button
            type="button"
            disabled={disabled}
            onClick={handleVerify}
            className="w-full min-h-[48px] sm:min-h-[52px] px-6 py-3 rounded-xl sm:rounded-2xl font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-md bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/25 active:scale-98 transition-all cursor-pointer"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>
              {lang === 'hi'
                ? 'कालानुक्रमिक क्रम सत्यापित करें'
                : lang === 'mr'
                ? 'कालक्रमानुसार क्रम तपासा'
                : 'Verify Chronological Sequence'}
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
                <span>{isCorrect ? 'Sequence SOP Compliant' : 'Sequence SOP Deviation'}</span>
              </span>
              {sopClause && (
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                  {sopClause}
                </span>
              )}
            </div>

            {isCorrect && xpAward && (
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-200/90 text-emerald-900 text-xs font-mono font-bold">
                +{xpAward} XP
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
                  {lang === 'hi' ? 'क्रम पुनः प्रयास करें' : lang === 'mr' ? 'क्रम पुन्हा प्रयत्न करा' : 'Retry Sequence'}
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
                  {lang === 'hi' ? 'कहानी जारी रखें' : lang === 'mr' ? 'कथा पुढे सुरू ठेवा' : 'Continue to Next Scene'}
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
