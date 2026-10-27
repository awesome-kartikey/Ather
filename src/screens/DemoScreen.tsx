import { useState, useEffect, useRef } from 'react';
import type { TrainingPackData } from '../content/schema';
import type { LanguageCode, TrainingMode } from '../engine/types';
import { useTranslation } from '../i18n/translations';
import { StageVisualizer } from '../demos/stageVisualizer';
import { speakText, stopVoice } from '../engine/sound';
import { RotateCcw, Play, Home } from 'lucide-react';

interface DemoScreenProps {
  pack: TrainingPackData;
  lang: LanguageCode;
  mode: TrainingMode;
  onDone: () => void;
  onGoHome: () => void;
}

export function DemoScreen({
  pack,
  lang,
  mode,
  onDone,
  onGoHome
}: DemoScreenProps) {
  const t = useTranslation(lang);
  const [sceneIndex, setSceneIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [replayKey, setReplayKey] = useState<number>(0);

  const fallbackTimerRef = useRef<any>(null);

  const currentScene = pack.demoScenes[sceneIndex];
  const caption = currentScene ? currentScene.caption[lang] : '';

  useEffect(() => {
    if (!isPlaying || !currentScene) return;

    let advanceLocked = false;

    const advanceScene = () => {
      if (advanceLocked) return;
      advanceLocked = true;
      if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current);

      if (sceneIndex + 1 < pack.demoScenes.length) {
        setSceneIndex((prev) => prev + 1);
      } else {
        setIsPlaying(false);
      }
    };

    // Fallback timer (default 5.5s) if voice-over completes earlier or speech fails
    const timerDuration = currentScene.durationMs || 5000;
    fallbackTimerRef.current = setTimeout(advanceScene, timerDuration);

    // Speak caption
    const cleanupSpeech = speakText(
      caption,
      lang,
      currentScene.id,
      () => {
        // When speech finishes, wait 1.2s before advancing smoothly
        setTimeout(advanceScene, 1200);
      }
    );

    return () => {
      advanceLocked = true;
      if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current);
      cleanupSpeech();
      stopVoice();
    };
  }, [sceneIndex, isPlaying, lang, replayKey, pack.id]);

  const handleReplay = () => {
    stopVoice();
    setSceneIndex(0);
    setIsPlaying(true);
    setReplayKey((k) => k + 1);
  };

  const renderScene = () => {
    if (!currentScene) return null;
    return <StageVisualizer sceneKitId={currentScene.sceneKitId} lang={lang} />;
  };

  return (
    <div className="flex flex-col gap-5 max-w-4xl mx-auto p-4 sm:p-6 w-full animate-in fade-in duration-300">
      {/* Header Info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-4xl">{pack.icon}</span>
          <div>
            <h2 className="font-heading text-3xl font-extrabold text-ink">
              {pack.title[lang]} — {t.watchDemo}
            </h2>
            <span className="text-xs font-mono text-ink/60 uppercase tracking-wider">
              SCENE {sceneIndex + 1} OF {pack.demoScenes.length}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onGoHome}
          className="flex items-center gap-2 px-4 py-2 bg-card border-2 border-ink rounded-xl font-heading text-lg font-bold text-ink hover:bg-concrete transition-all"
        >
          <Home className="w-5 h-5" />
          <span>{t.home}</span>
        </button>
      </div>

      {/* SVG Demo Canvas Frame */}
      <div className="bg-card border-3 border-ink rounded-3xl p-4 sm:p-6 shadow-xl flex flex-col gap-4">
        <div
          key={`${sceneIndex}-${replayKey}`}
          className="w-full aspect-[600/270] bg-concrete/40 rounded-2xl border-2 border-ink/30 overflow-hidden flex items-center justify-center p-2 relative"
        >
          {renderScene()}
        </div>

        {/* Dynamic Caption */}
        <div className="min-h-[80px] flex items-center justify-center text-center px-4">
          <p className="font-heading text-2xl sm:text-3xl font-extrabold text-ink leading-snug animate-in fade-in duration-200">
            {caption}
          </p>
        </div>

        {/* Scene Slots Progress Bar */}
        <div className="flex gap-2 w-full px-2" role="progressbar">
          {pack.demoScenes.map((_, idx) => (
            <div
              key={idx}
              className={`flex-1 h-3.5 rounded-full border-2 border-ink transition-all ${
                idx < sceneIndex
                  ? 'bg-ok'
                  : idx === sceneIndex
                  ? 'bg-act ring-2 ring-act animate-pulse'
                  : 'bg-concrete'
              }`}
            />
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t-2 border-ink/20">
          <button
            type="button"
            onClick={handleReplay}
            className="flex items-center gap-2 min-h-[58px] px-6 bg-concrete border-2 border-ink rounded-2xl font-heading text-xl font-bold text-ink hover:bg-card active:scale-95 transition-all"
          >
            <RotateCcw className="w-5 h-5" />
            <span>{t.replay}</span>
          </button>

          <button
            type="button"
            onClick={onDone}
            className="flex items-center gap-2 min-h-[64px] px-8 bg-act text-ink border-3 border-ink rounded-2xl font-heading text-2xl font-extrabold uppercase hover:brightness-105 active:scale-95 transition-all shadow-md ml-auto"
          >
            <Play className="w-6 h-6 fill-ink" />
            <span>{mode === 'guided' ? t.startGuided : t.startPractice}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
