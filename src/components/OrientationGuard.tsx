import { useState, useEffect } from 'react';
import type { LanguageCode } from '../engine/types';
import { useTranslation } from '../i18n/translations';
import { RotateCw, Tablet } from 'lucide-react';

export function OrientationGuard({ lang }: { lang: LanguageCode }) {
  const t = useTranslation(lang);
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      // If width < height and width < 900, it's portrait on a mobile/tablet device
      if (typeof window !== 'undefined') {
        const isP = window.innerHeight > window.innerWidth && window.innerWidth < 900;
        setIsPortrait(isP);
      }
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
    <aside
      aria-label="Screen orientation advisory"
      className="fixed inset-0 z-50 bg-ink/95 text-card p-8 flex flex-col items-center justify-center text-center backdrop-blur-md"
    >
      <div className="relative mb-6">
        <Tablet className="w-20 h-20 text-concrete animate-pulse" />
        <RotateCw className="w-10 h-10 text-act absolute -bottom-2 -right-2 animate-spin" />
      </div>
      <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-card uppercase tracking-wide mb-3">
        {lang === 'hi'
          ? 'टैबलेट को लैंडस्केप में घुमाएँ'
          : lang === 'mr'
          ? 'टॅबलेट लँडस्केपमध्ये फिरवा'
          : 'Rotate to Landscape Mode'}
      </h2>
      <p className="font-body text-concrete/90 text-lg max-w-md font-medium">
        {t.rotateDevicePrompt}
      </p>
      <div className="mt-8 px-4 py-2 bg-card/10 border border-card/20 rounded-xl text-xs font-mono tracking-widest text-act uppercase">
        Ather AURIC Floor Operations · Landscape Optimized
      </div>
    </aside>
  );
}
