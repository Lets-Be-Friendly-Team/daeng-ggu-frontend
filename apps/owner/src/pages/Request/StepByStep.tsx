import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {
  Calendar,
  Header,
  Modal,
  PageContainer,
  Progress,
  RadioGroup,
  RadioGroupItem,
  RegionSelector,
  TextArea,
  TimeSelect,
  TypeOneButton,
  TypeTwoButton,
} from '@daeng-ggu/design-system';
import { useModalStore } from '@daeng-ggu/shared';
import { format } from 'date-fns';

import { GetOwnerPetProfileResponse } from '@/apis/request/getOwnerPetProfile';
import editIcon from '@/assets/edit.svg';
import ROUTES from '@/constants/routes';
import useCreateBidRequest from '@/hooks/queries/Request/useCreateBidRequest.ts';
import ProfileButton from '@/pages/Request/ProfileButton';
import ProfileViewer from '@/pages/Request/ProfileViewer';
import RequestReview from '@/pages/Request/RequestReview';
import { useStepStore } from '@/stores/useStepStore';

import '@/styles/sequenceAnimation.css';
// import useCreateBidRequest from '@/hooks/queries/Request/useCreateBidRequest';

interface StepData {
  step: number;
  title: string;
  options: string[];
}

interface SelectedDateTime {
  dateStr: string;
  selectedDate: Date | null;
  selectedTime: number | null;
}

interface StepByStepProps {
  stepCount: number;
  profileData: GetOwnerPetProfileResponse[];
  onProfileSelect: (_petId: number) => void;
}

