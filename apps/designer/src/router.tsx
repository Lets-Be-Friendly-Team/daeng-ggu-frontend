// router.jsx
import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

// import '@/styles/sequenceAnimation.css';
import ROUTES from '@/constrants/routes.ts';
import MainPage from '@/pages/MainPage';

import App from './App';

export const router = createBrowserRouter([
  {
    path: ROUTES.main,
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
    ],
  },
]);
