import { ChangeEvent, useEffect, useState } from 'react';
import { Header, ImageUploader, PageContainer, StarRating, TextArea, TypeOneButton } from '@daeng-ggu/design-system';

import useGetReviewDetail from '@/hooks/queries/Review/useGetReviewDetail';

const EditReviewPage = () => {
  const reviewId = 5;
  const [imgList, setImgList] = useState<string[]>([]);
  const [ratingState, setRatingState] = useState(0);
  const [reviewContent, setReviewContent] = useState('');
  const { data: review, isPending } = useGetReviewDetail(reviewId);

  useEffect(() => {
    if (review?.data) {
      // 리뷰 데이터가 로드되었을 때 상태 초기화
      const initialImageUrls = [review.data.reviewImgUrl1, review.data.reviewImgUrl2].filter(Boolean) as string[];
      setImgList(initialImageUrls); // 이미지 리스트 설정
      setRatingState(review.data.reviewStar || 0); // 별점 초기화
      setReviewContent(review.data.reviewContents || ''); // 리뷰 내용 초기화
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

  return (
    <>
      <PageContainer>
        <Header mode='close' title='리뷰 작성' />
        <ImageUploader mode='img' label='이미지' initialImgList={imgList} setImgList={setImgList} />
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
      <TypeOneButton text='저장하기' color='bg-secondary' onClick={() => {}} />
    </>
  );
};

export default EditReviewPage;
