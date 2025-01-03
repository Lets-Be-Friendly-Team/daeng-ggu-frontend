interface IStarFullIconProps {
  className?: string;
}
const StarFullIcon = ({ className }: IStarFullIconProps) => {
  return (
    <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className={className}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M14.3925 9.378L12 1.5L9.6075 9.378H1.5L8.0595 14.478L5.625 22.5L12 17.5425L18.375 22.5L15.9405 14.478L22.5 9.378H14.3925Z'
        fill='#FFEFE8'
      />
    </svg>
  );
};

export default StarFullIcon;
