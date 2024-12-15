import { LogoImage, TypeTwoButton } from '@daeng-ggu/design-system';

interface RouterErrorFallbackProps {
  href?: string;
}

const RouterErrorFallback = ({ href }: RouterErrorFallbackProps) => {
  const goMain = () => {
    window.location.href = `/${href || ''}`;
  };
  return (
    <section className='flex h-[80vh] w-full flex-col items-center justify-center gap-[2rem] font-pretendard'>
      <img className='mb-[2rem] h-[10rem]' alt='logo' src={LogoImage} />
      <h1 className='text-h1 font-bold'>에러가 발생했어요!</h1>
      <span className=' text-sub_h1'>다시 접속해주세요!</span>
      <TypeTwoButton className='w-[40rem]' color='bg-primary' onClick={goMain} text='홈으로 가기' />
    </section>
  );
};

export default RouterErrorFallback;
