// apps/api/src/ctx/request-id.js
import crypto from "crypto";

export function newRequestId() {
  return crypto.randomUUID();
}
