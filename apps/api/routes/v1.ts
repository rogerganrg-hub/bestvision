// apps/api/routes/v1.ts
import express, { type Request, type Response } from "express";
import crypto from "node:crypto";

import type { 
    ErrorCode, 
    SafeAccount,
    AccountBalances, 
    PlaidLinkTokenResult,
    PlaidExchangeResult,
    PlaidAccountsResult,
    PlaidStatusResult,
} from "@bestvision/contracts";

import { CreateApplicationUseCase } from "../src/usecases/create-application.usecase.js";
import { getApplication } from "../src/usecases/get-application.usecase.js";
import { listApplications } from "../src/usecases/list-applications.usecase.js";
import type { Products, CountryCode } from "plaid";
import { makeAuditEvent, type AuditEvent } from "../src/audit/audit-event.js";
import { TokenVaultPort } from "../src/types/ports/token_vault_port.js";

export const v1Router = express.Router();

type ApiMeta = { requestId?: string };

function withMeta<T extends object>(req: Request, res: Response, obj: T): T & ApiMeta {
  if (res.locals?.debugEchoRequestId) {
    return { ...obj, requestId: req.ctx.requestId };
  }
  return obj as T & ApiMeta;
}

export function createV1Router(params: {
  tokenVault: TokenVaultPort;
}) {
  const router = express.Router();

  router.get("/integrations/plaid/status", async (req, res) => {
    const auth = req.ctx.auth;

    if (!auth?.isAuthed || !auth.userId) {
      return res.status(401).json({ ok: false, error: "not-authenticated" });
    }

    const token = await params.tokenVault.getRefresh({
      userId: auth.userId,
      provider: "plaid",
    });

    res.json({ ok: true, linked: !!token });
  });

  return router;
}

