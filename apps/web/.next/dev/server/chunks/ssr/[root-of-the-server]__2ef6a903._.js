module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/apps/web/src/app/integrations/plaid/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PlaidSandboxPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.2_f33b48a70247a9dd1be9ff747c251290/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.2_f33b48a70247a9dd1be9ff747c251290/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$plaid$2d$link$40$4$2e$1$2e$1_reac_d6ddb35c7eb9f5096700796e5dd24205$2f$node_modules$2f$react$2d$plaid$2d$link$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-plaid-link@4.1.1_reac_d6ddb35c7eb9f5096700796e5dd24205/node_modules/react-plaid-link/dist/index.esm.js [app-ssr] (ecmascript)");
"use client";
;
;
;
function PlaidSandboxPage() {
    const [linkToken, setLinkToken] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [publicToken, setPublicToken] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [itemId, setItemId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [accountsJson, setAccountsJson] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("idle");
    const [errMsg, setErrMsg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const fetchLinkToken = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        setErrMsg(null);
        setStatus("fetching_link_token");
        setPublicToken(null);
        setItemId(null);
        const res = await fetch("/api/v1/integrations/plaid/link-token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: "{}"
        });
        const json = await res.json();
        if (!res.ok || !json.ok) {
            setStatus("error");
            setErrMsg(!json.ok ? json.error : `http_${res.status}`);
            setLinkToken(null);
            return;
        }
        setLinkToken(json.linkToken);
        setStatus("link_token_ready");
    }, []);
    const exchangePublicToken = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (!publicToken) return;
        setErrMsg(null);
        setStatus("exchanging");
        const res = await fetch("/api/v1/integrations/plaid/exchange", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                public_token: publicToken
            })
        });
        const json = await res.json();
        if (!res.ok || !json?.ok) {
            setStatus("exchange_error");
            setErrMsg(json?.error ?? `http_${res.status}`);
            return;
        }
        setItemId(json.itemId);
        setAccountsJson(null);
        setStatus("exchange_success");
    }, [
        publicToken
    ]);
    const fetchAccounts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (!itemId) return;
        setErrMsg(null);
        setStatus("fetching_accounts");
        const res = await fetch(`/api/v1/integrations/plaid/accounts?item_id=${encodeURIComponent(itemId)}`);
        const json = await res.json();
        if (!res.ok || !json?.ok) {
            setStatus("accounts_error");
            setErrMsg(json?.error ?? `http_${res.status}`);
            return;
        }
        setAccountsJson(JSON.stringify(json.accounts, null, 2));
        setStatus("accounts_success");
    }, [
        itemId
    ]);
    const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            // IMPORTANT: config must never be null. token can be null until fetched.
            token: linkToken ?? null,
            onSuccess: (pt)=>{
                setPublicToken(pt);
                setStatus("link_success");
            },
            onExit: (error)=>{
                if (error) {
                    setErrMsg(error.display_message ?? error.error_message ?? "link_exit_error");
                    setStatus("link_exit_error");
                } else {
                    setStatus("link_closed");
                }
            }
        }), [
        linkToken
    ]);
    const { open, ready } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$plaid$2d$link$40$4$2e$1$2e$1_reac_d6ddb35c7eb9f5096700796e5dd24205$2f$node_modules$2f$react$2d$plaid$2d$link$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePlaidLink"])(config);
    const canOpen = Boolean(linkToken) && ready;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        style: {
            padding: 24,
            maxWidth: 860,
            margin: "0 auto"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                style: {
                    fontSize: 22,
                    fontWeight: 700,
                    marginBottom: 12
                },
                children: "Plaid Sandbox (P-003)"
            }, void 0, false, {
                fileName: "[project]/apps/web/src/app/integrations/plaid/page.tsx",
                lineNumber: 110,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: {
                    marginBottom: 16,
                    lineHeight: 1.5
                },
                children: [
                    "Dev-only harness: fetch ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                        children: "link_token"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/app/integrations/plaid/page.tsx",
                        lineNumber: 113,
                        columnNumber: 33
                    }, this),
                    " from api and open Plaid Link (sandbox). On success, show ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                        children: "public_token"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/app/integrations/plaid/page.tsx",
                        lineNumber: 114,
                        columnNumber: 23
                    }, this),
                    "."
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/app/integrations/plaid/page.tsx",
                lineNumber: 112,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    gap: 12,
                    alignItems: "center",
                    marginBottom: 16
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: fetchLinkToken,
                        style: {
                            padding: "10px 14px",
                            borderRadius: 8,
                            border: "1px solid #ccc"
                        },
                        children: "1) Get link_token"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/app/integrations/plaid/page.tsx",
                        lineNumber: 118,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>open(),
                        disabled: !canOpen,
                        style: {
                            padding: "10px 14px",
                            borderRadius: 8,
                            border: "1px solid #ccc",
                            opacity: canOpen ? 1 : 0.5
                        },
                        children: "2) Open Plaid Link"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/app/integrations/plaid/page.tsx",
                        lineNumber: 125,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: exchangePublicToken,
                        disabled: !publicToken,
                        style: {
                            padding: "10px 14px",
                            borderRadius: 8,
                            border: "1px solid #ccc",
                            opacity: publicToken ? 1 : 0.5
                        },
                        children: "3) Exchange public_token"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/app/integrations/plaid/page.tsx",
                        lineNumber: 138,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: fetchAccounts,
                        disabled: !itemId,
                        style: {
                            padding: "10px 14px",
                            borderRadius: 8,
                            border: "1px solid #ccc",
                            opacity: itemId ? 1 : 0.5
                        },
                        children: "4) Fetch accounts"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/app/integrations/plaid/page.tsx",
                        lineNumber: 151,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontFamily: "monospace",
                            fontSize: 12
                        },
                        children: [
                            "status: ",
                            status
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/app/integrations/plaid/page.tsx",
                        lineNumber: 164,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/app/integrations/plaid/page.tsx",
                lineNumber: 117,
                columnNumber: 7
            }, this),
            errMsg ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: 12,
                    border: "1px solid #f00",
                    borderRadius: 8,
                    marginBottom: 12
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                        children: "Error:"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/app/integrations/plaid/page.tsx",
                        lineNumber: 169,
                        columnNumber: 11
                    }, this),
                    " ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontFamily: "monospace"
                        },
                        children: errMsg
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/app/integrations/plaid/page.tsx",
                        lineNumber: 169,
                        columnNumber: 25
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/app/integrations/plaid/page.tsx",
                lineNumber: 168,
                columnNumber: 9
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: 12,
                    border: "1px solid #ddd",
                    borderRadius: 8
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: 8
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                children: "linkToken:"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/app/integrations/plaid/page.tsx",
                                lineNumber: 175,
                                columnNumber: 11
                            }, this),
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontFamily: "monospace"
                                },
                                children: linkToken ?? "(none)"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/app/integrations/plaid/page.tsx",
                                lineNumber: 175,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/app/integrations/plaid/page.tsx",
                        lineNumber: 174,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                children: "publicToken:"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/app/integrations/plaid/page.tsx",
                                lineNumber: 178,
                                columnNumber: 11
                            }, this),
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontFamily: "monospace"
                                },
                                children: publicToken ?? "(none)"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/app/integrations/plaid/page.tsx",
                                lineNumber: 178,
                                columnNumber: 31
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/app/integrations/plaid/page.tsx",
                        lineNumber: 177,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginTop: 8
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                children: "itemId:"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/app/integrations/plaid/page.tsx",
                                lineNumber: 181,
                                columnNumber: 11
                            }, this),
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontFamily: "monospace"
                                },
                                children: itemId ?? "(none)"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/app/integrations/plaid/page.tsx",
                                lineNumber: 181,
                                columnNumber: 26
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/app/integrations/plaid/page.tsx",
                        lineNumber: 180,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginTop: 12
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                children: "accounts:"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/app/integrations/plaid/page.tsx",
                                lineNumber: 184,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                style: {
                                    marginTop: 8,
                                    padding: 12,
                                    background: "#f7f7f7",
                                    borderRadius: 8,
                                    overflowX: "auto"
                                },
                                children: accountsJson ?? "(none)"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/app/integrations/plaid/page.tsx",
                                lineNumber: 185,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/app/integrations/plaid/page.tsx",
                        lineNumber: 183,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/app/integrations/plaid/page.tsx",
                lineNumber: 173,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: {
                    marginTop: 16,
                    color: "#666"
                },
                children: [
                    "Next (P-004): send ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                        children: "public_token"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/app/integrations/plaid/page.tsx",
                        lineNumber: 192,
                        columnNumber: 28
                    }, this),
                    " to api exchange endpoint to obtain & store",
                    " ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                        children: "access_token"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/app/integrations/plaid/page.tsx",
                        lineNumber: 193,
                        columnNumber: 9
                    }, this),
                    " (never logged)."
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/app/integrations/plaid/page.tsx",
                lineNumber: 191,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/app/integrations/plaid/page.tsx",
        lineNumber: 109,
        columnNumber: 5
    }, this);
}
}),
"[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.2_f33b48a70247a9dd1be9ff747c251290/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else //TURBOPACK unreachable
            ;
        } else //TURBOPACK unreachable
        ;
    }
} //# sourceMappingURL=module.compiled.js.map
}),
"[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.2_f33b48a70247a9dd1be9ff747c251290/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.2_f33b48a70247a9dd1be9ff747c251290/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
"[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.2_f33b48a70247a9dd1be9ff747c251290/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.2_f33b48a70247a9dd1be9ff747c251290/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}),
"[project]/node_modules/.pnpm/react-plaid-link@4.1.1_reac_d6ddb35c7eb9f5096700796e5dd24205/node_modules/react-plaid-link/dist/index.esm.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PlaidEmbeddedLink",
    ()=>PlaidEmbeddedLink,
    "PlaidLink",
    ()=>PlaidLink,
    "PlaidLinkStableEvent",
    ()=>PlaidLinkStableEvent,
    "usePlaidLink",
    ()=>usePlaidLink
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.2_f33b48a70247a9dd1be9ff747c251290/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys.push.apply(keys, symbols);
    }
    return keys;
}
function _objectSpread2(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2 ? ownKeys(Object(source), !0).forEach(function(key) {
            _defineProperty(target, key, source[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for(i = 0; i < sourceKeys.length; i++){
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}
function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};
    var target = _objectWithoutPropertiesLoose(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for(i = 0; i < sourceSymbolKeys.length; i++){
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
        }
    }
    return target;
}
function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
}
function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
var _excluded = [
    "src",
    "checkForExisting"
];
var scripts = {}; // Check for existing <script> tags with this src. If so, update scripts[src]
// and return the new status; otherwise, return undefined.
var checkExisting = function checkExisting(src) {
    var existing = document.querySelector("script[src=\"".concat(src, "\"]"));
    if (existing) {
        // Assume existing <script> tag is already loaded,
        // and cache that data for future use.
        return scripts[src] = {
            loading: false,
            error: null,
            scriptEl: existing
        };
    }
    return undefined;
};
var isBrowser = ("TURBOPACK compile-time value", "undefined") !== 'undefined' && typeof window.document !== 'undefined';
function useScript(_ref) {
    var src = _ref.src, _ref$checkForExisting = _ref.checkForExisting, checkForExisting = _ref$checkForExisting === void 0 ? false : _ref$checkForExisting, attributes = _objectWithoutProperties(_ref, _excluded);
    // Check whether some instance of this hook considered this src.
    var status = src ? scripts[src] : undefined; // If requested, check for existing <script> tags with this src
    // (unless we've already loaded the script ourselves).
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    var _useState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(status ? status.loading : Boolean(src)), _useState2 = _slicedToArray(_useState, 2), loading = _useState2[0], setLoading = _useState2[1];
    var _useState3 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(status ? status.error : null), _useState4 = _slicedToArray(_useState3, 2), error = _useState4[0], setError = _useState4[1]; // Tracks if script is loaded so we can avoid duplicate script tags
    var _useState5 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false), _useState6 = _slicedToArray(_useState5, 2), scriptLoaded = _useState6[0], setScriptLoaded = _useState6[1];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(function() {
        // Nothing to do on server, or if no src specified, or
        // if script is already loaded or "error" state.
        if ("TURBOPACK compile-time truthy", 1) return; // Check again for existing <script> tags with this src
        //TURBOPACK unreachable
        ;
        var scriptEl;
        // from a previous load, or a newly created one.
        var handleLoad;
        var handleError;
    }, [
        src
    ]);
    return [
        loading,
        error
    ];
}
var renameKeyInObject = function renameKeyInObject(o, oldKey, newKey) {
    var newObject = {};
    delete Object.assign(newObject, o, _defineProperty({}, newKey, o[oldKey]))[oldKey];
    return newObject;
};
/**
 * Wrap link handler creation and instance to clean up iframe via destroy() method
 */ var createPlaidHandler = function createPlaidHandler(config, creator) {
    var state = {
        plaid: null,
        open: false,
        onExitCallback: null
    }; // If Plaid is not available, throw an Error
    if ("TURBOPACK compile-time truthy", 1) {
        throw new Error('Plaid not loaded');
    }
    state.plaid = creator(_objectSpread2(_objectSpread2({}, config), {}, {
        onExit: function onExit(error, metadata) {
            state.open = false;
            config.onExit && config.onExit(error, metadata);
            state.onExitCallback && state.onExitCallback();
        }
    }));
    var open = function open() {
        if (!state.plaid) {
            return;
        }
        state.open = true;
        state.onExitCallback = null;
        state.plaid.open();
    };
    var submit = function submit(data) {
        if (!state.plaid) {
            return;
        }
        state.plaid.submit(data);
    };
    var exit = function exit(exitOptions, callback) {
        if (!state.open || !state.plaid) {
            callback && callback();
            return;
        }
        state.onExitCallback = callback;
        state.plaid.exit(exitOptions);
        if (exitOptions && exitOptions.force) {
            state.open = false;
        }
    };
    var destroy = function destroy() {
        if (!state.plaid) {
            return;
        }
        state.plaid.destroy();
        state.plaid = null;
    };
    return {
        open: open,
        submit: submit,
        exit: exit,
        destroy: destroy
    };
};
var createPlaid = function createPlaid(options, creator) {
    var config = renameKeyInObject(options, 'publicKey', 'key');
    return createPlaidHandler(config, creator);
};
var PLAID_LINK_STABLE_URL = 'https://cdn.plaid.com/link/v2/stable/link-initialize.js';
var noop = function noop() {};
/**
 * This hook loads Plaid script and manages the Plaid Link creation for you.
 * You get easy open & exit methods to call and loading & error states.
 *
 * This will destroy the Plaid UI on un-mounting so it's up to you to be
 * graceful to the user.
 *
 * A new Plaid instance is created every time the token and products options change.
 * It's up to you to prevent unnecessary re-creations on re-render.
 */ var usePlaidLink = function usePlaidLink(options) {
    // Asynchronously load the plaid/link/stable url into the DOM
    var _useScript = useScript({
        src: PLAID_LINK_STABLE_URL,
        checkForExisting: true
    }), _useScript2 = _slicedToArray(_useScript, 2), loading = _useScript2[0], error = _useScript2[1]; // internal state
    var _useState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null), _useState2 = _slicedToArray(_useState, 2), plaid = _useState2[0], setPlaid = _useState2[1];
    var _useState3 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false), _useState4 = _slicedToArray(_useState3, 2), iframeLoaded = _useState4[0], setIframeLoaded = _useState4[1];
    var products = (options.product || []).slice().sort().join(',');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(function() {
        // If the link.js script is still loading, return prematurely
        if (loading) {
            return;
        } // If the token, publicKey, and received redirect URI are undefined, return prematurely
        if (!options.token && !options.publicKey && !options.receivedRedirectUri) {
            return;
        }
        if (error || !window.Plaid) {
            // eslint-disable-next-line no-console
            console.error('Error loading Plaid', error);
            return;
        } // if an old plaid instance exists, destroy it before
        // creating a new one
        if (plaid != null) {
            plaid.exit({
                force: true
            }, function() {
                return plaid.destroy();
            });
        }
        var next = createPlaid(_objectSpread2(_objectSpread2({}, options), {}, {
            onLoad: function onLoad() {
                setIframeLoaded(true);
                options.onLoad && options.onLoad();
            }
        }), window.Plaid.create);
        setPlaid(next); // destroy the Plaid iframe factory
        return function() {
            return next.exit({
                force: true
            }, function() {
                return next.destroy();
            });
        };
    }, [
        loading,
        error,
        options.publicKey,
        options.token,
        products
    ]);
    var ready = plaid != null && (!loading || iframeLoaded);
    var openNoOp = function openNoOp() {
        if (!options.token) {
            console.warn('react-plaid-link: You cannot call open() without a valid token supplied to usePlaidLink. This is a no-op.');
        }
    };
    return {
        error: error,
        ready: ready,
        submit: plaid ? plaid.submit : noop,
        exit: plaid ? plaid.exit : noop,
        open: plaid ? plaid.open : openNoOp
    };
};
var _excluded$1 = [
    "children",
    "style",
    "className"
];
var PlaidLink = function PlaidLink(props) {
    var children = props.children, style = props.style, className = props.className, config = _objectWithoutProperties(props, _excluded$1);
    var _usePlaidLink = usePlaidLink(_objectSpread2({}, config)), error = _usePlaidLink.error, open = _usePlaidLink.open;
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement("button", {
        disabled: Boolean(error),
        type: "button",
        className: className,
        style: _objectSpread2({
            padding: '6px 4px',
            outline: 'none',
            background: '#FFFFFF',
            border: '2px solid #F1F1F1',
            borderRadius: '4px'
        }, style),
        onClick: function onClick() {
            return open();
        }
    }, children);
};
PlaidLink.displayName = 'PlaidLink';
var PlaidEmbeddedLink = function PlaidEmbeddedLink(props) {
    var style = props.style, className = props.className, onSuccess = props.onSuccess, onExit = props.onExit, onLoad = props.onLoad, onEvent = props.onEvent, token = props.token, receivedRedirectUri = props.receivedRedirectUri;
    var config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(function() {
        return {
            onSuccess: onSuccess,
            onExit: onExit,
            onLoad: onLoad,
            onEvent: onEvent,
            token: token,
            receivedRedirectUri: receivedRedirectUri
        };
    }, [
        onSuccess,
        onExit,
        onLoad,
        onEvent,
        token,
        receivedRedirectUri
    ]); // Asynchronously load the plaid/link/stable url into the DOM
    var _useScript = useScript({
        src: PLAID_LINK_STABLE_URL,
        checkForExisting: true
    }), _useScript2 = _slicedToArray(_useScript, 2), loading = _useScript2[0], error = _useScript2[1];
    var embeddedLinkTarget = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(function() {
        // If the external link JS script is still loading, return prematurely
        if (loading) {
            return;
        }
        if (error || !window.Plaid) {
            // eslint-disable-next-line no-console
            console.error('Error loading Plaid', error);
            return;
        }
        if (config.token == null || config.token == '') {
            console.error('A token is required to initialize embedded Plaid Link');
            return;
        } // The embedded Link interface doesn't use the `usePlaidLink` hook to manage
        // its Plaid Link instance because the embedded Link integration in link-initialize
        // maintains its own handler internally.
        var _window$Plaid$createE = window.Plaid.createEmbedded(_objectSpread2({}, config), embeddedLinkTarget.current), destroy = _window$Plaid$createE.destroy; // Clean up embedded Link component on unmount
        return function() {
            destroy();
        };
    }, [
        loading,
        error,
        config,
        embeddedLinkTarget
    ]);
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement("div", {
        style: style,
        className: className,
        ref: embeddedLinkTarget
    });
};
// The following event names are stable and will not be deprecated or changed
var PlaidLinkStableEvent;
(function(PlaidLinkStableEvent) {
    PlaidLinkStableEvent["OPEN"] = "OPEN";
    PlaidLinkStableEvent["EXIT"] = "EXIT";
    PlaidLinkStableEvent["HANDOFF"] = "HANDOFF";
    PlaidLinkStableEvent["SELECT_INSTITUTION"] = "SELECT_INSTITUTION";
    PlaidLinkStableEvent["ERROR"] = "ERROR";
    PlaidLinkStableEvent["BANK_INCOME_INSIGHTS_COMPLETED"] = "BANK_INCOME_INSIGHTS_COMPLETED";
    PlaidLinkStableEvent["IDENTITY_VERIFICATION_PASS_SESSION"] = "IDENTITY_VERIFICATION_PASS_SESSION";
    PlaidLinkStableEvent["IDENTITY_VERIFICATION_FAIL_SESSION"] = "IDENTITY_VERIFICATION_FAIL_SESSION";
})(PlaidLinkStableEvent || (PlaidLinkStableEvent = {}));
;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__2ef6a903._.js.map