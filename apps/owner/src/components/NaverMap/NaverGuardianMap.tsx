import { useEffect, useRef } from 'react';
import ReactDOMServer from 'react-dom/server';
import { GuardianIcon } from '@daeng-ggu/design-system';
import { guardianlocationWebSocket, useInitNavermap } from '@daeng-ggu/shared';

import Marker from '@/components/NaverMap/Marker';
import { cn } from '@/lib/utils';

interface NaverGuardianMapProps {
  className?: string;
  reservationId?: string;
}

const NaverGuardianMap = ({ reservationId, className }: NaverGuardianMapProps) => {
  const { mapContainerRef, mapRef } = useInitNavermap();

  const { naver } = window;

  const socketRef = useRef<WebSocket | null>(null);
  const markerRef = useRef<naver.maps.Marker | null>(null);

  useEffect(() => {
    if (!reservationId) return;
    const socket = guardianlocationWebSocket(reservationId, 'CUSTOMER');

    socketRef.current = socket;

    socket.onopen = () => {
      console.log('socket opened');
    };
    socket.onerror = (error) => {
      console.error('socket error:', error);
    };

    socket.onmessage = (event) => {
      try {
        // 서버로부터 받은 위치 데이터를 파싱
        const data = JSON.parse(event.data);
        const { latitude: parsedLatitude, longitude: parsedLongitude } = {
          latitude: parseFloat(data.latitude),
          longitude: parseFloat(data.longitude),
        };
        if (window.naver && mapRef.current) {
          const naver = window.naver;
          const position = new naver.maps.LatLng(parsedLatitude, parsedLongitude);
          console.log(position);
          // 지도 위치 이동
          if (mapRef.current) {
            mapRef.current.panTo(position);
          }

          // 기존 마커가 있는 경우 위치 업데이트
          if (markerRef.current) {
            markerRef.current.setPosition(position);
          }

          // 기존 마커가 없는 경우 새 마커 생성
          if (!markerRef.current) {
            markerRef.current = new naver.maps.Marker({
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
          }
        }
      } catch (error) {
        console.error('서버에서 받은 데이터 처리 중 오류:', error);
      }
    };

    return () => {
      socket.close();
    };
  }, [mapRef, reservationId]);

  useEffect(() => {
    if (!naver || !mapRef.current) return;
    mapRef.current.setZoom(16);
  }, [mapRef, naver]);

  return <div className={cn('relative h-full w-full', className)} ref={mapContainerRef}></div>;
};

export default NaverGuardianMap;
