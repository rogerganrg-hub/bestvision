// apps/api/src/infra/repos/token_vault_repo_sqlite3.ts
import { CryptoBox } from "../security/cryptobox.js";
import { Sqlite3Db, get, run } from "../db/sqlite3_db.js";
import type { ProviderId, TokenVaultPort } from "../../types/ports/token_vault_port.js";

type RowLegacy = {
  refresh_enc: string;
  meta_json: string | null;
};

type TokenRow = {
  token_enc: string;
  meta_json: string;
  resource_id: string;
};

function safeJsonParse(v: string | null | undefined): any {
  if (!v) return {};
  try {
    return JSON.parse(v);
  } catch {
    return {};
  }
}

export class TokenVaultRepoSqlite3 implements TokenVaultPort {
  constructor(
    private readonly db: Sqlite3Db,
    private readonly cryptobox: CryptoBox
  ) {}

  async putRefresh(params: Parameters<TokenVaultPort["putRefresh"]>[0]) { 
    const { userId, provider, refreshToken, meta } = params;

    return this.putToken({ 
      userId, 
      provider, 
      tokenKind: "refresh", 
      token: refreshToken, 
      resourceId: "", 
      meta 
    });
  }

  async getRefresh({ userId, provider }: { userId: string; provider: ProviderId }) {
    const r = await this.getToken({ 
      userId, 
      provider, 
      tokenKind: "refresh", 
      resourceId: "" 
    });
    
    return r ? { refreshToken: r.token, meta: r.meta } : null;
  }
  
  async deleteRefresh(params: Parameters<TokenVaultPort["deleteRefresh"]>[0]): Promise<void> {
    const { userId, provider } = params;

    await run(
      this.db, 
      `
      delete from token_store 
      where user_id = ? and provider = ? and token_kind = ? and resource_id = ? 
      `, 
      [userId, provider, "refresh", ""]
    );
  }

  async putToken(params: Parameters<TokenVaultPort["putToken"]>[0]): Promise<void> { 
    const { userId, provider, tokenKind, token, resourceId, meta, } = params; 

    const safeResourceId = resourceId ?? ""; 
    const safeMeta = meta ?? {}; 
    
    const token_enc = this.cryptobox.encrypt(token); 
    const meta_json = JSON.stringify(safeMeta); 
    this.db.run(
      ` 
        INSERT INTO token_store (user_id, provider, token_kind, resource_id, token_enc, meta_json) 
        VALUES (?, ?, ?, ?, ?, ?) ON CONFLICT(user_id, provider, token_kind, resource_id) 
        DO UPDATE SET 
        token_enc=excluded.token_enc, 
        meta_json=excluded.meta_json, 
        updated_at_utc=strftime('%Y-%m-%dT%H:%M:%fZ','now') 
      `,
      [userId, provider, tokenKind, safeResourceId, token_enc, meta_json]
    );
  }

  async getToken(params: Parameters<TokenVaultPort["getToken"]>[0]): Promise<{ token: string; meta: any } | null> {
    const {userId, provider, tokenKind, resourceId } = params; 

    const safeResourceId = resourceId ?? "";

    const row = await get<TokenRow>(
      this.db,
      `
      SELECT token_enc, meta_json
      FROM token_store
      WHERE user_id = ? AND provider = ? AND token_kind = ? AND resource_id = ?
      `,
      [userId, provider, tokenKind, safeResourceId]
    );

    if (!row) 
      return null;

    const token = this.cryptobox.decrypt(row.token_enc);
    let meta: any = {};
    try {
      meta = row.meta_json ? JSON.parse(row.meta_json) : {};
    } catch {
      meta = {};
    }

    return { token, meta };
  }

  async hasAnyToken(params: Parameters<TokenVaultPort["hasAnyToken"]>[0]) { 
    const {userId, provider, tokenKind} = params;

    const row = await get<{ ok: number }>(
      this.db, 
      `
      SELECT 1 AS ok
      FROM token_store
      WHERE user_id=? AND provider=? AND token_kind=?
      LIMIT 1
      `, 
      [userId, provider, tokenKind]
    );
    return !!row?.ok;
  }
  
  async deleteToken(params: Parameters<TokenVaultPort["deleteToken"]>[0]) {
    const { userId, provider, tokenKind, resourceId } = params;
    const safeResourceId = resourceId ?? "";

    await run(
      this.db,
      `
      DELETE FROM token_store
      WHERE user_id=? AND provider=? AND token_kind=? AND resource_id=?
      `,
      [userId, provider, tokenKind, safeResourceId]
    )
  }

  async putRefresh_legacy(params: {
    userId: string;
    provider: ProviderId;
    refreshToken: string;
    meta?: Record<string, any>;
  }): Promise<void> {
    return this.putToken({ userId: params.userId, provider: params.provider, tokenKind: "refresh", token: params.refreshToken, resourceId: "", meta: params.meta });
    
    const refreshEnc = this.cryptobox.encrypt(params.refreshToken);
    const metaJson = params.meta ? JSON.stringify(params.meta) : null;

    await run(
      this.db,
      `
      INSERT INTO token_store(user_id, provider, refresh_enc, meta_json, updated_at_utc)
      VALUES (?, ?, ?, ?, ?)
      ON CONFLICT(user_id, provider) DO UPDATE SET
        refresh_enc=excluded.refresh_enc,
        meta_json=excluded.meta_json,
        updated_at_utc=excluded.updated_at_utc
      `,
      [params.userId, params.provider, refreshEnc, metaJson, new Date().toISOString()]
    );
  }

  async getRefresh_legacy(params: {
    userId: string;
    provider: ProviderId;
  }): Promise<{ refreshToken: string; meta: any } | null> {
    const row = await get<RowLegacy>(
      this.db,
      `SELECT refresh_enc, meta_json FROM token_store WHERE user_id=? AND provider=?`,
      [params.userId, params.provider]
    );
    if (!row) return null;

    const refreshToken = this.cryptobox.decrypt(row.refresh_enc);
    const meta = row.meta_json ? JSON.parse(row.meta_json) : null;
    return { refreshToken, meta };
  }

  async deleteRefresh_legacy(params: { userId: string; provider: ProviderId }): Promise<void> {
    await run(this.db, `DELETE FROM token_store WHERE user_id=? AND provider=?`, [params.userId, params.provider]);
  }
}