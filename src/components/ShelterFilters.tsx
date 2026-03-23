import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
    <div className="flex flex-col md:flex-row gap-4 md:items-end w-full">
      <div className="flex-1 min-w-0 space-y-1.5">
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">City</label>
        <Select value={selectedCity} onValueChange={onCityChange}>
          <SelectTrigger className="bg-card border-border">
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
              <SelectItem key={n} value={n}>
                {n}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
