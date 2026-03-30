
-- Add is_demo flag to listings
ALTER TABLE public.listings ADD COLUMN is_demo boolean NOT NULL DEFAULT false;

-- Trigger: when a real listing is inserted, delete one random demo listing
CREATE OR REPLACE FUNCTION public.remove_demo_listing_on_real_insert()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF NEW.is_demo = false THEN
    DELETE FROM public.listings
    WHERE id = (
      SELECT id FROM public.listings
      WHERE is_demo = true AND is_active = true
      ORDER BY random()
      LIMIT 1
    );
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_remove_demo_on_real_insert
  AFTER INSERT ON public.listings
  FOR EACH ROW
  EXECUTE FUNCTION public.remove_demo_listing_on_real_insert();
