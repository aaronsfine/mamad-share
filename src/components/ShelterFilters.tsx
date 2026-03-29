import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { ChevronDown, Heart, PawPrint, Cigarette, MapPin, X } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { getCityDisplayName, getNeighborhoodDisplayName } from '@/lib/locations';

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

function ToggleChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full border text-xs font-medium transition-colors ${
        active
          ? 'bg-primary text-primary-foreground border-primary'
          : 'bg-card text-muted-foreground border-border hover:border-primary/40'
      }`}
    >
      {children}
    </button>
  );
}

function StepperControl({ label, value, onChange, min = 0, max = 10 }: { label: string; value: number; onChange: (v: number) => void; min?: number; max?: number }) {
  return (
    <div className="inline-flex items-center gap-1.5 text-xs">
      <span className="text-muted-foreground">{label}</span>
      <button type="button" onClick={() => onChange(Math.max(min, value - 1))} className="w-6 h-6 rounded border border-border flex items-center justify-center text-muted-foreground hover:bg-accent">−</button>
      <span className="w-5 text-center font-medium text-foreground">{value}</span>
      <button type="button" onClick={() => onChange(Math.min(max, value + 1))} className="w-6 h-6 rounded border border-border flex items-center justify-center text-muted-foreground hover:bg-accent">+</button>
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
  const { t, lang } = useLanguage();
  const [open, setOpen] = useState(false);

  const hasActiveFilters =
    petsFilter !== 'all' ||
    smokingFilter !== 'all' ||
    priceFilter !== 'all' ||
    maxPrice < 200 ||
    minBeds > 0 ||
    minBedrooms > 0;

  return (
    <div className="space-y-2.5">
      {/* Row 1: City, Neighborhood, Sort, Nearby */}
      <div className="flex flex-col md:flex-row gap-2.5 md:items-end w-full">
        <div className="flex-1 min-w-0 space-y-1">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{t('filters.city')}</label>
          <Select value={selectedCity} onValueChange={onCityChange}>
            <SelectTrigger className="bg-card border-border h-9">
              <SelectValue placeholder={t('filters.allCities')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('filters.allCities')}</SelectItem>
              {cities.map((city) => (
                <SelectItem key={city} value={city}>{getCityDisplayName(city, lang)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 min-w-0 space-y-1">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{t('filters.neighborhood')}</label>
          <Select value={selectedNeighborhood} onValueChange={onNeighborhoodChange}>
            <SelectTrigger className="bg-card border-border h-9">
              <SelectValue placeholder={t('filters.allNeighborhoods')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('filters.allNeighborhoods')}</SelectItem>
              {neighborhoods.map((n) => (
                <SelectItem key={n} value={n}>{n}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Select value={sortBy} onValueChange={(v) => onSortByChange(v as SortOption)}>
            <SelectTrigger className="bg-card border-border h-9 w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price_low">{t('filters.priceLow')}</SelectItem>
              <SelectItem value="price_high">{t('filters.priceHigh')}</SelectItem>
              {hasLocation && <SelectItem value="nearest">{t('filters.nearest')}</SelectItem>}
            </SelectContent>
          </Select>

          {hasLocation && (
            <ToggleChip active={sortBy === 'nearest'} onClick={() => onSortByChange('nearest')}>
              <MapPin className="h-3 w-3" />
              {t('filters.nearby')}
            </ToggleChip>
          )}
        </div>
      </div>

      {/* Row 2: Quick chips + More toggle */}
      <div className="flex items-center gap-2 flex-wrap">
        <ToggleChip active={priceFilter === 'free'} onClick={() => onPriceFilterChange(priceFilter === 'free' ? 'all' : 'free')}>
          <Heart className="h-3 w-3" />
          {t('filters.free')}
        </ToggleChip>

        <div className="flex-1" />

        <Button
          variant="outline"
          size="sm"
          onClick={() => setOpen(!open)}
          className={`rounded-full text-xs h-8 gap-1 ${hasActiveFilters ? 'border-primary text-primary' : ''}`}
        >
          {open ? <X className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          {t('filters.more')}
        </Button>
      </div>

      {/* Collapsible advanced filters */}
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleContent>
          <div className="rounded-lg border border-border bg-card/50 p-3 space-y-3">
            {/* Toggle chips row */}
            <div className="flex items-center gap-2 flex-wrap">
              <ToggleChip active={petsFilter === 'yes'} onClick={() => onPetsFilterChange(petsFilter === 'yes' ? 'all' : 'yes')}>
                <PawPrint className="h-3 w-3" />
                {t('filters.petsOk')}
              </ToggleChip>
              <ToggleChip active={smokingFilter === 'yes'} onClick={() => onSmokingFilterChange(smokingFilter === 'yes' ? 'all' : 'yes')}>
                <Cigarette className="h-3 w-3" />
                {t('filters.smokingOk')}
              </ToggleChip>
            </div>

            {/* Steppers + Slider */}
            <div className="flex items-center gap-4 flex-wrap">
              <StepperControl label={t('filters.minBeds')} value={minBeds} onChange={onMinBedsChange} max={6} />
              <StepperControl label={t('filters.minBedrooms')} value={minBedrooms} onChange={onMinBedroomsChange} max={5} />
            </div>

            {priceFilter !== 'free' && (
              <div className="flex items-center gap-3 max-w-xs">
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {t('filters.maxPrice')}: ₪{maxPrice >= 200 ? '200+' : maxPrice}
                </span>
                <Slider
                  value={[maxPrice]}
                  onValueChange={([v]) => onMaxPriceChange(v)}
                  min={0}
                  max={200}
                  step={10}
                  className="flex-1"
                />
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
