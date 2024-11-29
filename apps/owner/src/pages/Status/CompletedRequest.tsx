import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BorderContainer, CloseIcon } from '@daeng-ggu/design-system';

import EmptyState from '@/pages/Status/EmptyState.tsx';

interface Request {
  requestId: number;
  petId: number;
  petName: string;
  petImgUrl: string;
  desiredService: string;
  isVisitRequired: boolean;
  createdAt: string;
}

interface CompletedData {
  requestList: Request[];
}

interface CompletedRequestProps {
  data: CompletedData;
}

const CompletedRequest: React.FC<CompletedRequestProps> = ({ data }) => {
  const handleRemoveRequest = (): void => {
    console.log('closed');
  };
  const navigate = useNavigate();

  return (
    <div className='mx-auto flex max-w-[300px] flex-col items-center pt-10'>
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
                    <button onClick={() => handleRemoveRequest()} className='absolute right-4 top-4'>
                      <CloseIcon className='h-6 w-6 cursor-pointer text-gray-500 hover:text-gray-700' />
                    </button>

                    <div className='mx-auto flex min-w-[240px] items-center bg-white p-4'>
                      <img
                        src={request.petImgUrl}
                        alt={request.petName || '펫 이미지'}
                        className='mr-4 h-[50px] w-[50px] rounded-full'
                      />
                      <div>
                        <h3 className='text-xl font-semibold'>{request.petName || '이름 없는 펫'}</h3>
                        <p>서비스: {request.desiredService || '알 수 없음'}</p>
                        <p>방문 필요 여부: {request.isVisitRequired ? '예' : '아니오'}</p>
                        <p>요청일: {request.createdAt}</p>
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
  );
};

export default CompletedRequest;
