// router.jsx
import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import AddressTest from '@/pages/AddressTest/AddressTest';
import InputTest from '@/pages/InputTest/InputTest';
import { MainPage } from '@/pages/MainPage';
import Request from '@/pages/Request/Request';
import Test from '@/pages/Request/Test';
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
        path: 'address',
        children: [
          {
            path: 'test',
            element: <AddressTest />,
          },
        ],
      },
    ],
  },
]);
