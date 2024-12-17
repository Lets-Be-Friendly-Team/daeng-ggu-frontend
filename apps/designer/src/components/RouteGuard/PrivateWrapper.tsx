import { ReactNode, useEffect } from 'react';

const PrivateWrapper = ({ children, isAuthenticated }: { children: ReactNode; isAuthenticated: boolean }) => {
  // return isAuthenticated ? children : <Navigate to={`/${ROUTES.login}`} replace />;

  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = `${import.meta.env.VITE_OWNER_MAIN_URL}/login`;
    }
  }, [isAuthenticated]);
  return isAuthenticated ? <>{children}</> : null;
};

export default PrivateWrapper;
