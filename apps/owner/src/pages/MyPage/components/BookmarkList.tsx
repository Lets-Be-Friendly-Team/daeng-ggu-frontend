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
  return (
    <div className='py-4'>
      {bookmarkList.map((designer) => (
        <BookmarkItem
          key={designer.designerId}
          nickname={designer.nickname}
          imageUrl={designer.designerImgUrl}
          address={designer.designerAddress}
          breeds={designer.possibleBreed}
        />
      ))}
    </div>
  );
};

export default LikedList;
