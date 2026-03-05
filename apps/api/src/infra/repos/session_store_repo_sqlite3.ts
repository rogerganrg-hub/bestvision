import crypto from "node:crypto";
import { Sqlite3Db, get, run } from "../db/sqlite3_db.js";
import { SessionStorePort } from "../../types/ports/session_store_port.js";

type Row = { user_id: string; expires_at_utc: string };

function randomSid(): string {
  return crypto.randomBytes(24).toString("base64url"); // short + url safe
}

export class SessionStoreRepoSqlite3 implements SessionStorePort {
  constructor(private readonly db: Sqlite3Db) {}

  async createSession(params: { userId: string; ttlSeconds: number }): Promise<{ sid: string; expiresAtUtc: string }> {
    const sid = randomSid();
    const expiresAt = new Date(Date.now() + params.ttlSeconds * 1000).toISOString();

    await run(
      this.db,
      `
      INSERT INTO session_store(sid, user_id, expires_at_utc, created_at_utc)
      VALUES (?, ?, ?, ?)
      `,
      [sid, params.userId, expiresAt, new Date().toISOString()]
    );

    return { sid, expiresAtUtc: expiresAt };
  }

  async resolveSession(params: { sid: string }): Promise<{ userId: string } | null> {
    const row = await get<Row>(
      this.db,
      `SELECT user_id, expires_at_utc FROM session_store WHERE sid=?`,
      [params.sid]
    );
    if (!row) return null;

    if (Date.parse(row.expires_at_utc) <= Date.now()) {
      // expired: best-effort cleanup
      await run(this.db, `DELETE FROM session_store WHERE sid=?`, [params.sid]);
      return null;
    }

    return { userId: row.user_id };
  }

  async deleteSession(params: { sid: string }): Promise<void> {
    await run(this.db, `DELETE FROM session_store WHERE sid=?`, [params.sid]);
  }
}