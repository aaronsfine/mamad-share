import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Shield, Home as HomeIcon, MapPinOff } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { ListingCard } from '@/components/ListingCard';
import { ShelterFilters } from '@/components/ShelterFilters';
import { useGeolocation } from '@/hooks/useGeolocation';
import { haversineDistance } from '@/lib/distance';
import { ALL_CITIES, getNeighborhoods } from '@/lib/locations';
import { Button } from '@/components/ui/button';
import { ListingCardSkeleton } from '@/components/ListingCardSkeleton';
import { Footer } from '@/components/Footer';
import type { Tables } from '@/integrations/supabase/types';

export default function Index() {
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('all');
  const geo = useGeolocation();

  const { data: listings = [], isLoading } = useQuery({
    queryKey: ['listings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('listings')
        .select('id, host_name, phone, city, neighborhood, bedrooms, total_beds, mamad_size_sqm, sleeping_notes, mamad_notes, latitude, longitude, created_at')
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as Tables<'listings'>[];
    },
  });

  const cities = ALL_CITIES;
  const neighborhoods = useMemo(() => {
    return selectedCity !== 'all' ? getNeighborhoods(selectedCity) : [];
  }, [selectedCity]);

  const filtered = useMemo(() => {
    return listings.filter((l) => {
      if (selectedCity !== 'all' && l.city !== selectedCity) return false;
      if (selectedNeighborhood !== 'all' && l.neighborhood !== selectedNeighborhood) return false;
      return true;
    });
  }, [listings, selectedCity, selectedNeighborhood]);

  const sortedListings = useMemo(() => {
    const hasUserLocation = geo.latitude != null && geo.longitude != null;
    const withDistance = filtered.map((listing) => {
      let distanceKm: number | null = null;
      if (hasUserLocation && listing.latitude != null && listing.longitude != null) {
        distanceKm = haversineDistance(geo.latitude!, geo.longitude!, listing.latitude, listing.longitude);
      }
      return { listing, distanceKm };
    });
    if (hasUserLocation) {
      withDistance.sort((a, b) => {
        if (a.distanceKm == null && b.distanceKm == null) return 0;
        if (a.distanceKm == null) return 1;
        if (b.distanceKm == null) return -1;
        return a.distanceKm - b.distanceKm;
      });
    }
    return withDistance;
  }, [filtered, geo.latitude, geo.longitude]);

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    setSelectedNeighborhood('all');
  };

  const resultsLabel = useMemo(() => {
    const count = sortedListings.length;
    const cityLabel = selectedCity !== 'all' ? selectedCity : '';
    const neighborhoodLabel = selectedNeighborhood !== 'all' ? `, ${selectedNeighborhood}` : '';
    const location = cityLabel ? ` in ${cityLabel}${neighborhoodLabel}` : '';
    if (count === 0) return `No places found${location}. Try another city or neighborhood.`;
    if (count <= 2) return `${count} place${count > 1 ? 's' : ''} found${location} — only a few rooms available right now.`;
    return `${count} places found${location}`;
  }, [sortedListings.length, selectedCity, selectedNeighborhood]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <h1 className="text-base font-semibold text-primary">Mamad Directory</h1>
          </div>
          <Button variant="outline" size="sm" asChild className="rounded-full border-primary text-primary hover:bg-accent">
            <Link to="/login">
              <HomeIcon className="h-4 w-4 mr-1.5" />
              List Your Apartment
            </Link>
          </Button>
        </div>
      </header>

      {/* Hero — compact */}
      <section className="bg-card border-b border-border">
        <div className="max-w-5xl mx-auto px-4 pt-6 pb-4">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-primary mb-2">
              Find a Safe Place to Sleep Tonight
            </h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto mt-2">
              Families across Israel are opening their homes to help others stay safe during sirens.
              Find a nearby apartment with a secure room (mamad) and contact the host directly.
            </p>
            <p className="text-xs text-muted-foreground/70 mt-1">
              Simple. Fast. Community-driven and free to use.
            </p>
          </div>
        </div>
      </section>

      {/* Filters — tight spacing */}
      <section className="bg-card border-b border-border">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 md:text-left text-center">
            Browse available safe rooms
          </p>
          <ShelterFilters
            cities={cities}
            neighborhoods={neighborhoods}
            selectedCity={selectedCity}
            selectedNeighborhood={selectedNeighborhood}
            onCityChange={handleCityChange}
            onNeighborhoodChange={setSelectedNeighborhood}
          />
        </div>
      </section>

      {/* Content */}
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
            <h3 className="text-lg font-semibold text-foreground mb-1.5">No safe rooms here yet</h3>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto mb-5">
              Try another city or neighborhood, or check back soon as more families open their homes.
            </p>
            <Button variant="outline" asChild className="rounded-full border-primary text-primary hover:bg-accent">
              <Link to="/login">
                <HomeIcon className="h-4 w-4 mr-1.5" />
                List your apartment
              </Link>
            </Button>
          </div>
        ) : (
          <div className="bg-card rounded-2xl border border-border shadow-sm px-4 py-5 md:px-6 md:py-6">
            <div className="mb-3">
              <h3 className="text-lg font-semibold text-foreground">Safe rooms available</h3>
              <p className="text-sm text-muted-foreground">{resultsLabel}</p>
            </div>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {sortedListings.map(({ listing, distanceKm }) => (
                <ListingCard key={listing.id} listing={listing} distanceKm={distanceKm} />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
