import { HTMLAttributes } from 'react';

interface IButtonProps extends HTMLAttributes<HTMLButtonElement> {
  text: string;
  isActive?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}
const MiniButton = ({ text, isActive, onClick, disabled, ...props }: IButtonProps) => {
  return (
    <div
      className={`${isActive ? 'border border-primary bg-secondary text-primary' : 'bg-gray-50 text-gray-700'} inline-flex h-[27px] min-w-[46px] justify-center rounded px-2 align-middle text-iconCaption`}
    >
      <button
        disabled={disabled}
        onClick={onClick}
        className='flex h-full w-auto items-center break-keep align-middle'
        {...props}
      >
        {text}
      </button>
    </div>
  );
};
export default MiniButton;
