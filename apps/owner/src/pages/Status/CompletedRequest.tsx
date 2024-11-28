import React from 'react';

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
    <div className='flex flex-col items-center'>
      <h2 className='text-2xl font-bold mb-4'>이전견적 조회</h2>
      {data.requestList.length > 0 ? (
        <ul className='w-full'>
          {data.requestList.map((request) => (
            <li
              key={request.requestId}
              className='border-b border-gray-300 p-4 flex items-center'
            >
              <img
                src={request.petImgUrl}
                alt={request.petName}
                className='w-16 h-16 rounded-full mr-4'
              />
              <div>
                <h3 className='text-xl font-semibold'>{request.petName}</h3>
                <p>서비스: {request.desiredService}</p>
                <p>방문 필요 여부: {request.isVisitRequired ? '예' : '아니오'}</p>
                <p>요청일: {request.created_at}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>완료된 견적이 없습니다.</p>
      )}
    </div>
  );
};

export default CompletedRequest;
