// Email for Aedes Dei HQ: sending through TransIP SMTP and importing the info@ inbox through IMAP.
import nodemailer from "nodemailer";
import { ImapFlow } from "imapflow";
import { simpleParser } from "mailparser";
import crypto from "node:crypto";
import { getJSON, setJSON, getDoc, putDoc, mutateDoc, code, now, clip, log } from "./lib.mjs";

const E = process.env;
const USER = () => E.MAIL_USER || "info@aedesdei.nl";
const FROM_NAME = () => E.MAIL_FROM_NAME || "Medisch Centrum Aedes Dei";
const SITE = () => (E.SITE_URL || E.URL || "https://aedesdei.com").replace(/\/$/, "");
export const mailReady = () => !!(USER() && E.MAIL_PASS);
const MARK = "X-AedesDei-HQ";

const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const mhash = (id) => crypto.createHash("sha256").update(String(id || "").trim().toLowerCase()).digest("hex").slice(0, 32);

let _tx;
function tx() {
  if (!_tx) _tx = nodemailer.createTransport({
    host: E.SMTP_HOST || "smtp.transip.email", port: Number(E.SMTP_PORT || 465), secure: Number(E.SMTP_PORT || 465) === 465,
    auth: { user: USER(), pass: E.MAIL_PASS },
  });
  return _tx;
}
function imap() {
  return new ImapFlow({ host: E.IMAP_HOST || "imap.transip.email", port: Number(E.IMAP_PORT || 993), secure: true, auth: { user: USER(), pass: E.MAIL_PASS }, logger: false, ...(E.IMAP_SECURE === "off" ? { secure: false, doSTARTTLS: false } : {}) });
}

// Branded HTML wrapper for every outgoing email
export function wrap(bodyText, lang = "nl") {
  const paras = esc(bodyText).split(/\n{2,}/).map((p) => `<p style="margin:0 0 16px">${p.replace(/\n/g, "<br>")}</p>`).join("");
  return `<!doctype html><html><body style="margin:0;background:#F8F6F2;font-family:Helvetica,Arial,sans-serif;color:#333">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F8F6F2;padding:32px 12px"><tr><td align="center">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#fff;border-radius:14px;overflow:hidden">
<tr><td style="padding:30px 36px 18px;border-bottom:1px solid #E9DFD2"><img src="${SITE()}/img/email-logo.png" width="180" alt="Aedes Dei Medisch Centrum" style="display:block;border:0;width:180px;height:auto"></td></tr>
<tr><td style="padding:28px 36px 12px;font-size:15px;line-height:1.65">${paras}</td></tr>
<tr><td style="padding:18px 36px 28px;font-size:12px;color:#8C7B6B;border-top:1px solid #E9DFD2">Medisch Centrum Aedes Dei · ${lang === "en" ? "Preventive care. For a healthy future." : "Preventieve zorg. Voor een gezonde toekomst."}<br><a href="${SITE()}" style="color:#8A6D42">${SITE().replace(/^https?:\/\//, "")}</a> · ${USER()}</td></tr>
</table></td></tr></table></body></html>`;
}

// Send one email. Returns the Message-ID. Also saves a copy in the mailbox's Sent folder (best effort).
export async function send({ to, subject, text, lang = "nl", inReplyTo, references, cc }) {
  if (!mailReady()) throw new Error("mail-not-configured");
  const msg = {
    from: { name: FROM_NAME(), address: USER() }, to, cc, subject, text, html: wrap(text, lang),
    headers: { [MARK]: "1" }, inReplyTo, references,
  };
  const info = await tx().sendMail(msg);
  try { await saveSent({ ...msg, messageId: info.messageId }); } catch { /* optional */ }
  return info.messageId;
}
async function saveSent(msg) {
  if (E.SAVE_SENT === "off") return;
  const raw = await new Promise((res, rej) => {
    const c = nodemailer.createTransport({ streamTransport: true, buffer: true, newline: "unix" });
    c.sendMail(msg, (e, i) => (e ? rej(e) : res(i.message)));
  });
  const c = imap(); await c.connect();
  try {
    const boxes = await c.list();
    const sent = boxes.find((b) => b.specialUse === "\\Sent") || boxes.find((b) => /sent|verzonden/i.test(b.path));
    if (sent) await c.append(sent.path, raw, ["\\Seen"]);
  } finally { await c.logout().catch(() => {}); }
}

