// apps/backend/src/ctx/app_ctx.js
import crypto from "crypto";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import Database from "better-sqlite3";

import { makeLogger } from "./logger.js";
import { SqliteApplicationRepo } from "../infra/repos/application_repo_sqlite.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function openDb() {
  // A方案：sqlite 落在 apps/backend/data
  const dataDir = path.join(__dirname, "..", "data");
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

/**
 * createAppCtx：唯一正式 ctx 工厂（冻结）
 * - 每请求生成 requestId/logger
 * - 注入 repos.application（UseCase 合同）
 */
export function createAppCtx() {
  const requestId = crypto.randomUUID();

  const db = openDb();
  migrate(db);

  return {
    requestId,
    clock: { nowIso: () => new Date().toISOString() },
    logger: makeLogger(console, requestId),
    build: { version: "v1", build: "dev" },
    repos: {
      application: new SqliteApplicationRepo(db),
    },
  };
}
