// router.jsx
import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { LogContainer, RouterErrorFallback } from '@daeng-ggu/shared';

import App from '@/App';
import ROUTES from '@/constants/routes';
import AddPetProfilePage from '@/pages/AddPetProfilePage/AddPetProfilePage';
import CreateReviewPage from '@/pages/CreateReviewPage/CreateReviewPage';
import EditPetProfilePage from '@/pages/EditPetProfilePage/EditPetProfilePage';
import EditUserProfilePage from '@/pages/EditUserProfilePage/EditUserProfilePage';
import InputTest from '@/pages/InputTest/InputTest';
import LoginPage from '@/pages/LoginPage/LoginPage';
import { MainPage } from '@/pages/MainPage';
import SearchResultPage from '@/pages/MainPage/SearchResultPage';
import MapPage from '@/pages/Map/MapPage';
import MyPage from '@/pages/MyPage/MyPage';
import ProgressPage from '@/pages/ProgressPage/ProgressPage';
import Request from '@/pages/Request/Request';
import Test from '@/pages/Request/Test.tsx';
import ReservationPage from '@/pages/ReservationPage/ReservationPage';
import ReviewDetailPage from '@/pages/ReviewDetailPage/ReviewDetailPage';
import DetailDesigner from '@/pages/Status/DetailDesigner.tsx';
import DetailPage from '@/pages/Status/DetailPage.tsx';
import Status from '@/pages/Status/Status.tsx';
import Suggest from '@/pages/Suggest/Suggest.tsx';

import SignUpPage from './pages/SignUp/SignUpPage';

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
        children: [{ index: true, element: <LoginPage /> }],
      },
      {
        path: ROUTES.signup,
        children: [{ index: true, element: <SignUpPage /> }],
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
        path: ROUTES.bid,
        children: [
          {
            index: true,
            element: <Status />,
          },
          {
            path: 'request',
            element: <Request />,
          },
          {
            path: 'detail',
            element: <DetailPage />,
          },
          {
            path: 'test',
            element: <Test />,
          },

          {
            path: 'designer',
            element: <Status />,
          },
          {
            path: 'suggest',
            element: <Suggest />,
          },
          {
            path: 'detailDesigner',
            element: <DetailDesigner />,
          },
        ],
      },
      {
        path: 'input/test',
        children: [
          {
            index: true,
            element: <InputTest />,
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
    ],
  },
]);
