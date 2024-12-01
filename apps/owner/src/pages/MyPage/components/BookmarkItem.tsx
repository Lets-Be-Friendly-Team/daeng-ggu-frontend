import { UserProfileImage } from '@daeng-ggu/design-system';

interface IBookmarkItemProps {
  nickname: string;
  imageUrl: string;
  address: string;
  breeds: string[];
}
const BookmarkItem = ({ nickname, imageUrl, address, breeds }: IBookmarkItemProps) => {
  return (
    <div className='flex h-[80px] w-auto items-center gap-6'>
      <UserProfileImage imageUrl={imageUrl} size='small' />
      <div className='w-auto'>
        <div className='text-body2 text-primary'>{nickname}</div>
        <div className='text-body3 text-gray-600'>{address}</div>
        <div className='text-body3 text-gray-300'>{breeds.join(' | ')}</div>
      </div>
    </div>
  );
};

export default BookmarkItem;
