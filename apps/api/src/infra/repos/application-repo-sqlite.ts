// apps/api/src/infra/repos/application-repo-sqlite.ts
import type Database from "better-sqlite3";
import type { Statement } from "better-sqlite3";
import type { Application, ApplicationRepo } from "@bestvision/contracts";

type ApplicationRow = {
  application_id: string;
  name: string;
  email: string;
  status: string;
  created_at: string;
};

export class SqliteApplicationRepo implements ApplicationRepo {
  private readonly db: Database.Database;

  private readonly insertStmt: Statement;
  private readonly selectByIdStmt: Statement<[string], ApplicationRow | undefined>;
  private readonly listLatestStmt: Statement<[number], ApplicationRow>;

  constructor(db: Database.Database) {
    this.db = db;

    this.insertStmt = db.prepare(`
      INSERT INTO applications (
        application_id,
        name,
        email,
        status,
        created_at
      ) VALUES (?, ?, ?, ?, ?)
    `);

    this.selectByIdStmt = db.prepare(`
      SELECT
        application_id,
        name,
        email,
        status,
        created_at
      FROM applications
      WHERE application_id = ?
    `);

    this.listLatestStmt = db.prepare(`
      SELECT
        application_id,
        name,
        email,
        status,
        created_at
      FROM applications
      ORDER BY created_at DESC
      LIMIT ?
    `);
  }

  async create(application: Application): Promise<void> {
    this.insertStmt.run(
      application.applicationId,
      application.name,
      application.email,
      application.status,
      application.createdAt
    );
  }

  async getById(applicationId: string): Promise<Application | null> {
    const row = this.selectByIdStmt.get(applicationId);
    if (!row) return null;

    return {
      applicationId: row.application_id,
      name: row.name,
      email: row.email,
      status: row.status,
      createdAt: row.created_at,
    };
  }

  async listLatest(limit: number): Promise<Application[]> {
    const rows = this.listLatestStmt.all(limit);

    return rows.map((row) => ({
      applicationId: row.application_id,
      name: row.name,
      email: row.email,
      status: row.status,
      createdAt: row.created_at,
    }));
  }
}
