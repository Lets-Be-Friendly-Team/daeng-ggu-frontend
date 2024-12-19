// src/components/DirectRequestReview.tsx

import { useState } from 'react';
import { BorderContainer, BulbIcon, PageContainer } from '@daeng-ggu/design-system';
import { RadioGroup, RadioGroupItem } from '@daeng-ggu/design-system';

import editIcon from '@/assets/edit.svg';
import ProfileViewer from '@/pages/Request/ProfileViewer';
import useDirectReservationStoreOne from '@/stores/useReservationStoreOne'; // Corrected import path
import { isDesignerProfileData, RequestReviewProps, StepData } from '@/types/requestAndStatusTypes';

const defaultStepData: StepData[] = [
  {
    step: 3,
    title: '원하시는 서비스를 선택 해주세요.',
    options: ['목욕', '풀케어 서비스', '전체미용', '부분미용', '위생미용', '스파'],
  },
  {
    step: 4,
    title: '마지막 미용시기를 알려주세요.',
    options: ['첫 미용', '1달 내외', '2달 내외', '3달 내외', '잘 모르겠어요.'],
  },
  {
    step: 6,
    title: '반려견 픽업 여부를 확인 해주세요.',
    options: ['네', '아니오'],
  },
  {
    step: 7,
    title: '모니터링 여부를 확인 해주세요.',
    options: ['네', '아니오'],
  },
  {
    step: 8,
    title: '서비스 관련 문의사항을 남겨주세요.',
    options: ['따로 논의할께요', '지금 작성할게요.'],
  },
  {
    step: 9,
    title: '날짜를 선택 해주세요.',
    options: ['날짜 선택하기', '무관'],
  },
];

