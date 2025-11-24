/**
 * GanttChartList Component
 * 프로젝트의 Gantt 차트 목록을 표시
 */

"use client";

import { useEffect, useState } from "react";
import { GanttChartCard } from "./GanttChartCard";
import { getGanttCharts, type GanttChart } from "@/lib/services/ganttCharts";
import { BarChart3 } from "lucide-react";

interface GanttChartListProps {
  projectId: string;
}

export function GanttChartList({ projectId }: GanttChartListProps) {
  const [charts, setCharts] = useState<GanttChart[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCharts() {
      try {
        setIsLoading(true);
        const data = await getGanttCharts(projectId);
        setCharts(data);
        setError(null);
      } catch (err) {
        console.error("Failed to load Gantt charts:", err);
        setError("Gantt 차트를 불러오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    }

    void loadCharts();
  }, [projectId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="spinner" />
        <span className="ml-3 text-primary-600">차트 로딩 중...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <div className="text-error-600 mb-4">⚠️ {error}</div>
        <button
          onClick={() => window.location.reload()}
          className="btn btn-primary"
        >
          다시 시도
        </button>
      </div>
    );
  }

  if (charts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center border-2 border-dashed border-primary-300 dark:border-primary-700 rounded-lg">
        <BarChart3 className="h-16 w-16 text-primary-400 mb-4" />
        <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-100 mb-2">
          Gantt 차트가 없습니다
        </h3>
        <p className="text-primary-600 dark:text-primary-400 mb-4">
          새 Gantt 차트를 생성하여 프로젝트를 관리하세요
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {charts.map((chart) => (
        <GanttChartCard key={chart.id} chart={chart} />
      ))}
    </div>
  );
}

