import { useState } from 'react';
import { Outlet } from 'react-router';
import { Layout, ModalContainer, ToastContainer } from '@daeng-ggu/design-system';
import { useToast } from '@daeng-ggu/shared';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import DesignerBottomTabBar from '@/components/BottomTabBar/DesignerBottomTabBar.tsx';

function App() {
  console.log('designer app');
  const { showToast } = useToast();

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          mutations: { onError: (error) => showToast({ message: error.message, type: 'error' }) },
          queries: { throwOnError: true, retry: 0 },
        },
      }),
  );
  return (
    <QueryClientProvider client={queryClient}>
      <Layout tab={<DesignerBottomTabBar />}>
        <ToastContainer />
        <ModalContainer />
        <Outlet />
        <ReactQueryDevtools initialIsOpen={false} />
      </Layout>
    </QueryClientProvider>
  );
}

export default App;
