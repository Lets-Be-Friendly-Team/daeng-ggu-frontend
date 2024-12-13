import { ReactNode } from 'react';
import { Navigate } from 'react-router';

import ROUTES from '@/constants/routes';

const PrivateWrapper = ({ children, isAuthenticated }: { children: ReactNode; isAuthenticated: boolean }) => {
  return isAuthenticated ? children : <Navigate to={`/${ROUTES.login}`} replace />;
};

export default PrivateWrapper;
