import { LogoImage, TypeTwoButton } from '@daeng-ggu/design-system';

const GuardianProgressStep1 = () => {
  return (
    <div>
      <img className='mb-[4rem] w-[16rem]' src={LogoImage} alt='logo' />
      <h1 className='text-h2 font-semibold'></h1>
      <span className='mt-10 text-sub_h3'>서비스가 마음에 드셨다면 리뷰 작성을 부탁드려요!</span>
      <div className='mt-10 flex gap-4'></div>
      <TypeTwoButton className='px-[2rem]' text='출발' color='bg-primary' onClick={() => {}} />
    </div>
  );
};

export default GuardianProgressStep1;
