import { useState } from 'react';
import { LogoImage, TypeTwoButton } from '@daeng-ggu/design-system';
import { useReservationId } from '@daeng-ggu/shared';

import usePostStartDeliveryToShop from '@/hooks/queries/usePostStartDeliveryToShop';

const GuardianProgressStep1 = () => {
  const reservationId = useReservationId();
  const [isDisabled, setIsDisabled] = useState(false);
  const { mutate: startDeliveryToShopMutate } = usePostStartDeliveryToShop(reservationId);

  const handleButtonOnClick = async () => {
    setIsDisabled(true);
    startDeliveryToShopMutate(undefined, {
      onError: () => {
        setIsDisabled(false);
      },
    });
  };
  return (
    <section className='mt-[12rem] flex h-[100vh] flex-col items-center'>
      <img className='mb-[4rem] w-[16rem]' src={LogoImage} alt='logo' />
      <h1 className='text-h2 font-semibold'>강아지가 기다리고 있어요!</h1>
      <div className='mt-10 flex gap-4'>
        <TypeTwoButton className='px-[2rem]' text='댕꾸에게 문의' color='bg-secondary' onClick={() => {}} />
        <TypeTwoButton
          className='px-[2rem]'
          disabled={isDisabled}
          isLoading={isDisabled}
          text='출발'
          color='bg-primary'
          onClick={handleButtonOnClick}
        />
      </div>
    </section>
  );
};

export default GuardianProgressStep1;
