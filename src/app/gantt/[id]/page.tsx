/**
 * Gantt Chart Page
 * 개별 Gantt 차트를 표시하고 편집하는 페이지
 */

"use client";

import { useEffect, useState } from "react";
import { use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GanttWrapper } from "@/components/GanttWrapper";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Save } from "lucide-react";
import { getGanttChart } from "@/lib/services/ganttCharts";
import { getTasks } from "@/lib/services/tasks";
import { getLinks } from "@/lib/services/links";
import { toast } from "sonner";
import type { Task, Link as GanttLink } from "@/lib/gantt/types";

interface GanttPageProps {
  params: Promise<{ id: string }>;
}

export default function GanttPage({ params }: GanttPageProps) {
  const { id } = use(params);
  const router = useRouter();

  const [chart, setChart] = useState<{ name: string; project_id: string } | null>(null);
  const [, setTasks] = useState<Task[]>([]);
  const [, setLinks] = useState<GanttLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Load chart data
  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const [chartData, tasksData, linksData] = await Promise.all([
          getGanttChart(id),
          getTasks(id),
          getLinks(id),
        ]);

        if (!chartData) {
          toast.error("Gantt 차트를 찾을 수 없습니다");
          router.push("/dashboard");
          return;
        }

        setChart(chartData);
        setTasks(tasksData);
        setLinks(linksData);
      } catch (error) {
        console.error("Failed to load Gantt chart:", error);
        toast.error("Gantt 차트 로딩 실패");
      } finally {
        setIsLoading(false);
      }
    }

    void loadData();
  }, [id, router]);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      // TODO: Implement save logic with Supabase
      toast.success("저장되었습니다");
    } catch (error) {
      console.error("Save error:", error);
      toast.error("저장 실패");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="spinner" />
        <p className="mt-4 text-primary-600">Gantt 차트 로딩 중...</p>
      </div>
    );
  }

  if (!chart) {
    return null;
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-primary-200 dark:border-primary-800 bg-white dark:bg-primary-900">
        <div className="flex items-center gap-4">
          <Link href={`/dashboard/projects/${chart.project_id}`}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              프로젝트로 돌아가기
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold text-primary-900 dark:text-primary-100">
              {chart.name}
            </h1>
          </div>
        </div>
        <Button
          variant="primary"
          size="md"
          onClick={handleSave}
          loading={isSaving}
          disabled={isSaving}
        >
          <Save className="h-4 w-4 mr-2" />
          저장
        </Button>
      </div>

      {/* Gantt Chart */}
      <div className="flex-1 overflow-hidden">
        <GanttWrapper />
      </div>
    </div>
  );
}

