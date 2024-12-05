import { Outlet } from 'react-router';
import { Layout } from '@daeng-ggu/design-system';
import { ModalContainer } from '@daeng-ggu/shared';

import OwnerBottomTabBar from './components/BottomTabBar/OwnerBottomTabBar';

function App() {
  return (
    <Layout tab={<OwnerBottomTabBar />}>
      <ModalContainer />
      <Outlet />
    </Layout>
  );
}

export default App;
