import { Suspense } from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import { LogContainer, NotFound, Notification, PrivateWrapper, RouterErrorFallback } from '@daeng-ggu/shared';

import App from '@/App';
import ROUTES from '@/constants/routes';
import AddPetProfilePage from '@/pages/AddPetProfilePage/AddPetProfilePage';
import CreateReviewPage from '@/pages/CreateReviewPage/CreateReviewPage';
import DesignerProfilePage from '@/pages/DesignerProfilePage/DesignerProfilePage';
import DirectRequestPage from '@/pages/DirectRequestPage/DirectRequestPage.tsx';
import EditPetProfilePage from '@/pages/EditPetProfilePage/EditPetProfilePage';
import EditUserProfilePage from '@/pages/EditUserProfilePage/EditUserProfilePage';
import FeedPage from '@/pages/FeedPage/FeedPage';
import KakaoCallback from '@/pages/KakaoCallback/KakaoCallback';
import LoginPage from '@/pages/LoginPage/LoginPage';
import { MainPage } from '@/pages/MainPage';
import SearchResultPage from '@/pages/MainPage/SearchResultPage';
import MapPage from '@/pages/Map/MapPage';
import MyPage from '@/pages/MyPage/MyPage';
import PaymentPage from '@/pages/PaymentPage/PaymentPage.tsx';
import PaymentSuccessPage from '@/pages/PaymentPage/PaymentSuccessPage.tsx';
import PaymentSuccessPageForDirect from '@/pages/PaymentPage/PaymentSuccessPageForDirect.tsx';
import PortfolioDetailPage from '@/pages/PortfolioDetailPage/PortfolioDetailPage';
import ProgressPage from '@/pages/ProgressPage/ProgressPage';
import Request from '@/pages/Request/Request';
import Test from '@/pages/Request/Test.tsx';
import ReservationPage from '@/pages/ReservationPage/ReservationPage';
import ReviewDetailPage from '@/pages/ReviewDetailPage/ReviewDetailPage';
import SignupPage from '@/pages/Signup/SignupPage';
import SignupSuccessPage from '@/pages/Signup/SignupSuccessPage';
import DetailDesigner from '@/pages/Status/DetailDesigner.tsx';
import DetailPage from '@/pages/Status/DetailPage';
import Status from '@/pages/Status/Status.tsx';
import Suggest from '@/pages/Suggest/Suggest.tsx';

import PublicRoute from './components/RouteGuard/PublicRoute'; //로그인 된 상태면 접근 제한
import EditReviewPage from './pages/EditReviewPage/EditReviewPage';

import '@/styles/sequenceAnimation.css';

const isAuthenticated = Boolean(localStorage.getItem('ownerIdStorage')); //로그인 상태 확인

// const isAuthenticated = true; //로그인 상태 true로 임시 설정

export const router = createBrowserRouter([
  {
    path: ROUTES.main,
    element: (
      <Suspense>
        <App />
      </Suspense>
    ),
    errorElement: (
      <LogContainer log='owner app'>
        <RouterErrorFallback />
      </LogContainer>
    ),
    children: [
      {
        index: true,
        element: <MainPage />,
      },

      {
        path: ROUTES.login,
        children: [
          // { index: true, element: <PublicRoute element={<LoginPage />} isAuthenticated={isAuthenticated} /> },
          { index: true, element: <LoginPage /> }, //임시
          { path: ROUTES.loginCallback, element: <KakaoCallback /> },
        ],
      },
      {
        path: ROUTES.signup,
        children: [
          { index: true, element: <PublicRoute element={<SignupPage />} isAuthenticated={isAuthenticated} /> },
          // { index: true, element: <PublicRoute element={<SignupPage />} isAuthenticated={false} /> }, //임시
          { path: ROUTES.signupSuccess, element: <SignupSuccessPage /> },
        ],
      },
      {
        path: ROUTES.feed,
        element: <FeedPage />,
      },

      {
        path: ROUTES.map,
        children: [{ index: true, element: <MapPage /> }],
      },
      {
        path: ROUTES.search,
        element: <SearchResultPage />,
      },
      {
        path: ROUTES.notification,
        element: (
          <PrivateWrapper mode='owner'>
            <Outlet />
          </PrivateWrapper>
        ),
        children: [{ index: true, element: <Notification /> }],
      },
      {
        path: ROUTES.bid,
        element: (
          <PrivateWrapper mode='owner'>
            <Outlet />
          </PrivateWrapper>
        ),
        children: [
          {
            index: true,
            element: <Status />,
          },
          {
            path: ROUTES.bidRequest,
            element: <Request />,
          },
          {
            path: ROUTES.bidDetail,
            element: <DetailPage />,
          },
          {
            path: ROUTES.bidTest,
            element: <Test />,
          },

          {
            path: ROUTES.bidDesigner,
            element: <Status />,
          },
          {
            path: ROUTES.bidSuggest,
            element: <Suggest />,
          },
          {
            path: ROUTES.bidDetailDesigner,
            element: <DetailDesigner />,
          },
          {
            path: ROUTES.bidDirect,
            element: <DirectRequestPage />,
          },
        ],
      },
      {
        path: ROUTES.progress(),
        element: (
          <PrivateWrapper mode='owner'>
            <Outlet />
          </PrivateWrapper>
        ),
        children: [
          {
            index: true,
            element: <ProgressPage />,
          },
        ],
      },
      {
        path: ROUTES.review,
        element: <CreateReviewPage />,
      },
      {
        path: ROUTES.reviewEdit,
        element: <EditReviewPage />,
      },
      {
        path: ROUTES.reservation,
        element: (
          <PrivateWrapper mode='owner'>
            <Outlet />
          </PrivateWrapper>
        ),
        children: [{ index: true, element: <ReservationPage /> }],
      },
      {
        path: ROUTES.profile,
        element: (
          <PrivateWrapper mode='owner'>
            <Outlet />
          </PrivateWrapper>
        ),
        children: [
          {
            index: true,
            element: <MyPage />,
          },
          {
            path: ROUTES.profileEdit,
            element: <EditUserProfilePage />,
          },
          {
            path: ROUTES.profileEditPet,
            element: <EditPetProfilePage />,
          },
          {
            path: ROUTES.profileAddPet,
            element: <AddPetProfilePage />,
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
            path: ROUTES.designerProfile,
            element: <DesignerProfilePage />,
          },
        ],
      },
      {
        path: ROUTES.payment,
        children: [
          {
            index: true,
            element: <PaymentPage />,
          },
          {
            path: ROUTES.paymentSuccess,
            element: <PaymentSuccessPage />,
          },
        ],
      },
      {
        path: ROUTES.paymentDirect,
        children: [
          {
            index: true,
            element: <PaymentPage />,
          },
          {
            path: ROUTES.paymentDirectSuccess,
            element: <PaymentSuccessPageForDirect />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
