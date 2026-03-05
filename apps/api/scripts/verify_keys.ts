import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

type Args = { envPath: string };

function parseArgs(argv: string[]): Args {
  let envPath = ".env.local";
  for (const a of argv) {
    if (a.startsWith("--path=")) envPath = a.slice("--path=".length);
    else if (a === "--help" || a === "-h") {
      console.log(`Usage: tsx ./scripts/verify_keys.ts [--path=.env.local]`);
      process.exit(0);
    } else {
      console.error(`Unknown arg: ${a}`);
      process.exit(2);
    }
  }
  return { envPath };
}

function parseDotenv(content: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;

    const idx = line.indexOf("=");
    if (idx <= 0) continue;

    const key = line.slice(0, idx).trim();
    let val = line.slice(idx + 1).trim();

    // strip optional surrounding quotes
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }

    out[key] = val;
  }
  return out;
}

function isBase64Likely(s: string): boolean {
  // base64 chars + optional padding; allow newline-free
  return /^[A-Za-z0-9+/]+={0,2}$/.test(s);
}

function sha12(buf: Buffer): string {
  return crypto.createHash("sha256").update(buf).digest("hex").slice(0, 12);
}

function requireEnv(map: Record<string, string>, key: string): string {
  const v = map[key];
  if (!v) throw new Error(`Missing ${key} in env file`);
  return v;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const abs = path.resolve(process.cwd(), args.envPath);

  if (!fs.existsSync(abs)) {
    console.error(`[verify_keys] env file not found: ${abs}`);
    process.exit(2);
  }

  const content = fs.readFileSync(abs, "utf8");
  const env = parseDotenv(content);

  const enc = requireEnv(env, "BV_ENCRYPTION_KEY");
  const sess = requireEnv(env, "SESSION_SECRET");

  // BV_ENCRYPTION_KEY checks
  if (!isBase64Likely(enc)) {
    console.error(`[verify_keys] BV_ENCRYPTION_KEY is not valid base64 characters`);
    process.exit(2);
  }

  const encBuf = Buffer.from(enc, "base64");
  if (encBuf.length !== 32) {
    console.error(`[verify_keys] BV_ENCRYPTION_KEY decodes to ${encBuf.length} bytes (must be 32)`);
    process.exit(2);
  }

  // SESSION_SECRET checks (recommended >= 32 bytes, allow base64 or raw)
  // If it looks like base64, decode to estimate entropy; otherwise treat as raw string bytes.
  let sessBytes = Buffer.from(sess, "utf8").length;
  if (isBase64Likely(sess)) {
    sessBytes = Buffer.from(sess, "base64").length;
  }

  if (sessBytes < 32) {
    console.warn(
      `[verify_keys] SESSION_SECRET entropy looks low (${sessBytes} bytes). Recommended: >= 32 bytes random.`
    );
  }

  console.log(`[verify_keys] OK`);
  console.log(`  envFile: ${abs}`);
  console.log(`  BV_ENCRYPTION_KEY: 32 bytes (fp=${sha12(encBuf)})`);
  console.log(`  SESSION_SECRET: ~${sessBytes} bytes (not printed)`);
}

main();