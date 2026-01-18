// apps/backend/src/usecases/time_uc.js
export function timeUc(ctx) {
  return { ok: true, now: ctx.clock.nowIso() };
}

