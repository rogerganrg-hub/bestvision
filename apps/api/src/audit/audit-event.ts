// apps/api/src/audit/audit-event.js
export type AuditResult = "success" | "failure";

export interface AuditEvent {
  auditId: string;
  timestampUtc: string;
  requestId: string;

  actorType: string;
  actorId: string;

  action: string;

  resourceType: string;
  resourceId: string;

  result: AuditResult;
  reasonCode?: string;

  meta?: Record<string, unknown>;
}

