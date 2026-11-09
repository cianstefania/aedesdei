// Team notifications for Aedes Dei HQ (new requests, replies, appointments, reminders) and calendar (.ics) helpers.
import { readCol, mutateDoc, now, log } from "./lib.mjs";
import { send, mailReady, fmtDate } from "./mail.mjs";

export const OWNER_NAME = process.env.OWNER_NAME || "Ciän Stefania";
export const OWNER_TITLE = "Eigenaar · Medisch Centrum Aedes Dei";
export const SIGNATURE = { nl: `Met vriendelijke groet,\n${OWNER_NAME}\nMedisch Centrum Aedes Dei`, en: `Kind regards,\n${OWNER_NAME}\nMedisch Centrum Aedes Dei` };
const SITE = () => (process.env.SITE_URL || process.env.URL || "https://aedesdei.nl").replace(/\/$/, "");
const BOX = () => (process.env.MAIL_USER || "info@aedesdei.nl").toLowerCase();
const validEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(e || ""));

// ---------- calendar ----------
const esc = (s) => String(s || "").replace(/[\\;,]/g, (c) => "\\" + c).replace(/\r?\n/g, "\\n");
const dt = (d, t) => d.replace(/-/g, "") + "T" + String(t || "00:00").replace(":", "") + "00";
const stamp = () => new Date().toISOString().replace(/[-:]/g, "").slice(0, 15) + "Z";
const fold = (l) => { const out = []; while (l.length > 74) { out.push(l.slice(0, 74)); l = " " + l.slice(74); } out.push(l); return out.join("\r\n"); };
const TZ = ["BEGIN:VTIMEZONE", "TZID:Europe/Amsterdam", "BEGIN:DAYLIGHT", "TZOFFSETFROM:+0100", "TZOFFSETTO:+0200", "DTSTART:19700329T020000", "RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU", "END:DAYLIGHT", "BEGIN:STANDARD", "TZOFFSETFROM:+0200", "TZOFFSETTO:+0100", "DTSTART:19701025T030000", "RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU", "END:STANDARD", "END:VTIMEZONE"];
function vevent(a, { cancel = false, seq = 0 } = {}) {
  return ["BEGIN:VEVENT", `UID:${a.id}@aedesdei`, `DTSTAMP:${stamp()}`, `SEQUENCE:${seq}`, `DTSTART;TZID=Europe/Amsterdam:${dt(a.date, a.start)}`, `DTEND;TZID=Europe/Amsterdam:${dt(a.date, a.end || a.start)}`,
    `SUMMARY:${esc(a.title)}`, `LOCATION:${esc(a.address || a.company)}`, `DESCRIPTION:${esc([a.company, a.contactName, a.contactPhone, a.participants ? a.participants + " deelnemers" : "", a.notes].filter(Boolean).join("\n"))}`,
    `STATUS:${cancel || a.status === "cancelled" ? "CANCELLED" : "CONFIRMED"}`, `URL:${SITE()}/hq/#agenda`,
    "BEGIN:VALARM", "ACTION:DISPLAY", "DESCRIPTION:Afspraak Aedes Dei", "TRIGGER:-PT60M", "END:VALARM", "END:VEVENT"];
}
export function calendarFeed(appts, name = "Aedes Dei HQ") {
  const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Aedes Dei HQ//NL", "CALSCALE:GREGORIAN", "METHOD:PUBLISH", `X-WR-CALNAME:${esc(name)}`, "X-WR-TIMEZONE:Europe/Amsterdam", "X-APPLE-CALENDAR-COLOR:#B99A6B", "REFRESH-INTERVAL;VALUE=DURATION:PT15M", "X-PUBLISHED-TTL:PT15M", ...TZ];
  for (const a of appts) if (a.date && a.start && a.status !== "cancelled") lines.push(...vevent(a));
  lines.push("END:VCALENDAR");
  return lines.map(fold).join("\r\n");
}
export function inviteFile(a, cancel = false) {
  const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Aedes Dei HQ//NL", "CALSCALE:GREGORIAN", `METHOD:${cancel ? "CANCEL" : "PUBLISH"}`, ...TZ, ...vevent(a, { cancel, seq: Math.floor(Date.now() / 1000) % 2147483647 }), "END:VCALENDAR"];
  return { filename: "afspraak.ics", content: lines.map(fold).join("\r\n"), contentType: `text/calendar; charset=utf-8; method=${cancel ? "CANCEL" : "PUBLISH"}` };
}

// ---------- who gets what ----------
const on = (v) => v !== false;
async function team() { return Object.values(await readCol("users")).filter((u) => u.status === "active" && validEmail(u.email)); }
const uniq = (list) => [...new Set(list.map((e) => e.toLowerCase()))];

const hqLink = (frag) => `${SITE()}/hq/${frag ? "#" + frag : ""}`;
const sumReq = (r) => [["Organisatie", r.company], ["Contactpersoon", r.name], ["E-mail", r.email], ["Telefoon", r.phone], ["Medewerkers", r.employees], ["Pakket", r.package ? "PMO " + r.package : ""]].filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join("\n");
const LOC = { client: "Op locatie bij de organisatie", home: "Aan huis", clinic: "In de praktijk", online: "Online" };
const sumAppt = (a, users) => [
  ["Wat", a.title], ["Datum", fmtDate(a.date, "nl")], ["Tijd", `${a.start}–${a.end}`], ["Locatie", a.address || LOC[a.location] || ""], ["Organisatie", a.company], ["Contactpersoon", [a.contactName, a.contactPhone].filter(Boolean).join(" · ")],
  ["Deelnemers", a.participants || ""], ["Team", (a.staff || []).map((id) => (users.find((u) => u.id === id) || {}).name).filter(Boolean).join(", ")],
].filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join("\n");

