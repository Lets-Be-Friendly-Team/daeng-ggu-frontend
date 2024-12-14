interface IReviewItem {
  designerAddress: string;
  designerId: number;
  designerImgUrl: string | undefined;
  nickname: string;
  reviewId: number;
  reviewImgUrl1?: string;
  reviewImgUrl2?: string;
  reviewImgUrl3?: string;
  reviewContents: string;
  reviewLikeCnt: number;
  reviewStar: number;
  feedExposure: boolean;
}
interface IReviewListProps {
  reviews: IReviewItem[];
  // eslint-disable-next-line no-unused-vars
  onReviewClick: (reviewId: number) => void;
}

const ReviewList = ({ reviews, onReviewClick }: IReviewListProps) => {
  return (
    <div className='grid grid-cols-3 gap-4'>
      {reviews.map((review) => (
        <div key={review.reviewId} className='w-full'>
          <div className='relative' style={{ paddingTop: '100%' }} onClick={() => onReviewClick(review.reviewId)}>
            <img
              src={review.reviewImgUrl1 || undefined}
              alt={`img-${review.reviewId}`}
              className='absolute left-0 top-0 h-full w-full rounded-md object-cover hover:cursor-pointer'
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
