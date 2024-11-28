import React from 'react';

interface BorderedContainerProps {
  children: React.ReactNode;
  bgColor?: string;
  innerPadding?: string;
}

const BorderContainer: React.FC<BorderedContainerProps> = ({ children, bgColor = 'bg-secondary', innerPadding = '' }) => {
  return (
    <div className={`py-6 px-6 rounded-lg w-full min-w-[300px] ${bgColor}`}>
      <div className={`flex-col rounded-[8px] bg-white ${innerPadding}`}>
        {children}
      </div>
    </div>
  );
};

export default BorderContainer;
