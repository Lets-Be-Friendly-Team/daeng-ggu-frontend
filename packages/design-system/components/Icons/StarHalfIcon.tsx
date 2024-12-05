interface IStarHalfIconProps {
  className?: string;
}
const StarHalfIcon = ({ className }: IStarHalfIconProps) => {
  return (
    <svg viewBox='0 0 25 25' fill='none' xmlns='http://www.w3.org/2000/svg' className={className}>
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M10.1075 9.878L12.5 2L14.8925 9.878H23L16.4405 14.978L18.875 23L12.5 18.0425L6.125 23L8.5595 14.978L2 9.878H10.1075ZM12.5 15.548L15.3725 17.783L14.276 14.168L17.1485 11.933H13.598L12.5 8.321V15.551V15.548ZM20.978 10.583H14.42H20.978Z'
        fill='black'
      />
    </svg>
  );
};

export default StarHalfIcon;
