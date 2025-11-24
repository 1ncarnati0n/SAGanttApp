/**
 * ProjectList Component
 * 프로젝트 목록을 표시하는 컴포넌트
 */

"use client";

import { useEffect, useState } from "react";
import { ProjectCard } from "./ProjectCard";
import { getProjects, type Project } from "@/lib/services/projects";
import { FolderOpen } from "lucide-react";

export function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProjects() {
      try {
        setIsLoading(true);
        const data = await getProjects();
        setProjects(data);
        setError(null);
      } catch (err) {
        console.error("Failed to load projects:", err);
        setError("프로젝트를 불러오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    }

    void loadProjects();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="spinner" />
        <span className="ml-3 text-primary-600">프로젝트 로딩 중...</span>
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

  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <FolderOpen className="h-16 w-16 text-primary-400 mb-4" />
        <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-100 mb-2">
          프로젝트가 없습니다
        </h3>
        <p className="text-primary-600 dark:text-primary-400 mb-4">
          새 프로젝트를 생성하여 시작하세요
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}