// ---------- texts ----------
const T = {
  nl: {
    confSubj: (r) => `We hebben uw aanvraag ontvangen [AD-${r.id}]`,
    conf: (r) => `Beste ${r.name || "heer/mevrouw"},\n\nHartelijk dank voor uw aanvraag bij Medisch Centrum Aedes Dei. Wij nemen zo snel mogelijk contact met u op.\n\nUw gegevens:\n${summary(r, "nl")}\n\nMet vriendelijke groet,\nMedisch Centrum Aedes Dei`,
    apptSubj: (a) => `Bevestiging afspraak ${fmtDate(a.date, "nl")}`,
    appt: (a) => `Beste ${a.contactName || "heer/mevrouw"},\n\nHierbij bevestigen wij de volgende afspraak:\n\n${a.title}\nDatum: ${fmtDate(a.date, "nl")}\nTijd: ${a.start}–${a.end}\nLocatie: ${a.address || locName(a.location, "nl")}${a.participants ? `\nAantal deelnemers: ${a.participants}` : ""}\n\nHeeft u vragen of wilt u de afspraak wijzigen? Beantwoord dan deze e-mail.\n\nMet vriendelijke groet,\nMedisch Centrum Aedes Dei`,
    team: (r) => `Nieuwe aanvraag via de website (AD-${r.id})\n\n${summary(r, "nl")}${r.message ? `\n\nBericht:\n${r.message}` : ""}\n\nBekijk en beantwoord in Aedes Dei HQ: ${SITE()}/hq/#r/${r.id}`,
  },
  en: {
    confSubj: (r) => `We have received your request [AD-${r.id}]`,
    conf: (r) => `Dear ${r.name || "Sir or Madam"},\n\nThank you for your request to Medisch Centrum Aedes Dei. We will contact you as soon as possible.\n\nYour details:\n${summary(r, "en")}\n\nKind regards,\nMedisch Centrum Aedes Dei`,
    apptSubj: (a) => `Appointment confirmation ${fmtDate(a.date, "en")}`,
    appt: (a) => `Dear ${a.contactName || "Sir or Madam"},\n\nWe hereby confirm the following appointment:\n\n${a.title}\nDate: ${fmtDate(a.date, "en")}\nTime: ${a.start}–${a.end}\nLocation: ${a.address || locName(a.location, "en")}${a.participants ? `\nParticipants: ${a.participants}` : ""}\n\nIf you have any questions or would like to change the appointment, simply reply to this email.\n\nKind regards,\nMedisch Centrum Aedes Dei`,
  },
};
const LOC = { nl: { client: "Op locatie bij de organisatie", home: "Aan huis", clinic: "In de praktijk", online: "Online" }, en: { client: "At the organisation", home: "At home", clinic: "At the clinic", online: "Online" } };
const locName = (k, l) => (LOC[l] || LOC.nl)[k] || k || "";
export function fmtDate(d, l = "nl") {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(d || "")) return d || "";
  return new Date(d + "T12:00:00Z").toLocaleDateString(l === "en" ? "en-GB" : "nl-NL", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}
function summary(r, l) {
  const L = l === "en"
    ? [["Organisation", r.company], ["Contact person", r.name], ["Email", r.email], ["Phone", r.phone], ["Employees", r.employees], ["Package", r.package], ["Location", r.location]]
    : [["Organisatie", r.company], ["Contactpersoon", r.name], ["E-mail", r.email], ["Telefoon", r.phone], ["Medewerkers", r.employees], ["Pakket", r.package], ["Locatie", r.location]];
  return L.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join("\n");
}

export async function mailNewRequest(r) {
  if (!mailReady()) return { sent: false };
  const l = r.lang === "en" ? "en" : "nl";
  const out = { sent: true };
  try {
    if (r.email) {
      const id = await send({ to: r.email, subject: T[l].confSubj(r), text: T[l].conf(r), lang: l });
      await indexMsg(id, r.id);
      await mutateDoc("requests", r.id, (d) => { d.thread = d.thread || []; d.thread.push({ dir: "out", at: now(), by: "system", subject: T[l].confSubj(r), text: T[l].conf(r), msgId: id, auto: true }); return d; });
    }
    await send({ to: USER(), subject: `Nieuwe aanvraag: ${r.company || r.name || "website"} [AD-${r.id}]`, text: T.nl.team(r) });
  } catch (e) { out.sent = false; out.error = String(e.message || e); }
  return out;
}
export async function mailAppt(a, lang = "nl") {
  const l = lang === "en" ? "en" : "nl";
  return send({ to: a.contactEmail, subject: T[l].apptSubj(a), text: T[l].appt(a), lang: l });
}
export const indexMsg = (msgId, reqId) => (msgId ? setJSON("idx/m/" + mhash(msgId), reqId) : null);

// cut quoted earlier messages ("Op ... schreef:", "On ... wrote:", "> ...")
export function stripQuote(t) {
  const lines = String(t || "").split("\n"), out = [];
  for (let i = 0; i < lines.length; i++) {
    const s = lines[i].trim();
    if (/^(Op|On|Am|Le) .{4,160}(schreef|wrote|schrieb|a écrit)\b.*:?$/i.test(s)) break;
    if (/^-{2,}\s*(Original Message|Oorspronkelijk bericht|Forwarded message|Doorgestuurd bericht)/i.test(s)) break;
    if (/^(Van|From):\s.+/i.test(s) && /^(Verzonden|Sent|Date|Datum|Aan|To):/i.test((lines[i + 1] || "").trim())) break;
    if (s.startsWith(">")) continue;
    out.push(lines[i].replace(/\s+$/, ""));
  }
  const r = out.join("\n").trim();
  return r || String(t || "").trim();
}

