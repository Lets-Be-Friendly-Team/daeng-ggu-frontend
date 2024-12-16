import { useParams } from 'react-router';
import { LogoImage, TypeTwoButton } from '@daeng-ggu/design-system';

import usePostStartDeliveryToShop from '@/hooks/queries/usePostStartDeliveryToShop';

const GuardianProgressStep1 = () => {
  const { reservationId } = useParams();
  const { mutate } = usePostStartDeliveryToShop(reservationId);
  const handleButtonOnClick = async () => {
    mutate();
  };
  return (
    <div>
      <img className='mb-[4rem] w-[16rem]' src={LogoImage} alt='logo' />
      <h1 className='text-h2 font-semibold'></h1>
      <span className='mt-10 text-sub_h3'>강아지가 기다리고 있어요!</span>
      <div className='mt-10 flex gap-4'></div>
      <TypeTwoButton className='px-[2rem]' text='출발' color='bg-primary' onClick={handleButtonOnClick} />
    </div>
  );
};

export default GuardianProgressStep1;
