import { ChangeEvent, useState } from 'react';
import { Marker, NavermapsProvider } from 'react-naver-maps';
import { Header, SearchBar } from '@daeng-ggu/design-system';

import NaverMapContent from '@/components/NaverMap/NaverMapContent';

const MapPage = () => {
  const [keyword, setKeyword] = useState('');

  const handleKeywordChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setKeyword(ev.target.value);
  };

  const handleSearch = () => {
    console.log('검색 실행:', keyword);
  };

  return (
    <NavermapsProvider ncpClientId='j6dpvzog6c'>
      <div className='relative'>
        <Header mode='back' title='지도로 검색' />
        <div className='absolute z-10 w-3/4 p-8'>
          <SearchBar keyword={keyword} onChange={handleKeywordChange} handleSearch={handleSearch} />
        </div>
        <NaverMapContent className='absolute top-0 mb-24 h-[calc(100vh-70px)]' mapLat={37.3595704} mapLng={127.105399}>
          <Marker position={{ lat: 37.3595704, lng: 127.105399 }} />
        </NaverMapContent>
      </div>
    </NavermapsProvider>
  );
};

export default MapPage;
