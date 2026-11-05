import React, { useState } from 'react';
import type { UpdateInfo } from '../../services/autoUpdate';
import { installAppUpdate } from '../../services/autoUpdate';
import { Download, RefreshCw, X, Sparkles, CheckCircle2 } from 'lucide-react';

interface UpdateModalProps {
  updateInfo: UpdateInfo;
  onClose: () => void;
}

export const UpdateModal: React.FC<UpdateModalProps> = ({ updateInfo, onClose }) => {
  const [installing, setInstalling] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleDismiss = () => {
    try {
      localStorage.setItem('ather_dismissed_update_version', updateInfo.latestVersion);
    } catch {}
    onClose();
  };

  const handleUpdate = async () => {
    setInstalling(true);
    setFeedback('Initiating update download...');
    const result = await installAppUpdate(updateInfo.downloadUrl, updateInfo.latestVersion);
    setFeedback(result.message);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border-2 border-emerald-500 overflow-hidden transform transition-all animate-scale-up"
        role="dialog"
        aria-modal="true"
      >
        {/* Header gradient banner */}
        <div className="bg-gradient-to-r from-[#14232b] via-[#1a3340] to-[#14232b] px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight tracking-wide">New Update Available</h3>
              <p className="text-xs text-slate-300">Ather Warehouse Training Floor App</p>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Dismiss"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 space-y-4">
          {/* Version badge pill comparison */}
          <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm">
            <div>
              <span className="text-xs text-slate-500 uppercase font-semibold block">Installed</span>
              <span className="font-mono font-bold text-slate-700">v{updateInfo.currentVersion}</span>
            </div>
            <div className="text-slate-400 font-bold">➔</div>
            <div className="text-right">
              <span className="text-xs text-emerald-600 uppercase font-semibold block">Latest Release</span>
              <span className="font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                v{updateInfo.latestVersion}
              </span>
            </div>
          </div>

          {/* Release Notes */}
          <div>
            <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">What's New</h4>
            <div className="max-h-36 overflow-y-auto bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-700 leading-relaxed font-sans whitespace-pre-wrap">
              {updateInfo.releaseNotes}
            </div>
          </div>

          {/* Feedback status message */}
          {feedback && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-800 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{feedback}</span>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleDismiss}
              className="flex-1 px-4 py-3 rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-100 font-semibold text-sm transition-colors"
            >
              Remind Later
            </button>
            <button
              type="button"
              onClick={handleUpdate}
              disabled={installing}
              className="flex-1 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-60"
            >
              {installing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Update Now
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
