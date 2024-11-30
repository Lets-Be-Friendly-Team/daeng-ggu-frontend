import { CategoryTab, Header } from '@daeng-ggu/design-system';

import PageContainer from '../../../../../packages/design-system/components/PageContainer/PageContainer';

import AvartarList from './components/AvartarList';
import Profile from './components/Profile';

const MyPage = () => {
  const tabs = [
    {
      label: '리뷰',
      content: <></>,
    },
    {
      label: '찜한 목록',
      content: <></>,
    },
  ];
  return (
    <>
      <PageContainer>
        <Header mode='back' title='마이페이지' />
        <Profile />
        <AvartarList />
        <CategoryTab tabs={tabs} />
      </PageContainer>
    </>
  );
};
export default MyPage;
