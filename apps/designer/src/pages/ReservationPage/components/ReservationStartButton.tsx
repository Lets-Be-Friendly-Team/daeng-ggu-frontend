import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MiniButton } from '@daeng-ggu/design-system';

import ROUTES from '@/constants/routes';
import usePostCreateReservationProcess from '@/hooks/queries/monitoring/usePostCreateReservationProcess';

const ReservationStartButton = ({ reservationId, isProcess }: { reservationId: number; isProcess: boolean }) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();
  const { mutateAsync: createReservationProcessMutate } = usePostCreateReservationProcess();

  const handleButtonOnClick = async () => {
    setIsDisabled(true);
    if (!isProcess) await createReservationProcessMutate(reservationId);
    navigate(ROUTES.progress(reservationId));
  };
  return <MiniButton isActive text='미용 시작' disabled={isDisabled} onClick={handleButtonOnClick} />;
};

export default ReservationStartButton;
