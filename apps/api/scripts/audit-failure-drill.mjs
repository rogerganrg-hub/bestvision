// apps/api/scripts/audit-failure-drill.mjs
import crypto from "node:crypto";
import sqlite3 from "sqlite3";
import { request } from "node:http";

const API_BASE = process.env.API_BASE ?? "http://localhost:3000";
const DB_PATH = "D:/bestvision/apps/api/data/bestvision.sqlite";

function httpPost(path, bodyObj) {
  const body = JSON.stringify(bodyObj);

  return new Promise((resolve, reject) => {
    const req = request(
      API_BASE + path,
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
  console.log("NOTE: Run api with AUDIT_FORCE_FAIL=1 before this drill.");
  console.log("APIBase:", API_BASE);
  console.log("1) Create application via HTTP (should still succeed) ...");

  const email = `drill_${crypto.randomUUID().replaceAll("-", "")}@example.com`;
  const res = await httpPost("/api/v1/applications", { name: "AuditDrill", email });

  if (![200, 201].includes(res.status)) {
    console.error("Unexpected status:", res.status);
    console.error("x-request-id :", res.headers["x-request-id"]);
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

  console.log("2) Query audit_events by request_id (should be NONE due to forced failure) ...");
  const row = await dbGet(
    `
    SELECT audit_id, request_id, action, resource_id, result
    FROM audit_events
    WHERE request_id = ?
    LIMIT 1
    `,
    [rid]
  );

  if (row) {
    console.error("FAIL: Found an audit event, but drill expected none.");
    console.error(row);
    process.exit(1);
  }

  console.log("PASS: Business succeeded while audit write failed (no audit row found).");
  console.log("CHECK: API console should show 'audit_write_failed' for this requestId.");
})().catch((e) => {
  console.error("FAIL:", e?.message ?? e);
  process.exit(1);
});
