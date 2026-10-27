import { useState, useEffect } from 'react';
import type { StepData, ChoiceOption, HotspotTarget, SpotErrorOption, BarcodeOption } from '../content/schema';
import type { LanguageCode, TrainingMode, StepResult } from '../engine/types';
import { ChoiceStep } from './ChoiceStep';
import { HotspotStep } from './HotspotStep';
import { SpotErrorStep } from './SpotErrorStep';
import { DragDropStep } from './DragDropStep';
import { ScanSimStep } from './ScanSimStep';
import { SequenceStep } from './SequenceStep';
import { CountStepperStep } from './CountStepperStep';
import { speakText, stopVoice } from '../engine/sound';
import { Volume2, ShieldAlert } from 'lucide-react';
import { useTranslation } from '../i18n/translations';

interface StepContainerProps {
  step: StepData;
  lang: LanguageCode;
  mode: TrainingMode;
  autoReadTTS?: boolean;
  soundEnabled?: boolean;
  vibrationEnabled?: boolean;
  onStepComplete: (result: StepResult) => void;
  onNextStep: () => void;
}

export function StepContainer({
  step,
  lang,
  mode,
  autoReadTTS = false,
  soundEnabled = true,
  vibrationEnabled = true,
  onStepComplete,
  onNextStep
}: StepContainerProps) {
  const t = useTranslation(lang);
  const [isAnswered, setIsAnswered] = useState(false);
  const [lastResult, setLastResult] = useState<StepResult | null>(null);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Auto-read voice on step load if enabled
  useEffect(() => {
    setIsAnswered(false);
    setLastResult(null);
    setSelectedOptionId(null);
    stopVoice();

    if (autoReadTTS) {
      setIsSpeaking(true);
      speakText(step.question[lang], lang, step.audioId, () => {
        setIsSpeaking(false);
      });
    }

    return () => {
      stopVoice();
    };
  }, [step.id, lang]);

  const handleVoicePlay = () => {
    if (isSpeaking) {
      stopVoice();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      speakText(step.question[lang], lang, step.audioId, () => {
        setIsSpeaking(false);
      });
    }
  };

  const handleResult = (result: StepResult) => {
    if (isAnswered) return;
    setIsAnswered(true);
    setLastResult(result);
    onStepComplete(result);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 w-full items-start">
      {/* Left Column: Question, Context, Audio */}
      <div className="lg:col-span-5 flex flex-col gap-4 bg-card p-5 rounded-2xl border-3 border-ink shadow-md">
        {/* Safety Warning Flag if critical step */}
        {step.safety && (
          <div className="flex items-center gap-2 bg-act/20 text-ink border-2 border-act px-3 py-1.5 rounded-lg w-fit">
            <ShieldAlert className="w-5 h-5 text-act shrink-0" />
            <span className="font-heading font-bold text-sm tracking-wide uppercase">
              Safety Critical Step
            </span>
          </div>
        )}

        {/* Step Question */}
        <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-ink leading-tight">
          {step.question[lang]}
        </h2>

        {/* Listen Voice-Over Button */}
        <button
          type="button"
          onClick={handleVoicePlay}
          className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border-3 font-bold text-base w-fit transition-all shadow-sm ${
            isSpeaking
              ? 'bg-act text-ink border-ink animate-pulse ring-4 ring-act/30'
              : 'bg-card text-ink border-ink hover:bg-concrete active:scale-95'
          }`}
        >
          <Volume2 className="w-5 h-5" />
          <span>{isSpeaking ? t.listening : t.listen}</span>
        </button>

        {/* Placeholder disclaimer tag for Ather compliance */}
        {step.placeholder && (
          <span className="text-xs font-mono text-ink/50 uppercase tracking-wider">
            SAMPLE STEP · REPLACE WITH ATHER SOP
          </span>
        )}
      </div>

      {/* Right Column: Interactive Step Component & Feedback */}
      <div className="lg:col-span-7 flex flex-col gap-4">
        <div className="bg-card p-5 rounded-2xl border-3 border-ink shadow-md min-h-[300px] flex items-center justify-center">
          {step.type === 'choice' && (
            <ChoiceStep
              step={step}
              lang={lang}
              mode={mode}
              isAnswered={isAnswered}
              selectedOptionId={selectedOptionId}
              onSelect={(opt: ChoiceOption) => {
                setSelectedOptionId(opt.id);
                handleResult({ ok: opt.correct, meta: { optionId: opt.id } });
              }}
            />
          )}

          {step.type === 'hotspot' && (
            <HotspotStep
              step={step}
              lang={lang}
              mode={mode}
              isAnswered={isAnswered}
              selectedTargetId={selectedOptionId}
              onSelect={(target: HotspotTarget) => {
                setSelectedOptionId(target.id);
                handleResult({ ok: target.correct, meta: { targetId: target.id } });
              }}
            />
          )}

          {step.type === 'spotError' && (
            <SpotErrorStep
              step={step}
              lang={lang}
              mode={mode}
              isAnswered={isAnswered}
              selectedOptionId={selectedOptionId}
              onSelect={(opt: SpotErrorOption) => {
                setSelectedOptionId(opt.id);
                handleResult({ ok: opt.isError, meta: { optionId: opt.id } });
              }}
            />
          )}

          {step.type === 'dragDrop' && (
            <DragDropStep
              step={step}
              lang={lang}
              mode={mode}
              soundEnabled={soundEnabled}
              vibrationEnabled={vibrationEnabled}
              onResult={handleResult}
            />
          )}

          {step.type === 'scanSim' && (
            <ScanSimStep
              step={step}
              lang={lang}
              mode={mode}
              isAnswered={isAnswered}
              selectedOptionId={selectedOptionId}
              onSelect={(opt: BarcodeOption) => {
                setSelectedOptionId(opt.id);
                handleResult({ ok: opt.correct, meta: { barcodeId: opt.id } });
              }}
            />
          )}

          {step.type === 'sequence' && (
            <SequenceStep
              step={step}
              lang={lang}
              mode={mode}
              isAnswered={isAnswered}
              onResult={handleResult}
            />
          )}

          {step.type === 'count' && (
            <CountStepperStep
              step={step}
              lang={lang}
              mode={mode}
              isAnswered={isAnswered}
              onResult={handleResult}
            />
          )}
        </div>

        {/* Post-Answer Explanation Banner */}
        {isAnswered && lastResult && (
          <div
            className={`p-5 rounded-2xl border-3 shadow-md flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-2 duration-200 ${
              lastResult.ok
                ? 'bg-ok/10 border-ok text-ink'
                : 'bg-no/10 border-no text-ink'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl">{lastResult.ok ? '✅' : '⚠️'}</span>
              <strong className="font-heading text-2xl font-bold">
                {lastResult.ok ? t.correct : t.notQuite}
              </strong>
            </div>

            <p className="text-base sm:text-lg font-medium leading-relaxed">
              {step.explanation[lang]}
            </p>

            <button
              type="button"
              onClick={onNextStep}
              className="mt-2 min-h-[64px] bg-act text-ink border-3 border-ink rounded-xl font-heading font-extrabold text-2xl tracking-wide uppercase hover:brightness-105 active:scale-95 transition-all shadow-md flex items-center justify-center self-end px-8"
            >
              <span>{t.next} →</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