const DirectRequestReview = ({
  selectedPet,
  selectedOptions,
  profileData,
  stepData = defaultStepData,
  onOptionChange,
  onEnableDynamicHeight,
  onDisableDynamicHeight,
  userInput,
  mode = 'default',
  pageMode = 'designer',
}: RequestReviewProps) => {
  const [editingStep, setEditingStep] = useState<number | null>(null);
  const selectedProfile = profileData.find((profile) => profile.petId === selectedPet);

  console.log(selectedOptions);
  // const baseAmount = 0;
  // const { movingCost, totalAmount } = calculateCosts(selectedProfile?.majorBreed, baseAmount);

  const handleEdit = (step: number) => {
    if (mode === 'detail') return;
    setEditingStep(step);
    if (onEnableDynamicHeight) {
      onEnableDynamicHeight();
    }
  };

  const handleCancelEdit = () => {
    setEditingStep(null);
    if (onDisableDynamicHeight) {
      onDisableDynamicHeight();
    }
  };

  const getDisplayValue = (step: number): string => {
    if (pageMode === 'designer' && selectedProfile && isDesignerProfileData(selectedProfile)) {
      if (step === 3) {
        return selectedProfile.desiredServiceCode || '정보 없음';
      }
    }

    if (step === 9 && selectedOptions[step] === '지금 작성할게요.') {
      return userInput || '작성된 내용이 없습니다.';
    }

    return selectedOptions[step] || '선택되지 않음';
  };

  // Extract fees from the Zustand store
  const deliveryFee = useDirectReservationStoreOne((state) => state.deliveryFee) || 0;
  const groomingFee = useDirectReservationStoreOne((state) => state.groomingFee) || 0;
  const monitoringFee = useDirectReservationStoreOne((state) => state.monitoringFee) || 0;
  const totalPayment = useDirectReservationStoreOne((state) => state.totalPayment) || 0;

  // Format the fees for display
  const formattedDeliveryFee = deliveryFee.toLocaleString() + '원';
  const formattedGroomingFee = groomingFee.toLocaleString() + '원';
  const formattedMonitoringFee = monitoringFee.toLocaleString() + '원';
  const formattedTotalPayment = totalPayment.toLocaleString() + '원';

  return (
    <PageContainer>
      <div className='m-auto w-full pb-32'>
        <div className='items-start'>
          <h2 className='mb-4 text-h3 font-bold text-gray-800'>견적서 요약</h2>
        </div>
        <div className='flex flex-col items-center'>
          <div className='mb-16 w-full'>
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
                <h2 className='mb-4 text-h3 font-bold text-gray-800'>요청 상세</h2>
              </div>
              <BorderContainer innerPadding='py-6 pl-2'>
                <ul className='ml-5 mt-4'>
                  {stepData.map(({ step, title, options }) => (
                    <li key={step} className='flex flex-col gap-2 pb-5'>
                      <div>
                        <p className='text-caption font-bold text-gray-700'>{title}</p>
                        {editingStep === step ? (
                          <div className='mt-1'>
                            <RadioGroup
                              value={selectedOptions[step] || ''}
                              onValueChange={(value: string) => {
                                if (onOptionChange) {
                                  onOptionChange(step, value);
                                }
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
                          <span
                            className='flex items-center gap-2' // Maintain consistent spacing
                            style={{
                              minHeight: '40px', // Adjust this height as needed to match the button's height
                            }}
                          >
                            <p className='text-sub_h3 font-bold text-gray-800'>{getDisplayValue(step)}</p>
                            {![5, 8].includes(step) &&
                              (mode !== 'detail' ? (
                                <button className='p-2' onClick={() => handleEdit(step)}>
                                  <img src={editIcon} alt='Edit' className='h-6 w-6' style={{ cursor: 'pointer' }} />
                                </button>
                              ) : (
                                <div
                                  className='h-6 w-6'
                                  style={{
                                    visibility: 'hidden', // Ensures an invisible placeholder
                                  }}
                                />
                              ))}
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </BorderContainer>

              {pageMode === 'user' && (
                <>
                  <div className='mb-16'>
                    <div className='mt-6 items-start'>
                      <h2 className='mb-4 text-h3 font-bold text-gray-800'>댕송지 정보</h2>
                    </div>
                    <BorderContainer innerPadding='p-3'>
                      <div className='flex-col items-start p-2 text-gray-800'>
                        <p className='text-sub_h2 font-bold'>
                          {selectedProfile ? selectedProfile.customerName : '정보 없음'}
                        </p>
                        <p className='text-body3 font-bold text-gray-800'>
                          {selectedProfile ? selectedProfile.phone : '정보 없음'}
                        </p>
                        <p className='pt-1 text-caption'>{selectedProfile ? selectedProfile.address : '정보 없음'}</p>
                      </div>
                    </BorderContainer>
                  </div>

                  {/* Uncomment and adjust as needed */}
                  {/*{mode == 'detail' && (
                    <>
                      <div className='mt-6 items-start'>
                        <h2 className='mb-4 text-h3 font-bold text-gray-800'>결제 정보</h2>
                      </div>
                      <BorderContainer innerPadding='p-3'>
                        <div className='flex-col items-start p-2 text-gray-800'>
                          <div className='mb-2 flex justify-between'>
                            <span>댕동비({selectedProfile ? selectedProfile.majorBreed : '정보 없음'})</span>
                            <span>{formattedDeliveryFee}</span>
                          </div>
                          <div className='mt-2 flex justify-between border-t pt-2 text-lg font-bold'>
                            <span>결제 금액</span>
                            <span>{formattedTotalPayment}</span>
                          </div>
                        </div>
                      </BorderContainer>
                    </>
                  )}*/}
                </>
              )}

              {pageMode === 'designer' && selectedProfile && (
                <>
                  <div className='mb-10 flex items-start gap-2'>
                    <BulbIcon className='w-[2rem]' color='fill-gray-800' />
                    <h2 className='text-center text-sub_h1 font-semibold text-gray-700'>댕송지 정보</h2>
                  </div>
                  <div className='mb-28'>
                    <BorderContainer innerPadding='p-3'>
                      <div className='flex-col items-start p-2 text-gray-800'>
                        <p className='text-sub_h2 font-bold'>{selectedProfile.customerName || '정보 없음'}</p>
                        <p className='text-body3 font-bold text-gray-800'>{selectedProfile.phone || '정보 없음'}</p>
                        <p className='pt-1 text-caption'>{selectedProfile.address || '정보 없음'}</p>
                      </div>
                    </BorderContainer>
                  </div>
                  <div className='mt-6 items-start'>
                    <h2 className='mb-4 text-h3 font-bold text-gray-800'>결제 정보</h2>
                  </div>
                  <BorderContainer innerPadding='p-3'>
                    <div className='flex-col items-start p-2 text-gray-800'>
                      {/* Delivery Fee */}
                      <div className='mb-2 flex justify-between'>
                        <span>
                          댕동비
                          {selectedProfile ? `(${selectedProfile.majorBreed})` : '(정보 없음)'}
                        </span>
                        <span>{formattedDeliveryFee}</span>
                      </div>
                      {/* Grooming Fee */}
                      <div className='mb-2 flex justify-between'>
                        <span>미용비</span>
                        <span>{formattedGroomingFee}</span>
                      </div>
                      {/* Monitoring Fee */}
                      <div className='mb-2 flex justify-between'>
                        <span>모니터링비</span>
                        <span>{formattedMonitoringFee}</span>
                      </div>
                      {/* Total Payment */}
                      <div className='mt-2 flex justify-between border-t pt-2 text-lg font-bold'>
                        <span>결제 금액</span>
                        <span>{formattedTotalPayment}</span>
                      </div>
                    </div>
                  </BorderContainer>
                </>
              )}

              {pageMode === 'reservation' && (
                <>
                  <div className='mt-6 items-start'>
                    <h2 className='mb-4 text-h3 font-bold text-gray-800'>예약 정보</h2>
                  </div>
                  <BorderContainer innerPadding='p-3'>
                    <div className='flex-col items-start p-2 text-gray-800'>
                      <p className='text-sub_h2 font-bold'>예약 상세 정보가 아직 없습니다.</p>
                    </div>
                  </BorderContainer>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default DirectRequestReview;
