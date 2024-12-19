import { useState } from 'react';
import { useParams } from 'react-router';
import { EmptyHeartIcon, FilledHeartIcon, FullStarIcon, UserProfileImage } from '@daeng-ggu/design-system';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import './swiperStyle.css';

const FeedPage = () => {
  const [expandedReviews, setExpandedReviews] = useState<{ [key: number]: boolean }>({});
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const { reviewId } = useParams();
  const reviews = [
    {
      reviewId: 1,
      reviewImgUrl1: 'https://daeng-ggu-test.s3.ap-northeast-2.amazonaws.com/haneul.jpg',
      reviewImgUrl2: 'https://daeng-ggu-test.s3.ap-northeast-2.amazonaws.com/haneul.jpg',
      reviewImgUrl3: null,
      lastcreatedat: '2024-12-08T10:15:30',
      designerId: 4,
      designerImgUrl: 'https://daeng-ggu-test.s3.ap-northeast-2.amazonaws.com/BigBang+Pet+Salon.jpg',
      designerAddress: '경기 성남시 분당구 삼평동 709',
      nickname: '우리 미용실 짱',
      designerName: '권지용',
      customerId: 101,
      customerImgUrl: 'https://daeng-ggu-test.s3.ap-northeast-2.amazonaws.com/haneul.jpg',
      customerName: '김장군',
      reviewContents:
        '디자이너가 매우 친절하고, 스타일링이 정말 마음에 들었습니다. 또 오고 싶어요. 진짜 진짜 진짜!!! 너무 좋아요어어어어어어어',
      reviewStar: 5,
      reviewLikeCnt: 2,
      isReviewLike: true,
      feedExposureYn: 'Y',
    },
    {
      reviewId: 2,
      reviewImgUrl1: 'https://daeng-ggu-test.s3.ap-northeast-2.amazonaws.com/janggun.jpg',
      reviewImgUrl2: null,
      reviewImgUrl3: null,
      lastcreatedat: '2024-12-07T14:00:00',
      designerId: 4,
      designerImgUrl: 'https://daeng-ggu-test.s3.ap-northeast-2.amazonaws.com/BigBang+Pet+Salon.jpg',
      designerAddress: '경기 성남시 분당구 삼평동 709',
      nickname: '우리 미용실 최고임',
      designerName: '권지용',
      customerId: 102,
      customerImgUrl: 'https://daeng-ggu-test.s3.ap-northeast-2.amazonaws.com/janggun.jpg',
      customerName: '이장미',
      reviewContents: '보통입니다.',
      reviewStar: 3,
      reviewLikeCnt: 1,
      isReviewLike: false,
      feedExposureYn: 'N',
    },
    {
      reviewId: 3,
      reviewImgUrl1: 'https://daeng-ggu-test.s3.ap-northeast-2.amazonaws.com/haneul.jpg',
      reviewImgUrl2: null,
      reviewImgUrl3: null,
      lastcreatedat: '2024-12-06T11:45:20',
      designerId: 4,
      designerImgUrl: 'https://daeng-ggu-test.s3.ap-northeast-2.amazonaws.com/BigBang+Pet+Salon.jpg',
      designerAddress: '경기 성남시 분당구 삼평동 709',
      nickname: '짱짱 미용실',
      designerName: '권지용',
      customerId: 103,
      customerImgUrl: 'https://daeng-ggu-test.s3.ap-northeast-2.amazonaws.com/customer3.jpg',
      customerName: '홍길동',
      reviewContents: '친절하고 좋아요.',
      reviewStar: 4,
      reviewLikeCnt: 0,
      isReviewLike: false,
      feedExposureYn: 'Y',
    },
    {
      reviewId: 4,
      reviewImgUrl1: 'https://daeng-ggu-test.s3.ap-northeast-2.amazonaws.com/janggun.jpg',
      reviewImgUrl2: null,
      reviewImgUrl3: null,
      lastcreatedat: '2024-12-05T09:00:00',
      designerId: 1,
      designerImgUrl: 'https://daeng-ggu-test.s3.ap-northeast-2.amazonaws.com/jangmi+hair+salon.jpg',
      designerAddress: '서울특별시 강남구 대치동 889-41',
      nickname: '깎을래 볶을래',
      designerName: '김장미',
      customerId: 104,
      customerImgUrl: 'https://daeng-ggu-test.s3.ap-northeast-2.amazonaws.com/customer4.jpg',
      customerName: '최은지',
      reviewContents: '좋아요!',
      reviewStar: 5,
      reviewLikeCnt: 0,
      isReviewLike: true,
      feedExposureYn: 'Y',
    },
  ];

  const currentReviewIndex = Math.max(
    reviews.findIndex((review) => review.reviewId === Number(reviewId)),
    0,
  );
  const [activeIndex, setActiveIndex] = useState(currentReviewIndex);

  return (
    <div className='relative flex h-[calc(100vh-65px)] w-full flex-col bg-gray-900'>
      <div className='absolute left-0 right-0 top-0 z-10 flex h-[100px] items-center gap-[10px] bg-gradient-to-b from-[rgb(21 29 36 / 51%)] px-5'>
        <div className='flex-shrink-0'>
          <UserProfileImage imageUrl={reviews[activeIndex]?.designerImgUrl} />
        </div>
        <div className='flex w-full justify-between'>
          <div className='flex flex-col'>
            <div className='text-sub_h2 text-secondary'>{reviews[activeIndex]?.nickname}</div>
            <div className='text-caption text-secondary'>{reviews[activeIndex]?.designerAddress}</div>
          </div>
        </div>
      </div>
      <div className='absolute bottom-0 left-0 right-0 z-10 flex h-[25%] items-start justify-between bg-gradient-to-t from-black px-5'>
        {/* 프로필 이미지와 이름 */}
        <div className='flex flex-col gap-4'>
          <div className='flex items-center gap-3'>
            <UserProfileImage size='small' imageUrl={reviews[activeIndex]?.customerImgUrl} />
            <div className='text-body2 text-secondary'>{reviews[activeIndex]?.customerName}</div>
          </div>

          {/* 리뷰 내용과 버튼 */}
          <div className='flex flex-1 px-1'>
            <div className='overflow-hidden text-body2 leading-8 text-secondary'>
              {expandedReviews[currentReviewIndex] ? (
                reviews[currentReviewIndex]?.reviewContents
              ) : (
                <>
                  {reviews[currentReviewIndex]?.reviewContents.slice(0, 50)}
                  {reviews[currentReviewIndex]?.reviewContents.length > 50 && (
                    <button
                      onClick={() =>
                        setExpandedReviews((prev) => ({
                          ...prev,
                          [currentReviewIndex]: true,
                        }))
                      }
                    >
                      ...더보기
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* 별점과 좋아요 버튼 */}
        <div className='flex flex-col gap-[10px] text-body2 text-gray-50'>
          <div className='flex flex-col items-center'>
            <button>
              <FullStarIcon color='#ffffff' size='w-[30px] h-[30px]' />
            </button>
            <div>{reviews[activeIndex]?.reviewStar}</div>
          </div>
          <div className='flex flex-col items-center'>
            <button onClick={() => setIsLiked((prev) => !prev)}>
              {isLiked ? (
                <FilledHeartIcon className='h-[30px] w-[30px]' color='#FF6842' />
              ) : (
                <EmptyHeartIcon className='h-[30px] w-[30px]' color='#F2F4F5' />
              )}
            </button>
            <div>{reviews[activeIndex]?.reviewLikeCnt}</div>
          </div>
        </div>
      </div>

      <Swiper
        direction='vertical'
        slidesPerView={1}
        initialSlide={currentReviewIndex}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.activeIndex);
        }}
        className='mySwiper2 flex-1'
        modules={[Pagination]}
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.reviewId}>
            <Swiper
              direction='horizontal'
              slidesPerView={1}
              pagination={{ clickable: true }}
              modules={[Pagination]}
              className='relative h-full'
            >
              {[review.reviewImgUrl1, review.reviewImgUrl2, review.reviewImgUrl3]
                .filter(Boolean)
                .map((imageUrl, index) => (
                  <SwiperSlide key={index}>
                    <div className='relative h-full w-full overflow-hidden'>
                      <img
                        src={imageUrl || undefined}
                        alt={`Image ${index + 1}`}
                        className='absolute left-0 top-0 h-full w-full object-cover'
                        style={{
                          objectFit: 'cover',
                          objectPosition: 'center',
                        }}
                      />
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeedPage;
