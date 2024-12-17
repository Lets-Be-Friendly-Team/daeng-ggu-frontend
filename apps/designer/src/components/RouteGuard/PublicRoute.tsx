import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import ROUTES from '@/constants/routes';

const PublicRoute = ({
  element,
  isAuthenticated,
  //   redirectPath,
}: {
  element: ReactNode;
  isAuthenticated: boolean;
  //   redirectPath: string;
}) => {
  return isAuthenticated ? <Navigate to={ROUTES.main} replace /> : element;
};

export default PublicRoute;
