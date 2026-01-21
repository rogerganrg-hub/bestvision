// apps/api/src/audit/sqlite-audit-sink.ts
import type Database from "better-sqlite3";
import type { Statement } from "better-sqlite3";
import type { AuditEvent } from "./audit-event.js";
import type { AuditSink } from "./audit-sink.js";

export class SqliteAuditSink implements AuditSink {
  private readonly insertStmt: Statement;

  constructor(private readonly db: Database.Database) {
    this.insertStmt = db.prepare(`
      INSERT INTO audit_events (
        audit_id, timestamp_utc, request_id,
        actor_type, actor_id,
        action,
        resource_type, resource_id,
        result, reason_code,
        meta_json
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `);
  }

  ensureSchema(): void {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS audit_events (
        audit_id       TEXT PRIMARY KEY,
        timestamp_utc  TEXT NOT NULL,
        request_id     TEXT NOT NULL,

        actor_type     TEXT NOT NULL,
        actor_id       TEXT NOT NULL,

        action         TEXT NOT NULL,

        resource_type  TEXT NOT NULL,
        resource_id    TEXT NOT NULL,

        result         TEXT NOT NULL,
        reason_code    TEXT,

        meta_json      TEXT
      );

      CREATE INDEX IF NOT EXISTS idx_audit_request_id ON audit_events(request_id);
      CREATE INDEX IF NOT EXISTS idx_audit_time ON audit_events(timestamp_utc);
      CREATE INDEX IF NOT EXISTS idx_audit_resource ON audit_events(resource_type, resource_id);
    `);
  }

  async write(event: AuditEvent): Promise<void> {
    const metaJson = event.meta != null ? JSON.stringify(event.meta) : null;

    this.insertStmt.run(
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
      metaJson
    );
  }
}
