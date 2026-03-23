

## Problem

When a host types an address that doesn't match their selected city/neighborhood (e.g., selects "Jerusalem, Nachlaot" but types a Tel Aviv street), the ArcGIS geocoder will either:
1. Return coordinates for the actual typed address (wrong city) -- the map will show a location far from the selected neighborhood
2. Fall through to city-level fallback -- inaccurate but at least in the right area

There is no validation or warning to catch this mismatch.

## Plan

### 1. Add post-geocode sanity check in Dashboard.tsx

After ArcGIS returns coordinates, compare them against the expected city center (from `getCityCoords`). If the returned coordinates are more than ~15km from the city center, treat it as a mismatch.

**On mismatch:**
- Show a warning toast: "The address you entered doesn't appear to be in {city}. Please double-check your address."
- Fall back to neighborhood+city geocoding (skip the street-level result) so the map stays in the correct general area
- Still allow the save to proceed -- don't block it

### 2. Add address field hint text

Below the address input in the listing form, add helper text:
"Enter your street address in {city}, {neighborhood}. This is used for the approximate map only and is never shown publicly."

This nudges the host to enter a local address and reassures them about privacy.

### Technical details

- Use `haversineDistance()` (already exists in `src/lib/distance.ts`) to compute distance between geocoded result and city center
- Threshold: ~15km (covers large cities like Jerusalem end-to-end)
- If geocoded point fails the check, skip it and try the next query in the fallback chain (neighborhood+city, then city-only)
- No database or schema changes needed

### Files to modify
- `src/pages/Dashboard.tsx` -- add distance check after geocode, add address hint text
- `src/lib/distance.ts` -- may need to export the haversine function if not already exported

