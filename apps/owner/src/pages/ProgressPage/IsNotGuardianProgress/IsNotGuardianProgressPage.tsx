import { useMemo } from 'react';
import { Progress } from '@daeng-ggu/design-system';

import NotGuadianProgressStep1 from '@/pages/ProgressPage/IsNotGuardianProgress/NotGuadianProgressStep1';
import NotGuardianProgressStep2 from '@/pages/ProgressPage/IsNotGuardianProgress/NotGuardianProgressStep2';
import NotGuardianProgressStep3 from '@/pages/ProgressPage/IsNotGuardianProgress/NotGuardianProgressStep3';

const IsNotGuardianProgressPage = ({ processNum, processMessage }: { processNum: number; processMessage: string }) => {
  const components = useMemo(() => {
    switch (processNum) {
      case 1:
        return <NotGuadianProgressStep1 />;
      case 2:
        return <NotGuardianProgressStep2 />;
      case 3:
        return <NotGuardianProgressStep3 />;
      default:
        return;
    }
  }, [processNum]);
  return (
    <div className='py-[2rem]'>
      <Progress maxStep={3} value={processNum} text={processMessage} />
      {components}
    </div>
  );
};

export default IsNotGuardianProgressPage;
