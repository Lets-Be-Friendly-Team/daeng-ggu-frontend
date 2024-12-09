import { useNavigate } from 'react-router-dom';
import { CategoryTab, Header, PageContainer } from '@daeng-ggu/design-system';

import Portfolio from './components/Portfolio';
import Profile from './components/Profile';
import ReviewList from './components/ReviewList';

const data = {
  designerId: 4,
  designerName: '권지용',
  nickname: '빅뱅 미용실',
  designerImgUrl: 'https://daeng-ggu-test.s3.ap-northeast-2.amazonaws.com/BigBang+Pet+Salon.jpg',
  designerImgName: 'BigBang Pet Salon.jpg',
  reviewStarAvg: 4.5,
  reviewLikeCntAll: 1,
  address1: '경기 성남시 분당구 삼평동 709',
  address2: '경기 성남시 분당구 판교로 375',
  detailAddress: '건물 1층',
  providedServices: [
    {
      servicesCode: 'S1',
      codeDesc: '기본 서비스 (미용, 목욕)',
    },
    {
      servicesCode: 'S2',
      codeDesc: '프리미엄 서비스 (스파)',
    },
  ],
  possibleBreeds: [
    {
      breedCode: 'P1',
      codeDesc: '소형견 (Small Breeds)',
    },
    {
      breedCode: 'P2',
      codeDesc: '중형견 (Medium Breeds)',
    },
    {
      breedCode: 'P3',
      codeDesc: '대형견 (Large Breeds)',
    },
  ],
  introduction: '따뜻한 마음으로 반려견 미용을 합니다.',
  workExperience: '2년 이상의 미용 경력을 보유',
  certifications: ['https://daeng-ggu-test.s3.ap-northeast-2.amazonaws.com/bigbang-certificate1.jpg'],
  portfolioList: [
    {
      portfolioId: 5,
      title: '소형견 포트폴리오',
      videoUrl: 'https://daeng-ggu-test.s3.ap-northeast-2.amazonaws.com/example_video.mp4',
      imgUrlList: [
        'https://i.pinimg.com/736x/06/a9/cf/06a9cff5c518dfc786736014e90f2f61.jpg',
        'https://i.pinimg.com/736x/cb/57/3f/cb573f3a49c0322ce18aca27b3fdcad0.jpg',
        'https://i.pinimg.com/736x/cc/98/5e/cc985e9670921e5ed30be658122f70c8.jpg',
      ],
      contents: '포메라니안, 요크셔테리어 등의 소형견 미용 작업을 보여주는 포트폴리오입니다.',
    },
    {
      portfolioId: 6,
      title: '중형견 포트폴리오',
      videoUrl: 'https://daeng-ggu-test.s3.ap-northeast-2.amazonaws.com/example_video.mp4',
      imgUrlList: [
        'https://i.pinimg.com/736x/06/a9/cf/06a9cff5c518dfc786736014e90f2f61.jpg',
        'https://i.pinimg.com/736x/cb/57/3f/cb573f3a49c0322ce18aca27b3fdcad0.jpg',
        'https://i.pinimg.com/736x/cc/98/5e/cc985e9670921e5ed30be658122f70c8.jpg',
      ],
      contents: '시바견, 코카스페니얼, 프렌치 불독 등의 중형견 미용 작업을 보여주는 포트폴리오입니다.',
    },
    {
      portfolioId: 7,
      title: '대형견 포트폴리오',
      videoUrl: 'https://daeng-ggu-test.s3.ap-northeast-2.amazonaws.com/example_video.mp4',
      imgUrlList: [
        'https://i.pinimg.com/736x/06/a9/cf/06a9cff5c518dfc786736014e90f2f61.jpg',
        'https://i.pinimg.com/736x/cb/57/3f/cb573f3a49c0322ce18aca27b3fdcad0.jpg',
        'https://i.pinimg.com/736x/cc/98/5e/cc985e9670921e5ed30be658122f70c8.jpg',
      ],
      contents:
        '시베리안 허스키, 알래스카 말라뮤트, 올드 잉글리시 쉽독 등의 대형견 미용 작업을 보여주는 포트폴리오입니다.',
    },
  ],
  reviewList: [
    {
      reviewId: 1,
      reviewImgUrl1: 'https://daeng-ggu-test.s3.ap-northeast-2.amazonaws.com/haneul.jpg',
      reviewImgUrl2: 'https://daeng-ggu-test.s3.ap-northeast-2.amazonaws.com/haneul.jpg',
      reviewImgUrl3: null,
      customerId: 4,
      customerImgUrl: 'https://daeng-ggu-test.s3.ap-northeast-2.amazonaws.com/BigBang+Pet+Salon.jpg',
      customerName: '장군엄마',
      reviewContents:
        '디자이너가 매우 친절하고, 스타일링이 정말 마음에 들었습니다. 또 오고 싶어요. 진짜 진짜 진짜!!! 너무 좋아요어어어어어어어',
      reviewStar: 5,
      reviewLikeCnt: 2,
      isReviewLike: true,
      feedExposure: true,
    },
    {
      reviewId: 2,
      reviewImgUrl1: 'https://daeng-ggu-test.s3.ap-northeast-2.amazonaws.com/janggun.jpg',
      reviewImgUrl2: null,
      reviewImgUrl3: null,
      customerId: 5,
      customerImgUrl: 'https://daeng-ggu-test.s3.ap-northeast-2.amazonaws.com/BigBang+Pet+Salon.jpg',
      customerName: '멍멍',
      reviewContents: '너무 좋아요어어어어어어어',
      reviewStar: 5,
      reviewLikeCnt: 2,
      isReviewLike: true,
      feedExposure: true,
    },
    {
      reviewId: 3,
      reviewImgUrl1: 'https://daeng-ggu-test.s3.ap-northeast-2.amazonaws.com/haneul.jpg',
      reviewImgUrl2: null,
      reviewImgUrl3: null,
      customerId: 4,
      customerImgUrl: 'https://daeng-ggu-test.s3.ap-northeast-2.amazonaws.com/BigBang+Pet+Salon.jpg',
      customerName: '하이',
      reviewContents: '디자이너가 매우 친절하고, 스타일링이 정말 마음에 들었습니다.:)',
      reviewStar: 6,
      reviewLikeCnt: 2,
      isReviewLike: true,
      feedExposure: true,
    },
    {
      reviewId: 4,
      reviewImgUrl1: 'https://daeng-ggu-test.s3.ap-northeast-2.amazonaws.com/janggun.jpg',
      reviewImgUrl2: null,
      reviewImgUrl3: null,
      customerId: 7,
      customerImgUrl: 'https://daeng-ggu-test.s3.ap-northeast-2.amazonaws.com/BigBang+Pet+Salon.jpg',
      customerName: '장군아빠',
      reviewContents: '굿굿굿',
      reviewStar: 5,
      reviewLikeCnt: 2,
      isReviewLike: true,
      feedExposure: true,
    },
  ],
};

const MyPage = () => {
  const navigate = useNavigate();
  const tabs = [
    {
      label: '포트폴리오',
      content: (
        <Portfolio
          portfolioList={data.portfolioList}
          certifications={data.certifications}
          onPortfolioClick={(portfolioId: number) =>
            navigate(`/profile/portfolio/${portfolioId}`, { state: { portfolios: data.portfolioList } })
          }
        />
      ),
    },
    {
      label: '리뷰',
      content: (
        <ReviewList
          reviews={data.reviewList}
          onReviewClick={(reviewId: number) =>
            navigate(`/profile/review/${reviewId}`, { state: { reviews: data.reviewList } })
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
          nickname={data.nickname}
          designerImgUrl={data.designerImgUrl}
          designerImgName={data.designerImgName}
          providedServices={data.providedServices}
          possibleBreeds={data.possibleBreeds}
          reviewStarAvg={data.reviewStarAvg}
          reviewLikeCntAll={data.reviewLikeCntAll}
          address={data.address1}
          introduction={data.introduction}
          workExperience={data.workExperience}
        />
        <CategoryTab tabs={tabs} />
      </PageContainer>
    </div>
  );
};

export default MyPage;
