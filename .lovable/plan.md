

## Airbnb-Style UI Refactor + Hero Text Update

Pure visual/layout refactor — no new features, no backend changes. Four files modified.

### 1. `src/pages/Index.tsx` — Layout & structure

- All `max-w-4xl` → `max-w-6xl`
- **Header**: `py-4` → `py-3`, rename "Host Login" to "List Your Apartment" with `variant="outline"`
- **Hero + Filters merged** into one section:
  - Title: "Find a Safe Place to Sleep Tonight" (`text-2xl sm:text-3xl`)
  - Subtitle: "Families across Israel are opening their homes to help others stay safe during sirens. Find a nearby apartment with a secure room (mamad) and contact the host directly."
  - Tertiary line: "Simple. Fast. Community-driven." in muted smaller text
  - Filters embedded directly below in a rounded bar (via updated `ShelterFilters`)
  - Reduce vertical padding (`py-8`)
- **Grid**: `md:grid-cols-2` → `sm:grid-cols-2 lg:grid-cols-3`, gap `gap-5` → `gap-4`
- Skeleton count: 4 → 6
- Empty state: `py-24` → `py-16`

### 2. `src/components/ListingCard.tsx` — Card redesign

Restructure hierarchy top-to-bottom:
- **Top**: Host name small/muted with `User` icon. Location (city, neighborhood) large and bold with `MapPin` icon. Distance badge inline.
- **Middle**: "Best for ~X people" as pill badge (`rounded-full bg-primary/10 text-primary`). Stats as single horizontal line: "3 bedrooms · 5 beds · 15 sqm mamad". Optional notes muted.
- **Bottom**: Full-width green WhatsApp button.
- Reduce padding `p-6` → `p-5`, spacing `space-y-5` → `space-y-3`

### 3. `src/components/ShelterFilters.tsx` — Embedded bar

- Wrap selects in `bg-muted/50 rounded-xl p-2 shadow-sm border`
- Selects get `bg-white` for contrast

### 4. `src/components/ListingCardSkeleton.tsx` — Match new layout

- Adjust skeleton shapes: small bar (host name), wider bar (location), single horizontal stats line, button

### Technical details

All changes are CSS classes and JSX restructuring. No new dependencies. No backend or routing changes.

