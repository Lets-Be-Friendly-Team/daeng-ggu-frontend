import { ReactNode } from 'react';

const LogContainer = ({ children, log }: { children: ReactNode; log: string }) => {
  console.log(log);
  return <>{children}</>;
};

export default LogContainer;
