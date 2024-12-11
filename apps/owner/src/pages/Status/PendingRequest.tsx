import { useNavigate } from 'react-router-dom';

import EmptyState from '@/pages/Status/EmptyState';
import PendingRequestUser from '@/pages/Status/PendingRequestUser';
import { PendingPet } from '@/types/requestAndStatusTypes';

interface PendingRequestProps {
  data: PendingPet[];
}

const PendingRequest = ({ data }: PendingRequestProps) => {
  const navigate = useNavigate();

  const showEmptyState = data.length === 0;
  if (showEmptyState) {
    const { title, buttonText, onClick } = {
      title: '아직 견적 요청 보낸것이 없어요!',
      buttonText: '견적요청하러 가기',
      onClick: () => navigate('/bid/request', { state: { from: '/bid' } }),
    };
    return <EmptyState title={title} buttonText={buttonText} onClick={onClick} />;
  }
  return <PendingRequestUser data={data as PendingPet[]} />;
};

export default PendingRequest;
