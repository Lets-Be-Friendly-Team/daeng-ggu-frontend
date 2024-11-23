// router.jsx
import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import TestWrapper from '@/components/_common/Layout/TestWrapper.tsx';
import { MainPage } from '@/pages/MainPage';
import Request from '@/pages/Request/Request';
import Test from '@/pages/Request/Test';

import App from './App';

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
        element: <TestWrapper />,
        children: [
          {
            index: true,
            element: <Test />,
          },
          {
            path: 'request',
            element: <Request />,
          },
        ],
      },
    ],
  },
]);
