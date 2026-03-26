import { useState, useEffect } from 'react';

export const useGeolocation = (options = {
  enableHighAccuracy: true,
  maximumAge: 0,
  timeout: 5000
}) => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported');
      setLoading(false);
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setLocation({ lat, lng });
        setError(null);
        setLoading(false);
        console.log("📍 Live Location Synced:", lat, lng);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
        console.error("❌ Geolocation Error:", err);
      },
      options
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [options.enableHighAccuracy, options.maximumAge, options.timeout]);

  return { location, error, loading };
};
