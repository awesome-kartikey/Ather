import React from 'react';
import { CheckCircle2, AlertTriangle, ArrowRight, RotateCcw } from 'lucide-react';
import type { StoryScene, LanguageCode } from '../../engine/story/types';

interface Props {
  scene: StoryScene;
  lang: LanguageCode;
  isCorrect: boolean;
  onContinue: () => void;
  onRetry?: () => void;
  selectedOptionId?: string | null;
}

export const FeedbackCard: React.FC<Props> = ({
  scene,
  lang,
  isCorrect,
  onContinue,
  onRetry,
  selectedOptionId: _selectedOptionId
}) => {
  const mascotData = scene.mascot as any;
  const interaction = scene.interaction as any;

  const defaultSuccess: Record<LanguageCode, string> = {
    en: 'Excellent! Your operational decision is 100% compliant with Ather AURIC SOP standards.',
    hi: 'बहुत बढ़िया! आपका परिचालन निर्णय एथर औरिक SOP मानकों के साथ 100% अनुपालन है।',
    mr: 'उत्कृष्ट! तुमचा निर्णय एथर औरिक SOP मानकांनुसार 100% योग्य आहे.'
  };
  const defaultWarning: Record<LanguageCode, string> = {
    en: 'Warning: SOP Protocol Violation! Review the official clause explanation below.',
    hi: 'चेतावनी: SOP प्रोटोकॉल उल्लंघन! नीचे दिए गए आधिकारिक क्लॉज विवरण की समीक्षा करें।',
    mr: 'सावधान: SOP नियमांचे उल्लंघन! खालील अधिकृत नियमाचे स्पष्टीकरण काळजीपूर्वक वाचा.'
  };

  const mascotText = isCorrect
    ? mascotData?.onCorrect?.text?.[lang] || mascotData?.onCorrect?.text?.en || defaultSuccess[lang]
    : mascotData?.onIncorrect?.text?.[lang] || mascotData?.onIncorrect?.text?.en || defaultWarning[lang];

  // Resolve concise SOP Standard text
  let sopStandardText = '';
  if (interaction?.type === 'mcq' && interaction.options) {
    const correctOpt = interaction.options.find((o: any) => o.correct);
    if (correctOpt) {
      sopStandardText = correctOpt.label?.[lang] || correctOpt.label?.en || correctOpt.text?.en || '';
    }
  } else if (interaction?.type === 'stop_go') {
    const act = interaction.correctAction || 'stop';
    const isStop = act.toLowerCase() === 'stop';
    sopStandardText = isStop
      ? interaction.stopLabel?.[lang] || interaction.stopLabel?.en || 'STOP & Enforce Verification'
      : interaction.goLabel?.[lang] || interaction.goLabel?.en || 'GO & Authorize Movement';
  } else if (interaction?.type === 'count_stepper') {
    sopStandardText = `${interaction.correctNumber ?? interaction.targetCount} ${interaction.unit?.[lang] || interaction.unit?.en || 'Units'}`;
  } else if (interaction?.type === 'spot_error' && interaction.options) {
    const violation = interaction.options.find((o: any) => o.isViolation);
    if (violation) {
      sopStandardText = violation.label?.[lang] || violation.label?.en || '';
    }
  }

  return (
    <div
      className={`w-full rounded-3xl border-2 shadow-xl p-5 sm:p-6 transition-all space-y-3.5 select-none ${
        isCorrect
          ? 'bg-emerald-50/90 border-emerald-400 text-emerald-950'
          : 'bg-amber-50/90 border-amber-400 text-amber-950'
      }`}
    >
      {/* Status Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200/60">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-xs ${
              isCorrect ? 'bg-emerald-600' : 'bg-amber-600'
            }`}
          >
            {isCorrect ? <CheckCircle2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
          </div>
          <div>
            <h4 className="text-base font-extrabold tracking-tight">
              {isCorrect
                ? lang === 'hi'
                  ? 'सही निर्णय! SOP अनुपालन'
                  : lang === 'mr'
                  ? 'योग्य निर्णय! SOP अनुपालन'
                  : 'Correct Decision! SOP Compliant'
                : lang === 'hi'
                ? 'SOP विचलन का पता चला'
                : lang === 'mr'
                ? 'SOP नियम विचलन आढळले'
                : 'SOP Deviation Detected'}
            </h4>
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">
              {scene.rules.sopClause}
            </span>
          </div>
        </div>

        <div>
          {isCorrect ? (
            <span className="px-3 py-1 rounded-full bg-emerald-200/90 text-emerald-800 text-xs font-mono font-bold">
              +{scene.rules.xp} XP
            </span>
          ) : (
            <span className="px-3 py-1 rounded-full bg-amber-200/90 text-amber-800 text-xs font-mono font-bold">
              {lang === 'hi' ? 'पुनः प्रयास अनुमत' : lang === 'mr' ? 'पुन्हा प्रयत्न करण्याची परवानगी' : 'Retry Allowed'}
            </span>
          )}
        </div>
      </div>

      {/* Single Clear Explanation (No walls of text) */}
      <div className="p-3.5 rounded-2xl bg-white/95 border border-slate-200/80 text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed shadow-2xs flex items-start gap-2.5">
        <span className="text-base shrink-0">💡</span>
        <span>{mascotText}</span>
      </div>

      {/* Correct Standard Card (Only if resolved) */}
      {sopStandardText && (
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-600 block">
            {lang === 'hi' ? 'आधिकारिक SOP सही मानक:' : lang === 'mr' ? 'अधिकृत SOP योग्य मानक:' : 'Official SOP Correct Standard:'}
          </span>
          <p className="text-xs sm:text-sm font-bold text-slate-900">
            {sopStandardText}
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="pt-2">
        {isCorrect ? (
          <button
            type="button"
            onClick={onContinue}
            className="w-full min-h-[56px] px-6 py-3 rounded-2xl font-black text-sm sm:text-base bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-[0.99]"
          >
            <span>
              {lang === 'hi' ? 'अगले चरण पर जारी रखें' : lang === 'mr' ? 'पुढील चरणावर सुरू ठेवा' : 'Continue Story to Next Step'}
            </span>
            <ArrowRight className="w-5 h-5" />
          </button>
        ) : (
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {onRetry && (
              <button
                type="button"
                onClick={onRetry}
                className="w-full sm:w-1/2 min-h-[56px] px-5 py-3 rounded-2xl font-bold text-sm bg-white hover:bg-slate-50 text-slate-700 border-2 border-slate-300 shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
              >
                <RotateCcw className="w-4 h-4 text-slate-600" />
                <span>
                  {lang === 'hi' ? 'पुनः प्रयास करें' : lang === 'mr' ? 'पुन्हा प्रयत्न करा' : 'Retry Activity'}
                </span>
              </button>
            )}
            <button
              type="button"
              onClick={onContinue}
              className={`${
                onRetry ? 'w-full sm:w-1/2' : 'w-full'
              } min-h-[56px] px-5 py-3 rounded-2xl font-black text-sm sm:text-base bg-amber-600 hover:bg-amber-700 text-white shadow-lg shadow-amber-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95`}
            >
              <span>
                {lang === 'hi' ? 'समीक्षा करें और आगे बढ़ें' : lang === 'mr' ? 'पुढील चरणावर सुरू ठेवा' : 'Review & Continue Story'}
              </span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
