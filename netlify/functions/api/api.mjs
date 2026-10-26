// Aedes Dei HQ backend: /api/* (Netlify Function, data in Netlify Blobs).
import crypto from "node:crypto";
import {
  json, err, clip, now, code, rid, readCol, getDoc, putDoc, delDoc, mutateDoc, getJSON, setJSON, mutate,
  hashPw, checkPw, pwOk, sign, unsign, limited, log,
} from "./lib.mjs";
import { mailReady, send, mailNewRequest, mailAppt, indexMsg, syncInbox } from "./mail.mjs";

export const config = { path: "/api/*" };

const ROLES = ["owner", "admin", "member"];
// Accounts with these email addresses are full owners as soon as they sign up (no approval needed).
// Only they can create the very first account. Override with the OWNER_EMAILS environment variable.
const OWNER_EMAILS = (process.env.OWNER_EMAILS || "david.mpieri@renewedtech.de,info@aedesdei.nl").split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);
const isOwnerEmail = (e) => OWNER_EMAILS.includes(String(e || "").trim().toLowerCase());
const COLORS = ["#25394B", "#B99A6B", "#8C7B6B", "#5E7B6F", "#9C6B5E", "#6B6F9C", "#3F6E8C", "#A0845C"];
const TTL = 30 * 864e5;
const isAdmin = (u) => u && (u.role === "owner" || u.role === "admin");
const pub = (u) => u && { id: u.id, name: u.name, email: u.email, role: u.role, title: u.title || "", color: u.color, status: u.status, lastLogin: u.lastLogin || "", created: u.created };
const emailKey = (e) => "idx/e/" + String(e || "").trim().toLowerCase();
const validEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(e || ""));
const D = /^\d{4}-\d{2}-\d{2}$/, TM = /^\d{2}:\d{2}$/;

async function body(req) { try { return await req.json(); } catch { return {}; } }
async function auth(req) {
  const h = req.headers.get("authorization") || "";
  const p = await unsign(h.startsWith("Bearer ") ? h.slice(7) : "");
  if (!p || !p.u) return null;
  const u = await getDoc("users", p.u);
  if (!u || u.status !== "active" || (u.v || 1) !== p.v) return null;
  return u;
}
async function session(u) {
  await mutateDoc("users", u.id, (d) => ({ ...d, lastLogin: now() }));
  return { token: await sign({ u: u.id, v: u.v || 1, exp: Date.now() + TTL }), me: pub(u) };
}
async function userCount() { const all = await readCol("users"); return Object.keys(all).length; }

// ---------- appointment / request / client sanitising ----------
const APPT_TYPES = ["pmo-basis", "pmo-standaard", "pmo-uitgebreid", "intake", "advice", "other"];
function cleanAppt(b, prev = {}) {
  const a = { ...prev };
  for (const k of ["title", "company", "contactName", "contactEmail", "contactPhone", "address", "notes", "requestId", "clientId"]) if (k in b) a[k] = clip(b[k], k === "notes" ? 4000 : 300);
  if ("type" in b) a.type = APPT_TYPES.includes(b.type) ? b.type : "other";
  if ("location" in b) a.location = ["client", "home", "clinic", "online"].includes(b.location) ? b.location : "client";
  if ("status" in b) a.status = ["planned", "done", "cancelled"].includes(b.status) ? b.status : "planned";
  if ("date" in b && D.test(b.date)) a.date = b.date;
  if ("start" in b && TM.test(b.start)) a.start = b.start;
  if ("end" in b && TM.test(b.end)) a.end = b.end;
  if ("participants" in b) a.participants = Math.max(0, Math.min(5000, parseInt(b.participants, 10) || 0));
  if ("staff" in b && Array.isArray(b.staff)) a.staff = b.staff.map(String).slice(0, 20);
  return a;
}
function cleanClient(b, prev = {}) {
  const c = { ...prev };
  for (const k of ["name", "contact", "email", "phone", "address", "employees", "notes", "kvk"]) if (k in b) c[k] = clip(b[k], k === "notes" ? 4000 : 300);
  return c;
}

// ---------- handlers ----------
const R = [];
const route = (m, re, fn, open = false) => R.push({ m, re, fn, open });

