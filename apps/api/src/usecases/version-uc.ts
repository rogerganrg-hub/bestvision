// apps/api/src/usecases/version-uc.js
import type { AppCtx } from "../ctx/app-ctx.js";

export function versionUc(ctx: AppCtx): { ok: true; version: string; build: string } {
  return { ok: true, version: ctx.build.version, build: ctx.build.build };
}