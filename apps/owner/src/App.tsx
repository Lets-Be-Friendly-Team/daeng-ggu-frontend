import { useState } from 'react';
import { NavermapsProvider } from 'react-naver-maps';
import { Outlet } from 'react-router';
import { Layout, ToastContainer } from '@daeng-ggu/design-system';
import { ModalContainer } from '@daeng-ggu/design-system';
import { useToast } from '@daeng-ggu/shared';
import { QueryClient, QueryClientProvider, QueryErrorResetBoundary } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import OwnerBottomTabBar from './components/BottomTabBar/OwnerBottomTabBar';

function App() {
  console.log('owner app');
  const { showToast } = useToast();

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          mutations: { onError: (error) => showToast({ message: error.message, type: 'error' }) },
          queries: { throwOnError: true },
        },
      }),
  );
  return (
    <QueryClientProvider client={queryClient}>
      <QueryErrorResetBoundary>
        <NavermapsProvider ncpClientId={import.meta.env.VITE_NAVER_CLIENT_ID}>
          <Layout tab={<OwnerBottomTabBar />}>
            <ToastContainer />
            <ModalContainer />
            <Outlet />
            <ReactQueryDevtools initialIsOpen={false} />
          </Layout>
        </NavermapsProvider>
      </QueryErrorResetBoundary>
    </QueryClientProvider>
  );
}

export default App;
