interface IReviewItem {
  reviewId: number;
  reviewImgUrl1: string;
  reviewImgUrl2: string | null;
  reviewImgUrl3: string | null;
}
interface IReviewListProps {
  reviews: IReviewItem[];
}

const ReviewList = ({ reviews }: IReviewListProps) => {
  return (
    <div className='grid grid-cols-3 gap-4'>
      {reviews.map((review) => (
        <div key={review.reviewId} className='w-full'>
          <div className='relative' style={{ paddingTop: '100%' }}>
            <img
              src={review.reviewImgUrl1}
              alt={`img-${review.reviewId}`}
              className='absolute left-0 top-0 h-full w-full rounded-md object-cover'
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
