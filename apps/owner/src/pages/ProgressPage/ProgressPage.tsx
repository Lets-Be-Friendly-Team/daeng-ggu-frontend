import { useMemo } from 'react';
import { PageContainer } from '@daeng-ggu/design-system';

import IsGuardianProgressPage from '@/pages/ProgressPage/IsGuardianProgress/IsGuardianProgressPage';
import IsNotGuardianProgressPage from '@/pages/ProgressPage/IsNotGuardianProgress/IsNotGuardianProgressPage';

const ProgressPage = () => {
  // api로 진행단계 및 가디언 사용여부 받아오기
  const isGuardian = true;
  const step = 3;
  const ContentComponent = useMemo(() => {
    if (isGuardian) {
      return <IsGuardianProgressPage step={step} />;
    }
    if (!isGuardian) {
      return <IsNotGuardianProgressPage />;
    }
  }, [isGuardian]);

  return <PageContainer>{ContentComponent}</PageContainer>;
};

export default ProgressPage;
