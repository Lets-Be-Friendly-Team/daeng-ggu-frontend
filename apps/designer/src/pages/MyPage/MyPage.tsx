import { useNavigate } from 'react-router-dom';
import { CategoryTab, Header, LogoImage, PageContainer } from '@daeng-ggu/design-system';

import useGetProfile from '@/hooks/queries/DesignerProfile/useGetProfile';
import useDesignerIdStore from '@/stores/useDesignerIdStore';

import Portfolio from './components/Portfolio';
import Profile from './components/Profile';
import ReviewList from './components/ReviewList';

const MyPage = () => {
  const navigate = useNavigate();
  // const designerId = 2;
  const { designerId } = useDesignerIdStore();
  const { data: profileData, isError } = useGetProfile(designerId);
  console.log(profileData);

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
      label: '포트폴리오',
      content: (
        <Portfolio
          portfolioList={profileData.portfolioList}
          certifications={profileData.certifications}
          onPortfolioClick={(portfolioId: number) =>
            navigate(`/profile/portfolio/${portfolioId}`, { state: { portfolios: profileData.portfolioList } })
          }
        />
      ),
    },
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
          designerImgUrl={profileData.designerImgUrl}
          designerImgName={profileData.designerImgName}
          providedServices={profileData.providedServices}
          possibleBreeds={profileData.possibleBreeds}
          reviewStarAvg={profileData.reviewStarAvg}
          reviewLikeCntAll={profileData.reviewLikeCntAll}
          address={profileData.address1}
          introduction={profileData.introduction}
          workExperience={profileData.workExperience}
        />
        <CategoryTab tabs={tabs} />
      </PageContainer>
    </div>
  );
};

export default MyPage;
