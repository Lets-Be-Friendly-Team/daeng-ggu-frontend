// router.jsx
import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import ROUTES from '@/constants/routes';
import InputTest from '@/pages/InputTest/InputTest';
import { MainPage } from '@/pages/MainPage';
import ProgressPage from '@/pages/ProgressPage/ProgressPage';
import Request from '@/pages/Request/Request';
import DetailPage from '@/pages/Status/DetailPage.tsx';
import Status from '@/pages/Status/Status.tsx';

import SearchResultPage from './pages/MainPage/SearchResultPage';
import MapPage from './pages/Map/MapPage';
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
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: 'search',
        element: <SearchResultPage />,
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
        path: ROUTES.progress,
        children: [
          {
            index: true,
            element: <ProgressPage />,
          },
        ],
      },
      {
        path: 'map',
        children: [{ index: true, element: <MapPage /> }],
      },
    ],
  },
]);
