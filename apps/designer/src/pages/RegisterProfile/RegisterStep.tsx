import { createRef, RefObject, useEffect, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Header, PageContainer, Progress, TypeOneButton } from '@daeng-ggu/design-system';

import { useRegisterProfileStepStore } from '@/stores/RegisterProfileStepStore';
import useProfileStore from '@/stores/useProfileStore';

import { StepData } from './RegisterProfileData';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';

import '@/styles/sequenceAnimation.css';

const RegisterStep = () => {
  useEffect(() => {
    console.log('render');
  }, []);
  const { currentStep, nextStep, prevStep, setDirection, direction } = useRegisterProfileStepStore();
  // const [profileFormData, setProfileFormData] = useState<DesignerData>({
  //   designerImg: null,
  //   nickname: '',
  //   address1: '',
  //   address2: '',
  //   detailAddress: '',
  //   introduction: '',
  //   phone: '',
  //   providedServices: [],
  //   possibleBreeds: [],
  //   dayOff: [], //휴무일 -> 인터페이스 정의서에 없어서 임의로 명명함
  //   //가격 및 소요시간 추가
  //   businessNumber: '',
  //   certifications: [],
  //   workExperience: '',
  //   portfolioList: [],
  // });
  const { profileData } = useProfileStore();

  const name = '김댕꾸';
  const stepData: StepData[] = [
    {
      step: 1,
      title: `${name}님을 소개해주세요!`,
      // contents: <Step1 formData={profileFormData} setFormData={setProfileFormData} />,
      contents: <Step1 />,
    },
    {
      step: 2,
      title: '편리한 예약을 위해 작성해주세요!',
      contents: <Step2 />,
      // contents: <Step2 formData={profileFormData} setFormData={setProfileFormData} />,
    },
    {
      step: 3,
      title: `신뢰를 높이기 위한 인증 단계에요!`,
      contents: <Step3 />,
      // contents: <Step1 formData={profileFormData} setFormData={setProfileFormData} />,
    },
    {
      step: 4,
      title: `프로필을 더 빛내보세요!`,
      contents: <Step4 />,
      // contents: <Step1 formData={profileFormData} setFormData={setProfileFormData} />,
    },
  ];

  const nodeRefs = useRef<Record<number, RefObject<HTMLDivElement>>>({});
  // const buttonRef = useRef<HTMLDivElement>(null);

  const currentStepData = stepData.find((data) => data.step === currentStep);
  const handlePrevStep = () => {
    setDirection('backward');
    setTimeout(() => prevStep(), 0);
  };

  const handleNextStep = () => {
    setDirection('forward');
    setTimeout(() => nextStep(), 0);
  };

  const getNodeRef = (key: number): RefObject<HTMLDivElement> => {
    if (!nodeRefs.current[key]) {
      nodeRefs.current[key] = createRef<HTMLDivElement>();
    }
    return nodeRefs.current[key];
  };

  useEffect(() => {
    console.log(profileData);
  }, [profileData]);

  return (
    <div>
      <PageContainer>
        <div className='sticky top-0 bg-white z-10'>
          <Header
            mode={currentStep === 1 ? 'close' : 'back'}
            title='프로필 작성'
            onClick={currentStep === 1 ? undefined : handlePrevStep}
          />
          <div className='flex py-[2rem] w-full bg-white'>
            <Progress value={currentStep} maxStep={4} text={currentStepData?.title} />
          </div>
        </div>

        <div className='relative  pt-[2rem] pb-[4rem] mb-[6rem] w-full overflow-hidden transition-all duration-300 h-full min-h-[80vh]'>
          <TransitionGroup component={null}>
            <CSSTransition
              key={currentStep}
              nodeRef={getNodeRef(currentStep)}
              timeout={500}
              classNames={direction === 'forward' ? 'slide-forward' : 'slide-backward'}
            >
              <div ref={getNodeRef(currentStep)}>{currentStepData?.contents}</div>
            </CSSTransition>
          </TransitionGroup>
        </div>
      </PageContainer>
      {/* <div className='button-container fixed w-full' > */}
      {currentStep === 4 ? (
        <TypeOneButton
          onClick={() => {
            console.log('finish');
          }}
          text='프로필 작성 완료'
          color='bg-primary'
        />
      ) : (
        <TypeOneButton onClick={handleNextStep} text='다음 단계로' color='bg-gray-50' />
      )}
      {/* </div> */}
    </div>
  );
};
export default RegisterStep;
