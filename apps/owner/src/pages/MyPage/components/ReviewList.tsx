import { LogoImage } from '@daeng-ggu/design-system';

interface IReviewItem {
  reviewId: number;
  reviewImgList: string[];
  designerId: number;
  designerImgUrl: string;
  designerAddress: string;
  nickname: string;
  reviewContents: string;
  reviewStar: number;
  reviewLikeCnt: number;
  feedExposure: boolean;
}
interface IReviewListProps {
  reviews: IReviewItem[];
  // eslint-disable-next-line no-unused-vars
  onReviewClick: (reviewId: number) => void;
}

const ReviewList = ({ reviews, onReviewClick }: IReviewListProps) => {
  console.log(reviews);
  return (
    <>
      {reviews.length > 0 ? (
        <div className='grid grid-cols-3 gap-4'>
          {reviews.map((review) => (
            <div key={review.reviewId} className='w-full'>
              <div className='relative' style={{ paddingTop: '100%' }} onClick={() => onReviewClick(review.reviewId)}>
                <img
                  src={review.reviewImgList[0]}
                  alt={`img-${review.reviewId}`}
                  className='absolute left-0 top-0 h-full w-full rounded-md object-cover hover:cursor-pointer'
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='flex w-full flex-col items-center gap-y-[2rem] pt-[3rem]'>
          <img src={LogoImage} className='w-1/5'></img>
          <p className='text-body3 text-gray-700'>작성한 리뷰가 없습니다</p>
        </div>
      )}
    </>
  );
};

export default ReviewList;
