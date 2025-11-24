module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/lib/supabase/client.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Client Component용 Supabase Client
// "use client" 컴포넌트에서 사용
__turbopack_context__.s([
    "createClient",
    ()=>createClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/createBrowserClient.js [app-route] (ecmascript)");
;
function createClient() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createBrowserClient"])(("TURBOPACK compile-time value", "https://qmpxpefjqgfaehahzzad.supabase.co"), ("TURBOPACK compile-time value", "sb_publishable_JCtRZlnKimSobWV-cI5s4g_mYD9MeL0"));
}
}),
"[project]/src/lib/services/seedData.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Seed Data for Supabase
 * 샘플 건설 프로젝트 및 Gantt 차트 데이터
 */ __turbopack_context__.s([
    "SAMPLE_GANTT_CHART",
    ()=>SAMPLE_GANTT_CHART,
    "SAMPLE_LINKS",
    ()=>SAMPLE_LINKS,
    "SAMPLE_PROJECT",
    ()=>SAMPLE_PROJECT,
    "SAMPLE_TASKS",
    ()=>SAMPLE_TASKS,
    "seedSampleData",
    ()=>seedSampleData
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/client.ts [app-route] (ecmascript)");
;
const SAMPLE_PROJECT = {
    name: "고층 오피스 빌딩 건설 프로젝트",
    description: "서울시 강남구 테헤란로 35층 규모의 오피스 빌딩 건설 프로젝트",
    start_date: "2024-01-01",
    end_date: "2026-12-31",
    status: "active"
};
const SAMPLE_GANTT_CHART = {
    name: "건설 공정 일정표",
    description: "전체 건설 공정 일정 관리",
    start_date: "2024-01-01",
    end_date: "2026-12-31"
};
const SAMPLE_TASKS = [
    {
        id: "1",
        text: "설계 단계",
        type: "summary",
        start: "2024-01-15",
        end: "2024-04-15",
        progress: 100,
        parent: null,
        position: 0,
        open: true,
        category: "설계",
        workType: "기획"
    },
    {
        id: "1.1",
        text: "기본설계",
        type: "task",
        start: "2024-01-15",
        end: "2024-02-15",
        progress: 100,
        parent: "1",
        position: 1,
        open: true,
        category: "설계",
        workType: "기획"
    },
    {
        id: "1.2",
        text: "실시설계",
        type: "task",
        start: "2024-02-16",
        end: "2024-04-15",
        progress: 100,
        parent: "1",
        position: 2,
        open: true,
        category: "설계",
        workType: "기획"
    },
    {
        id: "2",
        text: "기초공사",
        type: "summary",
        start: "2024-04-16",
        end: "2024-08-31",
        progress: 75,
        parent: null,
        position: 3,
        open: true,
        category: "구조",
        workType: "시공"
    },
    {
        id: "2.1",
        text: "터파기",
        type: "task",
        start: "2024-04-16",
        end: "2024-05-15",
        progress: 100,
        parent: "2",
        position: 4,
        open: true,
        category: "구조",
        workType: "시공"
    },
    {
        id: "2.2",
        text: "기초 콘크리트",
        type: "task",
        start: "2024-05-16",
        end: "2024-07-15",
        progress: 100,
        parent: "2",
        position: 5,
        open: true,
        category: "구조",
        workType: "시공"
    },
    {
        id: "2.3",
        text: "지하주차장",
        type: "task",
        start: "2024-07-16",
        end: "2024-08-31",
        progress: 50,
        parent: "2",
        position: 6,
        open: true,
        category: "구조",
        workType: "시공"
    },
    {
        id: "3",
        text: "골조공사",
        type: "summary",
        start: "2024-09-01",
        end: "2025-06-30",
        progress: 40,
        parent: null,
        position: 7,
        open: true,
        category: "구조",
        workType: "시공"
    },
    {
        id: "3.1",
        text: "철골공사",
        type: "task",
        start: "2024-09-01",
        end: "2025-02-28",
        progress: 60,
        parent: "3",
        position: 8,
        open: true,
        category: "구조",
        workType: "시공"
    },
    {
        id: "3.2",
        text: "슬라브공사",
        type: "task",
        start: "2025-03-01",
        end: "2025-06-30",
        progress: 20,
        parent: "3",
        position: 9,
        open: true,
        category: "구조",
        workType: "시공"
    },
    {
        id: "4",
        text: "마감공사",
        type: "summary",
        start: "2025-07-01",
        end: "2026-06-30",
        progress: 0,
        parent: null,
        position: 10,
        open: true,
        category: "마감",
        workType: "마감"
    },
    {
        id: "4.1",
        text: "외벽 마감",
        type: "task",
        start: "2025-07-01",
        end: "2025-12-31",
        progress: 0,
        parent: "4",
        position: 11,
        open: true,
        category: "마감",
        workType: "마감"
    },
    {
        id: "4.2",
        text: "내부 마감",
        type: "task",
        start: "2026-01-01",
        end: "2026-06-30",
        progress: 0,
        parent: "4",
        position: 12,
        open: true,
        category: "마감",
        workType: "마감"
    },
    {
        id: "5",
        text: "준공",
        type: "milestone",
        start: "2026-12-31",
        progress: 0,
        parent: null,
        position: 13,
        open: true,
        category: "완료",
        workType: "검수"
    }
];
const SAMPLE_LINKS = [
    {
        id: "1",
        source: "1",
        target: "2",
        type: "e2s"
    },
    {
        id: "2",
        source: "1.1",
        target: "1.2",
        type: "e2s"
    },
    {
        id: "3",
        source: "2",
        target: "3",
        type: "e2s"
    },
    {
        id: "4",
        source: "2.1",
        target: "2.2",
        type: "e2s"
    },
    {
        id: "5",
        source: "2.2",
        target: "2.3",
        type: "e2s"
    },
    {
        id: "6",
        source: "3",
        target: "4",
        type: "e2s"
    },
    {
        id: "7",
        source: "3.1",
        target: "3.2",
        type: "e2s"
    },
    {
        id: "8",
        source: "4",
        target: "5",
        type: "e2s"
    },
    {
        id: "9",
        source: "4.1",
        target: "4.2",
        type: "e2s"
    }
];
async function seedSampleData() {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
    try {
        // 1. Create project
        const { data: projectData, error: projectError } = await supabase.from("projects").insert(SAMPLE_PROJECT).select().single();
        if (projectError) throw projectError;
        if (!projectData) throw new Error("Failed to create project");
        console.log("✅ Project created:", projectData.id);
        // 2. Create Gantt chart
        const { data: chartData, error: chartError } = await supabase.from("gantt_charts").insert({
            ...SAMPLE_GANTT_CHART,
            project_id: projectData.id
        }).select().single();
        if (chartError) throw chartError;
        if (!chartData) throw new Error("Failed to create Gantt chart");
        console.log("✅ Gantt chart created:", chartData.id);
        // 3. Create tasks
        const tasksToInsert = SAMPLE_TASKS.map((task)=>({
                gantt_chart_id: chartData.id,
                text: task.text,
                type: task.type,
                start_date: task.start,
                end_date: task.type === "milestone" ? null : task.end,
                progress: task.progress,
                parent_id: task.parent,
                position: task.position,
                open: task.open,
                category: task.category,
                work_type: task.workType
            }));
        const { error: tasksError } = await supabase.from("tasks").insert(tasksToInsert);
        if (tasksError) throw tasksError;
        console.log("✅ Tasks created:", tasksToInsert.length);
        // 4. Create links
        const linksToInsert = SAMPLE_LINKS.map((link)=>({
                gantt_chart_id: chartData.id,
                source_task_id: link.source,
                target_task_id: link.target,
                type: link.type
            }));
        const { error: linksError } = await supabase.from("links").insert(linksToInsert);
        if (linksError) throw linksError;
        console.log("✅ Links created:", linksToInsert.length);
        return {
            success: true,
            projectId: projectData.id,
            chartId: chartData.id
        };
    } catch (error) {
        console.error("❌ Seed error:", error);
        return {
            success: false,
            error
        };
    }
}
}),
"[project]/src/app/api/seed/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * API Route: Seed Sample Data
 * 샘플 데이터를 Supabase에 생성하는 API
 */ __turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$seedData$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/services/seedData.ts [app-route] (ecmascript)");
;
;
async function POST() {
    try {
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$seedData$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["seedSampleData"])();
        if (!result.success) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Failed to seed data",
                details: result.error
            }, {
                status: 500
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            message: "Sample data seeded successfully",
            projectId: result.projectId,
            chartId: result.chartId
        });
    } catch (error) {
        console.error("Seed API error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Internal server error"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__b7072e4f._.js.map