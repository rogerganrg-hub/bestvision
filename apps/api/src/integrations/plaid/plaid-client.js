// apps/api/src/integrations/plaid/plaid-client.js

import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";

function requireEnv(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

export function createPlaidClient() {
  const envName = process.env.PLAID_ENV ?? "sandbox";
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
