# 🌊 Yazh Pure Life — Website Implementation Plan
> Modern Animated Website | React + Tailwind CSS + Vite + TypeScript | Blue & White Theme

---

## 📋 Table of Contents

1. [Project Overview](#1-project-overview)
2. [Company Information](#2-company-information)
3. [Technology Stack](#3-technology-stack)
4. [Project Setup](#4-project-setup)
5. [File & Folder Structure](#5-file--folder-structure)
6. [Design System](#6-design-system)
7. [Animation Plan](#7-animation-plan)
8. [Pages & Routing](#8-pages--routing)
9. [Page-by-Page Implementation](#9-page-by-page-implementation)
10. [Product Catalogue (Data)](#10-product-catalogue-data)
11. [Component Plan](#11-component-plan)
12. [Features & Functionality](#12-features--functionality)
13. [TypeScript Types & Interfaces](#13-typescript-types--interfaces)
14. [Implementation Checklist](#14-implementation-checklist)

---

## 1. Project Overview

| Field | Details |
|---|---|
| **Client** | Yazh Pure Life |
| **Project Type** | Static Animated Website (User-Facing Only) |
| **Framework** | React 18 + TypeScript + Vite |
| **Styling** | Tailwind CSS v3 |
| **Theme** | Blue & White — Water / Clean Feel |
| **Animation Style** | Framer Motion + CSS Keyframes + Canvas API |
| **Pages** | 6 Pages (Home, Company, Products, Services, Gallery, Contact) |
| **Routing** | React Router DOM v6 |
| **Special Features** | WhatsApp Enquiry per product, Downloadable Product Info Card |
| **No Admin Panel** | User-facing only |
| **No Order Process** | Enquiry via WhatsApp only |
| **Deployment** | Static build via `vite build` → Vercel / Netlify |

---

## 2. Company Information

### 🏢 Basic Info

| Field | Details |
|---|---|
| **Company Name** | Yazh Pure Life |
| **Tagline** | RO Water Purifier — Sales & Services |
| **Sub-tagline** | Domestic & Commercial |
| **Certification** | ISO 9001:2015 Certified |
| **Google Rating** | 4.8 ⭐ (1,014 reviews) |
| **Website** | www.yazhpurelife.in |

### 📍 Address

**Head Office:**
No.19, Venkateshwara Nagar, Teachers Colony,
Kadappa Road, Kolathur, Chennai, Tamil Nadu — 600099

**Branch Offices:** Kolathur | Avadi | Tada

### 📞 Contact

| Type | Value |
|---|---|
| Phone 1 | +91-97865 69973 |
| Phone 2 | +91-80980 94111 |
| Email | yazhpurelife@gmail.com |
| WhatsApp | +91-97865 69973 |

### 💳 Payment

| Method | Number |
|---|---|
| Paytm / Google Pay / PhonePe | +91-97865 69973 |

### 🌐 Social Media

| Platform | URL |
|---|---|
| Facebook | https://www.facebook.com/yazhpurelifeRO/ |
| Twitter / X | https://twitter.com/LifeYazh |
| YouTube | https://www.youtube.com/channel/UC_T8fMK5YR-Mky3GwYTCT3g |
| WhatsApp | https://wa.me/919786569973 |

### 🤝 Dealer Brands

Aquaguard | Kent | Blue Star | Whirlpool | LG | Genpure | Prolife

---

## 3. Technology Stack

### Core

| Layer | Technology | Version |
|---|---|---|
| **Build Tool** | Vite | ^5.x |
| **Framework** | React | ^18.x |
| **Language** | TypeScript | ^5.x |
| **Styling** | Tailwind CSS | ^3.x |
| **Routing** | React Router DOM | ^6.x |

### Animation & UI Libraries

| Package | Purpose |
|---|---|
| `framer-motion` | Page transitions, scroll reveal, card hover, stagger effects |
| `react-intersection-observer` | Trigger animations when elements enter viewport |
| `react-countup` | Animated stat counter numbers |
| `swiper` | Hero slider + Products preview carousel |
| `react-photo-album` | Gallery masonry grid layout |
| `yet-another-react-lightbox` | Gallery fullscreen lightbox viewer |

### Utility Libraries

| Package | Purpose |
|---|---|
| `html2canvas` | Generate downloadable product info card PNG |
| `lucide-react` | Icon library (consistent SVG icons) |
| `clsx` | Conditional className utility |
| `tailwind-merge` | Merge Tailwind classes without conflicts |

### Dev Dependencies

| Package | Purpose |
|---|---|
| `@types/react` | React TypeScript types |
| `@types/react-dom` | ReactDOM TypeScript types |
| `autoprefixer` | CSS vendor prefixing |
| `postcss` | Required for Tailwind CSS |
| `eslint` + `prettier` | Linting & formatting |

---

## 4. Project Setup

### Initialize Project

```bash
npm create vite@latest yazh-purelife -- --template react-ts
cd yazh-purelife
npm install
```

### Install All Dependencies

```bash
# Routing
npm install react-router-dom

# Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Animations
npm install framer-motion react-intersection-observer react-countup

# Carousel / Slider
npm install swiper

# Gallery
npm install react-photo-album yet-another-react-lightbox

# Download Card Generator
npm install html2canvas

# Icons & Utilities
npm install lucide-react clsx tailwind-merge
```

### `tailwind.config.ts`

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy:     '#0a1628',
        ocean:    '#0d3b6e',
        bright:   '#1565c0',
        sky:      '#42a5f5',
        cyan:     '#00bcd4',
        pale:     '#bbdefb',
        offwhite: '#f0f8ff',
        gold:     '#ffd700',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body:    ['"DM Sans"', 'sans-serif'],
      },
      animation: {
        'wave-slow':   'wave 8s linear infinite',
        'wave-mid':    'wave 6s linear infinite reverse',
        'wave-fast':   'wave 4s linear infinite',
        'float':       'float 4s ease-in-out infinite',
        'pulse-ring':  'pulseRing 2s ease-out infinite',
        'marquee':     'marquee 20s linear infinite',
        'fadeUp':      'fadeUp 0.6s ease-out forwards',
      },
      keyframes: {
        wave: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-20px)' },
        },
        pulseRing: {
          '0%':   { transform: 'scale(1)', opacity: '0.8' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'blue-glow':  '0 0 24px rgba(0,188,212,0.4)',
        'card':       '0 4px 24px rgba(13,59,110,0.10)',
        'card-hover': '0 12px 40px rgba(13,59,110,0.20)',
      },
    },
  },
  plugins: [],
}

export default config
```

### `vite.config.ts`

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
})
```

### `tsconfig.json` — Path Alias

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] }
  }
}
```

### `index.html` — Google Fonts

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
```

---

## 5. File & Folder Structure

```
yazh-purelife/
│
├── public/
│   ├── favicon.ico
│   └── images/
│       ├── logo.png
│       ├── hero-products.png
│       └── products/
│           ├── dolphin.jpg
│           ├── lily.png
│           ├── aqua2090.jpg
│           ├── purex.png
│           ├── mirage.png
│           ├── emira.jpg
│           ├── aqua9090.jpg
│           ├── sky.jpg
│           ├── gseries.jpg
│           ├── prolife-viber.jpg
│           ├── prolife-fiesta.jpg
│           ├── purelife.jpeg
│           └── whale25.jpeg
│
├── src/
│   ├── main.tsx                      ← React entry point
│   ├── App.tsx                       ← Router + AnimatePresence setup
│   │
│   ├── types/
│   │   └── index.ts                  ← All TypeScript interfaces & types
│   │
│   ├── data/
│   │   ├── products.ts               ← Products array (13 products)
│   │   ├── services.ts               ← Services array (6 services)
│   │   └── constants.ts              ← Company info, nav links, social, brands
│   │
│   ├── hooks/
│   │   ├── useScrollReveal.ts        ← IntersectionObserver scroll hook
│   │   ├── useCountUp.ts             ← Counter animation hook
│   │   └── useBubbles.ts             ← Canvas bubble animation hook
│   │
│   ├── utils/
│   │   ├── downloadCard.ts           ← Canvas-based product card generator
│   │   ├── whatsapp.ts               ← WhatsApp URL builder
│   │   └── cn.ts                     ← clsx + tailwind-merge utility
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── TopBar.tsx            ← Contact strip (top of all pages)
│   │   │   ├── Navbar.tsx            ← Sticky nav + mobile hamburger
│   │   │   ├── Footer.tsx            ← 4-column footer
│   │   │   └── Layout.tsx            ← TopBar + Navbar + {children} + Footer
│   │   │
│   │   ├── ui/
│   │   │   ├── Button.tsx            ← All button variants
│   │   │   ├── SectionHeading.tsx    ← Animated h2 + blue underline
│   │   │   ├── PageBanner.tsx        ← Inner page hero banner
│   │   │   ├── WaveDivider.tsx       ← SVG wave section divider
│   │   │   ├── BubbleCanvas.tsx      ← Floating bubble canvas (fixed bg)
│   │   │   ├── ScrollToTop.tsx       ← Fixed scroll-to-top button
│   │   │   ├── WhatsAppFloat.tsx     ← Fixed WhatsApp button + pulse ring
│   │   │   └── CursorDot.tsx         ← Custom cursor (dot + ring)
│   │   │
│   │   ├── home/
│   │   │   ├── HeroSection.tsx       ← Full-vh hero + waves + floating image
│   │   │   ├── AboutSection.tsx      ← Split layout + 3 badges
│   │   │   ├── StatsSection.tsx      ← 4 animated counters
│   │   │   ├── ProductsPreview.tsx   ← Swiper carousel (6 products)
│   │   │   ├── WhyChooseUs.tsx       ← 4 feature cards
│   │   │   ├── ServicesHighlight.tsx ← 3 service preview cards
│   │   │   └── DealerBrandsStrip.tsx ← Marquee scrolling brand strip
│   │   │
│   │   ├── company/
│   │   │   └── PurificationSteps.tsx ← 7-stage animated flow diagram
│   │   │
│   │   ├── products/
│   │   │   ├── ProductCard.tsx       ← Full product card with both buttons
│   │   │   ├── ProductFilter.tsx     ← Category filter tab buttons
│   │   │   └── ProductGrid.tsx       ← Responsive 3-col grid + stagger
│   │   │
│   │   ├── gallery/
│   │   │   ├── GalleryGrid.tsx       ← react-photo-album masonry grid
│   │   │   └── GalleryFilter.tsx     ← Gallery category tabs
│   │   │
│   │   └── contact/
│   │       ├── BranchTabs.tsx        ← Tab switcher (4 branches)
│   │       ├── ContactCard.tsx       ← Address + phone + map embed
│   │       ├── EnquiryForm.tsx       ← Form → WhatsApp redirect
│   │       └── PaymentSection.tsx    ← Paytm / GPay / PhonePe QR cards
│   │
│   └── pages/
│       ├── Home.tsx
│       ├── Company.tsx
│       ├── Products.tsx
│       ├── Services.tsx
│       ├── Gallery.tsx
│       └── Contact.tsx
│
├── tailwind.config.ts
├── vite.config.ts
├── tsconfig.json
├── postcss.config.js
├── package.json
└── index.html
```

---

## 6. Design System

### 🎨 Color Palette

| Token | Hex | Tailwind Class | Usage |
|---|---|---|---|
| `navy` | `#0a1628` | `bg-navy` | Navbar, Footer bg |
| `ocean` | `#0d3b6e` | `bg-ocean` | Section backgrounds |
| `bright` | `#1565c0` | `bg-bright` | Buttons, links |
| `sky` | `#42a5f5` | `text-sky` | Highlights |
| `cyan` | `#00bcd4` | `bg-cyan` | CTA buttons, accents |
| `pale` | `#bbdefb` | `bg-pale` | Light section bg |
| `offwhite` | `#f0f8ff` | `bg-offwhite` | Page background |
| `gold` | `#ffd700` | `text-gold` | Stars, ISO badge |

### 🔤 Typography

| Role | Font | Tailwind Class |
|---|---|---|
| Display / Headings | Playfair Display | `font-display` |
| Body / UI text | DM Sans | `font-body` |

### 📐 Spacing & Layout

| Property | Value | Tailwind |
|---|---|---|
| Section padding | 80px vertical | `py-20` |
| Card padding | 24px | `p-6` |
| Container max-width | 1280px | `max-w-7xl mx-auto px-4` |
| Border radius — cards | 16px | `rounded-2xl` |
| Border radius — buttons | 50px | `rounded-full` |
| Border radius — inputs | 8px | `rounded-lg` |

### 🔘 Button Variants (`Button.tsx`)

| Variant | Tailwind Classes |
|---|---|
| `primary` | `bg-cyan text-navy font-semibold hover:bg-white hover:shadow-blue-glow transition-all` |
| `whatsapp` | `bg-[#25D366] text-white hover:bg-[#128C7E] transition-all` |
| `download` | `border-2 border-bright text-bright hover:bg-bright hover:text-white transition-all` |
| `outline` | `border-2 border-cyan text-cyan hover:bg-cyan hover:text-navy transition-all` |
| `ghost` | `text-sky hover:text-cyan underline-offset-4 hover:underline` |

### 🃏 Card Style

```
bg-white rounded-2xl shadow-card hover:shadow-card-hover
border border-blue-100 hover:border-cyan
transition-all duration-300 hover:-translate-y-2
```

---

## 7. Animation Plan

### Framer Motion — Page Transitions (`App.tsx`)

```typescript
const pageVariants = {
  initial:  { opacity: 0, y: 20 },
  animate:  { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  exit:     { opacity: 0, y: -20, transition: { duration: 0.3 } },
}
// Wrap <Routes> with <AnimatePresence mode="wait">
// Each page wraps content with <motion.div {...pageVariants}>
```

### Framer Motion — Scroll Reveal

```typescript
// Reusable pattern in every section component
const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })

const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

// Stagger for grids (product cards, service cards)
const container = {
  visible: { transition: { staggerChildren: 0.1 } }
}
```

### Canvas Bubbles (`BubbleCanvas.tsx`)

```
- position: fixed, z-index: 0, pointer-events: none
- Bubble object: { x, y, radius (5–30px), speed, opacity (0.2–0.4) }
- requestAnimationFrame loop → move y upward → reset at top
- ~25 bubbles at any time
```

### Wave Animation (Tailwind CSS Keyframes)

```
Hero bottom: 3 layered SVG sine-wave paths
  Layer 1: animate-wave-slow  (8s, opacity-40)
  Layer 2: animate-wave-mid   (6s, reversed, opacity-30)
  Layer 3: animate-wave-fast  (4s, opacity-20)
```

### Hero Image Float

```
<img className="animate-float" />
→ Smooth 4s ease-in-out up/down loop (-20px)
```

### Water Ripple (Button Click)

```typescript
// On button click: inject <span> positioned at click coordinates
// Apply scale(0→4) + opacity(0.5→0) over 0.6s
// Remove span after animation completes
```

### Counter Animation (`react-countup`)

```tsx
<CountUp end={5000} suffix="+" duration={2.5} enableScrollSpy scrollSpyOnce />
```

### Dealer Brands Marquee

```tsx
// Duplicate array for seamless loop
<div className="flex animate-marquee whitespace-nowrap">
  {[...brands, ...brands].map(b => <BrandItem key={b} />)}
</div>
```

### Product Card Hover (Framer Motion)

```tsx
<motion.div
  whileHover={{ y: -8 }}
  transition={{ type: 'spring', stiffness: 300 }}
  className="shadow-card hover:shadow-card-hover"
/>
```

### Custom Cursor (`CursorDot.tsx`)

```
- Dot: 12px cyan circle (follows mouse instantly)
- Ring: 36px semi-transparent cyan border (follows with 100ms delay)
- On hover over interactive elements: dot grows to 20px, ring grows to 50px
- Implemented with useState + useEffect mousemove listener
```

---

## 8. Pages & Routing

### `App.tsx`

```typescript
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"         element={<Home />} />
        <Route path="/company"  element={<Company />} />
        <Route path="/products" element={<Products />} />
        <Route path="/services" element={<Services />} />
        <Route path="/gallery"  element={<Gallery />} />
        <Route path="/contact"  element={<Contact />} />
      </Routes>
    </AnimatePresence>
  )
}
```

### `src/data/constants.ts`

```typescript
export const NAV_LINKS = [
  { label: 'Home',       path: '/' },
  { label: 'Company',    path: '/company' },
  { label: 'Products',   path: '/products' },
  { label: 'Services',   path: '/services' },
  { label: 'Gallery',    path: '/gallery' },
  { label: 'Contact Us', path: '/contact' },
]

export const COMPANY = {
  name:      'Yazh Pure Life',
  tagline:   'RO Water Purifier — Sales & Services',
  sub:       'Domestic & Commercial',
  cert:      'ISO 9001:2015 Certified',
  rating:    4.8,
  reviews:   1014,
  phone1:    '+91-97865 69973',
  phone2:    '+91-80980 94111',
  whatsapp:  '919786569973',
  email:     'yazhpurelife@gmail.com',
  website:   'www.yazhpurelife.in',
  address:   'No.19, Venkateshwara Nagar, Teachers Colony, Kadappa Road, Kolathur, Chennai, Tamil Nadu - 600099',
  mapUrl:    'https://maps.app.goo.gl/pCozD5Ne714YkgeV6',
}

export const SOCIAL_LINKS = [
  { platform: 'Facebook',  url: 'https://www.facebook.com/yazhpurelifeRO/' },
  { platform: 'Twitter',   url: 'https://twitter.com/LifeYazh' },
  { platform: 'YouTube',   url: 'https://www.youtube.com/channel/UC_T8fMK5YR-Mky3GwYTCT3g' },
  { platform: 'WhatsApp',  url: 'https://wa.me/919786569973' },
]

export const DEALER_BRANDS = [
  'Aquaguard', 'Kent', 'Blue Star', 'Whirlpool', 'LG', 'Genpure', 'Prolife',
]

export const BRANCHES = [
  { name: 'Head Office', address: 'No.19, Venkateshwara Nagar, Teachers Colony, Kadappa Road, Kolathur, Chennai-600099' },
  { name: 'Kolathur',   address: 'Kolathur, Chennai' },
  { name: 'Avadi',      address: 'Avadi, Chennai' },
  { name: 'Tada',       address: 'Tada, Andhra Pradesh' },
]

export const STATS = [
  { value: 5000, suffix: '+', label: 'Happy Customers' },
  { value: 13,   suffix: '+', label: 'Products' },
  { value: 10,   suffix: '+', label: 'Years Experience' },
  { value: 3,    suffix: '',  label: 'Branch Offices' },
]
```

---

## 9. Page-by-Page Implementation

---

### 📄 Home (`/`)

| Order | Section | Component | Key Details |
|---|---|---|---|
| 1 | Top Bar | `TopBar` | Phones + Email + Social icons |
| 2 | Navbar | `Navbar` | Sticky, scrolled state darkens |
| 3 | Hero | `HeroSection` | Full-vh, gradient bg, wave bottom, floating purifier image, 2 CTAs |
| 4 | About | `AboutSection` | Split layout — text left, image right, 3 badge highlights |
| 5 | Stats | `StatsSection` | Ocean bg, 4 count-up numbers |
| 6 | Products Preview | `ProductsPreview` | Swiper carousel, 6 visible cards |
| 7 | Why Choose Us | `WhyChooseUs` | 4 icon cards with hover effect |
| 8 | Services Highlight | `ServicesHighlight` | 3 service cards with CTA |
| 9 | Dealer Brands | `DealerBrandsStrip` | Auto-scrolling marquee |
| 10 | Footer | `Footer` | 4-column layout |

**Hero Section Details:**
- Background: `bg-gradient-to-br from-navy via-ocean to-[#0a2244]`
- Left: `<h1>` "Pure Water, Pure Life" + subheading + `[Explore Products]` `[Contact Us]` buttons
- Right: Floating purifier image (`animate-float`)
- Bottom: 3-layer SVG wave in cyan/blue
- Background: BubbleCanvas (fixed)

**About Section Badges:**
- ✅ ISO 9001:2015 Certified
- ✅ 4.8 ⭐ Google Rated (1,014 Reviews)
- ✅ 10+ Years of Excellence

**Why Choose Us Cards:**
- 💧 100% Pure Water — RO + UV + UF multi-stage purification
- 🔧 Expert Installation — Professional setup at your doorstep
- 🛡️ 1 Year Guarantee — All products backed by warranty
- 📞 24/7 Support — Always available when you need us

---

### 📄 Company (`/company`)

| Order | Section | Key Content |
|---|---|---|
| 1 | Page Banner | "Company" heading, water bg |
| 2 | Mission | Responsible brand — purify water, food, air |
| 3 | Vision | Freedom from water problems, impeccable quality |
| 4 | Quality | Copper enriched RO, immunity boost, ISO badge |
| 5 | Purification Process | 7-stage animated step flow |
| 6 | Satisfaction Banner | "100% Satisfaction Guaranteed" + "Make Installation Easier" |

**Purification Process — 7 Stages:**

| # | Stage Name | Function |
|---|---|---|
| 1 | PP Sediment Filter (5 Micron) | Removes sand, dust, rust, silt |
| 2 | Inline Sediment Cartridge | Protects RO membrane from fine particles |
| 3 | Pre Carbon Filter | Removes color, odour, chlorine, pesticides |
| 4 | RO Membrane Filter | Eliminates TDS, toxins, viruses, bacteria |
| 5 | Post Carbon Filter | Restores natural taste of water |
| 6 | UV Filtration | Deactivates remaining bacteria & viruses |
| 7 | Mineral Guard / Alkaline | Adds essential minerals back into water |

**Animation:** Each step fades in sequentially on scroll with connecting animated arrow between stages.

---

### 📄 Products (`/products`)

| Order | Section | Component |
|---|---|---|
| 1 | Page Banner | `PageBanner` |
| 2 | Filter Bar | `ProductFilter` |
| 3 | Products Grid | `ProductGrid` → `ProductCard` × 13 |
| 4 | Spare Parts Banner | Inline info banner |

**Product Card Layout:**

```
┌──────────────────────────────────┐
│  [ISI Badge if applicable]       │
│        [Product Image]           │
│                                  │
│  YPL Dolphin              ₹8,800 │
│  ── Only RO ──                   │
│  ✔ 5 Stage Purification          │
│  ✔ Fully Automatic + LED         │
│  ✔ 9L Detachable Storage Tank    │
│  ✔ One Year Guarantee            │
│                                  │
│  [💬 WhatsApp]  [📥 Download]    │
└──────────────────────────────────┘
```

**Filter Categories:**

| Tab | Products Shown |
|---|---|
| All | All 13 products |
| Home Use | Dolphin, Lily, Aqua 2090, Pure X, Mirage, Emira, Aqua 9090, Sky, G-Series, Prolife Viber, Prolife Fiesta |
| Commercial | YPL Whale 25 |
| Hot & Cold | YPL Purelife (Hot & Cold) |

**Spare Parts Banner:**
> "All RO Spare Parts Available Here — Pre-filter set included with all YPL models. Stands and covers available for select models (chargeable)."
> [💬 Enquire on WhatsApp]

---

### 📄 Services (`/services`)

| Order | Section | Details |
|---|---|---|
| 1 | Page Banner | "Services" heading |
| 2 | About Services | Authorized center text |
| 3 | 6 Service Cards | Icon + title + desc + WhatsApp CTA |
| 4 | AMC Section | Full description + Book AMC CTA |
| 5 | CTA Banner | Full-width blue — "Need a Service?" |

**6 Service Cards:**

| Service | Lucide Icon | Description |
|---|---|---|
| Reverse Osmosis System | `Droplets` | Complete RO system installation & maintenance |
| Industrial Water Treatment | `Factory` | Large-scale industrial purification plants |
| Commercial Water Treatment | `Building2` | Office, school, commercial sector solutions |
| Domestic RO Plant | `Home` | Home RO installation & repair |
| Iron Remover Plant | `Settings` | Specialized iron removal systems |
| Softener Plant | `Leaf` | Water softening solutions |

**AMC Text:**
"We offer a various range of affordable Annual maintenance contract packages for a vast range of water purifier models. Our AMC packages include periodically servicing and replacing faulty spare parts. We undertake all type brands Water purifier AMC service in Chennai. Yazh Pure Life is the one-stop solution — our Pros are verified and industry experts in repair, maintenance, installation, up-gradation and servicing of all kinds of water purifier."

---

### 📄 Gallery (`/gallery`)

| Order | Section | Details |
|---|---|---|
| 1 | Page Banner | "Gallery" + "The Sure Way to Safe Drinking Water" |
| 2 | Filter Tabs | All / Home Models / Commercial / Hot & Cold |
| 3 | Masonry Grid | react-photo-album, 4-col desktop / 2-col mobile |
| 4 | Lightbox | yet-another-react-lightbox on image click |

---

### 📄 Contact (`/contact`)

| Order | Section | Details |
|---|---|---|
| 1 | Page Banner | "Contact Us" |
| 2 | Branch Tabs | Head Office / Kolathur / Avadi / Tada |
| 3 | Contact Card | Address + phones + email + Google Map iframe |
| 4 | Enquiry Form | Name, Mobile, Email, Message → WhatsApp |
| 5 | Payment Section | Paytm / PhonePe / GPay QR cards |

**Enquiry Form Fields:**
- Your Name * (required)
- Your Mobile * (required, 10-digit validation)
- Your Email *
- Tell Us Something... (textarea)
- [Send Message] → opens WhatsApp with form data pre-filled

---

## 10. Product Catalogue (Data)

### Complete Products Array (`src/data/products.ts`)

| # | Name | Type | Stages | Storage | Price | MRP | ISI | Category |
|---|---|---|---|---|---|---|---|---|
| 1 | YPL Dolphin | Only RO | 5 | 9L Detachable | ₹8,800 | — | No | home |
| 2 | YPL Lily | RO + Minerals | 5 | 10L Detachable | ₹9,800 | — | No | home |
| 3 | YPL Aqua 2090 | RO + Minerals | 5 | 10L Detachable | ₹9,800 | — | No | home |
| 4 | YPL Pure X | RO + Minerals + Alkaline | 6 | 10L Detachable | ₹10,300 | — | No | home |
| 5 | YPL Mirage | RO + UV + Minerals + Alkaline | 7 | 12L | ₹10,800 | — | No | home |
| 6 | YPL Emira | RO + Minerals + Alkaline + Tank UV | 7 | 10L | ₹10,800 | — | No | home |
| 7 | YPL Aqua 9090 | RO + UV + Minerals + Alkaline | 6 | 10L | ₹10,800 | — | No | home |
| 8 | YPL Sky | RO + Tank UV + Minerals | 7 | 7.5L SS / 9L | ₹11,800 | — | No | home |
| 9 | G-Series | RO + Alkaline + Zn + Tank UV | 8 | 10L | ₹11,800 | ₹13,990 | ✅ | home |
| 10 | Prolife Viber | RO + UV + Alkaline + TDS | 8 | 12L | ₹12,800 | ₹15,990 | ✅ | home |
| 11 | Prolife Fiesta | RO + UV + UF + Minerals + Copper + TDS + Alkaline | 10 | 12L | ₹13,800 | ₹16,990 | ✅ | home |
| 12 | YPL Purelife (Hot & Cold) | RO Hot & Cold | — | Hot 1L/Cold 0.5L/Normal 6L | ₹18,800 | — | No | hotcold |
| 13 | YPL Whale 25 | Only RO | 5 | 25L | ₹18,800 | — | No | commercial |

---

## 11. Component Plan

### Layout Components

| Component | File | Props | Role |
|---|---|---|---|
| `Layout` | `layout/Layout.tsx` | `{ children: ReactNode }` | Wraps all pages |
| `TopBar` | `layout/TopBar.tsx` | — | Contact strip, social icons |
| `Navbar` | `layout/Navbar.tsx` | — | Sticky nav, mobile menu |
| `Footer` | `layout/Footer.tsx` | — | 4-column footer |

### UI Components

| Component | Props | Role |
|---|---|---|
| `Button` | `variant, size, href?, onClick?, children` | All styled buttons |
| `SectionHeading` | `title, subtitle?, align?` | Section h2 with animated underline |
| `PageBanner` | `title, subtitle?, bgImage?` | Inner page full-width banner |
| `WaveDivider` | `flip?, color?` | SVG wave between sections |
| `BubbleCanvas` | — | Fixed canvas background |
| `ScrollToTop` | — | Fixed bottom-right button |
| `WhatsAppFloat` | — | Fixed WhatsApp FAB + pulse ring |
| `CursorDot` | — | Custom cursor (dot + ring) |

### Product Components

| Component | Props | Role |
|---|---|---|
| `ProductCard` | `product: Product` | Full card with enquiry + download |
| `ProductFilter` | `active: ProductCategory, onChange` | Category tab filter |
| `ProductGrid` | `products: Product[]` | Stagger-animated 3-col grid |

### Home Section Components

| Component | Role |
|---|---|
| `HeroSection` | Full-vh hero + wave + CTA |
| `AboutSection` | Company intro split layout |
| `StatsSection` | 4 count-up animated stats |
| `ProductsPreview` | Swiper 6-card carousel |
| `WhyChooseUs` | 4 feature icon cards |
| `ServicesHighlight` | 3 service preview cards |
| `DealerBrandsStrip` | Auto-scroll brand marquee |

---

## 12. Features & Functionality

### 💬 WhatsApp Enquiry (`src/utils/whatsapp.ts`)

```typescript
export const buildWhatsAppURL = (productName: string): string => {
  const phone = '919786569973'
  const message = encodeURIComponent(
    `Hi, I am interested in your product: ${productName}. Please provide more details.`
  )
  return `https://wa.me/${phone}?text=${message}`
}

export const openWhatsApp = (productName: string): void => {
  window.open(buildWhatsAppURL(productName), '_blank')
}
```

### 📥 Download Product Card (`src/utils/downloadCard.ts`)

```typescript
// Canvas size: 1000 × 560px (high quality PNG)
// Card layout:
//   - Top bar (light blue): "E-Catalog" (left) | phones (right)
//   - Center white area: Logo + "YAZH PURE LIFE" + blue underline
//   - Blue pill: Product name
//   - Bottom bar (blue): email | website

export const downloadProductCard = (product: Product): void => {
  const canvas = document.createElement('canvas')
  canvas.width = 1000
  canvas.height = 560
  const ctx = canvas.getContext('2d')!

  // 1. White background
  ctx.fillStyle = '#f0f8ff'
  ctx.fillRect(0, 0, 1000, 560)

  // 2. Top bar
  ctx.fillStyle = '#bbdefb'
  ctx.fillRect(0, 0, 1000, 80)
  // ... draw "E-Catalog" and phone numbers

  // 3. Logo image (load async, then continue drawing)
  const logo = new Image()
  logo.src = '/images/logo.png'
  logo.onload = () => {
    ctx.drawImage(logo, 390, 100, 220, 160)

    // 4. Company name
    ctx.fillStyle = '#0a1628'
    ctx.font = 'bold 32px Playfair Display'
    ctx.textAlign = 'center'
    ctx.fillText('YAZH PURE LIFE', 500, 300)

    // 5. Blue underline
    ctx.fillStyle = '#1565c0'
    ctx.fillRect(340, 315, 320, 3)

    // 6. Product name pill
    // roundRect fill in #1565c0 then white text

    // 7. Bottom bar
    ctx.fillStyle = '#1565c0'
    ctx.fillRect(0, 480, 1000, 80)
    ctx.fillStyle = '#ffffff'
    ctx.fillText('yazhpurelife@gmail.com  |  www.yazhpurelife.in', 500, 527)

    // 8. Download
    const link = document.createElement('a')
    link.download = `YPL_${product.name.replace(/\s+/g, '_')}_Card.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }
}
```

### 📋 Enquiry Form → WhatsApp (`EnquiryForm.tsx`)

```typescript
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  const msg = encodeURIComponent(
    `Name: ${form.name}\nMobile: ${form.mobile}\nEmail: ${form.email}\nMessage: ${form.message}`
  )
  window.open(`https://wa.me/919786569973?text=${msg}`, '_blank')
}
```

### 📱 Responsive Breakpoints (Tailwind)

| Breakpoint | Prefix | Screen | Layout |
|---|---|---|---|
| Mobile | (default) | < 768px | 1-col, hamburger menu |
| Tablet | `md:` | ≥ 768px | 2-col grid |
| Desktop | `lg:` | ≥ 1024px | 3-col grid, full navbar |
| Wide | `xl:` | ≥ 1280px | Max-width container (7xl) |

### 🍔 Mobile Hamburger Menu

```
- useState: isOpen (boolean)
- On open: fullscreen overlay (fixed inset-0 bg-navy/95 z-50)
- Nav items animate in with stagger (framer-motion)
- Social icons at bottom
- Hamburger → X icon transition (CSS rotate)
```

---

## 13. TypeScript Types & Interfaces

### `src/types/index.ts`

```typescript
export type ProductCategory = 'all' | 'home' | 'commercial' | 'hotcold'

export interface Product {
  id: number
  name: string
  type: string
  stages: number
  storage: string
  price: number
  mrp?: number                   // Original MRP (ISI products with buyback)
  category: ProductCategory
  isISI: boolean
  image: string
  features: string[]
}

export interface Service {
  id: number
  title: string
  description: string
  icon: string                   // Lucide icon component name
}

export interface Branch {
  name: string
  address: string
  mapEmbedUrl?: string
}

export interface NavLink {
  label: string
  path: string
}

export interface Stat {
  value: number
  suffix: string
  label: string
}

export interface SocialLink {
  platform: string
  url: string
  icon: string
}

export interface DealerBrand {
  name: string
  logo?: string
}

export interface FilterTab {
  label: string
  value: ProductCategory
}

export interface EnquiryFormData {
  name: string
  mobile: string
  email: string
  message: string
}

export interface GalleryImage {
  src: string
  width: number
  height: number
  alt: string
  category: ProductCategory
}

export type ButtonVariant = 'primary' | 'whatsapp' | 'download' | 'outline' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'
```

---

## 14. Implementation Checklist

### ⚙️ Project Setup
- [ ] Create Vite + React + TypeScript project
- [ ] Install all npm dependencies
- [ ] Configure `tailwind.config.ts` with custom tokens
- [ ] Configure `vite.config.ts` with `@` path alias
- [ ] Add Google Fonts to `index.html`
- [ ] Create `src/types/index.ts` — all interfaces
- [ ] Create `src/data/constants.ts` — company info, nav, stats
- [ ] Create `src/data/products.ts` — 13 products
- [ ] Create `src/data/services.ts` — 6 services
- [ ] Create `src/utils/cn.ts` — clsx + tailwind-merge
- [ ] Create `src/utils/whatsapp.ts`
- [ ] Create `src/utils/downloadCard.ts`
- [ ] Setup React Router in `App.tsx` with `AnimatePresence`

### 🧩 Global Components
- [ ] `TopBar.tsx`
- [ ] `Navbar.tsx` (sticky + active link + hamburger)
- [ ] `Footer.tsx` (4-column)
- [ ] `Layout.tsx`
- [ ] `BubbleCanvas.tsx`
- [ ] `WaveDivider.tsx`
- [ ] `Button.tsx` (all variants)
- [ ] `SectionHeading.tsx`
- [ ] `PageBanner.tsx`
- [ ] `WhatsAppFloat.tsx` (+ pulse ring)
- [ ] `ScrollToTop.tsx`
- [ ] `CursorDot.tsx`

### 🏠 Home Page
- [ ] `HeroSection.tsx`
- [ ] `AboutSection.tsx`
- [ ] `StatsSection.tsx`
- [ ] `ProductsPreview.tsx` (Swiper)
- [ ] `WhyChooseUs.tsx`
- [ ] `ServicesHighlight.tsx`
- [ ] `DealerBrandsStrip.tsx`
- [ ] `pages/Home.tsx` (assemble all)

### 🏢 Company Page
- [ ] Mission section
- [ ] Vision section
- [ ] Quality + ISO badge
- [ ] `PurificationSteps.tsx` (7-stage)
- [ ] Satisfaction banner
- [ ] `pages/Company.tsx` (assemble)

### 📦 Products Page
- [ ] `ProductFilter.tsx`
- [ ] `ProductCard.tsx` (+ ISI badge, enquiry, download)
- [ ] `ProductGrid.tsx` (stagger Framer Motion)
- [ ] Filter logic with `useState`
- [ ] Spare parts info banner
- [ ] `pages/Products.tsx` (assemble)

### 🔧 Services Page
- [ ] `ServiceCard.tsx` × 6
- [ ] AMC section
- [ ] CTA banner
- [ ] `pages/Services.tsx` (assemble)

### 🖼️ Gallery Page
- [ ] `GalleryFilter.tsx`
- [ ] `GalleryGrid.tsx` (react-photo-album)
- [ ] Lightbox (yet-another-react-lightbox)
- [ ] `pages/Gallery.tsx` (assemble)

### 📞 Contact Page
- [ ] `BranchTabs.tsx` (4 tabs)
- [ ] `ContactCard.tsx` + Google Maps iframe
- [ ] `EnquiryForm.tsx` (validation + WhatsApp redirect)
- [ ] `PaymentSection.tsx` (3 QR cards)
- [ ] `pages/Contact.tsx` (assemble)

### 🎨 Animations
- [ ] Framer Motion page transitions (`AnimatePresence`)
- [ ] Scroll reveal (`motion.div` + `useInView`) on all sections
- [ ] Stagger children on product/service grids
- [ ] Card hover (`whileHover: { y: -8 }`)
- [ ] Hero wave (Tailwind `animate-wave-*`)
- [ ] Bubble canvas (`requestAnimationFrame`)
- [ ] Float image (`animate-float`)
- [ ] Counter (`react-countup` with `enableScrollSpy`)
- [ ] Marquee brand strip (`animate-marquee`)
- [ ] Water ripple on button click
- [ ] Custom cursor (`CursorDot`)
- [ ] Mobile hamburger stagger (`framer-motion`)

### ✅ Final QA
- [ ] Responsive test: Mobile / Tablet / Desktop / Wide
- [ ] All WhatsApp links open correctly
- [ ] Download card generates and downloads as PNG
- [ ] React Router navigation — all 6 pages work
- [ ] Active nav link highlights correctly
- [ ] `npm run build` — zero TypeScript errors
- [ ] `npm run preview` — production build looks correct
- [ ] Deploy to Vercel / Netlify

---

## 📌 Developer Notes

1. **Images** — Download from `https://d3k88l35vy59af.cloudfront.net/A7/724/` or host locally in `public/images/products/`.
2. **WhatsApp number** — Always use `919786569973` (no `+`, no spaces, no dashes) in `wa.me` URLs.
3. **Download Card** — Canvas must wait for `logo.onload` before drawing. Draw at 1000×560px for sharp PNG output.
4. **ISI Badge** — Show a gold "ISI" badge on G-Series, Prolife Viber, Prolife Fiesta cards. Show MRP strikethrough + selling price.
5. **BubbleCanvas** — Must be `position: fixed`, `z-index: 0`. All page sections need `relative z-10` or higher.
6. **AnimatePresence** — Must wrap `<Routes>` and use `useLocation()` key on Routes for page transitions to work.
7. **Tailwind Purge** — Ensure `content` in `tailwind.config.ts` covers `./src/**/*.{ts,tsx}`.
8. **Path Alias** — Use `@/` imports throughout. Add to both `vite.config.ts` and `tsconfig.json`.
9. **Mobile First** — Write base Tailwind classes for mobile, add `md:` and `lg:` for larger screens.
10. **No Backend Needed** — All enquiries → WhatsApp. All forms → WhatsApp. Zero server required. Pure static site.

---

*Plan Version: 2.0 — React + Tailwind CSS + Vite + TypeScript*
*Client: Yazh Pure Life | Status: Ready for Implementation ✅*

Aquaguard
Kent
Blue Star
Whirlpool
LG
Genpure
Prolife