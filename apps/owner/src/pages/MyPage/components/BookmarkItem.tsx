import { UserProfileImage } from '@daeng-ggu/design-system';

interface IBookmarkItemProps {
  nickname: string;
  imageUrl: string;
  address: string;
  breeds: string[];
  onClick?: () => void;
}
const BookmarkItem = ({ nickname, imageUrl, address, breeds, onClick }: IBookmarkItemProps) => {
  return (
    <div className='flex h-[80px] w-auto items-center gap-6 hover:cursor-pointer' onClick={onClick}>
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
// 주소 두개 합쳐져서 나옴
// possiblebreed 설명 추가
// 닉네임 빠져있음