v1Router.post("/applications", async (req: Request, res: Response) => {
  const ctx = req.ctx;
  try {
    const result = await CreateApplicationUseCase(ctx, req.body);

    if (!result.ok) {
      if (result.error === "validation_error") {
        return res.status(400).json(
          withMeta(req, res, {
            ok: false as const,
            error: "validation_error" as ErrorCode,
            fields: result.fields,
            version: "v1" as const,
          })
        );
      }
      
      return res.status(500).json(
        withMeta(req, res, {
          ok: false as const,
          error: "internal_error" as ErrorCode,
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
        error: "internal_error" as ErrorCode,
        version: "v1" as const,
      })
    );
  }
});

v1Router.post("/integrations/plaid/link-token", async (req, res) => {
  const ctx = req.ctx;
  const auth = ctx.auth;

  if (!auth?.isAuthed || !auth.userId) {
    return res.status(401).json(withMeta(req, res, { ok: false as const, error: "not_authenticated" as const, version: "v1" as const }));
  }

  if (!ctx?.integrations?.plaid?.configured || !ctx.plaidClient?.client) {
    return res.status(400).json(withMeta(req, res, { ok: false as const, error: "plaid_not_configured" as const, version: "v1" as const }));
  }

  const plaidClient = ctx.plaidClient.client;

  try {
    // ✅ stable client_user_id
    const clientUserId = auth.userId;

    const resp = await plaidClient.linkTokenCreate({
      user: { client_user_id: clientUserId },
      client_name: "BestVision",
      products: ["auth" as Products],
      country_codes: ["US" as CountryCode],
      language: "en",
    });

    // audit best-effort (ok)
    try {
      await ctx.auditSink.write(makeAuditEvent(ctx, {
        action: "plaid.link_token.create",
        resourceType: "plaid_link_token",
        resourceId: "n/a",
        result: "success",
        meta: { env: ctx.integrations.plaid.envName, products: ["auth"] },
      }));
    } catch (_) {}

    return res.status(200).json(withMeta(req, res, { ok: true as const, linkToken: resp.data.link_token, version: "v1" as const }));
  } catch (err: unknown) {
    ctx?.logger?.error?.("POST /api/v1/integrations/plaid/link-token failed", err);
    try {
      await ctx.auditSink.write(makeAuditEvent(ctx, {
        action: "plaid.link_token.create",
        resourceType: "plaid_link_token",
        resourceId: "n/a",
        result: "failure",
        reasonCode: "plaid_error",
        meta: { env: ctx.integrations.plaid.envName },
      }));
    } catch (_) {}

    return res.status(500).json(withMeta(req, res, { ok: false as const, error: "internal_error" as const, version: "v1" as const }));
  }
});

v1Router.post("/integrations/plaid/exchange", async (req, res) => {
  const ctx = req.ctx;
  const auth = ctx.auth;

  if (!auth?.isAuthed || !auth.userId) {
    return res.status(401).json(withMeta(req, res, { ok: false as const, error: "not_authenticated" as const, version: "v1" as const }));
  }

  if (!ctx?.integrations?.plaid?.configured || !ctx?.plaidClient?.client) {
    return res.status(400).json(withMeta(req, res, { ok: false as const, error: "plaid_not_configured" as const, version: "v1" as const }));
  }

  const publicToken = (req?.body as any)?.public_token;
  if (!publicToken) {
    return res.status(400).json(withMeta(req, res, {
      ok: false as const,
      error: "validation_error" as const,
      fields: { public_token: "required" as const },
      version: "v1" as const,
    }));
  }

  const plaidClient = ctx.plaidClient.client;

  try {
    const resp = await plaidClient.itemPublicTokenExchange({ public_token: publicToken });

    const itemId = resp.data.item_id;
    const accessToken = resp.data.access_token;

    // ✅ 用 TokenVault 存 item access token（加密落库）
    await ctx.tokenVault.putToken({
      userId: auth.userId,
      provider: "plaid",
      tokenKind: "item_access",
      token: accessToken,
      resourceId: itemId,
      meta: { env: ctx.integrations.plaid.envName },
    });

    // （可选）如果你还需要 item registry，可只存 itemId，不存 token
    // await ctx.repos.plaidItemMeta.upsert({ userId: auth.userId, itemId, ... })

    try {
      await ctx.auditSink.write(makeAuditEvent(ctx, {
        action: "plaid.exchange",
        resourceType: "plaid_item",
        resourceId: itemId,
        result: "success",
        meta: { env: ctx.integrations.plaid.envName },
      }));
    } catch (_) {}

    return res.status(200).json(withMeta(req, res, { ok: true as const, itemId, version: "v1" as const }));
  } catch (err: unknown) {
    ctx?.logger?.error?.("POST /api/v1/integrations/plaid/exchange failed", err);

    try {
      await ctx.auditSink.write(makeAuditEvent(ctx, {
        action: "plaid.exchange",
        resourceType: "plaid_item",
        resourceId: "n/a",
        result: "failure",
        reasonCode: "plaid_error",
        meta: { env: ctx.integrations.plaid.envName },
      }));
    } catch (_) {}

    return res.status(500).json(withMeta(req, res, { ok: false as const, error: "internal_error" as const, version: "v1" as const }));
  }
});

v1Router.get("/integrations/plaid/status", async (req, res) => {
  const ctx = req.ctx;
  const auth = ctx.auth;

  if (!auth?.isAuthed || !auth.userId) {
    return res.status(401).json({ ok: false, error: "not-authenticated" });
  }

  // v1: simplest linked check (any item_access)
  const linked = await ctx.tokenVault.hasAnyToken({
    userId: auth.userId,
    provider: "plaid",
    tokenKind: "item_access",
  });

  return res.status(200).json({
    ok: true,
    linked: !!linked,
    userId: auth.userId,
  });
});

v1Router.get("/integrations/plaid/accounts", async (req, res) => {
  const ctx = req.ctx;
  const auth = ctx.auth;

  if (!auth?.isAuthed || !auth.userId) {
    return res.status(401).json({ ok: false, error: "not-authenticated" });
  }

  if (!ctx?.integrations?.plaid?.configured || !ctx.plaidClient?.client) {
    return res.status(400).json(withMeta(req, res, { ok: false as const, error: "plaid_not_configured" as const, version: "v1" as const }));
  }

  const itemId = (req.query as any)?.item_id;
  if (!itemId) {
    return res.status(400).json(withMeta(req, res, {
      ok: false as const,
      error: "validation_error" as const,
      fields: { item_id: "required" as const },
      version: "v1" as const,
    }));
  }

  const token = await ctx.tokenVault.getToken({
    userId: auth.userId,
    provider: "plaid",
    tokenKind: "item_access",
    resourceId: itemId,
  });

  if (!token) {
    return res.status(400).json({ ok: false, error: "plaid-not-linked" });
  }

  try {
    const resp = await ctx.plaidClient.client.accountsGet({ access_token: token.token });

    if (Math.random() < 0.01) {
      try {
        await ctx.auditSink.write(makeAuditEvent(ctx, {
          action: "plaid.accounts.get",
          resourceType: "plaid_item",
          resourceId: itemId,
          result: "success",
          meta: { env: ctx.integrations.plaid.envName },
        }));
      } catch (_) {}
    }

    return res.status(200).json(withMeta(req, res, { ok: true as const, accounts: resp.data.accounts, version: "v1" as const }));
  } catch (err: unknown) {
    ctx?.logger?.error?.("GET /api/v1/integrations/plaid/accounts failed", err);

    // best-effort audit: failure only
    try {
      await ctx.auditSink.write(makeAuditEvent(ctx, {
        action: "plaid.accounts.get",
        resourceType: "plaid_item",
        resourceId: itemId ?? "n/a",
        result: "failure",
        reasonCode: "plaid_error",
        meta: { env: ctx.integrations.plaid.envName },
      }));
    } catch (_) {}

    return res.status(500).json(withMeta(req, res, { ok: false as const, error: "internal_error" as const, version: "v1" as const }));
  }
});

v1Router.delete("/integrations/plaid/unlink", async (req, res) => {
  const ctx = req.ctx;
  const auth = ctx.auth;

  if (!auth?.isAuthed || !auth.userId) {
    return res.status(401).json({ ok: false, error: "not-authenticated" });
  }

  const itemId = (req.query as any)?.item_id;
  if (!itemId) {
    return res.status(400).json({
      ok: false,
      error: "validation_error",
      fields: { item_id: "required" },
    });
  }

  try {
    await ctx.tokenVault.deleteToken?.({
      userId: auth.userId,
      provider: "plaid",
      tokenKind: "item_access",
      resourceId: itemId,
    });

    // optional: delete metadata
    // await ctx.repos.plaidItem.delete?.({ userId: auth.userId, itemId });

    try {
      await ctx.auditSink.write(makeAuditEvent(ctx, {
        action: "plaid.unlink",
        resourceType: "plaid_item",
        resourceId: itemId,
        result: "success",
      }));
    } catch (_) {}

    return res.status(200).json({ ok: true });
  } catch (err) {
    ctx?.logger?.error?.("plaid unlink failed", err);
    return res.status(500).json({ ok: false, error: "internal_error" });
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

  const limit = req.query.limit; // string | string[] | undefined
  const result = await listApplications(ctx, { limit });
  if (!result.ok) {
    ctx.logger?.error?.("GET /api/v1/applications failed", { error: result.error });
    return res.status(500).json(
      withMeta(req, res, { ok: false as const, error: "internal_error" as ErrorCode, version: "v1" as const })
    );
  }

  ctx.logger?.info?.("applications listed", { limit: result.limit, count: result.items.length });
  return res.status(200).json(
    withMeta(req, res, { ok: true as const, items: result.items, limit: result.limit, version: "v1" as const })
  );
});

v1Router.get("/applications/:id", async (req: Request, res: Response) => {
  const ctx = req.ctx;

  const applicationId = req.params.id;
  const result = await getApplication(ctx, { applicationId });

  if (!result.ok) {
    if (result.error === "not_found") {
      return res.status(404).json(
        withMeta(req, res, { ok: false as const, error: "not_found" as ErrorCode, version: "v1" as const })
      );
    }

    return res.status(500).json(
      withMeta(req, res, { ok: false as const, error: "internal_error" as ErrorCode, version: "v1" as const })
    );
  }

  ctx.logger?.info?.("application fetched", { applicationId });

  return res.status(200).json(
    withMeta(req, res, { ok: true as const, application: result.application, version: "v1" as const })
  );
});
