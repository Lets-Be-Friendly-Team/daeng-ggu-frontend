// router.jsx
import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { LogContainer, RouterErrorFallback } from '@daeng-ggu/shared';

// import '@/styles/sequenceAnimation.css';
import ROUTES from '@/constants/routes';
import MainPage from '@/pages/MainPage';
import SignupPage from '@/pages/Signup/SignupPage';

import AddPortfolioPage from './pages/AddPortfolioPage/AddPortfolioPage';
import MembershipPage from './pages/Membership/MembershipPage';
import RegisterStep from './pages/RegisterProfile/RegisterStep';
import SignupSuccessPage from './pages/Signup/SignupSuccessPage';
import App from './App';

export const router = createBrowserRouter([
  {
    path: ROUTES.main,
    element: (
      <Suspense>
        <App />
      </Suspense>
    ),
    errorElement: (
      <LogContainer log='designer app'>
        <RouterErrorFallback />
      </LogContainer>
    ),
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: ROUTES.signup,
        children: [
          { index: true, element: <SignupPage /> },
          { path: ROUTES.signupSuccess, element: <SignupSuccessPage /> },
        ],
      },
      {
        path: ROUTES.membership,
        children: [{ index: true, element: <MembershipPage /> }],
      },
      {
        path: ROUTES.registerProfile,
        children: [{ index: true, element: <RegisterStep /> }],
      },
      {
        path: ROUTES.portfolio,
        children: [{ path: ROUTES.portfolioAdd, element: <AddPortfolioPage /> }],
      },
    ],
  },
]);
