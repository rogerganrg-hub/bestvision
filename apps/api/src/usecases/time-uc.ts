// apps/api/src/usecases/time-uc.js
import type { AppCtx } from "../ctx/app-ctx.js";

export function timeUc(ctx: AppCtx): { ok: true; now: string } {
  return { ok: true, now: ctx.clock.nowIso() };
}