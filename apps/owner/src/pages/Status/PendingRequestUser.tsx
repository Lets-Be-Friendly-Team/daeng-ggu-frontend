import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, BorderContainer, DetailButton, PageContainer } from '@daeng-ggu/design-system';

import EmptyState from '@/pages/Status/EmptyState.tsx';
import RequestContainer from '@/pages/Status/RequestContainer.tsx';
import { Estimate, PendingPet } from '@/types/requestAndStatusTypes';

interface PendingRequestUserProps {
  data: PendingPet[];
}

const PendingRequestUser = ({ data }: PendingRequestUserProps) => {
  const navigate = useNavigate();
  const [activePetIndex, setActivePetIndex] = useState(0);

  const formatDate = (dateString: string): string => {
    const match = dateString.match(/-(\d{2})-(\d{2})/);
    if (match) {
      return `${match[1]}.${match[2]}.`;
    }
    return dateString;
  };

  const handleDetailPage = (item: PendingPet | Estimate) => {
    navigate('/bid/detail', { state: { data: item } });
  };

  const handleDetailDesignerPage = (item: PendingPet | Estimate) => {
    navigate('/bid/detailDesigner', { state: { data: item } });
  };

  const handlePetClick = (index: number) => {
    setActivePetIndex(index);
  };

  const handleRequestDelete = (): void => {
    console.log('closed');
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

  const activePet = data[activePetIndex];
  const estimateEmptyStateTitle = '견적서 제안이 아직 없네요!';
  const estimateEmptyStateButtonText = '새로고침하기';
  const estimateEmptyStateOnClick = () => window.location.reload();

  return (
    <PageContainer>
      <div className='mx-auto flex flex-col items-center'>
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
                key='request-avatar'
                mode='request'
                onClick={() => navigate('/bid/request', { state: { from: '/bid' } })}
              />
            </div>
          </div>
        </div>

        <div className='w-full'>
          <div className='mb-6'>
            <RequestContainer
              handleRequestDelete={handleRequestDelete}
              titleText='견적 요청중'
              mode='request'
              imageUrl={activePet.petImgUrl}
            >
              <p className='pb-2 text-gray-800'>{formatDate(activePet.createdAt)} 견적요청</p>
              <h3 className='pb-2 text-sub_h3 font-semibold'>{activePet.petName || '이름 없음'}</h3>
              <div className='text-iconCaption'>
                <div className='flex'>
                  <div className='mr-2 flex min-w-[50px] flex-col'>
                    <div>
                      <p className='mr-1 h-[16px] min-w-[44px] rounded-[4px] border border-primary px-2 py-[0.8px] text-primary'>
                        서비스
                      </p>
                    </div>
                    <div className='mt-2'>
                      <DetailButton text='상세보기' onClick={() => handleDetailPage(activePet)} />
                    </div>
                  </div>
                  <div>
                    <p>
                      {activePet.desiredServiceCode || '알 수 없음'}/{getDeliveryStatus(activePet.majorBreedCode)}
                    </p>
                  </div>
                </div>
              </div>
            </RequestContainer>
          </div>

          {activePet.estimateList && activePet.estimateList.length > 0 ? (
            <div className='h-full w-full'>
              <BorderContainer>
                <ul className='w-full bg-secondary'>
                  {activePet.estimateList.map((estimate, index) => (
                    <li key={estimate.estimateId} className='relative w-full'>
                      <div
                        className={`mx-auto flex min-h-[90px] w-full rounded-[8px] bg-white ${
                          index !== activePet.estimateList.length - 1 ? 'mb-4' : ''
                        }`}
                      >
                        <div className='flex items-center bg-white px-[15px] py-4'>
                          <Avatar
                            mode='designerCard'
                            imageUrl={estimate.designerImageUrl}
                            name={estimate.designerName}
                            containerClassName='mr-8 h-[70px] w-[70px]'
                          />
                          <div>
                            <p className='text-gray-800'>{formatDate(estimate.createdAt)} 견적요청</p>
                            <p className='text-sub_h3 font-semibold'>{estimate.designerName || '이름 없는 디자이너'}</p>
                            <p className='text-sub_h2 font-bold'>{estimate.estimatePrice.toLocaleString()}원</p>
                            <p className='pb-1 pt-1 text-sub_h3 font-semibold'>미용고객: {activePet.petName}</p>
                            <DetailButton text='상세보기' onClick={() => handleDetailDesignerPage(estimate)} />
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
              title={estimateEmptyStateTitle}
              buttonText={estimateEmptyStateButtonText}
              onClick={estimateEmptyStateOnClick}
            />
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default PendingRequestUser;
