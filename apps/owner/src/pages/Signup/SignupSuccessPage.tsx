import { useLocation, useNavigate } from 'react-router';
import { Header, LogoImage, PageContainer, RightIcon, TypeTwoButton } from '@daeng-ggu/design-system';
// import getLogin from '@/apis/login/getLogin';
// import { useEffect } from 'react';

const SignupSuccessPage = () => {
  const { state } = useLocation();
  const nickname = state?.nickname || '보호자';
  const navigate = useNavigate();
  // const login = async () => {
  //   const data = await getLogin({ userType: 'C' });
  //   // window.location.href = `/${data.data}`;
  //   window.location.href = data.data;
  // };

  // useEffect(() => {
  //   login();
  // }, []);

  // const { data, error } = useGetUserInfo();
  // const { setOwnerId } = useOwnerIdStore();
  // useEffect(() => {
  //   if (data?.status === 'SUCCESS') {
  //     const userInfo = data.data;
  //     if (userInfo.userType === 'C') {
  //       //보호자일 경우
  //       console.log(data);
  //       //가입 되어있는 유저면 로컬스토리지에 토큰 및 id 저장(로그인 처리)
  //       if (data.data.joinYn === 'Y') {
  //         localStorage.setItem('T', userInfo.refreshToken);
  //         setOwnerId(userInfo.id);
  //       } else {
  //         console.log('미가입 유저입니다.');
  //       }
  //     }
  //   }
  // }, [data, setOwnerId]);
  // if (error) return <p>Error: {error.message}</p>;

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
