import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import {
  CloseIcon,
  EmptyHeartIcon,
  FilledHeartIcon,
  LockIcon,
  MoreIcon,
  StarFullIcon,
  UserProfileImage,
} from '@daeng-ggu/design-system';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import EditDeleteModal from './components/EditDeleteModal';

import './swiperStyle.css';

interface IReviewItem {
  reviewId: number;
  reviewImgUrl1: string | null | undefined;
  reviewImgUrl2: string | null | undefined;
  reviewImgUrl3: string | null | undefined;
  designerId: number;
  designerImgUrl: string | undefined;
  designerAddress: string;
  nickname: string;
  reviewContents: string;
  reviewLikeCnt: number;
  reviewStar: number;
  feedExposure: boolean;
}

const ReviewDetail = () => {
  const [expandedReviews, setExpandedReviews] = useState<{ [key: number]: boolean }>({});
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const { state } = useLocation();
  const { reviewId } = useParams();
  const navigate = useNavigate();

  const reviews: IReviewItem[] = state?.reviews || [];

  const currentReviewIndex = reviews.findIndex((review) => review.reviewId === Number(reviewId));

  const [activeIndex, setActiveIndex] = useState(currentReviewIndex);

  const navigateBack = () => {
    navigate('/profile');
  };

  const toggleModal = () => {
    setModalOpen((prev) => !prev);
  };

  return (
    <div className='relative flex h-[calc(100vh-65px)] w-full flex-col bg-gray-900'>
      {/* Fixed Profile and Icons */}
      <div className='absolute left-0 right-0 top-0 z-10 flex h-[100px] items-center gap-[10px] bg-gradient-to-b from-black to-transparent px-5'>
        <div className='flex-shrink-0'>
          <UserProfileImage imageUrl={reviews[activeIndex]?.designerImgUrl} />
        </div>
        <div className='flex w-full justify-between'>
          <div className='flex flex-col'>
            <div className='text-sub_h2 text-secondary'>{reviews[activeIndex]?.nickname}</div>
            <div className='text-caption text-secondary'>{reviews[activeIndex]?.designerAddress}</div>
          </div>
          <div className='flex items-center gap-[18px]'>
            {reviews[activeIndex]?.feedExposure ? null : <LockIcon className='h-[20px] w-[20px]' color='#F2F4F5' />}
            <button onClick={navigateBack}>
              <CloseIcon className='h-[20px] w-[20px]' color='#F2F4F5' />
            </button>
          </div>
        </div>
      </div>

      {/* 고정된 리뷰 내용 */}
      <div className='absolute bottom-0 left-0 right-0 z-10 flex h-[360px] items-end gap-[18px] bg-gradient-to-t from-black via-transparent to-transparent px-5 pb-8'>
        <div className='flex-1 pb-20 text-body2 text-secondary'>
          {expandedReviews[currentReviewIndex] ? (
            reviews[currentReviewIndex]?.reviewContents // 현재 리뷰 내용
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

        <div className='flex flex-col gap-[10px]'>
          {isModalOpen && <EditDeleteModal />}
          <div className='flex flex-col items-center'>
            <button className='pb-[10px]' onClick={toggleModal}>
              <MoreIcon className='h-[30px] w-[30px]' color='#F2F4F5' />
            </button>

            <button>
              <StarFullIcon className='h-[30px] w-[30px]' />
            </button>
            <div className='text-body3 text-gray-50'>{reviews[activeIndex]?.reviewStar}</div>
          </div>
          <div className='flex flex-col items-center'>
            <button onClick={() => setIsLiked((prev) => !prev)}>
              {isLiked ? (
                <FilledHeartIcon className='h-[30px] w-[30px]' color='#FF6842' />
              ) : (
                <EmptyHeartIcon className='h-[30px] w-[30px]' color='#F2F4F5' />
              )}
            </button>
            <div className='text-body3 text-gray-50'>{reviews[activeIndex]?.reviewLikeCnt}</div>
          </div>
        </div>
      </div>

      {/* Vertical Swiper */}
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
        preventClicksPropagation={true}
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.reviewId}>
            {/* Horizontal Swiper */}
            <Swiper
              direction='horizontal'
              slidesPerView={1}
              pagination={{ clickable: true }}
              modules={[Pagination]}
              preventClicksPropagation={true}
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

export default ReviewDetail;
