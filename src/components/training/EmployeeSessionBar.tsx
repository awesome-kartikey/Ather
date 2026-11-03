import React from 'react';
import { useConfirm } from '../../store/useConfirmStore';
import { LogOut, Award, Sparkles } from 'lucide-react';
import type { UserProfile } from '../../engine/types';

interface EmployeeSessionBarProps {
  profile: UserProfile;
  onEndSession: () => void;
}

export const EmployeeSessionBar: React.FC<EmployeeSessionBarProps> = ({ profile, onEndSession }) => {
  const confirm = useConfirm();

  const handleEndSession = async () => {
    const ok = await confirm({
      title: 'End Trainee Session',
      description: 'Are you sure you want to end your floor session? Current progress will be recorded.',
      confirmText: 'End Session',
      cancelText: 'Continue Training',
      variant: 'danger',
    });

    if (ok) {
      onEndSession();
    }
  };

  const initial = (profile.name?.trim().charAt(0) || 'O').toUpperCase();

  return (
    <div className="flex items-center gap-2 sm:gap-3 bg-white/90 backdrop-blur-md rounded-2xl p-1.5 pr-2.5 border border-slate-200/90 shadow-xs">
      <div className="flex items-center gap-2 px-2">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-extrabold text-xs shadow-xs">
          {initial}
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-slate-800 text-xs sm:text-sm leading-tight truncate max-w-[140px]">
            {profile.name || 'Floor Operator'}
          </span>
          <span className="text-slate-400 font-mono text-[10px] leading-tight">
            Score: {profile.xp || 0} pts · Streak: {profile.streak || 1}d
          </span>
        </div>
      </div>

      {profile.badges && profile.badges.length > 0 && (
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/10 border border-amber-500/25 rounded-lg text-amber-700 text-xs font-bold">
          <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <span>Certified ({profile.badges.length})</span>
          <Sparkles className="w-3 h-3 text-amber-500" />
        </div>
      )}

      <div className="h-6 w-px bg-slate-200 mx-0.5" />

      <button
        type="button"
        onClick={handleEndSession}
        className="flex items-center gap-1 px-2.5 py-1 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg text-xs font-semibold transition-all cursor-pointer"
        title="End Session"
      >
        <LogOut className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">End</span>
      </button>
    </div>
  );
};
