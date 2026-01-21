// apps/api/src/usecases/create-application.usecase.js
import crypto from "node:crypto";
import type { AppCtx } from "../ctx/app-ctx.js";
import type { AuditEvent } from "../audit/audit-event.js";
import type { Application } from "../infra/repos/application-repo.contract.js";

function utcNow(): string {
  return new Date().toISOString();
}

export type CreateApplicationInput = {
  name?: unknown;
  email?: unknown;
};

export type CreateApplicationValidationError = {
  ok: false;
  error: "validation_error";
  fields: { name?: "required"; email?: "required" };
};

export type CreateApplicationOk = {
  ok: true;
  applicationId: string;
  status: "created";
  received: { name: string; email: string };
};

export type CreateApplicationResult = CreateApplicationOk | CreateApplicationValidationError;

function asNonEmptyString(v: unknown): string | null {
  return typeof v === "string" && v.trim().length > 0 ? v.trim() : null;
}

class CreateApplicationUseCaseImpl {
  constructor(
    private readonly appRepo: AppCtx["repos"]["application"],
    private readonly auditSink: AppCtx["auditSink"]
  ) {}

  async execute(input: CreateApplicationInput, ctx: { requestId: string; actor?: { type?: string; id?: string } }): Promise<CreateApplicationResult> {
    const name = asNonEmptyString(input?.name);
    const email = asNonEmptyString(input?.email);

    if (!name || !email) {
      const fields: CreateApplicationValidationError["fields"] = {
        ...(name ? {} : { name: "required" as const }),
        ...(email ? {} : { email: "required" as const }),
      };

      const ev: AuditEvent = {
        auditId: crypto.randomUUID(),
        timestampUtc: utcNow(),
        requestId: ctx.requestId,
        actorType: ctx.actor?.type ?? "system",
        actorId: ctx.actor?.id ?? "system",
        action: "application.create",
        resourceType: "application",
        resourceId: "n/a",
        result: "failure",
        reasonCode: "validation_error",
        meta: { fields },
      };
      await this.auditSink.write(ev);

      return { ok: false, error: "validation_error", fields };
    }

    const applicationId = crypto.randomUUID();
    const app: Application = {
      applicationId,
      name,
      email,
      status: "created",
      createdAt: utcNow(),
    };

    try {
      await this.appRepo.create(app);

      await this.auditSink.write({
        auditId: crypto.randomUUID(),
        timestampUtc: utcNow(),
        requestId: ctx.requestId,
        actorType: ctx.actor?.type ?? "system",
        actorId: ctx.actor?.id ?? "system",
        action: "application.create",
        resourceType: "application",
        resourceId: applicationId,
        result: "success",
        meta: { status: "created" },
      });

      return { ok: true, applicationId, status: "created", received: { name, email } };
    } catch (e: unknown) {
      await this.auditSink.write({
        auditId: crypto.randomUUID(),
        timestampUtc: utcNow(),
        requestId: ctx.requestId,
        actorType: ctx.actor?.type ?? "system",
        actorId: ctx.actor?.id ?? "system",
        action: "application.create",
        resourceType: "application",
        resourceId: applicationId,
        result: "failure",
        reasonCode: "repo_error",
      });

      throw e;
    }
  }
}

// ✅ 保持函数式 UseCase 语义：routes 继续调用 CreateApplicationUseCase(ctx, body)
export async function CreateApplicationUseCase(ctx: AppCtx, input: unknown): Promise<CreateApplicationResult> {
  if (process.env.DEBUG_AUDIT === "1") {
    ctx.logger?.info?.("uc_entry_create_application_wrapper", { hasAuditSink: !!ctx.auditSink });
  }

  // 严格要求：骨架期 ctx 必须完整（缺了就炸）
  const appRepo = ctx.repos.application;

  const uc = new CreateApplicationUseCaseImpl(appRepo, ctx.auditSink);
  return uc.execute((input ?? {}) as CreateApplicationInput, { requestId: ctx.requestId, actor: (ctx as any).actor });
}
