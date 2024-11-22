import { ReactNode } from 'react';
import { useLocation } from 'react-router';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Sequence = ({ children }: { children: ReactNode }) => {
  const location = useLocation();

  return (
    <div className='flex w-full flex-col items-center overflow-x-hidden'>
      <div className='flex h-auto w-full min-w-[32rem] max-w-[48rem] flex-1 flex-col'>
        <div className='flex w-full flex-col'>
          <TransitionGroup component={null}>
            <CSSTransition key={location.key} timeout={500} classNames='fade' unmountOnExit>
              {children}
            </CSSTransition>
          </TransitionGroup>
        </div>
      </div>
    </div>
  );
};

export default Sequence;
