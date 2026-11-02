import React from 'react';
import { CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck } from 'lucide-react';
import type { StoryScene, LanguageCode } from '../../engine/story/types';

interface Props {
  scene: StoryScene;
  lang: LanguageCode;
  isCorrect: boolean;
  onContinue: () => void;
  selectedOptionId?: string | null;
}

export const FeedbackCard: React.FC<Props> = ({
  scene,
  lang,
  isCorrect,
  onContinue,
  selectedOptionId
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

  const whyText = scene.rules.why[lang] || scene.rules.why.en;

  // Resolve Comparison Text (Your Choice vs SOP Standard)
  let userChoiceText = isCorrect
    ? (lang === 'hi' ? 'SOP अनुपालन निर्णय निष्पादित' : lang === 'mr' ? 'SOP नियमानुसार योग्य निर्णय' : 'Compliant SOP Decision Executed')
    : (lang === 'hi' ? 'गैर-अनुपालन विकल्प चुना गया' : lang === 'mr' ? 'अयोग्य पर्याय निवडला' : 'Non-Compliant Action Selected');

  let sopStandardText = lang === 'hi' ? 'आधिकारिक कार्यप्रणाली का पालन अनिवार्य' : lang === 'mr' ? 'अधिकृत SOP नियमांचे पालन आवश्यक' : 'Mandatory SOP Protocol Required';

  if (interaction?.type === 'mcq' && interaction.options) {
    const correctOpt = interaction.options.find((o: any) => o.correct);
    if (correctOpt) {
      sopStandardText = correctOpt.label?.[lang] || correctOpt.label?.en || correctOpt.text?.en || '';
    }
    if (selectedOptionId) {
      const chosenOpt = interaction.options.find((o: any) => o.id === selectedOptionId);
      if (chosenOpt) {
        userChoiceText = chosenOpt.label?.[lang] || chosenOpt.label?.en || chosenOpt.text?.en || '';
      }
    }
  } else if (interaction?.type === 'stop_go') {
    const act = interaction.correctAction || 'stop';
    const isStop = act.toLowerCase() === 'stop';
    sopStandardText = isStop
      ? (interaction.stopLabel?.[lang] || interaction.stopLabel?.en || '🛑 STOP & Enforce Verification')
      : (interaction.goLabel?.[lang] || interaction.goLabel?.en || '🟢 GO & Authorize Movement');
    userChoiceText = isCorrect
      ? sopStandardText
      : (isStop
        ? (interaction.goLabel?.[lang] || interaction.goLabel?.en || '🟢 Unauthorized Bypass Selected')
        : (interaction.stopLabel?.[lang] || interaction.stopLabel?.en || '🛑 Unnecessary Stoppage Selected'));
  } else if (interaction?.type === 'count_stepper') {
    sopStandardText = `${interaction.correctNumber ?? interaction.targetCount} ${interaction.unit?.[lang] || interaction.unit?.en || 'Units'}`;
    userChoiceText = isCorrect ? sopStandardText : (lang === 'hi' ? 'गलत संख्या दर्ज की गई' : lang === 'mr' ? 'चुकीची संख्या प्रविष्ट केली' : 'Incorrect Quantity Entered');
  } else if (interaction?.type === 'spot_error' && interaction.options) {
    const violation = interaction.options.find((o: any) => o.isViolation);
    if (violation) {
      sopStandardText = violation.label?.[lang] || violation.label?.en || '';
    }
    userChoiceText = isCorrect ? sopStandardText : (lang === 'hi' ? 'सुरक्षा उल्लंघन अनदेखा किया' : lang === 'mr' ? 'सुरक्षा नियम दुर्लक्षित केले' : 'Hazard Missed or Tolerated');
  }

  return (
    <div
      className={`w-full rounded-2xl sm:rounded-3xl border-2 shadow-2xl p-5 sm:p-6 transition-all ${isCorrect
          ? 'bg-emerald-50/90 border-emerald-500/80 text-emerald-950'
          : 'bg-amber-50/90 border-amber-500/80 text-amber-950'
        }`}
    >
      {/* Status Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200/60">
        <div className="flex items-center gap-2.5">
          <div
            className={`p-2 rounded-xl text-white shadow-sm ${isCorrect ? 'bg-emerald-600' : 'bg-amber-600'
              }`}
          >
            {isCorrect ? (
              <CheckCircle2 className="w-5 h-5" />
            ) : (
              <AlertTriangle className="w-5 h-5" />
            )}
          </div>
          <div>
            <h4 className="text-base font-extrabold tracking-tight">
              {isCorrect ? 'Correct Decision! SOP Compliant' : 'SOP Violation Detected'}
            </h4>
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">
              {scene.rules.sopClause}
            </span>
          </div>
        </div>

        {isCorrect ? (
          <div className="px-3 py-1 rounded-full bg-emerald-200/80 text-emerald-800 text-xs font-mono font-bold">
            +{scene.rules.xp} XP
          </div>
        ) : (
          <div className="px-3 py-1 rounded-full bg-amber-200/80 text-amber-800 text-xs font-mono font-bold">
            Retry Allowed
          </div>
        )}
      </div>

      {/* Mascot Verbal Guidance */}
      <div className="my-4 p-3.5 rounded-2xl bg-white/80 border border-slate-200/80 space-y-1">
        <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          AURA Evaluation
        </div>
        <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
          {mascotText}
        </p>
      </div>

      {/* Your Choice vs SOP Standard Comparison */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-3">
        <div
          className={`p-3.5 rounded-2xl border ${isCorrect
              ? 'bg-emerald-100/70 border-emerald-300 text-emerald-950'
              : 'bg-rose-100/70 border-rose-300 text-rose-950'
            }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
              Your Floor Decision:
            </span>
            <span
              className={`text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-md ${isCorrect ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                }`}
            >
              {isCorrect ? 'PASS' : 'VIOLATION'}
            </span>
          </div>
          <p className="text-xs sm:text-sm font-bold leading-snug">
            {userChoiceText}
          </p>
        </div>

        <div className="p-3.5 rounded-2xl border bg-blue-50/80 border-blue-200 text-blue-950">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-600">
              Mandatory SOP Standard:
            </span>
            <span className="text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-md bg-blue-600 text-white">
              SOP MANDATE
            </span>
          </div>
          <p className="text-xs sm:text-sm font-bold leading-snug">
            {sopStandardText}
          </p>
        </div>
      </div>

      {/* Official SOP Why Clause */}
      <div className="p-3.5 rounded-2xl bg-white/90 border border-slate-200/80 space-y-1">
        <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
          Standard Operating Procedure (Why):
        </div>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          {whyText}
        </p>
      </div>

      {/* Action Button (Min 64px touch target) */}
      <div className="pt-4">
        <button
          type="button"
          onClick={onContinue}
          className={`w-full min-h-[64px] px-6 py-4 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${isCorrect
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/30'
              : 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-600/30'
            }`}
        >
          <span>{isCorrect ? 'Continue Story to Next Step' : 'Review & Continue Story'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};