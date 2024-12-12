import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { Header, PageContainer, SearchBar } from '@daeng-ggu/design-system';

import { DesignerType } from '@/components/DesignerInfo/DesignerData';
import DesignerList from '@/components/DesignerInfo/DesignerList';
import useGetSearchDesigners from '@/hooks/queries/DesignerList/useGetSearchDesigners';

export interface SearchKeyword {
  searchWord: string;
}

const SearchResultPage = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';
  const navigate = useNavigate();
  const [newKeyword, setNewKeyword] = useState(keyword); // 검색어
  const [searchResult, setSearchResult] = useState<DesignerType[]>([]);
  const { data, error } = useGetSearchDesigners({ searchWord: keyword });

  const handleKeywordChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setNewKeyword(ev.target.value);
  };

  // 검색시 수행할 함수
  const handleSearch = () => {
    const searchword = newKeyword.trim(); // 검색어 앞뒤 공백 제거
    setNewKeyword(searchword);
    if (searchword) {
      navigate(`/search?keyword=${searchword}`);
    }
  };

  // api 연동
  useEffect(() => {
    if (data) {
      console.log(data.data);
      setSearchResult(data.data.allDesignerList);
    }
  }, [data, setSearchResult]);

  if (error) return <p>Error: {error.message}</p>;

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
