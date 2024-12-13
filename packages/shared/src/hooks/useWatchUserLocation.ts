import { useEffect, useState } from 'react';

import useToast from '../hooks/useToast';

interface Location {
  lat: number;
  lng: number;
}

const useWatchUserLocation = (): Location => {
  const [location, setLocation] = useState<Location>({ lat: 37.413294, lng: 126.734086 });
  const { showToast } = useToast();
  useEffect(() => {
    if (!navigator.geolocation) {
      showToast({ message: '위치제공을 지원하지 않는 브라우저입니다.', type: 'warning' });
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
      },
      () => {
        showToast({ message: '현재 위치를 불러올 수 없습니다!', type: 'error' });
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
      },
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [showToast]);

  return location;
};

export default useWatchUserLocation;
