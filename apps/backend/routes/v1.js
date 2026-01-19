// apps/backend/routes/v1.js
import express from "express";
import crypto from "node:crypto";
import { CreateApplicationUseCase } from "../src/usecases/create_application.usecase.js";
import { getApplication } from "../src/usecases/get_application.usecase.js";
import { listApplications } from "../src/usecases/list_applications.usecase.js";

export const v1Router = express.Router();

/**
 * dev-only: echo requestId into JSON response body for easy copy/debug
 * controlled by server.js -> res.locals.debugEchoRequestId
 */
function withMeta(req, res, obj) {
  if (res?.locals?.debugEchoRequestId) {
    return { ...obj, requestId: req?.ctx?.requestId };
  }
  return obj;
}

v1Router.post("/applications", async (req, res) => {
  const ctx = req.ctx;

  try {
    const result = await CreateApplicationUseCase(ctx, req.body);

    if (!result.ok && result.error === "validation_error") {
      return res.status(400).json(
        withMeta(req, res, {
          ok: false,
          error: "validation_error",
          fields: result.fields,
          version: "v1",
        })
      );
    }

    // createApplication 现在只返回 ok:true 或 validation_error
    // 这里仍保留兜底逻辑，避免未来扩展时漏处理
    if (!result.ok) {
      return res.status(500).json(
        withMeta(req, res, {
          ok: false,
          error: "internal_error",
          version: "v1",
        })
      );
    }

    ctx.logger?.info?.("application created", { applicationId: result.applicationId });

    return res.status(200).json(
      withMeta(req, res, {
        ok: true,
        applicationId: result.applicationId,
        status: result.status,
        received: result.received,
        version: "v1",
      })
    );
  } catch (err) {
    ctx?.logger?.error?.("POST /api/v1/applications failed", err);
    return res.status(500).json(
      withMeta(req, res, {
        ok: false,
        error: "internal_error",
        version: "v1",
      })
    );
  }
});

// Plaid integration 框架占位：状态端点（不接 SDK，不产生外部调用）
v1Router.get("/integrations/plaid/status", async (req, res) => {
  const ctx = req.ctx;
  return res.status(200).json(
    withMeta(req, res, {
      ok: true,
      provider: "plaid",
      configured: !!ctx?.integrations?.plaid?.configured,
      env: ctx?.integrations?.plaid?.envName ?? "unknown",
      version: "v1",
    })
  );
});

// P-002: Create Plaid Link token (sandbox)
v1Router.post("/integrations/plaid/link-token", async (req, res) => {
  const ctx = req.ctx;

  try {
    if (!ctx?.integrations?.plaid?.configured || !ctx.plaidClient?.client) {
      return res.status(400).json(
        withMeta(req, res, {
          ok: false,
          error: "plaid_not_configured",
          version: "v1",
        })
      );
    }

    // Minimal dev user identity for sandbox. Later we’ll use real userId from auth.
    const clientUserId = `dev_user_${ctx.requestId}`;

    const resp = await ctx.plaidClient.client.linkTokenCreate({
      user: { client_user_id: clientUserId },
      client_name: "BestVision",
      products: ["auth"], // minimal; expand later (transactions/investments/etc.)
      country_codes: ["US"],
      language: "en",
    });

    const linkToken = resp.data.link_token;

    // Audit (best-effort; do not block)
    await ctx.auditSink?.write?.({
      auditId: crypto.randomUUID?.() ?? (await import("node:crypto")).randomUUID(),
      timestampUtc: new Date().toISOString(),
      requestId: ctx.requestId,
      actorType: "system",
      actorId: "system",
      action: "plaid.link_token.create",
      resourceType: "plaid_link_token",
      resourceId: "n/a",
      result: "success",
      meta: { env: ctx.integrations.plaid.envName, products: ["auth"] },
    });

    return res.status(200).json(
      withMeta(req, res, {
        ok: true,
        linkToken,
        version: "v1",
      })
    );
  } catch (err) {
    ctx?.logger?.error?.("POST /api/v1/integrations/plaid/link-token failed", err);

    // best-effort audit
    try {
      await ctx.auditSink?.write?.({
        auditId: (await import("node:crypto")).randomUUID(),
        timestampUtc: new Date().toISOString(),
        requestId: ctx.requestId,
        actorType: "system",
        actorId: "system",
        action: "plaid.link_token.create",
        resourceType: "plaid_link_token",
        resourceId: "n/a",
        result: "failure",
        reasonCode: "plaid_error",
      });
    } catch (_) {}

    return res.status(500).json(
      withMeta(req, res, {
        ok: false,
        error: "internal_error",
        version: "v1",
      })
    );
  }
});

