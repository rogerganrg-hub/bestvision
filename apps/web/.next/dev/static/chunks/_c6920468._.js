(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/apps/web/src/app/integrations/plaid/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PlaidSandboxPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.2_f33b48a70247a9dd1be9ff747c251290/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.2_f33b48a70247a9dd1be9ff747c251290/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$plaid$2d$link$40$4$2e$1$2e$1_reac_d6ddb35c7eb9f5096700796e5dd24205$2f$node_modules$2f$react$2d$plaid$2d$link$2f$dist$2f$index$2e$umd$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-plaid-link@4.1.1_reac_d6ddb35c7eb9f5096700796e5dd24205/node_modules/react-plaid-link/dist/index.umd.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function PlaidSandboxPage() {
    _s();
    const [linkToken, setLinkToken] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [publicToken, setPublicToken] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [itemId, setItemId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [accountsJson, setAccountsJson] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("idle");
    const [errMsg, setErrMsg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const fetchLinkToken = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PlaidSandboxPage.useCallback[fetchLinkToken]": async ()=>{
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
        }
    }["PlaidSandboxPage.useCallback[fetchLinkToken]"], []);
    const exchangePublicToken = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PlaidSandboxPage.useCallback[exchangePublicToken]": async ()=>{
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
        }
    }["PlaidSandboxPage.useCallback[exchangePublicToken]"], [
        publicToken
    ]);
    const fetchAccounts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PlaidSandboxPage.useCallback[fetchAccounts]": async ()=>{
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
        }
    }["PlaidSandboxPage.useCallback[fetchAccounts]"], [
        itemId
    ]);
    const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PlaidSandboxPage.useMemo[config]": ()=>({
                // IMPORTANT: config must never be null. token can be null until fetched.
                token: linkToken ?? null,
                onSuccess: ({
                    "PlaidSandboxPage.useMemo[config]": (pt)=>{
                        setPublicToken(pt);
                        setStatus("link_success");
                    }
                })["PlaidSandboxPage.useMemo[config]"],
                onExit: ({
                    "PlaidSandboxPage.useMemo[config]": (error)=>{
                        if (error) {
                            setErrMsg(error.display_message ?? error.error_message ?? "link_exit_error");
                            setStatus("link_exit_error");
                        } else {
                            setStatus("link_closed");
                        }
                    }
                })["PlaidSandboxPage.useMemo[config]"]
            })
    }["PlaidSandboxPage.useMemo[config]"], [
        linkToken
    ]);
    const { open, ready } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$plaid$2d$link$40$4$2e$1$2e$1_reac_d6ddb35c7eb9f5096700796e5dd24205$2f$node_modules$2f$react$2d$plaid$2d$link$2f$dist$2f$index$2e$umd$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlaidLink"])(config);
    const canOpen = Boolean(linkToken) && ready;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        style: {
            padding: 24,
            maxWidth: 860,
            margin: "0 auto"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: {
                    marginBottom: 16,
                    lineHeight: 1.5
                },
                children: [
                    "Dev-only harness: fetch ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                        children: "link_token"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/app/integrations/plaid/page.tsx",
                        lineNumber: 113,
                        columnNumber: 33
                    }, this),
                    " from api and open Plaid Link (sandbox). On success, show ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    gap: 12,
                    alignItems: "center",
                    marginBottom: 16
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
            errMsg ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: 12,
                    border: "1px solid #f00",
                    borderRadius: 8,
                    marginBottom: 12
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                        children: "Error:"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/app/integrations/plaid/page.tsx",
                        lineNumber: 169,
                        columnNumber: 11
                    }, this),
                    " ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: 12,
                    border: "1px solid #ddd",
                    borderRadius: 8
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: 8
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                children: "linkToken:"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/app/integrations/plaid/page.tsx",
                                lineNumber: 175,
                                columnNumber: 11
                            }, this),
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                children: "publicToken:"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/app/integrations/plaid/page.tsx",
                                lineNumber: 178,
                                columnNumber: 11
                            }, this),
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginTop: 8
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                children: "itemId:"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/app/integrations/plaid/page.tsx",
                                lineNumber: 181,
                                columnNumber: 11
                            }, this),
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginTop: 12
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                children: "accounts:"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/app/integrations/plaid/page.tsx",
                                lineNumber: 184,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: {
                    marginTop: 16,
                    color: "#666"
                },
                children: [
                    "Next (P-004): send ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                        children: "public_token"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/app/integrations/plaid/page.tsx",
                        lineNumber: 192,
                        columnNumber: 28
                    }, this),
                    " to api exchange endpoint to obtain & store",
                    " ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
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
_s(PlaidSandboxPage, "+PXMrPSBvBPtnMu9f+gwB+edQBA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$plaid$2d$link$40$4$2e$1$2e$1_reac_d6ddb35c7eb9f5096700796e5dd24205$2f$node_modules$2f$react$2d$plaid$2d$link$2f$dist$2f$index$2e$umd$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlaidLink"]
    ];
});
_c = PlaidSandboxPage;
var _c;
__turbopack_context__.k.register(_c, "PlaidSandboxPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.2_f33b48a70247a9dd1be9ff747c251290/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.2_f33b48a70247a9dd1be9ff747c251290/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.2_f33b48a70247a9dd1be9ff747c251290/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.2_f33b48a70247a9dd1be9ff747c251290/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_f33b48a70247a9dd1be9ff747c251290$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.2_f33b48a70247a9dd1be9ff747c251290/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.2_f33b48a70247a9dd1be9ff747c251290/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
"[project]/node_modules/.pnpm/react-plaid-link@4.1.1_reac_d6ddb35c7eb9f5096700796e5dd24205/node_modules/react-plaid-link/dist/index.umd.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

(function(global, factory) {
    ("TURBOPACK compile-time truthy", 1) ? factory(exports, __turbopack_context__.r("[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.2_f33b48a70247a9dd1be9ff747c251290/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)")) : "TURBOPACK unreachable";
})(/*TURBOPACK member replacement*/ __turbopack_context__.e, function(exports1, React) {
    'use strict';
    var React__default = 'default' in React ? React['default'] : React;
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
    var isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';
    function useScript(_ref) {
        var src = _ref.src, _ref$checkForExisting = _ref.checkForExisting, checkForExisting = _ref$checkForExisting === void 0 ? false : _ref$checkForExisting, attributes = _objectWithoutProperties(_ref, _excluded);
        // Check whether some instance of this hook considered this src.
        var status = src ? scripts[src] : undefined; // If requested, check for existing <script> tags with this src
        // (unless we've already loaded the script ourselves).
        if (!status && checkForExisting && src && isBrowser) {
            status = checkExisting(src);
        }
        var _useState = React.useState(status ? status.loading : Boolean(src)), _useState2 = _slicedToArray(_useState, 2), loading = _useState2[0], setLoading = _useState2[1];
        var _useState3 = React.useState(status ? status.error : null), _useState4 = _slicedToArray(_useState3, 2), error = _useState4[0], setError = _useState4[1]; // Tracks if script is loaded so we can avoid duplicate script tags
        var _useState5 = React.useState(false), _useState6 = _slicedToArray(_useState5, 2), scriptLoaded = _useState6[0], setScriptLoaded = _useState6[1];
        React.useEffect({
            "useScript.useEffect": function() {
                // Nothing to do on server, or if no src specified, or
                // if script is already loaded or "error" state.
                if (!isBrowser || !src || scriptLoaded || error) return; // Check again for existing <script> tags with this src
                // in case it's changed since mount.
                // eslint-disable-next-line react-hooks/exhaustive-deps
                status = scripts[src];
                if (!status && checkForExisting) {
                    status = checkExisting(src);
                } // Determine or create <script> element to listen to.
                var scriptEl;
                if (status) {
                    scriptEl = status.scriptEl;
                } else {
                    scriptEl = document.createElement('script');
                    scriptEl.src = src;
                    Object.keys(attributes).forEach({
                        "useScript.useEffect": function(key) {
                            if (scriptEl[key] === undefined) {
                                scriptEl.setAttribute(key, attributes[key]);
                            } else {
                                scriptEl[key] = attributes[key];
                            }
                        }
                    }["useScript.useEffect"]);
                    status = scripts[src] = {
                        loading: true,
                        error: null,
                        scriptEl: scriptEl
                    };
                } // `status` is now guaranteed to be defined: either the old status
                // from a previous load, or a newly created one.
                var handleLoad = function handleLoad() {
                    if (status) status.loading = false;
                    setLoading(false);
                    setScriptLoaded(true);
                };
                var handleError = function handleError(error) {
                    if (status) status.error = error;
                    setError(error);
                };
                scriptEl.addEventListener('load', handleLoad);
                scriptEl.addEventListener('error', handleError);
                document.body.appendChild(scriptEl);
                return ({
                    "useScript.useEffect": function() {
                        scriptEl.removeEventListener('load', handleLoad);
                        scriptEl.removeEventListener('error', handleError); // if we unmount, and we are still loading the script, then
                        // remove from the DOM & cache so we have a clean slate next time.
                        // this is similar to the `removeOnUnmount` behavior of the TS useScript hook
                        // https://github.com/juliencrn/usehooks-ts/blob/20667273744a22dd2cd2c48c38cd3c10f254ae47/packages/usehooks-ts/src/useScript/useScript.ts#L134
                        // but only applied when loading
                        if (status && status.loading) {
                            scriptEl.remove();
                            delete scripts[src];
                        }
                    }
                })["useScript.useEffect"]; // we need to ignore the attributes as they're a new object per call, so we'd never skip an effect call
            }
        }["useScript.useEffect"], [
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
        if (typeof window === 'undefined' || !window.Plaid) {
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
        var _useState = React.useState(null), _useState2 = _slicedToArray(_useState, 2), plaid = _useState2[0], setPlaid = _useState2[1];
        var _useState3 = React.useState(false), _useState4 = _slicedToArray(_useState3, 2), iframeLoaded = _useState4[0], setIframeLoaded = _useState4[1];
        var products = (options.product || []).slice().sort().join(',');
        React.useEffect({
            "usePlaidLink.useEffect": function() {
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
                    }, {
                        "usePlaidLink.useEffect": function() {
                            return plaid.destroy();
                        }
                    }["usePlaidLink.useEffect"]);
                }
                var next = createPlaid(_objectSpread2(_objectSpread2({}, options), {}, {
                    onLoad: function onLoad() {
                        setIframeLoaded(true);
                        options.onLoad && options.onLoad();
                    }
                }), window.Plaid.create);
                setPlaid(next); // destroy the Plaid iframe factory
                return ({
                    "usePlaidLink.useEffect": function() {
                        return next.exit({
                            force: true
                        }, {
                            "usePlaidLink.useEffect": function() {
                                return next.destroy();
                            }
                        }["usePlaidLink.useEffect"]);
                    }
                })["usePlaidLink.useEffect"];
            }
        }["usePlaidLink.useEffect"], [
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
        return /*#__PURE__*/ React__default.createElement("button", {
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
        var config = React.useMemo({
            "PlaidEmbeddedLink.useMemo[config]": function() {
                return {
                    onSuccess: onSuccess,
                    onExit: onExit,
                    onLoad: onLoad,
                    onEvent: onEvent,
                    token: token,
                    receivedRedirectUri: receivedRedirectUri
                };
            }
        }["PlaidEmbeddedLink.useMemo[config]"], [
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
        var embeddedLinkTarget = React.useRef(null);
        React.useEffect({
            "PlaidEmbeddedLink.useEffect": function() {
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
                return ({
                    "PlaidEmbeddedLink.useEffect": function() {
                        destroy();
                    }
                })["PlaidEmbeddedLink.useEffect"];
            }
        }["PlaidEmbeddedLink.useEffect"], [
            loading,
            error,
            config,
            embeddedLinkTarget
        ]);
        return /*#__PURE__*/ React__default.createElement("div", {
            style: style,
            className: className,
            ref: embeddedLinkTarget
        });
    };
    // The following event names are stable and will not be deprecated or changed
    (function(PlaidLinkStableEvent) {
        PlaidLinkStableEvent["OPEN"] = "OPEN";
        PlaidLinkStableEvent["EXIT"] = "EXIT";
        PlaidLinkStableEvent["HANDOFF"] = "HANDOFF";
        PlaidLinkStableEvent["SELECT_INSTITUTION"] = "SELECT_INSTITUTION";
        PlaidLinkStableEvent["ERROR"] = "ERROR";
        PlaidLinkStableEvent["BANK_INCOME_INSIGHTS_COMPLETED"] = "BANK_INCOME_INSIGHTS_COMPLETED";
        PlaidLinkStableEvent["IDENTITY_VERIFICATION_PASS_SESSION"] = "IDENTITY_VERIFICATION_PASS_SESSION";
        PlaidLinkStableEvent["IDENTITY_VERIFICATION_FAIL_SESSION"] = "IDENTITY_VERIFICATION_FAIL_SESSION";
    })(exports1.PlaidLinkStableEvent || (exports1.PlaidLinkStableEvent = {}));
    exports1.PlaidEmbeddedLink = PlaidEmbeddedLink;
    exports1.PlaidLink = PlaidLink;
    exports1.usePlaidLink = usePlaidLink;
    Object.defineProperty(exports1, '__esModule', {
        value: true
    });
});
}),
]);

//# sourceMappingURL=_c6920468._.js.map