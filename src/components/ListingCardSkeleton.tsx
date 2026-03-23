import { Skeleton } from '@/components/ui/skeleton';

export function ListingCardSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 space-y-4">
      {/* Host name + location */}
      <div className="space-y-2">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-4 w-28" />
      </div>

      {/* Capacity badge */}
      <Skeleton className="h-10 w-full rounded-lg" />

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-3">
        <Skeleton className="h-16 rounded-lg" />
        <Skeleton className="h-16 rounded-lg" />
        <Skeleton className="h-16 rounded-lg" />
      </div>

      {/* Notes */}
      <Skeleton className="h-4 w-3/4" />

      {/* WhatsApp button */}
      <Skeleton className="h-11 w-full rounded-lg" />
    </div>
  );
}
