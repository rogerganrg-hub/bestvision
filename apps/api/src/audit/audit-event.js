// apps/api/src/audit/audit-event.js
/**
 * @typedef {"user" | "system" | "integration"} ActorType
 */

/**
 * @typedef {"success" | "failure"} AuditResult
 */

/**
 * @typedef {Object} AuditEvent
 * @property {string} auditId          UUID
 * @property {string} timestampUtc     ISO string UTC
 * @property {string} requestId
 *
 * @property {ActorType} actorType
 * @property {string} actorId
 *
 * @property {string} action
 *
 * @property {string} resourceType
 * @property {string} resourceId
 *
 * @property {AuditResult} result
 * @property {string} [reasonCode]
 *
 * @property {Record<string, unknown>} [meta]
 */
