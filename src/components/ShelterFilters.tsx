import { SearchableSelect } from '@/components/SearchableSelect';
import { Slider } from '@/components/ui/slider';
import { PawPrint, Cigarette, Heart } from 'lucide-react';

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
}: ShelterFiltersProps) {
  return (
    <div className="space-y-3">
      {/* Location filters */}
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

      {/* Quick filters + price slider */}
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
        </div>

        {/* Price slider — only visible when not filtering to free-only */}
        {priceFilter !== 'free' && (
          <div className="flex items-center gap-3 md:ml-auto min-w-[200px]">
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