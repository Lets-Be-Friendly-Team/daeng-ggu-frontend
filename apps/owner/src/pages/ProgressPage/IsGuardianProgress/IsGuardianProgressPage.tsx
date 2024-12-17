import { useMemo } from 'react';
import { Progress } from '@daeng-ggu/design-system';

import ProgressStep1 from '@/pages/ProgressPage/IsGuardianProgress/ProgressStep1';
import ProgressStep2and6 from '@/pages/ProgressPage/IsGuardianProgress/ProgressStep2and6';
import ProgressStep3and5 from '@/pages/ProgressPage/IsGuardianProgress/ProgressStep3and5';
import ProgressStep4 from '@/pages/ProgressPage/IsGuardianProgress/ProgressStep4';
import ProgressStep7 from '@/pages/ProgressPage/IsGuardianProgress/ProgressStep7';

// const ProgressTitle = [
//   '디자이너의 정보입니다!',
//   '반려동물이 이동중이에요!',
//   '미용중이에요!',
//   '집으로 가고 있어요!',
//   '모든 단계가 종료되었어요!',
// ];

const IsGuardianProgressPage = ({ processNum, processMessage }: { processNum: number; processMessage: string }) => {
  const StepComponents = useMemo(() => {
    switch (processNum) {
      case 1:
        return <ProgressStep1 />;
      case 2:
        return <ProgressStep2and6 />;
      case 3:
      case 5:
        return <ProgressStep3and5 />;
      case 4:
        return <ProgressStep4 />;
      case 6:
        return <ProgressStep2and6 />;
      case 7:
        return <ProgressStep7 />;
      default:
        return;
    }
  }, [processNum]);

  return (
    <div className='py-[2rem]'>
      <Progress maxStep={5} value={processNum} text={processMessage} />
      {StepComponents}
    </div>
  );
};

export default IsGuardianProgressPage;
