// apps/api/src/integrations/plaid/plaid-gateway.js

/**
 * PlaidGateway 占位协议（0005 框架）：未来接入 plaid SDK 时实现这些方法。
 * 现在不引入任何第三方 SDK，避免漂移。
 */
export class PlaidGateway {
  async createLinkToken(/* params */) {
    throw new Error("PlaidGateway.createLinkToken not implemented");
  }

  async exchangePublicToken(/* publicToken */) {
    throw new Error("PlaidGateway.exchangePublicToken not implemented");
  }

  async fetchAccounts(/* accessToken */) {
    throw new Error("PlaidGateway.fetchAccounts not implemented");
  }
}
