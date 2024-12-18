import { TypeTwoButton } from '@daeng-ggu/design-system';
import { IVSBroadCast, useReservationId } from '@daeng-ggu/shared';

import useGetBroadcastChannel from '@/hooks/queries/monitoring/useGetBroadcastChannel';
import usePostEndStream from '@/hooks/queries/monitoring/usePostEndStream';

const ProgressStep2 = () => {
  const reservationId = useReservationId();

  const { mutate: endStreamMutate } = usePostEndStream(reservationId);
  const { data } = useGetBroadcastChannel(reservationId);

  const handleEndStream = () => {
    endStreamMutate();
  };
  return (
    <>
      <div className='mt-[2rem] flex w-full justify-center'>
        <h2 className='border-b-2 border-primary text-center text-sub_h1 font-bold text-primary'>CCTV</h2>
      </div>
      {data?.ingestUrl && data?.streamKey && (
        <IVSBroadCast ingestEndpoint={data?.ingestUrl || ''} streamKey={data?.streamKey || ''} />
      )}
      <div className='flex w-full gap-[1rem]'>
        <TypeTwoButton className='mt-[2rem] px-[2rem]' text='미용 종료' color='bg-primary' onClick={handleEndStream} />
        <TypeTwoButton className='mt-[2rem] px-[2rem]' text='보호자 연락' color='bg-secondary' onClick={() => {}} />
      </div>
    </>
  );
};

export default ProgressStep2;
