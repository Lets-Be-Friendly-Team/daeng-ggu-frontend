import { useNavigate } from 'react-router-dom';

import EmptyState from '@/pages/Status/EmptyState';
import PendingRequestDesigner from '@/pages/Status/PendingRequestDesigner';
import PendingRequestReservation from '@/pages/Status/PendingRequestReservation';
import PendingRequestUser from '@/pages/Status/PendingRequestUser';
import { DesignerRequest, Mode, PendingPet, ReservationRequest } from '@/requestAndStatusTypes.ts';

interface PendingRequestProps {
  data: PendingPet[] | DesignerRequest[] | ReservationRequest[];
  mode: Mode;
}

const PendingRequest = ({ data, mode }: PendingRequestProps) => {
  const navigate = useNavigate();

  const showEmptyState = data.length === 0;

  const emptyStateConfig = {
    user: {
      title: '아직 견적 요청 보낸것이 없어요!',
      buttonText: '견적요청하러 가기',
      onClick: () => navigate('/bid/request', { state: { from: '/bid' } }),
    },
    designer: {
      title: '견적 요청이 없습니다.',
      buttonText: '새로고침',
      onClick: () => window.location.reload(),
    },
    reservation: {
      title: '예약된 내용이 없습니다.',
      buttonText: '새로고침',
      onClick: () => window.location.reload(),
    },
  };

  if (showEmptyState) {
    const { title, buttonText, onClick } = emptyStateConfig[mode];
    return <EmptyState title={title} buttonText={buttonText} onClick={onClick} />;
  }

  switch (mode) {
    case 'designer':
      return <PendingRequestDesigner data={data as DesignerRequest[]} />;
    case 'user':
      return <PendingRequestUser data={data as PendingPet[]} />;
    case 'reservation':
      return <PendingRequestReservation />;
    default:
      return null;
  }
};

export default PendingRequest;
