interface IArrowUpIconProps {
  className?: string;
}
const ArrowUp = ({ className }: IArrowUpIconProps) => {
  return (
    <svg viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg' className={className}>
      <path
        d='M13.8127 12H12.6408C12.5611 12 12.4861 11.9609 12.4393 11.8969L8.0002 5.77812L3.56114 11.8969C3.51426 11.9609 3.43926 12 3.35957 12H2.1877C2.08614 12 2.02676 11.8844 2.08614 11.8016L7.59551 4.20625C7.79551 3.93125 8.20489 3.93125 8.40332 4.20625L13.9127 11.8016C13.9736 11.8844 13.9143 12 13.8127 12Z'
        fill='#C2C7CD'
      />
    </svg>
  );
};
export default ArrowUp;
