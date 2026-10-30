import React from 'react';

interface AtherLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const AtherLogo: React.FC<AtherLogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: { icon: 'w-7 h-7 text-xs', text: 'text-lg', badge: 'text-[9px]' },
    md: { icon: 'w-9 h-9 text-sm', text: 'text-xl', badge: 'text-[10px]' },
    lg: { icon: 'w-12 h-12 text-base', text: 'text-2xl sm:text-3xl', badge: 'text-xs' },
  }[size];

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Sleek electric bolt badge */}
      <div
        className={`${sizeClasses.icon} rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 flex items-center justify-center text-white shadow-sm shadow-blue-500/20 shrink-0`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4"
        >
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      </div>

      <div className="flex flex-col text-left leading-none">
        <span className={`font-black tracking-tight text-slate-900 uppercase font-sans ${sizeClasses.text}`}>
          ATHER
        </span>
        <span className={`font-mono font-bold tracking-widest text-blue-600 uppercase ${sizeClasses.badge}`}>
          AURIC · M002
        </span>
      </div>
    </div>
  );
};
