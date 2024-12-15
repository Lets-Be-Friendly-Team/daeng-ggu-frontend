import { useMemo } from 'react';
import { PageContainer, Progress } from '@daeng-ggu/design-system';

import ProgressStep1 from '@/pages/ProgressPage/ProgressStep1';
import ProgressStep2 from '@/pages/ProgressPage/ProgressStep2';
import ProgressStep3 from '@/pages/ProgressPage/ProgressStep3';

const ProgressPage = () => {
  const step = 3 as number;
  const StepComponents = useMemo(() => {
    switch (step) {
      case 1:
        return <ProgressStep1 status='' />;
      case 2:
        return <ProgressStep2 />;
      case 3:
        return <ProgressStep3 />;
      default:
        return;
    }
  }, [step]);
  return (
    <PageContainer>
      <Progress maxStep={3} value={step} text={'테스트'} />
      {StepComponents}
    </PageContainer>
  );
};

export default ProgressPage;
