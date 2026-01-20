// apps/api/src/ctx/app-ctx.js
import crypto from "crypto";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import Database from "better-sqlite3";

import { makeLogger } from "./logger.js";
import { SqliteApplicationRepo } from "../infra/repos/application-repo-sqlite.js";
import { SqlitePlaidItemRepo } from "../infra/repos/plaid-item-repo-sqlite.js";
import { assemblePlaidIntegration } from "../integrations/plaid/index.js";
import { createPlaidClient } from "../integrations/plaid/plaid-client.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function openDb() {
  // sqlite 落在 apps/api/data（与脚本/运维路径统一）
  const dataDir = path.join(__dirname, "..", "..", "data");
  ensureDir(dataDir);

  const dbPath = path.join(dataDir, "bestvision.sqlite");
  const db = new Database(dbPath);
  db.pragma("journal_mode = WAL");
  return db;
}

function migrate(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS applications (
      application_id TEXT PRIMARY KEY,
      name           TEXT NOT NULL,
      email          TEXT NOT NULL,
      status         TEXT NOT NULL,
      created_at     TEXT NOT NULL
    );
  `);
}

function migratePlaid(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS plaid_items (
      item_id      TEXT PRIMARY KEY,
      access_token TEXT NOT NULL,
      created_at   TEXT NOT NULL,
      updated_at   TEXT NOT NULL
    );
  `);
}

function migrateAudit(db) {
  db.exec(`
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

/**
 * createAppCtx：唯一正式 ctx 工厂（冻结）
 * - 每请求生成 requestId/logger
 * - 注入 repos.application（UseCase 合同）
 */
export function createAppCtx() {
  const requestId = crypto.randomUUID();

  const db = openDb();
  migrate(db);
  migratePlaid(db);
  migrateAudit(db);

  // 最小审计写入器（0005 v1）：写失败不阻断业务，只记录 business log
  const auditSink = {
    /**
     * @param {any} event
     * @returns {Promise<void>}
     */
    async write(event) {
      try {
        // 失败演练：强制让审计写入失败（不阻断业务）
        if (process.env.AUDIT_FORCE_FAIL === "1") {
          throw new Error("AUDIT_FORCE_FAIL=1 (drill)");
        }

        const stmt = db.prepare(`
          INSERT INTO audit_events (
            audit_id, timestamp_utc, request_id,
            actor_type, actor_id,
            action,
            resource_type, resource_id,
            result, reason_code,
            meta_json
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `);

        const metaJson = event?.meta != null ? JSON.stringify(event.meta) : null;

        stmt.run(
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
      } catch (err) {
        // 业务不失败，但必须可观测
        // logger 还没创建时先用 console；后面返回 ctx 后也会有 logger
        try {
          console.error("audit_write_failed", { requestId: event?.requestId, error: String(err) });
        } catch (_) {}
      }
    },
  };

  const plaid = assemblePlaidIntegration();
  const plaidClient = plaid.configured ? createPlaidClient() : null;

  const ctx = {
    requestId,
    clock: { nowIso: () => new Date().toISOString() },
    logger: makeLogger(console, requestId),
    build: { version: "v1", build: "dev" },
    auditSink,
    integrations: {
      plaid: { configured: plaid.configured, envName: plaid.envName },
    },
    plaidClient,
    repos: {
      application: new SqliteApplicationRepo(db),
      plaidItem: new SqlitePlaidItemRepo(db),
    },
  };
  if (process.env.DEBUG_AUDIT === "1") {
    console.log("ctx_factory_used", { requestId, hasAuditSink: !!ctx.auditSink });
  }
  return ctx;
}
