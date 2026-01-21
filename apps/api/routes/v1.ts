// apps/api/routes/v1.ts
import express, { type Request, type Response } from "express";
import crypto from "node:crypto";

import { CreateApplicationUseCase } from "../src/usecases/create-application.usecase.js";
import { getApplication } from "../src/usecases/get-application.usecase.js";
import { listApplications } from "../src/usecases/list-applications.usecase.js";
import { Products, CountryCode } from "plaid";
import type { AuditEvent } from "../src/audit/audit-event.js";

export const v1Router = express.Router();

type ApiMeta = { requestId?: string };
function withMeta<T extends object>(req: Request, res: Response, obj: T): T & ApiMeta {
  if (res.locals?.debugEchoRequestId) {
    return { ...obj, requestId: req.ctx.requestId };
  }
  return obj as T & ApiMeta;
}

v1Router.post("/applications", async (req: Request, res: Response) => {
  const ctx = req.ctx;

  try {
    const result = await CreateApplicationUseCase(ctx, req.body);

    if (!result.ok && result.error === "validation_error") {
      return res.status(400).json(
        withMeta(req, res, {
          ok: false as const,
          error: "validation_error" as const,
          fields: result.fields,
          version: "v1" as const,
        })
      );
    }

    if (!result.ok) {
      return res.status(500).json(
        withMeta(req, res, {
          ok: false as const,
          error: "internal_error" as const,
          version: "v1" as const,
        })
      );
    }

    ctx.logger?.info?.("application created", { applicationId: result.applicationId });

    return res.status(200).json(
      withMeta(req, res, {
        ok: true as const,
        applicationId: result.applicationId,
        status: result.status,
        received: result.received,
        version: "v1" as const,
      })
    );
  } catch (err: unknown) {
    ctx.logger?.error?.("POST /api/v1/applications failed", err);
    return res.status(500).json(
      withMeta(req, res, {
        ok: false as const,
        error: "internal_error" as const,
        version: "v1" as const,
      })
    );
  }
});

v1Router.get("/integrations/plaid/status", async (req: Request, res: Response) => {
  const ctx = req.ctx;
  return res.status(200).json(
    withMeta(req, res, {
      ok: true as const,
      provider: "plaid" as const,
      configured: !!ctx.integrations?.plaid?.configured,
      env: ctx.integrations?.plaid?.envName ?? "unknown",
      version: "v1" as const,
    })
  );
});

v1Router.post("/integrations/plaid/link-token", async (req: Request, res: Response) => {
  const ctx = req.ctx;

  try {
    const plaidClient = ctx.plaidClient;
    if (!ctx.integrations.plaid.configured || !plaidClient?.client) {
      return res.status(400).json(
        withMeta(req, res, { ok: false as const, error: "plaid_not_configured" as const, version: "v1" as const })
      );
    }

    const clientUserId = `dev_user_${ctx.requestId}`;

    const resp = await plaidClient.client.linkTokenCreate({
      user: { client_user_id: clientUserId },
      client_name: "BestVision",
      products: [Products.Auth],
      country_codes: [CountryCode.Us],
      language: "en",
    });

    const linkToken = resp.data.link_token;

    const ev: AuditEvent = {
      auditId: crypto.randomUUID(),
      timestampUtc: new Date().toISOString(),
      requestId: ctx.requestId,
      actorType: "system",
      actorId: "system",
      action: "plaid.link_token.create",
      resourceType: "plaid_link_token",
      resourceId: "n/a",
      result: "success",
      meta: { env: ctx.integrations.plaid.envName, products: ["auth"] },
    };
    await ctx.auditSink?.write(ev);

    return res.status(200).json(withMeta(req, res, { ok: true as const, linkToken, version: "v1" as const }));
  } catch (err: unknown) {
    ctx.logger?.error?.("POST /api/v1/integrations/plaid/link-token failed", err);

    try {
      const ev: AuditEvent = {
        auditId: crypto.randomUUID(),
        timestampUtc: new Date().toISOString(),
        requestId: ctx.requestId,
        actorType: "system",
        actorId: "system",
        action: "plaid.link_token.create",
        resourceType: "plaid_link_token",
        resourceId: "n/a",
        result: "failure",
        reasonCode: "plaid_error",
      };
      await ctx.auditSink?.write(ev);
    } catch {}

    return res.status(500).json(withMeta(req, res, { ok: false as const, error: "internal_error" as const, version: "v1" as const }));
  }
});

