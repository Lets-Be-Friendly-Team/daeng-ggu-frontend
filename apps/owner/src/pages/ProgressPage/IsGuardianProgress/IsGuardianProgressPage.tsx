import { useMemo } from 'react';
import { Progress } from '@daeng-ggu/design-system';

import CCTVContent from '@/pages/ProgressPage/IsGuardianProgress/CCTVContent';
import Finish from '@/pages/ProgressPage/IsGuardianProgress/Finish';
import GuardianContent from '@/pages/ProgressPage/IsGuardianProgress/GuardianContent';

interface IsGuardianProgressProps {
  step: number;
}
const ProgressTitle = [
  '반려동물을 픽업하고 있어요!',
  '반려동물이 미용중이에요!',
  '가족에게 오고 있어요!',
  '도착했어요!',
];

const IsGuardianProgressPage = ({ step }: IsGuardianProgressProps) => {
  const StepComponents = useMemo(() => {
    switch (step) {
      case 1:
        return <GuardianContent />;
      case 2:
        return <CCTVContent />;
      case 3:
        return <GuardianContent />;
      case 4:
        return <Finish />;
      default:
        return;
    }
  }, [step]);

  return (
    <div className='py-[2rem]'>
      <Progress maxStep={4} value={step} text={ProgressTitle[step - 1]} />
      {StepComponents}
    </div>
  );
};

export default IsGuardianProgressPage;
