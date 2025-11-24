/**
 * Projects Service
 * 프로젝트 CRUD 작업을 담당합니다.
 */

import { createClient } from "@/lib/supabase/client";
import {
  getMockProjects,
  getMockProject,
  createMockProject,
  updateMockProject,
  deleteMockProject,
} from "./mockStorage";

// Check if Supabase is configured
const USE_MOCK =
  !process.env.NEXT_PUBLIC_SUPABASE_URL ||
  !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_USE_MOCK === "true";

export interface Project {
  id: string;
  name: string;
  description?: string;
  start_date: string;
  end_date?: string;
  status: "planning" | "active" | "completed" | "on_hold";
  created_at: string;
  updated_at: string;
  created_by: string;
}

export interface CreateProjectDTO {
  name: string;
  description?: string;
  start_date: string;
  end_date?: string;
  status?: "planning" | "active" | "completed" | "on_hold";
}

export interface UpdateProjectDTO {
  name?: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  status?: "planning" | "active" | "completed" | "on_hold";
}

/**
 * Get all projects for the current user
 */
export async function getProjects(): Promise<Project[]> {
  if (USE_MOCK) {
    return getMockProjects();
  }

  const supabase = createClient();

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching projects:", error);
    // Fallback to mock data
    return getMockProjects();
  }

  return data as Project[];
}

/**
 * Get a single project by ID
 */
export async function getProject(id: string): Promise<Project | null> {
  if (USE_MOCK) {
    return getMockProject(id);
  }

  const supabase = createClient();

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      // Not found
      return getMockProject(id);
    }
    console.error("Error fetching project:", error);
    return getMockProject(id);
  }

  return data as Project;
}

/**
 * Create a new project
 */
export async function createProject(project: CreateProjectDTO): Promise<Project> {
  if (USE_MOCK) {
    return createMockProject(project);
  }

  const supabase = createClient();

  // Get current user (optional for development)
  const { data: userData } = await supabase.auth.getUser();
  const userId = userData?.user?.id || "00000000-0000-0000-0000-000000000000"; // Default UUID for dev

  const { data, error } = await supabase
    .from("projects")
    .insert({
      ...project,
      created_by: userId,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating project:", error);
    // Fallback to mock
    return createMockProject(project);
  }

  return data as Project;
}

/**
 * Update a project
 */
export async function updateProject(
  id: string,
  updates: UpdateProjectDTO
): Promise<Project> {
  if (USE_MOCK) {
    return updateMockProject(id, updates);
  }

  const supabase = createClient();

  const { data, error } = await supabase
    .from("projects")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating project:", error);
    return updateMockProject(id, updates);
  }

  return data as Project;
}

/**
 * Delete a project
 */
export async function deleteProject(id: string): Promise<void> {
  if (USE_MOCK) {
    deleteMockProject(id);
    return;
  }

  const supabase = createClient();

  const { error } = await supabase.from("projects").delete().eq("id", id);

  if (error) {
    console.error("Error deleting project:", error);
    deleteMockProject(id);
  }
}

