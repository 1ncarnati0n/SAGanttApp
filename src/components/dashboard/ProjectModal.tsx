/**
 * ProjectModal Component
 * 프로젝트 생성/수정 모달
 */

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { X } from "lucide-react";
import {
  createProject,
  updateProject,
  type Project,
  type CreateProjectDTO,
} from "@/lib/services/projects";
import { toast } from "sonner";

const projectSchema = z.object({
  name: z.string().min(1, "프로젝트 이름을 입력하세요").max(100, "이름이 너무 깁니다"),
  description: z.string().max(500, "설명이 너무 깁니다").optional(),
  start_date: z.string().min(1, "시작일을 선택하세요"),
  end_date: z.string().optional(),
  status: z.enum(["planning", "active", "completed", "on_hold"]).optional(),
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface ProjectModalProps {
  project?: Project;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function ProjectModal({ project, isOpen, onClose, onSuccess }: ProjectModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = !!project;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: project
      ? {
          name: project.name,
          description: project.description || "",
          start_date: project.start_date,
          end_date: project.end_date || "",
          status: project.status,
        }
      : {
          name: "",
          description: "",
          start_date: new Date().toISOString().split("T")[0],
          end_date: "",
          status: "planning",
        },
  });

  const onSubmit = async (data: ProjectFormData) => {
    try {
      setIsSubmitting(true);

      const projectData: CreateProjectDTO = {
        name: data.name,
        description: data.description || undefined,
        start_date: data.start_date,
        end_date: data.end_date || undefined,
        status: data.status || "planning",
      };

      if (isEditing) {
        await updateProject(project.id, projectData);
        toast.success("프로젝트가 수정되었습니다");
      } else {
        await createProject(projectData);
        toast.success("프로젝트가 생성되었습니다");
      }

      reset();
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Failed to save project:", error);
      toast.error(isEditing ? "프로젝트 수정 실패" : "프로젝트 생성 실패");
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
            {isEditing ? "프로젝트 수정" : "새 프로젝트"}
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
              프로젝트 이름 *
            </label>
            <Input {...register("name")} placeholder="예: 건설 프로젝트 A" />
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
              placeholder="프로젝트 설명을 입력하세요"
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

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-2">
              상태
            </label>
            <select
              {...register("status")}
              className="flex h-10 w-full rounded-md border border-primary-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-primary-800 dark:bg-primary-950 dark:ring-offset-primary-950 dark:focus-visible:ring-primary-300"
            >
              <option value="planning">계획 중</option>
              <option value="active">진행 중</option>
              <option value="completed">완료</option>
              <option value="on_hold">보류</option>
            </select>
            {errors.status && (
              <p className="mt-1 text-sm text-error-600">{errors.status.message}</p>
            )}
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
              {isEditing ? "수정" : "생성"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

