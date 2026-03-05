export interface SessionStorePort {
  createSession(params: { 
    userId: string; 
    ttlSeconds: number 
  }): Promise<{ sid: string; expiresAtUtc: string }>;
  
  resolveSession(params: { sid: string }): Promise<{ userId: string } | null>;
  deleteSession(params: { sid: string }): Promise<void>;
}