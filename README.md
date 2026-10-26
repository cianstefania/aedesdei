# aedesdei.com

Website and **Aedes Dei HQ** for Medisch Centrum Aedes Dei. Hosted on **Netlify (her own account)**, code in GitHub, domains at TransIP (aedesdei.nl) and WordPress.com (aedesdei.com). Every push to `main` publishes automatically.

| Path | What it is |
|---|---|
| `/` | Public website (NL/EN). The quote form sends requests straight into HQ. |
| `/hq/` | Aedes Dei HQ: requests, calendar, organisations, team. Linked in the footer under **Privacy**. |
| `/api/*` | Backend (Netlify Functions, data in Netlify Blobs). |

## Netlify setup (once)
1. Netlify → **Add new project → Import an existing project → GitHub** → choose this repo. Netlify reads `netlify.toml` (publish folder `public`, functions in `netlify/functions`). Deploy.
2. **Project configuration → Environment variables**:

| Key | Value |
|---|---|
| `MAIL_USER` | `info@aedesdei.nl` |
| `MAIL_PASS` | mailbox password of info@aedesdei.nl (mark as secret) |
| `AD_SECRET` | any long random text (40+ characters), signs the logins |
| `SITE_URL` | `https://aedesdei.com` |

   Then **Deploys → Trigger deploy**.
3. Open `/hq/` and create the owner account (only possible while no accounts exist).

## Domains (email stays at TransIP)
Do **not** switch name servers to Netlify DNS – the mailbox records would be lost. Use external DNS:

- Netlify → **Domain management → Add a domain** → `aedesdei.com` (primary) and `aedesdei.nl` (alias, redirects to .com). Choose to keep DNS at the current provider.
- **aedesdei.nl at TransIP** → Domain → DNS: set `@  A  75.2.60.5` and `www  CNAME  <project>.netlify.app.` Remove other `A`/`AAAA` records for `@` and `www`. **Keep all MX, TXT (SPF/DKIM) and autodiscover records.**
- **aedesdei.com at WordPress.com** → Upgrades → Domains → aedesdei.com → DNS records: the same two records. (Or transfer the domain to TransIP first.)
- Netlify then issues the HTTPS certificate automatically.

## How HQ works
- **Team**: invite from *Team → Invite team member* (link valid 14 days), or people use *Create account* and an owner/admin approves them.
- **Requests** come from the website form (the customer gets a confirmation, info@ a copy) and from every new email in info@aedesdei.nl (checked every 10 minutes by a scheduled function, or *Check now*). Replies are threaded into the same request using the `[AD-XXXXXX]` code and the email headers; quoted earlier messages are cut off.
- **Replies** are sent from info@aedesdei.nl through TransIP SMTP (`smtp.transip.email:465`) and saved in the mailbox's Sent folder. IMAP: `imap.transip.email:993`.
- **Calendar**: month / week / list, per-person filter, confirmation emails, and a private calendar link per person.
- Passwords are salted scrypt hashes; 10 failed logins per IP lock for 15 minutes; `/hq/` is `noindex`.

## Editing
`public/index.html` and `public/hq/index.html` are generated from `tools/site-src.html` and `tools/hq-src.html` with `sh tools/build.sh`.

## Privacy
The website form only asks for business contact details. Don't store medical results or health details in HQ notes. Sign Netlify's Data Processing Agreement for this account (Netlify is a US company; EU Standard Contractual Clauses apply).

## Logo
`public/img/aedesdei-logo.svg` and `aedesdei-wordmark.svg` are vector versions traced from the supplied logo image. Replace them with the designer's original vector file if available.
