import { TypeTwoButton, UserProfileImage } from '@daeng-ggu/design-system';

const Profile = () => {
  const handleClick = () => {};
  return (
    <div className='w-full'>
      <div className='flex'>
        <UserProfileImage size='large' />
        <div className='flex h-auto items-center px-3 text-sub_h2 text-black'>장군엄마</div>
      </div>
      <div className='flex w-full gap-4'>
        <TypeTwoButton text='예약 조회' color='bg-secondary' onClick={handleClick} />
        <TypeTwoButton text='프로필 조회' onClick={handleClick} />
      </div>
    </div>
  );
};
export default Profile;
