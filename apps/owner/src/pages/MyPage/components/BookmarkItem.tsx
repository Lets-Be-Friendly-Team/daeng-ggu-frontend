import { UserProfileImage } from '@daeng-ggu/design-system';

interface IBreed {
  breedCode: string;
  codeDesc: string;
}
interface IBookmarkItemProps {
  nickname: string;
  imageUrl: string;
  address: string;
  breeds?: IBreed[];
  onClick?: () => void;
}
const BookmarkItem = ({ nickname, imageUrl, address, breeds, onClick }: IBookmarkItemProps) => {
  console.log(breeds);
  const extractKorean = (text: string) => {
    const match = text.match(/^[가-힣\s]+/);
    return match ? match[0].trim() : '';
  };

  return (
    <div className='flex h-[80px] w-auto items-center gap-6 hover:cursor-pointer' onClick={onClick}>
      <UserProfileImage imageUrl={imageUrl} size='small' />
      <div className='w-auto'>
        <div className='text-body2 text-primary'>{nickname}</div>
        <div className='text-body3 text-gray-600'>{address}</div>
        <div className='text-body3 text-gray-300'>
          {breeds && breeds.length > 0
            ? breeds.map((breed) => extractKorean(breed.codeDesc || '')).join(', ')
            : '정보 없음'}
        </div>
      </div>
    </div>
  );
};

export default BookmarkItem;
