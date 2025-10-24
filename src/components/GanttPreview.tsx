import { useMemo, useState } from "react";
import { Editor, Gantt, defaultColumns, type IColumnConfig } from "@svar-ui/react-gantt";
import "@svar-ui/react-gantt/all.css";

import "../styles/gantt.css";
import { GanttControls } from "./gantt/GanttControls";
import { WillowTheme } from "./gantt/WillowTheme";
import { editorItems } from "./gantt/editorItems";
import { CELL_HEIGHT, CELL_WIDTH_MAP, TASK_TYPES } from "./gantt/taskConfig";
import { useGanttSchedule } from "./gantt/useGanttSchedule";
import type { ViewType } from "./gantt/types";

const START_COLUMN_WIDTH = 120;

interface ScaleConfig {
  unit: "year" | "month" | "week" | "day" | "hour";
  step: number;
  format: string;
}

const TIME_SCALE_CONFIGS: Record<ViewType, { scales: ScaleConfig[] }> = {
  day: {
    scales: [
      { unit: "year", step: 1, format: "yyyy년" },
      { unit: "month", step: 1, format: "M월" },
      { unit: "day", step: 1, format: "d" },
    ],
  },
  week: {
    scales: [
      { unit: "year", step: 1, format: "yyyy년" },
      { unit: "month", step: 1, format: "M월" },
      { unit: "week", step: 1, format: "w주" },
    ],
  },
  month: {
    scales: [
      { unit: "year", step: 1, format: "yyyy년" },
      { unit: "month", step: 1, format: "M월" },
    ],
  },
};

export function GanttPreview() {
  const [viewType, setViewType] = useState<ViewType>("day");
  const [showBaselines, setShowBaselines] = useState(false);
  const [ganttApi, setGanttApi] = useState<any | null>(null);
  const { schedule, isLoading, saveState, hasChanges, handleSave, handlers, initGantt } = useGanttSchedule();

  const columns = useMemo<IColumnConfig[]>(() => {
    return defaultColumns.map((column) => {
      if (column.id === "text") {
        return { ...column, header: "단위공정" };
      }

      if (column.id === "start") {
        return {
          ...column,
          header: "시작",
          width: START_COLUMN_WIDTH,
          format: "yyyy-MM-dd",
        };
      }

      if (column.id === "duration") {
        return {
          ...column,
          header: "일수",
          width: Math.round(START_COLUMN_WIDTH * 0.45),
        };
      }

      return column;
    });
  }, []);

  const scales = useMemo(() => TIME_SCALE_CONFIGS[viewType].scales, [viewType]);

  const handleInit = (api: any) => {
    initGantt(api);
    setGanttApi(api);
  };

  return (
    <section className="flex flex-1 flex-col gap-4">
      <header className="flex flex-col gap-1">
        <h3 className="text-2xl font-semibold text-slate-900">공동주택 골조공사 표준공정</h3>
        <p className="text-sm text-slate-500">
          골조공사 표준공정
        </p>
      </header>
      <GanttControls
        viewType={viewType}
        onViewTypeChange={setViewType}
        showBaselines={showBaselines}
        onToggleBaselines={() => setShowBaselines((prev) => !prev)}
        onSave={() => { void handleSave(); }}
        hasChanges={hasChanges}
        saveState={saveState}
      />

      <div className="gantt-wrapper relative flex-1" role="group" aria-label="프로젝트 간트 차트">
        {isLoading ? (
          <div className="flex h-full items-center justify-center bg-white/70 text-sm text-slate-600">
            데이터를 불러오는 중...
          </div>
        ) : schedule ? (
          <>
            <WillowTheme>
              <Gantt
                init={handleInit}
                tasks={schedule.tasks}
                links={schedule.links}
                scales={scales}
                columns={columns}
                taskTypes={TASK_TYPES}
                cellWidth={CELL_WIDTH_MAP[viewType]}
                cellHeight={CELL_HEIGHT}
                baselines={showBaselines}
                {...handlers}
              />
            </WillowTheme>
            {ganttApi && <Editor api={ganttApi} items={editorItems} />}
          </>
        ) : (
          <div className="flex h-full items-center justify-center bg-white/70 text-sm text-slate-600">
            데이터를 불러오지 못했습니다.
          </div>
        )}
      </div>
    </section>
  );
}

export default GanttPreview;
