import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import {
  BottomSheetModal,
  CloseIcon,
  DeleteIcon,
  EditIcon,
  FilledHeartIcon,
  FullStarIcon,
  LockIcon,
  Modal,
  MoreIcon,
  UserProfileImage,
} from '@daeng-ggu/design-system';
import { useModalStore, useToast } from '@daeng-ggu/shared';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import useDeleteReview from '@/hooks/queries/Review/useDeleteReview';

import './swiperStyle.css';

export interface IReviewItem {
  reviewId: number;
  reviewImgList: string[];
  designerId: number;
  designerImgUrl: string | undefined;
  designerAddress: string;
  designerName: string;
  reviewContents: string;
  reviewLikeCnt: number;
  reviewStar: number;
  feedExposure: boolean;
  isReviewLike: boolean;
}

const ReviewDetail = () => {
  const [expandedReviews, setExpandedReviews] = useState<{ [key: number]: boolean }>({});
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const { show } = useModalStore();
  const { state } = useLocation();
  const { reviewId } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const reviews: IReviewItem[] = state?.reviews || [];

  const currentReviewIndex = reviews.findIndex((review) => review.reviewId === Number(reviewId));

  const [activeIndex, setActiveIndex] = useState(currentReviewIndex);

  const { mutate: deleteReview } = useDeleteReview();

  const navigateBack = () => {
    navigate('/profile');
  };
  const navigateEditPage = () => {
    navigate(`/review/edit/${reviewId}`);
  };
  const handleEdit = () => {
    setModalOpen(false);
    navigateEditPage();
  };

  const handleDelete = () => {
    setModalOpen(false);
    showDeleteConfirmationModal();
  };

  const modalOptions = [
    { label: '수정하기', onClick: handleEdit, icon: <EditIcon className='h-[15px] w-[15px]' color='#454C53' /> },
    {
      label: '삭제하기',
      onClick: handleDelete,
      color: 'text-primary',
      icon: <DeleteIcon className='h-[15px] w-[15px]' color='#FF6842' />,
    },
  ];
  const toggleModal = () => {
    setModalOpen((prev) => !prev);
  };

  const showDeleteConfirmationModal = () => {
    show(Modal, {
      title: '리뷰 삭제',
      description: '해당 리뷰를 삭제하시겠습니까?',
      onConfirm: () => {
        deleteReview(
          { reviewId: Number(reviewId) },
          {
            onSuccess: () => {
              showToast({ message: '리뷰가 삭제 되었습니다!', type: 'confirm' });
              navigateBack();
            },
            onError: () => {
              showToast({ message: '리뷰가 삭제되지 않았습니다. 다시 시도해주세요!', type: 'error' });
            },
          },
        );
      },
      onClose: () => close(),
      confirmText: '네',
      cancelText: '아니오',
    });
  };

  return (
    <div className='relative flex h-[calc(100vh-65px)] w-full flex-col'>
      {/* Fixed Profile and Icons */}
      <div className='absolute left-0 right-0 top-0 z-10 flex h-[100px] items-center gap-[10px] bg-gradient-to-b from-black px-5'>
        {/* <div className='hover:cursor-pointer' onClick={() => console.log(reviews[activeIndex])}> */}
        <div className='flex-shrink-0'>
          <UserProfileImage imageUrl={reviews[activeIndex]?.designerImgUrl} />
        </div>
        <div className='flex w-full justify-between'>
          <div className='flex flex-col'>
            <div className='text-sub_h2 text-secondary'>{reviews[activeIndex]?.designerName}</div>
            <div className='text-caption text-secondary'>{reviews[activeIndex]?.designerAddress}</div>
          </div>
          <div className='flex items-center gap-[18px]'>
            {reviews[activeIndex]?.feedExposure ? null : <LockIcon className='h-[20px] w-[20px]' color='#F2F4F5' />}
            <button onClick={navigateBack}>
              <CloseIcon className='h-[20px] w-[20px] stroke-white' />
            </button>
          </div>
        </div>
        {/* </div> */}
      </div>
      {/* 고정된 리뷰 내용 */}
      <div className='absolute bottom-0 left-0 right-0 z-10 flex h-[25%] items-start justify-between bg-gradient-to-t from-black px-5'>
        <div className='overflow-hidden pt-12 text-body2 leading-8 text-secondary'>
          {reviews[currentReviewIndex]?.reviewContents ? (
            expandedReviews[currentReviewIndex] ? (
              reviews[currentReviewIndex].reviewContents
            ) : (
              <>
                {reviews[currentReviewIndex].reviewContents.slice(0, 50)}
                {reviews[currentReviewIndex].reviewContents.length > 50 && (
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
            )
          ) : (
            <div>리뷰 내용이 없습니다.</div> // 리뷰 내용이 없는 경우 처리
          )}
        </div>

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
            <div>
              <button className='pt-[5px]' onClick={toggleModal}>
                <MoreIcon className='h-[30px] w-[30px]' color='#F2F4F5' />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Vertical Swiper */}
      <BottomSheetModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} options={modalOptions} />
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
              spaceBetween={1}
              modules={[Pagination]}
              preventClicksPropagation={true}
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
