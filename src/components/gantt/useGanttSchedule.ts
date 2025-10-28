import { useCallback, useEffect, useRef, useState } from "react";

import type { SaveState, ScheduleData } from "./types";

interface UseGanttScheduleResult {
  schedule: ScheduleData | null;
  isLoading: boolean;
  saveState: SaveState;
  hasChanges: boolean;
  handleSave: () => Promise<void>;
  initGantt: (api: any) => void;
}

const TYPE_COLORS: Record<string, { bar: string; progress: string }> = {
  urgent: { bar: "#f49a82", progress: "#f45e36" },
  narrow: { bar: "#676a81", progress: "#1a2630" },
  progress: { bar: "#00bcd4", progress: "#00bcd4" },
  round: { bar: "#10b981", progress: "#6ee7b7" },
};

const SYNC_EVENT_TAG = Symbol("gantt-sync-listener");
const UI_EVENT_TAG = Symbol("gantt-ui-handlers");
const SUMMARY_EVENT_TAG = Symbol("gantt-summary-progress");
const MS_PER_DAY = 24 * 60 * 60 * 1000;

const toIsoDate = (value: unknown): string | undefined => {
  if (value === null || value === undefined) {
    return undefined;
  }

  if (typeof value === "number" && Number.isFinite(value)) {
    const next = new Date(value);
    return Number.isNaN(next.getTime()) ? undefined : next.toISOString().split("T")[0];
  }

  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed.length) {
      return undefined;
    }
    const parsed = new Date(trimmed);
    return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString().split("T")[0];
  }

  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? undefined : value.toISOString().split("T")[0];
  }

  return undefined;
};

const normalizeNumber = (value: unknown): number | undefined => {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim().length) {
    const next = Number(value);
    if (!Number.isNaN(next)) {
      return next;
    }
  }

  return undefined;
};

const toDateOrUndefined = (value: unknown): Date | undefined => {
  if (!value && value !== 0) {
    return undefined;
  }

  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? undefined : value;
  }

  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed.length) {
      return undefined;
    }

    const dateOnly = /^(\d{4})-(\d{2})-(\d{2})$/;
    const match = trimmed.match(dateOnly);
    if (match) {
      const [, yearStr, monthStr, dayStr] = match;
      const year = Number(yearStr);
      const month = Number(monthStr) - 1;
      const day = Number(dayStr);
      if (
        Number.isInteger(year) &&
        Number.isInteger(month) &&
        Number.isInteger(day)
      ) {
        const candidate = new Date(year, month, day);
        return Number.isNaN(candidate.getTime()) ? undefined : candidate;
      }
    }

    const parsed = new Date(trimmed);
    return Number.isNaN(parsed.getTime()) ? undefined : parsed;
  }

  if (typeof value === "number") {
    const next = new Date(value);
    return Number.isNaN(next.getTime()) ? undefined : next;
  }

  return undefined;
};

const calculateTaskDuration = (task: Record<string, unknown>): number => {
  if (!task || typeof task !== "object") {
    return 0;
  }

  if (typeof task.duration === "number" && Number.isFinite(task.duration) && task.duration > 0) {
    return task.duration;
  }

  const start = toDateOrUndefined(task.start);
  const end = toDateOrUndefined(task.end);

  if (!start || !end) {
    return 0;
  }

  const diff = (end.getTime() - start.getTime()) / MS_PER_DAY;
  if (!Number.isFinite(diff) || diff <= 0) {
    return 0;
  }

  return diff;
};

const decorateTask = (task: Record<string, unknown>): Record<string, unknown> => {
  const decorated: Record<string, unknown> = { ...task };

  const start = toDateOrUndefined(decorated.start);
  if (start) {
    decorated.start = new Date(start);
  }

  const end = toDateOrUndefined(decorated.end);
  if (end) {
    decorated.end = new Date(end);
  }

  const baseStart = toDateOrUndefined(decorated.base_start);
  if (baseStart) {
    decorated.base_start = new Date(baseStart);
  }

  const baseEnd = toDateOrUndefined(decorated.base_end);
  if (baseEnd) {
    decorated.base_end = new Date(baseEnd);
  }

  if (decorated.type === "milestone") {
    decorated.duration = 0;
    delete decorated.end;
  }

  const typeKey = typeof decorated.type === "string" ? decorated.type : "";
  const palette = TYPE_COLORS[typeKey];
  if (palette) {
    decorated.color = palette.bar;
    decorated.progressColor = palette.progress;
  }

  return decorated;
};

