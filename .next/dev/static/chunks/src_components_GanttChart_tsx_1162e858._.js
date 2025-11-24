(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/GanttChart.tsx [app-client] (ecmascript, next/dynamic entry, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "static/chunks/node_modules_f290b506._.js",
  "static/chunks/src_3ab2dfc5._.js",
  {
    "path": "static/chunks/src_styles_29d9cdd5._.css",
    "included": [
      "[project]/src/styles/svar-gantt-fixed.css [app-client] (css)",
      "[project]/src/styles/gantt.css [app-client] (css)"
    ],
    "moduleChunks": [
      "static/chunks/src_styles_svar-gantt-fixed_css_bad6b30c._.single.css",
      "static/chunks/src_styles_gantt_css_bad6b30c._.single.css"
    ]
  },
  "static/chunks/src_components_GanttChart_tsx_60f51d65._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/src/components/GanttChart.tsx [app-client] (ecmascript, next/dynamic entry)");
    });
});
}),
]);