import { useMemo } from 'react';
import { Progress } from '@daeng-ggu/design-system';

import ProgressStep1 from '@/pages/ProgressPage/IsGuardianProgress/ProgressStep1';
import ProgressStep2and4 from '@/pages/ProgressPage/IsGuardianProgress/ProgressStep2and4';
import ProgressStep3 from '@/pages/ProgressPage/IsGuardianProgress/ProgressStep3';
import ProgressStep5 from '@/pages/ProgressPage/IsGuardianProgress/ProgressStep5';

const ProgressTitle = [
  '디자이너의 정보입니다!',
  '반려동물이 이동중이에요!',
  '미용중이에요!',
  '집으로 가고 있어요!',
  '모든 단계가 종료되었어요!',
];

const IsGuardianProgressPage = () => {
  const step = 2 as number;
  const StepComponents = useMemo(() => {
    switch (step) {
      case 1:
        return <ProgressStep1 />;
      case 2:
        return <ProgressStep2and4 />;
      case 3:
        return <ProgressStep3 />;
      case 4:
        return <ProgressStep2and4 />;
      case 5:
        return <ProgressStep5 />;
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
