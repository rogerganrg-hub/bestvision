/**
 * @typedef {Object} AuditEvent
 * @property {string} requestId
 * @property {string} action
 * @property {string} resourceType
 * @property {string} resourceId
 */

/**
 * @typedef {Object} AuditSink
 * @property {(event: AuditEvent) => Promise<void>} write
 */
