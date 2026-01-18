import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "data", "bestvision.sqlite");

export function openSqliteDb() {
  const db = new Database(dbPath);
  db.pragma("journal_mode = WAL");
  return db;
}
