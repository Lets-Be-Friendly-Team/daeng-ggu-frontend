import { useState } from 'react';
import { NavermapsProvider } from 'react-naver-maps';
import { Outlet } from 'react-router';
import { Layout, ModalContainer, ToastContainer } from '@daeng-ggu/design-system';
import { useToast } from '@daeng-ggu/shared';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import DesignerBottomTabBar from '@/components/BottomTabBar/DesignerBottomTabBar.tsx';
function App() {
  console.log('guardian app');
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
      <NavermapsProvider ncpClientId={import.meta.env.VITE_NAVER_CLIENT_ID}>
        <Layout tab={<DesignerBottomTabBar />}>
          <ToastContainer />
          <ModalContainer />
          <Outlet />
          <ReactQueryDevtools initialIsOpen={false} />
        </Layout>
      </NavermapsProvider>
    </QueryClientProvider>
  );
}

export default App;
