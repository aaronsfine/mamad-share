import { useState, useCallback, useEffect } from 'react';

interface GeolocationState {
  latitude: number | null;
  longitude: number | null;
  loading: boolean;
  error: string | null;
  requested: boolean;
}

export function useGeolocation(autoRequest = false) {
  const [state, setState] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    loading: false,
    error: null,
    requested: false,
  });

  const requestLocation = useCallback(() => {
    if (state.latitude != null) return;

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

  useEffect(() => {
    if (autoRequest && !state.requested) {
      requestLocation();
    }
  }, [autoRequest, state.requested, requestLocation]);

  return { ...state, requestLocation };
}