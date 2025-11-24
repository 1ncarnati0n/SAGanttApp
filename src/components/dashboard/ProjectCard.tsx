/**
 * ProjectCard Component
 * 프로젝트 카드 - 목록에서 개별 프로젝트를 표시
 */

"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Calendar, BarChart3, MoreVertical } from "lucide-react";
import type { Project } from "@/lib/services/projects";
import { formatDisplayDate } from "@/lib/gantt/utils";

interface ProjectCardProps {
  project: Project;
}

const STATUS_CONFIG = {
  planning: {
    label: "계획 중",
    className: "bg-accent-100 text-accent-700 dark:bg-accent-900 dark:text-accent-300",
  },
  active: {
    label: "진행 중",
    className: "bg-success-100 text-success-700 dark:bg-success-900 dark:text-success-300",
  },
  completed: {
    label: "완료",
    className: "bg-primary-100 text-primary-700 dark:bg-primary-800 dark:text-primary-300",
  },
  on_hold: {
    label: "보류",
    className: "bg-warning-100 text-warning-700 dark:bg-warning-900 dark:text-warning-300",
  },
};

export function ProjectCard({ project }: ProjectCardProps) {
  const statusConfig = STATUS_CONFIG[project.status];

  return (
    <Card className="card-hover transition-all duration-200">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl mb-1">
              <Link
                href={`/dashboard/projects/${project.id}`}
                className="hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
              >
                {project.name}
              </Link>
            </CardTitle>
            <CardDescription className="line-clamp-2">
              {project.description || "설명이 없습니다."}
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {/* Status Badge */}
          <div>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig.className}`}
            >
              {statusConfig.label}
            </span>
          </div>

          {/* Date Range */}
          <div className="flex items-center text-sm text-primary-600 dark:text-primary-400">
            <Calendar className="h-4 w-4 mr-2" />
            <span>
              {formatDisplayDate(project.start_date)}
              {project.end_date && ` ~ ${formatDisplayDate(project.end_date)}`}
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 pt-2 border-t border-primary-200 dark:border-primary-800">
            <Link href={`/dashboard/projects/${project.id}`} className="flex-1">
              <Button variant="outline" size="sm" className="w-full">
                <BarChart3 className="h-4 w-4 mr-2" />
                Gantt 차트 보기
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

