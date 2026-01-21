// apps/api/src/audit/audit-safe-sink.js
import type { AuditEvent } from "./audit-event.js";
import type { AuditSink } from "./audit-sink.js";
import type { Logger } from "../ctx/logger.js";

/**
 * 安全审计写入器：包装真实 sink，保证业务不因审计失败而中断
 */
export class AuditSafeSink implements AuditSink {
  constructor(
    private readonly inner: AuditSink,
    private readonly logger: Logger
  ) {}

  async write(event: AuditEvent): Promise<void> {
    try {
      await this.inner.write(event);
    } catch (err: unknown) {
      this.logger.error("audit_write_failed", err, {
        requestId: event.requestId,
        action: event.action,
        resourceType: event.resourceType,
        resourceId: event.resourceId,
      });
    }
  }
}
