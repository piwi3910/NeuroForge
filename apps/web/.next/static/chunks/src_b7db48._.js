(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/src_b7db48._.js", {

"[project]/apps/web/src/components/Editor.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "Editor": (()=>Editor)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.3_react-dom@19.0.0-rc-66855b96-20241106_react@19.0.0-rc-66855b96-20241106__react@19.0.0-rc-66855b96-20241106/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$monaco$2d$editor$2b$react$40$4$2e$6$2e$0_monaco$2d$editor$40$0$2e$52$2e$0_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$1_guiy4vtqs625fltcxkz2xwyr4q$2f$node_modules$2f40$monaco$2d$editor$2f$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/@monaco-editor+react@4.6.0_monaco-editor@0.52.0_react-dom@19.0.0-rc-66855b96-20241106_react@1_guiy4vtqs625fltcxkz2xwyr4q/node_modules/@monaco-editor/react/dist/index.mjs [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.3_react-dom@19.0.0-rc-66855b96-20241106_react@19.0.0-rc-66855b96-20241106__react@19.0.0-rc-66855b96-20241106/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$monaco$2d$editor$2b$react$40$4$2e$6$2e$0_monaco$2d$editor$40$0$2e$52$2e$0_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$1_guiy4vtqs625fltcxkz2xwyr4q$2f$node_modules$2f40$monaco$2d$editor$2f$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/@monaco-editor+react@4.6.0_monaco-editor@0.52.0_react-dom@19.0.0-rc-66855b96-20241106_react@1_guiy4vtqs625fltcxkz2xwyr4q/node_modules/@monaco-editor/react/dist/index.mjs [app-client] (ecmascript) <locals>");
;
var _s = __turbopack_refresh__.signature();
"use client";
;
;
function Editor() {
    _s();
    const editorRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const handleEditorDidMount = (editor)=>{
        editorRef.current = editor;
        // Focus the editor
        editor.focus();
        // Add some sample code
        editor.setValue(`// Welcome to NeuroForge IDE
import React from 'react';

function App() {
  const [count, setCount] = React.useState(0);

  return (
    <div className="app">
      <h1>Welcome to NeuroForge</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

export default App;`);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-full w-full",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$monaco$2d$editor$2b$react$40$4$2e$6$2e$0_monaco$2d$editor$40$0$2e$52$2e$0_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$1_guiy4vtqs625fltcxkz2xwyr4q$2f$node_modules$2f40$monaco$2d$editor$2f$react$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Editor"], {
            height: "100%",
            defaultLanguage: "typescript",
            theme: "vs-dark",
            options: {
                fontFamily: "'Fira Code', 'Consolas', monospace",
                fontSize: 14,
                lineHeight: 21,
                minimap: {
                    enabled: true,
                    scale: 2,
                    showSlider: "mouseover"
                },
                scrollBeyondLastLine: false,
                smoothScrolling: true,
                cursorBlinking: "smooth",
                formatOnPaste: true,
                formatOnType: true,
                autoClosingBrackets: "always",
                autoClosingQuotes: "always",
                autoIndent: "full",
                renderWhitespace: "selection",
                wordWrap: "on",
                wrappingIndent: "indent",
                guides: {
                    bracketPairs: true,
                    indentation: true
                },
                folding: true,
                showFoldingControls: "always",
                automaticLayout: true,
                tabSize: 2,
                insertSpaces: true,
                colorDecorators: true,
                renderLineHighlight: "all",
                matchBrackets: "always",
                selectionHighlight: true,
                quickSuggestions: {
                    other: true,
                    comments: true,
                    strings: true
                },
                suggest: {
                    showKeywords: true,
                    showSnippets: true,
                    showClasses: true,
                    showFunctions: true,
                    showConstants: true,
                    showProperties: true,
                    showConstructors: true,
                    showModules: true,
                    showOperators: true,
                    showUnits: true,
                    showValues: true,
                    showWords: true,
                    showColors: true,
                    showFiles: true,
                    showReferences: true,
                    showFolders: true,
                    showTypeParameters: true,
                    showIssues: true
                }
            },
            onMount: handleEditorDidMount
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/Editor.tsx",
            lineNumber: 39,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/Editor.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
_s(Editor, "U23Mj2fZUVBkuOSyNtK9IkK2H0s=");
_c = Editor;
var _c;
__turbopack_refresh__.register(_c, "Editor");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/apps/web/src/components/ContextMenu.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "ContextMenu": (()=>ContextMenu)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.3_react-dom@19.0.0-rc-66855b96-20241106_react@19.0.0-rc-66855b96-20241106__react@19.0.0-rc-66855b96-20241106/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.3_react-dom@19.0.0-rc-66855b96-20241106_react@19.0.0-rc-66855b96-20241106__react@19.0.0-rc-66855b96-20241106/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
"use client";
;
function ContextMenu({ x, y, items, onClose }) {
    _s();
    const menuRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ContextMenu.useEffect": ()=>{
            const handleClickOutside = {
                "ContextMenu.useEffect.handleClickOutside": (event)=>{
                    if (menuRef.current && !menuRef.current.contains(event.target)) {
                        onClose();
                    }
                }
            }["ContextMenu.useEffect.handleClickOutside"];
            document.addEventListener('mousedown', handleClickOutside);
            return ({
                "ContextMenu.useEffect": ()=>document.removeEventListener('mousedown', handleClickOutside)
            })["ContextMenu.useEffect"];
        }
    }["ContextMenu.useEffect"], [
        onClose
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: menuRef,
        className: "fixed bg-[#2d2d2d] border border-[#404040] rounded shadow-lg py-1 z-50",
        style: {
            left: x,
            top: y,
            minWidth: '160px'
        },
        children: items.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-4 py-1.5 hover:bg-[#404040] cursor-pointer text-sm flex items-center gap-2",
                        onClick: ()=>{
                            item.onClick();
                            onClose();
                        },
                        children: [
                            item.icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "w-4",
                                children: item.icon
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/ContextMenu.tsx",
                                lineNumber: 52,
                                columnNumber: 27
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: item.label
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/ContextMenu.tsx",
                                lineNumber: 53,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/ContextMenu.tsx",
                        lineNumber: 45,
                        columnNumber: 11
                    }, this),
                    item.divider && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "my-1 border-t border-[#404040]"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/ContextMenu.tsx",
                        lineNumber: 55,
                        columnNumber: 28
                    }, this)
                ]
            }, index, true, {
                fileName: "[project]/apps/web/src/components/ContextMenu.tsx",
                lineNumber: 44,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/ContextMenu.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, this);
}
_s(ContextMenu, "lbfKxozlpk19p2tUpYavRIkbEU0=");
_c = ContextMenu;
var _c;
__turbopack_refresh__.register(_c, "ContextMenu");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/apps/web/src/components/Dialog.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "Dialog": (()=>Dialog)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.3_react-dom@19.0.0-rc-66855b96-20241106_react@19.0.0-rc-66855b96-20241106__react@19.0.0-rc-66855b96-20241106/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.3_react-dom@19.0.0-rc-66855b96-20241106_react@19.0.0-rc-66855b96-20241106__react@19.0.0-rc-66855b96-20241106/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
"use client";
;
function Dialog({ title, message, defaultValue = '', onConfirm, onCancel }) {
    _s();
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Dialog.useEffect": ()=>{
            inputRef.current?.focus();
        }
    }["Dialog.useEffect"], []);
    const handleSubmit = (e)=>{
        e.preventDefault();
        if (inputRef.current?.value) {
            onConfirm(inputRef.current.value);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-[#2d2d2d] rounded-lg shadow-lg w-96",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-4 border-b border-[#404040]",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-lg font-medium text-white",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/Dialog.tsx",
                        lineNumber: 31,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/Dialog.tsx",
                    lineNumber: 30,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleSubmit,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-4 space-y-4",
                            children: [
                                message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-gray-300",
                                    children: message
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/Dialog.tsx",
                                    lineNumber: 35,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    ref: inputRef,
                                    type: "text",
                                    defaultValue: defaultValue,
                                    className: "w-full bg-[#1e1e1e] text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500",
                                    spellCheck: false
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/Dialog.tsx",
                                    lineNumber: 36,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/Dialog.tsx",
                            lineNumber: 34,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-4 border-t border-[#404040] flex justify-end space-x-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: onCancel,
                                    className: "px-4 py-2 text-sm text-gray-300 hover:text-white",
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/Dialog.tsx",
                                    lineNumber: 45,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    className: "px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700",
                                    children: "Confirm"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/Dialog.tsx",
                                    lineNumber: 52,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/Dialog.tsx",
                            lineNumber: 44,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/components/Dialog.tsx",
                    lineNumber: 33,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/components/Dialog.tsx",
            lineNumber: 29,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/Dialog.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
_s(Dialog, "cBQ6FQ+sf5H+lvNONLKqtm4aeQ8=");
_c = Dialog;
var _c;
__turbopack_refresh__.register(_c, "Dialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/apps/web/src/components/FileExplorer.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "FileExplorer": (()=>FileExplorer)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.3_react-dom@19.0.0-rc-66855b96-20241106_react@19.0.0-rc-66855b96-20241106__react@19.0.0-rc-66855b96-20241106/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.3_react-dom@19.0.0-rc-66855b96-20241106_react@19.0.0-rc-66855b96-20241106__react@19.0.0-rc-66855b96-20241106/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ContextMenu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/apps/web/src/components/ContextMenu.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/apps/web/src/components/Dialog.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
"use client";
;
;
;
function FileExplorer() {
    _s();
    var _s1 = __turbopack_refresh__.signature();
    const [files, setFiles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        {
            name: 'src',
            type: 'folder',
            expanded: true,
            children: [
                {
                    name: 'components',
                    type: 'folder',
                    expanded: true,
                    children: [
                        {
                            name: 'Editor.tsx',
                            type: 'file'
                        },
                        {
                            name: 'FileExplorer.tsx',
                            type: 'file'
                        },
                        {
                            name: 'Terminal.tsx',
                            type: 'file'
                        },
                        {
                            name: 'AiChat.tsx',
                            type: 'file'
                        },
                        {
                            name: 'Layout.tsx',
                            type: 'file'
                        }
                    ]
                },
                {
                    name: 'app',
                    type: 'folder',
                    expanded: true,
                    children: [
                        {
                            name: 'page.tsx',
                            type: 'file'
                        },
                        {
                            name: 'layout.tsx',
                            type: 'file'
                        },
                        {
                            name: 'globals.css',
                            type: 'file'
                        }
                    ]
                }
            ]
        },
        {
            name: 'package.json',
            type: 'file'
        },
        {
            name: 'tsconfig.json',
            type: 'file'
        }
    ]);
    const [contextMenu, setContextMenu] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        show: false,
        x: 0,
        y: 0,
        type: null
    });
    const [dialog, setDialog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        show: false,
        type: null
    });
    const handleContextMenu = (e, type, path)=>{
        e.preventDefault();
        setContextMenu({
            show: true,
            x: e.clientX,
            y: e.clientY,
            type,
            targetPath: path
        });
    };
    const createItem = (name, path, type)=>{
        const newNode = {
            name,
            type,
            children: type === 'folder' ? [] : undefined
        };
        const updateFilesRecursively = (nodes, targetPath)=>{
            if (targetPath.length === 0) {
                return [
                    ...nodes,
                    newNode
                ];
            }
            return nodes.map((node)=>{
                if (node.name === targetPath[0] && node.type === 'folder') {
                    return {
                        ...node,
                        children: updateFilesRecursively(node.children || [], targetPath.slice(1))
                    };
                }
                return node;
            });
        };
        const targetPath = path ? path.split('/') : [];
        const updatedFiles = updateFilesRecursively(files, targetPath);
        setFiles(updatedFiles);
    };
    const deleteItem = (path)=>{
        const updateFilesRecursively = (nodes, targetPath)=>{
            if (targetPath.length === 1) {
                return nodes.filter((node)=>node.name !== targetPath[0]);
            }
            return nodes.map((node)=>{
                if (node.name === targetPath[0] && node.type === 'folder') {
                    return {
                        ...node,
                        children: updateFilesRecursively(node.children || [], targetPath.slice(1))
                    };
                }
                return node;
            });
        };
        const targetPath = path.split('/');
        const updatedFiles = updateFilesRecursively(files, targetPath);
        setFiles(updatedFiles);
    };
    const renameItem = (path, newName)=>{
        const updateFilesRecursively = (nodes, targetPath)=>{
            if (targetPath.length === 1) {
                return nodes.map((node)=>node.name === targetPath[0] ? {
                        ...node,
                        name: newName
                    } : node);
            }
            return nodes.map((node)=>{
                if (node.name === targetPath[0] && node.type === 'folder') {
                    return {
                        ...node,
                        children: updateFilesRecursively(node.children || [], targetPath.slice(1))
                    };
                }
                return node;
            });
        };
        const targetPath = path.split('/');
        const updatedFiles = updateFilesRecursively(files, targetPath);
        setFiles(updatedFiles);
    };
    const getContextMenuItems = ()=>{
        const baseItems = [
            {
                label: 'New File',
                icon: '📄',
                onClick: ()=>setDialog({
                        show: true,
                        type: 'new-file',
                        path: contextMenu.targetPath
                    })
            },
            {
                label: 'New Folder',
                icon: '📁',
                onClick: ()=>setDialog({
                        show: true,
                        type: 'new-folder',
                        path: contextMenu.targetPath
                    })
            }
        ];
        if (contextMenu.type === 'file' || contextMenu.type === 'folder') {
            return [
                ...baseItems,
                {
                    label: 'Rename',
                    icon: '✏️',
                    onClick: ()=>setDialog({
                            show: true,
                            type: 'rename',
                            path: contextMenu.targetPath,
                            defaultValue: contextMenu.targetPath?.split('/').pop() || ''
                        }),
                    divider: true
                },
                {
                    label: 'Delete',
                    icon: '🗑️',
                    onClick: ()=>contextMenu.targetPath && deleteItem(contextMenu.targetPath)
                }
            ];
        }
        return baseItems;
    };
    const handleDialogConfirm = (value)=>{
        switch(dialog.type){
            case 'new-file':
                createItem(value, dialog.path, 'file');
                break;
            case 'new-folder':
                createItem(value, dialog.path, 'folder');
                break;
            case 'rename':
                if (dialog.path) {
                    renameItem(dialog.path, value);
                }
                break;
        }
        setDialog({
            show: false,
            type: null
        });
    };
    function FileTreeNode({ node, depth = 0, path = '' }) {
        _s1();
        const [expanded, setExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(node.expanded || false);
        const currentPath = path ? `${path}/${node.name}` : node.name;
        const toggleExpand = (e)=>{
            e.stopPropagation();
            if (node.type === 'folder') {
                setExpanded(!expanded);
            }
        };
        const getFileIcon = (type, name)=>{
            if (type === 'folder') return expanded ? '📂' : '📁';
            const extension = name.split('.').pop()?.toLowerCase();
            switch(extension){
                case 'tsx':
                case 'ts':
                    return '📄';
                case 'css':
                    return '🎨';
                case 'json':
                    return '📋';
                default:
                    return '📄';
            }
        };
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center hover:bg-[#2d2d2d] cursor-pointer py-[2px] px-2",
                    style: {
                        paddingLeft: `${depth * 16}px`
                    },
                    onClick: toggleExpand,
                    onContextMenu: (e)=>handleContextMenu(e, node.type, currentPath),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "mr-2",
                            children: getFileIcon(node.type, node.name)
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/FileExplorer.tsx",
                            lineNumber: 265,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-sm select-none",
                            children: node.name
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/FileExplorer.tsx",
                            lineNumber: 266,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/components/FileExplorer.tsx",
                    lineNumber: 259,
                    columnNumber: 9
                }, this),
                expanded && node.children && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: node.children.map((child, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FileTreeNode, {
                            node: child,
                            depth: depth + 1,
                            path: currentPath
                        }, child.name + index, false, {
                            fileName: "[project]/apps/web/src/components/FileExplorer.tsx",
                            lineNumber: 271,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/FileExplorer.tsx",
                    lineNumber: 269,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/components/FileExplorer.tsx",
            lineNumber: 258,
            columnNumber: 7
        }, this);
    }
    _s1(FileTreeNode, "lQL2JxUgmrUVptFqs9JrD3SR6kg=");
    const getDialogTitle = ()=>{
        switch(dialog.type){
            case 'new-file':
                return 'New File';
            case 'new-folder':
                return 'New Folder';
            case 'rename':
                return 'Rename';
            default:
                return '';
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-full w-full text-white",
        onContextMenu: (e)=>handleContextMenu(e, 'background'),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-2 border-b border-[#2d2d2d]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-sm font-medium mb-1",
                        children: "EXPLORER"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/FileExplorer.tsx",
                        lineNumber: 303,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs text-gray-400",
                        children: "NeuroForge"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/FileExplorer.tsx",
                        lineNumber: 304,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/FileExplorer.tsx",
                lineNumber: 302,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-2",
                children: files.map((file, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FileTreeNode, {
                        node: file
                    }, file.name + index, false, {
                        fileName: "[project]/apps/web/src/components/FileExplorer.tsx",
                        lineNumber: 308,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/FileExplorer.tsx",
                lineNumber: 306,
                columnNumber: 7
            }, this),
            contextMenu.show && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ContextMenu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ContextMenu"], {
                x: contextMenu.x,
                y: contextMenu.y,
                items: getContextMenuItems(),
                onClose: ()=>setContextMenu({
                        ...contextMenu,
                        show: false
                    })
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/FileExplorer.tsx",
                lineNumber: 312,
                columnNumber: 9
            }, this),
            dialog.show && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
                title: getDialogTitle(),
                defaultValue: dialog.defaultValue,
                onConfirm: handleDialogConfirm,
                onCancel: ()=>setDialog({
                        show: false,
                        type: null
                    })
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/FileExplorer.tsx",
                lineNumber: 320,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/FileExplorer.tsx",
        lineNumber: 298,
        columnNumber: 5
    }, this);
}
_s(FileExplorer, "gw5ETIJc5Qi+R77W6Zv3/VOBB5g=");
_c = FileExplorer;
var _c;
__turbopack_refresh__.register(_c, "FileExplorer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/apps/web/src/components/Terminal.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "Terminal": (()=>Terminal)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.3_react-dom@19.0.0-rc-66855b96-20241106_react@19.0.0-rc-66855b96-20241106__react@19.0.0-rc-66855b96-20241106/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.3_react-dom@19.0.0-rc-66855b96-20241106_react@19.0.0-rc-66855b96-20241106__react@19.0.0-rc-66855b96-20241106/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
"use client";
;
const INITIAL_COMMANDS = [
    {
        input: "npm start",
        output: [
            "Ready - started server on 0.0.0.0:3000",
            "Event compiled successfully"
        ]
    }
];
const COMMAND_SUGGESTIONS = [
    'npm start',
    'npm install',
    'npm run build',
    'npm run dev',
    'git status',
    'git add .',
    'git commit -m',
    'git push',
    'git pull',
    'git branch',
    'git checkout',
    'clear'
];
function Terminal() {
    _s();
    const [commands, setCommands] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(INITIAL_COMMANDS);
    const [currentInput, setCurrentInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [commandHistory, setCommandHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [historyIndex, setHistoryIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(-1);
    const [suggestions, setSuggestions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedSuggestion, setSelectedSuggestion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(-1);
    const terminalRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const scrollToBottom = ()=>{
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Terminal.useEffect": ()=>{
            scrollToBottom();
        }
    }["Terminal.useEffect"], [
        commands
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Terminal.useEffect": ()=>{
            inputRef.current?.focus();
        }
    }["Terminal.useEffect"], []);
    const simulateCommand = (input)=>{
        if (input.startsWith('git status')) {
            return [
                'On branch main',
                'Your branch is up to date with \'origin/main\'',
                '',
                'Changes not staged for commit:',
                '  (use "git add <file>..." to update what will be committed)',
                '  (use "git restore <file>..." to discard changes in working directory)',
                '        modified:   src/components/Terminal.tsx',
                '',
                'no changes added to commit (use "git add" and/or "git commit -a")'
            ];
        }
        if (input.startsWith('git branch')) {
            return [
                '* main',
                '  feature/terminal',
                '  feature/file-explorer'
            ];
        }
        if (input.startsWith('npm install')) {
            return [
                'added 1247 packages in 2m',
                '',
                '150 packages are looking for funding',
                '  run `npm fund` for details'
            ];
        }
        if (input.startsWith('npm run build')) {
            return [
                '> neuroforge@0.1.0 build',
                '> next build',
                '',
                '   ▲ Next.js 13.4.19',
                '',
                ' ✓ Creating an optimized production build',
                ' ✓ Compiled successfully',
                ' ✓ Linting and checking validity of types',
                ' ✓ Collecting page data',
                ' ✓ Generating static pages',
                ' ✓ Collecting build traces',
                '',
                'Route (app)                              Size     First Load JS',
                '┌ ○ /                                    5.13 kB        88.9 kB',
                '└ ○ /favicon.ico                         0 B                0 B',
                '+ First Load JS shared by all            83.8 kB',
                '  ├ chunks/main-app.js                   83.8 kB',
                '  └ chunks/webpack.js                    816 B',
                '',
                '✓ Done in 12.34s'
            ];
        }
        return [
            `Command not found: ${input}`
        ];
    };
    const handleCommand = (input)=>{
        const trimmedInput = input.trim();
        if (!trimmedInput) return;
        const newCommand = {
            input: trimmedInput,
            output: [],
            error: false
        };
        if (trimmedInput === 'clear') {
            setCommands([]);
            setCurrentInput("");
            return;
        }
        newCommand.output = simulateCommand(trimmedInput);
        newCommand.error = newCommand.output[0].includes('Command not found');
        setCommands((prev)=>[
                ...prev,
                newCommand
            ]);
        setCommandHistory((prev)=>[
                ...prev,
                trimmedInput
            ]);
        setHistoryIndex(-1);
        setCurrentInput("");
        setSuggestions([]);
    };
    const handleKeyDown = (e)=>{
        if (e.key === 'Enter') {
            handleCommand(currentInput);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (suggestions.length > 0) {
                setSelectedSuggestion((prev)=>prev <= 0 ? suggestions.length - 1 : prev - 1);
            } else if (historyIndex < commandHistory.length - 1) {
                const newIndex = historyIndex + 1;
                setHistoryIndex(newIndex);
                setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (suggestions.length > 0) {
                setSelectedSuggestion((prev)=>prev >= suggestions.length - 1 ? -1 : prev + 1);
            } else if (historyIndex > 0) {
                const newIndex = historyIndex - 1;
                setHistoryIndex(newIndex);
                setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
            } else if (historyIndex === 0) {
                setHistoryIndex(-1);
                setCurrentInput('');
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            if (selectedSuggestion !== -1) {
                setCurrentInput(suggestions[selectedSuggestion]);
                setSuggestions([]);
                setSelectedSuggestion(-1);
            } else if (suggestions.length === 1) {
                setCurrentInput(suggestions[0]);
                setSuggestions([]);
            }
        }
    };
    const handleInputChange = (e)=>{
        const value = e.target.value;
        setCurrentInput(value);
        // Show suggestions
        if (value) {
            const matches = COMMAND_SUGGESTIONS.filter((cmd)=>cmd.toLowerCase().startsWith(value.toLowerCase()));
            setSuggestions(matches);
            setSelectedSuggestion(-1);
        } else {
            setSuggestions([]);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-full w-full font-mono text-sm flex flex-col",
        onClick: ()=>inputRef.current?.focus(),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-2 border-b border-[#2d2d2d] text-xs",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-gray-400",
                    children: "TERMINAL"
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/Terminal.tsx",
                    lineNumber: 210,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/Terminal.tsx",
                lineNumber: 209,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: terminalRef,
                className: "flex-1 overflow-auto p-2 space-y-1",
                children: [
                    commands.map((command, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-green-500",
                                            children: "➜"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/Terminal.tsx",
                                            lineNumber: 219,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-blue-400 ml-2",
                                            children: "~"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/Terminal.tsx",
                                            lineNumber: 220,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "ml-2",
                                            children: command.input
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/Terminal.tsx",
                                            lineNumber: 221,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/src/components/Terminal.tsx",
                                    lineNumber: 218,
                                    columnNumber: 13
                                }, this),
                                command.output.map((line, j)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: command.error ? 'text-red-400' : 'text-gray-300',
                                        children: line
                                    }, j, false, {
                                        fileName: "[project]/apps/web/src/components/Terminal.tsx",
                                        lineNumber: 224,
                                        columnNumber: 15
                                    }, this))
                            ]
                        }, i, true, {
                            fileName: "[project]/apps/web/src/components/Terminal.tsx",
                            lineNumber: 217,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-green-500",
                                children: "➜"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/Terminal.tsx",
                                lineNumber: 234,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-blue-400 ml-2",
                                children: "~"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/Terminal.tsx",
                                lineNumber: 235,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                ref: inputRef,
                                type: "text",
                                value: currentInput,
                                onChange: handleInputChange,
                                onKeyDown: handleKeyDown,
                                className: "flex-1 ml-2 bg-transparent outline-none",
                                spellCheck: false
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/Terminal.tsx",
                                lineNumber: 236,
                                columnNumber: 11
                            }, this),
                            suggestions.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute left-0 bottom-full mb-1 bg-[#2d2d2d] border border-[#404040] rounded overflow-hidden",
                                children: suggestions.map((suggestion, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `px-3 py-1 hover:bg-[#404040] cursor-pointer ${index === selectedSuggestion ? 'bg-[#404040]' : ''}`,
                                        onClick: ()=>{
                                            setCurrentInput(suggestion);
                                            setSuggestions([]);
                                        },
                                        children: suggestion
                                    }, suggestion, false, {
                                        fileName: "[project]/apps/web/src/components/Terminal.tsx",
                                        lineNumber: 248,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/Terminal.tsx",
                                lineNumber: 246,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/Terminal.tsx",
                        lineNumber: 233,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/Terminal.tsx",
                lineNumber: 212,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/Terminal.tsx",
        lineNumber: 205,
        columnNumber: 5
    }, this);
}
_s(Terminal, "fIbvmYs5DKQgWB6YTCCd6CURQ1I=");
_c = Terminal;
var _c;
__turbopack_refresh__.register(_c, "Terminal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/apps/web/src/components/Markdown.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "Markdown": (()=>Markdown)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.3_react-dom@19.0.0-rc-66855b96-20241106_react@19.0.0-rc-66855b96-20241106__react@19.0.0-rc-66855b96-20241106/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$syntax$2d$highlighter$40$15$2e$6$2e$1_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$react$2d$syntax$2d$highlighter$2f$dist$2f$esm$2f$styles$2f$prism$2f$vsc$2d$dark$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__vscDarkPlus$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/react-syntax-highlighter@15.6.1_react@19.0.0-rc-66855b96-20241106/node_modules/react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus.js [app-client] (ecmascript) <export default as vscDarkPlus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$syntax$2d$highlighter$40$15$2e$6$2e$1_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$react$2d$syntax$2d$highlighter$2f$dist$2f$esm$2f$prism$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Prism$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/react-syntax-highlighter@15.6.1_react@19.0.0-rc-66855b96-20241106/node_modules/react-syntax-highlighter/dist/esm/prism.js [app-client] (ecmascript) <export default as Prism>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$markdown$40$9$2e$0$2e$1_$40$types$2b$react$40$18$2e$3$2e$13_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$react$2d$markdown$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Markdown__as__default$3e$__ = __turbopack_import__("[project]/node_modules/.pnpm/react-markdown@9.0.1_@types+react@18.3.13_react@19.0.0-rc-66855b96-20241106/node_modules/react-markdown/lib/index.js [app-client] (ecmascript) <export Markdown as default>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$remark$2d$gfm$40$4$2e$0$2e$0$2f$node_modules$2f$remark$2d$gfm$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/remark-gfm@4.0.0/node_modules/remark-gfm/lib/index.js [app-client] (ecmascript)");
"use client";
;
;
;
;
;
const style = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$syntax$2d$highlighter$40$15$2e$6$2e$1_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$react$2d$syntax$2d$highlighter$2f$dist$2f$esm$2f$styles$2f$prism$2f$vsc$2d$dark$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__vscDarkPlus$3e$__["vscDarkPlus"];
function Markdown({ content }) {
    const components = {
        code ({ inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$syntax$2d$highlighter$40$15$2e$6$2e$1_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$react$2d$syntax$2d$highlighter$2f$dist$2f$esm$2f$prism$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Prism$3e$__["Prism"], {
                ...props,
                style: style,
                language: match[1],
                PreTag: "div",
                children: String(children).replace(/\n$/, '')
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/Markdown.tsx",
                lineNumber: 38,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                className: `${className} bg-[#2d2d2d] px-1 py-0.5 rounded`,
                ...props,
                children: children
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/Markdown.tsx",
                lineNumber: 47,
                columnNumber: 9
            }, this);
        },
        p ({ children, ...props }) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mb-4 last:mb-0",
                ...props,
                children: children
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/Markdown.tsx",
                lineNumber: 53,
                columnNumber: 14
            }, this);
        },
        h1 ({ children, ...props }) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-xl font-bold mb-4",
                ...props,
                children: children
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/Markdown.tsx",
                lineNumber: 56,
                columnNumber: 14
            }, this);
        },
        h2 ({ children, ...props }) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-lg font-bold mb-3",
                ...props,
                children: children
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/Markdown.tsx",
                lineNumber: 59,
                columnNumber: 14
            }, this);
        },
        h3 ({ children, ...props }) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-base font-bold mb-2",
                ...props,
                children: children
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/Markdown.tsx",
                lineNumber: 62,
                columnNumber: 14
            }, this);
        },
        ul ({ children, ...props }) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "list-disc pl-6 mb-4 space-y-1",
                ...props,
                children: children
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/Markdown.tsx",
                lineNumber: 65,
                columnNumber: 14
            }, this);
        },
        ol ({ children, ...props }) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                className: "list-decimal pl-6 mb-4 space-y-1",
                ...props,
                children: children
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/Markdown.tsx",
                lineNumber: 68,
                columnNumber: 14
            }, this);
        },
        li ({ children, ...props }) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                className: "mb-1",
                ...props,
                children: children
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/Markdown.tsx",
                lineNumber: 71,
                columnNumber: 14
            }, this);
        },
        blockquote ({ children, ...props }) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("blockquote", {
                className: "border-l-4 border-gray-600 pl-4 italic mb-4",
                ...props,
                children: children
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/Markdown.tsx",
                lineNumber: 75,
                columnNumber: 9
            }, this);
        },
        a ({ children, href, ...props }) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                href: href,
                className: "text-blue-400 hover:underline",
                target: "_blank",
                rel: "noopener noreferrer",
                ...props,
                children: children
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/Markdown.tsx",
                lineNumber: 82,
                columnNumber: 9
            }, this);
        },
        table ({ children, ...props }) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "overflow-auto mb-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    className: "min-w-full border-collapse",
                    ...props,
                    children: children
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/Markdown.tsx",
                    lineNumber: 96,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/Markdown.tsx",
                lineNumber: 95,
                columnNumber: 9
            }, this);
        },
        thead ({ children, ...props }) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                className: "bg-[#2d2d2d]",
                ...props,
                children: children
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/Markdown.tsx",
                lineNumber: 104,
                columnNumber: 9
            }, this);
        },
        tbody ({ children, ...props }) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                className: "divide-y divide-[#2d2d2d]",
                ...props,
                children: children
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/Markdown.tsx",
                lineNumber: 111,
                columnNumber: 9
            }, this);
        },
        tr ({ children, ...props }) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                className: "hover:bg-[#2d2d2d]",
                ...props,
                children: children
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/Markdown.tsx",
                lineNumber: 118,
                columnNumber: 9
            }, this);
        },
        th ({ children, ...props }) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                className: "px-4 py-2 text-left font-medium",
                ...props,
                children: children
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/Markdown.tsx",
                lineNumber: 125,
                columnNumber: 9
            }, this);
        },
        td ({ children, ...props }) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-4 py-2",
                ...props,
                children: children
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/Markdown.tsx",
                lineNumber: 132,
                columnNumber: 9
            }, this);
        },
        hr (props) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("hr", {
                className: "border-t border-[#2d2d2d] my-4",
                ...props
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/Markdown.tsx",
                lineNumber: 138,
                columnNumber: 14
            }, this);
        },
        img (props) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                ...props,
                className: "max-w-full h-auto rounded my-4"
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/Markdown.tsx",
                lineNumber: 142,
                columnNumber: 9
            }, this);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$markdown$40$9$2e$0$2e$1_$40$types$2b$react$40$18$2e$3$2e$13_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$react$2d$markdown$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Markdown__as__default$3e$__["default"], {
        remarkPlugins: [
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$remark$2d$gfm$40$4$2e$0$2e$0$2f$node_modules$2f$remark$2d$gfm$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
        ],
        components: components,
        children: content
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/Markdown.tsx",
        lineNumber: 151,
        columnNumber: 5
    }, this);
}
_c = Markdown;
var _c;
__turbopack_refresh__.register(_c, "Markdown");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/apps/web/src/components/AiChat.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "AiChat": (()=>AiChat)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.3_react-dom@19.0.0-rc-66855b96-20241106_react@19.0.0-rc-66855b96-20241106__react@19.0.0-rc-66855b96-20241106/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.3_react-dom@19.0.0-rc-66855b96-20241106_react@19.0.0-rc-66855b96-20241106__react@19.0.0-rc-66855b96-20241106/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Markdown$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/apps/web/src/components/Markdown.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
"use client";
;
;
function AiChat() {
    _s();
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        {
            role: 'assistant',
            content: `Hello! I'm your AI programming assistant. I can help you with:

- Writing and explaining code
- Debugging problems
- Answering programming questions
- Generating documentation

Try asking me something! I support markdown and code blocks, for example:

\`\`\`typescript
function greet(name: string) {
  return \`Hello, \${name}!\`;
}
\`\`\``,
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isTyping, setIsTyping] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const messagesEndRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const textareaRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const scrollToBottom = ()=>{
        messagesEndRef.current?.scrollIntoView({
            behavior: 'smooth'
        });
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AiChat.useEffect": ()=>{
            scrollToBottom();
        }
    }["AiChat.useEffect"], [
        messages
    ]);
    // Auto-resize textarea as content grows
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AiChat.useEffect": ()=>{
            const textarea = textareaRef.current;
            if (textarea) {
                textarea.style.height = 'auto';
                textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
            }
        }
    }["AiChat.useEffect"], [
        input
    ]);
    const simulateAIResponse = (userMessage)=>{
        setIsTyping(true);
        setTimeout(()=>{
            let response;
            if (userMessage.toLowerCase().includes('example')) {
                response = `Here's an example React component:

\`\`\`tsx
import { useState } from 'react';

interface CounterProps {
  initialCount?: number;
}

export function Counter({ initialCount = 0 }: CounterProps) {
  const [count, setCount] = useState(initialCount);
  
  return (
    <div className="p-4 border rounded">
      <p>Count: {count}</p>
      <button 
        onClick={() => setCount(count + 1)}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Increment
      </button>
    </div>
  );
}
\`\`\`

You can use this component like this:

\`\`\`tsx
<Counter initialCount={5} />
\`\`\``;
            } else if (userMessage.toLowerCase().includes('help')) {
                response = `I can help you with various programming tasks:

1. **Code Generation**
   - React components
   - TypeScript interfaces
   - API endpoints

2. **Debugging**
   - Error analysis
   - Performance optimization
   - Code review

3. **Best Practices**
   - Code organization
   - Design patterns
   - Testing strategies

What would you like to know more about?`;
            } else {
                response = "I understand you're asking about programming. Could you provide more specific details about what you'd like help with?";
            }
            setMessages((prev)=>[
                    ...prev,
                    {
                        role: 'assistant',
                        content: response,
                        timestamp: new Date()
                    }
                ]);
            setIsTyping(false);
        }, 1000);
    };
    const handleSubmit = (e)=>{
        e.preventDefault();
        if (!input.trim() || isTyping) return;
        const userMessage = {
            role: 'user',
            content: input.trim(),
            timestamp: new Date()
        };
        setMessages((prev)=>[
                ...prev,
                userMessage
            ]);
        setInput('');
        simulateAIResponse(userMessage.content);
    };
    const handleKeyDown = (e)=>{
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };
    const formatTime = (date)=>{
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-full w-full flex flex-col",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-2 border-b border-[#2d2d2d]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-sm font-medium mb-1",
                        children: "AI ASSISTANT"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/AiChat.tsx",
                        lineNumber: 158,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs text-gray-400",
                        children: "NeuroForge AI"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/AiChat.tsx",
                        lineNumber: 159,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/AiChat.tsx",
                lineNumber: 157,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-auto p-4 space-y-4",
                children: [
                    messages.map((message, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `max-w-[80%] rounded-lg p-3 ${message.role === 'user' ? 'bg-blue-600 text-white' : 'bg-[#2d2d2d] text-gray-100'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-gray-400 mb-1",
                                        children: [
                                            message.role === 'assistant' ? 'Assistant' : 'You',
                                            " • ",
                                            formatTime(message.timestamp)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/src/components/AiChat.tsx",
                                        lineNumber: 175,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm prose prose-invert max-w-none",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Markdown$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Markdown"], {
                                            content: message.content
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/AiChat.tsx",
                                            lineNumber: 179,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/AiChat.tsx",
                                        lineNumber: 178,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/components/AiChat.tsx",
                                lineNumber: 168,
                                columnNumber: 13
                            }, this)
                        }, index, false, {
                            fileName: "[project]/apps/web/src/components/AiChat.tsx",
                            lineNumber: 164,
                            columnNumber: 11
                        }, this)),
                    isTyping && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-start",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-[#2d2d2d] rounded-lg p-3 max-w-[80%]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-xs text-gray-400 mb-1",
                                    children: "Assistant is typing..."
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/AiChat.tsx",
                                    lineNumber: 187,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex space-x-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/AiChat.tsx",
                                            lineNumber: 189,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-2 h-2 bg-gray-400 rounded-full animate-bounce",
                                            style: {
                                                animationDelay: '0.2s'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/AiChat.tsx",
                                            lineNumber: 190,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-2 h-2 bg-gray-400 rounded-full animate-bounce",
                                            style: {
                                                animationDelay: '0.4s'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/AiChat.tsx",
                                            lineNumber: 191,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/src/components/AiChat.tsx",
                                    lineNumber: 188,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/AiChat.tsx",
                            lineNumber: 186,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/AiChat.tsx",
                        lineNumber: 185,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: messagesEndRef
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/AiChat.tsx",
                        lineNumber: 196,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/AiChat.tsx",
                lineNumber: 162,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleSubmit,
                className: "border-t border-[#2d2d2d] p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                ref: textareaRef,
                                value: input,
                                onChange: (e)=>setInput(e.target.value),
                                onKeyDown: handleKeyDown,
                                placeholder: "Ask me anything...",
                                className: "flex-1 bg-[#2d2d2d] rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none min-h-[40px]",
                                disabled: isTyping
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/AiChat.tsx",
                                lineNumber: 201,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                disabled: !input.trim() || isTyping,
                                className: "bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
                                children: "Send"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/AiChat.tsx",
                                lineNumber: 210,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/AiChat.tsx",
                        lineNumber: 200,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 text-xs text-gray-400",
                        children: "Press Shift + Enter for new line"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/AiChat.tsx",
                        lineNumber: 218,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/AiChat.tsx",
                lineNumber: 199,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/AiChat.tsx",
        lineNumber: 156,
        columnNumber: 5
    }, this);
}
_s(AiChat, "Dv8oJzWfF4ypotrdRbmtIJueI84=");
_c = AiChat;
var _c;
__turbopack_refresh__.register(_c, "AiChat");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/apps/web/src/components/GitPanel.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "GitPanel": (()=>GitPanel)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.3_react-dom@19.0.0-rc-66855b96-20241106_react@19.0.0-rc-66855b96-20241106__react@19.0.0-rc-66855b96-20241106/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function GitPanel() {
    // Mock data for demonstration
    const currentBranch = "main";
    const commits = [
        {
            hash: "a1b2c3d",
            message: "Add AI chat functionality",
            author: "Dev",
            date: new Date(2024, 0, 15, 14, 30),
            branch: "main"
        },
        {
            hash: "e4f5g6h",
            message: "Update editor settings",
            author: "Dev",
            date: new Date(2024, 0, 15, 14, 0),
            branch: "main"
        },
        {
            hash: "i7j8k9l",
            message: "Initial commit",
            author: "Dev",
            date: new Date(2024, 0, 15, 13, 30),
            branch: "main"
        }
    ];
    const formatDate = (date)=>{
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-full w-full text-white",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-2 border-b border-[#2d2d2d]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-sm font-medium mb-1",
                        children: "SOURCE CONTROL"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/GitPanel.tsx",
                        lineNumber: 48,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs text-gray-400 flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-4 h-4",
                                viewBox: "0 0 16 16",
                                fill: "currentColor",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M5 2v1h6V2H5zm0 11h6v-1H5v1zM2 7.5l1.5-1.5L5 7.5 3.5 9 2 7.5zm12 0L12.5 9 11 7.5l1.5-1.5L14 7.5z"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/GitPanel.tsx",
                                        lineNumber: 51,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M7.5 8a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/GitPanel.tsx",
                                        lineNumber: 52,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/components/GitPanel.tsx",
                                lineNumber: 50,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: currentBranch
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/GitPanel.tsx",
                                lineNumber: 54,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/GitPanel.tsx",
                        lineNumber: 49,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/GitPanel.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4",
                    children: commits.map((commit, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative",
                            children: [
                                index < commits.length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute left-[7px] top-[24px] w-[2px] h-[calc(100%+8px)] bg-blue-500"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/GitPanel.tsx",
                                    lineNumber: 63,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-start gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-4 h-4 rounded-full bg-blue-500 mt-1 relative z-10"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/GitPanel.tsx",
                                            lineNumber: 68,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm font-medium truncate",
                                                    children: commit.message
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/src/components/GitPanel.tsx",
                                                    lineNumber: 72,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs text-gray-400 flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: commit.hash.substring(0, 7)
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/src/components/GitPanel.tsx",
                                                            lineNumber: 74,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "•"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/src/components/GitPanel.tsx",
                                                            lineNumber: 75,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: formatDate(commit.date)
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/src/components/GitPanel.tsx",
                                                            lineNumber: 76,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/web/src/components/GitPanel.tsx",
                                                    lineNumber: 73,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/src/components/GitPanel.tsx",
                                            lineNumber: 71,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/src/components/GitPanel.tsx",
                                    lineNumber: 66,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, commit.hash, true, {
                            fileName: "[project]/apps/web/src/components/GitPanel.tsx",
                            lineNumber: 60,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/GitPanel.tsx",
                    lineNumber: 58,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/GitPanel.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/GitPanel.tsx",
        lineNumber: 46,
        columnNumber: 5
    }, this);
}
_c = GitPanel;
var _c;
__turbopack_refresh__.register(_c, "GitPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/apps/web/src/components/Layout.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "Layout": (()=>Layout)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/next@15.0.3_react-dom@19.0.0-rc-66855b96-20241106_react@19.0.0-rc-66855b96-20241106__react@19.0.0-rc-66855b96-20241106/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$resizable$2d$panels$40$2$2e$1$2e$7_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$2_7g6zwbnkatvqexydrnsvauwn2y$2f$node_modules$2f$react$2d$resizable$2d$panels$2f$dist$2f$react$2d$resizable$2d$panels$2e$browser$2e$development$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/.pnpm/react-resizable-panels@2.1.7_react-dom@19.0.0-rc-66855b96-20241106_react@19.0.0-rc-66855b96-2_7g6zwbnkatvqexydrnsvauwn2y/node_modules/react-resizable-panels/dist/react-resizable-panels.browser.development.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Editor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/apps/web/src/components/Editor.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$FileExplorer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/apps/web/src/components/FileExplorer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Terminal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/apps/web/src/components/Terminal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$AiChat$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/apps/web/src/components/AiChat.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$GitPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/apps/web/src/components/GitPanel.tsx [app-client] (ecmascript)");
"use client";
;
;
;
;
;
;
;
function ResizeHandle({ className = "", orientation = "vertical" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$resizable$2d$panels$40$2$2e$1$2e$7_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$2_7g6zwbnkatvqexydrnsvauwn2y$2f$node_modules$2f$react$2d$resizable$2d$panels$2f$dist$2f$react$2d$resizable$2d$panels$2e$browser$2e$development$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PanelResizeHandle"], {
        className: `${orientation === "vertical" ? "w-[6px]" : "h-[6px]"} bg-[#2d2d2d] hover:bg-blue-600 transition-colors ${className}`
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/Layout.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
_c = ResizeHandle;
function Layout() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-screen w-screen bg-[#1e1e1e] text-white",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$resizable$2d$panels$40$2$2e$1$2e$7_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$2_7g6zwbnkatvqexydrnsvauwn2y$2f$node_modules$2f$react$2d$resizable$2d$panels$2f$dist$2f$react$2d$resizable$2d$panels$2e$browser$2e$development$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PanelGroup"], {
            direction: "horizontal",
            className: "h-full",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$resizable$2d$panels$40$2$2e$1$2e$7_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$2_7g6zwbnkatvqexydrnsvauwn2y$2f$node_modules$2f$react$2d$resizable$2d$panels$2f$dist$2f$react$2d$resizable$2d$panels$2e$browser$2e$development$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Panel"], {
                    defaultSize: 20,
                    minSize: 10,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$resizable$2d$panels$40$2$2e$1$2e$7_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$2_7g6zwbnkatvqexydrnsvauwn2y$2f$node_modules$2f$react$2d$resizable$2d$panels$2f$dist$2f$react$2d$resizable$2d$panels$2e$browser$2e$development$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PanelGroup"], {
                        direction: "vertical",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$resizable$2d$panels$40$2$2e$1$2e$7_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$2_7g6zwbnkatvqexydrnsvauwn2y$2f$node_modules$2f$react$2d$resizable$2d$panels$2f$dist$2f$react$2d$resizable$2d$panels$2e$browser$2e$development$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Panel"], {
                                defaultSize: 70,
                                minSize: 30,
                                className: "bg-[#252526]",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$FileExplorer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FileExplorer"], {}, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/Layout.tsx",
                                    lineNumber: 27,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/Layout.tsx",
                                lineNumber: 26,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ResizeHandle, {
                                orientation: "horizontal"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/Layout.tsx",
                                lineNumber: 30,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$resizable$2d$panels$40$2$2e$1$2e$7_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$2_7g6zwbnkatvqexydrnsvauwn2y$2f$node_modules$2f$react$2d$resizable$2d$panels$2f$dist$2f$react$2d$resizable$2d$panels$2e$browser$2e$development$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Panel"], {
                                defaultSize: 30,
                                minSize: 10,
                                className: "bg-[#252526]",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$GitPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GitPanel"], {}, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/Layout.tsx",
                                    lineNumber: 34,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/Layout.tsx",
                                lineNumber: 33,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/Layout.tsx",
                        lineNumber: 24,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/Layout.tsx",
                    lineNumber: 23,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ResizeHandle, {}, void 0, false, {
                    fileName: "[project]/apps/web/src/components/Layout.tsx",
                    lineNumber: 39,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$resizable$2d$panels$40$2$2e$1$2e$7_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$2_7g6zwbnkatvqexydrnsvauwn2y$2f$node_modules$2f$react$2d$resizable$2d$panels$2f$dist$2f$react$2d$resizable$2d$panels$2e$browser$2e$development$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Panel"], {
                    defaultSize: 60,
                    minSize: 30,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$resizable$2d$panels$40$2$2e$1$2e$7_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$2_7g6zwbnkatvqexydrnsvauwn2y$2f$node_modules$2f$react$2d$resizable$2d$panels$2f$dist$2f$react$2d$resizable$2d$panels$2e$browser$2e$development$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PanelGroup"], {
                        direction: "vertical",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$resizable$2d$panels$40$2$2e$1$2e$7_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$2_7g6zwbnkatvqexydrnsvauwn2y$2f$node_modules$2f$react$2d$resizable$2d$panels$2f$dist$2f$react$2d$resizable$2d$panels$2e$browser$2e$development$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Panel"], {
                                defaultSize: 70,
                                minSize: 30,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Editor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Editor"], {}, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/Layout.tsx",
                                    lineNumber: 46,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/Layout.tsx",
                                lineNumber: 45,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ResizeHandle, {
                                orientation: "horizontal"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/Layout.tsx",
                                lineNumber: 49,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$resizable$2d$panels$40$2$2e$1$2e$7_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$2_7g6zwbnkatvqexydrnsvauwn2y$2f$node_modules$2f$react$2d$resizable$2d$panels$2f$dist$2f$react$2d$resizable$2d$panels$2e$browser$2e$development$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Panel"], {
                                defaultSize: 30,
                                minSize: 10,
                                className: "bg-[#252526]",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$Terminal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Terminal"], {}, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/Layout.tsx",
                                    lineNumber: 53,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/Layout.tsx",
                                lineNumber: 52,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/Layout.tsx",
                        lineNumber: 43,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/Layout.tsx",
                    lineNumber: 42,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ResizeHandle, {}, void 0, false, {
                    fileName: "[project]/apps/web/src/components/Layout.tsx",
                    lineNumber: 58,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$resizable$2d$panels$40$2$2e$1$2e$7_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$2_7g6zwbnkatvqexydrnsvauwn2y$2f$node_modules$2f$react$2d$resizable$2d$panels$2f$dist$2f$react$2d$resizable$2d$panels$2e$browser$2e$development$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Panel"], {
                    defaultSize: 20,
                    minSize: 10,
                    className: "bg-[#252526]",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$0$2e$3_react$2d$dom$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106_$5f$react$40$19$2e$0$2e$0$2d$rc$2d$66855b96$2d$20241106$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$AiChat$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AiChat"], {}, void 0, false, {
                        fileName: "[project]/apps/web/src/components/Layout.tsx",
                        lineNumber: 62,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/Layout.tsx",
                    lineNumber: 61,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/components/Layout.tsx",
            lineNumber: 21,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/Layout.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_c1 = Layout;
var _c, _c1;
__turbopack_refresh__.register(_c, "ResizeHandle");
__turbopack_refresh__.register(_c1, "Layout");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/apps/web/src/app/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: require } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=src_b7db48._.js.map