// ---------- IMAP import: new emails in the info@ inbox become (or join) requests ----------
const looksAuto = (p) => {
  const h = p.headers;
  const as = String(h.get("auto-submitted") || "no").toLowerCase();
  const from = (p.from && p.from.value && p.from.value[0] && p.from.value[0].address) || "";
  return as !== "no" || h.get(MARK.toLowerCase()) || /mailer-daemon|postmaster|no-?reply/i.test(from) || String(h.get("precedence") || "").match(/bulk|junk|list/i);
};
export async function syncInbox({ max = 40 } = {}) {
  if (!mailReady()) return { ok: false, error: "mail-not-configured" };
  const st = await getJSON("cfg/mailsync", {});
  const c = imap(); let created = 0, appended = 0, seen = 0;
  await c.connect();
  const lock = await c.getMailboxLock("INBOX");
  try {
    const mb = c.mailbox;
    let last = st.uidValidity === String(mb.uidValidity) ? st.lastUid || 0 : null;
    let range;
    if (last === null) { // first run (or mailbox reset): import the last 14 days
      const uids = await c.search({ since: new Date(Date.now() - 14 * 864e5) }, { uid: true });
      range = uids.length ? uids.slice(-max).join(",") : null; last = 0;
    } else range = `${last + 1}:*`;
    let maxUid = last;
    if (range) {
      for await (const m of c.fetch(range, { uid: true, source: true }, { uid: true })) {
        if (m.uid <= last) continue;
        if (seen >= max) break; // the rest is picked up on the next run
        maxUid = Math.max(maxUid, m.uid); seen++;
        let p; try { p = await simpleParser(m.source); } catch { continue; }
        const from = (p.from && p.from.value && p.from.value[0]) || {};
        if (!from.address || from.address.toLowerCase() === USER().toLowerCase() || looksAuto(p)) continue;
        const plain = ((p.text || "") || (p.html ? String(p.html).replace(/<br\s*\/?>/gi, "\n").replace(/<\/(p|div|tr|li)>/gi, "\n").replace(/<[^>]+>/g, "") : "")).replace(/\r/g, "").replace(/\n{3,}/g, "\n\n").trim();
        const short = stripQuote(plain), text = clip(short, 12000);
        const entry = { dir: "in", at: (p.date || new Date()).toISOString(), from: from.address, fromName: from.name || "", subject: clip(p.subject || "", 300), text, msgId: p.messageId || "" };
        if (short !== plain) entry.full = clip(plain, 30000);
        // find the request this email belongs to
        let reqId = null;
        const tag = String(p.subject || "").match(/\[AD-([A-Z0-9]{6})\]/);
        if (tag && (await getDoc("requests", tag[1]))) reqId = tag[1];
        if (!reqId) {
          const refs = [p.inReplyTo, ...(Array.isArray(p.references) ? p.references : p.references ? [p.references] : [])].filter(Boolean);
          for (const r of refs) { const hit = await getJSON("idx/m/" + mhash(r)); if (hit) { reqId = hit; break; } }
        }
        if (p.messageId && (await getJSON("idx/m/" + mhash(p.messageId)))) continue; // already imported
        if (reqId) {
          await mutateDoc("requests", reqId, (d) => { d.thread = d.thread || []; d.thread.push(entry); d.status = ["closed", "declined"].includes(d.status) ? "open" : d.status === "new" ? "new" : "open"; d.unread = true; d.updated = now(); return d; });
          appended++;
        } else {
          let id = code(); while (await getDoc("requests", id)) id = code();
          await putDoc("requests", id, { id, source: "email", status: "new", unread: true, name: from.name || "", email: from.address, subject: entry.subject, message: text, company: "", phone: "", received: entry.at, updated: now(), thread: [entry], notes: [] });
          reqId = id; created++;
        }
        await indexMsg(p.messageId, reqId);
      }
    }
    await setJSON("cfg/mailsync", { uidValidity: String(mb.uidValidity), lastUid: maxUid, at: now(), created: (st.created || 0) + created, error: "" });
  } catch (e) {
    await setJSON("cfg/mailsync", { ...st, at: now(), error: String(e.message || e).slice(0, 300) });
    throw e;
  } finally { lock.release(); await c.logout().catch(() => {}); }
  if (created || appended) await log("system", `E-mail: ${created} nieuw, ${appended} reactie(s)`);
  return { ok: true, created, appended };
}
