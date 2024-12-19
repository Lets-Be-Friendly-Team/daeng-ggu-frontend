import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { EmptyHeartIcon, FilledHeartIcon, FullStarIcon, LogoImage, UserProfileImage } from '@daeng-ggu/design-system';
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
    <>
      {reviews.length > 0 ? (
        <div className='relative flex h-[calc(100vh-65px)] w-full flex-col bg-gray-900'>
          <div
            className='absolute left-0 right-0 top-0 z-10 flex items-center gap-[1.2rem] bg-gradient-to-b from-black/55 p-[2rem] hover:cursor-pointer'
            onClick={() => navigateDesignerProfile(reviews[activeIndex].designerId)}
          >
            <div className='flex-shrink-0'>
              <UserProfileImage imageUrl={reviews[activeIndex]?.designerImgUrl} />
            </div>
            {/* <div className='flex w-full justify-between'> */}
            <div className='flex flex-col gap-[1rem]'>
              <div className='text-sub_h2 font-semibold text-white'>{reviews[activeIndex]?.designerName} 디자이너</div>
              <div className='text-caption text-white'>{reviews[activeIndex]?.designerAddress}</div>
            </div>
            {/* </div> */}
          </div>
          {/* <div className='absolute bottom-0 left-0 right-0 z-10 flex h-[25%] items-start justify-between bg-gradient-to-t from-black/55 px-[2rem]'> */}
          <div className='absolute bottom-[3rem] left-0 right-0 z-10 flex h-[20%] items-start justify-between px-[2rem]'>
            {/* 프로필 이미지와 이름 */}
            <div className='flex flex-col gap-[1.2rem]'>
              <div className='flex items-center gap-3'>
                <UserProfileImage size='small' imageUrl={reviews[activeIndex]?.customerImgUrl} />
                <div className='text-body2 font-semibold text-white'>{reviews[activeIndex]?.customerName}</div>
              </div>

              {/* 리뷰 내용과 버튼 */}
              <div className='flex flex-1 px-1'>
                <div className='overflow-hidden text-body2 leading-8 text-white'>
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
              <div className='flex flex-col items-center gap-[0.4rem]'>
                <button>
                  <FullStarIcon color='#ffffff' size='w-[2.7rem] h-[2.7rem]' />
                </button>
                <div className='font-semibold'>{reviews[activeIndex]?.reviewStar}</div>
              </div>
              <div className='flex flex-col items-center gap-[0.4rem]'>
                <button onClick={() => setIsLiked((prev) => !prev)}>
                  {isLiked ? (
                    <FilledHeartIcon className='h-[2.8rem] w-[2.8rem]' color='#FF6842' />
                  ) : (
                    <EmptyHeartIcon className='h-[2.8rem] w-[2.8rem]' color='white' />
                  )}
                </button>
                <div className='font-semibold'>{reviews[activeIndex]?.reviewLikeCnt}</div>
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
                  className='mySwiper3 relative h-full'
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
                        <div className='absolute bottom-0 left-0 h-1/3 w-full bg-gradient-to-t from-black/55' />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <div className='flex w-full flex-col items-center gap-y-[2rem] pt-[30%]'>
          <img src={LogoImage} className='w-1/5'></img>
          <p className='text-body3 text-gray-700'>등록된 피드가 없습니다</p>
        </div>
      )}
    </>
  );
};

export default FeedPage;
