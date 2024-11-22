import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { MainPage } from '@/pages/MainPage';
import Request from '@/pages/Request/Request.tsx';
import Test from '@/pages/Request/Test.tsx';

import App from './App';

export const router = createBrowserRouter([
  {
    path: '',
    element: (
      <Suspense>
        <App />
      </Suspense>
    ),
    children: [
      {
        index: true,
        path: '/',
        element: <MainPage />,
      },
      {
        index: true,
        path: '/test',
        element: <Test />,
      },
      {
        index: true,
        path: '/request',
        element: <Request />,
      },
    ],
  },
]);
