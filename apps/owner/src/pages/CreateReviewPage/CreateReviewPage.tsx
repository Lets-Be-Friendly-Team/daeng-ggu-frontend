import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router';
import { Header, ImageUploader, PageContainer, StarRating, TextArea, TypeOneButton } from '@daeng-ggu/design-system';
import { useToast } from '@daeng-ggu/shared';

import useMultipleImageUpload from '@/hooks/queries/ImageUpload/useMultipleImageUpload';
import usePostReview from '@/hooks/queries/Review/usePostReview';

const CreateReviewPage = () => {
  const [imgList, setImgList] = useState<File[]>([]);
  const [ratingState, setRatingState] = useState(0);
  const [reviewContent, setReviewContent] = useState('');
  const navigate = useNavigate();
  const { showToast } = useToast();

  const { mutateAsync: postReview } = usePostReview();
  const { mutateAsync: uploadImage } = useMultipleImageUpload();

  const handleRatingClick = (index: number) => {
    setRatingState(index);
  };

  const handleReviewContentChange = (ev: ChangeEvent<HTMLTextAreaElement>) => {
    setReviewContent(ev.target.value);
  };

  const handleSaveClick = async () => {
    if (ratingState === 0 || reviewContent.trim() === '' || imgList.length === 0) {
      alert('모든 필드를 채워주세요.');
      return;
    }

    try {
      const imageUrls = await uploadImage(imgList);
      console.log(imageUrls);
      const reviewData = {
        designerId: 2,
        reviewContents: reviewContent,
        reviewStar: ratingState,
        isFeedAdd: true,
        FeedImgList: imageUrls,
      };

      await postReview(reviewData);
      showToast({ message: '리뷰가 등록 되었습니다!', type: 'confirm' });
      navigate('/profile');
    } catch (error) {
      console.error(error);
      showToast({ message: '리뷰가 등록되지 않았습니다. 다시 시도해주세요!', type: 'error' });
    }
  };

  return (
    <>
      <PageContainer>
        <Header mode='close' title='리뷰 작성' />
        <ImageUploader mode='img' label='이미지' imgList={imgList} setImgList={setImgList} />
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
      <TypeOneButton text={'저장하기'} color='bg-secondary' onClick={handleSaveClick} />
    </>
  );
};

export default CreateReviewPage;
