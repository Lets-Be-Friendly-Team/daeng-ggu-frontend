import { LogoImage, PageContainer } from '@daeng-ggu/design-system';

import KakaoLoginBtn from '@/components/KakaoLoginBtn/KakaoLoginBtn';

export interface LoginContentProps {
  userType: 'C' | 'D';
}
const LoginContent = ({ userType }: LoginContentProps) => {
  return (
    <PageContainer>
      <div className='flex flex-col items-center gap-y-[3rem] py-[10rem]'>
        <img src={LogoImage} className='w-[10rem]' alt='로고 이미지' />
        <div className='mb-[2rem]'>
          <div className='text-h2 font-bold'>
            <span className='text-primary'>댕꾸</span>
            <span>에 오신걸 환영해요!</span>
          </div>
          <div className='mt-[2.4rem] flex flex-col items-center gap-y-2 text-body2 text-gray-800'>
            {userType === 'C' ? (
              <>
                <p>댕꾸만의 견적서를 받아보고</p>
                <p>
                  <span className='text-primary'>우리 아이 맞춤 서비스</span>
                  <span>를 누려보세요</span>
                </p>
              </>
            ) : (
              <>
                <p>프리미엄 서비스를 제공하고</p>
                <p>
                  <span className='text-primary'>새로운 고객들</span>
                  <span>을 만나보세요</span>
                </p>
              </>
            )}
          </div>
        </div>
        <KakaoLoginBtn userType={userType} />
      </div>
    </PageContainer>
  );
};
export default LoginContent;
