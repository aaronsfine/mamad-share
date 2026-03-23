import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, User, MessageCircle } from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { formatDistance } from '@/lib/distance';
import type { Tables } from '@/integrations/supabase/types';

interface ListingCardProps {
  listing: Tables<'listings'>;
  distanceKm?: number | null;
}

export function ListingCard({ listing, distanceKm }: ListingCardProps) {
  const capacity = listing.total_beds + Math.floor(listing.mamad_size_sqm / 2);
  const whatsappUrl = buildWhatsAppLink(listing.phone, listing.host_name, listing.city);

  return (
    <Card className="overflow-hidden bg-card border-border shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-5 space-y-3">
        {/* Host + Location */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
            <User className="h-3 w-3" />
            <span>{listing.host_name}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
            <h3 className="font-bold text-lg text-foreground leading-tight">
              {listing.city}, {listing.neighborhood}
            </h3>
          </div>
          {distanceKm != null && (
            <Badge variant="secondary" className="text-xs font-medium mt-0.5">
              {formatDistance(distanceKm)}
            </Badge>
          )}
        </div>

        {/* Capacity pill */}
        <Badge className="rounded-full bg-primary/10 text-primary border-0 hover:bg-primary/10 text-xs font-semibold px-3 py-1">
          Best for ~{capacity} people
        </Badge>

        {/* Stats line */}
        <p className="text-sm text-muted-foreground">
          {listing.bedrooms} bedrooms · {listing.total_beds} beds · {listing.mamad_size_sqm} sqm mamad
        </p>

        {/* Notes */}
        {(listing.sleeping_notes || listing.mamad_notes) && (
          <div className="space-y-1 text-xs text-muted-foreground/80">
            {listing.sleeping_notes && <p>💤 {listing.sleeping_notes}</p>}
            {listing.mamad_notes && <p>🛡️ {listing.mamad_notes}</p>}
          </div>
        )}

        {/* WhatsApp CTA */}
        <Button
          asChild
          className="w-full bg-whatsapp hover:bg-whatsapp/90 text-whatsapp-foreground font-semibold"
          size="lg"
        >
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="h-5 w-5 mr-2" />
            Contact via WhatsApp
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
