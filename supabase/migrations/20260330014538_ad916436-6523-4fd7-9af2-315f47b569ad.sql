
-- 1. Create a function to check if user owns the listing referenced in a storage path
CREATE OR REPLACE FUNCTION public.user_owns_listing_photo(file_name text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.listings
    WHERE id = (split_part(file_name, '/', 1))::uuid
      AND host_id = auth.uid()
  );
$$;

-- 2. Drop existing weak storage policies
DROP POLICY IF EXISTS "Authenticated users can upload listing photos" ON storage.objects;
DROP POLICY IF EXISTS "Users can update own listing photos" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete own listing photos" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view listing photos" ON storage.objects;

-- 3. Recreate with ownership checks
CREATE POLICY "Anyone can view listing photos"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'listing-photos');

CREATE POLICY "Hosts can upload own listing photos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'listing-photos'
  AND public.user_owns_listing_photo(name)
);

CREATE POLICY "Hosts can update own listing photos"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'listing-photos'
  AND public.user_owns_listing_photo(name)
);

CREATE POLICY "Hosts can delete own listing photos"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'listing-photos'
  AND public.user_owns_listing_photo(name)
);
