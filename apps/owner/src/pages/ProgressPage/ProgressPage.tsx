import { useMemo } from 'react';
import { useParams } from 'react-router';
import { PageContainer } from '@daeng-ggu/design-system';

import useGetMonitoringStatus from '@/hooks/queries/monitoring/useGetMonitoringStatus';
import IsGuardianProgressPage from '@/pages/ProgressPage/IsGuardianProgress/IsGuardianProgressPage';
import IsNotGuardianProgressPage from '@/pages/ProgressPage/IsNotGuardianProgress/IsNotGuardianProgressPage';

const ProgressPage = () => {
  const { reservationId } = useParams();
  const { data: response } = useGetMonitoringStatus(reservationId as string);
  // const response = {
  //   data: {
  //     isDelivery: false,
  //     processMessage: '테스트',
  //     processNum: 2,
  //   },
  // };
  const ContentComponent = useMemo(() => {
    if (!response?.data) {
      return;
    }

    if (response?.data.isDelivery) {
      return (
        <IsGuardianProgressPage processMessage={response.data.processMessage} processNum={response?.data.processNum} />
      );
    }

    return (
      <IsNotGuardianProgressPage processMessage={response.data.processMessage} processNum={response?.data.processNum} />
    );
  }, [response?.data]);

  return <PageContainer>{ContentComponent}</PageContainer>;
};

export default ProgressPage;
