import { ChangeEvent, useState } from 'react';
import { Header, SearchBar } from '@daeng-ggu/design-system';
import { useUserLocation } from '@daeng-ggu/shared';

import CurrentLocationBtn from '@/components/NaverMap/CurrentLocationBtn';
import CustomMarker from '@/components/NaverMap/CustomMarker';
import MyMarker from '@/components/NaverMap/MyMarker';
import NaverMapContent from '@/components/NaverMap/NaverMapContent';

const MapPage = () => {
  const [keyword, setKeyword] = useState('');

  const handleKeywordChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setKeyword(ev.target.value);
  };

  const handleSearch = () => {
    console.log('검색 실행:', keyword);
  };
  const { location } = useUserLocation();

  return (
    <div className='relative'>
      {/* <div className='px-8'>
          <Header mode='back' title='지도로 검색' />
        </div> */}
      <div className='absolute z-10 w-full'>
        <div className='bg-white px-8'>
          <Header mode='back' title='지도로 검색' />
        </div>
        <div className='p-8'>
          <SearchBar keyword={keyword} onChange={handleKeywordChange} handleSearch={handleSearch} />
        </div>
      </div>
      {/* <div className='absolute top-0 mb-[6.5rem] h-[calc(100vh-50px)]'> */}
      <NaverMapContent
        className='absolute top-0 h-[calc(100vh-75px)]'
        mapLat={location.coordinates.lat}
        mapLng={location.coordinates.lng}
      >
        <MyMarker location={location} />
        <CurrentLocationBtn lat={location.coordinates.lat} lng={location.coordinates.lng} />
        <CustomMarker
          markerList={[
            { designerId: 1, lat: 37.3595704, lng: 127.105399, nickname: 'test' },
            { designerId: 2, lat: 35.3595704, lng: 122.105399, nickname: 'test' },
            { designerId: 3, lat: 36.3595704, lng: 125.105399, nickname: 'test' },
          ]}
        />
      </NaverMapContent>
      {/* </div> */}
    </div>
  );
};

export default MapPage;
