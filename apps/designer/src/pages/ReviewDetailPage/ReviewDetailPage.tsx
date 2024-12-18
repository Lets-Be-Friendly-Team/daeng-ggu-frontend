import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { CloseIcon, FilledHeartIcon, FullStarIcon, UserProfileImage } from '@daeng-ggu/design-system';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import './swiperStyle.css';

interface IReviewItem {
  reviewId: number;
  reviewImgList: string[];
  customerId: number;
  customerImgUrl: string | undefined;
  customerName: string;
  reviewContents: string;
  reviewLikeCnt: number;
  reviewStar: number;
  isReviewLike: boolean;
  feedExposure: boolean;
}

const ReviewDetail = () => {
  const [expandedReviews, setExpandedReviews] = useState<{ [key: number]: boolean }>({});
  const { state } = useLocation();
  const { reviewId } = useParams();
  const navigate = useNavigate();

  const reviews: IReviewItem[] = state?.reviews || [];
  const currentReviewIndex = reviews.findIndex((review) => review.reviewId === Number(reviewId));
  const [activeIndex, setActiveIndex] = useState(currentReviewIndex);

  const navigateBack = () => {
    navigate('/profile');
  };

  return (
    <div className='relative flex h-[calc(100vh-65px)] w-full flex-col bg-gray-900'>
      <div className='absolute left-0 right-0 top-0 z-10 flex h-[100px] items-center gap-[10px] bg-gradient-to-b from-black px-5'>
        <div className='flex w-full justify-end'>
          <button onClick={navigateBack}>
            <CloseIcon className='h-[20px] w-[20px] stroke-gray-50' />
          </button>
        </div>
      </div>
      <div className='bg-gradient-to-t from-black absolute bottom-0 left-0 right-0 z-10 flex h-[25%] justify-between items-start px-5'>
        {/* 프로필 이미지와 이름 */}
        <div className='flex flex-col gap-4'>
          <div className='flex items-center gap-3'>
            <UserProfileImage size='small' imageUrl={reviews[activeIndex]?.customerImgUrl} />
            <div className='text-secondary text-body2'>{reviews[activeIndex]?.customerName}</div>
          </div>

          {/* 리뷰 내용과 버튼 */}
          <div className='flex flex-1 px-1'>
            <div className='text-body2 text-secondary overflow-hidden leading-8'>
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
            <button>
              <FilledHeartIcon className='h-[30px] w-[30px]' color='#FF6842' />
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
          navigate(`/profile/review/${reviews[swiper.activeIndex].reviewId}`, { replace: true, state: { reviews } });
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

export default ReviewDetail;
