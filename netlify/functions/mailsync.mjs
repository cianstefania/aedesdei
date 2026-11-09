// Every 10 minutes: import new emails from the info@ inbox into Aedes Dei HQ and send appointment reminders (24 h ahead).
import { syncInbox, mailReady } from "./api/mail.mjs";
import { apptReminders } from "./api/notify.mjs";

export default async () => {
  if (!mailReady()) return new Response("mail not configured");
  const out = {};
  try { Object.assign(out, await syncInbox()); } catch (e) { console.error(e); out.syncError = String(e.message || e); }
  try { out.reminders = await apptReminders(); } catch (e) { console.error(e); out.reminderError = String(e.message || e); }
  return new Response(JSON.stringify(out), { status: out.syncError ? 500 : 200 });
};
export const config = { schedule: "*/10 * * * *" };
