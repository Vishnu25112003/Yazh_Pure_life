# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
- **Customers in and around Chennai** choosing a water purifier, a commercial RO plant or a dispenser, or booking a service for one they already own. Most arrive on a phone, often from a link shared on WhatsApp, and compare models before calling or messaging.
- **The business owner/staff** keep products, gallery, branches, contact details and catalogues up to date through the admin panel (`/admin`).

## Product Purpose
Yazh Pure Life is a Chennai RO / UV / alkaline water purifier dealer with its own "Yazh Pure Life" brand. The website shows what they sell, in three categories: domestic purifiers, commercial plants and dispensers. It also covers service for every brand, and turns visits into calls, WhatsApp messages and service bookings. Success means a customer finds the right model and contacts the business.

## Positioning
A local dealer with its own brand and its own technicians across four branches: Kolathur, Kolathur – Teacher's Colony, Tada and Avadi. It sells, installs and services all brands with genuine spares.

## Operating Context
- Customers act through phone calls and WhatsApp (wa.me links). There is no online checkout.
- Per-category catalogue pages (`/catalog/<category>`) work as a shareable digital visiting card. They replace an expired external mycrd.in card.

## Capabilities and Constraints
- React + Vite client, Express + PostgreSQL (Neon) server, Cloudinary image upload. Admin edits everything; the database is the source of truth.
- **No prices are shown** on the site or catalogues. Customers enquire for prices.
- The phone, WhatsApp number and address in the data are **placeholders** until the owner sets real ones in admin.

## Brand Commitments
The name "Yazh Pure Life" and the existing logo (`client/public/assets/logo.png`). The incumbent site's look (blue and teal, Barlow / Barlow Condensed) is the visual authority for extensions.

## Evidence on Hand
- Real product photographs and names are in `client/public/assets/{domestic,commercial,dispenser}` and the database (26 products), along with 23 gallery photos.
- **Absent:** no verified reviews, ratings, customer counts or statistics. Never invent them.

## Product Principles
1. Every page leads to a call or a WhatsApp message in one tap.
2. Phone first: most visitors arrive from a WhatsApp share.
3. Only real content: no invented proof, and no prices.
4. The owner can change anything from admin without a developer.
