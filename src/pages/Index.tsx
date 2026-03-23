import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Shield, LogIn, MapPinOff } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { ListingCard } from '@/components/ListingCard';
import { ShelterFilters } from '@/components/ShelterFilters';
import { useGeolocation } from '@/hooks/useGeolocation';
import { haversineDistance } from '@/lib/distance';
import { Button } from '@/components/ui/button';
import { ListingCardSkeleton } from '@/components/ListingCardSkeleton';
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

  const cities = useMemo(() => [...new Set(listings.map((l) => l.city))].sort(), [listings]);
  const neighborhoods = useMemo(() => {
    const filtered = selectedCity !== 'all' ? listings.filter((l) => l.city === selectedCity) : listings;
    return [...new Set(filtered.map((l) => l.neighborhood))].sort();
  }, [listings, selectedCity]);

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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Shield className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold tracking-tight text-foreground">Mamad Directory</h1>
          </div>
          <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground">
            <Link to="/login">
              <LogIn className="h-4 w-4 mr-1.5" />
              Host Login
            </Link>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-3">
            Find a Safe Space Tonight.
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto">
            Verified hosts offering their shelters (mamads) to families in need.
          </p>
        </div>
      </section>

      {/* Filters */}
      <div className="bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <ShelterFilters
            cities={cities}
            neighborhoods={neighborhoods}
            selectedCity={selectedCity}
            selectedNeighborhood={selectedNeighborhood}
            onCityChange={handleCityChange}
            onNeighborhoodChange={setSelectedNeighborhood}
          />
        </div>
      </div>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {isLoading ? (
          <div className="grid gap-5 md:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <ListingCardSkeleton key={i} />
            ))}
          </div>
        ) : sortedListings.length === 0 ? (
          <div className="text-center py-24">
            <MapPinOff className="h-16 w-16 mx-auto text-muted-foreground/30 mb-5" strokeWidth={1.5} />
            <h2 className="text-lg font-semibold text-foreground mb-2">No shelters currently available here</h2>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
              Try expanding your search area or check back later for new listings.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {sortedListings.map(({ listing, distanceKm }) => (
              <ListingCard key={listing.id} listing={listing} distanceKm={distanceKm} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
