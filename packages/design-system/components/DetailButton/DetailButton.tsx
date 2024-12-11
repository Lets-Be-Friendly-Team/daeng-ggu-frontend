import { RightIcon } from '../../index.ts';

interface DetailButtonProps {
  text?: string;
  onClick?: () => void;
}

const DetailButton = ({ text = '상세보기', onClick }: DetailButtonProps) => (
  <button className='flex items-center text-iconCaption' onClick={onClick}>
    <p className='flex items-center'>
      <span>{text}</span>
      <span>
        <RightIcon size='h-[9px] w-[8px] pb-[1px]' />
      </span>
    </p>
  </button>
);

export default DetailButton;
