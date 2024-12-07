import { useNavigate } from 'react-router';
import { CategoryTab, Header, PageContainer } from '@daeng-ggu/design-system';

import AvartarList from './components/AvartarList';
import BookmarkList from './components/BookmarkList';
import Profile from './components/Profile';
import ReviewList from './components/ReviewList';

const data = {
  customerId: 2,
  customerName: '김장미',
  customerImgUrl: 'https://daeng-ggu-test.s3.ap-northeast-2.amazonaws.com/jangmi.jpg',
  customerImgName: 'jangmi.jpg',
  nickname: '장군엄마',
  petList: [
    {
      petId: 1,
      petName: '장군이',
      petImgUrl: 'https://daeng-ggu-test.s3.ap-northeast-2.amazonaws.com/janggun.jpg',
    },
    {
      petId: 2,
      petName: '하늘이',
      petImgUrl: 'https://daeng-ggu-test.s3.ap-northeast-2.amazonaws.com/haneul.jpg',
    },
  ],
  reviewList: [
    {
      reviewId: 1,
      reviewImgUrl1: 'https://daeng-ggu-test.s3.ap-northeast-2.amazonaws.com/haneul.jpg',
      reviewImgUrl2: 'https://daeng-ggu-test.s3.ap-northeast-2.amazonaws.com/haneul.jpg',
      reviewImgUrl3: null,
      designerId: 4,
      designerImgUrl: 'https://daeng-ggu-test.s3.ap-northeast-2.amazonaws.com/BigBang+Pet+Salon.jpg',
      designerAddress: '경기 성남시 분당구 삼평동 709',
      reviewContents:
        '디자이너가 매우 친절하고, 스타일링이 정말 마음에 들었습니다. 또 오고 싶어요. 진짜 진짜 진짜!!! 너무 좋아요어어어어어어어',
      reviewStar: 5,
      reviewLikeCnt: 2,
      feedExposure: true,
      nickname: '우리 미용실 짱',
    },
    {
      reviewId: 2,
      reviewImgUrl1: 'https://daeng-ggu-test.s3.ap-northeast-2.amazonaws.com/janggun.jpg',
      reviewImgUrl2: null,
      reviewImgUrl3: null,
      designerId: 4,
      designerImgUrl: 'https://daeng-ggu-test.s3.ap-northeast-2.amazonaws.com/BigBang+Pet+Salon.jpg',
      designerAddress: '경기 성남시 분당구 삼평동 709',
      reviewContents: '보통입니다.',
      reviewStar: 3,
      reviewLikeCnt: 1,
      feedExposure: false,
      nickname: '우리 미용실 최고임',
    },
    {
      reviewId: 3,
      reviewImgUrl1: 'https://daeng-ggu-test.s3.ap-northeast-2.amazonaws.com/haneul.jpg',
      reviewImgUrl2: null,
      reviewImgUrl3: null,
      designerId: 4,
      designerImgUrl: 'https://daeng-ggu-test.s3.ap-northeast-2.amazonaws.com/BigBang+Pet+Salon.jpg',
      designerAddress: '경기 성남시 분당구 삼평동 709',
      reviewContents: '"dsfsd"',
      reviewStar: 5,
      reviewLikeCnt: 0,
      feedExposure: false,
      nickname: '닉네임',
    },
    {
      reviewId: 4,
      reviewImgUrl1: 'https://daeng-ggu-test.s3.ap-northeast-2.amazonaws.com/janggun.jpg',
      reviewImgUrl2: null,
      reviewImgUrl3: null,
      designerId: 1,
      designerImgUrl: 'https://daeng-ggu-test.s3.ap-northeast-2.amazonaws.com/jangmi+hair+salon.jpg',
      designerAddress: '서울특별시 강남구 대치동 889-41',
      reviewContents: '좋아요!',
      reviewStar: 5,
      reviewLikeCnt: 0,
      feedExposure: true,
      nickname: '깎을래 볶을래',
    },
  ],
  bookmarkList: [
    {
      designerId: 1,
      nickname: '빅뱅 미용실',
      designerImgUrl: 'https://daeng-ggu-test.s3.ap-northeast-2.amazonaws.com/jangmi+hair+salon.jpg',
      designerAddress: '서울 강남구 역삼동',
      possibleBreed: ['말티즈', '포메라니안', '기타 소형견'],
    },
    {
      designerId: 2,
      nickname: '빅뱅 미용실',
      designerImgUrl: 'https://daeng-ggu-test.s3.ap-northeast-2.amazonaws.com/jangmi+hair+salon.jpg',
      designerAddress: '서울 서초구 서초동',
      possibleBreed: ['시바견', '스피츠'],
    },
    {
      designerId: 3,
      nickname: '빅뱅 미용실',
      designerImgUrl: 'https://daeng-ggu-test.s3.ap-northeast-2.amazonaws.com/jangmi+hair+salon.jpg',
      designerAddress: '서울 마포구 합정동',
      possibleBreed: ['래브라도 리트리버'],
    },
  ],
};
const MyPage = () => {
  const navigate = useNavigate();
  const tabs = [
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
    {
      label: '찜한 목록',
      content: <BookmarkList bookmarkList={data.bookmarkList} />,
    },
  ];
  const handleNavigateMain = () => {
    navigate('/');
  };

  return (
    <div className='pb-[185px]'>
      <PageContainer>
        <Header mode='back' title='마이페이지' onClick={handleNavigateMain} />
        <Profile nickname={data.nickname} customerImgUrl={data.customerImgUrl} customerImgName={data.customerImgName} />
        <AvartarList pets={data.petList} />
        <CategoryTab tabs={tabs} />
      </PageContainer>
    </div>
  );
};
export default MyPage;
