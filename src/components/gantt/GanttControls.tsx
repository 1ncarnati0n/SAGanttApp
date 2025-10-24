import type { SaveState, ViewType } from "./types";

interface GanttControlsProps {
  viewType: ViewType;
  onViewTypeChange: (viewType: ViewType) => void;
  showBaselines: boolean;
  onToggleBaselines: () => void;
  onSave: () => void;
  hasChanges: boolean;
  saveState: SaveState;
}

const VIEW_OPTIONS: Array<{ id: ViewType; label: string }> = [
  { id: "day", label: "일" },
  { id: "week", label: "주" },
  { id: "month", label: "월" },
];

export function GanttControls({
  viewType,
  onViewTypeChange,
  showBaselines,
  onToggleBaselines,
  onSave,
  hasChanges,
  saveState,
}: GanttControlsProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-lg bg-slate-100 px-4 py-3">
      <div className="flex gap-2">
        {VIEW_OPTIONS.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onViewTypeChange(option.id)}
            className={`rounded border px-4 py-2 text-sm font-medium transition-colors ${
              viewType === option.id
                ? "border-slate-900 bg-slate-900 text-white shadow-sm"
                : "border-slate-300 bg-white text-slate-700 hover:bg-slate-200"
            }`}
            aria-pressed={viewType === option.id}
          >
            {option.label}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={onToggleBaselines}
        className={`rounded border px-4 py-2 text-sm font-medium transition-colors ${
          showBaselines
            ? "border-gantt-accent bg-gantt-accent text-white shadow-sm"
            : "border-slate-300 bg-white text-slate-700 hover:bg-slate-200"
        }`}
        aria-pressed={showBaselines}
      >
        계획 일정 {showBaselines ? "숨기기" : "표시"}
      </button>
      <button
        type="button"
        onClick={onSave}
        disabled={!hasChanges || saveState === "saving"}
        className="rounded border border-gantt-primary bg-gantt-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors enabled:hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {saveState === "saving" ? "저장 중..." : "저장"}
      </button>
      <span className="text-xs text-slate-500" role="status">
        {hasChanges && saveState === "idle" && "변경 사항이 있습니다."}
        {saveState === "saved" && "변경 내용이 mock.json에 저장되었습니다."}
        {saveState === "error" && "저장 실패 - 콘솔을 확인하세요."}
      </span>
    </div>
  );
}
