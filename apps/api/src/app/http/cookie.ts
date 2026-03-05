export function buildSetCookie(params: {
  name: string;
  value: string;
  httpOnly: boolean;
  secure: boolean;
  sameSite: "Lax" | "Strict" | "None";
  path?: string;
  maxAgeSeconds?: number;
}): string {
  const parts: string[] = [];
  parts.push(`${params.name}=${encodeURIComponent(params.value)}`);
  parts.push(`Path=${params.path ?? "/"}`);
  if (params.httpOnly) parts.push("HttpOnly");
  if (params.secure) parts.push("Secure");
  parts.push(`SameSite=${params.sameSite}`);
  if (params.maxAgeSeconds !== undefined) parts.push(`Max-Age=${params.maxAgeSeconds}`);
  return parts.join("; ");
}

export function buildClearCookie(params: { name: string; path?: string }): string {
  return `${params.name}=; Path=${params.path ?? "/"}; Max-Age=0; HttpOnly; SameSite=Lax`;
}