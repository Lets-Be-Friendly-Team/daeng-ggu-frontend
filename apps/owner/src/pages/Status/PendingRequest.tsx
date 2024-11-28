import React, { useState } from 'react';
import { Avatar, BorderContainer } from '@daeng-ggu/design-system';

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

interface PendingPet {
  petId: number;
  petName: string;
  petImgUrl: string;
  desiredService: string;
  isVisitRequired: boolean;
  createdat: string;
  estimateList: Estimate[];
}

interface PendingRequestProps {
  data: PendingPet[];
}

const PendingRequest: React.FC<PendingRequestProps> = ({ data }) => {
  const [activePetIndex, setActivePetIndex] = useState(0);

  const handlePetClick = (index: number) => {
    setActivePetIndex(index);
  };

  const activePet = data[activePetIndex];

  return (
    <div className='mx-auto flex max-w-[360px] flex-col items-center'>
      {data.length > 0 ? (
        <div className='mx-[10px] mb-6 w-full'>
          <div>
            <div className='flex space-x-4 overflow-x-auto'>
              {data.map((pet, index) => (
                <Avatar
                  key={pet.petId}
                  imageUrl={pet.petImgUrl}
                  name={pet.petName || '이름 없음'}
                  mode='avatar'
                  isActive={activePetIndex === index}
                  onClick={() => handlePetClick(index)}
                />
              ))}
              <Avatar
                mode='request'
                onClick={() => {
                  /* Handle new request */
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <p>등록된 반려동물이 없습니다.</p>
      )}

      {activePet ? (
        <div className='w-full max-w-[300px]'>
          <div className='mb-6'>
            <BorderContainer>
              <div className='flex justify-center p-4'>
                <Avatar imageUrl={activePet.petImgUrl} mode='avatar' />
                <div className='ml-4'>
                  <h3 className='text-xl font-semibold'>{activePet.petName || '이름 없음'}</h3>
                  <p>서비스: {activePet.desiredService || '알 수 없음'}</p>
                  <p>방문 필요 여부: {activePet.isVisitRequired ? '예' : '아니오'}</p>
                  <p>요청일: {activePet.createdat}</p>
                </div>
              </div>
            </BorderContainer>
          </div>
          {activePet.estimateList.length > 0 ? (
            <div className='h-full w-full'>
              <BorderContainer>
                <ul className='w-full bg-secondary'>
                  {activePet.estimateList.map((estimate, index) => (
                    <li key={estimate.estimateId}>
                      <div
                        className={`mx-auto flex max-h-[84px] rounded-[8px] bg-white ${
                          index !== activePet.estimateList.length - 1 ? 'mb-4' : ''
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
                            <p>견적 생성일: {estimate.createdAt}</p>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </BorderContainer>
            </div>
          ) : (
            <p>현재 요청중인 견적이 없습니다.</p>
          )}
        </div>
      ) : (
        <p>선택된 반려동물이 없습니다.</p>
      )}
    </div>
  );
};

export default PendingRequest;
