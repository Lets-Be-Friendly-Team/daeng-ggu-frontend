// src/components/RequestReview.tsx

import { useState } from 'react';
import { BorderContainer, BulbIcon, PageContainer } from '@daeng-ggu/design-system';
import { RadioGroup, RadioGroupItem } from '@daeng-ggu/design-system';

import editIcon from '@/assets/edit.svg';
import ProfileViewer from '@/pages/Request/ProfileViewer';
import { isDesignerProfileData, RequestReviewProps, StepData } from '@/types/requestAndStatusTypes';

import formatDateTime from './../../../../../node_modules/@daeng-ggu/design-system/utils/fomDateTime';

const defaultStepData: StepData[] = [
  {
    step: 3,
    title: '원하시는 서비스를 선택 해주세요',
    options: ['목욕', '풀케어 서비스', '전체미용', '부분미용', '위생미용', '스파'],
  },
  {
    step: 4,
    title: '마지막 미용시기를 알려주세요',
    options: ['첫 미용', '1달 내외', '2달 내외', '3달 내외', '잘 모르겠어요'],
  },
  {
    step: 5,
    title: '지역을 선택 해주세요',
    options: ['지역 선택하기', '무관'],
  },
  {
    step: 6,
    title: '날짜를 선택 해주세요',
    options: ['날짜 선택하기', '무관'],
  },
  {
    step: 7,
    title: '반려견 픽업 여부를 확인 해주세요',
    options: ['네', '아니오'],
  },
  {
    step: 8,
    title: '모니터링 여부를 확인 해주세요',
    options: ['네', '아니오'],
  },
  {
    step: 9,
    title: '서비스 관련 문의사항을 남겨주세요',
    options: ['따로 논의할게요', '지금 작성할게요'],
  },
];

/**
 * 비용계산 함수는 그대로 유지
 */
// const calculateCosts = (
//   majorBreed: string | undefined,
//   baseAmount: number,
// ): { movingCost: string; totalAmount: string } => {
//   let movingCost = 0;
//
//   switch (majorBreed) {
//     case '특수견':
//       movingCost = 70000;
//       break;
//     case '대형견':
//       movingCost = 50000;
//       break;
//     case '중형견':
//       movingCost = 40000;
//       break;
//     case '소형견':
//       movingCost = 20000;
//       break;
//     default:
//       movingCost = 0;
//   }
//
//   const totalAmount = baseAmount + movingCost;
//
//   return {
//     movingCost: movingCost.toLocaleString() + '원',
//     totalAmount: totalAmount.toLocaleString() + '원',
//   };
// };

const RequestReview = ({
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

    if (step === 9 && selectedOptions[step] === '지금 작성하기') {
      return userInput || '작성된 내용이 없습니다.';
    }

    return selectedOptions[step] || '선택되지 않음';
  };

  return (
    <PageContainer>
      <div className='m-auto mt-4 w-full'>
        <div className='flex flex-col items-center'>
          <div className='mb-16 w-full'>
            {selectedProfile ? (
              <div className='mb-6'>
                <ProfileViewer profile={selectedProfile} />
              </div>
            ) : (
              <p className='text-red-500'>선택된 반려견이 없습니다.</p>
            )}

            <div className='mb-4 rounded-md px-6 py-10 shadow'>
              <div className='mb-10 flex items-start gap-2'>
                <BulbIcon className='w-[2rem]' color='fill-gray-800' />
                <h2 className='text-center text-sub_h1 font-semibold text-gray-700'>요청 상세</h2>
              </div>
              <ul className=''>
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
                          className={`flex items-center gap-2`}
                          style={{
                            minHeight: '40px',
                          }}
                        >
                          {/* 날짜 포맷 변경 */}
                          <p className='text-sub_h3 text-gray-700'>
                            {step === 6 ? formatDateTime(getDisplayValue(step)) : getDisplayValue(step)}
                          </p>
                          {![5, 6, 9].includes(step) &&
                            (mode !== 'detail' ? (
                              <button className='p-2' onClick={() => handleEdit(step)}>
                                <img src={editIcon} alt='Edit' className='h-6 w-6' style={{ cursor: 'pointer' }} />
                              </button>
                            ) : (
                              <div
                                className='h-6 w-6'
                                style={{
                                  visibility: 'hidden',
                                }}
                              />
                            ))}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              {pageMode === 'user' && (
                <>
                  <div className='rounded-md px-6 py-10 shadow'>
                    <div className='mt-6 items-start'>
                      <h2 className='py-6 text-center text-sub_h1 text-gray-700'>댕송지 정보</h2>
                    </div>
                    <div className='flex-col p-2 text-gray-800'>
                      <p className='text-sub_h3'>{selectedProfile ? selectedProfile.customerName : '정보 없음'}</p>
                      <p className='text-body3 font-bold text-gray-800'>
                        {selectedProfile ? selectedProfile.phone : '정보 없음'}
                      </p>
                      <p className='pt-1 text-caption'>{selectedProfile ? selectedProfile.address : '정보 없음'}</p>
                    </div>
                  </div>

                  {/*{mode == 'detail' && (*/}
                  {/*  <>*/}
                  {/*    <div className='mt-6 items-start'>*/}
                  {/*      <h2 className='mb-4 text-h3 font-bold text-gray-800'>결제 정보</h2>*/}
                  {/*    </div>*/}
                  {/*    <BorderContainer innerPadding='p-3'>*/}
                  {/*      <div className='flex-col items-start p-2 text-gray-800'>*/}
                  {/*        <div className='mb-2 flex justify-between'>*/}
                  {/*          <span>댕동비({selectedProfile ? selectedProfile.majorBreed : '정보 없음'})</span>*/}
                  {/*          <span>{movingCost}</span>*/}
                  {/*        </div>*/}
                  {/*        <div className='mt-2 flex justify-between border-t pt-2 text-lg font-bold'>*/}
                  {/*          <span>결제 금액</span>*/}
                  {/*          <span>{totalAmount}</span>*/}
                  {/*        </div>*/}
                  {/*      </div>*/}
                  {/*    </BorderContainer>*/}
                  {/*  </>*/}
                  {/*)}*/}
                </>
              )}
            </div>
            {pageMode === 'designer' && selectedProfile && (
              <>
                <div className='rounded-md px-6 py-10 shadow'>
                  {/* <h2 className='py-6 text-center text-sub_h1 text-gray-700'>댕송지 정보</h2> */}
                  <div className='mb-10 flex items-start gap-2'>
                    <BulbIcon className='w-[2rem]' color='fill-gray-800' />
                    <h2 className='text-center text-sub_h1 font-semibold text-gray-700'>댕송지 정보</h2>
                  </div>
                  <div className='flex flex-col items-start gap-3 text-gray-800'>
                    <p className='text-sub_h2 font-bold'>{selectedProfile.customerName || '정보 없음'}</p>
                    <p className='text-body3 font-bold text-gray-800'>{selectedProfile.phone || '정보 없음'}</p>
                    <p className='pt-1 text-caption'>{selectedProfile.address || '정보 없음'}</p>
                  </div>
                </div>
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
    </PageContainer>
  );
};

export default RequestReview;
