
CREATE OR REPLACE FUNCTION public.get_whatsapp_url(listing_id uuid)
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    'https://wa.me/' ||
    regexp_replace(l.phone, '[\s\-\+]', '', 'g') ||
    '?text=' ||
    replace(
      replace(
        replace(
          'Hi ' || l.host_name || ', I saw your shelter listing in ' || l.city || '. Is it still available?',
          ' ', '%20'
        ),
        ',', '%2C'
      ),
      '.', '.'
    )
  FROM public.listings l
  WHERE l.id = listing_id
    AND l.is_active = true
  LIMIT 1;
$$;
