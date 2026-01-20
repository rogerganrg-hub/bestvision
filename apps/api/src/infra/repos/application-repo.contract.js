// infra/repos/application-repo.contract.js

/**
 * Application entity (Repo boundary)
 * @typedef {Object} Application
 * @property {string} applicationId
 * @property {string} name
 * @property {string} email
 * @property {string} status
 * @property {string} createdAt  ISO string (UTC)
 */

/**
 * ApplicationRepo contract
 * Implementations: SqliteApplicationRepo, PostgresApplicationRepo, etc.
 *
 * @typedef {Object} ApplicationRepo
 * @property {(application: Application) => Promise<void>} create
 * @property {(applicationId: string) => Promise<(Application|null)>} getById
 * @property {(limit: number) => Promise<Application[]>} listLatest
 */

export {};
