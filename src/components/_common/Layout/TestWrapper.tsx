// TestWrapper.tsx
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import '@/styles/sequenceAnimation.css';

const TestWrapper: React.FC = () => {
  const location = useLocation();

  return (
    <TransitionGroup component={null}>
      <CSSTransition key={location.pathname} timeout={300} classNames='slide' unmountOnExit>
        <div>
          <Outlet />
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default TestWrapper;
