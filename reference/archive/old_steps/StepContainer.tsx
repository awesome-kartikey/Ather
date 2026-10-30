import { useState, useEffect } from 'react';
import type {
  StepData,
  ChoiceOption,
  HotspotTarget,
  SpotErrorOption,
  BarcodeOption
} from '../content/schema';
import type { LanguageCode, TrainingMode, StepResult } from '../engine/types';
import { ChoiceStep } from './ChoiceStep';
import { DragDropStep } from './DragDropStep';
import { HotspotStep } from './HotspotStep';
import { ScanSimStep } from './ScanSimStep';
import { SpotErrorStep } from './SpotErrorStep';
import { SequenceStep } from './SequenceStep';
import { CountStepperStep } from './CountStepperStep';
import { AudioVoiceButton } from '../components/AudioVoiceButton';
import { TactileButton } from '../components/TactileButton';
import { playFeedbackTone, speakText, stopVoice } from '../engine/sound';
import { ShieldAlert, CheckCircle, XCircle, ArrowRight, BookOpen } from 'lucide-react';
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
  mode: _mode,
  autoReadTTS = false,
  soundEnabled = true,
  vibrationEnabled = true,
  onStepComplete,
  onNextStep
}: StepContainerProps) {
  const t = useTranslation(lang);
  const [isAnswered, setIsAnswered] = useState(false);
  const [lastResult, setLastResult] = useState<StepResult | null>(null);

  // Stop voice and auto-read question if enabled on step load
  useEffect(() => {
    stopVoice();

    if (autoReadTTS) {
      speakText(step.question[lang], lang, step.audioId);
    }

    return () => {
      stopVoice();
    };
  }, [step.id, lang, autoReadTTS, step.question, step.audioId]);

  const processResult = (ok: boolean, meta?: any) => {
    if (isAnswered) return;
    setIsAnswered(true);
    const result: StepResult = { ok, meta };
    setLastResult(result);

    // Audio & Haptic feedback
    playFeedbackTone(ok, soundEnabled, vibrationEnabled);

    onStepComplete(result);
  };

  return (
    <div className="w-full flex flex-col gap-6 select-none">
      {/* Top Question & Prompt Card */}
      <div className="bg-card p-5 sm:p-6 rounded-2xl border-3 border-ink shadow-[4px_4px_0px_#14232b] flex flex-col gap-4">
        {/* Safety Header if safety-critical */}
        {step.safety && (
          <div className="flex items-center gap-2.5 bg-no text-card px-3.5 py-1.5 rounded-xl w-fit border-2 border-ink shadow-sm">
            <ShieldAlert className="w-5 h-5 shrink-0" />
            <span className="font-heading font-black text-sm tracking-widest uppercase">
              {t.safetyCritical}
            </span>
          </div>
        )}

        {/* Question Title & Voice Trigger */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-ink leading-tight flex-1">
            {step.question[lang]}
          </h2>

          <AudioVoiceButton
            text={step.question[lang]}
            lang={lang}
            audioId={step.audioId}
            label={t.listen}
            className="shrink-0"
          />
        </div>
      </div>

      {/* Interactive Simulation Area */}
      <div className="w-full">
        {step.type === 'choice' && (
          <ChoiceStep
            step={step}
            lang={lang}
            isAnswered={isAnswered}
            onSelectOption={(opt: ChoiceOption) => processResult(opt.correct, { optionId: opt.id })}
          />
        )}

        {step.type === 'dragDrop' && (
          <DragDropStep
            step={step}
            lang={lang}
            isAnswered={isAnswered}
            onComplete={(correct: boolean) => processResult(correct)}
          />
        )}

        {step.type === 'hotspot' && (
          <HotspotStep
            step={step}
            lang={lang}
            isAnswered={isAnswered}
            onSelectTarget={(target: HotspotTarget) =>
              processResult(target.correct, { targetId: target.id })
            }
          />
        )}

        {step.type === 'scanSim' && (
          <ScanSimStep
            step={step}
            lang={lang}
            isAnswered={isAnswered}
            onScanOption={(opt: BarcodeOption) =>
              processResult(opt.correct, { scannedCode: opt.code })
            }
          />
        )}

        {step.type === 'spotError' && (
          <SpotErrorStep
            step={step}
            lang={lang}
            isAnswered={isAnswered}
            onSelectOption={(opt: SpotErrorOption) =>
              processResult(opt.isError, { optionId: opt.id })
            }
          />
        )}

        {step.type === 'sequence' && (
          <SequenceStep
            step={step}
            lang={lang}
            isAnswered={isAnswered}
            onComplete={(correct: boolean) => processResult(correct)}
          />
        )}

        {step.type === 'count' && (
          <CountStepperStep
            step={step}
            lang={lang}
            isAnswered={isAnswered}
            onComplete={(correct: boolean) => processResult(correct)}
          />
        )}
      </div>

      {/* Post-Answer Feedback & SOP Guidance Card */}
      {isAnswered && lastResult && (
        <div
          className={`p-6 rounded-2xl border-3 border-ink shadow-[4px_4px_0px_#14232b] flex flex-col gap-4 animate-in fade-in duration-300 ${
            lastResult.ok ? 'bg-ok/10 border-ok' : 'bg-no/10 border-no'
          }`}
        >
          {/* Status Headline */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-3">
              {lastResult.ok ? (
                <CheckCircle className="w-8 h-8 text-ok shrink-0" />
              ) : (
                <XCircle className="w-8 h-8 text-no shrink-0" />
              )}
              <h3
                className={`font-heading font-black text-2xl sm:text-3xl ${
                  lastResult.ok ? 'text-ok' : 'text-no'
                }`}
              >
                {lastResult.ok ? t.correct : t.notQuite}
              </h3>
            </div>

            {/* Listen to SOP Guidance */}
            <AudioVoiceButton
              text={step.explanation[lang]}
              lang={lang}
              label={t.sopGuidance}
              className="bg-card shrink-0"
            />
          </div>

          {/* Explanation Text */}
          <div className="bg-card p-4 rounded-xl border-2 border-ink flex flex-col gap-1.5">
            <span className="font-heading font-extrabold text-xs uppercase text-act flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" />
              {t.sopGuidance} (XXXX_PRO_001):
            </span>
            <p className="font-body text-base text-ink font-semibold leading-relaxed">
              {step.explanation[lang]}
            </p>
          </div>

          {/* Large Tactile "Continue to Next Step" Button */}
          <div className="flex justify-end pt-2">
            <TactileButton
              variant={lastResult.ok ? 'success' : 'primary'}
              size="lg"
              onClick={onNextStep}
              className="w-full sm:w-auto min-w-[260px]"
            >
              <span>{t.next}</span>
              <ArrowRight className="w-6 h-6 stroke-[3]" />
            </TactileButton>
          </div>
        </div>
      )}
    </div>
  );
}
