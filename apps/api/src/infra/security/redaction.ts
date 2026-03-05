const SENSITIVE_KEYS = [
  "token",
  "access_token",
  "refresh_token",
  "secret",
  "authorization",
  "cookie",
  "set-cookie",
  "password",
] as const;

function isSensitiveKey(k: string): boolean {
  const kk = k.toLowerCase();
  return SENSITIVE_KEYS.some((s) => kk.includes(s));
}

export function redact(input: any, depth = 6): any {
  if (depth <= 0) return "[TRUNCATED]";
  if (input === null || input === undefined) return input;

  if (typeof input === "string") {
    // Avoid leaking long secrets even if key missed
    if (input.length > 160) return input.slice(0, 12) + "…[REDACTED]";
    return input;
  }

  if (Array.isArray(input)) return input.map((x) => redact(x, depth - 1));

  if (typeof input === "object") {
    const out: Record<string, any> = {};
    for (const [k, v] of Object.entries(input)) {
      if (isSensitiveKey(k)) out[k] = "***";
      else out[k] = redact(v, depth - 1);
    }
    return out;
  }

  return input;
}

export function safeLog(message: string, obj?: any) {
  if (obj === undefined) {
    console.log(message);
    return;
  }
  console.log(message, JSON.stringify(redact(obj)));
}