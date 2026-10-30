import React from 'react';
import { playFeedbackTone } from '../engine/sound';

interface TactileButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  soundTone?: 'positive' | 'negative' | 'neutral' | 'none';
  soundEnabled?: boolean;
  children: React.ReactNode;
}

export const TactileButton = React.forwardRef<HTMLButtonElement, TactileButtonProps>(
  (
    {
      variant = 'secondary',
      size = 'md',
      soundTone = 'positive',
      soundEnabled = true,
      className = '',
      onClick,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      if (soundTone !== 'none' && soundEnabled) {
        playFeedbackTone(soundTone === 'positive', true, false);
      }
      onClick?.(e);
    };

    // Standard tactile sizing: strictly >= 64px for md/lg/xl, sm is >= 48px
    const sizeClasses = {
      sm: 'min-h-[48px] px-3.5 py-2 text-sm',
      md: 'min-h-[64px] px-5 py-3 text-base sm:text-lg',
      lg: 'min-h-[72px] px-6 py-4 text-lg sm:text-xl',
      xl: 'min-h-[80px] px-8 py-5 text-xl sm:text-2xl font-black'
    }[size];

    const variantClasses = {
      primary:
        'bg-act text-card border-3 border-ink shadow-[4px_4px_0px_#14232b] hover:bg-act/95 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#14232b]',
      secondary:
        'bg-card text-ink border-3 border-ink shadow-[4px_4px_0px_#14232b] hover:bg-concrete/40 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#14232b]',
      success:
        'bg-ok text-card border-3 border-ink shadow-[4px_4px_0px_#14232b] hover:bg-ok/95 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#14232b]',
      danger:
        'bg-no text-card border-3 border-ink shadow-[4px_4px_0px_#14232b] hover:bg-no/95 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#14232b]',
      ghost:
        'bg-transparent text-ink border-2 border-transparent hover:border-ink hover:bg-card/50 active:translate-y-[1px]'
    }[variant];

    const disabledClasses = disabled
      ? 'opacity-40 cursor-not-allowed shadow-none active:translate-x-0 active:translate-y-0 active:shadow-none pointer-events-none'
      : 'cursor-pointer';

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        onClick={handleClick}
        className={`font-heading font-bold tracking-wide rounded-2xl inline-flex items-center justify-center gap-3 transition-all select-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-act/50 ${sizeClasses} ${variantClasses} ${disabledClasses} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

TactileButton.displayName = 'TactileButton';
