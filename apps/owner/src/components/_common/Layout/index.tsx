import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='h- flex w-full flex-col items-center overflow-x-hidden bg-gray-50 font-pretendard-variable'>
      <div className='flex h-auto w-full min-w-[32rem] max-w-[48rem] flex-1 flex-col bg-white'>
        <div className='flex w-full flex-col'>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
