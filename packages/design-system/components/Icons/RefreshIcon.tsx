import { cn } from '../../lib/utils';

const RefreshIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      className={cn(className)}
      width='18'
      height='18'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M4 3.99999V8.99999H4.582M4.582 8.99999C5.24585 7.35812 6.43568 5.9829 7.96503 5.08985C9.49438 4.1968 11.2768 3.8364 13.033 4.06513C14.7891 4.29386 16.4198 5.09878 17.6694 6.35377C18.919 7.60875 19.7168 9.24285 19.938 11M4.582 8.99999H9M20 20V15H19.419M19.419 15C18.7542 16.6409 17.564 18.015 16.0348 18.9073C14.5056 19.7995 12.7237 20.1595 10.9681 19.9309C9.21246 19.7022 7.5822 18.8979 6.33253 17.6437C5.08287 16.3896 4.28435 14.7564 4.062 13M19.419 15H15'
        stroke='white'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default RefreshIcon;