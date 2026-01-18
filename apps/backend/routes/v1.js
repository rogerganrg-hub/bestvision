// apps/backend/routes/v1.js
import express from "express";
import { CreateApplicationUseCase } from "../src/usecases/create_application.usecase.js";
import { getApplication } from "../src/usecases/get_application.usecase.js";
import { listApplications } from "../src/usecases/list_applications.usecase.js";

export const v1Router = express.Router();

/**
 * dev-only: echo requestId into JSON response body for easy copy/debug
 * controlled by server.js -> res.locals.debugEchoRequestId
 */
function withMeta(req, res, obj) {
  if (res?.locals?.debugEchoRequestId) {
    return { ...obj, requestId: req?.ctx?.requestId };
  }
  return obj;
}

v1Router.post("/applications", async (req, res) => {
  const ctx = req.ctx;

  try {
    const result = await CreateApplicationUseCase(ctx, req.body);

    if (!result.ok && result.error === "validation_error") {
      return res.status(400).json(
        withMeta(req, res, {
          ok: false,
          error: "validation_error",
          fields: result.fields,
          version: "v1",
        })
      );
    }

    // createApplication 现在只返回 ok:true 或 validation_error
    // 这里仍保留兜底逻辑，避免未来扩展时漏处理
    if (!result.ok) {
      return res.status(500).json(
        withMeta(req, res, {
          ok: false,
          error: "internal_error",
          version: "v1",
        })
      );
    }

    ctx.logger?.info?.("application created", { applicationId: result.applicationId });

    return res.status(200).json(
      withMeta(req, res, {
        ok: true,
        applicationId: result.applicationId,
        status: result.status,
        received: result.received,
        version: "v1",
      })
    );
  } catch (err) {
    ctx?.logger?.error?.("POST /api/v1/applications failed", err);
    return res.status(500).json(
      withMeta(req, res, {
        ok: false,
        error: "internal_error",
        version: "v1",
      })
    );
  }
});

v1Router.get("/applications", async (req, res) => {
  const ctx = req.ctx;

  try {
    const limit = req.query.limit; // string | undefined
    const result = await listApplications(ctx, { limit });

    ctx.logger?.info?.("applications listed", { limit: result.limit, count: result.items.length });

    return res.status(200).json(
      withMeta(req, res, {
        ok: true,
        items: result.items,
        limit: result.limit,
        version: "v1",
      })
    );
  } catch (err) {
    ctx?.logger?.error?.("GET /api/v1/applications failed", err);
    return res.status(500).json(
      withMeta(req, res, {
        ok: false,
        error: "internal_error",
        version: "v1",
      })
    );
  }
});

v1Router.get("/applications/:id", async (req, res) => {
  const ctx = req.ctx;

  try {
    const applicationId = req.params.id;
    const result = await getApplication(ctx, { applicationId });

    if (!result.ok) {
      return res.status(404).json(
        withMeta(req, res, {
          ok: false,
          error: "not_found",
          version: "v1",
        })
      );
    }

    ctx.logger?.info?.("application fetched", { applicationId });

    return res.status(200).json(
      withMeta(req, res, {
        ok: true,
        application: result.application,
        version: "v1",
      })
    );
  } catch (err) {
    ctx?.logger?.error?.("GET /api/v1/applications/:id failed", err);
    return res.status(500).json(
      withMeta(req, res, {
        ok: false,
        error: "internal_error",
        version: "v1",
      })
    );
  }
});
