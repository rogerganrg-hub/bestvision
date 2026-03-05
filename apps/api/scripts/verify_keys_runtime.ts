import "dotenv/config";
import crypto from "node:crypto";

function sha12(buf: Buffer): string {
  return crypto.createHash("sha256").update(buf).digest("hex").slice(0, 12);
}

function mustGet(name: string): string {
  const v = process.env[name];
  if (!v || !v.trim()) throw new Error(`Missing env: ${name}`);
  return v.trim();
}

function main() {
  const enc = mustGet("BV_ENCRYPTION_KEY");
  const sess = mustGet("SESSION_SECRET");

  const encBuf = Buffer.from(enc, "base64");
  if (encBuf.length !== 32) {
    throw new Error(`BV_ENCRYPTION_KEY must decode to 32 bytes, got ${encBuf.length}`);
  }

  // SESSION_SECRET: just ensure non-trivial
  if (sess.length < 24) {
    console.warn(`[verify_keys_runtime] SESSION_SECRET length is short (${sess.length}). Consider regenerating.`);
  }

  console.log(`[verify_keys_runtime] OK`);
  console.log(`  BV_ENCRYPTION_KEY: 32 bytes (fp=${sha12(encBuf)})`);
  console.log(`  SESSION_SECRET: present (not printed)`);
}

main();