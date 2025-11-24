/**
 * Mock Storage for Development
 * LocalStorage를 사용한 개발 환경 데이터 저장
 */

import type { Project, CreateProjectDTO } from "./projects";
import type { GanttChart, CreateGanttChartDTO } from "./ganttCharts";
import type { Task } from "@/lib/gantt/types";
import type { Link } from "@/lib/gantt/types";

const STORAGE_KEYS = {
  projects: "contech_gantt_projects",
  charts: "contech_gantt_charts",
  tasks: "contech_gantt_tasks",
  links: "contech_gantt_links",
};

// Check if running in browser
const isBrowser = typeof window !== "undefined";

// Generate UUID
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// === Sample Data Initialization ===

export function initializeSampleData(): void {
  if (!isBrowser) return;

  // Check if sample data already exists
  const existingProjects = getMockProjects();
  if (existingProjects.length > 0) return; // Already initialized

  console.log("🎯 Mock Storage: 샘플 데이터 초기화 중...");

  // Sample Project
  const sampleProject: Project = {
    id: "sample-project-1",
    name: "샘플 프로젝트",
    description: "LocalStorage 기반 샘플 프로젝트입니다",
    start_date: "2023-01-01",
    end_date: "2023-12-31",
    status: "active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    created_by: "mock-user-id",
  };

  // Sample Gantt Chart
  const sampleChart: GanttChart = {
    id: "sample-chart-1",
    project_id: "sample-project-1",
    name: "샘플 Gantt 차트",
    description: "기본 샘플 차트",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  // Sample Tasks
  const sampleTasks: Task[] = [
    {
      id: "1",
      gantt_chart_id: "sample-chart-1",
      project_id: "sample-project-1",
      text: "프로젝트 시작",
      type: "milestone",
      start: new Date("2023-01-01"),
      duration: 0,
      progress: 100,
      user_id: "mock-user-id",
      created_at: new Date().toISOString(),
    },
    {
      id: "2",
      gantt_chart_id: "sample-chart-1",
      project_id: "sample-project-1",
      text: "요구사항 분석",
      type: "task",
      start: new Date("2023-01-05"),
      end: new Date("2023-01-20"),
      duration: 15,
      progress: 100,
      user_id: "mock-user-id",
      created_at: new Date().toISOString(),
    },
    {
      id: "3",
      gantt_chart_id: "sample-chart-1",
      project_id: "sample-project-1",
      text: "설계",
      type: "task",
      start: new Date("2023-01-21"),
      end: new Date("2023-02-15"),
      duration: 25,
      progress: 100,
      user_id: "mock-user-id",
      created_at: new Date().toISOString(),
    },
    {
      id: "4",
      gantt_chart_id: "sample-chart-1",
      project_id: "sample-project-1",
      text: "개발",
      type: "task",
      start: new Date("2023-02-16"),
      end: new Date("2023-05-31"),
      duration: 104,
      progress: 60,
      user_id: "mock-user-id",
      created_at: new Date().toISOString(),
    },
    {
      id: "5",
      gantt_chart_id: "sample-chart-1",
      project_id: "sample-project-1",
      text: "테스트",
      type: "task",
      start: new Date("2023-06-01"),
      end: new Date("2023-06-30"),
      duration: 30,
      progress: 0,
      user_id: "mock-user-id",
      created_at: new Date().toISOString(),
    },
    {
      id: "6",
      gantt_chart_id: "sample-chart-1",
      project_id: "sample-project-1",
      text: "배포",
      type: "milestone",
      start: new Date("2023-07-01"),
      duration: 0,
      progress: 0,
      user_id: "mock-user-id",
      created_at: new Date().toISOString(),
    },
  ];

  // Sample Links
  const sampleLinks: Link[] = [
    {
      id: "1",
      gantt_chart_id: "sample-chart-1",
      source: "1",
      target: "2",
      type: "e2s",
      created_at: new Date().toISOString(),
    },
    {
      id: "2",
      gantt_chart_id: "sample-chart-1",
      source: "2",
      target: "3",
      type: "e2s",
      created_at: new Date().toISOString(),
    },
    {
      id: "3",
      gantt_chart_id: "sample-chart-1",
      source: "3",
      target: "4",
      type: "e2s",
      created_at: new Date().toISOString(),
    },
    {
      id: "4",
      gantt_chart_id: "sample-chart-1",
      source: "4",
      target: "5",
      type: "e2s",
      created_at: new Date().toISOString(),
    },
    {
      id: "5",
      gantt_chart_id: "sample-chart-1",
      source: "5",
      target: "6",
      type: "e2s",
      created_at: new Date().toISOString(),
    },
  ];

  // Save to LocalStorage
  localStorage.setItem(STORAGE_KEYS.projects, JSON.stringify([sampleProject]));
  localStorage.setItem(STORAGE_KEYS.charts, JSON.stringify([sampleChart]));
  localStorage.setItem(STORAGE_KEYS.tasks, JSON.stringify(sampleTasks));
  localStorage.setItem(STORAGE_KEYS.links, JSON.stringify(sampleLinks));

  console.log("✅ Mock Storage: 샘플 데이터 초기화 완료!");
  console.log("  - Projects: 1개");
  console.log("  - Gantt Charts: 1개");
  console.log("  - Tasks: 6개");
  console.log("  - Links: 5개");
}

// === Projects ===

export function getMockProjects(): Project[] {
  if (!isBrowser) return [];
  const data = localStorage.getItem(STORAGE_KEYS.projects);
  return data ? JSON.parse(data) : [];
}

export function getMockProject(id: string): Project | null {
  const projects = getMockProjects();
  return projects.find((p) => p.id === id) || null;
}

export function createMockProject(project: CreateProjectDTO): Project {
  const projects = getMockProjects();
  const newProject: Project = {
    id: generateId(),
    ...project,
    status: project.status || "planning",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    created_by: "mock-user-id",
  };
  projects.push(newProject);
  if (isBrowser) {
    localStorage.setItem(STORAGE_KEYS.projects, JSON.stringify(projects));
  }
  return newProject;
}

export function updateMockProject(id: string, updates: Partial<Project>): Project {
  const projects = getMockProjects();
  const index = projects.findIndex((p) => p.id === id);
  if (index === -1) throw new Error("Project not found");

  projects[index] = {
    ...projects[index],
    ...updates,
    updated_at: new Date().toISOString(),
  };

  if (isBrowser) {
    localStorage.setItem(STORAGE_KEYS.projects, JSON.stringify(projects));
  }
  return projects[index];
}

export function deleteMockProject(id: string): void {
  const projects = getMockProjects();
  const filtered = projects.filter((p) => p.id !== id);
  if (isBrowser) {
    localStorage.setItem(STORAGE_KEYS.projects, JSON.stringify(filtered));
  }
}

// === Gantt Charts ===

export function getMockGanttCharts(projectId: string): GanttChart[] {
  if (!isBrowser) return [];
  const data = localStorage.getItem(STORAGE_KEYS.charts);
  const charts: GanttChart[] = data ? JSON.parse(data) : [];
  return charts.filter((c) => c.project_id === projectId);
}

export function getMockGanttChart(id: string): GanttChart | null {
  if (!isBrowser) return null;
  const data = localStorage.getItem(STORAGE_KEYS.charts);
  const charts: GanttChart[] = data ? JSON.parse(data) : [];
  return charts.find((c) => c.id === id) || null;
}

export function createMockGanttChart(chart: CreateGanttChartDTO): GanttChart {
  if (!isBrowser) throw new Error("Not in browser");
  const data = localStorage.getItem(STORAGE_KEYS.charts);
  const charts: GanttChart[] = data ? JSON.parse(data) : [];

  const newChart: GanttChart = {
    id: generateId(),
    ...chart,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  charts.push(newChart);
  localStorage.setItem(STORAGE_KEYS.charts, JSON.stringify(charts));
  return newChart;
}

export function updateMockGanttChart(
  id: string,
  updates: Partial<GanttChart>
): GanttChart {
  if (!isBrowser) throw new Error("Not in browser");
  const data = localStorage.getItem(STORAGE_KEYS.charts);
  const charts: GanttChart[] = data ? JSON.parse(data) : [];
  const index = charts.findIndex((c) => c.id === id);

  if (index === -1) throw new Error("Chart not found");

  charts[index] = {
    ...charts[index],
    ...updates,
    updated_at: new Date().toISOString(),
  };

  localStorage.setItem(STORAGE_KEYS.charts, JSON.stringify(charts));
  return charts[index];
}

export function deleteMockGanttChart(id: string): void {
  if (!isBrowser) return;
  const data = localStorage.getItem(STORAGE_KEYS.charts);
  const charts: GanttChart[] = data ? JSON.parse(data) : [];
  const filtered = charts.filter((c) => c.id !== id);
  localStorage.setItem(STORAGE_KEYS.charts, JSON.stringify(filtered));
}

// === Tasks ===

export function getMockTasks(ganttChartId: string): Task[] {
  if (!isBrowser) return [];
  const data = localStorage.getItem(STORAGE_KEYS.tasks);
  const allTasks: Array<Task & { gantt_chart_id: string }> = data ? JSON.parse(data) : [];
  return allTasks.filter((t) => t.gantt_chart_id === ganttChartId);
}

// === Links ===

export function getMockLinks(ganttChartId: string): Link[] {
  if (!isBrowser) return [];
  const data = localStorage.getItem(STORAGE_KEYS.links);
  const allLinks: Array<Link & { gantt_chart_id: string }> = data ? JSON.parse(data) : [];
  return allLinks.filter((l) => l.gantt_chart_id === ganttChartId);
}
