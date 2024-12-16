import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { LogoImage, TypeTwoButton } from '@daeng-ggu/design-system';

const GuardianProgressStep3and4and5 = ({ statusNum }: { statusNum: number }) => {
  const navigate = useNavigate();
  const handleButtonText = useMemo(() => {
    if (statusNum === 5) {
      return '보호자에게 출발';
    }
  }, [statusNum]);

  const handleButtonOnClick = () => {
    if (statusNum === 5) {
      //api 추가
      return;
    }
    navigate('/', { replace: true });
  };
  return (
    <section className='mt-[12rem] flex h-[100vh] flex-col items-center'>
      <img className='mb-[4rem] w-[16rem]' src={LogoImage} alt='logo' />
      <h1 className='text-h2 font-semibold'>단계가 완료되면 화면이 이동됩니다.</h1>
      <div className='mt-10 flex gap-4'>
        <TypeTwoButton className='px-[2rem]' text='댕꾸에게 문의' color='bg-secondary' onClick={() => {}} />
        <TypeTwoButton className='px-[2rem]' text={handleButtonText} color='bg-primary' onClick={handleButtonOnClick} />
      </div>
    </section>
  );
};

export default GuardianProgressStep3and4and5;
