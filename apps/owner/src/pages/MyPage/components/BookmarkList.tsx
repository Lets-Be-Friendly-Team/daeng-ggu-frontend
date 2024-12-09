import { useNavigate } from 'react-router';

import BookmarkItem from './BookmarkItem';

interface IDesignerItem {
  designerId: number;
  nickname: string;
  designerImgUrl: string;
  designerAddress: string;
  possibleBreed: string[];
}

interface IDesignerListProps {
  bookmarkList: IDesignerItem[];
}

const LikedList = ({ bookmarkList }: IDesignerListProps) => {
  const navigate = useNavigate();
  const navigateDesignerProfile = (designerId: number) => {
    navigate(`/profile/${designerId}`);
  };
  return (
    <div className='py-4'>
      {bookmarkList.map((designer) => (
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
  );
};

export default LikedList;
