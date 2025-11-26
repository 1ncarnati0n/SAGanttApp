"use client";

import { useMemo } from "react";
import { GanttRoot } from "./CustomGantt/GanttRoot";
import { useGanttSchedule } from "./gantt/useGanttSchedule";
import { GanttTask, GanttLink } from "./CustomGantt/types";
import { Task } from "@/lib/gantt/types/task";
import { Link } from "@/lib/gantt/types/link";

export function GanttChart() {
  const { schedule, isLoading } = useGanttSchedule();

  const { tasks, links } = useMemo(() => {
    if (!schedule) return { tasks: [], links: [] };

    const mappedTasks: GanttTask[] = schedule.tasks.map((task: Task) => ({
      id: String(task.id),
      text: task.text,
      start_date: new Date(task.start),
      end_date: task.end ? new Date(task.end) : new Date(task.start),
      duration: task.duration || 1,
      progress: task.progress || 0,
      parent: task.parent || 0,
      type: task.type === 'summary' ? 'project' : 'task',
      open: task.open,
    }));

    const mappedLinks: GanttLink[] = schedule.links.map((link: Link) => ({
      id: String(link.id),
      source: String(link.source),
      target: String(link.target),
      type: String(link.type),
    }));

    return { tasks: mappedTasks, links: mappedLinks };
  }, [schedule]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-500">Loading Gantt Chart...</div>
      </div>
    );
  }

  return (
    <section className="flex flex-col h-full p-4">
      <div className="flex-1 relative h-full">
        <GanttRoot tasks={tasks} links={links} />
      </div>
    </section>
  );
}
