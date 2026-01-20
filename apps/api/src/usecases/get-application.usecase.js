// apps/api/src/usecases/get-application.usecase.js

/**
 * @param {any} ctx
 * @param {{ applicationId: string }} input
 * @returns {Promise<
 *   | { ok: true, application: {
 *       applicationId: string, name: string, email: string, status: string, createdAt: string
 *     }}
 *   | { ok: false, error: "not_found" }
 * >}
 */
export async function getApplication(ctx, input) {
  const { applicationId } = input;

  // 最小校验（可选，但推荐：避免空字符串造成误判）
  if (!applicationId || typeof applicationId !== "string") {
    // 这里不引入新错误契约，routes 层可以把它当 not_found 或 400
    return { ok: false, error: "not_found" };
  }

  const app = await ctx.repos.application.getById(applicationId);

  if (!app) {
    return { ok: false, error: "not_found" };
  }

  return { ok: true, application: app };
}
