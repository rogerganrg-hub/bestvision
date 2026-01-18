// apps/backend/ctx/logger.js

function safeJson(v) {
  try {
    return JSON.stringify(v);
  } catch {
    return '"<unserializable>"';
  }
}

function fmtMeta(meta) {
  if (!meta) return "";
  if (typeof meta === "string") return ` meta=${safeJson({ msg: meta })}`;
  if (meta instanceof Error) {
    return ` meta=${safeJson({ name: meta.name, message: meta.message, stack: meta.stack })}`;
  }
  return ` meta=${safeJson(meta)}`;
}

function line(level, requestId, msg, meta) {
  const ts = new Date().toISOString();
  const rid = requestId || "-";
  return `${ts} level=${level} rid=${rid} msg=${safeJson(msg)}${fmtMeta(meta)}`;
}

/**
 * makeLogger(console, requestId)
 * - 冻结日志格式：ts level rid msg meta
 * - 便于 grep / 生产日志系统解析
 */
export function makeLogger(sink, requestId) {
  return {
    info: (msg, meta) => sink.log(line("info", requestId, msg, meta)),
    warn: (msg, meta) => sink.warn(line("warn", requestId, msg, meta)),
    error: (msg, meta) => sink.error(line("error", requestId, msg, meta)),
  };
}
