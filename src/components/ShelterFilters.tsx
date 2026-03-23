import { SearchableSelect } from '@/components/SearchableSelect';
import { Badge } from '@/components/ui/badge';
import { PawPrint, Cigarette, Heart, DollarSign } from 'lucide-react';

interface ShelterFiltersProps {
  cities: string[];
  neighborhoods: string[];
  selectedCity: string;
  selectedNeighborhood: string;
  onCityChange: (city: string) => void;
  onNeighborhoodChange: (neighborhood: string) => void;
  petsFilter: 'all' | 'yes' | 'no';
  smokingFilter: 'all' | 'yes' | 'no';
  priceFilter: 'all' | 'free' | 'paid';
  onPetsFilterChange: (v: 'all' | 'yes' | 'no') => void;
  onSmokingFilterChange: (v: 'all' | 'yes' | 'no') => void;
  onPriceFilterChange: (v: 'all' | 'free' | 'paid') => void;
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
  onPetsFilterChange,
  onSmokingFilterChange,
  onPriceFilterChange,
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

      {/* Quick filters */}
      <div className="flex flex-wrap gap-2">
        <TogglePill active={priceFilter === 'free'} onClick={() => onPriceFilterChange(priceFilter === 'free' ? 'all' : 'free')}>
          <Heart className="h-3 w-3" /> Free only
        </TogglePill>
        <TogglePill active={priceFilter === 'paid'} onClick={() => onPriceFilterChange(priceFilter === 'paid' ? 'all' : 'paid')}>
          <DollarSign className="h-3 w-3" /> Paid
        </TogglePill>
        <TogglePill active={petsFilter === 'yes'} onClick={() => onPetsFilterChange(petsFilter === 'yes' ? 'all' : 'yes')}>
          <PawPrint className="h-3 w-3" /> Pets OK
        </TogglePill>
        <TogglePill active={smokingFilter === 'yes'} onClick={() => onSmokingFilterChange(smokingFilter === 'yes' ? 'all' : 'yes')}>
          <Cigarette className="h-3 w-3" /> Smoking OK
        </TogglePill>
      </div>
    </div>
  );
}