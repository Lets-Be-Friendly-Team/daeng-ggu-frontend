import React, { useEffect, useRef, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { Progress } from '@/components/_common/progress.tsx';
import { useStepStore } from '@/stores/useStepStore';

import ProfileButton from './ProfileButton';

import '@/styles/sequenceAnimation.css';

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

  return (
    <div className='flex h-full w-full flex-col items-center justify-center'>
      <Progress value={currentStep} maxStep={stepCount} text={`Step ${currentStep}`} />

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
                <div className='flex flex-col items-center'>
                  <h2 className='mb-4 text-lg font-semibold'>Select your profile:</h2>
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
              ) : (
                <div className='text-center'>
                  <h2 className='mb-4 text-lg font-semibold'>Content for Step {currentStep}</h2>
                  <p>test</p>
                </div>
              )}
            </div>
          </CSSTransition>
        </TransitionGroup>
      </div>

      <div className='mt-8 flex gap-4'>
        {currentStep > 1 && (
          <>
            <button className='rounded bg-gray-300 px-4 py-2' onClick={handlePrevStep}>
              이전
            </button>
            {currentStep < stepCount && (
              <button className='rounded bg-primary px-4 py-2 text-white' onClick={handleNextStep}>
                다음
              </button>
            )}
            {currentStep === stepCount && (
              <button className='rounded bg-primary px-4 py-2 text-white' onClick={() => alert('Completed!')}>
                끛
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default StepByStep;