async function blast(to, subject, text, extra = {}) {
  if (!mailReady() || !to.length) return 0;
  let n = 0;
  for (const addr of to) { try { await send({ to: addr, subject, text, ...extra }); n++; } catch (e) { console.error("notify", addr, e.message); } }
  return n;
}

// New request. `source`: website | email | manual. The mailbox itself already holds incoming emails, so it is skipped for those.
export async function notifyRequest(r, { actorId = "", source = r.source } = {}) {
  const users = await team();
  let to = users.filter((u) => on(u.notifyReq) && u.id !== actorId).map((u) => u.email);
  if (source === "email") to = to.filter((e) => e.toLowerCase() !== BOX());
  if (source === "website" && !to.length) to = [BOX()];
  const kind = source === "email" ? "e-mail" : source === "website" ? (r.type === "question" ? "vraag via de website" : "offerteaanvraag via de website") : "aanvraag";
  const subject = `Nieuwe ${kind}: ${r.company || r.name || r.email || ""} [AD-${r.id}]`;
  const text = `Er is een nieuwe ${kind} binnengekomen in Aedes Dei HQ.\n\n${sumReq(r)}${r.subject && source === "email" ? `\nOnderwerp: ${r.subject}` : ""}${r.message ? `\n\nBericht:\n${String(r.message).slice(0, 1500)}` : ""}\n\nBekijk en beantwoord: ${hqLink("r/" + r.id)}`;
  return blast(uniq(to), subject, text);
}
// A customer replied in an existing conversation: the assignee (or everyone when nobody is assigned).
export async function notifyReply(r, entry) {
  const users = await team();
  let list = users.filter((u) => on(u.notifyReq));
  if (r.assignee && list.some((u) => u.id === r.assignee)) list = list.filter((u) => u.id === r.assignee);
  const to = list.map((u) => u.email).filter((e) => e.toLowerCase() !== BOX());
  const subject = `Nieuwe reactie van ${r.name || entry.from} [AD-${r.id}]`;
  const text = `${r.name || entry.from}${r.company ? " (" + r.company + ")" : ""} heeft gereageerd.\n\n${String(entry.text || "").slice(0, 1500)}\n\nOpenen in Aedes Dei HQ: ${hqLink("r/" + r.id)}`;
  return blast(uniq(to), subject, text);
}
// Appointment created / changed / cancelled / deleted / reminder: owners, admins and the assigned team members.
export async function notifyAppt(a, kind = "new", { actorName = "" } = {}) {
  const users = await team();
  const to = users.filter((u) => on(u.notifyAppt) && (u.role === "owner" || u.role === "admin" || (a.staff || []).includes(u.id))).map((u) => u.email);
  const W = { new: "Nieuwe afspraak", changed: "Afspraak gewijzigd", cancelled: "Afspraak geannuleerd", deleted: "Afspraak verwijderd", reminder: "Herinnering: afspraak morgen" }[kind] || "Afspraak";
  const subject = `${W}: ${a.title} · ${fmtDate(a.date, "nl")} ${a.start}`;
  const intro = kind === "reminder" ? "Morgen staat de volgende afspraak gepland." : `${W}${actorName ? " door " + actorName : ""}.`;
  const text = `${intro}\n\n${sumAppt(a, users)}${a.notes ? `\n\nNotities:\n${a.notes}` : ""}\n\n${kind === "cancelled" || kind === "deleted" ? "" : "De bijlage zet de afspraak in uw agenda (Apple Agenda, Outlook, Google).\n"}Agenda in Aedes Dei HQ: ${hqLink("agenda")}`;
  return blast(uniq(to), subject, text, { attachments: [inviteFile(a, kind === "cancelled" || kind === "deleted")] });
}

// Reminders ~24 hours ahead, run by the scheduled function.
function amsterdamEpoch(date, time) {
  const guess = Date.parse(`${date}T${time || "00:00"}:00Z`);
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: "Europe/Amsterdam", hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" }).formatToParts(new Date(guess));
  const g = Object.fromEntries(parts.map((p) => [p.type, p.value]));
  const asLocal = Date.parse(`${g.year}-${g.month}-${g.day}T${g.hour}:${g.minute}:00Z`);
  return guess - (asLocal - guess);
}
export async function apptReminders() {
  if (!mailReady()) return 0;
  const appts = Object.values(await readCol("appts"));
  let n = 0;
  for (const a of appts) {
    if (a.status !== "planned" || a.reminded || !a.date || !a.start) continue;
    const t = amsterdamEpoch(a.date, a.start), left = t - Date.now();
    if (left <= 0 || left > 24 * 3600e3) continue;
    await mutateDoc("appts", a.id, (d) => ({ ...d, reminded: now() }));
    await notifyAppt(a, "reminder"); n++;
  }
  if (n) await log("system", `Herinnering verstuurd voor ${n} afspraak/afspraken`);
  return n;
}
