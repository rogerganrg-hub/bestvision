import crypto from "crypto";

export function newRequestId() {
  return crypto.randomUUID();
}
