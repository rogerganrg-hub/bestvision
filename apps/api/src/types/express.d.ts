import type { AppCtx } from "../ctx/app-ctx.js";

declare global {
  namespace Express {
    interface Request {
      ctx: AppCtx;
    }

    interface Locals {
      debugEchoRequestId?: boolean;
    }
  }
}

export {};
