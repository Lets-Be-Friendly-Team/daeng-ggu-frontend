import { Outlet } from 'react-router';
import { Layout } from '@daeng-ggu/design-system';

import OwnerBottomTabBar from './components/BottomTabBar/OwnerBottomTabBar';

function App() {
  return (
    <Layout>
      <Outlet />
      <OwnerBottomTabBar />
    </Layout>
  );
}

export default App;
