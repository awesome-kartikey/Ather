import React, { useState, useEffect } from 'react';
import {
  FastForward,
  SkipForward,
  Eye,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Compass,
  X,
  Sparkles,
  Zap,
  AlertTriangle
} from 'lucide-react';
import { category1Stages } from '../../content/category1';
import { category2Stages } from '../../content/category2';
import type { StoryStage, LanguageCode } from '../../engine/story/types';

const allStages: StoryStage[] = [
  ...category1Stages,
  ...category2Stages
];

export const DevFloatingToolbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'jump' | 'answer'>('jump');

  // Selected stage & scene in the dev selector
  const [selectedStageIdx, setSelectedStageIdx] = useState<number>(0);
  const [selectedSceneIdx, setSelectedSceneIdx] = useState<number>(0);

  // Live state from StoryStagePlayer (synced via window / custom events)
  const [liveState, setLiveState] = useState<{
    stageIndex: number;
    sceneIndex: number;
    phase: string;
    stageData?: StoryStage;
    scene?: any;
    xp: number;
    hearts: number;
    lang: LanguageCode;
  } | null>(null);

  // Sync with StoryStagePlayer live state
  useEffect(() => {
    if (!import.meta.env.DEV) return;

    const handleSync = () => {
      const devState = (window as any).__ATHER_DEV_STATE__;
      if (devState) {
        setLiveState({
          stageIndex: devState.currentStageIndex,
          sceneIndex: devState.currentSceneIndex,
          phase: devState.phase,
          stageData: devState.stageData,
          scene: devState.scene,
          xp: devState.xp,
          hearts: devState.hearts,
          lang: devState.lang || 'en'
        });
        setSelectedStageIdx(devState.currentStageIndex);
        setSelectedSceneIdx(devState.currentSceneIndex);
      }
    };

    handleSync();
    window.addEventListener('ather:dev:state-updated', handleSync);
    window.addEventListener('hashchange', handleSync);

    // Keyboard shortcut to toggle toolbar: Ctrl+Shift+D or `
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'd') || e.key === '`') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('ather:dev:state-updated', handleSync);
      window.removeEventListener('hashchange', handleSync);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Absolute production guard: never render in production builds
  if (!import.meta.env.DEV) {
    return null;
  }

  // When changing stage dropdown in toolbar, reset scene dropdown to 0
  const handleStageSelectChange = (newStageIdx: number) => {
    setSelectedStageIdx(newStageIdx);
    setSelectedSceneIdx(0);
  };

  const selectedStage = allStages[selectedStageIdx] || allStages[0];
  const selectedScene = selectedStage?.scenes?.[selectedSceneIdx] || selectedStage?.scenes?.[0];

  // Active scene to inspect (prefer live scene if playing, otherwise selected scene)
  const activeInspectionScene = liveState?.scene || selectedScene;
  const activeInteraction = activeInspectionScene?.interaction;

  // Jump to specific screen/scene
  const executeJump = (
    targetStage: number,
    targetScene: number,
    targetPhase: 'intro' | 'interaction_paused' | 'gateway' = 'interaction_paused'
  ) => {
    const hash = window.location.hash;
    const isAlreadyOnStory = hash.startsWith('#player') || hash.startsWith('#story');

    if (isAlreadyOnStory) {
      window.dispatchEvent(
        new CustomEvent('ather:dev:jump', {
          detail: {
            stageIndex: targetStage,
            sceneIndex: targetScene,
            phase: targetPhase
          }
        })
      );
      window.location.hash = `#player?stage=${targetStage + 1}&scene=${targetScene + 1}&phase=${
        targetPhase === 'interaction_paused' ? 'question' : targetPhase
      }`;
    } else {
      window.location.hash = `#player?stage=${targetStage + 1}&scene=${targetScene + 1}&phase=${
        targetPhase === 'interaction_paused' ? 'question' : targetPhase
      }`;
    }
  };

  // Skip current scene
  const executeSkip = () => {
    window.dispatchEvent(new CustomEvent('ather:dev:skip'));
  };

  // Solve current question (Simulates exact UI for correct or wrong answer)
  const executeSolve = (correct: boolean) => {
    window.dispatchEvent(
      new CustomEvent('ather:dev:solve', {
        detail: { correct }
      })
    );
  };

  // Reset current question back to unanswered
  const executeReset = () => {
    window.dispatchEvent(new CustomEvent('ather:dev:reset'));
  };

  // Quick navigation to other screens
  const navigateToScreen = (screenHash: string) => {
    window.location.hash = screenHash;
  };

  // Reset local storage
  const handleResetProgress = () => {
    try {
      localStorage.removeItem('ather_stage_idx');
      localStorage.removeItem('ather_scene_idx');
      localStorage.removeItem('ather_xp');
      alert('Local storage progress reset! Reloading page...');
      window.location.hash = '#portal';
      window.location.reload();
    } catch {}
  };

  // Unlock all stages
  const handleUnlockAll = () => {
    try {
      localStorage.setItem('ather_stage_idx', '11');
      localStorage.setItem('ather_scene_idx', '7');
      localStorage.setItem('ather_xp', '4500');
      alert('Unlocked all 12 modules with 4,500 XP! You can jump anywhere.');
    } catch {}
  };

  // Helper to format correct answers in clean Light Mode
  const renderCorrectAnswer = () => {
    if (!activeInteraction) {
      return (
        <div className="text-slate-500 text-xs italic p-2.5 bg-slate-50 rounded-xl border border-slate-200">
          No interactive question found in this scene.
        </div>
      );
    }

    const lang: LanguageCode = liveState?.lang || 'en';

    switch (activeInteraction.type) {
      case 'mcq': {
        const correctOptions = activeInteraction.options?.filter((o: any) => o.correct) || [];
        return (
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Correct Option ({correctOptions.length}):</span>
            </div>
            {correctOptions.map((opt: any, idx: number) => {
              const optIndex = activeInteraction.options.indexOf(opt);
              const letter = String.fromCharCode(65 + optIndex);
              const text = opt.label?.[lang] || opt.label?.en || opt.text || '';
              return (
                <div
                  key={opt.id || idx}
                  className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-start gap-1.5"
                >
                  <span className="font-mono font-black text-emerald-700 shrink-0">[{letter}]</span>
                  <span>{text}</span>
                </div>
              );
            })}
          </div>
        );
      }

      case 'sequence': {
        const steps = activeInteraction.steps || (activeInteraction as any).items || [];
        const correctOrder: string[] =
          activeInteraction.correctOrder ||
          (steps as any[])
            .slice()
            .sort((a: any, b: any) => (a.correctOrder || 0) - (b.correctOrder || 0))
            .map((s: any) => s.id) ||
          [];

        const orderedSteps = correctOrder
          .map((id) => steps.find((s: any) => s.id === id))
          .filter(Boolean);

        return (
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Chronological Sequence (1 to {orderedSteps.length}):</span>
            </div>
            <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
              {orderedSteps.map((step: any, idx: number) => {
                const label = step.label?.[lang] || step.label?.en || step.text || '';
                return (
                  <div
                    key={step.id || idx}
                    className="p-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs flex items-center gap-2"
                  >
                    <span className="w-5 h-5 rounded-md bg-emerald-600 text-white font-mono font-bold text-[11px] flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-sm shrink-0">{step.icon}</span>
                    <span className="truncate flex-1 font-medium">{label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      }

      case 'drag_drop': {
        const items = activeInteraction.items || [];
        const zones = activeInteraction.zones || [];
        return (
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Item ➔ Zone Assignments:</span>
            </div>
            <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
              {items.map((item: any, idx: number) => {
                const targetZone = zones.find((z: any) => z.id === item.targetZoneId);
                const itemText = item.label?.[lang] || item.label?.en || '';
                const zoneText = targetZone?.label?.[lang] || targetZone?.label?.en || item.targetZoneId;
                return (
                  <div
                    key={item.id || idx}
                    className="p-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-1.5 truncate flex-1">
                      <span>{item.icon}</span>
                      <span className="text-slate-800 truncate font-semibold">{itemText}</span>
                    </div>
                    <span className="text-emerald-600 font-bold shrink-0">➔</span>
                    <div className="flex items-center gap-1 shrink-0 px-2 py-0.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-[11px]">
                      <span>{targetZone?.icon || '📦'}</span>
                      <span>{zoneText}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      }

      case 'hotspot': {
        const targets = activeInteraction.targets || [];
        const correctTargets = targets.filter((t: any) => t.correct);
        return (
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Target Location:</span>
            </div>
            {correctTargets.map((t: any, idx: number) => (
              <div
                key={t.id || idx}
                className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs"
              >
                <span className="font-bold text-emerald-800">{t.label?.[lang] || t.label?.en}</span>
                {t.description && (
                  <p className="text-[11px] text-slate-600 mt-0.5">{t.description[lang] || t.description.en}</p>
                )}
              </div>
            ))}
          </div>
        );
      }

      case 'spot_error': {
        const options = activeInteraction.options || [];
        const violations = options.filter((o: any) => o.isViolation);
        return (
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Violations to Spot:</span>
            </div>
            {violations.map((o: any, idx: number) => (
              <div
                key={o.id || idx}
                className="p-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs"
              >
                <span className="font-bold text-rose-800">{o.label?.[lang] || o.label?.en}</span>
                {o.description && (
                  <p className="text-[11px] text-slate-600 mt-0.5">{o.description[lang] || o.description.en}</p>
                )}
              </div>
            ))}
          </div>
        );
      }

      case 'stop_go': {
        const isStop = activeInteraction.correctAction === 'stop';
        return (
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Mandatory Action:</span>
            </div>
            <div
              className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 ${
                isStop
                  ? 'bg-rose-50 border-rose-200 text-rose-800'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-800'
              }`}
            >
              <span className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-800 font-extrabold uppercase">
                {activeInteraction.correctAction}
              </span>
              <span>{isStop ? 'STOP WORK IMMEDIATELY' : 'PROCEED WITH OPERATION'}</span>
            </div>
          </div>
        );
      }

      case 'count_stepper': {
        return (
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Target Count:</span>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-mono text-xs font-bold flex items-center justify-between">
              <span>Required:</span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-extrabold text-sm">
                {activeInteraction.correctNumber}{' '}
                {activeInteraction.unit?.[lang] || activeInteraction.unit?.en || 'Units'}
              </span>
            </div>
          </div>
        );
      }

      default:
        return (
          <div className="text-slate-500 text-xs italic">
            Type: {(activeInteraction as any).type}
          </div>
        );
    }
  };

  return (
    <>
      {/* ── 1. Floating Trigger Pill (Light Mode & Minimal) ── */}
      <div className="fixed bottom-4 right-4 z-[9999] select-none font-sans">
        {!isOpen ? (
          <div className="flex items-center gap-1 bg-white/95 backdrop-blur-md border border-slate-200 text-slate-800 rounded-full p-1 shadow-lg hover:shadow-xl hover:border-blue-400 transition-all duration-200">
            {/* Main Toggle Button */}
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white cursor-pointer active:scale-95 transition-all shadow-xs"
              title="Open Dev Toolbar (Press ` to toggle)"
            >
              <Zap className="w-3.5 h-3.5 fill-white" />
              <span>DEV</span>
              {liveState && (
                <span className="px-1.5 py-0.2 rounded bg-blue-800/60 text-[10px] font-mono text-blue-100">
                  M{liveState.stageIndex + 1}:S{liveState.sceneIndex + 1}
                </span>
              )}
            </button>

            {/* Quick Pass button */}
            <button
              type="button"
              onClick={() => executeSolve(true)}
              title="Simulate Correct Answer (+XP, Success UI)"
              className="px-2.5 py-1 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer border border-emerald-200"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Pass</span>
            </button>

            {/* Quick Fail button */}
            <button
              type="button"
              onClick={() => executeSolve(false)}
              title="Simulate Wrong Answer (-1 Heart, Error UI)"
              className="px-2.5 py-1 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer border border-rose-200"
            >
              <XCircle className="w-3.5 h-3.5 text-rose-600" />
              <span>Fail</span>
            </button>

            {/* Quick Skip button */}
            <button
              type="button"
              onClick={executeSkip}
              title="Skip to Next Scene"
              className="p-1.5 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <FastForward className="w-4 h-4" />
            </button>

            {/* Quick Answer Toggle */}
            <button
              type="button"
              onClick={() => {
                setIsOpen(true);
                setActiveTab('answer');
              }}
              title="Inspect Answer"
              className="p-1.5 rounded-full text-amber-600 hover:text-amber-800 hover:bg-amber-50 transition-colors cursor-pointer"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        ) : (
          /* ── 2. Expanded Dev Console Window (Clean Light Mode) ── */
          <div className="w-[370px] sm:w-[390px] max-w-[calc(100vw-2rem)] max-h-[85vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden text-slate-800 animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="px-3.5 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-2 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-xs">
                  <Zap className="w-3.5 h-3.5 fill-white" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-xs text-slate-900 tracking-tight">
                      Ather QA Dev Tools
                    </span>
                    <span className="px-1.5 py-0.2 rounded bg-blue-100 text-blue-700 font-mono text-[9px] font-bold">
                      DEV
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500">
                    {liveState
                      ? `Module ${liveState.stageIndex + 1} · Scene ${liveState.sceneIndex + 1}`
                      : 'Scene Navigator & QA Solver'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                title="Minimize (or press `)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Simplified 2-Tab Navigation */}
            <div className="flex items-center border-b border-slate-200 bg-slate-100/70 p-1 shrink-0 text-xs font-bold">
              <button
                type="button"
                onClick={() => setActiveTab('jump')}
                className={`flex-1 py-1.5 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'jump'
                    ? 'bg-white text-blue-700 shadow-2xs font-extrabold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Jump & Navigate</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('answer')}
                className={`flex-1 py-1.5 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'answer'
                    ? 'bg-white text-emerald-700 shadow-2xs font-extrabold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Answer & Test</span>
              </button>
            </div>

            {/* Scrollable Content Body */}
            <div className="p-3.5 overflow-y-auto flex-1 space-y-3.5 min-h-0 text-slate-700">
              {/* ── TAB 1: JUMP TO ANY SCENE / SCREEN ── */}
              {activeTab === 'jump' && (
                <div className="space-y-3">
                  {/* Screen Quick Launch Pills */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1.5 tracking-wider">
                      Quick Screen Jump:
                    </label>
                    <div className="grid grid-cols-3 gap-1.5 text-xs font-semibold">
                      <button
                        type="button"
                        onClick={() => navigateToScreen('#portal')}
                        className="py-1.5 px-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-center cursor-pointer transition-colors"
                      >
                        🏠 Home
                      </button>
                      <button
                        type="button"
                        onClick={() => navigateToScreen('#signin')}
                        className="py-1.5 px-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-center cursor-pointer transition-colors"
                      >
                        ✍️ Sign-In
                      </button>
                      <button
                        type="button"
                        onClick={() => navigateToScreen('#player')}
                        className="py-1.5 px-2 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 text-center cursor-pointer font-bold transition-colors"
                      >
                        🎮 Player
                      </button>
                      <button
                        type="button"
                        onClick={() => navigateToScreen('#results')}
                        className="py-1.5 px-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-center cursor-pointer transition-colors"
                      >
                        📊 Results
                      </button>
                      <button
                        type="button"
                        onClick={() => navigateToScreen('#certificate')}
                        className="py-1.5 px-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-center cursor-pointer transition-colors"
                      >
                        📜 Certificate
                      </button>
                      <button
                        type="button"
                        onClick={() => navigateToScreen('#admin')}
                        className="py-1.5 px-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-center cursor-pointer transition-colors"
                      >
                        🛡️ Admin
                      </button>
                    </div>
                  </div>

                  {/* Module & Scene Selector */}
                  <div className="p-3 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-2.5">
                    <label className="block text-[10px] font-bold uppercase text-blue-700 tracking-wider">
                      Module & Scene Selector:
                    </label>

                    {/* Stage Select */}
                    <div>
                      <span className="block text-[10px] text-slate-500 mb-0.5">Select Module:</span>
                      <select
                        value={selectedStageIdx}
                        onChange={(e) => handleStageSelectChange(Number(e.target.value))}
                        className="w-full bg-white border border-slate-300 rounded-xl p-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer shadow-2xs"
                      >
                        {allStages.map((stage, idx) => (
                          <option key={stage.stageId || idx} value={idx}>
                            Module {idx + 1}: {stage.stageTitle?.en || `Stage ${idx + 1}`} ({stage.scenes.length} scenes)
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Scene Select */}
                    <div>
                      <span className="block text-[10px] text-slate-500 mb-0.5">Select Scene:</span>
                      <select
                        value={selectedSceneIdx}
                        onChange={(e) => setSelectedSceneIdx(Number(e.target.value))}
                        className="w-full bg-white border border-slate-300 rounded-xl p-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer shadow-2xs"
                      >
                        {selectedStage.scenes.map((sc, idx) => (
                          <option key={sc.id || idx} value={idx}>
                            Scene {idx + 1}: {sc.title?.en || `Scene ${idx + 1}`} [{sc.interaction.type.toUpperCase()}]
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Primary Jump Action */}
                    <button
                      type="button"
                      onClick={() => executeJump(selectedStageIdx, selectedSceneIdx, 'interaction_paused')}
                      className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-sm active:scale-98 transition-all"
                    >
                      <Zap className="w-3.5 h-3.5 fill-white" />
                      <span>Jump to Scene Question Screen</span>
                    </button>

                    <div className="flex items-center gap-2 pt-0.5">
                      <button
                        type="button"
                        onClick={() => executeJump(selectedStageIdx, selectedSceneIdx, 'intro')}
                        className="flex-1 py-1.5 px-2 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 text-xs font-semibold text-center cursor-pointer transition-colors shadow-2xs"
                      >
                        <span>🎬 Intro Video</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => executeJump(selectedStageIdx, selectedSceneIdx, 'gateway')}
                        className="flex-1 py-1.5 px-2 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 text-xs font-semibold text-center cursor-pointer transition-colors shadow-2xs"
                      >
                        <span>🏆 Milestone</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ── TAB 2: ANSWER REVEALER & OUTCOME TESTER ── */}
              {activeTab === 'answer' && (
                <div className="space-y-3">
                  {/* Current Scene Header */}
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[10px] font-bold uppercase text-slate-400">Current Scene:</span>
                      {activeInspectionScene && (
                        <span className="px-1.5 py-0.2 rounded bg-blue-50 text-blue-700 text-[10px] font-bold uppercase">
                          {activeInspectionScene.interaction?.type}
                        </span>
                      )}
                    </div>
                    <h4 className="text-xs font-extrabold text-slate-900">
                      {activeInspectionScene?.title?.en || 'Active Scene'}
                    </h4>
                  </div>

                  {/* Formatted Answer Card */}
                  <div className="p-3 rounded-2xl bg-slate-50/90 border border-slate-200 space-y-2">
                    {renderCorrectAnswer()}
                  </div>

                  {/* Visual UI Simulation Controls */}
                  <div className="space-y-2 pt-1">
                    <button
                      type="button"
                      onClick={() => executeSolve(true)}
                      className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-sm active:scale-98 transition-all"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Simulate CORRECT (+XP, Success UI)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => executeSolve(false)}
                      className="w-full py-2.5 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-sm active:scale-98 transition-all"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Simulate WRONG (-1 Heart, Error UI)</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={executeReset}
                        className="flex-1 py-1.5 px-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1 cursor-pointer transition-colors shadow-2xs"
                      >
                        <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                        <span>Reset Question</span>
                      </button>

                      <button
                        type="button"
                        onClick={executeSkip}
                        className="flex-1 py-1.5 px-2 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 font-bold text-xs flex items-center justify-center gap-1 cursor-pointer transition-colors shadow-2xs"
                      >
                        <SkipForward className="w-3.5 h-3.5 text-blue-600" />
                        <span>Skip Scene</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Simplified Light Footer: Storage & Hotkey */}
            <div className="px-3.5 py-2 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 shrink-0">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleUnlockAll}
                  className="font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer flex items-center gap-1"
                  title="Unlock all 12 modules with 4,500 XP"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Unlock All</span>
                </button>
                <span>·</span>
                <button
                  type="button"
                  onClick={handleResetProgress}
                  className="font-bold text-rose-600 hover:text-rose-800 cursor-pointer"
                  title="Reset local storage and restart"
                >
                  Reset Data
                </button>
              </div>

              <span className="text-[10px] text-slate-400 font-mono">
                Press <kbd className="px-1 py-0.5 rounded bg-white border border-slate-200 text-slate-600 font-bold">`</kbd>
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