// Public: website request form
route("POST", /^request$/, async (req) => {
  const b = await body(req);
  if (b.website || b["bot-field"]) return json({ ok: true }); // honeypot
  const r = {
    company: clip(b.organisatie || b.company, 200), name: clip(b.naam || b.name, 200), email: clip(b.email, 200), phone: clip(b.telefoon || b.phone, 60),
    employees: clip(b.medewerkers || b.employees, 40), package: clip(b.pakket || b.package, 60), location: clip(b.locatie || b.location, 60),
    message: clip(b.bericht || b.message, 6000), lang: b.lang === "en" ? "en" : "nl",
  };
  if (!r.name || !validEmail(r.email)) return err(400, "invalid", "Name and a valid email are required.");
  const ip = req.headers.get("x-nf-client-connection-ip") || "";
  const rk = "rlf/" + crypto.createHash("sha256").update(ip).digest("hex").slice(0, 20);
  const rl = (await getJSON(rk)) || { n: 0, t: Date.now() };
  if (Date.now() - rl.t > 3600e3) { rl.n = 0; rl.t = Date.now(); }
  if (++rl.n > 12) return err(429, "slow-down", "Too many requests.");
  await setJSON(rk, rl);
  let id = code(); while (await getDoc("requests", id)) id = code();
  const doc = { id, source: "website", status: "new", unread: true, ...r, subject: "Offerteaanvraag via website", received: now(), updated: now(), thread: [], notes: [] };
  await putDoc("requests", id, doc);
  await log("website", `Nieuwe aanvraag van ${r.company || r.name}`, id);
  const m = await mailNewRequest(doc);
  return json({ ok: true, id, mailed: m.sent });
}, true);

// Setup + login + signup
route("GET", /^status$/, async () => json({ needsSetup: (await userCount()) === 0, mail: mailReady() }), true);
route("POST", /^setup$/, async (req) => {
  if ((await userCount()) > 0) return err(403, "done", "Setup is already complete.");
  const b = await body(req);
  if (!clip(b.name) || !validEmail(b.email) || !pwOk(b.password)) return err(400, "invalid", "Name, valid email and a password of 8+ characters are required.");
  if (!isOwnerEmail(b.email)) return err(403, "not-owner", "This email address cannot create the first account. Use an owner address.");
  const u = { id: rid(), name: clip(b.name, 120), email: b.email.trim().toLowerCase(), role: "owner", title: clip(b.title, 120), color: COLORS[0], status: "active", v: 1, pw: hashPw(b.password), created: now(), calToken: crypto.randomBytes(18).toString("hex") };
  await putDoc("users", u.id, u); await setJSON(emailKey(u.email), u.id);
  await log(u.name, "HQ ingericht, eigenaar aangemaakt");
  return json(await session(u));
}, true);
route("POST", /^login$/, async (req) => {
  const ip = req.headers.get("x-nf-client-connection-ip") || "";
  if (await limited(ip)) return err(429, "locked", "Too many attempts. Try again in 15 minutes.");
  const b = await body(req);
  const id = await getJSON(emailKey(b.email));
  const u = id && (await getDoc("users", id));
  if (!u || !checkPw(b.password, u.pw)) { await limited(ip, true); await log(String(b.email || "").slice(0, 80), "Mislukte inlogpoging"); return err(401, "bad-login", "Email or password is incorrect."); }
  if (u.status === "pending") return err(403, "pending", "Your account is waiting for approval.");
  if (u.status !== "active") return err(403, "disabled", "This account has been deactivated.");
  await log(u.name, "Ingelogd");
  return json(await session(u));
}, true);
route("GET", /^invite\/([a-f0-9]{32})$/, async (req, m) => {
  const inv = await getJSON("inv/" + m[1]);
  if (!inv || inv.exp < Date.now()) return err(404, "invite-invalid", "This invitation link is no longer valid.");
  return json({ email: inv.email, name: inv.name, role: inv.role });
}, true);
route("POST", /^signup$/, async (req) => {
  const b = await body(req);
  if (!clip(b.name) || !validEmail(b.email) || !pwOk(b.password)) return err(400, "invalid", "Name, valid email and a password of 8+ characters are required.");
  const email = b.email.trim().toLowerCase();
  if (await getJSON(emailKey(email))) return err(409, "exists", "An account with this email already exists.");
  let inv = null;
  if (b.invite) { inv = await getJSON("inv/" + String(b.invite).replace(/[^a-f0-9]/g, "")); if (!inv || inv.exp < Date.now()) inv = null; }
  const all = await readCol("users");
  const u = { id: rid(), name: clip(b.name, 120), email, role: isOwnerEmail(email) ? "owner" : inv ? inv.role : "member", title: clip(b.title, 120), color: COLORS[Object.keys(all).length % COLORS.length], status: inv || isOwnerEmail(email) ? "active" : "pending", v: 1, pw: hashPw(b.password), created: now(), calToken: crypto.randomBytes(18).toString("hex") };
  await putDoc("users", u.id, u); await setJSON(emailKey(email), u.id);
  if (isOwnerEmail(email) && !inv) { await log(u.name, "Eigenaarsaccount aangemaakt"); return json(await session(u)); }
  if (inv) { await setJSON("inv/" + b.invite, { ...inv, exp: 0, used: u.id }); await log(u.name, "Account aangemaakt via uitnodiging"); return json(await session(u)); }
  await log(u.name, "Account aangevraagd (wacht op goedkeuring)");
  return json({ pending: true });
}, true);

