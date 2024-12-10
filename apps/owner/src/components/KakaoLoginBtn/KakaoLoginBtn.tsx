import getLogin from '@/apis/login/getLogin';
import { LoginContentProps } from '@/pages/LoginPage/LoginContent';

import KakaoIcon from './KakaoIcon';

const KakaoLoginBtn = ({ userType }: LoginContentProps) => {
  const handleClickLogin = async () => {
    const data = await getLogin({ userType });
    window.location.href = data.data;
  };
  return (
    <div
      onClick={handleClickLogin}
      className='flex cursor-pointer items-center gap-x-[2.4rem] rounded-md bg-[#FEE500] px-[3rem] py-[1.6rem] text-body2'
    >
      <KakaoIcon />
      카카오로 시작하기
    </div>
  );
};

export default KakaoLoginBtn;
