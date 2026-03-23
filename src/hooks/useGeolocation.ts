import { useState, useCallback } from 'react';

interface GeolocationState {
  latitude: number | null;
  longitude: number | null;
  loading: boolean;
  error: string | null;
  requested: boolean;
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    loading: false,
    error: null,
    requested: false,
  });

  const requestLocation = useCallback(() => {
    if (state.latitude != null) return; // already have it

    if (!navigator.geolocation) {
      setState(prev => ({ ...prev, error: 'Geolocation not supported', requested: true }));
      return;
    }

    setState(prev => ({ ...prev, loading: true, requested: true }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          loading: false,
          error: null,
          requested: true,
        });
      },
      (error) => {
        setState(prev => ({ ...prev, loading: false, error: error.message, requested: true }));
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
    );
  }, [state.latitude]);

  return { ...state, requestLocation };
}