import { TypeTwoButton, UserProfileImage } from '@daeng-ggu/design-system';

interface IProfileProps {
  nickname: string;
  customerImgUrl: string;
  customerImgName: string;
}
const Profile = ({ nickname, customerImgUrl }: IProfileProps) => {
  const handleClick = () => {};
  return (
    <div className='w-full'>
      <div className='flex gap-6'>
        <UserProfileImage size='large' imageUrl={customerImgUrl} />
        <div className='flex h-auto items-center px-3 text-sub_h2 text-black'>{nickname}</div>
      </div>
      <div className='flex w-full gap-4'>
        <TypeTwoButton text='예약 조회' color='bg-secondary' onClick={handleClick} />
        <TypeTwoButton text='프로필 수정' onClick={handleClick} />
      </div>
    </div>
  );
};
export default Profile;
