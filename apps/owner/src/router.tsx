// router.jsx
import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { RouterErrorFallback } from '@daeng-ggu/shared';

import ROUTES from '@/constants/routes';
import InputTest from '@/pages/InputTest/InputTest';
import { MainPage } from '@/pages/MainPage';
import ProgressPage from '@/pages/ProgressPage/ProgressPage';
import Request from '@/pages/Request/Request';
import Test from '@/pages/Request/Test.tsx';
import DetailPage from '@/pages/Status/DetailPage.tsx';
import Status from '@/pages/Status/Status.tsx';
import Suggest from '@/pages/Suggest/Suggest.tsx';

import AddPetProfilePage from './pages/AddPetProfilePage/AddPetProfilePage';
import EditPetProfilePage from './pages/EditPetProfilePage/EditPetProfilePage';
import EditUserProfilePage from './pages/EditUserProfilePage/EditUserProfilePage';
import SearchResultPage from './pages/MainPage/SearchResultPage';
import MapPage from './pages/Map/MapPage';
import MyPage from './pages/MyPage/MyPage';
import ReviewDetailPage from './pages/ReviewDetailPage/ReviewDetailPage';
import App from './App';

import '@/styles/sequenceAnimation.css';

export const router = createBrowserRouter([
  {
    path: ROUTES.main,
    element: (
      <Suspense>
        <App />
      </Suspense>
    ),
    errorElement: <RouterErrorFallback />,
    children: [
      {
        index: true,
        element: <MainPage />,
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
        path: 'profile',
        element: <MyPage />,
      },
      {
        path: 'profile/edit',
        element: <EditUserProfilePage />,
      },
      {
        path: 'profile/edit/:petId',
        element: <EditPetProfilePage />,
      },
      {
        path: 'profile/pet/add',
        element: <AddPetProfilePage />,
      },
      {
        path: 'profile/review/:reviewId',
        element: <ReviewDetailPage />,
      },
    ],
  },
]);
