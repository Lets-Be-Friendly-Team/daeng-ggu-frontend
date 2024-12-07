// router.jsx
import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { LogContainer, RouterErrorFallback } from '@daeng-ggu/shared';

// import '@/styles/sequenceAnimation.css';
import ROUTES from '@/constants/routes';
import MainPage from '@/pages/MainPage';
import MyPage from '@/pages/MyPage/MyPage';

import App from './App';

export const router = createBrowserRouter([
  {
    path: ROUTES.main,
    errorElement: (
      <LogContainer log='designer app'>
        <RouterErrorFallback />
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
      {
        path: ROUTES.profile,
        element: <MyPage />,
      },
    ],
  },
]);
