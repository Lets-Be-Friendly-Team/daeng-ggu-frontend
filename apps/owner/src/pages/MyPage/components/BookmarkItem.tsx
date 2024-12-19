import { UserProfileImage } from '@daeng-ggu/design-system';
// import { extractKorean } from '@daeng-ggu/shared';

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
const BookmarkItem = ({ nickname, imageUrl, address, onClick }: IBookmarkItemProps) => {
  return (
    <div className='flex h-[80px] w-auto items-center gap-6 hover:cursor-pointer' onClick={onClick}>
      <UserProfileImage imageUrl={imageUrl} size='small' />
      <div className='flex w-3/4 flex-col gap-[0.3rem] break-keep'>
        <div className='text-body2 font-semibold text-gray-800'>{nickname}</div>
        <div className='text-body3 text-gray-600'>{address}</div>
        {/* 가능 견종 데이터 못가져옴 이슈 */}
        {/* <div className='text-body3 text-gray-300'>
          {breeds && breeds.length > 0
            ? breeds.map((breed) => extractKorean(breed.codeDesc || '')).join(', ')
            : '정보 없음'}
        </div> */}
      </div>
    </div>
  );
};

export default BookmarkItem;
