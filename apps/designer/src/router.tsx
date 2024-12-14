// router.jsx
import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import StatusPage from '@daeng-ggu/designer/src/pages/StatusPage/StatusPage';
import { LogContainer, RouterErrorFallback } from '@daeng-ggu/shared';

import App from '@/App';
import ROUTES from '@/constants/routes';
import AddPortfolioInRegister from '@/pages/AddPortfolioPage/AddPortfolioInRegister';
import EditDesignerProfilePage from '@/pages/EditDesignerProfilePage/EditDesignerProfilePage';
import FeedPage from '@/pages/FeedPage/FeedPage';
import MainPage from '@/pages/MainPage';
// import AddPortfolioPage from './pages/AddPortfolioPage/AddPortfolioPage';
import MembershipPage from '@/pages/Membership/MembershipPage';
import MyPage from '@/pages/MyPage/MyPage';
import PortfolioDetailPage from '@/pages/PortfolioDetailPage/PortfolioDetailPage';
import RegisterStep from '@/pages/RegisterProfile/RegisterStep';
import PastRequestReview from '@/pages/RequestPage/PastRequestReview.tsx';
import ReservationPage from '@/pages/ReservationPage/ReservationPage';
import ReviewDetailPage from '@/pages/ReviewDetailPage/ReviewDetailPage';
import SignupPage from '@/pages/Signup/SignupPage';
import SignupSuccessPage from '@/pages/Signup/SignupSuccessPage';
import DetailPage from '@/pages/StatusPage/DetailPage.tsx';
import SuggestPage from '@/pages/SuggestPage/SuggestPage.tsx';

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
          children: [{ path: ROUTES.portfolioAdd, element: <AddPortfolioInRegister /> }],
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
        {
          path: ROUTES.bid,
          children: [
            {
              index: true,
              element: <StatusPage />,
            },
            {
              path: ROUTES.bidDetail,
              element: <DetailPage />,
            },
            {
              path: ROUTES.bidPastDetail,
              element: <PastRequestReview />,
            },
            {
              path: ROUTES.bidSuggest,
              element: <SuggestPage />,
            },
            // {
            //   path: ROUTES.bidDetailDesigner,
            //   element: <DetailDesigner />,
            // },
          ],
        },
      ],
    },
  ],
  { basename: '/designer' },
);
