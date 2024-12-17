import { useNavigate } from 'react-router';
import { Avatar, TypeTwoButton } from '@daeng-ggu/design-system';

import ROUTES from '@/constants/routes';
import usePostCreateReservationProcess from '@/hooks/queries/usePostCreateReservationProcess';
import { ReservationType } from '@/types/reservation';

interface ReservationCardProps {
  reservation: ReservationType;
}

const ReservationCard = ({ reservation }: ReservationCardProps) => {
  const navigate = useNavigate();
  const { mutate } = usePostCreateReservationProcess(reservation.reservationId);

  const handleOnClickProgress = async (reservationId: number) => {
    mutate();
    navigate(ROUTES.progress(reservationId));
  };
  return (
    <div className='font-pretendard justify-between w-full flex items-center gap-4 ' key={reservation.reservationId}>
      <div className='flex gap-4 items-center'>
        <Avatar
          imageClassName=' w-[8rem] h-[8rem]'
          containerClassName=' w-[9rem] h-[9rem]'
          mode='designerCard'
          imageUrl={'https://picsum.photos/200/300'}
        />
        <div className='flex flex-col gap-2'>
          <span className='text-gray-800 text-sub_h2 font-semibold'>
            {reservation.reservationDate} / {reservation.startTime}시
          </span>
          <span className='flex text-body3'>{reservation.customerAddress}</span>
          <h3 className=' font-bold text-h2'>{reservation.petInfo.petName}</h3>
          <div className='flex flex-col text-gray-800 text-body3'>
            <span>
              {reservation.petInfo.majorBreed} {reservation.petInfo.subBreed} {reservation.petInfo.weight}kg
            </span>
          </div>
        </div>
      </div>
      <TypeTwoButton
        className='px-[2rem] w-fit'
        text='진행단계'
        color='bg-secondary'
        onClick={() => handleOnClickProgress(reservation.reservationId)}
      />
    </div>
  );
};

export default ReservationCard;
