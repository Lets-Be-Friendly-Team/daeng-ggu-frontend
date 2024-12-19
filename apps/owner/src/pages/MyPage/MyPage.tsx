import { useNavigate } from 'react-router';
import { CategoryTab, Header, LogoImage, PageContainer } from '@daeng-ggu/design-system';

import useGetProfile from '@/hooks/queries/CustomerProfile/useGetProfile';
import useOwnerIdStore from '@/stores/useOwnerIdStore';

import AvartarList from './components/AvartarList';
import BookmarkList from './components/BookmarkList';
import Profile from './components/Profile';
import ReviewList from './components/ReviewList';

const MyPage = () => {
  const navigate = useNavigate();
  const { ownerId } = useOwnerIdStore();
  const { data: profileData, isError } = useGetProfile(ownerId);

  if (isError || !profileData) {
    return (
      <PageContainer>
        <div className='flex h-screen w-full flex-col items-center justify-center'>
          <div className='flex w-[100%] flex-col items-center gap-y-[2rem]'>
            <img src={LogoImage} alt='logo image' className='w-3/5' />
            <div className='text-body1 text-gray-900'>프로필 정보를 가져오고 있습니다.</div>
          </div>
        </div>
      </PageContainer>
    );
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
  // const handleNavigateMain = () => {
  //   navigate('/');
  // };

  return (
    <div className='pb-[64px]'>
      <PageContainer>
        {/* <Header mode='back' title='마이페이지' onClick={handleNavigateMain} /> */}
        <Header mode='main' />
        <Profile
          nickname={profileData.nickname}
          customerImgUrl={profileData.customerImgUrl}
          customerImgName={profileData.customerImgName}
        />
        <div className='px-[0.4rem]'>
          <AvartarList pets={profileData.petList} />
        </div>
        <CategoryTab tabs={tabs} padding='px-[8rem]' />
      </PageContainer>
    </div>
  );
};
export default MyPage;
