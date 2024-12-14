import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { EmptyHeartIcon, FilledHeartIcon, FullStarIcon, UserProfileImage } from '@daeng-ggu/design-system';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import useGetFeed from '@/hooks/queries/Review/useGetFeed';

import './swiperStyle.css';

const FeedPage = () => {
  const [expandedReviews, setExpandedReviews] = useState<{ [key: number]: boolean }>({});
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const { reviewId } = useParams();
  const navigate = useNavigate();

  // 페이지 번호 초기화
  const page = 0;
  const { data: feedData, isLoading, error } = useGetFeed(page);

  // API에서 받아온 리뷰 리스트
  const reviews = feedData?.reviewList || [];

  //   const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } = useInfiniteQuery<
  //   FeedResponse,
  //   Error
  // >(['feed'], ({ pageParam = 0 }) => getFeed({ page: pageParam }), {
  //   getNextPageParam: (lastPage, pages) => {
  //     const totalFetched = pages.length * FEEDS_PER_PAGE;
  //     if (totalFetched < lastPage.data.totalReview) {
  //       return pages.length + 1;
  //     }
  //     return undefined;
  //   },
  // });
  // 현재 리뷰 인덱스 계산
  const currentReviewIndex = Math.max(
    reviews.findIndex((review) => review.reviewId === Number(reviewId)),
    0,
  );
  const [activeIndex, setActiveIndex] = useState(currentReviewIndex);

  const navigateDesignerProfile = (designerId: number) => {
    navigate(`/profile/designer/${designerId}`);
  };

  if (isLoading) {
    return <div className='text-white'>로딩 중...</div>;
  }

  if (error) {
    return <div className='text-red-500'>에러가 발생했습니다. 다시 시도해주세요.</div>;
  }

  return (
    <div className='relative flex h-[calc(100vh-65px)] w-full flex-col bg-gray-900'>
      <div
        className='absolute left-0 right-0 top-0 z-10 flex h-[100px] items-center gap-[10px] bg-gradient-to-b from-black px-5 hover:cursor-pointer'
        onClick={() => navigateDesignerProfile(reviews[activeIndex].designerId)}
      >
        <div className='flex-shrink-0'>
          <UserProfileImage imageUrl={reviews[activeIndex]?.designerImgUrl} />
        </div>
        <div className='flex w-full justify-between'>
          <div className='flex flex-col'>
            <div className='text-sub_h2 text-secondary'>{reviews[activeIndex]?.designerName}</div>
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
              {review.reviewImgList.filter(Boolean).map((imageUrl, index) => (
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
