import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { MapPin, User, MessageCircle, BedDouble, Shield, PawPrint, Cigarette, ChevronLeft, ChevronRight, Image } from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { formatDistance } from '@/lib/distance';
import type { Tables } from '@/integrations/supabase/types';

interface ListingCardProps {
  listing: Tables<'listings'>;
  distanceKm?: number | null;
  photoUrls?: string[];
}

export function ListingCard({ listing, distanceKm, photoUrls = [] }: ListingCardProps) {
  const whatsappUrl = buildWhatsAppLink(listing.phone, listing.host_name, listing.city);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const hasPhotos = photoUrls.length > 0;

  return (
    <>
      <Card className="overflow-hidden bg-card border-border shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-150 rounded-2xl">
        {/* Photo section */}
        {hasPhotos && (
          <div
            className="relative h-44 cursor-pointer group"
            onClick={() => { setLightboxIndex(0); setLightboxOpen(true); }}
          >
            <img
              src={photoUrls[0]}
              alt={`${listing.city}, ${listing.neighborhood}`}
              className="w-full h-full object-cover"
            />
            {photoUrls.length > 1 && (
              <Badge className="absolute bottom-2 right-2 bg-black/60 text-white border-0 text-xs">
                <Image className="h-3 w-3 mr-1" />
                {photoUrls.length} photos
              </Badge>
            )}
          </div>
        )}

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

          {/* Divider */}
          <div className="border-t border-border" />

          {/* Stats */}
          <p className="text-sm text-muted-foreground">
            {listing.bedrooms} bedroom{listing.bedrooms !== 1 ? 's' : ''} · {listing.total_beds} bed{listing.total_beds !== 1 ? 's' : ''} · {listing.mamad_size_sqm} sqm mamad
          </p>

          {/* Pets & Smoking tags */}
          {((listing as any).pets_allowed || (listing as any).smoking_allowed) && (
            <div className="flex flex-wrap gap-2">
              {(listing as any).pets_allowed && (
                <Badge variant="outline" className="text-xs gap-1">
                  <PawPrint className="h-3 w-3" /> Pets OK
                </Badge>
              )}
              {(listing as any).smoking_allowed && (
                <Badge variant="outline" className="text-xs gap-1">
                  <Cigarette className="h-3 w-3" /> Smoking OK
                </Badge>
              )}
            </div>
          )}

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

      {/* Photo Lightbox */}
      {hasPhotos && (
        <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
          <DialogContent className="max-w-3xl p-2 bg-black/95 border-0">
            <div className="relative flex items-center justify-center min-h-[300px]">
              <img
                src={photoUrls[lightboxIndex]}
                alt={`Photo ${lightboxIndex + 1}`}
                className="max-h-[80vh] max-w-full object-contain rounded"
              />
              {photoUrls.length > 1 && (
                <>
                  <button
                    onClick={() => setLightboxIndex((lightboxIndex - 1 + photoUrls.length) % photoUrls.length)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-1.5 transition"
                  >
                    <ChevronLeft className="h-5 w-5 text-white" />
                  </button>
                  <button
                    onClick={() => setLightboxIndex((lightboxIndex + 1) % photoUrls.length)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-1.5 transition"
                  >
                    <ChevronRight className="h-5 w-5 text-white" />
                  </button>
                  <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white/70 text-xs">
                    {lightboxIndex + 1} / {photoUrls.length}
                  </span>
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
