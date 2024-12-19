import { ReactNode } from 'react';
import { Navigate } from 'react-router';

type ModeOptionType = {
  [key: string]: {
    itemKey: string;
  };
};

const modeOption: ModeOptionType = {
  designer: {
    itemKey: 'designerIdStorage',
  },
  owner: {
    itemKey: 'ownerIdStorage',
  },
};

const PrivateWrapper = ({ children, mode }: { children: ReactNode; mode: string }) => {
  const isAuthenticated = !!localStorage.getItem(modeOption[mode].itemKey); // 로그인 상태 확인

  if (!isAuthenticated) {
    if (mode === 'designer') {
      window.location.href = import.meta.env.VITE_OWNER_MAIN_URL + '/login'; // '/'로 이동
      return null; // 컴포넌트 렌더링 중단
    }
    return <Navigate to={'/login'} replace />;
  }

  return children;
};

export default PrivateWrapper;
