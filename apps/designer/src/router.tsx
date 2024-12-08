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

// import '@/styles/sequenceAnimation.css';
import FeedPage from './pages/FeedPage/FeedPage';
import PortfolioDetailPage from './pages/PortfolioDetailPage/PortfolioDetailPage';
import SignupPage from './pages/Signup/SignupPage';
import App from './App';

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
          children: [{ index: true, element: <SignupPage /> }],
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
