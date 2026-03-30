

## Problem

Photos load slowly because:
1. **Sequential storage API calls** — `Index.tsx` loops through every listing one-by-one calling `supabase.storage.list()`, creating a waterfall of N API requests
2. **No lazy loading** — all images load eagerly even if off-screen
3. **No image optimization** — full-size originals served directly

## Recommendation: Lazy loading + fix the waterfall (no hosting change needed)

Moving hosting to Cloudflare won't help — the bottleneck is the sequential API calls and eager image loading, not the CDN. Supabase storage already serves from a CDN. The fix is code-level.

## Plan

### 1. Parallelize photo fetching
Replace the sequential `for` loop in `Index.tsx` with `Promise.all` so all listing photo URLs are fetched concurrently instead of one-by-one.

**File**: `src/pages/Index.tsx` (lines 48-59)

### 2. Add native lazy loading to images
Add `loading="lazy"` to the `<img>` tag in `ListingCard.tsx` so browsers only fetch images when cards scroll into view.

**File**: `src/components/ListingCard.tsx` (line 46 and line 202)

### 3. Add Supabase image transform for thumbnails
Use Supabase storage's built-in image transformation to request smaller thumbnails for the card grid (e.g. 400px wide), keeping full-size only for the lightbox.

**File**: `src/pages/Index.tsx` — generate two URL variants (thumb + full) per photo
**File**: `src/components/ListingCard.tsx` — use thumb URL for card, full URL for lightbox

---

These three changes should dramatically reduce initial load time without any infrastructure changes.

