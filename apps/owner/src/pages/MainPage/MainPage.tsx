// import { MapIcon, MyPageIcon, SendIcon } from '@daeng-ggu/design-system';

import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router';
import { Header, SearchBar } from '@daeng-ggu/design-system';

import MainCategoryTab from '@/components/MainCategoryTab/MainCategoryTab';

// import OwnerBottomTabBar from '@/components/BottomTabBar/OwnerBottomTabBar';

const MainPage = () => {
  const [keyword, setKeyword] = useState(''); // 검색어
  const handleKeywordChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setKeyword(ev.target.value);
  };
  const navigate = useNavigate();
  // 검색시 수행할 함수
  const handleSearch = () => {
    navigate(`/search?keyword=${keyword}`, {
      state: {
        keyword,
      },
    });
  };
  return (
    <>
      <div className='sticky top-0 z-10 bg-white px-8'>
        <Header mode='main' />
        <div className='py-4'>
          <SearchBar keyword={keyword} onChange={handleKeywordChange} handleSearch={handleSearch} />
        </div>
      </div>
      <MainCategoryTab />
    </>
  );
};

export default MainPage;
