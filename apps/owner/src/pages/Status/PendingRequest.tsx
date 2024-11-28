import React from 'react';
import { BorderContainer } from '@daeng-ggu/design-system';

interface Pet {
  petId: number;
  petName: string;
  petImgUrl: string;
}

interface Estimate {
  estimateId: number;
  designerId: number;
  designerName: string;
  designerImageUrl: string;
  estimatePrice: number;
  petId: number;
  petName: string;
  createdAt: string;
}

interface PendingData {
  petId: number;
  desiredService: string;
  isVisitRequired: boolean;
  createdAt: string;
  petList: Pet[];
  estimateList: Estimate[];
}

interface PendingRequestProps {
  data: PendingData;
}

const PendingRequest: React.FC<PendingRequestProps> = ({ data }) => {
  return (
    <div className='flex flex-col items-center'>
      <h2 className='mb-4 text-2xl font-bold'>견적서받는 중</h2>

      {data.petList.length > 0 ? (
        <div className='mb-6 w-full'>
          <h3 className='mb-2 text-xl font-semibold'>반려동물 목록</h3>
          <div>
            <ul className='w-full'>
              {data.petList.map((pet) => (
                <li key={pet.petId}>
                  <div className='flex items-center border-b border-gray-300 p-4'>
                    <img
                      src={pet.petImgUrl}
                      alt={pet.petName || '반려동물 이미지'}
                      className='mr-4 h-16 w-16 rounded-full'
                    />
                    <div>
                      <h4 className='text-lg font-medium'>{pet.petName || '이름 없는 반려동물'}</h4>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p>등록된 반려동물이 없습니다.</p>
      )}

      {data.estimateList.length > 0 ? (
        <div>
          <div className='w-full'>
            <h3 className='mb-2 text-xl font-semibold'>견적 목록</h3>
            <BorderContainer>
              <ul className='w-full bg-secondary'>
                {data.estimateList.map((estimate, index) => (
                  <li key={estimate.estimateId}>
                    <div
                      className={`mx-auto flex rounded-[8px] bg-white ${
                        index !== data.estimateList.length - 1 ? 'mb-4' : ''
                      }`}
                    >
                      <div className='mx-auto flex min-w-[240px] items-center bg-white p-4'>
                        <img
                          src={estimate.designerImageUrl}
                          alt={estimate.designerName || '디자이너 이미지'}
                          className='mr-4 h-16 w-16 rounded-full'
                        />
                        <div>
                          <h3 className='text-xl font-semibold'>{estimate.designerName || '이름 없는 디자이너'}</h3>
                          <p>견적 가격: {estimate.estimatePrice.toLocaleString()}원</p>
                          <p>펫 이름: {estimate.petName || '알 수 없음'}</p>
                          <p>견적 생성일: {estimate.createdAt}</p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </BorderContainer>
          </div>
        </div>
      ) : (
        <p>현재 요청중인 견적이 없습니다.</p>
      )}
    </div>
  );
};

export default PendingRequest;
