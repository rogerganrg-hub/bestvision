// apps/api/src/audit/audit-sink.js
import type { AuditEvent } from "./audit-event.js";

export interface AuditSink {
  write(event: AuditEvent): Promise<void>;
}
