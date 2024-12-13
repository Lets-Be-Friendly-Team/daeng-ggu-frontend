import { ChangeEvent, useState } from 'react';
import { Header, SearchBar } from '@daeng-ggu/design-system';

import NaverSearchDesignerMap from '@/components/NaverMap/NaverSearchDesignerMap';

const MapPage = () => {
  const [keyword, setKeyword] = useState('');

  const handleKeywordChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setKeyword(ev.target.value);
  };

  const handleSearch = () => {
    console.log('검색 실행:', keyword);
  };

  return (
    <div className='relative h-[calc(100vh-6.4rem)] w-full flex-col'>
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
      <NaverSearchDesignerMap />
      {/* </div> */}
    </div>
  );
};

export default MapPage;
