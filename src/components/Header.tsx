import { useState, useEffect } from 'react';
import type { LanguageCode, TrainingMode } from '../engine/types';
import { useTranslation } from '../i18n/translations';
import { Maximize2, Minimize2, Settings, Home } from 'lucide-react';

interface HeaderProps {
  lang: LanguageCode;
  mode: TrainingMode;
  onLanguageChange: (lang: LanguageCode) => void;
  onModeChange: (mode: TrainingMode) => void;
  onOpenSettings: () => void;
  onGoHome?: () => void;
  isHome?: boolean;
}

const LANGUAGES: Array<{ code: LanguageCode; label: string }> = [
  { code: 'en', label: 'EN' },
  { code: 'hi', label: 'हिं' },
  { code: 'mr', label: 'मरा' }
];

export function Header({
  lang,
  mode,
  onLanguageChange,
  onModeChange,
  onOpenSettings,
  onGoHome,
  isHome = false
}: HeaderProps) {
  const t = useTranslation(lang);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = () => {
    try {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    } catch {}
  };

  return (
    <header className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 bg-card border-b-3 border-ink select-none sticky top-0 z-40 shadow-sm">
      {/* Brand & Home */}
      <div className="flex items-center gap-3">
        {!isHome && onGoHome && (
          <button
            type="button"
            onClick={onGoHome}
            title={t.home}
            className="flex items-center justify-center w-12 h-12 bg-concrete border-2 border-ink rounded-xl hover:bg-act hover:text-ink active:scale-95 transition-all text-ink"
          >
            <Home className="w-6 h-6" />
          </button>
        )}
        <div className="flex items-center gap-2">
          <span className="text-3xl">🏭</span>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-wide text-ink">
            {t.title}
          </h1>
        </div>
      </div>

      {/* Control Tools */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Guided vs Practice Toggle */}
        <div className="flex rounded-xl border-2 border-ink overflow-hidden bg-card">
          <button
            type="button"
            onClick={() => onModeChange('guided')}
            className={`px-3 sm:px-4 py-2 font-heading text-base sm:text-lg font-bold transition-colors ${
              mode === 'guided' ? 'bg-ink text-white' : 'text-ink hover:bg-concrete'
            }`}
          >
            {t.guided}
          </button>
          <button
            type="button"
            onClick={() => onModeChange('practice')}
            className={`px-3 sm:px-4 py-2 font-heading text-base sm:text-lg font-bold transition-colors ${
              mode === 'practice' ? 'bg-ink text-white' : 'text-ink hover:bg-concrete'
            }`}
          >
            {t.practice}
          </button>
        </div>

        {/* Language Switcher */}
        <div className="flex rounded-xl border-2 border-ink overflow-hidden bg-card">
          {LANGUAGES.map((item) => (
            <button
              key={item.code}
              type="button"
              onClick={() => onLanguageChange(item.code)}
              className={`px-3 sm:px-3.5 py-2 font-heading text-base sm:text-lg font-bold transition-colors ${
                lang === item.code ? 'bg-ink text-white' : 'text-ink hover:bg-concrete'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Fullscreen Button */}
        <button
          type="button"
          onClick={toggleFullscreen}
          title={isFullscreen ? t.exitFullscreen : t.fullscreen}
          className="flex items-center justify-center w-11 h-11 bg-card border-2 border-ink rounded-xl text-ink hover:bg-concrete active:scale-95 transition-all"
        >
          {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
        </button>

        {/* Settings Gear */}
        <button
          type="button"
          onClick={onOpenSettings}
          title={t.settings}
          className="flex items-center justify-center w-11 h-11 bg-card border-2 border-ink rounded-xl text-ink hover:bg-concrete active:scale-95 transition-all"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
