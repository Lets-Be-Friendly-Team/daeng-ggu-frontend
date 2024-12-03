// CompletedRequestDesigner.tsx
// import { useNavigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { BorderContainer, DetailButton } from '@daeng-ggu/design-system';

import EmptyState from '@/pages/Status/EmptyState.tsx';
import { DesignerCompletedData } from '@/types';

interface CompletedRequestDesignerProps {
  data: DesignerCompletedData;
}

const CompletedRequestDesigner = ({ data }: CompletedRequestDesignerProps) => {
  const navigate = useNavigate();

  const formatDate = (dateString: string): string => {
    const match = dateString.match(/-(\d{2})-(\d{2})/);
    if (match) {
      return `${match[1]}.${match[2]}.`;
    }
    return dateString;
  };
  const handleDetailPage = () => {
    navigate('/bid/detail', { state: { data: '' } });
  };

  return (
    <div className='mx-auto mb-[100px] flex max-w-[300px] flex-col items-center pt-10'>
      {data.requestList.length > 0 ? (
        <div className='w-full'>
          <BorderContainer>
            <ul className='w-full bg-secondary'>
              {data.requestList.map((request, index) => (
                <li key={request.petId} className='relative'>
                  <div
                    className={`mx-auto flex rounded-[8px] bg-white ${
                      index !== data.requestList.length - 1 ? 'mb-4' : ''
                    }`}
                  >
                    <div>
                      <div className='ml-6 pt-4'>
                        <p className='text-sub_h2 font-bold text-gray-300'>완료</p>
                      </div>
                      <div className='flex min-w-[240px] items-center justify-center rounded-[8px] bg-white pb-10 pl-10 pt-4'>
                        <img
                          src={request.petImgUrl}
                          alt={request.petName || '펫 이미지'}
                          className='mr-10 h-[50px] w-[50px] rounded-full'
                        />
                        <div>
                          <p>{formatDate(request.desiredDate1)} 미용 요청</p>
                          <h3 className='text-xl font-semibold'>{request.petName || '이름 없는 펫'}</h3>
                          <p className='pb-2 text-iconCaption'>
                            <span className='mr-1 rounded-[4px] border border-primary px-2 py-[0.8px] text-primary'>
                              서비스
                            </span>
                            {request.desiredService || '알 수 없음'}
                          </p>
                          <DetailButton text='상세보기' onClick={() => handleDetailPage()} />
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
        <EmptyState title='이전 견적이 없습니다.' buttonText='새로고침' onClick={() => window.location.reload()} />
      )}
    </div>
  );
};

export default CompletedRequestDesigner;
