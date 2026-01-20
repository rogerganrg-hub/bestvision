// apps/api/src/usecases/time-uc.js

export function timeUc(ctx) {
  return { ok: true, now: ctx.clock.nowIso() };
}

