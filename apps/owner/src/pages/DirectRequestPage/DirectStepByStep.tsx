// DirectStepByStep.tsx
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {
  Calendar,
  Header,
  PageContainer,
  Progress,
  RadioGroup,
  RadioGroupItem,
  TimeSelect,
  TypeOneButton,
  TypeTwoButton,
} from '@daeng-ggu/design-system';
import { useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';

import { PaymentDetailsResponse } from '@/apis/payment/getPaymentOrderId.ts';
import { GetOwnerPetProfileResponse } from '@/apis/request/getOwnerPetProfile';
import editIcon from '@/assets/edit.svg';
// import useCreateBidRequest from '@/hooks/queries/Request/useCreateBidRequest.ts';
import DirectRequestReview from '@/pages/DirectRequestPage/DirectRequestReview.tsx';
import ProfileButton from '@/pages/Request/ProfileButton';
import ProfileViewer from '@/pages/Request/ProfileViewer';
import useReservationStoreOne from '@/stores/useReservationStoreOne.ts';
import useReservationStoreTwo from '@/stores/useReservationStoreTwo.ts';
import { useStepStore } from '@/stores/useStepStore';

import '@/styles/sequenceAnimation.css';

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

interface AvailabilityData {
  status: string;
  message: string;
  data: {
    date: string;
    availableTimes: number[];
  }[];
}

interface StepByStepProps {
  stepCount: number;
  profileData: GetOwnerPetProfileResponse[];
  onProfileSelect: (_petId: number) => void;
  designerId: number | undefined;
  paymentDetails?: PaymentDetailsResponse;
}

const DirectStepByStep = ({ stepCount, profileData, onProfileSelect, designerId, paymentDetails }: StepByStepProps) => {
  // Destructure setters from the Zustand store, including the new ones
  const {
    setOrderId,
    setCustomerKey,
    setAmount,
    setGroomingFee,
    setDeliveryFee,
    setMonitoringFee,
    setTotalPayment,
    setPetId,
    setDesignerId, // New Setter
    setDesiredService, // New Setter
    setEndTime, // New Setter
    setLastGroomingDate, // New Setter
    setReservationDate, // New Setter
    setAdditionalRequest,
    setStartTime,
  } = useReservationStoreOne();
  const { setReservationOrderId, setReservationCustomerKey, setReservationTotalPayment } = useReservationStoreTwo();

  // Subscribe to fee values from the store to trigger re-renders on change
  const groomingFee = useReservationStoreOne((state) => state.groomingFee) || 0;
  const deliveryFee = useReservationStoreOne((state) => state.deliveryFee) || 0;
  const monitoringFee = useReservationStoreOne((state) => state.monitoringFee) || 0;

  const { currentStep, nextStep, prevStep, setDirection, direction, resetStep } = useStepStore();
  const [selectedPet, setSelectedPet] = useState<number>(0);
  const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: string }>({});
  const [containerHeight, setContainerHeight] = useState<number | null>(null);
  const [isDynamicHeight, setIsDynamicHeight] = useState<boolean>(false);
  const navigate = useNavigate();
  const [showRegionSelector] = useState<boolean>(false);
  const [regionSelection] = useState<{ area: string; subArea: string }>({
    area: '',
    subArea: '',
  });
  useEffect(() => {
    return () => {
      resetStep(); // Reset step store
    };
  }, [resetStep]);

  // Step 8
  const [userInput, setUserInput] = useState<string>('');

  // Step 5 - Single Date Selection
  const [showDateSelector, setShowDateSelector] = useState<boolean>(false);
  const [selectedDateTime, setSelectedDateTime] = useState<SelectedDateTime>({
    dateStr: '',
    selectedDate: null,
    selectedTime: null,
  });

  const [showCalendar, setShowCalendar] = useState<boolean>(false);

  // Selected date's available times
  const [currentAvailableTimes, setCurrentAvailableTimes] = useState<number[]>([]);

  // TimeSelect visibility
  const [showTimeSelect, setShowTimeSelect] = useState<boolean>(false);

  const nodeRefs = useRef<Record<number, React.RefObject<HTMLDivElement>>>({});
  const neutralButtonRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const queryClient = useQueryClient();

  // Define default fees
  const DELIVERY_FEE_DEFAULT = 30000; // Example value
  const MONITORING_FEE_DEFAULT = 20000; // Example value

  const stepData: StepData[] = [
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
      title: '날짜를 선택 해주세요.',
      options: ['날짜 선택하기', '무관'],
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
  ];

  const currentStepData = stepData.find((data) => data.step === currentStep);

  const getNodeRef = (key: number): React.RefObject<HTMLDivElement> => {
    if (!nodeRefs.current[key]) {
      nodeRefs.current[key] = React.createRef<HTMLDivElement>();
    }
    return nodeRefs.current[key];
  };

  // Handle profile selection
  const handleProfileClick = (petId: number) => {
    onProfileSelect(petId);
    setSelectedPet(petId);
    setPetId(petId);
    setDirection('forward');
    setTimeout(() => nextStep(), 0);
  };

  // Handle moving to the next step
  const handleNextStep = () => {
    if (currentStep === 8 && selectedOptions[currentStep] === '지금 작성할게요.' && !userInput.trim()) {
      alert('문의사항을 입력해주세요.');
      return;
    }
    setDirection('forward');
    setTimeout(() => nextStep(), 0);
  };

  // Handle moving to the previous step
  const handlePrevStep = () => {
    if (currentStep === 5 && showDateSelector) {
      setShowDateSelector(false);
      setDirection('backward');
      setTimeout(() => prevStep(), 0);
    } else {
      setDirection('backward');
      setTimeout(() => prevStep(), 0);
    }
  };

  // Update container height based on the current step
  useEffect(() => {
    const activeRef = nodeRefs.current[currentStep];
    if (activeRef && activeRef.current) {
      setContainerHeight(activeRef.current.offsetHeight);
    }
  }, [currentStep, showRegionSelector, showDateSelector, showCalendar, showTimeSelect, selectedDateTime]);

  const handleEnableDynamicHeight = () => {
    setIsDynamicHeight(true);
  };

  const handleDisableDynamicHeight = () => {
    setIsDynamicHeight(false);
  };

  const handleDateTimeButtonClick = () => {
    setShowCalendar(true);
    setShowTimeSelect(false);
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    setSelectedDateTime((prev) => ({
      ...prev,
      selectedDate: date,
    }));

    // Set reservation date in the store
    const dateStr = format(date, 'yyyy-MM-dd');
    setReservationDate(dateStr);

    // Fetch availability data for the selected date
    if (designerId) {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const dateStrFormatted = format(date, 'yyyy-MM-dd');

      // Retrieve cached availability data
      const availabilityData = queryClient.getQueryData<AvailabilityData>(['availability', designerId, year, month]);

      if (availabilityData && availabilityData.data) {
        const dayData = availabilityData.data.find((d) => d.date === dateStrFormatted);
        const times = dayData ? dayData.availableTimes : [];
        setCurrentAvailableTimes(times);
      } else {
        setCurrentAvailableTimes([]);
      }
    } else {
      setCurrentAvailableTimes([]);
    }

    setShowTimeSelect(true);
  };

  const handleTimeSelectChange = (time: number) => {
    const chosenDate = selectedDateTime.selectedDate;
    if (!chosenDate) return;
    const datePart = format(chosenDate, 'yyyy-MM-dd');
    const timePart = String(time).padStart(2, '0') + ':00:00';
    const dateStr = `${datePart} ${timePart}`;

    setSelectedDateTime({
      dateStr,
      selectedDate: chosenDate,
      selectedTime: time,
    });

    // Set reservation time in the store
    setStartTime(timePart);
    // Example: Assuming 1-hour service
    const endTimeStr = `${String(time + 1).padStart(2, '0')}:00:00`;
    setEndTime(endTimeStr);

    setShowCalendar(false);
    setShowTimeSelect(false);
  };

  // Function to set grooming fee based on selected service
  const setGroomingFeeBasedOnService = (service: string) => {
    let fee: number;
    switch (service) {
      case '목욕':
        fee = 50000;
        break;
      case '풀케어 서비스':
        fee = 300000;
        break;
      case '전체미용':
        fee = 200000;
        break;
      case '부분미용':
        fee = 100000;
        break;
      case '위생미용':
        fee = 80000;
        break;
      case '스파':
        fee = 100000;
        break;
      default:
        fee = 0;
    }
    setGroomingFee(fee);
    setAmount(fee + deliveryFee + monitoringFee); // Update total amount
    setTotalPayment(fee + deliveryFee + monitoringFee); // Update total payment
  };

  // Watch for changes in selected service to set grooming fee and desiredService
  useEffect(() => {
    const selectedService = selectedOptions[3];
    if (selectedService) {
      setDesiredService(selectedService); // Store desiredService
      setGroomingFeeBasedOnService(selectedService);
    }
  }, [selectedOptions[3], setGroomingFee, setDesiredService, deliveryFee, monitoringFee]);

  // Watch for changes in delivery selection to set delivery fee and isDelivery
  useEffect(() => {
    const deliveryOption = selectedOptions[6];
    if (deliveryOption === '네') {
      setDeliveryFee(DELIVERY_FEE_DEFAULT);
      setAmount(groomingFee + DELIVERY_FEE_DEFAULT + monitoringFee);
      setTotalPayment(groomingFee + DELIVERY_FEE_DEFAULT + monitoringFee);
      // Assuming isDelivery is handled elsewhere or via another setter
    } else if (deliveryOption === '아니오') {
      setDeliveryFee(0);
      setAmount(groomingFee + monitoringFee);
      setTotalPayment(groomingFee + monitoringFee);
      // Assuming isDelivery is handled elsewhere or via another setter
    }
  }, [selectedOptions[6], setDeliveryFee, groomingFee, monitoringFee, setAmount, setTotalPayment]);

  // Watch for changes in monitoring selection to set monitoring fee and isMonitoring
  useEffect(() => {
    const monitoringOption = selectedOptions[7];
    if (monitoringOption === '네') {
      setMonitoringFee(MONITORING_FEE_DEFAULT);
      setAmount(groomingFee + deliveryFee + MONITORING_FEE_DEFAULT);
      setTotalPayment(groomingFee + deliveryFee + MONITORING_FEE_DEFAULT);
      // Assuming isMonitoring is handled elsewhere or via another setter
    } else if (monitoringOption === '아니오') {
      setMonitoringFee(0);
      setAmount(groomingFee + deliveryFee);
      setTotalPayment(groomingFee + deliveryFee);
      // Assuming isMonitoring is handled elsewhere or via another setter
    }
  }, [selectedOptions[7], setMonitoringFee, groomingFee, deliveryFee, setAmount, setTotalPayment]);

  // Recalculate total whenever fees change
  useEffect(() => {
    const total = groomingFee + deliveryFee + monitoringFee;
    setAmount(total);
    setTotalPayment(total);
  }, [groomingFee, deliveryFee, monitoringFee, setAmount, setTotalPayment]);

  // Handle storing paymentDetails into the store
  useEffect(() => {
    if (paymentDetails) {
      setOrderId(paymentDetails.orderId);
      setCustomerKey(paymentDetails.customerKey);
    }
  }, [paymentDetails, setOrderId, setCustomerKey]);

  // Set designerId in the store
  useEffect(() => {
    if (designerId !== undefined) {
      setDesignerId(designerId);
    }
  }, [designerId, setDesignerId]);

  useEffect(() => {
    return () => {
      resetStep(); // Reset step store when component unmounts
    };
  }, [resetStep]);

  // Function to render the date selector
  const renderDateSelector = () => {
    return (
      <div className='m-auto mt-4 flex w-full flex-col gap-2'>
        <h3 className='mt-6 border-t py-6 text-start text-sub_h3 font-bold'>날짜와 시간을 선택해주세요.</h3>
        <div className='flex w-full flex-col gap-4'>
          <TypeTwoButton
            key={0}
            text={
              <span className='flex items-center gap-2'>
                {selectedDateTime.dateStr || '일정 정하기'}
                <img src={editIcon} alt='Edit' className='h-6 w-6' style={{ cursor: 'pointer' }} />
              </span>
            }
            color='bg-gray-50 w-full'
            onClick={handleDateTimeButtonClick}
          />
        </div>

        {showCalendar && (
          <div className='mt-4 w-full'>
            <Calendar
              mode='single'
              selected={selectedDateTime.selectedDate || undefined}
              onSelect={handleDateSelect}
              disabled={() => false}
              designerId={designerId || 0}
            />
            {showTimeSelect && (
              <>
                <h3 className='my-4 text-sub_h3 font-bold'>시간을 선택해주세요:</h3>
                <TimeSelect
                  availableTimes={currentAvailableTimes}
                  selectValue={selectedDateTime.selectedTime}
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
              if (!selectedDateTime.selectedDate || selectedDateTime.selectedTime === null) {
                alert('날짜와 시간을 모두 선택해주세요.');
                return;
              }
              setShowDateSelector(false);
              handleNextStep();
            }}
          />
        </div>
      </div>
    );
  };

  const renderStepOne = () => (
    <div className='flex flex-col items-center pt-10'>
      <div className='grid grid-cols-2 gap-4'>
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
  );

  const renderStepTwo = () => {
    const petProfile = profileData.find((profile) => profile.petId === selectedPet);

    return (
      <div className='flex flex-col items-center pt-10'>
        <div className='relative'>
          <div className='rounded-[8px] border border-primary'>
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
                if (window.confirm('프로필을 수정하면 견적서를 다시 요청해야 합니다. 진행하시겠습니까?')) {
                  navigate(`/profile/pet/edit/${selectedPet}`);
                }
              }}
            />
            <div className='mt-4 flex w-full flex-col items-center'>
              <TypeTwoButton text='다음 단계로 가기' color='bg-secondary' onClick={handleNextStep} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderOtherSteps = () => {
    if (currentStep === 9) {
      console.log('State after setting in RequestReview:', useReservationStoreOne.getState());
      return (
        <DirectRequestReview
          selectedPet={selectedPet}
          selectedOptions={{
            ...selectedOptions,
            5: selectedOptions[5] === '무관' ? '무관' : selectedDateTime.dateStr || '날짜 선택하기',
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
              // Set store fields based on the current step
              if (currentStep === 3) {
                setDesiredService(value); // Store desiredService
              }
              if (currentStep === 4) {
                setLastGroomingDate(value); // Store lastGroomingDate
              }
              if (currentStep === 5) {
                if (value === '날짜 선택하기') {
                  setShowDateSelector(true);
                } else {
                  setReservationDate('무관'); // If '무관', set reservationDate accordingly
                }
              }
              if (currentStep === 6) {
                // Assuming there are setters for isDelivery and isMonitoring
                // If not, add them to the store and destructure here
              }
              if (currentStep === 7) {
                // Similarly, handle isMonitoring if necessary
              }

              if (currentStep === 8 && value !== '지금 작성할게요.') {
                setUserInput('');
              }
              if (!(currentStep === 5 && value === '날짜 선택하기')) {
                handleNextStep();
              }
            }}
          >
            {currentStepData?.options.map((option) => (
              <div
                key={option}
                ref={option === '무관' ? neutralButtonRef : undefined}
                className={`flex h-auto w-full cursor-pointer flex-col items-start gap-2 rounded-md border p-6 font-bold transition-all duration-300 ease-in-out ${
                  selectedOptions[currentStep] === option ? 'border-primary bg-secondary' : 'border-gray-400'
                } ${
                  option === '무관' && showDateSelector && currentStep === 5 ? 'pointer-events-none opacity-50' : ''
                }`}
                onClick={() => {
                  setSelectedOptions((prev) => ({
                    ...prev,
                    [currentStep]: option,
                  }));

                  // Set store fields based on the current step
                  if (currentStep === 3) {
                    setDesiredService(option); // Store desiredService
                    setGroomingFeeBasedOnService(option);
                  }
                  if (currentStep === 4) {
                    setLastGroomingDate(option); // Store lastGroomingDate
                  }
                  if (currentStep === 5) {
                    if (option === '날짜 선택하기') {
                      setShowDateSelector(true);
                    } else {
                      setReservationDate('무관'); // If '무관', set reservationDate accordingly
                    }
                  }
                  if (currentStep === 6) {
                    // Assuming you have a setter for isDelivery
                    // setIsDelivery(option === '네');
                  }
                  if (currentStep === 7) {
                    // Assuming you have a setter for isMonitoring
                    // setIsMonitoring(option === '네');
                  }
                  if (currentStep === 8) {
                    if (option !== '지금 작성할게요.') {
                      setAdditionalRequest('');
                    }
                  }

                  if (currentStep === 5 && option === '날짜 선택하기') {
                    setShowDateSelector(true);
                  } else if (currentStep === 8 && option === '지금 작성할게요.') {
                    // Show textarea (handled below)
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

                {currentStep === 8 &&
                  selectedOptions[currentStep] === '지금 작성할게요.' &&
                  option === '지금 작성할게요.' && (
                    <div
                      className='w-full overflow-hidden transition-all duration-300 ease-in-out'
                      style={{ height: 'auto' }}
                    >
                      <textarea
                        rows={6}
                        className='mt-2 max-h-[160px] min-h-[40px] w-full rounded-md border border-primary p-2 text-gray-700 scrollbar-hide focus:border-primary focus:outline-none'
                        placeholder='내용을 작성해주세요.'
                        value={userInput}
                        onChange={(e) => {
                          setUserInput(e.target.value);
                          // Optionally, store it in the Zustand store if needed
                        }}
                      />
                      <TypeTwoButton text='다음 단계로 가기' color='bg-secondary' onClick={handleNextStep} />
                    </div>
                  )}
              </div>
            ))}
          </RadioGroup>
          {/* Uncomment if RegionSelector is needed
          {showRegionSelector && (
            <div>
              <RegionSelector
                onSelectionChange={(selection: { area: string; subArea: string }) => {
                  setRegionSelection(selection);
                  setShowRegionSelector(false);
                  if (neutralButtonRef.current) {
                    neutralButtonRef.current.classList.remove('pointer-events-none', 'opacity-50');
                  }
                  handleNextStep();
                }}
              />
            </div>
          )}
          */}

          {showDateSelector && renderDateSelector()}
        </div>
      </PageContainer>
    );
  };

  // const createBidRequestMutation = useCreateBidRequest();

  const handleReservation = () => {
    if (!paymentDetails) {
      // Handle the case when paymentDetails is not provided
      console.error('Payment details are missing.');
      alert('결제 정보가 누락되었습니다. 다시 시도해주세요.');
      return;
    }

    if (!useReservationStoreOne.getState().reservationDate) {
      alert('날짜와 시간을 선택해주세요.');
      return;
    }

    const toISODateTime = (dateStr: string) => {
      if (!dateStr) return '';
      return dateStr.replace(' ', 'T');
    };

    const data = {
      petId: useReservationStoreOne.getState().petId,
      desiredServiceCode: useReservationStoreOne.getState().desiredService,
      lastGroomingDate: useReservationStoreOne.getState().lastGroomingDate,
      desiredRegion: selectedOptions[5] === '무관' ? '무관' : `${regionSelection.area}, ${regionSelection.subArea}`,
      desiredDate: toISODateTime(useReservationStoreOne.getState().reservationDate || ''),
      // Remove desiredDate2 and desiredDate3
      isVisitRequired: selectedOptions[6] === '네',
      isMonitoringIncluded: selectedOptions[7] === '네',
      additionalRequest: userInput,
      paymentDetails: {
        orderId: useReservationStoreOne.getState().orderId,
        customerKey: useReservationStoreOne.getState().customerKey,
      },
      amount: useReservationStoreOne.getState().amount,
      totalPayment: useReservationStoreOne.getState().totalPayment,
    };
    // createBidRequestMutation.mutate(data, {
    //   onSuccess: () => {
    //     // Optionally clear the store after successful reservation
    //     useReservationStoreOne.getState().clearAll();
    //     navigate('/reservation-success'); // Navigate to a success page
    //   },
    //   onError: (error) => {
    //     console.error('Reservation failed:', error);
    //     alert('예약에 실패했습니다. 다시 시도해주세요.');
    //   },
    // });

    setReservationOrderId(paymentDetails.orderId);
    setReservationCustomerKey(paymentDetails.customerKey);
    setReservationTotalPayment(useReservationStoreOne.getState().totalPayment);
    console.log('Reservation Data:', JSON.stringify(data));
    navigate('/paymentDirect');
  };

  // Watch for changes in paymentDetails and log them
  useEffect(() => {
    console.log('DesignerId:', designerId);
    console.log('PaymentDetails:', paymentDetails);
  }, [designerId, paymentDetails]);

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
              ? '미용을 받을 반려견을 선택 해주세요.'
              : currentStep === 2
                ? '반려견 프로필 확인'
                : currentStep === 9
                  ? '예약 확인 해주세요'
                  : currentStepData?.title || ''
          }
        />

        <div className='flex h-full w-full flex-col items-center justify-center'>
          <div
            className='relative mt-6 w-full overflow-hidden transition-all duration-300'
            style={{
              height:
                currentStep === 5
                  ? '1000px'
                  : currentStep === 9
                    ? isDynamicHeight
                      ? 'auto'
                      : containerHeight
                        ? `${containerHeight}px`
                        : 'auto'
                    : '400px',
              marginBottom: currentStep === 9 ? '60px' : '',
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
      </PageContainer>
      <div className='button-container fixed w-full' style={{ bottom: '0rem' }}>
        <CSSTransition in={currentStep === 9} timeout={500} classNames='slide-up' unmountOnExit nodeRef={buttonRef}>
          <div ref={buttonRef} className='relative'>
            <TypeOneButton text={'예약하기'} onClick={handleReservation} color='bg-secondary' />
          </div>
        </CSSTransition>
      </div>
    </div>
  );
};

export default DirectStepByStep;
