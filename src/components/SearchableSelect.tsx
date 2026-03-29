import { useState, useMemo } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export interface SelectOption {
  value: string;
  label: string;
  /** Extra search keywords (e.g. Hebrew name) so typing in either language matches */
  keywords?: string;
}

interface SearchableSelectProps {
  options: SelectOption[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  allLabel?: string;
  showAll?: boolean;
  className?: string;
  emptyText?: string;
}

export function SearchableSelect({
  options,
  value,
  onValueChange,
  placeholder = 'Search...',
  allLabel = 'All',
  showAll = true,
  className,
  emptyText = 'No results found.',
}: SearchableSelectProps) {
  const [open, setOpen] = useState(false);

  const displayValue = useMemo(() => {
    if (value === 'all' || !value) return showAll ? allLabel : '';
    const opt = options.find(o => o.value === value);
    return opt?.label ?? value;
  }, [value, allLabel, showAll, options]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn('w-full justify-between bg-card border-border font-normal', className)}
        >
          <span className="truncate">{displayValue || placeholder}</span>
          <ChevronsUpDown className="ms-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {showAll && (
                <CommandItem
                  value="all"
                  onSelect={() => {
                    onValueChange('all');
                    setOpen(false);
                  }}
                >
                  <Check className={cn('me-2 h-4 w-4', value === 'all' ? 'opacity-100' : 'opacity-0')} />
                  {allLabel}
                </CommandItem>
              )}
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.keywords ? `${option.label} ${option.keywords}` : option.label}
                  onSelect={() => {
                    onValueChange(option.value);
                    setOpen(false);
                  }}
                >
                  <Check className={cn('me-2 h-4 w-4', value === option.value ? 'opacity-100' : 'opacity-0')} />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
