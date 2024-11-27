import React from 'react';

interface StickyButtonProps {
  text: string;
  onClick: () => void;
  color?: string;
}

const TypeOneButton: React.FC<StickyButtonProps> = ({
                                                     text,
                                                     onClick,
                                                     color,
                                                   }) => {
  const textColor =
    color === 'bg-primary'
      ? 'text-white'
      : color === 'bg-secondary'
        ? 'text-primary'
        : 'text-black';
  return (
    <div className="absolute bottom-0 w-full max-w-[480px]">
      <button
        className={`w-full min-h-[60px] text-sub_h1 px-4 py-2 ${color} ${textColor}`}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
};

export default TypeOneButton;
