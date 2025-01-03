import { useNavigate } from 'react-router';
import { LogoImage, TypeTwoButton } from '@daeng-ggu/design-system';

const ProgressStep3 = () => {
  const navigate = useNavigate();
  return (
    <section className='mt-[12rem] flex h-[100vh] flex-col items-center'>
      <img className='mb-[4rem] w-[16rem]' src={LogoImage} alt='logo' />
      <h1 className='text-h2 font-semibold'>미용이 종료되었습니다.</h1>
      <span className='mt-10 text-sub_h3'>강아지를 픽업하러 가고 있어요!</span>
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

export default ProgressStep3;
