import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, BorderContainer, RightIcon } from '@daeng-ggu/design-system';

import EmptyState from '@/pages/Status/EmptyState.tsx';
import RequestContainer from '@/pages/Status/RequestContainer.tsx';

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
  desiredService?: string;
  isVisitRequired: boolean;
  createdAt: string;
  majorBreedCode: string;
  estimateList: Estimate[];
}

interface PendingRequestProps {
  data?: PendingPet[];
}

const PendingRequest = ({ data = [] }: PendingRequestProps) => {
  const [activePetIndex, setActivePetIndex] = useState(0);
  const navigate = useNavigate();

  const handlePetClick = (index: number) => {
    setActivePetIndex(index);
  };

  const handleRequestDelete = (): void => {
    console.log('closed');
  };

  const activePet = data[activePetIndex];

  const showEmptyState = !activePet || !activePet.estimateList || activePet.estimateList.length === 0;

  const emptyStateTitle = !activePet ? '아직 견적 요청 보낸것이 없어요!' : '견적서 제안이 아직 없네요!';

  const emptyStateButtonText = !activePet ? '견적요청하러 가기' : '새로고침하기';

  const emptyStateOnClick = !activePet
    ? () => navigate('/test/request', { state: { from: '/test' } })
    : () => window.location.reload();

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
    <div className='mx-auto flex flex-col items-center px-6'>
      <div className='mx-[10px] mb-6 w-full'>
        <div>
          <div className='flex space-x-4 overflow-x-auto'>
            {data.length > 0 &&
              data.map((pet, index) => (
                <Avatar
                  key={pet.petId}
                  imageUrl={pet.petImgUrl}
                  name={pet.petName || '이름 없음'}
                  mode='avatar'
                  isActive={activePetIndex === index}
                  onClick={() => handlePetClick(index)}
                />
              ))}
            <Avatar mode='request' onClick={() => navigate('/test/request', { state: { from: '/test' } })} />
          </div>
        </div>
      </div>

      {activePet && (
        <div className='w-full max-w-[300px]'>
          <div className='mb-6'>
            <RequestContainer
              handleRequestDelete={handleRequestDelete}
              titleText='견적 요청중'
              mode='request'
              imageUrl={activePet.petImgUrl}
            >
              <p className='text-gray-800'>{formatDate(activePet.createdAt)} 견적요청</p>
              <h3 className='text-sub_h3 font-semibold'>{activePet.petName || '이름 없음'}</h3>
              <p className='text-iconCaption'>
                <span className='mr-1 rounded-[4px] border border-primary px-2 py-[0.8px] text-primary'>서비스</span>
                {activePet.desiredService ||
                  '알 수 없음'}/{getDeliveryStatus(activePet.majorBreedCode)}
              </p>
              <p>방문 필요 여부: {activePet.isVisitRequired ? '예' : '아니오'}</p>
            </RequestContainer>
          </div>

          {activePet.estimateList && activePet.estimateList.length > 0 && (
            <div className='h-full w-full'>
              <BorderContainer>
                <ul className='w-full bg-secondary'>
                  {activePet.estimateList.map((estimate, index) => (
                    <li key={estimate.estimateId} className='relative'>
                      <div
                        className={`mx-auto flex min-h-[90px] rounded-[8px] bg-white ${
                          index !== activePet.estimateList.length - 1 ? 'mb-4' : ''
                        }`}
                      >
                        {/*<button onClick={handleEstimateDelete} className='absolute right-4 top-4'>*/}
                        {/*  <CloseIcon className='h-6 w-6 cursor-pointer text-gray-500 hover:text-gray-700' />*/}
                        {/*</button>*/}

                        <div className='mx-auto flex min-w-[240px] items-center bg-white p-4'>
                          <Avatar
                            mode='designerCard'
                            imageUrl={estimate.designerImageUrl}
                            name={estimate.designerName}
                            containerClassName='mr-4 h-[70px] w-[70px]'
                          />
                          <div>
                            <p className='text-gray-800'>{formatDate(estimate.createdAt)} 견적요청</p>
                            <p className='text-sub_h3 font-semibold'>{estimate.designerName || '이름 없는 디자이너'}</p>
                            <p className='text-sub_h2 font-bold'>{estimate.estimatePrice.toLocaleString()}원</p>
                            <p className='text-sub_h3 font-bold'>미용고객: {activePet.petName}</p>
                            <button className='flex items-center text-iconCaption'>
                              <p className='flex items-center'>
                                <span>상세보기</span>
                                <span>
                                  <RightIcon className='h-[9px] w-[8px] pb-[1px]' />
                                </span>
                              </p>
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </BorderContainer>
            </div>
          )}
        </div>
      )}

      {showEmptyState && (
        <EmptyState title={emptyStateTitle} buttonText={emptyStateButtonText} onClick={emptyStateOnClick} />
      )}
    </div>
  );
};

export default PendingRequest;
