import React, { useState } from 'react';
import { motion } from 'motion/react';
import type { HotspotStepData, HotspotTarget } from '../../content/schema';
import type { LanguageCode } from '../../engine/types';
import { MapPin, Navigation, ArrowRight } from 'lucide-react';
import { VoiceInstructionPlayer } from './VoiceInstructionPlayer';

interface Props {
  step: HotspotStepData;
  lang: LanguageCode;
  onComplete: (answer: string, isCorrect: boolean) => void;
}

export const HotspotRenderer: React.FC<Props> = ({ step, lang, onComplete }) => {
  const [selectedTargetId, setSelectedTargetId] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!selectedTargetId) return;
    const target = step.targets.find((t) => t.id === selectedTargetId);
    if (target) {
      onComplete(target.id, target.correct);
    }
  };

  return (
    <div className="flex flex-col gap-4 py-1 select-none font-sans">
      {/* Header Question Card */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs">
        <div className="mb-2 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <Navigation className="w-4 h-4" />
            </span>
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-blue-700">
              Inbound Dock Allocation Station
            </span>
          </div>

          <VoiceInstructionPlayer text={step.question[lang]} lang={lang} audioId={step.audioId} />
        </div>

        <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
          {step.question[lang]}
        </h3>
        <p className="text-xs text-slate-500 font-medium mt-1">
          Select the correct designated bay dock on the plant layout for general vehicle components.
        </p>
      </div>

      {/* Dock Target Cards */}
      <div className="flex flex-col gap-2.5">
        {step.targets.map((target: HotspotTarget) => {
          const isSelected = selectedTargetId === target.id;

          return (
            <motion.button
              key={target.id}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.995 }}
              type="button"
              onClick={() => setSelectedTargetId(target.id)}
              className={`flex items-center justify-between gap-3.5 p-4 rounded-xl border text-left transition-all cursor-pointer min-h-[58px] ${
                isSelected
                  ? 'border-blue-600 bg-blue-50/70 shadow-sm ring-2 ring-blue-500/20'
                  : 'border-slate-200/90 bg-white hover:border-blue-300 hover:bg-slate-50/70 shadow-2xs'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                </div>

                <div className="flex flex-col">
                  <span
                    className={`text-sm sm:text-base font-semibold leading-snug ${
                      isSelected ? 'text-blue-900 font-bold' : 'text-slate-800'
                    }`}
                  >
                    {target.label ? target.label[lang] : target.id}
                  </span>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Submit Button */}
      <div className="pt-2 flex justify-end">
        <button
          type="button"
          disabled={!selectedTargetId}
          onClick={handleSubmit}
          className="w-full sm:w-auto min-w-[200px] py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm sm:text-base shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Confirm Dock Allocation</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
