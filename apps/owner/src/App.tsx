import { Outlet } from 'react-router';
import { Layout } from '@daeng-ggu/design-system';

function App() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

export default App;
