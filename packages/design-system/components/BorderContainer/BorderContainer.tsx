import React from 'react';
interface BorderedContainerProps {
  children: React.ReactNode;
  bgColor?: string;
  innerPadding?: string;
}

const BorderContainer = ({ children, bgColor = 'bg-secondary', innerPadding = '' }: BorderedContainerProps) => {
  return (
    <div className={`w-full min-w-[280px] rounded-lg px-6 py-6 ${bgColor}`}>
      <div className={`flex-col rounded-[8px] bg-white ${innerPadding}`}>{children}</div>
    </div>
  );
};

export default BorderContainer;
