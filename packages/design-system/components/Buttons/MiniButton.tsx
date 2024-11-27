interface IButtonProps {
  text: String;
  isActive?: boolean;
  onClick?: () => void;
}
const MiniButton = ({ text, isActive, onClick }: IButtonProps) => {
  return (
    <div
      className={`${isActive ? 'border border-primary bg-secondary text-primary' : 'bg-gray-50 text-gray-700'} flex h-[27px] w-[46px] justify-center rounded align-middle text-iconCaption`}
      onClick={onClick}
    >
      <div className='flex h-full w-auto items-center align-middle'>{text}</div>
    </div>
  );
};
export default MiniButton;