const StepByStep = ({ stepCount, profileData, onProfileSelect }: StepByStepProps) => {
  const { resetStep } = useStepStore();
  useEffect(() => {
    return () => {
      resetStep(); // Reset step store
    };
  }, [resetStep]);
  const { show } = useModalStore();
  const { currentStep, nextStep, prevStep, setDirection, direction } = useStepStore();
  const [selectedPet, setSelectedPet] = useState<number>(0);
  const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: string }>({});
  const [containerHeight, setContainerHeight] = useState<number | null>(null);
  const [isDynamicHeight, setIsDynamicHeight] = useState<boolean>(false);
  const navigate = useNavigate();
  const [showRegionSelector, setShowRegionSelector] = useState<boolean>(false);
  const [regionSelection, setRegionSelection] = useState<{ area: string; subArea: string }>({
    area: '',
    subArea: '',
  });

  // For Step 9
  const [userInput, setUserInput] = useState<string>('');

  // For Step 6
  const [showDateSelector, setShowDateSelector] = useState<boolean>(false);
  const [selectedDateTimes, setSelectedDateTimes] = useState<SelectedDateTime[]>([
    { dateStr: '', selectedDate: null, selectedTime: null },
    { dateStr: '', selectedDate: null, selectedTime: null },
    { dateStr: '', selectedDate: null, selectedTime: null },
  ]);

  const [activeDateIndex, setActiveDateIndex] = useState<number | null>(null);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [showTimeSelect, setShowTimeSelect] = useState<boolean>(false);

  const nodeRefs = useRef<Record<number, React.RefObject<HTMLDivElement>>>({});
  const neutralButtonRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const stepData: StepData[] = [
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
      title: '댕동 서비스 이용 여부를 확인 해주세요',
      options: ['댕동 이용하기', '직접 픽업'],
    },
    {
      step: 8,
      title: '모니터링 여부를 확인 해주세요',
      options: ['예', '아니오'],
    },
    {
      step: 9,
      title: '서비스 관련 문의사항을 남겨주세요',
      options: ['없음', '지금 작성하기'],
    },
  ];

  const currentStepData = stepData.find((data) => data.step === currentStep);

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
    if (currentStep === 9 && selectedOptions[currentStep] === '지금 작성하기' && !userInput.trim()) {
      return;
    }
    setDirection('forward');
    setTimeout(() => nextStep(), 0);
  };

  const handlePrevStep = () => {
    if (currentStep === 5 && showRegionSelector) {
      setShowRegionSelector(false);
      setRegionSelection({ area: '', subArea: '' });
      setDirection('backward');
      setTimeout(() => prevStep(), 0);
    } else if (currentStep === 6 && showDateSelector) {
      setShowDateSelector(false);
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
  }, [currentStep, showRegionSelector, showDateSelector, showCalendar, showTimeSelect, selectedDateTimes]);

  const handleEnableDynamicHeight = () => {
    setIsDynamicHeight(true);
  };

  const handleDisableDynamicHeight = () => {
    setIsDynamicHeight(false);
  };

  const handleDateTimeButtonClick = (index: number) => {
    setActiveDateIndex(index);
    setShowCalendar(true);
    setShowTimeSelect(false);
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (activeDateIndex === null) return;
    if (date) {
      const newDateTimes = [...selectedDateTimes];
      newDateTimes[activeDateIndex].selectedDate = date;
      setSelectedDateTimes(newDateTimes);
      setShowTimeSelect(true);
    }
  };

  const handleTimeSelectChange = (time: number) => {
    if (activeDateIndex === null) return;
    const newDateTimes = [...selectedDateTimes];
    const chosenDate = newDateTimes[activeDateIndex].selectedDate;
    if (!chosenDate) return;
    newDateTimes[activeDateIndex].selectedTime = time;
    const datePart = format(chosenDate, 'yyyy-MM-dd');
    const timePart = String(time).padStart(2, '0') + ':00:00';
    newDateTimes[activeDateIndex].dateStr = `${datePart} ${timePart}`;
    setSelectedDateTimes(newDateTimes);

    setShowCalendar(false);
    setShowTimeSelect(false);
    setActiveDateIndex(null);
  };

  const renderDateSelector = () => {
    return (
      <div className='m-auto mt-4 flex w-full flex-col gap-2'>
        <h3 className='mt-6 py-6 text-start text-sub_h3 text-gray-800'>날짜와 시간을 선택해주세요.</h3>
        <div className='flex w-full flex-col gap-4'>
          {selectedDateTimes.map((item, index) => (
            <TypeTwoButton
              key={index}
              text={
                <span className='flex gap-4 text-sub_h3 text-gray-700'>
                  {item.dateStr || '일정 정하기'}
                  <img src={editIcon} alt='Edit' className='h-6 w-6' style={{ cursor: 'pointer' }} />
                </span>
              }
              color='shadow w-full'
              onClick={() => handleDateTimeButtonClick(index)}
            />
          ))}
        </div>

        {activeDateIndex !== null && showCalendar && (
          <div className='w-full py-4'>
            <Calendar
              mode='single'
              selected={selectedDateTimes[activeDateIndex].selectedDate || undefined}
              onSelect={handleDateSelect}
              disabled={() => false}
            />
            {showTimeSelect && (
              <>
                <h3 className='py-8 text-sub_h3 text-gray-800'>시간을 선택해주세요:</h3>
                <TimeSelect
                  availableTimes={Array.from({ length: 12 }, (_, i) => i + 9)}
                  selectValue={selectedDateTimes[activeDateIndex].selectedTime}
                  onSelectChange={handleTimeSelectChange}
                />
              </>
            )}
          </div>
        )}

        <div className='mt-4'>
          <TypeTwoButton
            text='다음 단계로 가기'
            color='bg-secondary'
            onClick={() => {
              setShowDateSelector(false);
              handleNextStep();
            }}
          />
        </div>
      </div>
    );
  };

  const renderStepOne = () => (
    <PageContainer>
      <div className='flex w-full flex-col items-center pt-10'>
        <div className='w-full'>
          {profileData.map((profile) => (
            <ProfileButton
              key={profile.petId}
              petName={profile.petName}
              petImageUrl={profile.petImageUrl}
              isRequested={profile.isRequested}
              onClick={() => handleProfileClick(profile.petId)}
            />
          ))}
        </div>
      </div>
    </PageContainer>
  );

  const renderStepTwo = () => {
    const petProfile = profileData.find((profile) => profile.petId === selectedPet);

    return (
      <PageContainer>
        <div className='flex w-full flex-col pt-10'>
          <div className='rounded-[8px]'>
            <ProfileViewer
              profile={
                petProfile || {
                  petId: 0,
                  petName: 'Unknown',
                  petImageUrl: '',
                  petImgName: 'No Image',
                  birthDate: 'N/A',
                  gender: 'N/A',
                  isNeutered: false,
                  weight: 0,
                  majorBreed: '',
                  subBreed: '',
                  specialNotes: '',
                  isRequested: false,
                  customerName: '',
                  phone: '',
                  address: '',
                }
              }
            />
          </div>
          <div className='mt-6 flex w-full flex-col items-center'>
            <TypeTwoButton
              text='프로필 수정하기'
              color='bg-secondary'
              onClick={() => {
                // if (window.confirm('프로필 수정 시 견적서를 다시 요청해야 합니다. 진행하시겠습니까?')) {
                //   navigate(`/profile/pet/edit/${selectedPet}`);

                //   console.log('Profile editing confirmed', selectedPet);
                // } else {
                //   console.log('Profile editing canceled');
                // }
                show(Modal, {
                  title: '반려견 프로필 수정',
                  description: '프로필 수정 시 견적서를 다시 요청해야 합니다. 진행하시겠습니까?',
                  onConfirm: () => {
                    navigate(`/profile/pet/edit/${selectedPet}`);
                  },
                  onClose: () => close(),
                  confirmText: '수정하기',
                  cancelText: '취소',
                });
              }}
            />
            <div className='mt-4 flex w-full flex-col items-center'>
              <TypeTwoButton text='다음 단계로 가기' color='bg-secondary' onClick={handleNextStep} />
            </div>
          </div>
        </div>
      </PageContainer>
    );
  };

  const renderOtherSteps = () => {
    if (currentStep === 10) {
      return (
        <RequestReview
          selectedPet={selectedPet}
          selectedOptions={{
            ...selectedOptions,
            5:
              selectedOptions[5] === '무관'
                ? '무관'
                : regionSelection
                  ? `${regionSelection.area}, ${regionSelection.subArea}`
                  : '지역 선택하기',
            6:
              selectedOptions[6] === '무관'
                ? '무관'
                : selectedDateTimes
                    .filter((d) => d.dateStr)
                    .map((d) => d.dateStr)
                    .join(', ') || '날짜 선택하기',
          }}
          profileData={profileData}
          stepData={stepData}
          onOptionChange={(step, newOption) => {
            setSelectedOptions((prev) => ({
              ...prev,
              [step]: newOption,
            }));
          }}
          onEnableDynamicHeight={handleEnableDynamicHeight}
          onDisableDynamicHeight={handleDisableDynamicHeight}
          userInput={userInput}
        />
      );
    }

    return (
      <PageContainer>
        <div className='pt-8 text-center'>
          <RadioGroup
            className='flex flex-col items-center gap-4'
            value={selectedOptions[currentStep] || ''}
            onValueChange={(value: string) => {
              setSelectedOptions((prev) => ({ ...prev, [currentStep]: value }));
              if (currentStep === 9 && value !== '지금 작성하기') {
                setUserInput('');
              }
              if (
                !((currentStep === 5 && value === '지역 선택하기') || (currentStep === 6 && value === '날짜 선택하기'))
              ) {
                handleNextStep();
              }
            }}
          >
            {currentStepData?.options.map((option) => (
              <div
                key={option}
                ref={option === '무관' && currentStep === 5 ? neutralButtonRef : undefined}
                className={`flex h-auto w-full cursor-pointer flex-col items-start gap-2 rounded-md p-6 shadow transition-all duration-300 ease-in-out ${
                  selectedOptions[currentStep] === option ? 'bg-secondary' : ''
                } ${
                  option === '무관' &&
                  ((showRegionSelector && currentStep === 5) || (showDateSelector && currentStep === 6))
                    ? 'pointer-events-none opacity-50'
                    : ''
                }`}
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
                  } else if (currentStep === 6 && option === '날짜 선택하기') {
                    setShowDateSelector(true);
                  } else if (currentStep === 9 && option === '지금 작성하기') {
                    // do nothing here; handled below
                  } else {
                    handleNextStep();
                  }
                }}
              >
                <div className='flex items-center gap-6'>
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
                  selectedOptions[currentStep] === '지금 작성하기' &&
                  option === '지금 작성하기' && (
                    <div
                      className='w-full overflow-hidden transition-all duration-300 ease-in-out'
                      style={{ height: 'auto' }}
                    >
                      <div className='py-[0.8rem]'>
                        <TextArea
                          value={userInput}
                          onChange={(e) => setUserInput(e.target.value)}
                          placeholder='문의하실 내용을 작성해주세요'
                          maxLength={200}
                          bgColor='bg-white'
                        />
                      </div>
                      {/* <textarea
                        rows={6}
                        className='mt-2 max-h-[160px] min-h-[40px] w-full rounded-md border border-primary p-2 text-gray-700 scrollbar-hide focus:border-primary focus:outline-none'
                        placeholder='내용을 작성해주세요.'
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                      /> */}
                      <TypeTwoButton text='다음 단계로 가기' color='bg-primary' onClick={handleNextStep} />
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

          {showDateSelector && renderDateSelector()}
        </div>
      </PageContainer>
    );
  };

  const createBidRequestMutation = useCreateBidRequest();
  const handleReservation = () => {
    const toISODateTime = (dateStr: string) => {
      if (!dateStr) return '';
      return dateStr.replace(' ', 'T');
    };

    const data = {
      petId: selectedPet,
      desiredServiceCode: selectedOptions[3],
      lastGroomingDate: selectedOptions[4],
      desiredRegion: selectedOptions[5] === '무관' ? '무관' : `${regionSelection.area}, ${regionSelection.subArea}`,
      desiredDate1: toISODateTime(selectedDateTimes[0].dateStr || ''),
      desiredDate2: toISODateTime(selectedDateTimes[1].dateStr || ''),
      desiredDate3: toISODateTime(selectedDateTimes[2].dateStr || ''),
      isVisitRequired: selectedOptions[7] === '원해요',
      isMonitoringIncluded: selectedOptions[8] === '원해요',
      additionalRequest: userInput,
    };
    createBidRequestMutation.mutate(data);
    navigate('/' + ROUTES.bid);

    console.log(JSON.stringify(data));
  };

  return (
    <div>
      <PageContainer>
        <div className='w-full'>
          <Header mode='customBack' title='견적 요청하기' onClick={currentStep === 1 ? undefined : handlePrevStep} />
        </div>
        <Progress
          value={currentStep}
          maxStep={stepCount}
          text={
            currentStep === 1
              ? '미용을 받을 반려견을 선택해주세요'
              : currentStep === 2
                ? '반려견 프로필을 확인해주세요'
                : currentStep === 10
                  ? '요청 사항을 확인해주세요'
                  : currentStepData?.title || ''
          }
        />
      </PageContainer>

      <div className='flex h-full w-full flex-col items-center justify-center'>
        <div
          className='relative mt-6 w-full overflow-hidden transition-all duration-300'
          style={{
            height:
              currentStep === 6
                ? '1200px'
                : currentStep === 10
                  ? isDynamicHeight
                    ? 'auto'
                    : containerHeight
                      ? `${containerHeight}px`
                      : 'auto'
                  : '1000px',
            marginBottom: currentStep === 10 ? '60px' : '',
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
                {currentStep === 1 ? renderStepOne() : currentStep === 2 ? renderStepTwo() : renderOtherSteps()}
              </div>
            </CSSTransition>
          </TransitionGroup>
        </div>
      </div>
      <div className='button-container fixed w-full' style={{ bottom: '0rem' }}>
        <CSSTransition in={currentStep === 10} timeout={500} classNames='slide-up' unmountOnExit nodeRef={buttonRef}>
          <div ref={buttonRef} className='relative'>
            <TypeOneButton text={'예약하기'} onClick={handleReservation} color='bg-secondary' />
          </div>
        </CSSTransition>
      </div>
    </div>
  );
};

export default StepByStep;
