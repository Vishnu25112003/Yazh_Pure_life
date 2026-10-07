# Yazh Pure Life

RO/UV/alkaline water purifier sales & service website, implemented from the
`Landing.dc.html` design (claude.ai/design project "Yazh Pure Life Website Design").

## Structure

- `frontend/` — React + TypeScript + Vite + Tailwind CSS. Implements the landing page.
- `backend/` — Node + Express + TypeScript API backed by PostgreSQL.
- `docker-compose.yml` — PostgreSQL container (+ backend container) for local/dev use.
- `Yazh Pure Life - Landing Page.html` — original standalone reference file (kept as-is).

## Running locally

### Database + API (Docker)

```
docker compose up -d postgres backend
```

This starts Postgres on `localhost:5432` and the API on `localhost:4000`
(schema is created automatically on backend startup).

### API only, without Docker

```
cd backend
cp .env.example .env   # point DATABASE_URL at your own Postgres if not using Docker
npm install
npm run dev
```

### Frontend

```
cd frontend
npm install
npm run dev
```

Vite dev server runs on `localhost:5173` and proxies `/api/*` to `localhost:4000`.

## Notes

- The landing page's "Report a fault" form posts to `POST /api/service-requests`
  (persisted to Postgres) and always opens a prefilled WhatsApp chat as the
  primary contact channel, even if the API call fails.
- Product photography uses placeholder tiles (`ProductImage` component) —
  swap in real photos under `frontend/public/assets` and pass a `src` prop
  per product once available.
- Only the landing page (`Landing.dc.html`) was implemented. The design
  project also contains `Commercial.dc.html`, `IronRemover.dc.html`,
  `WaterSoftener.dc.html` and `Spares.dc.html` for future pages — the landing
  page already links out to `/commercial`, `/iron-remover`, `/water-softener`,
  `/spares` routes that can be built out next.
