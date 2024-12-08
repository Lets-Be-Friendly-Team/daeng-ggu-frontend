// router.jsx
import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { LogContainer, RouterErrorFallback } from '@daeng-ggu/shared';

// import '@/styles/sequenceAnimation.css';
import ROUTES from '@/constrants/routes.ts';
import EditDesignerProfilePage from '@/pages/EditDesignerProfilePage/EditDesignerProfilePage';
import MainPage from '@/pages/MainPage';
import MyPage from '@/pages/MyPage/MyPage';
import ReservationPage from '@/pages/ReservationPage/ReservationPage';
import ReviewDetailPage from '@/pages/ReviewDetailPage/ReviewDetailPage';

import FeedPage from './pages/FeedPage/FeedPage';
import App from './App';

export const router = createBrowserRouter([
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
    ],
  },
]);
