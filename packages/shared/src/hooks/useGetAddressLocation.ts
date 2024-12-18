import { useEffect, useState } from 'react';
import { useToast } from '@daeng-ggu/shared';

export interface LocationState {
  loaded: boolean;
  coordinates: Coordinates;
}

interface Coordinates {
  lat: number;
  lng: number;
}

const useGetAddressLocation = (address: string) => {
  const { showToast } = useToast();
  const [location, setLocation] = useState<LocationState>({
    loaded: false,
    coordinates: { lat: 37.413294, lng: 126.734086 },
  });
  useEffect(() => {
    if (!address) return;

    naver.maps.Service.geocode(
      {
        query: address,
      },
      (status, response) => {
        if (status === naver.maps.Service.Status.ERROR) {
          showToast({ message: '주소를 찾을 수 없습니다.', type: 'warning' });
        }

        if (response.v2.meta.totalCount === 0) {
          showToast({ message: '주소를 찾을 수 없습니다.', type: 'warning' });
        }

        const item = response.v2.addresses[0];
        console.log('item', item);
        setLocation({
          loaded: true,
          coordinates: { lat: parseFloat(item.y), lng: parseFloat(item.x) },
        });
      },
    );
  }, [address, showToast]);
  return location;
};

export default useGetAddressLocation;
