import { TypeTwoButton } from '@daeng-ggu/design-system';

import { DesignerInfo } from '@/apis/home/getHomeMap';

const DesignerInfoWindow = ({ designerInfo }: { designerInfo: DesignerInfo }) => {
  const { nickname, address1, detailAddress, designerId } = designerInfo;
  // const navigate = useNavigate();
  return (
    <section className='flex h-fit min-h-[12.6rem] w-[30rem] flex-col justify-between rounded-lg bg-white px-[2rem] py-[1.5rem] shadow-md'>
      <div className='mb-[1rem] flex flex-col'>
        <h3 className='mb-[0.8rem] w-[20rem] text-sub_h2 font-semibold'>{nickname}</h3>
        <div className='text-sub_h3'>
          {address1} {detailAddress}
        </div>
      </div>
      <div className='flex gap-[1rem]'>
        <TypeTwoButton
          id={`profile-btn-${designerId}`}
          className='h-[3rem] w-fit rounded-lg border-[2px] border-primary bg-primary font-semibold text-white'
          text='프로필'
        />
        <TypeTwoButton
          id={`reservation-btn-${designerId}`}
          className='h-[3rem] w-fit rounded-lg border-[2px] border-primary bg-primary font-semibold text-white'
          text='예약하기'
        />
      </div>
    </section>
  );
};

export default DesignerInfoWindow;
