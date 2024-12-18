import { useMemo } from 'react';
import { PageContainer, Progress } from '@daeng-ggu/design-system';
import { useReservationId } from '@daeng-ggu/shared';

import useGetMonitoringStatus from '@/hooks/queries/useGetMonitoringStatus';
import GuardianProgressStep1 from '@/pages/ProgressPage/GuardianProgressStep1';
import GuardianProgressStep2and6 from '@/pages/ProgressPage/GuardianProgressStep2and6';
import GuardianProgressStep3and4and5 from '@/pages/ProgressPage/GuardianProgressStep3and4and5';
import GuardianProgressStep7 from '@/pages/ProgressPage/GuardianProgressStep7';

const ProgressPage = () => {
  const reservationId = useReservationId();
  const { data: response } = useGetMonitoringStatus(reservationId);
  // console.log(response);

  // const response = {
  //   data: {
  //     isDelivery: true,
  //     processMessage: '테스트',
  //     processNum: 2,
  //   },
  // };

  const StepComponents = useMemo(() => {
    switch (response?.data.processNum) {
      case 1:
        return <GuardianProgressStep1 />;
      case 2:
        return <GuardianProgressStep2and6 statusNum={response?.data.processNum} />;
      case 3:
      case 4:
      case 5:
        return <GuardianProgressStep3and4and5 statusNum={response?.data.processNum} />;
      case 6:
        return <GuardianProgressStep2and6 statusNum={response?.data.processNum} />;
      case 7:
        return <GuardianProgressStep7 />;
      default:
        return;
    }
  }, [response?.data.processNum]);
  return (
    <PageContainer>
      <div className='py-[2rem]'>
        <Progress maxStep={7} value={response?.data.processNum} text={response?.data.processMessage} />
        {StepComponents}
      </div>
    </PageContainer>
  );
};

export default ProgressPage;
