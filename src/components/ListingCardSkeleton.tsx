import { Skeleton } from '@/components/ui/skeleton';

export function ListingCardSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-card p-5 md:p-6 flex flex-col gap-3">
      {/* Location + host */}
      <div className="space-y-1.5">
        <Skeleton className="h-5 w-44" />
        <Skeleton className="h-4 w-32" />
      </div>

      {/* Capacity pill */}
      <Skeleton className="h-6 w-36 rounded-full" />

      {/* Divider */}
      <div className="border-t border-border" />

      {/* Stats line */}
      <Skeleton className="h-4 w-full" />

      {/* Notes */}
      <Skeleton className="h-4 w-3/4" />

      {/* WhatsApp button */}
      <Skeleton className="h-11 w-full rounded-lg mt-1" />
      <Skeleton className="h-3 w-48 mx-auto" />
    </div>
  );
}
