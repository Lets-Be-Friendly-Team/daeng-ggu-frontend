import { useLocation, useNavigate } from 'react-router';
import { Header, LogoImage, PageContainer, RightIcon, TypeTwoButton } from '@daeng-ggu/design-system';

const SignupSuccessPage = () => {
  const { state } = useLocation();
  const nickname = state?.nickname || '디자이너';
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/register/profile');
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
          <p>더 많은 고객들이 디자이너님을 찾을 수 있도록</p>
          <p className='mt-[0.4rem]'>
            <span className='text-primary'>프로필을 완성</span>해주세요
          </p>
        </div>
      </div>

      <div className='w-full'>
        <TypeTwoButton
          color='bg-primary'
          text={
            <div className='flex gap-x-[1rem] items-center w-full justify-center'>
              <p>프로필 작성</p>
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
