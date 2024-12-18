import { CategoryTab, TypeOneButton } from '@daeng-ggu/design-system';
import { useReservationId } from '@daeng-ggu/shared';

import IVSPlayer from '@/components/IVS/IVSPlayer';
import NaverGuardianMap from '@/components/NaverMap/NaverGuardianMap';
import useGetPlaybackUrl from '@/hooks/queries/monitoring/useGetPlaybackUrl';

const ProgressStep2and6 = () => {
  const reservationId = useReservationId();
  const { data } = useGetPlaybackUrl(reservationId);
  const tabs = [
    {
      label: '현재 위치',
      content: (
        <>
          <NaverGuardianMap reservationId={reservationId} className={'mb-[6rem] h-[60rem]'}></NaverGuardianMap>
          <TypeOneButton text='펫가디언에게 문의하기' color='bg-primary' onClick={() => {}} />
        </>
      ),
    },
    {
      label: 'CCTV',
      content: (
        <>
          <IVSPlayer playbackUrl={data?.playbackUrl || ''} />
          <TypeOneButton text='펫가디언에게 문의하기' color='bg-primary' onClick={() => {}} />
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

export default ProgressStep2and6;
