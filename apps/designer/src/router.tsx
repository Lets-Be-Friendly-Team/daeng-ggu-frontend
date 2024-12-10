// router.jsx
import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { LogContainer, RouterErrorFallback } from '@daeng-ggu/shared';

import ROUTES from '@/constants/routes';
import EditDesignerProfilePage from '@/pages/EditDesignerProfilePage/EditDesignerProfilePage';
import MainPage from '@/pages/MainPage';
import MyPage from '@/pages/MyPage/MyPage';
import ReservationPage from '@/pages/ReservationPage/ReservationPage';
import ReviewDetailPage from '@/pages/ReviewDetailPage/ReviewDetailPage';

import AddPortfolioPage from './pages/AddPortfolioPage/AddPortfolioPage';
import MembershipPage from './pages/Membership/MembershipPage';
import RegisterStep from './pages/RegisterProfile/RegisterStep';

import FeedPage from './pages/FeedPage/FeedPage';
import PortfolioDetailPage from './pages/PortfolioDetailPage/PortfolioDetailPage';
import SignupPage from './pages/Signup/SignupPage';
import SignupSuccessPage from './pages/Signup/SignupSuccessPage';
import App from './App';
// import '@/styles/sequenceAnimation.css';
export const router = createBrowserRouter(
  [
    {
      path: ROUTES.main,
      errorElement: (
        <LogContainer log='designer app'>
          <RouterErrorFallback />
        </LogContainer>
      ),
      element: (
        <Suspense>
          <App />
        </Suspense>
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
        {
          path: ROUTES.feed,
          element: <FeedPage />,
        },
        {
          path: ROUTES.profile,
          element: <MyPage />,
        },
        {
          path: ROUTES.profileEdit,
          element: <EditDesignerProfilePage />,
        },
        {
          path: ROUTES.reviewDetail,
          element: <ReviewDetailPage />,
        },
        {
          path: ROUTES.reservation,
          element: <ReservationPage />,
        },
        {
          path: ROUTES.portfolioDetail,
          element: <PortfolioDetailPage />,
        },
      ],
    },
  ],
  { basename: '/designer' },
);
