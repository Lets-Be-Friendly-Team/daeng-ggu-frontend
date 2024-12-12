import { LocationState, useToast } from '@daeng-ggu/shared';

const GoLocationButton = ({ map, location }: { map: naver.maps.Map | undefined; location: LocationState }) => {
  const { showToast } = useToast();
  const handleMoveToUserLocation = () => {
    if (!navigator.geolocation) {
      showToast({ message: 'Geolocation을 지원하지 않는 브라우저입니다.', type: 'warning' });
      return;
    }
    if (!location.loaded) {
      showToast({ message: '사용자 위치를 찾고 있어요!', type: 'warning' });
      return;
    }
    if (!location.permissionGranted) {
      showToast({ message: '위치 정보를 사용할 수 없습니다.', type: 'warning' });
      return;
    }
    if (!map) {
      showToast({ message: '지도를 불러오는 중입니다.', type: 'warning' });
      return;
    }

    const { lat, lng } = location.coordinates;
    const userLocation = new naver.maps.LatLng(lat, lng);
    map.panTo(userLocation, { duration: 300 });
  };

  return (
    <button
      className='absolute bottom-10 left-5 z-10 rounded-full bg-primary p-3 text-white shadow-md'
      onClick={handleMoveToUserLocation}
    >
      내 위치로 이동
    </button>
  );
};

export default GoLocationButton;
