import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CategoryTab, Header, LogoImage, PageContainer } from '@daeng-ggu/design-system';

import getBookmark from '@/apis/profile/getBookmark';
import useGetDesignerProfile from '@/hooks/queries/DesignerProfile/useGetDesignerProfile';
import useOwnerIdStore from '@/stores/useOwnerIdStore';

import Portfolio from './components/Portfolio';
import Profile from './components/Profile';
import ReviewList from './components/ReviewList';

const MyPage = () => {
  const navigate = useNavigate();
  // const designerId = 4;
  const { designerId } = useParams();
  // const customerId = 2;
  const { ownerId } = useOwnerIdStore();
  const { data: designerProfileData, isError } = useGetDesignerProfile(Number(designerId), ownerId);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (designerProfileData) {
      setIsBookmarked(designerProfileData.isBookmarked);
    }
  }, [designerProfileData]);

  const toggleBookmark = async (designerId: number, updatedStatus: boolean) => {
    try {
      await getBookmark({
        // customerId: 2,
        customerId: ownerId,
        designerId,
        bookmarkYn: designerProfileData?.isBookmarked ?? false,
      });

      setIsBookmarked(updatedStatus);
    } catch (error) {
      console.error('Bookmark toggle failed:', error);
    }
  };

  if (isError || !designerProfileData) {
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
          portfolioList={designerProfileData.portfolioList}
          certifications={designerProfileData.certifications}
          onPortfolioClick={(portfolioId: number) =>
            navigate(`/profile/portfolio/${designerId}/${portfolioId}`, {
              state: { portfolios: designerProfileData.portfolioList },
            })
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
        <Header mode='back' title='디자이너 페이지' onClick={handleNavigateMain} />
        <Profile
          isBookmarked={isBookmarked}
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
          onBookmarkToggle={toggleBookmark}
        />
        <CategoryTab tabs={tabs} />
      </PageContainer>
    </div>
  );
};

export default MyPage;
