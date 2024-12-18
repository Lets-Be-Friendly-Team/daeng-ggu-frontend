import { createRef, RefObject, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Header, PageContainer, Progress, TypeOneButton } from '@daeng-ggu/design-system';

import ROUTES from '@/constants/routes';
import useMultipleImageUpload from '@/hooks/queries/ImageUpload/useMultipleImageUpload';
import useSingleImageUpload from '@/hooks/queries/ImageUpload/useSingleImageUpload';
import useRegisterProfile from '@/hooks/queries/Profile/useRegisterProfile';
import { useRegisterProfileStepStore } from '@/stores/RegisterProfileStepStore';
import useDesignerIdStore from '@/stores/useDesignerIdStore';
import useProfileStore from '@/stores/useProfileStore';

import { StepData } from './RegisterProfileData';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';

import '@/styles/sequenceAnimation.css';
// import Portfolio from '../MyPage/components/Portfolio';

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
  const { profileData, fileData, setProfileData } = useProfileStore();
  const { designerImg, certifications } = fileData;
  const name = '디자이너';
  const [activeBtn, setActiveBtn] = useState(false);
  const stepData: StepData[] = [
    {
      step: 1,
      title: `${name}님을 소개해주세요!`,
      // contents: <Step1 formData={profileFormData} setFormData={setProfileFormData} />,
      contents: <Step1 setActiveBtn={setActiveBtn} />,
    },
    {
      step: 2,
      title: '편리한 예약을 위해 작성해주세요!',
      contents: <Step2 setActiveBtn={setActiveBtn} />,
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
    setActiveBtn(false);
    setDirection('backward');
    setTimeout(() => prevStep(), 0);
  };

  const handleNextStep = () => {
    setActiveBtn(false);
    setDirection('forward');
    setTimeout(() => nextStep(), 0);
  };

  const getNodeRef = (key: number): RefObject<HTMLDivElement> => {
    if (!nodeRefs.current[key]) {
      nodeRefs.current[key] = createRef<HTMLDivElement>();
    }
    return nodeRefs.current[key];
  };

  const navigate = useNavigate();
  const { designerId } = useDesignerIdStore();
  // 이미지 전송
  const { mutate: imgUpload } = useSingleImageUpload();
  const { mutate: imgListUpload } = useMultipleImageUpload();

  // 데이터 전송
  const { mutate: registerProfile } = useRegisterProfile({
    onSuccess: (data) => {
      // 프로필 등록 성공시
      console.log('프로필 등록 성공', data);
      navigate(`/${ROUTES.profile}`);
    },
    onError: (error) => {
      // 프로필 등록 실패시
      console.log('Error details:', error.code || error.message);
    },
  });

  // 이미지 등록 처리
  const setImgUrl = async (): Promise<{ newImgUrl: string; certificationsUrlList: string[] }> => {
    // 프로필 이미지
    const profileUploadPromise = designerImg
      ? new Promise<string>((resolve, reject) => {
          imgUpload(designerImg, {
            onSuccess: (url) => {
              console.log(`프로필 사진 업로드 성공: ${url}`);
              // setFileData({ designerImg: null });
              resolve(url);
            },
            onError: (error) => {
              alert(`프로필 사진 업로드 실패: ${error.message}`);
              reject(error);
            },
          });
        })
      : Promise.resolve('');

    // 자격증 이미지
    const certUploadPromise =
      certifications.length > 0
        ? new Promise<string[]>((resolve, reject) => {
            imgListUpload(certifications, {
              onSuccess: (data) => {
                console.log(`자격증 이미지 업로드 성공: ${data}`);
                // setFileData({ certifications: [] });
                resolve(data);
              },
              onError: (error) => {
                alert(`자격증 이미지 업로드 실패: ${error.message}`);
                reject(error);
              },
            });
          })
        : Promise.resolve([]);

    const [newImgUrl, certificationsUrlList] = await Promise.all([profileUploadPromise, certUploadPromise]);
    return { newImgUrl, certificationsUrlList };
  };

  const handleFinish = async () => {
    // 프로필 작성 완료시 수행할 작업
    try {
      const { newImgUrl, certificationsUrlList } = await setImgUrl();
      const newProfile = {
        ...profileData,
        designerId: designerId,
        newImgUrl,
        certificationsUrlList,
      };
      console.log(newProfile);
      setProfileData(newProfile);
      registerProfile(newProfile); // 서버에 프로필 등록
    } catch (error) {
      console.log('프로필 업로드 오류 발생', error);
    }
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
          // onClick={() => {
          //   console.log('finish');
          // }}
          onClick={handleFinish}
          text='프로필 작성 완료'
          color='bg-primary'
        />
      ) : (
        <TypeOneButton
          onClick={handleNextStep}
          text='다음 단계로'
          color={activeBtn ? 'bg-primary' : 'bg-gray-50'}
          // disabled={!activeBtn}
        />
      )}
      {/* </div> */}
    </div>
  );
};
export default RegisterStep;
