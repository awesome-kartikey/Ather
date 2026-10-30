import type { LanguageCode, TrainingMode, UserProfile } from '../engine/types';
import { AtherLogo } from './AtherLogo';
import { useTranslation } from '../i18n/translations';
import { Settings, Maximize2, Minimize2, Home, Sparkles, Flame } from 'lucide-react';
import { getLevelInfo } from '../engine/gamification';

interface HeaderProps {
  lang: LanguageCode;
  mode: TrainingMode;
  profile: UserProfile;
  currentScreen: 'home' | 'run' | 'result' | 'certificate';
  onSelectLang: (lang: LanguageCode) => void;
  onSelectMode: (mode: TrainingMode) => void;
  onNavigateHome: () => void;
  onOpenSettings: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export function Header({
  lang,
  mode,
  profile,
  currentScreen,
  onSelectLang,
  onSelectMode,
  onNavigateHome,
  onOpenSettings,
  isFullscreen,
  onToggleFullscreen
}: HeaderProps) {
  const t = useTranslation(lang);
  const levelInfo = getLevelInfo(profile.xp);

  return (
    <header className="w-full bg-card border-b-3 border-ink px-4 sm:px-6 py-3 shadow-[0_4px_0px_rgba(20,35,43,0.06)] sticky top-0 z-40 select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Brand + Document Badge */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onNavigateHome}
            aria-label="Navigate to Home Terminal"
            className="cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-act rounded-xl"
          >
            <AtherLogo />
          </button>

          <div className="hidden md:flex flex-col border-l-2 border-ink/20 pl-4">
            <div className="flex items-center gap-2">
              <span className="font-heading font-extrabold text-xs uppercase px-2 py-0.5 bg-act/15 text-act rounded border border-act/30">
                {t.stage1Badge}
              </span>
              <span className="font-mono text-[11px] text-ink/70 font-semibold">
                {t.docNumber}
              </span>
            </div>
            <span className="text-xs font-semibold text-ink/80 truncate max-w-[280px]">
              AURIC Inbound Warehouse Operations
            </span>
          </div>
        </div>

        {/* Center: Operator HUD Chip (when on home or run) */}
        <div className="hidden lg:flex items-center gap-2.5 bg-concrete px-3.5 py-1.5 rounded-xl border-2 border-ink shadow-[2px_2px_0px_#14232b]">
          <div className="flex items-center gap-1.5 text-xs font-heading font-extrabold text-ink uppercase">
            <span className="w-2 h-2 rounded-full bg-ok animate-pulse" />
            <span>{profile.name || 'Floor Operator'}</span>
          </div>
          <span className="text-ink/30 font-bold">|</span>
          <div className="flex items-center gap-1 text-xs font-heading font-bold text-ink">
            <Sparkles className="w-3.5 h-3.5 text-act" />
            <span>{levelInfo.currentLevel.title[lang]}</span>
            <span className="font-mono text-act font-extrabold">({profile.xp} XP)</span>
          </div>
          <span className="text-ink/30 font-bold">|</span>
          <div className="flex items-center gap-1 text-xs font-heading font-bold text-ink">
            <Flame className="w-3.5 h-3.5 text-act" />
            <span>{profile.streak || 1}d</span>
          </div>
        </div>

        {/* Right: Controls & Language Switcher */}
        <div className="flex items-center gap-2">
          {/* Home button when away from home */}
          {currentScreen !== 'home' && (
            <button
              type="button"
              onClick={onNavigateHome}
              title={t.home}
              className="min-h-[48px] px-3 bg-card hover:bg-concrete border-2 border-ink rounded-xl text-ink font-heading font-bold text-sm flex items-center gap-1.5 shadow-[2px_2px_0px_#14232b] active:translate-y-[1px] active:shadow-none cursor-pointer"
            >
              <Home className="w-4 h-4 text-act" />
              <span className="hidden sm:inline">{t.home}</span>
            </button>
          )}

          {/* Mode Pill Toggle (Guided vs Practice) */}
          <div className="flex bg-concrete p-1 rounded-xl border-2 border-ink shadow-[2px_2px_0px_#14232b]">
            <button
              type="button"
              onClick={() => onSelectMode('guided')}
              className={`min-h-[40px] px-3 rounded-lg font-heading font-extrabold text-xs sm:text-sm tracking-wide transition-all cursor-pointer ${
                mode === 'guided'
                  ? 'bg-act text-card shadow-sm'
                  : 'text-ink/80 hover:text-ink'
              }`}
            >
              {t.guided}
            </button>
            <button
              type="button"
              onClick={() => onSelectMode('practice')}
              className={`min-h-[40px] px-3 rounded-lg font-heading font-extrabold text-xs sm:text-sm tracking-wide transition-all cursor-pointer ${
                mode === 'practice'
                  ? 'bg-act text-card shadow-sm'
                  : 'text-ink/80 hover:text-ink'
              }`}
            >
              {t.practice}
            </button>
          </div>

          {/* Trilingual Switcher (EN | हिंदी | मराठी) - glove friendly */}
          <div className="flex bg-concrete p-1 rounded-xl border-2 border-ink shadow-[2px_2px_0px_#14232b]">
            {(['en', 'hi', 'mr'] as LanguageCode[]).map((code) => {
              const labelMap: Record<LanguageCode, string> = {
                en: 'EN',
                hi: 'हिंदी',
                mr: 'मराठी'
              };
              const active = lang === code;
              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => onSelectLang(code)}
                  className={`min-h-[40px] px-2.5 sm:px-3 rounded-lg font-heading font-extrabold text-xs sm:text-sm transition-all cursor-pointer ${
                    active
                      ? 'bg-ink text-card shadow-sm'
                      : 'text-ink/70 hover:text-ink hover:bg-card/50'
                  }`}
                >
                  {labelMap[code]}
                </button>
              );
            })}
          </div>

          {/* Fullscreen Button */}
          <button
            type="button"
            onClick={onToggleFullscreen}
            aria-label={isFullscreen ? t.exitFullscreen : t.fullscreen}
            title={isFullscreen ? t.exitFullscreen : t.fullscreen}
            className="w-12 h-12 bg-card hover:bg-concrete border-2 border-ink rounded-xl flex items-center justify-center text-ink shadow-[2px_2px_0px_#14232b] active:translate-y-[1px] active:shadow-none cursor-pointer"
          >
            {isFullscreen ? (
              <Minimize2 className="w-5 h-5 text-ink" />
            ) : (
              <Maximize2 className="w-5 h-5 text-ink" />
            )}
          </button>

          {/* Settings Trigger */}
          <button
            type="button"
            onClick={onOpenSettings}
            aria-label={t.settings}
            title={t.settings}
            className="w-12 h-12 bg-card hover:bg-concrete border-2 border-ink rounded-xl flex items-center justify-center text-ink shadow-[2px_2px_0px_#14232b] active:translate-y-[1px] active:shadow-none cursor-pointer"
          >
            <Settings className="w-5 h-5 text-ink" />
          </button>
        </div>
      </div>
    </header>
  );
}
