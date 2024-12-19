// router.jsx
import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { LogContainer, NotFound, RouterErrorFallback } from '@daeng-ggu/shared';

// import '@/styles/sequenceAnimation.css';
import ROUTES from '@/constants/routes';
import MainPage from '@/pages/MainPage/MainPage';
import ProgressPage from '@/pages/ProgressPage/ProgressPage';

import App from './App';

export const router = createBrowserRouter(
  [
    {
      path: ROUTES.main,
      errorElement: (
        <LogContainer log='guardian app'>
          <RouterErrorFallback href='guardian/' />
        </LogContainer>
      ),
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
        { path: ROUTES.progress(), element: <ProgressPage /> },
        {
          path: '*',
          element: <NotFound />,
        },
      ],
    },
  ],
  { basename: '/guardian' },
);
