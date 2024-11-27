// router.jsx
import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { MainPage } from '@/pages/MainPage';
import Request from '@/pages/Request/Request';
import Test from '@/pages/Request/Test';

import App from './App';

import '@/styles/sequenceAnimation.css';
import Status from '@/pages/Status/Status.tsx';

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
        path: 'test',
        children: [
          {
            index: true,
            element: <Test />,
          },
          {
            path: 'request',
            element: <Request />,
          },
          {
            path: 'status',
            element: <Status />,
          },
        ],
      },
    ],
  },
]);
