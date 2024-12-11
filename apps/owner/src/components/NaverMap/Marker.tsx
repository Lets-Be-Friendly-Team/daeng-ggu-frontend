import { ReactNode } from 'react';

const Marker = ({ children, title }: { children: ReactNode; title?: string }) => {
  return (
    <div className='flex flex-col items-center justify-center gap-1'>
      {children}
      <div className='flex stroke-red-800 stroke-2 text-iconCaption font-semibold'>{title}</div>
    </div>
  );
};

export default Marker;
