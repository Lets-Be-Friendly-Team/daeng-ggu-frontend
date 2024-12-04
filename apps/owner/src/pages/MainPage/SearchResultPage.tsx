import { ChangeEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { SearchBar } from '@daeng-ggu/design-system';

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
    navigate(`/search?keyword=${keyword}`, {
      state: {
        keyword,
      },
    });
  };

  return (
    <div>
      <SearchBar keyword={newKeyword} handleSearch={handleSearch} onChange={handleKeywordChange} />
    </div>
  );
};
export default SearchResultPage;
