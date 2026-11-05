import React, { useState, useEffect, useMemo } from 'react';
import {
  Users,
  Clock,
  Award,
  ShieldCheck,
  Search,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  RefreshCw,
  ArrowLeft,
  FileSpreadsheet,
  Layers,
  Sparkles,
  TrendingUp,
  Download
} from 'lucide-react';
import { AtherCapsuleLogo } from '../components/common/AtherCapsuleLogo';
import {
  subscribeEmployeeSessions,
  fetchAllSceneTelemetry,
  syncEmployeeSession,
  logSceneTelemetry,
  type EmployeeSessionRecord,
  type SceneTelemetryRecord,
  type TrainingCategory
} from '../services/firebase';
import {
  formatDuration,
  computeSceneBenchmarks,
  exportToExcel,
  exportToCsv
} from '../utils/exportUtils';

interface Props {
  onBackToPortal: () => void;
}

export const AdminPanel: React.FC<Props> = ({ onBackToPortal }) => {
  const [sessions, setSessions] = useState<EmployeeSessionRecord[]>([]);
  const [telemetry, setTelemetry] = useState<SceneTelemetryRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [categoryFilter, setCategoryFilter] = useState<'all' | TrainingCategory>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'in_progress' | 'completed'>('all');
  const [activeTab, setActiveTab] = useState<'roster' | 'benchmarks' | 'scoring_guide'>('roster');
  const [expandedOperatorId, setExpandedOperatorId] = useState<string | null>(null);

  // Subscribe to real-time employee sessions
  useEffect(() => {
    setLoading(true);
    const filter = categoryFilter === 'all' ? undefined : categoryFilter;
    const unsub = subscribeEmployeeSessions((data) => {
      setSessions(data);
      setLoading(false);
    }, filter);

    return () => unsub();
  }, [categoryFilter]);

  // Fetch telemetry logs
  const refreshTelemetry = async () => {
    const data = await fetchAllSceneTelemetry();
    setTelemetry(data);
  };

  useEffect(() => {
    refreshTelemetry();
  }, [sessions]);

  // Filtered session records
  const filteredSessions = useMemo(() => {
    return sessions.filter((s) => {
      const matchCategory =
        categoryFilter === 'all' || s.category === categoryFilter;
      const matchSearch =
        s.operatorId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.employeeName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus =
        statusFilter === 'all' || s.status === statusFilter;
      return matchCategory && matchSearch && matchStatus;
    });
  }, [sessions, categoryFilter, searchTerm, statusFilter]);

  // Benchmark stats
  const benchmarks = useMemo(() => {
    return computeSceneBenchmarks(telemetry);
  }, [telemetry]);

  // KPI Calculations
  const kpis = useMemo(() => {
    const totalTrainees = sessions.length;
    const completedCount = sessions.filter((s) => s.status === 'floor_ready').length;
    const totalDecisions = sessions.reduce((sum, s) => sum + (s.totalDecisionsCount || 0), 0);
    const correctDecisions = sessions.reduce((sum, s) => sum + (s.correctDecisionsCount || 0), 0);
    const avgAccuracy =
      totalDecisions > 0 ? Math.round((correctDecisions / totalDecisions) * 100) : 100;
    const totalTimeSeconds = sessions.reduce((sum, s) => sum + (s.totalTimeSpentSeconds || 0), 0);
    const avgSessionTime =
      totalTrainees > 0 ? Math.round(totalTimeSeconds / totalTrainees) : 0;

    return {
      totalTrainees,
      completedCount,
      avgAccuracy,
      avgSessionTimeFormatted: formatDuration(avgSessionTime),
      totalTelemetryPoints: telemetry.length
    };
  }, [sessions, telemetry]);

  // Telemetry for the expanded trainee
  const expandedTraineeTelemetry = useMemo(() => {
    if (!expandedOperatorId) return [];
    return telemetry
      .filter((t) => t.operatorId === expandedOperatorId)
      .sort((a, b) => a.stageNumber - b.stageNumber || a.sceneIndex - b.sceneIndex);
  }, [telemetry, expandedOperatorId]);

  // Determine floor qualification status for management (clean, neutral, no alarmist alerts)
  const getFloorQualification = (accuracy: number, safetyBreaches: number, isCompleted: boolean) => {
    if (safetyBreaches > 0 || (isCompleted && accuracy < 85)) {
      return { label: 'Needs Refresher', color: 'bg-slate-100 text-slate-700 border-slate-300', icon: 'refresh' };
    }
    if (isCompleted && accuracy >= 85) {
      return { label: 'Floor Ready (Certified)', color: 'bg-emerald-50 text-emerald-800 border-emerald-300', icon: 'check' };
    }
    return { label: 'In Training', color: 'bg-blue-50 text-blue-800 border-blue-200', icon: 'clock' };
  };

  // Seed realistic sample cohort data
  const handleSeedSampleData = async () => {
    const demoEmployees = [
      {
        operatorId: 'OP-AURIC-104',
        employeeName: 'Ramesh Patil',
        category: 'receiving_putaway' as TrainingCategory,
        completedStages: [0, 1, 2, 3, 4, 5, 6],
        pointsScored: 49,
        totalPossiblePoints: 52,
        totalScoreXP: 49,
        accuracyPct: 94,
        safetyBreachesCount: 0,
        totalDecisionsCount: 52,
        correctDecisionsCount: 49,
        totalTimeSpentSeconds: 1240,
        status: 'floor_ready' as const
      },
      {
        operatorId: 'OP-AURIC-208',
        employeeName: 'Sneha Kulkarni',
        category: 'receiving_putaway' as TrainingCategory,
        completedStages: [0, 1, 2],
        pointsScored: 22,
        totalPossiblePoints: 52,
        totalScoreXP: 22,
        accuracyPct: 91,
        safetyBreachesCount: 0,
        totalDecisionsCount: 24,
        correctDecisionsCount: 22,
        totalTimeSpentSeconds: 610,
        status: 'in_progress' as const
      },
      {
        operatorId: 'OP-AURIC-312',
        employeeName: 'Amit Shinde',
        category: 'picking_packaging' as TrainingCategory,
        completedStages: [7, 8, 9, 10, 11],
        pointsScored: 36,
        totalPossiblePoints: 39,
        totalScoreXP: 36,
        accuracyPct: 92,
        safetyBreachesCount: 0,
        totalDecisionsCount: 39,
        correctDecisionsCount: 36,
        totalTimeSpentSeconds: 980,
        status: 'floor_ready' as const
      },
      {
        operatorId: 'OP-AURIC-415',
        employeeName: 'Priya Verma',
        category: 'picking_packaging' as TrainingCategory,
        completedStages: [7, 8],
        pointsScored: 12,
        totalPossiblePoints: 39,
        totalScoreXP: 12,
        accuracyPct: 75,
        safetyBreachesCount: 1,
        totalDecisionsCount: 16,
        correctDecisionsCount: 12,
        totalTimeSpentSeconds: 430,
        status: 'retrain_needed' as const
      }
    ];

    for (const emp of demoEmployees) {
      await syncEmployeeSession(emp);
    }

    const demoTelemetryList = [
      {
        operatorId: 'OP-AURIC-104',
        employeeName: 'Ramesh Patil',
        category: 'receiving_putaway' as TrainingCategory,
        stageIndex: 0,
        stageNumber: 1,
        stageTitle: 'Gate & Dock Operations',
        sceneIndex: 0,
        sceneId: 'c1_s1_q1',
        sceneTitle: 'Truck Arrival & Gate Protocol',
        interactionType: 'mcq',
        timeSpentSeconds: 38,
        isCorrect: true,
        attempts: 1,
        pointsAwarded: 20,
        xpEarned: 20,
        sopClause: '4.1.1'
      },
      {
        operatorId: 'OP-AURIC-104',
        employeeName: 'Ramesh Patil',
        category: 'receiving_putaway' as TrainingCategory,
        stageIndex: 0,
        stageNumber: 1,
        stageTitle: 'Gate & Dock Operations',
        sceneIndex: 1,
        sceneId: 'c1_s1_q2',
        sceneTitle: 'Document Sorting Desk',
        interactionType: 'drag_drop',
        timeSpentSeconds: 52,
        isCorrect: true,
        attempts: 1,
        pointsAwarded: 30,
        xpEarned: 30,
        sopClause: '4.1.2'
      },
      {
        operatorId: 'OP-AURIC-312',
        employeeName: 'Amit Shinde',
        category: 'picking_packaging' as TrainingCategory,
        stageIndex: 7,
        stageNumber: 8,
        stageTitle: 'Order Picking & Kitting',
        sceneIndex: 0,
        sceneId: 'c2_s8_q1',
        sceneTitle: 'MES Task Queue Activation',
        interactionType: 'mcq',
        timeSpentSeconds: 41,
        isCorrect: true,
        attempts: 1,
        pointsAwarded: 25,
        xpEarned: 25,
        sopClause: '5.2.1'
      }
    ];

    for (const t of demoTelemetryList) {
      await logSceneTelemetry(t);
    }

    await refreshTelemetry();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans select-none antialiased">
      {/* 1. Master Top Header (Light Mode with Ather Capsule & Clean Actions) */}
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur-md px-4 sm:px-8 pl-[max(env(safe-area-inset-left),1rem)] pr-[max(env(safe-area-inset-right),2.5rem)] pt-[max(env(safe-area-inset-top),0.75rem)] pb-3 sticky top-0 z-30 flex flex-wrap items-center justify-between gap-4 shadow-2xs">
        <div className="flex items-center gap-3.5">
          <button
            type="button"
            onClick={onBackToPortal}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 transition-colors cursor-pointer border border-slate-200"
            title="Return to Learner Portal"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <AtherCapsuleLogo />

          <div className="h-5 w-px bg-slate-200 hidden sm:block" />

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm sm:text-base font-black tracking-tight text-slate-900 uppercase">
                Ather Floor Operations · Operations & Training Console
              </h1>
              <span className="flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Firebase Live
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-mono">
              AURIC Plant M002 · Real-Time Operator Telemetry, Accuracy & Cycle Time Analytics
            </p>
          </div>
        </div>

        {/* Action Controls: Export Excel & CSV */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => exportToExcel(filteredSessions, telemetry)}
            className="px-3.5 py-2 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
            title="Download formatted multi-sheet Excel file"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Export Excel (.xlsx)</span>
          </button>

          <button
            type="button"
            onClick={() => exportToCsv(filteredSessions, 'Ather_Trainees_Summary')}
            className="px-3 py-2 rounded-xl font-bold text-xs bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 flex items-center gap-1.5 cursor-pointer transition-all"
            title="Download CSV for quick import"
          >
            <Download className="w-4 h-4" />
            <span>CSV</span>
          </button>

          {sessions.length === 0 && (
            <button
              type="button"
              onClick={handleSeedSampleData}
              className="px-3 py-2 rounded-xl font-bold text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 flex items-center gap-1.5 cursor-pointer transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Load Demo Data</span>
            </button>
          )}
        </div>
      </header>

      {/* 2. Main Analytics Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-5">
        {/* KPI Summary Cards (Light Mode) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 flex items-center gap-3.5 shadow-xs">
            <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-slate-500 uppercase font-semibold">Trainees Enrolled</div>
              <div className="text-xl sm:text-2xl font-black text-slate-900">{kpis.totalTrainees}</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 flex items-center gap-3.5 shadow-xs">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-slate-500 uppercase font-semibold">Completed / Certified</div>
              <div className="text-xl sm:text-2xl font-black text-emerald-600">
                {kpis.completedCount}
                <span className="text-xs text-slate-400 font-normal ml-1">/ {kpis.totalTrainees}</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 flex items-center gap-3.5 shadow-xs">
            <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-slate-500 uppercase font-semibold">Avg Completion Time</div>
              <div className="text-xl sm:text-2xl font-black text-amber-700">
                {kpis.avgSessionTimeFormatted}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 flex items-center gap-3.5 shadow-xs">
            <div className="w-11 h-11 rounded-xl bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-slate-500 uppercase font-semibold">SOP Compliance Rate</div>
              <div className="text-xl sm:text-2xl font-black text-purple-700">
                {kpis.avgAccuracy}%
              </div>
            </div>
          </div>
        </div>

        {/* 3. Category Selector & Navigation Tabs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
          {/* Main Category Filter Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 self-start">
            <button
              type="button"
              onClick={() => setCategoryFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                categoryFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Operations
            </button>
            <button
              type="button"
              onClick={() => setCategoryFilter('receiving_putaway')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                categoryFilter === 'receiving_putaway'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              📦 Warehouse Receiving & Put-Away (SOP 1–7)
            </button>
            <button
              type="button"
              onClick={() => setCategoryFilter('picking_packaging')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                categoryFilter === 'picking_packaging'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🚚 Order Picking & Packaging (SOP 8–12)
            </button>
          </div>

          {/* View Mode Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={() => setActiveTab('roster')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'roster'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Trainee Roster</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('benchmarks')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'benchmarks'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Scene Time Averages ({benchmarks.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('scoring_guide')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'scoring_guide'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Scoring Logic & Tiers</span>
            </button>
          </div>
        </div>

        {/* 4. Tab 1: Trainee Roster Table with Expandable Scene Breakdown (Light Mode) */}
        {activeTab === 'roster' && (
          <div className="space-y-4">
            {/* Filters Row */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="relative flex-1 min-w-[240px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by Operator ID or Employee Name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-mono">Status:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-blue-500"
                >
                  <option value="all">All Statuses</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed / Certified</option>
                </select>

                <button
                  type="button"
                  onClick={refreshTelemetry}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 cursor-pointer"
                  title="Refresh records"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Trainee Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-mono text-[11px] uppercase border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Operator</th>
                    <th className="py-3 px-4">PWA Category</th>
                    <th className="py-3 px-4">Stages</th>
                    <th className="py-3 px-4">SOP Score</th>
                    <th className="py-3 px-4">Accuracy</th>
                    <th className="py-3 px-4">Cycle Time</th>
                    <th className="py-3 px-4">Deviations</th>
                    <th className="py-3 px-4">Floor Qualification</th>
                    <th className="py-3 px-4 text-right">Scene Drilldown</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredSessions.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="py-12 text-center text-slate-400">
                        {loading ? (
                          <div className="flex items-center justify-center gap-2">
                            <RefreshCw className="w-4 h-4 animate-spin text-blue-600" />
                            <span>Loading live telemetry from Firebase...</span>
                          </div>
                        ) : (
                          <div>
                            <p className="text-sm font-medium text-slate-700">No trainee records found</p>
                            <p className="text-xs text-slate-500 mt-1">
                              Trainees taking interactive modules on tablets will appear here live.
                            </p>
                          </div>
                        )}
                      </td>
                    </tr>
                  ) : (
                    filteredSessions.map((session) => {
                      const isExpanded = expandedOperatorId === session.operatorId;
                      const qual = getFloorQualification(
                        session.accuracyPct ?? 100,
                        session.safetyBreachesCount || 0,
                        session.status === 'floor_ready'
                      );
                      const maxPts = session.totalPossiblePoints || (session.category === 'receiving_putaway' ? 52 : 39);
                      const points = session.pointsScored ?? (session.totalScoreXP || 0);

                      return (
                        <React.Fragment key={session.id || session.operatorId}>
                          <tr
                            onClick={() =>
                              setExpandedOperatorId(isExpanded ? null : session.operatorId)
                            }
                            className={`hover:bg-slate-50/80 transition-colors cursor-pointer ${
                              isExpanded ? 'bg-slate-50/60' : ''
                            }`}
                          >
                            <td className="py-3.5 px-4">
                              <div className="font-bold text-slate-900">{session.employeeName}</div>
                              <div className="font-mono text-[10px] text-slate-500">
                                {session.operatorId}
                              </div>
                            </td>
                            <td className="py-3.5 px-4">
                              <span
                                className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                                  session.category === 'receiving_putaway'
                                    ? 'bg-amber-50 text-amber-800 border border-amber-200'
                                    : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                }`}
                              >
                                {session.category === 'receiving_putaway'
                                  ? 'Warehouse Receiving & Put-Away'
                                  : 'Order Picking & Packaging'}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 font-mono">
                              <span className="text-blue-700 font-bold">
                                {session.completedStages?.length || 0}
                              </span>
                              <span className="text-slate-400">
                                /{session.category === 'receiving_putaway' ? 7 : 5}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 font-mono font-black text-emerald-700">
                              {points} / {maxPts} pts
                            </td>
                            <td className="py-3.5 px-4">
                              <span
                                className={`font-mono font-bold ${
                                  (session.accuracyPct ?? 100) >= 85
                                    ? 'text-emerald-700'
                                    : (session.accuracyPct ?? 100) >= 70
                                    ? 'text-amber-700'
                                    : 'text-rose-700'
                                }`}
                              >
                                {session.accuracyPct ?? 100}%
                              </span>
                            </td>
                            <td className="py-3.5 px-4 font-mono text-slate-700 font-medium">
                              {formatDuration(session.totalTimeSpentSeconds || 0)}
                            </td>
                            <td className="py-3.5 px-4 font-mono">
                              {(session.safetyBreachesCount || 0) > 0 ? (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
                                  {session.safetyBreachesCount} {session.safetyBreachesCount === 1 ? 'deviation' : 'deviations'}
                                </span>
                              ) : (
                                <span className="text-slate-400">0</span>
                              )}
                            </td>
                            <td className="py-3.5 px-4">
                              <span
                                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${qual.color}`}
                              >
                                {qual.icon === 'check' && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                                {qual.icon === 'clock' && <Clock className="w-3 h-3 text-blue-600" />}
                                {qual.icon === 'refresh' && <RefreshCw className="w-3 h-3 text-slate-500" />}
                                <span>{qual.label}</span>
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <button
                                type="button"
                                className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-800"
                              >
                                <span>{isExpanded ? 'Hide Scenes' : 'View Scenes'}</span>
                                {isExpanded ? (
                                  <ChevronDown className="w-3.5 h-3.5" />
                                ) : (
                                  <ChevronRight className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </td>
                          </tr>

                          {/* Expandable Per-Scene Drilldown Drawer (Light Mode) */}
                          {isExpanded && (
                            <tr className="bg-slate-50/80">
                              <td colSpan={9} className="p-4 sm:p-6 border-y border-slate-200">
                                <div className="space-y-3 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                                  <div className="flex items-center justify-between">
                                    <h4 className="text-xs font-mono font-bold text-slate-800 uppercase flex items-center gap-2">
                                      <Layers className="w-4 h-4 text-blue-600" />
                                      Detailed Scene-by-Scene Log: {session.employeeName} ({session.operatorId})
                                    </h4>
                                    <span className="text-[11px] font-mono text-slate-500 font-medium">
                                      {expandedTraineeTelemetry.length} Scene Records Logged
                                    </span>
                                  </div>

                                  {expandedTraineeTelemetry.length === 0 ? (
                                    <div className="text-xs text-slate-500 p-4 rounded-xl bg-slate-50 border border-slate-200">
                                      No granular scene records logged yet for this operator.
                                    </div>
                                  ) : (
                                    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
                                      <table className="w-full text-left text-xs">
                                        <thead className="bg-slate-50 text-slate-600 font-mono text-[10px] uppercase border-b border-slate-200">
                                          <tr>
                                            <th className="py-2.5 px-3">Module</th>
                                            <th className="py-2.5 px-3">Scene Title</th>
                                            <th className="py-2.5 px-3">Type</th>
                                            <th className="py-2.5 px-3">Cycle Time</th>
                                            <th className="py-2.5 px-3">Evaluation</th>
                                            <th className="py-2.5 px-3">Attempts</th>
                                            <th className="py-2.5 px-3">Score</th>
                                            <th className="py-2.5 px-3">SOP Clause</th>
                                          </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                                          {expandedTraineeTelemetry.map((t, idx) => (
                                            <tr key={t.id || idx} className="hover:bg-slate-50">
                                              <td className="py-2 px-3 text-slate-700 font-bold">
                                                Mod {t.stageNumber}
                                              </td>
                                              <td className="py-2 px-3 font-sans text-slate-900 font-medium">
                                                {t.sceneTitle}
                                              </td>
                                              <td className="py-2 px-3 text-slate-500 uppercase text-[10px]">
                                                {t.interactionType}
                                              </td>
                                              <td className="py-2 px-3 text-amber-800 font-bold">
                                                {formatDuration(t.timeSpentSeconds)}
                                              </td>
                                              <td className="py-2 px-3">
                                                {t.isCorrect ? (
                                                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                                    ✓ Pass (1 pt)
                                                  </span>
                                                ) : (
                                                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
                                                    Retried (0 pt)
                                                  </span>
                                                )}
                                              </td>
                                              <td className="py-2 px-3 text-slate-600">
                                                {t.attempts || 1}
                                              </td>
                                              <td className="py-2 px-3 text-emerald-700 font-bold">
                                                +{t.xpEarned} pts
                                              </td>
                                              <td className="py-2 px-3 text-slate-500 text-[10px]">
                                                {t.sopClause || 'Standard'}
                                              </td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>
                                  )}
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 5. Tab 2: Scene Time Averages & Bottlenecks Analysis (Light Mode) */}
        {activeTab === 'benchmarks' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>Scene Cycle Time Averages & SOP Compliance Benchmarks</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Aggregated time spent by all trainees across every factory floor scene and SOP decision.
                </p>
              </div>

              <button
                type="button"
                onClick={() => exportToCsv(benchmarks, 'Ather_Scene_Averages_Benchmark')}
                className="px-3 py-1.5 rounded-xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Benchmarks CSV</span>
              </button>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-mono text-[11px] uppercase border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Module</th>
                    <th className="py-3 px-4">Scene #</th>
                    <th className="py-3 px-4">Scene Title</th>
                    <th className="py-3 px-4">Interaction</th>
                    <th className="py-3 px-4">Avg Cycle Time</th>
                    <th className="py-3 px-4">Attempts Count</th>
                    <th className="py-3 px-4">Compliance Pass Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {benchmarks.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-slate-400">
                        No scene benchmark data logged yet. Trainees taking modules will populate these averages automatically.
                      </td>
                    </tr>
                  ) : (
                    benchmarks.map((b, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-mono text-slate-700 font-bold">
                          Mod {b.moduleNumber}: {b.moduleTitle}
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-blue-700">
                          Sc {b.sceneIndex}
                        </td>
                        <td className="py-3 px-4 font-medium text-slate-900">
                          {b.sceneTitle}
                        </td>
                        <td className="py-3 px-4 text-slate-500 font-mono uppercase text-[10px]">
                          {b.interactionType}
                        </td>
                        <td className="py-3 px-4 font-mono font-black text-amber-800">
                          {b.avgTimeFormatted}
                          <span className="text-[10px] text-slate-400 font-normal ml-1">
                            ({b.avgTimeSeconds}s)
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono text-slate-700">
                          {b.totalAttempts}
                        </td>
                        <td className="py-3 px-4 font-mono">
                          <span
                            className={`font-bold ${
                              b.passRatePct >= 90
                                ? 'text-emerald-700'
                                : b.passRatePct >= 75
                                ? 'text-amber-700'
                                : 'text-rose-700'
                            }`}
                          >
                            {b.passRatePct}%
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 6. Tab 3: Simple Industrial Scoring & Qualification Guide */}
        {activeTab === 'scoring_guide' && (
          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                  <span>Simple Floor Qualification &amp; Scoring System</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Straightforward, auditable scoring designed for plant management and shift supervisors.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* 1. Simple 1-Point Scoring */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-700 uppercase">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>1 Point Per Decision</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Every operational scene or question is worth exactly 1 point.
                  </p>
                  <ul className="text-[11px] font-mono text-slate-500 space-y-1">
                    <li>• First Attempt Correct: <strong>1 Point (Pass)</strong></li>
                    <li>• Mistake on Attempt 1: <strong>0 Points (Retry)</strong></li>
                    <li>• Inbound Total: <strong>52 Max Points</strong></li>
                    <li>• Outbound Total: <strong>39 Max Points</strong></li>
                  </ul>
                </div>

                {/* 2. Silent Audit Trail & Retries */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-700 uppercase">
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                    <span>Silent Audit Trail</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    All decision deviations and retries are logged silently in the background for operator training records without intrusive alarms.
                  </p>
                  <ul className="text-[11px] font-mono text-slate-500 space-y-1">
                    <li>• 0 Deviations: <strong>First-Time-Right (100% FTR)</strong></li>
                    <li>• 1+ Deviations: <strong>Recorded for Shift Coaching</strong></li>
                  </ul>
                </div>

                {/* 3. Qualification Tiers */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-700 uppercase">
                    <Award className="w-4 h-4" />
                    <span>85% Pass Mark</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Plant operations benchmark for independent workstation assignment.
                  </p>
                  <ul className="text-[11px] font-mono text-slate-500 space-y-1">
                    <li>• <strong>Floor Ready</strong>: &ge; 85% SOP score</li>
                    <li>• <strong>In Training</strong>: Modules in progress</li>
                    <li>• <strong>Needs Refresher</strong>: &lt; 85% or repeated retries</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
