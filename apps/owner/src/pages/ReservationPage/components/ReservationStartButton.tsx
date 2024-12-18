import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MiniButton, Modal } from '@daeng-ggu/design-system';
import { useModalStore } from '@daeng-ggu/shared';

import ROUTES from '@/constants/routes';
import usePostCreateReservationProcess from '@/hooks/queries/Reservation/usePostCreateReservationProcess';

const ReservationStartButton = ({
  text,
  reservationId,
  reservationDate,
  isProcess,
  isActive,
}: {
  text: string;
  isActive: boolean;
  reservationDate: string;
  reservationId: number;
  isProcess: boolean;
}) => {
  const { show } = useModalStore();
  const { mutateAsync: createReservationProcessMutateAsync } = usePostCreateReservationProcess();
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false);
  const isDateBeforeToday = (dateString: string): boolean => {
    const today = new Date();

    const reservationDate = new Date(dateString.replace(/\./g, '-'));
    return reservationDate < today;
  };

  const handleMiniButton = async () => {
    if (isDateBeforeToday(reservationDate)) {
      show(Modal, {
        title: '예약을 취소하시겠습니까?',
        description: '예약을 취소하면 되돌릴 수 없습니다.',
        onConfirm: () => {
          // 예약 취소 API 호출
        },
        confirmText: '예약 취소',
        cancelText: '취소',
      });
      return;
    }
    setIsDisabled(true);
    if (!isProcess) await createReservationProcessMutateAsync(reservationId);
    navigate('/' + ROUTES.progress(reservationId));
  };
  return <MiniButton isActive={isActive} text={text} disabled={isDisabled} onClick={handleMiniButton} />;
};

export default ReservationStartButton;
