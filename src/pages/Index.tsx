import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Shield, Home as HomeIcon, MapPinOff } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { ListingCard } from '@/components/ListingCard';
import { ShelterFilters } from '@/components/ShelterFilters';
import type { SortOption } from '@/components/ShelterFilters';
import { useGeolocation } from '@/hooks/useGeolocation';
import { haversineDistance } from '@/lib/distance';
import { ALL_CITIES, getNeighborhoods } from '@/lib/locations';
import { Button } from '@/components/ui/button';
import { ListingCardSkeleton } from '@/components/ListingCardSkeleton';
import { Footer } from '@/components/Footer';
import { LanguageToggle } from '@/components/LanguageToggle';
import { useLanguage } from '@/i18n/LanguageContext';
import type { Tables } from '@/integrations/supabase/types';

export default function Index() {
  const { t } = useLanguage();
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('all');
  const [petsFilter, setPetsFilter] = useState<'all' | 'yes' | 'no'>('all');
  const [smokingFilter, setSmokingFilter] = useState<'all' | 'yes' | 'no'>('all');
  const [priceFilter, setPriceFilter] = useState<'all' | 'free'>('all');
  const [maxPrice, setMaxPrice] = useState(200);
  const [sortBy, setSortBy] = useState<SortOption>('nearest');
  const [minBeds, setMinBeds] = useState(0);
  const [minBedrooms, setMinBedrooms] = useState(0);
  
  const geo = useGeolocation(true);

  const { data: listings = [], isLoading } = useQuery({
    queryKey: ['listings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('listings_public' as any)
        .select('id, host_id, host_name, city, neighborhood, address, bedrooms, total_beds, pets_allowed, smoking_allowed, price_type, price_per_night, sleeping_notes, mamad_notes, latitude, longitude, is_active, created_at, updated_at')
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return (data as unknown as Tables<'listings'>[]) ?? [];
    },
  });

  const { data: listingPhotos = {} } = useQuery({
    queryKey: ['listing-photos', listings.map(l => l.id)],
    queryFn: async () => {
      const results = await Promise.all(
        listings.map(async (listing) => {
          const { data: files } = await supabase.storage
            .from('listing-photos')
            .list(listing.id, { limit: 10 });
          if (files && files.length > 0) {
            const thumbs = files.map(f => {
              const path = `${listing.id}/${f.name}`;
              return {
                thumb: supabase.storage.from('listing-photos').getPublicUrl(path, {
                  transform: { width: 400, quality: 75 },
                }).data.publicUrl,
                full: supabase.storage.from('listing-photos').getPublicUrl(path).data.publicUrl,
              };
            });
            return { id: listing.id, thumbs: thumbs.map(t => t.thumb), fulls: thumbs.map(t => t.full) };
          }
          return { id: listing.id, thumbs: [] as string[], fulls: [] as string[] };
        })
      );
      const photoMap: Record<string, { thumbs: string[]; fulls: string[] }> = {};
      for (const r of results) {
        if (r.thumbs.length > 0) {
          photoMap[r.id] = { thumbs: r.thumbs, fulls: r.fulls };
        }
      }
      return photoMap;
    },
    enabled: listings.length > 0,
  });

  const cities = ALL_CITIES;
  const neighborhoods = useMemo(() => {
    return selectedCity !== 'all' ? getNeighborhoods(selectedCity) : [];
  }, [selectedCity]);

  const filtered = useMemo(() => {
    return listings.filter((l) => {
      if (selectedCity !== 'all' && l.city !== selectedCity) return false;
      if (selectedNeighborhood !== 'all' && l.neighborhood !== selectedNeighborhood) return false;
      if (petsFilter === 'yes' && !l.pets_allowed) return false;
      if (petsFilter === 'no' && l.pets_allowed) return false;
      if (smokingFilter === 'yes' && !l.smoking_allowed) return false;
      if (smokingFilter === 'no' && l.smoking_allowed) return false;
      if (priceFilter === 'free' && l.price_type !== 'free') return false;
      if (priceFilter !== 'free' && maxPrice < 200) {
        if (l.price_type === 'paid' && l.price_per_night != null && l.price_per_night > maxPrice) return false;
      }
      if (minBeds > 0 && l.total_beds < minBeds) return false;
      if (minBedrooms > 0 && l.bedrooms < minBedrooms) return false;
      return true;
    });
  }, [listings, selectedCity, selectedNeighborhood, petsFilter, smokingFilter, priceFilter, maxPrice, minBeds, minBedrooms]);

  const sortedListings = useMemo(() => {
    const hasUserLocation = geo.latitude != null && geo.longitude != null;
    const withDistance = filtered.map((listing) => {
      let distanceKm: number | null = null;
      if (hasUserLocation && listing.latitude != null && listing.longitude != null) {
        distanceKm = haversineDistance(geo.latitude!, geo.longitude!, listing.latitude, listing.longitude);
      }
      return { listing, distanceKm };
    });

    switch (sortBy) {
      case 'nearest':
        if (hasUserLocation) {
          withDistance.sort((a, b) => {
            if (a.distanceKm == null && b.distanceKm == null) return 0;
            if (a.distanceKm == null) return 1;
            if (b.distanceKm == null) return -1;
            return a.distanceKm - b.distanceKm;
          });
        }
        break;
      case 'price_low':
        withDistance.sort((a, b) => {
          const aFree = a.listing.price_type === 'free';
          const bFree = b.listing.price_type === 'free';
          if (aFree && bFree) return 0;
          if (aFree) return -1;
          if (bFree) return 1;
          return (a.listing.price_per_night ?? 0) - (b.listing.price_per_night ?? 0);
        });
        break;
      case 'price_high':
        withDistance.sort((a, b) => {
          const aFree = a.listing.price_type === 'free';
          const bFree = b.listing.price_type === 'free';
          if (aFree && bFree) return 0;
          if (aFree) return 1;
          if (bFree) return -1;
          return (b.listing.price_per_night ?? 0) - (a.listing.price_per_night ?? 0);
        });
        break;
    }

    return withDistance;
  }, [filtered, geo.latitude, geo.longitude, sortBy]);

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    setSelectedNeighborhood('all');
  };

  const resultsLabel = useMemo(() => {
    const count = sortedListings.length;
    const cityLabel = selectedCity !== 'all' ? selectedCity : '';
    const neighborhoodLabel = selectedNeighborhood !== 'all' ? `, ${selectedNeighborhood}` : '';
    const location = cityLabel ? ` ${t('results.in')} ${cityLabel}${neighborhoodLabel}` : '';
    if (count === 0) return `${t('results.none.text')}`;
    if (count <= 2) return `${count} ${t('results.found')}${location} — ${t('results.few')}`;
    return `${count} ${t('results.found')}${location}`;
  }, [sortedListings.length, selectedCity, selectedNeighborhood, t]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <h1 className="text-base font-semibold text-primary">{t('app.name')}</h1>
          </div>
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <Button variant="outline" size="sm" asChild className="rounded-full border-primary text-primary hover:bg-accent">
              <Link to="/login">
                <HomeIcon className="h-4 w-4 mr-1.5" />
                {t('nav.listApartment')}
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <section className="bg-card border-b border-border">
        <div className="max-w-5xl mx-auto px-4 pt-6 pb-4">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-primary mb-2">
              {t('hero.title')}
            </h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto mt-2">
              {t('hero.subtitle')}
            </p>
            <p className="text-xs text-muted-foreground/70 mt-1">
              {t('hero.subtext')}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-card border-b border-border">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 md:text-start text-center">
            {t('filters.browse')}
          </p>
          <ShelterFilters
            cities={cities}
            neighborhoods={neighborhoods}
            selectedCity={selectedCity}
            selectedNeighborhood={selectedNeighborhood}
            onCityChange={handleCityChange}
            onNeighborhoodChange={setSelectedNeighborhood}
            petsFilter={petsFilter}
            onPetsFilterChange={setPetsFilter}
            smokingFilter={smokingFilter}
            onSmokingFilterChange={setSmokingFilter}
            priceFilter={priceFilter}
            onPriceFilterChange={setPriceFilter}
            maxPrice={maxPrice}
            onMaxPriceChange={setMaxPrice}
            minBeds={minBeds}
            onMinBedsChange={setMinBeds}
            minBedrooms={minBedrooms}
            onMinBedroomsChange={setMinBedrooms}
            sortBy={sortBy}
            onSortByChange={setSortBy}
            hasLocation={geo.latitude != null && geo.longitude != null}
          />
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-4 py-5 flex-1">
        {isLoading ? (
          <div className="bg-card rounded-2xl border border-border shadow-sm px-4 py-5 md:px-6 md:py-6">
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <ListingCardSkeleton key={i} />
              ))}
            </div>
          </div>
        ) : sortedListings.length === 0 ? (
          <div className="bg-card rounded-2xl border border-border shadow-sm px-4 py-10 text-center">
            <MapPinOff className="h-14 w-14 mx-auto text-muted-foreground/30 mb-4" strokeWidth={1.5} />
            <h3 className="text-lg font-semibold text-foreground mb-1.5">{t('results.none.title')}</h3>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto mb-5">
              {t('results.none.text')}
            </p>
            <Button variant="outline" asChild className="rounded-full border-primary text-primary hover:bg-accent">
              <Link to="/login">
                <HomeIcon className="h-4 w-4 mr-1.5" />
                {t('results.none.cta')}
              </Link>
            </Button>
          </div>
        ) : (
          <div className="bg-card rounded-2xl border border-border shadow-sm px-4 py-5 md:px-6 md:py-6">
            <div className="mb-3">
              <h3 className="text-lg font-semibold text-foreground">{t('results.title')}</h3>
              <p className="text-sm text-muted-foreground">{resultsLabel}</p>
            </div>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {sortedListings.map(({ listing, distanceKm }) => (
                <ListingCard key={listing.id} listing={listing} distanceKm={distanceKm} thumbUrls={listingPhotos[listing.id]?.thumbs} fullUrls={listingPhotos[listing.id]?.fulls} />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
