import React, { useEffect, useRef, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { Progress } from '@/components/_common/progress.tsx';
import { RadioGroup, RadioGroupItem } from '@/components/_common/radio-group.tsx';
import RegionSelector from '@/components/_common/RegionSelector';
import ProfileButton from '@/pages/Request/ProfileButton';
import { useStepStore } from '@/stores/useStepStore';

import '@/styles/sequenceAnimation.css';

interface StepData {
  step: number;
  title: string;
  options: string[];
}

interface ProfileData {
  petId: number;
  petName: string;
  petImgUrl: string;
  petImgName: string;
  breed: string;
  birthDate: string;
  gender: string;
  isNeutered: boolean;
  weight: number;
  isRequested: boolean;
  specialNotes?: string;
}

interface StepByStepProps {
  stepCount: number;
  profileData: ProfileData[];
  onProfileSelect: (_petId: number) => void;
}

const StepByStep: React.FC<StepByStepProps> = ({ stepCount, profileData, onProfileSelect }) => {
  const { currentStep, nextStep, prevStep, setDirection, direction } = useStepStore();
  const [selectedPet, setSelectedPet] = useState<number | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: string }>({});
  const [containerHeight, setContainerHeight] = useState<number | null>(null);

  const [showRegionSelector, setShowRegionSelector] = useState<boolean>(false);
  const [, setRegionSelection] = useState<{ area: string; subArea: string }>({
    area: '',
    subArea: '',
  });

  const nodeRefs = useRef<Record<number, React.RefObject<HTMLDivElement>>>({});
  const neutralButtonRef = useRef<HTMLDivElement | null>(null);

  const getNodeRef = (key: number): React.RefObject<HTMLDivElement> => {
    if (!nodeRefs.current[key]) {
      nodeRefs.current[key] = React.createRef<HTMLDivElement>();
    }
    return nodeRefs.current[key];
  };

  const handleProfileClick = (petId: number) => {
    onProfileSelect(petId);
    setSelectedPet(petId);
    setDirection('forward');
    setTimeout(() => nextStep(), 0);
  };

  const handleNextStep = () => {
    setDirection('forward');
    setTimeout(() => nextStep(), 0);
  };

  // Updated handlePrevStep function
  const handlePrevStep = () => {
    if (currentStep === 5 && showRegionSelector) {
      // Hide the RegionSelector
      setShowRegionSelector(false);
      // Optionally, reset the region selection
      setRegionSelection({ area: '', subArea: '' });
      // Navigate to the previous step
      setDirection('backward');
      setTimeout(() => prevStep(), 0);
    } else {
      // Navigate to the previous step normally
      setDirection('backward');
      setTimeout(() => prevStep(), 0);
    }
  };

  useEffect(() => {
    const activeRef = nodeRefs.current[currentStep];
    if (activeRef && activeRef.current) {
      setContainerHeight(activeRef.current.offsetHeight);
    }
  }, [currentStep, showRegionSelector]);

  const stepData: StepData[] = [
    {
      step: 3,
      title: '원하시는 서비스를 선택 해주세요.',
      options: ['목욕', '전체미용', '부분미용', '위생미용', '스파'],
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
      options: ['따로 논의 할게요', '지금 작성할게요.'],
    },
  ];

  const currentStepData = stepData.find((data) => data.step === currentStep);

  const renderStepOne = () => (
    <div className='flex flex-col items-center pt-10'>
      <h2 className='mb-6 text-lg font-semibold'>미용을 받을 반려견을 선택 해주세요.</h2>
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
  );

  const renderStepTwo = () => {
    const petProfile = profileData.find((profile) => profile.petId === selectedPet);
    return (
      <div className='flex flex-col items-center pt-10'>
        {petProfile ? (
          <>
            <div className='rounded-[8px] border border-primary p-6'>
              <div className='flex items-center'>
                <img
                  src={petProfile.petImgUrl}
                  alt={petProfile.petName}
                  className='mb-4 h-32 w-32 rounded-full border border-gray-300'
                />
                <div className='ml-6 grid grid-cols-2 gap-x-4 gap-y-2'>
                  <p className='text-sm text-gray-600'>
                    이름: <span className='text-primary'>{petProfile.petName}</span>
                  </p>
                  <p className='text-sm text-gray-600'>
                    견종: <span className='text-primary'>{petProfile.breed}</span>
                  </p>
                  <p className='text-sm text-gray-600'>
                    몸무게: <span className='text-primary'>{petProfile.weight}kg</span>
                  </p>
                  <p className='text-sm text-gray-600'>
                    성별: <span className='text-primary'>{petProfile.gender === 'male' ? '수컷' : '암컷'}</span>
                  </p>
                  <p className='text-sm text-gray-600'>
                    중성화 여부: <span className='text-primary'>{petProfile.isNeutered ? '예' : '아니오'}</span>
                  </p>
                  <p className='text-sm text-gray-600'>
                    출생일: <span className='text-primary'>{petProfile.birthDate}</span>
                  </p>
                </div>
              </div>
            </div>

            <button
              className='hover:bg-primary-dark mt-6 h-[48px] w-[260px] rounded border border-primary bg-secondary px-4 py-2 text-primary'
              onClick={() => {
                if (window.confirm('프로필 수정할 경우 다시 견적서를 요청 해야해요. 진행하시겠어요?')) {
                  console.log('Profile editing confirmed');
                } else {
                  console.log('Profile editing canceled');
                }
              }}
            >
              프로필 수정하기
            </button>

            <button
              className='hover:bg-primary-dark mt-6 h-[48px] w-[260px] rounded border border-primary bg-secondary px-4 py-2 text-primary'
              onClick={handleNextStep}
            >
              다음 단계로 가기
            </button>
          </>
        ) : (
          <p>선택한 반려견 정보를 찾을 수 없습니다.</p>
        )}
      </div>
    );
  };

  const renderOtherSteps = () => (
    <div className='pt-8 text-center'>
      <RadioGroup
        className='flex flex-col items-center gap-4'
        value={selectedOptions[currentStep] || ''}
        onValueChange={(value) => {
          setSelectedOptions((prev) => ({
            ...prev,
            [currentStep]: value,
          }));
          if (!(currentStep === 5 && value === '지역 선택하기')) {
            handleNextStep();
          }
        }}
      >
        {currentStepData?.options.map((option) => (
          <div
            key={option}
            ref={option === '무관' && currentStep === 5 ? neutralButtonRef : undefined}
            className={`flex h-[48px] w-[260px] cursor-pointer items-center gap-4 rounded-md border p-6 font-bold transition-all duration-300 ease-in-out ${
              selectedOptions[currentStep] === option ? 'border-primary bg-secondary' : 'border-gray-400'
            } ${option === '무관' && showRegionSelector ? 'pointer-events-none opacity-50' : ''}`}
            onClick={() => {
              setSelectedOptions((prev) => ({
                ...prev,
                [currentStep]: option,
              }));
              if (currentStep === 5 && option === '지역 선택하기') {
                if (neutralButtonRef.current) {
                  neutralButtonRef.current.classList.add('pointer-events-none', 'opacity-50');
                  neutralButtonRef.current.style.display = 'none';
                }
                setShowRegionSelector(true);
              } else {
                handleNextStep();
              }
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

      {showRegionSelector && (
        <div className='mt-4'>
          <RegionSelector
            onSelectionChange={(selection) => {
              setRegionSelection(selection);
              console.log(`Selected Region: Area - ${selection.area}, SubArea - ${selection.subArea}`);
              setShowRegionSelector(false);
              if (neutralButtonRef.current) {
                neutralButtonRef.current.classList.remove('pointer-events-none', 'opacity-50');
              }
              handleNextStep();
            }}
          />
        </div>
      )}
    </div>
  );

  return (
    <div className='flex h-full w-full flex-col items-center justify-center p-4'>
      <Progress
        value={currentStep}
        maxStep={stepCount}
        text={
          currentStep === 1
            ? '미용을 받을 반려견을 선택 해주세요.'
            : currentStep === 2
              ? '반려견 프로필 확인'
              : currentStepData?.title || ''
        }
      />

      <div
        className='relative mt-6 min-h-[400px] w-full overflow-hidden transition-all duration-300'
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
              {currentStep === 1 ? renderStepOne() : currentStep === 2 ? renderStepTwo() : renderOtherSteps()}
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
