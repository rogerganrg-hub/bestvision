// apps/api/src/audit/audit-safe-sink.js
/**
 * @typedef {Object} Logger
 * @property {(msg: string, meta?: any) => void} error
 */

/**
 * @typedef {Object} AuditEvent
 * @property {string} requestId
 * @property {string} action
 * @property {string} resourceType
 * @property {string} resourceId
 */

/**
 * @typedef {Object} AuditSink
 * @property {(event: AuditEvent) => Promise<void>} write
 */

/**
 * 安全审计写入器：包装真实 sink，保证业务不因审计失败而中断
 */
export class AuditSafeSink {
  /**
   * @param {AuditSink} inner
   * @param {Logger} logger
   */
  constructor(inner, logger) {
    /** @private */
    this.inner = inner;
    /** @private */
    this.logger = logger;
  }

  /**
   * @param {AuditEvent} event
   * @returns {Promise<void>}
   */
  async write(event) {
    try {
      await this.inner.write(event);
    } catch (err) {
      // 业务不失败，但必须可观测
      this.logger.error("audit_write_failed", {
        requestId: event.requestId,
        action: event.action,
        resourceType: event.resourceType,
        resourceId: event.resourceId,
        error: String(err),
      });
    }
  }
}
