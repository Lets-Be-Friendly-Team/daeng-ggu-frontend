import { useLocation, useNavigate, useParams } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

interface IReviewItem {
  reviewId: number;
  reviewImgUrl1: string;
  reviewImgUrl2: string | null;
  reviewImgUrl3: string | null;
  reviewContents: string;
  reviewLikeCnt: number;
  reviewStar: number;
}

const ReviewDetail = () => {
  const { state } = useLocation();
  const { reviewId } = useParams();
  const navigate = useNavigate();

  const reviews: IReviewItem[] = state?.reviews || [];

  if (!reviews || reviews.length === 0) {
    return <div className='text-center text-gray-500'>리뷰 데이터를 찾을 수 없습니다.</div>;
  }

  const currentReviewIndex = reviews.findIndex((review) => review.reviewId === Number(reviewId));
  if (currentReviewIndex === -1) {
    return <div className='text-center text-gray-500'>해당 리뷰를 찾을 수 없습니다.</div>;
  }

  const currentReview = reviews[currentReviewIndex];
  const currentReviewImages = [
    currentReview.reviewImgUrl1,
    currentReview.reviewImgUrl2,
    currentReview.reviewImgUrl3,
  ].filter(Boolean);

  const goToNextReview = () => {
    const nextIndex = (currentReviewIndex + 1) % reviews.length;
    navigate(`/profile/review/${reviews[nextIndex].reviewId}`, { state: { reviews } });
  };

  const goToPreviousReview = () => {
    const prevIndex = (currentReviewIndex - 1 + reviews.length) % reviews.length;
    navigate(`/profile/review/${reviews[prevIndex].reviewId}`, { state: { reviews } });
  };

  return (
    <div className='relative flex h-[calc(100vh-65px)] w-full flex-col bg-gray-900'>
      {/* 세로 방향 슬라이더 */}
      <Swiper
        direction='vertical'
        slidesPerView={1}
        onSlideNextTransitionStart={goToNextReview}
        onSlidePrevTransitionStart={goToPreviousReview}
        className='flex-1'
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.reviewId}>
            <div className='relative h-full w-full'>
              {/* 가로 방향 슬라이더 */}
              <Swiper direction='horizontal' spaceBetween={10} slidesPerView={1} className='h-full'>
                {currentReviewImages.map((imageUrl, index) => (
                  <SwiperSlide key={index}>
                    <div className='relative h-full w-full'>
                      <img
                        src={imageUrl}
                        alt={`review image ${index + 1}`}
                        className='absolute h-full w-full object-cover' // 높이 계산
                      />
                      {/* 리뷰 내용 */}
                      <div className='absolute bottom-0 left-0 right-0 h-[140px] bg-gradient-to-t from-black via-transparent to-transparent text-white'>
                        <div className='text-lg font-bold'>{review.reviewContents}</div>
                        <div>
                          <p className='text-sm'>Likes: {review.reviewLikeCnt}</p>
                          <p className='text-sm'>Stars: {review.reviewStar}</p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ReviewDetail;
