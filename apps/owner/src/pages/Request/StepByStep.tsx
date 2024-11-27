// components/StepByStep.tsx

import React, { useEffect, useRef, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Progress, RadioGroup, RadioGroupItem, RegionSelector, TypeTwoButton, TypeOneButton} from '@daeng-ggu/design-system';

import ProfileButton from '@/pages/Request/ProfileButton';
import ProfileViewer from '@/pages/Request/ProfileViewer'; // Import the new component
import { useStepStore } from '@/stores/useStepStore';

import '@/styles/sequenceAnimation.css';
import RequestReview from '@/pages/Request/RequestReview';

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
  dogType: string;
  isRequested: boolean;
  specialNotes?: string;
  customerName: string;
  phone: string;
  address: string;
}

interface StepByStepProps {
  stepCount: number;
  profileData: ProfileData[];
  onProfileSelect: (_petId: number) => void;
}

const StepByStep: React.FC<StepByStepProps> = ({ stepCount, profileData = [], onProfileSelect }) => {
  const { currentStep, nextStep, prevStep, setDirection, direction } = useStepStore();
  const [selectedPet, setSelectedPet] = useState<number | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: string }>({});
  const [containerHeight, setContainerHeight] = useState<number | null>(null);
  const [isDynamicHeight, setIsDynamicHeight] = useState<boolean>(false); // New state for dynamic height

  const [showRegionSelector, setShowRegionSelector] = useState<boolean>(false);
  const [regionSelection, setRegionSelection] = useState<{ area: string; subArea: string }>({
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

  const handlePrevStep = () => {
    if (currentStep === 5 && showRegionSelector) {
      setShowRegionSelector(false);
      setRegionSelection({ area: '', subArea: '' });
      setDirection('backward');
      setTimeout(() => prevStep(), 0);
    } else {
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

  const handleEnableDynamicHeight = () => {
    setIsDynamicHeight(true);
  };

  const handleDisableDynamicHeight = () => {
    setIsDynamicHeight(false);
  };

  const stepData: StepData[] = [
    {
      step: 3,
      title: '원하시는 서비스를 선택 해주세요.',
      options: ['목욕', '풀케어 서비스','전체미용', '부분미용', '위생미용', '스파'],
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
      <div className="flex flex-col items-center pt-10">
        <div className='rounded-[8px] border border-primary'>
          <ProfileViewer
            profile={
              petProfile || {
                petId: 0,
                petName: 'Unknown',
                petImgUrl: '',
                petImgName: 'No Image',
                breed: 'Unknown',
                birthDate: 'N/A',
                gender: 'N/A',
                isNeutered: false,
                weight: 0,
                dogType: '',
                isRequested: false,
                specialNotes: '',
                customerName: '',
                phone: '',
                address: '',
              }
            }
          />
        </div>
        <TypeTwoButton
          text="프로필 수정하기"
          color="bg-secondary"
          onClick={() => {
            if (window.confirm('프로필을 수정하면 견적서를 다시 요청해야 합니다. 진행하시겠습니까?')) {
              console.log('Profile editing confirmed');
            } else {
              console.log('Profile editing canceled');
            }
          }}
        />

        <TypeTwoButton text='다음 단계로 가기' color='bg-secondary' onClick={handleNextStep} />
      </div>
    );
  };

  const renderOtherSteps = () => {
    if (currentStep === 10) {
      return (
        <RequestReview
          selectedPet={selectedPet}
          selectedOptions={{
            ...selectedOptions,
            5: selectedOptions[5] === '무관' ? '무관' : regionSelection ? `${regionSelection.area}, ${regionSelection.subArea}` : '지역 선택하기',
          }}
          profileData={profileData}
          stepData={stepData}
          onOptionChange={(step, newOption) => {
            setSelectedOptions((prev) => ({
              ...prev,
              [step]: newOption,
            }));
          }}
          onEnableDynamicHeight={handleEnableDynamicHeight} // Pass the callback
          onDisableDynamicHeight={handleDisableDynamicHeight} // Optional: Reset dynamic height
        />
      );
    }

    return (
      <div className='pt-8 text-center'>
        <RadioGroup
          className='flex flex-col items-center gap-4'
          value={selectedOptions[currentStep] || ''}
          onValueChange={(value: string) => {
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
              className={`flex h-auto w-[260px] cursor-pointer flex-col items-start gap-2 rounded-md border p-6 font-bold transition-all duration-300 ease-in-out ${
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
                } else if (currentStep === 9 && option === '지금 작성할게요.') {
                  console.log('hi');
                } else {
                  handleNextStep();
                }
              }}
            >
              <div className='flex items-center gap-2'>
                <RadioGroupItem
                  value={option}
                  size={0.8}
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

              {currentStep === 9 &&
                selectedOptions[currentStep] === '지금 작성할게요.' &&
                option === '지금 작성할게요.' && (
                  <div
                    className='w-full overflow-hidden transition-all duration-300 ease-in-out'
                    style={{
                      height: 'auto',
                    }}
                  >
                    <textarea
                      rows={6}
                      className='scrollbar-hide mt-2 max-h-[160px] min-h-[40px] w-full rounded-md border border-primary p-2 text-gray-700 focus:border-primary focus:outline-none'
                      placeholder='내용을 작성해주세요.'
                    />
                    <TypeTwoButton text='다음 단계로 가기' color='bg-secondary' onClick={handleNextStep} />
                  </div>
                )}
            </div>
          ))}
        </RadioGroup>

        {showRegionSelector && (
          <div>
            <RegionSelector
              onSelectionChange={(selection: { area: string; subArea: string }) => {
                setRegionSelection(selection);
                console.log(`시 ${selection.area}, 구,군 - ${selection.subArea}`);
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
  };

  return (
    <div>
      <div className='flex h-full w-full flex-col items-center justify-center p-4'>
        <Progress
          value={currentStep}
          maxStep={stepCount}
          text={
            currentStep === 1
              ? '미용을 받을 반려견을 선택 해주세요.'
              : currentStep === 2
                ? '반려견 프로필 확인'
                : currentStep === 10
                  ? '예약 확인 해주세요'
                  : currentStepData?.title || ''
          }
        />

        <div
          className='relative mt-6 w-full overflow-hidden transition-all duration-300'
          style={{
            height:
              currentStep === 10
                ? isDynamicHeight
                  ? 'auto'
                  : containerHeight
                    ? `${containerHeight}px`
                    : 'auto'
                : '400px',
          }}
        >
          <TransitionGroup component={null}>
            <CSSTransition
              key={currentStep}
              nodeRef={getNodeRef(currentStep)}
              timeout={500}
              classNames={direction === 'forward' ? 'slide-forward' : 'slide-backward'}
            >
              <div ref={getNodeRef(currentStep)}>
                {currentStep === 1
                  ? renderStepOne()
                  : currentStep === 2
                    ? renderStepTwo()
                    : renderOtherSteps()}
              </div>
            </CSSTransition>
          </TransitionGroup>
        </div>
      </div>
      {currentStep > 1 && (
        <TypeOneButton
          text={currentStep === 10 ? '예약하기' : '이전'}
          onClick={handlePrevStep}
          color="bg-secondary"
        />
      )}
    </div>

          );
        };

export default StepByStep;
