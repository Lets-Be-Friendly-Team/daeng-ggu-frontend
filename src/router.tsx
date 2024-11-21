import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { MainPage } from '@/pages/MainPage';

import App from './App';

export const router = createBrowserRouter([
  {
    path: '',
    element: (
      <Suspense>
        <App />
      </Suspense>
    ),
    children: [{ index: true, path: '/', element: <MainPage /> }],
  },
]);
