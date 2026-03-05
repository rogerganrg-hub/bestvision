import crypto from "node:crypto";

export type AppConfig = {
  nodeEnv: "development" | "test" | "production";
  isProd: boolean;

  dbPath: string;

  // secrets (server-only)
  bvEncryptionKey32: Buffer; // decoded
  sessionSecret: string;     // keep as string; can derive later

  // providers (optional, enable when present)
  plaid?: {
    clientId: string;
    secret: string;
  };

  schwab?: {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
  };
};

function mustGet(name: string): string {
  const v = process.env[name];
  if (!v || !v.trim()) throw new Error(`Missing env: ${name}`);
  return v.trim();
}

function optGet(name: string): string | undefined {
  const v = process.env[name];
  return v && v.trim() ? v.trim() : undefined;
}

function decodeBase64Key32(name: string): Buffer {
  const b64 = mustGet(name);
  const buf = Buffer.from(b64, "base64");
  if (buf.length !== 32) throw new Error(`${name} must decode to 32 bytes, got ${buf.length}`);
  return buf;
}

/**
 * open_config() is the single source of truth for env loading.
 * - fail-fast on required values
 * - never logs secret values
 */
export function open_config(): AppConfig {
  const nodeEnv = (process.env.NODE_ENV ?? "development") as AppConfig["nodeEnv"];
  const isProd = nodeEnv === "production";

  const dbPath = mustGet("BV_DB_PATH");
  const bvEncryptionKey32 = decodeBase64Key32("BV_ENCRYPTION_KEY");
  const sessionSecret = mustGet("SESSION_SECRET");

  // Optional providers (only considered enabled if all required fields present)
  const plaidClientId = optGet("PLAID_CLIENT_ID");
  const plaidSecret = optGet("PLAID_SECRET");

  const schwabClientId = optGet("SCHWAB_CLIENT_ID");
  const schwabClientSecret = optGet("SCHWAB_CLIENT_SECRET");
  const schwabRedirectUri = optGet("SCHWAB_REDIRECT_URI");

  const cfg: AppConfig = {
    nodeEnv,
    isProd,
    dbPath,
    bvEncryptionKey32,
    sessionSecret,
  };

  if (plaidClientId && plaidSecret) {
    cfg.plaid = { clientId: plaidClientId, secret: plaidSecret };
  }

  if (schwabClientId && schwabClientSecret && schwabRedirectUri) {
    cfg.schwab = { clientId: schwabClientId, clientSecret: schwabClientSecret, redirectUri: schwabRedirectUri };
  }

  return cfg;
}

/**
 * Helper: stable short fingerprint for debugging without revealing secrets.
 */
export function fingerprintKey(buf: Buffer): string {
  return crypto.createHash("sha256").update(buf).digest("hex").slice(0, 12);
}