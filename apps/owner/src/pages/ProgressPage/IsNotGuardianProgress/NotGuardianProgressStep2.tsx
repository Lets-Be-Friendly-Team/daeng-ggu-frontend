import { TypeTwoButton } from '@daeng-ggu/design-system';
import { useReservationId } from '@daeng-ggu/shared';

import IVSPlayer from '@/components/IVS/IVSPlayer';
import useGetPlaybackUrl from '@/hooks/queries/monitoring/useGetPlaybackUrl';

const NotGuardianProgressStep2 = () => {
  const reservationId = useReservationId();
  const { data } = useGetPlaybackUrl(reservationId);
  return (
    <>
      <div className='mt-[2rem] flex w-full justify-center'>
        <h2 className='mb-[1rem] border-b-2 border-primary text-center text-sub_h1 font-bold text-primary'>CCTV</h2>
      </div>
      {data?.playbackUrl ? <IVSPlayer playbackUrl={data?.playbackUrl} /> : <div className='h-[60rem] w-[46rem]' />}
      <TypeTwoButton className='mt-[1rem] px-[2rem]' text='댕꾸에게 문의' color='bg-secondary' onClick={() => {}} />
    </>
  );
};

export default NotGuardianProgressStep2;
