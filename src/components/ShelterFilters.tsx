import { SearchableSelect } from '@/components/SearchableSelect';
import { Slider } from '@/components/ui/slider';
import { PawPrint, Cigarette, Heart, MapPin, ArrowUpDown, BedDouble, Shield, Loader2 } from 'lucide-react';

export type SortOption = 'newest' | 'nearest' | 'price_low' | 'price_high';

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
  minMamad: number;
  onMinBedsChange: (v: number) => void;
  onMinBedroomsChange: (v: number) => void;
  onMinMamadChange: (v: number) => void;
  geoLoading?: boolean;
  geoAvailable?: boolean;
  onRequestLocation?: () => void;
}

function TogglePill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium transition-all border ${
        active
          ? 'bg-primary text-primary-foreground border-primary'
          : 'bg-card text-muted-foreground border-border hover:border-primary/40'
      }`}
    >
      {children}
    </button>
  );
}

function CompactCounter({ label, value, onChange, min = 0, max = 10, icon }: {
  label: string; value: number; onChange: (v: number) => void; min?: number; max?: number; icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-muted-foreground">{icon}</span>
      <span className="text-xs text-muted-foreground whitespace-nowrap">{label}</span>
      <div className="flex items-center border border-border rounded-lg overflow-hidden">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          className="px-2 py-1 text-xs text-muted-foreground hover:bg-muted transition disabled:opacity-30"
          disabled={value <= min}
        >−</button>
        <span className="px-2 py-1 text-xs font-medium min-w-[24px] text-center">{value}</span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          className="px-2 py-1 text-xs text-muted-foreground hover:bg-muted transition disabled:opacity-30"
          disabled={value >= max}
        >+</button>
      </div>
    </div>
  );
}

export function ShelterFilters({
  cities,
  neighborhoods,
  selectedCity,
  selectedNeighborhood,
  onCityChange,
  onNeighborhoodChange,
  petsFilter,
  smokingFilter,
  priceFilter,
  maxPrice,
  onPetsFilterChange,
  onSmokingFilterChange,
  onPriceFilterChange,
  onMaxPriceChange,
  sortBy,
  onSortChange,
  minBeds,
  minBedrooms,
  minMamad,
  onMinBedsChange,
  onMinBedroomsChange,
  onMinMamadChange,
  geoLoading,
  geoAvailable,
  onRequestLocation,
}: ShelterFiltersProps) {
  return (
    <div className="space-y-3">
      {/* Row 1: Location filters */}
      <div className="flex flex-col md:flex-row gap-4 md:items-end">
        <div className="flex-1 space-y-1.5">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            City
          </label>
          <SearchableSelect
            options={cities}
            value={selectedCity}
            onValueChange={onCityChange}
            placeholder="Search city..."
            allLabel="All Cities"
          />
        </div>

        <div className="flex-1 space-y-1.5">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Neighborhood
          </label>
          <SearchableSelect
            options={neighborhoods}
            value={selectedNeighborhood}
            onValueChange={onNeighborhoodChange}
            placeholder="Search neighborhood..."
            allLabel="All Neighborhoods"
          />
        </div>
      </div>

      {/* Row 2: Quick filter pills + sort */}
      <div className="flex flex-col md:flex-row md:items-center gap-3">
        <div className="flex flex-wrap gap-2">
          <TogglePill active={priceFilter === 'free'} onClick={() => onPriceFilterChange(priceFilter === 'free' ? 'all' : 'free')}>
            <Heart className="h-3 w-3" /> Free only
          </TogglePill>
          <TogglePill active={petsFilter === 'yes'} onClick={() => onPetsFilterChange(petsFilter === 'yes' ? 'all' : 'yes')}>
            <PawPrint className="h-3 w-3" /> Pets OK
          </TogglePill>
          <TogglePill active={smokingFilter === 'yes'} onClick={() => onSmokingFilterChange(smokingFilter === 'yes' ? 'all' : 'yes')}>
            <Cigarette className="h-3 w-3" /> Smoking OK
          </TogglePill>
          <TogglePill
            active={sortBy === 'nearest'}
            onClick={() => {
              if (sortBy === 'nearest') {
                onSortChange('newest');
              } else {
                onRequestLocation?.();
                onSortChange('nearest');
              }
            }}
          >
            {geoLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : <MapPin className="h-3 w-3" />}
            Nearest to me
          </TogglePill>
        </div>

        {/* Sort dropdown */}
        <div className="flex items-center gap-2 md:ml-auto">
          <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
          <select
            value={sortBy}
            onChange={(e) => {
              const val = e.target.value as SortOption;
              if (val === 'nearest') onRequestLocation?.();
              onSortChange(val);
            }}
            className="text-xs bg-card border border-border rounded-lg px-2 py-1.5 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="newest">Newest first</option>
            <option value="nearest">Nearest to me</option>
            <option value="price_low">Price: low → high</option>
            <option value="price_high">Price: high → low</option>
          </select>
        </div>
      </div>

      {/* Row 3: Capacity filters + price slider */}
      <div className="flex flex-wrap items-center gap-4">
        <CompactCounter label="Beds" value={minBeds} onChange={onMinBedsChange} icon={<BedDouble className="h-3.5 w-3.5" />} />
        <CompactCounter label="Rooms" value={minBedrooms} onChange={onMinBedroomsChange} icon={<BedDouble className="h-3.5 w-3.5" />} />
        <CompactCounter label="Mamad sqm" value={minMamad} onChange={onMinMamadChange} icon={<Shield className="h-3.5 w-3.5" />} />

        {priceFilter !== 'free' && (
          <div className="flex items-center gap-3 md:ml-auto">
            <label className="text-xs font-medium text-muted-foreground whitespace-nowrap">
              Max ₪{maxPrice === 200 ? '200+' : maxPrice}/night
            </label>
            <Slider
              value={[maxPrice]}
              onValueChange={(v) => onMaxPriceChange(v[0])}
              min={0}
              max={200}
              step={10}
              className="w-32"
            />
          </div>
        )}
      </div>
    </div>
  );
}