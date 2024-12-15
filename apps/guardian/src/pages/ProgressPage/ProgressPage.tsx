import { useMemo } from 'react';
import { PageContainer, Progress } from '@daeng-ggu/design-system';

import Step1 from '@/pages/ProgressPage/GuardianProgressStep1';
import GuardianProgressStep2and4 from '@/pages/ProgressPage/GuardianProgressStep2and4';
import GuardianProgressStep3 from '@/pages/ProgressPage/GuardianProgressStep3';
import GuardianProgressStep5 from '@/pages/ProgressPage/GuardianProgressStep5';

const ProgressPage = () => {
  const step = 4 as number;
  const StepComponents = useMemo(() => {
    switch (step) {
      case 1:
        return <Step1 />;
      case 2:
        return <GuardianProgressStep2and4 status='ss' />;
      case 3:
        return <GuardianProgressStep3 />;
      case 4:
        return <GuardianProgressStep2and4 status='' />;
      case 5:
        return <GuardianProgressStep5 />;
      default:
        return;
    }
  }, [step]);
  return (
    <PageContainer>
      <Progress maxStep={5} value={step} text={'테스트'} />
      {StepComponents}
    </PageContainer>
  );
};

export default ProgressPage;
