import { useMemo } from 'react';
import { PageContainer, Progress } from '@daeng-ggu/design-system';
import { useReservationId } from '@daeng-ggu/shared';

import { PROGRESS_STATUS } from '@/constants/progress';
import useGetMonitoringStatus from '@/hooks/queries/monitoring/useGetMonitoringStatus';
import ProgressStep1 from '@/pages/ProgressPage/ProgressStep1';
import ProgressStep2 from '@/pages/ProgressPage/ProgressStep2';
import ProgressStep3 from '@/pages/ProgressPage/ProgressStep3';

const ProgressPage = () => {
  const reservationId = useReservationId();

  const { data: response } = useGetMonitoringStatus(reservationId);
  // const response = {
  //   data: {
  //     processStatus: 'GROOMING',
  //     isDelivery: false,
  //     processMessage: '테스트',
  //   },
  // };
  console.log(response);
  const StepComponents = useMemo(() => {
    switch (response?.data.processStatus) {
      case PROGRESS_STATUS.preparing:
      case PROGRESS_STATUS.waitingForGrooming:
        return <ProgressStep1 isDelivery={response?.data.isDelivery} processStatus={response.data.processStatus} />;
      case PROGRESS_STATUS.grooming:
        return <ProgressStep2 />;
      case PROGRESS_STATUS.complete:
        return <ProgressStep3 />;
      default:
        return;
    }
  }, [response?.data]);

  const handleText = useMemo((): number => {
    switch (response?.data.processStatus) {
      case 'PREPAREING':
        return 1;
      case 'GROOMING':
        return 2;
      case 'COMPLETE':
        return 3;
      default:
        return 1;
    }
  }, [response?.data]);

  return (
    <PageContainer>
      <div className='py-[2rem]'>
        <Progress maxStep={3} value={handleText} text={'테스트'} />
        {StepComponents}
      </div>
    </PageContainer>
  );
};

export default ProgressPage;
