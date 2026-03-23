import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Shield, LogIn } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { ListingCard } from '@/components/ListingCard';
import { ShelterFilters } from '@/components/ShelterFilters';
import { useGeolocation } from '@/hooks/useGeolocation';
import { haversineDistance } from '@/lib/distance';
import { Button } from '@/components/ui/button';
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

  // Derive filter options
  const cities = useMemo(() => [...new Set(listings.map((l) => l.city))].sort(), [listings]);
  const neighborhoods = useMemo(() => {
    const filtered = selectedCity !== 'all' ? listings.filter((l) => l.city === selectedCity) : listings;
    return [...new Set(filtered.map((l) => l.neighborhood))].sort();
  }, [listings, selectedCity]);

  // Filter listings
  const filtered = useMemo(() => {
    return listings.filter((l) => {
      if (selectedCity !== 'all' && l.city !== selectedCity) return false;
      if (selectedNeighborhood !== 'all' && l.neighborhood !== selectedNeighborhood) return false;
      return true;
    });
  }, [listings, selectedCity, selectedNeighborhood]);

  // Compute distances & sort
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
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-md">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6" />
              <h1 className="text-xl font-bold tracking-tight">Mamad Directory</h1>
            </div>
            <Button variant="ghost" size="sm" asChild className="text-primary-foreground hover:bg-primary-foreground/10">
              <Link to="/auth">
                <LogIn className="h-4 w-4 mr-1" />
                Host Login
              </Link>
            </Button>
          </div>
          <ShelterFilters
            cities={cities}
            neighborhoods={neighborhoods}
            selectedCity={selectedCity}
            selectedNeighborhood={selectedNeighborhood}
            onCityChange={handleCityChange}
            onNeighborhoodChange={setSelectedNeighborhood}
          />
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 py-6">
        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 rounded-xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : sortedListings.length === 0 ? (
          <div className="text-center py-20">
            <Shield className="h-12 w-12 mx-auto text-muted-foreground/40 mb-4" />
            <h2 className="text-lg font-semibold text-foreground mb-1">No shelters found</h2>
            <p className="text-sm text-muted-foreground">
              Try adjusting your filters or check back later.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {sortedListings.map(({ listing, distanceKm }) => (
              <ListingCard key={listing.id} listing={listing} distanceKm={distanceKm} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
