// apps/api/ctx/logger.js
export type LogMeta = Record<string, unknown>;

export interface Logger {
  info(event: string, meta?: LogMeta): void;
  warn(event: string, meta?: LogMeta): void;
  error(event: string, err?: unknown, meta?: LogMeta): void;
}

export function makeLogger(sink: Pick<Console, "log" | "warn" | "error">, requestId: string): Logger {
  const base = { requestId };

  return {
    info(event, meta) {
      sink.log(event, meta ? { ...base, ...meta } : base);
    },
    warn(event, meta) {
      sink.warn(event, meta ? { ...base, ...meta } : base);
    },
    error(event, err, meta) {
      // err 单独字段，避免把 Error 对象 merge 进 meta 时丢栈
      sink.error(event, meta ? { ...base, ...meta, err } : { ...base, err });
    },
  };
}

