import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Header, ImageUploader, PageContainer, StarRating, TextArea, TypeOneButton } from '@daeng-ggu/design-system';

import useMultipleImageUpload from '@/hooks/queries/ImageUpload/useMultipleImageUpload';
import useGetReviewDetail from '@/hooks/queries/Review/useGetReviewDetail';
import usePatchReview from '@/hooks/queries/Review/usePatchReview';

const EditReviewPage = () => {
  const params = useParams<{ reviewId: string }>();
  const reviewIdStr = params.reviewId;
  const reviewId = reviewIdStr ? Number(reviewIdStr) : null;
  const navigate = useNavigate();

  const [imgList, setImgList] = useState<string[]>([]);
  const [newNewImgList, setNewImgList] = useState<File[]>([]);
  const [ratingState, setRatingState] = useState(0);
  const [reviewContent, setReviewContent] = useState('');
  const { data: review, isPending } = useGetReviewDetail(Number(reviewId));
  const { mutateAsync: postReview } = usePatchReview();
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
    if (ratingState === 0 || reviewContent.trim() === '' || newNewImgList.length === 0) {
      alert('모든 필드를 채워주세요.');
      return;
    }

    try {
      const imageUrls = await uploadImage(newNewImgList);
      console.log(imageUrls);
      const reviewData = {
        designerId: 2,
        reviewContents: reviewContent,
        reviewStar: ratingState,
        isFeedAdd: true,
        existImgList: imgList,
        FeedImgList: imageUrls,
      };

      await postReview(reviewData);
      alert('리뷰가 성공적으로 수정되었습니다.');
      navigate('/profile');
    } catch (error) {
      console.error(error);
      alert('리뷰 수정에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <>
      <PageContainer>
        <Header mode='close' title='리뷰 작성' />
        <ImageUploader mode='img' label='이미지' initialImgList={imgList} setImgList={setNewImgList} />
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
