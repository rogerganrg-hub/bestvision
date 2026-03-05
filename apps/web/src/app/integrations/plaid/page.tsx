// apps/web/src/app/integrations/plaid/page.tsx
"use client";

import React, { useCallback, useMemo, useState } from "react";
import { usePlaidLink } from "react-plaid-link";

type LinkTokenResp =
  | { ok: true; linkToken: string; version: "v1" }
  | { ok: false; error: string; version: "v1" };

export default function PlaidSandboxPage() {
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const [publicToken, setPublicToken] = useState<string | null>(null);
  const [itemId, setItemId] = useState<string | null>(null);
  const [accountsJson, setAccountsJson] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("idle");
  const [errMsg, setErrMsg] = useState<string | null>(null);

  const fetchLinkToken = useCallback(async () => {
    setErrMsg(null);
    setStatus("fetching_link_token");
    setPublicToken(null);
    setItemId(null);

    const res = await fetch("/api/v1/integrations/plaid/link-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{}",
    });

    const json = (await res.json()) as LinkTokenResp;

    if (!res.ok || !json.ok) {
      setStatus("error");
      setErrMsg(!json.ok ? json.error : `http_${res.status}`);
      setLinkToken(null);
      return;
    }

    setLinkToken(json.linkToken);
    setStatus("link_token_ready");
  }, []);

  const exchangePublicToken = useCallback(async () => {
    if (!publicToken) return;

    setErrMsg(null);
    setStatus("exchanging");

    const res = await fetch("/api/v1/integrations/plaid/exchange", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ public_token: publicToken }),
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
  }, [publicToken]);

  const fetchAccounts = useCallback(async () => {
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
  }, [itemId]);

  const config = useMemo(
    () => ({
      // IMPORTANT: config must never be null. token can be null until fetched.
      token: linkToken ?? null,
      onSuccess: (pt: string) => {
        setPublicToken(pt);
        setStatus("link_success");
      },
      onExit: (error: any) => {
        if (error) {
          setErrMsg(error.display_message ?? error.error_message ?? "link_exit_error");
          setStatus("link_exit_error");
        } else {
          setStatus("link_closed");
        }
      },
    }),
    [linkToken]
  );

  const { open, ready } = usePlaidLink(config as any);
  const canOpen = Boolean(linkToken) && ready;

  return (
    <main style={{ padding: 24, maxWidth: 860, margin: "0 auto" }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>Plaid Sandbox (P-003)</h1>

      <p style={{ marginBottom: 16, lineHeight: 1.5 }}>
        Dev-only harness: fetch <code>link_token</code> from api and open Plaid Link (sandbox). On
        success, show <code>public_token</code>.
      </p>

      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16 }}>
        <button
          onClick={fetchLinkToken}
          style={{ padding: "10px 14px", borderRadius: 8, border: "1px solid #ccc" }}
        >
          1) Get link_token
        </button>

        <button
          onClick={() => open()}
          disabled={!canOpen}
          style={{
            padding: "10px 14px",
            borderRadius: 8,
            border: "1px solid #ccc",
            opacity: canOpen ? 1 : 0.5,
          }}
        >
          2) Open Plaid Link
        </button>

        <button
          onClick={exchangePublicToken}
          disabled={!publicToken}
          style={{
            padding: "10px 14px",
            borderRadius: 8,
            border: "1px solid #ccc",
            opacity: publicToken ? 1 : 0.5,
          }}
        >
          3) Exchange public_token
        </button>

        <button
          onClick={fetchAccounts}
          disabled={!itemId}
          style={{
            padding: "10px 14px",
            borderRadius: 8,
            border: "1px solid #ccc",
            opacity: itemId ? 1 : 0.5,
          }}
        >
          4) Fetch accounts
        </button>

        <span style={{ fontFamily: "monospace", fontSize: 12 }}>status: {status}</span>
      </div>

      {errMsg ? (
        <div style={{ padding: 12, border: "1px solid #f00", borderRadius: 8, marginBottom: 12 }}>
          <b>Error:</b> <span style={{ fontFamily: "monospace" }}>{errMsg}</span>
        </div>
      ) : null}

      <div style={{ padding: 12, border: "1px solid #ddd", borderRadius: 8 }}>
        <div style={{ marginBottom: 8 }}>
          <b>linkToken:</b> <span style={{ fontFamily: "monospace" }}>{linkToken ?? "(none)"}</span>
        </div>
        <div>
          <b>publicToken:</b> <span style={{ fontFamily: "monospace" }}>{publicToken ?? "(none)"}</span>
        </div>
        <div style={{ marginTop: 8 }}>
          <b>itemId:</b> <span style={{ fontFamily: "monospace" }}>{itemId ?? "(none)"}</span>
        </div>
        <div style={{ marginTop: 12 }}>
          <b>accounts:</b>
          <pre style={{ marginTop: 8, padding: 12, background: "#f7f7f7", borderRadius: 8, overflowX: "auto" }}>
            {accountsJson ?? "(none)"}
          </pre>
        </div>
      </div>

      <p style={{ marginTop: 16, color: "#666" }}>
        Next (P-004): send <code>public_token</code> to api exchange endpoint to obtain & store{" "}
        <code>access_token</code> (never logged).
      </p>
    </main>
  );
}

