// apps\api\src\app\http\fastify_adapter.ts
import type { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { on_auth_callback, on_me, on_logout } from "./handlers_auth.js";
import type { TokenVaultPort } from "../../types/ports/token_vault_port.js";
import type { SessionStorePort } from "../../types/ports/session_store_port.js";

function pickHeaders(req: FastifyRequest): Record<string, string | string[] | undefined> {
  // Fastify headers are lowercase keys
  return req.headers as any;
}

function pickQuery(req: FastifyRequest): Record<string, string | undefined> {
  const q: any = (req as any).query ?? {};
  const out: Record<string, string | undefined> = {};
  for (const [k, v] of Object.entries(q)) {
    out[k] = Array.isArray(v) ? v[0] : (v as any)?.toString();
  }
  return out;
}

async function send(reply: FastifyReply, r: { status: number; headers?: any; json?: any }) {
  if (r.headers) for (const [k, v] of Object.entries(r.headers)) reply.header(k, v as any);
  reply.code(r.status).send(r.json ?? {});
}

export function register_auth_routes(params: {
  fastify: FastifyInstance;
  tokenVault: TokenVaultPort;
  sessionStore: SessionStorePort;
}) {
  const isProd = process.env.NODE_ENV === "production";

  params.fastify.get("/api/me", async (req, reply) => {
    const r = await on_me({ req: { headers: pickHeaders(req) }, sessionStore: params.sessionStore });
    await send(reply, r);
  });

  params.fastify.post("/api/auth/logout", async (req, reply) => {
    const r = await on_logout({ req: { headers: pickHeaders(req) }, sessionStore: params.sessionStore, isProd });
    await send(reply, r);
  });

  params.fastify.get("/api/auth/plaid/callback", async (req, reply) => {
    const userId = (req.headers["x-user-id"] as string) || "dev_user_1";

    const r = await on_auth_callback({
      req: { headers: pickHeaders(req), query: pickQuery(req) },
      provider: "plaid",
      userId,
      tokenVault: params.tokenVault,
      sessionStore: params.sessionStore,
      isProd,
    });

    await send(reply, r);
  });
}