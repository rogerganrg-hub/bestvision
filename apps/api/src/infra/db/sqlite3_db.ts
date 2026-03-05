// apps/api/src/infra/db/sqlite3_db.ts
import sqlite3 from "sqlite3";

export type Sqlite3Db = sqlite3.Database;

export function openSqlite3Db(params: { dbPath: string }): Promise<Sqlite3Db> {
  sqlite3.verbose();
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(params.dbPath, (err) => {
      if (err) reject(err);
      else resolve(db);
    });
  });
}

export function exec(db: Sqlite3Db, sql: string): Promise<void> {
  return new Promise((resolve, reject) => {
    db.exec(sql, (err) => (err ? reject(err) : resolve()));
  });
}

export function run(db: Sqlite3Db, sql: string, params: any[] = []): Promise<{ changes: number; lastID: number }> {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (this: sqlite3.RunResult, err) {
      if (err) reject(err);
      else resolve({ changes: this.changes, lastID: (this as any).lastID ?? 0 });
    });
  });
}

export function get<T = any>(db: Sqlite3Db, sql: string, params: any[] = []): Promise<T | undefined> {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => (err ? reject(err) : resolve(row as T | undefined)));
  });
}

export function all<T = any>(db: Sqlite3Db, sql: string, params: any[] = []): Promise<T[]> {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => (err ? reject(err) : resolve(rows as T[])));
  });
}

export function close(db: Sqlite3Db): Promise<void> {
  return new Promise((resolve, reject) => {
    db.close((err) => (err ? reject(err) : resolve()));
  });
}