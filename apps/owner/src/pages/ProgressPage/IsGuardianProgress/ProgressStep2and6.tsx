import { useParams } from 'react-router';
import { CategoryTab, TypeOneButton } from '@daeng-ggu/design-system';

import NaverGuardianMap from '@/components/NaverMap/NaverGuardianMap';

const ProgressStep2and6 = () => {
  const { reservationId } = useParams();
  const tabs = [
    {
      label: '현재 위치',
      content: (
        <>
          <NaverGuardianMap reservationId={reservationId} className={'mb-[6rem] h-[60rem]'}></NaverGuardianMap>
          <TypeOneButton text='펫가디언에게 문의하기' color='bg-primary' onClick={() => {}} />
        </>
      ),
    },
    {
      label: 'CCTV',
      content: <div>CCTV</div>,
    },
  ];
  return (
    <div>
      <CategoryTab tabs={tabs} />
    </div>
  );
};

export default ProgressStep2and6;
