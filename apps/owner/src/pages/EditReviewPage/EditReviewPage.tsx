import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Header, ImageUploader, PageContainer, StarRating, TextArea, TypeOneButton } from '@daeng-ggu/design-system';
import { useToast } from '@daeng-ggu/shared';

import useMultipleImageUpload from '@/hooks/queries/ImageUpload/useMultipleImageUpload';
import useGetReviewDetail from '@/hooks/queries/Review/useGetReviewDetail';
import usePatchReview from '@/hooks/queries/Review/usePatchReview';

const EditReviewPage = () => {
  const params = useParams<{ reviewId: string }>();
  const reviewIdStr = params.reviewId;
  const reviewId = reviewIdStr ? Number(reviewIdStr) : null;
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [imgList, setImgList] = useState<string[]>([]);
  const [newNewImgList, setNewImgList] = useState<File[]>([]);
  const [ratingState, setRatingState] = useState(0);
  const [reviewContent, setReviewContent] = useState('');
  const { data: review, isPending } = useGetReviewDetail(Number(reviewId));
  const { mutateAsync: patchReview } = usePatchReview();
  const { mutateAsync: uploadImage } = useMultipleImageUpload();

  useEffect(() => {
    if (review?.data.reviewImgList) {
      setImgList(review.data.reviewImgList);
      setRatingState(review.data.reviewStar || 0);
      setReviewContent(review.data.reviewContents || '');
    }
  }, [review]);

  const handleRatingClick = (index: number) => {
    setRatingState(index);
  };
  const handleReviewContentChange = (ev: ChangeEvent<HTMLTextAreaElement>) => {
    setReviewContent(ev.target.value);
  };
  if (isPending) {
    return <div>로딩 중...</div>;
  }
  const handleSaveClick = async () => {
    try {
      const imageUrls = newNewImgList.length > 0 ? await uploadImage(newNewImgList) : [];

      const reviewData = {
        reviewId: reviewId || 0,
        reviewContents: reviewContent,
        reviewStar: ratingState,
        isFeedAdd: true,
        existImgList: imgList,
        FeedImgList: imageUrls,
      };

      await patchReview(reviewData);
      showToast({ message: '리뷰가 수정 되었습니다!', type: 'confirm' });
      navigate('/profile');
    } catch (error) {
      showToast({ message: '리뷰가 수정되지 않았습니다. 다시 시도해주세요!', type: 'error' });
      console.error(error);
    }
  };

  return (
    <>
      <PageContainer>
        <Header mode='close' title='리뷰 작성' />
        <ImageUploader
          mode='img'
          label='이미지'
          initialImgList={imgList}
          setInitialImgList={setImgList}
          imgList={newNewImgList}
          setImgList={setNewImgList}
        />
        <StarRating className='mt-[4rem]' maxStars={5} ratingState={ratingState} setRatingState={handleRatingClick} />
        <TextArea
          className='mt-[4rem] font-pretendard text-[1.4rem] font-semibold text-gray-900'
          height='12rem'
          value={reviewContent}
          onChange={handleReviewContentChange}
          label='내용'
          placeholder='미용은 어떠셨나요? 다른 분들에게 도움이 되도록 리뷰를 작성하고 피드도 꾸며보세요!'
        />
      </PageContainer>
      <TypeOneButton text='저장하기' color='bg-secondary' onClick={handleSaveClick} />
    </>
  );
};
export default EditReviewPage;
