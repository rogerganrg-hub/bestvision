// apps/backend/src/usecases/version_uc.js
export function versionUc(ctx) {
  return { ok: true, version: ctx.build.version, build: ctx.build.build };
}

