CREATE TABLE IF NOT EXISTS schema_migrations (
  version TEXT PRIMARY KEY,
  filename TEXT NOT NULL,
  applied_at_utc TEXT NOT NULL,
  checksum TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS token_store (
  user_id TEXT NOT NULL,
  provider TEXT NOT NULL,
  token_enc TEXT NOT NULL,
  token_kind TEXT NOT NULL DEFAULT 'refresh',
  resource_id TEXT NOT NULL DEFAULT '', -- Plaid item_id, Schwab account_id, etc.
  meta_json TEXT DEFAULT '{}',
  updated_at_utc TEXT NOT NULL,
  PRIMARY KEY (user_id, provider, token_kind, resource_id)
);
CREATE INDEX IF NOT EXISTS idx_token_store_lookup ON token_store (user_id, provider, token_kind);

CREATE TABLE IF NOT EXISTS session_store (
  sid TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  expires_at_utc TEXT NOT NULL,
  created_at_utc TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_session_store_user_id ON session_store(user_id);
CREATE INDEX IF NOT EXISTS idx_session_store_expires ON session_store(expires_at_utc);
