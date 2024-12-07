import { LoginContentProps } from '@/pages/LoginPage/LoginContent';

import KakaoIcon from './KakaoIcon';

const KakaoLoginBtn = ({ userType }: LoginContentProps) => {
  const handleClickLogin = () => {
    // 서버에 userType 보내주기
    console.log(userType);
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
