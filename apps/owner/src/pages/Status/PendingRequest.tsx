import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, BorderContainer, DetailButton } from '@daeng-ggu/design-system';

import EmptyState from '@/pages/Status/EmptyState.tsx';
import RequestContainer from '@/pages/Status/RequestContainer.tsx';

/*
 * 수정해야될 사항
 * 1.boolean에서 스트링 기준으로 조건부 렌더링 생성
 * 2.디자인
 * 3.디자이너 상세페이지 ㅅㅂ
 * **/

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
  lastGroomingDate?: string;
  desiredDate1?: string;
  desiredDate2?: string;
  desiredDate3?: string;
  desiredRegion?: string;
  isMonitoringIncluded: boolean;
  additionalRequest: string;
  createdAt: string;
  majorBreedCode: string;
  estimateList: Estimate[];
  customerName: string;
  phone: string;
  address: string;
  subBreed: string;
  birthDate: string;
  gender: string;
  isNeutered: boolean;
  weight: number;
  majorBreed: string;
  specialNotes: string;
}

interface DesignerRequest {
  requestId: number;
  petId: number;
  petName: string;
  petImageUrl: string;
  desiredServiceCode: string;
  isVisitRequired: boolean;
  createdAt: string;
}

interface PendingRequestProps {
  data: PendingPet[] | DesignerRequest[];
  isDesigner: boolean;
}

const PendingRequest = ({ data, isDesigner }: PendingRequestProps) => {
  const navigate = useNavigate();
  const [activePetIndex, setActivePetIndex] = useState(0);

  const formatDate = (dateString: string): string => {
    const match = dateString.match(/-(\d{2})-(\d{2})/);
    if (match) {
      return `${match[1]}.${match[2]}.`;
    }
    return dateString;
  };

  if (isDesigner) {
    return (
      <div className='mx-auto flex flex-col items-center px-[20px]'>
        {data.length > 0 ? (
          (data as DesignerRequest[]).map((request) => (
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
                        {request.desiredServiceCode}/{request.isVisitRequired ? '방문 필요' : '방문 불필요'}
                      </p>
                      <DetailButton
                        text='상세보기'
                        onClick={() => navigate('/bid/detail', { state: { data: request } })}
                      />
                    </div>
                  </div>
                </div>
              </BorderContainer>
            </div>
          ))
        ) : (
          <EmptyState title='견적 요청이 없습니다.' buttonText='새로고침' onClick={() => window.location.reload()} />
        )}
      </div>
    );
  }

  const activePet = data[activePetIndex] as PendingPet;

  const handlePetClick = (index: number) => {
    setActivePetIndex(index);
  };

  const handleRequestDelete = (): void => {
    console.log('closed');
  };

  const handleDetailPage = (petData: PendingPet) => {
    navigate('/bid/detail', { state: { data: petData } });
  };

  const showEmptyState = !activePet || !activePet.estimateList || activePet.estimateList.length === 0;

  const emptyStateTitle = !activePet ? '아직 견적 요청 보낸것이 없어요!' : '견적서 제안이 아직 없네요!';

  const emptyStateButtonText = !activePet ? '견적요청하러 가기' : '새로고침하기';

  const emptyStateOnClick = !activePet
    ? () => navigate('/bid/request', { state: { from: '/bid' } })
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

  return (
    <div className='mx-auto flex flex-col items-center px-[20px]'>
      {!isDesigner && (
        <div className='mx-[10px] mb-6 w-full'>
          <div>
            <div className='flex space-x-4 overflow-x-auto'>
              {data.length > 0 &&
                (data as PendingPet[]).map((pet, index) => (
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
                key='request-avatar'
                mode='request'
                onClick={() => navigate('/bid/request', { state: { from: '/bid' } })}
              />
            </div>
          </div>
        </div>
      )}

      {activePet && !isDesigner && (
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
              <p className='pb-2 text-iconCaption'>
                <span className='mr-1 rounded-[4px] border border-primary px-2 py-[0.8px] text-primary'>서비스</span>
                {activePet.desiredService ||
                  '알 수 없음'}/{getDeliveryStatus(activePet.majorBreedCode)}
              </p>
              <DetailButton text='상세보기' onClick={() => handleDetailPage(activePet)} />
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
                            <p className='pb-1 text-sub_h3 font-bold'>미용고객: {activePet.petName}</p>
                            <DetailButton text='상세보기' onClick={handleRequestDelete} />
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
