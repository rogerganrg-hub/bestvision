// apps/web/src/app/apply/page.tsx
"use client";

import { useMemo, useState } from "react";

type ValidationError = {
  ok: false;
  error: "validation_error";
  fields: Record<string, string>;
  version?: string;
};

type ApplySuccess = {
  ok: true;
  applicationId: string;
  status: string;
  version: string;
  received: { name?: string; email?: string };
};

type ApplyResponse = ApplySuccess | ValidationError | { ok: false; error: string };

export default function ApplyPage() {
  const [name, setName] = useState("Roy");
  const [email, setEmail] = useState("roy@example.com");

  const [submitting, setSubmitting] = useState(false);
  const [fetching, setFetching] = useState(false);

  const [result, setResult] = useState<ApplyResponse | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const [requestIdPost, setRequestIdPost] = useState<string | null>(null);
  const [requestIdGet, setRequestIdGet] = useState<string | null>(null);

  const [getResult, setGetResult] = useState<any>(null);

  const [listLoading, setListLoading] = useState(false);
  const [listRequestId, setListRequestId] = useState<string | null>(null);
  const [listResult, setListResult] = useState<any>(null);

  const applicationId = useMemo(() => {
    return result && (result as any).ok ? (result as any).applicationId : null;
  }, [result]);
  
  async function onSubmit() {
    setSubmitting(true);

    // 清理结果（保持布局稳定：Result 区仍然存在，只是内容更新）
    setResult(null);
    setFieldErrors({});
    setGetResult(null);
    setRequestIdPost(null);
    setRequestIdGet(null);

    try {
      const resp = await fetch("/api/v1/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      const rid = resp.headers.get("x-request-id");
      setRequestIdPost(rid);
      if (rid) console.log("requestId (POST):", rid);

      const data = (await resp.json()) as ApplyResponse;

      if (!resp.ok && (data as any)?.error === "validation_error") {
        const ve = data as ValidationError;
        setFieldErrors(ve.fields || {});
        setResult(ve);
        return;
      }

      if (!resp.ok) {
        setResult({ ok: false, error: `http_${resp.status}` });
        return;
      }

      setResult(data);
    } catch (e: any) {
      setResult({ ok: false, error: e?.message ?? "network_error" });
    } finally {
      setSubmitting(false);
    }
  }

  async function onFetch() {
    if (!applicationId) return;

    setFetching(true);
    setGetResult(null);
    setRequestIdGet(null);

    try {
      const resp = await fetch(`/api/v1/applications/${applicationId}`);

      const rid = resp.headers.get("x-request-id");
      setRequestIdGet(rid);
      if (rid) console.log("requestId (GET):", rid);

      const data = await resp.json();

      if (!resp.ok) {
        setGetResult({ ok: false, error: data?.error || `http_${resp.status}`, raw: data });
        return;
      }

      setGetResult(data);
    } catch (e: any) {
      setGetResult({ ok: false, error: e?.message ?? "network_error" });
    } finally {
      setFetching(false);
    }
  }

  async function onListLatest() {
    setListLoading(true);
    setListRequestId(null);
    setListResult(null);

    try {
      const resp = await fetch("/api/v1/applications?limit=20");
      const rid = resp.headers.get("x-request-id");
      setListRequestId(rid);
      if (rid) console.log("requestId (LIST):", rid);

      const data = await resp.json();

      if (!resp.ok) {
        setListResult({ ok: false, error: data?.error || `http_${resp.status}`, raw: data });
        return;
      }

      setListResult(data);
    } catch (e: any) {
      setListResult({ ok: false, error: e?.message ?? "network_error" });
    } finally {
      setListLoading(false);
    }
  }

  const inputStyle = (hasError: boolean) => ({
    padding: 10,
    border: `1px solid ${hasError ? "#d00" : "#ccc"}`,
    borderRadius: 8,
    outline: "none",
  });

  const preStyle: React.CSSProperties = {
    padding: 12,
    background: "#f6f6f6",
    borderRadius: 10,
    overflowX: "auto",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
  };

  return (
    <body style={{ overflowY: "scroll" }}>
    <main style={{ maxWidth: 720, margin: "40px auto", padding: 16}}>
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>Apply</h1>
      <p style={{ marginBottom: 24, lineHeight: 1.5 }}>
        Application flow (web → proxy → api /api/v1/applications).
      </p>

      <div style={{ display: "grid", gap: 12, marginBottom: 16 }}>
        <label style={{ display: "grid", gap: 6 }}>
          <span>Name</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            style={inputStyle(Boolean(fieldErrors.name))}
          />
          <div style={{ minHeight: 16 }}>
            {fieldErrors.name && (
              <div style={{ color: "#d00", fontSize: 12 }}>Name: {fieldErrors.name}</div>
            )}
          </div>
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span>Email</span>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            style={inputStyle(Boolean(fieldErrors.email))}
          />
          <div style={{ minHeight: 16 }}>
            {fieldErrors.email && (
              <div style={{ color: "#d00", fontSize: 12 }}>Email: {fieldErrors.email}</div>
            )}
          </div>
        </label>

        <button
          onClick={onSubmit}
          disabled={submitting || fetching}
          style={{
            padding: 12,
            borderRadius: 10,
            border: "1px solid #111",
            cursor: submitting || fetching ? "not-allowed" : "pointer",
          }}
        >
          {submitting ? "Submitting..." : "Submit application"}
        </button>

        {/* 保持按钮占位：不出现/消失，避免布局抖动 */}
        <button
          onClick={onFetch}
          disabled={!applicationId || submitting || fetching}
          style={{
            padding: 12,
            borderRadius: 10,
            border: "1px solid #111",
            cursor: !applicationId || submitting || fetching ? "not-allowed" : "pointer",
            background: "#fff",
            opacity: !applicationId ? 0.6 : 1,
          }}
          title={!applicationId ? "Submit first to get an applicationId" : ""}
        >
          {fetching ? "Fetching..." : "Fetch application"}
        </button>
        <button
          onClick={onListLatest}
          disabled={submitting || fetching || listLoading}
          style={{
            padding: 12,
            borderRadius: 10,
            border: "1px solid #111",
            cursor: submitting || fetching || listLoading ? "not-allowed" : "pointer",
            background: "#fff",
          }}
        >
          {listLoading ? "Listing..." : "List latest (20)"}
        </button>
      </div>

      {/* 固定 Result 区容器，减少状态切换导致的页面跳动 */}
      <section
        style={{
          marginTop: 24,
          padding: 12,
          borderRadius: 12,
          border: "1px solid #eee",
          background: "#fff",
          minHeight: 220,
        }}
      >
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>Result</h2>

        <div style={{ display: "grid", gap: 6, marginBottom: 8 }}>
          <div style={{ color: "#555", fontSize: 12, minHeight: 18 }}>
            {requestIdPost ? (
              <>
                requestId (POST): <code>{requestIdPost}</code>
              </>
            ) : (
              <span style={{ color: "#888" }}>requestId (POST): —</span>
            )}
          </div>

          <div style={{ color: "#555", fontSize: 12, minHeight: 18 }}>
            {requestIdGet ? (
              <>
                requestId (GET): <code>{requestIdGet}</code>
              </>
            ) : (
              <span style={{ color: "#888" }}>requestId (GET): —</span>
            )}
          </div>

          <div style={{ color: "#555", fontSize: 12, minHeight: 18 }}>
            {applicationId ? (
              <>
                applicationId: <code>{applicationId}</code>
              </>
            ) : (
              <span style={{ color: "#888" }}>applicationId: —</span>
            )}
          </div>
        </div>

        {!result && !getResult && <div style={{ color: "#666" }}>No submission yet.</div>}

        {result && <pre style={preStyle}>{JSON.stringify(result, null, 2)}</pre>}

        {getResult && (
          <div style={{ marginTop: 12 }}>
            {/* ✅ 友好提示：not_found */}
            {getResult.ok === false && getResult.error === "not_found" && (
              <div
                style={{
                  padding: 12,
                  borderRadius: 10,
                  border: "1px solid #f0c",
                  background: "#fff7fb",
                  marginBottom: 10,
                }}
              >
                <div style={{ fontWeight: 600, marginBottom: 6 }}>Application not found</div>
                <div style={{ color: "#444", fontSize: 13, lineHeight: 1.5 }}>
                  The applicationId doesn&apos;t exist (or was not saved).  
                  Copy the requestId (GET) below and check api logs with <code>rid=...</code>.
                </div>
                {requestIdGet && (
                  <div style={{ marginTop: 8, fontSize: 12, color: "#555" }}>
                    requestId (GET): <code>{requestIdGet}</code>
                  </div>
                )}
              </div>
            )}

            {/* ✅ 仍然保留原始 JSON（骨架期排障很重要） */}
            <div style={{ fontSize: 14, marginBottom: 6 }}>Fetched result</div>
            <pre
              style={{
                padding: 12,
                background: "#f6f6f6",
                borderRadius: 10,
                overflowX: "auto",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              {JSON.stringify(getResult, null, 2)}
            </pre>
          </div>
        )}

        {listRequestId && (
          <div style={{ marginBottom: 8, color: "#555", fontSize: 12 }}>
            requestId (LIST): <code>{listRequestId}</code>
          </div>
        )}

        {listResult && (
          <div style={{ marginTop: 12 }}>
            <div style={{ fontSize: 14, marginBottom: 6 }}>Latest applications</div>
            <pre style={preStyle}>{JSON.stringify(listResult, null, 2)}</pre>
          </div>
        )}

      </section>
    </main>
    </body>
  );
}
