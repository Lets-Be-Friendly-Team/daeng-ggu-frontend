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
      localStorage.setItem('T', userInfo.refreshToken);
      if (userInfo.userType === 'C') {
        //보호자일 경우
        console.log(data);
        if (data.data.joinYn === 'Y') {
          window.location.href = import.meta.env.VITE_OWNER_MAIN_URL;
        } else {
          navigate(`/${ROUTES.signup}`);
        }
      } else if (userInfo.userType === 'D') {
        //디자이너일 경우
        console.log(data);
        if (data.data.joinYn === 'Y') {
          window.location.href = import.meta.env.VITE_DESIGNER_MAIN_URL;
        } else {
          window.location.href = `${import.meta.env.VITE_DESIGNER_MAIN_URL}/signup`;
        }
      }
    }
  }, [data, navigate]);
  if (error) return <p>Error: {error.message}</p>;

  return <></>;
};

export default KakaoCallback;
