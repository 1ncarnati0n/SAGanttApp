import type { FC } from "react";

interface TaskTooltipProps {
  data?: Record<string, unknown>;
}

const dateFormatter = new Intl.DateTimeFormat("ko-KR", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const formatDate = (value: unknown): string => {
  const date = value instanceof Date ? value : new Date(value as string | number);
  return Number.isNaN(date.getTime()) ? "-" : dateFormatter.format(date);
};

const TaskTooltip: FC<TaskTooltipProps> = ({ data }) => {
  if (!data) {
    return null;
  }

  const isMilestone = data.type === "milestone";
  const progress =
    typeof data.progress === "number" && Number.isFinite(data.progress)
      ? `${Math.round(data.progress)}%`
      : null;

  return (
    <div className="wx-task-tooltip">
      <div className="tooltip-row">
        <span className="tooltip-label">작업명</span>
        <span className="tooltip-value">{String(data.text ?? "-")}</span>
      </div>
      <div className="tooltip-row">
        <span className="tooltip-label">유형</span>
        <span className="tooltip-value">{String(data.type ?? "-")}</span>
      </div>
      <div className="tooltip-row">
        <span className="tooltip-label">시작</span>
        <span className="tooltip-value">{formatDate(data.start)}</span>
      </div>
      {!isMilestone && (
        <div className="tooltip-row">
          <span className="tooltip-label">종료</span>
          <span className="tooltip-value">{formatDate(data.end)}</span>
        </div>
      )}
      {progress && (
        <div className="tooltip-row">
          <span className="tooltip-label">진행율</span>
          <span className="tooltip-value">{progress}</span>
        </div>
      )}
    </div>
  );
};

export default TaskTooltip;
