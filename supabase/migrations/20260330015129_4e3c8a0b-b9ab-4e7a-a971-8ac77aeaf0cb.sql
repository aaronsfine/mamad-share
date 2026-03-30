
-- Create a public-safe view excluding phone column
CREATE VIEW public.listings_public
WITH (security_invoker = on) AS
  SELECT id, host_id, host_name, city, neighborhood, address, bedrooms, total_beds,
         pets_allowed, smoking_allowed, price_type, price_per_night,
         sleeping_notes, mamad_notes, latitude, longitude, is_active, is_demo,
         created_at, updated_at
  FROM public.listings;

-- Allow public to select from the view
GRANT SELECT ON public.listings_public TO anon;
GRANT SELECT ON public.listings_public TO authenticated;

-- Replace the overly broad public SELECT policy with one that denies anonymous direct table access
DROP POLICY IF EXISTS "Anyone can view active listings" ON public.listings;

-- Authenticated users who are NOT the host can read active listings (for dashboard, etc.)
CREATE POLICY "Authenticated users can view active listings"
ON public.listings FOR SELECT
TO authenticated
USING (is_active = true);