const serializeTask = (taskInput: Record<string, unknown>): Record<string, unknown> => {
  const serialized: Record<string, unknown> = {};

  if (taskInput.id !== undefined) serialized.id = taskInput.id;
  if (taskInput.text !== undefined) serialized.text = taskInput.text;
  if (taskInput.type !== undefined) serialized.type = taskInput.type;

  const startDate = toIsoDate(taskInput.start);
  if (startDate) serialized.start = startDate;

  if (taskInput.type === "milestone") {
    // 마일스톤은 start만 유지
  } else {
    const endDate = toIsoDate(taskInput.end);
    if (endDate) {
      serialized.end = endDate;
    }
  }

  const baseStart = toIsoDate(taskInput.base_start);
  if (baseStart) serialized.base_start = baseStart;

  const baseEnd = toIsoDate(taskInput.base_end);
  if (baseEnd) serialized.base_end = baseEnd;

  const normalizedProgress = normalizeNumber(taskInput.progress);
  if (typeof normalizedProgress !== "undefined") {
    serialized.progress = normalizedProgress;
  }

  if (taskInput.parent !== undefined) serialized.parent = taskInput.parent;
  if (taskInput.lazy !== undefined) serialized.lazy = taskInput.lazy;
  if (taskInput.category !== undefined) serialized.category = taskInput.category;
  if (taskInput.workType !== undefined) serialized.workType = taskInput.workType;
  if (taskInput.open !== undefined) serialized.open = taskInput.open;

  return serialized;
};

const serializeLink = (linkInput: Record<string, unknown>): Record<string, unknown> => {
  const serialized: Record<string, unknown> = {};

  if (linkInput.id !== undefined) serialized.id = linkInput.id;
  if (linkInput.source !== undefined) serialized.source = linkInput.source;
  if (linkInput.target !== undefined) serialized.target = linkInput.target;
  if (linkInput.type !== undefined) serialized.type = linkInput.type;

  return serialized;
};

const serializeSchedule = (
  tasks: Array<Record<string, unknown>>,
  links: Array<Record<string, unknown>>,
  scales: Array<Record<string, unknown>>,
) => ({
  tasks: tasks.map((task) => serializeTask(task)),
  links: links.map((link) => serializeLink(link)),
  scales: scales.map((scale) => ({
    unit: scale.unit,
    step: scale.step,
    format: scale.format,
  })),
});

