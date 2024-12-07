// CompletedRequestUser.tsx
import { useNavigate } from 'react-router-dom';
import { BorderContainer, PageContainer } from '@daeng-ggu/design-system';

import EmptyState from '@/pages/Status/EmptyState.tsx';
import { CompletedData } from '@/types/requestAndStatusTypes';

interface CompletedRequestUserProps {
  data: CompletedData;
}

const CompletedRequestUser = ({ data }: CompletedRequestUserProps) => {
  const navigate = useNavigate();

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

  const formatDate = (dateString: string): string => {
    const match = dateString.match(/-(\d{2})-(\d{2})/);
    if (match) {
      return `${match[1]}.${match[2]}.`;
    }
    return dateString;
  };

  return (
    <PageContainer>
      <div className='mx-auto mb-[100px] flex w-full flex-col items-center pt-10'>
        {data.requestList.length > 0 ? (
          <div className='w-full'>
            <BorderContainer>
              <ul className='w-full bg-secondary'>
                {data.requestList.map((request, index) => (
                  <li key={request.requestId} className='relative'>
                    <div
                      className={`mx-auto flex rounded-[8px] bg-white ${
                        index !== data.requestList.length - 1 ? 'mb-4' : ''
                      }`}
                    >
                      <div>
                        <div className='ml-6 pt-4'>
                          <p className='text-sub_h2 font-bold text-gray-300'>
                            {request.codeName === 'FAILED' ? '요청실패' : '견적완료'}
                          </p>
                        </div>
                        <div className='flex w-full items-center justify-center rounded-[8px] bg-white pb-10 pl-10 pt-4'>
                          <img
                            src={request.petImgUrl}
                            alt={request.petName || '펫 이미지'}
                            className='mr-10 h-[50px] w-[50px] rounded-full'
                          />
                          <div>
                            <p className='pb-2 text-gray-800'>{formatDate(request.createdAt)} 견적요청</p>
                            <h3 className='pb-2 text-sub_h3 font-semibold'>{request.petName || '이름 없는 펫'}</h3>
                            <div className='text-iconCaption'>
                              <div className='flex'>
                                <div className='mr-2 flex min-w-[50px] flex-col'>
                                  <div>
                                    <p className='mr-1 h-[16px] min-w-[44px] rounded-[4px] border border-primary px-2 py-[0.8px] text-center text-primary'>
                                      서비스
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <p className='py-auto'>
                                    {request.desiredServiceCode || '알 수 없음'}/
                                    {getDeliveryStatus(request.majorBreedCode)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </BorderContainer>
          </div>
        ) : (
          <EmptyState
            title='첫 견적서 요청을 해보세요!'
            buttonText='견적서 요청하기'
            onClick={() => navigate('/test/request', { state: { from: '/test' } })}
          />
        )}
      </div>
    </PageContainer>
  );
};

export default CompletedRequestUser;
