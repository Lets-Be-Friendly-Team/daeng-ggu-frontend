import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import getUserInfo from '@/apis/login/GetUserInfo';
import ROUTES from '@/constants/routes';

const KakaoCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 추후 사용자 정보 가져오기 API 연동 시 사용
    const userInfoHandle = async () => {
      console.log(await getUserInfo());
      // 추후 회원가입 페이지로 갈지 홈으로 갈지 분기처리
    };
    userInfoHandle();
    navigate(ROUTES.main);
  }, [navigate]);
  return <></>;
};

export default KakaoCallback;
