import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface ApproxMapProps {
  lat: number;
  lng: number;
  label?: string;
}

export function ApproxMap({ lat, lng, label }: ApproxMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const map = L.map(mapRef.current, {
      center: [lat, lng],
      zoom: 15,
      scrollWheelZoom: false,
      dragging: true,
      zoomControl: true,
      attributionControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    // Shaded circle — ~300m radius to obscure exact location
    L.circle([lat, lng], {
      radius: 300,
      color: 'hsl(221, 83%, 53%)',
      fillColor: 'hsl(221, 83%, 53%)',
      fillOpacity: 0.15,
      weight: 2,
      opacity: 0.4,
    }).addTo(map);

    mapInstance.current = map;

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, [lat, lng]);

  return (
    <div className="space-y-1.5">
      <p className="text-xs font-medium text-muted-foreground">Where you'll be</p>
      {label && <p className="text-xs text-muted-foreground">{label}</p>}
      <div className="rounded-lg overflow-hidden border border-border">
        <div ref={mapRef} style={{ height: 200, width: '100%' }} />
      </div>
      <p className="text-[10px] text-muted-foreground/60">
        Approximate area shown — exact address shared after contact.
      </p>
    </div>
  );
}