v1Router.post("/integrations/plaid/exchange", async (req: Request, res: Response) => {
  const ctx = req.ctx;

  try {
    if (!ctx.integrations?.plaid?.configured || !ctx.plaidClient?.client) {
      return res.status(400).json(withMeta(req, res, { ok: false as const, error: "plaid_not_configured" as const, version: "v1" as const }));
    }

    const publicToken = (req.body as { public_token?: string } | undefined)?.public_token;
    if (!publicToken) {
      return res.status(400).json(
        withMeta(req, res, {
          ok: false as const,
          error: "validation_error" as const,
          fields: { public_token: "required" },
          version: "v1" as const,
        })
      );
    }

    const resp = await ctx.plaidClient.client.itemPublicTokenExchange({ public_token: publicToken });
    const itemId = resp.data.item_id;
    const accessToken = resp.data.access_token;

    const now = new Date().toISOString();
    await ctx.repos.plaidItem.upsert({ itemId, accessToken, createdAt: now, updatedAt: now });

    await ctx.auditSink?.write({
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

    return res.status(200).json(withMeta(req, res, { ok: true as const, itemId, version: "v1" as const }));
  } catch (err: unknown) {
    ctx.logger?.error?.("POST /api/v1/integrations/plaid/exchange failed", err);

    try {
      await ctx.auditSink?.write({
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
    } catch {}

    return res.status(500).json(withMeta(req, res, { ok: false as const, error: "internal_error" as const, version: "v1" as const }));
  }
});

v1Router.get("/integrations/plaid/accounts", async (req: Request, res: Response) => {
  const ctx = req.ctx;

  try {
    if (!ctx.integrations?.plaid?.configured || !ctx.plaidClient?.client) {
      return res.status(400).json(withMeta(req, res, { ok: false as const, error: "plaid_not_configured" as const, version: "v1" as const }));
    }

    const itemId = req.query.item_id;
    if (!itemId) {
      return res.status(400).json(
        withMeta(req, res, {
          ok: false as const,
          error: "validation_error" as const,
          fields: { item_id: "required" },
          version: "v1" as const,
        })
      );
    }

    const item = await ctx.repos.plaidItem.getById(String(itemId));
    if (!item) {
      return res.status(404).json(withMeta(req, res, { ok: false as const, error: "not_found" as const, version: "v1" as const }));
    }

    const resp = await ctx.plaidClient.client.accountsGet({ access_token: item.accessToken });
    const accounts = resp.data.accounts ?? [];

    const now = new Date().toISOString();
    await ctx.auditSink?.write({
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
        ok: true as const,
        itemId: String(itemId),
        accounts: safeAccounts,
        version: "v1" as const,
      })
    );
  } catch (err: unknown) {
    ctx.logger?.error?.("GET /api/v1/integrations/plaid/accounts failed", err);

    try {
      await ctx.auditSink?.write({
        auditId: crypto.randomUUID(),
        timestampUtc: new Date().toISOString(),
        requestId: ctx.requestId,
        actorType: "system",
        actorId: "system",
        action: "plaid.accounts.fetch",
        resourceType: "plaid_item",
        resourceId: String(req.query.item_id ?? "n/a"),
        result: "failure",
        reasonCode: "plaid_error",
      });
    } catch {}

    return res.status(500).json(withMeta(req, res, { ok: false as const, error: "internal_error" as const, version: "v1" as const }));
  }
});

v1Router.get("/debug/audit", async (req: Request, res: Response) => {
  return res.status(200).json(
    withMeta(req, res, {
      ok: true as const,
      auditForceFail: process.env.AUDIT_FORCE_FAIL === "1",
      version: "v1" as const,
    })
  );
});

v1Router.get("/applications", async (req: Request, res: Response) => {
  const ctx = req.ctx;

  try {
    const limit = req.query.limit; // string | string[] | undefined
    const result = await listApplications(ctx, { limit });

    ctx.logger?.info?.("applications listed", { limit: result.limit, count: result.items.length });

    return res.status(200).json(
      withMeta(req, res, { ok: true as const, items: result.items, limit: result.limit, version: "v1" as const })
    );
  } catch (err: unknown) {
    ctx.logger?.error?.("GET /api/v1/applications failed", err);
    return res.status(500).json(withMeta(req, res, { ok: false as const, error: "internal_error" as const, version: "v1" as const }));
  }
});

v1Router.get("/applications/:id", async (req: Request, res: Response) => {
  const ctx = req.ctx;

  try {
    const applicationId = req.params.id;
    const result = await getApplication(ctx, { applicationId });

    if (!result.ok) {
      return res.status(404).json(withMeta(req, res, { ok: false as const, error: "not_found" as const, version: "v1" as const }));
    }

    ctx.logger?.info?.("application fetched", { applicationId });

    return res.status(200).json(withMeta(req, res, { ok: true as const, application: result.application, version: "v1" as const }));
  } catch (err: unknown) {
    ctx.logger?.error?.("GET /api/v1/applications/:id failed", err);
    return res.status(500).json(withMeta(req, res, { ok: false as const, error: "internal_error" as const, version: "v1" as const }));
  }
});
