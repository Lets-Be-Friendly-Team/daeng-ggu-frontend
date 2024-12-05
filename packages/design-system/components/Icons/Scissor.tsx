interface IScissorIconProps {
  className?: string;
}
const Scissor = ({ className }: IScissorIconProps) => {
  return (
    <svg viewBox='0 0 25 25' fill='none' xmlns='http://www.w3.org/2000/svg' className={className}>
      <path
        d='M13.7914 12.5L21.2562 5.01641C21.3734 4.89922 21.2914 4.69531 21.125 4.69531H19.0039C18.9547 4.69531 18.9055 4.71406 18.8727 4.74922L12.4672 11.1711L10.3531 9.05C10.6461 8.53203 10.8148 7.93438 10.8148 7.29688C10.8148 5.33047 9.21875 3.73438 7.25234 3.73438C5.28594 3.73438 3.68984 5.33047 3.68984 7.29688C3.68984 9.26328 5.28594 10.8594 7.25234 10.8594C7.90156 10.8594 8.50859 10.6859 9.03125 10.3836L11.1406 12.5L9.02891 14.6164C8.48829 14.3037 7.87456 14.1395 7.25 14.1406C5.28359 14.1406 3.6875 15.7367 3.6875 17.7031C3.6875 19.6695 5.28359 21.2656 7.25 21.2656C9.21641 21.2656 10.8125 19.6695 10.8125 17.7031C10.8125 17.0656 10.6437 16.468 10.3508 15.95L12.4648 13.8289L18.8703 20.2508C18.9055 20.2859 18.9523 20.3047 19.0016 20.3047H21.125C21.2914 20.3047 21.3758 20.1031 21.2562 19.9836L13.7914 12.5ZM7.25 9.17188C6.21641 9.17188 5.375 8.33047 5.375 7.29688C5.375 6.26328 6.21641 5.42188 7.25 5.42188C8.28359 5.42188 9.125 6.26328 9.125 7.29688C9.125 8.33047 8.28359 9.17188 7.25 9.17188ZM7.25 19.5781C6.21641 19.5781 5.375 18.7367 5.375 17.7031C5.375 16.6695 6.21641 15.8281 7.25 15.8281C8.28359 15.8281 9.125 16.6695 9.125 17.7031C9.125 18.7367 8.28359 19.5781 7.25 19.5781Z'
        fill='#FF6842'
      />
    </svg>
  );
};

export default Scissor;
