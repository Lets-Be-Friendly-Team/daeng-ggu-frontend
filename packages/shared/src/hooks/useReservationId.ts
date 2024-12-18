import { useParams } from 'react-router-dom';

const useReservationId = () => {
  const { reservationId } = useParams<{ reservationId: string }>();
  if (!reservationId) {
    return '';
  }
  return reservationId;
};

export default useReservationId;
