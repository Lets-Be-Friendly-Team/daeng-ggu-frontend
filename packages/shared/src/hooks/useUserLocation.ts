import { useEffect, useState } from 'react';

import useToast from './useToast';

interface Coordinates {
  lat: number;
  lng: number;
}

interface LocationState {
  loaded: boolean;
  coordinates: Coordinates;
}

const useUserLocation = (): { location: LocationState } => {
  const [location, setLocation] = useState<LocationState>({
    loaded: false,
    coordinates: { lat: 37.413294, lng: 126.734086 },
  });
  const { showToast } = useToast();

  const onSuccess = (position: GeolocationPosition): void => {
    const { latitude, longitude } = position.coords;
    setLocation({
      loaded: true,
      coordinates: { lat: latitude, lng: longitude },
    });
  };

  const onError = (): void => {
    setLocation({
      loaded: true,
      coordinates: { lat: 37.413294, lng: 126.734086 },
    });
    showToast({ message: '현재 위치를 불러올 수 없습니다!', type: 'warning' });
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  return { location };
};

export default useUserLocation;
