import { Outlet } from 'react-router';
import { Layout } from '@daeng-ggu/design-system';

import DesignerBottomTabBar from '@/components/BottomTabBar/DesignerBottomTabBar.tsx';
function App() {
  return (
    <Layout tab={<DesignerBottomTabBar />}>
      <Outlet />
    </Layout>
  );
}

export default App;
