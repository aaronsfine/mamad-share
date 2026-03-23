import { Skeleton } from '@/components/ui/skeleton';

export function ListingCardSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-3">
      {/* Host name + location */}
      <div className="space-y-1.5">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-5 w-44" />
      </div>

      {/* Capacity pill */}
      <Skeleton className="h-6 w-36 rounded-full" />

      {/* Stats line */}
      <Skeleton className="h-4 w-full" />

      {/* Notes */}
      <Skeleton className="h-3 w-3/4" />

      {/* WhatsApp button */}
      <Skeleton className="h-11 w-full rounded-lg" />
    </div>
  );
}
