import { useEffect, useRef } from 'react';

const useInitNavermap = () => {
  const { naver } = window;
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<naver.maps.Map | undefined>(undefined);
  const activeInfoWindowRef = useRef<naver.maps.InfoWindow | null>(null);

  useEffect(() => {
    if (!naver || !mapContainerRef.current) return;

    mapRef.current = new naver.maps.Map(mapContainerRef.current, {
      zoom: 14,
    });
  }, [naver]);

  return { mapContainerRef, mapRef, activeInfoWindowRef };
};

export default useInitNavermap;
