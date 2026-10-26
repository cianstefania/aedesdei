// Every 10 minutes: import new emails from the info@ inbox into Aedes Dei HQ.
import { syncInbox, mailReady } from "./api/mail.mjs";

export default async () => {
  if (!mailReady()) return new Response("mail not configured");
  try { const r = await syncInbox(); return new Response(JSON.stringify(r)); }
  catch (e) { console.error(e); return new Response("sync failed", { status: 500 }); }
};
export const config = { schedule: "*/10 * * * *" };
