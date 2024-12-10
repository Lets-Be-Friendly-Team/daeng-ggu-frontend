import { ReactElement, ReactNode, Suspense } from 'react';
import { Container as MapDiv, Marker, NaverMap, useNavermaps } from 'react-naver-maps';

interface NaverMapContentProps {
  mapLat: number;
  mapLng: number;
  children: ReactElement<typeof Marker> | ReactElement<typeof Marker>[];
  className?: string;
  subButton?: ReactNode;
}

const NaverMapContent = ({ className, children, mapLat, mapLng }: NaverMapContentProps) => {
  const navermaps = useNavermaps();

  return (
    <div>
      <Suspense fallback={null}>
        <MapDiv className={`w-full ${className}`}>
          <NaverMap defaultCenter={new navermaps.LatLng(mapLat, mapLng)} defaultZoom={15}>
            {children}
          </NaverMap>
        </MapDiv>
      </Suspense>
    </div>
  );
};

export default NaverMapContent;
