# Yazh Pure Life

RO/UV/alkaline water purifier sales & service website with an admin panel.

## Structure

```
client/   React + TypeScript + Vite + Tailwind. Public site + lazy-loaded admin panel (/admin)
server/   Express API, PostgreSQL (db/), admin auth, Cloudinary image upload
  db/migrations/   SQL schema (applied in order, each in a transaction)
  db/seed.js       one-time import of server/data/site.json (never overwrites existing rows)
  db/verify.js     proves the database matches server/data/site.json
render.yaml        Render blueprint (web service serving API + built client)
```

The database is the source of truth. `server/data/site.json` is only the original seed / safety copy.

## Run locally

```
npm install
cp server/.env.example server/.env     # fill DATABASE_URL, SESSION_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD
npm run db:migrate && npm run db:seed  # create tables + load original content + create the admin
npm run dev                            # API :3001, site :5173, admin :5173/admin
```

## Environment variables (`server/.env` locally, host settings in production)

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string. Remote hosts (Neon) automatically use verified TLS. |
| `SESSION_SECRET` | Signs admin login cookies (16+ random characters). |
| `ADMIN_EMAIL`, `ADMIN_PASSWORD` | Admin created by `npm run db:seed` if it does not exist yet. |
| `CLOUDINARY_URL` | `cloudinary://API_KEY:API_SECRET@CLOUD_NAME` — enables image upload (optional; image links work without it). |
| `PORT` | Defaults to 3001 (Render sets it). |

## Database on Neon

1. Create a Neon project; copy the **direct** connection string (Pooled toggle off) for setup and the **pooled** one (`-pooler` in host) for the running app.
2. Create tables and content against the direct URL:
   ```
   DATABASE_URL="<direct url>" npm run db:migrate
   DATABASE_URL="<direct url>" npm run db:seed
   DATABASE_URL="<direct url>" npm run db:verify   # should print "identical - no data lost"
   ```
3. Use the **pooled** URL as `DATABASE_URL` on the host.

Backups: Neon keeps point-in-time history; for a manual copy use `pg_dump "<direct url>" > backup.sql`.

## Deploy on Render

1. Push this repo to GitHub, then in Render choose **New → Blueprint** and select the repo (`render.yaml` is used).
2. When asked, set `DATABASE_URL` (Neon **pooled** URL) and optionally `CLOUDINARY_URL`. `SESSION_SECRET` is generated automatically.
3. Deploy. Start runs `db/migrate.js` (idempotent) then the server. Health check: `/api/health`.
4. Site: `https://<service>.onrender.com` · Admin: `/admin`.

Free Render services sleep after inactivity (first request after a pause is slow) and Neon's free compute also
wakes on demand; upgrade the Render plan to avoid the cold start.

Build/start commands: `npm install --include=dev && npm run build` / `npm start`. Locally, `npm run start:local -w server`
runs the production start with `server/.env` loaded.

## Notes

- Admin panel: dashboard, domestic / commercial / dispenser products, gallery, footer (branches + contact).
  Items can be hidden (kept but not shown on the site) instead of deleted.
- The "Report a fault" form opens a prefilled WhatsApp chat — that is the contact channel.
- Each product has a Share link (`/?product=<slug>`) that opens it directly.
- `client/vercel.json` is only for a static front-end deploy; the front end needs the API, so host the server (Render) instead.
