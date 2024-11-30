import { ReactNode } from 'react';

const PageContainer = ({ children }: { children: ReactNode }) => {
  return <div className='px-[2rem]'>{children}</div>;
};

export default PageContainer;
