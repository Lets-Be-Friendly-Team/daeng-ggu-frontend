interface IStarEmptyIconProps {
  className?: string;
}
const StarEmptyIcon = ({ className }: IStarEmptyIconProps) => {
  return (
    <svg viewBox='0 0 25 25' fill='none' xmlns='http://www.w3.org/2000/svg' className={className}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M14.8925 9.878L12.5 2L10.1075 9.878H2L8.5595 14.978L6.125 23L12.5 18.0425L18.875 23L16.4405 14.978L23 9.878H14.8925ZM4.022 10.583H10.58L12.5 4.2605L10.58 10.583H4.022ZM9.3275 14.708L7.367 21.1655L9.3275 14.708ZM20.978 10.583H14.42H20.978ZM7.853 11.933H11.402L12.5 8.321L13.598 11.936H17.1485L14.276 14.171L15.3725 17.7845L12.5 15.548L9.6275 17.783L10.724 14.168L7.8515 11.933H7.853Z'
        fill='black'
      />
    </svg>
  );
};

export default StarEmptyIcon;
