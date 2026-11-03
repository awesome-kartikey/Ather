import * as XLSX from 'xlsx';
import type { EmployeeSessionRecord, SceneTelemetryRecord } from '../services/firebase';

export function formatDuration(seconds: number): string {
  if (!seconds || seconds <= 0) return '0s';
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  if (m === 0) return `${s}s`;
  const h = Math.floor(m / 60);
  const remM = m % 60;
  if (h === 0) return `${remM}m ${s.toString().padStart(2, '0')}s`;
  return `${h}h ${remM}m ${s.toString().padStart(2, '0')}s`;
}

export interface SceneBenchmarkRow {
  moduleNumber: number;
  moduleTitle: string;
  sceneIndex: number;
  sceneId: string;
  sceneTitle: string;
  interactionType: string;
  avgTimeSeconds: number;
  avgTimeFormatted: string;
  totalAttempts: number;
  passRatePct: number;
}

/**
 * Compute scene-level time averages and pass rates across all telemetry records
 */
export function computeSceneBenchmarks(telemetry: SceneTelemetryRecord[]): SceneBenchmarkRow[] {
  const map = new Map<
    string,
    {
      moduleNumber: number;
      moduleTitle: string;
      sceneIndex: number;
      sceneId: string;
      sceneTitle: string;
      interactionType: string;
      totalSeconds: number;
      count: number;
      correctCount: number;
    }
  >();

  for (const item of telemetry) {
    const key = `${item.stageNumber}_${item.sceneId || item.sceneIndex}`;
    const existing = map.get(key);
    if (existing) {
      existing.totalSeconds += item.timeSpentSeconds || 0;
      existing.count += 1;
      if (item.isCorrect) existing.correctCount += 1;
    } else {
      map.set(key, {
        moduleNumber: item.stageNumber,
        moduleTitle: item.stageTitle,
        sceneIndex: item.sceneIndex + 1,
        sceneId: item.sceneId,
        sceneTitle: item.sceneTitle,
        interactionType: item.interactionType,
        totalSeconds: item.timeSpentSeconds || 0,
        count: 1,
        correctCount: item.isCorrect ? 1 : 0
      });
    }
  }

  const rows: SceneBenchmarkRow[] = [];
  for (const val of map.values()) {
    const avgSec = val.count > 0 ? Math.round(val.totalSeconds / val.count) : 0;
    const passRate = val.count > 0 ? Math.round((val.correctCount / val.count) * 100) : 100;
    rows.push({
      moduleNumber: val.moduleNumber,
      moduleTitle: val.moduleTitle,
      sceneIndex: val.sceneIndex,
      sceneId: val.sceneId,
      sceneTitle: val.sceneTitle,
      interactionType: val.interactionType,
      avgTimeSeconds: avgSec,
      avgTimeFormatted: formatDuration(avgSec),
      totalAttempts: val.count,
      passRatePct: passRate
    });
  }

  return rows.sort((a, b) => a.moduleNumber - b.moduleNumber || a.sceneIndex - b.sceneIndex);
}

/**
 * Export full performance dataset as a multi-sheet Excel (.xlsx) file
 */
