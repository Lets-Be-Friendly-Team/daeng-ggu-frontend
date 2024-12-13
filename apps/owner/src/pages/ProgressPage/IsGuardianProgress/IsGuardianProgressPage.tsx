import { useMemo } from 'react';
import { Progress } from '@daeng-ggu/design-system';

import CCTVContent from '@/pages/ProgressPage/IsGuardianProgress/CCTVContent';
import Finish from '@/pages/ProgressPage/IsGuardianProgress/Finish';
import GuardianContent from '@/pages/ProgressPage/IsGuardianProgress/GuardianContent';
import Step1 from '@/pages/ProgressPage/IsGuardianProgress/Step1';

interface IsGuardianProgressProps {
  step: number;
}
const ProgressTitle = [
  '디자이너의 정보입니다!',
  '반려동물이 이동중이에요!',
  '미용중이에요!',
  '집으로 가고 있어요!',
  '모든 단계가 종료되었어요!',
];

const IsGuardianProgressPage = ({ step }: IsGuardianProgressProps) => {
  const StepComponents = useMemo(() => {
    switch (step) {
      case 1:
        return <Step1 />;
      case 2:
        return <GuardianContent />;
      case 3:
        return <CCTVContent />;
      case 4:
        return <GuardianContent />;
      case 5:
        return <Finish />;
      default:
        return;
    }
  }, [step]);

  return (
    <div className='py-[2rem]'>
      <Progress maxStep={5} value={step} text={ProgressTitle[step - 1]} />
      {StepComponents}
    </div>
  );
};

export default IsGuardianProgressPage;