// P-004: Exchange public_token -> access_token, store by item_id (dev baseline)
v1Router.post("/integrations/plaid/exchange", async (req, res) => {
  const ctx = req.ctx;

  try {
    if (!ctx?.integrations?.plaid?.configured || !ctx?.plaidClient?.client) {
      return res.status(400).json(
        withMeta(req, res, {
          ok: false,
          error: "plaid_not_configured",
          version: "v1",
        })
      );
    }

    const publicToken = req?.body?.public_token;
    if (!publicToken) {
      return res.status(400).json(
        withMeta(req, res, {
          ok: false,
          error: "validation_error",
          fields: { public_token: "required" },
          version: "v1",
        })
      );
    }

    const resp = await ctx.plaidClient.client.itemPublicTokenExchange({
      public_token: publicToken,
    });

    const itemId = resp.data.item_id;
    const accessToken = resp.data.access_token;

    const now = new Date().toISOString();
    await ctx.repos?.plaidItem?.upsert?.({
      itemId,
      accessToken, // never log this
      createdAt: now,
      updatedAt: now,
    });

    // Audit (best-effort)
    await ctx.auditSink?.write?.({
      auditId: crypto.randomUUID(),
      timestampUtc: now,
      requestId: ctx.requestId,
      actorType: "system",
      actorId: "system",
      action: "plaid.exchange",
      resourceType: "plaid_item",
      resourceId: itemId,
      result: "success",
      meta: { env: ctx.integrations.plaid.envName },
    });

    return res.status(200).json(
      withMeta(req, res, {
        ok: true,
        itemId,
        version: "v1",
      })
    );
  } catch (err) {
    ctx?.logger?.error?.("POST /api/v1/integrations/plaid/exchange failed", err);

    try {
      await ctx.auditSink?.write?.({
        auditId: crypto.randomUUID(),
        timestampUtc: new Date().toISOString(),
        requestId: ctx.requestId,
        actorType: "system",
        actorId: "system",
        action: "plaid.exchange",
        resourceType: "plaid_item",
        resourceId: "n/a",
        result: "failure",
        reasonCode: "plaid_error",
      });
    } catch (_) {}

    return res.status(500).json(
      withMeta(req, res, {
        ok: false,
        error: "internal_error",
        version: "v1",
      })
    );
  }
});

