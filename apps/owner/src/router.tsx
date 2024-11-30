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

import MyPage from './pages/MyPage/MyPage';
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
    ],
  },
]);
