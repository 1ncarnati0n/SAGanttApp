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

  if (typeof value === "string" || typeof value === "number") {
    const next = new Date(value);
    return Number.isNaN(next.getTime()) ? undefined : next;
  }

  return undefined;
};

const decorateTask = (task: Record<string, unknown>): Record<string, unknown> => {
  const decorated: Record<string, unknown> = { ...task };

  const start = toDateOrUndefined(decorated.start);
  const end = toDateOrUndefined(decorated.end);

  if (start) {
    decorated.start = start;
  }
  if (end) {
    decorated.end = end;
  }

  const baseStart = toDateOrUndefined(decorated.base_start);
  if (baseStart) {
    decorated.base_start = baseStart;
  }

  const baseEnd = toDateOrUndefined(decorated.base_end);
  if (baseEnd) {
    decorated.base_end = baseEnd;
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

      api.detach(UI_EVENT_TAG);
      api.on(
        "add-task",
        ({ id }: { id: string | number }) => {
          api.exec("show-editor", { id });
        },
        { tag: UI_EVENT_TAG },
      );

      syncFromApi();
    },
    [attachDataListeners, syncFromApi],
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
