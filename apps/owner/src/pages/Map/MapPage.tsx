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
        <NaverMapContent className='absolute top-0 h-[calc(100vh-65px)]' mapLat={37.3595704} mapLng={127.105399}>
          <Marker position={{ lat: 37.3595704, lng: 127.105399 }} />
        </NaverMapContent>
        {/* </div> */}
      </div>
    </NavermapsProvider>
  );
};

export default MapPage;
