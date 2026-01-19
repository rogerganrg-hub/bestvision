// apps/backend/src/integrations/plaid/plaid_config.js
export function readPlaidConfigFromEnv(env = process.env) {
  const clientId = env.PLAID_CLIENT_ID ?? "";
  const secret = env.PLAID_SECRET ?? "";
  const envName = env.PLAID_ENV ?? "sandbox"; // sandbox | development | production

  const configured = Boolean(clientId && secret);

  return {
    configured,
    envName,
    // 不要把 clientId/secret 放进 ctx 或返回给 API
  };
}
