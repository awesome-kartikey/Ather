import React, { useState } from 'react';
import { motion } from 'motion/react';
import type { SpotErrorStepData, SpotErrorOption } from '../../content/schema';
import type { LanguageCode } from '../../engine/types';
import { ShieldAlert, AlertTriangle, ArrowRight } from 'lucide-react';
import { VoiceInstructionPlayer } from './VoiceInstructionPlayer';

interface Props {
  step: SpotErrorStepData;
  lang: LanguageCode;
  onComplete: (answer: string, isCorrect: boolean) => void;
}

export const SpotMistakeRenderer: React.FC<Props> = ({ step, lang, onComplete }) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!selectedOptionId) return;
    const opt = step.options.find((o) => o.id === selectedOptionId);
    if (opt) {
      onComplete(opt.id, opt.isError);
    }
  };

  return (
    <div className="flex flex-col gap-4 py-1 select-none font-sans">
      {/* Header Question Card */}
      <div className="rounded-2xl border border-rose-200 bg-rose-50/40 p-5 shadow-xs">
        <div className="mb-2 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
              <ShieldAlert className="w-4 h-4" />
            </span>
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-rose-700">
              Mandatory Safety Audit
            </span>
          </div>

          <VoiceInstructionPlayer text={step.question[lang]} lang={lang} audioId={step.audioId} />
        </div>

        <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
          {step.question[lang]}
        </h3>

        {step.contextDocument && (
          <div className="mt-2.5 p-3 rounded-xl bg-white border border-rose-200/80 text-xs font-semibold text-rose-800 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{step.contextDocument[lang]}</span>
          </div>
        )}
      </div>

      {/* Safety Observation Options */}
      <div className="flex flex-col gap-2.5">
        {step.options.map((opt: SpotErrorOption) => {
          const isSelected = selectedOptionId === opt.id;

          return (
            <motion.button
              key={opt.id}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.995 }}
              type="button"
              onClick={() => setSelectedOptionId(opt.id)}
              className={`flex items-center justify-between gap-3.5 p-4 rounded-xl border text-left transition-all cursor-pointer min-h-[58px] ${
                isSelected
                  ? 'border-rose-600 bg-rose-50/70 shadow-sm ring-2 ring-rose-500/20'
                  : 'border-slate-200/90 bg-white hover:border-rose-300 hover:bg-slate-50/70 shadow-2xs'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                    isSelected ? 'border-rose-600 bg-rose-600 text-white' : 'border-slate-300 bg-slate-50'
                  }`}
                >
                  {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                </div>

                <span
                  className={`text-sm sm:text-base font-semibold leading-snug ${
                    isSelected ? 'text-rose-950 font-bold' : 'text-slate-800'
                  }`}
                >
                  {opt.label[lang]}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Submit Button */}
      <div className="pt-2 flex justify-end">
        <button
          type="button"
          disabled={!selectedOptionId}
          onClick={handleSubmit}
          className="w-full sm:w-auto min-w-[200px] py-3.5 px-6 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm sm:text-base shadow-md shadow-rose-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Report Safety Observation</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
