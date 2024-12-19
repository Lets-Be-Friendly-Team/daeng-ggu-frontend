import { useMemo, useState } from 'react';
import { Avatar, LogoImage, TypeTwoButton } from '@daeng-ggu/design-system';
import { useReservationId } from '@daeng-ggu/shared';

import { PROGRESS_STATUS } from '@/constants/progress';
import useGetReservationOwnerInfo from '@/hooks/queries/monitoring/useGetReservationOwnerInfo';
import usePostCreateChannel from '@/hooks/queries/monitoring/usePostCreateChannel';
import usePostStartStream from '@/hooks/queries/monitoring/usePostStartStream';

const ProgressStep1 = ({ isDelivery, processStatus }: { processStatus: string; isDelivery: boolean }) => {
  const reservationId = useReservationId();
  const [isDisabled, setIsDisabled] = useState(false);
  const { mutateAsync: createChannalMutate } = usePostCreateChannel(reservationId);
  const { mutateAsync: startStreamMutate } = usePostStartStream(reservationId);
  const { data } = useGetReservationOwnerInfo(reservationId);

  const handleButtonDisable = useMemo(() => {
    if (!isDelivery && processStatus === PROGRESS_STATUS.preparing) {
      return false;
    }
    if (isDelivery && processStatus === PROGRESS_STATUS.waitingForGrooming) {
      return false;
    }
    return true;
  }, [isDelivery, processStatus]);

  const handleButtonOnClick = async () => {
    setIsDisabled(true);
    await createChannalMutate(undefined, {
      onError: () => {
        setIsDisabled(false);
      },
    });
    await startStreamMutate(undefined, {
      onError: () => {
        setIsDisabled(false);
      },
    });
  };
  return (
    <section className='mt-[12rem] flex  flex-col items-center'>
      <img className='mb-[4rem] w-[16rem]' src={LogoImage} alt='logo' />
      <h1 className='text-h2 font-semibold'>강아지가 오고 있어요!</h1>
      <span className='mt-10 text-sub_h3'>조금만 기다려주세요!</span>
      <div className='mt-10 flex gap-4'>
        <TypeTwoButton className='px-[2rem]' text='댕꾸에게 문의' color='bg-secondary' onClick={() => {}} />
        <TypeTwoButton
          className='px-[2rem]'
          isLoading={isDisabled}
          disabled={handleButtonDisable || isDisabled}
          text={'미용 시작'}
          color='bg-secondary'
          onClick={handleButtonOnClick}
        />
      </div>

      <h2 className=' pt-[2rem] border-primary mb-[1rem] mt-[3rem] w-full text-sub_h2 font-semibold'>보호자 정보</h2>
      <div className='flex  gap-[1rem]  w-full items-center'>
        <Avatar mode='avatar' imageUrl={data?.data.petInfo.petImgUrl} />
        <div className='flex flex-col gap-[1rem]'>
          <span className='text-sub_h3 font-semibold'>이름 | {data?.data.customerName}</span>
          <span className='text-sub_h3 font-semibold'>전화번호 | {data?.data.customerPhone}</span>
        </div>
      </div>
    </section>
  );
};

export default ProgressStep1;
