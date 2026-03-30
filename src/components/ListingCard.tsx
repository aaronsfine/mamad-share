import { useState, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { MapPin, User, MessageCircle, BedDouble, Shield, PawPrint, Cigarette, ChevronLeft, ChevronRight, Image, Heart, Info } from 'lucide-react';
import { formatDistance } from '@/lib/distance';
import { getCityDisplayName, getNeighborhoodDisplayName } from '@/lib/locations';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/i18n/LanguageContext';
import type { Tables } from '@/integrations/supabase/types';

interface ListingCardProps {
  listing: Tables<'listings'>;
  distanceKm?: number | null;
  photoUrls?: string[];
}

export function ListingCard({ listing, distanceKm, photoUrls = [] }: ListingCardProps) {
  const { t, lang } = useLanguage();
  const cityName = getCityDisplayName(listing.city, lang);
  const neighborhoodName = getNeighborhoodDisplayName(listing.neighborhood, listing.city, lang);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const hasPhotos = photoUrls.length > 0;
  const hasNotes = !!(listing.sleeping_notes || listing.mamad_notes);

  const handleWhatsAppClick = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();
    const { data } = await supabase.rpc('get_whatsapp_url', { listing_id: listing.id });
    if (data) {
      window.open(data, '_blank', 'noopener,noreferrer');
    }
  }, [listing.id]);

  return (
    <>
      <Card className="overflow-hidden bg-card border-border shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-150 rounded-2xl flex flex-col">
        <div
          className={`relative h-36 ${hasPhotos ? 'cursor-pointer' : ''}`}
          onClick={hasPhotos ? () => { setLightboxIndex(0); setLightboxOpen(true); } : undefined}
        >
          {hasPhotos ? (
            <>
              <img src={photoUrls[0]} alt={`${cityName}, ${neighborhoodName}`} className="w-full h-full object-cover" />
              {photoUrls.length > 1 && (
                <Badge className="absolute bottom-2 end-2 bg-black/60 text-white border-0 text-xs">
                  <Image className="h-3 w-3 me-1" />
                  {photoUrls.length} {t('card.photos')}
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
          {distanceKm != null && (
            <span className="absolute top-2 start-2 bg-black/60 backdrop-blur-sm text-white text-[11px] font-semibold px-2 py-0.5 rounded-md shadow-lg">
              {formatDistance(distanceKm)}
            </span>
          )}
        </div>

        <CardContent className="p-5 md:p-6 flex flex-col gap-3 flex-1">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-primary shrink-0" />
              <h3 className="text-base font-semibold text-foreground leading-tight">
                {cityName} · {neighborhoodName}
              </h3>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
              <User className="h-3.5 w-3.5" />
              <span>{t('card.hostedBy')} {listing.host_name}</span>
            </div>
          </div>

          {listing.price_type === 'free' ? (
            <Badge className="w-fit bg-green-50 text-green-700 border-green-200 border text-xs gap-1 hover:bg-green-50">
              <Heart className="h-3 w-3" /> {t('card.free')}
            </Badge>
          ) : listing.price_per_night ? (
            <Badge variant="secondary" className="w-fit text-xs gap-1">
              ₪{listing.price_per_night}{t('card.perNight')}
            </Badge>
          ) : null}

          <div className="border-t border-border" />

          <p className="text-sm text-muted-foreground">
            {listing.bedrooms} {listing.bedrooms !== 1 ? t('card.bedrooms') : t('card.bedroom')} · {listing.total_beds} {listing.total_beds !== 1 ? t('card.beds') : t('card.bed')}
          </p>

          <div className="flex flex-wrap gap-2">
            {listing.pets_allowed ? (
              <Badge variant="outline" className="text-xs gap-1 border-green-200 text-green-700 bg-green-50">
                <PawPrint className="h-3 w-3" /> {t('card.petsWelcome')}
              </Badge>
            ) : (
              <Badge variant="outline" className="text-xs gap-1 border-red-200 text-red-600 bg-red-50">
                <PawPrint className="h-3 w-3" /> {t('card.noPets')}
              </Badge>
            )}
            {listing.smoking_allowed ? (
              <Badge variant="outline" className="text-xs gap-1 border-green-200 text-green-700 bg-green-50">
                <Cigarette className="h-3 w-3" /> {t('card.smokingOk')}
              </Badge>
            ) : (
              <Badge variant="outline" className="text-xs gap-1 border-red-200 text-red-600 bg-red-50">
                <Cigarette className="h-3 w-3" /> {t('card.noSmoking')}
              </Badge>
            )}
          </div>

          <div className="h-6">
            {hasNotes && (
              <button onClick={() => setDetailsOpen(true)} className="inline-flex items-center gap-1 text-xs text-primary hover:underline">
                <Info className="h-3.5 w-3.5" />
                {t('card.viewDetails')}
              </button>
            )}
          </div>

          <div className="flex-1" />

          <div>
            <Button
              onClick={handleWhatsAppClick}
              className="w-full bg-whatsapp hover:bg-whatsapp/85 active:scale-[0.98] text-whatsapp-foreground font-semibold rounded-lg transition-all duration-150"
              size="lg"
            >
              <MessageCircle className="h-5 w-5 me-2" />
              {t('card.contactWhatsApp')}
            </Button>
            <p className="mt-2 text-xs text-muted-foreground/70 text-center">
              {t('card.whatsappHint')}
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
              {cityName} · {neighborhoodName}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {t('card.hostedBy')} {listing.host_name}
            </p>
            <div className="border-t border-border" />
            <p className="text-sm text-muted-foreground">
              {listing.bedrooms} {listing.bedrooms !== 1 ? t('card.bedrooms') : t('card.bedroom')} · {listing.total_beds} {listing.total_beds !== 1 ? t('card.beds') : t('card.bed')}
            </p>
            {listing.sleeping_notes && (
              <div className="flex items-start gap-2 text-sm text-foreground">
                <BedDouble className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-xs text-muted-foreground mb-0.5">{t('card.sleepingArrangements')}</p>
                  <p>{listing.sleeping_notes}</p>
                </div>
              </div>
            )}
            {listing.mamad_notes && (
              <div className="flex items-start gap-2 text-sm text-foreground">
                <Shield className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-xs text-muted-foreground mb-0.5">{t('card.shelterNotes')}</p>
                  <p>{listing.mamad_notes}</p>
                </div>
              </div>
            )}
            {/* Map disabled for this version — geocoding accuracy needs improvement */}
            <div className="border-t border-border pt-2">
              <Button
                onClick={handleWhatsAppClick}
                className="w-full bg-whatsapp hover:bg-whatsapp/85 text-whatsapp-foreground font-semibold rounded-lg"
                size="lg"
              >
                <MessageCircle className="h-5 w-5 me-2" />
                {t('card.contactWhatsApp')}
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
              <img src={photoUrls[lightboxIndex]} alt={`Photo ${lightboxIndex + 1}`} className="max-h-[80vh] max-w-full object-contain rounded" />
              {photoUrls.length > 1 && (
                <>
                  <button onClick={() => setLightboxIndex((lightboxIndex - 1 + photoUrls.length) % photoUrls.length)} className="absolute start-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 rounded-full p-1.5 transition shadow-lg">
                    <ChevronLeft className="h-5 w-5 text-white" />
                  </button>
                  <button onClick={() => setLightboxIndex((lightboxIndex + 1) % photoUrls.length)} className="absolute end-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 rounded-full p-1.5 transition shadow-lg">
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
