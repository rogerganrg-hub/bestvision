/** @typedef {import("./application_repo.contract.js").ApplicationRepo} ApplicationRepo */
/** @typedef {import("./application_repo.contract.js").Application} Application */


/**
 * @implements {ApplicationRepo}
 */
export class SqliteApplicationRepo {
  constructor(db) {
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

  /**
   * @param {Application} application
   * @returns {Promise<void>}
   */
  async create(application) {
    this.insertStmt.run(
      application.applicationId,
      application.name,
      application.email,
      application.status,
      application.createdAt
    );
  }

  /**
   * @param {string} applicationId
   * @returns {Promise<null | {
   *  applicationId: string,
   *  name: string,
   *  email: string,
   *  status: string,
   *  createdAt: string
   * }>}
   */
  async getById(applicationId) {
    const row = this.selectByIdStmt.get(applicationId);
    if (!row) return null;

    return {
      applicationId: row.application_id,
      name: row.name,
      email: row.email,
      status: row.status,
      createdAt: row.created_at
    };
  }

  /**
   * @param {number} limit
   * @returns {Promise<Array<{
   *  applicationId: string,
   *  name: string,
   *  email: string,
   *  status: string,
   *  createdAt: string
   * }>>}
   */
  async listLatest(limit) {
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
