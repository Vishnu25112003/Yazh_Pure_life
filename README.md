# Yazh Pure Life

RO/UV/alkaline water purifier sales & service website, implemented from the
`Landing.dc.html` design (claude.ai/design project "Yazh Pure Life Website Design").

## Structure

- React + TypeScript + Vite + Tailwind CSS landing page (`src/`, `public/`, `index.html`).
- `Yazh Pure Life - Landing Page.html` — original standalone reference file (kept as-is).

## Running locally

```
npm install
npm run dev
```

Vite dev server runs on `localhost:5173`.

## Notes

- The landing page is a static frontend with no backend. The "Report a fault" form (name, mobile number,
  customer ID, address, complaint) opens a prefilled WhatsApp chat — that is the contact channel.
- Domestic and commercial products scroll in an endless loop; each has a Share link (`/?product=<id>`) that
  opens that product directly.
- The design project also contains `IronRemover.dc.html`, `WaterSoftener.dc.html` and `Spares.dc.html`
  for future pages.
