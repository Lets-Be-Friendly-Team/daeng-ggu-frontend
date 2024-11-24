import React, { useEffect, useRef, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { Progress } from '@/components/_common/progress.tsx';
import { RadioGroup, RadioGroupItem } from '@/components/_common/radio-group.tsx';
import { useStepStore } from '@/stores/useStepStore';

import ProfileButton from './ProfileButton';

import '@/styles/sequenceAnimation.css';

interface StepData {
  step: number;
  title: string;
  options: string[];
}

interface StepByStepProps {
  stepCount: number;
  profileData: {
    petId: number;
    petName: string;
    petImgUrl: string;
    isRequested: boolean;
  }[];
  onProfileSelect: (_petId: number) => void;
}

const StepByStep: React.FC<StepByStepProps> = ({ stepCount, profileData, onProfileSelect }) => {
  const { currentStep, nextStep, prevStep, setDirection, direction } = useStepStore();
  const [containerHeight, setContainerHeight] = useState<number | null>(null);

  // Use an object to keep track of selected options per step
  const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: string }>({});

  const nodeRefs = useRef<Record<number, React.RefObject<HTMLDivElement>>>({});

  const getNodeRef = (key: number): React.RefObject<HTMLDivElement> => {
    if (!nodeRefs.current[key]) {
      nodeRefs.current[key] = React.createRef<HTMLDivElement>();
    }
    return nodeRefs.current[key];
  };

  const handlePrevStep = () => {
    setDirection('backward');
    setTimeout(() => prevStep(), 0);
  };

  const handleNextStep = () => {
    setDirection('forward');
    setTimeout(() => nextStep(), 0);
  };

  const handleProfileClick = (_petId: number) => {
    onProfileSelect(_petId);
    handleNextStep();
  };

  useEffect(() => {
    const activeRef = nodeRefs.current[currentStep];
    if (activeRef && activeRef.current) {
      setContainerHeight(activeRef.current.offsetHeight);
    }
  }, [currentStep]);

  const stepData: StepData[] = [
    {
      step: 2,
      title: '원하시는 서비스를 선택 해주세요.',
      options: ['목욕', '전체미용', '부분미용', '위생미용', '스파'],
    },
    {
      step: 3,
      title: '마지막 미용시기를 알려주세요.',
      options: ['첫 미용', '1달 내외', '2달내외', '3달내외', '잘 모르겠어요.'],
    },
    {
      step: 4,
      title: '지역을 선택 해주세요.',
      options: ['지역 선택하기', '무관'],
    },
    {
      step: 5,
      title: '날짜를 선택 해주세요.',
      options: ['날짜 선택하기', '무관'],
    },
    {
      step: 6,
      title: '반려견 픽업 여부를 확인 해주세요.',
      options: ['원해요', '괜찮아요'],
    },
    {
      step: 7,
      title: '모니터링 여부를 확인 해주세요.',
      options: ['원해요', '괜찮아요'],
    },
    {
      step: 8,
      title: '서비스 관련 문의사항을 남겨주세요.',
      options: ['따로 논의 할께요', '지금 작성할께요.'],
    },
  ];

  // Fetch current step data
  const currentStepData = stepData.find((data) => data.step === currentStep);

  // Determine the text to display in the Progress component
  let progressText = '';
  if (currentStep === 1) {
    progressText = '미용을 받을 반려견을 선택 해주세요.';
  } else if (currentStepData) {
    progressText = currentStepData.title;
  } else {
    progressText = `Step ${currentStep}`;
  }

  return (
    <div className='flex h-full w-full flex-col items-center justify-center p-4'>
      <Progress value={currentStep} maxStep={stepCount} text={progressText} />

      <div
        className='relative mt-6 w-full overflow-hidden transition-all duration-300'
        style={{ height: containerHeight ? `${containerHeight}px` : 'auto' }}
      >
        <TransitionGroup component={null}>
          <CSSTransition
            key={currentStep}
            nodeRef={getNodeRef(currentStep)}
            timeout={500}
            classNames={direction === 'forward' ? 'slide-forward' : 'slide-backward'}
          >
            <div ref={getNodeRef(currentStep)}>
              {currentStep === 1 ? (
                <div className='flex flex-col items-center pt-10'>
                  <div className='grid grid-cols-2 gap-4'>
                    {profileData.map((profile) => (
                      <ProfileButton
                        key={profile.petId}
                        petName={profile.petName}
                        petImgUrl={profile.petImgUrl}
                        isRequested={profile.isRequested}
                        onClick={() => handleProfileClick(profile.petId)}
                      />
                    ))}
                  </div>
                </div>
              ) : currentStepData ? (
                <div className='pt-8 text-center'>
                  <RadioGroup
                    className='flex flex-col items-center gap-4'
                    value={selectedOptions[currentStep] || ''}
                    onValueChange={(value) => {
                      setSelectedOptions((prev) => ({
                        ...prev,
                        [currentStep]: value,
                      }));
                      handleNextStep();
                    }}
                  >
                    {currentStepData.options.map((option) => (
                      <div
                        key={option}
                        className={`flex h-[48px] w-[260px] cursor-pointer items-center gap-4 rounded-md border p-6 font-bold transition-all duration-300 ease-in-out ${
                          selectedOptions[currentStep] === option ? 'border-primary bg-secondary' : 'border-gray-400'
                        }`}
                        onClick={() => {
                          setSelectedOptions((prev) => ({
                            ...prev,
                            [currentStep]: option,
                          }));
                          handleNextStep();
                        }}
                      >
                        <RadioGroupItem
                          value={option}
                          className='pointer-events-none flex h-[16px] w-[16px] items-center justify-center rounded-full border border-gray-400 text-gray-400 data-[state=checked]:border-primary data-[state=checked]:text-primary'
                        >
                          <span className='h-[6px] w-[6px] rounded-full bg-gray-400 data-[state=checked]:bg-primary' />
                        </RadioGroupItem>
                        <label
                          className={`cursor-pointer text-sub_h2 transition-all duration-300 ease-in-out ${
                            selectedOptions[currentStep] === option ? 'text-primary' : 'text-gray-700'
                          }`}
                        >
                          {option}
                        </label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              ) : (
                <div className='text-center'>
                  <h2 className='mb-4 text-lg font-semibold'>단계 테스트 {currentStep}</h2>
                </div>
              )}
            </div>
          </CSSTransition>
        </TransitionGroup>
      </div>

      <div className='mt-8 flex gap-4'>
        {currentStep > 1 && (
          <button className='rounded bg-gray-300 px-4 py-2' onClick={handlePrevStep}>
            이전
          </button>
        )}
      </div>
    </div>
  );
};

export default StepByStep;
