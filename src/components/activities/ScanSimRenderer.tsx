import React, { useState } from 'react';
import { motion } from 'motion/react';
import type { ScanSimStepData, BarcodeOption } from '../../content/schema';
import type { LanguageCode } from '../../engine/types';
import { ScanBarcode, ArrowRight } from 'lucide-react';
import { VoiceInstructionPlayer } from './VoiceInstructionPlayer';

interface Props {
  step: ScanSimStepData;
  lang: LanguageCode;
  onComplete: (answer: string, isCorrect: boolean) => void;
}

export const ScanSimRenderer: React.FC<Props> = ({ step, lang, onComplete }) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!selectedOptionId) return;
    const opt = step.options.find((o) => o.id === selectedOptionId);
    if (opt) {
      onComplete(opt.code, opt.correct);
    }
  };

  return (
    <div className="flex flex-col gap-4 py-1 select-none font-sans">
      {/* Header Question Card */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs">
        <div className="mb-2 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <ScanBarcode className="w-4 h-4" />
            </span>
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-blue-700">
              Optical Windshield Scanner Station
            </span>
          </div>

          <VoiceInstructionPlayer text={step.question[lang]} lang={lang} audioId={step.audioId} />
        </div>

        <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
          {step.question[lang]}
        </h3>
        <p className="text-xs text-slate-500 font-medium mt-1">
          Select and scan the matching TR reference code from the printed thermal identification sticker.
        </p>
      </div>

      {/* Barcode Options */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {step.options.map((opt: BarcodeOption) => {
          const isSelected = selectedOptionId === opt.id;

          return (
            <motion.button
              key={opt.id}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => setSelectedOptionId(opt.id)}
              className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 text-center transition-all cursor-pointer min-h-[80px] font-mono ${
                isSelected
                  ? 'border-blue-600 bg-blue-50/80 shadow-md ring-2 ring-blue-500/20'
                  : 'border-slate-200/90 bg-white hover:border-blue-300 hover:bg-slate-50/70 shadow-2xs'
              }`}
            >
              <ScanBarcode className={`w-6 h-6 ${isSelected ? 'text-blue-600' : 'text-slate-400'}`} />
              <span className={`text-xs font-bold ${isSelected ? 'text-blue-900 font-black' : 'text-slate-800'}`}>
                {opt.code}
              </span>
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
          className="w-full sm:w-auto min-w-[200px] py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm sm:text-base shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Trigger Optical Scan</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
