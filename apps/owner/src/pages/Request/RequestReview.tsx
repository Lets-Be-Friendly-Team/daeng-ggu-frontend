// components/RequestReview.tsx

import { useState } from 'react';
import { BorderContainer } from '@daeng-ggu/design-system';
import { RadioGroup, RadioGroupItem } from '@daeng-ggu/design-system';

import editIcon from '@/assets/edit.svg';
import ProfileViewer from '@/pages/Request/ProfileViewer';

interface ProfileData {
  petId: number;
  petName: string;
  petImgUrl: string;
  breed: string;
  birthDate: string;
  gender: string;
  isNeutered: boolean;
  weight: number;
  dogType: string;
  specialNotes?: string;
  customerName: string;
  phone: string;
  address: string;
}

interface StepData {
  step: number;
  title: string;
  options: string[];
}

interface RequestReviewProps {
  selectedPet: number | null;
  selectedOptions: { [key: number]: string };
  profileData: ProfileData[];
  stepData: StepData[];
  onOptionChange: (_step: number, _newOption: string) => void;
  onEnableDynamicHeight: () => void;
  onDisableDynamicHeight?: () => void;
  userInput: string; // Ensure userInput is defined
}

// 비용계산
const calculateCosts = (
  dogType: string | undefined,
  baseAmount: number,
): { movingCost: string; totalAmount: string } => {
  let movingCost = 0;

  switch (dogType) {
    case '특수견':
      movingCost = 70000;
      break;
    case '대형견':
      movingCost = 50000;
      break;
    case '중형견':
      movingCost = 40000;
      break;
    case '소형견':
      movingCost = 20000;
      break;
    default:
      movingCost = 0;
  }

  const totalAmount = baseAmount + movingCost;

  return {
    movingCost: movingCost.toLocaleString() + '원',
    totalAmount: totalAmount.toLocaleString() + '원',
  };
};

const RequestReview = ({
  selectedPet,
  selectedOptions,
  profileData,
  stepData,
  onOptionChange,
  onEnableDynamicHeight,
  onDisableDynamicHeight,
  userInput,
}: RequestReviewProps) => {
  const [editingStep, setEditingStep] = useState<number | null>(null);
  const selectedProfile = profileData.find((profile) => profile.petId === selectedPet);

  const baseAmount = 0;
  const { movingCost, totalAmount } = calculateCosts(selectedProfile?.dogType, baseAmount);

  const handleEdit = (step: number) => {
    setEditingStep(step);
    onEnableDynamicHeight();
  };

  const handleCancelEdit = () => {
    setEditingStep(null);
    if (onDisableDynamicHeight) {
      onDisableDynamicHeight();
    }
  };

  return (
    <div className='m-auto max-w-[320px] pb-20'>
      <div className='items-start'>
        <h2 className='mb-4 text-h3 font-bold text-gray-800'>견적서 요약</h2>
      </div>
      <div className='flex flex-col items-center'>
        <div className='w-full'>
          {selectedProfile ? (
            <div className='mb-6'>
              <BorderContainer innerPadding='p-3'>
                <ProfileViewer profile={selectedProfile} />
              </BorderContainer>
            </div>
          ) : (
            <p className='text-red-500'>선택된 반려견이 없습니다.</p>
          )}

          <div className='mb-6'>
            <div className='items-start'>
              <h2 className='mb-4 text-h3 font-bold text-gray-800'>요청 상세</h2>
            </div>
            <BorderContainer innerPadding='p-3'>
              <ul className='ml-5'>
                {stepData.map(({ step, title, options }) => (
                  <li key={step} className='flex flex-col gap-2 pb-5'>
                    <div>
                      <p className='text-caption font-bold text-gray-700'>{title}</p>
                      {editingStep === step ? (
                        <div className='mt-1'>
                          <RadioGroup
                            value={selectedOptions[step] || ''}
                            onValueChange={(value: string) => {
                              onOptionChange(step, value);
                              setEditingStep(null);
                              if (onDisableDynamicHeight) {
                                onDisableDynamicHeight();
                              }
                            }}
                            className='flex flex-col gap-2'
                          >
                            {options.map((option) => (
                              <label key={option} className='flex cursor-pointer items-center gap-2'>
                                <RadioGroupItem value={option} size={0.5} />
                                <span className='text-sub_h3 font-bold text-gray-800'>{option}</span>
                              </label>
                            ))}
                          </RadioGroup>
                          <button className='mt-2 text-sm text-gray-500 underline' onClick={handleCancelEdit}>
                            취소
                          </button>
                        </div>
                      ) : (
                        <span className='flex items-center'>
                          {step === 9 && selectedOptions[step] === '지금 작성할게요.' ? (
                            <p className='text-sub_h3 font-bold text-gray-800'>
                              {userInput || '작성된 내용이 없습니다.'}
                            </p>
                          ) : (
                            <p className='text-sub_h3 font-bold text-gray-800'>
                              {selectedOptions[step] || '선택되지 않음'}
                            </p>
                          )}
                          {step !== 5 && step !== 9 && (
                            <button className='p-2' onClick={() => handleEdit(step)}>
                              <img src={editIcon} alt='Edit' className='h-6 w-6' style={{ cursor: 'pointer' }} />
                            </button>
                          )}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </BorderContainer>
            <div className='mt-6 items-start'>
              <h2 className='mb-4 text-h3 font-bold text-gray-800'>댕송지 정보</h2>
            </div>
            <BorderContainer innerPadding='p-3'>
              <div className='flex-col items-start p-2 text-gray-800'>
                <p className='text-sub_h2 font-bold'>{selectedProfile ? selectedProfile.customerName : '정보 없음'}</p>
                <p className='text-body3 font-bold text-gray-800'>
                  {selectedProfile ? selectedProfile.phone : '정보 없음'}
                </p>
                <p className='pt-1 text-caption'>{selectedProfile ? selectedProfile.address : '정보 없음'}</p>
              </div>
            </BorderContainer>
            <div className='mt-6 items-start'>
              <h2 className='mb-4 text-h3 font-bold text-gray-800'>결제 정보</h2>
            </div>
            <BorderContainer innerPadding='p-3'>
              <div className='flex-col items-start p-2 text-gray-800'>
                <div className='mb-2 flex justify-between'>
                  <span>댕동비({selectedProfile ? selectedProfile.dogType : '정보 없음'})</span>
                  <span>{movingCost}</span>
                </div>
                <div className='mt-2 flex justify-between border-t pt-2 text-lg font-bold'>
                  <span>결제 금액</span>
                  <span>{totalAmount}</span>
                </div>
              </div>
            </BorderContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestReview;
