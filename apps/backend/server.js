// apps/backend/server.js
import "dotenv/config";
import express from "express";
import { v1Router } from "./routes/v1.js";
import { createAppCtx } from "./src/ctx/app_ctx.js";

const app = express();
app.use(express.json());

// 每请求 ctx（冻结）
app.use((req, res, next) => {
  req.ctx = createAppCtx();
  // 开发期断言：合同不满足就立刻炸在入口（可读）
  if (!req.ctx?.repos?.application) {
    throw new Error("ctx missing repos.application");
  }

  res.setHeader("X-Request-Id", req.ctx.requestId);
  // ✅ dev-only：给 res.locals 放一个开关
  res.locals.debugEchoRequestId = process.env.DEBUG_ECHO_REQUEST_ID === "1";

  next();
});

// legacy /health（过渡保留）
app.get("/health", (_req, res) => {
  res.status(200).json({ ok: true, service: "backend", version: "v1", legacy: true });
});

app.use("/api/v1", v1Router);

app.use((err, req, res, _next) => {
  req?.ctx?.logger?.error?.("unhandled_error", err);
  res.status(500).json({ ok: false, error: "internal_error", version: "v1" });
});

const port = process.env.PORT ? Number(process.env.PORT) : 4000;

const server = app.listen(port, "127.0.0.1", () => {
  console.log(`backend listening on ${port}`);
});

server.on("error", (err) => {
  console.error("server listen error:", err);
  process.exit(1);
});
