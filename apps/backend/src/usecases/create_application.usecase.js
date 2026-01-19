// apps/backend/src/usecases/create_application.usecase.js
import crypto from "node:crypto";

/**
 * @typedef {Object} AuditEvent
 * @property {string} auditId
 * @property {string} timestampUtc
 * @property {string} requestId
 * @property {string} actorType
 * @property {string} actorId
 * @property {string} action
 * @property {string} resourceType
 * @property {string} resourceId
 * @property {string} result
 * @property {string | undefined} [reasonCode]
 * @property {any} [meta]
 */

/**
 * @typedef {Object} AuditSink
 * @property {(event: AuditEvent) => Promise<void>} write
 */

/**
 * @typedef {Object} AuditContext
 * @property {string} requestId
 * @property {{ type?: string, id?: string } | undefined} [actor]
 */

/**
 * @typedef {Object} ApplicationRepository
 * @property {(app: any) => Promise<void>} create
 */

/**
 * @returns {string}
 */
function utcNow() {
  return new Date().toISOString();
}

/**
 * 创建 Application 的用例
 */
class CreateApplicationUseCaseImpl {
  /**
   * @param {ApplicationRepository} appRepo
   * @param {AuditSink} auditSink
   */
  constructor(appRepo, auditSink) {
    /** @private */
    this.appRepo = appRepo;
    /** @private */
    this.auditSink = auditSink;
  }

  /**
   * @param {{ name: string, email: string }} input
   * @param {AuditContext} ctx
   * @returns {Promise<any>}
   */
  async execute(input, ctx) {
    // 输入校验失败
    if (!input?.name || !input?.email) {
      await this.auditSink.write({
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
        meta: {
          fields: {
            name: !input?.name ? "required" : undefined,
            email: !input?.email ? "required" : undefined
          }
        }
      });

      return {
        ok: false,
        error: "validation_error",
        fields: {
          ...(input?.name ? {} : { name: "required" }),
          ...(input?.email ? {} : { email: "required" })
        }
      };
    }

    const applicationId = crypto.randomUUID();
    const app = {
      applicationId,
      name: input.name,
      email: input.email,
      status: "created",
      createdAt: utcNow()
    };

    try {
      await this.appRepo.create(app);

      // 成功边界：业务事实成立
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
        meta: {
          status: "created"
        }
      });

      return { ok: true, applicationId };
    } catch (e) {
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
        reasonCode: "repo_error"
      });

      throw e;
    }
  }
}

// ✅ 维持 0004 的函数式 UseCase 语义：routes 继续调用 CreateApplicationUseCase(ctx, body)
export async function CreateApplicationUseCase(ctx, input) {
  if (process.env.DEBUG_AUDIT === "1") {
    ctx?.logger?.info?.("uc_entry_create_application_wrapper", { hasAuditSink: !!ctx?.auditSink });
  }
  const appRepo = ctx?.repos?.application;
  if (!appRepo) {
    throw new Error("ctx.repos.application missing");
  }

  // 0005 当前 ctx 里还没有 auditSink：先允许缺省（不阻断业务）
  const auditSink =
    ctx?.auditSink ??
    ctx?.audit?.sink ??
    {
      // no-op sink: 保证不因缺审计而漂移/报错
      write: async () => {},
    };

  const uc = new CreateApplicationUseCaseImpl(appRepo, auditSink);
  return uc.execute(input, { requestId: ctx.requestId, actor: ctx.actor });
}
