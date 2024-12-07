import { PageContainer } from '@daeng-ggu/design-system';

import EmptyState from '@/pages/Status/EmptyState';

const PendingRequestReservation = () => {
  return (
    <PageContainer>
      <div className='mx-auto flex flex-col items-center'>
        <h2 className='text-sub_h2 font-bold'>예약 기능은 아직 구현되지 않았습니다.</h2>
        <EmptyState title='예약된 내용이 없습니다.' buttonText='새로고침' onClick={() => window.location.reload()} />
      </div>
    </PageContainer>
  );
};

export default PendingRequestReservation;