export function exportToExcel(
  sessions: EmployeeSessionRecord[],
  telemetry: SceneTelemetryRecord[],
  filenamePrefix = 'Ather_Warehouse_Training_Report'
) {
  const wb = XLSX.utils.book_new();

  // 1. Sheet 1: Employee Summary
  const summaryData = sessions.map((s) => ({
    'Operator ID': s.operatorId,
    'Employee Name': s.employeeName,
    Category: s.categoryTitle,
    'Floor Qualification':
      s.status === 'floor_ready'
        ? 'Floor Ready (Certified)'
        : s.status === 'retrain_needed'
        ? 'Needs Refresher'
        : 'In Training',
    'Score (Points)': `${s.pointsScored || 0} / ${s.totalPossiblePoints || (s.category === 'receiving_putaway' ? 52 : 39)}`,
    'SOP Accuracy (%)': `${s.accuracyPct ?? 100}%`,
    'Deviations / Retries': s.safetyBreachesCount || 0,
    'Stages Completed': `${s.completedStages?.length || 0} Stages`,
    'Total Decisions Attempted': s.totalDecisionsCount || 0,
    'Total Cycle Time': formatDuration(s.totalTimeSpentSeconds || 0),
    'Total Seconds': s.totalTimeSpentSeconds || 0,
    'Started Date': s.startedAt ? new Date(s.startedAt).toLocaleString() : 'N/A',
    'Last Active Date': s.lastActiveAt ? new Date(s.lastActiveAt).toLocaleString() : 'N/A'
  }));

  const wsSummary = XLSX.utils.json_to_sheet(summaryData);
  XLSX.utils.book_append_sheet(wb, wsSummary, 'Employee Summaries');

  // 2. Sheet 2: Granular Scene Telemetry Log
  const telemetryData = telemetry.map((t) => ({
    'Operator ID': t.operatorId,
    'Employee Name': t.employeeName,
    Category: t.category === 'receiving_putaway' ? 'Warehouse Receiving & Put-Away' : 'Order Picking & Packaging',
    'Module #': t.stageNumber,
    'Module Title': t.stageTitle,
    'Scene #': t.sceneIndex + 1,
    'Scene ID': t.sceneId,
    'Scene Title': t.sceneTitle,
    'Interaction Type': t.interactionType,
    'Cycle Time': formatDuration(t.timeSpentSeconds || 0),
    'Cycle Time (Seconds)': t.timeSpentSeconds || 0,
    'Result': t.isCorrect ? 'Pass (1 pt)' : 'Retry (0 pt)',
    'Points Awarded': t.pointsAwarded ?? (t.isCorrect && t.attempts === 1 ? 1 : 0),
    Attempts: t.attempts || 1,
    'Deviation Logged': t.isSafetyBreach ? 'Yes' : 'No',
    'SOP Clause': t.sopClause || 'Standard',
    Timestamp: t.timestamp ? new Date(t.timestamp).toLocaleString() : 'N/A'
  }));

  const wsTelemetry = XLSX.utils.json_to_sheet(telemetryData);
  XLSX.utils.book_append_sheet(wb, wsTelemetry, 'Scene Detailed Timings');

  // 3. Sheet 3: Scene Benchmarks & Averages
  const benchmarks = computeSceneBenchmarks(telemetry);
  const benchmarkData = benchmarks.map((b) => ({
    'Module #': b.moduleNumber,
    'Module Title': b.moduleTitle,
    'Scene #': b.sceneIndex,
    'Scene ID': b.sceneId,
    'Scene Title': b.sceneTitle,
    'Interaction Type': b.interactionType,
    'Avg Time': b.avgTimeFormatted,
    'Avg Time (Seconds)': b.avgTimeSeconds,
    'Total Attempts Logged': b.totalAttempts,
    'SOP Compliance Rate (%)': `${b.passRatePct}%`
  }));

  const wsBenchmarks = XLSX.utils.json_to_sheet(benchmarkData);
  XLSX.utils.book_append_sheet(wb, wsBenchmarks, 'Scene Averages & Benchmarks');

  // Generate date stamp
  const dateStr = new Date().toISOString().split('T')[0];
  XLSX.writeFile(wb, `${filenamePrefix}_${dateStr}.xlsx`);
}

/**
 * Export summary or detailed data to CSV with UTF-8 BOM
 */
export function exportToCsv(
  data: Record<string, any>[],
  filenamePrefix = 'Ather_Training_Summary'
) {
  if (data.length === 0) return;

  const headers = Object.keys(data[0]);
  const rows = data.map((row) =>
    headers
      .map((fieldName) => {
        const val = row[fieldName] ?? '';
        const str = String(val).replace(/"/g, '""');
        return `"${str}"`;
      })
      .join(',')
  );

  const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filenamePrefix}_${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
