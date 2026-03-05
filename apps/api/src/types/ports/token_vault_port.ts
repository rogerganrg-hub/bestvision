// apps/api/src/types/ports/token_vault_port.ts
export type ProviderId = "plaid" | "schwab" | "openfigi" | "internal";
export type TokenKind = "refresh" | "item_access";

export interface TokenVaultPort {
  putRefresh(params: {
    userId: string;
    provider: ProviderId;
    refreshToken: string;
    meta?: Record<string, any>;
  }): Promise<void>;

  getRefresh(params: {
    userId: string;
    provider: ProviderId;
  }): Promise<{ refreshToken: string; meta: any } | null>;

  deleteRefresh(params: {
    userId: string;
    provider: ProviderId;
  }): Promise<void>;

  // new
  putToken(params: {
    userId: string;
    provider: ProviderId;
    tokenKind: TokenKind;
    token: string;
    resourceId?: string; // for Plaid: item_id
    meta?: Record<string, any>;
  }): Promise<void>;

  getToken(params: {
    userId: string;
    provider: ProviderId;
    tokenKind: TokenKind;
    resourceId?: string;
  }): Promise<{ token: string; meta: any } | null>;

  deleteToken(params: {
    userId: string;
    provider: ProviderId;
    tokenKind: TokenKind;
    resourceId?: string;
  }): Promise<void>;

  // ✅ convenience: for v1 "linked?" check
  hasAnyToken(params: { userId: string; provider: ProviderId; tokenKind: TokenKind }): Promise<boolean>;
}