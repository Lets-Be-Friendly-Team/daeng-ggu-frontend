import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { NavermapsProvider } from 'react-naver-maps';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { router } from '@/router.tsx';

import '@/styles/index.css';
import '@daeng-ggu/design-system/styles/index.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <NavermapsProvider ncpClientId={import.meta.env.VITE_NAVER_CLIENT_ID}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </NavermapsProvider>
    </QueryClientProvider>
  </StrictMode>,
);
