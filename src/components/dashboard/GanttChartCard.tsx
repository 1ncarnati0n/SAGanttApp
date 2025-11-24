/**
 * GanttChartCard Component
 * Gantt 차트 카드 - 목록에서 개별 차트를 표시
 */

"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Calendar, ExternalLink, MoreVertical } from "lucide-react";
import type { GanttChart } from "@/lib/services/ganttCharts";
import { formatDisplayDate } from "@/lib/gantt/utils";

interface GanttChartCardProps {
  chart: GanttChart;
}

export function GanttChartCard({ chart }: GanttChartCardProps) {
  return (
    <Card className="card-hover transition-all duration-200">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl mb-1">
              <Link
                href={`/gantt/${chart.id}`}
                className="hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
              >
                {chart.name}
              </Link>
            </CardTitle>
            <CardDescription className="line-clamp-2">
              {chart.description || "설명이 없습니다."}
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {/* Date Range */}
          <div className="flex items-center text-sm text-primary-600 dark:text-primary-400">
            <Calendar className="h-4 w-4 mr-2" />
            <span>
              {formatDisplayDate(chart.start_date)}
              {chart.end_date && ` ~ ${formatDisplayDate(chart.end_date)}`}
            </span>
          </div>

          {/* Created Date */}
          <div className="text-xs text-primary-500 dark:text-primary-500">
            생성일: {new Date(chart.created_at).toLocaleDateString("ko-KR")}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 pt-2 border-t border-primary-200 dark:border-primary-800">
            <Link href={`/gantt/${chart.id}`} className="flex-1">
              <Button variant="primary" size="sm" className="w-full">
                <ExternalLink className="h-4 w-4 mr-2" />
                열기
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

