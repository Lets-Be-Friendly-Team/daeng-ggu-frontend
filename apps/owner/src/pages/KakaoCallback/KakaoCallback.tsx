import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import ROUTES from '@/constants/routes';
import useGetUserInfo from '@/hooks/queries/Login/useGetUserInfo';

const KakaoCallback = () => {
  const navigate = useNavigate();
  const { data, error } = useGetUserInfo();

  useEffect(() => {
    if (data?.status === 'SUCCESS') {
      const userInfo = data.data;
      if (userInfo.userType === 'C') {
        //보호자일 경우
        console.log(data);
        //가입 되어있는 유저면 로컬스토리지에 토큰 저장후 메인으로 이동
        if (data.data.joinYn === 'Y') {
          localStorage.setItem('T', userInfo.refreshToken);
          // window.location.href = import.meta.env.VITE_OWNER_MAIN_URL;
          navigate(ROUTES.main);
        } else {
          //아니면 회원가입 페이지로 이동
          navigate(`/${ROUTES.signup}`);
        }
      } else if (userInfo.userType === 'D') {
        //디자이너일 경우
        console.log(data);
        //가입 되어있는 유저면 로컬스토리지에 토큰 저장후 디자이너 메인으로 이동
        if (data.data.joinYn === 'Y') {
          localStorage.setItem('T', userInfo.refreshToken);
          window.location.href = import.meta.env.VITE_DESIGNER_MAIN_URL;
        } else {
          //아니면 디자이너 회원가입 페이지로 이동
          window.location.href = `${import.meta.env.VITE_DESIGNER_MAIN_URL}/signup`;
        }
      }
    }
  }, [data, navigate]);
  if (error) return <p>Error: {error.message}</p>;

  return <></>;
};

export default KakaoCallback;
