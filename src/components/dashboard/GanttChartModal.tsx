/**
 * GanttChartModal Component
 * Gantt 차트 생성/수정 모달
 */

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { X } from "lucide-react";
import { createGanttChart, type CreateGanttChartDTO } from "@/lib/services/ganttCharts";
import { toast } from "sonner";

const ganttChartSchema = z.object({
  name: z.string().min(1, "Gantt 차트 이름을 입력하세요").max(100, "이름이 너무 깁니다"),
  description: z.string().max(500, "설명이 너무 깁니다").optional(),
  start_date: z.string().min(1, "시작일을 선택하세요"),
  end_date: z.string().optional(),
});

type GanttChartFormData = z.infer<typeof ganttChartSchema>;

interface GanttChartModalProps {
  projectId: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function GanttChartModal({
  projectId,
  isOpen,
  onClose,
  onSuccess,
}: GanttChartModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<GanttChartFormData>({
    resolver: zodResolver(ganttChartSchema),
    defaultValues: {
      name: "",
      description: "",
      start_date: new Date().toISOString().split("T")[0],
      end_date: "",
    },
  });

  const onSubmit = async (data: GanttChartFormData) => {
    try {
      setIsSubmitting(true);

      const chartData: CreateGanttChartDTO = {
        project_id: projectId,
        name: data.name,
        description: data.description || undefined,
        start_date: data.start_date,
        end_date: data.end_date || undefined,
      };

      await createGanttChart(chartData);
      toast.success("Gantt 차트가 생성되었습니다");

      reset();
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Failed to create Gantt chart:", error);
      toast.error("Gantt 차트 생성 실패");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-primary-900 rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-primary-200 dark:border-primary-800">
          <h2 className="text-2xl font-bold text-primary-900 dark:text-primary-100">
            새 Gantt 차트
          </h2>
          <button
            onClick={onClose}
            className="text-primary-500 hover:text-primary-700 dark:hover:text-primary-300"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-2">
              Gantt 차트 이름 *
            </label>
            <Input {...register("name")} placeholder="예: 건설 공정 일정표" />
            {errors.name && (
              <p className="mt-1 text-sm text-error-600">{errors.name.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-2">
              설명
            </label>
            <textarea
              {...register("description")}
              rows={3}
              className="flex w-full rounded-md border border-primary-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-primary-800 dark:bg-primary-950 dark:ring-offset-primary-950 dark:placeholder:text-primary-400 dark:focus-visible:ring-primary-300"
              placeholder="Gantt 차트 설명을 입력하세요"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-error-600">{errors.description.message}</p>
            )}
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-2">
                시작일 *
              </label>
              <Input type="date" {...register("start_date")} />
              {errors.start_date && (
                <p className="mt-1 text-sm text-error-600">{errors.start_date.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-2">
                종료일
              </label>
              <Input type="date" {...register("end_date")} />
              {errors.end_date && (
                <p className="mt-1 text-sm text-error-600">{errors.end_date.message}</p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              취소
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="flex-1"
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              생성
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

