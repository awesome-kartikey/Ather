import React, { useState } from 'react';
import { motion } from 'motion/react';
import type { ChoiceStepData, ChoiceOption } from '../../content/schema';
import type { LanguageCode } from '../../engine/types';
import { HelpCircle, ArrowRight } from 'lucide-react';
import { VoiceInstructionPlayer } from './VoiceInstructionPlayer';

interface Props {
  step: ChoiceStepData;
  lang: LanguageCode;
  onComplete: (answer: string, isCorrect: boolean) => void;
}

export const ScenarioRenderer: React.FC<Props> = ({ step, lang, onComplete }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!selectedId) return;
    const opt = step.options.find((o) => o.id === selectedId);
    if (opt) {
      onComplete(opt.id, opt.correct);
    }
  };

  return (
    <div className="flex flex-col gap-4 py-1 select-none">
      {/* Header Question Card */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs">
        <div className="mb-2 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <HelpCircle className="w-4 h-4" />
            </span>
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-blue-700">
              SOP Decision &amp; ERP Verification
            </span>
          </div>

          <VoiceInstructionPlayer text={step.question[lang]} lang={lang} audioId={step.audioId} />
        </div>

        <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
          {step.question[lang]}
        </h3>
      </div>

      {/* Options Stack */}
      <div className="flex flex-col gap-2.5">
        {step.options.map((opt: ChoiceOption, idx: number) => {
          const isSelected = selectedId === opt.id;

          return (
            <motion.button
              key={opt.id}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.995 }}
              type="button"
              onClick={() => setSelectedId(opt.id)}
              className={`flex items-center justify-between gap-3.5 p-4 rounded-xl border text-left transition-all cursor-pointer min-h-[58px] ${
                isSelected
                  ? 'border-blue-600 bg-blue-50/70 shadow-sm ring-2 ring-blue-500/20'
                  : 'border-slate-200/90 bg-white hover:border-blue-300 hover:bg-slate-50/70 shadow-2xs'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                {/* Radio Circle */}
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                    isSelected ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300 bg-slate-50'
                  }`}
                >
                  {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                </div>

                <span
                  className={`text-sm sm:text-base font-semibold leading-snug ${
                    isSelected ? 'text-blue-900 font-bold' : 'text-slate-800'
                  }`}
                >
                  {opt.label[lang]}
                </span>
              </div>

              <span className="text-[11px] font-mono text-slate-400 shrink-0 font-bold">
                0{idx + 1}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Submit Button */}
      <div className="pt-2 flex justify-end">
        <button
          type="button"
          disabled={!selectedId}
          onClick={handleSubmit}
          className="w-full sm:w-auto min-w-[200px] py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm sm:text-base shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Confirm Selection</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
