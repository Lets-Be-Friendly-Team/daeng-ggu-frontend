import { useNavigate } from 'react-router';
import { LogoImage } from '@daeng-ggu/design-system';

import BookmarkItem from './BookmarkItem';

interface IBreed {
  breedCode: string;
  codeDesc: string;
}
interface IDesignerItem {
  designerId: number;
  nickname: string;
  designerImgUrl: string;
  designerAddress: string;
  possibleBreed?: IBreed[];
}

interface IDesignerListProps {
  bookmarkList: IDesignerItem[];
}

const BookmarkList = ({ bookmarkList = [] }: IDesignerListProps) => {
  const navigate = useNavigate();
  const navigateDesignerProfile = (designerId: number) => {
    navigate(`/profile/designer/${designerId}`);
  };

  return (
    <>
      {bookmarkList.length > 0 ? (
        <div className='py-4'>
          {bookmarkList?.map((designer) => (
            <BookmarkItem
              key={designer.designerId}
              nickname={designer.nickname}
              imageUrl={designer.designerImgUrl}
              address={designer.designerAddress}
              breeds={designer.possibleBreed}
              onClick={() => navigateDesignerProfile(designer.designerId)}
            />
          ))}
        </div>
      ) : (
        <div className='flex w-full flex-col items-center gap-y-[2rem] pt-[3rem]'>
          <img src={LogoImage} className='w-1/5'></img>
          <p className='text-body3 text-gray-700'>찜한 디자이너가 없습니다</p>
        </div>
      )}
    </>
  );
};

export default BookmarkList;
