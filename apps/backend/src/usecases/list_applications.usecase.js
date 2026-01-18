// apps/backend/src/usecases/list_applications.usecase.js

function clampInt(n, { min, max, fallback }) {
  const x = Number(n);
  if (!Number.isFinite(x)) return fallback;
  const i = Math.trunc(x);
  if (i < min) return min;
  if (i > max) return max;
  return i;
}

/**
 * @param {any} ctx
 * @param {{ limit?: number | string }} input
 */
export async function listApplications(ctx, input) {
  const limit = clampInt(input?.limit, { min: 1, max: 100, fallback: 20 });

  const items = await ctx.repos.application.listLatest(limit);

  return {
    ok: true,
    items,
    limit,
  };
}
