import React from 'react';
import type { LanguageCode } from '../../engine/types';

interface LanguageSwitcherProps {
  currentLang: LanguageCode;
  onSelectLang: (lang: LanguageCode) => void;
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  currentLang,
  onSelectLang,
  className = ''
}) => {
  const languages: { code: LanguageCode; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिंदी' },
    { code: 'mr', label: 'मराठी' }
  ];

  return (
    <div className={`inline-flex items-center p-1 rounded-xl bg-slate-100/90 border border-slate-200/80 shadow-2xs ${className}`}>
      {languages.map(({ code, label }) => {
        const isActive = currentLang === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => onSelectLang(code)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              isActive
                ? 'bg-white text-blue-700 shadow-xs font-extrabold'
                : 'text-slate-500 hover:text-slate-800 hover:bg-white/50'
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};
