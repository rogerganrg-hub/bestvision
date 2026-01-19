// apps/backend/src/integrations/plaid/index.js
import { readPlaidConfigFromEnv } from "./plaid_config.js";
import { PlaidGateway } from "./plaid_gateway.js";

export function assemblePlaidIntegration() {
  const cfg = readPlaidConfigFromEnv(process.env);

  return {
    configured: cfg.configured,
    envName: cfg.envName,
    gateway: new PlaidGateway(), // 占位实现
  };
}