// Everything below requires a signed-in account
route("GET", /^boot$/, async (req, m, me) => {
  const [users, requests, appts, clients, settings, sync] = await Promise.all([readCol("users"), readCol("requests"), readCol("appts"), readCol("clients"), getJSON("cfg/settings", {}), getJSON("cfg/mailsync", {})]);
  const out = { me: { ...pub(me), calToken: me.calToken }, users: Object.values(users).map(pub), requests, appts, clients, settings: { templates: settings.templates || null }, mail: { ready: mailReady(), sync: { at: sync.at || "", error: sync.error || "" } } };
  if (isAdmin(me)) {
    out.activity = (await getJSON("cfg/activity", [])).slice(0, 120);
    const invs = await getJSON("cfg/invites", []);
    out.invites = invs.filter((i) => i.exp > Date.now());
  }
  return json(out);
});
route("PATCH", /^me$/, async (req, m, me) => {
  const b = await body(req);
  if (b.newPassword) {
    if (!checkPw(b.password || "", me.pw)) return err(400, "bad-password", "Current password is incorrect.");
    if (!pwOk(b.newPassword)) return err(400, "weak", "Use at least 8 characters.");
  }
  const u = await mutateDoc("users", me.id, (d) => {
    if ("name" in b && clip(b.name)) d.name = clip(b.name, 120);
    if ("title" in b) d.title = clip(b.title, 120);
    if ("color" in b && /^#[0-9a-fA-F]{6}$/.test(b.color)) d.color = b.color;
    if (b.newPassword) { d.pw = hashPw(b.newPassword); d.v = (d.v || 1) + 1; }
    if (b.resetCal) d.calToken = crypto.randomBytes(18).toString("hex");
    return d;
  });
  const out = { me: { ...pub(u), calToken: u.calToken } };
  if (b.newPassword) Object.assign(out, await session(u));
  return json(out);
});

// Requests
route("POST", /^requests$/, async (req, m, me) => {
  const b = await body(req);
  let id = code(); while (await getDoc("requests", id)) id = code();
  const d = { id, source: "manual", status: "open", unread: false, company: clip(b.company, 200), name: clip(b.name, 200), email: clip(b.email, 200), phone: clip(b.phone, 60), employees: clip(b.employees, 40), package: clip(b.package, 60), location: clip(b.location, 60), subject: clip(b.subject, 300) || "Aanvraag", message: clip(b.message, 6000), received: now(), updated: now(), assignee: me.id, thread: [], notes: [], by: me.id };
  await putDoc("requests", id, d); await log(me.name, `Aanvraag toegevoegd: ${d.company || d.name}`, id);
  return json({ request: d });
});
route("PATCH", /^requests\/([A-Z0-9]{6})$/, async (req, m, me) => {
  const b = await body(req);
  const d = await mutateDoc("requests", m[1], (d) => {
    if ("status" in b && ["new", "open", "replied", "scheduled", "closed", "declined"].includes(b.status)) d.status = b.status;
    if ("assignee" in b) d.assignee = clip(b.assignee, 40);
    if ("unread" in b) d.unread = !!b.unread;
    for (const k of ["company", "name", "email", "phone", "employees", "package", "location"]) if (k in b) d[k] = clip(b[k], 200);
    if (b.note) { d.notes = d.notes || []; d.notes.push({ id: rid(), by: me.id, at: now(), text: clip(b.note, 4000) }); }
    if (b.delNote) d.notes = (d.notes || []).filter((n) => n.id !== b.delNote || (n.by !== me.id && !isAdmin(me)));
    if ("clientId" in b) d.clientId = clip(b.clientId, 40);
    d.updated = now(); return d;
  });
  if (!d) return err(404, "not-found");
  if (b.status) await log(me.name, `Status aanvraag → ${b.status}`, m[1]);
  return json({ request: d });
});
route("POST", /^requests\/([A-Z0-9]{6})\/reply$/, async (req, m, me) => {
  const b = await body(req);
  const r = await getDoc("requests", m[1]);
  if (!r) return err(404, "not-found");
  if (!validEmail(r.email)) return err(400, "no-email", "This request has no valid email address.");
  if (!clip(b.text)) return err(400, "empty", "Write a message first.");
  if (!mailReady()) return err(503, "mail-not-configured", "Email is not connected yet (see Settings).");
  const lastIn = [...(r.thread || [])].reverse().find((t) => t.msgId);
  const subj0 = clip(b.subject, 300) || (lastIn && lastIn.subject ? (/^re:/i.test(lastIn.subject) ? lastIn.subject : "Re: " + lastIn.subject) : "Uw aanvraag bij Medisch Centrum Aedes Dei");
  const subject = /\[AD-[A-Z0-9]{6}\]/.test(subj0) ? subj0 : `${subj0} [AD-${r.id}]`;
  const refs = (r.thread || []).map((t) => t.msgId).filter(Boolean).slice(-10);
  let msgId;
  try { msgId = await send({ to: r.email, subject, text: clip(b.text, 20000), lang: r.lang, inReplyTo: lastIn && lastIn.msgId, references: refs }); }
  catch (e) { return err(502, "send-failed", "Sending failed: " + String(e.message || e).slice(0, 200)); }
  await indexMsg(msgId, r.id);
  const d = await mutateDoc("requests", r.id, (d) => { d.thread = d.thread || []; d.thread.push({ dir: "out", at: now(), by: me.id, subject, text: clip(b.text, 20000), msgId }); if (!["scheduled", "closed", "declined"].includes(d.status) || b.status) d.status = b.status || "replied"; d.unread = false; d.updated = now(); return d; });
  await log(me.name, `Antwoord verstuurd aan ${r.email}`, r.id);
  return json({ request: d });
});
route("DELETE", /^requests\/([A-Z0-9]{6})$/, async (req, m, me) => {
  if (!isAdmin(me)) return err(403, "forbidden");
  await delDoc("requests", m[1]); await log(me.name, "Aanvraag verwijderd", m[1]);
  return json({ ok: true });
});

// Appointments
route("POST", /^appts$/, async (req, m, me) => {
  const b = await body(req);
  const a = cleanAppt(b, { id: rid(), status: "planned", by: me.id, created: now(), staff: [] });
  if (!a.date || !a.start || !a.end || !a.title) return err(400, "invalid", "Title, date and times are required.");
  await putDoc("appts", a.id, a);
  if (a.requestId) await mutateDoc("requests", a.requestId, (d) => { d.status = "scheduled"; d.appts = [...new Set([...(d.appts || []), a.id])]; d.updated = now(); return d; });
  let mailed = false, mailError = "";
  if (b.notify && validEmail(a.contactEmail)) {
    try { const id = await mailAppt(a, b.lang); mailed = true; if (a.requestId) { await indexMsg(id, a.requestId); } } catch (e) { mailError = String(e.message || e).slice(0, 200); }
  }
  await log(me.name, `Afspraak gepland: ${a.title} (${a.date})`, a.id);
  return json({ appt: a, mailed, mailError, request: a.requestId ? await getDoc("requests", a.requestId) : null });
});
route("PATCH", /^appts\/([a-z0-9]+)$/, async (req, m, me) => {
  const b = await body(req);
  const a = await mutateDoc("appts", m[1], (d) => ({ ...cleanAppt(b, d), updated: now() }));
  if (!a) return err(404, "not-found");
  let mailed = false, mailError = "";
  if (b.notify && validEmail(a.contactEmail)) { try { await mailAppt(a, b.lang); mailed = true; } catch (e) { mailError = String(e.message || e).slice(0, 200); } }
  await log(me.name, `Afspraak gewijzigd: ${a.title}`, a.id);
  return json({ appt: a, mailed, mailError });
});
route("DELETE", /^appts\/([a-z0-9]+)$/, async (req, m, me) => {
  const a = await getDoc("appts", m[1]);
  await delDoc("appts", m[1]); await log(me.name, `Afspraak verwijderd: ${a ? a.title : m[1]}`);
  return json({ ok: true });
});

// Organisations
route("POST", /^clients$/, async (req, m, me) => {
  const b = await body(req);
  const c = cleanClient(b, { id: rid(), created: now(), by: me.id });
  if (!c.name) return err(400, "invalid", "Name is required.");
  await putDoc("clients", c.id, c);
  if (b.requestId) await mutateDoc("requests", b.requestId, (d) => ({ ...d, clientId: c.id }));
  await log(me.name, `Organisatie toegevoegd: ${c.name}`, c.id);
  return json({ client: c });
});
route("PATCH", /^clients\/([a-z0-9]+)$/, async (req, m, me) => {
  const b = await body(req);
  const c = await mutateDoc("clients", m[1], (d) => cleanClient(b, d));
  return c ? json({ client: c }) : err(404, "not-found");
});
route("DELETE", /^clients\/([a-z0-9]+)$/, async (req, m, me) => {
  if (!isAdmin(me)) return err(403, "forbidden");
  await delDoc("clients", m[1]); return json({ ok: true });
});

// Team
route("POST", /^team\/invite$/, async (req, m, me) => {
  if (!isAdmin(me)) return err(403, "forbidden");
  const b = await body(req);
  if (!validEmail(b.email)) return err(400, "invalid", "Enter a valid email.");
  const role = b.role === "admin" && isAdmin(me) ? "admin" : "member";
  const tok = crypto.randomBytes(16).toString("hex");
  const inv = { token: tok, email: b.email.trim().toLowerCase(), name: clip(b.name, 120), role, by: me.id, exp: Date.now() + 14 * 864e5, at: now() };
  await setJSON("inv/" + tok, inv);
  await mutate("cfg/invites", (a) => [inv, ...a.filter((i) => i.exp > Date.now())].slice(0, 50), []);
  const base = (process.env.SITE_URL || process.env.URL || new URL(req.url).origin).replace(/\/$/, "");
  const link = `${base}/hq/#invite/${tok}`;
  let mailed = false;
  if (mailReady() && b.send !== false) {
    try { await send({ to: inv.email, subject: "Uitnodiging voor Aedes Dei HQ", text: `Hallo${inv.name ? " " + inv.name : ""},\n\n${me.name} nodigt je uit voor Aedes Dei HQ, het teamplatform van Medisch Centrum Aedes Dei.\n\nMaak je account aan via deze link (14 dagen geldig):\n${link}\n\nMet vriendelijke groet,\nMedisch Centrum Aedes Dei` }); mailed = true; } catch { /* link is shown in HQ anyway */ }
  }
  await log(me.name, `Uitnodiging verstuurd aan ${inv.email}`);
  return json({ invite: inv, link, mailed });
});
route("DELETE", /^team\/invite\/([a-f0-9]{32})$/, async (req, m, me) => {
  if (!isAdmin(me)) return err(403, "forbidden");
  await setJSON("inv/" + m[1], { exp: 0 });
  await mutate("cfg/invites", (a) => a.filter((i) => i.token !== m[1]), []);
  return json({ ok: true });
});
route("PATCH", /^team\/([a-z0-9]+)$/, async (req, m, me) => {
  if (!isAdmin(me)) return err(403, "forbidden");
  const b = await body(req);
  const target = await getDoc("users", m[1]);
  if (!target) return err(404, "not-found");
  if (target.role === "owner" && me.role !== "owner") return err(403, "forbidden", "Only the owner can change the owner account.");
  if (target.id === me.id && ("status" in b || "role" in b)) return err(400, "self", "You cannot change your own role or status.");
  const u = await mutateDoc("users", m[1], (d) => {
    if ("role" in b && ROLES.includes(b.role) && (b.role !== "owner" || me.role === "owner")) d.role = b.role;
    if ("status" in b && ["active", "disabled"].includes(b.status)) { d.status = b.status; d.v = (d.v || 1) + 1; }
    if ("title" in b) d.title = clip(b.title, 120);
    return d;
  });
  await log(me.name, `Teamlid ${u.name}: ${b.status || b.role || "bijgewerkt"}`);
  return json({ user: pub(u) });
});
route("DELETE", /^team\/([a-z0-9]+)$/, async (req, m, me) => {
  if (!isAdmin(me)) return err(403, "forbidden");
  const t = await getDoc("users", m[1]);
  if (!t || t.role === "owner" || t.id === me.id) return err(400, "not-allowed");
  await delDoc("users", m[1]); await setJSON(emailKey(t.email), null);
  await log(me.name, `Teamlid verwijderd: ${t.name}`);
  return json({ ok: true });
});

// Settings + mail
route("PATCH", /^settings$/, async (req, m, me) => {
  if (!isAdmin(me)) return err(403, "forbidden");
  const b = await body(req);
  const s = await mutate("cfg/settings", (s) => {
    if (Array.isArray(b.templates)) s.templates = b.templates.slice(0, 30).map((t) => ({ id: clip(t.id, 40) || rid(), name: clip(t.name, 120), text: clip(t.text, 8000) }));
    return s;
  }, {});
  return json({ settings: { templates: s.templates || null } });
});
route("POST", /^mail\/sync$/, async () => {
  try { const r = await syncInbox(); return json({ ...r, requests: await readCol("requests") }); }
  catch (e) { return err(502, "sync-failed", String(e.message || e).slice(0, 200)); }
});
route("POST", /^mail\/test$/, async (req, m, me) => {
  if (!mailReady()) return err(503, "mail-not-configured", "Email is not connected yet.");
  try { await send({ to: me.email, subject: "Testbericht Aedes Dei HQ", text: `Hallo ${me.name},\n\nDit is een testbericht van Aedes Dei HQ. De e-mailkoppeling werkt.` }); return json({ ok: true }); }
  catch (e) { return err(502, "send-failed", String(e.message || e).slice(0, 200)); }
});

// Calendar feed for Apple / Google / Outlook (secret link per person)
route("GET", /^cal\/([a-f0-9]{36})\.ics$/, async (req, m) => {
  const users = Object.values(await readCol("users"));
  const u = users.find((x) => x.calToken === m[1] && x.status === "active");
  if (!u) return new Response("Not found", { status: 404 });
  const appts = Object.values(await readCol("appts")).filter((a) => a.status !== "cancelled");
  const esc = (s) => String(s || "").replace(/[\\;,]/g, (c) => "\\" + c).replace(/\n/g, "\\n");
  const dt = (d, t) => d.replace(/-/g, "") + "T" + t.replace(":", "") + "00";
  const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Aedes Dei HQ//NL", "CALSCALE:GREGORIAN", "X-WR-CALNAME:Aedes Dei HQ", "X-WR-TIMEZONE:Europe/Amsterdam",
    "BEGIN:VTIMEZONE", "TZID:Europe/Amsterdam", "BEGIN:DAYLIGHT", "TZOFFSETFROM:+0100", "TZOFFSETTO:+0200", "DTSTART:19700329T020000", "RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU", "END:DAYLIGHT", "BEGIN:STANDARD", "TZOFFSETFROM:+0200", "TZOFFSETTO:+0100", "DTSTART:19701025T030000", "RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU", "END:STANDARD", "END:VTIMEZONE"];
  for (const a of appts) {
    if (!a.date || !a.start) continue;
    lines.push("BEGIN:VEVENT", `UID:${a.id}@aedesdei`, `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").slice(0, 15)}Z`, `DTSTART;TZID=Europe/Amsterdam:${dt(a.date, a.start)}`, `DTEND;TZID=Europe/Amsterdam:${dt(a.date, a.end || a.start)}`, `SUMMARY:${esc(a.title)}`, `LOCATION:${esc(a.address || a.company)}`, `DESCRIPTION:${esc([a.company, a.contactName, a.participants ? a.participants + " deelnemers" : "", a.notes].filter(Boolean).join("\n"))}`, "END:VEVENT");
  }
  lines.push("END:VCALENDAR");
  return new Response(lines.join("\r\n"), { headers: { "content-type": "text/calendar; charset=utf-8", "cache-control": "no-store" } });
}, true);

export default async (req) => {
  const url = new URL(req.url);
  const path = url.pathname.replace(/^\/(\.netlify\/functions\/)?api\/?/, "").replace(/\/$/, "");
  for (const r of R) {
    if (r.m !== req.method) continue;
    const m = path.match(r.re);
    if (!m) continue;
    try {
      if (r.open) return await r.fn(req, m);
      const me = await auth(req);
      if (!me) return err(401, "signed-out", "Please sign in again.");
      return await r.fn(req, m, me);
    } catch (e) {
      console.error(e);
      return err(e && e.message === "busy" ? 409 : 500, "server", "Something went wrong. Please try again.");
    }
  }
  return err(404, "not-found");
};
