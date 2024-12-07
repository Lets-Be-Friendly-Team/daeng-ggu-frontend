import { useNavigate } from 'react-router-dom';
import { Avatar, BorderContainer, DetailButton, PageContainer } from '@daeng-ggu/design-system';

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
    <PageContainer>
      <div className='mx-auto flex flex-col items-center'>
        {data.map((request) => (
          <div key={request.requestId} className='mb-6 w-full'>
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
                    <p className='pb-2 text-gray-800'>{formatDate(request.createdAt)} 견적요청</p>
                    <h3 className='pb-2 text-sub_h3 font-semibold'>{request.petName || '이름 없음'}</h3>
                    <div className='text-iconCaption'>
                      <div className='flex'>
                        <div className='mr-2 flex min-w-[50px] flex-col'>
                          <div>
                            <p className='mr-1 h-[16px] min-w-[44px] rounded-[4px] border border-primary px-2 py-[0.8px] text-primary'>
                              서비스
                            </p>
                          </div>
                          <div className='mt-2'>
                            <DetailButton text='상세보기' onClick={() => handleDetailPage()} />
                          </div>
                        </div>
                        <div>
                          <p>
                            {request.desiredServiceCode || '알 수 없음'}/{getDeliveryStatus(request.majorBreedCode)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </BorderContainer>
          </div>
        ))}
      </div>
    </PageContainer>
  );
};

export default PendingRequestDesigner;
