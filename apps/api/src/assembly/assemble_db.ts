import { openSqlite3Db, exec, Sqlite3Db } from "../infra/db/sqlite3_db.js";
import type { AppConfig } from "../ctx/open_config.js";

export async function assemble_sqlite3_db(cfg: AppConfig): Promise<Sqlite3Db> {
  const dbPath = process.env.BV_DB_PATH;
  if (!dbPath) throw new Error("Missing env BV_DB_PATH");

  const db = await openSqlite3Db({ dbPath: cfg.dbPath });
  await exec(db, `PRAGMA journal_mode=WAL;`);
  await exec(db, `PRAGMA foreign_keys=ON;`);
  return db;
}