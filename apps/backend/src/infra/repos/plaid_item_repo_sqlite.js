// apps/backend/src/infra/repos/plaid_item_repo_sqlite.js

/**
 * SqlitePlaidItemRepo (dev baseline)
 * - Store access_token for Plaid sandbox flow
 * - Never log access_token
 */
export class SqlitePlaidItemRepo {
  /**
   * @param {any} db better-sqlite3 Database
   */
  constructor(db) {
    /** @private */
    this.db = db;
  }

  /**
   * Upsert an item (access_token stored for later calls)
   * @param {{ itemId: string, accessToken: string, createdAt: string, updatedAt: string }} item
   * @returns {Promise<void>}
   */
  async upsert(item) {
    const stmt = this.db.prepare(`
      INSERT INTO plaid_items (item_id, access_token, created_at, updated_at)
      VALUES (?, ?, ?, ?)
      ON CONFLICT(item_id) DO UPDATE SET
        access_token = excluded.access_token,
        updated_at   = excluded.updated_at;
    `);

    stmt.run(item.itemId, item.accessToken, item.createdAt, item.updatedAt);
  }

  /**
   * @param {string} itemId
   * @returns {Promise<{ itemId: string, accessToken: string, createdAt: string, updatedAt: string } | null>}
   */
  async getById(itemId) {
    const stmt = this.db.prepare(`
      SELECT item_id, access_token, created_at, updated_at
      FROM plaid_items
      WHERE item_id = ?
      LIMIT 1;
    `);

    const row = stmt.get(itemId);
    if (!row) return null;

    return {
      itemId: row.item_id,
      accessToken: row.access_token,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }
}
