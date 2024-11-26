import React from 'react';

interface BorderedContainerProps {
  children: React.ReactNode;
}

const BorderContainer: React.FC<BorderedContainerProps> = ({ children }) => {
  return (
    <div className="py-6 px-6 rounded-lg w-full min-w-[300px] bg-secondary">
      {children}
    </div>
  );
};

export default BorderContainer;
