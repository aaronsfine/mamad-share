import { SearchableSelect } from '@/components/SearchableSelect';

interface ShelterFiltersProps {
  cities: string[];
  neighborhoods: string[];
  selectedCity: string;
  selectedNeighborhood: string;
  onCityChange: (city: string) => void;
  onNeighborhoodChange: (neighborhood: string) => void;
}

export function ShelterFilters({
  cities,
  neighborhoods,
  selectedCity,
  selectedNeighborhood,
  onCityChange,
  onNeighborhoodChange,
}: ShelterFiltersProps) {
  return (
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
  );
}
