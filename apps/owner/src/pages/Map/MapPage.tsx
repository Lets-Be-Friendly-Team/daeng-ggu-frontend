import { Marker } from 'react-naver-maps';

import NaverMapContent from '@/components/NaverMap/NaverMapContent';

const MapPage = () => {
  return (
    <div>
      <NaverMapContent className={'mb-[6rem] h-[60rem]'} mapLat={37.3595704} mapLng={127.105399}>
        <Marker position={{ lat: 37.3595704, lng: 127.105399 }} />
        <Marker position={{ lat: 37.3595704, lng: 127.105399 }} />
        <Marker position={{ lat: 37.3595704, lng: 127.105399 }} />
        <Marker position={{ lat: 37.3595704, lng: 127.105399 }} />
        <Marker position={{ lat: 37.3595704, lng: 127.105399 }} />
        <Marker position={{ lat: 37.3595704, lng: 127.105399 }} />
        <Marker position={{ lat: 37.3595704, lng: 127.105399 }} />
      </NaverMapContent>
    </div>
  );
};
export default MapPage;
