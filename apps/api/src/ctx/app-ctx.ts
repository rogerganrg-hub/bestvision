// apps/api/src/ctx/app-ctx.ts
import crypto from "node:crypto";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import Database from "better-sqlite3";

import { makeLogger } from "./logger.js";
import { SqliteApplicationRepo } from "../infra/repos/application-repo-sqlite.js";
import { SqlitePlaidItemRepo } from "../infra/repos/plaid-item-repo-sqlite.js";
import { assemblePlaidIntegration } from "../integrations/plaid/index.js";
import { createPlaidClient } from "../integrations/plaid/plaid-client.js";

import type { ApplicationRepo } from "@bestvision/contracts";
import type { PlaidItemRepo } from "@bestvision/contracts";
import type { AuditSink } from "../audit/audit-sink.js";

import { AuditSafeSink } from "../audit/audit-safe-sink.js";
import { SqliteAuditSink } from "../audit/sqlite-audit-sink.js";
import { AuthSessionCtx } from "./auth_session.js";
import { TokenVaultPort } from "../types/ports/token_vault_port.js";


export interface AppCtx {
  requestId: string;
  clock: { nowIso(): string };
  logger: ReturnType<typeof makeLogger>;
  build: { version: "v1"; build: "dev" | string };

  auditSink: AuditSink;
  actor: { type: "system" | "user"; id: string };
  tokenVault: TokenVaultPort;
  auth?: AuthSessionCtx;

  integrations: {
    plaid: { configured: boolean; envName: string };
  };

  plaidClient: ReturnType<typeof createPlaidClient> | null;

  repos: {
    application: ApplicationRepo;
    plaidItem: PlaidItemRepo;
  };
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function ensureDir(p: string): void {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function openDb(): Database.Database {
  const dataDir = path.join(__dirname, "..", "..", "data");
  ensureDir(dataDir);
  const dbPath = path.join(dataDir, "bestvision.sqlite");
  const db = new Database(dbPath);
  db.pragma("journal_mode = WAL");
  return db;
}

function migrate(db: Database.Database): void {
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

function migratePlaid(db: Database.Database): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS plaid_items (
      item_id      TEXT PRIMARY KEY,
      access_token TEXT NOT NULL,
      created_at   TEXT NOT NULL,
      updated_at   TEXT NOT NULL
    );
  `);
}

function migrateAudit(db: Database.Database): void {
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

export function createAppCtx(): AppCtx {
  const requestId = crypto.randomUUID();

  const db = openDb();
  migrate(db);
  migratePlaid(db);
  migrateAudit(db);
  
  // logger 先创建，用于 audit safe sink 的可观测性
  const logger = makeLogger(console, requestId); 
  // 真实 sqlite 审计 sink（预编译 insert + schema）
  const sqliteAuditSink = new SqliteAuditSink(db);
  sqliteAuditSink.ensureSchema(); 
  // best-effort 包装：写失败不阻断业务
  const auditSink: AuditSink = new AuditSafeSink(sqliteAuditSink, logger);

  const plaid = assemblePlaidIntegration();
  const plaidClient = plaid.configured ? createPlaidClient() : null;

  const ctx: AppCtx = {
    requestId,
    clock: { nowIso: () => new Date().toISOString() },
    logger,
    build: { version: "v1", build: "dev" },
    
    auditSink,
    actor: { type: "system", id: "system" },
    tokenVault: undefined as any, // 先占位，server.ts 里会覆盖成真正的实现

    integrations: { 
      plaid: { configured: plaid.configured, envName: plaid.envName } 
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
