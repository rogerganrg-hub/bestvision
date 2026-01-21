// apps/api/src/usecases/get-application.usecase.ts
import type { AppCtx } from "../ctx/app-ctx.js";
import type { Application } from "../infra/repos/application-repo.contract.js";

export type GetApplicationInput = { applicationId: string };

export type GetApplicationResult =
  | { ok: true; application: Application }
  | { ok: false; error: "not_found" };

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
