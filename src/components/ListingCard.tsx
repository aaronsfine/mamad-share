import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, User, MessageCircle, BedDouble, Shield } from 'lucide-react';
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
    <Card className="overflow-hidden bg-card border-border shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-150 rounded-2xl">
      <CardContent className="p-5 md:p-6 flex flex-col gap-3">
        {/* Header: Location + Host */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-primary shrink-0" />
            <h3 className="text-base font-semibold text-foreground leading-tight">
              {listing.city} · {listing.neighborhood}
            </h3>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
            <User className="h-3.5 w-3.5" />
            <span>Hosted by {listing.host_name}</span>
          </div>
          {distanceKm != null && (
            <Badge variant="secondary" className="text-xs font-medium mt-0.5">
              {formatDistance(distanceKm)}
            </Badge>
          )}
        </div>

        {/* Capacity pill */}
        <Badge className="w-fit rounded-full bg-accent text-primary border-0 hover:bg-accent text-xs font-medium px-3 py-1">
          Best for ~{capacity} people
        </Badge>

        {/* Divider */}
        <div className="border-t border-border" />

        {/* Stats */}
        <p className="text-sm text-muted-foreground">
          {listing.bedrooms} bedroom{listing.bedrooms !== 1 ? 's' : ''} · {listing.total_beds} bed{listing.total_beds !== 1 ? 's' : ''} · {listing.mamad_size_sqm} sqm mamad
        </p>

        {/* Notes */}
        {(listing.sleeping_notes || listing.mamad_notes) && (
          <div className="space-y-1">
            {listing.sleeping_notes && (
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <BedDouble className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>{listing.sleeping_notes}</span>
              </div>
            )}
            {listing.mamad_notes && (
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>{listing.mamad_notes}</span>
              </div>
            )}
          </div>
        )}

        {/* WhatsApp CTA */}
        <div className="mt-1">
          <Button
            asChild
            className="w-full bg-whatsapp hover:bg-whatsapp/85 active:scale-[0.98] text-whatsapp-foreground font-semibold rounded-lg transition-all duration-150"
            size="lg"
          >
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5 mr-2" />
              Contact via WhatsApp
            </a>
          </Button>
          <p className="mt-2 text-xs text-muted-foreground/70 text-center">
            You'll be taken to WhatsApp to message the host directly.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
