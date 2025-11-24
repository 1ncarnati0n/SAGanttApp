/**
 * Links Service
 * Task 간의 의존성(Link) CRUD 작업을 담당합니다.
 */

import { createClient } from "@/lib/supabase/client";
import type { Link, LinkDTO } from "@/lib/gantt/types";
import { getMockLinks } from "./mockStorage";

// Check if Supabase is configured
const USE_MOCK =
  !process.env.NEXT_PUBLIC_SUPABASE_URL ||
  !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_USE_MOCK === "true";

/**
 * Get all links for a Gantt chart
 */
export async function getLinks(ganttChartId: string): Promise<Link[]> {
  if (USE_MOCK) {
    return getMockLinks(ganttChartId);
  }

  const supabase = createClient();

  const { data, error } = await supabase
    .from("links")
    .select("*")
    .eq("gantt_chart_id", ganttChartId);

  if (error) {
    console.error("Error fetching links:", error);
    return getMockLinks(ganttChartId);
  }

  // Convert DTO to Link
  return (data as LinkDTO[]).map((linkDto) => ({
    id: linkDto.id,
    source: linkDto.source_task_id,
    target: linkDto.target_task_id,
    type: linkDto.type,
  }));
}

/**
 * Get a single link by ID
 */
export async function getLink(id: string | number): Promise<Link | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("links")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      // Not found
      return null;
    }
    console.error("Error fetching link:", error);
    throw new Error("Failed to fetch link");
  }

  const linkDto = data as LinkDTO;
  return {
    id: linkDto.id,
    source: linkDto.source_task_id,
    target: linkDto.target_task_id,
    type: linkDto.type,
  };
}

/**
 * Create a new link
 */
export async function createLink(link: Link, ganttChartId: string): Promise<Link> {
  const supabase = createClient();

  const linkDto: Partial<LinkDTO> = {
    gantt_chart_id: ganttChartId,
    source_task_id: link.source,
    target_task_id: link.target,
    type: link.type,
  };

  const { data, error } = await supabase
    .from("links")
    .insert(linkDto)
    .select()
    .single();

  if (error) {
    console.error("Error creating link:", error);
    throw new Error("Failed to create link");
  }

  const createdDto = data as LinkDTO;
  return {
    id: createdDto.id,
    source: createdDto.source_task_id,
    target: createdDto.target_task_id,
    type: createdDto.type,
  };
}

/**
 * Update a link
 */
export async function updateLink(
  id: string | number,
  updates: Partial<Link>
): Promise<Link> {
  const supabase = createClient();

  const linkDto: Partial<LinkDTO> = {};
  if (updates.source !== undefined) linkDto.source_task_id = updates.source;
  if (updates.target !== undefined) linkDto.target_task_id = updates.target;
  if (updates.type !== undefined) linkDto.type = updates.type;

  const { data, error } = await supabase
    .from("links")
    .update(linkDto)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating link:", error);
    throw new Error("Failed to update link");
  }

  const updatedDto = data as LinkDTO;
  return {
    id: updatedDto.id,
    source: updatedDto.source_task_id,
    target: updatedDto.target_task_id,
    type: updatedDto.type,
  };
}

/**
 * Delete a link
 */
export async function deleteLink(id: string | number): Promise<void> {
  const supabase = createClient();

  const { error } = await supabase.from("links").delete().eq("id", id);

  if (error) {
    console.error("Error deleting link:", error);
    throw new Error("Failed to delete link");
  }
}

/**
 * Batch create links
 */
export async function createLinksBatch(
  links: Link[],
  ganttChartId: string
): Promise<Link[]> {
  const supabase = createClient();

  const linkDtos: Array<Partial<LinkDTO>> = links.map((link) => ({
    gantt_chart_id: ganttChartId,
    source_task_id: link.source,
    target_task_id: link.target,
    type: link.type,
  }));

  const { data, error } = await supabase
    .from("links")
    .insert(linkDtos)
    .select();

  if (error) {
    console.error("Error creating links batch:", error);
    throw new Error("Failed to create links batch");
  }

  return (data as LinkDTO[]).map((linkDto) => ({
    id: linkDto.id,
    source: linkDto.source_task_id,
    target: linkDto.target_task_id,
    type: linkDto.type,
  }));
}

