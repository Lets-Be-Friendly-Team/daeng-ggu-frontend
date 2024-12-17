import { LogoImage, TypeTwoButton } from '@daeng-ggu/design-system';

const ProgressStep1 = ({ status }: { status: string }) => {
  return (
    <section className='mt-[12rem] flex h-[100vh] flex-col items-center'>
      <img className='mb-[4rem] w-[16rem]' src={LogoImage} alt='logo' />
      <h1 className='text-h2 font-semibold'>강아지가 오고 있어요!</h1>
      <span className='mt-10 text-sub_h3'>조금만 기다려주세요!</span>
      <div className='mt-10 flex gap-4'>
        <TypeTwoButton className='px-[2rem]' text='댕꾸에게 문의' color='bg-secondary' onClick={() => {}} />
        <TypeTwoButton
          className='px-[2rem]'
          disabled={status ? true : false}
          text={'미용 시작'}
          color='bg-secondary'
          onClick={() => {}}
        />
      </div>
    </section>
  );
};

export default ProgressStep1;
