import { useState } from 'react';
import type { SettingsConfig, LanguageCode } from '../engine/types';
import { useTranslation } from '../i18n/translations';
import { idbStore } from '../store/idbStore';
import { X, Volume2, Smartphone, Trophy, Download, FileText, Check } from 'lucide-react';

interface SettingsModalProps {
  lang: LanguageCode;
  settings: SettingsConfig;
  onUpdateSettings: (newSettings: SettingsConfig) => void;
  onClose: () => void;
}

export function SettingsModal({
  lang,
  settings,
  onUpdateSettings,
  onClose
}: SettingsModalProps) {
  const t = useTranslation(lang);
  const [downloadMsg, setDownloadMsg] = useState<string | null>(null);

  const toggleLeaderboard = () => {
    onUpdateSettings({ ...settings, leaderboardEnabled: !settings.leaderboardEnabled });
  };

  const toggleSound = () => {
    onUpdateSettings({ ...settings, soundEnabled: !settings.soundEnabled });
  };

  const toggleVibration = () => {
    onUpdateSettings({ ...settings, vibrationEnabled: !settings.vibrationEnabled });
  };

  const toggleAutoRead = () => {
    onUpdateSettings({ ...settings, autoReadTTS: !settings.autoReadTTS });
  };

  const handleExportCSV = async () => {
    const records = await idbStore.exportAllRecords();
    if (records.length === 0) {
      setDownloadMsg('No completions recorded yet.');
      setTimeout(() => setDownloadMsg(null), 2500);
      return;
    }

    const headers = [
      'WorkerName',
      'PackId',
      'Mode',
      'Stars',
      'XpGained',
      'AccuracyPct',
      'SafetyPassed',
      'CompletedAt'
    ];

    const rows = records.map((r: any) => [
      `"${r.workerName || 'Operator'}"`,
      r.packId,
      r.mode,
      r.stars,
      r.xpGained,
      `${r.accuracyPct}%`,
      r.safetyPassed ? 'YES' : 'NO',
      r.timestamp || r.completedAt || new Date().toISOString()
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ather_completions_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadMsg('CSV exported successfully!');
    setTimeout(() => setDownloadMsg(null), 2500);
  };

  const handleExportJSON = async () => {
    const records = await idbStore.exportAllRecords();
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(records, null, 2));
    const link = document.createElement('a');
    link.setAttribute('href', dataStr);
    link.setAttribute('download', `ather_completions_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadMsg('JSON exported successfully!');
    setTimeout(() => setDownloadMsg(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card border-3 border-ink rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl flex flex-col gap-5 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-ink pb-4">
          <h2 className="font-heading text-3xl font-extrabold text-ink">
            {t.settings}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="w-11 h-11 flex items-center justify-center rounded-xl bg-concrete border-2 border-ink hover:bg-no hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Toggles */}
        <div className="flex flex-col gap-3">
          {/* Leaderboard toggle */}
          <button
            type="button"
            onClick={toggleLeaderboard}
            className="flex items-center justify-between p-4 bg-concrete/40 rounded-xl border-2 border-ink hover:bg-concrete transition-all text-left"
          >
            <div className="flex items-center gap-3">
              <Trophy className="w-6 h-6 text-act" />
              <div>
                <div className="font-heading font-bold text-lg text-ink">
                  {t.leaderboardToggle}
                </div>
                <div className="text-xs text-ink/70">
                  Allow workers to view tablet top scores
                </div>
              </div>
            </div>
            <div
              className={`w-14 h-8 rounded-full border-2 border-ink p-1 transition-colors flex items-center ${
                settings.leaderboardEnabled ? 'bg-ok justify-end' : 'bg-concrete justify-start'
              }`}
            >
              <div className="w-5 h-5 rounded-full bg-white border border-ink shadow-sm" />
            </div>
          </button>

          {/* Sound synth */}
          <button
            type="button"
            onClick={toggleSound}
            className="flex items-center justify-between p-4 bg-concrete/40 rounded-xl border-2 border-ink hover:bg-concrete transition-all text-left"
          >
            <div className="flex items-center gap-3">
              <Volume2 className="w-6 h-6 text-act" />
              <div className="font-heading font-bold text-lg text-ink">
                {t.soundEffects}
              </div>
            </div>
            <div
              className={`w-14 h-8 rounded-full border-2 border-ink p-1 transition-colors flex items-center ${
                settings.soundEnabled ? 'bg-ok justify-end' : 'bg-concrete justify-start'
              }`}
            >
              <div className="w-5 h-5 rounded-full bg-white border border-ink shadow-sm" />
            </div>
          </button>

          {/* Vibration */}
          <button
            type="button"
            onClick={toggleVibration}
            className="flex items-center justify-between p-4 bg-concrete/40 rounded-xl border-2 border-ink hover:bg-concrete transition-all text-left"
          >
            <div className="flex items-center gap-3">
              <Smartphone className="w-6 h-6 text-act" />
              <div className="font-heading font-bold text-lg text-ink">
                {t.vibration}
              </div>
            </div>
            <div
              className={`w-14 h-8 rounded-full border-2 border-ink p-1 transition-colors flex items-center ${
                settings.vibrationEnabled ? 'bg-ok justify-end' : 'bg-concrete justify-start'
              }`}
            >
              <div className="w-5 h-5 rounded-full bg-white border border-ink shadow-sm" />
            </div>
          </button>

          {/* Auto Read TTS */}
          <button
            type="button"
            onClick={toggleAutoRead}
            className="flex items-center justify-between p-4 bg-concrete/40 rounded-xl border-2 border-ink hover:bg-concrete transition-all text-left"
          >
            <div className="flex items-center gap-3">
              <Volume2 className="w-6 h-6 text-act" />
              <div className="font-heading font-bold text-lg text-ink">
                {t.autoReadTTS}
              </div>
            </div>
            <div
              className={`w-14 h-8 rounded-full border-2 border-ink p-1 transition-colors flex items-center ${
                settings.autoReadTTS ? 'bg-ok justify-end' : 'bg-concrete justify-start'
              }`}
            >
              <div className="w-5 h-5 rounded-full bg-white border border-ink shadow-sm" />
            </div>
          </button>
        </div>

        {/* Supervisor Export Section */}
        <div className="flex flex-col gap-3 pt-3 border-t-2 border-ink/40">
          <span className="font-heading font-bold text-sm tracking-wider uppercase text-ink/70">
            Supervisor Floor Admin Export:
          </span>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleExportCSV}
              className="flex items-center justify-center gap-2 p-3 bg-card border-2 border-ink rounded-xl font-heading text-base font-bold text-ink hover:bg-act transition-all shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>{t.exportCsv}</span>
            </button>
            <button
              type="button"
              onClick={handleExportJSON}
              className="flex items-center justify-center gap-2 p-3 bg-card border-2 border-ink rounded-xl font-heading text-base font-bold text-ink hover:bg-act transition-all shadow-sm"
            >
              <FileText className="w-4 h-4" />
              <span>{t.exportJson}</span>
            </button>
          </div>

          {downloadMsg && (
            <div className="flex items-center gap-2 p-2.5 bg-ok/20 border-2 border-ok rounded-xl text-sm font-bold text-ink justify-center">
              <Check className="w-4 h-4 text-ok" />
              <span>{downloadMsg}</span>
            </div>
          )}
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="min-h-[58px] bg-ink text-white border-3 border-ink rounded-xl font-heading text-xl font-bold tracking-wide hover:bg-ink/90 active:scale-95 transition-all mt-2"
        >
          {t.close}
        </button>
      </div>
    </div>
  );
}
