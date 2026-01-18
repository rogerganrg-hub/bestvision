// apps/backend/src/usecases/health_uc.js
export function healthUc(ctx) {
  return { ok: true, service: "backend", version: ctx.build.version };
}
