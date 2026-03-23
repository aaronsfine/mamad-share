import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { MapPin, User, MessageCircle, BedDouble, Shield, PawPrint, Cigarette, ChevronLeft, ChevronRight, Image, Heart, Info } from 'lucide-react';
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
  const [detailsOpen, setDetailsOpen] = useState(false);
  const hasPhotos = photoUrls.length > 0;
  const hasNotes = !!(listing.sleeping_notes || listing.mamad_notes);

  return (
    <>
      <Card className="overflow-hidden bg-card border-border shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-150 rounded-2xl flex flex-col">
        {/* Photo or placeholder header */}
        <div
          className={`relative h-36 ${hasPhotos ? 'cursor-pointer' : ''}`}
          onClick={hasPhotos ? () => { setLightboxIndex(0); setLightboxOpen(true); } : undefined}
        >
          {hasPhotos ? (
            <>
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
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/30 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-8 w-8 text-primary/40 mx-auto mb-1" />
                <span className="text-xs text-primary/50 font-medium">{listing.city}</span>
              </div>
            </div>
          )}
        </div>

        <CardContent className="p-5 md:p-6 flex flex-col gap-3 flex-1">
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

          {/* Pricing badge */}
          {(listing as any).price_type === 'free' ? (
            <Badge className="w-fit bg-green-50 text-green-700 border-green-200 border text-xs gap-1 hover:bg-green-50">
              <Heart className="h-3 w-3" /> Free
            </Badge>
          ) : (listing as any).price_per_night ? (
            <Badge variant="secondary" className="w-fit text-xs gap-1">
              ₪{(listing as any).price_per_night}/night
            </Badge>
          ) : null}

          {/* Divider */}
          <div className="border-t border-border" />

          {/* Stats — single line */}
          <p className="text-sm text-muted-foreground">
            {listing.bedrooms} bedroom{listing.bedrooms !== 1 ? 's' : ''} · {listing.total_beds} bed{listing.total_beds !== 1 ? 's' : ''}
          </p>

          {/* Pets & Smoking tags */}
          <div className="flex flex-wrap gap-2">
            {(listing as any).pets_allowed ? (
              <Badge variant="outline" className="text-xs gap-1 border-green-200 text-green-700 bg-green-50">
                <PawPrint className="h-3 w-3" /> Pets Welcome
              </Badge>
            ) : (
              <Badge variant="outline" className="text-xs gap-1 border-red-200 text-red-600 bg-red-50">
                <PawPrint className="h-3 w-3" /> No Pets
              </Badge>
            )}
            {(listing as any).smoking_allowed ? (
              <Badge variant="outline" className="text-xs gap-1 border-green-200 text-green-700 bg-green-50">
                <Cigarette className="h-3 w-3" /> Smoking OK
              </Badge>
            ) : (
              <Badge variant="outline" className="text-xs gap-1 border-red-200 text-red-600 bg-red-50">
                <Cigarette className="h-3 w-3" /> No Smoking
              </Badge>
            )}
          </div>

          {/* Details link — always present to keep height consistent */}
          <div className="h-6">
            {hasNotes && (
              <button
                onClick={() => setDetailsOpen(true)}
                className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
              >
                <Info className="h-3.5 w-3.5" />
                View details
              </button>
            )}
          </div>

          {/* Spacer to push CTA to bottom */}
          <div className="flex-1" />

          {/* WhatsApp CTA — always at bottom */}
          <div>
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

      {/* Details Modal */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-primary" />
              {listing.city} · {listing.neighborhood}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Hosted by {listing.host_name}
            </p>
            <div className="border-t border-border" />
            <p className="text-sm text-muted-foreground">
              {listing.bedrooms} bedroom{listing.bedrooms !== 1 ? 's' : ''} · {listing.total_beds} bed{listing.total_beds !== 1 ? 's' : ''}
            </p>
            {listing.sleeping_notes && (
              <div className="flex items-start gap-2 text-sm text-foreground">
                <BedDouble className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-xs text-muted-foreground mb-0.5">Sleeping arrangements</p>
                  <p>{listing.sleeping_notes}</p>
                </div>
              </div>
            )}
            {listing.mamad_notes && (
              <div className="flex items-start gap-2 text-sm text-foreground">
                <Shield className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-xs text-muted-foreground mb-0.5">Shelter notes</p>
                  <p>{listing.mamad_notes}</p>
                </div>
              </div>
            )}
            {/* Approximate location map */}
            {listing.latitude != null && listing.longitude != null && (
              <div className="space-y-1.5">
                <p className="text-xs font-medium text-muted-foreground">Where you'll be</p>
                <p className="text-xs text-muted-foreground">{listing.city}, {listing.neighborhood}</p>
                <div className="rounded-lg overflow-hidden border border-border">
                  <iframe
                    title="Approximate location"
                    width="100%"
                    height="200"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${listing.latitude},${listing.longitude}&zoom=14`}
                  />
                </div>
                <p className="text-[10px] text-muted-foreground/60">Approximate area shown — exact address shared after contact.</p>
              </div>
            )}
            <div className="border-t border-border pt-2">
              <Button
                asChild
                className="w-full bg-whatsapp hover:bg-whatsapp/85 text-whatsapp-foreground font-semibold rounded-lg"
                size="lg"
              >
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Contact via WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

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
