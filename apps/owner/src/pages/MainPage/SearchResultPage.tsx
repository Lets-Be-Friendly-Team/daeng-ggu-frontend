import { ChangeEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Header, PageContainer, SearchBar } from '@daeng-ggu/design-system';

import { DesignerType } from '@/components/DesignerInfo/DesignerData';
import DesignerList from '@/components/DesignerInfo/DesignerList';

const SearchResultPage = () => {
  const location = useLocation();
  const { keyword } = location.state || '';
  const [newKeyword, setNewKeyword] = useState(keyword); // 검색어
  const handleKeywordChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setNewKeyword(ev.target.value);
  };
  const navigate = useNavigate();
  // 검색시 수행할 함수
  const handleSearch = () => {
    navigate(`/search?keyword=${newKeyword}`, {
      state: {
        keyword,
      },
    });
  };

  // api 연동
  const [searchResult, setSearchResult] = useState<DesignerType[]>([]);

  useEffect(() => {
    // const fetchDataAndSetData = async ()=>{
    //   try{
    // const data =
    //   }
    // }
    setSearchResult([]);
  }, []);

  return (
    <>
      <PageContainer>
        <div className='sticky top-0 z-10'>
          <Header mode='main' />
          <div className='py-4'>
            <SearchBar keyword={newKeyword} handleSearch={handleSearch} onChange={handleKeywordChange} />
          </div>
        </div>
        <div className='mb-[6.5rem] py-8'>
          <DesignerList dataList={searchResult} />
        </div>
      </PageContainer>
    </>
  );
};
export default SearchResultPage;
