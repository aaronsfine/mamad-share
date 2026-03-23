import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, BedDouble, Home, Shield, MessageCircle } from 'lucide-react';
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
    <Card className="overflow-hidden border-border/60 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-5 space-y-4">
        {/* Host name & location */}
        <div className="space-y-1">
          <h3 className="font-semibold text-lg text-foreground">{listing.host_name}</h3>
          <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
            <MapPin className="h-3.5 w-3.5" />
            <span>{listing.city}, {listing.neighborhood}</span>
          </div>
          {distanceKm != null && (
            <Badge variant="secondary" className="text-xs font-medium mt-1">
              {formatDistance(distanceKm)}
            </Badge>
          )}
        </div>

        {/* Capacity callout */}
        <div className="rounded-lg bg-primary/10 border border-primary/20 px-4 py-3 text-center">
          <p className="text-sm font-semibold text-primary">
            Best for families up to ~{capacity} people
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-sm">
            <Home className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-muted-foreground text-xs">Bedrooms</p>
              <p className="font-medium text-foreground">{listing.bedrooms}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <BedDouble className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-muted-foreground text-xs">Total Beds</p>
              <p className="font-medium text-foreground">{listing.total_beds}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm col-span-2">
            <Shield className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-muted-foreground text-xs">Mamad Size</p>
              <p className="font-medium text-foreground">{listing.mamad_size_sqm} sqm</p>
            </div>
          </div>
        </div>

        {/* Notes */}
        {(listing.sleeping_notes || listing.mamad_notes) && (
          <div className="space-y-1 text-xs text-muted-foreground">
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
