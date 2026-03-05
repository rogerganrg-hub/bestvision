import crypto from "node:crypto";

type AesGcmPayload = {
  v: 1;
  alg: "AES-256-GCM";
  iv_b64: string;
  tag_b64: string;
  ct_b64: string;
};

export class CryptoBox {
  private readonly key: Buffer;

  constructor(params: { key32Bytes: Buffer }) {
    if (params.key32Bytes.length !== 32) {
      throw new Error(`CryptoBox: key must be 32 bytes, got ${params.key32Bytes.length}`);
    }
    this.key = params.key32Bytes;
  }

  encrypt(plaintext: string): string {
    const iv = crypto.randomBytes(12); // recommended length for GCM
    const cipher = crypto.createCipheriv("aes-256-gcm", this.key, iv);

    const ct = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
    const tag = cipher.getAuthTag();

    const payload: AesGcmPayload = {
      v: 1,
      alg: "AES-256-GCM",
      iv_b64: iv.toString("base64"),
      tag_b64: tag.toString("base64"),
      ct_b64: ct.toString("base64"),
    };

    return Buffer.from(JSON.stringify(payload), "utf8").toString("base64");
  }

  decrypt(payloadB64: string): string {
    const raw = Buffer.from(payloadB64, "base64").toString("utf8");
    const payload = JSON.parse(raw) as AesGcmPayload;

    if (payload.v !== 1 || payload.alg !== "AES-256-GCM") {
      throw new Error("CryptoBox: unsupported payload");
    }

    const iv = Buffer.from(payload.iv_b64, "base64");
    const tag = Buffer.from(payload.tag_b64, "base64");
    const ct = Buffer.from(payload.ct_b64, "base64");

    const decipher = crypto.createDecipheriv("aes-256-gcm", this.key, iv);
    decipher.setAuthTag(tag);

    const pt = Buffer.concat([decipher.update(ct), decipher.final()]);
    return pt.toString("utf8");
  }
}