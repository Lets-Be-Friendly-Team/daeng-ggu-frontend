import { ReactNode, useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { useNavigate } from 'react-router';
import { MyLocationIcon } from '@daeng-ggu/design-system';
import { Marker, useInitNavermap, useUserLocation } from '@daeng-ggu/shared';

import getHomeMap, { DesignerInfo, HomeMapParams } from '@/apis/home/getHomeMap';
import DesignerInfoWindow from '@/components/NaverMap/DesignerInfoWindow';
import DesignerMarker from '@/components/NaverMap/DesignerMarker';
import GoLocationButton from '@/components/NaverMap/LocationButton';
import RefreshDesignerMarkerButton from '@/components/NaverMap/RefreshDesignerMarkerButton';
import { cn } from '@/lib/utils';

interface NaverMapContentProps {
  className?: string;
  subButton?: ReactNode;
}

const NaverSearchDesignerMap = ({ className }: NaverMapContentProps) => {
  const { naver } = window;
  const { location: userLocation } = useUserLocation();
  const { loaded, coordinates, permissionGranted } = userLocation;
  const navigate = useNavigate();

  const { mapContainerRef, mapRef, activeInfoWindowRef } = useInitNavermap();

  const [designerList, setDesignerList] = useState<DesignerInfo[]>([]);

  const handleDesignerMap = async (location: HomeMapParams) => {
    const response = await getHomeMap(location);
    setDesignerList(response.data);
  };

  useEffect(() => {
    const handleNaverMap = async () => {
      if (!naver || !mapRef.current) return;

      // 사용자가 위치 권한을 허용한 경우 지도 중심 설정 및 마커 추가
      if (permissionGranted) {
        const position = new naver.maps.LatLng(coordinates.lat, coordinates.lng);
        mapRef.current.setCenter(position);
        mapRef.current.setZoom(18);

        new naver.maps.Marker({
          position,
          icon: {
            content: ReactDOMServer.renderToString(
              <Marker>
                <MyLocationIcon />
              </Marker>,
            ),
          },
          map: mapRef.current,
        });
      }

      // 현재 지도 범위 가져오기 및 디자이너 데이터 불러오기
      const mapBounds = mapRef.current.getBounds();
      if (loaded && mapBounds) {
        await handleDesignerMap({
          minX: mapBounds.minX(),
          maxX: mapBounds.maxX(),
          minY: mapBounds.minY(),
          maxY: mapBounds.maxY(),
        });
      }

      // 지도 클릭 시 InfoWindow 닫기
      naver.maps.Event.addListener(mapRef.current, 'click', () => {
        if (activeInfoWindowRef.current) {
          activeInfoWindowRef.current.close();
          activeInfoWindowRef.current = null;
        }
      });
    };

    handleNaverMap();
  }, [loaded, permissionGranted, coordinates, naver, mapContainerRef, mapRef, activeInfoWindowRef]);

  useEffect(() => {
    if (designerList.length > 0 && mapRef.current) {
      designerList.forEach((designerInfo) => {
        const { nickname, lng, lat, designerId } = designerInfo;
        const location = new naver.maps.LatLng(lat, lng);

        // InfoWindow 생성
        const windowInfo = new naver.maps.InfoWindow({
          content: ReactDOMServer.renderToString(<DesignerInfoWindow designerInfo={designerInfo} />),
          borderWidth: 0,
          anchorSkew: false,
          backgroundColor: 'transparent',
          disableAnchor: true,
          disableAutoPan: true,
          pixelOffset: new naver.maps.Point(0, -10),
        });

        // 마커 생성
        const marker = new naver.maps.Marker({
          position: location,
          icon: {
            content: ReactDOMServer.renderToString(
              <Marker>
                <DesignerMarker title={nickname} />
              </Marker>,
            ),
          },
          map: mapRef.current,
        });

        const addButtonEventListener = () => {
          const profileButton = document.getElementById(`profile-btn-${designerId}`);
          if (profileButton) {
            console.log('efw');
            profileButton.addEventListener('click', () => {
              navigate(`/profile/${designerId}`);
            });
          }

          // 예약하기 버튼 클릭 시 예약 페이지로 이동 구현
          const reservationButton = document.getElementById(`reservation-btn-${designerId}`);
          if (reservationButton) {
            reservationButton.addEventListener('click', () => {
              navigate(`/reservation/${designerId}`);
            });
          }
        };

        // 마커 클릭 시 InfoWindow 열기
        naver.maps.Event.addListener(marker, 'click', (e) => {
          if (!mapRef.current) return;
          if (activeInfoWindowRef.current) {
            activeInfoWindowRef.current.close();
          }
          windowInfo.open(mapRef.current, marker);
          activeInfoWindowRef.current = windowInfo;

          mapRef.current.panTo(e.coord, { duration: 500 });
          addButtonEventListener();
        });
        naver.maps.Event.addListener(marker, 'mouseover', () => {
          if (!mapRef.current) return;
          if (activeInfoWindowRef.current) {
            activeInfoWindowRef.current.close();
          }
          windowInfo.open(mapRef.current, marker);
          activeInfoWindowRef.current = windowInfo;
          addButtonEventListener();
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [designerList, navigate]);

  return (
    <>
      <div className={cn('relative h-full w-full', className)} ref={mapContainerRef}>
        <GoLocationButton map={mapRef.current} location={{ loaded, coordinates, permissionGranted }} />
        <RefreshDesignerMarkerButton handleDesignerMap={handleDesignerMap} map={mapRef.current} />
      </div>
    </>
  );
};

export default NaverSearchDesignerMap;
