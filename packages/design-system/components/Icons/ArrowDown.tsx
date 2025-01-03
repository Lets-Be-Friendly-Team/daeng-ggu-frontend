interface IArrowDownIconProps {
  className?: string;
}
const ArrowDown = ({ className }: IArrowDownIconProps) => {
  return (
    <svg viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg' className={className}>
      <path
        d='M13.8127 4H12.6408C12.5611 4 12.4861 4.03906 12.4393 4.10313L8.0002 10.2219L3.56114 4.10313C3.51426 4.03906 3.43926 4 3.35957 4H2.1877C2.08614 4 2.02676 4.11563 2.08614 4.19844L7.59551 11.7937C7.79551 12.0687 8.20489 12.0687 8.40332 11.7937L13.9127 4.19844C13.9736 4.11563 13.9143 4 13.8127 4Z'
        fill='#C2C7CD'
      />
    </svg>
  );
};
export default ArrowDown;
