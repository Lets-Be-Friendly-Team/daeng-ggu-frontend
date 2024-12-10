import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import ROUTES from '@/constants/routes';

const KakaoCallback = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // 추후 사용자 정보 가져오기 API 연동 시 사용
    navigate(ROUTES.main);
  }, [navigate]);
  return <></>;
};

export default KakaoCallback;
