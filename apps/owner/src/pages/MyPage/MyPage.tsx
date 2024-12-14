import { useNavigate } from 'react-router';
import { CategoryTab, Header, PageContainer } from '@daeng-ggu/design-system';

import useGetProfile from '@/hooks/queries/CustomerProfile/useGetProfile';

import AvartarList from './components/AvartarList';
import BookmarkList from './components/BookmarkList';
import Profile from './components/Profile';
import ReviewList from './components/ReviewList';

const MyPage = () => {
  const navigate = useNavigate();
  const customerId = 2;
  const { data: profileData, isError } = useGetProfile(customerId);
  console.log(profileData);
  if (isError || !profileData) {
    return <div>프로필 정보를 가져오는 중 오류가 발생했습니다.</div>;
  }

  const tabs = [
    {
      label: '리뷰',
      content: (
        <ReviewList
          reviews={profileData.reviewList}
          onReviewClick={(reviewId: number) =>
            navigate(`/profile/review/${reviewId}`, { state: { reviews: profileData.reviewList } })
          }
        />
      ),
    },
    {
      label: '찜한 목록',
      content: <BookmarkList bookmarkList={profileData.bookmarkList} />,
    },
  ];
  const handleNavigateMain = () => {
    navigate('/');
  };

  return (
    <div className='pb-[185px]'>
      <PageContainer>
        <Header mode='back' title='마이페이지' onClick={handleNavigateMain} />
        <Profile
          nickname={profileData.nickname}
          customerImgUrl={profileData.customerImgUrl}
          customerImgName={profileData.customerImgName}
        />
        <AvartarList pets={profileData.petList} />
        <CategoryTab tabs={tabs} />
      </PageContainer>
    </div>
  );
};
export default MyPage;
