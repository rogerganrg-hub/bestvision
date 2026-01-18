import { request } from "node:http";
import crypto from "node:crypto";
import sqlite3 from "sqlite3";

// === Config: 按需改 ===
const BACKEND_BASE = "http://localhost:3000";
const DB_PATH = "D:/bestvision/apps/backend/data/bestvision.sqlite"; // Windows 用正斜杠更稳

function httpPost(path, bodyObj) {
  const body = JSON.stringify(bodyObj);

  return new Promise((resolve, reject) => {
    const req = request(
      BACKEND_BASE + path,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(body),
        },
      },
      (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => {
          resolve({
            status: res.statusCode ?? 0,
            headers: res.headers,
            body: data,
          });
        });
      }
    );

    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

function dbGet(sql, params = []) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(DB_PATH, sqlite3.OPEN_READONLY, (err) => {
      if (err) return reject(err);
    });

    db.get(sql, params, (err, row) => {
      db.close();
      if (err) return reject(err);
      resolve(row);
    });
  });
}

(async () => {
  const email = `audit_${crypto.randomUUID().replaceAll("-", "")}@example.com`;

  console.log("1) Create application via HTTP...");
  const res = await httpPost("/api/v1/applications", { name: "AuditTest", email });

  if (![200, 201].includes(res.status)) {
    console.error("Unexpected status:", res.status);
    console.error(res.body);
    process.exit(1);
  }

  const json = JSON.parse(res.body);
  const rid = res.headers["x-request-id"];
  const appId = json.applicationId;

  console.log("   applicationId =", appId);
  console.log("   x-request-id  =", rid);

  if (!rid) throw new Error("Missing x-request-id header");
  if (!appId) throw new Error("Missing applicationId in response body");

  console.log("2) Query audit_events by request_id...");
  const row = await dbGet(
    `
    SELECT
      audit_id,
      timestamp_utc,
      request_id,
      actor_type,
      actor_id,
      action,
      resource_type,
      resource_id,
      result,
      reason_code,
      meta_json
    FROM audit_events
    WHERE request_id = ?
    ORDER BY timestamp_utc DESC
    LIMIT 1
    `,
    [rid]
  );

  if (!row) {
    throw new Error(`No audit event found for request_id=${rid}`);
  }

  console.log("3) Found audit event:");
  console.log(row);

  // 最小断言：requestId 对齐 + action/resourceId 合理
  if (row.request_id !== rid) throw new Error("Mismatch: request_id not equal to x-request-id");
  if (row.action !== "application.create") throw new Error(`Unexpected action: ${row.action}`);
  if (row.resource_id !== appId) throw new Error(`Unexpected resource_id: ${row.resource_id} (expected ${appId})`);

  console.log("\nPASS: audit write exists and requestId/resourceId align.");
})().catch((e) => {
  console.error("FAIL:", e?.message ?? e);
  process.exit(1);
});
