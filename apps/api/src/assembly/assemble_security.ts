// apps/api/src/assembly/assemble_security.ts
import { CryptoBox } from "../infra/security/cryptobox.js";
import { Sqlite3Db } from "../infra/db/sqlite3_db.js";
import { TokenVaultRepoSqlite3 } from "../infra/repos/token_vault_repo_sqlite3.js";
import { SessionStoreRepoSqlite3 } from "../infra/repos/session_store_repo_sqlite3.js";
import { TokenVaultPort } from "../types/ports/token_vault_port.js";
import { SessionStorePort } from "../types/ports/session_store_port.js";
import type { AppConfig } from "../ctx/open_config.ts";

function decodeKey32FromEnv(name: string): Buffer {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env ${name}`);
  const buf = Buffer.from(v, "base64");
  if (buf.length !== 32) throw new Error(`${name} must be base64 of 32 bytes`);
  return buf;
}

export function assemble_cryptobox(cfg: AppConfig): CryptoBox {
  return new CryptoBox({ key32Bytes: cfg.bvEncryptionKey32 });
}

export function assemble_token_vault(db: Sqlite3Db, cryptobox: CryptoBox): TokenVaultPort {
  return new TokenVaultRepoSqlite3(db, cryptobox);
}

export function assemble_session_store(db: Sqlite3Db): SessionStorePort {
  return new SessionStoreRepoSqlite3(db);
}