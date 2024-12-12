import { useNavigate } from 'react-router-dom';
import { CategoryTab, Header, PageContainer } from '@daeng-ggu/design-system';

import useGetDesignerProfile from '@/hooks/queries/DesignerProfile/useGetDesignerProfile';

import Portfolio from './components/Portfolio';
import Profile from './components/Profile';
import ReviewList from './components/ReviewList';

const MyPage = () => {
  const navigate = useNavigate();
  const designerId = 2;
  const { data: designerProfileData, isError } = useGetDesignerProfile(designerId);
  console.log(designerProfileData);

  if (isError || !designerProfileData) {
    return <div>프로필 정보를 가져오는 중 오류가 발생했습니다.</div>;
  }
  const tabs = [
    {
      label: '포트폴리오',
      content: (
        <Portfolio
          portfolioList={designerProfileData.portfolioList}
          certifications={designerProfileData.certifications}
          onPortfolioClick={(portfolioId: number) =>
            navigate(`/profile/portfolio/${portfolioId}`, { state: { portfolios: designerProfileData.portfolioList } })
          }
        />
      ),
    },
    {
      label: '리뷰',
      content: (
        <ReviewList
          reviews={designerProfileData.reviewList}
          onReviewClick={(reviewId: number) =>
            navigate(`/profile/review/${reviewId}`, { state: { reviews: designerProfileData.reviewList } })
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
          designerId={designerProfileData.designerId}
          nickname={designerProfileData.nickname}
          designerImgUrl={designerProfileData.designerImgUrl}
          designerImgName={designerProfileData.designerImgName}
          providedServices={designerProfileData.providedServices}
          possibleBreeds={designerProfileData.possibleBreeds}
          reviewStarAvg={designerProfileData.reviewStarAvg}
          reviewLikeCntAll={designerProfileData.reviewLikeCntAll}
          address={designerProfileData.address1}
          introduction={designerProfileData.introduction}
          workExperience={designerProfileData.workExperience}
        />
        <CategoryTab tabs={tabs} />
      </PageContainer>
    </div>
  );
};

export default MyPage;
