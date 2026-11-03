import React from 'react';
import { motion } from 'motion/react';
import { Maximize2, Check, X, ArrowRight, RefreshCcw } from 'lucide-react';
import type { McqInteraction, LanguageCode } from '../../engine/story/types';
import { resolvePropForQuestion, MASCOT_IMAGE_MAP } from '../../engine/story/assetRegistry';

interface Props {
  interaction: McqInteraction;
  lang: LanguageCode;
  selectedOptionId: string | null;
  onSelectOption: (optionId: string) => void;
  disabled?: boolean;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  isAnswered?: boolean;
  isCorrect?: boolean;
  onContinue?: () => void;
  onRetry?: () => void;
  isLastScene?: boolean;
  explanationText?: string;
}

export const QuestionCard: React.FC<Props> = ({
  interaction,
  lang,
  selectedOptionId,
  onSelectOption,
  disabled,
  isExpanded,
  onToggleExpand,
  isAnswered = false,
  isCorrect = false,
  onContinue,
  onRetry,
  isLastScene = false,
  explanationText
}) => {
  const letters = ['A', 'B', 'C', 'D'];
  const questionText = interaction.question || (interaction as any).prompt;
  const qId = interaction.questionId || (interaction as any).id || 'Q';
  const promptEn = questionText?.en || '';
  const propImg = (interaction as any).propImage || resolvePropForQuestion(qId, promptEn);

  return (
    <div className="w-full h-full bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-5 flex flex-col justify-between overflow-hidden select-none">
      {/* Contained Scrollable Top & Question Section */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-3.5 scrollbar-thin scrollbar-thumb-slate-300">
        {/* Subtle Card Header with Expand Toggle (Hidden when already expanded to avoid duplicate buttons) */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-[10px] sm:text-[11px] font-mono font-bold text-slate-700 tracking-wider uppercase">
              Operational Decision
            </span>
            <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
              {qId}
            </span>
          </div>

          {onToggleExpand && !isExpanded && (
            <button
              type="button"
              onClick={onToggleExpand}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono font-bold text-slate-600 hover:text-blue-600 bg-slate-50 hover:bg-blue-50 border border-slate-200 shadow-2xs transition-all cursor-pointer"
              title="Expand Question Workspace"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Expand</span>
            </button>
          )}
        </div>

        {/* Optional Contextual Reference Prop Tool */}
        {propImg && (
          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="w-10 h-10 shrink-0 p-1 rounded-lg bg-white border border-slate-200 flex items-center justify-center">
              <img src={propImg} alt="Floor Tool" className="max-w-full max-h-full object-contain" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block">
                Required Floor Tool
              </span>
              <p className="text-xs text-slate-700 font-medium truncate">
                Verified SOP reference tool
              </p>
            </div>
          </div>
        )}

        {/* Question Prompt - High contrast & large readability for tablets */}
        <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 leading-snug tracking-tight">
          {questionText?.[lang] || questionText?.en || ''}
        </h3>

        {/* Options Stack (Tactile 58px touch targets with smooth spring entrance) */}
        <div className="grid grid-cols-1 gap-2.5 pt-1">
          {interaction.options.map((option, idx) => {
            const isSelected = selectedOptionId === option.id;
            const optLabel = option.label || (option as any).text;
            const isOptCorrect = !!option.correct;

            // Highlight styling in answered state
            let optionStyle =
              'bg-slate-50/60 border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 text-slate-800 shadow-2xs hover:shadow-xs';
            let badgeStyle =
              'bg-white text-slate-700 border border-slate-200 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600';

            if (isAnswered) {
              if (isSelected && isOptCorrect) {
                optionStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-500/20 shadow-xs';
                badgeStyle = 'bg-emerald-600 text-white border-emerald-600';
              } else if (isSelected && !isOptCorrect) {
                optionStyle = 'bg-rose-50 border-rose-500 text-rose-950 ring-2 ring-rose-500/20 shadow-xs';
                badgeStyle = 'bg-rose-600 text-white border-rose-600';
              } else if (isOptCorrect) {
                optionStyle = 'bg-emerald-50/60 border-emerald-300 text-emerald-900';
                badgeStyle = 'bg-emerald-500 text-white border-emerald-500';
              }
            } else if (isSelected) {
              optionStyle = 'bg-blue-50/90 border-blue-600 text-blue-950 ring-2 ring-blue-500/20 shadow-xs';
              badgeStyle = 'bg-blue-600 text-white border-blue-600';
            }

            return (
              <motion.button
                key={option.id}
                type="button"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22, delay: idx * 0.04 }}
                whileHover={!disabled && !isAnswered ? { scale: 1.006 } : undefined}
                whileTap={!disabled && !isAnswered ? { scale: 0.99 } : undefined}
                disabled={disabled || isAnswered}
                onClick={() => onSelectOption(option.id)}
                className={`group w-full min-h-[56px] sm:min-h-[60px] p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 text-left flex items-center gap-3.5 transition-all cursor-pointer ${optionStyle} ${
                  disabled && !isAnswered ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {/* Option Letter Badge */}
                <div
                  className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center text-xs sm:text-sm font-mono font-bold shrink-0 transition-colors shadow-2xs ${badgeStyle}`}
                >
                  {isAnswered && isSelected ? (
                    isOptCorrect ? <Check className="w-4 h-4 stroke-[2.5]" /> : <X className="w-4 h-4 stroke-[2.5]" />
                  ) : (
                    letters[idx] || `${idx + 1}`
                  )}
                </div>

                {/* Option Text */}
                <span className="text-xs sm:text-sm md:text-[15px] font-semibold leading-snug flex-1">
                  {optLabel?.[lang] || optLabel?.en || ''}
                </span>

                {/* Subtle Interactive Radio Dot / Indicator on right */}
                {!isAnswered && (
                  <div className="w-5 h-5 rounded-full flex items-center justify-center text-slate-300 group-hover:text-blue-500 transition-colors shrink-0">
                    <span className="w-2 h-2 rounded-full border-2 border-current group-hover:bg-blue-500 transition-colors" />
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* SOP Explanation Banner: Only shown in Expanded View to prevent duplicate text in Split View */}
        {isAnswered && isExpanded && explanationText && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-2xl border flex items-start gap-3.5 shadow-xs transition-all ${
              isCorrect
                ? 'bg-emerald-50/90 border-emerald-200 text-emerald-950'
                : 'bg-rose-50/90 border-rose-200 text-rose-950'
            }`}
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 flex items-center justify-center">
              <img
                src={isCorrect ? MASCOT_IMAGE_MAP.success : MASCOT_IMAGE_MAP.warning}
                alt="AURA Feedback"
                className="w-full h-full object-contain filter drop-shadow-sm"
              />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider block mb-1 opacity-80">
                {isCorrect ? 'SOP Verification & Guidance' : 'SOP Deviation Analysis'}
              </span>
              <p className="text-xs sm:text-sm md:text-base font-semibold leading-relaxed">
                {explanationText}
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Bottom Action Strip (Visible when answered) */}
      {isAnswered && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-3 mt-2 border-t border-slate-100 flex items-center justify-between gap-3 shrink-0"
        >
          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 shadow-2xs ${
                isCorrect
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-rose-100 text-rose-800 border border-rose-300'
              }`}
            >
              {isCorrect ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
              <span>{isCorrect ? 'Correct Decision' : 'SOP Deviation'}</span>
            </span>

            {!isCorrect && onRetry && (
              <button
                type="button"
                onClick={onRetry}
                className="px-3 py-1.5 rounded-full text-xs font-mono font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <RefreshCcw className="w-3 h-3" />
                <span>Retry</span>
              </button>
            )}
          </div>

          {onContinue && (
            <button
              type="button"
              onClick={onContinue}
              className={`min-h-[48px] px-6 py-2.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 cursor-pointer shadow-md active:scale-95 ${
                isCorrect
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/25'
                  : 'bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/20'
              }`}
            >
              <span>{isLastScene ? 'Complete Module' : 'Continue to Next Scene'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </motion.div>
      )}
    </div>
  );
};