export const useGanttSchedule = (): UseGanttScheduleResult => {
  const apiRef = useRef<any | null>(null);
  const currentTasksRef = useRef<Array<Record<string, unknown>>>([]);
  const currentLinksRef = useRef<Array<Record<string, unknown>>>([]);
  const scalesRef = useRef<Array<Record<string, unknown>>>([]);

  const [schedule, setSchedule] = useState<ScheduleData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [hasChanges, setHasChanges] = useState<boolean>(false);

  const getSummaryProgress = useCallback((summaryId: unknown): number => {
    const api = apiRef.current;
    if (!api) {
      return 0;
    }

    const collect = (taskId: unknown): [number, number] => {
      const task = api.getTask(taskId);
      const children = task?.data;

      if (!children || !children.length) {
        return [0, 0];
      }

      let totalProgress = 0;
      let totalDuration = 0;

      children.forEach((child: any) => {
        const childTask = api.getTask(child.id);
        if (!childTask) {
          return;
        }

        if (childTask.type !== "milestone" && childTask.type !== "summary") {
          const duration = calculateTaskDuration(childTask);
          if (duration > 0) {
            const progressValue =
              typeof childTask.progress === "number"
                ? childTask.progress
                : Number(childTask.progress ?? 0);
            const boundedProgress = Number.isFinite(progressValue)
              ? Math.max(0, Math.min(100, progressValue))
              : 0;
            totalDuration += duration;
            totalProgress += duration * boundedProgress;
          }
        }

        const [childProgress, childDuration] = collect(childTask.id);
        totalProgress += childProgress;
        totalDuration += childDuration;
      });

      return [totalProgress, totalDuration];
    };

    const [totalProgress, totalDuration] = collect(summaryId);
    if (!totalDuration) {
      return 0;
    }

    const average = totalProgress / totalDuration;
    if (!Number.isFinite(average)) {
      return 0;
    }

    const rounded = Math.round(average);
    return Math.max(0, Math.min(100, rounded));
  }, []);

  const recalcSummaryProgress = useCallback(
    (taskId: unknown, treatAsSummary = false) => {
      const api = apiRef.current;
      if (!api) {
        return;
      }

      if (taskId === undefined || taskId === null) {
        return;
      }

      const task = api.getTask(taskId);
      if (!task || task.type === "milestone") {
        return;
      }

      const state = api.getState?.();
      const tasksStore: any = state?.tasks;

      const summaryId =
        treatAsSummary && task.type === "summary"
          ? taskId
          : tasksStore?.getSummaryId?.(taskId);

      if (!summaryId) {
        return;
      }

      const summaryTask = api.getTask(summaryId);
      if (!summaryTask) {
        return;
      }

      const nextProgress = getSummaryProgress(summaryId);
      const currentProgress =
        typeof summaryTask.progress === "number"
          ? summaryTask.progress
          : Number(summaryTask.progress ?? 0);

      if (!Number.isFinite(nextProgress) || nextProgress === currentProgress) {
        return;
      }

      api.exec("update-task", {
        id: summaryId,
        task: { progress: nextProgress },
      });
    },
    [getSummaryProgress],
  );

  const recalcAllSummaryTasks = useCallback(() => {
    const api = apiRef.current;
    if (!api) {
      return;
    }

    try {
      const state = api.getState?.();
      const tasksStore: any = state?.tasks;
      tasksStore?.forEach?.((task: any) => {
        if (task.type === "summary") {
          recalcSummaryProgress(task.id, true);
        }
      });
    } catch (error) {
      console.warn("Failed to recalculate summary progress:", error);
    }
  }, [recalcSummaryProgress]);

  const markAsChanged = useCallback(() => {
    setHasChanges(true);
    setSaveState((prev) => (prev === "saved" ? "idle" : prev));
  }, []);

  const syncFromApi = useCallback(() => {
    const api = apiRef.current;
    if (!api) {
      return;
    }

    let rawTasks: Array<Record<string, unknown>> = [];
    try {
      rawTasks = typeof api.serialize === "function" ? api.serialize() ?? [] : [];
    } catch (error) {
      console.warn("Failed to serialize tasks from API:", error);
    }

    const decoratedTasks = rawTasks.map((task: any) => decorateTask(task));

    let links = currentLinksRef.current;
    try {
      const stores = typeof api.getStores === "function" ? api.getStores() : null;
      const dataStore = stores?.data;
      const state = dataStore?.getState ? dataStore.getState() : null;
      if (state?.links) {
        links = state.links.map((link: any) => ({ ...link }));
      }
    } catch (error) {
      console.warn("Failed to extract links from API:", error);
    }

    currentTasksRef.current = decoratedTasks;
    currentLinksRef.current = links;

    setSchedule((prev) =>
      prev
        ? {
            ...prev,
            tasks: decoratedTasks,
            links,
          }
        : prev,
    );
  }, []);

  const attachDataListeners = useCallback(
    (api: any) => {
      api.detach(SYNC_EVENT_TAG);

      const events = [
        "add-task",
        "update-task",
        "delete-task",
        "move-task",
        "copy-task",
        "indent-task",
        "add-link",
        "update-link",
        "delete-link",
      ];

      events.forEach((eventName) => {
        api.on(
          eventName,
          (event: any) => {
            if (event?.inProgress) {
              return;
            }
            syncFromApi();
            markAsChanged();
          },
          { tag: SYNC_EVENT_TAG },
        );
      });
    },
    [markAsChanged, syncFromApi],
  );

  const initGantt = useCallback(
    (api: any) => {
      apiRef.current = api;

      attachDataListeners(api);

      api.detach(SUMMARY_EVENT_TAG);
      const registerSummaryHandler = (action: string, handler: (payload: any) => void) => {
        api.on(action, handler, { tag: SUMMARY_EVENT_TAG });
      };

      registerSummaryHandler("add-task", ({ id }: { id: unknown }) => {
        recalcSummaryProgress(id);
      });

      registerSummaryHandler("update-task", (event: any) => {
        if (event?.inProgress) {
          return;
        }
        recalcSummaryProgress(event.id);
      });

      registerSummaryHandler("copy-task", ({ id }: { id: unknown }) => {
        recalcSummaryProgress(id);
      });

      registerSummaryHandler("delete-task", ({ source }: { source: unknown }) => {
        if (source !== undefined && source !== null) {
          recalcSummaryProgress(source, true);
        }
      });

      registerSummaryHandler("move-task", (event: any) => {
        if (event?.inProgress) {
          return;
        }
        recalcSummaryProgress(event.id);
        if (event?.source !== undefined && event?.source !== null) {
          recalcSummaryProgress(event.source, true);
        }
      });

      api.detach(UI_EVENT_TAG);
      api.on(
        "add-task",
        ({ id }: { id: string | number }) => {
          api.exec("show-editor", { id });
        },
        { tag: UI_EVENT_TAG },
      );

      recalcAllSummaryTasks();
      syncFromApi();
    },
    [attachDataListeners, recalcAllSummaryTasks, recalcSummaryProgress, syncFromApi],
  );

  const handleSave = useCallback(async () => {
    if (!import.meta.env.DEV) {
      console.error("Not in development mode");
      return;
    }

    const api = apiRef.current;
    if (!api) {
      console.error("Gantt API is not ready");
      return;
    }

    try {
      setSaveState("saving");
      syncFromApi();

      const tasksToSave = currentTasksRef.current;
      if (tasksToSave.length === 0) {
        throw new Error("No tasks to save");
      }

      let linksToSave = currentLinksRef.current;
      try {
        const stores = typeof api.getStores === "function" ? api.getStores() : null;
        const dataStore = stores?.data;
        const state = dataStore?.getState ? dataStore.getState() : null;
        if (state?.links) {
          linksToSave = state.links.map((link: any) => ({ ...link }));
          currentLinksRef.current = linksToSave;
        }
      } catch (error) {
        console.warn("Falling back to cached links while saving:", error);
      }

      const payload = serializeSchedule(
        tasksToSave,
        linksToSave,
        schedule?.scales ?? scalesRef.current,
      );

      const response = await fetch("/api/mock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      setSaveState("saved");
      setHasChanges(false);
      window.setTimeout(() => {
        setSaveState("idle");
      }, 1500);
    } catch (error) {
      console.error("Save error:", error);
      setSaveState("error");
      alert("저장 중 오류가 발생했습니다: " + (error as Error).message);
    }
  }, [schedule?.scales, syncFromApi]);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      setIsLoading(true);

      try {
        const response = await fetch("/api/mock");
        if (!response.ok) {
          throw new Error(`Request failed: ${response.statusText}`);
        }

        const data = await response.json();
        if (!isMounted) {
          return;
        }

        const tasks = (data.tasks ?? []).map((task: any) => decorateTask(task));
        const links = (data.links ?? []).map((link: any) => ({ ...link }));
        const scales = (data.scales ?? []).map((scale: any) => ({ ...scale }));

        scalesRef.current = scales;
        currentTasksRef.current = tasks;
        currentLinksRef.current = links;

        setSchedule({ tasks, links, scales });
        setHasChanges(false);
        setSaveState("idle");
      } catch (error) {
        console.error("Error loading data:", error);
        if (isMounted) {
          setSchedule(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadData();

    return () => {
      isMounted = false;
      const api = apiRef.current;
      if (api) {
        api.detach(SYNC_EVENT_TAG);
        api.detach(UI_EVENT_TAG);
        api.detach(SUMMARY_EVENT_TAG);
      }
    };
  }, []);

  return {
    schedule,
    isLoading,
    saveState,
    hasChanges,
    handleSave,
    initGantt,
  };
};
