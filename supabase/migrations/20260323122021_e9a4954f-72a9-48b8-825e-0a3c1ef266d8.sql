ALTER TABLE public.listings ADD COLUMN pets_allowed boolean NOT NULL DEFAULT false;
ALTER TABLE public.listings ADD COLUMN smoking_allowed boolean NOT NULL DEFAULT false;

INSERT INTO storage.buckets (id, name, public) VALUES ('listing-photos', 'listing-photos', true);

CREATE POLICY "Anyone can view listing photos" ON storage.objects FOR SELECT USING (bucket_id = 'listing-photos');
CREATE POLICY "Authenticated users can upload listing photos" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'listing-photos');
CREATE POLICY "Users can update own listing photos" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'listing-photos');
CREATE POLICY "Users can delete own listing photos" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'listing-photos');