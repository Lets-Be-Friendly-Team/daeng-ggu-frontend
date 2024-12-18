import { useMemo } from 'react';
import { CategoryTab, TypeTwoButton } from '@daeng-ggu/design-system';
import { IVSBroadCast, useReservationId } from '@daeng-ggu/shared';

import useGetBroadcastChannel from '@/hooks/queries/useGetBroadcastChannel';
import useGetReservationInfo from '@/hooks/queries/useGetReservationInfo';
import usePostArriveAtHome from '@/hooks/queries/usePostArriveAtHome';
import usePostArriveAtShop from '@/hooks/queries/usePostArriveAtShop';
import NaverSendLocationMap from '@/pages/ProgressPage/NaverSendLocationMap';

const GuardianProgressStep2and6 = ({ statusNum }: { statusNum: number }) => {
  const reservationId = useReservationId();
  const { data: reservationInfoResponse } = useGetReservationInfo(reservationId);
  const { mutate: arriveAtShopMutate } = usePostArriveAtShop(reservationId);
  const { mutate: arriveAtHomeMutate } = usePostArriveAtHome(reservationId);
  const { data } = useGetBroadcastChannel(reservationId);

  const handleButtonText = useMemo(() => {
    if (statusNum === 2) {
      return '디자이너에게 도착';
    }
    return '보호자에게 도착';
  }, [statusNum]);

  const handleButtonOnClick = () => {
    if (statusNum === 2) {
      return arriveAtShopMutate();
    }
    if (statusNum === 6) {
      return arriveAtHomeMutate();
    }
    return;
  };

  const tabs = [
    {
      label: '현재 위치',
      content: (
        <>
          {reservationInfoResponse?.data ? (
            <NaverSendLocationMap
              className={'h-[60rem]'}
              customerAddress={reservationInfoResponse?.data.customerAddress}
              shopAddress={reservationInfoResponse?.data.shopAddress}
            />
          ) : (
            <div className='h-[60rem] w-full'>ss</div>
          )}
          <div className='flex gap-4'>
            <TypeTwoButton className='px-[2rem]' text='댕꾸에게 문의' color='bg-secondary' onClick={() => {}} />
            <TypeTwoButton
              className='px-[2rem]'
              text={handleButtonText}
              color='bg-primary'
              onClick={handleButtonOnClick}
            />
          </div>
        </>
      ),
    },
    {
      label: 'CCTV',
      content: (
        <>
          {data ? (
            <IVSBroadCast ingestEndpoint={data?.ingestUrl || ''} streamKey={data?.streamKey || ''} />
          ) : (
            <div className='w-full h-[30rem] mt-[2rem]'></div>
          )}
          ,
        </>
      ),
    },
  ];
  return (
    <div>
      <CategoryTab tabs={tabs} />
    </div>
  );
};

export default GuardianProgressStep2and6;
