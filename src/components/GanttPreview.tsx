import { useMemo, useState, useCallback } from "react";
import {
  Editor,
  Gantt,
  Toolbar,
  ContextMenu,
  Tooltip,
  defaultColumns,
  defaultToolbarButtons,
  type IColumnConfig,
} from "@svar-ui/react-gantt";
import "@svar-ui/react-gantt/all.css";

import "./styles/gantt.css";
import { GanttControls } from "./gantt/GanttControls";
import { WillowTheme } from "./gantt/WillowTheme";
import { editorItems } from "./gantt/editorItems";
import TaskTooltip from "./gantt/TaskTooltip";
import { CELL_HEIGHT, CELL_WIDTH_MAP, TASK_TYPES } from "./gantt/taskConfig";
import { useGanttSchedule } from "./gantt/useGanttSchedule";
import type { ViewType } from "./gantt/types";
import { isWeekend, isKoreanHoliday } from "../data/koreanHolidays";

const START_COLUMN_WIDTH = 100;

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

const dateFormatter = new Intl.DateTimeFormat("ko-KR", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const formatDisplayEnd = (task: Record<string, any>): string => {
  const exclusiveEnd =
    task.end instanceof Date ? task.end : task.end ? new Date(task.end as string) : undefined;
  if (!exclusiveEnd) {
    return "";
  }

  const inclusive = new Date(exclusiveEnd);
  inclusive.setDate(inclusive.getDate() - 1);

  const start =
    task.start instanceof Date ? task.start : task.start ? new Date(task.start as string) : undefined;
  if (start && inclusive < start) {
    return dateFormatter.format(start);
  }

  return dateFormatter.format(inclusive);
};

export function GanttPreview() {
  const [viewType, setViewType] = useState<ViewType>("day");
  const [showBaselines, setShowBaselines] = useState(false);
  const [ganttApi, setGanttApi] = useState<any | null>(null);
  const { schedule, isLoading, saveState, hasChanges, handleSave, initGantt } = useGanttSchedule();

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

      if (column.id === "end") {
        return {
          ...column,
          header: "종료",
          width: START_COLUMN_WIDTH,
          format: "yyyy-MM-dd",
          template: (_: unknown, task: Record<string, any>) => formatDisplayEnd(task),
        };
      }

      if (column.id === "duration") {
        return {
          ...column,
          header: "D",
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

  // Toolbar 버튼 설정 - 한글화 및 아이콘 커스터마이징
  const toolbarItems = useMemo(() => {
    return defaultToolbarButtons.map((button) => {
      if (button.id === "add-task") {
        return { ...button, text: "새 작업", icon: button.icon}; // icon 속성으로 아이콘 지정
      }
      if (button.id === "edit-task") {
        return { ...button, Text: "편집", icon: button.icon || "wxi-edit" }; // 아이콘 변경 가능
      }
      if (button.id === "delete-task") {
        return { ...button, menuText: "삭제", icon: button.icon || "wxi-delete" };
      }
      if (button.id === "move-task:up") {
        return { ...button, menuText: "위로 이동", icon: button.icon || "wxi-angle-up" };
      }
      if (button.id === "move-task:down") {
        return { ...button, menuText: "아래로 이동", icon: button.icon || "wxi-angle-down" };
      }
      if (button.id === "copy-task") {
        return { ...button, menuText: "복사", icon: button.icon || "wxi-content-copy" };
      }
      if (button.id === "cut-task") {
        return { ...button, menuText: "잘라내기", icon: button.icon || "wxi-content-cut" };
      }
      if (button.id === "paste-task") {
        return { ...button, menuText: "붙여넣기", icon: button.icon || "wxi-content-paste" };
      }
      if (button.id === "indent-task:add") {
        return { ...button, menuText: "들여쓰기", icon: button.icon || "wxi-indent" };
      }
      if (button.id === "indent-task:remove") {
        return { ...button, menuText: "내어쓰기", icon: button.icon || "wxi-unindent" };
      }
      return button; // 기본 아이콘 유지
    });
  }, []);

  // Editor topBar 설정 - 아이콘 커스터마이징
  const editorTopBar = useMemo(() => {
    return {
      items: [
        { comp: "button", text: "닫기", id: "close" }, // 닫기 아이콘을 다른 것으로 변경하려면 여기 수정
        { comp: "spacer", icon: "", id: "spacer" },
        {
          comp: "button",
          type: "danger",
          text: "삭제",
          id: "delete",
        },
        {
          comp: "button",
          type: "primary",
          text: "저장",
          id: "save",
        },
      ],
    };
  }, []);

  // 주말 및 공휴일 하이라이트 함수
  const highlightTime = useCallback((date: Date, unit: string) => {
    // day 단위일 때만 주말/공휴일 표시
    if (unit === "day") {
      if (isKoreanHoliday(date)) {
        return "wx-holiday"; // 공휴일 스타일
      }
      if (isWeekend(date)) {
        return "wx-weekend"; // 주말 스타일
      }
    }
    return "";
  }, []);

  return (
    <section className="flex flex-col gap-2">
      <header>
        <h2 className="text-2xl font-semibold" >공동주택 골조공사 표준공정</h2>
        <p className="text-sm text-slate-500">
          Toolbar 및 ContextMenu를 사용하여 작업을 추가, 편집, 삭제할 수 있습니다.
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

      {ganttApi && <Toolbar api={ganttApi} items={toolbarItems} />}

      <div className="gantt-wrapper" role="group" aria-label="프로젝트 간트 차트">
        {isLoading ? (
          <div>
            데이터를 불러오는 중...
          </div>
        ) : schedule ? (
          <>
            <ContextMenu api={ganttApi}>
              <WillowTheme>
                <Tooltip api={ganttApi ?? undefined} content={TaskTooltip}>
                  <Gantt
                    init={handleInit}
                    tasks={schedule.tasks}
                    links={schedule.links}
                    scales={scales}
                    columns={columns}
                    taskTypes={TASK_TYPES}
                    cellWidth={CELL_WIDTH_MAP[viewType]}
                    cellHeight={CELL_HEIGHT}
                    highlightTime={highlightTime}
                    {...({ baselines: showBaselines } as any)}
                  />
                </Tooltip>
              </WillowTheme>
            </ContextMenu>
            {ganttApi && (
              <Editor
                api={ganttApi}
                items={editorItems}
                topBar={editorTopBar}
              />
            )}
          </>
        ) : (
          <div>
            데이터를 불러오지 못했습니다.
          </div>
        )}
      </div>
    </section>
  );
}

export default GanttPreview;
