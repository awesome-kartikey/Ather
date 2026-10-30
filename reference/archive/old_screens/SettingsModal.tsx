import type { SettingsConfig, LanguageCode } from '../engine/types';
import { useTranslation } from '../i18n/translations';
import { TactileButton } from '../components/TactileButton';
import { idbStore } from '../store/idbStore';
import { Volume2, Vibrate, Mic, Trophy, Download, Trash2, X, Settings } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  settings: SettingsConfig;
  lang: LanguageCode;
  onUpdateSettings: (updated: SettingsConfig) => void;
  onClose: () => void;
  onDataReset?: () => void;
}

export function SettingsModal({
  isOpen,
  settings,
  lang,
  onUpdateSettings,
  onClose,
  onDataReset
}: SettingsModalProps) {
  const t = useTranslation(lang);

  if (!isOpen) return null;

  const handleToggle = (key: keyof SettingsConfig) => {
    onUpdateSettings({
      ...settings,
      [key]: !settings[key]
    });
  };

  const handleExportJson = async () => {
    const runs = await idbStore.exportAllRecords();
    const blob = new Blob([JSON.stringify(runs, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ather_auric_floor_trainer_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportCsv = async () => {
    const runs = await idbStore.exportAllRecords();
    if (!runs || runs.length === 0) {
      alert('No training records available to export.');
      return;
    }

    const headers = [
      'Record ID',
      'Worker Name',
      'Pack ID',
      'Mode',
      'Stars',
      'XP Gained',
      'Accuracy %',
      'Correct Steps',
      'Total Steps',
      'Safety Passed',
      'Timestamp'
    ];

    const rows = runs.map((r: any) => [
      r.id || '',
      `"${r.workerName || 'Floor Operator'}"`,
      r.packId,
      r.mode,
      r.stars,
      r.xpGained,
      r.accuracyPct,
      r.correctSteps,
      r.totalSteps,
      r.safetyPassed ? 'YES' : 'NO',
      r.timestamp
    ]);

    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ather_auric_floor_records_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleResetData = async () => {
    if (confirm(t.clearConfirm)) {
      await idbStore.clearAllData();
      onDataReset?.();
      onClose();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/75 backdrop-blur-sm animate-in fade-in select-none"
    >
      <div className="bg-card w-full max-w-lg rounded-3xl border-3 border-ink shadow-[8px_8px_0px_#14232b] p-6 flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-ink/20 pb-4">
          <div className="flex items-center gap-2.5">
            <Settings className="w-6 h-6 text-act" />
            <h2 id="settings-modal-title" className="font-heading font-black text-2xl text-ink uppercase tracking-wide">
              {t.settings}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close settings"
            className="w-10 h-10 rounded-xl bg-concrete hover:bg-card border-2 border-ink flex items-center justify-center text-ink cursor-pointer active:translate-y-[1px]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toggles */}
        <div className="flex flex-col gap-3.5">
          {/* Sound Synth */}
          <div
            onClick={() => handleToggle('soundEnabled')}
            className="p-3.5 rounded-xl border-2 border-ink bg-concrete hover:bg-concrete/80 flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Volume2 className="w-5 h-5 text-act" />
              <span className="font-heading font-bold text-base text-ink">{t.soundEffects}</span>
            </div>
            <div
              className={`w-12 h-6 rounded-full border-2 border-ink flex items-center p-0.5 transition-all ${
                settings.soundEnabled ? 'bg-ok justify-end' : 'bg-concrete justify-start'
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-card border border-ink" />
            </div>
          </div>

          {/* Vibration */}
          <div
            onClick={() => handleToggle('vibrationEnabled')}
            className="p-3.5 rounded-xl border-2 border-ink bg-concrete hover:bg-concrete/80 flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Vibrate className="w-5 h-5 text-act" />
              <span className="font-heading font-bold text-base text-ink">{t.vibration}</span>
            </div>
            <div
              className={`w-12 h-6 rounded-full border-2 border-ink flex items-center p-0.5 transition-all ${
                settings.vibrationEnabled ? 'bg-ok justify-end' : 'bg-concrete justify-start'
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-card border border-ink" />
            </div>
          </div>

          {/* Auto Read TTS */}
          <div
            onClick={() => handleToggle('autoReadTTS')}
            className="p-3.5 rounded-xl border-2 border-ink bg-concrete hover:bg-concrete/80 flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Mic className="w-5 h-5 text-act" />
              <span className="font-heading font-bold text-base text-ink">{t.autoReadTTS}</span>
            </div>
            <div
              className={`w-12 h-6 rounded-full border-2 border-ink flex items-center p-0.5 transition-all ${
                settings.autoReadTTS ? 'bg-ok justify-end' : 'bg-concrete justify-start'
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-card border border-ink" />
            </div>
          </div>

          {/* Leaderboard Toggle */}
          <div
            onClick={() => handleToggle('leaderboardEnabled')}
            className="p-3.5 rounded-xl border-2 border-ink bg-concrete hover:bg-concrete/80 flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Trophy className="w-5 h-5 text-act" />
              <span className="font-heading font-bold text-base text-ink">
                {t.leaderboardToggle}
              </span>
            </div>
            <div
              className={`w-12 h-6 rounded-full border-2 border-ink flex items-center p-0.5 transition-all ${
                settings.leaderboardEnabled ? 'bg-ok justify-end' : 'bg-concrete justify-start'
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-card border border-ink" />
            </div>
          </div>
        </div>

        {/* Data Management Actions */}
        <div className="flex flex-col gap-2.5 border-t-2 border-ink/20 pt-4">
          <span className="font-heading font-bold text-xs uppercase text-ink/60">
            Data Export & Reset
          </span>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={handleExportCsv}
              className="p-2.5 rounded-xl border-2 border-ink bg-card hover:bg-concrete flex items-center justify-center gap-2 text-xs font-heading font-bold text-ink cursor-pointer"
            >
              <Download className="w-4 h-4 text-act" />
              <span>{t.exportCsv}</span>
            </button>
            <button
              type="button"
              onClick={handleExportJson}
              className="p-2.5 rounded-xl border-2 border-ink bg-card hover:bg-concrete flex items-center justify-center gap-2 text-xs font-heading font-bold text-ink cursor-pointer"
            >
              <Download className="w-4 h-4 text-act" />
              <span>{t.exportJson}</span>
            </button>
          </div>

          <button
            type="button"
            onClick={handleResetData}
            className="p-2.5 rounded-xl border-2 border-no bg-no/10 hover:bg-no/20 text-no flex items-center justify-center gap-2 text-xs font-heading font-bold cursor-pointer mt-1"
          >
            <Trash2 className="w-4 h-4" />
            <span>{t.clearData}</span>
          </button>
        </div>

        {/* Footer Close */}
        <TactileButton variant="primary" size="md" onClick={onClose} className="w-full">
          {t.close}
        </TactileButton>
      </div>
    </div>
  );
}
