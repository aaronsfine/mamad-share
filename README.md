# Mamad Directory

A community-driven platform connecting families who need a safe room (ממ"ד / mamad) during rocket sirens in Israel with hosts who have one to share.

**Live:** [mamad-directory.lovable.app](https://mamad-directory.lovable.app)

---

## Table of Contents

1. [What It Does](#what-it-does)
2. [User Flows](#user-flows)
3. [Tech Stack](#tech-stack)
4. [Project Structure](#project-structure)
5. [Database Schema](#database-schema)
6. [Authentication](#authentication)
7. [External Services & APIs](#external-services--apis)
8. [Design System](#design-system)
9. [Key Features & How They Work](#key-features--how-they-work)
10. [Costs & Paid Services](#costs--paid-services)
11. [Known Limitations & Edge Cases](#known-limitations--edge-cases)
12. [Routes](#routes)

---

## What It Does

- **Guests** browse a public feed of shelter listings filtered by city/neighborhood, view approximate locations on a map, and contact hosts directly via WhatsApp.
- **Hosts** sign up, complete onboarding (name + WhatsApp number), then create/edit a single listing with details about their apartment, mamad, pricing, photos, and address.
- Hosts can offer their space **for free (חסד)** or at a **subsidized nightly rate** (₪0–200).
- Exact addresses are **never shown publicly** — only an approximate map circle (~100m radius) is displayed.

---

## User Flows

### Guest (no account needed)
1. Visit `/` → browse listings grid
2. Filter by city, neighborhood
3. Sort by price (low/high) or nearest (requires browser geolocation)
4. Click "View details" → see sleeping/mamad notes + approximate map
5. Click "Contact via WhatsApp" → opens `wa.me` link with pre-filled message

### Host
1. `/signup` → create account (email/password or Google OAuth)
2. Email confirmation required (unless using Google)
3. `/welcome` → onboarding form (full name + WhatsApp number) → saved to `profiles` table
4. `/dashboard` → create or edit listing
5. Listing saved → geocoded via ArcGIS → coordinates stored → appears in public feed

---

## Tech Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| **Framework** | React 18 + TypeScript | Single-page app |
| **Build** | Vite 5 | With SWC plugin for fast HMR |
| **Styling** | Tailwind CSS 3 | With `tailwindcss-animate` plugin |
| **UI Components** | shadcn/ui (Radix primitives) | ~40+ components in `src/components/ui/` |
| **Routing** | React Router DOM 6 | Client-side routing |
| **State/Data** | TanStack React Query 5 | For server state (listings, photos) |
| **Forms** | React Hook Form + Zod | Available but forms are currently manual state |
| **Backend** | Lovable Cloud (Supabase) | Database, auth, storage |
| **Maps** | Leaflet + react-leaflet | CartoDB Positron tiles (clean/minimal) |
| **Geocoding** | ArcGIS REST API | Free tier, no API key needed |
| **Communication** | WhatsApp `wa.me` links | Pre-filled messages, no API needed |
| **Auth SDK** | `@lovable.dev/cloud-auth-js` | Google OAuth integration |
| **Testing** | Vitest + Playwright | Unit + E2E (scaffolded) |

---

## Project Structure

```
src/
├── pages/
│   ├── Index.tsx          # Public feed — listing grid with filters
│   ├── Login.tsx          # Email/password + Google sign-in
│   ├── Signup.tsx         # Account creation + email confirmation
│   ├── Welcome.tsx        # Post-signup onboarding (name, WhatsApp)
│   ├── Dashboard.tsx      # Host dashboard — create/edit/view listing (721 lines, large)
│   ├── About.tsx          # Static about page
│   ├── HowItWorks.tsx     # Step-by-step guide for guests & hosts
│   ├── Contact.tsx        # Contact info + volunteer CTA
│   └── NotFound.tsx       # 404 page
├── components/
│   ├── ListingCard.tsx    # Individual listing card with photo carousel, details modal, map
│   ├── ListingCardSkeleton.tsx  # Loading skeleton for listing cards
│   ├── ShelterFilters.tsx # City/neighborhood dropdown filters
│   ├── SearchableSelect.tsx # Searchable combobox (used in Dashboard for city/neighborhood)
│   ├── ApproxMap.tsx      # Leaflet map with ~100m privacy circle
│   ├── Footer.tsx         # Site-wide footer with nav links
│   ├── NavLink.tsx        # Active-state-aware nav link wrapper
│   └── ui/               # ~40+ shadcn/ui components (button, card, dialog, etc.)
├── hooks/
│   ├── useGeolocation.ts  # Browser geolocation with lazy request
│   ├── use-mobile.tsx     # Mobile breakpoint detection
│   └── use-toast.ts       # Toast notification hook
├── lib/
│   ├── locations.ts       # Static city/neighborhood data + city center coords
│   ├── distance.ts        # Haversine formula + distance formatting
│   ├── whatsapp.ts        # WhatsApp link builder with pre-filled message
│   └── utils.ts           # cn() class merge utility
├── integrations/
│   ├── supabase/
│   │   ├── client.ts      # Auto-generated Supabase client (DO NOT EDIT)
│   │   └── types.ts       # Auto-generated DB types (DO NOT EDIT)
│   └── lovable/
│       └── index.ts       # Auto-generated Google OAuth helper (DO NOT EDIT)
└── index.css              # Tailwind + design tokens (HSL color system)
```

---

## Database Schema

### `listings` table

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid (PK) | Auto-generated |
| `host_id` | uuid | References auth.users |
| `host_name` | text | Display name |
| `phone` | text | WhatsApp number (with country code, e.g. `972501234567`) |
| `city` | text | From static list (`src/lib/locations.ts`) |
| `neighborhood` | text | From static list per city |
| `address` | text (nullable) | Private — never shown publicly, used for geocoding only |
| `latitude` | float (nullable) | Geocoded on save |
| `longitude` | float (nullable) | Geocoded on save |
| `bedrooms` | int | Default 0 |
| `total_beds` | int | Default 0 |
| `sleeping_notes` | text (nullable) | e.g. "2 mattresses, sofa bed" |
| `mamad_notes` | text (nullable) | e.g. "Reinforced door, stocked with water" |
| `is_active` | boolean | Controls visibility in public feed |
| `pets_allowed` | boolean | Default false |
| `smoking_allowed` | boolean | Default false |
| `price_type` | text | `'free'` or `'paid'` |
| `price_per_night` | int (nullable) | In ₪, only when `price_type = 'paid'` |
| `created_at` | timestamptz | Auto |
| `updated_at` | timestamptz | Auto |

### `profiles` table

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid (PK) | Same as auth.users id |
| `full_name` | text (nullable) | Set during onboarding |
| `whatsapp_phone` | text (nullable) | Set during onboarding |
| `onboarding_completed` | boolean | Gates access to dashboard |
| `created_at` | timestamptz | Auto |
| `updated_at` | timestamptz | Auto |

### Storage

- **Bucket:** `listing-photos`
- **Structure:** `{listing_id}/{timestamp}-{random}.{ext}`
- **Limit:** Max 5 photos per listing
- **Access:** Public URLs via `getPublicUrl()`

---

## Authentication

| Method | Flow |
|--------|------|
| **Email/Password** | Signup → confirmation email → verify → login |
| **Google OAuth** | Via `@lovable.dev/cloud-auth-js` → redirects to Google → sets Supabase session |

### Auth Flow
1. **Signup** (`/signup`) → email confirmation sent → user clicks link → redirected to `/welcome`
2. **Google** → OAuth redirect → on success, navigates to `/dashboard`
3. **Onboarding** (`/welcome`) → checks `profiles.onboarding_completed` → if false, shows form → on submit, navigates to `/dashboard`
4. **Dashboard** (`/dashboard`) → checks session → checks onboarding → loads listing

### Session Management
- Supabase client configured with `persistSession: true`, `autoRefreshToken: true`
- `onAuthStateChange` listener in Login/Signup/Dashboard for real-time auth events
- Sign-out clears session and redirects to `/login`

---

## External Services & APIs

### 1. ArcGIS Geocoding (Free, no API key)
- **Endpoint:** `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates`
- **Used in:** `Dashboard.tsx` on listing save
- **Fallback chain** (tries in order, stops on first match):
  1. `{address}, {neighborhood}, {city}, Israel`
  2. `{address}, {city}, Israel`
  3. `{address (cleaned)}, {city}, Israel` (strips "st/street")
  4. `{neighborhood}, {city}, Israel`
  5. `{city}, Israel`
  6. Static city center coords from `locations.ts`
- **Sanity check:** After geocoding, compares result to city center via Haversine distance. If >15km, skips and falls back (prevents cross-city mismatches). Warning toast shown.
- **Rate limits:** Free tier — generous for this use case, no key needed.

### 2. Leaflet + CartoDB Positron Tiles (Free)
- **Tile URL:** `https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png`
- **Used in:** `ApproxMap.tsx` for the "View details" modal
- **Config:** Scroll-wheel zoom off, dragging on, zoom controls on, zoom level 16
- **Privacy circle:** 100m radius, blue, semi-transparent fill

### 3. WhatsApp Deep Links (Free)
- **Format:** `https://wa.me/{phone}?text={encoded_message}`
- **Pre-filled message:** "Hi {hostName}, I saw your shelter listing in {city}. Is it still available?"
- **Phone sanitization:** Strips spaces, dashes, plus signs

### 4. Lovable Cloud (Supabase)
- Database (PostgreSQL)
- Authentication (email/password + Google OAuth)
- Storage (listing photos bucket)
- Auto-generated client + types

---

## Design System

### Color Tokens (HSL, defined in `index.css`)

| Token | Value | Usage |
|-------|-------|-------|
| `--primary` | `217 71% 45%` | Blue — headers, links, shield icon, map circle |
| `--background` | `210 15% 95%` | Page background (light gray) |
| `--card` | `0 0% 100%` | White cards |
| `--foreground` | `220 15% 12%` | Body text |
| `--muted-foreground` | `215 14% 45%` | Secondary text |
| `--border` | `220 13% 90%` | Card/input borders |
| `--destructive` | `0 84% 60%` | Red — errors, "No Pets" badges |
| `--whatsapp` | `145 63% 42%` | Green — WhatsApp CTA button |

### Typography
- System font stack: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial`
- No custom fonts loaded — fast, no FOUT

### Components
- All from shadcn/ui, customized with design tokens
- Custom: `SearchableSelect` (combobox), `ListingCard`, `ApproxMap`, `ShelterFilters`
- Dark mode: **disabled** (`darkMode: ["class", "never"]` in Tailwind config)

---

## Key Features & How They Work

### Public Feed (`/`)
- Fetches all `is_active = true` listings via Supabase
- Fetches photos from storage bucket per listing
- Client-side filtering: city, neighborhood, pets, smoking, price type, max price, bed/bedroom minimums
- Client-side sorting: price low→high, price high→low, nearest (Haversine distance)
- Geolocation: lazy-requested via browser API, cached for 5 minutes

### Listing Cards
- Photo header with lightbox carousel (click to expand, left/right navigation)
- Price badge: "Free" (green heart) or "₪X/night"
- Pets/smoking status badges (green = allowed, red = not)
- "View details" modal: sleeping notes, mamad notes, approximate map
- WhatsApp CTA at bottom

### Approximate Map (Privacy)
- Shows a **100m radius blue circle** centered on the geocoded address
- The exact address pin is **not shown** — only the shaded area
- Text: "Approximate area shown — exact address shared after contact"
- Uses CartoDB Positron (clean, minimal) map tiles

### Dashboard (`/dashboard`)
- One listing per host (enforced by `host_id` filter)
- View mode: read-only card showing all listing details
- Edit mode: full form with all fields, photo upload/delete
- Photo upload: up to 5 images, stored in `listing-photos/{listing_id}/`
- Geocoding runs on every save

### Pricing Model
- **Free (חסד / chesed):** Act of kindness, no cost
- **Subsidized:** Symbolic fee in ₪, capped at 200₪/night in the filter UI
- Pricing section in dashboard includes guidance text encouraging generosity

---

## Costs & Paid Services

| Service | Cost | Notes |
|---------|------|-------|
| **Lovable Cloud** | Usage-based | Database, auth, storage, edge functions. Free tier available. |
| **ArcGIS Geocoding** | **Free** | No API key. Free tier is generous (~20k/month). No account needed. |
| **CartoDB/CARTO Tiles** | **Free** | Via OpenStreetMap. No API key. For non-commercial use (community project). |
| **WhatsApp Links** | **Free** | Deep links via `wa.me`, no API. |
| **Domain** | Included | `mamad-directory.lovable.app` via Lovable publish |
| **Google OAuth** | **Free** | Via Lovable Cloud auth integration |

**Total recurring cost:** Lovable Cloud usage (database/auth/storage). Everything else is free.

---

## Known Limitations & Edge Cases

1. **One listing per host** — the dashboard queries `listings` by `host_id` with `.maybeSingle()`. No UI for multiple listings.
2. **Geocoding accuracy** — ArcGIS is generally good for Israeli addresses but some streets (especially transliterated Hebrew) may not resolve perfectly. The fallback chain mitigates this.
3. **Address mismatch detection** — if a geocoded address is >15km from the selected city center, it's rejected and falls back to neighborhood/city level. Threshold is generous to cover large cities.
4. **No admin panel** — no way to moderate listings except via direct database access.
5. **No real-time updates** — listings are fetched on page load and cached by React Query. No Supabase realtime subscription.
6. **Photo storage** — no image optimization/compression. Photos are stored as-is.
7. **City/neighborhood list is static** — defined in `src/lib/locations.ts`. Adding new cities requires a code change. Currently covers 20 Israeli cities.
8. **No Hebrew UI** — the interface is entirely in English. Hebrew content (like חסד) appears in specific contexts.
9. **Filters in Index.tsx** — pets, smoking, price, beds/bedrooms filters exist in Index.tsx state but the `ShelterFilters` component currently only renders city/neighborhood dropdowns. The other filters work in the filtering logic but have no UI controls.
10. **`(listing as any)` casts** — several places cast listing fields like `pets_allowed`, `smoking_allowed`, `price_type`, `price_per_night` with `as any`. These fields exist in the DB types but the casts remain from earlier iterations.

---

## Routes

| Path | Component | Auth Required | Description |
|------|-----------|---------------|-------------|
| `/` | `Index` | No | Public feed with listing grid |
| `/login` | `Login` | No | Sign in (email + Google) |
| `/signup` | `Signup` | No | Create account |
| `/welcome` | `Welcome` | Yes | Onboarding (name + WhatsApp) |
| `/dashboard` | `Dashboard` | Yes | Create/edit listing |
| `/about` | `About` | No | About the project |
| `/how-it-works` | `HowItWorks` | No | User guide |
| `/contact` | `Contact` | No | Contact info |
| `*` | `NotFound` | No | 404 page |

---

## Cities Supported

Ashdod, Ashkelon, Bat Yam, Beer Sheva, Givatayim, Haifa, Herzliya, Holon, Jerusalem, Kfar Saba, Modiin, Netanya, Petah Tikva, Ra'anana, Ramat Gan, Rehovot, Rishon LeZion, Sderot, Tel Aviv, Tiberias

Each city has 3–28 neighborhoods defined in `src/lib/locations.ts`, with approximate center coordinates for geocoding fallback.
