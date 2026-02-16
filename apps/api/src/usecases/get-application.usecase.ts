// apps/api/src/usecases/get-application.usecase.ts
import type { AppCtx } from "../ctx/app-ctx.js";
import type { GetApplicationResult } from "@bestvision/contracts";

export type GetApplicationInput = { applicationId: string };

function asNonEmptyString(v: unknown): string | null {
  return typeof v === "string" && v.trim().length > 0 ? v.trim() : null;
}

export async function getApplication(ctx: AppCtx, input: unknown): Promise<GetApplicationResult> {
  const applicationId = asNonEmptyString((input as any)?.applicationId);
  if (!applicationId) return { ok: false, error: "not_found" };

  const app = await ctx.repos.application.getById(applicationId);
  if (!app) return { ok: false, error: "not_found" };

  return { ok: true, application: app };
}
