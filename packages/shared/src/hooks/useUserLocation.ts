import { useEffect, useState } from 'react';

import useToast from './useToast';

interface Coordinates {
  lat: number;
  lng: number;
}

export interface LocationState {
  loaded: boolean;
  coordinates: Coordinates;
  permissionGranted: boolean;
}

const useUserLocation = (): { location: LocationState } => {
  const [location, setLocation] = useState<LocationState>({
    loaded: false,
    coordinates: { lat: 37.413294, lng: 126.734086 },
    permissionGranted: false,
  });
  const { showToast } = useToast();

  useEffect(() => {
    if (!navigator.geolocation) {
      return;
    }

    const onSuccess = (position: GeolocationPosition): void => {
      const { latitude, longitude } = position.coords;
      setLocation({
        loaded: true,
        coordinates: { lat: latitude, lng: longitude },
        permissionGranted: true,
      });
    };

    const onError = (): void => {
      setLocation({
        loaded: true,
        coordinates: { lat: 37.413294, lng: 126.734086 },
        permissionGranted: false,
      });
      showToast({ message: '현재 위치를 불러올 수 없습니다!', type: 'warning' });
    };

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, [showToast]);

  return { location };
};

export default useUserLocation;
