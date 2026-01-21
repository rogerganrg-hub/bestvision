// apps/api/src/usecases/health-uc.js
import type { AppCtx } from "../ctx/app-ctx.js";

export function healthUc(ctx: AppCtx): { ok: true; service: "api"; version: string } {
  return { ok: true, service: "api", version: ctx.build.version };
}