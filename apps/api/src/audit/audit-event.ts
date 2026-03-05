// apps/api/src/audit/audit-event.ts
import { AppCtx } from "../ctx/app-ctx.js";
import { Actor } from "@bestvision/contracts";

export type AuditResult = "success" | "failure";

export interface AuditEvent {
  auditId: string;
  timestampUtc: string;
  requestId: string;

  actorType: Actor["type"];
  actorId: Actor["id"];

  action: string;

  resourceType: string;
  resourceId: string;

  result: AuditResult;
  reasonCode?: string;

  meta?: Record<string, unknown>;
}

export function makeAuditEvent(
  ctx: AppCtx,
  input: Pick<AuditEvent, "action" | "resourceType" | "resourceId" | "result" | "reasonCode" | "meta">
): AuditEvent {
  return {
    auditId: crypto.randomUUID(),
    timestampUtc: new Date().toISOString(),
    requestId: ctx.requestId,
    actorType: ctx.actor.type,
    actorId: ctx.actor.id,
    action: input.action,
    resourceType: input.resourceType,
    resourceId: input.resourceId,
    result: input.result,
    reasonCode: input.reasonCode,
    meta: input.meta ?? undefined,
  };
}
