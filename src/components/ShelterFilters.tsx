import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, SlidersHorizontal } from 'lucide-react';

export type SortOption = 'nearest' | 'price_low' | 'price_high';

interface ShelterFiltersProps {
  cities: string[];
  neighborhoods: string[];
  selectedCity: string;
  selectedNeighborhood: string;
  onCityChange: (city: string) => void;
  onNeighborhoodChange: (neighborhood: string) => void;
  petsFilter: 'all' | 'yes' | 'no';
  onPetsFilterChange: (v: 'all' | 'yes' | 'no') => void;
  smokingFilter: 'all' | 'yes' | 'no';
  onSmokingFilterChange: (v: 'all' | 'yes' | 'no') => void;
  priceFilter: 'all' | 'free';
  onPriceFilterChange: (v: 'all' | 'free') => void;
  maxPrice: number;
  onMaxPriceChange: (v: number) => void;
  minBeds: number;
  onMinBedsChange: (v: number) => void;
  minBedrooms: number;
  onMinBedroomsChange: (v: number) => void;
  sortBy: SortOption;
  onSortByChange: (v: SortOption) => void;
  hasLocation: boolean;
}

export function ShelterFilters({
  cities,
  neighborhoods,
  selectedCity,
  selectedNeighborhood,
  onCityChange,
  onNeighborhoodChange,
  petsFilter,
  onPetsFilterChange,
  smokingFilter,
  onSmokingFilterChange,
  priceFilter,
  onPriceFilterChange,
  maxPrice,
  onMaxPriceChange,
  minBeds,
  onMinBedsChange,
  minBedrooms,
  onMinBedroomsChange,
  sortBy,
  onSortByChange,
  hasLocation,
}: ShelterFiltersProps) {
  const [open, setOpen] = useState(false);

  const hasActiveFilters =
    petsFilter !== 'all' ||
    smokingFilter !== 'all' ||
    priceFilter !== 'all' ||
    maxPrice < 200 ||
    minBeds > 0 ||
    minBedrooms > 0;

  return (
    <div className="space-y-3">
      {/* Primary: City + Neighborhood + Sort */}
      <div className="flex flex-col md:flex-row gap-3 md:items-end w-full">
        <div className="flex-1 min-w-0 space-y-1.5">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">City</label>
          <Select value={selectedCity} onValueChange={onCityChange}>
            <SelectTrigger className="bg-card border-border">
              <SelectValue placeholder="All Cities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cities</SelectItem>
              {cities.map((city) => (
                <SelectItem key={city} value={city}>{city}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 min-w-0 space-y-1.5">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Neighborhood</label>
          <Select value={selectedNeighborhood} onValueChange={onNeighborhoodChange}>
            <SelectTrigger className="bg-card border-border">
              <SelectValue placeholder="All Neighborhoods" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Neighborhoods</SelectItem>
              {neighborhoods.map((n) => (
                <SelectItem key={n} value={n}>{n}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 min-w-0 space-y-1.5">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Sort By</label>
          <Select value={sortBy} onValueChange={(v) => onSortByChange(v as SortOption)}>
            <SelectTrigger className="bg-card border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price_low">Price: Low → High</SelectItem>
              <SelectItem value="price_high">Price: High → Low</SelectItem>
              {hasLocation && <SelectItem value="nearest">Nearest First</SelectItem>}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Collapsible: More Filters */}
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-foreground gap-1.5">
            <SlidersHorizontal className="h-3.5 w-3.5" />
            More Filters
            {hasActiveFilters && (
              <span className="ml-1 bg-primary text-primary-foreground rounded-full w-4 h-4 text-[10px] flex items-center justify-center">
                !
              </span>
            )}
            <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Pets</label>
              <Select value={petsFilter} onValueChange={(v) => onPetsFilterChange(v as 'all' | 'yes' | 'no')}>
                <SelectTrigger className="bg-card border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any</SelectItem>
                  <SelectItem value="yes">Pets OK</SelectItem>
                  <SelectItem value="no">No Pets</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Smoking</label>
              <Select value={smokingFilter} onValueChange={(v) => onSmokingFilterChange(v as 'all' | 'yes' | 'no')}>
                <SelectTrigger className="bg-card border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any</SelectItem>
                  <SelectItem value="yes">Smoking OK</SelectItem>
                  <SelectItem value="no">No Smoking</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Price</label>
              <Select value={priceFilter} onValueChange={(v) => onPriceFilterChange(v as 'all' | 'free')}>
                <SelectTrigger className="bg-card border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Price</SelectItem>
                  <SelectItem value="free">Free Only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Min Beds</label>
              <Select value={String(minBeds)} onValueChange={(v) => onMinBedsChange(Number(v))}>
                <SelectTrigger className="bg-card border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Any</SelectItem>
                  <SelectItem value="1">1+</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Min Bedrooms</label>
              <Select value={String(minBedrooms)} onValueChange={(v) => onMinBedroomsChange(Number(v))}>
                <SelectTrigger className="bg-card border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Any</SelectItem>
                  <SelectItem value="1">1+</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {priceFilter === 'all' && (
            <div className="mt-3 space-y-1.5 max-w-xs">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Max Price: ₪{maxPrice}/night
              </label>
              <Slider
                value={[maxPrice]}
                onValueChange={([v]) => onMaxPriceChange(v)}
                min={0}
                max={200}
                step={10}
                className="w-full"
              />
            </div>
          )}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
