/**
 * Project Detail Page
 * 개별 프로젝트의 상세 정보 및 Gantt 차트 목록
 */

"use client";

import { Suspense, useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { GanttChartList } from "@/components/dashboard/GanttChartList";
import { GanttChartModal } from "@/components/dashboard/GanttChartModal";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";
import { getProject } from "@/lib/services/projects";
import { toast } from "sonner";

interface ProjectDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const [project, setProject] = useState<{ name: string; description?: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    async function loadProject() {
      try {
        const data = await getProject(id);
        if (!data) {
          toast.error("프로젝트를 찾을 수 없습니다");
          router.push("/dashboard");
          return;
        }
        setProject(data);
      } catch (error) {
        console.error("Failed to load project:", error);
        toast.error("프로젝트 로딩 실패");
      } finally {
        setIsLoading(false);
      }
    }

    void loadProject();
  }, [id, router]);

  const handleSuccess = () => {
    setRefreshKey((prev) => prev + 1);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="spinner" />
        <span className="ml-3 text-primary-600">프로젝트 로딩 중...</span>
      </div>
    );
  }

  if (!project) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-6">
        <Link href="/dashboard">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            대시보드로 돌아가기
          </Button>
        </Link>
      </div>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary-900 dark:text-primary-100">
            {project.name}
          </h1>
          <p className="mt-2 text-primary-600 dark:text-primary-400">
            {project.description || "설명이 없습니다."}
          </p>
        </div>
        <Button
          variant="primary"
          size="lg"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="h-5 w-5 mr-2" />
          새 Gantt 차트
        </Button>
      </div>

      {/* Gantt Chart List */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-primary-900 dark:text-primary-100">
          Gantt 차트 목록
        </h2>
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-64">
              <div className="spinner" />
              <span className="ml-3 text-primary-600">차트 로딩 중...</span>
            </div>
          }
        >
          <GanttChartList projectId={id} key={refreshKey} />
        </Suspense>
      </div>

      {/* Gantt Chart Modal */}
      <GanttChartModal
        projectId={id}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
      />
    </div>
  );
}

