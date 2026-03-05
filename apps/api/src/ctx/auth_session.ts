import { SessionStorePort } from "../types/ports/session_store_port.js";

export type AuthSessionCtx = {
  requestId?: string;
  sid?: string;
  userId?: string;
  isAuthed: boolean;
};

export function parseCookieHeader(cookieHeader: string | undefined): Record<string, string> {
  if (!cookieHeader) return {};
  const out: Record<string, string> = {};
  const parts = cookieHeader.split(";");

  for (const p of parts) {
    const idx = p.indexOf("=");
    if (idx <= 0) continue;
    const k = p.slice(0, idx).trim();
    const v = p.slice(idx + 1).trim();
    out[k] = decodeURIComponent(v);
  }
  return out;
}

export async function open_auth_session(params: {
  headers: Record<string, string | string[] | undefined>;
  sessionStore: SessionStorePort;
  cookieName?: string; // default "bv.sid"
}): Promise<AuthSessionCtx> {
  const cookieName = params.cookieName ?? "bv.sid";
  const cookieHeader = (params.headers["cookie"] ?? params.headers["Cookie"]) as any;
  const cookieStr = Array.isArray(cookieHeader) ? cookieHeader.join(";") : cookieHeader;

  const cookies = parseCookieHeader(cookieStr);
  const sid = cookies[cookieName];

  if (!sid) return { isAuthed: false };

  const resolved = await params.sessionStore.resolveSession({ sid });
  if (!resolved) return { sid, isAuthed: false };

  return { sid, userId: resolved.userId, isAuthed: true };
}