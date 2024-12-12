import EmptyState from '@/pages/StatusPage/EmptyState';
import PendingRequestDesigner from '@/pages/StatusPage/PendingRequestDesigner';

export interface DesignerRequest {
  requestId: number;
  petId: number;
  petName: string;
  petImageUrl: string;
  desiredServiceCode: string;
  isVisitRequired: boolean;
  majorBreedCode: string;
  createdAt: string;
}

interface PendingRequestProps {
  data: DesignerRequest[];
}

const PendingRequest = ({ data }: PendingRequestProps) => {
  const showEmptyState = data.length === 0;
  if (showEmptyState) {
    const { title, buttonText, onClick } = {
      title: '견적 요청이 없습니다.',
      buttonText: '새로고침',
      onClick: () => window.location.reload(),
    };
    return <EmptyState title={title} buttonText={buttonText} onClick={onClick} />;
  }
  return <PendingRequestDesigner data={data as DesignerRequest[]} />;
};

export default PendingRequest;
