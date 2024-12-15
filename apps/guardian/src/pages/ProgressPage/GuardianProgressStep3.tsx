import { useNavigate } from 'react-router';
import { LogoImage, TypeTwoButton } from '@daeng-ggu/design-system';

const GuardianProgressStep3 = () => {
  const navigate = useNavigate();
  return (
    <section className='mt-[12rem] flex h-[100vh] flex-col items-center'>
      <img className='mb-[4rem] w-[16rem]' src={LogoImage} alt='logo' />
      <h1 className='text-h2 font-semibold'>강아지가 미용중이에요!</h1>
      <span className='mt-10 text-sub_h3'>미용이 완료되면 화면이 이동됩니다.</span>
      <div className='mt-10 flex gap-4'>
        <TypeTwoButton className='px-[2rem]' text='댕꾸에게 문의' color='bg-secondary' onClick={() => {}} />
        <TypeTwoButton
          className='px-[2rem]'
          text='홈으로 가기'
          color='bg-primary'
          onClick={() => {
            navigate('/', { replace: true });
          }}
        />
      </div>
    </section>
  );
};

export default GuardianProgressStep3;
