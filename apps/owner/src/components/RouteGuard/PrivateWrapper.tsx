import { ReactNode } from 'react';
import { Navigate } from 'react-router';

import ROUTES from '@/constants/routes';

const PrivateWrapper = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = !!localStorage.getItem('ownerIdStorage'); //로그인 상태 확인
  if (!isAuthenticated) {
    return <Navigate to={'/' + ROUTES.login} replace />;
  }
  return children;
};

export default PrivateWrapper;
