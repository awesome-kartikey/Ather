import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useConfirmStore } from '../../store/useConfirmStore';
import { AlertOctagon, AlertCircle, HelpCircle, Info } from 'lucide-react';

export const ConfirmModal: React.FC = () => {
  const { isOpen, options, closeConfirm } = useConfirmStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        closeConfirm(false);
      } else if (e.key === 'Enter') {
        closeConfirm(true);
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, closeConfirm]);

  if (!isOpen) return null;

  const variant = options.variant || 'danger';

  const config = {
    danger: {
      iconBg: 'bg-red-100 text-red-600 border border-red-200',
      icon: <AlertOctagon className="w-7 h-7 sm:w-8 sm:h-8" />,
      confirmBtn:
        'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white shadow-md shadow-red-500/25 focus:ring-red-500',
      glow: 'bg-red-500/10',
    },
    warning: {
      iconBg: 'bg-amber-100 text-amber-600 border border-amber-200',
      icon: <AlertCircle className="w-7 h-7 sm:w-8 sm:h-8" />,
      confirmBtn:
        'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-md shadow-amber-500/25 focus:ring-amber-500',
      glow: 'bg-amber-500/10',
    },
    primary: {
      iconBg: 'bg-blue-100 text-blue-600 border border-blue-200',
      icon: <HelpCircle className="w-7 h-7 sm:w-8 sm:h-8" />,
      confirmBtn:
        'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md shadow-blue-500/25 focus:ring-blue-500',
      glow: 'bg-blue-500/10',
    },
    info: {
      iconBg: 'bg-cyan-100 text-cyan-600 border border-cyan-200',
      icon: <Info className="w-7 h-7 sm:w-8 sm:h-8" />,
      confirmBtn:
        'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white shadow-md shadow-cyan-500/25 focus:ring-cyan-500',
      glow: 'bg-cyan-500/10',
    },
  }[variant];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => closeConfirm(false)}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm cursor-pointer"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 12 }}
          transition={{ type: 'spring', duration: 0.3, bounce: 0.15 }}
          className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-7 overflow-hidden z-10"
        >
          {/* Subtle Ambient Top Glow */}
          <div
            className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 ${config.glow} rounded-full blur-2xl pointer-events-none`}
          />

          <div className="flex flex-col items-center text-center relative z-10">
            {/* Modal Icon Badge */}
            <div
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl ${config.iconBg} flex items-center justify-center mb-4 shadow-inner`}
            >
              {config.icon}
            </div>

            {/* Title */}
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight mb-2">
              {options.title}
            </h3>

            {/* Description */}
            {options.description && (
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6 max-w-sm">
                {options.description}
              </p>
            )}

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3 w-full mt-1">
              <button
                type="button"
                onClick={() => closeConfirm(false)}
                className="w-full py-2.5 sm:py-3 px-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs sm:text-sm transition-all focus:outline-none focus:ring-2 focus:ring-slate-300 cursor-pointer active:scale-98"
              >
                {options.cancelText || 'Cancel'}
              </button>

              <button
                type="button"
                autoFocus
                onClick={() => closeConfirm(true)}
                className={`w-full py-2.5 sm:py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all focus:outline-none focus:ring-2 active:scale-98 cursor-pointer ${config.confirmBtn}`}
              >
                {options.confirmText || 'Confirm'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
