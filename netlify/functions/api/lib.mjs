// Shared helpers for Aedes Dei HQ: storage (Netlify Blobs), sessions, passwords, small utilities.
import { getStore } from "@netlify/blobs";
import crypto from "node:crypto";

export const store = () => getStore({ name: "ad-hq", consistency: "strong" });

export const json = (data, status = 200, headers = {}) =>
  new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...headers } });
export const err = (status, code, message) => json({ error: code, message: message || code }, status);
export const b64u = (buf) => Buffer.from(buf).toString("base64url");
export const clip = (v, n = 4000) => (typeof v === "string" ? v.trim().slice(0, n) : v == null ? "" : String(v).slice(0, n));
export const isObj = (v) => v && typeof v === "object" && !Array.isArray(v);
export const now = () => new Date().toISOString();

// Readable short codes for requests, e.g. "K7Q2MX" (shown as AD-K7Q2MX in email subjects)
const ALPH = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
export const code = (n = 6) => Array.from(crypto.randomBytes(n), (b) => ALPH[b % ALPH.length]).join("");
export const rid = () => Date.now().toString(36) + crypto.randomBytes(4).toString("hex");

// ---------- documents: one blob per document at d/<collection>/<id> ----------
export const docKey = (c, id) => `d/${c}/${encodeURIComponent(id)}`;
export async function readCol(c) {
  const s = store(), pre = `d/${c}/`, out = {};
  const { blobs } = await s.list({ prefix: pre });
  await Promise.all(blobs.map(async (b) => {
    const v = await s.get(b.key, { type: "json" });
    if (v) out[decodeURIComponent(b.key.slice(pre.length))] = v;
  }));
  return out;
}
export const getDoc = (c, id) => store().get(docKey(c, id), { type: "json" });
export const putDoc = (c, id, v) => store().setJSON(docKey(c, id), v);
export const delDoc = (c, id) => store().delete(docKey(c, id));

// read-modify-write with optimistic locking
export async function mutate(key, fn, fallback = null) {
  const s = store();
  for (let i = 0; i < 6; i++) {
    const cur = await s.getWithMetadata(key, { type: "json" });
    if (!cur && fallback === null) return null;
    const data = cur ? cur.data : structuredClone(fallback);
    const out = await fn(data);
    const res = cur ? await s.setJSON(key, out, { onlyIfMatch: cur.etag }) : await s.setJSON(key, out, { onlyIfNew: true });
    if (res && res.modified !== false) return out;
    await new Promise((r) => setTimeout(r, 60 + Math.random() * 140));
  }
  throw new Error("busy");
}
export const mutateDoc = (c, id, fn) => mutate(docKey(c, id), fn);

export async function getJSON(key, fb = null) { return (await store().get(key, { type: "json" })) ?? fb; }
export const setJSON = (key, v) => store().setJSON(key, v);

// ---------- secrets, passwords, sessions ----------
export async function secret() {
  if (process.env.AD_SECRET) return process.env.AD_SECRET;
  const s = store();
  let v = await s.get("cfg/secret");
  if (!v) { await s.set("cfg/secret", crypto.randomBytes(32).toString("hex"), { onlyIfNew: true }); v = await s.get("cfg/secret"); }
  return v;
}
export function hashPw(pw) {
  const salt = crypto.randomBytes(16).toString("hex");
  return { salt, hash: crypto.scryptSync(pw, salt, 32, { N: 16384, r: 8, p: 1 }).toString("hex") };
}
export function checkPw(pw, rec) {
  if (typeof pw !== "string" || !rec || !rec.salt) return false;
  const h = crypto.scryptSync(pw, rec.salt, 32, { N: 16384, r: 8, p: 1 });
  return crypto.timingSafeEqual(h, Buffer.from(rec.hash, "hex"));
}
export const pwOk = (pw) => typeof pw === "string" && pw.length >= 8 && pw.length <= 200;
export async function sign(payload) {
  const body = b64u(JSON.stringify(payload));
  return body + "." + b64u(crypto.createHmac("sha256", await secret()).update(body).digest());
}
export async function unsign(tok) {
  const [body, mac] = String(tok || "").split(".");
  if (!body || !mac) return null;
  const want = b64u(crypto.createHmac("sha256", await secret()).update(body).digest());
  if (want.length !== mac.length || !crypto.timingSafeEqual(Buffer.from(want), Buffer.from(mac))) return null;
  try { const p = JSON.parse(Buffer.from(body, "base64url").toString()); return p && p.exp > Date.now() ? p : null; } catch { return null; }
}
// brute-force protection per IP (10 failures / 15 min)
export async function limited(ip, fail) {
  const key = "rl/" + crypto.createHash("sha256").update(ip || "x").digest("hex").slice(0, 24);
  const r = (await getJSON(key)) || { n: 0, t: Date.now() };
  if (Date.now() - r.t > 15 * 60 * 1000) { r.n = 0; r.t = Date.now(); }
  if (fail) { r.n++; await setJSON(key, r); }
  return r.n >= 10;
}

// ---------- activity log (last 400 entries) ----------
export async function log(by, what, ref = "") {
  try {
    await mutate("cfg/activity", (a) => { a.unshift({ at: now(), by: by || "", what, ref }); return a.slice(0, 400); }, []);
  } catch { /* logging never blocks */ }
}
