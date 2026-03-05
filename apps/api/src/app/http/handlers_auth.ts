// apps\api\src\app\http\handlers_auth.ts
import { TokenVaultPort, ProviderId } from "../../types/ports/token_vault_port.js";
import { SessionStorePort } from "../../types/ports/session_store_port.js";
import { buildSetCookie, buildClearCookie } from "./cookie.js";
import { open_auth_session } from "../../ctx/auth_session.js";

export type HttpRequest = {
  headers: Record<string, string | string[] | undefined>;
  query?: Record<string, string | undefined>;
  body?: any;
};

export type HttpResponse = {
  status: number;
  headers?: Record<string, string>;
  json?: any;
};

/**
 * on_auth_callback:
 *  - 验证 callback 参数（v1 可先简化）
 *  - 换 refresh_token（此处先用 mock，后续接 Plaid/Schwab）
 *  - TokenVault.putRefresh
 *  - SessionStore.createSession
 *  - Set-Cookie HttpOnly
 */
export async function on_auth_callback(params: {
  req: HttpRequest;
  provider: ProviderId;                 // e.g. "plaid"
  userId: string;                       // v1：先由你现有 auth/user 系统给出
  tokenVault: TokenVaultPort;
  sessionStore: SessionStorePort;
  isProd: boolean;
}): Promise<HttpResponse> {
  // TODO: 用你们的 state/nonce 机制校验
  const code = params.req.query?.["code"];
  if (!code) return { status: 400, json: { error: "missing code" } };

  // TODO: 与 provider 交换 refresh/access
  const refreshToken = `mock_refresh_${params.provider}_${code}`;

  await params.tokenVault.putRefresh({
    userId: params.userId,
    provider: params.provider,
    refreshToken,
    meta: { obtained_from: "callback", at_utc: new Date().toISOString() },
  });

  const { sid, expiresAtUtc } = await params.sessionStore.createSession({
    userId: params.userId,
    ttlSeconds: 60 * 60 * 24 * 7, // 7 days baseline
  });

  const setCookie = buildSetCookie({
    name: "bv.sid",
    value: sid,
    httpOnly: true,
    secure: params.isProd,
    sameSite: "Lax",
    path: "/",
    maxAgeSeconds: 60 * 60 * 24 * 7,
  });

  return {
    status: 200,
    headers: { "Set-Cookie": setCookie },
    json: { ok: true, expiresAtUtc },
  };
}

export async function on_me(params: {
  req: HttpRequest;
  sessionStore: SessionStorePort;
}): Promise<HttpResponse> {
  const ctx = await open_auth_session({ headers: params.req.headers, sessionStore: params.sessionStore });
  if (!ctx.isAuthed) return { status: 401, json: { authed: false } };
  return { status: 200, json: { authed: true, userId: ctx.userId } };
}

export async function on_logout(params: {
  req: HttpRequest;
  sessionStore: SessionStorePort;
  isProd: boolean;
}): Promise<HttpResponse> {
  const ctx = await open_auth_session({ headers: params.req.headers, sessionStore: params.sessionStore });
  if (ctx.sid) await params.sessionStore.deleteSession({ sid: ctx.sid });

  const clearCookie = buildClearCookie({ name: "bv.sid", path: "/" });
  return { status: 200, headers: { "Set-Cookie": clearCookie }, json: { ok: true } };
}