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
import MembershipPage from '@/pages/Membership/MembershipPage';
import MyPage from '@/pages/MyPage/MyPage';
import PortfolioDetailPage from '@/pages/PortfolioDetailPage/PortfolioDetailPage';
import ProgressPage from '@/pages/ProgressPage/ProgressPage';
import RegisterStep from '@/pages/RegisterProfile/RegisterStep';
import PastRequestReview from '@/pages/RequestPage/PastRequestReview.tsx';
import ReservationPage from '@/pages/ReservationPage/ReservationPage';
import ReviewDetailPage from '@/pages/ReviewDetailPage/ReviewDetailPage';
import SignupPage from '@/pages/Signup/SignupPage';
import SignupSuccessPage from '@/pages/Signup/SignupSuccessPage';
import DetailPage from '@/pages/StatusPage/DetailPage.tsx';
import SuggestPage from '@/pages/SuggestPage/SuggestPage.tsx';

import AddPortfolioInProfile from './pages/AddPortfolioPage/AddPortfolioInProfile';
import EditPortfolioPage from './pages/EditPortfolioPage/EditPortfolioPage';

// import AddPortfolioPage from './pages/AddPortfolioPage/AddPortfolioPage';

// import AddPortfolioPage from './pages/AddPortfolioPage/AddPortfolioPage';

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
          element: <ReservationPage />,
        },
        { path: ROUTES.progress(), element: <ProgressPage /> },
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
          children: [{ path: ROUTES.portfolioRegister, element: <AddPortfolioInRegister /> }],
        },
        {
          path: ROUTES.feed,
          element: <FeedPage />,
        },
        {
          path: ROUTES.profile,
          children: [
            {
              index: true,
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
              path: ROUTES.portfolioDetail,
              element: <PortfolioDetailPage />,
            },
            {
              path: ROUTES.portfolioAdd,
              element: <AddPortfolioInProfile />,
            },
          ],
        },
        {
          path: ROUTES.profileEditPortfolio,
          element: <EditPortfolioPage />,
        },
        {
          path: ROUTES.reservation,
          element: <ReservationPage />,
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
