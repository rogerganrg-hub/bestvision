// apps/api/src/usecases/list-applications.usecase.ts
import type { AppCtx } from "../ctx/app-ctx.js";
import type { ListApplicationsResult } from "@bestvision/contracts";

function clampInt(v: unknown, opts: { min: number; max: number; fallback: number }): number {
  const n = typeof v === "string" ? Number(v) : typeof v === "number" ? v : NaN;
  if (!Number.isFinite(n)) return opts.fallback;

  const i = Math.trunc(n);
  if (i < opts.min) return opts.min;
  if (i > opts.max) return opts.max;
  return i;
}

export async function listApplications(ctx: AppCtx, input: unknown): Promise<ListApplicationsResult> {
  const rawLimit = (input as any)?.limit;
  const limit = clampInt(rawLimit, { min: 1, max: 100, fallback: 20 });

  const items = await ctx.repos.application.listLatest(limit);
  return { ok: true, items, limit };
}