// P-005: Fetch accounts by item_id (uses stored access_token)
v1Router.get("/integrations/plaid/accounts", async (req, res) => {
  const ctx = req.ctx;

  try {
    if (!ctx?.integrations?.plaid?.configured || !ctx?.plaidClient?.client) {
      return res.status(400).json(
        withMeta(req, res, {
          ok: false,
          error: "plaid_not_configured",
          version: "v1",
        })
      );
    }

    const itemId = req?.query?.item_id;
    if (!itemId) {
      return res.status(400).json(
        withMeta(req, res, {
          ok: false,
          error: "validation_error",
          fields: { item_id: "required" },
          version: "v1",
        })
      );
    }

    const item = await ctx.repos?.plaidItem?.getById?.(String(itemId));
    if (!item) {
      return res.status(404).json(
        withMeta(req, res, {
          ok: false,
          error: "not_found",
          version: "v1",
        })
      );
    }

    const resp = await ctx.plaidClient.client.accountsGet({
      access_token: item.accessToken,
    });

    const accounts = resp.data.accounts ?? [];

    const now = new Date().toISOString();
    await ctx.auditSink?.write?.({
      auditId: crypto.randomUUID(),
      timestampUtc: now,
      requestId: ctx.requestId,
      actorType: "system",
      actorId: "system",
      action: "plaid.accounts.fetch",
      resourceType: "plaid_item",
      resourceId: String(itemId),
      result: "success",
      meta: { count: accounts.length, env: ctx.integrations.plaid.envName },
    });

    // Return a safe subset (no tokens)
    const safeAccounts = accounts.map((a) => ({
      account_id: a.account_id,
      name: a.name,
      official_name: a.official_name ?? null,
      type: a.type,
      subtype: a.subtype ?? null,
      mask: a.mask ?? null,
      balances: a.balances,
    }));

    return res.status(200).json(
      withMeta(req, res, {
        ok: true,
        itemId: String(itemId),
        accounts: safeAccounts,
        version: "v1",
      })
    );
  } catch (err) {
    ctx?.logger?.error?.("GET /api/v1/integrations/plaid/accounts failed", err);

    try {
      await ctx.auditSink?.write?.({
        auditId: crypto.randomUUID(),
        timestampUtc: new Date().toISOString(),
        requestId: ctx.requestId,
        actorType: "system",
        actorId: "system",
        action: "plaid.accounts.fetch",
        resourceType: "plaid_item",
        resourceId: String(req?.query?.item_id ?? "n/a"),
        result: "failure",
        reasonCode: "plaid_error",
      });
    } catch (_) {}

    return res.status(500).json(
      withMeta(req, res, {
        ok: false,
        error: "internal_error",
        version: "v1",
      })
    );
  }
});

// Debug endpoint (dev-only convention): expose whether AUDIT_FORCE_FAIL is enabled.
// Does not leak secrets; used by smoke tests to avoid false failures.
v1Router.get("/debug/audit", async (req, res) => {
  return res.status(200).json(
    withMeta(req, res, {
      ok: true,
      auditForceFail: process.env.AUDIT_FORCE_FAIL === "1",
      version: "v1",
    })
  );
});

v1Router.get("/applications", async (req, res) => {
  const ctx = req.ctx;

  try {
    const limit = req.query.limit; // string | undefined
    const result = await listApplications(ctx, { limit });

    ctx.logger?.info?.("applications listed", { limit: result.limit, count: result.items.length });

    return res.status(200).json(
      withMeta(req, res, {
        ok: true,
        items: result.items,
        limit: result.limit,
        version: "v1",
      })
    );
  } catch (err) {
    ctx?.logger?.error?.("GET /api/v1/applications failed", err);
    return res.status(500).json(
      withMeta(req, res, {
        ok: false,
        error: "internal_error",
        version: "v1",
      })
    );
  }
});

v1Router.get("/applications/:id", async (req, res) => {
  const ctx = req.ctx;

  try {
    const applicationId = req.params.id;
    const result = await getApplication(ctx, { applicationId });

    if (!result.ok) {
      return res.status(404).json(
        withMeta(req, res, {
          ok: false,
          error: "not_found",
          version: "v1",
        })
      );
    }

    ctx.logger?.info?.("application fetched", { applicationId });

    return res.status(200).json(
      withMeta(req, res, {
        ok: true,
        application: result.application,
        version: "v1",
      })
    );
  } catch (err) {
    ctx?.logger?.error?.("GET /api/v1/applications/:id failed", err);
    return res.status(500).json(
      withMeta(req, res, {
        ok: false,
        error: "internal_error",
        version: "v1",
      })
    );
  }
});
