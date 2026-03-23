import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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
    <div className="flex gap-3 bg-muted/50 rounded-xl p-2 shadow-sm border border-border">
      <Select value={selectedCity} onValueChange={onCityChange}>
        <SelectTrigger className="flex-1 bg-card border-border">
          <SelectValue placeholder="All Cities" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Cities</SelectItem>
          {cities.map((city) => (
            <SelectItem key={city} value={city}>
              {city}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedNeighborhood} onValueChange={onNeighborhoodChange}>
        <SelectTrigger className="flex-1 bg-card border-border">
          <SelectValue placeholder="All Neighborhoods" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Neighborhoods</SelectItem>
          {neighborhoods.map((n) => (
            <SelectItem key={n} value={n}>
              {n}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
