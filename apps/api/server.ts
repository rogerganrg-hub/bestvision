// apps/api/server.ts
import "dotenv/config";
import express, { type Request, type Response, type NextFunction } from "express";
// import { v1Router } from "./routes/v1.js";
import { createV1Router } from "./routes/v1.js";
import { createAppCtx } from "./src/ctx/app-ctx.js";
import { open_config, fingerprintKey } from "./src/ctx/open_config.js";

import { assemble_sqlite3_db } from "./src/assembly/assemble_db.js";
import { assemble_cryptobox, assemble_token_vault, assemble_session_store } from "./src/assembly/assemble_security.js";
import { mount_auth_routes } from "./src/app/http/express_adapter.js";
import { open_auth_session } from "./src/ctx/auth_session.js"; // ✅新增

const app = express();
app.use(express.json());

const cfg = open_config();

const db = await assemble_sqlite3_db(cfg);
const cryptobox = assemble_cryptobox(cfg);
const tokenVault = assemble_token_vault(db, cryptobox);
const sessionStore = assemble_session_store(db);

// 可选：仅输出指纹用于排错（不泄露）
console.log(`[config] env=${cfg.nodeEnv} db=${cfg.dbPath} encKeyFp=${fingerprintKey(cfg.bvEncryptionKey32)}`);

// 每请求 ctx（冻结）——提前，且把 auth session 挂到 ctx
app.use(async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.ctx = createAppCtx();

    if (!req.ctx?.repos?.application) {
      throw new Error("ctx missing repos.application");
    }

    // ✅把 auth session 统一解析进 ctx（之后 v1 路由都能用）
    // 你可以把结果挂到 req.ctx.auth（建议你在 AppCtx 上加字段）
    req.ctx.auth = await open_auth_session({
      headers: req.headers as any,
      sessionStore,
    });

    res.setHeader("X-Request-Id", req.ctx.requestId);
    res.locals.debugEchoRequestId = process.env.DEBUG_ECHO_REQUEST_ID === "1";
    next();
  } catch (e) {
    next(e);
  }
});

// ✅ auth routes 也纳入 /api/v1 体系
const authRouter = mount_auth_routes({ tokenVault, sessionStore });
app.use("/api/v1", authRouter);

// legacy /health（过渡保留）
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ ok: true, service: "api", version: "v1", legacy: true });
});

const v1Router = createV1Router({ tokenVault });
app.use("/api/v1", v1Router);

app.use((err: unknown, req: Request, res: Response, _next: NextFunction) => {
  req?.ctx?.logger?.error?.("unhandled-error", err);
  res.status(500).json({ ok: false, error: "internal-error", version: "v1" });
});

const port = process.env.PORT ? Number(process.env.PORT) : 4000;

const server = app.listen(port, "127.0.0.1", () => {
  console.log(`api listening on ${port}`);
});

server.on("error", (err: unknown) => {
  console.error("server listen error:", err);
  process.exit(1);
});