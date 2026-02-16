// apps/api/src/audit/audit-context.ts
/**
 * @typedef {Object} Actor
 * @property {"user" | "system" | "integration"} type
 * @property {string} id
 */

/**
 * @typedef {Object} AuditContext
 * @property {string} requestId
 * @property {Actor} [actor]
 */
