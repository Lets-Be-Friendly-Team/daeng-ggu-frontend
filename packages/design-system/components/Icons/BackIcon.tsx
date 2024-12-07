import { cn } from '../../lib/utils';

interface IBackIconProps {
  className?: string;
}
const BackIcon = ({ className }: IBackIconProps) => {
  return (
    <svg
      className={cn('stroke-gray-800', className)}
      viewBox='0 0 18 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M13 2L5 9L13 16' stroke='#080808' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};

export default BackIcon;
