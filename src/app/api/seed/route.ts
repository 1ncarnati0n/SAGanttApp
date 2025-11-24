/**
 * API Route: Seed Sample Data
 * 샘플 데이터를 Supabase에 생성하는 API
 */

import { NextResponse } from "next/server";
import { seedSampleData } from "@/lib/services/seedData";

export async function POST() {
  try {
    const result = await seedSampleData();

    if (!result.success) {
      return NextResponse.json(
        { error: "Failed to seed data", details: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Sample data seeded successfully",
      projectId: result.projectId,
      chartId: result.chartId,
    });
  } catch (error) {
    console.error("Seed API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

