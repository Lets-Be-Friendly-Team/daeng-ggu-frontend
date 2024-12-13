import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import ROUTES from '@/constants/routes';
import useGetUserInfo from '@/hooks/queries/Login/useGetUserInfo';
import useDesignerIdStore from '@/stores/useDesignerIdStore';
import useOwnerIdStore from '@/stores/useOwnerIdStore';

const KakaoCallback = () => {
  const navigate = useNavigate();
  const { data, error } = useGetUserInfo();
  const { setOwnerId } = useOwnerIdStore();
  const { setDesignerId } = useDesignerIdStore();
  useEffect(() => {
    if (data?.status === 'SUCCESS') {
      const userInfo = data.data;
      if (userInfo.userType === 'C') {
        //보호자일 경우
        console.log(data);
        //가입 되어있는 유저면 로컬스토리지에 토큰 및 id 저장후 메인으로 이동
        if (data.data.joinYn === 'Y') {
          localStorage.setItem('T', userInfo.refreshToken);
          setOwnerId(userInfo.id);
          navigate(ROUTES.main);
        } else {
          //아니면 회원가입 페이지로 이동
          navigate(`/${ROUTES.signup}`);
        }
      } else if (userInfo.userType === 'D') {
        //디자이너일 경우
        console.log(data);
        //가입 되어있는 유저면 로컬스토리지에 토큰 및 id 저장후 디자이너 메인으로 이동
        if (data.data.joinYn === 'Y') {
          localStorage.setItem('T', userInfo.refreshToken);
          setDesignerId(userInfo.id);
          window.location.href = import.meta.env.VITE_DESIGNER_MAIN_URL;
        } else {
          //아니면 디자이너 회원가입 페이지로 이동
          window.location.href = `${import.meta.env.VITE_DESIGNER_MAIN_URL}/signup`;
        }
      }
    }
  }, [data, navigate, setDesignerId, setOwnerId]);
  if (error) return <p>Error: {error.message}</p>;

  return <></>;
};

export default KakaoCallback;
