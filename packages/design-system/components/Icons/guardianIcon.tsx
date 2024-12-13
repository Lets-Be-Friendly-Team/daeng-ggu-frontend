import { cn } from '../../lib/utils';

const GuardianIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      className={cn('stroke-gray-700', className)}
      width='36'
      height='36'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M12 2.94397C14.3567 5.05858 17.4561 6.15189 20.618 5.98397C20.867 6.94797 21 7.95797 21 8.99997C21 14.592 17.176 19.29 12 20.622C6.824 19.29 3 14.591 3 8.99997C2.99918 7.98252 3.12754 6.96908 3.382 5.98397C6.5439 6.15189 9.64327 5.05858 12 2.94397Z'
        fill='#6D8CFB'
      />
      <path
        d='M9 12L11 14L15 9.99997M20.618 5.98397C17.4561 6.15189 14.3567 5.05858 12 2.94397C9.64327 5.05858 6.5439 6.15189 3.382 5.98397C3.12754 6.96908 2.99918 7.98252 3 8.99997C3 14.591 6.824 19.29 12 20.622C17.176 19.29 21 14.592 21 8.99997C21 7.95797 20.867 6.94797 20.618 5.98397Z'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default GuardianIcon;
