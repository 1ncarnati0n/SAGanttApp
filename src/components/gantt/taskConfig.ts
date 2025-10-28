import type { ViewType } from "./types";

export const TASK_TYPES = [
  { id: "task", label: "일반 작업" },
  { id: "summary", label: "요약 작업" },
  { id: "milestone", label: "마일스톤" },
  { id: "urgent", label: "긴급 작업" },
  { id: "narrow", label: "협소 작업" },
  { id: "progress", label: "진행형 작업" },
  { id: "round", label: "라운드 작업" },
];

export const CELL_WIDTH_MAP: Record<ViewType, number> = {
  day: 28,
  week: 120,
  month: 180,
};

export const CELL_HEIGHT = 36;
