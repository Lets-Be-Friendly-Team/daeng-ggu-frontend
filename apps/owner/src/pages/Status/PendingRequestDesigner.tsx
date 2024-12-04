import { useNavigate } from 'react-router-dom';
import { Avatar, BorderContainer, DetailButton } from '@daeng-ggu/design-system';

import { DesignerRequest } from '@/types/requestAndStatusTypes';

interface PendingRequestDesignerProps {
  data: DesignerRequest[];
}

const PendingRequestDesigner = ({ data }: PendingRequestDesignerProps) => {
  const navigate = useNavigate();

  const formatDate = (dateString: string): string => {
    const match = dateString.match(/-(\d{2})-(\d{2})/);
    if (match) {
      return `${match[1]}.${match[2]}.`;
    }
    return dateString;
  };

  const handleDetailPage = () => {
    navigate('/bid/detail', { state: { data: '', pageMode: 'designer' } });
  };

  const getDeliveryStatus = (majorBreedCode: string) => {
    switch (majorBreedCode) {
      case 'S':
        return '라이트 딜리버리';
      case 'M':
        return '미디엄 딜리버리';
      case 'L':
        return '라지 딜리버리';
      case 'X':
        return '스페셜 딜리버리';
      default:
        return '알 수 없음';
    }
  };

  return (
    <div className='mx-auto flex flex-col items-center px-[20px]'>
      {data.map((request) => (
        <div key={request.requestId} className='mb-6 w-full max-w-[300px]'>
          <BorderContainer>
            <div className='p-4'>
              <div className='flex items-center pl-2'>
                <Avatar
                  mode='designerCard'
                  imageUrl={request.petImageUrl}
                  name={request.petName}
                  containerClassName='mr-4 h-[70px] w-[70px]'
                />
                <div className='flex flex-col'>
                  <p className='text-gray-800'>{formatDate(request.createdAt)} 견적요청</p>
                  <h3 className='text-sub_h3 font-semibold'>{request.petName || '이름 없음'}</h3>
                  <p className='pb-2 text-iconCaption'>
                    <span className='mr-1 rounded-[4px] border border-primary px-2 py-[0.8px] text-primary'>
                      서비스
                    </span>
                    {request.desiredServiceCode || '알 수 없음'}/{getDeliveryStatus(request.majorBreedCode)}
                  </p>
                  <DetailButton text='상세보기' onClick={() => handleDetailPage()} />
                </div>
              </div>
            </div>
          </BorderContainer>
        </div>
      ))}
    </div>
  );
};

export default PendingRequestDesigner;
