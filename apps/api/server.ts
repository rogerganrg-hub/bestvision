// apps/api/server.ts
import "dotenv/config";
import express, { type Request, type Response, type NextFunction } from "express";
import { v1Router } from "./routes/v1.js";
import { createAppCtx } from "./src/ctx/app-ctx.js";

const app = express();
app.use(express.json());

// 每请求 ctx（冻结）
app.use((req: Request, res: Response, next: NextFunction) => {
  req.ctx = createAppCtx();

  // 合同不满足就立刻炸在入口（可读）
  if (!req.ctx?.repos?.application) {
    throw new Error("ctx missing repos.application");
  }

  res.setHeader("X-Request-Id", req.ctx.requestId);
  res.locals.debugEchoRequestId = process.env.DEBUG_ECHO_REQUEST_ID === "1";
  next();
});

// legacy /health（过渡保留）
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ ok: true, service: "api", version: "v1", legacy: true });
});

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
