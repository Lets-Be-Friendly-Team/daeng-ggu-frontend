import { useEffect } from 'react';
import { useNavigate, useRouteError } from 'react-router';
import { LogoImage, TypeTwoButton } from '@daeng-ggu/design-system';

import HTTPError from '../../apis/HTTPError';

interface RouterErrorFallbackProps {
  href?: string;
}

const RouterErrorFallback = ({ href }: RouterErrorFallbackProps) => {
  const navigate = useNavigate();
  const error = useRouteError(); // 라우트에서 발생한 에러를 가져옴

  useEffect(() => {
    console.log('error', error);
    if (error instanceof HTTPError && error.statusCode === 401 && href === 'designer/') {
      window.location.href = import.meta.env.VITE_OWNER_MAIN_URL + '/login';
      return;
    }
    if (error instanceof HTTPError && error.statusCode === 401) {
      navigate('/login');
      return;
    }
  }, [error, navigate]);

  if (error instanceof HTTPError && error.statusCode === 401) {
    return null;
  }

  const goMain = () => {
    window.location.href = `/${href || ''}`;
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <section className='flex h-[80vh] w-full flex-col items-center justify-center gap-[2rem] font-pretendard'>
      <img className='mb-[2rem] h-[10rem]' alt='logo' src={LogoImage} />
      <h1 className='text-h1 font-bold'>데이터를 가져오는데 실패했어요!</h1>
      <span className=' text-sub_h1'>다시 접속해주세요!</span>
      <div className='flex gap-[1rem]'>
        <TypeTwoButton className='w-[12rem]' color='bg-primary' onClick={goMain} text='홈으로 가기' />
        <TypeTwoButton className='w-[12rem]' color='bg-secondary' onClick={handleGoBack} text='이전으로' />
      </div>
    </section>
  );
};

export default RouterErrorFallback;
