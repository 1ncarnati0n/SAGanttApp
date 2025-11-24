(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/gantt/GanttControls.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GanttControls",
    ()=>GanttControls
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
const VIEW_OPTIONS = [
    {
        id: "day",
        label: "일"
    },
    {
        id: "week",
        label: "주"
    },
    {
        id: "month",
        label: "월"
    }
];
function GanttControls({ viewType, onViewTypeChange, showBaselines, onToggleBaselines, onSave, hasChanges, saveState }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-2 bg-gray-100 flex items-center gap-2 rounded-md mb-2",
        children: [
            VIEW_OPTIONS.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: ()=>onViewTypeChange(option.id),
                    className: `px-3 py-1 rounded text-sm ${viewType === option.id ? "bg-blue-500 text-white" : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"}`,
                    "aria-pressed": viewType === option.id,
                    children: option.label
                }, option.id, false, {
                    fileName: "[project]/src/components/gantt/GanttControls.tsx",
                    lineNumber: 33,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-6 w-px bg-gray-300 mx-2"
            }, void 0, false, {
                fileName: "[project]/src/components/gantt/GanttControls.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: onToggleBaselines,
                className: `px-3 py-1 rounded text-sm ${showBaselines ? "bg-gray-700 text-white" : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"}`,
                "aria-pressed": showBaselines,
                children: [
                    "계획 일정 ",
                    showBaselines ? "숨기기" : "표시"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/gantt/GanttControls.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1"
            }, void 0, false, {
                fileName: "[project]/src/components/gantt/GanttControls.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: onSave,
                disabled: !hasChanges || saveState === "saving",
                className: `px-4 py-1 rounded text-sm font-medium transition-colors ${!hasChanges || saveState === "saving" ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-green-600 text-white hover:bg-green-700"}`,
                title: `hasChanges: ${hasChanges}, saveState: ${saveState}`,
                children: saveState === "saving" ? "저장 중..." : "저장"
            }, void 0, false, {
                fileName: "[project]/src/components/gantt/GanttControls.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "ml-2 text-sm text-gray-600",
                role: "status",
                children: [
                    hasChanges && saveState === "idle" && "변경 사항이 있습니다.",
                    saveState === "saved" && "저장되었습니다.",
                    saveState === "error" && "저장 실패."
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/gantt/GanttControls.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/gantt/GanttControls.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
_c = GanttControls;
var _c;
__turbopack_context__.k.register(_c, "GanttControls");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/gantt/WillowTheme.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WillowTheme",
    ()=>WillowTheme
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$svar$2d$ui$2f$react$2d$gantt$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@svar-ui/react-gantt/dist/index.es.js [app-client] (ecmascript) <locals>");
"use client";
;
;
function WillowTheme({ children, fonts = true }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$svar$2d$ui$2f$react$2d$gantt$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Willow"], {
        fonts: fonts,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/gantt/WillowTheme.tsx",
        lineNumber: 7,
        columnNumber: 10
    }, this);
}
_c = WillowTheme;
var _c;
__turbopack_context__.k.register(_c, "WillowTheme");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/data/users.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "users",
    ()=>users
]);
const users = [
    {
        id: 1,
        label: "WJByun"
    },
    {
        id: 2,
        label: "CBLee"
    },
    {
        id: 3,
        label: "JMHong"
    },
    {
        id: 4,
        label: "SMShin"
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/gantt/taskConfig.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CELL_HEIGHT",
    ()=>CELL_HEIGHT,
    "CELL_WIDTH_MAP",
    ()=>CELL_WIDTH_MAP,
    "TASK_TYPES",
    ()=>TASK_TYPES
]);
const TASK_TYPES = [
    {
        id: "task",
        label: "일반작업 종속"
    },
    {
        id: "summary",
        label: "요약작업"
    },
    {
        id: "milestone",
        label: "마일스톤"
    },
    {
        id: "urgent",
        label: "일반작업 비종속"
    },
    {
        id: "narrow",
        label: "간접작업"
    },
    {
        id: "progress",
        label: "기타작업"
    },
    {
        id: "round",
        label: "간접작업 종속"
    }
];
const CELL_WIDTH_MAP = {
    day: 36,
    week: 120,
    month: 180
};
const CELL_HEIGHT = 36;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/gantt/editorItems.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "editorItems",
    ()=>editorItems
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$svar$2d$ui$2f$react$2d$core$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@svar-ui/react-core/dist/index.es.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$svar$2d$ui$2f$gantt$2d$store$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@svar-ui/gantt-store/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$svar$2d$ui$2f$react$2d$editor$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@svar-ui/react-editor/dist/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$users$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/users.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$gantt$2f$taskConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/gantt/taskConfig.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
;
const FIELD_OVERRIDES = {
    text: {
        label: "작업명",
        placeholder: "작업 이름을 입력하세요"
    },
    details: {
        label: "설명",
        placeholder: "세부 내용을 입력하세요"
    },
    type: {
        label: "작업 유형"
    },
    start: {
        label: "시작일"
    },
    end: {
        label: "종료일"
    },
    progress: {
        label: "진행율"
    },
    links: {
        label: "연결 관계"
    }
};
const AssignedCombo = ({ value, options, onChange })=>{
    const renderOption = ({ option })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: option?.label ?? ""
        }, void 0, false, {
            fileName: "[project]/src/components/gantt/editorItems.tsx",
            lineNumber: 26,
            columnNumber: 69
        }, ("TURBOPACK compile-time value", void 0));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$svar$2d$ui$2f$react$2d$core$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Combo"], {
        clear: true,
        options: options,
        value: value,
        onChange: onChange,
        placeholder: "담당자를 선택하세요",
        children: renderOption
    }, void 0, false, {
        fileName: "[project]/src/components/gantt/editorItems.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = AssignedCombo;
// Ensure this runs on client only, though nextjs client components will handle it
if ("TURBOPACK compile-time truthy", 1) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$svar$2d$ui$2f$react$2d$editor$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerEditorItem"])("radio", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$svar$2d$ui$2f$react$2d$core$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["RadioButtonGroup"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$svar$2d$ui$2f$react$2d$editor$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerEditorItem"])("assigned-combo", AssignedCombo);
}
const createEditorItems = ()=>{
    const baseItems = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$svar$2d$ui$2f$gantt$2d$store$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultEditorItems"].filter((item)=>item.key !== "duration").map((item)=>{
        const overrides = FIELD_OVERRIDES[item.key];
        const next = {
            ...item
        };
        // 각 필드에 고유 id 할당 (중복 id 방지)
        if (!next.id && item.key) {
            next.id = `editor-field-${item.key}`;
        }
        if (overrides?.label) {
            next.label = overrides.label;
        }
        if (overrides?.placeholder) {
            next.config = {
                ...next.config ?? {},
                placeholder: overrides.placeholder
            };
        }
        return next;
    });
    const typeIndex = baseItems.findIndex((item)=>item.key === "type");
    if (typeIndex !== -1) {
        baseItems.splice(typeIndex, 1, {
            key: "type",
            id: "task-type-field",
            comp: "radio",
            label: FIELD_OVERRIDES.type?.label ?? "작업 유형",
            options: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$gantt$2f$taskConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TASK_TYPES"].map(({ id, label })=>({
                    id,
                    label,
                    value: id
                })),
            config: {
                type: "inline"
            }
        }, {
            key: "assigned",
            id: "task-assigned-field",
            comp: "assigned-combo",
            label: "담당자",
            options: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$users$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["users"],
            config: {
                placeholder: "담당자를 선택하세요"
            }
        });
    }
    return baseItems;
};
const editorItems = createEditorItems();
var _c;
__turbopack_context__.k.register(_c, "AssignedCombo");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/gantt/TaskTooltip.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
const dateFormatter = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
});
const formatDate = (value)=>{
    const date = value instanceof Date ? value : new Date(value);
    return Number.isNaN(date.getTime()) ? "-" : dateFormatter.format(date);
};
const TaskTooltip = ({ data })=>{
    if (!data) {
        return null;
    }
    const isMilestone = data.type === "milestone";
    const progress = typeof data.progress === "number" && Number.isFinite(data.progress) ? `${Math.round(data.progress)}%` : null;
    const exclusiveEnd = data.end instanceof Date ? data.end : data.end ? new Date(data.end) : undefined;
    const startDate = data.start instanceof Date ? data.start : data.start ? new Date(data.start) : undefined;
    let inclusiveEnd;
    if (exclusiveEnd && !Number.isNaN(exclusiveEnd.getTime())) {
        inclusiveEnd = new Date(exclusiveEnd.getTime() - 24 * 60 * 60 * 1000);
        if (startDate && !Number.isNaN(startDate.getTime()) && inclusiveEnd < startDate) {
            inclusiveEnd = new Date(startDate);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "wx-task-tooltip",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "tooltip-header",
                children: String(data.text ?? "작업 상세")
            }, void 0, false, {
                fileName: "[project]/src/components/gantt/TaskTooltip.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "tooltip-row",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "tooltip-label",
                        children: "유형"
                    }, void 0, false, {
                        fileName: "[project]/src/components/gantt/TaskTooltip.tsx",
                        lineNumber: 47,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "tooltip-value",
                        children: String(data.type ?? "일반")
                    }, void 0, false, {
                        fileName: "[project]/src/components/gantt/TaskTooltip.tsx",
                        lineNumber: 48,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/gantt/TaskTooltip.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "tooltip-row",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "tooltip-label",
                        children: "기간"
                    }, void 0, false, {
                        fileName: "[project]/src/components/gantt/TaskTooltip.tsx",
                        lineNumber: 52,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "tooltip-value",
                        children: [
                            formatDate(data.start),
                            " ~ ",
                            isMilestone ? "" : formatDate(inclusiveEnd)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/gantt/TaskTooltip.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/gantt/TaskTooltip.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            progress && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "tooltip-row",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "tooltip-label",
                        children: "진행률"
                    }, void 0, false, {
                        fileName: "[project]/src/components/gantt/TaskTooltip.tsx",
                        lineNumber: 60,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "tooltip-value",
                        style: {
                            color: "var(--color-primary)"
                        },
                        children: progress
                    }, void 0, false, {
                        fileName: "[project]/src/components/gantt/TaskTooltip.tsx",
                        lineNumber: 61,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/gantt/TaskTooltip.tsx",
                lineNumber: 59,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            !!data.assigned && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "tooltip-row",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "tooltip-label",
                        children: "담당자"
                    }, void 0, false, {
                        fileName: "[project]/src/components/gantt/TaskTooltip.tsx",
                        lineNumber: 70,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "tooltip-value",
                        children: String(data.assigned)
                    }, void 0, false, {
                        fileName: "[project]/src/components/gantt/TaskTooltip.tsx",
                        lineNumber: 71,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/gantt/TaskTooltip.tsx",
                lineNumber: 69,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/gantt/TaskTooltip.tsx",
        lineNumber: 41,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = TaskTooltip;
const __TURBOPACK__default__export__ = TaskTooltip;
var _c;
__turbopack_context__.k.register(_c, "TaskTooltip");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/gantt/useGanttSchedule.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useGanttSchedule",
    ()=>useGanttSchedule
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const TYPE_COLORS = {
    urgent: {
        bar: "#f49a82",
        progress: "#f45e36"
    },
    narrow: {
        bar: "#676a81",
        progress: "#1a2630"
    },
    progress: {
        bar: "#00bcd4",
        progress: "#00bcd4"
    },
    round: {
        bar: "#10b981",
        progress: "#6ee7b7"
    }
};
const SYNC_EVENT_TAG = Symbol("gantt-sync-listener");
const UI_EVENT_TAG = Symbol("gantt-ui-handlers");
const SUMMARY_EVENT_TAG = Symbol("gantt-summary-progress");
const MS_PER_DAY = 24 * 60 * 60 * 1000;
const toIsoDate = (value)=>{
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
const normalizeNumber = (value)=>{
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
const toDateOrUndefined = (value)=>{
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
            if (Number.isInteger(year) && Number.isInteger(month) && Number.isInteger(day)) {
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
const calculateTaskDuration = (task)=>{
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
const decorateTask = (task)=>{
    const decorated = {
        ...task
    };
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
const serializeTask = (taskInput)=>{
    const serialized = {};
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
const serializeLink = (linkInput)=>{
    const serialized = {};
    if (linkInput.id !== undefined) serialized.id = linkInput.id;
    if (linkInput.source !== undefined) serialized.source = linkInput.source;
    if (linkInput.target !== undefined) serialized.target = linkInput.target;
    if (linkInput.type !== undefined) serialized.type = linkInput.type;
    return serialized;
};
const serializeSchedule = (tasks, links, scales)=>({
        tasks: tasks.map((task)=>serializeTask(task)),
        links: links.map((link)=>serializeLink(link)),
        scales: scales.map((scale)=>({
                unit: scale.unit,
                step: scale.step,
                format: scale.format
            }))
    });
const useGanttSchedule = ()=>{
    _s();
    const apiRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const currentTasksRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const currentLinksRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const scalesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const [schedule, setSchedule] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [saveState, setSaveState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("idle");
    const [hasChanges, setHasChanges] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const getSummaryProgress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useGanttSchedule.useCallback[getSummaryProgress]": (summaryId)=>{
            const api = apiRef.current;
            if (!api) {
                return 0;
            }
            const collect = {
                "useGanttSchedule.useCallback[getSummaryProgress].collect": (taskId)=>{
                    const task = api.getTask(taskId);
                    const children = task?.data;
                    if (!children || !children.length) {
                        return [
                            0,
                            0
                        ];
                    }
                    let totalProgress = 0;
                    let totalDuration = 0;
                    children.forEach({
                        "useGanttSchedule.useCallback[getSummaryProgress].collect": (child)=>{
                            const childTask = api.getTask(child.id);
                            if (!childTask) {
                                return;
                            }
                            if (childTask.type !== "milestone" && childTask.type !== "summary") {
                                const duration = calculateTaskDuration(childTask);
                                if (duration > 0) {
                                    const progressValue = typeof childTask.progress === "number" ? childTask.progress : Number(childTask.progress ?? 0);
                                    const boundedProgress = Number.isFinite(progressValue) ? Math.max(0, Math.min(100, progressValue)) : 0;
                                    totalDuration += duration;
                                    totalProgress += duration * boundedProgress;
                                }
                            }
                            const [childProgress, childDuration] = collect(childTask.id);
                            totalProgress += childProgress;
                            totalDuration += childDuration;
                        }
                    }["useGanttSchedule.useCallback[getSummaryProgress].collect"]);
                    return [
                        totalProgress,
                        totalDuration
                    ];
                }
            }["useGanttSchedule.useCallback[getSummaryProgress].collect"];
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
        }
    }["useGanttSchedule.useCallback[getSummaryProgress]"], []);
    const recalcSummaryProgress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useGanttSchedule.useCallback[recalcSummaryProgress]": (taskId, treatAsSummary = false)=>{
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
            const tasksStore = state?.tasks;
            const summaryId = treatAsSummary && task.type === "summary" ? taskId : tasksStore?.getSummaryId?.(taskId);
            if (!summaryId) {
                return;
            }
            const summaryTask = api.getTask(summaryId);
            if (!summaryTask) {
                return;
            }
            const nextProgress = getSummaryProgress(summaryId);
            const currentProgress = typeof summaryTask.progress === "number" ? summaryTask.progress : Number(summaryTask.progress ?? 0);
            if (!Number.isFinite(nextProgress) || nextProgress === currentProgress) {
                return;
            }
            api.exec("update-task", {
                id: summaryId,
                task: {
                    progress: nextProgress
                }
            });
        }
    }["useGanttSchedule.useCallback[recalcSummaryProgress]"], [
        getSummaryProgress
    ]);
    const recalcAllSummaryTasks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useGanttSchedule.useCallback[recalcAllSummaryTasks]": ()=>{
            const api = apiRef.current;
            if (!api) {
                return;
            }
            try {
                const state = api.getState?.();
                const tasksStore = state?.tasks;
                tasksStore?.forEach?.({
                    "useGanttSchedule.useCallback[recalcAllSummaryTasks]": (task)=>{
                        if (task.type === "summary") {
                            recalcSummaryProgress(task.id, true);
                        }
                    }
                }["useGanttSchedule.useCallback[recalcAllSummaryTasks]"]);
            } catch (error) {
                console.warn("Failed to recalculate summary progress:", error);
            }
        }
    }["useGanttSchedule.useCallback[recalcAllSummaryTasks]"], [
        recalcSummaryProgress
    ]);
    const markAsChanged = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useGanttSchedule.useCallback[markAsChanged]": ()=>{
            setHasChanges(true);
            setSaveState({
                "useGanttSchedule.useCallback[markAsChanged]": (prev)=>prev === "saved" ? "idle" : prev
            }["useGanttSchedule.useCallback[markAsChanged]"]);
        }
    }["useGanttSchedule.useCallback[markAsChanged]"], []);
    const syncFromApi = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useGanttSchedule.useCallback[syncFromApi]": ()=>{
            const api = apiRef.current;
            if (!api) {
                return;
            }
            let rawTasks = [];
            try {
                rawTasks = typeof api.serialize === "function" ? api.serialize() ?? [] : [];
            } catch (error) {
                console.warn("Failed to serialize tasks from API:", error);
            }
            const decoratedTasks = rawTasks.map({
                "useGanttSchedule.useCallback[syncFromApi].decoratedTasks": (task)=>decorateTask(task)
            }["useGanttSchedule.useCallback[syncFromApi].decoratedTasks"]);
            let links = currentLinksRef.current;
            try {
                const stores = typeof api.getStores === "function" ? api.getStores() : null;
                const dataStore = stores?.data;
                const state = dataStore?.getState ? dataStore.getState() : null;
                if (state?.links) {
                    links = state.links.map({
                        "useGanttSchedule.useCallback[syncFromApi]": (link)=>({
                                ...link
                            })
                    }["useGanttSchedule.useCallback[syncFromApi]"]);
                }
            } catch (error) {
                console.warn("Failed to extract links from API:", error);
            }
            currentTasksRef.current = decoratedTasks;
            currentLinksRef.current = links;
            setSchedule({
                "useGanttSchedule.useCallback[syncFromApi]": (prev)=>prev ? {
                        ...prev,
                        tasks: decoratedTasks,
                        links
                    } : prev
            }["useGanttSchedule.useCallback[syncFromApi]"]);
        }
    }["useGanttSchedule.useCallback[syncFromApi]"], []);
    const attachDataListeners = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useGanttSchedule.useCallback[attachDataListeners]": (api)=>{
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
                "delete-link"
            ];
            events.forEach({
                "useGanttSchedule.useCallback[attachDataListeners]": (eventName)=>{
                    api.on(eventName, {
                        "useGanttSchedule.useCallback[attachDataListeners]": (event)=>{
                            // Progress 드래그 중인 임시 업데이트 무시 (화면 흔들림 방지)
                            if (event?.inProgress) {
                                return;
                            }
                            syncFromApi();
                            markAsChanged();
                        }
                    }["useGanttSchedule.useCallback[attachDataListeners]"], {
                        tag: SYNC_EVENT_TAG
                    });
                }
            }["useGanttSchedule.useCallback[attachDataListeners]"]);
        }
    }["useGanttSchedule.useCallback[attachDataListeners]"], [
        markAsChanged,
        syncFromApi
    ]);
    const initGantt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useGanttSchedule.useCallback[initGantt]": (api)=>{
            apiRef.current = api;
            attachDataListeners(api);
            api.detach(SUMMARY_EVENT_TAG);
            const registerSummaryHandler = {
                "useGanttSchedule.useCallback[initGantt].registerSummaryHandler": (action, handler)=>{
                    api.on(action, handler, {
                        tag: SUMMARY_EVENT_TAG
                    });
                }
            }["useGanttSchedule.useCallback[initGantt].registerSummaryHandler"];
            registerSummaryHandler("add-task", {
                "useGanttSchedule.useCallback[initGantt]": ({ id })=>{
                    recalcSummaryProgress(id);
                }
            }["useGanttSchedule.useCallback[initGantt]"]);
            registerSummaryHandler("update-task", {
                "useGanttSchedule.useCallback[initGantt]": (event)=>{
                    if (event?.inProgress) {
                        return;
                    }
                    recalcSummaryProgress(event.id);
                }
            }["useGanttSchedule.useCallback[initGantt]"]);
            registerSummaryHandler("copy-task", {
                "useGanttSchedule.useCallback[initGantt]": ({ id })=>{
                    recalcSummaryProgress(id);
                }
            }["useGanttSchedule.useCallback[initGantt]"]);
            registerSummaryHandler("delete-task", {
                "useGanttSchedule.useCallback[initGantt]": ({ source })=>{
                    if (source !== undefined && source !== null) {
                        recalcSummaryProgress(source, true);
                    }
                }
            }["useGanttSchedule.useCallback[initGantt]"]);
            registerSummaryHandler("move-task", {
                "useGanttSchedule.useCallback[initGantt]": (event)=>{
                    if (event?.inProgress) {
                        return;
                    }
                    recalcSummaryProgress(event.id);
                    if (event?.source !== undefined && event?.source !== null) {
                        recalcSummaryProgress(event.source, true);
                    }
                }
            }["useGanttSchedule.useCallback[initGantt]"]);
            api.detach(UI_EVENT_TAG);
            api.on("add-task", {
                "useGanttSchedule.useCallback[initGantt]": ({ id })=>{
                    api.exec("show-editor", {
                        id
                    });
                }
            }["useGanttSchedule.useCallback[initGantt]"], {
                tag: UI_EVENT_TAG
            });
            recalcAllSummaryTasks();
            syncFromApi();
        }
    }["useGanttSchedule.useCallback[initGantt]"], [
        attachDataListeners,
        recalcAllSummaryTasks,
        recalcSummaryProgress,
        syncFromApi
    ]);
    const handleSave = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useGanttSchedule.useCallback[handleSave]": async ()=>{
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
                        linksToSave = state.links.map({
                            "useGanttSchedule.useCallback[handleSave]": (link)=>({
                                    ...link
                                })
                        }["useGanttSchedule.useCallback[handleSave]"]);
                        currentLinksRef.current = linksToSave;
                    }
                } catch (error) {
                    console.warn("Falling back to cached links while saving:", error);
                }
                const payload = serializeSchedule(tasksToSave, linksToSave, schedule?.scales ?? scalesRef.current);
                // API call to Next.js route
                await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post("/api/mock", payload, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                setSaveState("saved");
                setHasChanges(false);
                window.setTimeout({
                    "useGanttSchedule.useCallback[handleSave]": ()=>{
                        setSaveState("idle");
                    }
                }["useGanttSchedule.useCallback[handleSave]"], 1500);
            } catch (error) {
                console.error("Save error:", error);
                setSaveState("error");
                alert("저장 중 오류가 발생했습니다: " + error.message);
            }
        }
    }["useGanttSchedule.useCallback[handleSave]"], [
        schedule?.scales,
        syncFromApi
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useGanttSchedule.useEffect": ()=>{
            let isMounted = true;
            const loadData = {
                "useGanttSchedule.useEffect.loadData": async ()=>{
                    setIsLoading(true);
                    try {
                        // API call to Next.js route
                        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get("/api/mock");
                        const data = response.data;
                        if (!isMounted) {
                            return;
                        }
                        const tasks = (data.tasks ?? []).map({
                            "useGanttSchedule.useEffect.loadData.tasks": (task)=>decorateTask(task)
                        }["useGanttSchedule.useEffect.loadData.tasks"]);
                        const links = (data.links ?? []).map({
                            "useGanttSchedule.useEffect.loadData.links": (link)=>({
                                    ...link
                                })
                        }["useGanttSchedule.useEffect.loadData.links"]);
                        const scales = (data.scales ?? []).map({
                            "useGanttSchedule.useEffect.loadData.scales": (scale)=>({
                                    ...scale
                                })
                        }["useGanttSchedule.useEffect.loadData.scales"]);
                        scalesRef.current = scales;
                        currentTasksRef.current = tasks;
                        currentLinksRef.current = links;
                        setSchedule({
                            tasks,
                            links,
                            scales
                        });
                        setHasChanges(false);
                        setSaveState("idle");
                    } catch (error) {
                        console.error("Error loading data:", error);
                        if (isMounted) {
                            setSchedule(null);
                        }
                    } finally{
                        if (isMounted) {
                            setIsLoading(false);
                        }
                    }
                }
            }["useGanttSchedule.useEffect.loadData"];
            void loadData();
            return ({
                "useGanttSchedule.useEffect": ()=>{
                    isMounted = false;
                    const api = apiRef.current;
                    if (api) {
                        api.detach(SYNC_EVENT_TAG);
                        api.detach(UI_EVENT_TAG);
                        api.detach(SUMMARY_EVENT_TAG);
                    }
                }
            })["useGanttSchedule.useEffect"];
        }
    }["useGanttSchedule.useEffect"], []);
    return {
        schedule,
        isLoading,
        saveState,
        hasChanges,
        handleSave,
        initGantt
    };
};
_s(useGanttSchedule, "94UmyY5ojOA8cgTeSWbO9IlRulU=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/data/koreanHolidays.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * 한국 공휴일 데이터 (2024-2026)
 * 음력 공휴일은 양력 날짜로 변환하여 포함
 */ __turbopack_context__.s([
    "getHolidayName",
    ()=>getHolidayName,
    "isDayOff",
    ()=>isDayOff,
    "isKoreanHoliday",
    ()=>isKoreanHoliday,
    "isWeekend",
    ()=>isWeekend,
    "koreanHolidays2025",
    ()=>koreanHolidays2025,
    "koreanHolidays2026",
    ()=>koreanHolidays2026
]);
const koreanHolidays2025 = [
    {
        date: '2025-01-01',
        name: '신정'
    },
    {
        date: '2025-01-28',
        name: '설날 연휴'
    },
    {
        date: '2025-01-29',
        name: '설날'
    },
    {
        date: '2025-01-30',
        name: '설날 연휴'
    },
    {
        date: '2025-03-01',
        name: '삼일절'
    },
    {
        date: '2025-03-03',
        name: '대체공휴일(삼일절)'
    },
    {
        date: '2025-05-05',
        name: '어린이날'
    },
    {
        date: '2025-05-06',
        name: '부처님오신날'
    },
    {
        date: '2025-06-06',
        name: '현충일'
    },
    {
        date: '2025-08-15',
        name: '광복절'
    },
    {
        date: '2025-10-05',
        name: '추석 연휴'
    },
    {
        date: '2025-10-06',
        name: '추석'
    },
    {
        date: '2025-10-07',
        name: '추석 연휴'
    },
    {
        date: '2025-10-08',
        name: '대체공휴일(추석)'
    },
    {
        date: '2025-10-03',
        name: '개천절'
    },
    {
        date: '2025-10-09',
        name: '한글날'
    },
    {
        date: '2025-12-25',
        name: '크리스마스'
    }
];
const koreanHolidays2026 = [
    {
        date: '2026-01-01',
        name: '신정'
    },
    {
        date: '2026-02-16',
        name: '설날 연휴'
    },
    {
        date: '2026-02-17',
        name: '설날'
    },
    {
        date: '2026-02-18',
        name: '설날 연휴'
    },
    {
        date: '2026-03-01',
        name: '삼일절'
    },
    {
        date: '2026-05-05',
        name: '어린이날'
    },
    {
        date: '2026-05-25',
        name: '부처님오신날'
    },
    {
        date: '2026-06-06',
        name: '현충일'
    },
    {
        date: '2026-08-15',
        name: '광복절'
    },
    {
        date: '2026-09-24',
        name: '추석 연휴'
    },
    {
        date: '2026-09-25',
        name: '추석'
    },
    {
        date: '2026-09-26',
        name: '추석 연휴'
    },
    {
        date: '2026-10-03',
        name: '개천절'
    },
    {
        date: '2026-10-09',
        name: '한글날'
    },
    {
        date: '2026-12-25',
        name: '크리스마스'
    }
];
// 모든 공휴일을 날짜 문자열 Set으로 변환 (빠른 조회를 위해)
const allHolidaysSet = new Set([
    ...koreanHolidays2025.map((h)=>h.date),
    ...koreanHolidays2026.map((h)=>h.date)
]);
function isWeekend(date) {
    const day = date.getDay();
    return day === 0 || day === 6; // 0 = 일요일, 6 = 토요일
}
function isKoreanHoliday(date) {
    const dateStr = date.toISOString().split('T')[0];
    return allHolidaysSet.has(dateStr);
}
function isDayOff(date) {
    return isWeekend(date) || isKoreanHoliday(date);
}
function getHolidayName(date) {
    const dateStr = date.toISOString().split('T')[0];
    const allHolidays = [
        ...koreanHolidays2025,
        ...koreanHolidays2026
    ];
    const holiday = allHolidays.find((h)=>h.date === dateStr);
    return holiday ? holiday.name : null;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/GanttChart.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GanttChart",
    ()=>GanttChart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$svar$2d$ui$2f$react$2d$gantt$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@svar-ui/react-gantt/dist/index.es.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$svar$2d$ui$2f$gantt$2d$store$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@svar-ui/gantt-store/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$gantt$2f$GanttControls$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/gantt/GanttControls.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$gantt$2f$WillowTheme$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/gantt/WillowTheme.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$gantt$2f$editorItems$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/gantt/editorItems.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$gantt$2f$TaskTooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/gantt/TaskTooltip.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$gantt$2f$taskConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/gantt/taskConfig.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$gantt$2f$useGanttSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/gantt/useGanttSchedule.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$koreanHolidays$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/koreanHolidays.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
const START_COLUMN_WIDTH = 100;
const TIME_SCALE_CONFIGS = {
    day: {
        scales: [
            {
                unit: "year",
                step: 1,
                format: "yyyy년"
            },
            {
                unit: "month",
                step: 1,
                format: "M월"
            },
            {
                unit: "day",
                step: 1,
                format: "d"
            }
        ]
    },
    week: {
        scales: [
            {
                unit: "year",
                step: 1,
                format: "yyyy년"
            },
            {
                unit: "month",
                step: 1,
                format: "M월"
            },
            {
                unit: "week",
                step: 1,
                format: "w주"
            }
        ]
    },
    month: {
        scales: [
            {
                unit: "year",
                step: 1,
                format: "yyyy년"
            },
            {
                unit: "month",
                step: 1,
                format: "M월"
            }
        ]
    }
};
const dateFormatter = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
});
const formatDisplayEnd = (task)=>{
    const exclusiveEnd = task.end instanceof Date ? task.end : task.end ? new Date(task.end) : undefined;
    if (!exclusiveEnd) {
        return "";
    }
    const inclusive = new Date(exclusiveEnd);
    inclusive.setDate(inclusive.getDate() - 1);
    const start = task.start instanceof Date ? task.start : task.start ? new Date(task.start) : undefined;
    if (start && inclusive < start) {
        return dateFormatter.format(start);
    }
    return dateFormatter.format(inclusive);
};
function GanttChart() {
    _s();
    const [viewType, setViewType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("day");
    const [showBaselines, setShowBaselines] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [ganttApi, setGanttApi] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const { schedule, isLoading, saveState, hasChanges, handleSave, initGantt } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$gantt$2f$useGanttSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGanttSchedule"])();
    const columns = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "GanttChart.useMemo[columns]": ()=>{
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$svar$2d$ui$2f$gantt$2d$store$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultColumns"].map({
                "GanttChart.useMemo[columns]": (column)=>{
                    if (column.id === "text") {
                        return {
                            ...column,
                            header: "단위공정"
                        };
                    }
                    if (column.id === "start") {
                        return {
                            ...column,
                            header: "시작",
                            width: START_COLUMN_WIDTH,
                            format: "yyyy-MM-dd"
                        };
                    }
                    if (column.id === "end") {
                        return {
                            ...column,
                            header: "종료",
                            width: START_COLUMN_WIDTH,
                            format: "yyyy-MM-dd",
                            template: ({
                                "GanttChart.useMemo[columns]": (_, task)=>formatDisplayEnd(task)
                            })["GanttChart.useMemo[columns]"]
                        };
                    }
                    if (column.id === "duration") {
                        return {
                            ...column,
                            header: "D",
                            width: Math.round(START_COLUMN_WIDTH * 0.45)
                        };
                    }
                    return column;
                }
            }["GanttChart.useMemo[columns]"]);
        }
    }["GanttChart.useMemo[columns]"], []);
    const scales = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "GanttChart.useMemo[scales]": ()=>TIME_SCALE_CONFIGS[viewType].scales
    }["GanttChart.useMemo[scales]"], [
        viewType
    ]);
    const handleInit = (api)=>{
        initGantt(api);
        setGanttApi(api);
    };
    // Toolbar 버튼 설정 - 한글화 및 아이콘 커스터마이징
    const toolbarItems = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "GanttChart.useMemo[toolbarItems]": ()=>{
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$svar$2d$ui$2f$gantt$2d$store$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultToolbarButtons"].map({
                "GanttChart.useMemo[toolbarItems]": (button)=>{
                    if (button.id === "add-task") {
                        return {
                            ...button,
                            text: "새 작업",
                            icon: button.icon
                        }; // icon 속성으로 아이콘 지정
                    }
                    if (button.id === "edit-task") {
                        return {
                            ...button,
                            Text: "편집",
                            icon: button.icon || "wxi-edit"
                        }; // 아이콘 변경 가능
                    }
                    if (button.id === "delete-task") {
                        return {
                            ...button,
                            menuText: "삭제",
                            icon: button.icon || "wxi-delete"
                        };
                    }
                    if (button.id === "move-task:up") {
                        return {
                            ...button,
                            menuText: "위로 이동",
                            icon: button.icon || "wxi-angle-up"
                        };
                    }
                    if (button.id === "move-task:down") {
                        return {
                            ...button,
                            menuText: "아래로 이동",
                            icon: button.icon || "wxi-angle-down"
                        };
                    }
                    if (button.id === "copy-task") {
                        return {
                            ...button,
                            menuText: "복사",
                            icon: button.icon || "wxi-content-copy"
                        };
                    }
                    if (button.id === "cut-task") {
                        return {
                            ...button,
                            menuText: "잘라내기",
                            icon: button.icon || "wxi-content-cut"
                        };
                    }
                    if (button.id === "paste-task") {
                        return {
                            ...button,
                            menuText: "붙여넣기",
                            icon: button.icon || "wxi-content-paste"
                        };
                    }
                    if (button.id === "indent-task:add") {
                        return {
                            ...button,
                            menuText: "들여쓰기",
                            icon: button.icon || "wxi-indent"
                        };
                    }
                    if (button.id === "indent-task:remove") {
                        return {
                            ...button,
                            menuText: "내어쓰기",
                            icon: button.icon || "wxi-unindent"
                        };
                    }
                    return button; // 기본 아이콘 유지
                }
            }["GanttChart.useMemo[toolbarItems]"]);
        }
    }["GanttChart.useMemo[toolbarItems]"], []);
    // Editor topBar 설정 - 아이콘 커스터마이징
    const editorTopBar = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "GanttChart.useMemo[editorTopBar]": ()=>{
            return {
                items: [
                    {
                        comp: "button",
                        text: "닫기",
                        id: "close"
                    },
                    {
                        comp: "spacer",
                        icon: "",
                        id: "spacer"
                    },
                    {
                        comp: "button",
                        type: "danger",
                        text: "삭제",
                        id: "delete"
                    },
                    {
                        comp: "button",
                        type: "primary",
                        text: "저장",
                        id: "save"
                    }
                ]
            };
        }
    }["GanttChart.useMemo[editorTopBar]"], []);
    // 주말 및 공휴일 하이라이트 함수
    const highlightTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GanttChart.useCallback[highlightTime]": (date, unit)=>{
            // day 단위일 때만 주말/공휴일 표시
            if (unit === "day") {
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$koreanHolidays$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isKoreanHoliday"])(date)) {
                    return "wx-holiday"; // 공휴일 스타일
                }
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$koreanHolidays$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isWeekend"])(date)) {
                    return "wx-weekend"; // 주말 스타일
                }
            }
            return "";
        }
    }["GanttChart.useCallback[highlightTime]"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "flex flex-col h-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$gantt$2f$GanttControls$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GanttControls"], {
                viewType: viewType,
                onViewTypeChange: setViewType,
                showBaselines: showBaselines,
                onToggleBaselines: ()=>setShowBaselines((prev)=>!prev),
                onSave: ()=>{
                    void handleSave();
                },
                hasChanges: hasChanges,
                saveState: saveState
            }, void 0, false, {
                fileName: "[project]/src/components/GanttChart.tsx",
                lineNumber: 214,
                columnNumber: 7
            }, this),
            ganttApi && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$svar$2d$ui$2f$react$2d$gantt$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Toolbar"], {
                api: ganttApi,
                items: toolbarItems
            }, void 0, false, {
                fileName: "[project]/src/components/GanttChart.tsx",
                lineNumber: 224,
                columnNumber: 20
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "gantt-wrapper flex-1 relative",
                role: "group",
                "aria-label": "프로젝트 간트 차트",
                children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50",
                    children: "데이터를 불러오는 중..."
                }, void 0, false, {
                    fileName: "[project]/src/components/GanttChart.tsx",
                    lineNumber: 228,
                    columnNumber: 11
                }, this) : schedule ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$svar$2d$ui$2f$react$2d$gantt$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ContextMenu"], {
                            api: ganttApi,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$gantt$2f$WillowTheme$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WillowTheme"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$svar$2d$ui$2f$react$2d$gantt$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Tooltip"], {
                                    api: ganttApi ?? undefined,
                                    content: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$gantt$2f$TaskTooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$svar$2d$ui$2f$react$2d$gantt$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Gantt"], {
                                        init: handleInit,
                                        tasks: schedule.tasks,
                                        links: schedule.links,
                                        scales: scales,
                                        columns: columns,
                                        taskTypes: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$gantt$2f$taskConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TASK_TYPES"],
                                        cellWidth: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$gantt$2f$taskConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CELL_WIDTH_MAP"][viewType],
                                        cellHeight: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$gantt$2f$taskConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CELL_HEIGHT"],
                                        highlightTime: highlightTime,
                                        ...{
                                            baselines: showBaselines
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/GanttChart.tsx",
                                        lineNumber: 236,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/GanttChart.tsx",
                                    lineNumber: 235,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/GanttChart.tsx",
                                lineNumber: 234,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/GanttChart.tsx",
                            lineNumber: 233,
                            columnNumber: 13
                        }, this),
                        ganttApi && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$svar$2d$ui$2f$react$2d$gantt$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Editor"], {
                            api: ganttApi,
                            items: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$gantt$2f$editorItems$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["editorItems"],
                            topBar: editorTopBar
                        }, void 0, false, {
                            fileName: "[project]/src/components/GanttChart.tsx",
                            lineNumber: 252,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-4 text-red-500",
                    children: "데이터를 불러오지 못했습니다."
                }, void 0, false, {
                    fileName: "[project]/src/components/GanttChart.tsx",
                    lineNumber: 260,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/GanttChart.tsx",
                lineNumber: 226,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/GanttChart.tsx",
        lineNumber: 213,
        columnNumber: 5
    }, this);
}
_s(GanttChart, "wG0ApltLBR7WsVp+0K6wdAX9LXw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$gantt$2f$useGanttSchedule$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGanttSchedule"]
    ];
});
_c = GanttChart;
var _c;
__turbopack_context__.k.register(_c, "GanttChart");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/GanttChart.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/GanttChart.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=src_d0b20460._.js.map