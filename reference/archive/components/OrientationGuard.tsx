import { useState, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';
import type { LanguageCode } from '../engine/types';
import { useTranslation } from '../i18n/translations';

interface OrientationGuardProps {
  lang: LanguageCode;
}

export function OrientationGuard({ lang }: OrientationGuardProps) {
  const t = useTranslation(lang);
  const [isPortrait, setIsPortrait] = useState<boolean>(false);

  useEffect(() => {
    const checkOrientation = () => {
      // Check window dimensions
      const portrait = window.innerHeight > window.innerWidth;
      setIsPortrait(portrait);
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  if (!isPortrait) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#14232b] text-[#dfe5e8] flex flex-col items-center justify-center p-8 text-center backdrop-blur-md">
      <div className="flex items-center justify-center w-24 h-24 rounded-full bg-act/20 border-4 border-act mb-6 animate-bounce">
        <RotateCcw className="w-12 h-12 text-act" />
      </div>

      <h2 className="font-heading text-4xl sm:text-5xl font-extrabold text-white mb-4">
        {lang === 'hi' ? 'टैबलेट घुमाएँ' : lang === 'mr' ? 'टॅबलेट फिरवा' : 'Rotate to Landscape'}
      </h2>

      <p className="text-xl max-w-md font-medium leading-relaxed text-[#dfe5e8]/80">
        {t.rotateDevicePrompt}
      </p>

      <div className="mt-8 px-6 py-2 bg-white/10 rounded-xl border-2 border-white/20 text-sm font-mono text-act">
        CHHATRAPATI SAMBHAJINAGAR PLANT · ATHER
      </div>
    </div>
  );
}
