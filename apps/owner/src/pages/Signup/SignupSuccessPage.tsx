import { useLocation, useNavigate } from 'react-router';
import { Header, LogoImage, PageContainer, RightIcon, TypeTwoButton } from '@daeng-ggu/design-system';
// import getLogin from '@/apis/login/getLogin';
// import { useEffect } from 'react';

const SignupSuccessPage = () => {
  const { state } = useLocation();
  const nickname = state?.nickname || '보호자';
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/profile/pet/add');
  };
  return (
    <PageContainer>
      {/* <div className='relative h-[100vh]'> */}
      <Header mode='main' />
      <div className='mb-[4rem] mt-[10rem] px-4'>
        <img src={LogoImage} className='w-1/4' alt='댕꾸로고' />
        <h1 className='mt-[2rem] text-h1 font-bold'>
          <p>{nickname}님,</p>
          <p className='mt-[0.4rem]'>반가워요!</p>
        </h1>
        <div className='mt-[4rem] text-body2 text-gray-500'>
          <p>
            <span className='text-primary'>반려견을 등록</span>하고
          </p>
          <p className='mt-[0.4rem]'>맞춤 견적서를 받아보세요</p>
        </div>
      </div>

      <div className='w-full'>
        <TypeTwoButton
          color='bg-primary'
          text={
            <div className='flex w-full items-center justify-center gap-x-[1rem]'>
              <p>반려견 등록</p>
              <RightIcon size='w-[1.4rem]' color='fill-white' />
            </div>
          }
          onClick={handleClick}
        />
      </div>
    </PageContainer>
  );
};
export default SignupSuccessPage;
