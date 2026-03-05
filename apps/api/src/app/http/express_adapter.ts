import express, { type Request, type Response } from "express";
import { on_auth_callback, on_me, on_logout } from "./handlers_auth.js";
import type { TokenVaultPort } from "../../types/ports/token_vault_port.js";
import type { SessionStorePort } from "../../types/ports/session_store_port.js";

function pickHeaders(req: Request): Record<string, string | string[] | undefined> {
  // Express headers are lowercase keys
  return req.headers as any;
}

function pickQuery(req: Request): Record<string, string | undefined> {
  const out: Record<string, string | undefined> = {};
  for (const [k, v] of Object.entries(req.query)) {
    out[k] = Array.isArray(v) ? v[0] : (v as any)?.toString();
  }
  return out;
}

export function mount_auth_routes(params: {
  tokenVault: TokenVaultPort;
  sessionStore: SessionStorePort;
}) {
  const router = express.Router();
  const isProd = process.env.NODE_ENV === "production";

  router.get("/me", async (req: Request, res: Response) => {
    const r = await on_me({
      req: { headers: req.headers as any },
      sessionStore: params.sessionStore,
    });
    if (r.headers) for (const [k, v] of Object.entries(r.headers)) res.setHeader(k, v);
    res.status(r.status).json(r.json ?? {});
  });

  router.post("/auth/logout", async (req: Request, res: Response) => {
    const r = await on_logout({
      req: { headers: req.headers as any },
      sessionStore: params.sessionStore,
      isProd,
    });
    if (r.headers) for (const [k, v] of Object.entries(r.headers)) res.setHeader(k, v);
    res.status(r.status).json(r.json ?? {});
  });

  router.get("/auth/plaid/callback", async (req: Request, res: Response) => {
    const userId = (req.headers["x-user-id"] as string) || "dev_user_1"; // v1 mock

    const r = await on_auth_callback({
      req: { headers: req.headers as any, query: pickQuery(req) },
      provider: "plaid",
      userId,
      tokenVault: params.tokenVault,
      sessionStore: params.sessionStore,
      isProd,
    });

    if (r.headers) for (const [k, v] of Object.entries(r.headers)) res.setHeader(k, v);
    res.status(r.status).json(r.json ?? {});
  });

  return router;
}