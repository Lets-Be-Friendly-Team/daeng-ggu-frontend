import { ReactNode } from 'react';

const Layout = ({ children, tab }: { children: ReactNode; tab?: ReactNode }) => {
  return (
    <div className='flex h-[100vh] w-full flex-col items-center overflow-x-hidden bg-gray-400 font-pretendard-variable scrollbar-hide'>
      <div className='flex w-full min-w-[32rem] max-w-[48rem] flex-1 flex-col bg-white'>
        <div className='flex w-full flex-col'>{children}</div>
        {tab}
      </div>
    </div>
  );
};

export default Layout;
