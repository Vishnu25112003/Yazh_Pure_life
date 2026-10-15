# Yazh Pure Life

RO/UV/alkaline water purifier sales & service website, in client–server format.

## Structure

```
client/   React + TypeScript + Vite + Tailwind front end (src/, public/, index.html)
server/   Express API + JSON data store
  data/site.json   <- all editable site details (contact, branches, products, gallery, brands, copy)
  src/             API (index.js) and storage (store.js)
```

The client no longer hard-codes details: it loads everything from `GET /api/site`.
Edit `server/data/site.json` (or use the API below) and the site updates — no rebuild needed.

## Running locally

```
npm install
cp server/.env.example server/.env   # set ADMIN_TOKEN
npm run dev                          # server :3001 + client :5173 (client proxies /api)
```

## Production

```
npm run build   # builds client/dist
npm start       # server serves the API and client/dist on PORT (default 3001)
```

## Updating details

- Edit `server/data/site.json` directly, or
- `PUT /api/site/<section>` with `Authorization: Bearer <ADMIN_TOKEN>` and the new JSON for that section
  (`contact`, `branches`, `domesticProducts`, `commercial`, `dispensers`, `gallery`, `whyChooseUs`,
  `ownBrand`, `serviceBrands`), or `PUT /api/site` for the whole document.
- `GET /api/site/raw` (with token) returns the editable data.
- Every API write first saves the previous version to `server/data/backups/` (git-ignored).
- The "Our branches" text in `whyChooseUs` is generated from `branches` (`"auto": "branches"`).

Product/gallery images live in `client/public/assets/`; reference them by path (`/assets/...`) in `site.json`.

## Notes

- The "Report a fault" form opens a prefilled WhatsApp chat — that is the contact channel.
- Each product has a Share link (`/?product=<id>`) that opens it directly.
- `client/vercel.json` is only for a static front-end deploy; with the new setup the front end needs the API
  (host the server, or proxy `/api` to it).
