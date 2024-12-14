import { useLocation } from 'react-router-dom';
import { BorderContainer, PageContainer } from '@daeng-ggu/design-system';

import ProfileViewer from '@/pages/RequestPage/ProfileViewer';
import { StepData } from '@/types/designerRequestAndStatusTypes';

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
    step: 5,
    title: '지역을 선택 해주세요.',
    options: ['지역 선택하기', '무관'],
  },
  {
    step: 6,
    title: '날짜를 선택 해주세요.',
    options: ['날짜 선택하기', '무관'],
  },
  {
    step: 7,
    title: '반려견 픽업 여부를 확인 해주세요.',
    options: ['원해요', '괜찮아요'],
  },
  {
    step: 8,
    title: '모니터링 여부를 확인 해주세요.',
    options: ['원해요', '괜찮아요'],
  },
  {
    step: 9,
    title: '서비스 관련 문의사항을 남겨주세요.',
    options: ['따로 논의할께요', '지금 작성할게요.'],
  },
];

const PastRequestReview = () => {
  const { state } = useLocation();
  const {
    petId,
    petName,
    petImageUrl,
    desiredServiceCode,
    lastGroomingDate,
    desiredDate1,
    desiredDate2,
    desiredDate3,
    desiredRegion,
    isVisitRequired,
    isMonitoringIncluded,
    additionalRequest,
  } = state || {};

  const profile = {
    petId,
    petName,
    petImageUrl,
    desiredServiceCode,
    lastGroomingDate,
    desiredDate1,
    desiredDate2,
    desiredDate3,
    desiredRegion,
    isVisitRequired,
    isMonitoringIncluded,
    additionalRequest,
  };

  return (
    <PageContainer>
      <div className='m-auto w-full pb-32'>
        <div className='items-start'>
          <h2 className='mb-4 text-h3 font-bold text-gray-800'>견적서 요약</h2>
        </div>
        <div className='flex flex-col items-center'>
          <div className='mb-16 w-full'>
            <div className='mb-6'>
              <BorderContainer>
                <ProfileViewer profile={profile} />
              </BorderContainer>
            </div>

            <div className='mb-6'>
              <div className='items-start'>
                <h2 className='mb-4 text-h3 font-bold text-gray-800'>요청 상세</h2>
              </div>
              <BorderContainer innerPadding='py-6 pl-2'>
                <ul className='ml-5 mt-4'>
                  {defaultStepData.map(({ step, title }) => {
                    let displayValue = '정보 없음';

                    switch (step) {
                      case 3:
                        displayValue = desiredServiceCode || '정보 없음';
                        break;
                      case 4:
                        displayValue = lastGroomingDate || '정보 없음';
                        break;
                      case 5:
                        displayValue = desiredRegion || '정보 없음';
                        break;
                      case 6:
                        displayValue =
                          [desiredDate1, desiredDate2, desiredDate3].filter(Boolean).join(', ') || '정보 없음';
                        break;
                      case 7:
                        displayValue = isVisitRequired ? '원해요(픽업 필요)' : '괜찮아요(픽업 불필요)';
                        break;
                      case 8:
                        displayValue = isMonitoringIncluded ? '원해요(모니터링 포함)' : '괜찮아요(모니터링 불필요)';
                        break;
                      case 9:
                        displayValue = additionalRequest || '추가 요청 사항 없음';
                        break;
                      default:
                        displayValue = '정보 없음';
                    }

                    return (
                      <li key={step} className='flex flex-col gap-2 pb-5'>
                        <div>
                          <p className='text-caption font-bold text-gray-700'>{title}</p>
                          <span
                            className='flex items-center gap-2'
                            style={{
                              minHeight: '40px',
                            }}
                          >
                            <p className='text-sub_h3 font-bold text-gray-800'>{displayValue}</p>
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </BorderContainer>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default PastRequestReview;
