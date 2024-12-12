import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { LogContainer, RouterErrorFallback } from '@daeng-ggu/shared';
import { Notification } from '@daeng-ggu/shared';

import App from '@/App';
import ROUTES from '@/constants/routes';
import AddPetProfilePage from '@/pages/AddPetProfilePage/AddPetProfilePage';
import CreateReviewPage from '@/pages/CreateReviewPage/CreateReviewPage';
import DesignerProfilePage from '@/pages/DesignerProfilePage/DesignerProfilePage';
import EditPetProfilePage from '@/pages/EditPetProfilePage/EditPetProfilePage';
import EditUserProfilePage from '@/pages/EditUserProfilePage/EditUserProfilePage';
import FeedPage from '@/pages/FeedPage/FeedPage';
import KakaoCallback from '@/pages/KakaoCallback/KakaoCallback';
import LoginPage from '@/pages/LoginPage/LoginPage';
import { MainPage } from '@/pages/MainPage';
import SearchResultPage from '@/pages/MainPage/SearchResultPage';
import MapPage from '@/pages/Map/MapPage';
import MyPage from '@/pages/MyPage/MyPage';
import PortfolioDetailPage from '@/pages/PortfolioDetailPage/PortfolioDetailPage';
import ProgressPage from '@/pages/ProgressPage/ProgressPage';
import Request from '@/pages/Request/Request';
import Test from '@/pages/Request/Test.tsx';
import ReservationPage from '@/pages/ReservationPage/ReservationPage';
import ReviewDetailPage from '@/pages/ReviewDetailPage/ReviewDetailPage';
import SignupPage from '@/pages/Signup1/SignupPage1';
import SignupSuccessPage from '@/pages/Signup1/SignupSuccessPage';
import DetailDesigner from '@/pages/Status/DetailDesigner.tsx';
import DetailPage from '@/pages/Status/DetailPage';
import Status from '@/pages/Status/Status.tsx';
import Suggest from '@/pages/Suggest/Suggest.tsx';

import '@/styles/sequenceAnimation.css';

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
          { index: true, element: <LoginPage /> },
          { path: ROUTES.loginCallback, element: <KakaoCallback /> },
        ],
      },
      {
        path: ROUTES.signup,
        children: [
          { index: true, element: <SignupPage /> },
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
        element: <Notification />,
      },
      {
        path: ROUTES.bid,
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
        ],
      },
      {
        path: ROUTES.progress,
        children: [
          {
            index: true,
            element: <ProgressPage />,
          },
        ],
      },
      {
        path: ROUTES.review,
        children: [
          {
            index: true,
            element: <CreateReviewPage />,
          },
        ],
      },
      {
        path: ROUTES.profile,
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
        path: ROUTES.reservation,
        element: <ReservationPage />,
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
]);
