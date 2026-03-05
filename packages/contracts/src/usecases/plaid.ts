// packages/contracts/src/usecases/plaid.ts

export type PlaidNotConfiguredError = { ok: false; error: "plaid_not_configured" };
export type InternalError = { ok: false; error: "internal_error" };
export type NotFoundError = { ok: false; error: "not_found" };
export type PlaidValidationError<Fields extends Record<string, string>> = { 
    ok: false; 
    error: "validation_error"; 
    fields: Fields;
};

// balances: based on observed Plaid account balances shape (e.g., Chase)
export type AccountBalances = {
  available: number | null;
  current: number | null;
  iso_currency_code: string | null;
  limit: number | null;
  unofficial_currency_code: string | null;
};

export type SafeAccount = {
  account_id: string;
  name: string;
  official_name: string | null;
  type: string;      // (如果你想更严格，可 later 再收窄成 plaid 的 AccountType union)
  subtype: string | null;
  mask: string | null;
  balances: AccountBalances;
}

export type PlaidStatusResult = { 
    ok: true; 
    provider: "plaid"; 
    configured: boolean; 
    env: string; 
    version: "v1" 
}

export type PlaidLinkTokenResult = 
  | { ok: true; linkToken: string }
  | PlaidNotConfiguredError
  | InternalError;

export type PlaidExchangeResult = 
  | { ok: true; itemId: string }
  | PlaidNotConfiguredError
  | PlaidValidationError<{ public_token: "required" }>
  | InternalError;

export type PlaidAccountsResult = 
  | { ok: true; itemId: string; accounts: SafeAccount[] }
  | PlaidNotConfiguredError
  | PlaidValidationError<{ item_id: "required" }>
  | NotFoundError
  | InternalError;

