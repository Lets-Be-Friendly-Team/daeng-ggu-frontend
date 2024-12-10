import { ChangeEvent, useState } from 'react';
import { Header, ImageUploader, PageContainer, StarRating, TextArea, TypeOneButton } from '@daeng-ggu/design-system';

const CreateReviewPage = () => {
  const [imgList, setImgList] = useState<File[]>([]);
  const [ratingState, setRatingState] = useState(0);
  const [reviewContent, setReviewContent] = useState('');
  const handleRatingClick = (index: number) => {
    setRatingState(index);
  };
  const handleReviewContentChange = (ev: ChangeEvent<HTMLTextAreaElement>) => {
    setReviewContent(ev.target.value);
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
      <TypeOneButton text='저장하기' color='bg-secondary' onClick={() => {}} />
    </>
  );
};

export default CreateReviewPage;
