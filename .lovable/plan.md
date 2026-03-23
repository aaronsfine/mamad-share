

## Mamad Directory — Final Implementation Plan

### Design System
- **Primary**: Blue & white (Israeli flag palette) — blue headers, white cards, clean backgrounds
- **CTA**: Bright green WhatsApp buttons
- **Typography**: Clean sans-serif, generous spacing, Airbnb-level minimalism
- **Layout**: Mobile-first, RTL-ready (English V1, Hebrew V2)

### Backend (Supabase)

**Auth**: Magic link (email-based)

**`listings` table**:
- host_id (FK to auth.users), host_name, phone, city, neighborhood
- bedrooms, total_beds, mamad_size_sqm, sleeping_notes, mamad_notes
- address (text, nullable — private, never exposed publicly)
- latitude (float8, nullable), longitude (float8, nullable)
- is_active (boolean), created_at, updated_at

**RLS**: Public reads active listings (lat/lng included for client-side distance calc, address excluded from public queries). Hosts CRUD own listing only.

### Pages & Features

#### 1. Public Feed (`/`)
- Sticky header with app name + City / Neighborhood dropdown filters
- On load, request browser geolocation (optional, graceful denial)
- Responsive card grid (1 col mobile, 2-3 col desktop)
- **Sorting**: user location available → nearest first; otherwise → newest first
- Empty state when no matches

#### 2. Listing Cards (no expand/click)
- Host name, City & Neighborhood
- **Distance badge**: "~X.X km away" — only rendered if user granted geolocation AND listing has lat/lng. Otherwise completely hidden (no placeholder, no "unknown").
- Callout: "Best for families up to ~X people" (X = total_beds + floor(mamad_size_sqm / 2))
- 2-column stats: Bedrooms, Total Beds, Mamad Size (sqm)
- Optional small-text notes
- Full-width green WhatsApp button → `wa.me/{sanitized_phone}` with pre-filled message

#### 3. Host Dashboard (`/dashboard`) — Protected
- Magic link auth
- Form fields: name, phone, city, neighborhood, **address** (labeled "Approximate address — private, not shown publicly"), bedrooms, total_beds, mamad_size_sqm, sleeping_notes, mamad_notes
- **No manual lat/lng input** — hosts enter address only; lat/lng remain nullable until geocoding is wired up post-launch
- Active/Hidden toggle

### Distance Logic (client-side)
- Haversine utility function for km calculation
- Only compute and display distance when both user coords AND listing coords exist
- If either is missing, distance badge is hidden entirely — no fallback text
- Sort by distance only when user location is available; otherwise sort by created_at desc

### Geocoding (V1 → V2 bridge)
- V1: Address field collected and stored; lat/lng nullable; no geocoding API call
- V2: Add geocoding (e.g. edge function calling a geocoding API) triggered on listing save to populate lat/lng from address
- Architecture is ready: address stored, lat/lng columns exist, distance logic works when coords are present

### File Structure
- `src/pages/Index.tsx` — public feed with filters, geolocation hook, sorted listings
- `src/pages/Dashboard.tsx` — protected host form + active toggle
- `src/pages/Auth.tsx` — magic link login
- `src/components/ListingCard.tsx` — card component with conditional distance badge
- `src/components/ShelterFilters.tsx` — city/neighborhood dropdowns
- `src/hooks/useGeolocation.ts` — browser geolocation hook (optional permission)
- `src/lib/distance.ts` — haversine utility
- `src/lib/whatsapp.ts` — phone sanitization + message builder
- `src/integrations/supabase/` — client, types, queries

### Implementation Order
1. Connect Supabase & create listings table with migration
2. Build shared utilities (distance, WhatsApp, geolocation hook)
3. Build ListingCard and ShelterFilters components
4. Build public feed page with filters, geolocation, sorting
5. Build auth page (magic link)
6. Build host dashboard (form + toggle)
7. Wire up routing and RLS policies

