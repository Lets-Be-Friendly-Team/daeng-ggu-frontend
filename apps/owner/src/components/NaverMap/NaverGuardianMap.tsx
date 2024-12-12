import { useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';
import { GuardianIcon } from '@daeng-ggu/design-system';

import Marker from '@/components/NaverMap/Marker';
import useInitNavermap from '@/components/NaverMap/useInitNavermap';
import { cn } from '@/lib/utils';

interface NaverGuardianMapProps {
  className?: string;
  guardianLocation: { lat: number; lng: number };
}

const NaverGuardianMap = ({ className, guardianLocation }: NaverGuardianMapProps) => {
  const { mapContainerRef, mapRef } = useInitNavermap();
  const { naver } = window;
  useEffect(() => {
    if (!naver || !mapRef.current) return;
    const position = new naver.maps.LatLng(guardianLocation.lat, guardianLocation.lng);
    mapRef.current.setZoom(16);
    mapRef.current.setCenter(position);
    new naver.maps.Marker({
      position,
      icon: {
        content: ReactDOMServer.renderToString(
          <Marker>
            <GuardianIcon />
          </Marker>,
        ),
      },
      map: mapRef.current,
    });
  }, [guardianLocation.lat, guardianLocation.lng, mapRef, naver]);

  return <div className={cn('relative h-full w-full', className)} ref={mapContainerRef}></div>;
};

export default NaverGuardianMap;
