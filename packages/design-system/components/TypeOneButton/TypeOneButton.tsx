interface StickyButtonProps {
  text: string;
  onClick: () => void;
  color?: string;
}

const TypeOneButton = ({ text, onClick, color }: StickyButtonProps) => {
  const textColor = color === 'bg-primary' ? 'text-white' : color === 'bg-secondary' ? 'text-primary' : 'text-black';
  return (
    <div className='absolute bottom-0 w-full max-w-[480px]'>
      <button className={`min-h-[60px] w-full px-4 py-2 text-sub_h1 ${color} ${textColor}`} onClick={onClick}>
        {text}
      </button>
    </div>
  );
};

export default TypeOneButton;
