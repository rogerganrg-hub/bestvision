// apps/api/src/integrations/plaid/plaid-client.js
import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";

type PlaidEnvName = "sandbox" | "development" | "production";

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

function asPlaidEnvName(v: unknown): PlaidEnvName {
  const s = typeof v === "string" ? v : "";
  if (s === "sandbox" || s === "development" || s === "production") return s;
  return "sandbox";
}

export function createPlaidClient(): { envName: PlaidEnvName; client: PlaidApi } {
  const envName = asPlaidEnvName(process.env.PLAID_ENV);
  const basePath = PlaidEnvironments[envName];
  if (!basePath) throw new Error(`Invalid PLAID_ENV=${envName}`);

  const config = new Configuration({
    basePath,
    baseOptions: {
      headers: {
        "PLAID-CLIENT-ID": requireEnv("PLAID_CLIENT_ID"),
        "PLAID-SECRET": requireEnv("PLAID_SECRET"),
      },
    },
  });

  return { envName, client: new PlaidApi(config) };
}