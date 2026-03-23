import { useState } from 'react';
import { SearchableSelect } from '@/components/SearchableSelect';
import { Slider } from '@/components/ui/slider';
import { PawPrint, Cigarette, Heart, MapPin, ArrowUpDown, BedDouble, Loader2, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export type SortOption = 'nearest' | 'price_low' | 'price_high';

interface ShelterFiltersProps {
  cities: string[];
  neighborhoods: string[];
  selectedCity: string;
  selectedNeighborhood: string;
  onCityChange: (city: string) => void;
  onNeighborhoodChange: (neighborhood: string) => void;
  petsFilter: 'all' | 'yes' | 'no';
  smokingFilter: 'all' | 'yes' | 'no';
  priceFilter: 'all' | 'free';
  maxPrice: number;
  onPetsFilterChange: (v: 'all' | 'yes' | 'no') => void;
  onSmokingFilterChange: (v: 'all' | 'yes' | 'no') => void;
  onPriceFilterChange: (v: 'all' | 'free') => void;
  onMaxPriceChange: (v: number) => void;
  sortBy: SortOption;
  onSortChange: (v: SortOption) => void;
  minBeds: number;
  minBedrooms: number;
  onMinBedsChange: (v: number) => void;
  onMinBedroomsChange: (v: number) => void;
  geoLoading?: boolean;
  geoAvailable?: boolean;
  onRequestLocation?: () => void;
}

function Pill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition-all border whitespace-nowrap ${
        active
          ? 'bg-primary text-primary-foreground border-primary'
          : 'bg-card text-muted-foreground border-border hover:border-primary/40'
      }`}
    >
      {children}
    </button>
  );
}

function Counter({ label, value, onChange, min = 0, max = 10, icon }: {
  label: string; value: number; onChange: (v: number) => void; min?: number; max?: number; icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-muted-foreground">{icon}</span>
      <span className="text-xs text-muted-foreground">{label}</span>
      <div className="flex items-center border border-border rounded-md overflow-hidden">
        <button type="button" onClick={() => onChange(Math.max(min, value - 1))}
          className="px-1.5 py-0.5 text-xs text-muted-foreground hover:bg-muted transition disabled:opacity-30" disabled={value <= min}>−</button>
        <span className="px-1.5 py-0.5 text-xs font-medium min-w-[20px] text-center">{value}</span>
        <button type="button" onClick={() => onChange(Math.min(max, value + 1))}
          className="px-1.5 py-0.5 text-xs text-muted-foreground hover:bg-muted transition disabled:opacity-30" disabled={value >= max}>+</button>
      </div>
    </div>
  );
}

export function ShelterFilters({
  cities, neighborhoods, selectedCity, selectedNeighborhood,
  onCityChange, onNeighborhoodChange,
  petsFilter, smokingFilter, priceFilter, maxPrice,
  onPetsFilterChange, onSmokingFilterChange, onPriceFilterChange, onMaxPriceChange,
  sortBy, onSortChange,
  minBeds, minBedrooms,
  onMinBedsChange, onMinBedroomsChange,
  geoLoading, onRequestLocation,
}: ShelterFiltersProps) {
  const [showMore, setShowMore] = useState(false);

  const activeFilterCount = [
    petsFilter !== 'all',
    smokingFilter !== 'all',
    priceFilter !== 'all',
    minBeds > 0,
    minBedrooms > 0,
    maxPrice < 200,
  ].filter(Boolean).length;

  return (
    <div className="space-y-2.5">
      {/* Row 1: Location + Sort dropdown + Nearby button */}
      <div className="flex flex-col sm:flex-row gap-2 sm:items-end">
        <div className="flex-1 min-w-0">
          <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">City</label>
          <SearchableSelect options={cities} value={selectedCity} onValueChange={onCityChange}
            placeholder="Search city..." allLabel="All Cities" />
        </div>
        <div className="flex-1 min-w-0">
          <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">Neighborhood</label>
          <SearchableSelect options={neighborhoods} value={selectedNeighborhood} onValueChange={onNeighborhoodChange}
            placeholder="Search neighborhood..." allLabel="All Neighborhoods" />
        </div>
        <div className="flex items-center gap-2 sm:pb-0.5">
          <div className="flex items-center gap-1">
            <ArrowUpDown className="h-3 w-3 text-muted-foreground" />
            <select value={sortBy} onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="text-xs bg-card border border-border rounded-md px-2 py-[7px] text-foreground focus:outline-none focus:ring-1 focus:ring-primary">
              <option value="price_low">Price ↑</option>
              <option value="price_high">Price ↓</option>
            </select>
          </div>
          <Button
            type="button"
            variant={sortBy === 'nearest' ? 'default' : 'outline'}
            size="sm"
            className="rounded-full text-xs h-7 px-3"
            onClick={() => {
              if (sortBy === 'nearest') {
                onSortChange('price_low');
              } else {
                onRequestLocation?.();
                onSortChange('nearest');
              }
            }}
          >
            {geoLoading ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : <MapPin className="h-3 w-3 mr-1" />}
            Nearby
          </Button>
        </div>
      </div>

      {/* Row 2: Free pill + More filters toggle */}
      <div className="flex flex-wrap items-center gap-1.5">
        <Pill active={priceFilter === 'free'} onClick={() => onPriceFilterChange(priceFilter === 'free' ? 'all' : 'free')}>
          <Heart className="h-3 w-3" /> Free
        </Pill>

        <button
          type="button"
          onClick={() => setShowMore(!showMore)}
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium border transition-all ml-auto ${
            showMore || activeFilterCount > 0
              ? 'bg-primary/10 text-primary border-primary/30'
              : 'bg-card text-muted-foreground border-border hover:border-primary/40'
          }`}
        >
          {showMore ? <X className="h-3 w-3" /> : <SlidersHorizontal className="h-3 w-3" />}
          {activeFilterCount > 0 ? `Filters (${activeFilterCount})` : 'More'}
        </button>
      </div>

      {/* Row 3: Expandable detail filters — pets, smoking, capacity, price */}
      {showMore && (
        <div className="bg-muted/40 rounded-lg border border-border p-3 space-y-3 animate-in fade-in slide-in-from-top-1 duration-200">
          {/* Pets & Smoking */}
          <div className="flex flex-wrap items-center gap-1.5">
            <Pill active={petsFilter === 'yes'} onClick={() => onPetsFilterChange(petsFilter === 'yes' ? 'all' : 'yes')}>
              <PawPrint className="h-3 w-3" /> Pets OK
            </Pill>
            <Pill active={smokingFilter === 'yes'} onClick={() => onSmokingFilterChange(smokingFilter === 'yes' ? 'all' : 'yes')}>
              <Cigarette className="h-3 w-3" /> Smoking OK
            </Pill>
          </div>

          {/* Capacity */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Counter label="Beds" value={minBeds} onChange={onMinBedsChange} icon={<BedDouble className="h-3.5 w-3.5" />} />
            <Counter label="Rooms" value={minBedrooms} onChange={onMinBedroomsChange} icon={<BedDouble className="h-3.5 w-3.5" />} />
          </div>

          {/* Price slider */}
          {priceFilter !== 'free' && (
            <div className="flex items-center gap-3">
              <label className="text-xs font-medium text-muted-foreground whitespace-nowrap">
                Max ₪{maxPrice === 200 ? '200+' : maxPrice}/night
              </label>
              <Slider value={[maxPrice]} onValueChange={(v) => onMaxPriceChange(v[0])} min={0} max={200} step={10} className="w-36" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
