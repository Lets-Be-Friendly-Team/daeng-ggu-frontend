// router.jsx
import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import InputTest from '@/pages/InputTest/InputTest';
import { MainPage } from '@/pages/MainPage';
import ProgressPage from '@/pages/ProgressPage/ProgressPage';
import Request from '@/pages/Request/Request';
import DetailPage from '@/pages/Status/DetailPage.tsx';
import Status from '@/pages/Status/Status.tsx';

import App from './App';

import '@/styles/sequenceAnimation.css';

export const router = createBrowserRouter([
  {
    path: '/',
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
        path: 'bid',
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
        path: 'progress',
        children: [
          {
            index: true,
            element: <ProgressPage />,
          },
        ],
      },
    ],
  },
]);
