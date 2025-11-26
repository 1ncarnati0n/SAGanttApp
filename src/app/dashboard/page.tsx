/**
 * Dashboard Page
 * 프로젝트 목록을 보여주는 메인 대시보드
 */

"use client";

import { Suspense, useState, useEffect } from "react";
import { ProjectList } from "@/components/dashboard/ProjectList";
import { ProjectModal } from "@/components/dashboard/ProjectModal";
import { SeedDataButton } from "@/components/dashboard/SeedDataButton";
import { Button } from "@/components/ui/Button";
import { Plus, Database } from "lucide-react";
import { initializeSampleData } from "@/lib/services/mockStorage";

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [useMock] = useState(() => {
    if (typeof window === 'undefined') return false;
    return (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true"
    );
  });

  useEffect(() => {
    // Initialize sample data on mount if mock mode
    if (useMock) {
      initializeSampleData();
    }
  }, [useMock]);

  const handleSuccess = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary-900 dark:text-primary-100">
            프로젝트 대시보드
          </h1>
          <p className="mt-2 text-primary-600 dark:text-primary-400">
            프로젝트를 관리하고 Gantt 차트를 생성하세요
          </p>
          {useMock && (
            <div className="mt-2 flex items-center gap-2 text-sm text-warning-600 dark:text-warning-400">
              <Database className="h-4 w-4" />
              <span>Mock 모드 (LocalStorage 사용 중)</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          {!useMock && <SeedDataButton />}
          <Button
            variant="primary"
            size="lg"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="h-5 w-5 mr-2" />
            새 프로젝트
          </Button>
        </div>
      </div>

      {/* Project List */}
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-64">
            <div className="spinner" />
            <span className="ml-3 text-primary-600">프로젝트 로딩 중...</span>
          </div>
        }
      >
        <ProjectList key={refreshKey} />
      </Suspense>

      {/* Project Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
      />
    </div>
  );
}

