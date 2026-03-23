ALTER TABLE public.listings ADD COLUMN price_type text NOT NULL DEFAULT 'free';
ALTER TABLE public.listings ADD COLUMN price_per_night numeric NULL;