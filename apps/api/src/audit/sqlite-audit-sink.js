// apps/api/src/audit/sqlite-audit-sink.js
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
 * @property {string | null | undefined} [reasonCode]
 * @property {any} [meta]
 */

/**
 * @typedef {Object} AuditSink
 * @property {(event: AuditEvent) => Promise<void>} write
 */

/**
 * @typedef {Object} SqliteDb
 * @property {(sql: string, params?: any[]) => Promise<void>} run
 */

/**
 * SQLite 实现的审计写入器
 */
export class SqliteAuditSink {
  /**
   * @param {SqliteDb} db
   */
  constructor(db) {
    /** @private */
    this.db = db;
  }

  /**
   * 初始化审计表结构
   * @returns {Promise<void>}
   */
  async ensureSchema() {
    await this.db.run(`
      CREATE TABLE IF NOT EXISTS audit_events (
        audit_id TEXT PRIMARY KEY,
        timestamp_utc TEXT NOT NULL,
        request_id TEXT NOT NULL,

        actor_type TEXT NOT NULL,
        actor_id TEXT NOT NULL,

        action TEXT NOT NULL,

        resource_type TEXT NOT NULL,
        resource_id TEXT NOT NULL,

        result TEXT NOT NULL,
        reason_code TEXT,

        meta_json TEXT
      );
    `);

    await this.db.run(`CREATE INDEX IF NOT EXISTS idx_audit_request_id ON audit_events(request_id);`);
    await this.db.run(`CREATE INDEX IF NOT EXISTS idx_audit_time ON audit_events(timestamp_utc);`);
    await this.db.run(`CREATE INDEX IF NOT EXISTS idx_audit_resource ON audit_events(resource_type, resource_id);`);
  }

  /**
   * 写入审计事件
   * @param {AuditEvent} event
   * @returns {Promise<void>}
   */
  async write(event) {
    const metaJson = event.meta ? JSON.stringify(event.meta) : null;

    await this.db.run(
      `
      INSERT INTO audit_events (
        audit_id, timestamp_utc, request_id,
        actor_type, actor_id,
        action,
        resource_type, resource_id,
        result, reason_code,
        meta_json
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
      `,
      [
        event.auditId,
        event.timestampUtc,
        event.requestId,
        event.actorType,
        event.actorId,
        event.action,
        event.resourceType,
        event.resourceId,
        event.result,
        event.reasonCode ?? null,
        metaJson,
      ]
    );
  }
}
