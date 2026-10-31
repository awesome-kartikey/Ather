import React from 'react';
import { HelpCircle } from 'lucide-react';
import type { McqInteraction, LanguageCode } from '../../engine/story/types';
import { resolvePropForQuestion } from '../../engine/story/assetRegistry';

interface Props {
  interaction: McqInteraction;
  lang: LanguageCode;
  selectedOptionId: string | null;
  onSelectOption: (optionId: string) => void;
  disabled?: boolean;
}

export const QuestionCard: React.FC<Props> = ({
  interaction,
  lang,
  selectedOptionId,
  onSelectOption,
  disabled
}) => {
  const letters = ['A', 'B', 'C', 'D'];
  const questionText = interaction.question || (interaction as any).prompt;
  const qId = interaction.questionId || (interaction as any).id || 'Q';
  const promptEn = questionText?.en || '';
  const propImg = (interaction as any).propImage || resolvePropForQuestion(qId, promptEn);

  return (
    <div className="w-full bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-xl p-4 sm:p-6 space-y-4">
      {/* Header Badge */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-200/60">
            <HelpCircle className="w-4 h-4" />
          </div>
          <span className="text-xs font-mono font-bold tracking-wider text-slate-500 uppercase">
            SOP Decision Required
          </span>
        </div>

        <span className="text-[11px] font-mono font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
          Q-ID: {qId}
        </span>
      </div>

      {/* Contextual Floor Prop Cutout (if applicable) */}
      {propImg && (
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
          <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 p-1.5 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-center">
            <img src={propImg} alt="Floor Prop" className="max-w-full max-h-full object-contain" />
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-500 block">
              Floor Prop / Reference Tool
            </span>
            <p className="text-xs text-slate-700 font-medium">
              Verified operational artifact required for this SOP task.
            </p>
          </div>
        </div>
      )}

      {/* Question Prompt Text */}
      <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
        {questionText?.[lang] || questionText?.en || ''}
      </h3>

      {/* Options Stack (Minimum 64px Touch Target for Industrial Tablets) */}
      <div className="grid grid-cols-1 gap-3 pt-1">
        {interaction.options.map((option, idx) => {
          const isSelected = selectedOptionId === option.id;
          const optLabel = option.label || (option as any).text;

          return (
            <button
              key={option.id}
              type="button"
              disabled={disabled}
              onClick={() => onSelectOption(option.id)}
              className={`w-full min-h-[64px] p-4 rounded-2xl border-2 text-left flex items-center gap-3.5 transition-all cursor-pointer ${
                isSelected
                  ? 'bg-blue-50/90 border-blue-600 text-blue-950 shadow-md ring-2 ring-blue-500/20'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800'
              } ${disabled ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {/* Option Letter Indicator */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-mono font-bold shrink-0 transition-colors ${
                  isSelected
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-600 border border-slate-200'
                }`}
              >
                {letters[idx] || `${idx + 1}`}
              </div>

              {/* Option Text */}
              <span className="text-sm sm:text-base font-semibold leading-snug flex-1">
                {optLabel?.[lang] || optLabel?.en || ''}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
