import React from 'react';
import { HelpCircle } from 'lucide-react';
import type { McqInteraction, LanguageCode } from '../../engine/story/types';

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
          Q-ID: {interaction.questionId}
        </span>
      </div>

      {/* Question Prompt Text */}
      <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
        {interaction.question[lang] || interaction.question.en}
      </h3>

      {/* Options Stack (Minimum 64px Touch Target for Industrial Tablets) */}
      <div className="grid grid-cols-1 gap-3 pt-1">
        {interaction.options.map((option, idx) => {
          const isSelected = selectedOptionId === option.id;

          return (
            <button
              key={option.id}
              type="button"
              disabled={disabled}
              onClick={() => onSelectOption(option.id)}
              className={`w-full min-h-[64px] p-4 rounded-2xl border-2 text-left flex items-center gap-3.5 transition-all cursor-pointer ${
                isSelected
                  ? 'bg-blue-50/80 border-blue-600 text-blue-950 shadow-md ring-2 ring-blue-500/20'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800'
              } ${disabled ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {/* Option Letter Indicator */}
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono font-bold text-sm shrink-0 border transition-colors ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-700 shadow-sm'
                    : 'bg-slate-100 text-slate-600 border-slate-200'
                }`}
              >
                {letters[idx] || idx + 1}
              </div>

              {/* Option Text Label */}
              <span className="text-xs sm:text-sm font-semibold leading-relaxed flex-1">
                {option.label[lang] || option.label.en}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
