-- Create listings table for mamad shelter directory
CREATE TABLE public.listings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  host_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  host_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  city TEXT NOT NULL,
  neighborhood TEXT NOT NULL,
  address TEXT,
  latitude FLOAT8,
  longitude FLOAT8,
  bedrooms INTEGER NOT NULL DEFAULT 1,
  total_beds INTEGER NOT NULL DEFAULT 1,
  mamad_size_sqm NUMERIC NOT NULL DEFAULT 4,
  sleeping_notes TEXT,
  mamad_notes TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;

-- Public can read active listings
CREATE POLICY "Anyone can view active listings"
  ON public.listings FOR SELECT
  USING (is_active = true);

-- Hosts can read their own listings (including inactive)
CREATE POLICY "Hosts can view own listings"
  ON public.listings FOR SELECT
  USING (auth.uid() = host_id);

-- Hosts can create their own listings
CREATE POLICY "Hosts can create own listings"
  ON public.listings FOR INSERT
  WITH CHECK (auth.uid() = host_id);

-- Hosts can update their own listings
CREATE POLICY "Hosts can update own listings"
  ON public.listings FOR UPDATE
  USING (auth.uid() = host_id);

-- Hosts can delete their own listings
CREATE POLICY "Hosts can delete own listings"
  ON public.listings FOR DELETE
  USING (auth.uid() = host_id);

-- Timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_listings_updated_at
  BEFORE UPDATE ON public.listings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Indexes for filtering
CREATE INDEX idx_listings_city ON public.listings(city);
CREATE INDEX idx_listings_is_active ON public.listings(is_active);
CREATE INDEX idx_listings_host_id ON public.listings(host_id);