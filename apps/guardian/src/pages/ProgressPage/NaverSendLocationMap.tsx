import { useCallback, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { guardianlocationWebSocket, useInitNavermap, useWatchUserLocation } from '@daeng-ggu/shared';

import { cn } from '@/lib/utils';

const NaverSendLocationMap = ({ className }: { className?: string }) => {
  const { mapContainerRef, mapRef } = useInitNavermap();
  const { reservationId } = useParams();
  const { naver } = window;
  const location = useWatchUserLocation();
  const markerRef = useRef<naver.maps.Marker | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  const sendLocationToServer = (lat: number, lng: number) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      const data = JSON.stringify({ latitude: lat, longitude: lng }); // 데이터를 JSON 문자열로 변환
      socketRef.current.send(data); // JSON 문자열 전송
    }
  };
  const updateMarkerPosition = useCallback(
    (lat: number, lng: number) => {
      if (!window.naver || !mapRef.current) return;
      const naver = window.naver;
      const position = new naver.maps.LatLng(lat, lng);

      if (markerRef.current) {
        markerRef.current.setPosition(position);
        return;
      }
      mapRef.current.setCenter(position);
      markerRef.current = new naver.maps.Marker({
        position,
        map: mapRef.current,
      });
    },
    [mapRef],
  );

  useEffect(() => {
    if (!reservationId) return;
    const socket = guardianlocationWebSocket(reservationId, 'GUARDIAN');
    socketRef.current = socket;

    socket.onopen = () => {
      console.log('socket opened');
    };
    socket.onerror = (error) => {
      console.error('socket error:', error);
    };

    return () => {
      socket.close();
    };
  }, [reservationId]);

  useEffect(() => {
    if (!naver || !mapRef.current || !location) return;

    const interval = setInterval(() => {
      const { lat, lng } = location;
      console.log('Sending location:', lat, lng);
      sendLocationToServer(lat, lng);
      updateMarkerPosition(lat, lng);
    }, 1000); // 1초마다 위치 업데이트

    return () => clearInterval(interval);
  }, [location, mapRef, naver, updateMarkerPosition]);

  return (
    <div className={cn('py-[2rem] ', className)}>
      <div className={cn('relative h-full w-full')} ref={mapContainerRef}></div>
    </div>
  );
};

export default NaverSendLocationMap;
