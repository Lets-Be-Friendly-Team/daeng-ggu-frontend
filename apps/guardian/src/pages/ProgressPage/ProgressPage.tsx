import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { PageContainer, Progress } from '@daeng-ggu/design-system';

import useGetMonitoringStatus from '@/hooks/queries/useGetMonitoringStatus';
import Step1 from '@/pages/ProgressPage/GuardianProgressStep1';
import GuardianProgressStep2and6 from '@/pages/ProgressPage/GuardianProgressStep2and6';
import GuardianProgressStep3and4and5 from '@/pages/ProgressPage/GuardianProgressStep3and4and5';
import GuardianProgressStep7 from '@/pages/ProgressPage/GuardianProgressStep7';

const ProgressPage = () => {
  const { reservationId } = useParams();
  const { data: response } = useGetMonitoringStatus(reservationId as string);
  console.log(response);
  const StepComponents = useMemo(() => {
    switch (response?.data.processNum) {
      case 1:
        return <Step1 />;
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
      <Progress maxStep={7} value={2} text={response?.data.processMessage} />
      {StepComponents}
    </PageContainer>
  );
};

export default ProgressPage;
