import { useMemo } from 'react';
import { useParams } from 'react-router';
import { PageContainer, Progress } from '@daeng-ggu/design-system';

import useGetMonitoringStatus from '@/hooks/queries/monitoring/useGetMonitoringStatus';
import ProgressStep1 from '@/pages/ProgressPage/ProgressStep1';
import ProgressStep2 from '@/pages/ProgressPage/ProgressStep2';
import ProgressStep3 from '@/pages/ProgressPage/ProgressStep3';

const ProgressPage = () => {
  const { reservationId } = useParams();

  const { data: response } = useGetMonitoringStatus(reservationId as string);
  const StepComponents = useMemo(() => {
    switch (response?.data.processStatus) {
      case 'PREPAREING':
        return <ProgressStep1 status='' />;
      case 'GROOMING':
        return <ProgressStep2 />;
      case 'COMPLETE':
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
      <Progress maxStep={3} value={handleText} text={'테스트'} />
      {StepComponents}
    </PageContainer>
  );
};

export default ProgressPage;
