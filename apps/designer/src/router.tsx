// router.jsx
import { Suspense } from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import StatusPage from '@daeng-ggu/designer/src/pages/StatusPage/StatusPage';
import { LogContainer, RouterErrorFallback } from '@daeng-ggu/shared';

import App from '@/App';
import ROUTES from '@/constants/routes';
import AddPortfolioInRegister from '@/pages/AddPortfolioPage/AddPortfolioInRegister';
import EditDesignerProfilePage from '@/pages/EditDesignerProfilePage/EditDesignerProfilePage';
import FeedPage from '@/pages/FeedPage/FeedPage';
// import MembershipPage from '@/pages/Membership/MembershipPage';
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

// import AddPortfolioPage from './pages/AddPortfolioPage/AddPortfolioPage';
// import AddPortfolioPage from './pages/AddPortfolioPage/AddPortfolioPage';
import PrivateWrapper from './components/RouteGuard/PrivateWrapper'; //로그인 안된 상태면 접근 제한
import PublicRoute from './components/RouteGuard/PublicRoute'; //로그인 된 상태면 접근 제한
import AddPortfolioInProfile from './pages/AddPortfolioPage/AddPortfolioInProfile';
import EditPortfolioPage from './pages/EditPortfolioPage/EditPortfolioPage';

const isAuthenticated = Boolean(localStorage.getItem('designerIdStorage')); //로그인 상태 확인

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
        // {
        //   path: ROUTES.login,
        //   children: [
        //     { index: true, element: <PublicRoute element={<LoginPage />} isAuthenticated={isAuthenticated} /> },
        //     // { index: true, element: <PublicRoute element={<LoginPage />} isAuthenticated={false} /> }, //임시
        //     { path: ROUTES.loginCallback, element: <KakaoCallback /> },
        //   ],
        // },
        {
          path: ROUTES.signup,
          children: [
            { index: true, element: <PublicRoute element={<SignupPage />} isAuthenticated={isAuthenticated} /> },
            // { index: true, element: <PublicRoute element={<SignupPage />} isAuthenticated={false} /> }, //임시
            { path: ROUTES.signupSuccess, element: <SignupSuccessPage /> },
          ],
        },
        // {
        //   path: ROUTES.membership,
        //   children: [{ index: true, element: <MembershipPage /> }],
        // },
        {
          path: ROUTES.registerProfile,
          children: [{ index: true, element: <RegisterStep /> }],
        },
        {
          path: ROUTES.portfolioRegister,
          children: [{ index: true, element: <AddPortfolioInRegister /> }],
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
          element: (
            <PrivateWrapper isAuthenticated={isAuthenticated}>
              <Outlet />
            </PrivateWrapper>
          ),
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
