import { useState } from 'react';
import { Outlet } from 'react-router';
import { Layout, ToastContainer } from '@daeng-ggu/design-system';
import { ModalContainer } from '@daeng-ggu/design-system';
// import { SSEHandler, useToast } from '@daeng-ggu/shared';
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
          queries: {
            throwOnError: true,
            retry: 0,
            // refetchOnWindowFocus: false,
            // refetchOnMount: false
          },
        },
      }),
  );
  return (
    <QueryClientProvider client={queryClient}>
      <QueryErrorResetBoundary>
        {/*<SSEHandler />*/}
        <Layout tab={<OwnerBottomTabBar />}>
          <ToastContainer />
          <ModalContainer />
          <Outlet />
          <ReactQueryDevtools initialIsOpen={false} />
        </Layout>
      </QueryErrorResetBoundary>
    </QueryClientProvider>
  );
}

export default App;
