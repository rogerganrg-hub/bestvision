// apps/api/src/infra/repos/plaid-item-repo-sqlite.ts
import type Database from "better-sqlite3";
import type { Statement } from "better-sqlite3";
import type { PlaidItem, PlaidItemRepo } from "./plaid-item-repo.contract.js";

type PlaidItemRow = {
  item_id: string;
  access_token: string;
  created_at: string;
  updated_at: string;
};

export class SqlitePlaidItemRepo implements PlaidItemRepo {
  private readonly db: Database.Database;

  private readonly upsertStmt: Statement;
  private readonly getByIdStmt: Statement<[string], PlaidItemRow | undefined>;

  constructor(db: Database.Database) {
    this.db = db;

    this.upsertStmt = db.prepare(`
      INSERT INTO plaid_items (item_id, access_token, created_at, updated_at)
      VALUES (?, ?, ?, ?)
      ON CONFLICT(item_id) DO UPDATE SET
        access_token = excluded.access_token,
        updated_at   = excluded.updated_at;
    `);

    this.getByIdStmt = db.prepare(`
      SELECT item_id, access_token, created_at, updated_at
      FROM plaid_items
      WHERE item_id = ?
      LIMIT 1;
    `);
  }

  async upsert(item: PlaidItem): Promise<void> {
    this.upsertStmt.run(item.itemId, item.accessToken, item.createdAt, item.updatedAt);
  }

  async getById(itemId: string): Promise<PlaidItem | null> {
    const row = this.getByIdStmt.get(itemId);
    if (!row) return null;

    return {
      itemId: row.item_id,
      accessToken: row.access_token,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }
}
