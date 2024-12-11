import { Header, LogoImage, PageContainer, TypeTwoButton } from '@daeng-ggu/design-system';
import infinite from '@daeng-ggu/designer/src/assets/images/infinite.png';
const MembershipPage = () => {
  return (
    <PageContainer>
      <Header mode='back' title='멤버십 결제' />
      <div className='mt-[10rem]'>
        <div className='flex justify-between items-center'>
          <h1 className='text-sub_h2 leading-[3rem] font-semibold'>
            <p>디자이너로 등록하고</p>
            <p>새로운 고객들을 만나보세요!</p>
          </h1>
          <div className='w-1/4 aspect-auto '>
            <img src={LogoImage} className='w-full h-full' alt='댕꾸로고' />
          </div>
        </div>
        <p className='flex flex-wrap gap-x-[0.4rem] mt-[1.2rem] text-iconCaption text-gray-700 leading-6'>
          <p>프리미엄 서비스(스파/풀케어/스트리밍) 중</p>
          <p>하나 이상 제공 필수</p>
        </p>
        <div className='relative border border-primary py-[5rem] px-[3rem] rounded-md mt-[5rem]'>
          <div className='w-1/5 aspect-auto absolute top-[-2rem] left-[2.4rem] '>
            <img src={infinite} alt='' />
          </div>
          <div className='flex justify-between text-h2 font-bold'>
            <p>1개월</p>
            <p>￦30,000</p>
          </div>
        </div>
        <div className='mt-[3rem]'>
          <TypeTwoButton text='결제하기' color='bg-primary' />
        </div>
      </div>
    </PageContainer>
  );
};
export default MembershipPage;
