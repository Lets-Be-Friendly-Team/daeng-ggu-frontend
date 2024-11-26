// pages/Request/RequestReview.tsx

import React, { useState } from 'react';
import ProfileViewer from '@/pages/Request/ProfileViewer';
import { BorderContainer } from '@daeng-ggu/design-system';
import editIcon from '@/assets/edit.svg';
import { RadioGroup, RadioGroupItem } from '@daeng-ggu/design-system';

interface ProfileData {
  petId: number;
  petName: string;
  petImgUrl: string;
  breed: string;
  birthDate: string;
  gender: string;
  isNeutered: boolean;
  weight: number;
  specialNotes?: string;
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
  onOptionChange: (step: number, newOption: string) => void;
  onEnableDynamicHeight: () => void;
  onDisableDynamicHeight?: () => void;
}

const RequestReview: React.FC<RequestReviewProps> = ({
                                                       selectedPet,
                                                       selectedOptions,
                                                       profileData,
                                                       stepData,
                                                       onOptionChange,
                                                       onEnableDynamicHeight,
                                                       onDisableDynamicHeight,
                                                     }) => {
  const [editingStep, setEditingStep] = useState<number | null>(null);
  const selectedProfile = profileData.find((profile) => profile.petId === selectedPet);

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
    <div className='m-auto max-w-[320px]'>
      <div className='items-start'>
        <h2 className='mb-4 text-h3 font-bold text-primary'>견적서 요약</h2>
      </div>
      <div className='flex flex-col items-center'>
        <div className='w-full'>
          {selectedProfile ? (
            <div className='mb-6'>
              <BorderContainer>
                <ProfileViewer profile={selectedProfile} />
              </BorderContainer>
            </div>
          ) : (
            <p className='text-red-500'>선택된 반려견이 없습니다.</p>
          )}

          <div className='mb-6'>
            <div className='items-start'>
              <h2 className='mb-4 text-h3 font-bold text-primary'>요청 상세</h2>
            </div>
            <BorderContainer>
              <div className='flex-col rounded-[8px] bg-white p-3'>
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
                                onOptionChange(step, value); // Update the selected option
                                setEditingStep(null); // Exit edit mode after selection
                                if (onDisableDynamicHeight) {
                                  onDisableDynamicHeight(); // Optionally reset dynamic height after editing
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
                            <button
                              className='mt-2 text-sm text-gray-500 underline'
                              onClick={handleCancelEdit} // Cancel editing
                            >
                              취소
                            </button>
                          </div>
                        ) : (
                          <span className='flex items-center'>
                            <p className='text-sub_h3 font-bold text-gray-800'>
                              {selectedOptions[step] || '선택되지 않음'}
                            </p>
                            {step !== 5 && step !== 9 && (
                              <button className='p-2' onClick={() => handleEdit(step)}>
                                <img src={editIcon} alt='Edit' className='h-4 w-4' style={{ cursor: 'pointer' }} />
                              </button>
                            )}
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </BorderContainer>
          </div>
        </div>
      </div>
      <button
        className='mt-4 rounded bg-blue-500 px-6 py-2 font-bold text-white hover:bg-blue-600'
        onClick={() => alert('예약이 완료되었습니다!')}
      >
        예약 완료
      </button>
    </div>
  );
};

export default RequestReview;
