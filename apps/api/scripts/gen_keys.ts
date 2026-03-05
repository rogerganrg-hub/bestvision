// apps/api/scripts/gen_keys.ts
//
// Usage:
//   pnpm --dir apps/api exec tsx ./scripts/gen_keys.ts
//   pnpm -C apps/api tsx ./scripts/gen_keys.ts --write-env
//   pnpm -C apps/api tsx ./scripts/gen_keys.ts --write-env --path .env.local --force
//
// Output defaults to shell-friendly KEY=VALUE lines.
//
// Notes:
// - BV_ENCRYPTION_KEY: base64 of 32 random bytes (AES-256-GCM key)
// - SESSION_SECRET: base64 of 32 random bytes (session signing/derivation secret)

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

type Args = {
  writeEnv: boolean;
  force: boolean;
  envPath: string;
  json: boolean;
};

function parseArgs(argv: string[]): Args {
  const args: Args = {
    writeEnv: false,
    force: false,
    envPath: ".env.local",
    json: false,
  };

  for (const a of argv) {
    if (a === "--write-env") args.writeEnv = true;
    else if (a === "--force") args.force = true;
    else if (a === "--json") args.json = true;
    else if (a.startsWith("--path=")) args.envPath = a.slice("--path=".length);
    else if (a === "--help" || a === "-h") {
      printHelpAndExit(0);
    } else {
      console.error(`Unknown arg: ${a}`);
      printHelpAndExit(2);
    }
  }

  return args;
}

function printHelpAndExit(code: number): never {
  console.log(`
gen_keys.ts - generate BestVision secrets

Options:
  --write-env         Append/update keys in an env file (default: .env.local)
  --path=<file>       Env file path (default: .env.local)
  --force             Overwrite existing keys in env file (otherwise keep existing)
  --json              Print JSON instead of KEY=VALUE lines
  -h, --help          Show help

Examples:
  tsx ./scripts/gen_keys.ts
  tsx ./scripts/gen_keys.ts --write-env
  tsx ./scripts/gen_keys.ts --write-env --path .env.local --force
`.trim());
  process.exit(code);
}

function genBase64Key(bytes: number): string {
  return crypto.randomBytes(bytes).toString("base64");
}

function ensureKey32Base64(v: string) {
  const buf = Buffer.from(v, "base64");
  if (buf.length !== 32) throw new Error(`BV_ENCRYPTION_KEY must decode to 32 bytes, got ${buf.length}`);
}

function readEnvFile(p: string): string {
  if (!fs.existsSync(p)) return "";
  return fs.readFileSync(p, "utf8");
}

function upsertEnv(content: string, kv: Record<string, string>, force: boolean): string {
  const lines = content.split(/\r?\n/);
  const existing = new Map<string, { idx: number; val: string }>();

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    existing.set(m[1], { idx: i, val: m[2] });
  }

  for (const [k, v] of Object.entries(kv)) {
    if (existing.has(k)) {
      const { idx } = existing.get(k)!;
      if (force) lines[idx] = `${k}=${v}`;
      // else keep existing
    } else {
      // append new
      lines.push(`${k}=${v}`);
    }
  }

  // trim extra trailing empty lines, keep at most one
  while (lines.length > 0 && lines[lines.length - 1] === "") lines.pop();
  lines.push("");

  return lines.join("\n");
}

function main() {
  const args = parseArgs(process.argv.slice(2));

  // Generate fresh values
  const BV_ENCRYPTION_KEY = genBase64Key(32);
  const SESSION_SECRET = genBase64Key(32);

  // Validate (paranoia)
  ensureKey32Base64(BV_ENCRYPTION_KEY);

  const out = { BV_ENCRYPTION_KEY, SESSION_SECRET };

  if (args.json) {
    console.log(JSON.stringify(out, null, 2));
  } else {
    console.log(`BV_ENCRYPTION_KEY=${BV_ENCRYPTION_KEY}`);
    console.log(`SESSION_SECRET=${SESSION_SECRET}`);
  }

  if (!args.writeEnv) return;

  const envPathAbs = path.resolve(process.cwd(), args.envPath);
  const prev = readEnvFile(envPathAbs);
  const next = upsertEnv(prev, out, args.force);

  fs.mkdirSync(path.dirname(envPathAbs), { recursive: true });
  fs.writeFileSync(envPathAbs, next, { encoding: "utf8" });

  const touched = Object.keys(out).join(", ");
  const mode = fs.existsSync(envPathAbs) ? "updated" : "created";
  console.error(`[gen_keys] ${mode} ${envPathAbs} (${touched}) ${args.force ? "[force]" : "[keep-existing]"}`);
}

main();