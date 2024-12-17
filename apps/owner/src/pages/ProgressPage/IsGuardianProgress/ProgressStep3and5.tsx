import { LogoImage, TypeTwoButton } from '@daeng-ggu/design-system';

const ProgressStep3and5 = () => {
  const handleDaenggguButton = async () => {};
  return (
    <section className='mt-[12rem] flex h-[100vh] flex-col items-center'>
      <img className='mb-[4rem] w-[16rem]' src={LogoImage} alt='logo' />
      <h1 className='text-h2 font-semibold'>단계가 완료되면 화면이 이동됩니다.</h1>
      <div className='mt-10 flex gap-4'>
        <TypeTwoButton className='px-[2rem]' text='댕꾸에게 문의' color='bg-secondary' onClick={handleDaenggguButton} />
      </div>
    </section>
  );
};

export default ProgressStep3and5;
