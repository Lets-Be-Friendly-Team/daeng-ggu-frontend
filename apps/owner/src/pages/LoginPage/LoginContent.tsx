import { LogoImage, PageContainer } from '@daeng-ggu/design-system';

import KakaoLoginBtn from '@/components/KakaoLoginBtn/KakaoLoginBtn';

interface LoginContentProps {
  userType: 'C' | 'D';
}
const LoginContent = ({ userType }: LoginContentProps) => {
  return (
    <PageContainer>
      <div className='flex flex-col items-center gap-y-[2.4rem] py-[8rem]'>
        <img src={LogoImage} className='w-[10rem]' />
        <div>
          <div className='text-h1 font-bold'>
            <span className='text-primary'>댕꾸</span>
            <span>에 오신걸 환영해요!</span>
          </div>
          <div className='mt-[1.5rem] flex flex-col items-center gap-y-2 text-body3'>
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
        <KakaoLoginBtn />
      </div>
    </PageContainer>
  );
};
export default LoginContent;
