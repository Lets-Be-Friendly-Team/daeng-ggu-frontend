import { useMemo } from 'react';
import { useParams } from 'react-router';
import { CategoryTab, TypeTwoButton } from '@daeng-ggu/design-system';

import usePostArriveAtHome from '@/hooks/queries/usePostArriveAtHome';
import usePostArriveAtShop from '@/hooks/queries/usePostArriveAtShop';
import NaverSendLocationMap from '@/pages/ProgressPage/NaverSendLocationMap';

const GuardianProgressStep2and6 = ({ statusNum }: { statusNum: number }) => {
  const { reservationId } = useParams();

  const { mutate: arriveAtShopMutate } = usePostArriveAtShop(reservationId);
  const { mutate: arriveAtHomeMutate } = usePostArriveAtHome(reservationId);
  const handleButtonText = useMemo(() => {
    if (statusNum === 2) {
      return '디자이너에게 도착';
    }
    return '보호자에게 도착';
  }, [statusNum]);

  const handleButtonOnClick = () => {
    if (statusNum === 2) {
      return arriveAtShopMutate();
    }
    if (statusNum === 6) {
      return arriveAtHomeMutate();
    }
  };
  const tabs = [
    {
      label: '현재 위치',
      content: (
        <>
          <NaverSendLocationMap className={'h-[60rem]'} />
          <div className='flex gap-4'>
            <TypeTwoButton className='px-[2rem]' text='댕꾸에게 문의' color='bg-secondary' onClick={() => {}} />
            <TypeTwoButton
              className='px-[2rem]'
              text={handleButtonText}
              color='bg-primary'
              onClick={handleButtonOnClick}
            />
          </div>
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

export default GuardianProgressStep2and6;
