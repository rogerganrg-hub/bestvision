// apps/api/src/audit/audit-context.js
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
