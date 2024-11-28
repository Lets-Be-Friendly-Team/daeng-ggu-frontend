import React from 'react';
import { BorderContainer } from '@daeng-ggu/design-system';

interface Request {
  requestId: number;
  petId: number;
  petName: string;
  petImgUrl: string;
  desiredService: string;
  isVisitRequired: boolean;
  created_at: string;
}

interface CompletedData {
  requestList: Request[];
}

interface CompletedRequestProps {
  data: CompletedData;
}

const CompletedRequest: React.FC<CompletedRequestProps> = ({ data }) => {
  return (
    <div className='mx-auto flex max-w-[300px] flex-col items-center'>
      <h2 className='mb-4 text-2xl font-bold'>이전견적 조회</h2>

      {data.requestList.length > 0 ? (
        <div className='w-full'>
          <h3 className='mb-2 text-xl font-semibold'>견적 목록</h3>
          <BorderContainer>
            <ul className='w-full bg-secondary'>
              {data.requestList.map((request, index) => (
                <li key={request.requestId}>
                  <div
                    className={`mx-auto flex rounded-[8px] bg-white ${
                      index !== data.requestList.length - 1 ? 'mb-4' : ''
                    }`}
                  >
                    <div className='mx-auto flex min-w-[240px] items-center bg-white p-4'>
                      <img
                        src={request.petImgUrl}
                        alt={request.petName || '펫 이미지'}
                        className='mr-4 h-16 w-16 rounded-full'
                      />
                      <div>
                        <h3 className='text-xl font-semibold'>{request.petName || '이름 없는 펫'}</h3>
                        <p>서비스: {request.desiredService || '알 수 없음'}</p>
                        <p>방문 필요 여부: {request.isVisitRequired ? '예' : '아니오'}</p>
                        <p>요청일: {request.created_at}</p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </BorderContainer>
        </div>
      ) : (
        <p>완료된 견적이 없습니다.</p>
      )}
    </div>
  );
};

export default CompletedRequest;
