// apps/api/src/usecases/health-uc.js

export function healthUc(ctx) {
  return { ok: true, service: "api", version: ctx.build.version };
}
